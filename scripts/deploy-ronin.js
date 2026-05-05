// Deploy Ronin.sol to whichever network is passed via --network
// Usage:
//   npx hardhat run scripts/deploy-ronin.js --network bsc
//   npx hardhat run scripts/deploy-ronin.js --network polygon
//   npx hardhat run scripts/deploy-ronin.js --network ethereum
//   npx hardhat run scripts/deploy-ronin.js --network base
//   npx hardhat run scripts/deploy-ronin.js --network arbitrum

const { ethers, network } = require("hardhat");

const EXPLORERS = {
  bsc:      "https://bscscan.com/address/",
  polygon:  "https://polygonscan.com/address/",
  ethereum: "https://etherscan.io/address/",
  base:     "https://basescan.org/address/",
  arbitrum: "https://arbiscan.io/address/",
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance    = await ethers.provider.getBalance(deployer.address);

  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║           Ronin.sol — Deploy Script              ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log(`  Network  : ${network.name}`);
  console.log(`  Deployer : ${deployer.address}`);
  console.log(`  Balance  : ${ethers.formatEther(balance)} ${getSymbol(network.name)}\n`);

  if (balance === 0n) {
    console.error("❌  Deployer has zero balance — top up first.");
    process.exit(1);
  }

  console.log("⏳  Deploying Ronin...");
  const Factory = await ethers.getContractFactory("Ronin");
  const ronin   = await Factory.deploy();
  await ronin.waitForDeployment();

  const address = await ronin.getAddress();
  const tx      = ronin.deploymentTransaction();

  console.log(`\n✅  Deployed!`);
  console.log(`   Contract : ${address}`);
  console.log(`   Tx hash  : ${tx.hash}`);
  console.log(`   Explorer : ${(EXPLORERS[network.name] || "") + address}`);
  console.log(`\n📋  Copy this address into:`);
  console.log(`   site/index.html  → CHAINS[${getChainId(network.name)}].contract`);
  console.log(`   site/admin/index.html → CHAINS[${getChainId(network.name)}].contract\n`);
}

function getSymbol(net) {
  return { bsc:"BNB", polygon:"POL", ethereum:"ETH", base:"ETH", arbitrum:"ETH" }[net] || "ETH";
}

function getChainId(net) {
  return { bsc:56, polygon:137, ethereum:1, base:8453, arbitrum:42161 }[net] || "?";
}

main().catch(err => { console.error(err); process.exit(1); });
