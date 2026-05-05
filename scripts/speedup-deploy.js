const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const rpcUrl = "https://polygon-mainnet.g.alchemy.com/v2/TwOPKyvG7bp2j2i0zBfgq";
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  console.log("Deployer address:", wallet.address);

  // Get the pending nonce (same nonce as stuck tx)
  const nonce = await provider.getTransactionCount(wallet.address, "pending");
  console.log("Using nonce:", nonce);

  const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/AutoPull.sol/AutoPull.json"));
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  console.log("Replacing stuck transaction with higher gas...");
  const tx = await factory.deploy({
    gasLimit: 3000000,
    maxFeePerGas: ethers.parseUnits("500", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("200", "gwei"),
    nonce: nonce - 1, // same nonce as the stuck tx
  });

  console.log("Replacement tx hash:", tx.deploymentTransaction().hash);
  console.log("Waiting for confirmation...");

  await tx.waitForDeployment();

  const address = await tx.getAddress();
  console.log("✅ AutoPull deployed successfully!");
  console.log("📋 Contract address:", address);
  console.log("🔗 View on explorer: https://polygonscan.com/address/" + address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
