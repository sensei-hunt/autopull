const { ethers } = require("ethers");
require("dotenv").config();

const CONTRACT_ADDRESS = "0xA7C287252c30029eDb1a5FC2c365821FD4460C44";

const TOKENS = [
  { address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", symbol: "USDC" },
  { address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", symbol: "USDT" },
  { address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", symbol: "DAI" },
  { address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", symbol: "WETH" },
  { address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", symbol: "WPOL" },
];

const ABI = [
  "function addToken(address token, string calldata symbol) external",
  "function getAllWhitelistedTokens() external view returns (address[])",
  "function tokenSymbol(address) external view returns (string)",
];

async function main() {
  const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/TwOPKyvG7bp2j2i0zBfgq");
  const wallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  console.log("Using wallet:", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log("POL balance:", ethers.formatEther(balance));

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  for (const token of TOKENS) {
    console.log(`\nAdding ${token.symbol} (${token.address})...`);
    try {
      const tx = await contract.addToken(token.address, token.symbol, {
        gasLimit: 200000,
        maxFeePerGas: ethers.parseUnits("150", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
      });
      console.log(`  Tx hash: ${tx.hash}`);
      await tx.wait();
      console.log(`  ✅ ${token.symbol} added!`);
    } catch (e) {
      console.log(`  ⚠️  Skipped ${token.symbol}: ${e.shortMessage || e.message}`);
    }
  }

  console.log("\n📋 Whitelisted tokens:");
  const all = await contract.getAllWhitelistedTokens();
  for (const addr of all) {
    const sym = await contract.tokenSymbol(addr);
    console.log(` - ${sym}: ${addr}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
