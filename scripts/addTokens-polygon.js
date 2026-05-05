const { ethers } = require("ethers");
require("dotenv").config();

// ── UPDATE THIS after deploying ──────────────────────────────────────────────
const CONTRACT_ADDRESS = "PASTE_POLYGON_CONTRACT_ADDRESS_HERE";
// ────────────────────────────────────────────────────────────────────────────

const TOKENS = [
  { address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", symbol: "USDT" },
  { address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", symbol: "USDC" },
  { address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", symbol: "DAI"  },
  { address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", symbol: "WBTC" },
  { address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", symbol: "WETH" },
  { address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", symbol: "AAVE" },
  { address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", symbol: "LINK" },
  { address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", symbol: "UNI"  },
  { address: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a", symbol: "SUSHI"},
  { address: "0x5fe2B58c013d7601147DcdD68C143A77499f5531", symbol: "GRT"  },
  { address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF", symbol: "CRV"  },
  { address: "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683", symbol: "SAND" },
  { address: "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4", symbol: "MANA" },
  { address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", symbol: "WPOL" },
];

const ABI = [
  "function addToken(address token, string calldata symbol) external",
  "function getAllWhitelistedTokens() external view returns (address[])",
  "function tokenSymbol(address) external view returns (string)",
];

async function main() {
  if (CONTRACT_ADDRESS === "PASTE_POLYGON_CONTRACT_ADDRESS_HERE") {
    console.error("❌ Update CONTRACT_ADDRESS in this script first!");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
  const wallet   = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  console.log("Wallet:", wallet.address);
  const bal = await provider.getBalance(wallet.address);
  console.log("POL balance:", ethers.formatEther(bal), "POL\n");

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  for (const token of TOKENS) {
    console.log(`Adding ${token.symbol} (${token.address})...`);
    try {
      const tx = await contract.addToken(token.address, token.symbol, {
        gasLimit: 200000,
        maxFeePerGas:         ethers.parseUnits("150", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("30",  "gwei"),
      });
      console.log(`  Tx: ${tx.hash}`);
      await tx.wait();
      console.log(`  ✅ ${token.symbol} added!\n`);
    } catch (e) {
      console.log(`  ⚠️  Skipped ${token.symbol}: ${e.shortMessage || e.message}\n`);
    }
  }

  console.log("📋 Final whitelist on Polygon:");
  const all = await contract.getAllWhitelistedTokens();
  for (const addr of all) {
    const sym = await contract.tokenSymbol(addr);
    console.log(` - ${sym}: ${addr}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
