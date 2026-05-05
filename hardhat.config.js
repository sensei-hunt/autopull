require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PK = process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [];

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      evmVersion: "paris",   // broadest EVM compatibility (Base/Arbitrum safe)
    },
  },
  networks: {
    // ── BNB Chain ────────────────────────────────────────────────────────
    bsc: {
      url:      "https://bsc-dataseed1.binance.org",
      chainId:  56,
      accounts: PK,
      timeout:  300000,
      gasPrice: 3_000_000_000,   // 3 gwei — standard for BSC
    },
    // ── Polygon ──────────────────────────────────────────────────────────
    polygon: {
      url:      "https://polygon-rpc.com",
      chainId:  137,
      accounts: PK,
      timeout:  300000,
      gasPrice: 30_000_000_000,  // 30 gwei
    },
    // ── Ethereum mainnet ─────────────────────────────────────────────────
    ethereum: {
      url:      "https://eth.drpc.org",
      chainId:  1,
      accounts: PK,
      timeout:  300000,
      // gas price omitted — lets Hardhat auto-estimate EIP-1559 fees
    },
    // ── Base ─────────────────────────────────────────────────────────────
    base: {
      url:      "https://mainnet.base.org",
      chainId:  8453,
      accounts: PK,
      timeout:  300000,
    },
    // ── Arbitrum One ─────────────────────────────────────────────────────
    arbitrum: {
      url:      "https://arb1.arbitrum.io/rpc",
      chainId:  42161,
      accounts: PK,
      timeout:  300000,
    },
    // ── Polygon Amoy testnet (kept for testing) ───────────────────────────
    amoy: {
      url:      "https://rpc-amoy.polygon.technology",
      chainId:  80002,
      accounts: PK,
      gasPrice: 30_000_000_000,
    },
  },
  etherscan: {
    apiKey: {
      mainnet:        process.env.ETHERSCAN_API_KEY  || "",
      bsc:            process.env.BSCSCAN_API_KEY    || "",
      polygon:        process.env.POLYGONSCAN_API_KEY || "",
      base:           process.env.BASESCAN_API_KEY   || "",
      arbitrumOne:    process.env.ARBISCAN_API_KEY   || "",
    },
  },
};