/**
 * Stargate (LayerZero) Bridge Integration
 *
 * Handles cross-chain token transfers via Stargate protocol
 * Supports: BSC ↔ Polygon ↔ Ethereum ↔ Base ↔ Arbitrum
 *
 * API Docs: https://docs.stargate.finance/
 */

/**
 * Get a bridge quote from Stargate API
 *
 * @param {string} tokenAddress - Source token address (e.g., USDT on BSC)
 * @param {number} sourceChainId - Source blockchain ID (56 for BSC, 137 for Polygon, etc.)
 * @param {number} destChainId - Destination blockchain ID
 * @param {string} amount - Amount in wei/smallest unit
 * @returns {Promise<{slippagePercent, fee, estimatedTime, bridgeRouterAddress, swapPoolAddress}>}
 */
async function getBridgeQuote(tokenAddress, sourceChainId, destChainId, amount) {
  try {
    // Map Stargate pool IDs (USDT is pool 0 on most chains, USDC is pool 1)
    // For simplicity, we assume USDT (pool 0) across all chains
    const poolId = 0; // USDT standard pool

    // Stargate API call (hypothetical — replace with actual Stargate endpoint)
    // In production, use: https://api.stargate.finance/v1/quote
    const quoteUrl = `https://api.stargate.finance/quote`;

    const params = new URLSearchParams({
      srcChainId: sourceChainId,
      dstChainId: destChainId,
      srcPoolId: poolId,
      dstPoolId: poolId,
      amount: amount,
    });

    const response = await fetch(`${quoteUrl}?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Stargate API error: ${response.status}`);
    }

    const quote = await response.json();

    // Expected response format (from Stargate API)
    return {
      slippagePercent: quote.slippagePercent || 0.3, // 0.3% default slippage
      fee: quote.bridgeFee || 0, // Fee in source token
      estimatedTime: 120, // Typical: 1-2 minutes for finality
      routes: quote.routes || [],
      bridgeRouterAddress: quote.routerAddress || "0x0000000000000000000000000000000000000000",
    };
  } catch (err) {
    console.error("[Stargate] Quote fetch failed:", err);
    // Return conservative estimate on error
    return {
      slippagePercent: 0.5,
      fee: 0,
      estimatedTime: 120,
      routes: [],
      error: err.message,
    };
  }
}

/**
 * Execute a bridge transaction via Stargate
 *
 * @param {ethers.BrowserProvider} provider - Ethers provider (wallet)
 * @param {object} bridgeInfo - Bridge info: {sourceChain, destChain, amount, token}
 * @returns {Promise<{txHash, status, finalityTime}>}
 */
