import { cv as defineTransactionReceipt, cw as defineTransaction, cx as defineBlock, bO as hexToBigInt, cy as formatTransaction, cz as serializeTransaction$2, cc as toHex$3, cA as concatHex, cB as toRlp, c9 as isAddress, cC as InvalidAddressError$1, c6 as defineChain, cg as trim, cD as defineTransactionRequest, cE as serializeAccessList, cF as toYParitySignatureArray, cG as InvalidChainIdError, bH as BaseError$1, cH as FeeCapTooHighError, cI as TipAboveFeeCapError, cJ as maxUint256$1, c5 as EventEmitter, cK as BaseError$2, cL as assertSize$1, cM as padRight$1, cN as fromBytes$3, cO as toBigInt$1, cP as stringify, cQ as keccak_256, b$ as sha256$1, cR as slice$1, cS as concat, cT as fromNumber, cU as size$1, cV as from$j, cW as validate$3, cX as secp256k1, cY as trimLeft, cZ as padLeft, c_ as fromBoolean, c$ as IntegerOutOfRangeError, d0 as fromString$1, d1 as parseAbiParameters, d2 as formatAbiItem, d3 as secp256r1, d4 as p256, d5 as zeroAddress, aG as hashTypedData, aF as hashMessage, d6 as getSelector$3, d7 as from$k, bK as decodeErrorResult, d8 as getContractError, d9 as verifyHash, da as encode$4, db as wallet_verifySignature, dc as decode, dd as toValidationError, de as withCache, df as wallet_getCapabilities, dg as wallet_getCallsStatus, dh as wallet_getAssets, di as toNumber, dj as account_verifyEmail, dk as wallet_upgradeAccount, dl as wallet_getAuthorization, dm as wallet_sendPreparedCalls, dn as wallet_prepareUpgradeAccount, dp as wallet_prepareCalls, dq as wallet_getKeys, dr as account_setEmail, ds as health$1, dt as createTransport, cs as fallback, c8 as http, b_ as createClient, du as Permissions, dv as discriminatedUnion, dw as safeParse, dx as account_verifyEmail$1, dy as wallet_addFunds, dz as eth_accounts, dA as eth_chainId, dB as eth_requestAccounts, dC as eth_sendTransaction, dD as eth_signTypedData_v4, dE as wallet_getAccountVersion, dF as wallet_getAdmins, dG as wallet_getPermissions, dH as wallet_grantAdmin, dI as wallet_grantPermissions, dJ as wallet_prepareUpgradeAccount$1, dK as wallet_revokeAdmin, dL as wallet_revokePermissions, dM as wallet_upgradeAccount$1, dN as personal_sign, dO as porto_ping, dP as wallet_connect, dQ as wallet_disconnect, dR as wallet_getAssets$1, dS as wallet_getCallsStatus$1, dT as wallet_getCapabilities$1, dU as wallet_getKeys$1, dV as wallet_prepareCalls$1, dW as wallet_sendCalls, dX as wallet_sendPreparedCalls$1, dY as wallet_switchEthereumChain, dZ as wallet_verifySignature$1, d_ as announceProvider, d$ as Request$1, e0 as getEip712Domain$1, e1 as parse$1, cd as waitForCallsStatus, e2 as set, e3 as createStore$2, e4 as del, e5 as get } from "./appkit-DOrUN3iw.js";
import { p as parseAbiItem } from "./parseAbiItem-CnWYfqJJ.js";
const contracts = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
};
const formatters$1 = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      var _a;
      const transactions = (_a = args.transactions) == null ? void 0 : _a.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        if (formatted.typeHex === "0x7e") {
          formatted.isSystemTx = transaction.isSystemTx;
          formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
          formatted.sourceHash = transaction.sourceHash;
          formatted.type = "deposit";
        }
        return formatted;
      });
      return {
        transactions,
        stateRoot: args.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x7e") {
        transaction.isSystemTx = args.isSystemTx;
        transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
        transaction.sourceHash = args.sourceHash;
        transaction.type = "deposit";
      }
      return transaction;
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
        l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
        l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
        l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
      };
    }
  })
};
function serializeTransaction$1(transaction, signature) {
  if (isDeposit(transaction))
    return serializeTransactionDeposit(transaction);
  return serializeTransaction$2(transaction, signature);
}
const serializers$1 = {
  transaction: serializeTransaction$1
};
function serializeTransactionDeposit(transaction) {
  assertTransactionDeposit(transaction);
  const { sourceHash, data, from: from2, gas, isSystemTx, mint, to, value } = transaction;
  const serializedTransaction = [
    sourceHash,
    from2,
    to ?? "0x",
    mint ? toHex$3(mint) : "0x",
    value ? toHex$3(value) : "0x",
    gas ? toHex$3(gas) : "0x",
    isSystemTx ? "0x1" : "0x",
    data ?? "0x"
  ];
  return concatHex([
    "0x7e",
    toRlp(serializedTransaction)
  ]);
}
function isDeposit(transaction) {
  if (transaction.type === "deposit")
    return true;
  if (typeof transaction.sourceHash !== "undefined")
    return true;
  return false;
}
function assertTransactionDeposit(transaction) {
  const { from: from2, to } = transaction;
  if (from2 && !isAddress(from2))
    throw new InvalidAddressError$1({ address: from2 });
  if (to && !isAddress(to))
    throw new InvalidAddressError$1({ address: to });
}
const chainConfig$1 = {
  blockTime: 2e3,
  contracts,
  formatters: formatters$1,
  serializers: serializers$1
};
const anvil$1 = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
});
const arbitrum = /* @__PURE__ */ defineChain({
  id: 42161,
  name: "Arbitrum One",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockTime: 250,
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
      apiUrl: "https://api.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
});
const arbitrumSepolia = /* @__PURE__ */ defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  blockTime: 250,
  nativeCurrency: {
    name: "Arbitrum Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://sepolia.arbiscan.io",
      apiUrl: "https://api-sepolia.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 81930
    }
  },
  testnet: true
});
const sourceId$3 = 1;
const base = /* @__PURE__ */ defineChain({
  ...chainConfig$1,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig$1.contracts,
    disputeGameFactory: {
      [sourceId$3]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [sourceId$3]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [sourceId$3]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [sourceId$3]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId: sourceId$3
});
/* @__PURE__ */ defineChain({
  ...base,
  experimental_preconfirmationTime: 200,
  rpcUrls: {
    default: {
      http: ["https://mainnet-preconf.base.org"]
    }
  }
});
const sourceId$2 = 11155111;
const baseSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig$1,
  id: 84532,
  network: "base-sepolia",
  name: "Base Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia.basescan.org",
      apiUrl: "https://api-sepolia.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig$1.contracts,
    disputeGameFactory: {
      [sourceId$2]: {
        address: "0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1"
      }
    },
    l2OutputOracle: {
      [sourceId$2]: {
        address: "0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254"
      }
    },
    portal: {
      [sourceId$2]: {
        address: "0x49f53e41452c74589e85ca1677426ba426459e85",
        blockCreated: 4446677
      }
    },
    l1StandardBridge: {
      [sourceId$2]: {
        address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
        blockCreated: 4446677
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1059647
    }
  },
  testnet: true,
  sourceId: sourceId$2
});
/* @__PURE__ */ defineChain({
  ...baseSepolia,
  experimental_preconfirmationTime: 200,
  rpcUrls: {
    default: {
      http: ["https://sepolia-preconf.base.org"]
    }
  }
});
const bsc = /* @__PURE__ */ defineChain({
  id: 56,
  name: "BNB Smart Chain",
  blockTime: 750,
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://56.rpc.thirdweb.com"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452
    }
  }
});
const fees = {
  /*
     * Estimates the fees per gas for a transaction.
  
     * If the transaction is to be paid in a token (feeCurrency is present) then the fees
     * are estimated in the value of the token. Otherwise falls back to the default
     * estimation by returning null.
     *
     * @param params fee estimation function parameters
     */
  estimateFeesPerGas: async (params) => {
    var _a;
    if (!((_a = params.request) == null ? void 0 : _a.feeCurrency))
      return null;
    const [gasPrice, maxPriorityFeePerGas] = await Promise.all([
      estimateFeePerGasInFeeCurrency(params.client, params.request.feeCurrency),
      estimateMaxPriorityFeePerGasInFeeCurrency(params.client, params.request.feeCurrency)
    ]);
    const maxFeePerGas = params.multiply(gasPrice - maxPriorityFeePerGas) + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
};
async function estimateFeePerGasInFeeCurrency(client, feeCurrency) {
  const fee = await client.request({
    method: "eth_gasPrice",
    params: [feeCurrency]
  });
  return BigInt(fee);
}
async function estimateMaxPriorityFeePerGasInFeeCurrency(client, feeCurrency) {
  const feesPerGas = await client.request({
    method: "eth_maxPriorityFeePerGas",
    params: [feeCurrency]
  });
  return BigInt(feesPerGas);
}
function isEmpty(value) {
  return value === 0 || value === 0n || value === void 0 || value === null || value === "0" || value === "" || typeof value === "string" && (trim(value).toLowerCase() === "0x" || trim(value).toLowerCase() === "0x00");
}
function isPresent(value) {
  return !isEmpty(value);
}
function isEIP1559(transaction) {
  return typeof transaction.maxFeePerGas !== "undefined" && typeof transaction.maxPriorityFeePerGas !== "undefined";
}
function isCIP64(transaction) {
  if (transaction.type === "cip64") {
    return true;
  }
  return isEIP1559(transaction) && isPresent(transaction.feeCurrency);
}
const formatters = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      var _a;
      const transactions = (_a = args.transactions) == null ? void 0 : _a.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        return {
          ...formatted,
          ...transaction.gatewayFee ? {
            gatewayFee: hexToBigInt(transaction.gatewayFee),
            gatewayFeeRecipient: transaction.gatewayFeeRecipient
          } : {},
          feeCurrency: transaction.feeCurrency
        };
      });
      return {
        transactions
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      if (args.type === "0x7e")
        return {
          isSystemTx: args.isSystemTx,
          mint: args.mint ? hexToBigInt(args.mint) : void 0,
          sourceHash: args.sourceHash,
          type: "deposit"
        };
      const transaction = { feeCurrency: args.feeCurrency };
      if (args.type === "0x7b")
        transaction.type = "cip64";
      else {
        if (args.type === "0x7c")
          transaction.type = "cip42";
        transaction.gatewayFee = args.gatewayFee ? hexToBigInt(args.gatewayFee) : null;
        transaction.gatewayFeeRecipient = args.gatewayFeeRecipient;
      }
      return transaction;
    }
  }),
  transactionRequest: /* @__PURE__ */ defineTransactionRequest({
    format(args) {
      const request = {};
      if (args.feeCurrency)
        request.feeCurrency = args.feeCurrency;
      if (isCIP64(args))
        request.type = "0x7b";
      return request;
    }
  })
};
function serializeTransaction(transaction, signature) {
  if (isCIP64(transaction))
    return serializeTransactionCIP64(transaction, signature);
  return serializeTransaction$1(transaction, signature);
}
const serializers = {
  transaction: serializeTransaction
};
function serializeTransactionCIP64(transaction, signature) {
  assertTransactionCIP64(transaction);
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, feeCurrency, data } = transaction;
  const serializedTransaction = [
    toHex$3(chainId),
    nonce ? toHex$3(nonce) : "0x",
    maxPriorityFeePerGas ? toHex$3(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex$3(maxFeePerGas) : "0x",
    gas ? toHex$3(gas) : "0x",
    to ?? "0x",
    value ? toHex$3(value) : "0x",
    data ?? "0x",
    serializeAccessList(accessList),
    feeCurrency,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x7b",
    toRlp(serializedTransaction)
  ]);
}
const MAX_MAX_FEE_PER_GAS = maxUint256$1;
function assertTransactionCIP64(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to, feeCurrency } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError$1({ address: to });
  if (gasPrice)
    throw new BaseError$1("`gasPrice` is not a valid CIP-64 Transaction attribute.");
  if (isPresent(maxFeePerGas) && maxFeePerGas > MAX_MAX_FEE_PER_GAS)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (isPresent(maxPriorityFeePerGas) && isPresent(maxFeePerGas) && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  if (isPresent(feeCurrency) && !isAddress(feeCurrency)) {
    throw new BaseError$1("`feeCurrency` MUST be a token address for CIP-64 transactions.");
  }
  if (isEmpty(feeCurrency)) {
    throw new BaseError$1("`feeCurrency` must be provided for CIP-64 transactions.");
  }
}
const chainConfig = {
  blockTime: 1e3,
  contracts,
  formatters,
  serializers,
  fees
};
const celo = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 42220,
  name: "Celo",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO"
  },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] }
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://celoscan.io",
      apiUrl: "https://api.celoscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 13112599
    }
  },
  testnet: false
});
const mainnet = /* @__PURE__ */ defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockTime: 12e3,
  rpcUrls: {
    default: {
      http: ["https://eth.merkle.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensUniversalResolver: {
      address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
      blockCreated: 23085558
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});
const sourceId$1 = 1;
const optimism = /* @__PURE__ */ defineChain({
  ...chainConfig$1,
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io",
      apiUrl: "https://api-optimistic.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig$1.contracts,
    disputeGameFactory: {
      [sourceId$1]: {
        address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9"
      }
    },
    l2OutputOracle: {
      [sourceId$1]: {
        address: "0xdfe97868233d1aa22e815a266982f2cf17685a27"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4286263
    },
    portal: {
      [sourceId$1]: {
        address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed"
      }
    },
    l1StandardBridge: {
      [sourceId$1]: {
        address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
      }
    }
  },
  sourceId: sourceId$1
});
const sourceId = 11155111;
const optimismSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig$1,
  id: 11155420,
  name: "OP Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://optimism-sepolia.blockscout.com",
      apiUrl: "https://optimism-sepolia.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig$1.contracts,
    disputeGameFactory: {
      [sourceId]: {
        address: "0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1"
      }
    },
    l2OutputOracle: {
      [sourceId]: {
        address: "0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    },
    portal: {
      [sourceId]: {
        address: "0x16Fc5058F25648194471939df75CF27A2fdC48BC"
      }
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1"
      }
    }
  },
  testnet: true,
  sourceId
});
const polygon = /* @__PURE__ */ defineChain({
  id: 137,
  name: "Polygon",
  blockTime: 2e3,
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.etherscan.io/v2/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  }
});
const sepolia = /* @__PURE__ */ defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://11155111.rpc.thirdweb.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532
    },
    ensUniversalResolver: {
      address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
      blockCreated: 8928790
    }
  },
  testnet: true
});
const chains = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  bsc,
  celo,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  sepolia
}, Symbol.toStringTag, { value: "Module" }));
const all = [
  base,
  ...Object.values(chains).filter((c) => c.id !== base.id)
];
const anvil = anvil$1;
/* @__PURE__ */ defineChain({
  ...anvil,
  id: 31338
});
/* @__PURE__ */ defineChain({
  ...anvil,
  id: 31339
});
function parse(response, options = {}) {
  const { raw = false } = options;
  const response_ = response;
  if (raw)
    return response;
  if (response_.error)
    throw parseError$1(response_.error);
  return response_.result;
}
function parseError$1(error) {
  const error_ = error;
  if (error_ instanceof Error && !("code" in error_))
    return new InternalError({
      cause: error_,
      data: error_,
      message: error_.message,
      stack: error_.stack
    });
  const { code } = error_;
  if (code === InternalError.code)
    return new InternalError(error_);
  if (code === InvalidInputError$1.code)
    return new InvalidInputError$1(error_);
  if (code === InvalidParamsError.code)
    return new InvalidParamsError(error_);
  if (code === InvalidRequestError.code)
    return new InvalidRequestError(error_);
  if (code === LimitExceededError.code)
    return new LimitExceededError(error_);
  if (code === MethodNotFoundError.code)
    return new MethodNotFoundError(error_);
  if (code === MethodNotSupportedError.code)
    return new MethodNotSupportedError(error_);
  if (code === ParseError.code)
    return new ParseError(error_);
  if (code === ResourceNotFoundError.code)
    return new ResourceNotFoundError(error_);
  if (code === ResourceUnavailableError.code)
    return new ResourceUnavailableError(error_);
  if (code === TransactionRejectedError.code)
    return new TransactionRejectedError(error_);
  if (code === VersionNotSupportedError.code)
    return new VersionNotSupportedError(error_);
  return new InternalError({
    cause: error_ instanceof Error ? error_ : void 0,
    data: error_,
    message: error_.message,
    stack: error_ instanceof Error ? error_.stack : void 0
  });
}
class BaseError extends Error {
  constructor(errorObject) {
    const { cause, code, message, data, stack } = errorObject;
    super(message, { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.BaseError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "stack", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
    this.code = code;
    this.data = data;
    this.stack = stack ?? "";
  }
}
let InvalidInputError$1 = class InvalidInputError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: InvalidInputError.code,
      data: parameters.data,
      message: parameters.message ?? "Missing or invalid parameters."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32e3
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.InvalidInputError"
    });
  }
};
Object.defineProperty(InvalidInputError$1, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32e3
});
class ResourceNotFoundError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: ResourceNotFoundError.code,
      data: parameters.data,
      message: parameters.message ?? "Requested resource not found."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32001
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.ResourceNotFoundError"
    });
  }
}
Object.defineProperty(ResourceNotFoundError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32001
});
class ResourceUnavailableError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: ResourceUnavailableError.code,
      data: parameters.data,
      message: parameters.message ?? "Requested resource not available."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32002
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.ResourceUnavailableError"
    });
  }
}
Object.defineProperty(ResourceUnavailableError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32002
});
class TransactionRejectedError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: TransactionRejectedError.code,
      data: parameters.data,
      message: parameters.message ?? "Transaction creation failed."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32003
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.TransactionRejectedError"
    });
  }
}
Object.defineProperty(TransactionRejectedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32003
});
class MethodNotSupportedError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: MethodNotSupportedError.code,
      data: parameters.data,
      message: parameters.message ?? "Method is not implemented."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32004
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.MethodNotSupportedError"
    });
  }
}
Object.defineProperty(MethodNotSupportedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32004
});
class LimitExceededError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: LimitExceededError.code,
      data: parameters.data,
      message: parameters.message ?? "Rate limit exceeded."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32005
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.LimitExceededError"
    });
  }
}
Object.defineProperty(LimitExceededError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32005
});
class VersionNotSupportedError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: VersionNotSupportedError.code,
      data: parameters.data,
      message: parameters.message ?? "JSON-RPC version not supported."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32006
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.VersionNotSupportedError"
    });
  }
}
Object.defineProperty(VersionNotSupportedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32006
});
class InvalidRequestError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: InvalidRequestError.code,
      data: parameters.data,
      message: parameters.message ?? "Input is not a valid JSON-RPC request."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32600
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.InvalidRequestError"
    });
  }
}
Object.defineProperty(InvalidRequestError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32600
});
class MethodNotFoundError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: MethodNotFoundError.code,
      data: parameters.data,
      message: parameters.message ?? "Method does not exist."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32601
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.MethodNotFoundError"
    });
  }
}
Object.defineProperty(MethodNotFoundError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32601
});
class InvalidParamsError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: InvalidParamsError.code,
      data: parameters.data,
      message: parameters.message ?? "Invalid method parameters."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32602
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.InvalidParamsError"
    });
  }
}
Object.defineProperty(InvalidParamsError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32602
});
class InternalError extends BaseError {
  constructor(parameters = {}) {
    super({
      cause: parameters.cause,
      code: InternalError.code,
      data: parameters.data,
      message: parameters.message ?? "Internal JSON-RPC error.",
      stack: parameters.stack
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32603
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.InternalError"
    });
  }
}
Object.defineProperty(InternalError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32603
});
class ParseError extends BaseError {
  constructor(parameters = {}) {
    super({
      code: ParseError.code,
      data: parameters.data,
      message: parameters.message ?? "Failed to parse JSON-RPC response."
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32700
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcResponse.ParseError"
    });
  }
}
Object.defineProperty(ParseError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32700
});
class ProviderRpcError extends Error {
  constructor(code, message) {
    super(message);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderRpcError"
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.code = code;
    this.details = message;
  }
}
class UserRejectedRequestError extends ProviderRpcError {
  constructor({ message = "The user rejected the request." } = {}) {
    super(4001, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4001
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.UserRejectedRequestError"
    });
  }
}
Object.defineProperty(UserRejectedRequestError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 4001
});
class UnauthorizedError extends ProviderRpcError {
  constructor({ message = "The requested method and/or account has not been authorized by the user." } = {}) {
    super(4100, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4100
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.UnauthorizedError"
    });
  }
}
Object.defineProperty(UnauthorizedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 4100
});
class UnsupportedMethodError extends ProviderRpcError {
  constructor({ message = "The provider does not support the requested method." } = {}) {
    super(4200, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4200
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.UnsupportedMethodError"
    });
  }
}
Object.defineProperty(UnsupportedMethodError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 4200
});
class DisconnectedError extends ProviderRpcError {
  constructor({ message = "The provider is disconnected from all chains." } = {}) {
    super(4900, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4900
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.DisconnectedError"
    });
  }
}
Object.defineProperty(DisconnectedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 4900
});
class ChainDisconnectedError extends ProviderRpcError {
  constructor({ message = "The provider is not connected to the requested chain." } = {}) {
    super(4901, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4901
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.ChainDisconnectedError"
    });
  }
}
Object.defineProperty(ChainDisconnectedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 4901
});
class SwitchChainError extends ProviderRpcError {
  constructor({ message = "An error occurred when attempting to switch chain." } = {}) {
    super(4902, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4902
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.SwitchChainError"
    });
  }
}
Object.defineProperty(SwitchChainError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 4902
});
class UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
  constructor({ message = "This Wallet does not support a capability that was not marked as optional." } = {}) {
    super(5700, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5700
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.UnsupportedNonOptionalCapabilityError"
    });
  }
}
Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5700
});
class UnsupportedChainIdError extends ProviderRpcError {
  constructor({ message = "This Wallet does not support the requested chain ID." } = {}) {
    super(5710, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5710
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.UnsupportedChainIdError"
    });
  }
}
Object.defineProperty(UnsupportedChainIdError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5710
});
class DuplicateIdError extends ProviderRpcError {
  constructor({ message = "There is already a bundle submitted with this ID." } = {}) {
    super(5720, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5720
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.DuplicateIdError"
    });
  }
}
Object.defineProperty(DuplicateIdError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5720
});
class UnknownBundleIdError extends ProviderRpcError {
  constructor({ message = "This bundle id is unknown / has not been submitted." } = {}) {
    super(5730, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5730
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.UnknownBundleIdError"
    });
  }
}
Object.defineProperty(UnknownBundleIdError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5730
});
class BundleTooLargeError extends ProviderRpcError {
  constructor({ message = "The call bundle is too large for the Wallet to process." } = {}) {
    super(5740, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5740
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.BundleTooLargeError"
    });
  }
}
Object.defineProperty(BundleTooLargeError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5740
});
class AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
  constructor({ message = "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade." } = {}) {
    super(5750, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5750
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.AtomicReadyWalletRejectedUpgradeError"
    });
  }
}
Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5750
});
class AtomicityNotSupportedError extends ProviderRpcError {
  constructor({ message = "The wallet does not support atomic execution but the request requires it." } = {}) {
    super(5760, message);
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5760
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.AtomicityNotSupportedError"
    });
  }
}
Object.defineProperty(AtomicityNotSupportedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 5760
});
function createEmitter() {
  const emitter = new EventEmitter();
  return {
    get eventNames() {
      return emitter.eventNames.bind(emitter);
    },
    get listenerCount() {
      return emitter.listenerCount.bind(emitter);
    },
    get listeners() {
      return emitter.listeners.bind(emitter);
    },
    addListener: emitter.addListener.bind(emitter),
    emit: emitter.emit.bind(emitter),
    off: emitter.off.bind(emitter),
    on: emitter.on.bind(emitter),
    once: emitter.once.bind(emitter),
    removeAllListeners: emitter.removeAllListeners.bind(emitter),
    removeListener: emitter.removeListener.bind(emitter)
  };
}
function from$i(provider, _options = {}) {
  if (!provider)
    throw new IsUndefinedError();
  return {
    ...provider,
    async request(args) {
      try {
        const result = await provider.request(args);
        if (result && typeof result === "object" && "jsonrpc" in result)
          return parse(result);
        return result;
      } catch (error) {
        throw parseError(error);
      }
    }
  };
}
function parseError(error) {
  const error_ = parseError$1(error);
  if (error_ instanceof InternalError) {
    if (!error_.data)
      return error_;
    const { code } = error_.data;
    if (code === DisconnectedError.code)
      return new DisconnectedError(error_);
    if (code === ChainDisconnectedError.code)
      return new ChainDisconnectedError(error_);
    if (code === UserRejectedRequestError.code)
      return new UserRejectedRequestError(error_);
    if (code === UnauthorizedError.code)
      return new UnauthorizedError(error_);
    if (code === UnsupportedMethodError.code)
      return new UnsupportedMethodError(error_);
    if (code === SwitchChainError.code)
      return new SwitchChainError(error_);
    if (code === AtomicReadyWalletRejectedUpgradeError.code)
      return new AtomicReadyWalletRejectedUpgradeError(error_);
    if (code === AtomicityNotSupportedError.code)
      return new AtomicityNotSupportedError(error_);
    if (code === BundleTooLargeError.code)
      return new BundleTooLargeError(error_);
    if (code === UnknownBundleIdError.code)
      return new UnknownBundleIdError(error_);
    if (code === DuplicateIdError.code)
      return new DuplicateIdError(error_);
    if (code === UnsupportedChainIdError.code)
      return new UnsupportedChainIdError(error_);
    if (code === UnsupportedNonOptionalCapabilityError.code)
      return new UnsupportedNonOptionalCapabilityError(error_);
  }
  return error_;
}
class IsUndefinedError extends BaseError$2 {
  constructor() {
    super("`provider` is undefined.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Provider.IsUndefinedError"
    });
  }
}
const supported = () => "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in IntersectionObserverEntry.prototype && "isVisible" in IntersectionObserverEntry.prototype;
function create$2(options = {}) {
  const { prefix = "[Porto]" } = options;
  const memo = /* @__PURE__ */ new Set();
  return {
    error: createLogFn(console.error, { prefix }),
    errorOnce: createLogFn(console.error, { memo, prefix }),
    log: createLogFn(console.log, { prefix }),
    logOnce: createLogFn(console.log, { memo, prefix }),
    warn: createLogFn(console.warn, { prefix }),
    warnOnce: createLogFn(console.warn, { memo, prefix })
  };
}
const logger = create$2();
function createLogFn(fn, options = {}) {
  const { memo, prefix } = options;
  return (...messages) => {
    const message = messages.join(" ");
    if (memo == null ? void 0 : memo.has(message))
      return;
    memo == null ? void 0 : memo.add(message);
    fn(`${prefix} ${message}`);
  };
}
function isSafari() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("chrome");
}
function isFirefox() {
  const ua = navigator.userAgent.toLowerCase();
  return (ua.includes("firefox") || ua.includes("fxios")) && !ua.includes("seamonkey");
}
function isMobile() {
  var _a, _b;
  if ((_b = (_a = window.navigator) == null ? void 0 : _a.userAgentData) == null ? void 0 : _b.mobile)
    return true;
  return (
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent#alternatives_to_ua_sniffing
    navigator.maxTouchPoints > 1 || /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.slice(0, 4))
  );
}
function withResolvers() {
  let resolve = () => void 0;
  let reject = () => void 0;
  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });
  return { promise, reject, resolve };
}
function normalizeValue(value) {
  if (Array.isArray(value))
    return value.map(normalizeValue);
  if (typeof value === "function")
    return void 0;
  if (typeof value !== "object" || value === null)
    return value;
  if (Object.getPrototypeOf(value) !== Object.prototype)
    try {
      return structuredClone(value);
    } catch {
      return void 0;
    }
  const normalized = {};
  for (const [k, v] of Object.entries(value))
    normalized[k] = normalizeValue(v);
  return normalized;
}
function uniqBy(data, fn) {
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  for (const item of data) {
    const key = fn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}
function uuidv4() {
  if (typeof globalThis !== "undefined" && "crypto" in globalThis)
    return globalThis.crypto.randomUUID();
  return crypto.randomUUID();
}
function from$h(messenger) {
  return messenger;
}
function fromWindow(w, options = {}) {
  const { targetOrigin } = options;
  const listeners = /* @__PURE__ */ new Map();
  return from$h({
    destroy() {
      for (const listener of listeners.values()) {
        w.removeEventListener("message", listener);
      }
    },
    on(topic, listener, id) {
      function handler(event) {
        if (event.data.topic !== topic)
          return;
        if (id && event.data.id !== id)
          return;
        if (targetOrigin && event.origin !== targetOrigin)
          return;
        listener(event.data.payload, event);
      }
      w.addEventListener("message", handler);
      listeners.set(topic, handler);
      return () => w.removeEventListener("message", handler);
    },
    async send(topic, payload, target) {
      const id = uuidv4();
      w.postMessage(normalizeValue({ id, payload, topic }), target ?? targetOrigin ?? "*");
      return { id, payload, topic };
    },
    async sendAsync(topic, payload, target) {
      const { id } = await this.send(topic, payload, target);
      return new Promise((resolve) => this.on(topic, resolve, id));
    }
  });
}
function bridge(parameters) {
  const { from: from_, to, waitForReady = false } = parameters;
  let pending = false;
  const ready = withResolvers();
  from_.on("ready", ready.resolve);
  const messenger = from$h({
    destroy() {
      from_.destroy();
      to.destroy();
      if (pending)
        ready.reject();
    },
    on(topic, listener, id) {
      return from_.on(topic, listener, id);
    },
    async send(topic, payload) {
      pending = true;
      if (waitForReady)
        await ready.promise.finally(() => pending = false);
      return to.send(topic, payload);
    },
    async sendAsync(topic, payload) {
      pending = true;
      if (waitForReady)
        await ready.promise.finally(() => pending = false);
      return to.sendAsync(topic, payload);
    }
  });
  return {
    ...messenger,
    ready(options) {
      void messenger.send("ready", options);
    },
    waitForReady() {
      return ready.promise;
    }
  };
}
const hostUrls = {
  prod: "https://id.porto.sh/dialog"
};
function from$g(dialog2) {
  return dialog2;
}
function iframe(options = {}) {
  const { skipProtocolCheck, skipUnsupported } = options;
  const includesUnsupported = (requests) => !skipUnsupported && isSafari() && (requests == null ? void 0 : requests.some((x) => ["wallet_connect", "eth_requestAccounts"].includes(x.method)));
  if (typeof window === "undefined")
    return noop();
  return from$g({
    name: "iframe",
    setup(parameters) {
      const { host, internal, theme, themeController } = parameters;
      const { store } = internal;
      const fallback2 = popup().setup(parameters);
      let open = false;
      const hostUrl = new URL(host);
      const root = document.createElement("dialog");
      root.dataset.porto = "";
      root.setAttribute("role", "dialog");
      root.setAttribute("aria-closed", "true");
      root.setAttribute("aria-label", "Porto Wallet");
      root.setAttribute("hidden", "until-found");
      Object.assign(root.style, {
        background: "transparent",
        border: "0",
        outline: "0",
        padding: "0",
        position: "fixed"
      });
      document.body.appendChild(root);
      const iframe2 = document.createElement("iframe");
      iframe2.setAttribute("data-testid", "porto");
      const iframeAllow = [
        `publickey-credentials-get ${hostUrl.origin}`,
        `publickey-credentials-create ${hostUrl.origin}`
      ];
      if (!isFirefox())
        iframeAllow.push("clipboard-write");
      iframe2.setAttribute("allow", iframeAllow.join("; "));
      iframe2.setAttribute("tabindex", "0");
      iframe2.setAttribute("sandbox", "allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox");
      iframe2.setAttribute("src", getDialogUrl(host));
      iframe2.setAttribute("title", "Porto");
      Object.assign(iframe2.style, {
        backgroundColor: "transparent",
        border: "0",
        colorScheme: "light dark",
        height: "100%",
        left: "0",
        position: "fixed",
        top: "0",
        width: "100%"
      });
      const style = document.createElement("style");
      style.innerHTML = `
        dialog[data-porto]::backdrop {
          background: transparent!important;
        }
      `;
      root.appendChild(style);
      root.appendChild(iframe2);
      const messenger = bridge({
        from: fromWindow(window, { targetOrigin: hostUrl.origin }),
        to: fromWindow(iframe2.contentWindow, {
          targetOrigin: hostUrl.origin
        }),
        waitForReady: true
      });
      themeController == null ? void 0 : themeController._setup(messenger, true);
      const drawerModeQuery = window.matchMedia("(max-width: 460px)");
      const onDrawerModeChange = () => {
        messenger.send("__internal", {
          type: "resize",
          // 460 = drawer mode, 461 = floating mode
          width: drawerModeQuery.matches ? 460 : 461
        });
      };
      drawerModeQuery.addEventListener("change", onDrawerModeChange);
      messenger.on("ready", (options2) => {
        const chainIds = parameters.internal.store.getState().chainIds;
        let compatibleChainIds = chainIds.filter((id) => options2.chainIds.includes(id));
        if (compatibleChainIds.length === 0)
          compatibleChainIds = options2.chainIds;
        store.setState((x) => ({
          ...x,
          chainIds: compatibleChainIds
        }));
        messenger.send("__internal", {
          chainIds: compatibleChainIds,
          mode: "iframe",
          referrer: getReferrer(),
          theme,
          type: "init"
        });
        onDrawerModeChange();
      });
      messenger.on("rpc-response", (response) => {
        if (includesUnsupported([response._request])) {
          const src = iframe2.src;
          iframe2.src = src;
        }
        handleResponse(store, response);
      });
      messenger.on("__internal", (payload) => {
        if (payload.type === "switch" && payload.mode === "popup") {
          fallback2.open();
          fallback2.syncRequests(store.getState().requestQueue);
        }
      });
      let bodyStyle = null;
      let opener = null;
      const onBlur = () => handleBlur(store);
      const onEscape = (event) => {
        if (event.key === "Escape")
          handleBlur(store);
      };
      const inertObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "attributes")
            continue;
          const name = mutation.attributeName;
          if (!name)
            continue;
          if (name !== "inert")
            continue;
          root.removeAttribute(name);
        }
      });
      inertObserver.observe(root, {
        attributeOldValue: true,
        attributes: true
      });
      let dialogActive = false;
      const activatePage = () => {
        if (!dialogActive)
          return;
        dialogActive = false;
        root.removeEventListener("click", onBlur);
        document.removeEventListener("keydown", onEscape);
        root.style.pointerEvents = "none";
        opener == null ? void 0 : opener.focus();
        opener = null;
        Object.assign(document.body.style, bodyStyle ?? "");
        document.body.style.overflow = (bodyStyle == null ? void 0 : bodyStyle.overflow) ?? "";
      };
      const activateDialog = () => {
        if (dialogActive)
          return;
        dialogActive = true;
        root.addEventListener("click", onBlur);
        document.addEventListener("keydown", onEscape);
        iframe2.focus();
        root.style.pointerEvents = "auto";
        bodyStyle = Object.assign({}, document.body.style);
        document.body.style.overflow = "hidden";
      };
      let visible = false;
      const showDialog = () => {
        if (visible)
          return;
        visible = true;
        if (document.activeElement instanceof HTMLElement)
          opener = document.activeElement;
        root.removeAttribute("hidden");
        root.removeAttribute("aria-closed");
        root.showModal();
      };
      const hideDialog = () => {
        if (!visible)
          return;
        visible = false;
        root.setAttribute("hidden", "true");
        root.setAttribute("aria-closed", "true");
        root.close();
        for (const sibling of root.parentNode ? Array.from(root.parentNode.children) : []) {
          if (sibling === root)
            continue;
          if (!sibling.hasAttribute("inert"))
            continue;
          sibling.removeAttribute("inert");
        }
      };
      return {
        close() {
          fallback2.close();
          open = false;
          messenger.send("__internal", {
            mode: "iframe",
            referrer: getReferrer(),
            type: "init"
          });
          hideDialog();
          activatePage();
        },
        destroy() {
          fallback2.close();
          open = false;
          activatePage();
          hideDialog();
          fallback2.destroy();
          messenger.destroy();
          root.remove();
          inertObserver.disconnect();
          drawerModeQuery.removeEventListener("change", onDrawerModeChange);
        },
        open() {
          if (open)
            return;
          open = true;
          showDialog();
          activateDialog();
          messenger.send("__internal", {
            mode: "iframe",
            referrer: getReferrer(),
            type: "init"
          });
        },
        async secure() {
          const { trustedHosts } = await messenger.waitForReady();
          const secureProtocol = (() => {
            if (skipProtocolCheck)
              return true;
            const secure = window.location.protocol.startsWith("https");
            if (!secure)
              logger.warnOnce("Detected insecure protocol (HTTP).", `

The Porto iframe is not supported on HTTP origins (${window.location.origin})`, "due to lack of WebAuthn support.", "See https://porto.sh/sdk#secure-origins-https for more information.");
            return secure;
          })();
          const intersectionObserverSupported = supported();
          const trustedHost = Boolean(trustedHosts == null ? void 0 : trustedHosts.includes(window.location.hostname));
          const secureFrame = Boolean(intersectionObserverSupported || trustedHost);
          if (!secureFrame)
            logger.warnOnce([
              `Warning: Browser does not support IntersectionObserver v2 or host "${hostUrl.hostname}" is not trusted by Porto.`,
              "This may result in the dialog falling back to a popup.",
              "",
              `Add "${hostUrl.hostname}" to the trusted hosts list to enable iframe dialog: https://github.com/ithacaxyz/porto/edit/main/src/trusted-hosts.ts`
            ].join("\n"));
          return {
            frame: secureFrame,
            host: trustedHost,
            protocol: secureProtocol
          };
        },
        async syncRequests(requests) {
          const { methodPolicies } = await messenger.waitForReady();
          const secure = await this.secure();
          const headless = requests == null ? void 0 : requests.every((request) => {
            var _a, _b;
            return ((_b = (_a = methodPolicies == null ? void 0 : methodPolicies.find((policy) => policy.method === request.request.method)) == null ? void 0 : _a.modes) == null ? void 0 : _b.headless) === true;
          });
          const unsupported = includesUnsupported(requests.map((x) => x.request));
          if (!headless && (unsupported || !secure.protocol || !secure.frame))
            fallback2.syncRequests(requests);
          else {
            const requiresConfirm = requests.some((x) => requiresConfirmation(x.request, {
              methodPolicies,
              targetOrigin: hostUrl.origin
            }));
            if (!open && requiresConfirm)
              this.open();
            messenger.send("rpc-requests", requests);
          }
        }
      };
    },
    supportsHeadless: true
  });
}
function popup(options = {}) {
  if (typeof window === "undefined")
    return noop();
  const { type = "auto", size: size2 = defaultSize } = options;
  return from$g({
    name: "popup",
    setup(parameters) {
      const { host, internal, themeController } = parameters;
      const { store } = internal;
      const hostUrl = new URL(host);
      let popup2 = null;
      const resolvedType = type === "page" || type === "auto" && isMobile() ? "page" : "popup";
      function onBlur() {
        if (popup2)
          handleBlur(store);
      }
      const offDetectClosed = (() => {
        const timer = setInterval(() => {
          if (popup2 == null ? void 0 : popup2.closed)
            handleBlur(store);
        }, 100);
        return () => clearInterval(timer);
      })();
      let messenger;
      themeController == null ? void 0 : themeController._setup(null, true);
      return {
        close() {
          if (!popup2)
            return;
          popup2.close();
          popup2 = null;
        },
        destroy() {
          this.close();
          window.removeEventListener("focus", onBlur);
          messenger == null ? void 0 : messenger.destroy();
          offDetectClosed();
        },
        open() {
          if (resolvedType === "popup") {
            const left = (window.innerWidth - size2.width) / 2 + window.screenX;
            const top = window.screenY + 100;
            popup2 = window.open(getDialogUrl(host), "_blank", `width=${size2.width},height=${size2.height},left=${left},top=${top}`);
          } else {
            popup2 = window.open(getDialogUrl(host), "_blank");
          }
          if (!popup2)
            throw new Error("Failed to open popup");
          messenger = bridge({
            from: fromWindow(window, {
              targetOrigin: hostUrl.origin
            }),
            to: fromWindow(popup2, {
              targetOrigin: hostUrl.origin
            }),
            waitForReady: true
          });
          themeController == null ? void 0 : themeController._setup(messenger, false);
          messenger.send("__internal", {
            mode: resolvedType === "page" ? "page" : "popup",
            referrer: getReferrer(),
            theme: (themeController == null ? void 0 : themeController.getTheme()) ?? parameters.theme,
            type: "init"
          });
          messenger.on("rpc-response", (response) => handleResponse(store, response));
          window.removeEventListener("focus", onBlur);
          window.addEventListener("focus", onBlur);
        },
        async secure() {
          return {
            frame: true,
            host: true,
            protocol: true
          };
        },
        async syncRequests(requests) {
          const requiresConfirm = requests.some((x) => requiresConfirmation(x.request));
          if (requiresConfirm) {
            if (!popup2 || popup2.closed)
              this.open();
            popup2 == null ? void 0 : popup2.focus();
          }
          messenger == null ? void 0 : messenger.send("rpc-requests", requests);
        }
      };
    },
    supportsHeadless: false
  });
}
function noop() {
  return from$g({
    name: "noop",
    setup() {
      return {
        close() {
        },
        destroy() {
        },
        open() {
        },
        async secure() {
          return {
            frame: true,
            host: true,
            protocol: true
          };
        },
        async syncRequests() {
        }
      };
    },
    supportsHeadless: true
  });
}
const defaultSize = { height: 282, width: 360 };
function requiresConfirmation(request, options = {}) {
  var _a;
  const { methodPolicies, targetOrigin } = options;
  const policy = methodPolicies == null ? void 0 : methodPolicies.find((x) => x.method === request.method);
  if (!policy)
    return true;
  if ((_a = policy.modes) == null ? void 0 : _a.headless) {
    if (typeof policy.modes.headless === "object" && policy.modes.headless.sameOrigin && targetOrigin !== window.location.origin)
      return true;
    return false;
  }
  return true;
}
function getReferrer() {
  const icon = (() => {
    var _a, _b, _c;
    const dark = (_a = document.querySelector('link[rel="icon"][media="(prefers-color-scheme: dark)"]')) == null ? void 0 : _a.href;
    const light = ((_b = document.querySelector('link[rel="icon"][media="(prefers-color-scheme: light)"]')) == null ? void 0 : _b.href) ?? ((_c = document.querySelector('link[rel="icon"]')) == null ? void 0 : _c.href);
    if (dark && light && dark !== light)
      return { dark, light };
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark)
      return dark;
    return light;
  })();
  return {
    icon,
    title: document.title
  };
}
function handleBlur(store) {
  store.setState((x) => ({
    ...x,
    requestQueue: x.requestQueue.map((x2) => ({
      account: x2.account,
      error: new UserRejectedRequestError(),
      request: x2.request,
      status: "error"
    }))
  }));
}
function handleResponse(store, response) {
  store.setState((x) => ({
    ...x,
    requestQueue: x.requestQueue.map((queued) => {
      if (queued.request.id !== response.id)
        return queued;
      if (response.error)
        return {
          account: queued.account,
          error: response.error,
          request: queued.request,
          status: "error"
        };
      return {
        account: queued.account,
        request: queued.request,
        result: response.result,
        status: "success"
      };
    })
  }));
}
function getDialogUrl(host) {
  const url = new URL(host);
  const parentParams = new URLSearchParams(window.location.search);
  const prefix = "porto.";
  for (const [key, value] of parentParams.entries()) {
    if (key.startsWith(prefix))
      url.searchParams.set(key.slice(prefix.length), value);
  }
  return url.toString();
}
function assertSize(bytes, size_) {
  if (size(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size(bytes),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad(bytes, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
const encoder$1 = /* @__PURE__ */ new TextEncoder();
function assert$5(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError(value);
}
function from$f(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex$4(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex$4(value, options = {}) {
  const { size: size2 } = options;
  let hex = value;
  if (size2) {
    assertSize$1(value, size2);
    hex = padRight$1(value, size2);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError$2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft << 4 | nibbleRight;
  }
  return bytes;
}
function fromString(value, options = {}) {
  const { size: size2 } = options;
  const bytes = encoder$1.encode(value);
  if (typeof size2 === "number") {
    assertSize(bytes, size2);
    return padRight(bytes, size2);
  }
  return bytes;
}
function padRight(value, size2) {
  return pad(value, { dir: "right", size: size2 });
}
function size(value) {
  return value.length;
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = value.slice(start, end);
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function toBigInt(bytes, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize(bytes, size2);
  const hex = fromBytes$3(bytes, options);
  return toBigInt$1(hex, options);
}
function toHex$2(value, options = {}) {
  return fromBytes$3(value, options);
}
function validate$2(value) {
  try {
    assert$5(value);
    return true;
  } catch {
    return false;
  }
}
class InvalidBytesTypeError extends BaseError$2 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
}
class SizeOverflowError extends BaseError$2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
}
class SliceOffsetOutOfBoundsError extends BaseError$2 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SliceOffsetOutOfBoundsError"
    });
  }
}
class SizeExceedsPaddingSizeError extends BaseError$2 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
}
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
}
const caches = {
  checksum: /* @__PURE__ */ new LruMap(8192)
};
const checksum$1 = caches.checksum;
function keccak256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from$f(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes$3(bytes);
}
function sha256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = sha256$1(from$f(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes$3(bytes);
}
function assert$4(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x, y } = publicKey;
  if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidUncompressedPrefixError()
      });
    return;
  }
  if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidCompressedPrefixError()
      });
    return;
  }
  throw new InvalidError({ publicKey });
}
function from$e(value) {
  const publicKey = (() => {
    if (validate$3(value))
      return fromHex$3(value);
    if (validate$2(value))
      return fromBytes$2(value);
    const { prefix, x, y } = value;
    if (typeof x === "bigint" && typeof y === "bigint")
      return { prefix: prefix ?? 4, x, y };
    return { prefix, x };
  })();
  assert$4(publicKey);
  return publicKey;
}
function fromBytes$2(publicKey) {
  return fromHex$3(fromBytes$3(publicKey));
}
function fromHex$3(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError$1({ publicKey });
  if (publicKey.length === 130) {
    const x2 = BigInt(slice$1(publicKey, 0, 32));
    const y = BigInt(slice$1(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x2,
      y
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice$1(publicKey, 0, 1));
    const x2 = BigInt(slice$1(publicKey, 1, 33));
    const y = BigInt(slice$1(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x2,
      y
    };
  }
  const prefix = Number(slice$1(publicKey, 0, 1));
  const x = BigInt(slice$1(publicKey, 1, 33));
  return {
    prefix,
    x
  };
}
function toHex$1(publicKey, options = {}) {
  assert$4(publicKey);
  const { prefix, x, y } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y === "bigint" ? fromNumber(y, { size: 32 }) : "0x"
  );
  return publicKey_;
}
class InvalidError extends BaseError$2 {
  constructor({ publicKey }) {
    super(`Value \`${stringify(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
}
class InvalidPrefixError extends BaseError$2 {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
}
class InvalidCompressedPrefixError extends BaseError$2 {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
}
class InvalidUncompressedPrefixError extends BaseError$2 {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
}
let InvalidSerializedSizeError$1 = class InvalidSerializedSizeError extends BaseError$2 {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size$1(from$j(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert$3(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError({
      address: value,
      cause: new InvalidInputError2()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum(value) !== value)
      throw new InvalidAddressError({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum(address) {
  if (checksum$1.has(address))
    return checksum$1.get(address);
  assert$3(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash2 = keccak256(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash2[i >> 1] >> 4 >= 8 && characters[i]) {
      characters[i] = characters[i].toUpperCase();
    }
    if ((hash2[i >> 1] & 15) >= 8 && characters[i + 1]) {
      characters[i + 1] = characters[i + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum$1.set(address, result);
  return result;
}
function from$d(address, options = {}) {
  const { checksum: checksumVal = false } = options;
  assert$3(address);
  if (checksumVal)
    return checksum(address);
  return address;
}
function fromPublicKey(publicKey, options = {}) {
  const address = keccak256(`0x${toHex$1(publicKey).slice(4)}`).substring(26);
  return from$d(`0x${address}`, options);
}
function isEqual(addressA, addressB) {
  assert$3(addressA, { strict: false });
  assert$3(addressB, { strict: false });
  return addressA.toLowerCase() === addressB.toLowerCase();
}
function validate$1(address, options = {}) {
  const { strict = true } = options ?? {};
  try {
    assert$3(address, { strict });
    return true;
  } catch {
    return false;
  }
}
class InvalidAddressError extends BaseError$2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
}
class InvalidInputError2 extends BaseError$2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
}
class InvalidChecksumError extends BaseError$2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
}
let extraEntropy = false;
function getPublicKey$1(options) {
  const { privateKey } = options;
  const point = secp256k1.ProjectivePoint.fromPrivateKey(from$j(privateKey).slice(2));
  return from$e(point);
}
function randomPrivateKey$1(options = {}) {
  const { as = "Hex" } = options;
  const bytes = secp256k1.utils.randomPrivateKey();
  if (as === "Hex")
    return fromBytes$3(bytes);
  return bytes;
}
function recoverAddress(options) {
  return fromPublicKey(recoverPublicKey(options));
}
function recoverPublicKey(options) {
  const { payload, signature } = options;
  const { r, s, yParity } = signature;
  const signature_ = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
  const point = signature_.recoverPublicKey(from$j(payload).substring(2));
  return from$e(point);
}
function sign$5(options) {
  const { extraEntropy: extraEntropy$1 = extraEntropy, hash: hash2, payload, privateKey } = options;
  const { r, s, recovery } = secp256k1.sign(from$f(payload), from$f(privateKey), {
    extraEntropy: typeof extraEntropy$1 === "boolean" ? extraEntropy$1 : from$j(extraEntropy$1).slice(2),
    lowS: true,
    ...hash2 ? { prehash: true } : {}
  });
  return {
    r,
    s,
    yParity: recovery
  };
}
const arrayRegex = /^(.*)\[([0-9]*)\]$/;
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
const integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
const maxUint256 = 2n ** 256n - 1n;
function assert$2(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError({ signature });
  if (signature.r < 0n || signature.r > maxUint256)
    throw new InvalidRError({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256)
    throw new InvalidSError({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError({ value: signature.yParity });
}
function fromBytes$1(signature) {
  return fromHex$2(fromBytes$3(signature));
}
function fromHex$2(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError2({ signature });
  const r = BigInt(slice$1(signature, 0, 32));
  const s = BigInt(slice$1(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r,
      s
    };
  return {
    r,
    s,
    yParity
  };
}
function extract(value) {
  if (typeof value.r === "undefined")
    return void 0;
  if (typeof value.s === "undefined")
    return void 0;
  return from$c(value);
}
function from$c(signature) {
  const signature_ = (() => {
    if (typeof signature === "string")
      return fromHex$2(signature);
    if (signature instanceof Uint8Array)
      return fromBytes$1(signature);
    if (typeof signature.r === "string")
      return fromRpc(signature);
    if (signature.v)
      return fromLegacy(signature);
    return {
      r: signature.r,
      s: signature.s,
      ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
    };
  })();
  assert$2(signature_);
  return signature_;
}
function fromLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity(signature.v)
  };
}
function fromRpc(signature) {
  const yParity = (() => {
    const v = signature.v ? Number(signature.v) : void 0;
    let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
    if (typeof v === "number" && typeof yParity2 !== "number")
      yParity2 = vToYParity(v);
    if (typeof yParity2 !== "number")
      throw new InvalidYParityError({ value: signature.yParity });
    return yParity2;
  })();
  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity
  };
}
function toHex(signature) {
  assert$2(signature);
  const r = signature.r;
  const s = signature.s;
  const signature_ = concat(
    fromNumber(r, { size: 32 }),
    fromNumber(s, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === "number" ? fromNumber(yParityToV(signature.yParity), { size: 1 }) : "0x"
  );
  return signature_;
}
function toTuple$1(signature) {
  const { r, s, yParity } = signature;
  return [
    yParity ? "0x01" : "0x",
    r === 0n ? "0x" : trimLeft(fromNumber(r)),
    s === 0n ? "0x" : trimLeft(fromNumber(s))
  ];
}
function vToYParity(v) {
  if (v === 0 || v === 27)
    return 0;
  if (v === 1 || v === 28)
    return 1;
  if (v >= 35)
    return v % 2 === 0 ? 1 : 0;
  throw new InvalidVError({ value: v });
}
function yParityToV(yParity) {
  if (yParity === 0)
    return 27;
  if (yParity === 1)
    return 28;
  throw new InvalidYParityError({ value: yParity });
}
class InvalidSerializedSizeError2 extends BaseError$2 {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size$1(from$j(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
}
class MissingPropertiesError extends BaseError$2 {
  constructor({ signature }) {
    super(`Signature \`${stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
}
class InvalidRError extends BaseError$2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
}
class InvalidSError extends BaseError$2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
}
class InvalidYParityError extends BaseError$2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
}
class InvalidVError extends BaseError$2 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
}
function prepareParameters({ checksumAddress, parameters, values }) {
  const preparedParameters = [];
  for (let i = 0; i < parameters.length; i++) {
    preparedParameters.push(prepareParameter({
      checksumAddress,
      parameter: parameters[i],
      value: values[i]
    }));
  }
  return preparedParameters;
}
function prepareParameter({ checksumAddress = false, parameter: parameter_, value }) {
  const parameter = parameter_;
  const arrayComponents = getArrayComponents(parameter.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray(value, {
      checksumAddress,
      length,
      parameter: {
        ...parameter,
        type
      }
    });
  }
  if (parameter.type === "tuple") {
    return encodeTuple(value, {
      checksumAddress,
      parameter
    });
  }
  if (parameter.type === "address") {
    return encodeAddress(value, {
      checksum: checksumAddress
    });
  }
  if (parameter.type === "bool") {
    return encodeBoolean(value);
  }
  if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
    const signed = parameter.type.startsWith("int");
    const [, , size2 = "256"] = integerRegex.exec(parameter.type) ?? [];
    return encodeNumber(value, {
      signed,
      size: Number(size2)
    });
  }
  if (parameter.type.startsWith("bytes")) {
    return encodeBytes(value, { type: parameter.type });
  }
  if (parameter.type === "string") {
    return encodeString(value);
  }
  throw new InvalidTypeError(parameter.type);
}
function encode$3(preparedParameters) {
  let staticSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size$1(encoded);
  }
  const staticParameters = [];
  const dynamicParameters = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic) {
      staticParameters.push(fromNumber(staticSize + dynamicSize, { size: 32 }));
      dynamicParameters.push(encoded);
      dynamicSize += size$1(encoded);
    } else {
      staticParameters.push(encoded);
    }
  }
  return concat(...staticParameters, ...dynamicParameters);
}
function encodeAddress(value, options) {
  const { checksum: checksum2 = false } = options;
  assert$3(value, { strict: checksum2 });
  return {
    dynamic: false,
    encoded: padLeft(value.toLowerCase())
  };
}
function encodeArray(value, options) {
  const { checksumAddress, length, parameter } = options;
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError(value);
  if (!dynamic && value.length !== length)
    throw new ArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${parameter.type}[${length}]`
    });
  let dynamicChild = false;
  const preparedParameters = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParameter({
      checksumAddress,
      parameter,
      value: value[i]
    });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParameters.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encode$3(preparedParameters);
    if (dynamic) {
      const length2 = fromNumber(preparedParameters.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParameters.length > 0 ? concat(length2, data) : length2
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concat(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function encodeBytes(value, { type }) {
  const [, parametersize] = type.split("bytes");
  const bytesSize = size$1(value);
  if (!parametersize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padRight$1(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
    return {
      dynamic: true,
      encoded: concat(padLeft(fromNumber(bytesSize, { size: 32 })), value_)
    };
  }
  if (bytesSize !== Number.parseInt(parametersize, 10))
    throw new BytesSizeMismatchError$1({
      expectedSize: Number.parseInt(parametersize, 10),
      value
    });
  return { dynamic: false, encoded: padRight$1(value) };
}
function encodeBoolean(value) {
  if (typeof value !== "boolean")
    throw new BaseError$2(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padLeft(fromBoolean(value)) };
}
function encodeNumber(value, { signed, size: size2 }) {
  if (typeof size2 === "number") {
    const max = 2n ** (BigInt(size2) - (signed ? 1n : 0n)) - 1n;
    const min = signed ? -max - 1n : 0n;
    if (value > max || value < min)
      throw new IntegerOutOfRangeError({
        max: max.toString(),
        min: min.toString(),
        signed,
        size: size2 / 8,
        value: value.toString()
      });
  }
  return {
    dynamic: false,
    encoded: fromNumber(value, {
      size: 32,
      signed
    })
  };
}
function encodeString(value) {
  const hexValue = fromString$1(value);
  const partsLength = Math.ceil(size$1(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padRight$1(slice$1(hexValue, i * 32, (i + 1) * 32)));
  }
  return {
    dynamic: true,
    encoded: concat(padRight$1(fromNumber(size$1(hexValue), { size: 32 })), ...parts)
  };
}
function encodeTuple(value, options) {
  const { checksumAddress, parameter } = options;
  let dynamic = false;
  const preparedParameters = [];
  for (let i = 0; i < parameter.components.length; i++) {
    const param_ = parameter.components[i];
    const index = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParameter({
      checksumAddress,
      parameter: param_,
      value: value[index]
    });
    preparedParameters.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encode$3(preparedParameters) : concat(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}
const staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & 255);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size2) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size2 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function create$1(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
class NegativeOffsetError extends BaseError$2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
}
class PositionOutOfBoundsError extends BaseError$2 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
}
class RecursiveReadLimitExceededError extends BaseError$2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
}
function encode$2(parameters, values, options) {
  const { checksumAddress = false } = {};
  if (parameters.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: parameters.length,
      givenLength: values.length
    });
  const preparedParameters = prepareParameters({
    checksumAddress,
    parameters,
    values
  });
  const data = encode$3(preparedParameters);
  if (data.length === 0)
    return "0x";
  return data;
}
function encodePacked(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const value = values[i];
    data.push(encodePacked.encode(type, value));
  }
  return concat(...data);
}
(function(encodePacked2) {
  function encode2(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert$3(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString$1(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size2 = Number.parseInt(bits, 10) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size2,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex);
    if (bytesMatch) {
      const [_type, size2] = bytesMatch;
      if (Number.parseInt(size2, 10) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError$1({
          expectedSize: Number.parseInt(size2, 10),
          value
        });
      return padRight$1(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i = 0; i < value.length; i++) {
        data.push(encode2(childType, value[i], true));
      }
      if (data.length === 0)
        return "0x";
      return concat(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked2.encode = encode2;
})(encodePacked || (encodePacked = {}));
function from$b(parameters) {
  if (Array.isArray(parameters) && typeof parameters[0] === "string")
    return parseAbiParameters(parameters);
  if (typeof parameters === "string")
    return parseAbiParameters(parameters);
  return parameters;
}
class ArrayLengthMismatchError extends BaseError$2 {
  constructor({ expectedLength, givenLength, type }) {
    super(`Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ArrayLengthMismatchError"
    });
  }
}
let BytesSizeMismatchError$1 = class BytesSizeMismatchError extends BaseError$2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size$1(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
class LengthMismatchError extends BaseError$2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
}
class InvalidArrayError extends BaseError$2 {
  constructor(value) {
    super(`Value \`${value}\` is not a valid array.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidArrayError"
    });
  }
}
class InvalidTypeError extends BaseError$2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
}
function assert$1(value) {
  const { domain, message, primaryType, types } = value;
  const validateData = (struct, data) => {
    for (const param of struct) {
      const { name, type } = param;
      const value2 = data[name];
      const integerMatch = type.match(integerRegex);
      if (integerMatch && (typeof value2 === "number" || typeof value2 === "bigint")) {
        const [, base2, size_] = integerMatch;
        fromNumber(value2, {
          signed: base2 === "int",
          size: Number.parseInt(size_ ?? "", 10) / 8
        });
      }
      if (type === "address" && typeof value2 === "string" && !validate$1(value2))
        throw new InvalidAddressError({
          address: value2,
          cause: new InvalidInputError2()
        });
      const bytesMatch = type.match(bytesRegex);
      if (bytesMatch) {
        const [, size2] = bytesMatch;
        if (size2 && size$1(value2) !== Number.parseInt(size2, 10))
          throw new BytesSizeMismatchError2({
            expectedSize: Number.parseInt(size2, 10),
            givenSize: size$1(value2)
          });
      }
      const struct2 = types[type];
      if (struct2) {
        validateReference(type);
        validateData(struct2, value2);
      }
    }
  };
  if (types.EIP712Domain && domain) {
    if (typeof domain !== "object")
      throw new InvalidDomainError({ domain });
    validateData(types.EIP712Domain, domain);
  }
  if (primaryType !== "EIP712Domain") {
    if (types[primaryType])
      validateData(types[primaryType], message);
    else
      throw new InvalidPrimaryTypeError({ primaryType, types });
  }
}
function encode$1(value) {
  const { domain = {}, message, primaryType } = value;
  const types = {
    EIP712Domain: extractEip712DomainTypes(domain),
    ...value.types
  };
  assert$1({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x19", "0x01"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain")
    parts.push(hashStruct({
      data: message,
      primaryType,
      types
    }));
  return concat(...parts);
}
function encodeType(value) {
  const { primaryType, types } = value;
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${(types[type] ?? []).map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
}
function extractEip712DomainTypes(domain) {
  return [
    typeof (domain == null ? void 0 : domain.name) === "string" && { name: "name", type: "string" },
    (domain == null ? void 0 : domain.version) && { name: "version", type: "string" },
    (typeof (domain == null ? void 0 : domain.chainId) === "number" || typeof (domain == null ? void 0 : domain.chainId) === "bigint") && {
      name: "chainId",
      type: "uint256"
    },
    (domain == null ? void 0 : domain.verifyingContract) && {
      name: "verifyingContract",
      type: "address"
    },
    (domain == null ? void 0 : domain.salt) && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
function getSignPayload$3(value) {
  return keccak256(encode$1(value));
}
function hashDomain(value) {
  const { domain, types } = value;
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types: {
      ...types,
      EIP712Domain: (types == null ? void 0 : types.EIP712Domain) || extractEip712DomainTypes(domain)
    }
  });
}
function hashStruct(value) {
  const { data, primaryType, types } = value;
  const encoded = encodeData$1({
    data,
    primaryType,
    types
  });
  return keccak256(encoded);
}
class BytesSizeMismatchError2 extends BaseError$2 {
  constructor({ expectedSize, givenSize }) {
    super(`Expected bytes${expectedSize}, got bytes${givenSize}.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TypedData.BytesSizeMismatchError"
    });
  }
}
class InvalidDomainError extends BaseError$2 {
  constructor({ domain }) {
    super(`Invalid domain "${stringify(domain)}".`, {
      metaMessages: ["Must be a valid EIP-712 domain."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TypedData.InvalidDomainError"
    });
  }
}
class InvalidPrimaryTypeError extends BaseError$2 {
  constructor({ primaryType, types }) {
    super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
      metaMessages: ["Check that the primary type is a key in `types`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TypedData.InvalidPrimaryTypeError"
    });
  }
}
class InvalidStructTypeError extends BaseError$2 {
  constructor({ type }) {
    super(`Struct type "${type}" is invalid.`, {
      metaMessages: ["Struct type must not be a Solidity type."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TypedData.InvalidStructTypeError"
    });
  }
}
function encodeData$1(value) {
  const { data, primaryType, types } = value;
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType] ?? []) {
    const [type, value2] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value2);
  }
  return encode$2(encodedTypes, encodedValues);
}
function hashType(value) {
  const { primaryType, types } = value;
  const encodedHashType = fromString$1(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}
function encodeField(properties) {
  let { types, name, type, value } = properties;
  if (types[type] !== void 0)
    return [
      { type: "bytes32" },
      keccak256(encodeData$1({ data: value, primaryType: type, types }))
    ];
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value, { as: "Hex" })];
  }
  if (type === "string")
    return [
      { type: "bytes32" },
      keccak256(fromString(value), { as: "Hex" })
    ];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map((item) => encodeField({
      name,
      type: parsedType,
      types,
      value: item
    }));
    return [
      { type: "bytes32" },
      keccak256(encode$2(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
}
function findTypeDependencies(value, results = /* @__PURE__ */ new Set()) {
  const { primaryType: primaryType_, types } = value;
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match == null ? void 0 : match[0];
  if (results.has(primaryType) || types[primaryType] === void 0)
    return results;
  results.add(primaryType);
  for (const field of types[primaryType])
    findTypeDependencies({ primaryType: field.type, types }, results);
  return results;
}
function validateReference(type) {
  if (type === "address" || type === "bool" || type === "string" || type.startsWith("bytes") || type.startsWith("uint") || type.startsWith("int"))
    throw new InvalidStructTypeError({ type });
}
function toAccount(source) {
  if (typeof source === "string") {
    if (!isAddress(source, { strict: false }))
      throw new InvalidAddressError$1({ address: source });
    return {
      address: source,
      type: "json-rpc"
    };
  }
  if (!isAddress(source.address, { strict: false }))
    throw new InvalidAddressError$1({ address: source.address });
  return {
    address: source.address,
    nonceManager: source.nonceManager,
    sign: source.sign,
    signAuthorization: source.signAuthorization,
    signMessage: source.signMessage,
    signTransaction: source.signTransaction,
    signTypedData: source.signTypedData,
    source: "custom",
    type: "local"
  };
}
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", "error", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError$2("Unable to normalize signature.");
  return result;
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return validate$1(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index) => {
          return isArgOfType(Object.values(arg)[index], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          // Pop off `[]` or `[M]` from end of type
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
      return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return validate$1(args[parameterIndex], {
          strict: false
        });
      if (types.includes("address") && types.includes("bytes"))
        return validate$1(args[parameterIndex], {
          strict: false
        });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}
function from$a(abiItem, options = {}) {
  const { prepare = true } = options;
  const item = (() => {
    if (Array.isArray(abiItem))
      return parseAbiItem(abiItem);
    if (typeof abiItem === "string")
      return parseAbiItem(abiItem);
    return abiItem;
  })();
  return {
    ...item,
    ...prepare ? { hash: getSignatureHash(item) } : {}
  };
}
function fromAbi$2(abi, name, options) {
  const { args = [], prepare = true } = options ?? {};
  const isSelector = validate$3(name, { strict: false });
  const abiItems = abi.filter((abiItem2) => {
    if (isSelector) {
      if (abiItem2.type === "function" || abiItem2.type === "error")
        return getSelector$2(abiItem2) === slice$1(name, 0, 4);
      if (abiItem2.type === "event")
        return getSignatureHash(abiItem2) === name;
      return false;
    }
    return "name" in abiItem2 && abiItem2.name === name;
  });
  if (abiItems.length === 0)
    throw new NotFoundError({ name });
  if (abiItems.length === 1)
    return {
      ...abiItems[0],
      ...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
    };
  let matchedAbiItem;
  for (const abiItem2 of abiItems) {
    if (!("inputs" in abiItem2))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem2.inputs || abiItem2.inputs.length === 0)
        return {
          ...abiItem2,
          ...prepare ? { hash: getSignatureHash(abiItem2) } : {}
        };
      continue;
    }
    if (!abiItem2.inputs)
      continue;
    if (abiItem2.inputs.length === 0)
      continue;
    if (abiItem2.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index) => {
      const abiParameter = "inputs" in abiItem2 && abiItem2.inputs[index];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem2.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AmbiguityError({
            abiItem: abiItem2,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem2;
    }
  }
  const abiItem = (() => {
    if (matchedAbiItem)
      return matchedAbiItem;
    const [abiItem2, ...overloads] = abiItems;
    return { ...abiItem2, overloads };
  })();
  if (!abiItem)
    throw new NotFoundError({ name });
  return {
    ...abiItem,
    ...prepare ? { hash: getSignatureHash(abiItem) } : {}
  };
}
function getSelector$2(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi, name] = parameters;
      return fromAbi$2(abi, name);
    }
    return parameters[0];
  })();
  return slice$1(getSignatureHash(abiItem), 0, 4);
}
function getSignature(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi, name] = parameters;
      return fromAbi$2(abi, name);
    }
    return parameters[0];
  })();
  const signature = (() => {
    if (typeof abiItem === "string")
      return abiItem;
    return formatAbiItem(abiItem);
  })();
  return normalizeSignature(signature);
}
function getSignatureHash(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi, name] = parameters;
      return fromAbi$2(abi, name);
    }
    return parameters[0];
  })();
  if (typeof abiItem !== "string" && "hash" in abiItem && abiItem.hash)
    return abiItem.hash;
  return keccak256(fromString$1(getSignature(abiItem)));
}
class AmbiguityError extends BaseError$2 {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI Items.", {
      metaMessages: [
        // TODO: abitype to add support for signature-formatted ABI items.
        `\`${x.type}\` in \`${normalizeSignature(formatAbiItem(x.abiItem))}\`, and`,
        `\`${y.type}\` in \`${normalizeSignature(formatAbiItem(y.abiItem))}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.AmbiguityError"
    });
  }
}
class NotFoundError extends BaseError$2 {
  constructor({ name, data, type = "item" }) {
    const selector = (() => {
      if (name)
        return ` with name "${name}"`;
      if (data)
        return ` with data "${data}"`;
      return "";
    })();
    super(`ABI ${type}${selector} not found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.NotFoundError"
    });
  }
}
function encodeData(...parameters) {
  const [abiFunction, args = []] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi, name, args3] = parameters;
      return [fromAbi$1(abi, name, { args: args3 }), args3];
    }
    const [abiFunction2, args2] = parameters;
    return [abiFunction2, args2];
  })();
  const { overloads } = abiFunction;
  const item = overloads ? fromAbi$1([abiFunction, ...overloads], abiFunction.name, {
    args
  }) : abiFunction;
  const selector = getSelector$1(item);
  const data = args.length > 0 ? encode$2(item.inputs, args) : void 0;
  return data ? concat(selector, data) : selector;
}
function fromAbi$1(abi, name, options) {
  const item = fromAbi$2(abi, name, options);
  if (item.type !== "function")
    throw new NotFoundError({ name, type: "function" });
  return item;
}
function getSelector$1(abiItem) {
  return getSelector$2(abiItem);
}
function getPublicKey(options) {
  const { privateKey } = options;
  const point = secp256r1.ProjectivePoint.fromPrivateKey(typeof privateKey === "string" ? privateKey.slice(2) : fromBytes$3(privateKey).slice(2));
  return from$e(point);
}
function randomPrivateKey(options = {}) {
  const { as = "Hex" } = options;
  const bytes = secp256r1.utils.randomPrivateKey();
  if (as === "Hex")
    return fromBytes$3(bytes);
  return bytes;
}
function sign$4(options) {
  const { extraEntropy: extraEntropy$1 = extraEntropy, hash: hash2, payload, privateKey } = options;
  const { r, s, recovery } = secp256r1.sign(payload instanceof Uint8Array ? payload : fromHex$4(payload), privateKey instanceof Uint8Array ? privateKey : fromHex$4(privateKey), {
    extraEntropy: typeof extraEntropy$1 === "boolean" ? extraEntropy$1 : from$j(extraEntropy$1).slice(2),
    lowS: true,
    ...hash2 ? { prehash: true } : {}
  });
  return {
    r,
    s,
    yParity: recovery
  };
}
function from$9(value, decimals = 0) {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value))
    throw new InvalidDecimalNumberError({ value });
  let [integer = "", fraction = "0"] = value.split(".");
  const negative = integer.startsWith("-");
  if (negative)
    integer = integer.slice(1);
  fraction = fraction.replace(/(0+)$/, "");
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals)
    ];
    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else
      fraction = `${left}${rounded}`;
    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }
    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }
  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}
