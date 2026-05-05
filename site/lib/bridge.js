/**
 * Bridge module — Squid Router (Axelar)
 *
 * Purpose: Bridge a small amount of tokens from a chain the user HAS gas on,
 * and receive NATIVE GAS TOKEN on the destination chain (e.g., MATIC → BNB).
 * This unlocks the ability to pull tokens from chains where the user has 0 gas.
 *
 * Squid Router API: https://api.squidrouter.com
 * Squid supports cross-chain swaps that output native tokens at the destination.
 */

const SQUID_API   = "https://apiplus.squidrouter.com/v2";
const SQUID_INTEG = "ronin-pull-v1"; // integration ID header

// Native token placeholder address used by Squid for all chains
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

// How much native gas to aim for on each destination (in USD equivalent)
// Small enough to not drain the user, large enough to cover 2-3 txs
const GAS_TARGET_USD = {
  56:    0.50,  // BSC:      ~0.001 BNB  ($0.50)
  137:   0.10,  // Polygon:  ~0.2 MATIC ($0.10)
  1:    15.00,  // Ethereum: ~0.005 ETH ($15)
  8453:  1.50,  // Base:     ~0.0005 ETH ($1.50)
  42161: 1.50,  // Arbitrum: ~0.0005 ETH ($1.50)
};

// Native gas symbols per chain (for display)
const GAS_SYM = { 56:"BNB", 137:"MATIC", 1:"ETH", 8453:"ETH", 42161:"ETH" };

/**
 * Get a Squid route for bridging gas to the destination chain.
 *
 * @param {object} sourceChain   - Source chain config from CHAINS
 * @param {object} destChain     - Destination chain config from CHAINS
 * @param {string} fromToken     - Source token address (native MATIC or USDT etc.)
 * @param {string} fromAmount    - Amount in wei (string)
 * @param {string} userAddress   - User's wallet address
 * @returns {Promise<object|null>} Squid route object, or null on failure
 */
async function getBridgeRoute(sourceChain, destChain, fromToken, fromAmount, userAddress) {
  try {
    const params = new URLSearchParams({
      fromChain:   String(sourceChain.chainId),
      toChain:     String(destChain.chainId),
      fromToken:   fromToken,
      toToken:     NATIVE,             // Always output native gas token
      fromAmount:  fromAmount,
      fromAddress: userAddress,
      toAddress:   userAddress,
      slippage:    "1",                // 1% max slippage
      enableBoost: "true",
    });

    const resp = await fetch(`${SQUID_API}/route?${params}`, {
      headers: {
        "x-integrator-id": SQUID_INTEG,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.warn("[Bridge] Squid route error:", resp.status, err);
      return null;
    }

    const data = await resp.json();
    return data.route || null;
  } catch(e) {
    console.error("[Bridge] getBridgeRoute failed:", e.message);
    return null;
  }
}

/**
 * Execute a Squid bridge transaction using the user's wallet.
 * The user must sign ONE transaction on the source chain.
 * Squid handles the cross-chain routing automatically.
 *
 * @param {ethers.BrowserProvider} provider    - ethers BrowserProvider (wallet)
 * @param {object}                 route       - Route from getBridgeRoute()
 * @param {object}                 sourceChain - Source chain config
 * @returns {Promise<{ok:boolean, txHash:string|null, error:string|null}>}
 */
async function executeBridgeRoute(provider, route, sourceChain) {
  try {
    const signer   = await provider.getSigner();
    const userAddr = await signer.getAddress();
    const tx       = route.transactionRequest;

    if (!tx) throw new Error("No transactionRequest in route");

    // If there's a token approval needed first (for ERC-20 source tokens)
    if (tx.approvalRequired) {
      const tokenABI = [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)",
      ];
      const token       = new ethers.Contract(tx.tokenAddress, tokenABI, signer);
      const allowance   = await token.allowance(userAddr, tx.spenderAddress);
      const amountBigInt = BigInt(tx.amount);

      if (allowance < amountBigInt) {
        const approveTx = await token.approve(tx.spenderAddress, ethers.MaxUint256);
        await approveTx.wait();
        console.log("[Bridge] Token approved for Squid:", approveTx.hash);
      }
    }

    // Send the bridge transaction
    const bridgeTx = await signer.sendTransaction({
      to:       tx.target,
      data:     tx.data,
      value:    tx.value ? BigInt(tx.value) : 0n,
      gasLimit: tx.gasLimit ? BigInt(tx.gasLimit) : undefined,
    });

    console.log("[Bridge] Bridge tx sent:", bridgeTx.hash);
    await bridgeTx.wait();

    return { ok: true, txHash: bridgeTx.hash, error: null };
  } catch(e) {
    console.error("[Bridge] executeBridgeRoute failed:", e.message);
    return { ok: false, txHash: null, error: e.message };
  }
}

/**
 * Poll the destination chain until the user's native gas balance rises above
 * the threshold (confirming the bridge completed).
 *
 * @param {string}  destRpc      - RPC URL for destination chain
 * @param {string}  userAddress  - User's wallet address
 * @param {string}  threshold    - Min native balance string (e.g. "0.001")
 * @param {number}  maxWaitSec   - Max seconds to wait (default 300 = 5 min)
 * @param {Function} onTick      - Optional callback(secondsElapsed) for UI updates
 * @returns {Promise<boolean>}
 */
async function pollGasArrival(destRpc, userAddress, threshold, maxWaitSec = 300, onTick = null) {
  const rpc        = new ethers.JsonRpcProvider(destRpc);
  const threshBig  = ethers.parseEther(threshold);
  const pollMs     = 6000;
  const started    = Date.now();

  while (Date.now() - started < maxWaitSec * 1000) {
    try {
      const balance = await rpc.getBalance(userAddress);
      if (balance >= threshBig) {
        console.log("[Bridge] ✓ Gas arrived on destination:", ethers.formatEther(balance));
        return true;
      }
    } catch(e) { /* ignore transient RPC errors */ }

    const elapsed = Math.round((Date.now() - started) / 1000);
    if (onTick) onTick(elapsed);
    await new Promise(r => setTimeout(r, pollMs));
  }

  console.warn("[Bridge] pollGasArrival timeout after", maxWaitSec, "s");
  return false;
}

/**
 * Estimate how much of fromToken to send to get GAS_TARGET_USD worth of
 * native gas at the destination.
 *
 * @param {object} sourceChain
 * @param {object} destChain
 * @param {object} sourceToken  - Token object from CHAINS config {address, decimals, usdPerUnit}
 * @returns {string} Amount in wei as a string
 */
function estimateBridgeAmount(sourceChain, destChain, sourceToken) {
  const targetUsd    = GAS_TARGET_USD[destChain.chainId] || 1.0;
  const bufferFactor = 1.3; // 30% buffer for slippage + fees
  const usdNeeded    = targetUsd * bufferFactor;
  const tokenAmount  = usdNeeded / (sourceToken.usdPerUnit || 1);
  const raw          = Math.ceil(tokenAmount * Math.pow(10, sourceToken.decimals || 18));
  return String(raw);
}

// Expose globally for use in index.html (no module bundler in this project)
if (typeof window !== "undefined") {
  window.bridgeLib = { getBridgeRoute, executeBridgeRoute, pollGasArrival, estimateBridgeAmount, GAS_TARGET_USD, GAS_SYM, NATIVE };
}
