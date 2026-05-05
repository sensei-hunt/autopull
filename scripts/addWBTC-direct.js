const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/TwOPKyvG7bp2j2i0zBfgq");
  const wallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  const contract = new ethers.Contract(
    "0xA7C287252c30029eDb1a5FC2c365821FD4460C44",
    ["function addToken(address token, string calldata symbol) external"],
    wallet
  );

  console.log("Adding WBTC...");
  const tx = await contract.addToken("0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", "WBTC", {
    gasLimit: 200000,
    maxFeePerGas: ethers.parseUnits("150", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
  });
  console.log("Tx hash:", tx.hash);
  await tx.wait();
  console.log("✅ WBTC whitelisted!");
}

main().catch(e => { console.error(e); process.exit(1); });