class InvalidDecimalNumberError extends BaseError$2 {
  constructor({ value }) {
    super(`Value \`${value}\` is not a valid decimal number.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Value.InvalidDecimalNumberError"
    });
  }
}
const encoder = /* @__PURE__ */ new TextEncoder();
const decoder = /* @__PURE__ */ new TextDecoder();
const integerToCharacter = /* @__PURE__ */ Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [i, a.charCodeAt(0)]));
const characterToInteger = {
  ...Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [a.charCodeAt(0), i])),
  ["=".charCodeAt(0)]: 0,
  ["-".charCodeAt(0)]: 62,
  ["_".charCodeAt(0)]: 63
};
function fromBytes(value, options = {}) {
  const { pad: pad2 = true, url = false } = options;
  const encoded = new Uint8Array(Math.ceil(value.length / 3) * 4);
  for (let i = 0, j = 0; j < value.length; i += 4, j += 3) {
    const y = (value[j] << 16) + (value[j + 1] << 8) + (value[j + 2] | 0);
    encoded[i] = integerToCharacter[y >> 18];
    encoded[i + 1] = integerToCharacter[y >> 12 & 63];
    encoded[i + 2] = integerToCharacter[y >> 6 & 63];
    encoded[i + 3] = integerToCharacter[y & 63];
  }
  const k = value.length % 3;
  const end = Math.floor(value.length / 3) * 4 + (k && k + 1);
  let base64 = decoder.decode(new Uint8Array(encoded.buffer, 0, end));
  if (pad2 && k === 1)
    base64 += "==";
  if (pad2 && k === 2)
    base64 += "=";
  if (url)
    base64 = base64.replaceAll("+", "-").replaceAll("/", "_");
  return base64;
}
function fromHex$1(value, options = {}) {
  return fromBytes(fromHex$4(value), options);
}
function toBytes(value) {
  const base64 = value.replace(/=+$/, "");
  const size2 = base64.length;
  const decoded = new Uint8Array(size2 + 3);
  encoder.encodeInto(base64 + "===", decoded);
  for (let i = 0, j = 0; i < base64.length; i += 4, j += 3) {
    const x = (characterToInteger[decoded[i]] << 18) + (characterToInteger[decoded[i + 1]] << 12) + (characterToInteger[decoded[i + 2]] << 6) + characterToInteger[decoded[i + 3]];
    decoded[j] = x >> 16;
    decoded[j + 1] = x >> 8 & 255;
    decoded[j + 2] = x & 255;
  }
  const decodedSize = (size2 >> 2) * 3 + (size2 % 4 && size2 % 4 - 1);
  return new Uint8Array(decoded.buffer, 0, decodedSize);
}
function parseAsn1Signature(bytes) {
  const r_start = bytes[4] === 0 ? 5 : 4;
  const r_end = r_start + 32;
  const s_start = bytes[r_end + 2] === 0 ? r_end + 3 : r_end + 2;
  const r = BigInt(fromBytes$3(bytes.slice(r_start, r_end)));
  const s = BigInt(fromBytes$3(bytes.slice(s_start)));
  return {
    r,
    s: s > p256.CURVE.n / 2n ? p256.CURVE.n - s : s
  };
}
async function parseCredentialPublicKey(response) {
  try {
    const publicKeyBuffer = response.getPublicKey();
    if (!publicKeyBuffer)
      throw new CredentialCreationFailedError();
    const publicKeyBytes = new Uint8Array(publicKeyBuffer);
    const cryptoKey = await crypto.subtle.importKey("spki", new Uint8Array(publicKeyBytes), {
      name: "ECDSA",
      namedCurve: "P-256",
      hash: "SHA-256"
    }, true, ["verify"]);
    const publicKey = new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKey));
    return from$e(publicKey);
  } catch (error) {
    if (error.message !== "Permission denied to access object")
      throw error;
    const data = new Uint8Array(response.attestationObject);
    const coordinateLength = 32;
    const cborPrefix = 88;
    const findStart = (key) => {
      const coordinate = new Uint8Array([key, cborPrefix, coordinateLength]);
      for (let i = 0; i < data.length - coordinate.length; i++)
        if (coordinate.every((byte, j) => data[i + j] === byte))
          return i + coordinate.length;
      throw new CredentialCreationFailedError();
    };
    const xStart = findStart(33);
    const yStart = findStart(34);
    return from$e(new Uint8Array([
      4,
      ...data.slice(xStart, xStart + coordinateLength),
      ...data.slice(yStart, yStart + coordinateLength)
    ]));
  }
}
const createChallenge = Uint8Array.from([
  105,
  171,
  180,
  181,
  160,
  222,
  75,
  198,
  42,
  42,
  32,
  31,
  141,
  37,
  186,
  233
]);
async function createCredential(options) {
  const { createFn = window.navigator.credentials.create.bind(window.navigator.credentials), ...rest } = options;
  const creationOptions = getCredentialCreationOptions(rest);
  try {
    const credential = await createFn(creationOptions);
    if (!credential)
      throw new CredentialCreationFailedError();
    const response = credential.response;
    const publicKey = await parseCredentialPublicKey(response);
    return {
      id: credential.id,
      publicKey,
      raw: credential
    };
  } catch (error) {
    throw new CredentialCreationFailedError({
      cause: error
    });
  }
}
function getAuthenticatorData(options = {}) {
  const { flag = 5, rpId = window.location.hostname, signCount = 0 } = options;
  const rpIdHash = sha256(fromString$1(rpId));
  const flag_bytes = fromNumber(flag, { size: 1 });
  const signCount_bytes = fromNumber(signCount, { size: 4 });
  return concat(rpIdHash, flag_bytes, signCount_bytes);
}
function getClientDataJSON(options) {
  const { challenge, crossOrigin = false, extraClientData, origin = window.location.origin } = options;
  return JSON.stringify({
    type: "webauthn.get",
    challenge: fromHex$1(challenge, { url: true, pad: false }),
    origin,
    crossOrigin,
    ...extraClientData
  });
}
function getCredentialCreationOptions(options) {
  const { attestation = "none", authenticatorSelection = {
    residentKey: "preferred",
    requireResidentKey: false,
    userVerification: "required"
  }, challenge = createChallenge, excludeCredentialIds, extensions, name: name_, rp = {
    id: window.location.hostname,
    name: window.document.title
  }, user } = options;
  const name = (user == null ? void 0 : user.name) ?? name_;
  return {
    publicKey: {
      attestation,
      authenticatorSelection,
      challenge: typeof challenge === "string" ? fromHex$4(challenge) : challenge,
      ...excludeCredentialIds ? {
        excludeCredentials: excludeCredentialIds == null ? void 0 : excludeCredentialIds.map((id) => ({
          id: toBytes(id),
          type: "public-key"
        }))
      } : {},
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7
          // p256
        }
      ],
      ...extensions && { extensions },
      rp,
      user: {
        id: (user == null ? void 0 : user.id) ?? keccak256(fromString(name), { as: "Bytes" }),
        name,
        displayName: (user == null ? void 0 : user.displayName) ?? name
      }
    }
  };
}
function getCredentialRequestOptions(options) {
  const { credentialId, challenge, extensions, rpId = window.location.hostname, userVerification = "required" } = options;
  return {
    publicKey: {
      ...credentialId ? {
        allowCredentials: Array.isArray(credentialId) ? credentialId.map((id) => ({
          id: toBytes(id),
          type: "public-key"
        })) : [
          {
            id: toBytes(credentialId),
            type: "public-key"
          }
        ]
      } : {},
      challenge: fromHex$4(challenge),
      ...extensions && { extensions },
      rpId,
      userVerification
    }
  };
}
function getSignPayload$2(options) {
  const { challenge, crossOrigin, extraClientData, flag, origin, rpId, signCount, userVerification = "required" } = options;
  const authenticatorData = getAuthenticatorData({
    flag,
    rpId,
    signCount
  });
  const clientDataJSON = getClientDataJSON({
    challenge,
    crossOrigin,
    extraClientData,
    origin
  });
  const clientDataJSONHash = sha256(fromString$1(clientDataJSON));
  const challengeIndex = clientDataJSON.indexOf('"challenge"');
  const typeIndex = clientDataJSON.indexOf('"type"');
  const metadata = {
    authenticatorData,
    clientDataJSON,
    challengeIndex,
    typeIndex,
    userVerificationRequired: userVerification === "required"
  };
  const payload = concat(authenticatorData, clientDataJSONHash);
  return { metadata, payload };
}
async function sign$3(options) {
  const { getFn = window.navigator.credentials.get.bind(window.navigator.credentials), ...rest } = options;
  const requestOptions = getCredentialRequestOptions(rest);
  try {
    const credential = await getFn(requestOptions);
    if (!credential)
      throw new CredentialRequestFailedError();
    const response = credential.response;
    const clientDataJSON = String.fromCharCode(...new Uint8Array(response.clientDataJSON));
    const challengeIndex = clientDataJSON.indexOf('"challenge"');
    const typeIndex = clientDataJSON.indexOf('"type"');
    const signature = parseAsn1Signature(new Uint8Array(response.signature));
    return {
      metadata: {
        authenticatorData: fromBytes$3(new Uint8Array(response.authenticatorData)),
        clientDataJSON,
        challengeIndex,
        typeIndex,
        userVerificationRequired: requestOptions.publicKey.userVerification === "required"
      },
      signature,
      raw: credential
    };
  } catch (error) {
    throw new CredentialRequestFailedError({
      cause: error
    });
  }
}
class CredentialCreationFailedError extends BaseError$2 {
  constructor({ cause } = {}) {
    super("Failed to create credential.", {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WebAuthnP256.CredentialCreationFailedError"
    });
  }
}
class CredentialRequestFailedError extends BaseError$2 {
  constructor({ cause } = {}) {
    super("Failed to request credential.", {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WebAuthnP256.CredentialRequestFailedError"
    });
  }
}
async function createKeyPair(options = {}) {
  const { extractable = false } = options;
  const keypair = await globalThis.crypto.subtle.generateKey({
    name: "ECDSA",
    namedCurve: "P-256"
  }, extractable, ["sign", "verify"]);
  const publicKey_raw = await globalThis.crypto.subtle.exportKey("raw", keypair.publicKey);
  const publicKey = from$e(new Uint8Array(publicKey_raw));
  return {
    privateKey: keypair.privateKey,
    publicKey
  };
}
async function sign$2(options) {
  const { payload, privateKey } = options;
  const signature = await globalThis.crypto.subtle.sign({
    name: "ECDSA",
    hash: "SHA-256"
  }, privateKey, from$f(payload));
  const signature_bytes = fromArray(new Uint8Array(signature));
  const r = toBigInt(slice(signature_bytes, 0, 32));
  let s = toBigInt(slice(signature_bytes, 32, 64));
  if (s > p256.CURVE.n / 2n)
    s = p256.CURVE.n - s;
  return { r, s };
}
const anyTarget = "0x3232323232323232323232323232323232323232";
const anySelector = "0x32323232";
const fromRelayKeyType = {
  p256: "p256",
  secp256k1: "secp256k1",
  webauthnp256: "webauthn-p256"
};
const fromRelayKeyRole = {
  admin: "admin",
  normal: "session"
};
const fromSerializedSpendPeriod = {
  0: "minute",
  1: "hour",
  2: "day",
  3: "week",
  4: "month",
  5: "year"
};
const toRelayKeyType = {
  address: "secp256k1",
  p256: "p256",
  secp256k1: "secp256k1",
  "webauthn-p256": "webauthnp256"
};
const toRelayKeyRole = {
  admin: "admin",
  session: "normal"
};
const toSerializedKeyType = {
  address: 2,
  p256: 0,
  secp256k1: 2,
  "webauthn-p256": 1
};
const toSerializedSpendPeriod = {
  day: 2,
  hour: 1,
  minute: 0,
  month: 4,
  week: 3,
  year: 5
};
async function createWebAuthnP256(parameters) {
  const { createFn, label, rpId, userId } = parameters;
  const credential = await createCredential({
    authenticatorSelection: {
      requireResidentKey: true,
      residentKey: "required",
      userVerification: "required"
    },
    createFn,
    extensions: {
      credProps: true
    },
    rp: rpId ? {
      id: rpId,
      name: rpId
    } : void 0,
    user: {
      displayName: label,
      id: new Uint8Array(userId ?? fromString(label)),
      name: label
    }
  });
  return fromWebAuthnP256({
    ...parameters,
    credential: {
      id: credential.id,
      publicKey: credential.publicKey
    },
    id: userId ? toHex$2(userId) : toHex$1(credential.publicKey, {
      includePrefix: false
    })
  });
}
function createHeadlessWebAuthnP256(parameters = {}) {
  const privateKey = randomPrivateKey();
  return fromHeadlessWebAuthnP256({
    ...parameters,
    privateKey
  });
}
async function createWebCryptoP256(parameters = {}) {
  const keyPair = await createKeyPair();
  return fromWebCryptoP256({
    ...parameters,
    keyPair
  });
}
function from$8(key, options = {}) {
  const { chainId = key.chainId } = options;
  const { expiry = 0, id, prehash = false, role = "admin", type } = key;
  const publicKey = (() => {
    const publicKey2 = key.publicKey;
    if (publicKey2 === "0x")
      return publicKey2;
    if (type === "secp256k1" || type === "address") {
      const isAddress2 = size$1(publicKey2) === 20 || toBigInt$1(slice$1(publicKey2, 0, 12)) === 0n;
      const address = isAddress2 ? slice$1(publicKey2, -20) : fromPublicKey(fromHex$3(publicKey2));
      return address;
    }
    return publicKey2;
  })();
  return {
    ...key,
    chainId,
    expiry,
    hash: hash$1({
      publicKey,
      type
    }),
    id: (id ?? publicKey).toLowerCase(),
    prehash,
    publicKey: publicKey.toLowerCase(),
    role,
    type
  };
}
function fromRelay(relayKey, options) {
  const { chainId } = options;
  const { publicKey } = relayKey;
  const isAddress2 = size$1(publicKey) === 20 || toBigInt$1(slice$1(publicKey, 0, 12)) === 0n;
  const permissions = {};
  for (const permission of relayKey.permissions) {
    if (permission.type === "call") {
      permissions.calls ?? (permissions.calls = []);
      permissions.calls.push({
        signature: permission.selector,
        to: permission.to === anyTarget ? void 0 : permission.to
      });
    }
    if (permission.type === "spend") {
      permissions.spend ?? (permissions.spend = []);
      permissions.spend.push({
        limit: permission.limit,
        period: permission.period,
        token: permission.token
      });
    }
  }
  return from$8({
    chainId,
    expiry: relayKey.expiry,
    permissions,
    publicKey: relayKey.publicKey,
    role: fromRelayKeyRole[relayKey.role],
    type: isAddress2 ? "address" : fromRelayKeyType[relayKey.type]
  });
}
function fromWebAuthnP256(parameters) {
  const { credential, id, rpId } = parameters;
  const publicKey = toHex$1(credential.publicKey, {
    includePrefix: false
  });
  return from$8({
    chainId: parameters.chainId,
    expiry: parameters.expiry ?? 0,
    feeToken: parameters.feeToken,
    id,
    permissions: parameters.permissions,
    privateKey: {
      credential,
      rpId
    },
    publicKey,
    role: parameters.role,
    type: "webauthn-p256"
  });
}
function fromHeadlessWebAuthnP256(parameters) {
  const { privateKey } = parameters;
  const publicKey = toHex$1(getPublicKey({ privateKey }), {
    includePrefix: false
  });
  return from$8({
    chainId: parameters.chainId,
    expiry: parameters.expiry ?? 0,
    feeToken: parameters.feeToken,
    permissions: parameters.permissions,
    privateKey: {
      privateKey() {
        return privateKey;
      }
    },
    publicKey,
    role: parameters.role,
    type: "webauthn-p256"
  });
}
function fromWebCryptoP256(parameters) {
  const { chainId, expiry, feeToken, keyPair, permissions, role } = parameters;
  const { privateKey } = keyPair;
  const publicKey = toHex$1(keyPair.publicKey, {
    includePrefix: false
  });
  return from$8({
    chainId,
    expiry,
    feeToken,
    permissions,
    prehash: true,
    privateKey,
    publicKey,
    role,
    type: "p256"
  });
}
function hash$1(key) {
  const { type } = key;
  const publicKey = serializePublicKey(key.publicKey);
  return keccak256(encode$2([{ type: "uint8" }, { type: "bytes32" }], [toSerializedKeyType[type], keccak256(publicKey)]));
}
function serializePublicKey(publicKey) {
  return size$1(publicKey) < 32 ? padLeft(publicKey, 32) : publicKey;
}
async function sign$1(key, parameters) {
  const { address, storage, webAuthn, wrap: wrap2 = true } = parameters;
  const { privateKey, publicKey, type: keyType } = key;
  if (!privateKey)
    throw new Error("Key does not have a private key to sign with.\n\nKey:\n" + stringify(key, null, 2));
  const payload = (() => {
    if (!address)
      return parameters.payload;
    return getSignPayload$3({
      domain: { verifyingContract: address },
      message: {
        digest: parameters.payload
      },
      primaryType: "ERC1271Sign",
      types: {
        ERC1271Sign: [{ name: "digest", type: "bytes32" }]
      }
    });
  })();
  const [signature, prehash] = await (async () => {
    if (keyType === "p256") {
      const { privateKey: privateKey2 } = key;
      if (typeof privateKey2 === "function")
        return [
          toHex(sign$4({ payload, privateKey: privateKey2() })),
          false
        ];
      if (privateKey2 instanceof CryptoKey) {
        const signature2 = toHex(await sign$2({ payload, privateKey: privateKey2 }));
        return [signature2, true];
      }
    }
    if (keyType === "secp256k1") {
      return [
        toHex(sign$5({ payload, privateKey: privateKey() })),
        false
      ];
    }
    if (keyType === "webauthn-p256") {
      if (privateKey.privateKey) {
        const { payload: wrapped, metadata: metadata2 } = getSignPayload$2({
          challenge: payload,
          origin: "https://ithaca.xyz",
          rpId: "ithaca.xyz"
        });
        const { r: r2, s: s2 } = sign$4({
          hash: true,
          payload: wrapped,
          privateKey: privateKey.privateKey()
        });
        const signature3 = serializeWebAuthnSignature({
          metadata: metadata2,
          signature: { r: r2, s: s2 }
        });
        return [signature3, false];
      }
      const { credential, rpId } = privateKey;
      const cacheKey = `porto.webauthnVerified.${key.hash}`;
      const now = Date.now();
      const verificationTimeout = 10 * 60 * 1e3;
      let requireVerification = true;
      if (storage) {
        const lastVerified = await storage.getItem(cacheKey);
        requireVerification = !lastVerified || now - lastVerified > verificationTimeout;
      }
      const { signature: { r, s }, raw, metadata } = await sign$3({
        challenge: payload,
        credentialId: credential.id,
        getFn: webAuthn == null ? void 0 : webAuthn.getFn,
        rpId,
        userVerification: requireVerification ? "required" : "preferred"
      });
      const response = raw.response;
      if (!(response == null ? void 0 : response.userHandle))
        throw new Error("No user handle in response", {
          cause: { response }
        });
      const id = toHex$2(new Uint8Array(response.userHandle));
      if (key.id && validate$1(key.id) && !isEqual(key.id, id))
        throw new Error(`supplied webauthn key "${key.id}" does not match signature webauthn key "${id}"`, { cause: { id, key } });
      if (requireVerification && storage)
        await storage.setItem(cacheKey, now);
      const signature2 = serializeWebAuthnSignature({
        metadata,
        signature: { r, s }
      });
      return [signature2, false];
    }
    throw new Error(`Key type "${keyType}" is not supported.

Key:
` + stringify(key, null, 2));
  })();
  if (wrap2)
    return wrapSignature(signature, {
      keyType,
      prehash,
      publicKey
    });
  return signature;
}
function toRelay$1(key, options = {}) {
  const { expiry = 0, prehash = false, publicKey, role = "admin", type } = key;
  const { feeTokens, orchestrator } = options;
  const permissions = Object.entries(resolvePermissions(key, {
    feeTokens
  })).map(([key2, v]) => {
    if (key2 === "calls") {
      const calls = v;
      return calls.map(({ signature, to }) => {
        const selector = (() => {
          if (!signature)
            return anySelector;
          if (validate$3(signature))
            return signature;
          return getSelector$1(signature);
        })();
        return {
          selector,
          to: to ?? anyTarget,
          type: "call"
        };
      });
    }
    if (key2 === "feeToken")
      return;
    if (key2 === "spend") {
      const value = v;
      return value.map(({ limit, period, token }) => {
        return {
          limit,
          period,
          token,
          type: "spend"
        };
      });
    }
    throw new Error(`Invalid permission type "${key2}".`);
  }).flat().filter(Boolean);
  if (key.role === "session" && orchestrator)
    permissions.push({
      selector: anySelector,
      to: orchestrator,
      type: "call"
    });
  return {
    expiry,
    permissions: permissions ?? [],
    prehash,
    publicKey: serializePublicKey(publicKey),
    role: toRelayKeyRole[role],
    type: toRelayKeyType[type]
  };
}
function resolvePermissions(key, options) {
  var _a;
  const { permissions } = key;
  const calls = (permissions == null ? void 0 : permissions.calls) ? [...permissions.calls] : [];
  const spend = (permissions == null ? void 0 : permissions.spend) ? [...permissions.spend] : [];
  const feeTokens = (_a = options.feeTokens) == null ? void 0 : _a.filter((token) => token.feeToken);
  if (feeTokens && feeTokens.length > 0) {
    const feeToken = getFeeToken(key, {
      feeTokens
    });
    if (feeToken) {
      let index = -1;
      let minPeriod = toSerializedSpendPeriod.year;
      for (let i = 0; i < spend.length; i++) {
        const s = spend[i];
        if (s.token && isEqual(feeToken.address, s.token)) {
          index = i;
          break;
        }
        if (!s.token && feeToken.address === zeroAddress) {
          index = i;
          break;
        }
        const period = toSerializedSpendPeriod[s.period];
        if (period < minPeriod)
          minPeriod = period;
      }
      if (index !== -1) {
        spend[index] = {
          ...spend[index],
          limit: spend[index].limit + feeToken.value
        };
        spend.unshift(spend.splice(index, 1)[0]);
      } else if (typeof minPeriod === "number")
        spend.unshift({
          limit: feeToken.value,
          period: fromSerializedSpendPeriod[minPeriod],
          token: feeToken.address
        });
    }
  }
  return { ...permissions, calls, spend };
}
function getFeeToken(key, options) {
  const { feeTokens } = options;
  if (!key.feeToken)
    return void 0;
  const feeToken = feeTokens.find((token) => {
    if (key.feeToken.symbol === token.symbol)
      return true;
    if (!key.feeToken.symbol)
      return token.address === zeroAddress;
    if (key.feeToken.symbol === "native")
      return token.address === zeroAddress;
    return false;
  });
  if (!feeToken)
    return void 0;
  const value = from$9(key.feeToken.limit, feeToken.decimals);
  return {
    ...feeToken,
    value
  };
}
function serializeWebAuthnSignature(options) {
  const { metadata, signature } = options;
  return encode$2(from$b([
    "struct WebAuthnAuth { bytes authenticatorData; string clientDataJSON; uint256 challengeIndex; uint256 typeIndex; bytes32 r; bytes32 s; }",
    "WebAuthnAuth auth"
  ]), [
    {
      authenticatorData: metadata.authenticatorData,
      challengeIndex: BigInt(metadata.challengeIndex),
      clientDataJSON: metadata.clientDataJSON,
      r: fromNumber(signature.r, { size: 32 }),
      s: fromNumber(signature.s, { size: 32 }),
      typeIndex: BigInt(metadata.typeIndex)
    }
  ]);
}
function wrapSignature(signature, options) {
  const { keyType: type, prehash = false, publicKey } = options;
  const keyHash = hash$1({ publicKey, type });
  return encodePacked(["bytes", "bytes32", "bool"], [signature, keyHash, prehash]);
}
function from$7(parameters) {
  const account = typeof parameters === "string" ? { address: parameters } : parameters;
  const source = account.sign ? "privateKey" : "porto";
  const { address, sign: sign_, signMessage, signTransaction, signTypedData, type } = toAccount({
    address: account.address,
    sign({ hash: hash2 }) {
      if (source === "privateKey")
        return account.sign({ hash: hash2 });
      throw new Error("`sign` not supported on porto accounts.");
    },
    signMessage({ message }) {
      return this.sign({
        hash: hashMessage(message)
      });
    },
    signTransaction() {
      throw new Error("`signTransaction` not supported on porto accounts.");
    },
    signTypedData(typedData) {
      return this.sign({
        hash: hashTypedData(typedData)
      });
    }
  });
  return {
    address,
    keys: account.keys ?? void 0,
    sign: sign_,
    signMessage,
    signTransaction,
    signTypedData,
    source,
    type
  };
}
function fromPrivateKey(privateKey, options = {}) {
  const { keys } = options;
  const address = fromPublicKey(getPublicKey$1({ privateKey }));
  return from$7({
    address,
    keys,
    async sign({ hash: hash2 }) {
      return toHex(sign$5({
        payload: hash2,
        privateKey
      }));
    },
    source: "privateKey"
  });
}
function getKey(account, parameters = {}) {
  const { key, role } = parameters;
  if (key === null)
    return void 0;
  if (typeof key === "object")
    return key;
  if (account.keys && account.keys.length > 0) {
    if (typeof key === "number")
      return account.keys[key];
    return account.keys.find((key2) => key2.privateKey && (!role || key2.role === role));
  }
  return void 0;
}
async function sign(account, parameters) {
  const { storage, replaySafe = true, wrap: wrap2 = true, webAuthn } = parameters;
  const key = getKey(account, parameters);
  const payload = (() => {
    if (!replaySafe)
      return parameters.payload;
    return getSignPayload$3({
      domain: { verifyingContract: account.address },
      message: {
        digest: parameters.payload
      },
      primaryType: "ERC1271Sign",
      types: {
        ERC1271Sign: [{ name: "digest", type: "bytes32" }]
      }
    });
  })();
  const sign2 = (() => {
    if (!key) {
      if (account.source === "privateKey")
        return account.sign;
      return void 0;
    }
    return ({ hash: hash2 }) => sign$1(key, {
      address: null,
      payload: hash2,
      storage,
      webAuthn,
      wrap: wrap2
    });
  })();
  if (!sign2)
    throw new Error("cannot find key to sign with.");
  return await sign2({ hash: payload });
}
function from$6(abiError, options = {}) {
  return from$a(abiError, options);
}
function fromAbi(abi, name, options) {
  if (name === "Error")
    return solidityError;
  if (name === "Panic")
    return solidityPanic;
  if (validate$3(name, { strict: false })) {
    const selector = slice$1(name, 0, 4);
    if (selector === solidityErrorSelector)
      return solidityError;
    if (selector === solidityPanicSelector)
      return solidityPanic;
  }
  const item = fromAbi$2(abi, name, options);
  if (item.type !== "error")
    throw new NotFoundError({ name, type: "error" });
  return item;
}
const solidityError = /* @__PURE__ */ from$6({
  inputs: [
    {
      name: "message",
      type: "string"
    }
  ],
  name: "Error",
  type: "error"
});
const solidityErrorSelector = "0x08c379a0";
const solidityPanic = /* @__PURE__ */ from$6({
  inputs: [
    {
      name: "reason",
      type: "uint8"
    }
  ],
  name: "Panic",
  type: "error"
});
const solidityPanicSelector = "0x4e487b71";
class FunctionSelectorNotRecognizedError extends BaseError$1 {
  constructor() {
    super("Function is not recognized.", {
      metaMessages: [
        "This could be due to any of the following:",
        "  - The contract does not have the function,",
        "  - The address is not a contract."
      ],
      name: "FunctionSelectorNotRecognizedError"
    });
  }
}
function from$5(abiError, options = {}) {
  return from$k(abiError, options);
}
function getSelector(abiItem) {
  return getSelector$3(abiItem);
}
function getExecuteError(e, parameters) {
  const error = e.walk((e2) => "data" in e2);
  if (!(error == null ? void 0 : error.data))
    return e;
  if (error.data === getSelector(from$5("error FnSelectorNotRecognized()")))
    return new FunctionSelectorNotRecognizedError();
  let matched = null;
  for (const c of parameters.calls) {
    const call = c;
    if (!call.abi)
      continue;
    try {
      const matches = Boolean(decodeErrorResult({
        abi: call.abi,
        data: error.data
      }));
      if (!matches)
        continue;
      matched = call;
    } catch {
    }
  }
  if (matched)
    return getContractError(error, {
      abi: matched.abi,
      address: matched.to,
      args: matched.args,
      functionName: matched.functionName
    });
  return e;
}
async function getAuthorization(client, parameters) {
  try {
    const method = "wallet_getAuthorization";
    const result = await withCache(() => client.request({
      method,
      params: [
        encode$4(wallet_getAuthorization.Parameters, parameters)
      ]
    }), { cacheKey: `${client.uid}.${method}.${parameters.address}` });
    return decode(wallet_getAuthorization.Response, result);
  } catch (error) {
    parseSchemaError(error);
    throw error;
  }
}
async function getCapabilities(client, options = {}) {
  const chainIds = (() => {
    if (options.chainId)
      return [options.chainId];
    if (options.chainIds === "all")
      return void 0;
    if (options.chainIds)
      return options.chainIds;
    return [client.chain.id];
  })();
  try {
    const method = "wallet_getCapabilities";
    const result = await withCache(() => client.request({
      method,
      params: chainIds ? [chainIds] : void 0
    }, {
      retryCount: 0
    }), {
      cacheKey: `${client.uid}.${method}.${chainIds == null ? void 0 : chainIds.join(",")}`
    });
    const parsed = (() => {
      if (options.raw)
        return result;
      return decode(wallet_getCapabilities.Response, result);
    })();
    if (options.chainIds)
      return parsed;
    return Object.values(parsed)[0];
  } catch (error) {
    parseSchemaError(error);
    throw error;
  }
}
async function getAssets(client, parameters) {
  var _a;
  const { account, assetFilter, assetTypeFilter, chainFilter } = parameters;
  try {
    const method = "wallet_getAssets";
    const result = await client.request({
      method,
      params: [
        encode$4(wallet_getAssets.Parameters, {
          account,
          assetFilter,
          assetTypeFilter,
          chainFilter
        })
      ]
    });
    const value = decode(wallet_getAssets.Response, result);
    const decoded = Object.entries(value).reduce((acc, [key, value2]) => {
      acc[toNumber(key)] = value2;
      return acc;
    }, {});
    const aggregated = {};
    for (const value2 of Object.values(decoded)) {
      for (const item of value2) {
        const key = JSON.stringify(item.metadata);
        aggregated[key] = {
          ...item,
          balance: item.balance + (((_a = aggregated[key]) == null ? void 0 : _a.balance) ?? 0n)
        };
      }
    }
    return {
      ...decoded,
      "0": Object.values(aggregated)
    };
  } catch (error) {
    parseSchemaError(error);
    throw error;
  }
}
async function getCallsStatus(client, parameters) {
  const { id } = parameters;
  try {
    const method = "wallet_getCallsStatus";
    const result = await client.request({
      method,
      params: [id]
    });
    return decode(wallet_getCallsStatus.Response, result);
  } catch (error) {
    parseSchemaError(error);
    throw error;
  }
}
async function getKeys$1(client, parameters) {
  const { address, chainIds } = parameters;
  try {
    const method = "wallet_getKeys";
    const result = await client.request({
      method,
      params: [
        encode$4(wallet_getKeys.Parameters, {
          address,
          chainIds
        })
      ]
    });
    return decode(wallet_getKeys.Response, result);
  } catch (error) {
    parseSchemaError(error);
    throw error;
  }
}
async function health(client) {
  const method = "health";
  const result = await withCache(() => client.request({
    method
  }), { cacheKey: `${client.uid}.${method}` });
  return decode(health$1.Response, result);
}
async function prepareCalls$1(client, parameters) {
  const { address, capabilities, chain = client.chain, key } = parameters;
  const calls = parameters.calls.map((call) => {
    return {
      data: call.abi ? encodeData(fromAbi$1(call.abi, call.functionName), call.args) : call.data ?? "0x",
      to: call.to,
      value: call.value ?? 0n
    };
  });
  try {
    const method = "wallet_prepareCalls";
    const result = await client.request({
      method,
      params: [
        encode$4(wallet_prepareCalls.Parameters, {
          calls,
          capabilities: {
            ...capabilities,
            meta: {
              ...capabilities == null ? void 0 : capabilities.meta
            }
          },
          chainId: chain == null ? void 0 : chain.id,
          from: address,
          key: key ? {
            prehash: key.prehash,
            publicKey: key.publicKey,
            type: key.type
          } : void 0
        })
      ]
    }, {
      retryCount: 0
    });
    return Object.assign(decode(wallet_prepareCalls.Response, result), { _raw: result });
  } catch (error) {
    parseSchemaError(error);
    parseExecutionError(error, { calls: parameters.calls });
    throw error;
  }
}
async function prepareUpgradeAccount$1(client, parameters) {
  const { address, chain = client.chain, delegation, ...capabilities } = parameters;
  try {
    const method = "wallet_prepareUpgradeAccount";
    const result = await client.request({
      method,
      params: [
        encode$4(wallet_prepareUpgradeAccount.Parameters, normalizeValue({
          address,
          capabilities,
          chainId: chain == null ? void 0 : chain.id,
          delegation
        }))
      ]
    }, {
      retryCount: 0
    });
    return decode(wallet_prepareUpgradeAccount.Response, result);
  } catch (error) {
    parseSchemaError(error);
    parseExecutionError(error);
    throw error;
  }
}
async function sendPreparedCalls$1(client, parameters) {
  const { capabilities, context, key, signature } = parameters;
  try {
    const method = "wallet_sendPreparedCalls";
    const result = await client.request({
      method,
      params: [
        encode$4(wallet_sendPreparedCalls.Parameters, {
          capabilities,
          context: {
            preCall: context.preCall,
            quote: context.quote
          },
          key: key ? {
            prehash: key.prehash,
            publicKey: key.publicKey,
            type: key.type
          } : void 0,
          signature
        })
      ]
    }, {
      retryCount: 0
    });
    return decode(wallet_sendPreparedCalls.Response, result);
  } catch (error) {
    parseSchemaError(error);
    parseExecutionError(error);
    throw error;
  }
}
async function setEmail$1(client, parameters) {
  const { email, walletAddress } = parameters;
  try {
    const method = "account_setEmail";
    const result = await client.request({
      method,
      params: [
        encode$4(account_setEmail.Parameters, {
          email,
          walletAddress
        })
      ]
    }, {
      retryCount: 0
    });
    return decode(account_setEmail.Response, result);
  } catch (error) {
    parseSchemaError(error);
    parseExecutionError(error);
    throw error;
  }
}
async function upgradeAccount$1(client, parameters) {
  const { context, signatures } = parameters;
  try {
    const method = "wallet_upgradeAccount";
    await client.request({
      method,
      params: [
        encode$4(wallet_upgradeAccount.Parameters, {
          context,
          signatures
        })
      ]
    }, {
      retryCount: 0
    });
  } catch (error) {
    parseSchemaError(error);
    parseExecutionError(error);
    throw error;
  }
}
async function verifyEmail$1(client, parameters) {
  const { chainId, email, signature, token, walletAddress } = parameters;
  try {
    const method = "account_verifyEmail";
    const result = await client.request({
      method,
      params: [
        encode$4(account_verifyEmail.Parameters, {
          chainId,
          email,
          signature,
          token,
          walletAddress
        })
      ]
    }, {
      retryCount: 0
    });
    return decode(account_verifyEmail.Response, result);
  } catch (error) {
    parseSchemaError(error);
    parseExecutionError(error);
    throw error;
  }
}
async function verifyPrepareCallsResponse(client, parameters) {
  const { signature } = parameters;
  const { signature: _, capabilities: { feeSignature: __, ...capabilities }, ...response } = parameters.response;
  const sorted = sortKeys({ capabilities, ...response });
  const payload = keccak256(fromString$1(JSON.stringify(sorted)));
  const address = recoverAddress({
    payload,
    signature: fromHex$2(signature)
  });
  const { quoteSigner } = await health(client);
  return address === quoteSigner;
}
async function verifySignature(client, parameters) {
  const { address, chain = client.chain, digest, signature } = parameters;
  try {
    async function fallback2() {
      const valid = await verifyHash(client, {
        address,
        hash: digest,
        signature
      });
      return {
        proof: null,
        valid
      };
    }
    const method = "wallet_verifySignature";
    const result = await (async () => {
      const result2 = await client.request({
        method,
        params: [
          encode$4(wallet_verifySignature.Parameters, {
            address,
            chainId: chain == null ? void 0 : chain.id,
            digest,
            signature
          })
        ]
      }, {
        retryCount: 0
      }).catch(fallback2);
      if (result2.valid)
        return result2;
      return fallback2();
    })();
    return decode(wallet_verifySignature.Response, result);
  } catch (error) {
    parseSchemaError(error);
    throw error;
  }
}
function parseExecutionError(e, { calls } = {}) {
  if (!(e instanceof BaseError$1))
    return;
  const getAbiError = (error2) => {
    try {
      if (error2.name === "ContractFunctionExecutionError") {
        const data2 = error2.cause.name === "ContractFunctionRevertedError" ? error2.cause.data : void 0;
        if (data2)
          return fromAbi([data2.abiItem], data2.errorName);
      }
      const cause = error2.walk((e2) => !(e2 instanceof Error) && e2.code === 3);
      if (!cause)
        return void 0;
      const { data, message } = cause;
      if (data === "0xd0d5039b")
        return from$6("error Unauthorized()");
      return {
        inputs: [],
        name: (message ?? data).split("(")[0],
        type: "error"
      };
    } catch {
      return void 0;
    }
  };
  const error = getExecuteError(e, {
    calls: calls ?? []
  });
  const abiError = getAbiError(error);
  if (error === e && !abiError)
    return;
  throw new ExecutionError(Object.assign(error, { abiError }));
}
function sortKeys(value) {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value))
      return value.map(sortKeys);
    const result = {};
    for (const key of Object.keys(value).sort())
      result[key] = sortKeys(value[key]);
    return result;
  }
  return value;
}
function parseSchemaError(e) {
  if (e.name === "$ZodError")
    throw toValidationError(e);
}
class ExecutionError extends BaseError$2 {
  constructor(cause) {
    super("An error occurred while executing calls.", {
      cause,
      metaMessages: [cause.abiError && "Reason: " + cause.abiError.name].filter(Boolean)
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Rpc.ExecutionError"
    });
    Object.defineProperty(this, "abiError", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.abiError = cause.abiError;
  }
}
const relayUrls = {
  prod: { http: "https://rpc.porto.sh" }
};
function relayProxy(transports) {
  return (config) => {
    const transport_public = transports.public(config);
    const transport_relay = transports.relay(config);
    return createTransport({
      key: relayProxy.type,
      name: "Relay Proxy",
      async request({ method, params }, options) {
        if (isRelay(method))
          return transport_relay.request({ method, params }, options);
        return transport_public.request({ method, params }, options);
      },
      type: relayProxy.type
    });
  };
}
(function(relayProxy2) {
  relayProxy2.type = "relayProxy";
})(relayProxy || (relayProxy = {}));
function isRelay(method) {
  if (method.startsWith("wallet_"))
    return true;
  if (method.startsWith("account_"))
    return true;
  if (method === "health")
    return true;
  return false;
}
const clientCache = /* @__PURE__ */ new Map();
function fromPorto(porto, config = {}) {
  const { config: config_, id, store } = porto._internal;
  const { chains: chains2, relay: relay2 } = config_;
  const state = store.getState();
  const chainId = config.chainId ?? state.chainIds[0];
  const chain = chains2.find((chain2) => chain2.id === chainId);
  if (!chain)
    throw new Error([
      "Could not find a compatible Porto chain on the given chain configuration.",
      "",
      `Provided chains: [${chains2.map((chain2) => `${chain2.name} (id: ${chain2.id})`).join(", ")}]`,
      `Needed chain (id): ${chainId}`,
      "Please add this chain (id) to your chain configuration."
    ].join("\n"));
  const transport = relayProxy({
    public: config_.transports[chain.id] ?? fallback(chain.rpcUrls.default.http.map((url) => http(url))),
    relay: relay2
  });
  const key = [id, stringify(chain)].filter(Boolean).join(":");
  if (clientCache.has(key))
    return clientCache.get(key);
  const client = createClient({
    ...config,
    chain,
    pollingInterval: 1e3,
    transport
  });
  clientCache.set(key, client);
  return client;
}
const Schema$1 = Permissions;
function fromKey$1(key, options) {
  const { chainId, expiry, permissions, id, publicKey, type } = key;
  const { address } = options;
  return {
    address,
    chainId,
    expiry,
    id,
    key: {
      publicKey,
      type
    },
    permissions: permissions ?? {}
  };
}
function toKey$1(permissions) {
  const { chainId, expiry, key } = permissions;
  return from$8({
    chainId,
    expiry,
    permissions: permissions.permissions ?? {},
    publicKey: key.publicKey,
    role: "session",
    type: key.type
  });
}
const Request = discriminatedUnion("method", [
  account_verifyEmail$1.Request,
  wallet_addFunds.Request,
  eth_accounts.Request,
  eth_chainId.Request,
  eth_requestAccounts.Request,
  eth_sendTransaction.Request,
  eth_signTypedData_v4.Request,
  wallet_getAccountVersion.Request,
  wallet_getAdmins.Request,
  wallet_getPermissions.Request,
  wallet_grantAdmin.Request,
  wallet_grantPermissions.Request,
  wallet_prepareUpgradeAccount$1.Request,
  wallet_revokeAdmin.Request,
  wallet_revokePermissions.Request,
  wallet_upgradeAccount$1.Request,
  personal_sign.Request,
  porto_ping.Request,
  wallet_connect.Request,
  wallet_disconnect.Request,
  wallet_getAssets$1.Request,
  wallet_getCallsStatus$1.Request,
  wallet_getCapabilities$1.Request,
  wallet_getKeys$1.Request,
  wallet_prepareCalls$1.Request,
  wallet_sendCalls.Request,
  wallet_sendPreparedCalls$1.Request,
  wallet_switchEthereumChain.Request,
  wallet_verifySignature$1.Request
]);
function validate(schema, value) {
  const result = safeParse(schema, value);
  if (result.error) {
    const issue = result.error.issues.at(0);
    if ((issue == null ? void 0 : issue.code) === "invalid_union" && issue.note === "No matching discriminator")
      throw new MethodNotSupportedError();
    throw new InvalidParamsError(toValidationError(result.error));
  }
  return {
    ...value,
    _decoded: result.data
  };
}
async function waitForHydration(store) {
  if (store.persist.hasHydrated())
    return;
  await new Promise((resolve) => {
    store.persist.onFinishHydration(() => resolve(true));
    setTimeout(() => resolve(true), 100);
  });
}
function toAbsolute(url) {
  if (!url)
    return void 0;
  if (url.startsWith("/"))
    return `${window.location.origin}${url}`;
  return url;
}
function from$4(parameters) {
  const { config, getMode, id, store } = parameters;
  const { announceProvider: announceProvider2 } = config;
  function getCapabilities2(parameters2 = {}) {
    var _a;
    const client = getClient();
    const request = parameters2.request ?? validate(Request, {
      method: "wallet_getCapabilities",
      params: parameters2.chainIds ? [void 0, parameters2.chainIds] : void 0
    });
    return withCache(() => getMode().actions.getCapabilities({
      chainIds: parameters2.chainIds,
      internal: {
        client,
        config,
        request,
        store
      }
    }), { cacheKey: `getCapabilities.${id}.${(_a = parameters2.chainIds) == null ? void 0 : _a.join(",")}` });
  }
  function getClient(chainId_) {
    const chainId = typeof chainId_ === "string" ? toNumber(chainId_) : chainId_;
    return fromPorto({ _internal: parameters }, { chainId });
  }
  const lock = /* @__PURE__ */ new Map();
  const preparedAccounts_internal = [];
  const emitter = createEmitter();
  const provider = from$i({
    ...emitter,
    async request(request_) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      await waitForHydration(store);
      let request;
      try {
        request = validate(Request, request_);
      } catch (e) {
        const error = e;
        if (!(error instanceof MethodNotSupportedError))
          throw error;
        if (request_.method.startsWith("wallet_"))
          throw new UnsupportedMethodError();
        return getClient().request(request_);
      }
      const state = store.getState();
      switch (request.method) {
        case "account_verifyEmail": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [parameters2] = request._decoded.params;
          const { chainId, email, token, walletAddress } = parameters2;
          const client = getClient(chainId);
          if (chainId && chainId !== client.chain.id)
            throw new ChainDisconnectedError();
          const account = walletAddress ? state.accounts.find((account2) => isEqual(account2.address, walletAddress)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          return await getMode().actions.verifyEmail({
            account,
            chainId,
            email,
            internal: {
              client,
              config,
              request,
              store
            },
            token,
            walletAddress
          });
        }
        case "wallet_addFunds": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const { address, value, token } = request.params[0] ?? {};
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          const result = await getMode().actions.addFunds({
            address: account.address,
            internal: {
              client,
              config,
              request,
              store
            },
            token,
            value
          });
          emitter.emit("message", {
            data: null,
            type: "assetsChanged"
          });
          return result;
        }
        case "eth_accounts": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          return state.accounts.map((account) => account.address);
        }
        case "eth_chainId": {
          return fromNumber(state.chainIds[0]);
        }
        case "eth_requestAccounts": {
          if (state.accounts.length > 0 && lock.get("eth_requestAccounts"))
            return state.accounts.map((account) => account.address);
          const client = getClient();
          const { accounts } = await getMode().actions.loadAccounts({
            internal: {
              client,
              config,
              request,
              store
            }
          });
          store.setState((x) => ({ ...x, accounts }));
          emitter.emit("connect", {
            chainId: fromNumber(client.chain.id)
          });
          lock.set("eth_requestAccounts", true);
          setTimeout(() => lock.delete("eth_requestAccounts"), 1e3);
          return accounts.map((account) => account.address);
        }
        case "eth_sendTransaction": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ capabilities, chainId, data = "0x", from: from2, to, value }] = request._decoded.params;
          const client = getClient(chainId);
          if (chainId && chainId !== client.chain.id)
            throw new ChainDisconnectedError();
          const account = from2 ? state.accounts.find((account2) => isEqual(account2.address, from2)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const { id: id2 } = await getMode().actions.sendCalls({
            account,
            asTxHash: true,
            calls: [
              {
                data,
                to,
                value
              }
            ],
            internal: {
              client,
              config,
              request,
              store
            },
            merchantUrl: toAbsolute(config.merchantUrl ?? (capabilities == null ? void 0 : capabilities.merchantUrl))
          });
          return id2;
        }
        case "eth_signTypedData_v4": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [address, data] = request._decoded.params;
          const account = state.accounts.find((account2) => isEqual(account2.address, address));
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          const signature = await getMode().actions.signTypedData({
            account,
            data,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          return signature;
        }
        case "wallet_grantAdmin": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, capabilities, chainId, key: keyToAuthorize }] = request._decoded.params ?? [{}];
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient(chainId);
          const keyExists = (_a = getAdmins([...account.keys ?? []])) == null ? void 0 : _a.some((key2) => {
            var _a2;
            return ((_a2 = key2.publicKey) == null ? void 0 : _a2.toLowerCase()) === keyToAuthorize.publicKey.toLowerCase();
          });
          if (keyExists)
            throw new InvalidParamsError({
              message: "Key already granted as admin."
            });
          const { key } = await getMode().actions.grantAdmin({
            account,
            feeToken: capabilities == null ? void 0 : capabilities.feeToken,
            internal: {
              client,
              config,
              request,
              store
            },
            key: keyToAuthorize
          });
          store.setState((x) => {
            const index = x.accounts.findIndex((x2) => account ? isEqual(x2.address, account.address) : true);
            if (index === -1)
              return x;
            return {
              ...x,
              accounts: x.accounts.map((account2, i) => i === index ? { ...account2, keys: [...account2.keys ?? [], key] } : account2)
            };
          });
          const admins = getAdmins([...account.keys ?? [], key]);
          emitter.emit("message", {
            data: null,
            type: "adminsChanged"
          });
          return encode$4(wallet_grantAdmin.Response, {
            address: account.address,
            chainId: client.chain.id,
            key: admins.at(-1)
          });
        }
        case "wallet_grantPermissions": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, chainId, ...permissions }] = request._decoded.params ?? [{}];
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient(chainId);
          const { key } = await getMode().actions.grantPermissions({
            account,
            internal: {
              client,
              config,
              request,
              store
            },
            permissions
          });
          store.setState((x) => {
            const index = x.accounts.findIndex((x2) => account ? isEqual(x2.address, account.address) : true);
            if (index === -1)
              return x;
            return {
              ...x,
              accounts: x.accounts.map((account2, i) => i === index ? { ...account2, keys: [...account2.keys ?? [], key] } : account2)
            };
          });
          emitter.emit("message", {
            data: null,
            type: "permissionsChanged"
          });
          return encode$4(wallet_grantPermissions.Response, {
            ...fromKey$1(key, {
              address: account.address
            })
          });
        }
        case "wallet_getAdmins": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, chainId }] = request._decoded.params ?? [{}];
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient(chainId);
          const keys = await getMode().actions.getKeys({
            account,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          const admins = getAdmins(keys);
          return encode$4(wallet_getAdmins.Response, {
            address: account.address,
            chainId: client.chain.id,
            keys: admins
          });
        }
        case "wallet_prepareUpgradeAccount": {
          const [{ address, capabilities, chainId }] = request._decoded.params ?? [{}];
          const { email, label, grantPermissions: permissions } = capabilities ?? {};
          const client = getClient(chainId);
          const { context, digests } = await getMode().actions.prepareUpgradeAccount({
            address,
            email,
            internal: {
              client,
              config,
              request,
              store
            },
            label,
            permissions
          });
          preparedAccounts_internal.push(context.account);
          return {
            context,
            digests
          };
        }
        case "wallet_getAccountVersion": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address }] = request._decoded.params ?? [{}];
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          const { current, latest } = await getMode().actions.getAccountVersion({
            address: account.address,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          return {
            current,
            latest
          };
        }
        case "wallet_getKeys": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, chainIds }] = request._decoded.params ?? [{}];
          const account = state.accounts.find((account2) => isEqual(account2.address, address));
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          const keys = await getMode().actions.getKeys({
            account,
            chainIds,
            internal: { client, config, request, store }
          });
          return encode$4(wallet_getKeys$1.Response, keys);
        }
        case "wallet_getPermissions": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, chainIds }] = request._decoded.params ?? [{}];
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          const keys = await getMode().actions.getKeys({
            account,
            chainIds,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          const permissions = getActivePermissions(keys, {
            address: account.address
          });
          return permissions;
        }
        case "wallet_revokeAdmin": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, capabilities, id: id2 }] = request._decoded.params;
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          await getMode().actions.revokeAdmin({
            account,
            feeToken: capabilities == null ? void 0 : capabilities.feeToken,
            id: id2,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          const keys = (_b = account.keys) == null ? void 0 : _b.filter((key) => key.id.toLowerCase() !== id2.toLowerCase());
          store.setState((x) => ({
            ...x,
            accounts: x.accounts.map((x2) => isEqual(x2.address, account.address) ? {
              ...x2,
              keys
            } : x2)
          }));
          emitter.emit("message", {
            data: null,
            type: "adminsChanged"
          });
          return;
        }
        case "wallet_revokePermissions": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [{ address, capabilities, id: id2 }] = request._decoded.params;
          const account = address ? state.accounts.find((account2) => isEqual(account2.address, address)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          await getMode().actions.revokePermissions({
            account,
            feeToken: capabilities == null ? void 0 : capabilities.feeToken,
            id: id2,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          const keys = (_c = account.keys) == null ? void 0 : _c.filter((key) => key.id.toLowerCase() !== id2.toLowerCase());
          store.setState((x) => ({
            ...x,
            accounts: x.accounts.map((x2) => isEqual(x2.address, account.address) ? {
              ...x2,
              keys
            } : x2)
          }));
          emitter.emit("message", {
            data: null,
            type: "permissionsChanged"
          });
          return;
        }
        case "wallet_upgradeAccount": {
          const [{ context, signatures }] = request._decoded.params ?? [{}];
          const client = getClient();
          const account_ = preparedAccounts_internal.find((account2) => isEqual(account2.address, context.account.address));
          if (!account_)
            throw new UnauthorizedError();
          const { account } = await getMode().actions.upgradeAccount({
            account: account_,
            context,
            internal: {
              client,
              config,
              request,
              store
            },
            signatures
          });
          const admins = getAdmins(account.keys ?? []);
          const permissions = getActivePermissions(account.keys ?? [], {
            address: account.address
          });
          store.setState((x) => ({ ...x, accounts: [account] }));
          emitter.emit("connect", {
            chainId: fromNumber(client.chain.id)
          });
          return {
            address: account.address,
            capabilities: {
              admins,
              ...permissions.length > 0 ? { permissions } : {}
            }
          };
        }
        case "porto_ping": {
          return "pong";
        }
        case "personal_sign": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [data, address] = request._decoded.params;
          const account = state.accounts.find((account2) => isEqual(account2.address, address));
          if (!account)
            throw new UnauthorizedError();
          const client = getClient();
          const signature = await getMode().actions.signPersonalMessage({
            account,
            data,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          return signature;
        }
        case "wallet_connect": {
          const [{ capabilities, chainIds }] = request._decoded.params ?? [{}];
          const client = getClient(chainIds == null ? void 0 : chainIds[0]);
          const chainId = client.chain.id;
          const { createAccount, email, grantAdmins: admins, grantPermissions: permissions, selectAccount, signInWithEthereum } = capabilities ?? {};
          const internal = {
            client,
            config,
            request,
            store
          };
          const { accounts } = await (async () => {
            if (email || createAccount) {
              const { label = void 0 } = typeof createAccount === "object" ? createAccount : {};
              const { account: account2 } = await getMode().actions.createAccount({
                admins,
                email,
                internal,
                label,
                permissions,
                signInWithEthereum
              });
              return { accounts: [account2] };
            }
            const account = state.accounts[0];
            const { address, key } = (() => {
              var _a2, _b2;
              if (selectAccount) {
                if (typeof selectAccount === "object")
                  return selectAccount;
                return {
                  address: void 0,
                  key: void 0
                };
              }
              for (const key2 of (account == null ? void 0 : account.keys) ?? []) {
                if (key2.type === "webauthn-p256" && key2.role === "admin")
                  return {
                    address: account == null ? void 0 : account.address,
                    key: {
                      credentialId: key2.credentialId ?? ((_b2 = (_a2 = key2.privateKey) == null ? void 0 : _a2.credential) == null ? void 0 : _b2.id),
                      publicKey: key2.publicKey
                    }
                  };
              }
              return {
                address: void 0,
                key: void 0
              };
            })();
            const loadAccountsParams = {
              internal,
              permissions,
              signInWithEthereum
            };
            try {
              return await getMode().actions.loadAccounts({
                address,
                key,
                ...loadAccountsParams
              });
            } catch (error) {
              if (error instanceof UserRejectedRequestError)
                throw error;
              if (address && key)
                return await getMode().actions.loadAccounts(loadAccountsParams);
              throw error;
            }
          })();
          store.setState((x) => ({ ...x, accounts }));
          const chainIds_response = [
            chainId,
            ...store.getState().chainIds.filter((id2) => id2 !== chainId)
          ];
          emitter.emit("connect", {
            chainId: fromNumber(chainIds_response[0])
          });
          return {
            accounts: accounts.map((account) => ({
              address: account.address,
              capabilities: {
                admins: account.keys ? getAdmins(account.keys) : [],
                permissions: account.keys ? getActivePermissions(account.keys, {
                  address: account.address
                }) : [],
                ...account.signInWithEthereum && {
                  signInWithEthereum: account.signInWithEthereum
                }
              }
            })),
            chainIds: chainIds_response.map((chainId2) => fromNumber(chainId2))
          };
        }
        case "wallet_disconnect": {
          const client = getClient();
          await ((_e = (_d = getMode().actions).disconnect) == null ? void 0 : _e.call(_d, {
            internal: {
              client,
              config,
              request,
              store
            }
          }));
          store.setState((x) => ({ ...x, accounts: [] }));
          emitter.emit("disconnect", new DisconnectedError());
          return;
        }
        case "wallet_getAssets": {
          const [parameters2] = request._decoded.params ?? [];
          const { account, chainFilter, assetFilter, assetTypeFilter } = parameters2;
          const client = getClient();
          const response = await getMode().actions.getAssets({
            account,
            assetFilter,
            assetTypeFilter,
            chainFilter,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          const value = Object.entries(response).reduce((acc, [key, value2]) => {
            acc[fromNumber(Number(key))] = value2;
            return acc;
          }, {});
          return encode$4(wallet_getAssets$1.Response, value);
        }
        case "wallet_getCallsStatus": {
          const [id2] = request._decoded.params ?? [];
          const client = getClient();
          const response = await getMode().actions.getCallsStatus({
            id: id2,
            internal: {
              client,
              config,
              request,
              store
            }
          });
          return response;
        }
        case "wallet_getCapabilities": {
          const [_, chainIds] = request.params ?? [];
          const capabilities = await getCapabilities2({
            chainIds,
            request
          });
          return capabilities;
        }
        case "wallet_prepareCalls": {
          const [parameters2] = request._decoded.params;
          const { calls, capabilities, chainId, key, from: from2 } = parameters2;
          const client = getClient(chainId);
          const account = from2 ?? state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          if (chainId && chainId !== client.chain.id)
            throw new ChainDisconnectedError();
          const { digest, ...rest } = await getMode().actions.prepareCalls({
            account: from$7(account),
            calls,
            feeToken: capabilities == null ? void 0 : capabilities.feeToken,
            internal: {
              client,
              config,
              request,
              store
            },
            key,
            merchantUrl: toAbsolute(config.merchantUrl ?? (capabilities == null ? void 0 : capabilities.merchantUrl)),
            requiredFunds: capabilities == null ? void 0 : capabilities.requiredFunds
          });
          return encode$4(wallet_prepareCalls$1.Response, {
            capabilities: rest.capabilities,
            chainId: fromNumber(rest.chainId ?? client.chain.id),
            context: {
              ...rest.context,
              account: {
                address: rest.account.address
              },
              calls: rest.context.calls ?? [],
              nonce: rest.context.nonce ?? 0n
            },
            digest,
            key: rest.key,
            typedData: rest.typedData
          });
        }
        case "wallet_sendPreparedCalls": {
          const [parameters2] = request._decoded.params;
          const { chainId, context, key, signature } = parameters2;
          const { account } = parameters2.context;
          const client = getClient(chainId);
          if (chainId && toNumber(chainId) !== client.chain.id)
            throw new ChainDisconnectedError();
          const hash2 = await getMode().actions.sendPreparedCalls({
            account: from$7(account),
            context,
            internal: {
              client,
              config,
              request,
              store
            },
            key,
            signature
          });
          return [{ id: hash2 }];
        }
        case "wallet_sendCalls": {
          if (state.accounts.length === 0)
            throw new DisconnectedError();
          const [parameters2] = request._decoded.params;
          const { calls, capabilities, chainId, from: from2 } = parameters2;
          const client = getClient(chainId);
          if (chainId && chainId !== client.chain.id)
            throw new ChainDisconnectedError();
          const account = from2 ? state.accounts.find((account2) => isEqual(account2.address, from2)) : state.accounts[0];
          if (!account)
            throw new UnauthorizedError();
          const { id: id2 } = await getMode().actions.sendCalls({
            account,
            calls,
            feeToken: capabilities == null ? void 0 : capabilities.feeToken,
            internal: {
              client,
              config,
              request,
              store
            },
            merchantUrl: toAbsolute(config.merchantUrl ?? (capabilities == null ? void 0 : capabilities.merchantUrl)),
            permissionsId: (_f = capabilities == null ? void 0 : capabilities.permissions) == null ? void 0 : _f.id,
            requiredFunds: capabilities == null ? void 0 : capabilities.requiredFunds
          });
          return { id: id2 };
        }
        case "wallet_switchEthereumChain": {
          const [parameters2] = request._decoded.params;
          const { chainId } = parameters2;
          const chainId_number = toNumber(chainId);
          const chain = config.chains.find((chain2) => chain2.id === chainId_number);
          if (!chain)
            throw new UnsupportedChainIdError();
          const client = getClient(chainId);
          await ((_h = (_g = getMode().actions).switchChain) == null ? void 0 : _h.call(_g, {
            chainId: client.chain.id,
            internal: {
              client,
              config,
              request,
              store
            }
          }));
          store.setState((state2) => ({
            ...state2,
            chainIds: [
              chainId_number,
              ...state2.chainIds.filter((id2) => id2 !== chainId_number)
            ]
          }));
          return void 0;
        }
        case "wallet_verifySignature": {
          const [parameters2] = request._decoded.params;
          const { address, chainId, digest, signature } = parameters2;
          const client = getClient(chainId);
          const result = await verifySignature(client, {
            address,
            digest,
            signature
          });
          return {
            ...result,
            address,
            chainId: fromNumber(client.chain.id)
          };
        }
      }
    }
  });
  function setup() {
    let unsubscribe_accounts = () => {
    };
    let unsubscribe_chain = () => {
    };
    waitForHydration(store).then(() => {
      getCapabilities2().catch(() => {
      });
      unsubscribe_accounts();
      unsubscribe_accounts = store.subscribe((state) => state.accounts, (accounts) => {
        emitter.emit("accountsChanged", accounts.map((account) => account.address));
      }, {
        equalityFn: (a, b) => a.every((a2, index) => {
          var _a;
          return a2.address === ((_a = b[index]) == null ? void 0 : _a.address);
        })
      });
      unsubscribe_chain();
      unsubscribe_chain = store.subscribe((state) => state.chainIds[0], (chainId, previousChainId) => {
        if (chainId === previousChainId)
          return;
        emitter.emit("chainChanged", fromNumber(chainId));
      });
    });
    const unannounce = announce(provider, announceProvider2);
    return () => {
      unsubscribe_accounts();
      unsubscribe_chain();
      unannounce();
    };
  }
  const destroy = setup();
  return Object.assign(provider, {
    _internal: {
      destroy
    }
  });
}
function announce(provider, info) {
  if (!info)
    return () => {
    };
  if (typeof window === "undefined" || !window.dispatchEvent)
    return () => {
    };
  const { icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIyIiBoZWlnaHQ9IjQyMiIgdmlld0JveD0iMCAwIDQyMiA0MjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MjIiIGhlaWdodD0iNDIyIiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMV8xNSkiPgo8cGF0aCBkPSJNODEgMjg2LjM2NkM4MSAyODAuODkzIDg1LjQ1MDUgMjc2LjQ1NSA5MC45NDA0IDI3Ni40NTVIMzI5LjUxMUMzMzUuMDAxIDI3Ni40NTUgMzM5LjQ1MiAyODAuODkzIDMzOS40NTIgMjg2LjM2NlYzMDYuMTg4QzMzOS40NTIgMzExLjY2MiAzMzUuMDAxIDMxNi4wOTkgMzI5LjUxMSAzMTYuMDk5SDkwLjk0MDRDODUuNDUwNSAzMTYuMDk5IDgxIDMxMS42NjIgODEgMzA2LjE4OFYyODYuMzY2WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTAuOTQwNCAyMzQuODI4Qzg1LjQ1MDUgMjM0LjgyOCA4MSAyMzkuMjY2IDgxIDI0NC43MzlWMjcxLjUzMUM4My44NDMyIDI2OS42MzMgODcuMjYyMiAyNjguNTI2IDkwLjk0MDQgMjY4LjUyNkgzMjkuNTExQzMzMy4xODggMjY4LjUyNiAzMzYuNjA4IDI2OS42MzMgMzM5LjQ1MiAyNzEuNTMxVjI0NC43MzlDMzM5LjQ1MiAyMzkuMjY2IDMzNS4wMDEgMjM0LjgyOCAzMjkuNTExIDIzNC44MjhIOTAuOTQwNFpNMzM5LjQ1MiAyODYuMzY2QzMzOS40NTIgMjgwLjg5MyAzMzUuMDAxIDI3Ni40NTUgMzI5LjUxMSAyNzYuNDU1SDkwLjk0MDRDODUuNDUwNSAyNzYuNDU1IDgxIDI4MC44OTMgODEgMjg2LjM2NlYzMDYuMTlDODEgMzExLjY2NCA4NS40NTA1IDMxNi4xMDEgOTAuOTQwNCAzMTYuMTAxSDMyOS41MTFDMzM1LjAwMSAzMTYuMTAxIDMzOS40NTIgMzExLjY2NCAzMzkuNDUyIDMwNi4xOVYyODYuMzY2WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTAuOTQwNCAxOTMuMjAxQzg1LjQ1MDUgMTkzLjIwMSA4MSAxOTcuNjM4IDgxIDIwMy4xMTJWMjI5LjkwM0M4My44NDMyIDIyOC4wMDYgODcuMjYyMiAyMjYuODk5IDkwLjk0MDQgMjI2Ljg5OUgzMjkuNTExQzMzMy4xODggMjI2Ljg5OSAzMzYuNjA4IDIyOC4wMDYgMzM5LjQ1MiAyMjkuOTAzVjIwMy4xMTJDMzM5LjQ1MiAxOTcuNjM4IDMzNS4wMDEgMTkzLjIwMSAzMjkuNTExIDE5My4yMDFIOTAuOTQwNFpNMzM5LjQ1MiAyNDQuNzM5QzMzOS40NTIgMjM5LjI2NSAzMzUuMDAxIDIzNC44MjggMzI5LjUxMSAyMzQuODI4SDkwLjk0MDRDODUuNDUwNSAyMzQuODI4IDgxIDIzOS4yNjUgODEgMjQ0LjczOVYyNzEuNTNDODEuMjE3NSAyNzEuMzg1IDgxLjQzODMgMjcxLjI0NSA4MS42NjI0IDI3MS4xMDlDODMuODMyNSAyNjkuNzk0IDg2LjMwNTQgMjY4LjkyNyA4OC45NTIzIDI2OC42MzVDODkuNjA1MSAyNjguNTYzIDkwLjI2ODQgMjY4LjUyNiA5MC45NDA0IDI2OC41MjZIMzI5LjUxMUMzMzAuMTgzIDI2OC41MjYgMzMwLjg0NiAyNjguNTYzIDMzMS40OTggMjY4LjYzNUMzMzQuNDE5IDI2OC45NTcgMzM3LjEyOCAyNjkuOTggMzM5LjQ1MiAyNzEuNTNWMjQ0LjczOVpNMzM5LjQ1MiAyODYuMzY2QzMzOS40NTIgMjgxLjAyMSAzMzUuMjA2IDI3Ni42NjMgMzI5Ljg5MyAyNzYuNDYyQzMyOS43NjcgMjc2LjQ1NyAzMjkuNjQgMjc2LjQ1NSAzMjkuNTExIDI3Ni40NTVIOTAuOTQwNEM4NS40NTA1IDI3Ni40NTUgODEgMjgwLjg5MyA4MSAyODYuMzY2VjMwNi4xODhDODEgMzExLjY2MiA4NS40NTA1IDMxNi4xMDEgOTAuOTQwNCAzMTYuMTAxSDMyOS41MTFDMzM1LjAwMSAzMTYuMTAxIDMzOS40NTIgMzExLjY2MiAzMzkuNDUyIDMwNi4xODhWMjg2LjM2NloiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBvcGFjaXR5PSIwLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTguMDE0NiAxMDRDODguNjE3NyAxMDQgODEgMTExLjU5NSA4MSAxMjAuOTY1VjE4OC4yNzZDODMuODQzMiAxODYuMzc5IDg3LjI2MjIgMTg1LjI3MiA5MC45NDA0IDE4NS4yNzJIMzI5LjUxMUMzMzMuMTg4IDE4NS4yNzIgMzM2LjYwOCAxODYuMzc5IDMzOS40NTIgMTg4LjI3NlYxMjAuOTY1QzMzOS40NTIgMTExLjU5NSAzMzEuODMzIDEwNCAzMjIuNDM3IDEwNEg5OC4wMTQ2Wk0zMzkuNDUyIDIwMy4xMTJDMzM5LjQ1MiAxOTcuNjM4IDMzNS4wMDEgMTkzLjIwMSAzMjkuNTExIDE5My4yMDFIOTAuOTQwNEM4NS40NTA1IDE5My4yMDEgODEgMTk3LjYzOCA4MSAyMDMuMTEyVjIyOS45MDNDODEuMjE3NSAyMjkuNzU4IDgxLjQzODMgMjI5LjYxOCA4MS42NjI0IDIyOS40ODJDODMuODMyNSAyMjguMTY3IDg2LjMwNTQgMjI3LjMgODguOTUyMyAyMjcuMDA4Qzg5LjYwNTEgMjI2LjkzNiA5MC4yNjg0IDIyNi44OTkgOTAuOTQwNCAyMjYuODk5SDMyOS41MTFDMzMwLjE4MyAyMjYuODk5IDMzMC44NDYgMjI2LjkzNiAzMzEuNDk4IDIyNy4wMDhDMzM0LjQxOSAyMjcuMzMgMzM3LjEyOCAyMjguMzUyIDMzOS40NTIgMjI5LjkwM1YyMDMuMTEyWk0zMzkuNDUyIDI0NC43MzlDMzM5LjQ1MiAyMzkuMzkzIDMzNS4yMDYgMjM1LjAzNiAzMjkuODkzIDIzNC44MzVDMzI5Ljc2NyAyMzQuODMgMzI5LjY0IDIzNC44MjggMzI5LjUxMSAyMzQuODI4SDkwLjk0MDRDODUuNDUwNSAyMzQuODI4IDgxIDIzOS4yNjUgODEgMjQ0LjczOVYyNzEuNTNMODEuMDcwNyAyNzEuNDgzQzgxLjI2NTMgMjcxLjM1NSA4MS40NjI1IDI3MS4yMyA4MS42NjI0IDI3MS4xMDlDODEuOTA4MyAyNzAuOTYgODIuMTU4MSAyNzAuODE3IDgyLjQxMTcgMjcwLjY3OUM4NC4zOTUzIDI2OS42MDUgODYuNjA1NCAyNjguODk0IDg4Ljk1MjMgMjY4LjYzNUM4OS4wMDUyIDI2OC42MjkgODkuMDU4IDI2OC42MjQgODkuMTExIDI2OC42MThDODkuNzEyNSAyNjguNTU3IDkwLjMyMjggMjY4LjUyNiA5MC45NDA0IDI2OC41MjZIMzI5LjUxMUMzMjkuNzM4IDI2OC41MjYgMzI5Ljk2NSAyNjguNTMgMzMwLjE5MiAyNjguNTM5QzMzMC42MzEgMjY4LjU1NSAzMzEuMDY3IDI2OC41ODcgMzMxLjQ5OCAyNjguNjM1QzMzNC40MTkgMjY4Ljk1NyAzMzcuMTI4IDI2OS45OCAzMzkuNDUyIDI3MS41M1YyNDQuNzM5Wk0zMzkuNDUyIDI4Ni4zNjZDMzM5LjQ1MiAyODEuMDIxIDMzNS4yMDYgMjc2LjY2MyAzMjkuODkzIDI3Ni40NjJMMzI5Ljg2NSAyNzYuNDYxQzMyOS43NDggMjc2LjQ1NyAzMjkuNjI5IDI3Ni40NTUgMzI5LjUxMSAyNzYuNDU1SDkwLjk0MDRDODUuNDUwNSAyNzYuNDU1IDgxIDI4MC44OTMgODEgMjg2LjM2NlYzMDYuMTg4QzgxIDMxMS42NjIgODUuNDUwNSAzMTYuMTAxIDkwLjk0MDQgMzE2LjEwMUgzMjkuNTExQzMzNS4wMDEgMzE2LjEwMSAzMzkuNDUyIDMxMS42NjIgMzM5LjQ1MiAzMDYuMTg4VjI4Ni4zNjZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjY5Ljg2OCAxMzEuNzUyQzI2OS44NjggMTI2LjI3OCAyNzQuMzE4IDEyMS44NCAyNzkuODA4IDEyMS44NEgzMTEuNjE4QzMxNy4xMDggMTIxLjg0IDMyMS41NTggMTI2LjI3OCAzMjEuNTU4IDEzMS43NTJWMTYxLjQ4NUMzMjEuNTU4IDE2Ni45NTkgMzE3LjEwOCAxNzEuMzk2IDMxMS42MTggMTcxLjM5NkgyNzkuODA4QzI3NC4zMTggMTcxLjM5NiAyNjkuODY4IDE2Ni45NTkgMjY5Ljg2OCAxNjEuNDg1VjEzMS43NTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfMTUiPgo8cmVjdCB3aWR0aD0iMjU5IiBoZWlnaHQ9IjIxMyIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgxIDEwNCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K", name = "Porto", rdns = "xyz.ithaca.porto" } = typeof info === "object" ? info : {};
  return announceProvider({
    info: {
      icon,
      name,
      rdns,
      uuid: uuidv4()
    },
    provider
  });
}
function getAdmins(keys) {
  return keys.map((key) => {
    var _a, _b, _c, _d, _e;
    if (key.role !== "admin")
      return void 0;
    try {
      return encode$4(wallet_getAdmins.Key, {
        id: key.id ?? key.publicKey,
        publicKey: key.publicKey,
        type: key.type,
        ...key.type === "webauthn-p256" ? {
          credentialId: (_b = (_a = key.privateKey) == null ? void 0 : _a.credential) == null ? void 0 : _b.id,
          privateKey: {
            credential: {
              id: (_d = (_c = key.privateKey) == null ? void 0 : _c.credential) == null ? void 0 : _d.id
            },
            rpId: (_e = key.privateKey) == null ? void 0 : _e.rpId
          }
        } : {}
      });
    } catch {
      return void 0;
    }
  }).filter(Boolean);
}
function getActivePermissions(keys, { address }) {
  return keys.map((key) => {
    if (!key.chainId)
      return void 0;
    if (key.role !== "session")
      return void 0;
    if (key.expiry > 0 && key.expiry < BigInt(Math.floor(Date.now() / 1e3)))
      return void 0;
    try {
      return encode$4(Schema$1, fromKey$1(key, { address }));
    } catch {
      return void 0;
    }
  }).filter(Boolean);
}
function from$3(mode) {
  return {
    ...mode,
    setup: mode.setup ?? (() => () => {
    })
  };
}
async function getAuthorizedExecuteKey(parameters) {
  var _a, _b, _c;
  const { account, calls, permissionsId } = parameters;
  if (typeof permissionsId !== "undefined") {
    if (permissionsId === null)
      return void 0;
    const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.publicKey === permissionsId && key2.privateKey);
    if (!key)
      throw new Error(`permission (id: ${permissionsId}) does not exist.`);
    return key;
  }
  const sessionKey = (_b = account.keys) == null ? void 0 : _b.find((key) => {
    if (!key.privateKey)
      return false;
    if (key.role !== "session")
      return false;
    if (key.expiry < BigInt(Math.floor(Date.now() / 1e3)))
      return false;
    const hasValidScope = calls.every((call) => {
      var _a2, _b2;
      return (_b2 = (_a2 = key.permissions) == null ? void 0 : _a2.calls) == null ? void 0 : _b2.some((scope) => {
        if (scope.to && scope.to !== call.to)
          return false;
        if (scope.signature) {
          if (!call.data)
            return false;
          const selector = slice$1(call.data, 0, 4);
          if (validate$3(scope.signature))
            return scope.signature === selector;
          if (getSelector$2(scope.signature) !== selector)
            return false;
        }
        return true;
      });
    });
    if (hasValidScope)
      return true;
    return false;
  });
  const adminKey = (_c = account.keys) == null ? void 0 : _c.find((key) => key.role === "admin" && key.privateKey);
  return sessionKey ?? adminKey;
}
function createStore$1(options = {}) {
  let id = options.id ?? 0;
  return {
    prepare(options2) {
      return from$2({
        id: id++,
        ...options2
      });
    },
    get id() {
      return id;
    }
  };
}
function from$2(options) {
  return {
    ...options,
    jsonrpc: "2.0"
  };
}
const Schema = Request$1;
function fromKey(key) {
  const { expiry, feeToken, permissions, publicKey, type } = key;
  return {
    expiry,
    feeToken: feeToken ?? null,
    key: {
      publicKey,
      type
    },
    permissions: permissions ?? {}
  };
}
async function toKey(request, options = {}) {
  var _a, _b;
  if (!request)
    return void 0;
  const chainId = options.chainId ?? request.chainId;
  const expiry = request.expiry ?? 0;
  const type = ((_a = request.key) == null ? void 0 : _a.type) ?? "secp256k1";
  const feeToken = request.feeToken;
  const permissions = resolvePermissions(request, {
    feeTokens: options.feeTokens
  });
  const publicKey = ((_b = request == null ? void 0 : request.key) == null ? void 0 : _b.publicKey) ?? "0x";
  const key = from$8({
    chainId,
    expiry,
    feeToken,
    permissions,
    publicKey,
    role: "session",
    type
  });
  if (request == null ? void 0 : request.key)
    return key;
  return await createWebCryptoP256({
    ...key,
    role: "session"
  });
}
const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?$/;
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]{1,5})?$/;
const localhostRegex = /^localhost(:[0-9]{1,5})?$/;
const nonceRegex = /^[a-zA-Z0-9]{8,}$/;
const schemeRegex = /^([a-zA-Z][a-zA-Z0-9+-.]*)$/;
const prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
const suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
function createMessage(value) {
  const { chainId, domain, expirationTime, issuedAt = /* @__PURE__ */ new Date(), nonce, notBefore, requestId, resources, scheme, uri, version } = value;
  {
    if (chainId !== Math.floor(chainId))
      throw new InvalidMessageFieldError({
        field: "chainId",
        metaMessages: [
          "- Chain ID must be a EIP-155 chain ID.",
          "- See https://eips.ethereum.org/EIPS/eip-155",
          "",
          `Provided value: ${chainId}`
        ]
      });
    if (!(domainRegex.test(domain) || ipRegex.test(domain) || localhostRegex.test(domain)))
      throw new InvalidMessageFieldError({
        field: "domain",
        metaMessages: [
          "- Domain must be an RFC 3986 authority.",
          "- See https://www.rfc-editor.org/rfc/rfc3986",
          "",
          `Provided value: ${domain}`
        ]
      });
    if (!nonceRegex.test(nonce))
      throw new InvalidMessageFieldError({
        field: "nonce",
        metaMessages: [
          "- Nonce must be at least 8 characters.",
          "- Nonce must be alphanumeric.",
          "",
          `Provided value: ${nonce}`
        ]
      });
    if (!isUri(uri))
      throw new InvalidMessageFieldError({
        field: "uri",
        metaMessages: [
          "- URI must be a RFC 3986 URI referring to the resource that is the subject of the signing.",
          "- See https://www.rfc-editor.org/rfc/rfc3986",
          "",
          `Provided value: ${uri}`
        ]
      });
    if (version !== "1")
      throw new InvalidMessageFieldError({
        field: "version",
        metaMessages: [
          "- Version must be '1'.",
          "",
          `Provided value: ${version}`
        ]
      });
    if (scheme && !schemeRegex.test(scheme))
      throw new InvalidMessageFieldError({
        field: "scheme",
        metaMessages: [
          "- Scheme must be an RFC 3986 URI scheme.",
          "- See https://www.rfc-editor.org/rfc/rfc3986#section-3.1",
          "",
          `Provided value: ${scheme}`
        ]
      });
    const statement2 = value.statement;
    if (statement2 == null ? void 0 : statement2.includes("\n"))
      throw new InvalidMessageFieldError({
        field: "statement",
        metaMessages: [
          "- Statement must not include '\\n'.",
          "",
          `Provided value: ${statement2}`
        ]
      });
  }
  const address = from$d(value.address, { checksum: true });
  const origin = (() => {
    if (scheme)
      return `${scheme}://${domain}`;
    return domain;
  })();
  const statement = (() => {
    if (!value.statement)
      return "";
    return `${value.statement}
`;
  })();
  const prefix = `${origin} wants you to sign in with your Ethereum account:
${address}

${statement}`;
  let suffix = `URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt.toISOString()}`;
  if (expirationTime)
    suffix += `
Expiration Time: ${expirationTime.toISOString()}`;
  if (notBefore)
    suffix += `
Not Before: ${notBefore.toISOString()}`;
  if (requestId)
    suffix += `
Request ID: ${requestId}`;
  if (resources) {
    let content = "\nResources:";
    for (const resource of resources) {
      if (!isUri(resource))
        throw new InvalidMessageFieldError({
          field: "resources",
          metaMessages: [
            "- Every resource must be a RFC 3986 URI.",
            "- See https://www.rfc-editor.org/rfc/rfc3986",
            "",
            `Provided value: ${resource}`
          ]
        });
      content += `
- ${resource}`;
    }
    suffix += content;
  }
  return `${prefix}
${suffix}`;
}
function isUri(value) {
  if (/[^a-z0-9:/?#[\]@!$&'()*+,;=.\-_~%]/i.test(value))
    return false;
  if (/%[^0-9a-f]/i.test(value))
    return false;
  if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value))
    return false;
  const splitted = splitUri(value);
  const scheme = splitted[1];
  const authority = splitted[2];
  const path = splitted[3];
  const query = splitted[4];
  const fragment = splitted[5];
  if (!((scheme == null ? void 0 : scheme.length) && path && path.length >= 0))
    return false;
  if (authority == null ? void 0 : authority.length) {
    if (!(path.length === 0 || /^\//.test(path)))
      return false;
  } else {
    if (/^\/\//.test(path))
      return false;
  }
  if (!/^[a-z][a-z0-9+\-.]*$/.test(scheme.toLowerCase()))
    return false;
  let out = "";
  out += `${scheme}:`;
  if (authority == null ? void 0 : authority.length)
    out += `//${authority}`;
  out += path;
  if (query == null ? void 0 : query.length)
    out += `?${query}`;
  if (fragment == null ? void 0 : fragment.length)
    out += `#${fragment}`;
  return out;
}
function splitUri(value) {
  return value.match(/(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
}
function parseMessage(message) {
  var _a, _b, _c;
  const { scheme, statement, ...prefix } = ((_a = message.match(prefixRegex)) == null ? void 0 : _a.groups) ?? {};
  const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = ((_b = message.match(suffixRegex)) == null ? void 0 : _b.groups) ?? {};
  const resources = (_c = message.split("Resources:")[1]) == null ? void 0 : _c.split("\n- ").slice(1);
  return {
    ...prefix,
    ...suffix,
    ...chainId ? { chainId: Number(chainId) } : {},
    ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
    ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
    ...notBefore ? { notBefore: new Date(notBefore) } : {},
    ...requestId ? { requestId } : {},
    ...resources ? { resources } : {},
    ...scheme ? { scheme } : {},
    ...statement ? { statement } : {}
  };
}
class InvalidMessageFieldError extends BaseError$2 {
  constructor(parameters) {
    const { field, metaMessages } = parameters;
    super(`Invalid Sign-In with Ethereum message field "${field}".`, {
      metaMessages
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Siwe.InvalidMessageFieldError"
    });
  }
}
async function authenticate(parameters) {
  const { address, authUrl, message, signature } = parameters;
  const { chainId } = parseMessage(message);
  return await fetch(authUrl.verify, {
    body: JSON.stringify({
      address,
      chainId,
      message,
      signature,
      walletAddress: address
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then((res) => res.json());
}
async function buildMessage(client, siwe, options) {
  var _a;
  const { chainId = (_a = client.chain) == null ? void 0 : _a.id, domain, uri, resources, version = "1" } = siwe;
  const { address } = options;
  const authUrl = siwe.authUrl ? resolveAuthUrl(siwe.authUrl) : void 0;
  if (!chainId)
    throw new Error("`chainId` is required.");
  if (!domain)
    throw new Error("`domain` is required.");
  if (!siwe.nonce && !(authUrl == null ? void 0 : authUrl.nonce))
    throw new Error("`nonce` or `authUrl.nonce` is required.");
  if (!uri)
    throw new Error("`uri` is required.");
  const nonce = await (async () => {
    if (siwe.nonce)
      return siwe.nonce;
    if (!(authUrl == null ? void 0 : authUrl.nonce))
      throw new Error("`nonce` or `authUrl.nonce` is required.");
    const response = await fetch(authUrl.nonce, {
      body: JSON.stringify({
        address,
        chainId,
        walletAddress: address
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const res = await response.json().catch(() => void 0);
    if (!(res == null ? void 0 : res.nonce))
      throw new Error("`nonce` or `authUrl.nonce` is required.");
    return res.nonce;
  })();
  const message = createMessage({
    ...siwe,
    address: options.address,
    chainId,
    domain,
    nonce,
    resources,
    uri,
    version
  });
  return message;
}
function resolveAuthUrl(authUrl, origin = "") {
  if (!authUrl)
    return void 0;
  const urls = (() => {
    if (typeof authUrl === "string") {
      const url = authUrl.replace(/\/$/, "");
      return {
        logout: url + "/logout",
        nonce: url + "/nonce",
        verify: url + "/verify"
      };
    }
    return authUrl;
  })();
  return {
    logout: resolveUrl(urls.logout, origin),
    nonce: resolveUrl(urls.nonce, origin),
    verify: resolveUrl(urls.verify, origin)
  };
}
function resolveUrl(url, origin) {
  if (!origin)
    return url;
  if (!url.startsWith("/"))
    return url;
  return origin + url;
}
function encode(data) {
  const message = from$j(data);
  return concat(
    // Personal Sign Format: `0x19 ‖ "Ethereum Signed Message:\n" ‖ message.length ‖ message`
    "0x19",
    fromString$1("Ethereum Signed Message:\n" + size$1(message)),
    message
  );
}
function getSignPayload$1(data) {
  return keccak256(encode(data));
}
function from$1(value, options) {
  const { as } = options;
  const encodable = getEncodable(value);
  const cursor = create$1(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (as === "Hex")
    return fromBytes$3(cursor.bytes);
  return cursor.bytes;
}
function fromHex(hex, options = {}) {
  const { as = "Hex" } = options;
  return from$1(hex, { as });
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode: encode2 } of list) {
        encode2(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? fromHex$4(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length <= 255)
    return 1;
  if (length <= 65535)
    return 2;
  if (length <= 16777215)
    return 3;
  if (length <= 4294967295)
    return 4;
  throw new BaseError$2("Length is too large.");
}
function getSignPayload(authorization) {
  return hash(authorization, { presign: true });
}
function hash(authorization, options = {}) {
  const { presign } = options;
  return keccak256(concat("0x05", fromHex(toTuple(presign ? {
    address: authorization.address,
    chainId: authorization.chainId,
    nonce: authorization.nonce
  } : authorization))));
}
function toTuple(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = extract(authorization);
  return [
    chainId ? fromNumber(chainId) : "0x",
    address,
    nonce ? fromNumber(nonce) : "0x",
    ...signature ? toTuple$1(signature) : []
  ];
}
async function getEip712Domain(client, parameters) {
  const { account = client.account } = parameters;
  const account_ = account ? from$7(account) : void 0;
  if (!account_)
    throw new Error("account is required.");
  const { domain: { name, version } } = await getEip712Domain$1(client, {
    address: account_.address
  });
  if (!client.chain)
    throw new Error("client.chain is required");
  return {
    chainId: client.chain.id,
    name,
    verifyingContract: account_.address,
    version
  };
}
async function getKeys(client, parameters) {
  const { account = client.account, chainIds } = parameters;
  const account_ = account ? from$7(account) : void 0;
  if (!account_)
    throw new Error("account is required.");
  const keys = await getKeys$1(client, {
    address: account_.address,
    chainIds
  });
  return Object.entries(keys).flatMap(([chainId, keys2]) => keys2.map((key) => fromRelay(key, { chainId: Number(chainId) })));
}
async function prepareCalls(client, parameters) {
  var _a;
  const { account = client.account, calls, chain = client.chain, feePayer, merchantUrl, nonce, preCalls, requiredFunds, revokeKeys } = parameters;
  const account_ = account ? from$7(account) : void 0;
  const key = parameters.key ?? (account_ ? getKey(account_, { role: "admin" }) : void 0);
  const hasSessionKey = (_a = parameters.authorizeKeys) == null ? void 0 : _a.some((x) => x.role === "session");
  const { contracts: contracts2, fees: { tokens } } = await getCapabilities(client, { chainId: chain == null ? void 0 : chain.id });
  const orchestrator = hasSessionKey ? contracts2.orchestrator.address : void 0;
  const authorizeKeys = (parameters.authorizeKeys ?? []).map((key2) => toRelay$1(key2, { feeTokens: tokens, orchestrator }));
  const feeToken = (() => {
    var _a2, _b, _c;
    if (parameters.feeToken)
      return parameters.feeToken;
    return (_c = (_b = (_a2 = key == null ? void 0 : key.permissions) == null ? void 0 : _a2.spend) == null ? void 0 : _b[0]) == null ? void 0 : _c.token;
  })();
  const preCall = typeof preCalls === "boolean" ? preCalls : false;
  const signedPreCalls = typeof preCalls === "object" ? preCalls.map(({ context: context2, signature: signature2 }) => ({
    ...context2.preCall,
    signature: signature2
  })) : void 0;
  const args = {
    address: account_ == null ? void 0 : account_.address,
    calls: calls ?? [],
    capabilities: {
      authorizeKeys,
      meta: {
        feePayer,
        feeToken,
        nonce
      },
      preCall,
      preCalls: signedPreCalls,
      requiredFunds,
      revokeKeys: revokeKeys == null ? void 0 : revokeKeys.map((key2) => ({
        hash: key2.hash
      }))
    },
    chain,
    key: key ? toRelay$1(key, { feeTokens: tokens }) : void 0
  };
  const result = await (async () => {
    if (merchantUrl) {
      const client_ = createClient({
        chain: client.chain,
        transport: http(merchantUrl)
      });
      return await prepareCalls$1(client_, args).catch((e) => {
        console.error(e);
        return prepareCalls$1(client, args);
      });
    }
    return await prepareCalls$1(client, args);
  })();
  const { capabilities, context, digest, signature, typedData } = result;
  if (merchantUrl) {
    const isValid = await verifyPrepareCallsResponse(client, {
      response: result._raw,
      signature
    });
    if (!isValid)
      throw new Error(`cannot verify integrity of \`wallet_prepareCalls\` response from ${merchantUrl}`);
  }
  return {
    capabilities: { ...capabilities, quote: context.quote },
    context,
    digest,
    key,
    typedData
  };
}
async function prepareUpgradeAccount(client, parameters) {
  const { address, authorizeKeys: keys, chain = client.chain } = parameters;
  if (!chain)
    throw new Error("chain is required.");
  const { contracts: contracts2, fees: { tokens } } = await getCapabilities(client, { chainId: chain.id });
  const delegation = parameters.delegation ?? contracts2.accountProxy.address;
  const hasSessionKey = keys.some((x) => x.role === "session");
  const orchestrator = hasSessionKey ? contracts2.orchestrator.address : void 0;
  const authorizeKeys = keys.map((key) => {
    const permissions = key.role === "session" ? key.permissions : {};
    return toRelay$1({ ...key, permissions }, { feeTokens: tokens, orchestrator });
  });
  const { capabilities, chainId, context, digests, typedData } = await prepareUpgradeAccount$1(client, {
    address,
    authorizeKeys,
    chain,
    delegation
  });
  const account = from$7({
    address,
    keys
  });
  return {
    capabilities,
    chainId,
    context: {
      ...context,
      account
    },
    digests,
    typedData
  };
}
async function sendCalls(client, parameters) {
  const { account = client.account, chain = client.chain, webAuthn } = parameters;
  if (!chain)
    throw new Error("`chain` is required.");
  const account_ = account ? from$7(account) : void 0;
  if (!account_)
    throw new Error("`account` is required.");
  const key = parameters.key ?? getKey(account_, parameters);
  if (!key && !account_.sign)
    throw new Error("`key` or `account` with `sign` is required");
  const preCalls = await Promise.all((parameters.preCalls ?? []).map(async (pre) => {
    if (pre.signature)
      return pre;
    const { authorizeKeys, key: key2, calls, revokeKeys } = pre;
    const { context: context2, digest: digest2 } = await prepareCalls(client, {
      account: account_,
      authorizeKeys,
      calls,
      chain,
      feeToken: parameters.feeToken,
      key: key2,
      preCalls: true,
      revokeKeys
    });
    const signature2 = await sign$1(key2, {
      address: null,
      payload: digest2,
      webAuthn
    });
    return { context: context2, signature: signature2 };
  }));
  const { capabilities, context, digest } = await prepareCalls(client, {
    ...parameters,
    account: account_,
    chain,
    key,
    preCalls
  });
  const signature = await (async () => {
    if (key)
      return await sign$1(key, {
        address: null,
        payload: digest,
        webAuthn,
        wrap: false
      });
    return await account_.sign({
      hash: digest
    });
  })();
  return await sendPreparedCalls(client, {
    capabilities: capabilities.feeSignature ? {
      feeSignature: capabilities.feeSignature
    } : void 0,
    context,
    key,
    signature
  });
}
async function sendPreparedCalls(client, parameters) {
  const { capabilities, context, key, signature } = parameters;
  return await sendPreparedCalls$1(client, {
    capabilities,
    context,
    key: key ? toRelay$1(key) : void 0,
    signature
  });
}
async function setEmail(client, parameters) {
  const { email, walletAddress } = parameters;
  return await setEmail$1(client, {
    email,
    walletAddress
  });
}
async function upgradeAccount(client, parameters) {
  if (parameters.account) {
    const { account: account2 } = parameters;
    const authorizeKeys = [
      ...account2.keys ?? [],
      ...parameters.authorizeKeys ?? []
    ].filter((key, index, array) => array.findIndex((k) => k.id === key.id) === index);
    const { digests, ...request } = await prepareUpgradeAccount(client, {
      ...parameters,
      address: account2.address,
      authorizeKeys
    });
    const signatures2 = {
      auth: await account2.sign({ hash: digests.auth }),
      exec: await account2.sign({ hash: digests.exec })
    };
    return await upgradeAccount(client, {
      ...request,
      signatures: signatures2
    });
  }
  const { context, signatures } = parameters;
  const account = from$7(context.account);
  await upgradeAccount$1(client, {
    context,
    signatures
  });
  return account;
}
async function verifyEmail(client, parameters) {
  const { chainId, email, signature, token, walletAddress } = parameters;
  return await verifyEmail$1(client, {
    chainId,
    email,
    signature,
    token,
    walletAddress
  });
}
const magicBytes = "0x8010801080108010801080108010801080108010801080108010801080108010";
const suffixParameters = from$b("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
function assert(value) {
  if (typeof value === "string") {
    if (slice$1(value, -32) !== magicBytes)
      throw new InvalidWrappedSignatureError(value);
  } else
    assert$2(value.authorization);
}
function wrap$1(value) {
  const { data, signature } = value;
  assert(value);
  const self = recoverAddress({
    payload: getSignPayload(value.authorization),
    signature: from$c(value.authorization)
  });
  const suffix = encode$2(suffixParameters, [
    {
      ...value.authorization,
      delegation: value.authorization.address,
      chainId: BigInt(value.authorization.chainId)
    },
    value.to ?? self,
    data ?? "0x"
  ]);
  const suffixLength = fromNumber(size$1(suffix), { size: 32 });
  return concat(signature, suffix, suffixLength, magicBytes);
}
class InvalidWrappedSignatureError extends BaseError$2 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc8010.InvalidWrappedSignatureError"
    });
  }
}
async function wrap(client, parameters) {
  const { address } = parameters;
  const { authorization, data, to } = await getAuthorization(client, {
    address
  });
  return wrap$1({
    authorization: {
      ...authorization,
      nonce: BigInt(authorization.nonce),
      r: BigInt(authorization.r),
      s: BigInt(authorization.s)
    },
    data,
    signature: parameters.signature,
    to
  });
}
function toRelay(requiredFunds, options) {
  const { tokens } = options;
  const interopTokens = tokens.filter((token) => token.interop);
  return requiredFunds.map((requiredFund) => {
    if (requiredFund.address)
      return requiredFund;
    const interopToken = interopTokens.find((token) => token.symbol === requiredFund.symbol);
    if (!interopToken)
      throw new Error(`interop token not found: ${requiredFund.symbol}`);
    return {
      address: interopToken.address,
      value: from$9(requiredFund.value, interopToken.decimals)
    };
  });
}
async function getTokens(client, parameters) {
  const { chain = client.chain } = parameters ?? {};
  const tokens = await getCapabilities(client, {
    chainId: chain == null ? void 0 : chain.id
  }).then((capabilities) => capabilities.fees.tokens);
  return tokens;
}
async function getToken(client, parameters) {
  const { addressOrSymbol } = parameters;
  const tokens = await getTokens(client, parameters);
  return tokens.find(getToken.predicate(addressOrSymbol));
}
(function(getToken2) {
  function predicate(addressOrSymbol) {
    return (token) => {
      if (!addressOrSymbol)
        return false;
      if (validate$1(addressOrSymbol))
        return isEqual(token.address, addressOrSymbol);
      if (addressOrSymbol === "native")
        return token.address === zeroAddress;
      return addressOrSymbol === token.symbol;
    };
  }
  getToken2.predicate = predicate;
})(getToken || (getToken = {}));
async function resolveFeeToken$1(client, parameters) {
  const { chain = client.chain, store } = parameters ?? {};
  const state = (store == null ? void 0 : store.getState()) ?? {};
  const addressOrSymbol = (parameters == null ? void 0 : parameters.addressOrSymbol) ?? state.feeToken;
  const feeTokens = await getTokens(client, { chain }).then((tokens) => tokens.filter((token) => token.feeToken));
  const feeToken = feeTokens == null ? void 0 : feeTokens.find((feeToken2) => {
    if (!addressOrSymbol)
      return false;
    if (addressOrSymbol === "native" && feeToken2.address === zeroAddress)
      return true;
    if (validate$1(addressOrSymbol) && isEqual(feeToken2.address, addressOrSymbol))
      return true;
    return addressOrSymbol === feeToken2.symbol;
  });
  return feeToken;
}
function relay(parameters = {}) {
  const config = parameters;
  const { mock, multichain = true, webAuthn } = config;
  let address_internal;
  let email_internal;
  const keystoreHost = (() => {
    var _a;
    if (config.keystoreHost === "self")
      return void 0;
    if (typeof window !== "undefined" && ((_a = window.location) == null ? void 0 : _a.hostname) === "localhost")
      return void 0;
    return config.keystoreHost;
  })();
  return from$3({
    actions: {
      async addFunds() {
        throw new UnsupportedMethodError();
      },
      async createAccount(parameters2) {
        const { admins, email, label, permissions, internal, signInWithEthereum } = parameters2;
        const { client } = internal;
        const eoa = fromPrivateKey(randomPrivateKey$1());
        const feeTokens = await getTokens(client);
        const adminKey = !mock ? await createWebAuthnP256({
          createFn: webAuthn == null ? void 0 : webAuthn.createFn,
          label: label || `${eoa.address.slice(0, 8)}…${eoa.address.slice(-6)}`,
          rpId: keystoreHost,
          userId: from$f(eoa.address)
        }) : createHeadlessWebAuthnP256();
        const sessionKey = await toKey(permissions, {
          chainId: client.chain.id,
          feeTokens
        });
        const adminKeys = admins == null ? void 0 : admins.map((admin) => from$8(admin));
        const account = await upgradeAccount(client, {
          account: eoa,
          authorizeKeys: [
            adminKey,
            ...adminKeys ?? [],
            ...sessionKey ? [sessionKey] : []
          ]
        });
        address_internal = eoa.address;
        if (email && label)
          await setEmail(client, {
            email: label,
            walletAddress: account.address
          });
        const signInWithEthereum_response = await (async () => {
          if (!signInWithEthereum)
            return void 0;
          const message = await buildMessage(client, signInWithEthereum, {
            address: account.address
          });
          const signature = await sign(eoa, {
            payload: getSignPayload$1(fromString$1(message))
          });
          const signature_erc8010 = await wrap(client, {
            address: account.address,
            signature
          });
          return { message, signature: signature_erc8010 };
        })();
        return {
          account: {
            ...account,
            signInWithEthereum: signInWithEthereum_response
          }
        };
      },
      async getAccountVersion(parameters2) {
        const { address, internal } = parameters2;
        const { client } = internal;
        const { contracts: contracts2 } = await getCapabilities(client);
        const { accountImplementation } = contracts2;
        const latest = await getEip712Domain(client, {
          account: from$7(accountImplementation)
        }).then((x) => x.version);
        const current = await getEip712Domain(client, {
          account: address
        }).then((x) => x.version).catch(() => latest);
        if (!current || !latest)
          throw new Error("version not found.");
        return { current, latest };
      },
      async getAssets(parameters2) {
        const { account, chainFilter, assetFilter, assetTypeFilter, internal } = parameters2;
        const { client } = internal;
        const result = await getAssets(client, {
          account,
          assetFilter,
          assetTypeFilter,
          chainFilter
        });
        return result;
      },
      async getCallsStatus(parameters2) {
        var _a;
        const { id, internal } = parameters2;
        const { client } = internal;
        const result = await getCallsStatus(client, {
          id
        });
        return {
          atomic: true,
          chainId: fromNumber(client.chain.id),
          id,
          receipts: (_a = result.receipts) == null ? void 0 : _a.map((receipt) => ({
            blockHash: receipt.blockHash,
            blockNumber: fromNumber(receipt.blockNumber),
            gasUsed: fromNumber(receipt.gasUsed),
            logs: receipt.logs,
            status: receipt.status,
            transactionHash: receipt.transactionHash
          })),
          status: result.status,
          version: "1.0"
        };
      },
      async getCapabilities(parameters2) {
        const { chainIds, internal } = parameters2;
        const { client } = internal;
        const base2 = {
          atomic: {
            status: "supported"
          },
          atomicBatch: {
            supported: true
          },
          feeToken: {
            supported: true,
            tokens: []
          },
          merchant: {
            supported: true
          },
          permissions: {
            supported: true
          },
          requiredFunds: {
            supported: Boolean(multichain),
            tokens: []
          }
        };
        const capabilities = await getCapabilities(client, {
          chainIds: chainIds ? chainIds.map((id) => toNumber(id)) : "all",
          raw: true
        });
        return Object.entries(capabilities).reduce((acc, [chainId, capabilities2]) => ({
          // biome-ignore lint/performance/noAccumulatingSpread: _
          ...acc,
          [chainId]: {
            ...base2,
            ...capabilities2,
            feeToken: {
              supported: true,
              tokens: capabilities2.fees.tokens
            },
            requiredFunds: {
              supported: Boolean(multichain),
              tokens: multichain ? capabilities2.fees.tokens.filter((token) => token.interop) : []
            }
          }
        }), {});
      },
      async getKeys(parameters2) {
        const { account, chainIds, internal } = parameters2;
        const { client } = internal;
        const keys = await getKeys(client, {
          account,
          chainIds
        });
        return uniqBy([...keys, ...account.keys ?? []], (key) => key.publicKey);
      },
      async grantAdmin(parameters2) {
        const { account, internal } = parameters2;
        const { client } = internal;
        const authorizeKey = from$8(parameters2.key, {
          chainId: client.chain.id
        });
        const feeToken = await resolveFeeToken$1(client, {
          addressOrSymbol: parameters2.feeToken,
          store: internal.store
        });
        const { id } = await sendCalls(client, {
          account,
          authorizeKeys: [authorizeKey],
          feeToken: feeToken == null ? void 0 : feeToken.address,
          webAuthn
        });
        await waitForCallsStatus(client, {
          id,
          pollingInterval: 500
        });
        return { key: authorizeKey };
      },
      async grantPermissions(parameters2) {
        var _a;
        const { account, internal, permissions } = parameters2;
        const { client } = internal;
        const feeTokens = await getTokens(client);
        const authorizeKey = await toKey(permissions, {
          chainId: client.chain.id,
          feeTokens
        });
        if (!authorizeKey)
          throw new Error("key to authorize not found.");
        const adminKey = (_a = account.keys) == null ? void 0 : _a.find((key) => key.role === "admin" && key.privateKey);
        if (!adminKey)
          throw new Error("admin key not found.");
        const { context, digest } = await prepareCalls(client, {
          account,
          authorizeKeys: [authorizeKey],
          key: adminKey,
          preCalls: true
        });
        const signature = await sign$1(adminKey, {
          address: null,
          payload: digest
        });
        await sendPreparedCalls(client, {
          context,
          key: adminKey,
          signature
        });
        return { key: authorizeKey };
      },
      async loadAccounts(parameters2) {
        const { internal, permissions, signInWithEthereum } = parameters2;
        const { client } = internal;
        const feeTokens = await getTokens(client);
        const authorizeKey = await toKey(permissions, {
          chainId: client.chain.id,
          feeTokens
        });
        const { digest, digestType, message } = await (async () => {
          if (signInWithEthereum && parameters2.address) {
            const message2 = await buildMessage(client, signInWithEthereum, {
              address: parameters2.address
            });
            return {
              context: void 0,
              digest: getSignPayload$1(fromString$1(message2)),
              digestType: "siwe",
              message: message2
            };
          }
          return {
            context: void 0,
            digest: "0x",
            message: void 0
          };
        })();
        const { address, credentialId, webAuthnSignature } = await (async () => {
          if (mock) {
            if (!address_internal)
              throw new Error("address_internal not found.");
            return {
              address: address_internal,
              credentialId: void 0
            };
          }
          if (parameters2.address && parameters2.key)
            return {
              address: parameters2.address,
              credentialId: parameters2.key.credentialId
            };
          const webAuthnSignature2 = await sign$3({
            challenge: digest,
            getFn: webAuthn == null ? void 0 : webAuthn.getFn,
            rpId: keystoreHost
          });
          const response = webAuthnSignature2.raw.response;
          const address2 = toHex$2(new Uint8Array(response.userHandle));
          const credentialId2 = webAuthnSignature2.raw.id;
          return { address: address2, credentialId: credentialId2, webAuthnSignature: webAuthnSignature2 };
        })();
        const keys = await getKeys(client, {
          account: address,
          chainIds: [client.chain.id]
        });
        const account = from$7({
          address,
          keys: [...keys, ...authorizeKey ? [authorizeKey] : []].map((key, i) => {
            if (i === 0) {
              if (key.type === "webauthn-p256")
                return fromWebAuthnP256({
                  ...key,
                  credential: {
                    id: credentialId,
                    publicKey: fromHex$3(key.publicKey)
                  },
                  id: address,
                  rpId: keystoreHost
                });
            }
            return key;
          })
        });
        const adminKey = getKey(account, { role: "admin" });
        const signature = await (async () => {
          if (digest === "0x")
            return void 0;
          if (webAuthnSignature)
            return wrapSignature(serializeWebAuthnSignature(webAuthnSignature), {
              keyType: "webauthn-p256",
              publicKey: adminKey.publicKey
            });
          return await sign$1(adminKey, {
            address: account.address,
            payload: digest
          });
        })();
        if (authorizeKey) {
          const { context, digest: digest2 } = await prepareCalls(client, {
            account,
            authorizeKeys: [authorizeKey],
            preCalls: true
          });
          const signature2 = await sign$1(adminKey, {
            address: null,
            payload: digest2
          });
          await sendPreparedCalls(client, {
            context,
            key: adminKey,
            signature: signature2
          });
        }
        const signInWithEthereum_response = await (async () => {
          if (!signInWithEthereum)
            return void 0;
          if (digestType === "siwe" && message && signature) {
            const signature_erc8010 = await wrap(client, {
              address: account.address,
              signature
            });
            return { message, signature: signature_erc8010 };
          }
          {
            const message2 = await buildMessage(client, signInWithEthereum, {
              address: account.address
            });
            const signature2 = await sign(account, {
              payload: getSignPayload$1(fromString$1(message2)),
              role: "admin"
            });
            const signature_erc8010 = await wrap(client, {
              address: account.address,
              signature: signature2
            });
            return {
              message: message2,
              signature: signature_erc8010
            };
          }
        })();
        return {
          accounts: [
            {
              ...account,
              signInWithEthereum: signInWithEthereum_response
            }
          ]
        };
      },
      async prepareCalls(parameters2) {
        var _a;
        const { account, calls, internal, merchantUrl } = parameters2;
        const { client } = internal;
        const key = parameters2.key ?? await getAuthorizedExecuteKey({
          account,
          calls
        });
        if (!key)
          throw new Error("cannot find authorized key to sign with.");
        const [tokens, feeToken] = await Promise.all([
          getTokens(client),
          resolveFeeToken$1(client, {
            addressOrSymbol: parameters2.feeToken,
            store: internal.store
          })
        ]);
        const requiredFunds = toRelay(parameters2.requiredFunds ?? [], {
          tokens
        });
        const { capabilities, context, digest, typedData } = await prepareCalls(client, {
          account,
          calls,
          feeToken: feeToken == null ? void 0 : feeToken.address,
          key,
          merchantUrl,
          requiredFunds: multichain ? requiredFunds : void 0
        });
        const quotes = ((_a = context.quote) == null ? void 0 : _a.quotes) ?? [];
        const outputQuote = quotes[quotes.length - 1];
        return {
          account,
          capabilities: {
            ...capabilities,
            quote: context.quote
          },
          chainId: client.chain.id,
          context: {
            ...context,
            account,
            calls,
            nonce: outputQuote == null ? void 0 : outputQuote.intent.nonce
          },
          digest,
          key,
          typedData
        };
      },
      async prepareUpgradeAccount(parameters2) {
        const { address, email, label, internal, permissions } = parameters2;
        const { client } = internal;
        const [tokens, feeToken] = await Promise.all([
          getTokens(client),
          resolveFeeToken$1(client, {
            store: internal.store
          })
        ]);
        const adminKey = !mock ? await createWebAuthnP256({
          createFn: webAuthn == null ? void 0 : webAuthn.createFn,
          label: label || `${address.slice(0, 8)}…${address.slice(-6)}`,
          rpId: keystoreHost,
          userId: from$f(address)
        }) : createHeadlessWebAuthnP256();
        const sessionKey = await toKey(permissions, {
          chainId: client.chain.id,
          feeTokens: tokens
        });
        const { context, digests } = await prepareUpgradeAccount(client, {
          address,
          authorizeKeys: [adminKey, ...sessionKey ? [sessionKey] : []],
          feeToken: feeToken == null ? void 0 : feeToken.address
        });
        if (email)
          email_internal = label;
        return {
          context,
          digests
        };
      },
      async revokeAdmin(parameters2) {
        var _a, _b, _c;
        const { account, id, internal } = parameters2;
        const { client } = internal;
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.id === id);
        if (!key)
          return;
        if (key.type === "webauthn-p256" && ((_b = account.keys) == null ? void 0 : _b.filter((key2) => key2.type === "webauthn-p256").length) === 1)
          throw new Error("revoke the only WebAuthn key left.");
        try {
          const feeToken = await resolveFeeToken$1(client, {
            addressOrSymbol: parameters2.feeToken,
            store: internal.store
          });
          const { id: id2 } = await sendCalls(client, {
            account,
            feeToken: feeToken == null ? void 0 : feeToken.address,
            revokeKeys: [key],
            webAuthn
          });
          await waitForCallsStatus(client, {
            id: id2
          });
        } catch (e) {
          const error = e;
          if (error.name === "Rpc.ExecutionError" && ((_c = error.abiError) == null ? void 0 : _c.name) === "KeyDoesNotExist")
            return;
          throw e;
        }
      },
      async revokePermissions(parameters2) {
        var _a, _b;
        const { account, id, internal } = parameters2;
        const { client } = internal;
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.id === id);
        if (!key)
          return;
        if (key.role === "admin")
          throw new Error("cannot revoke admins.");
        try {
          const feeToken = await resolveFeeToken$1(client, {
            addressOrSymbol: parameters2.feeToken,
            store: internal.store
          });
          const { id: id2 } = await sendCalls(client, {
            account,
            feeToken: feeToken == null ? void 0 : feeToken.address,
            revokeKeys: [key],
            webAuthn
          });
          await waitForCallsStatus(client, {
            id: id2
          });
        } catch (e) {
          const error = e;
          if (error.name === "Rpc.ExecutionError" && ((_b = error.abiError) == null ? void 0 : _b.name) === "KeyDoesNotExist")
            return;
          throw e;
        }
      },
      async sendCalls(parameters2) {
        const { account, asTxHash, calls, internal, merchantUrl } = parameters2;
        const { client } = internal;
        const key = await getAuthorizedExecuteKey({
          account,
          calls,
          permissionsId: parameters2.permissionsId
        });
        const [tokens, feeToken] = await Promise.all([
          getTokens(client),
          resolveFeeToken$1(client, {
            addressOrSymbol: parameters2.feeToken,
            store: internal.store
          })
        ]);
        const requiredFunds = toRelay(parameters2.requiredFunds ?? [], {
          tokens
        });
        const result = await sendCalls(client, {
          account,
          calls,
          feeToken: feeToken == null ? void 0 : feeToken.address,
          key,
          merchantUrl,
          requiredFunds: multichain ? requiredFunds : void 0,
          webAuthn
        });
        if (asTxHash) {
          const { id, receipts, status } = await waitForCallsStatus(client, {
            id: result.id,
            pollingInterval: 500
          });
          if (!(receipts == null ? void 0 : receipts[0])) {
            if (status === "success")
              throw new UnknownBundleIdError({
                message: "Call bundle with id: " + id + " not found."
              });
            throw new TransactionRejectedError({
              message: "Transaction failed under call bundle id: " + id + "."
            });
          }
          return {
            id: receipts[0].transactionHash
          };
        }
        return result;
      },
      async sendPreparedCalls(parameters2) {
        const { context, key, internal, signature } = parameters2;
        const { client } = internal;
        const { id } = await sendPreparedCalls(client, {
          context,
          key,
          signature
        });
        return id;
      },
      async signPersonalMessage(parameters2) {
        var _a;
        const { account, data, internal } = parameters2;
        const { client } = internal;
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.role === "admin" && key2.privateKey);
        if (!key)
          throw new Error("cannot find admin key to sign with.");
        const signature = await sign(account, {
          key,
          payload: getSignPayload$1(data),
          webAuthn
        });
        return wrap(client, { address: account.address, signature });
      },
      async signTypedData(parameters2) {
        var _a, _b;
        const { account, internal } = parameters2;
        const { client } = internal;
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.role === "admin" && key2.privateKey);
        if (!key)
          throw new Error("cannot find admin key to sign with.");
        const data = parse$1(parameters2.data);
        const isOrchestrator = ((_b = data.domain) == null ? void 0 : _b.name) === "Orchestrator";
        const signature = await sign(account, {
          key,
          payload: getSignPayload$3(data),
          // If the domain is the Orchestrator, we don't need to replay-safe sign.
          replaySafe: !isOrchestrator,
          webAuthn
        });
        return isOrchestrator ? signature : wrap(client, { address: account.address, signature });
      },
      async upgradeAccount(parameters2) {
        const { account, context, internal, signatures } = parameters2;
        const { client } = internal;
        await upgradeAccount(client, {
          context,
          signatures
        });
        if (email_internal)
          await setEmail(client, {
            email: email_internal,
            walletAddress: account.address
          });
        return { account };
      },
      async verifyEmail(parameters2) {
        var _a;
        const { account, chainId, email, token, internal, walletAddress } = parameters2;
        const { client } = internal;
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.role === "admin" && key2.privateKey);
        if (!key)
          throw new Error("cannot find admin key to sign with.");
        const signature = await sign(account, {
          key,
          payload: keccak256(fromString$1(`${email}${token}`)),
          webAuthn
        });
        return await verifyEmail(client, {
          chainId,
          email,
          signature,
          token,
          walletAddress
        });
      }
    },
    config: parameters,
    name: "rpc"
  });
}
function dialog(parameters = {}) {
  const { fallback: fallback2 = relay(), host = hostUrls.prod, renderer = iframe(), theme, themeController } = parameters;
  const listeners = /* @__PURE__ */ new Set();
  const requestStore = createStore$1();
  function getProvider(store) {
    return from$i({
      async request(r) {
        const request = requestStore.prepare(r);
        store.setState((x) => {
          var _a;
          const account = x.accounts[0];
          const adminKey = (_a = account == null ? void 0 : account.keys) == null ? void 0 : _a.find((key) => key.role === "admin" && key.type === "webauthn-p256");
          return {
            ...x,
            requestQueue: [
              ...x.requestQueue,
              {
                account: account ? {
                  address: account.address,
                  key: adminKey ? {
                    credentialId: adminKey == null ? void 0 : adminKey.credentialId,
                    publicKey: adminKey.publicKey
                  } : void 0
                } : void 0,
                request,
                status: "pending"
              }
            ]
          };
        });
        return new Promise((resolve, reject) => {
          const listener = (requestQueue) => {
            const queued = requestQueue.find((x) => x.request.id === request.id);
            if (!queued && requestQueue.length === 0) {
              listeners.delete(listener);
              reject(new UserRejectedRequestError());
              return;
            }
            if (!queued)
              return;
            if (queued.status !== "success" && queued.status !== "error")
              return;
            listeners.delete(listener);
            if (queued.status === "success")
              resolve(queued.result);
            else
              reject(parseError(queued.error));
            store.setState((x) => ({
              ...x,
              requestQueue: x.requestQueue.filter((x2) => x2.request.id !== request.id)
            }));
          };
          listeners.add(listener);
        });
      }
    }, {});
  }
  return from$3({
    actions: {
      async addFunds(parameters2) {
        const { internal } = parameters2;
        const { request, store } = internal;
        if (request.method !== "wallet_addFunds")
          throw new Error("Cannot add funds for method: " + request.method);
        const provider = getProvider(store);
        return await provider.request(request);
      },
      async createAccount(parameters2) {
        const { internal } = parameters2;
        const { client, config, request, store } = internal;
        const { storage } = config;
        const provider = getProvider(store);
        const account = await (async () => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (request.method === "wallet_connect") {
            const [{ capabilities, chainIds }] = request._decoded.params ?? [{}];
            const authUrl = getAuthUrl(((_a = capabilities == null ? void 0 : capabilities.signInWithEthereum) == null ? void 0 : _a.authUrl) ?? config.authUrl, { storage });
            const signInWithEthereum = (_d = (_c = (_b = request.params) == null ? void 0 : _b[0]) == null ? void 0 : _c.capabilities) == null ? void 0 : _d.signInWithEthereum;
            const key = await toKey(capabilities == null ? void 0 : capabilities.grantPermissions, {
              chainId: client.chain.id
            });
            const permissionsRequest = key ? encode$4(Schema, fromKey(key)) : void 0;
            const { accounts } = await provider.request({
              ...request,
              params: [
                {
                  capabilities: {
                    ...(_f = (_e = request.params) == null ? void 0 : _e[0]) == null ? void 0 : _f.capabilities,
                    grantPermissions: permissionsRequest,
                    signInWithEthereum: authUrl || signInWithEthereum ? {
                      ...signInWithEthereum,
                      authUrl
                    } : void 0
                  },
                  chainIds: chainIds == null ? void 0 : chainIds.map((chainId) => fromNumber(chainId))
                }
              ]
            });
            const [account2] = accounts;
            if (!account2)
              throw new Error("no account found.");
            const adminKeys = (_h = (_g = account2.capabilities) == null ? void 0 : _g.admins) == null ? void 0 : _h.map((admin) => from$8(admin, { chainId: client.chain.id })).filter(Boolean);
            const sessionKeys = (_j = (_i = account2.capabilities) == null ? void 0 : _i.permissions) == null ? void 0 : _j.map((permission) => {
              try {
                const key_permission = toKey$1(decode(Schema$1, permission));
                if (key_permission.id === (key == null ? void 0 : key.id))
                  return {
                    ...key_permission,
                    ...key,
                    permissions: key_permission.permissions
                  };
                return key_permission;
              } catch {
                return void 0;
              }
            }).filter(Boolean);
            const signInWithEthereum_response = await (async () => {
              var _a2;
              if (!((_a2 = account2.capabilities) == null ? void 0 : _a2.signInWithEthereum))
                return;
              const { message, signature } = account2.capabilities.signInWithEthereum;
              if (!authUrl)
                return {
                  message,
                  signature
                };
              const { token } = await authenticate({
                address: account2.address,
                authUrl,
                message,
                signature
              });
              return {
                message,
                signature,
                token
              };
            })();
            return {
              ...from$7({
                address: account2.address,
                keys: [...adminKeys, ...sessionKeys]
              }),
              signInWithEthereum: signInWithEthereum_response
            };
          }
          throw new Error(`Account creation not supported on method: ${request.method}`);
        })();
        return {
          account
        };
      },
      async disconnect(parameters2) {
        const { internal } = parameters2;
        const { config } = internal;
        const { storage } = config;
        const authUrl_storage = await storage.getItem("porto.authUrl") || void 0;
        const authUrl = getAuthUrl(config.authUrl ?? authUrl_storage, {
          storage
        });
        if (authUrl)
          await fetch(authUrl.logout, {
            credentials: "include",
            method: "POST"
          }).catch(() => {
          });
      },
      async getAccountVersion(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_getAccountVersion")
          throw new Error("Cannot get version for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.getAccountVersion(parameters2);
        const provider = getProvider(store);
        const result = await provider.request(request);
        return result;
      },
      async getAssets(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_getAssets")
          throw new Error("Cannot get assets for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.getAssets(parameters2);
        const provider = getProvider(store);
        const result = await provider.request(request);
        return decode(wallet_getAssets$1.Response, result);
      },
      async getCallsStatus(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_getCallsStatus")
          throw new Error("Cannot get status for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.getCallsStatus(parameters2);
        const provider = getProvider(store);
        const result = await provider.request(request);
        return result;
      },
      async getCapabilities(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_getCapabilities")
          throw new Error("Cannot get capabilities for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.getCapabilities(parameters2);
        const provider = getProvider(store);
        const result = await provider.request(request);
        return result;
      },
      async getKeys(parameters2) {
        const { account, chainIds, internal } = parameters2;
        const { store } = internal;
        const keys = await (async () => {
          if (!renderer.supportsHeadless)
            return fallback2.actions.getKeys(parameters2);
          const provider = getProvider(store);
          const result = await provider.request({
            method: "wallet_getKeys",
            params: [
              encode$4(wallet_getKeys$1.Parameters, {
                address: account.address,
                chainIds
              })
            ]
          });
          return decode(wallet_getKeys$1.Response, result);
        })();
        return uniqBy([...keys, ...account.keys ?? []], (key) => key.publicKey);
      },
      async grantAdmin(parameters2) {
        var _a, _b, _c;
        const { internal } = parameters2;
        const { request, store } = internal;
        if (request.method !== "wallet_grantAdmin")
          throw new Error("Cannot authorize admin for method: " + request.method);
        const [params] = request._decoded.params;
        const key = from$8(params.key);
        if (!key)
          throw new Error("no key found.");
        const feeToken = await resolveFeeToken(internal, parameters2);
        const provider = getProvider(store);
        await provider.request({
          method: "wallet_grantAdmin",
          params: [
            {
              ...(_a = request.params) == null ? void 0 : _a[0],
              capabilities: {
                ...(_c = (_b = request.params) == null ? void 0 : _b[0]) == null ? void 0 : _c.capabilities,
                feeToken
              }
            }
          ]
        });
        return { key };
      },
      async grantPermissions(parameters2) {
        const { internal } = parameters2;
        const { client, request, store } = internal;
        if (request.method !== "wallet_grantPermissions")
          throw new Error("Cannot grant permissions for method: " + request.method);
        const [{ address, ...permissions }] = request._decoded.params;
        const key = await toKey(permissions, {
          chainId: client.chain.id
        });
        if (!key)
          throw new Error("no key found.");
        const permissionsRequest = encode$4(Schema, fromKey(key));
        const provider = getProvider(store);
        await provider.request({
          method: "wallet_grantPermissions",
          params: [permissionsRequest]
        });
        return { key };
      },
      async loadAccounts(parameters2) {
        const { internal } = parameters2;
        const { client, config, store } = internal;
        const { storage } = config;
        const provider = getProvider(store);
        const request = internal.request;
        if (request.method !== "wallet_connect" && request.method !== "eth_requestAccounts")
          throw new Error("Cannot load accounts for method: " + request.method);
        const accounts = await (async () => {
          var _a, _b, _c, _d, _e, _f, _g;
          const [params] = request._decoded.params ?? [];
          const { capabilities } = params ?? {};
          const authUrl = getAuthUrl(((_a = capabilities == null ? void 0 : capabilities.signInWithEthereum) == null ? void 0 : _a.authUrl) ?? config.authUrl, { storage });
          const signInWithEthereum = (_d = (_c = (_b = request.params) == null ? void 0 : _b[0]) == null ? void 0 : _c.capabilities) == null ? void 0 : _d.signInWithEthereum;
          const key = await toKey(capabilities == null ? void 0 : capabilities.grantPermissions, {
            chainId: client.chain.id
          });
          const permissionsRequest = key ? encode$4(Schema, fromKey(key)) : void 0;
          const { accounts: accounts2 } = await provider.request({
            method: "wallet_connect",
            params: [
              {
                ...(_e = request.params) == null ? void 0 : _e[0],
                capabilities: {
                  ...(_g = (_f = request.params) == null ? void 0 : _f[0]) == null ? void 0 : _g.capabilities,
                  grantPermissions: permissionsRequest,
                  signInWithEthereum: authUrl || signInWithEthereum ? {
                    ...signInWithEthereum,
                    authUrl
                  } : void 0
                }
              }
            ]
          });
          return Promise.all(accounts2.map(async (account) => {
            var _a2, _b2, _c2, _d2;
            const adminKeys = (_b2 = (_a2 = account.capabilities) == null ? void 0 : _a2.admins) == null ? void 0 : _b2.map((key2) => from$8(key2)).filter(Boolean);
            const sessionKeys = (_d2 = (_c2 = account.capabilities) == null ? void 0 : _c2.permissions) == null ? void 0 : _d2.map((permission) => {
              try {
                const key_permission = toKey$1(decode(Schema$1, permission));
                if (key_permission.id === (key == null ? void 0 : key.id))
                  return {
                    ...key_permission,
                    ...key,
                    permissions: key_permission.permissions
                  };
                return key_permission;
              } catch {
                return void 0;
              }
            }).filter(Boolean);
            const signInWithEthereum_response = await (async () => {
              var _a3;
              if (!((_a3 = account.capabilities) == null ? void 0 : _a3.signInWithEthereum))
                return;
              const { message, signature } = account.capabilities.signInWithEthereum;
              if (!authUrl)
                return {
                  message,
                  signature
                };
              const { token } = await authenticate({
                address: account.address,
                authUrl,
                message,
                signature
              });
              return {
                message,
                signature,
                token
              };
            })();
            return {
              ...from$7({
                address: account.address,
                keys: [...adminKeys, ...sessionKeys]
              }),
              signInWithEthereum: signInWithEthereum_response
            };
          }));
        })();
        return {
          accounts
        };
      },
      async prepareCalls(parameters2) {
        var _a, _b, _c;
        const { account, internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_prepareCalls")
          throw new Error("Cannot prepare calls for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.prepareCalls(parameters2);
        const feeToken = await resolveFeeToken(internal, parameters2);
        const provider = getProvider(store);
        const result = decode(wallet_prepareCalls$1.Response, await provider.request({
          ...request,
          params: [
            {
              ...(_a = request.params) == null ? void 0 : _a[0],
              capabilities: {
                ...(_c = (_b = request.params) == null ? void 0 : _b[0]) == null ? void 0 : _c.capabilities,
                feeToken
              }
            }
          ]
        }));
        return {
          account,
          chainId: Number(result.chainId),
          context: result.context,
          digest: result.digest,
          key: result.key,
          typedData: result.typedData
        };
      },
      async prepareUpgradeAccount(parameters2) {
        var _a, _b, _c, _d;
        const { internal } = parameters2;
        const { client, store, request } = internal;
        if (request.method !== "wallet_prepareUpgradeAccount")
          throw new Error("Cannot prepare upgrade for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.prepareUpgradeAccount(parameters2);
        const [{ capabilities }] = request._decoded.params ?? [{}];
        const key = await toKey(capabilities == null ? void 0 : capabilities.grantPermissions, {
          chainId: client.chain.id
        });
        const permissionsRequest = key ? encode$4(Schema, fromKey(key)) : void 0;
        const provider = getProvider(store);
        const { context, digests } = await provider.request({
          ...request,
          params: [
            {
              ...(_a = request.params) == null ? void 0 : _a[0],
              capabilities: {
                ...(_c = (_b = request.params) == null ? void 0 : _b[0]) == null ? void 0 : _c.capabilities,
                grantPermissions: permissionsRequest
              }
            }
          ]
        });
        const keys = (_d = context.account.keys) == null ? void 0 : _d.map((k) => {
          if (k.id === (key == null ? void 0 : key.id))
            return { ...k, ...key };
          return k;
        });
        return {
          context: {
            ...context,
            account: { ...context.account, keys }
          },
          digests
        };
      },
      async revokeAdmin(parameters2) {
        var _a, _b, _c, _d, _e;
        const { account, id, internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_revokeAdmin")
          throw new Error("Cannot revoke admin for method: " + request.method);
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.id === id);
        if (!key)
          return;
        if (key.type === "webauthn-p256" && ((_b = account.keys) == null ? void 0 : _b.filter((key2) => key2.type === "webauthn-p256").length) === 1)
          throw new Error("revoke the only WebAuthn key left.");
        const feeToken = await resolveFeeToken(internal, parameters2);
        const provider = getProvider(store);
        return await provider.request({
          ...request,
          params: [
            {
              ...(_c = request.params) == null ? void 0 : _c[0],
              capabilities: {
                ...(_e = (_d = request.params) == null ? void 0 : _d[0]) == null ? void 0 : _e.capabilities,
                feeToken
              }
            }
          ]
        });
      },
      async revokePermissions(parameters2) {
        var _a;
        const { account, id, internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_revokePermissions")
          throw new Error("Cannot revoke permissions for method: " + request.method);
        const key = (_a = account.keys) == null ? void 0 : _a.find((key2) => key2.id === id);
        if (!key)
          return;
        if (key.role === "admin")
          throw new Error("cannot revoke permissions.");
        const provider = getProvider(store);
        return await provider.request(request);
      },
      async sendCalls(parameters2) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { account, asTxHash, calls, internal, merchantUrl, requiredFunds } = parameters2;
        const { client, store, request } = internal;
        const provider = getProvider(store);
        const feeToken = await resolveFeeToken(internal, parameters2);
        const key = await getAuthorizedExecuteKey({
          account,
          calls,
          permissionsId: parameters2.permissionsId
        });
        if (key && key.role === "session") {
          if (!renderer.supportsHeadless)
            return fallback2.actions.sendCalls(parameters2);
          try {
            const req = await provider.request(encode$4(wallet_prepareCalls$1.Request, {
              method: "wallet_prepareCalls",
              params: [
                {
                  calls,
                  capabilities: {
                    ...request._decoded.method === "wallet_sendCalls" ? (_b = (_a = request._decoded.params) == null ? void 0 : _a[0]) == null ? void 0 : _b.capabilities : void 0,
                    feeToken,
                    merchantUrl,
                    requiredFunds
                  },
                  chainId: client.chain.id,
                  from: account.address,
                  key
                }
              ]
            }));
            const quotes = ((_d = (_c = req.capabilities) == null ? void 0 : _c.quote) == null ? void 0 : _d.quotes) ?? [];
            const hasFeeDeficit = quotes.some((quote, index) => {
              const isMultichainDestination = index === quotes.length - 1 && quotes.length > 1;
              if (isMultichainDestination)
                return false;
              return toBigInt$1(quote.feeTokenDeficit) > 0n;
            });
            if (hasFeeDeficit)
              throw new Error("insufficient funds");
            const signature = await sign$1(key, {
              address: null,
              payload: req.digest,
              wrap: false
            });
            const result = await provider.request({
              method: "wallet_sendPreparedCalls",
              params: [
                {
                  ...req,
                  signature
                }
              ]
            });
            const response = result[0];
            if (!response)
              throw new Error("id not found");
            if (asTxHash) {
              const { id, receipts, status } = await waitForCallsStatus(client, {
                id: response.id,
                pollingInterval: 500
              });
              if (!(receipts == null ? void 0 : receipts[0])) {
                if (status === "success")
                  throw new UnknownBundleIdError({
                    message: "Call bundle with id: " + id + " not found."
                  });
                throw new TransactionRejectedError({
                  message: "Transaction failed under call bundle id: " + id + "."
                });
              }
              return {
                id: receipts[0].transactionHash
              };
            }
            return response;
          } catch {
          }
        }
        if (request.method === "eth_sendTransaction") {
          const id = await provider.request({
            ...request,
            params: [
              {
                ...(_e = request.params) == null ? void 0 : _e[0],
                // @ts-expect-error
                capabilities: {
                  feeToken,
                  merchantUrl
                }
              }
            ]
          });
          return { id };
        }
        if (request.method === "wallet_sendCalls") {
          const result = await provider.request({
            method: "wallet_sendCalls",
            params: [
              {
                ...(_f = request.params) == null ? void 0 : _f[0],
                capabilities: {
                  ...(_h = (_g = request.params) == null ? void 0 : _g[0]) == null ? void 0 : _h.capabilities,
                  feeToken,
                  merchantUrl
                }
              }
            ]
          });
          return result;
        }
        throw new Error("Cannot execute for method: " + request.method);
      },
      async sendPreparedCalls(parameters2) {
        var _a;
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_sendPreparedCalls")
          throw new Error("Cannot send prepared calls for method: " + request.method);
        if (!renderer.supportsHeadless)
          return fallback2.actions.sendPreparedCalls(parameters2);
        const provider = getProvider(store);
        const result = await provider.request(request);
        const id = (_a = result[0]) == null ? void 0 : _a.id;
        if (!id)
          throw new Error("id not found");
        return id;
      },
      async signPersonalMessage(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "personal_sign")
          throw new Error("Cannot sign personal message for method: " + request.method);
        const provider = getProvider(store);
        return await provider.request(request);
      },
      async signTypedData(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "eth_signTypedData_v4")
          throw new Error("Cannot sign typed data for method: " + request.method);
        const provider = getProvider(store);
        return await provider.request(request);
      },
      async switchChain(parameters2) {
        const { internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_switchEthereumChain")
          throw new Error("Cannot switch chain for method: " + request.method);
        if (!renderer.supportsHeadless)
          return;
        const provider = getProvider(store);
        return await provider.request(request);
      },
      async upgradeAccount(parameters2) {
        const { account, internal } = parameters2;
        const { store, request } = internal;
        if (request.method !== "wallet_upgradeAccount")
          throw new Error("Cannot upgrade account for method: " + request.method);
        const provider = getProvider(store);
        await provider.request(request);
        return { account };
      },
      async verifyEmail(parameters2) {
        const { internal } = parameters2;
        const { request, store } = internal;
        if (request.method !== "account_verifyEmail")
          throw new Error("Cannot verify email for method: " + request.method);
        const provider = getProvider(store);
        return await provider.request(request);
      }
    },
    config: parameters,
    name: "dialog",
    setup(parameters2) {
      const { internal } = parameters2;
      const { store } = internal;
      const dialog2 = renderer.setup({
        host,
        internal,
        theme,
        themeController
      });
      const unsubscribe = store.subscribe((x) => x.requestQueue, (requestQueue) => {
        for (const listener of listeners)
          listener(requestQueue);
        const requests = requestQueue.map((x) => x.status === "pending" ? x : void 0).filter(Boolean);
        dialog2.syncRequests(requests).catch(() => {
        });
        if (requests.length === 0)
          dialog2.close();
      });
      return () => {
        unsubscribe();
        dialog2.destroy();
      };
    }
  });
}
async function resolveFeeToken(internal, parameters) {
  const { config: { feeToken } } = internal;
  const { feeToken: overrideFeeToken } = parameters ?? {};
  return overrideFeeToken ?? feeToken;
}
function getAuthUrl(apiUrl, { storage }) {
  if (!apiUrl)
    return void 0;
  const authUrl = resolveAuthUrl(apiUrl, typeof window !== "undefined" ? window.location.origin : void 0);
  if (authUrl)
    storage.setItem("porto.authUrl", authUrl);
  return authUrl;
}
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api) return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
const extractConnectionInformation = (store, extensionConnector, options) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options)
    };
  }
  const existingConnection = trackedConnections.get(options.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options),
    stores: {}
  };
  trackedConnections.set(options.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
const removeStoreFromTrackedConnections = (name, store) => {
  if (store === void 0) return;
  const connectionInfo = trackedConnections.get(name);
  if (!connectionInfo) return;
  delete connectionInfo.stores[store];
  if (Object.keys(connectionInfo.stores).length === 0) {
    trackedConnections.delete(name);
  }
};
const findCallerName = (stack) => {
  var _a, _b;
  if (!stack) return void 0;
  const traceLines = stack.split("\n");
  const apiSetStateLineIndex = traceLines.findIndex(
    (traceLine) => traceLine.includes("api.setState")
  );
  if (apiSetStateLineIndex < 0) return void 0;
  const callerLine = ((_a = traceLines[apiSetStateLineIndex + 1]) == null ? void 0 : _a.trim()) || "";
  return (_b = /.+ (.+) .+/.exec(callerLine)) == null ? void 0 : _b[1];
};
const devtoolsImpl = (fn, devtoolsOptions = {}) => (set2, get2, api) => {
  const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : (__vite_import_meta_env__ ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e) {
  }
  if (!extensionConnector) {
    return fn(set2, get2, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
  let isRecording = true;
  api.setState = ((state, replace, nameOrAction) => {
    const r = set2(state, replace);
    if (!isRecording) return r;
    const action = nameOrAction === void 0 ? {
      type: anonymousActionType || findCallerName(new Error().stack) || "anonymous"
    } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get2());
      return r;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options.name),
        [store]: api.getState()
      }
    );
    return r;
  });
  api.devtools = {
    cleanup: () => {
      if (connection && typeof connection.unsubscribe === "function") {
        connection.unsubscribe();
      }
      removeStoreFromTrackedConnections(options.name, store);
    }
  };
  const setStateFromDevtools = (...a) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set2(...a);
    isRecording = originalIsRecording;
  };
  const initialState = fn(api.setState, get2, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...args) => {
      if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && args[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...args);
    };
  }
  connection.subscribe((message) => {
    var _a;
    switch (message.type) {
      case "ACTION":
        if (typeof message.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message.payload,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (!api.dispatchFromDevtools) return;
            if (typeof api.dispatch !== "function") return;
            api.dispatch(action);
          }
        );
      case "DISPATCH":
        switch (message.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "ROLLBACK":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState) return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, fn) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  if (parsed !== void 0) fn(parsed);
};
const subscribeWithSelectorImpl = (fn) => (set2, get2, api) => {
  const origSubscribe = api.subscribe;
  api.subscribe = ((selector, optListener, options) => {
    let listener = selector;
    if (optListener) {
      const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
      let currentSlice = selector(api.getState());
      listener = (state) => {
        const nextSlice = selector(state);
        if (!equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          optListener(currentSlice = nextSlice, previousSlice);
        }
      };
      if (options == null ? void 0 : options.fireImmediately) {
        optListener(currentSlice, currentSlice);
      }
    }
    return origSubscribe(listener);
  });
  const initialState = fn(set2, get2, api);
  return initialState;
};
const subscribeWithSelector = subscribeWithSelectorImpl;
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse2 = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse2);
      }
      return parse2(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, void 0)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set2, get2, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get2,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get2() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set2(...args);
      return setItem();
    },
    get2,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get2()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get2()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get2()) != null ? _a2 : configResult
      );
      set2(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get2();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
function from(storage) {
  return storage;
}
function idb() {
  const store = typeof indexedDB !== "undefined" ? createStore$2("porto", "store") : void 0;
  return from({
    async getItem(name) {
      const value = await get(name, store);
      if (value === null)
        return null;
      return value;
    },
    async removeItem(name) {
      await del(name, store);
    },
    async setItem(name, value) {
      await set(name, normalizeValue(value), store);
    },
    sizeLimit: 1024 * 1024 * 50
    // ≈50MB
  });
}
function memory() {
  const store = /* @__PURE__ */ new Map();
  return from({
    getItem(name) {
      return store.get(name) ?? null;
    },
    removeItem(name) {
      store.delete(name);
    },
    setItem(name, value) {
      store.set(name, value);
    },
    sizeLimit: Number.POSITIVE_INFINITY
  });
}
const browser = typeof window !== "undefined" && typeof document !== "undefined";
const defaultConfig = {
  announceProvider: true,
  chains: all,
  mode: browser ? dialog({ host: hostUrls.prod }) : relay(),
  relay: http(relayUrls.prod.http),
  storage: browser && typeof indexedDB !== "undefined" ? idb() : memory(),
  storageKey: "porto.store"
};
function create(parameters = {}) {
  const chains2 = parameters.chains ?? defaultConfig.chains;
  const transports = Object.fromEntries(chains2.map((chain) => {
    var _a;
    return [
      chain.id,
      ((_a = parameters.transports) == null ? void 0 : _a[chain.id]) ?? http()
    ];
  }));
  const config = {
    announceProvider: parameters.announceProvider ?? defaultConfig.announceProvider,
    authUrl: parameters.authUrl,
    chains: chains2,
    feeToken: parameters.feeToken,
    merchantUrl: parameters.merchantUrl,
    mode: parameters.mode ?? defaultConfig.mode,
    relay: parameters.relay ?? defaultConfig.relay,
    storage: parameters.storage ?? defaultConfig.storage,
    storageKey: parameters.storageKey ?? defaultConfig.storageKey,
    transports
  };
  const store = createStore(devtools(subscribeWithSelector(persist((_) => ({
    accounts: [],
    chainIds: config.chains.map((chain) => chain.id),
    feeToken: config.feeToken,
    requestQueue: []
  }), {
    merge(p, currentState) {
      var _a;
      const persistedState = p;
      const currentChainId = ((_a = config.chains.find((chain) => chain.id === persistedState.chainIds[0])) == null ? void 0 : _a.id) ?? config.chains[0].id;
      const chainIds = [
        currentChainId,
        ...config.chains.map((chain) => chain.id).filter((id) => id !== currentChainId)
      ];
      return {
        ...currentState,
        ...persistedState,
        chainIds
      };
    },
    name: config.storageKey,
    partialize: (state) => ({
      accounts: state.accounts.map((account) => (
        // omit non-serializable properties (e.g. functions).
        normalizeValue(account)
      )),
      chainIds: state.chainIds
    }),
    storage: config.storage,
    version: 5
  }))));
  let mode = config.mode;
  const internal = {
    config,
    getMode() {
      return mode;
    },
    id: uuidv4(),
    setMode(i) {
      destroy == null ? void 0 : destroy();
      mode = i;
      destroy = i.setup({
        internal
      });
      return destroy;
    },
    store
  };
  const provider = from$4(internal);
  let destroy = mode !== null ? mode.setup({
    internal
  }) : () => {
  };
  return {
    _internal: internal,
    config,
    destroy() {
      destroy();
      provider._internal.destroy();
    },
    provider
  };
}
const Porto = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  create,
  defaultConfig
}, Symbol.toStringTag, { value: "Module" }));
export {
  Porto,
  from$4 as from
};
//# sourceMappingURL=index-BA-jae7i.js.map
