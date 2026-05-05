const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xA7C287252c30029eDb1a5FC2c365821FD4460C44";

const ABI = [
  "function addToken(address token, string calldata symbol) external",
  "function getAllWhitelistedTokens() external view returns (address[])",
  "function tokenSymbol(address) external view returns (string)",
];

async function main() {
  const [deployer] = await ethers.getSigners();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, deployer);

  // Polygon Mainnet USDT
  const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  console.log("Adding USDT:", usdtAddress);

  const tx = await contract.addToken(usdtAddress, "USDT", {
    gasPrice: ethers.parseUnits("30", "gwei"),
  });
  await tx.wait();
  console.log("✅ USDT added! Tx:", tx.hash);

  // Print full whitelist
  console.log("\n📋 All whitelisted tokens:");
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