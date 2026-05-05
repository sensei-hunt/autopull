const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xA7C287252c30029eDb1a5FC2c365821FD4460C44";
const USDC_ADDRESS     = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

const CONTRACT_ABI = [
  "function subscribe(address token) external",
  "function getSubscription(address user, address token) external view returns (bool active, uint256 lastPulled, uint256 nextPullAt, uint256 totalPulled, uint256 pullCount)",
  "function getPullHistoryLength() external view returns (uint256)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
];

async function main() {
  const [user] = await ethers.getSigners();
  console.log("Wallet:", user.address);

  const usdc     = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, user);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, user);

  // Check balance
  const decimals = await usdc.decimals();
  const balance  = await usdc.balanceOf(user.address);
  console.log("USDC balance:", ethers.formatUnits(balance, decimals), "USDC");

  // Step 1 — Approve contract to spend USDC
  console.log("\nApproving contract to spend USDC...");
  const approveTx = await usdc.approve(
    CONTRACT_ADDRESS,
    ethers.MaxUint256, // unlimited approval
    { gasPrice: ethers.parseUnits("30", "gwei") }
  );
  await approveTx.wait();
  console.log("✅ Approved! Tx:", approveTx.hash);

  // Step 2 — Subscribe (triggers immediate pull)
  console.log("\nSubscribing to auto-pull...");
  const subTx = await contract.subscribe(USDC_ADDRESS, {
    gasPrice: ethers.parseUnits("30", "gwei"),
  });
  await subTx.wait();
  console.log("✅ Subscribed! Tx:", subTx.hash);

  // Step 3 — Check results
  const sub = await contract.getSubscription(user.address, USDC_ADDRESS);
  const newBalance = await usdc.balanceOf(user.address);

  console.log("\n📋 Subscription status:");
  console.log(" - Active:", sub.active);
  console.log(" - Total pulled:", ethers.formatUnits(sub.totalPulled, decimals), "USDC");
  console.log(" - Pull count:", sub.pullCount.toString());
  console.log(" - Next pull:", new Date(Number(sub.nextPullAt) * 1000).toLocaleDateString());
  console.log("\n💰 Remaining USDC balance:", ethers.formatUnits(newBalance, decimals), "USDC");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});