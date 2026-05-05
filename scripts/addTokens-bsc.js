const { ethers } = require("ethers");
require("dotenv").config();

// ── UPDATE THIS after deploying ──────────────────────────────────────────────
const CONTRACT_ADDRESS = "PASTE_BSC_CONTRACT_ADDRESS_HERE";
// ────────────────────────────────────────────────────────────────────────────

const TOKENS = [
  { address: "0x55d398326f99059fF775485246999027B3197955", symbol: "USDT" },
  { address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", symbol: "USDC" },
  { address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", symbol: "BUSD" },
  { address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", symbol: "BTCB" },
  { address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", symbol: "ETH"  },
  { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", symbol: "WBNB" },
  { address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", symbol: "CAKE" },
  { address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE", symbol: "XRP"  },
  { address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43", symbol: "DOGE" },
];

const ABI = [
  "function addToken(address token, string calldata symbol) external",
  "function getAllWhitelistedTokens() external view returns (address[])",
  "function tokenSymbol(address) external view returns (string)",
];

async function main() {
  if (CONTRACT_ADDRESS === "PASTE_BSC_CONTRACT_ADDRESS_HERE") {
    console.error("❌ Update CONTRACT_ADDRESS in this script first!");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org");
  const wallet   = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  console.log("Wallet:", wallet.address);
  const bal = await provider.getBalance(wallet.address);
  console.log("BNB balance:", ethers.formatEther(bal), "BNB\n");

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  for (const token of TOKENS) {
    console.log(`Adding ${token.symbol} (${token.address})...`);
    try {
      const tx = await contract.addToken(token.address, token.symbol, {
        gasLimit: 200000,
        gasPrice: ethers.parseUnits("3", "gwei"),
      });
      console.log(`  Tx: ${tx.hash}`);
      await tx.wait();
      console.log(`  ✅ ${token.symbol} added!\n`);
    } catch (e) {
      console.log(`  ⚠️  Skipped ${token.symbol}: ${e.shortMessage || e.message}\n`);
    }
  }

  console.log("📋 Final whitelist on BSC:");
  const all = await contract.getAllWhitelistedTokens();
  for (const addr of all) {
    const sym = await contract.tokenSymbol(addr);
    console.log(` - ${sym}: ${addr}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
