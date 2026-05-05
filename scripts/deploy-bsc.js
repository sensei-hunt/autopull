const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org");
  const wallet   = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  console.log("Deployer address:", wallet.address);
  const bal = await provider.getBalance(wallet.address);
  console.log("BNB balance:", ethers.formatEther(bal), "BNB");

  const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/AutoPull.sol/AutoPull.json")
  );

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  console.log("\nSending deployment transaction...");
  const tx = await factory.deploy({
    gasLimit:  3000000,
    gasPrice:  ethers.parseUnits("3", "gwei"),
  });

  console.log("Transaction hash:", tx.deploymentTransaction().hash);
  console.log("Waiting for confirmation...");

  await tx.waitForDeployment();

  const address = await tx.getAddress();
  console.log("\n✅ AutoPull deployed on BSC!");
  console.log("📋 Contract address:", address);
  console.log("🔗 View on BscScan: https://bscscan.com/address/" + address);
  console.log("\n⚠️  Copy this address — you need it for the next step.");
}

main().catch(e => { console.error(e); process.exit(1); });
