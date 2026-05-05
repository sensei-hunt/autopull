const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying AutoPull contract...");

  const AutoPull = await ethers.getContractFactory("AutoPull");
  const autoPull = await AutoPull.deploy({
    gasLimit: 3000000,
    maxFeePerGas: ethers.parseUnits("150", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
  });

  await autoPull.waitForDeployment();

  const address = await autoPull.getAddress();
  console.log("✅ AutoPull deployed successfully!");
  console.log("📋 Contract address:", address);
  console.log("🔗 View on explorer: https://polygonscan.com/address/" + address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});