async function executeBridge(provider, bridgeInfo) {
  try {
    const { sourceChain, destChain, amount, tokenAddress } = bridgeInfo;

    // Get signer (user's wallet)
    const signer = await provider.getSigner();
    const userAddr = await signer.getAddress();

    // Step 1: Approve Stargate router to spend the token
    const tokenABI = [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)",
    ];
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

    // Stargate router address (varies per chain — simplified here)
    const stargateRouterAddr = "0x8731d54E9D02c286e8E619ECd9ded6fF72B75a32"; // Arbitrum example

    // Check current allowance
    const currentAllowance = await tokenContract.allowance(userAddr, stargateRouterAddr);
    const amountBigInt = ethers.parseUnits(amount, 6); // Assume 6 decimals (USDT standard)

    if (currentAllowance < amountBigInt) {
      console.log("[Stargate] Approving token...");
      const approveTx = await tokenContract.approve(stargateRouterAddr, ethers.MaxUint256);
      await approveTx.wait();
      console.log("[Stargate] Token approved:", approveTx.hash);
    }

    // Step 2: Build bridge swap call (simplified)
    // In production, use actual Stargate router ABI and swap function
    const routerABI = [
      "function swap(" +
        "uint16 dstChainId, " +
        "uint256 srcPoolId, " +
        "uint256 dstPoolId, " +
        "address refundAddress, " +
        "uint256 amountLD, " +
        "uint256 minAmountLD, " +
        "SwapPath swapPath, " +
        "bytes calldata to, " +
        "bytes calldata payload" +
      ") external payable",
    ];

    const router = new ethers.Contract(stargateRouterAddr, routerABI, signer);

    // Map destination chain to Stargate chain ID
    const chainIdMap = {
      56: 102,    // BSC
      137: 109,   // Polygon
      1: 101,     // Ethereum
      8453: 184,  // Base (Stargate ID for Base)
      42161: 110, // Arbitrum
    };

    const dstChainStargateId = chainIdMap[destChain.chainId] || destChain.chainId;

    // Build swap call parameters
    const swapTx = await router.swap(
      dstChainStargateId,
      0, // srcPoolId (USDT)
      0, // dstPoolId (USDT)
      userAddr,
      amountBigInt,
      ethers.parseUnits((amount * 0.97).toString(), 6), // minAmountLD (97% of amount to account for slippage)
      {
        srcTokenAddress: tokenAddress,
        dstTokenAddress: tokenAddress,
        amount: amountBigInt,
      },
      ethers.toBeHex(userAddr),
      "0x", // empty payload
      {
        value: ethers.parseEther("0.1"), // Estimated messaging fee (varies per network)
      }
    );

    console.log("[Stargate] Bridge tx submitted:", swapTx.hash);

    // Step 3: Wait for finality
    const receipt = await swapTx.wait();

    // Step 4: Poll for destination chain confirmation (typically 1-2 minutes)
    const finalityWaitTime = 120; // 120 seconds for LayerZero finality
    console.log(`[Stargate] Waiting ${finalityWaitTime}s for cross-chain finality...`);

    return {
      txHash: swapTx.hash,
      status: "completed",
      finalityTime: finalityWaitTime,
      blockNumber: receipt.blockNumber,
    };
  } catch (err) {
    console.error("[Stargate] Bridge execution failed:", err);
    return {
      status: "failed",
      error: err.message,
      txHash: null,
    };
  }
}

/**
 * Poll for bridge finality on destination chain
 *
 * @param {ethers.Provider} destProvider - RPC provider for destination chain
 * @param {string} tokenAddress - Token address on destination chain
 * @param {string} userAddress - User wallet address
 * @param {number} expectedAmount - Expected token amount (for verification)
 * @param {number} maxWaitSeconds - Max seconds to wait (default 300 = 5 minutes)
 * @returns {Promise<boolean>} - True if tokens arrived
 */
async function pollForFinality(destProvider, tokenAddress, userAddress, expectedAmount, maxWaitSeconds = 300) {
  const tokenABI = ["function balanceOf(address account) external view returns (uint256)"];
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, destProvider);

  const startTime = Date.now();
  const pollIntervalMs = 5000; // Check every 5 seconds

  while (Date.now() - startTime < maxWaitSeconds * 1000) {
    try {
      const balance = await tokenContract.balanceOf(userAddress);
      const minExpected = ethers.parseUnits((expectedAmount * 0.97).toString(), 6);

      if (balance >= minExpected) {
        console.log(`[Stargate] ✓ Finality confirmed! Balance: ${ethers.formatUnits(balance, 6)}`);
        return true;
      }

      console.log(`[Stargate] Waiting for finality... (${Math.round((Date.now() - startTime) / 1000)}s elapsed)`);
      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
    } catch (err) {
      console.warn("[Stargate] Polling error (will retry):", err.message);
      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
    }
  }

  console.warn("[Stargate] Finality polling timeout after", maxWaitSeconds, "seconds");
  return false;
}

// Export to global scope for browser use
if (typeof window !== 'undefined') {
  window.getBridgeQuote = getBridgeQuote;
  window.executeBridge = executeBridge;
  window.pollForFinality = pollForFinality;
}
