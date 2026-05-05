import { j as process$1, cq as Big, cr as formatUnits, b5 as IEvents, aY as getWindowMetadata_1, aZ as cjs, K as global, a_ as getDocument_1, a$ as C$2, b0 as getNavigator_1, b1 as detect, b2 as getLocation_1, a1 as Buffer, b3 as sn$2, $ as bs58, b6 as events, b7 as i$1, b8 as h$3, b9 as formatJsonRpcRequest, ba as r, bb as o, bc as f$2, bd as isJsonRpcRequest, be as isJsonRpcResponse, bf as formatJsonRpcResult, bg as Nt$2, bh as Po$1, bi as Qe$3, bj as Qo, b4 as safeJsonStringify, bk as safeJsonParse, bl as getBigIntRpcId, bm as formatJsonRpcError, bn as isJsonRpcResult, bo as isJsonRpcError, bp as payloadId, bq as f$3, cs as fallback, c8 as http, u as i$2, ct as r$1, cc as toHex } from "./appkit-DOrUN3iw.js";
import { h as fromString, i as toString, j as concat, k as recoverAddress, l as k$3, A as A$2, E as E$3, y as y$4, O as Ot$2 } from "./index.es-Dck9cDZL.js";
const ConstantsUtil$3 = {
  WC_NAME_SUFFIX: ".reown.id",
  WC_NAME_SUFFIX_LEGACY: ".wcn.id",
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  PULSE_API_URL: "https://pulse.walletconnect.org",
  W3M_API_URL: "https://api.web3modal.org",
  CONNECTOR_ID: {
    WALLET_CONNECT: "walletConnect",
    INJECTED: "injected",
    WALLET_STANDARD: "announced",
    COINBASE: "coinbaseWallet",
    COINBASE_SDK: "coinbaseWalletSDK",
    SAFE: "safe",
    LEDGER: "ledger",
    OKX: "okx",
    EIP6963: "eip6963",
    AUTH: "ID_AUTH"
  },
  CONNECTOR_NAMES: {
    AUTH: "Auth"
  },
  AUTH_CONNECTOR_SUPPORTED_CHAINS: ["eip155", "solana"],
  LIMITS: {
    PENDING_TRANSACTIONS: 99
  },
  CHAIN: {
    EVM: "eip155",
    SOLANA: "solana",
    POLKADOT: "polkadot",
    BITCOIN: "bip122"
  },
  CHAIN_NAME_MAP: {
    eip155: "EVM Networks",
    solana: "Solana",
    polkadot: "Polkadot",
    bip122: "Bitcoin",
    cosmos: "Cosmos"
  },
  ADAPTER_TYPES: {
    BITCOIN: "bitcoin",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5"
  },
  USDT_CONTRACT_ADDRESSES: [
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    "0x919C1c267BC06a7039e03fcc2eF738525769109c",
    "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    "0x55d398326f99059fF775485246999027B3197955",
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  ],
  HTTP_STATUS_CODES: {
    SERVICE_UNAVAILABLE: 503,
    FORBIDDEN: 403
  },
  UNSUPPORTED_NETWORK_NAME: "Unknown Network",
  SECURE_SITE_SDK_ORIGIN: (typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org"
};
const NetworkUtil$1 = {
  caipNetworkIdToNumber(caipnetworkId) {
    return caipnetworkId ? Number(caipnetworkId.split(":")[1]) : void 0;
  },
  parseEvmChainId(chainId) {
    return typeof chainId === "string" ? this.caipNetworkIdToNumber(chainId) : chainId;
  },
  getNetworksByNamespace(networks, namespace) {
    return (networks == null ? void 0 : networks.filter((network) => network.chainNamespace === namespace)) || [];
  },
  getFirstNetworkByNamespace(networks, namespace) {
    return this.getNetworksByNamespace(networks, namespace)[0];
  },
  getNetworkNameByCaipNetworkId(caipNetworks, caipNetworkId) {
    var _a;
    if (!caipNetworkId) {
      return void 0;
    }
    const caipNetwork = caipNetworks.find((network) => network.caipNetworkId === caipNetworkId);
    if (caipNetwork) {
      return caipNetwork.name;
    }
    const [namespace] = caipNetworkId.split(":");
    return ((_a = ConstantsUtil$3.CHAIN_NAME_MAP) == null ? void 0 : _a[namespace]) || void 0;
  }
};
const NumberUtil = {
  bigNumber(value) {
    if (!value) {
      return new Big(0);
    }
    return new Big(value);
  },
  multiply(a2, b2) {
    if (a2 === void 0 || b2 === void 0) {
      return new Big(0);
    }
    const aBigNumber = new Big(a2);
    const bBigNumber = new Big(b2);
    return aBigNumber.times(bBigNumber);
  },
  formatNumberToLocalString(value, decimals = 2) {
    if (value === void 0) {
      return "0.00";
    }
    if (typeof value === "number") {
      return value.toLocaleString("en-US", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      });
    }
    return parseFloat(value).toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    });
  },
  parseLocalStringToNumber(value) {
    if (value === void 0) {
      return 0;
    }
    return parseFloat(value.replace(/,/gu, ""));
  }
};
const erc20ABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];
const swapABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  }
];
const usdtABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];
const ContractUtil = {
  getERC20Abi: (tokenAddress) => {
    if (ConstantsUtil$3.USDT_CONTRACT_ADDRESSES.includes(tokenAddress)) {
      return usdtABI;
    }
    return erc20ABI;
  },
  getSwapAbi: () => swapABI
};
const ParseUtil = {
  validateCaipAddress(address) {
    var _a;
    if (((_a = address.split(":")) == null ? void 0 : _a.length) !== 3) {
      throw new Error("Invalid CAIP Address");
    }
    return address;
  },
  parseCaipAddress(caipAddress) {
    const parts = caipAddress.split(":");
    if (parts.length !== 3) {
      throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
    }
    const [chainNamespace, chainId, address] = parts;
    if (!chainNamespace || !chainId || !address) {
      throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
    }
    return {
      chainNamespace,
      chainId,
      address
    };
  },
  parseCaipNetworkId(caipNetworkId) {
    const parts = caipNetworkId.split(":");
    if (parts.length !== 2) {
      throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
    }
    const [chainNamespace, chainId] = parts;
    if (!chainNamespace || !chainId) {
      throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
    }
    return {
      chainNamespace,
      chainId
    };
  }
};
const SafeLocalStorageKeys = {
  WALLET_ID: "@appkit/wallet_id",
  WALLET_NAME: "@appkit/wallet_name",
  SOLANA_WALLET: "@appkit/solana_wallet",
  SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
  ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
  CONNECTED_SOCIAL: "@appkit/connected_social",
  CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
  RECENT_WALLETS: "@appkit/recent_wallets",
  DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
  ACTIVE_NAMESPACE: "@appkit/active_namespace",
  CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
  CONNECTION_STATUS: "@appkit/connection_status",
  SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
  SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
  TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
  NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
  PORTFOLIO_CACHE: "@appkit/portfolio_cache",
  ENS_CACHE: "@appkit/ens_cache",
  IDENTITY_CACHE: "@appkit/identity_cache",
  PREFERRED_ACCOUNT_TYPES: "@appkit/preferred_account_types",
  CONNECTIONS: "@appkit/connections"
};
function getSafeConnectorIdKey(namespace) {
  if (!namespace) {
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  }
  return `@appkit/${namespace}:connected_connector_id`;
}
const SafeLocalStorage = {
  setItem(key, value) {
    if (isSafe$1() && value !== void 0) {
      localStorage.setItem(key, value);
    }
  },
  getItem(key) {
    if (isSafe$1()) {
      return localStorage.getItem(key) || void 0;
    }
    return void 0;
  },
  removeItem(key) {
    if (isSafe$1()) {
      localStorage.removeItem(key);
    }
  },
  clear() {
    if (isSafe$1()) {
      localStorage.clear();
    }
  }
};
function isSafe$1() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}
function getW3mThemeVariables(themeVariables, themeType) {
  if (themeType === "light") {
    return {
      "--w3m-accent": (themeVariables == null ? void 0 : themeVariables["--w3m-accent"]) || "hsla(231, 100%, 70%, 1)",
      "--w3m-background": "#fff"
    };
  }
  return {
    "--w3m-accent": (themeVariables == null ? void 0 : themeVariables["--w3m-accent"]) || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#121313"
  };
}
const t = /* @__PURE__ */ Symbol();
const s = Object.getPrototypeOf, c$2 = /* @__PURE__ */ new WeakMap(), l$1 = (e) => e && (c$2.has(e) ? c$2.get(e) : s(e) === Object.prototype || s(e) === Array.prototype), y$3 = (e) => l$1(e) && e[t] || null, h$2 = (e, t2 = true) => {
  c$2.set(e, t2);
};
const __vite_import_meta_env__ = {};
const isObject = (x2) => typeof x2 === "object" && x2 !== null;
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x2) => isObject(x2) && !refSet.has(x2) && (Array.isArray(x2) || !(Symbol.iterator in x2)) && !(x2 instanceof WeakMap) && !(x2 instanceof WeakSet) && !(x2 instanceof Error) && !(x2 instanceof Number) && !(x2 instanceof Date) && !(x2 instanceof String) && !(x2 instanceof RegExp) && !(x2 instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h$2(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const { enumerable } = Reflect.getOwnPropertyDescriptor(
      target,
      key
    );
    const desc = {
      value,
      enumerable,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h$2(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y$3(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v2) => {
          value.status = "fulfilled";
          value.value = v2;
          notifyUpdate(["resolve", [prop], v2]);
        }).catch((e) => {
          value.status = "rejected";
          value.reason = e;
          notifyUpdate(["reject", [prop], e]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
const [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
function subscribeKey(proxyObject, key, callback, notifyInSync) {
  let prevValue = proxyObject[key];
  return subscribe(
    proxyObject,
    () => {
      const nextValue = proxyObject[key];
      if (!Object.is(prevValue, nextValue)) {
        callback(prevValue = nextValue);
      }
    }
  );
}
function proxyMap(entries2) {
  const map = proxy({
    data: Array.from([]),
    has(key) {
      return this.data.some((p2) => p2[0] === key);
    },
    set(key, value) {
      const record = this.data.find((p2) => p2[0] === key);
      if (record) {
        record[1] = value;
      } else {
        this.data.push([key, value]);
      }
      return this;
    },
    get(key) {
      var _a;
      return (_a = this.data.find((p2) => p2[0] === key)) == null ? void 0 : _a[1];
    },
    delete(key) {
      const index = this.data.findIndex((p2) => p2[0] === key);
      if (index === -1) {
        return false;
      }
      this.data.splice(index, 1);
      return true;
    },
    clear() {
      this.data.splice(0);
    },
    get size() {
      return this.data.length;
    },
    toJSON() {
      return new Map(this.data);
    },
    forEach(cb) {
      this.data.forEach((p2) => {
        cb(p2[1], p2[0], this);
      });
    },
    keys() {
      return this.data.map((p2) => p2[0]).values();
    },
    values() {
      return this.data.map((p2) => p2[1]).values();
    },
    entries() {
      return new Map(this.data).entries();
    },
    get [Symbol.toStringTag]() {
      return "Map";
    },
    [Symbol.iterator]() {
      return this.entries();
    }
  });
  Object.defineProperties(map, {
    data: {
      enumerable: false
    },
    size: {
      enumerable: false
    },
    toJSON: {
      enumerable: false
    }
  });
  Object.seal(map);
  return map;
}
(typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org";
const ONRAMP_PROVIDERS = [
  {
    label: "Coinbase",
    name: "coinbase",
    feeRange: "1-2%",
    url: "",
    supportedChains: ["eip155"]
  },
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  }
];
const MELD_PUBLIC_KEY = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU";
const ConstantsUtil$2 = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  ONE_SEC_MS: 1e3,
  BALANCE_SUPPORTED_CHAINS: ["eip155", "solana"],
  NAMES_SUPPORTED_CHAIN_NAMESPACES: ["eip155"],
  NATIVE_TOKEN_ADDRESS: {
    eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    solana: "So11111111111111111111111111111111111111111",
    polkadot: "0x",
    bip122: "0x",
    cosmos: "0x"
  },
  CONVERT_SLIPPAGE_TOLERANCE: 1,
  CONNECT_LABELS: {
    MOBILE: "Open and continue in the wallet app"
  },
  SEND_SUPPORTED_NAMESPACES: ["eip155", "solana"],
  DEFAULT_REMOTE_FEATURES: {
    swaps: ["1inch"],
    onramp: ["coinbase", "meld"],
    email: true,
    socials: [
      "google",
      "x",
      "discord",
      "farcaster",
      "github",
      "apple",
      "facebook"
    ],
    activity: true,
    reownBranding: true
  },
  DEFAULT_REMOTE_FEATURES_DISABLED: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    activity: false,
    reownBranding: false
  },
  DEFAULT_FEATURES: {
    receive: true,
    send: true,
    emailShowWallets: true,
    connectorTypeOrder: [
      "walletConnect",
      "recent",
      "injected",
      "featured",
      "custom",
      "external",
      "recommended"
    ],
    analytics: true,
    allWallets: true,
    legalCheckbox: false,
    smartSessions: false,
    collapseWallets: false,
    walletFeaturesOrder: ["onramp", "swaps", "receive", "send"],
    connectMethodsOrder: void 0,
    pay: false
  },
  DEFAULT_ACCOUNT_TYPES: {
    bip122: "payment",
    eip155: "smartAccount",
    polkadot: "eoa",
    solana: "eoa"
  },
  ADAPTER_TYPES: {
    UNIVERSAL: "universal"
  }
};
const StorageUtil = {
  // Cache expiry in milliseconds
  cacheExpiry: {
    portfolio: 3e4,
    nativeBalance: 3e4,
    ens: 3e5,
    identity: 3e5
  },
  isCacheExpired(timestamp, cacheExpiry) {
    return Date.now() - timestamp > cacheExpiry;
  },
  getActiveNetworkProps() {
    const namespace = StorageUtil.getActiveNamespace();
    const caipNetworkId = StorageUtil.getActiveCaipNetworkId();
    const stringChainId = caipNetworkId ? caipNetworkId.split(":")[1] : void 0;
    const chainId = stringChainId ? isNaN(Number(stringChainId)) ? stringChainId : Number(stringChainId) : void 0;
    return {
      namespace,
      caipNetworkId,
      chainId
    };
  },
  setWalletConnectDeepLink({ name, href }) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.DEEPLINK_CHOICE, JSON.stringify({ href, name }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const deepLink = SafeLocalStorage.getItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
      if (deepLink) {
        return JSON.parse(deepLink);
      }
    } catch {
      console.info("Unable to get WalletConnect deep link");
    }
    return void 0;
  },
  deleteWalletConnectDeepLink() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(namespace) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE, namespace);
    } catch {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(caipNetworkId) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID, caipNetworkId);
      StorageUtil.setActiveNamespace(caipNetworkId.split(":")[0]);
    } catch {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to get active caip network id");
      return void 0;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(namespace) {
    try {
      const key = getSafeConnectorIdKey(namespace);
      SafeLocalStorage.removeItem(key);
    } catch {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(wallet) {
    try {
      const recentWallets = StorageUtil.getRecentWallets();
      const exists = recentWallets.find((w2) => w2.id === wallet.id);
      if (!exists) {
        recentWallets.unshift(wallet);
        if (recentWallets.length > 2) {
          recentWallets.pop();
        }
        SafeLocalStorage.setItem(SafeLocalStorageKeys.RECENT_WALLETS, JSON.stringify(recentWallets));
      }
    } catch {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const recent = SafeLocalStorage.getItem(SafeLocalStorageKeys.RECENT_WALLETS);
      return recent ? JSON.parse(recent) : [];
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  setConnectedConnectorId(namespace, connectorId) {
    try {
      const key = getSafeConnectorIdKey(namespace);
      SafeLocalStorage.setItem(key, connectorId);
    } catch {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      const activeNamespace = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE);
      return activeNamespace;
    } catch {
      console.info("Unable to get active namespace");
    }
    return void 0;
  },
  getConnectedConnectorId(namespace) {
    if (!namespace) {
      return void 0;
    }
    try {
      const key = getSafeConnectorIdKey(namespace);
      return SafeLocalStorage.getItem(key);
    } catch (e) {
      console.info("Unable to get connected connector id in namespace ", namespace);
    }
    return void 0;
  },
  setConnectedSocialProvider(socialProvider) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_SOCIAL, socialProvider);
    } catch {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to get connected social provider");
    }
    return void 0;
  },
  deleteConnectedSocialProvider() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL_USERNAME);
    } catch {
      console.info("Unable to get connected social username");
    }
    return void 0;
  },
  getStoredActiveCaipNetworkId() {
    var _a;
    const storedCaipNetworkId = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
    const networkId = (_a = storedCaipNetworkId == null ? void 0 : storedCaipNetworkId.split(":")) == null ? void 0 : _a[1];
    return networkId;
  },
  setConnectionStatus(status) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTION_STATUS, status);
    } catch {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTION_STATUS);
    } catch {
      return void 0;
    }
  },
  getConnectedNamespaces() {
    try {
      const namespaces = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES);
      if (!(namespaces == null ? void 0 : namespaces.length)) {
        return [];
      }
      return namespaces.split(",");
    } catch {
      return [];
    }
  },
  setConnectedNamespaces(namespaces) {
    try {
      const uniqueNamespaces = Array.from(new Set(namespaces));
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES, uniqueNamespaces.join(","));
    } catch {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(namespace) {
    try {
      const namespaces = StorageUtil.getConnectedNamespaces();
      if (!namespaces.includes(namespace)) {
        namespaces.push(namespace);
        StorageUtil.setConnectedNamespaces(namespaces);
      }
    } catch {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(namespace) {
    try {
      const namespaces = StorageUtil.getConnectedNamespaces();
      const index = namespaces.indexOf(namespace);
      if (index > -1) {
        namespaces.splice(index, 1);
        StorageUtil.setConnectedNamespaces(namespaces);
      }
    } catch {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return SafeLocalStorage.getItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to get telegram social provider");
      return null;
    }
  },
  setTelegramSocialProvider(socialProvider) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER, socialProvider);
    } catch {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return cache;
  },
  removeAddressFromBalanceCache(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify({ ...cache, [caipAddress]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", caipAddress);
    }
  },
  getBalanceCacheForCaipAddress(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      const balanceCache = cache[caipAddress];
      if (balanceCache && !this.isCacheExpired(balanceCache.timestamp, this.cacheExpiry.portfolio)) {
        return balanceCache.balance;
      }
      StorageUtil.removeAddressFromBalanceCache(caipAddress);
    } catch {
      console.info("Unable to get balance cache for address", caipAddress);
    }
    return void 0;
  },
  updateBalanceCache(params) {
    try {
      const cache = StorageUtil.getBalanceCache();
      cache[params.caipAddress] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update balance cache", params);
    }
  },
  getNativeBalanceCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return cache;
  },
  removeAddressFromNativeBalanceCache(caipAddress) {
    try {
      const cache = StorageUtil.getBalanceCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify({ ...cache, [caipAddress]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", caipAddress);
    }
  },
  getNativeBalanceCacheForCaipAddress(caipAddress) {
    try {
      const cache = StorageUtil.getNativeBalanceCache();
      const nativeBalanceCache = cache[caipAddress];
      if (nativeBalanceCache && !this.isCacheExpired(nativeBalanceCache.timestamp, this.cacheExpiry.nativeBalance)) {
        return nativeBalanceCache;
      }
      console.info("Discarding cache for address", caipAddress);
      StorageUtil.removeAddressFromBalanceCache(caipAddress);
    } catch {
      console.info("Unable to get balance cache for address", caipAddress);
    }
    return void 0;
  },
  updateNativeBalanceCache(params) {
    try {
      const cache = StorageUtil.getNativeBalanceCache();
      cache[params.caipAddress] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update balance cache", params);
    }
  },
  getEnsCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.ENS_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get ens name cache");
    }
    return cache;
  },
  getEnsFromCacheForAddress(address) {
    try {
      const cache = StorageUtil.getEnsCache();
      const ensCache = cache[address];
      if (ensCache && !this.isCacheExpired(ensCache.timestamp, this.cacheExpiry.ens)) {
        return ensCache.ens;
      }
      StorageUtil.removeEnsFromCache(address);
    } catch {
      console.info("Unable to get ens name from cache", address);
    }
    return void 0;
  },
  updateEnsCache(params) {
    try {
      const cache = StorageUtil.getEnsCache();
      cache[params.address] = params;
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update ens name cache", params);
    }
  },
  removeEnsFromCache(address) {
    try {
      const cache = StorageUtil.getEnsCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify({ ...cache, [address]: void 0 }));
    } catch {
      console.info("Unable to remove ens name from cache", address);
    }
  },
  getIdentityCache() {
    let cache = {};
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.IDENTITY_CACHE);
      cache = result ? JSON.parse(result) : {};
    } catch {
      console.info("Unable to get identity cache");
    }
    return cache;
  },
  getIdentityFromCacheForAddress(address) {
    try {
      const cache = StorageUtil.getIdentityCache();
      const identityCache = cache[address];
      if (identityCache && !this.isCacheExpired(identityCache.timestamp, this.cacheExpiry.identity)) {
        return identityCache.identity;
      }
      StorageUtil.removeIdentityFromCache(address);
    } catch {
      console.info("Unable to get identity from cache", address);
    }
    return void 0;
  },
  updateIdentityCache(params) {
    try {
      const cache = StorageUtil.getIdentityCache();
      cache[params.address] = {
        identity: params.identity,
        timestamp: params.timestamp
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify(cache));
    } catch {
      console.info("Unable to update identity cache", params);
    }
  },
  removeIdentityFromCache(address) {
    try {
      const cache = StorageUtil.getIdentityCache();
      SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify({ ...cache, [address]: void 0 }));
    } catch {
      console.info("Unable to remove identity from cache", address);
    }
  },
  clearAddressCache() {
    try {
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.ENS_CACHE);
      SafeLocalStorage.removeItem(SafeLocalStorageKeys.IDENTITY_CACHE);
    } catch {
      console.info("Unable to clear address cache");
    }
  },
  setPreferredAccountTypes(accountTypes) {
    try {
      SafeLocalStorage.setItem(SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES, JSON.stringify(accountTypes));
    } catch {
      console.info("Unable to set preferred account types", accountTypes);
    }
  },
  getPreferredAccountTypes() {
    try {
      const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES);
      if (!result) {
        return {};
      }
      return JSON.parse(result);
    } catch {
      console.info("Unable to get preferred account types");
    }
    return {};
  },
  setConnections(connections, chainNamespace) {
    try {
      const newConnections = {
        ...StorageUtil.getConnections(),
        [chainNamespace]: connections
      };
      SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTIONS, JSON.stringify(newConnections));
    } catch (error) {
      console.error("Unable to sync connections to storage", error);
    }
  },
  getConnections() {
    try {
      const connectionsStorage = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTIONS);
      if (!connectionsStorage) {
        return {};
      }
      return JSON.parse(connectionsStorage);
    } catch (error) {
      console.error("Unable to get connections from storage", error);
      return {};
    }
  }
};
const CoreHelperUtil = {
  isMobile() {
    var _a;
    if (this.isClient()) {
      return Boolean(typeof (window == null ? void 0 : window.matchMedia) === "function" && ((_a = window == null ? void 0 : window.matchMedia("(pointer:coarse)")) == null ? void 0 : _a.matches) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent));
    }
    return false;
  },
  checkCaipNetwork(network, networkName = "") {
    return network == null ? void 0 : network.caipNetworkId.toLocaleLowerCase().includes(networkName.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile()) {
      return false;
    }
    const ua2 = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return CoreHelperUtil.isMobile() && ua2.includes("android");
  },
  isIos() {
    if (!this.isMobile()) {
      return false;
    }
    const ua2 = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return ua2.includes("iphone") || ua2.includes("ipad");
  },
  isSafari() {
    if (!this.isClient()) {
      return false;
    }
    const ua2 = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return ua2.includes("safari");
  },
  isClient() {
    return typeof window !== "undefined";
  },
  isPairingExpired(expiry) {
    return expiry ? expiry - Date.now() <= ConstantsUtil$2.TEN_SEC_MS : true;
  },
  isAllowedRetry(lastRetry, differenceMs = ConstantsUtil$2.ONE_SEC_MS) {
    return Date.now() - lastRetry >= differenceMs;
  },
  copyToClopboard(text) {
    navigator.clipboard.writeText(text);
  },
  isIframe() {
    try {
      return (window == null ? void 0 : window.self) !== (window == null ? void 0 : window.top);
    } catch (e) {
      return false;
    }
  },
  isSafeApp() {
    var _a, _b;
    if (CoreHelperUtil.isClient() && window.self !== window.top) {
      try {
        const ancestor = (_b = (_a = window == null ? void 0 : window.location) == null ? void 0 : _a.ancestorOrigins) == null ? void 0 : _b[0];
        const safeAppUrl = "https://app.safe.global";
        if (ancestor) {
          const ancestorUrl = new URL(ancestor);
          const safeUrl = new URL(safeAppUrl);
          return ancestorUrl.hostname === safeUrl.hostname;
        }
      } catch {
        return false;
      }
    }
    return false;
  },
  getPairingExpiry() {
    return Date.now() + ConstantsUtil$2.FOUR_MINUTES_MS;
  },
  getNetworkId(caipAddress) {
    return caipAddress == null ? void 0 : caipAddress.split(":")[1];
  },
  getPlainAddress(caipAddress) {
    return caipAddress == null ? void 0 : caipAddress.split(":")[2];
  },
  async wait(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(func, timeout = 500) {
    let timer = void 0;
    return (...args) => {
      function next() {
        func(...args);
      }
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(next, timeout);
    };
  },
  isHttpUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  },
  formatNativeUrl(appUrl, wcUri, universalLink = null) {
    if (CoreHelperUtil.isHttpUrl(appUrl)) {
      return this.formatUniversalUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    let safeUniversalLink = universalLink;
    if (!safeAppUrl.includes("://")) {
      safeAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
      safeAppUrl = `${safeAppUrl}://`;
    }
    if (!safeAppUrl.endsWith("/")) {
      safeAppUrl = `${safeAppUrl}/`;
    }
    if (safeUniversalLink && !(safeUniversalLink == null ? void 0 : safeUniversalLink.endsWith("/"))) {
      safeUniversalLink = `${safeUniversalLink}/`;
    }
    if (this.isTelegram() && this.isAndroid()) {
      wcUri = encodeURIComponent(wcUri);
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
      redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
      redirectUniversalLink: safeUniversalLink ? `${safeUniversalLink}wc?uri=${encodedWcUrl}` : void 0,
      href: safeAppUrl
    };
  },
  formatUniversalUrl(appUrl, wcUri) {
    if (!CoreHelperUtil.isHttpUrl(appUrl)) {
      return this.formatNativeUrl(appUrl, wcUri);
    }
    let safeAppUrl = appUrl;
    if (!safeAppUrl.endsWith("/")) {
      safeAppUrl = `${safeAppUrl}/`;
    }
    const encodedWcUrl = encodeURIComponent(wcUri);
    return {
      redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
      href: safeAppUrl
    };
  },
  getOpenTargetForPlatform(target) {
    if (target === "popupWindow") {
      return target;
    }
    if (this.isTelegram()) {
      if (StorageUtil.getTelegramSocialProvider()) {
        return "_top";
      }
      return "_blank";
    }
    return target;
  },
  openHref(href, target, features) {
    window == null ? void 0 : window.open(href, this.getOpenTargetForPlatform(target), features || "noreferrer noopener");
  },
  returnOpenHref(href, target, features) {
    return window == null ? void 0 : window.open(href, this.getOpenTargetForPlatform(target), features || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window !== "undefined" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Boolean(window.TelegramWebviewProxy) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean(window.Telegram) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean(window.TelegramWebviewProxyProto));
  },
  isPWA() {
    var _a, _b, _c2;
    if (typeof window === "undefined") {
      return false;
    }
    const isStandaloneDisplayMode = (_b = (_a = window.matchMedia) == null ? void 0 : _a.call(window, "(display-mode: standalone)")) == null ? void 0 : _b.matches;
    const isIOSStandalone = (_c2 = window == null ? void 0 : window.navigator) == null ? void 0 : _c2.standalone;
    return Boolean(isStandaloneDisplayMode || isIOSStandalone);
  },
  async preloadImage(src) {
    const imagePromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.crossOrigin = "anonymous";
      image.src = src;
    });
    return Promise.race([imagePromise, CoreHelperUtil.wait(2e3)]);
  },
  formatBalance(balance, symbol) {
    let formattedBalance = "0.000";
    if (typeof balance === "string") {
      const number = Number(balance);
      if (number) {
        const formattedValue = Math.floor(number * 1e3) / 1e3;
        if (formattedValue) {
          formattedBalance = formattedValue.toString();
        }
      }
    }
    return `${formattedBalance}${symbol ? ` ${symbol}` : ""}`;
  },
  formatBalance2(balance, symbol) {
    var _a;
    let formattedBalance = void 0;
    if (balance === "0") {
      formattedBalance = "0";
    } else if (typeof balance === "string") {
      const number = Number(balance);
      if (number) {
        formattedBalance = (_a = number.toString().match(/^-?\d+(?:\.\d{0,3})?/u)) == null ? void 0 : _a[0];
      }
    }
    return {
      value: formattedBalance ?? "0",
      rest: formattedBalance === "0" ? "000" : "",
      symbol
    };
  },
  getApiUrl() {
    return ConstantsUtil$3.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return ConstantsUtil$3.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return ConstantsUtil$3.PULSE_API_URL;
  },
  getUUID() {
    if (crypto == null ? void 0 : crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (c2) => {
      const r2 = Math.random() * 16 | 0;
      const v2 = c2 === "x" ? r2 : r2 & 3 | 8;
      return v2.toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(error) {
    var _a, _b;
    if (typeof error === "string") {
      return error;
    } else if (typeof ((_b = (_a = error == null ? void 0 : error.issues) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) === "string") {
      return error.issues[0].message;
    } else if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error";
  },
  sortRequestedNetworks(approvedIds, requestedNetworks = []) {
    const approvedIndexMap = {};
    if (requestedNetworks && approvedIds) {
      approvedIds.forEach((id, index) => {
        approvedIndexMap[id] = index;
      });
      requestedNetworks.sort((a2, b2) => {
        const indexA = approvedIndexMap[a2.id];
        const indexB = approvedIndexMap[b2.id];
        if (indexA !== void 0 && indexB !== void 0) {
          return indexA - indexB;
        } else if (indexA !== void 0) {
          return -1;
        } else if (indexB !== void 0) {
          return 1;
        }
        return 0;
      });
    }
    return requestedNetworks;
  },
  calculateBalance(array) {
    let sum = 0;
    for (const item of array) {
      sum += item.value ?? 0;
    }
    return sum;
  },
  formatTokenBalance(number) {
    const roundedNumber = number.toFixed(2);
    const [dollars, pennies] = roundedNumber.split(".");
    return { dollars, pennies };
  },
  isAddress(address, chain = "eip155") {
    switch (chain) {
      case "eip155":
        if (!/^(?:0x)?[0-9a-f]{40}$/iu.test(address)) {
          return false;
        } else if (/^(?:0x)?[0-9a-f]{40}$/iu.test(address) || /^(?:0x)?[0-9A-F]{40}$/iu.test(address)) {
          return true;
        }
        return false;
      case "solana":
        return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(address);
      default:
        return false;
    }
  },
  uniqueBy(arr, key) {
    const set = /* @__PURE__ */ new Set();
    return arr.filter((item) => {
      const keyValue = item[key];
      if (set.has(keyValue)) {
        return false;
      }
      set.add(keyValue);
      return true;
    });
  },
  generateSdkVersion(adapters, platform, version) {
    const hasNoAdapters = adapters.length === 0;
    const adapterNames = hasNoAdapters ? ConstantsUtil$2.ADAPTER_TYPES.UNIVERSAL : adapters.map((adapter) => adapter.adapterType).join(",");
    return `${platform}-${adapterNames}-${version}`;
  },
  // eslint-disable-next-line max-params
  createAccount(namespace, address, type, publicKey, path) {
    return {
      namespace,
      address,
      type,
      publicKey,
      path
    };
  },
  isCaipAddress(address) {
    if (typeof address !== "string") {
      return false;
    }
    const sections = address.split(":");
    const namespace = sections[0];
    return sections.filter(Boolean).length === 3 && namespace in ConstantsUtil$3.CHAIN_NAME_MAP;
  },
  isMac() {
    const ua2 = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return ua2.includes("macintosh") && !ua2.includes("safari");
  },
  formatTelegramSocialLoginUrl(url) {
    const valueToInject = `--${encodeURIComponent(window == null ? void 0 : window.location.href)}`;
    const paramToInject = "state=";
    const parsedUrl = new URL(url);
    if (parsedUrl.host === "auth.magic.link") {
      const providerParam = "provider_authorization_url=";
      const providerUrl = url.substring(url.indexOf(providerParam) + providerParam.length);
      const resultUrl = this.injectIntoUrl(decodeURIComponent(providerUrl), paramToInject, valueToInject);
      return url.replace(providerUrl, encodeURIComponent(resultUrl));
    }
    return this.injectIntoUrl(url, paramToInject, valueToInject);
  },
  injectIntoUrl(url, key, appendString) {
    const keyIndex = url.indexOf(key);
    if (keyIndex === -1) {
      throw new Error(`${key} parameter not found in the URL: ${url}`);
    }
    const keyEndIndex = url.indexOf("&", keyIndex);
    const keyLength = key.length;
    const keyParamEnd = keyEndIndex !== -1 ? keyEndIndex : url.length;
    const beforeKeyValue = url.substring(0, keyIndex + keyLength);
    const currentKeyValue = url.substring(keyIndex + keyLength, keyParamEnd);
    const afterKeyValue = url.substring(keyEndIndex);
    const newKeyValue = currentKeyValue + appendString;
    const newUrl = beforeKeyValue + newKeyValue + afterKeyValue;
    return newUrl;
  }
};
async function fetchData(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    const err = new Error(`HTTP status code: ${response.status}`, {
      cause: response
    });
    throw err;
  }
  return response;
}
class FetchUtil {
  constructor({ baseUrl: baseUrl2, clientId }) {
    this.baseUrl = baseUrl2;
    this.clientId = clientId;
  }
  async get({ headers, signal, cache, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, { method: "GET", headers, signal, cache });
    return response.json();
  }
  async getBlob({ headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, { method: "GET", headers, signal });
    return response.blob();
  }
  async post({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  async put({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  async delete({ body, headers, signal, ...args }) {
    const url = this.createUrl(args);
    const response = await fetchData(url, {
      method: "DELETE",
      headers,
      body: body ? JSON.stringify(body) : void 0,
      signal
    });
    return response.json();
  }
  createUrl({ path, params }) {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value);
        }
      });
    }
    if (this.clientId) {
      url.searchParams.append("clientId", this.clientId);
    }
    return url;
  }
}
const OptionsUtil = {
  getFeatureValue(key, features) {
    const optionValue = features == null ? void 0 : features[key];
    if (optionValue === void 0) {
      return ConstantsUtil$2.DEFAULT_FEATURES[key];
    }
    return optionValue;
  },
  filterSocialsByPlatform(socials) {
    if (!socials || !socials.length) {
      return socials;
    }
    if (CoreHelperUtil.isTelegram()) {
      if (CoreHelperUtil.isIos()) {
        return socials.filter((s2) => s2 !== "google");
      }
      if (CoreHelperUtil.isMac()) {
        return socials.filter((s2) => s2 !== "x");
      }
      if (CoreHelperUtil.isAndroid()) {
        return socials.filter((s2) => !["facebook", "x"].includes(s2));
      }
    }
    return socials;
  }
};
const state$l = proxy({
  features: ConstantsUtil$2.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: ConstantsUtil$2.DEFAULT_ACCOUNT_TYPES,
  enableNetworkSwitch: true,
  experimental_preferUniversalLinks: false,
  remoteFeatures: {}
});
const OptionsController = {
  state: state$l,
  subscribeKey(key, callback) {
    return subscribeKey(state$l, key, callback);
  },
  setOptions(options) {
    Object.assign(state$l, options);
  },
  setRemoteFeatures(remoteFeatures) {
    var _a;
    if (!remoteFeatures) {
      return;
    }
    const newRemoteFeatures = { ...state$l.remoteFeatures, ...remoteFeatures };
    state$l.remoteFeatures = newRemoteFeatures;
    if ((_a = state$l.remoteFeatures) == null ? void 0 : _a.socials) {
      state$l.remoteFeatures.socials = OptionsUtil.filterSocialsByPlatform(state$l.remoteFeatures.socials);
    }
  },
  setFeatures(features) {
    if (!features) {
      return;
    }
    if (!state$l.features) {
      state$l.features = ConstantsUtil$2.DEFAULT_FEATURES;
    }
    const newFeatures = { ...state$l.features, ...features };
    state$l.features = newFeatures;
  },
  setProjectId(projectId) {
    state$l.projectId = projectId;
  },
  setCustomRpcUrls(customRpcUrls) {
    state$l.customRpcUrls = customRpcUrls;
  },
  setAllWallets(allWallets) {
    state$l.allWallets = allWallets;
  },
  setIncludeWalletIds(includeWalletIds) {
    state$l.includeWalletIds = includeWalletIds;
  },
  setExcludeWalletIds(excludeWalletIds) {
    state$l.excludeWalletIds = excludeWalletIds;
  },
  setFeaturedWalletIds(featuredWalletIds) {
    state$l.featuredWalletIds = featuredWalletIds;
  },
  setTokens(tokens) {
    state$l.tokens = tokens;
  },
  setTermsConditionsUrl(termsConditionsUrl) {
    state$l.termsConditionsUrl = termsConditionsUrl;
  },
  setPrivacyPolicyUrl(privacyPolicyUrl) {
    state$l.privacyPolicyUrl = privacyPolicyUrl;
  },
  setCustomWallets(customWallets) {
    state$l.customWallets = customWallets;
  },
  setIsSiweEnabled(isSiweEnabled) {
    state$l.isSiweEnabled = isSiweEnabled;
  },
  setIsUniversalProvider(isUniversalProvider) {
    state$l.isUniversalProvider = isUniversalProvider;
  },
  setSdkVersion(sdkVersion) {
    state$l.sdkVersion = sdkVersion;
  },
  setMetadata(metadata) {
    state$l.metadata = metadata;
  },
  setDisableAppend(disableAppend) {
    state$l.disableAppend = disableAppend;
  },
  setEIP6963Enabled(enableEIP6963) {
    state$l.enableEIP6963 = enableEIP6963;
  },
  setDebug(debug) {
    state$l.debug = debug;
  },
  setEnableWalletConnect(enableWalletConnect) {
    state$l.enableWalletConnect = enableWalletConnect;
  },
  setEnableWalletGuide(enableWalletGuide) {
    state$l.enableWalletGuide = enableWalletGuide;
  },
  setEnableAuthLogger(enableAuthLogger) {
    state$l.enableAuthLogger = enableAuthLogger;
  },
  setEnableWallets(enableWallets) {
    state$l.enableWallets = enableWallets;
  },
  setPreferUniversalLinks(preferUniversalLinks) {
    state$l.experimental_preferUniversalLinks = preferUniversalLinks;
  },
  setHasMultipleAddresses(hasMultipleAddresses) {
    state$l.hasMultipleAddresses = hasMultipleAddresses;
  },
  setSIWX(siwx) {
    state$l.siwx = siwx;
  },
  setConnectMethodsOrder(connectMethodsOrder) {
    state$l.features = {
      ...state$l.features,
      connectMethodsOrder
    };
  },
  setWalletFeaturesOrder(walletFeaturesOrder) {
    state$l.features = {
      ...state$l.features,
      walletFeaturesOrder
    };
  },
  setSocialsOrder(socialsOrder) {
    state$l.remoteFeatures = {
      ...state$l.remoteFeatures,
      socials: socialsOrder
    };
  },
  setCollapseWallets(collapseWallets) {
    state$l.features = {
      ...state$l.features,
      collapseWallets
    };
  },
  setEnableEmbedded(enableEmbedded) {
    state$l.enableEmbedded = enableEmbedded;
  },
  setAllowUnsupportedChain(allowUnsupportedChain) {
    state$l.allowUnsupportedChain = allowUnsupportedChain;
  },
  setManualWCControl(manualWCControl) {
    state$l.manualWCControl = manualWCControl;
  },
  setEnableNetworkSwitch(enableNetworkSwitch) {
    state$l.enableNetworkSwitch = enableNetworkSwitch;
  },
  setDefaultAccountTypes(defaultAccountType = {}) {
    Object.entries(defaultAccountType).forEach(([namespace, accountType]) => {
      if (accountType) {
        state$l.defaultAccountTypes[namespace] = accountType;
      }
    });
  },
  setUniversalProviderConfigOverride(universalProviderConfigOverride) {
    state$l.universalProviderConfigOverride = universalProviderConfigOverride;
  },
  getUniversalProviderConfigOverride() {
    return state$l.universalProviderConfigOverride;
  },
  getSnapshot() {
    return snapshot(state$l);
  }
};
const DEFAULT_STATE$1 = Object.freeze({
  enabled: true,
  events: []
});
const api$2 = new FetchUtil({ baseUrl: CoreHelperUtil.getAnalyticsUrl(), clientId: null });
const MAX_ERRORS_PER_MINUTE = 5;
const ONE_MINUTE_MS = 60 * 1e3;
const state$k = proxy({
  ...DEFAULT_STATE$1
});
const TelemetryController = {
  state: state$k,
  subscribeKey(key, callback) {
    return subscribeKey(state$k, key, callback);
  },
  async sendError(error, category) {
    if (!state$k.enabled) {
      return;
    }
    const now = Date.now();
    const recentErrors = state$k.events.filter((event) => {
      const eventTime = new Date(event.properties.timestamp || "").getTime();
      return now - eventTime < ONE_MINUTE_MS;
    });
    if (recentErrors.length >= MAX_ERRORS_PER_MINUTE) {
      return;
    }
    const errorEvent = {
      type: "error",
      event: category,
      properties: {
        errorType: error.name,
        errorMessage: error.message,
        stackTrace: error.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    state$k.events.push(errorEvent);
    try {
      if (typeof window === "undefined") {
        return;
      }
      const { projectId, sdkType, sdkVersion } = OptionsController.state;
      await api$2.post({
        path: "/e",
        params: {
          projectId,
          st: sdkType,
          sv: sdkVersion || "html-wagmi-4.2.2"
        },
        body: {
          eventId: CoreHelperUtil.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          props: {
            type: "error",
            event: category,
            errorType: error.name,
            errorMessage: error.message,
            stackTrace: error.stack
          }
        }
      });
    } catch {
    }
  },
  enable() {
    state$k.enabled = true;
  },
  disable() {
    state$k.enabled = false;
  },
  clearEvents() {
    state$k.events = [];
  }
};
class AppKitError extends Error {
  constructor(message, category, originalError) {
    super(message);
    this.name = "AppKitError";
    this.category = category;
    this.originalError = originalError;
    Object.setPrototypeOf(this, AppKitError.prototype);
    let isStackConstructedFromOriginal = false;
    if (originalError instanceof Error && typeof originalError.stack === "string" && originalError.stack) {
      const originalErrorStack = originalError.stack;
      const firstNewlineIndex = originalErrorStack.indexOf("\n");
      if (firstNewlineIndex > -1) {
        const originalFrames = originalErrorStack.substring(firstNewlineIndex + 1);
        this.stack = `${this.name}: ${this.message}
${originalFrames}`;
        isStackConstructedFromOriginal = true;
      }
    }
    if (!isStackConstructedFromOriginal) {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AppKitError);
      } else if (!this.stack) {
        this.stack = `${this.name}: ${this.message}`;
      }
    }
  }
}
function errorHandler(err, defaultCategory) {
  const error = err instanceof AppKitError ? err : new AppKitError(err instanceof Error ? err.message : String(err), defaultCategory, err);
  TelemetryController.sendError(error, error.category);
  throw error;
}
function withErrorBoundary(controller2, defaultCategory = "INTERNAL_SDK_ERROR") {
  const newController = {};
  Object.keys(controller2).forEach((key) => {
    const original = controller2[key];
    if (typeof original === "function") {
      let wrapped = original;
      if (original.constructor.name === "AsyncFunction") {
        wrapped = async (...args) => {
          try {
            return await original(...args);
          } catch (err) {
            return errorHandler(err, defaultCategory);
          }
        };
      } else {
        wrapped = (...args) => {
          try {
            return original(...args);
          } catch (err) {
            return errorHandler(err, defaultCategory);
          }
        };
      }
      newController[key] = wrapped;
    } else {
      newController[key] = original;
    }
  });
  return newController;
}
const CUSTOM_DEEPLINK_WALLETS = {
  PHANTOM: {
    id: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    url: "https://phantom.app"
  },
  SOLFLARE: {
    id: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
    url: "https://solflare.com"
  },
  COINBASE: {
    id: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
    url: "https://go.cb-w.com"
  }
};
const MobileWalletUtil = {
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
   *
   * @param {string} id - The id of the wallet.
   * @param {ChainNamespace} namespace - The namespace of the chain.
   */
  handleMobileDeeplinkRedirect(id, namespace) {
    const href = window.location.href;
    const encodedHref = encodeURIComponent(href);
    if (id === CUSTOM_DEEPLINK_WALLETS.PHANTOM.id && !("phantom" in window)) {
      const protocol = href.startsWith("https") ? "https" : "http";
      const host = href.split("/")[2];
      const encodedRef = encodeURIComponent(`${protocol}://${host}`);
      window.location.href = `${CUSTOM_DEEPLINK_WALLETS.PHANTOM.url}/ul/browse/${encodedHref}?ref=${encodedRef}`;
    }
    if (id === CUSTOM_DEEPLINK_WALLETS.SOLFLARE.id && !("solflare" in window)) {
      window.location.href = `${CUSTOM_DEEPLINK_WALLETS.SOLFLARE.url}/ul/v1/browse/${encodedHref}?ref=${encodedHref}`;
    }
    if (namespace === ConstantsUtil$3.CHAIN.SOLANA) {
      if (id === CUSTOM_DEEPLINK_WALLETS.COINBASE.id && !("coinbaseSolana" in window)) {
        window.location.href = `${CUSTOM_DEEPLINK_WALLETS.COINBASE.url}/dapp?cb_url=${encodedHref}`;
      }
    }
  }
};
const state$j = proxy({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
});
const controller$d = {
  state: state$j,
  subscribeNetworkImages(callback) {
    return subscribe(state$j.networkImages, () => callback(state$j.networkImages));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$j, key, callback);
  },
  subscribe(callback) {
    return subscribe(state$j, () => callback(state$j));
  },
  setWalletImage(key, value) {
    state$j.walletImages[key] = value;
  },
  setNetworkImage(key, value) {
    state$j.networkImages[key] = value;
  },
  setChainImage(key, value) {
    state$j.chainImages[key] = value;
  },
  setConnectorImage(key, value) {
    state$j.connectorImages = { ...state$j.connectorImages, [key]: value };
  },
  setTokenImage(key, value) {
    state$j.tokenImages[key] = value;
  },
  setCurrencyImage(key, value) {
    state$j.currencyImages[key] = value;
  }
};
const AssetController = withErrorBoundary(controller$d);
const namespaceImageIds = {
  // Ethereum
  eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
  // Solana
  solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
  // Polkadot
  polkadot: "",
  // Bitcoin
  bip122: "0b4838db-0161-4ffe-022d-532bf03dba00",
  // Cosmos
  cosmos: ""
};
const state$i = proxy({
  networkImagePromises: {}
});
const AssetUtil = {
  async fetchWalletImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    await ApiController._fetchWalletImage(imageId);
    return this.getWalletImageById(imageId);
  },
  async fetchNetworkImage(imageId) {
    if (!imageId) {
      return void 0;
    }
    const existingImage = this.getNetworkImageById(imageId);
    if (existingImage) {
      return existingImage;
    }
    if (!state$i.networkImagePromises[imageId]) {
      state$i.networkImagePromises[imageId] = ApiController._fetchNetworkImage(imageId);
    }
    await state$i.networkImagePromises[imageId];
    return this.getNetworkImageById(imageId);
  },
  getWalletImageById(imageId) {
    if (!imageId) {
      return void 0;
    }
    return AssetController.state.walletImages[imageId];
  },
  getWalletImage(wallet) {
    if (wallet == null ? void 0 : wallet.image_url) {
      return wallet == null ? void 0 : wallet.image_url;
    }
    if (wallet == null ? void 0 : wallet.image_id) {
      return AssetController.state.walletImages[wallet.image_id];
    }
    return void 0;
  },
  getNetworkImage(network) {
    var _a, _b, _c2;
    if ((_a = network == null ? void 0 : network.assets) == null ? void 0 : _a.imageUrl) {
      return (_b = network == null ? void 0 : network.assets) == null ? void 0 : _b.imageUrl;
    }
    if ((_c2 = network == null ? void 0 : network.assets) == null ? void 0 : _c2.imageId) {
      return AssetController.state.networkImages[network.assets.imageId];
    }
    return void 0;
  },
  getNetworkImageById(imageId) {
    if (!imageId) {
      return void 0;
    }
    return AssetController.state.networkImages[imageId];
  },
  getConnectorImage(connector) {
    if (connector == null ? void 0 : connector.imageUrl) {
      return connector.imageUrl;
    }
    if (connector == null ? void 0 : connector.imageId) {
      return AssetController.state.connectorImages[connector.imageId];
    }
    return void 0;
  },
  getChainImage(chain) {
    return AssetController.state.networkImages[namespaceImageIds[chain]];
  }
};
const state$h = proxy({
  message: "",
  variant: "info",
  open: false
});
const controller$c = {
  state: state$h,
  subscribeKey(key, callback) {
    return subscribeKey(state$h, key, callback);
  },
  open(message, variant) {
    const { debug } = OptionsController.state;
    const { shortMessage, longMessage } = message;
    if (debug) {
      state$h.message = shortMessage;
      state$h.variant = variant;
      state$h.open = true;
    }
    if (longMessage) {
      console.error(typeof longMessage === "function" ? longMessage() : longMessage);
    }
  },
  close() {
    state$h.open = false;
    state$h.message = "";
    state$h.variant = "info";
  }
};
const AlertController = withErrorBoundary(controller$c);
const baseUrl$2 = CoreHelperUtil.getAnalyticsUrl();
const api$1 = new FetchUtil({ baseUrl: baseUrl$2, clientId: null });
const excluded = ["MODAL_CREATED"];
const state$g = proxy({
  timestamp: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  }
});
const EventsController = {
  state: state$g,
  subscribe(callback) {
    return subscribe(state$g, () => callback(state$g));
  },
  getSdkProperties() {
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    return {
      projectId,
      st: sdkType,
      sv: sdkVersion || "html-wagmi-4.2.2"
    };
  },
  async _sendAnalyticsEvent(payload) {
    try {
      const address = AccountController.state.address;
      if (excluded.includes(payload.data.event) || typeof window === "undefined") {
        return;
      }
      await api$1.post({
        path: "/e",
        params: EventsController.getSdkProperties(),
        body: {
          eventId: CoreHelperUtil.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: payload.timestamp,
          props: { ...payload.data, address }
        }
      });
      state$g.reportedErrors["FORBIDDEN"] = false;
    } catch (err) {
      const isForbiddenError = err instanceof Error && err.cause instanceof Response && err.cause.status === ConstantsUtil$3.HTTP_STATUS_CODES.FORBIDDEN && !state$g.reportedErrors["FORBIDDEN"];
      if (isForbiddenError) {
        AlertController.open({
          shortMessage: "Invalid App Configuration",
          longMessage: `Origin ${isSafe$1() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
        }, "error");
        state$g.reportedErrors["FORBIDDEN"] = true;
      }
    }
  },
  sendEvent(data) {
    var _a;
    state$g.timestamp = Date.now();
    state$g.data = data;
    if ((_a = OptionsController.state.features) == null ? void 0 : _a.analytics) {
      EventsController._sendAnalyticsEvent(state$g);
    }
  }
};
const baseUrl$1 = CoreHelperUtil.getApiUrl();
const api = new FetchUtil({
  baseUrl: baseUrl$1,
  clientId: null
});
const entries = 40;
const recommendedEntries = 4;
const imageCountToFetch = 20;
const state$f = proxy({
  promises: {},
  page: 1,
  count: 0,
  featured: [],
  allFeatured: [],
  recommended: [],
  allRecommended: [],
  wallets: [],
  filteredWallets: [],
  search: [],
  isAnalyticsEnabled: false,
  excludedWallets: [],
  isFetchingRecommendedWallets: false
});
const ApiController = {
  state: state$f,
  subscribeKey(key, callback) {
    return subscribeKey(state$f, key, callback);
  },
  _getSdkProperties() {
    const { projectId, sdkType, sdkVersion } = OptionsController.state;
    return {
      projectId,
      st: sdkType || "appkit",
      sv: sdkVersion || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(wallets) {
    if (OptionsController.state.isUniversalProvider) {
      return wallets.filter((w2) => Boolean(w2.mobile_link || w2.desktop_link || w2.webapp_link));
    }
    return wallets;
  },
  async _fetchWalletImage(imageId) {
    const imageUrl = `${api.baseUrl}/getWalletImage/${imageId}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setWalletImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchNetworkImage(imageId) {
    const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setNetworkImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchConnectorImage(imageId) {
    const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setConnectorImage(imageId, URL.createObjectURL(blob));
  },
  async _fetchCurrencyImage(countryCode) {
    const imageUrl = `${api.baseUrl}/public/getCurrencyImage/${countryCode}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setCurrencyImage(countryCode, URL.createObjectURL(blob));
  },
  async _fetchTokenImage(symbol) {
    const imageUrl = `${api.baseUrl}/public/getTokenImage/${symbol}`;
    const blob = await api.getBlob({ path: imageUrl, params: ApiController._getSdkProperties() });
    AssetController.setTokenImage(symbol, URL.createObjectURL(blob));
  },
  _filterWalletsByPlatform(wallets) {
    const filteredWallets = CoreHelperUtil.isMobile() ? wallets == null ? void 0 : wallets.filter((w2) => {
      if (w2.mobile_link) {
        return true;
      }
      if (w2.id === CUSTOM_DEEPLINK_WALLETS.COINBASE.id) {
        return true;
      }
      const isSolana = ChainController.state.activeChain === "solana";
      return isSolana && (w2.id === CUSTOM_DEEPLINK_WALLETS.SOLFLARE.id || w2.id === CUSTOM_DEEPLINK_WALLETS.PHANTOM.id);
    }) : wallets;
    return filteredWallets;
  },
  async fetchProjectConfig() {
    const response = await api.get({
      path: "/appkit/v1/config",
      params: ApiController._getSdkProperties()
    });
    return response.features;
  },
  async fetchAllowedOrigins() {
    try {
      const { allowedOrigins } = await api.get({
        path: "/projects/v1/origins",
        params: ApiController._getSdkProperties()
      });
      return allowedOrigins;
    } catch (error) {
      return [];
    }
  },
  async fetchNetworkImages() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const ids = requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.map(({ assets }) => assets == null ? void 0 : assets.imageId).filter(Boolean).filter((imageId) => !AssetUtil.getNetworkImageById(imageId));
    if (ids) {
      await Promise.allSettled(ids.map((id) => ApiController._fetchNetworkImage(id)));
    }
  },
  async fetchConnectorImages() {
    const { connectors } = ConnectorController.state;
    const ids = connectors.map(({ imageId }) => imageId).filter(Boolean);
    await Promise.allSettled(ids.map((id) => ApiController._fetchConnectorImage(id)));
  },
  async fetchCurrencyImages(currencies = []) {
    await Promise.allSettled(currencies.map((currency) => ApiController._fetchCurrencyImage(currency)));
  },
  async fetchTokenImages(tokens = []) {
    await Promise.allSettled(tokens.map((token) => ApiController._fetchTokenImage(token)));
  },
  async fetchWallets(params) {
    var _a;
    const exclude = params.exclude ?? [];
    const sdkProperties = ApiController._getSdkProperties();
    if (sdkProperties.sv.startsWith("html-core-")) {
      exclude.push(...Object.values(CUSTOM_DEEPLINK_WALLETS).map((w2) => w2.id));
    }
    const wallets = await api.get({
      path: "/getWallets",
      params: {
        ...ApiController._getSdkProperties(),
        ...params,
        page: String(params.page),
        entries: String(params.entries),
        include: (_a = params.include) == null ? void 0 : _a.join(","),
        exclude: exclude.join(",")
      }
    });
    const filteredWallets = ApiController._filterWalletsByPlatform(wallets == null ? void 0 : wallets.data);
    return {
      data: filteredWallets || [],
      // Keep original count for display on main page
      count: wallets == null ? void 0 : wallets.count
    };
  },
  async fetchFeaturedWallets() {
    const { featuredWalletIds } = OptionsController.state;
    if (featuredWalletIds == null ? void 0 : featuredWalletIds.length) {
      const params = {
        ...ApiController._getSdkProperties(),
        page: 1,
        entries: (featuredWalletIds == null ? void 0 : featuredWalletIds.length) ?? recommendedEntries,
        include: featuredWalletIds
      };
      const { data } = await ApiController.fetchWallets(params);
      const sortedData = [...data].sort((a2, b2) => featuredWalletIds.indexOf(a2.id) - featuredWalletIds.indexOf(b2.id));
      const images = sortedData.map((d3) => d3.image_id).filter(Boolean);
      await Promise.allSettled(images.map((id) => ApiController._fetchWalletImage(id)));
      state$f.featured = sortedData;
      state$f.allFeatured = sortedData;
    }
  },
  async fetchRecommendedWallets() {
    try {
      state$f.isFetchingRecommendedWallets = true;
      const { includeWalletIds, excludeWalletIds, featuredWalletIds } = OptionsController.state;
      const exclude = [...excludeWalletIds ?? [], ...featuredWalletIds ?? []].filter(Boolean);
      const chains = ChainController.getRequestedCaipNetworkIds().join(",");
      const params = {
        page: 1,
        entries: recommendedEntries,
        include: includeWalletIds,
        exclude,
        chains
      };
      const { data, count } = await ApiController.fetchWallets(params);
      const recent = StorageUtil.getRecentWallets();
      const recommendedImages = data.map((d3) => d3.image_id).filter(Boolean);
      const recentImages = recent.map((r2) => r2.image_id).filter(Boolean);
      await Promise.allSettled([...recommendedImages, ...recentImages].map((id) => ApiController._fetchWalletImage(id)));
      state$f.recommended = data;
      state$f.allRecommended = data;
      state$f.count = count ?? 0;
    } catch {
    } finally {
      state$f.isFetchingRecommendedWallets = false;
    }
  },
  async fetchWalletsByPage({ page }) {
    const { includeWalletIds, excludeWalletIds, featuredWalletIds } = OptionsController.state;
    const chains = ChainController.getRequestedCaipNetworkIds().join(",");
    const exclude = [
      ...state$f.recommended.map(({ id }) => id),
      ...excludeWalletIds ?? [],
      ...featuredWalletIds ?? []
    ].filter(Boolean);
    const params = {
      page,
      entries,
      include: includeWalletIds,
      exclude,
      chains
    };
    const { data, count } = await ApiController.fetchWallets(params);
    const images = data.slice(0, imageCountToFetch).map((w2) => w2.image_id).filter(Boolean);
    await Promise.allSettled(images.map((id) => ApiController._fetchWalletImage(id)));
    state$f.wallets = CoreHelperUtil.uniqueBy([...state$f.wallets, ...ApiController._filterOutExtensions(data)], "id").filter((w2) => {
      var _a;
      return (_a = w2.chains) == null ? void 0 : _a.some((chain) => chains.includes(chain));
    });
    state$f.count = count > state$f.count ? count : state$f.count;
    state$f.page = page;
  },
  async initializeExcludedWallets({ ids }) {
    const params = {
      page: 1,
      entries: ids.length,
      include: ids
    };
    const { data } = await ApiController.fetchWallets(params);
    if (data) {
      data.forEach((wallet) => {
        state$f.excludedWallets.push({ rdns: wallet.rdns, name: wallet.name });
      });
    }
  },
  async searchWallet({ search, badge }) {
    const { includeWalletIds, excludeWalletIds } = OptionsController.state;
    const chains = ChainController.getRequestedCaipNetworkIds().join(",");
    state$f.search = [];
    const params = {
      page: 1,
      entries: 100,
      search: search == null ? void 0 : search.trim(),
      badge_type: badge,
      include: includeWalletIds,
      exclude: excludeWalletIds,
      chains
    };
    const { data } = await ApiController.fetchWallets(params);
    EventsController.sendEvent({
      type: "track",
      event: "SEARCH_WALLET",
      properties: { badge: badge ?? "", search: search ?? "" }
    });
    const images = data.map((w2) => w2.image_id).filter(Boolean);
    await Promise.allSettled([
      ...images.map((id) => ApiController._fetchWalletImage(id)),
      CoreHelperUtil.wait(300)
    ]);
    state$f.search = ApiController._filterOutExtensions(data);
  },
  initPromise(key, fetchFn) {
    const existingPromise = state$f.promises[key];
    if (existingPromise) {
      return existingPromise;
    }
    return state$f.promises[key] = fetchFn();
  },
  prefetch({ fetchConnectorImages = true, fetchFeaturedWallets = true, fetchRecommendedWallets = true, fetchNetworkImages = true } = {}) {
    const promises = [
      fetchConnectorImages && ApiController.initPromise("connectorImages", ApiController.fetchConnectorImages),
      fetchFeaturedWallets && ApiController.initPromise("featuredWallets", ApiController.fetchFeaturedWallets),
      fetchRecommendedWallets && ApiController.initPromise("recommendedWallets", ApiController.fetchRecommendedWallets),
      fetchNetworkImages && ApiController.initPromise("networkImages", ApiController.fetchNetworkImages)
    ].filter(Boolean);
    return Promise.allSettled(promises);
  },
  prefetchAnalyticsConfig() {
    var _a;
    if ((_a = OptionsController.state.features) == null ? void 0 : _a.analytics) {
      ApiController.fetchAnalyticsConfig();
    }
  },
  async fetchAnalyticsConfig() {
    try {
      const { isAnalyticsEnabled } = await api.get({
        path: "/getAnalyticsConfig",
        params: ApiController._getSdkProperties()
      });
      OptionsController.setFeatures({ analytics: isAnalyticsEnabled });
    } catch (error) {
      OptionsController.setFeatures({ analytics: false });
    }
  },
  filterByNamespaces(namespaces) {
    if (!(namespaces == null ? void 0 : namespaces.length)) {
      state$f.featured = state$f.allFeatured;
      state$f.recommended = state$f.allRecommended;
      return;
    }
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    state$f.featured = state$f.allFeatured.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
    state$f.recommended = state$f.allRecommended.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
    state$f.filteredWallets = state$f.wallets.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
  },
  clearFilterByNamespaces() {
    state$f.filteredWallets = [];
  },
  setFilterByNamespace(namespace) {
    if (!namespace) {
      state$f.featured = state$f.allFeatured;
      state$f.recommended = state$f.allRecommended;
      return;
    }
    const caipNetworkIds = ChainController.getRequestedCaipNetworkIds().join(",");
    state$f.featured = state$f.allFeatured.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
    state$f.recommended = state$f.allRecommended.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
    state$f.filteredWallets = state$f.wallets.filter((wallet) => {
      var _a;
      return (_a = wallet.chains) == null ? void 0 : _a.some((chain) => caipNetworkIds.includes(chain));
    });
  }
};
const state$e = proxy({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
});
const controller$b = {
  state: state$e,
  subscribeKey(key, callback) {
    return subscribeKey(state$e, key, callback);
  },
  pushTransactionStack(action) {
    state$e.transactionStack.push(action);
  },
  popTransactionStack(status) {
    const action = state$e.transactionStack.pop();
    if (!action) {
      return;
    }
    const { onSuccess, onError, onCancel } = action;
    switch (status) {
      case "success":
        onSuccess == null ? void 0 : onSuccess();
        break;
      case "error":
        onError == null ? void 0 : onError();
        RouterController.goBack();
        break;
      case "cancel":
        onCancel == null ? void 0 : onCancel();
        RouterController.goBack();
        break;
    }
  },
  push(view, data) {
    if (view !== state$e.view) {
      state$e.view = view;
      state$e.history.push(view);
      state$e.data = data;
    }
  },
  reset(view, data) {
    state$e.view = view;
    state$e.history = [view];
    state$e.data = data;
  },
  replace(view, data) {
    const lastView = state$e.history.at(-1);
    const isSameView = lastView === view;
    if (!isSameView) {
      state$e.view = view;
      state$e.history[state$e.history.length - 1] = view;
      state$e.data = data;
    }
  },
  goBack() {
    var _a;
    const isConnected = ChainController.state.activeCaipAddress;
    const isFarcasterView = RouterController.state.view === "ConnectingFarcaster";
    const shouldReload = !isConnected && isFarcasterView;
    if (state$e.history.length > 1) {
      state$e.history.pop();
      const [last] = state$e.history.slice(-1);
      if (last) {
        const isConnectView = last === "Connect";
        if (isConnected && isConnectView) {
          state$e.view = "Account";
        } else {
          state$e.view = last;
        }
      }
    } else {
      ModalController.close();
    }
    if ((_a = state$e.data) == null ? void 0 : _a.wallet) {
      state$e.data.wallet = void 0;
    }
    setTimeout(() => {
      var _a2, _b, _c2;
      if (shouldReload) {
        AccountController.setFarcasterUrl(void 0, ChainController.state.activeChain);
        const authConnector = ConnectorController.getAuthConnector();
        (_a2 = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _a2.reload();
        const optionsState = snapshot(OptionsController.state);
        (_c2 = (_b = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _b.syncDappData) == null ? void 0 : _c2.call(_b, {
          metadata: optionsState.metadata,
          sdkVersion: optionsState.sdkVersion,
          projectId: optionsState.projectId,
          sdkType: optionsState.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(historyIndex) {
    if (state$e.history.length > 1) {
      state$e.history = state$e.history.slice(0, historyIndex + 1);
      const [last] = state$e.history.slice(-1);
      if (last) {
        state$e.view = last;
      }
    }
  },
  goBackOrCloseModal() {
    if (RouterController.state.history.length > 1) {
      RouterController.goBack();
    } else {
      ModalController.close();
    }
  }
};
const RouterController = withErrorBoundary(controller$b);
const state$d = proxy({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
});
const controller$a = {
  state: state$d,
  subscribe(callback) {
    return subscribe(state$d, () => callback(state$d));
  },
  setThemeMode(themeMode) {
    state$d.themeMode = themeMode;
    try {
      const authConnector = ConnectorController.getAuthConnector();
      if (authConnector) {
        const themeVariables = controller$a.getSnapshot().themeVariables;
        authConnector.provider.syncTheme({
          themeMode,
          themeVariables,
          w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(themeVariables) {
    state$d.themeVariables = { ...state$d.themeVariables, ...themeVariables };
    try {
      const authConnector = ConnectorController.getAuthConnector();
      if (authConnector) {
        const themeVariablesSnapshot = controller$a.getSnapshot().themeVariables;
        authConnector.provider.syncTheme({
          themeVariables: themeVariablesSnapshot,
          w3mThemeVariables: getW3mThemeVariables(state$d.themeVariables, state$d.themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return snapshot(state$d);
  }
};
const ThemeController = withErrorBoundary(controller$a);
const defaultActiveConnectors = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
};
const state$c = proxy({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: { ...defaultActiveConnectors },
  filterByNamespaceMap: {
    eip155: true,
    solana: true,
    polkadot: true,
    bip122: true,
    cosmos: true
  }
});
const controller$9 = {
  state: state$c,
  subscribe(callback) {
    return subscribe(state$c, () => {
      callback(state$c);
    });
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$c, key, callback);
  },
  initialize(namespaces) {
    namespaces.forEach((namespace) => {
      const connectorId = StorageUtil.getConnectedConnectorId(namespace);
      if (connectorId) {
        ConnectorController.setConnectorId(connectorId, namespace);
      }
    });
  },
  setActiveConnector(connector) {
    if (connector) {
      state$c.activeConnector = ref(connector);
    }
  },
  setConnectors(connectors) {
    const newConnectors = connectors.filter((newConnector) => !state$c.allConnectors.some((existingConnector) => existingConnector.id === newConnector.id && ConnectorController.getConnectorName(existingConnector.name) === ConnectorController.getConnectorName(newConnector.name) && existingConnector.chain === newConnector.chain));
    newConnectors.forEach((connector) => {
      if (connector.type !== "MULTI_CHAIN") {
        state$c.allConnectors.push(ref(connector));
      }
    });
    const enabledNamespaces = ConnectorController.getEnabledNamespaces();
    const connectorsFilteredByNamespaces = ConnectorController.getEnabledConnectors(enabledNamespaces);
    state$c.connectors = ConnectorController.mergeMultiChainConnectors(connectorsFilteredByNamespaces);
  },
  filterByNamespaces(enabledNamespaces) {
    Object.keys(state$c.filterByNamespaceMap).forEach((namespace) => {
      state$c.filterByNamespaceMap[namespace] = false;
    });
    enabledNamespaces.forEach((namespace) => {
      state$c.filterByNamespaceMap[namespace] = true;
    });
    ConnectorController.updateConnectorsForEnabledNamespaces();
  },
  filterByNamespace(namespace, enabled) {
    state$c.filterByNamespaceMap[namespace] = enabled;
    ConnectorController.updateConnectorsForEnabledNamespaces();
  },
  updateConnectorsForEnabledNamespaces() {
    const enabledNamespaces = ConnectorController.getEnabledNamespaces();
    const enabledConnectors = ConnectorController.getEnabledConnectors(enabledNamespaces);
    const areAllNamespacesEnabled = ConnectorController.areAllNamespacesEnabled();
    state$c.connectors = ConnectorController.mergeMultiChainConnectors(enabledConnectors);
    if (areAllNamespacesEnabled) {
      ApiController.clearFilterByNamespaces();
    } else {
      ApiController.filterByNamespaces(enabledNamespaces);
    }
  },
  getEnabledNamespaces() {
    return Object.entries(state$c.filterByNamespaceMap).filter(([_, enabled]) => enabled).map(([namespace]) => namespace);
  },
  getEnabledConnectors(enabledNamespaces) {
    return state$c.allConnectors.filter((connector) => enabledNamespaces.includes(connector.chain));
  },
  areAllNamespacesEnabled() {
    return Object.values(state$c.filterByNamespaceMap).every((enabled) => enabled);
  },
  mergeMultiChainConnectors(connectors) {
    const connectorsByNameMap = ConnectorController.generateConnectorMapByName(connectors);
    const mergedConnectors = [];
    connectorsByNameMap.forEach((keyConnectors) => {
      const firstItem = keyConnectors[0];
      const isAuthConnector = (firstItem == null ? void 0 : firstItem.id) === ConstantsUtil$3.CONNECTOR_ID.AUTH;
      if (keyConnectors.length > 1 && firstItem) {
        mergedConnectors.push({
          name: firstItem.name,
          imageUrl: firstItem.imageUrl,
          imageId: firstItem.imageId,
          connectors: [...keyConnectors],
          type: isAuthConnector ? "AUTH" : "MULTI_CHAIN",
          // These values are just placeholders, we don't use them in multi-chain connector select screen
          chain: "eip155",
          id: (firstItem == null ? void 0 : firstItem.id) || ""
        });
      } else if (firstItem) {
        mergedConnectors.push(firstItem);
      }
    });
    return mergedConnectors;
  },
  generateConnectorMapByName(connectors) {
    const connectorsByNameMap = /* @__PURE__ */ new Map();
    connectors.forEach((connector) => {
      const { name } = connector;
      const connectorName = ConnectorController.getConnectorName(name);
      if (!connectorName) {
        return;
      }
      const connectorsByName = connectorsByNameMap.get(connectorName) || [];
      const haveSameConnector = connectorsByName.find((c2) => c2.chain === connector.chain);
      if (!haveSameConnector) {
        connectorsByName.push(connector);
      }
      connectorsByNameMap.set(connectorName, connectorsByName);
    });
    return connectorsByNameMap;
  },
  getConnectorName(name) {
    if (!name) {
      return name;
    }
    const nameOverrideMap = {
      "Trust Wallet": "Trust"
    };
    return nameOverrideMap[name] || name;
  },
  getUniqueConnectorsByName(connectors) {
    const uniqueConnectors = [];
    connectors.forEach((c2) => {
      if (!uniqueConnectors.find((uc2) => uc2.chain === c2.chain)) {
        uniqueConnectors.push(c2);
      }
    });
    return uniqueConnectors;
  },
  addConnector(connector) {
    var _a, _b, _c2;
    if (connector.id === ConstantsUtil$3.CONNECTOR_ID.AUTH) {
      const authConnector = connector;
      const optionsState = snapshot(OptionsController.state);
      const themeMode = ThemeController.getSnapshot().themeMode;
      const themeVariables = ThemeController.getSnapshot().themeVariables;
      (_b = (_a = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _a.syncDappData) == null ? void 0 : _b.call(_a, {
        metadata: optionsState.metadata,
        sdkVersion: optionsState.sdkVersion,
        projectId: optionsState.projectId,
        sdkType: optionsState.sdkType
      });
      (_c2 = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _c2.syncTheme({
        themeMode,
        themeVariables,
        w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
      });
      ConnectorController.setConnectors([connector]);
    } else {
      ConnectorController.setConnectors([connector]);
    }
  },
  getAuthConnector(chainNamespace) {
    var _a;
    const activeNamespace = chainNamespace || ChainController.state.activeChain;
    const authConnector = state$c.connectors.find((c2) => c2.id === ConstantsUtil$3.CONNECTOR_ID.AUTH);
    if (!authConnector) {
      return void 0;
    }
    if ((_a = authConnector == null ? void 0 : authConnector.connectors) == null ? void 0 : _a.length) {
      const connector = authConnector.connectors.find((c2) => c2.chain === activeNamespace);
      return connector;
    }
    return authConnector;
  },
  getAnnouncedConnectorRdns() {
    return state$c.connectors.filter((c2) => c2.type === "ANNOUNCED").map((c2) => {
      var _a;
      return (_a = c2.info) == null ? void 0 : _a.rdns;
    });
  },
  getConnectorById(id) {
    return state$c.allConnectors.find((c2) => c2.id === id);
  },
  getConnector(id, rdns) {
    const connectorsByNamespace = state$c.allConnectors.filter((c2) => c2.chain === ChainController.state.activeChain);
    return connectorsByNamespace.find((c2) => {
      var _a;
      return c2.explorerId === id || ((_a = c2.info) == null ? void 0 : _a.rdns) === rdns;
    });
  },
  syncIfAuthConnector(connector) {
    var _a, _b;
    if (connector.id !== "ID_AUTH") {
      return;
    }
    const authConnector = connector;
    const optionsState = snapshot(OptionsController.state);
    const themeMode = ThemeController.getSnapshot().themeMode;
    const themeVariables = ThemeController.getSnapshot().themeVariables;
    (_b = (_a = authConnector == null ? void 0 : authConnector.provider) == null ? void 0 : _a.syncDappData) == null ? void 0 : _b.call(_a, {
      metadata: optionsState.metadata,
      sdkVersion: optionsState.sdkVersion,
      sdkType: optionsState.sdkType,
      projectId: optionsState.projectId
    });
    authConnector.provider.syncTheme({
      themeMode,
      themeVariables,
      w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(namespace) {
    const namespaceConnectors = state$c.allConnectors.filter((connector) => connector.chain === namespace);
    return ConnectorController.mergeMultiChainConnectors(namespaceConnectors);
  },
  selectWalletConnector(wallet) {
    const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
    const namespace = ChainController.state.activeChain;
    MobileWalletUtil.handleMobileDeeplinkRedirect((connector == null ? void 0 : connector.explorerId) || wallet.id, namespace);
    if (connector) {
      RouterController.push("ConnectingExternal", { connector });
    } else {
      RouterController.push("ConnectingWalletConnect", { wallet });
    }
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(namespace) {
    if (namespace) {
      return ConnectorController.getConnectorsByNamespace(namespace);
    }
    return ConnectorController.mergeMultiChainConnectors(state$c.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(namespace) {
    state$c.filterByNamespace = namespace;
    state$c.connectors = ConnectorController.getConnectors(namespace);
    ApiController.setFilterByNamespace(namespace);
  },
  setConnectorId(connectorId, namespace) {
    if (connectorId) {
      state$c.activeConnectorIds = {
        ...state$c.activeConnectorIds,
        [namespace]: connectorId
      };
      StorageUtil.setConnectedConnectorId(namespace, connectorId);
    }
  },
  removeConnectorId(namespace) {
    state$c.activeConnectorIds = {
      ...state$c.activeConnectorIds,
      [namespace]: void 0
    };
    StorageUtil.deleteConnectedConnectorId(namespace);
  },
  getConnectorId(namespace) {
    if (!namespace) {
      return void 0;
    }
    return state$c.activeConnectorIds[namespace];
  },
  isConnected(namespace) {
    if (!namespace) {
      return Object.values(state$c.activeConnectorIds).some((id) => Boolean(id));
    }
    return Boolean(state$c.activeConnectorIds[namespace]);
  },
  resetConnectorIds() {
    state$c.activeConnectorIds = { ...defaultActiveConnectors };
  }
};
const ConnectorController = withErrorBoundary(controller$9);
const DEFAULT_SDK_URL = "https://secure.walletconnect.org/sdk";
(typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_SECURE_SITE_SDK_URL"] : void 0) || DEFAULT_SDK_URL;
(typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_DEFAULT_LOG_LEVEL"] : void 0) || "error";
(typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_SECURE_SITE_SDK_VERSION"] : void 0) || "4";
const W3mFrameRpcConstants = {
  ACCOUNT_TYPES: {
    SMART_ACCOUNT: "smartAccount"
  }
};
const DEFAULT_STATE = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: false,
  autoClose: true
});
const state$b = proxy({
  ...DEFAULT_STATE
});
const controller$8 = {
  state: state$b,
  subscribeKey(key, callback) {
    return subscribeKey(state$b, key, callback);
  },
  showLoading(message, options = {}) {
    this._showMessage({ message, variant: "loading", ...options });
  },
  showSuccess(message) {
    this._showMessage({ message, variant: "success" });
  },
  showSvg(message, svg) {
    this._showMessage({ message, svg });
  },
  showError(message) {
    const errorMessage = CoreHelperUtil.parseError(message);
    this._showMessage({ message: errorMessage, variant: "error" });
  },
  hide() {
    state$b.message = DEFAULT_STATE.message;
    state$b.variant = DEFAULT_STATE.variant;
    state$b.svg = DEFAULT_STATE.svg;
    state$b.open = DEFAULT_STATE.open;
    state$b.autoClose = DEFAULT_STATE.autoClose;
  },
  _showMessage({ message, svg, variant = "success", autoClose = DEFAULT_STATE.autoClose }) {
    if (state$b.open) {
      state$b.open = false;
      setTimeout(() => {
        state$b.message = message;
        state$b.variant = variant;
        state$b.svg = svg;
        state$b.open = true;
        state$b.autoClose = autoClose;
      }, 150);
    } else {
      state$b.message = message;
      state$b.variant = variant;
      state$b.svg = svg;
      state$b.open = true;
      state$b.autoClose = autoClose;
    }
  }
};
const SnackController = controller$8;
const state$a = proxy({
  transactions: [],
  coinbaseTransactions: {},
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: false,
  empty: false,
  next: void 0
});
const controller$7 = {
  state: state$a,
  subscribe(callback) {
    return subscribe(state$a, () => callback(state$a));
  },
  setLastNetworkInView(lastNetworkInView) {
    state$a.lastNetworkInView = lastNetworkInView;
  },
  async fetchTransactions(accountAddress, onramp) {
    var _a, _b;
    if (!accountAddress) {
      throw new Error("Transactions can't be fetched without an accountAddress");
    }
    state$a.loading = true;
    try {
      const response = await BlockchainApiController.fetchTransactions({
        account: accountAddress,
        cursor: state$a.next,
        onramp,
        // Coinbase transaction history state updates require the latest data
        cache: onramp === "coinbase" ? "no-cache" : void 0,
        chainId: (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId
      });
      const nonSpamTransactions = TransactionsController.filterSpamTransactions(response.data);
      const sameChainTransactions = TransactionsController.filterByConnectedChain(nonSpamTransactions);
      const filteredTransactions = [...state$a.transactions, ...sameChainTransactions];
      state$a.loading = false;
      if (onramp === "coinbase") {
        state$a.coinbaseTransactions = TransactionsController.groupTransactionsByYearAndMonth(state$a.coinbaseTransactions, response.data);
      } else {
        state$a.transactions = filteredTransactions;
        state$a.transactionsByYear = TransactionsController.groupTransactionsByYearAndMonth(state$a.transactionsByYear, sameChainTransactions);
      }
      state$a.empty = filteredTransactions.length === 0;
      state$a.next = response.next ? response.next : void 0;
    } catch (error) {
      const activeChainNamespace = ChainController.state.activeChain;
      EventsController.sendEvent({
        type: "track",
        event: "ERROR_FETCH_TRANSACTIONS",
        properties: {
          address: accountAddress,
          projectId: OptionsController.state.projectId,
          cursor: state$a.next,
          isSmartAccount: ((_b = AccountController.state.preferredAccountTypes) == null ? void 0 : _b[activeChainNamespace]) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      SnackController.showError("Failed to fetch transactions");
      state$a.loading = false;
      state$a.empty = true;
      state$a.next = void 0;
    }
  },
  groupTransactionsByYearAndMonth(transactionsMap = {}, transactions = []) {
    const grouped = transactionsMap;
    transactions.forEach((transaction) => {
      const year = new Date(transaction.metadata.minedAt).getFullYear();
      const month = new Date(transaction.metadata.minedAt).getMonth();
      const yearTransactions = grouped[year] ?? {};
      const monthTransactions = yearTransactions[month] ?? [];
      const newMonthTransactions = monthTransactions.filter((tx) => tx.id !== transaction.id);
      grouped[year] = {
        ...yearTransactions,
        [month]: [...newMonthTransactions, transaction].sort((a2, b2) => new Date(b2.metadata.minedAt).getTime() - new Date(a2.metadata.minedAt).getTime())
      };
    });
    return grouped;
  },
  filterSpamTransactions(transactions) {
    return transactions.filter((transaction) => {
      const isAllSpam = transaction.transfers.every((transfer) => {
        var _a;
        return ((_a = transfer.nft_info) == null ? void 0 : _a.flags.is_spam) === true;
      });
      return !isAllSpam;
    });
  },
  filterByConnectedChain(transactions) {
    var _a;
    const chainId = (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId;
    const filteredTransactions = transactions.filter((transaction) => transaction.metadata.chain === chainId);
    return filteredTransactions;
  },
  clearCursor() {
    state$a.next = void 0;
  },
  resetTransactions() {
    state$a.transactions = [];
    state$a.transactionsByYear = {};
    state$a.lastNetworkInView = void 0;
    state$a.loading = false;
    state$a.empty = false;
    state$a.next = void 0;
  }
};
const TransactionsController = withErrorBoundary(controller$7, "API_ERROR");
const state$9 = proxy({
  connections: /* @__PURE__ */ new Map(),
  wcError: false,
  buffering: false,
  status: "disconnected"
});
let wcConnectionPromise;
const controller$6 = {
  state: state$9,
  subscribeKey(key, callback) {
    return subscribeKey(state$9, key, callback);
  },
  _getClient() {
    return state$9._client;
  },
  setClient(client) {
    state$9._client = ref(client);
  },
  async connectWalletConnect() {
    var _a, _b, _c2, _d;
    if (CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari() && CoreHelperUtil.isIos()) {
      if (wcConnectionPromise) {
        await wcConnectionPromise;
        wcConnectionPromise = void 0;
        return;
      }
      if (!CoreHelperUtil.isPairingExpired(state$9 == null ? void 0 : state$9.wcPairingExpiry)) {
        const link = state$9.wcUri;
        state$9.wcUri = link;
        return;
      }
      wcConnectionPromise = (_b = (_a = ConnectionController._getClient()) == null ? void 0 : _a.connectWalletConnect) == null ? void 0 : _b.call(_a).catch(() => void 0);
      ConnectionController.state.status = "connecting";
      await wcConnectionPromise;
      wcConnectionPromise = void 0;
      state$9.wcPairingExpiry = void 0;
      ConnectionController.state.status = "connected";
    } else {
      await ((_d = (_c2 = ConnectionController._getClient()) == null ? void 0 : _c2.connectWalletConnect) == null ? void 0 : _d.call(_c2));
    }
  },
  async connectExternal(options, chain, setChain = true) {
    var _a, _b;
    await ((_b = (_a = ConnectionController._getClient()) == null ? void 0 : _a.connectExternal) == null ? void 0 : _b.call(_a, options));
    if (setChain) {
      ChainController.setActiveNamespace(chain);
    }
  },
  async reconnectExternal(options) {
    var _a, _b;
    await ((_b = (_a = ConnectionController._getClient()) == null ? void 0 : _a.reconnectExternal) == null ? void 0 : _b.call(_a, options));
    const namespace = options.chain || ChainController.state.activeChain;
    if (namespace) {
      ConnectorController.setConnectorId(options.id, namespace);
    }
  },
  async setPreferredAccountType(accountType, namespace) {
    var _a;
    ModalController.setLoading(true, ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector) {
      return;
    }
    AccountController.setPreferredAccountType(accountType, namespace);
    await authConnector.provider.setPreferredAccount(accountType);
    StorageUtil.setPreferredAccountTypes(AccountController.state.preferredAccountTypes ?? { [namespace]: accountType });
    await ConnectionController.reconnectExternal(authConnector);
    ModalController.setLoading(false, ChainController.state.activeChain);
    EventsController.sendEvent({
      type: "track",
      event: "SET_PREFERRED_ACCOUNT_TYPE",
      properties: {
        accountType,
        network: ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId) || ""
      }
    });
  },
  async signMessage(message) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.signMessage(message);
  },
  parseUnits(value, decimals) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.parseUnits(value, decimals);
  },
  formatUnits(value, decimals) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.formatUnits(value, decimals);
  },
  async sendTransaction(args) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.sendTransaction(args);
  },
  async getCapabilities(params) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.getCapabilities(params);
  },
  async grantPermissions(params) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.grantPermissions(params);
  },
  async walletGetAssets(params) {
    var _a;
    return ((_a = ConnectionController._getClient()) == null ? void 0 : _a.walletGetAssets(params)) ?? {};
  },
  async estimateGas(args) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.estimateGas(args);
  },
  async writeContract(args) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.writeContract(args);
  },
  async getEnsAddress(value) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.getEnsAddress(value);
  },
  async getEnsAvatar(value) {
    var _a;
    return (_a = ConnectionController._getClient()) == null ? void 0 : _a.getEnsAvatar(value);
  },
  checkInstalled(ids) {
    var _a, _b;
    return ((_b = (_a = ConnectionController._getClient()) == null ? void 0 : _a.checkInstalled) == null ? void 0 : _b.call(_a, ids)) || false;
  },
  resetWcConnection() {
    state$9.wcUri = void 0;
    state$9.wcPairingExpiry = void 0;
    state$9.wcLinking = void 0;
    state$9.recentWallet = void 0;
    state$9.status = "disconnected";
    TransactionsController.resetTransactions();
    StorageUtil.deleteWalletConnectDeepLink();
  },
  resetUri() {
    state$9.wcUri = void 0;
    state$9.wcPairingExpiry = void 0;
    wcConnectionPromise = void 0;
  },
  finalizeWcConnection() {
    var _a, _b;
    const { wcLinking, recentWallet } = ConnectionController.state;
    if (wcLinking) {
      StorageUtil.setWalletConnectDeepLink(wcLinking);
    }
    if (recentWallet) {
      StorageUtil.setAppKitRecent(recentWallet);
    }
    EventsController.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: wcLinking ? "mobile" : "qrcode",
        name: ((_b = (_a = RouterController.state.data) == null ? void 0 : _a.wallet) == null ? void 0 : _b.name) || "Unknown"
      }
    });
  },
  setWcBasic(wcBasic) {
    state$9.wcBasic = wcBasic;
  },
  setUri(uri) {
    state$9.wcUri = uri;
    state$9.wcPairingExpiry = CoreHelperUtil.getPairingExpiry();
  },
  setWcLinking(wcLinking) {
    state$9.wcLinking = wcLinking;
  },
  setWcError(wcError) {
    state$9.wcError = wcError;
    state$9.buffering = false;
  },
  setRecentWallet(wallet) {
    state$9.recentWallet = wallet;
  },
  setBuffering(buffering) {
    state$9.buffering = buffering;
  },
  setStatus(status) {
    state$9.status = status;
  },
  async disconnect(namespace) {
    var _a;
    try {
      await ((_a = ConnectionController._getClient()) == null ? void 0 : _a.disconnect(namespace));
    } catch (error) {
      throw new AppKitError("Failed to disconnect", "INTERNAL_SDK_ERROR", error);
    }
  },
  setConnections(connections, chainNamespace) {
    state$9.connections.set(chainNamespace, connections);
  },
  switchAccount({ connection, address, namespace }) {
    const connectedConnectorId = ConnectorController.state.activeConnectorIds[namespace];
    const isConnectorConnected = connectedConnectorId === connection.connectorId;
    if (isConnectorConnected) {
      const currentNetwork = ChainController.state.activeCaipNetwork;
      if (currentNetwork) {
        const caipAddress = `${namespace}:${currentNetwork.id}:${address}`;
        AccountController.setCaipAddress(caipAddress, namespace);
      } else {
        console.warn(`No current network found for namespace "${namespace}"`);
      }
    } else {
      const connector = ConnectorController.getConnector(connection.connectorId);
      if (connector) {
        ConnectionController.connectExternal(connector, namespace);
      } else {
        console.warn(`No connector found for namespace "${namespace}"`);
      }
    }
  }
};
const ConnectionController = withErrorBoundary(controller$6);
const state$8 = proxy({
  loading: false,
  open: false,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: false
});
const PublicStateController = {
  state: state$8,
  subscribe(callback) {
    return subscribe(state$8, () => callback(state$8));
  },
  subscribeOpen(callback) {
    return subscribeKey(state$8, "open", callback);
  },
  set(newState) {
    Object.assign(state$8, { ...state$8, ...newState });
  }
};
const ERC7811Utils = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(asset, chainId) {
    const metadata = {
      name: asset.metadata["name"] || "",
      symbol: asset.metadata["symbol"] || "",
      decimals: asset.metadata["decimals"] || 0,
      value: asset.metadata["value"] || 0,
      price: asset.metadata["price"] || 0,
      iconUrl: asset.metadata["iconUrl"] || ""
    };
    return {
      name: metadata.name,
      symbol: metadata.symbol,
      chainId,
      address: asset.address === "native" ? void 0 : this.convertAddressToCAIP10Address(asset.address, chainId),
      value: metadata.value,
      price: metadata.price,
      quantity: {
        decimals: metadata.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: asset.balance,
          decimals: metadata.decimals
        })
      },
      iconUrl: metadata.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex, decimals }) {
    return formatUnits(BigInt(hex), decimals);
  },
  /**
   * Converts an address to a CAIP-10 address
   * @param address - Address to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns CAIP-10 address
   */
  convertAddressToCAIP10Address(address, chainId) {
    return `${chainId}:${address}`;
  },
  /**
   *  Creates a CAIP-2 Chain ID from a chain ID and namespace
   * @param chainId  - Chain ID in hex format
   * @param namespace  - Chain namespace
   * @returns
   */
  createCAIP2ChainId(chainId, namespace) {
    return `${namespace}:${parseInt(chainId, 16)}`;
  },
  /**
   * Gets the chain ID in hex format from a CAIP-2 Chain ID
   * @param caip2ChainId - CAIP-2 Chain ID
   * @returns Chain ID in hex format
   */
  getChainIdHexFromCAIP2ChainId(caip2ChainId) {
    const parts = caip2ChainId.split(":");
    if (parts.length < 2 || !parts[1]) {
      return "0x0";
    }
    const chainPart = parts[1];
    const parsed = parseInt(chainPart, 10);
    return isNaN(parsed) ? "0x0" : `0x${parsed.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(response) {
    if (typeof response !== "object" || response === null) {
      return false;
    }
    return Object.values(response).every((value) => Array.isArray(value) && value.every((asset) => this.isValidAsset(asset)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(asset) {
    return typeof asset === "object" && asset !== null && typeof asset.address === "string" && typeof asset.balance === "string" && (asset.type === "ERC20" || asset.type === "NATIVE") && typeof asset.metadata === "object" && asset.metadata !== null && typeof asset.metadata["name"] === "string" && typeof asset.metadata["symbol"] === "string" && typeof asset.metadata["decimals"] === "number" && typeof asset.metadata["price"] === "number" && typeof asset.metadata["iconUrl"] === "string";
  }
};
const SendApiUtil = {
  async getMyTokensWithBalance(forceUpdate) {
    const address = AccountController.state.address;
    const caipNetwork = ChainController.state.activeCaipNetwork;
    if (!address || !caipNetwork) {
      return [];
    }
    if (caipNetwork.chainNamespace === "eip155") {
      const eip155Balances = await this.getEIP155Balances(address, caipNetwork);
      if (eip155Balances) {
        return this.filterLowQualityTokens(eip155Balances);
      }
    }
    const response = await BlockchainApiController.getBalance(address, caipNetwork.caipNetworkId, forceUpdate);
    return this.filterLowQualityTokens(response.balances);
  },
  async getEIP155Balances(address, caipNetwork) {
    var _a, _b;
    try {
      const chainIdHex = ERC7811Utils.getChainIdHexFromCAIP2ChainId(caipNetwork.caipNetworkId);
      const walletCapabilities = await ConnectionController.getCapabilities(address);
      if (!((_b = (_a = walletCapabilities == null ? void 0 : walletCapabilities[chainIdHex]) == null ? void 0 : _a["assetDiscovery"]) == null ? void 0 : _b.supported)) {
        return null;
      }
      const walletGetAssetsResponse = await ConnectionController.walletGetAssets({
        account: address,
        chainFilter: [chainIdHex]
      });
      if (!ERC7811Utils.isWalletGetAssetsResponse(walletGetAssetsResponse)) {
        return null;
      }
      const assets = walletGetAssetsResponse[chainIdHex] || [];
      return assets.map((asset) => ERC7811Utils.createBalance(asset, caipNetwork.caipNetworkId));
    } catch (error) {
      return null;
    }
  },
  /**
   * The 1Inch API includes many low-quality tokens in the balance response,
   * which appear inconsistently. This filter prevents them from being displayed.
   */
  filterLowQualityTokens(balances) {
    return balances.filter((balance) => balance.quantity.decimals !== "0");
  },
  mapBalancesToSwapTokens(balances) {
    return (balances == null ? void 0 : balances.map((token) => ({
      ...token,
      address: (token == null ? void 0 : token.address) ? token.address : ChainController.getActiveNetworkTokenAddress(),
      decimals: parseInt(token.quantity.decimals, 10),
      logoUri: token.iconUrl,
      eip2612: false
    }))) || [];
  }
};
const state$7 = proxy({
  tokenBalances: [],
  loading: false
});
const controller$5 = {
  state: state$7,
  subscribe(callback) {
    return subscribe(state$7, () => callback(state$7));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$7, key, callback);
  },
  setToken(token) {
    if (token) {
      state$7.token = ref(token);
    }
  },
  setTokenAmount(sendTokenAmount) {
    state$7.sendTokenAmount = sendTokenAmount;
  },
  setReceiverAddress(receiverAddress) {
    state$7.receiverAddress = receiverAddress;
  },
  setReceiverProfileImageUrl(receiverProfileImageUrl) {
    state$7.receiverProfileImageUrl = receiverProfileImageUrl;
  },
  setReceiverProfileName(receiverProfileName) {
    state$7.receiverProfileName = receiverProfileName;
  },
  setNetworkBalanceInUsd(networkBalanceInUSD) {
    state$7.networkBalanceInUSD = networkBalanceInUSD;
  },
  setLoading(loading) {
    state$7.loading = loading;
  },
  async sendToken() {
    var _a;
    try {
      SendController.setLoading(true);
      switch ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.chainNamespace) {
        case "eip155":
          await SendController.sendEvmToken();
          return;
        case "solana":
          await SendController.sendSolanaToken();
          return;
        default:
          throw new Error("Unsupported chain");
      }
    } finally {
      SendController.setLoading(false);
    }
  },
  async sendEvmToken() {
    var _a, _b, _c2, _d;
    const activeChainNamespace = ChainController.state.activeChain;
    const activeAccountType = (_a = AccountController.state.preferredAccountTypes) == null ? void 0 : _a[activeChainNamespace];
    if (!SendController.state.sendTokenAmount || !SendController.state.receiverAddress) {
      throw new Error("An amount and receiver address are required");
    }
    if (!SendController.state.token) {
      throw new Error("A token is required");
    }
    if ((_b = SendController.state.token) == null ? void 0 : _b.address) {
      EventsController.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: activeAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: SendController.state.token.address,
          amount: SendController.state.sendTokenAmount,
          network: ((_c2 = ChainController.state.activeCaipNetwork) == null ? void 0 : _c2.caipNetworkId) || ""
        }
      });
      await SendController.sendERC20Token({
        receiverAddress: SendController.state.receiverAddress,
        tokenAddress: SendController.state.token.address,
        sendTokenAmount: SendController.state.sendTokenAmount,
        decimals: SendController.state.token.quantity.decimals
      });
    } else {
      EventsController.sendEvent({
        type: "track",
        event: "SEND_INITIATED",
        properties: {
          isSmartAccount: activeAccountType === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          token: SendController.state.token.symbol || "",
          amount: SendController.state.sendTokenAmount,
          network: ((_d = ChainController.state.activeCaipNetwork) == null ? void 0 : _d.caipNetworkId) || ""
        }
      });
      await SendController.sendNativeToken({
        receiverAddress: SendController.state.receiverAddress,
        sendTokenAmount: SendController.state.sendTokenAmount,
        decimals: SendController.state.token.quantity.decimals
      });
    }
  },
  async fetchTokenBalance(onError) {
    var _a, _b;
    state$7.loading = true;
    const chainId = (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId;
    const chain = (_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.chainNamespace;
    const caipAddress = ChainController.state.activeCaipAddress;
    const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (state$7.lastRetry && !CoreHelperUtil.isAllowedRetry(state$7.lastRetry, 30 * ConstantsUtil$2.ONE_SEC_MS)) {
      state$7.loading = false;
      return [];
    }
    try {
      if (address && chainId && chain) {
        const balances = await SendApiUtil.getMyTokensWithBalance();
        state$7.tokenBalances = balances;
        state$7.lastRetry = void 0;
        return balances;
      }
    } catch (error) {
      state$7.lastRetry = Date.now();
      onError == null ? void 0 : onError(error);
      SnackController.showError("Token Balance Unavailable");
    } finally {
      state$7.loading = false;
    }
    return [];
  },
  fetchNetworkBalance() {
    if (state$7.tokenBalances.length === 0) {
      return;
    }
    const networkTokenBalances = SendApiUtil.mapBalancesToSwapTokens(state$7.tokenBalances);
    if (!networkTokenBalances) {
      return;
    }
    const networkToken = networkTokenBalances.find((token) => token.address === ChainController.getActiveNetworkTokenAddress());
    if (!networkToken) {
      return;
    }
    state$7.networkBalanceInUSD = networkToken ? NumberUtil.multiply(networkToken.quantity.numeric, networkToken.price).toString() : "0";
  },
  async sendNativeToken(params) {
    var _a, _b, _c2, _d;
    RouterController.pushTransactionStack({});
    const to2 = params.receiverAddress;
    const address = AccountController.state.address;
    const value = ConnectionController.parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
    const data = "0x";
    await ConnectionController.sendTransaction({
      chainNamespace: "eip155",
      to: to2,
      address,
      data,
      value: value ?? BigInt(0)
    });
    EventsController.sendEvent({
      type: "track",
      event: "SEND_SUCCESS",
      properties: {
        isSmartAccount: ((_a = AccountController.state.preferredAccountTypes) == null ? void 0 : _a["eip155"]) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: ((_b = SendController.state.token) == null ? void 0 : _b.symbol) || "",
        amount: params.sendTokenAmount,
        network: ((_c2 = ChainController.state.activeCaipNetwork) == null ? void 0 : _c2.caipNetworkId) || ""
      }
    });
    (_d = ConnectionController._getClient()) == null ? void 0 : _d.updateBalance("eip155");
    SendController.resetSend();
  },
  async sendERC20Token(params) {
    RouterController.pushTransactionStack({
      onSuccess() {
        RouterController.replace("Account");
      }
    });
    const amount = ConnectionController.parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
    if (AccountController.state.address && params.sendTokenAmount && params.receiverAddress && params.tokenAddress) {
      const tokenAddress = CoreHelperUtil.getPlainAddress(params.tokenAddress);
      await ConnectionController.writeContract({
        fromAddress: AccountController.state.address,
        tokenAddress,
        args: [params.receiverAddress, amount ?? BigInt(0)],
        method: "transfer",
        abi: ContractUtil.getERC20Abi(tokenAddress),
        chainNamespace: "eip155"
      });
      SendController.resetSend();
    }
  },
  async sendSolanaToken() {
    var _a;
    if (!SendController.state.sendTokenAmount || !SendController.state.receiverAddress) {
      throw new Error("An amount and receiver address are required");
    }
    RouterController.pushTransactionStack({
      onSuccess() {
        RouterController.replace("Account");
      }
    });
    await ConnectionController.sendTransaction({
      chainNamespace: "solana",
      to: SendController.state.receiverAddress,
      value: SendController.state.sendTokenAmount
    });
    (_a = ConnectionController._getClient()) == null ? void 0 : _a.updateBalance("solana");
    SendController.resetSend();
  },
  resetSend() {
    state$7.token = void 0;
    state$7.sendTokenAmount = void 0;
    state$7.receiverAddress = void 0;
    state$7.receiverProfileImageUrl = void 0;
    state$7.receiverProfileName = void 0;
    state$7.loading = false;
    state$7.tokenBalances = [];
  }
};
const SendController = withErrorBoundary(controller$5);
const accountState = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: false,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: [],
  user: void 0
};
const networkState = {
  caipNetwork: void 0,
  supportsAllNetworks: true,
  smartAccountEnabledNetworks: []
};
const state$6 = proxy({
  chains: proxyMap(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: false,
  universalAdapter: {
    networkControllerClient: void 0,
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: false
});
const controller$4 = {
  state: state$6,
  subscribe(callback) {
    return subscribe(state$6, () => {
      callback(state$6);
    });
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$6, key, callback);
  },
  subscribeChainProp(property, callback, chain) {
    let prev = void 0;
    return subscribe(state$6.chains, () => {
      var _a;
      const activeChain = chain || state$6.activeChain;
      if (activeChain) {
        const nextValue = (_a = state$6.chains.get(activeChain)) == null ? void 0 : _a[property];
        if (prev !== nextValue) {
          prev = nextValue;
          callback(nextValue);
        }
      }
    });
  },
  initialize(adapters, caipNetworks, clients) {
    const { chainId: activeChainId, namespace: activeNamespace } = StorageUtil.getActiveNetworkProps();
    const activeCaipNetwork = caipNetworks == null ? void 0 : caipNetworks.find((network) => network.id.toString() === (activeChainId == null ? void 0 : activeChainId.toString()));
    const defaultAdapter = adapters.find((adapter) => (adapter == null ? void 0 : adapter.namespace) === activeNamespace);
    const adapterToActivate = defaultAdapter || (adapters == null ? void 0 : adapters[0]);
    const namespacesFromAdapters = adapters.map((a2) => a2.namespace).filter((n) => n !== void 0);
    const namespaces = OptionsController.state.enableEmbedded ? /* @__PURE__ */ new Set([...namespacesFromAdapters]) : /* @__PURE__ */ new Set([...(caipNetworks == null ? void 0 : caipNetworks.map((network) => network.chainNamespace)) ?? []]);
    if ((adapters == null ? void 0 : adapters.length) === 0 || !adapterToActivate) {
      state$6.noAdapters = true;
    }
    if (!state$6.noAdapters) {
      state$6.activeChain = adapterToActivate == null ? void 0 : adapterToActivate.namespace;
      state$6.activeCaipNetwork = activeCaipNetwork;
      ChainController.setChainNetworkData(adapterToActivate == null ? void 0 : adapterToActivate.namespace, {
        caipNetwork: activeCaipNetwork
      });
      if (state$6.activeChain) {
        PublicStateController.set({ activeChain: adapterToActivate == null ? void 0 : adapterToActivate.namespace });
      }
    }
    namespaces.forEach((namespace) => {
      const namespaceNetworks = caipNetworks == null ? void 0 : caipNetworks.filter((network) => network.chainNamespace === namespace);
      ChainController.state.chains.set(namespace, {
        namespace,
        networkState: proxy({
          ...networkState,
          caipNetwork: namespaceNetworks == null ? void 0 : namespaceNetworks[0]
        }),
        accountState: proxy(accountState),
        caipNetworks: namespaceNetworks ?? [],
        ...clients
      });
      ChainController.setRequestedCaipNetworks(namespaceNetworks ?? [], namespace);
    });
  },
  removeAdapter(namespace) {
    var _a, _b;
    if (state$6.activeChain === namespace) {
      const nextAdapter = Array.from(state$6.chains.entries()).find(([chainNamespace]) => chainNamespace !== namespace);
      if (nextAdapter) {
        const caipNetwork = (_b = (_a = nextAdapter[1]) == null ? void 0 : _a.caipNetworks) == null ? void 0 : _b[0];
        if (caipNetwork) {
          ChainController.setActiveCaipNetwork(caipNetwork);
        }
      }
    }
    state$6.chains.delete(namespace);
  },
  addAdapter(adapter, { networkControllerClient, connectionControllerClient }, caipNetworks) {
    state$6.chains.set(adapter.namespace, {
      namespace: adapter.namespace,
      networkState: {
        ...networkState,
        caipNetwork: caipNetworks[0]
      },
      accountState,
      caipNetworks,
      connectionControllerClient,
      networkControllerClient
    });
    ChainController.setRequestedCaipNetworks((caipNetworks == null ? void 0 : caipNetworks.filter((caipNetwork) => caipNetwork.chainNamespace === adapter.namespace)) ?? [], adapter.namespace);
  },
  addNetwork(network) {
    var _a;
    const chainAdapter = state$6.chains.get(network.chainNamespace);
    if (chainAdapter) {
      const newNetworks = [...chainAdapter.caipNetworks || []];
      if (!((_a = chainAdapter.caipNetworks) == null ? void 0 : _a.find((caipNetwork) => caipNetwork.id === network.id))) {
        newNetworks.push(network);
      }
      state$6.chains.set(network.chainNamespace, { ...chainAdapter, caipNetworks: newNetworks });
      ChainController.setRequestedCaipNetworks(newNetworks, network.chainNamespace);
      ConnectorController.filterByNamespace(network.chainNamespace, true);
    }
  },
  removeNetwork(namespace, networkId) {
    var _a, _b, _c2;
    const chainAdapter = state$6.chains.get(namespace);
    if (chainAdapter) {
      const isActiveNetwork = ((_a = state$6.activeCaipNetwork) == null ? void 0 : _a.id) === networkId;
      const newCaipNetworksOfAdapter = [
        ...((_b = chainAdapter.caipNetworks) == null ? void 0 : _b.filter((network) => network.id !== networkId)) || []
      ];
      if (isActiveNetwork && ((_c2 = chainAdapter == null ? void 0 : chainAdapter.caipNetworks) == null ? void 0 : _c2[0])) {
        ChainController.setActiveCaipNetwork(chainAdapter.caipNetworks[0]);
      }
      state$6.chains.set(namespace, { ...chainAdapter, caipNetworks: newCaipNetworksOfAdapter });
      ChainController.setRequestedCaipNetworks(newCaipNetworksOfAdapter || [], namespace);
      if (newCaipNetworksOfAdapter.length === 0) {
        ConnectorController.filterByNamespace(namespace, false);
      }
    }
  },
  setAdapterNetworkState(chain, props) {
    const chainAdapter = state$6.chains.get(chain);
    if (chainAdapter) {
      chainAdapter.networkState = {
        ...chainAdapter.networkState || networkState,
        ...props
      };
      state$6.chains.set(chain, chainAdapter);
    }
  },
  setChainAccountData(chain, accountProps, _unknown = true) {
    if (!chain) {
      throw new Error("Chain is required to update chain account data");
    }
    const chainAdapter = state$6.chains.get(chain);
    if (chainAdapter) {
      const newAccountState = { ...chainAdapter.accountState || accountState, ...accountProps };
      state$6.chains.set(chain, { ...chainAdapter, accountState: newAccountState });
      if (state$6.chains.size === 1 || state$6.activeChain === chain) {
        if (accountProps.caipAddress) {
          state$6.activeCaipAddress = accountProps.caipAddress;
        }
        AccountController.replaceState(newAccountState);
      }
    }
  },
  setChainNetworkData(chain, networkProps) {
    if (!chain) {
      return;
    }
    const chainAdapter = state$6.chains.get(chain);
    if (chainAdapter) {
      const newNetworkState = { ...chainAdapter.networkState || networkState, ...networkProps };
      state$6.chains.set(chain, { ...chainAdapter, networkState: newNetworkState });
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(prop, value, chain, replaceState = true) {
    ChainController.setChainAccountData(chain, { [prop]: value }, replaceState);
    if (prop === "status" && value === "disconnected" && chain) {
      ConnectorController.removeConnectorId(chain);
    }
  },
  setActiveNamespace(chain) {
    var _a, _b;
    state$6.activeChain = chain;
    const newAdapter = chain ? state$6.chains.get(chain) : void 0;
    const caipNetwork = (_a = newAdapter == null ? void 0 : newAdapter.networkState) == null ? void 0 : _a.caipNetwork;
    if ((caipNetwork == null ? void 0 : caipNetwork.id) && chain) {
      state$6.activeCaipAddress = (_b = newAdapter == null ? void 0 : newAdapter.accountState) == null ? void 0 : _b.caipAddress;
      state$6.activeCaipNetwork = caipNetwork;
      ChainController.setChainNetworkData(chain, { caipNetwork });
      StorageUtil.setActiveCaipNetworkId(caipNetwork == null ? void 0 : caipNetwork.caipNetworkId);
      PublicStateController.set({
        activeChain: chain,
        selectedNetworkId: caipNetwork == null ? void 0 : caipNetwork.caipNetworkId
      });
    }
  },
  setActiveCaipNetwork(caipNetwork) {
    var _a, _b, _c2;
    if (!caipNetwork) {
      return;
    }
    if (state$6.activeChain !== caipNetwork.chainNamespace) {
      ChainController.setIsSwitchingNamespace(true);
    }
    const newAdapter = state$6.chains.get(caipNetwork.chainNamespace);
    state$6.activeChain = caipNetwork.chainNamespace;
    state$6.activeCaipNetwork = caipNetwork;
    ChainController.setChainNetworkData(caipNetwork.chainNamespace, { caipNetwork });
    if ((_a = newAdapter == null ? void 0 : newAdapter.accountState) == null ? void 0 : _a.address) {
      state$6.activeCaipAddress = `${caipNetwork.chainNamespace}:${caipNetwork.id}:${(_b = newAdapter == null ? void 0 : newAdapter.accountState) == null ? void 0 : _b.address}`;
    } else {
      state$6.activeCaipAddress = void 0;
    }
    ChainController.setAccountProp("caipAddress", state$6.activeCaipAddress, caipNetwork.chainNamespace);
    if (newAdapter) {
      AccountController.replaceState(newAdapter.accountState);
    }
    SendController.resetSend();
    PublicStateController.set({
      activeChain: state$6.activeChain,
      selectedNetworkId: (_c2 = state$6.activeCaipNetwork) == null ? void 0 : _c2.caipNetworkId
    });
    StorageUtil.setActiveCaipNetworkId(caipNetwork.caipNetworkId);
    const isSupported = ChainController.checkIfSupportedNetwork(caipNetwork.chainNamespace);
    if (!isSupported && OptionsController.state.enableNetworkSwitch && !OptionsController.state.allowUnsupportedChain && !ConnectionController.state.wcBasic) {
      ChainController.showUnsupportedChainUI();
    }
  },
  addCaipNetwork(caipNetwork) {
    var _a;
    if (!caipNetwork) {
      return;
    }
    const chain = state$6.chains.get(caipNetwork.chainNamespace);
    if (chain) {
      (_a = chain == null ? void 0 : chain.caipNetworks) == null ? void 0 : _a.push(caipNetwork);
    }
  },
  async switchActiveNamespace(namespace) {
    var _a;
    if (!namespace) {
      return;
    }
    const isDifferentChain = namespace !== ChainController.state.activeChain;
    const caipNetworkOfNamespace = (_a = ChainController.getNetworkData(namespace)) == null ? void 0 : _a.caipNetwork;
    const firstNetworkWithChain = ChainController.getCaipNetworkByNamespace(namespace, caipNetworkOfNamespace == null ? void 0 : caipNetworkOfNamespace.id);
    if (isDifferentChain && firstNetworkWithChain) {
      await ChainController.switchActiveNetwork(firstNetworkWithChain);
    }
  },
  async switchActiveNetwork(network) {
    var _a;
    const activeAdapter = ChainController.state.chains.get(ChainController.state.activeChain);
    const unsupportedNetwork = !((_a = activeAdapter == null ? void 0 : activeAdapter.caipNetworks) == null ? void 0 : _a.some((caipNetwork) => {
      var _a2;
      return caipNetwork.id === ((_a2 = state$6.activeCaipNetwork) == null ? void 0 : _a2.id);
    }));
    const networkControllerClient = ChainController.getNetworkControllerClient(network.chainNamespace);
    if (networkControllerClient) {
      try {
        await networkControllerClient.switchCaipNetwork(network);
        if (unsupportedNetwork) {
          ModalController.close();
        }
      } catch (error) {
        RouterController.goBack();
      }
      EventsController.sendEvent({
        type: "track",
        event: "SWITCH_NETWORK",
        properties: { network: network.caipNetworkId }
      });
    }
  },
  getNetworkControllerClient(chainNamespace) {
    const chain = chainNamespace || state$6.activeChain;
    const chainAdapter = state$6.chains.get(chain);
    if (!chainAdapter) {
      throw new Error("Chain adapter not found");
    }
    if (!chainAdapter.networkControllerClient) {
      throw new Error("NetworkController client not set");
    }
    return chainAdapter.networkControllerClient;
  },
  getConnectionControllerClient(_chain) {
    const chain = _chain || state$6.activeChain;
    if (!chain) {
      throw new Error("Chain is required to get connection controller client");
    }
    const chainAdapter = state$6.chains.get(chain);
    if (!(chainAdapter == null ? void 0 : chainAdapter.connectionControllerClient)) {
      throw new Error("ConnectionController client not set");
    }
    return chainAdapter.connectionControllerClient;
  },
  getAccountProp(key, _chain) {
    var _a;
    let chain = state$6.activeChain;
    if (_chain) {
      chain = _chain;
    }
    if (!chain) {
      return void 0;
    }
    const chainAccountState = (_a = state$6.chains.get(chain)) == null ? void 0 : _a.accountState;
    if (!chainAccountState) {
      return void 0;
    }
    return chainAccountState[key];
  },
  getNetworkProp(key, namespace) {
    var _a;
    const chainNetworkState = (_a = state$6.chains.get(namespace)) == null ? void 0 : _a.networkState;
    if (!chainNetworkState) {
      return void 0;
    }
    return chainNetworkState[key];
  },
  getRequestedCaipNetworks(chainToFilter) {
    const adapter = state$6.chains.get(chainToFilter);
    const { approvedCaipNetworkIds = [], requestedCaipNetworks = [] } = (adapter == null ? void 0 : adapter.networkState) || {};
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    return sortedNetworks;
  },
  getAllRequestedCaipNetworks() {
    const requestedCaipNetworks = [];
    state$6.chains.forEach((chainAdapter) => {
      const caipNetworks = ChainController.getRequestedCaipNetworks(chainAdapter.namespace);
      requestedCaipNetworks.push(...caipNetworks);
    });
    return requestedCaipNetworks;
  },
  setRequestedCaipNetworks(caipNetworks, chain) {
    ChainController.setAdapterNetworkState(chain, { requestedCaipNetworks: caipNetworks });
    const allRequestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const namespaces = allRequestedCaipNetworks.map((network) => network.chainNamespace);
    const uniqueNamespaces = Array.from(new Set(namespaces));
    ConnectorController.filterByNamespaces(uniqueNamespaces);
  },
  getAllApprovedCaipNetworkIds() {
    const approvedCaipNetworkIds = [];
    state$6.chains.forEach((chainAdapter) => {
      const approvedIds = ChainController.getApprovedCaipNetworkIds(chainAdapter.namespace);
      approvedCaipNetworkIds.push(...approvedIds);
    });
    return approvedCaipNetworkIds;
  },
  getActiveCaipNetwork() {
    return state$6.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return state$6.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(namespace) {
    var _a;
    const adapter = state$6.chains.get(namespace);
    const approvedCaipNetworkIds = ((_a = adapter == null ? void 0 : adapter.networkState) == null ? void 0 : _a.approvedCaipNetworkIds) || [];
    return approvedCaipNetworkIds;
  },
  async setApprovedCaipNetworksData(namespace) {
    const networkControllerClient = ChainController.getNetworkControllerClient();
    const data = await (networkControllerClient == null ? void 0 : networkControllerClient.getApprovedCaipNetworksData());
    ChainController.setAdapterNetworkState(namespace, {
      approvedCaipNetworkIds: data == null ? void 0 : data.approvedCaipNetworkIds,
      supportsAllNetworks: data == null ? void 0 : data.supportsAllNetworks
    });
  },
  checkIfSupportedNetwork(namespace, caipNetwork) {
    const activeCaipNetwork = caipNetwork || state$6.activeCaipNetwork;
    const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(namespace);
    if (!requestedCaipNetworks.length) {
      return true;
    }
    return requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.some((network) => network.id === (activeCaipNetwork == null ? void 0 : activeCaipNetwork.id));
  },
  checkIfSupportedChainId(chainId) {
    if (!state$6.activeChain) {
      return true;
    }
    const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(state$6.activeChain);
    return requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.some((network) => network.id === chainId);
  },
  // Smart Account Network Handlers
  setSmartAccountEnabledNetworks(smartAccountEnabledNetworks, chain) {
    ChainController.setAdapterNetworkState(chain, { smartAccountEnabledNetworks });
  },
  checkIfSmartAccountEnabled() {
    var _a;
    const networkId = NetworkUtil$1.caipNetworkIdToNumber((_a = state$6.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    const activeChain = state$6.activeChain;
    if (!activeChain || !networkId) {
      return false;
    }
    const smartAccountEnabledNetworks = ChainController.getNetworkProp("smartAccountEnabledNetworks", activeChain);
    return Boolean(smartAccountEnabledNetworks == null ? void 0 : smartAccountEnabledNetworks.includes(Number(networkId)));
  },
  getActiveNetworkTokenAddress() {
    var _a, _b;
    const namespace = ((_a = state$6.activeCaipNetwork) == null ? void 0 : _a.chainNamespace) || "eip155";
    const chainId = ((_b = state$6.activeCaipNetwork) == null ? void 0 : _b.id) || 1;
    const address = ConstantsUtil$2.NATIVE_TOKEN_ADDRESS[namespace];
    return `${namespace}:${chainId}:${address}`;
  },
  showUnsupportedChainUI() {
    ModalController.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const activeCaipNetwork = state$6.activeCaipNetwork;
    return Boolean((activeCaipNetwork == null ? void 0 : activeCaipNetwork.chainNamespace) && ConstantsUtil$2.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(activeCaipNetwork.chainNamespace));
  },
  resetNetwork(namespace) {
    ChainController.setAdapterNetworkState(namespace, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: true,
      smartAccountEnabledNetworks: []
    });
  },
  resetAccount(chain) {
    const chainToWrite = chain;
    if (!chainToWrite) {
      throw new Error("Chain is required to set account prop");
    }
    state$6.activeCaipAddress = void 0;
    ChainController.setChainAccountData(chainToWrite, {
      smartAccountDeployed: false,
      currentTab: 0,
      caipAddress: void 0,
      address: void 0,
      balance: void 0,
      balanceSymbol: void 0,
      profileName: void 0,
      profileImage: void 0,
      addressExplorerUrl: void 0,
      tokenBalance: [],
      connectedWalletInfo: void 0,
      preferredAccountTypes: void 0,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      allAccounts: [],
      user: void 0,
      status: "disconnected"
    });
    ConnectorController.removeConnectorId(chainToWrite);
  },
  setIsSwitchingNamespace(isSwitchingNamespace) {
    state$6.isSwitchingNamespace = isSwitchingNamespace;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    var _a, _b;
    const availableChains = [];
    let firstCaipNetwork = void 0;
    state$6.chains.forEach((chain) => {
      if (ConstantsUtil$3.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((ns2) => ns2 === chain.namespace)) {
        if (chain.namespace) {
          availableChains.push(chain.namespace);
        }
      }
    });
    if (availableChains.length > 0) {
      const firstAvailableChain = availableChains[0];
      firstCaipNetwork = firstAvailableChain ? (_b = (_a = state$6.chains.get(firstAvailableChain)) == null ? void 0 : _a.caipNetworks) == null ? void 0 : _b[0] : void 0;
      return firstCaipNetwork;
    }
    return void 0;
  },
  getAccountData(chainNamespace) {
    var _a;
    if (!chainNamespace) {
      return AccountController.state;
    }
    return (_a = ChainController.state.chains.get(chainNamespace)) == null ? void 0 : _a.accountState;
  },
  getNetworkData(chainNamespace) {
    var _a;
    const namespace = chainNamespace || state$6.activeChain;
    if (!namespace) {
      return void 0;
    }
    return (_a = ChainController.state.chains.get(namespace)) == null ? void 0 : _a.networkState;
  },
  getCaipNetworkByNamespace(chainNamespace, chainId) {
    var _a, _b, _c2;
    if (!chainNamespace) {
      return void 0;
    }
    const chain = ChainController.state.chains.get(chainNamespace);
    const byChainId = (_a = chain == null ? void 0 : chain.caipNetworks) == null ? void 0 : _a.find((network) => network.id === chainId);
    if (byChainId) {
      return byChainId;
    }
    return ((_b = chain == null ? void 0 : chain.networkState) == null ? void 0 : _b.caipNetwork) || ((_c2 = chain == null ? void 0 : chain.caipNetworks) == null ? void 0 : _c2[0]);
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const namespace = ConnectorController.state.filterByNamespace;
    const chains = namespace ? [state$6.chains.get(namespace)] : Array.from(state$6.chains.values());
    return chains.flatMap((chain) => (chain == null ? void 0 : chain.caipNetworks) || []).map((caipNetwork) => caipNetwork.caipNetworkId);
  },
  getCaipNetworks(namespace) {
    if (namespace) {
      return ChainController.getRequestedCaipNetworks(namespace);
    }
    return ChainController.getAllRequestedCaipNetworks();
  }
};
const ChainController = withErrorBoundary(controller$4);
const DEFAULT_OPTIONS = {
  purchaseCurrencies: [
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "USD Coin",
      symbol: "USDC",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    },
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "Ether",
      symbol: "ETH",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    }
  ],
  paymentCurrencies: [
    {
      id: "USD",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    },
    {
      id: "EUR",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    }
  ]
};
const baseUrl = CoreHelperUtil.getBlockchainApiUrl();
const state$5 = proxy({
  clientId: null,
  api: new FetchUtil({ baseUrl, clientId: null }),
  supportedChains: { http: [], ws: [] }
});
const BlockchainApiController = {
  state: state$5,
  async get(request) {
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const projectId = OptionsController.state.projectId;
    const params = {
      ...request.params || {},
      st: st2,
      sv,
      projectId
    };
    return state$5.api.get({
      ...request,
      params
    });
  },
  getSdkProperties() {
    const { sdkType, sdkVersion } = OptionsController.state;
    return {
      st: sdkType || "unknown",
      sv: sdkVersion || "unknown"
    };
  },
  async isNetworkSupported(networkId) {
    if (!networkId) {
      return false;
    }
    try {
      if (!state$5.supportedChains.http.length) {
        await BlockchainApiController.getSupportedNetworks();
      }
    } catch (e) {
      return false;
    }
    return state$5.supportedChains.http.includes(networkId);
  },
  async getSupportedNetworks() {
    try {
      const supportedChains = await BlockchainApiController.get({
        path: "v1/supported-chains"
      });
      state$5.supportedChains = supportedChains;
      return supportedChains;
    } catch {
      return state$5.supportedChains;
    }
  },
  async fetchIdentity({ address, caipNetworkId }) {
    const isSupported = await BlockchainApiController.isNetworkSupported(caipNetworkId);
    if (!isSupported) {
      return { avatar: "", name: "" };
    }
    const identityCache = StorageUtil.getIdentityFromCacheForAddress(address);
    if (identityCache) {
      return identityCache;
    }
    const result = await BlockchainApiController.get({
      path: `/v1/identity/${address}`,
      params: {
        sender: ChainController.state.activeCaipAddress ? CoreHelperUtil.getPlainAddress(ChainController.state.activeCaipAddress) : void 0
      }
    });
    StorageUtil.updateIdentityCache({
      address,
      identity: result,
      timestamp: Date.now()
    });
    return result;
  },
  async fetchTransactions({ account, cursor, onramp, signal, cache, chainId }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { data: [], next: void 0 };
    }
    return BlockchainApiController.get({
      path: `/v1/account/${account}/history`,
      params: {
        cursor,
        onramp,
        chainId
      },
      signal,
      cache
    });
  },
  async fetchSwapQuote({ amount, userAddress, from, to: to2, gasPrice }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { quotes: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/quotes`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        amount,
        userAddress,
        from,
        to: to2,
        gasPrice
      }
    });
  },
  async fetchSwapTokens({ chainId }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { tokens: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/tokens`,
      params: { chainId }
    });
  },
  async fetchTokenPrice({ addresses }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { fungibles: [] };
    }
    return state$5.api.post({
      path: "/v1/fungible/price",
      body: {
        currency: "usd",
        addresses,
        projectId: OptionsController.state.projectId
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async fetchSwapAllowance({ tokenAddress, userAddress }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { allowance: "0" };
    }
    return BlockchainApiController.get({
      path: `/v1/convert/allowance`,
      params: {
        tokenAddress,
        userAddress
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async fetchGasPrice({ chainId }) {
    var _a;
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Gas Price");
    }
    return BlockchainApiController.get({
      path: `/v1/convert/gas-price`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        chainId,
        st: st2,
        sv
      }
    });
  },
  async generateSwapCalldata({ amount, from, to: to2, userAddress, disableEstimate }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Swaps");
    }
    return state$5.api.post({
      path: "/v1/convert/build-transaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        amount,
        eip155: {
          slippage: ConstantsUtil$2.CONVERT_SLIPPAGE_TOLERANCE
        },
        projectId: OptionsController.state.projectId,
        from,
        to: to2,
        userAddress,
        disableEstimate
      }
    });
  },
  async generateApproveCalldata({ from, to: to2, userAddress }) {
    var _a;
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      throw new Error("Network not supported for Swaps");
    }
    return BlockchainApiController.get({
      path: `/v1/convert/build-approve`,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userAddress,
        from,
        to: to2,
        st: st2,
        sv
      }
    });
  },
  async getBalance(address, chainId, forceUpdate) {
    var _a;
    const { st: st2, sv } = BlockchainApiController.getSdkProperties();
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      SnackController.showError("Token Balance Unavailable");
      return { balances: [] };
    }
    const caipAddress = `${chainId}:${address}`;
    const cachedBalance = StorageUtil.getBalanceCacheForCaipAddress(caipAddress);
    if (cachedBalance) {
      return cachedBalance;
    }
    const balance = await BlockchainApiController.get({
      path: `/v1/account/${address}/balance`,
      params: {
        currency: "usd",
        chainId,
        forceUpdate,
        st: st2,
        sv
      }
    });
    StorageUtil.updateBalanceCache({
      caipAddress,
      balance,
      timestamp: Date.now()
    });
    return balance;
  },
  async lookupEnsName(name) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { addresses: {}, attributes: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/profile/account/${name}`,
      params: { apiVersion: "2" }
    });
  },
  async reverseLookupEnsName({ address }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return [];
    }
    return BlockchainApiController.get({
      path: `/v1/profile/reverse/${address}`,
      params: {
        sender: AccountController.state.address,
        apiVersion: "2"
      }
    });
  },
  async getEnsNameSuggestions(name) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { suggestions: [] };
    }
    return BlockchainApiController.get({
      path: `/v1/profile/suggestions/${name}`,
      params: { zone: "reown.id" }
    });
  },
  async registerEnsName({ coinType, address, message, signature }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { success: false };
    }
    return state$5.api.post({
      path: `/v1/profile/account`,
      body: { coin_type: coinType, address, message, signature },
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  async generateOnRampURL({ destinationWallets, partnerUserId, defaultNetwork, purchaseAmount, paymentAmount }) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return "";
    }
    const response = await state$5.api.post({
      path: `/v1/generators/onrampurl`,
      params: {
        projectId: OptionsController.state.projectId
      },
      body: {
        destinationWallets,
        defaultNetwork,
        partnerUserId,
        defaultExperience: "buy",
        presetCryptoAmount: purchaseAmount,
        presetFiatAmount: paymentAmount
      }
    });
    return response.url;
  },
  async getOnrampOptions() {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { paymentCurrencies: [], purchaseCurrencies: [] };
    }
    try {
      const response = await BlockchainApiController.get({
        path: `/v1/onramp/options`
      });
      return response;
    } catch (e) {
      return DEFAULT_OPTIONS;
    }
  },
  async getOnrampQuote({ purchaseCurrency, paymentCurrency, amount, network }) {
    var _a;
    try {
      const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
      if (!isSupported) {
        return null;
      }
      const response = await state$5.api.post({
        path: `/v1/onramp/quote`,
        params: {
          projectId: OptionsController.state.projectId
        },
        body: {
          purchaseCurrency,
          paymentCurrency,
          amount,
          network
        }
      });
      return response;
    } catch (e) {
      return {
        coinbaseFee: { amount, currency: paymentCurrency.id },
        networkFee: { amount, currency: paymentCurrency.id },
        paymentSubtotal: { amount, currency: paymentCurrency.id },
        paymentTotal: { amount, currency: paymentCurrency.id },
        purchaseAmount: { amount, currency: paymentCurrency.id },
        quoteId: "mocked-quote-id"
      };
    }
  },
  async getSmartSessions(caipAddress) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return [];
    }
    return BlockchainApiController.get({
      path: `/v1/sessions/${caipAddress}`
    });
  },
  async revokeSmartSession(address, pci, signature) {
    var _a;
    const isSupported = await BlockchainApiController.isNetworkSupported((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId);
    if (!isSupported) {
      return { success: false };
    }
    return state$5.api.post({
      path: `/v1/sessions/${address}/revoke`,
      params: {
        projectId: OptionsController.state.projectId
      },
      body: {
        pci,
        signature
      }
    });
  },
  setClientId(clientId) {
    state$5.clientId = clientId;
    state$5.api = new FetchUtil({ baseUrl, clientId });
  }
};
const state$4 = proxy({
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: false,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: []
});
const controller$3 = {
  state: state$4,
  replaceState(newState) {
    if (!newState) {
      return;
    }
    Object.assign(state$4, ref(newState));
  },
  subscribe(callback) {
    return ChainController.subscribeChainProp("accountState", (accountState2) => {
      if (accountState2) {
        return callback(accountState2);
      }
      return void 0;
    });
  },
  subscribeKey(property, callback, chain) {
    let prev = void 0;
    return ChainController.subscribeChainProp("accountState", (accountState2) => {
      if (accountState2) {
        const nextValue = accountState2[property];
        if (prev !== nextValue) {
          prev = nextValue;
          callback(nextValue);
        }
      }
    }, chain);
  },
  setStatus(status, chain) {
    ChainController.setAccountProp("status", status, chain);
  },
  getCaipAddress(chain) {
    return ChainController.getAccountProp("caipAddress", chain);
  },
  setCaipAddress(caipAddress, chain) {
    const newAddress = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (chain === ChainController.state.activeChain) {
      ChainController.state.activeCaipAddress = caipAddress;
    }
    ChainController.setAccountProp("caipAddress", caipAddress, chain);
    ChainController.setAccountProp("address", newAddress, chain);
  },
  setBalance(balance, balanceSymbol, chain) {
    ChainController.setAccountProp("balance", balance, chain);
    ChainController.setAccountProp("balanceSymbol", balanceSymbol, chain);
  },
  setProfileName(profileName, chain) {
    ChainController.setAccountProp("profileName", profileName, chain);
  },
  setProfileImage(profileImage, chain) {
    ChainController.setAccountProp("profileImage", profileImage, chain);
  },
  setUser(user, chain) {
    ChainController.setAccountProp("user", user, chain);
  },
  setAddressExplorerUrl(explorerUrl, chain) {
    ChainController.setAccountProp("addressExplorerUrl", explorerUrl, chain);
  },
  setSmartAccountDeployed(isDeployed, chain) {
    ChainController.setAccountProp("smartAccountDeployed", isDeployed, chain);
  },
  setCurrentTab(currentTab) {
    ChainController.setAccountProp("currentTab", currentTab, ChainController.state.activeChain);
  },
  setTokenBalance(tokenBalance, chain) {
    if (tokenBalance) {
      ChainController.setAccountProp("tokenBalance", tokenBalance, chain);
    }
  },
  setShouldUpdateToAddress(address, chain) {
    ChainController.setAccountProp("shouldUpdateToAddress", address, chain);
  },
  setAllAccounts(accounts, namespace) {
    ChainController.setAccountProp("allAccounts", accounts, namespace);
  },
  addAddressLabel(address, label, chain) {
    const map = ChainController.getAccountProp("addressLabels", chain) || /* @__PURE__ */ new Map();
    map.set(address, label);
    ChainController.setAccountProp("addressLabels", map, chain);
  },
  removeAddressLabel(address, chain) {
    const map = ChainController.getAccountProp("addressLabels", chain) || /* @__PURE__ */ new Map();
    map.delete(address);
    ChainController.setAccountProp("addressLabels", map, chain);
  },
  setConnectedWalletInfo(connectedWalletInfo, chain) {
    ChainController.setAccountProp("connectedWalletInfo", connectedWalletInfo, chain, false);
  },
  setPreferredAccountType(preferredAccountType, chain) {
    ChainController.setAccountProp("preferredAccountTypes", {
      ...state$4.preferredAccountTypes,
      [chain]: preferredAccountType
    }, chain);
  },
  setPreferredAccountTypes(preferredAccountTypes) {
    state$4.preferredAccountTypes = preferredAccountTypes;
  },
  setSocialProvider(socialProvider, chain) {
    if (socialProvider) {
      ChainController.setAccountProp("socialProvider", socialProvider, chain);
    }
  },
  setSocialWindow(socialWindow, chain) {
    ChainController.setAccountProp("socialWindow", socialWindow ? ref(socialWindow) : void 0, chain);
  },
  setFarcasterUrl(farcasterUrl, chain) {
    ChainController.setAccountProp("farcasterUrl", farcasterUrl, chain);
  },
  async fetchTokenBalance(onError) {
    var _a, _b;
    state$4.balanceLoading = true;
    const chainId = (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId;
    const chain = (_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.chainNamespace;
    const caipAddress = ChainController.state.activeCaipAddress;
    const address = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : void 0;
    if (state$4.lastRetry && !CoreHelperUtil.isAllowedRetry(state$4.lastRetry, 30 * ConstantsUtil$2.ONE_SEC_MS)) {
      state$4.balanceLoading = false;
      return [];
    }
    try {
      if (address && chainId && chain) {
        const response = await BlockchainApiController.getBalance(address, chainId);
        const filteredBalances = response.balances.filter((balance) => balance.quantity.decimals !== "0");
        AccountController.setTokenBalance(filteredBalances, chain);
        state$4.lastRetry = void 0;
        state$4.balanceLoading = false;
        return filteredBalances;
      }
    } catch (error) {
      state$4.lastRetry = Date.now();
      onError == null ? void 0 : onError(error);
      SnackController.showError("Token Balance Unavailable");
    } finally {
      state$4.balanceLoading = false;
    }
    return [];
  },
  resetAccount(chain) {
    ChainController.resetAccount(chain);
  }
};
const AccountController = withErrorBoundary(controller$3);
const NetworkUtil = {
  /**
   * Function to handle the network switch.
   * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
   * @param args.network - The network to switch to.
   * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
   * @returns void
   */
  onSwitchNetwork({ network, ignoreSwitchConfirmation = false }) {
    const currentNetwork = ChainController.state.activeCaipNetwork;
    const routerData = RouterController.state.data;
    const isSameNetwork = network.id === (currentNetwork == null ? void 0 : currentNetwork.id);
    if (isSameNetwork) {
      return;
    }
    const isCurrentNamespaceConnected = AccountController.getCaipAddress(ChainController.state.activeChain);
    const isDifferentNamespace = network.chainNamespace !== ChainController.state.activeChain;
    const isNextNamespaceConnected = AccountController.getCaipAddress(network.chainNamespace);
    const connectorId = ConnectorController.getConnectorId(ChainController.state.activeChain);
    const isConnectedWithAuth = connectorId === ConstantsUtil$3.CONNECTOR_ID.AUTH;
    const isSupportedForAuthConnector = ConstantsUtil$3.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((c2) => c2 === network.chainNamespace);
    if (ignoreSwitchConfirmation || isConnectedWithAuth && isSupportedForAuthConnector) {
      RouterController.push("SwitchNetwork", { ...routerData, network });
    } else if (
      /**
       * If user switching to a different namespace and next namespace is not connected, we need to show switch active chain view for confirmation first.
       */
      isCurrentNamespaceConnected && isDifferentNamespace && !isNextNamespaceConnected
    ) {
      RouterController.push("SwitchActiveChain", {
        switchToChain: network.chainNamespace,
        navigateTo: "Connect",
        navigateWithReplace: true,
        network
      });
    } else {
      RouterController.push("SwitchNetwork", { ...routerData, network });
    }
  }
};
const state$3 = proxy({
  loading: false,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: false,
  shake: false,
  namespace: void 0
});
const controller$2 = {
  state: state$3,
  subscribe(callback) {
    return subscribe(state$3, () => callback(state$3));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$3, key, callback);
  },
  async open(options) {
    var _a, _b;
    const isConnected = AccountController.state.status === "connected";
    const namespace = options == null ? void 0 : options.namespace;
    const currentNamespace = ChainController.state.activeChain;
    const isSwitchingNamespace = namespace && namespace !== currentNamespace;
    const caipAddress = (_a = ChainController.getAccountData(options == null ? void 0 : options.namespace)) == null ? void 0 : _a.caipAddress;
    if (ConnectionController.state.wcBasic) {
      ApiController.prefetch({ fetchNetworkImages: false, fetchConnectorImages: false });
    } else {
      await ApiController.prefetch({
        fetchConnectorImages: !isConnected,
        fetchFeaturedWallets: !isConnected,
        fetchRecommendedWallets: !isConnected
      });
    }
    ConnectorController.setFilterByNamespace(options == null ? void 0 : options.namespace);
    ModalController.setLoading(true, namespace);
    if (namespace && isSwitchingNamespace) {
      const namespaceNetwork = ((_b = ChainController.getNetworkData(namespace)) == null ? void 0 : _b.caipNetwork) || ChainController.getRequestedCaipNetworks(namespace)[0];
      if (namespaceNetwork) {
        NetworkUtil.onSwitchNetwork({ network: namespaceNetwork, ignoreSwitchConfirmation: true });
      }
    } else {
      const hasNoAdapters = ChainController.state.noAdapters;
      if (OptionsController.state.manualWCControl || hasNoAdapters && !caipAddress) {
        if (CoreHelperUtil.isMobile()) {
          RouterController.reset("AllWallets");
        } else {
          RouterController.reset("ConnectingWalletConnectBasic");
        }
      } else if (options == null ? void 0 : options.view) {
        RouterController.reset(options.view, options.data);
      } else if (caipAddress) {
        RouterController.reset("Account");
      } else {
        RouterController.reset("Connect");
      }
    }
    state$3.open = true;
    PublicStateController.set({ open: true });
    EventsController.sendEvent({
      type: "track",
      event: "MODAL_OPEN",
      properties: { connected: Boolean(caipAddress) }
    });
  },
  close() {
    const isEmbeddedEnabled = OptionsController.state.enableEmbedded;
    const isConnected = Boolean(ChainController.state.activeCaipAddress);
    if (state$3.open) {
      EventsController.sendEvent({
        type: "track",
        event: "MODAL_CLOSE",
        properties: { connected: isConnected }
      });
    }
    state$3.open = false;
    RouterController.reset("Connect");
    ModalController.clearLoading();
    if (isEmbeddedEnabled) {
      if (isConnected) {
        RouterController.replace("Account");
      } else {
        RouterController.push("Connect");
      }
    } else {
      PublicStateController.set({ open: false });
    }
    ConnectionController.resetUri();
  },
  setLoading(loading, namespace) {
    if (namespace) {
      state$3.loadingNamespaceMap.set(namespace, loading);
    }
    state$3.loading = loading;
    PublicStateController.set({ loading });
  },
  clearLoading() {
    state$3.loadingNamespaceMap.clear();
    state$3.loading = false;
  },
  shake() {
    if (state$3.shake) {
      return;
    }
    state$3.shake = true;
    setTimeout(() => {
      state$3.shake = false;
    }, 500);
  }
};
const ModalController = withErrorBoundary(controller$2);
const USDC_CURRENCY_DEFAULT = {
  id: "2b92315d-eab7-5bef-84fa-089a131333f5",
  name: "USD Coin",
  symbol: "USDC",
  networks: [
    {
      name: "ethereum-mainnet",
      display_name: "Ethereum",
      chain_id: "1",
      contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    {
      name: "polygon-mainnet",
      display_name: "Polygon",
      chain_id: "137",
      contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    }
  ]
};
const USD_CURRENCY_DEFAULT = {
  id: "USD",
  payment_method_limits: [
    {
      id: "card",
      min: "10.00",
      max: "7500.00"
    },
    {
      id: "ach_bank_account",
      min: "10.00",
      max: "25000.00"
    }
  ]
};
const defaultState = {
  providers: ONRAMP_PROVIDERS,
  selectedProvider: null,
  error: null,
  purchaseCurrency: USDC_CURRENCY_DEFAULT,
  paymentCurrency: USD_CURRENCY_DEFAULT,
  purchaseCurrencies: [USDC_CURRENCY_DEFAULT],
  paymentCurrencies: [],
  quotesLoading: false
};
const state$2 = proxy(defaultState);
const controller$1 = {
  state: state$2,
  subscribe(callback) {
    return subscribe(state$2, () => callback(state$2));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$2, key, callback);
  },
  setSelectedProvider(provider) {
    if (provider && provider.name === "meld") {
      const currency = ChainController.state.activeChain === ConstantsUtil$3.CHAIN.SOLANA ? "SOL" : "USDC";
      const address = AccountController.state.address ?? "";
      const url = new URL(provider.url);
      url.searchParams.append("publicKey", MELD_PUBLIC_KEY);
      url.searchParams.append("destinationCurrencyCode", currency);
      url.searchParams.append("walletAddress", address);
      url.searchParams.append("externalCustomerId", OptionsController.state.projectId);
      state$2.selectedProvider = { ...provider, url: url.toString() };
    } else {
      state$2.selectedProvider = provider;
    }
  },
  setOnrampProviders(providers) {
    if (Array.isArray(providers) && providers.every((item) => typeof item === "string")) {
      const validOnramp = providers;
      const newProviders = ONRAMP_PROVIDERS.filter((provider) => validOnramp.includes(provider.name));
      state$2.providers = newProviders;
    } else {
      state$2.providers = [];
    }
  },
  setPurchaseCurrency(currency) {
    state$2.purchaseCurrency = currency;
  },
  setPaymentCurrency(currency) {
    state$2.paymentCurrency = currency;
  },
  setPurchaseAmount(amount) {
    OnRampController.state.purchaseAmount = amount;
  },
  setPaymentAmount(amount) {
    OnRampController.state.paymentAmount = amount;
  },
  async getAvailableCurrencies() {
    const options = await BlockchainApiController.getOnrampOptions();
    state$2.purchaseCurrencies = options.purchaseCurrencies;
    state$2.paymentCurrencies = options.paymentCurrencies;
    state$2.paymentCurrency = options.paymentCurrencies[0] || USD_CURRENCY_DEFAULT;
    state$2.purchaseCurrency = options.purchaseCurrencies[0] || USDC_CURRENCY_DEFAULT;
    await ApiController.fetchCurrencyImages(options.paymentCurrencies.map((currency) => currency.id));
    await ApiController.fetchTokenImages(options.purchaseCurrencies.map((currency) => currency.symbol));
  },
  async getQuote() {
    var _a, _b;
    state$2.quotesLoading = true;
    try {
      const quote = await BlockchainApiController.getOnrampQuote({
        purchaseCurrency: state$2.purchaseCurrency,
        paymentCurrency: state$2.paymentCurrency,
        amount: ((_a = state$2.paymentAmount) == null ? void 0 : _a.toString()) || "0",
        network: (_b = state$2.purchaseCurrency) == null ? void 0 : _b.symbol
      });
      state$2.quotesLoading = false;
      state$2.purchaseAmount = Number(quote == null ? void 0 : quote.purchaseAmount.amount);
      return quote;
    } catch (error) {
      state$2.error = error.message;
      state$2.quotesLoading = false;
      return null;
    } finally {
      state$2.quotesLoading = false;
    }
  },
  resetState() {
    state$2.selectedProvider = null;
    state$2.error = null;
    state$2.purchaseCurrency = USDC_CURRENCY_DEFAULT;
    state$2.paymentCurrency = USD_CURRENCY_DEFAULT;
    state$2.purchaseCurrencies = [USDC_CURRENCY_DEFAULT];
    state$2.paymentCurrencies = [];
    state$2.paymentAmount = void 0;
    state$2.purchaseAmount = void 0;
    state$2.quotesLoading = false;
  }
};
const OnRampController = withErrorBoundary(controller$1);
const SLIP44_MSB = 2147483648;
const EnsUtil = {
  convertEVMChainIdToCoinType(chainId) {
    if (chainId >= SLIP44_MSB) {
      throw new Error("Invalid chainId");
    }
    return (SLIP44_MSB | chainId) >>> 0;
  }
};
const state$1 = proxy({
  suggestions: [],
  loading: false
});
const controller = {
  state: state$1,
  subscribe(callback) {
    return subscribe(state$1, () => callback(state$1));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state$1, key, callback);
  },
  async resolveName(name) {
    var _a, _b;
    try {
      return await BlockchainApiController.lookupEnsName(name);
    } catch (e) {
      const error = e;
      throw new Error(((_b = (_a = error == null ? void 0 : error.reasons) == null ? void 0 : _a[0]) == null ? void 0 : _b.description) || "Error resolving name");
    }
  },
  async isNameRegistered(name) {
    try {
      await BlockchainApiController.lookupEnsName(name);
      return true;
    } catch {
      return false;
    }
  },
  async getSuggestions(value) {
    try {
      state$1.loading = true;
      state$1.suggestions = [];
      const response = await BlockchainApiController.getEnsNameSuggestions(value);
      state$1.suggestions = response.suggestions.map((suggestion) => ({
        ...suggestion,
        name: suggestion.name
      })) || [];
      return state$1.suggestions;
    } catch (e) {
      const errorMessage = EnsController.parseEnsApiError(e, "Error fetching name suggestions");
      throw new Error(errorMessage);
    } finally {
      state$1.loading = false;
    }
  },
  async getNamesForAddress(address) {
    try {
      const network = ChainController.state.activeCaipNetwork;
      if (!network) {
        return [];
      }
      const cachedEns = StorageUtil.getEnsFromCacheForAddress(address);
      if (cachedEns) {
        return cachedEns;
      }
      const response = await BlockchainApiController.reverseLookupEnsName({ address });
      StorageUtil.updateEnsCache({
        address,
        ens: response,
        timestamp: Date.now()
      });
      return response;
    } catch (e) {
      const errorMessage = EnsController.parseEnsApiError(e, "Error fetching names for address");
      throw new Error(errorMessage);
    }
  },
  async registerName(name) {
    const network = ChainController.state.activeCaipNetwork;
    if (!network) {
      throw new Error("Network not found");
    }
    const address = AccountController.state.address;
    const emailConnector = ConnectorController.getAuthConnector();
    if (!address || !emailConnector) {
      throw new Error("Address or auth connector not found");
    }
    state$1.loading = true;
    try {
      const message = JSON.stringify({
        name,
        attributes: {},
        // Unix timestamp
        timestamp: Math.floor(Date.now() / 1e3)
      });
      RouterController.pushTransactionStack({
        onCancel() {
          RouterController.replace("RegisterAccountName");
        }
      });
      const signature = await ConnectionController.signMessage(message);
      state$1.loading = false;
      const networkId = network.id;
      if (!networkId) {
        throw new Error("Network not found");
      }
      const coinType = EnsUtil.convertEVMChainIdToCoinType(Number(networkId));
      await BlockchainApiController.registerEnsName({
        coinType,
        address,
        signature,
        message
      });
      AccountController.setProfileName(name, network.chainNamespace);
      RouterController.replace("RegisterAccountNameSuccess");
    } catch (e) {
      const errorMessage = EnsController.parseEnsApiError(e, `Error registering name ${name}`);
      RouterController.replace("RegisterAccountName");
      throw new Error(errorMessage);
    } finally {
      state$1.loading = false;
    }
  },
  validateName(name) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(name);
  },
  parseEnsApiError(error, defaultError) {
    var _a, _b;
    const ensError = error;
    return ((_b = (_a = ensError == null ? void 0 : ensError.reasons) == null ? void 0 : _a[0]) == null ? void 0 : _b.description) || defaultError;
  }
};
const EnsController = withErrorBoundary(controller);
var a = Object.defineProperty, u$1 = (e, s2, r2) => s2 in e ? a(e, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[s2] = r2, c$1 = (e, s2, r2) => u$1(e, typeof s2 != "symbol" ? s2 + "" : s2, r2);
let h$1 = class h extends IEvents {
  constructor(s2) {
    super(), this.opts = s2, c$1(this, "protocol", "wc"), c$1(this, "version", 2);
  }
};
var p$1 = Object.defineProperty, b$2 = (e, s2, r2) => s2 in e ? p$1(e, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[s2] = r2, v$2 = (e, s2, r2) => b$2(e, s2 + "", r2);
let I$1 = class I extends IEvents {
  constructor(s2, r2) {
    super(), this.core = s2, this.logger = r2, v$2(this, "records", /* @__PURE__ */ new Map());
  }
};
let y$2 = class y {
  constructor(s2, r2) {
    this.logger = s2, this.core = r2;
  }
};
class m extends IEvents {
  constructor(s2, r2) {
    super(), this.relayer = s2, this.logger = r2;
  }
}
let d$1 = class d extends IEvents {
  constructor(s2) {
    super();
  }
};
let f$1 = class f {
  constructor(s2, r2, t2, q2) {
    this.core = s2, this.logger = r2, this.name = t2;
  }
};
let P$1 = class P extends IEvents {
  constructor(s2, r2) {
    super(), this.relayer = s2, this.logger = r2;
  }
};
let S$2 = class S extends IEvents {
  constructor(s2, r2) {
    super(), this.core = s2, this.logger = r2;
  }
};
let M$2 = class M {
  constructor(s2, r2, t2) {
    this.core = s2, this.logger = r2, this.store = t2;
  }
};
let O$2 = class O {
  constructor(s2, r2) {
    this.projectId = s2, this.logger = r2;
  }
};
let R$1 = class R {
  constructor(s2, r2, t2) {
    this.core = s2, this.logger = r2, this.telemetryEnabled = t2;
  }
};
var T = Object.defineProperty, k$2 = (e, s2, r2) => s2 in e ? T(e, s2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[s2] = r2, i = (e, s2, r2) => k$2(e, typeof s2 != "symbol" ? s2 + "" : s2, r2);
let J$1 = class J {
  constructor(s2) {
    this.opts = s2, i(this, "protocol", "wc"), i(this, "version", 2);
  }
};
let V$3 = class V {
  constructor(s2) {
    this.client = s2;
  }
};
const ae$2 = ":";
function Ne$1(t2) {
  const [e, n] = t2.split(ae$2);
  return { namespace: e, reference: n };
}
function ue$2(t2, e) {
  return t2.includes(":") ? [t2] : e.chains || [];
}
var Zo = Object.defineProperty, Yo$1 = Object.defineProperties, Go$1 = Object.getOwnPropertyDescriptors, Tn$1 = Object.getOwnPropertySymbols, Wo$1 = Object.prototype.hasOwnProperty, Xo$1 = Object.prototype.propertyIsEnumerable, Rn$1 = (t2, e, n) => e in t2 ? Zo(t2, e, { enumerable: true, configurable: true, writable: true, value: n }) : t2[e] = n, _n$1 = (t2, e) => {
  for (var n in e || (e = {})) Wo$1.call(e, n) && Rn$1(t2, n, e[n]);
  if (Tn$1) for (var n of Tn$1(e)) Xo$1.call(e, n) && Rn$1(t2, n, e[n]);
  return t2;
}, Jo$1 = (t2, e) => Yo$1(t2, Go$1(e));
const $n$1 = "ReactNative", Y$2 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, jn$1 = "js";
function _e$3() {
  return typeof process$1 < "u" && typeof process$1.versions < "u" && typeof process$1.versions.node < "u";
}
function pt$2() {
  return !getDocument_1() && !!getNavigator_1() && navigator.product === $n$1;
}
function ei$1() {
  return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function ni$1() {
  return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Tt$2() {
  return !_e$3() && !!getNavigator_1() && !!getDocument_1();
}
function xt$2() {
  return pt$2() ? Y$2.reactNative : _e$3() ? Y$2.node : Tt$2() ? Y$2.browser : Y$2.unknown;
}
function ri$1() {
  var t2;
  try {
    return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (t2 = global.Application) == null ? void 0 : t2.applicationId : void 0;
  } catch {
    return;
  }
}
function Cn$1(t2, e) {
  const n = new URLSearchParams(t2);
  for (const r2 of Object.keys(e).sort()) if (e.hasOwnProperty(r2)) {
    const o2 = e[r2];
    o2 !== void 0 && n.set(r2, o2);
  }
  return n.toString();
}
function oi$1(t2) {
  var e, n;
  const r2 = Pn$1();
  try {
    return t2 != null && t2.url && r2.url && new URL(t2.url).host !== new URL(r2.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t2.url} differs from the actual page url:${r2.url}. This is probably unintended and can lead to issues.`), t2.url = r2.url), (e = t2 == null ? void 0 : t2.icons) != null && e.length && t2.icons.length > 0 && (t2.icons = t2.icons.filter((o2) => o2 !== "")), Jo$1(_n$1(_n$1({}, r2), t2), { url: (t2 == null ? void 0 : t2.url) || r2.url, name: (t2 == null ? void 0 : t2.name) || r2.name, description: (t2 == null ? void 0 : t2.description) || r2.description, icons: (n = t2 == null ? void 0 : t2.icons) != null && n.length && t2.icons.length > 0 ? t2.icons : r2.icons });
  } catch (o2) {
    return console.warn("Error populating app metadata", o2), t2 || r2;
  }
}
function Pn$1() {
  return getWindowMetadata_1() || { name: "", description: "", url: "", icons: [""] };
}
function kn$1() {
  if (xt$2() === Y$2.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n, Version: r2 } = global.Platform;
    return [n, r2].join("-");
  }
  const t2 = detect();
  if (t2 === null) return "unknown";
  const e = t2.os ? t2.os.replace(" ", "").toLowerCase() : "unknown";
  return t2.type === "browser" ? [e, t2.name, t2.version].join("-") : [e, t2.version].join("-");
}
function Vn$1() {
  var t2;
  const e = xt$2();
  return e === Y$2.browser ? [e, ((t2 = getLocation_1()) == null ? void 0 : t2.host) || "unknown"].join(":") : e;
}
function Mn$1(t2, e, n) {
  const r2 = kn$1(), o2 = Vn$1();
  return [[t2, e].join("-"), [jn$1, n].join("-"), r2, o2].join("/");
}
function si$1({ protocol: t2, version: e, relayUrl: n, sdkVersion: r2, auth: o2, projectId: i2, useOnCloseEvent: s2, bundleId: c2, packageName: a2 }) {
  const u2 = n.split("?"), l2 = Mn$1(t2, e, r2), f3 = { auth: o2, ua: l2, projectId: i2, useOnCloseEvent: s2, packageName: a2 || void 0, bundleId: c2 || void 0 }, h3 = Cn$1(u2[1] || "", f3);
  return u2[0] + "?" + h3;
}
function gt$2(t2, e) {
  return t2.filter((n) => e.includes(n)).length === t2.length;
}
function fi$1(t2) {
  return Object.fromEntries(t2.entries());
}
function li$1(t2) {
  return new Map(Object.entries(t2));
}
function gi$1(t2 = cjs.FIVE_MINUTES, e) {
  const n = cjs.toMiliseconds(t2 || cjs.FIVE_MINUTES);
  let r2, o2, i2, s2;
  return { resolve: (c2) => {
    i2 && r2 && (clearTimeout(i2), r2(c2), s2 = Promise.resolve(c2));
  }, reject: (c2) => {
    i2 && o2 && (clearTimeout(i2), o2(c2));
  }, done: () => new Promise((c2, a2) => {
    if (s2) return c2(s2);
    i2 = setTimeout(() => {
      const u2 = new Error(e);
      s2 = Promise.reject(u2), a2(u2);
    }, n), r2 = c2, o2 = a2;
  }) };
}
function yi$1(t2, e, n) {
  return new Promise(async (r2, o2) => {
    const i2 = setTimeout(() => o2(new Error(n)), e);
    try {
      const s2 = await t2;
      r2(s2);
    } catch (s2) {
      o2(s2);
    }
    clearTimeout(i2);
  });
}
function $e$2(t2, e) {
  if (typeof e == "string" && e.startsWith(`${t2}:`)) return e;
  if (t2.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (t2.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${t2}`);
}
function mi$1(t2) {
  return $e$2("topic", t2);
}
function wi$1(t2) {
  return $e$2("id", t2);
}
function bi$1(t2) {
  const [e, n] = t2.split(":"), r2 = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof n == "string") r2.topic = n;
  else if (e === "id" && Number.isInteger(Number(n))) r2.id = Number(n);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${n}`);
  return r2;
}
function Ei$1(t2, e) {
  return cjs.fromMiliseconds(Date.now() + cjs.toMiliseconds(t2));
}
function vi$1(t2) {
  return Date.now() >= cjs.toMiliseconds(t2);
}
function xi$1(t2, e) {
  return `${t2}${e ? `:${e}` : ""}`;
}
function ot$1(t2 = [], e = []) {
  return [.../* @__PURE__ */ new Set([...t2, ...e])];
}
async function Si$1({ id: t2, topic: e, wcDeepLink: n }) {
  var r2;
  try {
    if (!n) return;
    const o2 = typeof n == "string" ? JSON.parse(n) : n, i2 = o2 == null ? void 0 : o2.href;
    if (typeof i2 != "string") return;
    const s2 = Kn$1(i2, t2, e), c2 = xt$2();
    if (c2 === Y$2.browser) {
      if (!((r2 = getDocument_1()) != null && r2.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      Fn$1(s2);
    } else c2 === Y$2.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(s2);
  } catch (o2) {
    console.error(o2);
  }
}
function Kn$1(t2, e, n) {
  const r2 = `requestId=${e}&sessionTopic=${n}`;
  t2.endsWith("/") && (t2 = t2.slice(0, -1));
  let o2 = `${t2}`;
  if (t2.startsWith("https://t.me")) {
    const i2 = t2.includes("?") ? "&startapp=" : "?startapp=";
    o2 = `${o2}${i2}${Yn$1(r2, true)}`;
  } else o2 = `${o2}/wc?${r2}`;
  return o2;
}
function Fn$1(t2) {
  let e = "_self";
  Zn$1() ? e = "_top" : (zn$1() || t2.startsWith("https://") || t2.startsWith("http://")) && (e = "_blank"), window.open(t2, e, "noreferrer noopener");
}
async function Oi$1(t2, e) {
  let n = "";
  try {
    if (Tt$2() && (n = localStorage.getItem(e), n)) return n;
    n = await t2.getItem(e);
  } catch (r2) {
    console.error(r2);
  }
  return n;
}
function Ai$1(t2, e) {
  if (!t2.includes(e)) return null;
  const n = t2.split(/([&,?,=])/), r2 = n.indexOf(e);
  return n[r2 + 2];
}
function Bi$1() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t2) => {
    const e = Math.random() * 16 | 0;
    return (t2 === "x" ? e : e & 3 | 8).toString(16);
  });
}
function Ii$1() {
  return typeof process$1 < "u" && process$1.env.IS_VITEST === "true";
}
function zn$1() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Zn$1() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function Yn$1(t2, e = false) {
  const n = Buffer.from(t2).toString("base64");
  return e ? n.replace(/[=]/g, "") : n;
}
function je$2(t2) {
  return Buffer.from(t2, "base64").toString("utf-8");
}
function Ni$1(t2) {
  return new Promise((e) => setTimeout(e, t2));
}
function Wt$2(t2) {
  if (!Number.isSafeInteger(t2) || t2 < 0) throw new Error("positive integer expected, got " + t2);
}
function Ui$1(t2) {
  return t2 instanceof Uint8Array || ArrayBuffer.isView(t2) && t2.constructor.name === "Uint8Array";
}
function Xt$2(t2, ...e) {
  if (!Ui$1(t2)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t2.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t2.length);
}
function Ce$1(t2) {
  if (typeof t2 != "function" || typeof t2.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Wt$2(t2.outputLen), Wt$2(t2.blockLen);
}
function Rt$2(t2, e = true) {
  if (t2.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t2.finished) throw new Error("Hash#digest() has already been called");
}
function Gn$1(t2, e) {
  Xt$2(t2);
  const n = e.outputLen;
  if (t2.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
}
const le$2 = BigInt(2 ** 32 - 1), Wn$1 = BigInt(32);
function Ti$1(t2, e = false) {
  return e ? { h: Number(t2 & le$2), l: Number(t2 >> Wn$1 & le$2) } : { h: Number(t2 >> Wn$1 & le$2) | 0, l: Number(t2 & le$2) | 0 };
}
function Ri$1(t2, e = false) {
  let n = new Uint32Array(t2.length), r2 = new Uint32Array(t2.length);
  for (let o2 = 0; o2 < t2.length; o2++) {
    const { h: i2, l: s2 } = Ti$1(t2[o2], e);
    [n[o2], r2[o2]] = [i2, s2];
  }
  return [n, r2];
}
const _i$1 = (t2, e, n) => t2 << n | e >>> 32 - n, $i$1 = (t2, e, n) => e << n | t2 >>> 32 - n, Li$1 = (t2, e, n) => e << n - 32 | t2 >>> 64 - n, ji$1 = (t2, e, n) => t2 << n - 32 | e >>> 64 - n, _t$2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Ci$1(t2) {
  return new Uint32Array(t2.buffer, t2.byteOffset, Math.floor(t2.byteLength / 4));
}
function Pe$1(t2) {
  return new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
}
function ct$1(t2, e) {
  return t2 << 32 - e | t2 >>> e;
}
const Xn$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Pi$1(t2) {
  return t2 << 24 & 4278190080 | t2 << 8 & 16711680 | t2 >>> 8 & 65280 | t2 >>> 24 & 255;
}
function Jn$1(t2) {
  for (let e = 0; e < t2.length; e++) t2[e] = Pi$1(t2[e]);
}
function ki$1(t2) {
  if (typeof t2 != "string") throw new Error("utf8ToBytes expected string, got " + typeof t2);
  return new Uint8Array(new TextEncoder().encode(t2));
}
function $t$1(t2) {
  return typeof t2 == "string" && (t2 = ki$1(t2)), Xt$2(t2), t2;
}
function Vi$1(...t2) {
  let e = 0;
  for (let r2 = 0; r2 < t2.length; r2++) {
    const o2 = t2[r2];
    Xt$2(o2), e += o2.length;
  }
  const n = new Uint8Array(e);
  for (let r2 = 0, o2 = 0; r2 < t2.length; r2++) {
    const i2 = t2[r2];
    n.set(i2, o2), o2 += i2.length;
  }
  return n;
}
let ke$3 = class ke {
  clone() {
    return this._cloneInto();
  }
};
function Qn$1(t2) {
  const e = (r2) => t2().update($t$1(r2)).digest(), n = t2();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t2(), e;
}
function Lt$2(t2 = 32) {
  if (_t$2 && typeof _t$2.getRandomValues == "function") return _t$2.getRandomValues(new Uint8Array(t2));
  if (_t$2 && typeof _t$2.randomBytes == "function") return _t$2.randomBytes(t2);
  throw new Error("crypto.getRandomValues must be defined");
}
const tr$1 = [], er$1 = [], nr$1 = [], Mi$1 = BigInt(0), Jt$2 = BigInt(1), Di$1 = BigInt(2), Hi = BigInt(7), qi$1 = BigInt(256), Ki$1 = BigInt(113);
for (let t2 = 0, e = Jt$2, n = 1, r2 = 0; t2 < 24; t2++) {
  [n, r2] = [r2, (2 * n + 3 * r2) % 5], tr$1.push(2 * (5 * r2 + n)), er$1.push((t2 + 1) * (t2 + 2) / 2 % 64);
  let o2 = Mi$1;
  for (let i2 = 0; i2 < 7; i2++) e = (e << Jt$2 ^ (e >> Hi) * Ki$1) % qi$1, e & Di$1 && (o2 ^= Jt$2 << (Jt$2 << BigInt(i2)) - Jt$2);
  nr$1.push(o2);
}
const [Fi$1, zi$1] = Ri$1(nr$1, true), rr$1 = (t2, e, n) => n > 32 ? Li$1(t2, e, n) : _i$1(t2, e, n), or$1 = (t2, e, n) => n > 32 ? ji$1(t2, e, n) : $i$1(t2, e, n);
function Zi(t2, e = 24) {
  const n = new Uint32Array(10);
  for (let r2 = 24 - e; r2 < 24; r2++) {
    for (let s2 = 0; s2 < 10; s2++) n[s2] = t2[s2] ^ t2[s2 + 10] ^ t2[s2 + 20] ^ t2[s2 + 30] ^ t2[s2 + 40];
    for (let s2 = 0; s2 < 10; s2 += 2) {
      const c2 = (s2 + 8) % 10, a2 = (s2 + 2) % 10, u2 = n[a2], l2 = n[a2 + 1], f3 = rr$1(u2, l2, 1) ^ n[c2], h3 = or$1(u2, l2, 1) ^ n[c2 + 1];
      for (let y3 = 0; y3 < 50; y3 += 10) t2[s2 + y3] ^= f3, t2[s2 + y3 + 1] ^= h3;
    }
    let o2 = t2[2], i2 = t2[3];
    for (let s2 = 0; s2 < 24; s2++) {
      const c2 = er$1[s2], a2 = rr$1(o2, i2, c2), u2 = or$1(o2, i2, c2), l2 = tr$1[s2];
      o2 = t2[l2], i2 = t2[l2 + 1], t2[l2] = a2, t2[l2 + 1] = u2;
    }
    for (let s2 = 0; s2 < 50; s2 += 10) {
      for (let c2 = 0; c2 < 10; c2++) n[c2] = t2[s2 + c2];
      for (let c2 = 0; c2 < 10; c2++) t2[s2 + c2] ^= ~n[(c2 + 2) % 10] & n[(c2 + 4) % 10];
    }
    t2[0] ^= Fi$1[r2], t2[1] ^= zi$1[r2];
  }
  n.fill(0);
}
let En$1 = class En extends ke$3 {
  constructor(e, n, r2, o2 = false, i2 = 24) {
    if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r2, this.enableXOF = o2, this.rounds = i2, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Wt$2(r2), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ci$1(this.state);
  }
  keccak() {
    Xn$1 || Jn$1(this.state32), Zi(this.state32, this.rounds), Xn$1 || Jn$1(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    Rt$2(this);
    const { blockLen: n, state: r2 } = this;
    e = $t$1(e);
    const o2 = e.length;
    for (let i2 = 0; i2 < o2; ) {
      const s2 = Math.min(n - this.pos, o2 - i2);
      for (let c2 = 0; c2 < s2; c2++) r2[this.pos++] ^= e[i2++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: e, suffix: n, pos: r2, blockLen: o2 } = this;
    e[r2] ^= n, (n & 128) !== 0 && r2 === o2 - 1 && this.keccak(), e[o2 - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    Rt$2(this, false), Xt$2(e), this.finish();
    const n = this.state, { blockLen: r2 } = this;
    for (let o2 = 0, i2 = e.length; o2 < i2; ) {
      this.posOut >= r2 && this.keccak();
      const s2 = Math.min(r2 - this.posOut, i2 - o2);
      e.set(n.subarray(this.posOut, this.posOut + s2), o2), this.posOut += s2, o2 += s2;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return Wt$2(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (Gn$1(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: n, suffix: r2, outputLen: o2, rounds: i2, enableXOF: s2 } = this;
    return e || (e = new En(n, r2, o2, s2, i2)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i2, e.suffix = r2, e.outputLen = o2, e.enableXOF = s2, e.destroyed = this.destroyed, e;
  }
};
const Yi = (t2, e, n) => Qn$1(() => new En$1(e, t2, n)), Gi = Yi(1, 136, 256 / 8), Wi = "https://rpc.walletconnect.org/v1";
function Ve$2(t2) {
  const e = `Ethereum Signed Message:
${t2.length}`, n = new TextEncoder().encode(e + t2);
  return "0x" + Buffer.from(Gi(n)).toString("hex");
}
async function ir$1(t2, e, n, r2, o2, i2) {
  switch (n.t) {
    case "eip191":
      return await sr$1(t2, e, n.s);
    case "eip1271":
      return await cr$1(t2, e, n.s, r2, o2, i2);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n.t}`);
  }
}
async function sr$1(t2, e, n) {
  return (await recoverAddress({ hash: Ve$2(e), signature: n })).toLowerCase() === t2.toLowerCase();
}
async function cr$1(t2, e, n, r2, o2, i2) {
  const s2 = Ne$1(r2);
  if (!s2.namespace || !s2.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r2}`);
  try {
    const c2 = "0x1626ba7e", a2 = "0000000000000000000000000000000000000000000000000000000000000040", u2 = "0000000000000000000000000000000000000000000000000000000000000041", l2 = n.substring(2), f3 = Ve$2(e).substring(2), h3 = c2 + f3 + a2 + u2 + l2, y3 = await fetch(`${i2 || Wi}/?chainId=${r2}&projectId=${o2}`, { method: "POST", body: JSON.stringify({ id: Xi(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t2, data: h3 }, "latest"] }) }), { result: E2 } = await y3.json();
    return E2 ? E2.slice(0, c2.length).toLowerCase() === c2.toLowerCase() : false;
  } catch (c2) {
    return console.error("isValidEip1271Signature: ", c2), false;
  }
}
function Xi() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function Ji(t2) {
  const e = atob(t2), n = new Uint8Array(e.length);
  for (let s2 = 0; s2 < e.length; s2++) n[s2] = e.charCodeAt(s2);
  const r2 = n[0];
  if (r2 === 0) throw new Error("No signatures found");
  const o2 = 1 + r2 * 64;
  if (n.length < o2) throw new Error("Transaction data too short for claimed signature count");
  if (n.length < 100) throw new Error("Transaction too short");
  const i2 = Buffer.from(t2, "base64").slice(1, 65);
  return bs58.encode(i2);
}
var Qi = Object.defineProperty, ts$1 = Object.defineProperties, es = Object.getOwnPropertyDescriptors, ar$1 = Object.getOwnPropertySymbols, ns = Object.prototype.hasOwnProperty, rs = Object.prototype.propertyIsEnumerable, ur$1 = (t2, e, n) => e in t2 ? Qi(t2, e, { enumerable: true, configurable: true, writable: true, value: n }) : t2[e] = n, Me$3 = (t2, e) => {
  for (var n in e || (e = {})) ns.call(e, n) && ur$1(t2, n, e[n]);
  if (ar$1) for (var n of ar$1(e)) rs.call(e, n) && ur$1(t2, n, e[n]);
  return t2;
}, fr$1 = (t2, e) => ts$1(t2, es(e));
const os = "did:pkh:", de$2 = (t2) => t2 == null ? void 0 : t2.split(":"), lr$1 = (t2) => {
  const e = t2 && de$2(t2);
  if (e) return t2.includes(os) ? e[3] : e[1];
}, dr$1 = (t2) => {
  const e = t2 && de$2(t2);
  if (e) return e[2] + ":" + e[3];
}, De$2 = (t2) => {
  const e = t2 && de$2(t2);
  if (e) return e.pop();
};
async function is(t2) {
  const { cacao: e, projectId: n } = t2, { s: r2, p: o2 } = e, i2 = hr$1(o2, o2.iss), s2 = De$2(o2.iss);
  return await ir$1(s2, i2, r2, dr$1(o2.iss), n);
}
const hr$1 = (t2, e) => {
  const n = `${t2.domain} wants you to sign in with your Ethereum account:`, r2 = De$2(e);
  if (!t2.aud && !t2.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let o2 = t2.statement || void 0;
  const i2 = `URI: ${t2.aud || t2.uri}`, s2 = `Version: ${t2.version}`, c2 = `Chain ID: ${lr$1(e)}`, a2 = `Nonce: ${t2.nonce}`, u2 = `Issued At: ${t2.iat}`, l2 = t2.exp ? `Expiration Time: ${t2.exp}` : void 0, f3 = t2.nbf ? `Not Before: ${t2.nbf}` : void 0, h3 = t2.requestId ? `Request ID: ${t2.requestId}` : void 0, y3 = t2.resources ? `Resources:${t2.resources.map((p2) => `
- ${p2}`).join("")}` : void 0, E2 = pe$2(t2.resources);
  if (E2) {
    const p2 = yt$2(E2);
    o2 = Ke$3(o2, p2);
  }
  return [n, r2, "", o2, "", i2, s2, c2, a2, u2, l2, f3, h3, y3].filter((p2) => p2 != null).join(`
`);
};
function mr$1(t2) {
  return Buffer.from(JSON.stringify(t2)).toString("base64");
}
function wr$1(t2) {
  return JSON.parse(Buffer.from(t2, "base64").toString("utf-8"));
}
function at$1(t2) {
  if (!t2) throw new Error("No recap provided, value is undefined");
  if (!t2.att) throw new Error("No `att` property found");
  const e = Object.keys(t2.att);
  if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
  e.forEach((n) => {
    const r2 = t2.att[n];
    if (Array.isArray(r2)) throw new Error(`Resource must be an object: ${n}`);
    if (typeof r2 != "object") throw new Error(`Resource must be an object: ${n}`);
    if (!Object.keys(r2).length) throw new Error(`Resource object is empty: ${n}`);
    Object.keys(r2).forEach((o2) => {
      const i2 = r2[o2];
      if (!Array.isArray(i2)) throw new Error(`Ability limits ${o2} must be an array of objects, found: ${i2}`);
      if (!i2.length) throw new Error(`Value of ${o2} is empty array, must be an array with objects`);
      i2.forEach((s2) => {
        if (typeof s2 != "object") throw new Error(`Ability limits (${o2}) must be an array of objects, found: ${s2}`);
      });
    });
  });
}
function br$1(t2, e, n, r2 = {}) {
  return n == null ? void 0 : n.sort((o2, i2) => o2.localeCompare(i2)), { att: { [t2]: He$2(e, n, r2) } };
}
function He$2(t2, e, n = {}) {
  e = e == null ? void 0 : e.sort((o2, i2) => o2.localeCompare(i2));
  const r2 = e.map((o2) => ({ [`${t2}/${o2}`]: [n] }));
  return Object.assign({}, ...r2);
}
function he$2(t2) {
  return at$1(t2), `urn:recap:${mr$1(t2).replace(/=/g, "")}`;
}
function yt$2(t2) {
  const e = wr$1(t2.replace("urn:recap:", ""));
  return at$1(e), e;
}
function fs(t2, e, n) {
  const r2 = br$1(t2, e, n);
  return he$2(r2);
}
function qe$2(t2) {
  return t2 && t2.includes("urn:recap:");
}
function ls(t2, e) {
  const n = yt$2(t2), r2 = yt$2(e), o2 = vr$1(n, r2);
  return he$2(o2);
}
function vr$1(t2, e) {
  at$1(t2), at$1(e);
  const n = Object.keys(t2.att).concat(Object.keys(e.att)).sort((o2, i2) => o2.localeCompare(i2)), r2 = { att: {} };
  return n.forEach((o2) => {
    var i2, s2;
    Object.keys(((i2 = t2.att) == null ? void 0 : i2[o2]) || {}).concat(Object.keys(((s2 = e.att) == null ? void 0 : s2[o2]) || {})).sort((c2, a2) => c2.localeCompare(a2)).forEach((c2) => {
      var a2, u2;
      r2.att[o2] = fr$1(Me$3({}, r2.att[o2]), { [c2]: ((a2 = t2.att[o2]) == null ? void 0 : a2[c2]) || ((u2 = e.att[o2]) == null ? void 0 : u2[c2]) });
    });
  }), r2;
}
function Ke$3(t2 = "", e) {
  at$1(e);
  const n = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t2.includes(n)) return t2;
  const r2 = [];
  let o2 = 0;
  Object.keys(e.att).forEach((c2) => {
    const a2 = Object.keys(e.att[c2]).map((f3) => ({ ability: f3.split("/")[0], action: f3.split("/")[1] }));
    a2.sort((f3, h3) => f3.action.localeCompare(h3.action));
    const u2 = {};
    a2.forEach((f3) => {
      u2[f3.ability] || (u2[f3.ability] = []), u2[f3.ability].push(f3.action);
    });
    const l2 = Object.keys(u2).map((f3) => (o2++, `(${o2}) '${f3}': '${u2[f3].join("', '")}' for '${c2}'.`));
    r2.push(l2.join(", ").replace(".,", "."));
  });
  const i2 = r2.join(" "), s2 = `${n}${i2}`;
  return `${t2 ? t2 + " " : ""}${s2}`;
}
function ds(t2) {
  var e;
  const n = yt$2(t2);
  at$1(n);
  const r2 = (e = n.att) == null ? void 0 : e.eip155;
  return r2 ? Object.keys(r2).map((o2) => o2.split("/")[1]) : [];
}
function hs(t2) {
  const e = yt$2(t2);
  at$1(e);
  const n = [];
  return Object.values(e.att).forEach((r2) => {
    Object.values(r2).forEach((o2) => {
      var i2;
      (i2 = o2 == null ? void 0 : o2[0]) != null && i2.chains && n.push(o2[0].chains);
    });
  }), [...new Set(n.flat())];
}
function pe$2(t2) {
  if (!t2) return;
  const e = t2 == null ? void 0 : t2[t2.length - 1];
  return qe$2(e) ? e : void 0;
}
function Fe$2(t2) {
  if (!Number.isSafeInteger(t2) || t2 < 0) throw new Error("positive integer expected, got " + t2);
}
function Sr$1(t2) {
  return t2 instanceof Uint8Array || ArrayBuffer.isView(t2) && t2.constructor.name === "Uint8Array";
}
function tt(t2, ...e) {
  if (!Sr$1(t2)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t2.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t2.length);
}
function Or$1(t2, e = true) {
  if (t2.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t2.finished) throw new Error("Hash#digest() has already been called");
}
function ps(t2, e) {
  tt(t2);
  const n = e.outputLen;
  if (t2.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
}
function Ar$1(t2) {
  if (typeof t2 != "boolean") throw new Error(`boolean expected, not ${t2}`);
}
const mt$2 = (t2) => new Uint32Array(t2.buffer, t2.byteOffset, Math.floor(t2.byteLength / 4)), gs = (t2) => new DataView(t2.buffer, t2.byteOffset, t2.byteLength), ys = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!ys) throw new Error("Non little-endian hardware is not supported");
function ms(t2) {
  if (typeof t2 != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t2));
}
function ze$2(t2) {
  if (typeof t2 == "string") t2 = ms(t2);
  else if (Sr$1(t2)) t2 = Ze$2(t2);
  else throw new Error("Uint8Array expected, got " + typeof t2);
  return t2;
}
function ws(t2, e) {
  if (e == null || typeof e != "object") throw new Error("options must be defined");
  return Object.assign(t2, e);
}
function bs$1(t2, e) {
  if (t2.length !== e.length) return false;
  let n = 0;
  for (let r2 = 0; r2 < t2.length; r2++) n |= t2[r2] ^ e[r2];
  return n === 0;
}
const Es = (t2, e) => {
  function n(r2, ...o2) {
    if (tt(r2), t2.nonceLength !== void 0) {
      const l2 = o2[0];
      if (!l2) throw new Error("nonce / iv required");
      t2.varSizeNonce ? tt(l2) : tt(l2, t2.nonceLength);
    }
    const i2 = t2.tagLength;
    i2 && o2[1] !== void 0 && tt(o2[1]);
    const s2 = e(r2, ...o2), c2 = (l2, f3) => {
      if (f3 !== void 0) {
        if (l2 !== 2) throw new Error("cipher output not supported");
        tt(f3);
      }
    };
    let a2 = false;
    return { encrypt(l2, f3) {
      if (a2) throw new Error("cannot encrypt() twice with same key + nonce");
      return a2 = true, tt(l2), c2(s2.encrypt.length, f3), s2.encrypt(l2, f3);
    }, decrypt(l2, f3) {
      if (tt(l2), i2 && l2.length < i2) throw new Error("invalid ciphertext length: smaller than tagLength=" + i2);
      return c2(s2.decrypt.length, f3), s2.decrypt(l2, f3);
    } };
  }
  return Object.assign(n, t2), n;
};
function Br$1(t2, e, n = true) {
  if (e === void 0) return new Uint8Array(t2);
  if (e.length !== t2) throw new Error("invalid output length, expected " + t2 + ", got: " + e.length);
  if (n && !vs$1(e)) throw new Error("invalid output, must be aligned");
  return e;
}
function Ir$1(t2, e, n, r2) {
  if (typeof t2.setBigUint64 == "function") return t2.setBigUint64(e, n, r2);
  const o2 = BigInt(32), i2 = BigInt(4294967295), s2 = Number(n >> o2 & i2), c2 = Number(n & i2), a2 = 4, u2 = 0;
  t2.setUint32(e + a2, s2, r2), t2.setUint32(e + u2, c2, r2);
}
function vs$1(t2) {
  return t2.byteOffset % 4 === 0;
}
function Ze$2(t2) {
  return Uint8Array.from(t2);
}
function jt$2(...t2) {
  for (let e = 0; e < t2.length; e++) t2[e].fill(0);
}
const Nr$1 = (t2) => Uint8Array.from(t2.split("").map((e) => e.charCodeAt(0))), xs$1 = Nr$1("expand 16-byte k"), Ss = Nr$1("expand 32-byte k"), Os$1 = mt$2(xs$1), As$1 = mt$2(Ss);
function V$2(t2, e) {
  return t2 << e | t2 >>> 32 - e;
}
function Ye$2(t2) {
  return t2.byteOffset % 4 === 0;
}
const ge$2 = 64, Bs = 16, Ur$1 = 2 ** 32 - 1, Tr$1 = new Uint32Array();
function Is$1(t2, e, n, r2, o2, i2, s2, c2) {
  const a2 = o2.length, u2 = new Uint8Array(ge$2), l2 = mt$2(u2), f3 = Ye$2(o2) && Ye$2(i2), h3 = f3 ? mt$2(o2) : Tr$1, y3 = f3 ? mt$2(i2) : Tr$1;
  for (let E2 = 0; E2 < a2; s2++) {
    if (t2(e, n, r2, l2, s2, c2), s2 >= Ur$1) throw new Error("arx: counter overflow");
    const p2 = Math.min(ge$2, a2 - E2);
    if (f3 && p2 === ge$2) {
      const d3 = E2 / 4;
      if (E2 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let v2 = 0, m2; v2 < Bs; v2++) m2 = d3 + v2, y3[m2] = h3[m2] ^ l2[v2];
      E2 += ge$2;
      continue;
    }
    for (let d3 = 0, v2; d3 < p2; d3++) v2 = E2 + d3, i2[v2] = o2[v2] ^ u2[d3];
    E2 += p2;
  }
}
function Ns$1(t2, e) {
  const { allowShortKeys: n, extendNonceFn: r2, counterLength: o2, counterRight: i2, rounds: s2 } = ws({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, e);
  if (typeof t2 != "function") throw new Error("core must be a function");
  return Fe$2(o2), Fe$2(s2), Ar$1(i2), Ar$1(n), (c2, a2, u2, l2, f3 = 0) => {
    tt(c2), tt(a2), tt(u2);
    const h3 = u2.length;
    if (l2 === void 0 && (l2 = new Uint8Array(h3)), tt(l2), Fe$2(f3), f3 < 0 || f3 >= Ur$1) throw new Error("arx: counter overflow");
    if (l2.length < h3) throw new Error(`arx: output (${l2.length}) is shorter than data (${h3})`);
    const y3 = [];
    let E2 = c2.length, p2, d3;
    if (E2 === 32) y3.push(p2 = Ze$2(c2)), d3 = As$1;
    else if (E2 === 16 && n) p2 = new Uint8Array(32), p2.set(c2), p2.set(c2, 16), d3 = Os$1, y3.push(p2);
    else throw new Error(`arx: invalid 32-byte key, got length=${E2}`);
    Ye$2(a2) || y3.push(a2 = Ze$2(a2));
    const v2 = mt$2(p2);
    if (r2) {
      if (a2.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r2(d3, v2, mt$2(a2.subarray(0, 16)), v2), a2 = a2.subarray(16);
    }
    const m2 = 16 - o2;
    if (m2 !== a2.length) throw new Error(`arx: nonce must be ${m2} or 16 bytes`);
    if (m2 !== 12) {
      const N2 = new Uint8Array(12);
      N2.set(a2, i2 ? 0 : 12 - a2.length), a2 = N2, y3.push(a2);
    }
    const O3 = mt$2(a2);
    return Is$1(t2, d3, v2, O3, u2, l2, f3, s2), jt$2(...y3), l2;
  };
}
const F$2 = (t2, e) => t2[e++] & 255 | (t2[e++] & 255) << 8;
class Us {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, e = ze$2(e), tt(e, 32);
    const n = F$2(e, 0), r2 = F$2(e, 2), o2 = F$2(e, 4), i2 = F$2(e, 6), s2 = F$2(e, 8), c2 = F$2(e, 10), a2 = F$2(e, 12), u2 = F$2(e, 14);
    this.r[0] = n & 8191, this.r[1] = (n >>> 13 | r2 << 3) & 8191, this.r[2] = (r2 >>> 10 | o2 << 6) & 7939, this.r[3] = (o2 >>> 7 | i2 << 9) & 8191, this.r[4] = (i2 >>> 4 | s2 << 12) & 255, this.r[5] = s2 >>> 1 & 8190, this.r[6] = (s2 >>> 14 | c2 << 2) & 8191, this.r[7] = (c2 >>> 11 | a2 << 5) & 8065, this.r[8] = (a2 >>> 8 | u2 << 8) & 8191, this.r[9] = u2 >>> 5 & 127;
    for (let l2 = 0; l2 < 8; l2++) this.pad[l2] = F$2(e, 16 + 2 * l2);
  }
  process(e, n, r2 = false) {
    const o2 = r2 ? 0 : 2048, { h: i2, r: s2 } = this, c2 = s2[0], a2 = s2[1], u2 = s2[2], l2 = s2[3], f3 = s2[4], h3 = s2[5], y3 = s2[6], E2 = s2[7], p2 = s2[8], d3 = s2[9], v2 = F$2(e, n + 0), m2 = F$2(e, n + 2), O3 = F$2(e, n + 4), N2 = F$2(e, n + 6), $2 = F$2(e, n + 8), B2 = F$2(e, n + 10), A2 = F$2(e, n + 12), T2 = F$2(e, n + 14);
    let S3 = i2[0] + (v2 & 8191), L2 = i2[1] + ((v2 >>> 13 | m2 << 3) & 8191), U2 = i2[2] + ((m2 >>> 10 | O3 << 6) & 8191), _ = i2[3] + ((O3 >>> 7 | N2 << 9) & 8191), j2 = i2[4] + ((N2 >>> 4 | $2 << 12) & 8191), g = i2[5] + ($2 >>> 1 & 8191), w2 = i2[6] + (($2 >>> 14 | B2 << 2) & 8191), b2 = i2[7] + ((B2 >>> 11 | A2 << 5) & 8191), I3 = i2[8] + ((A2 >>> 8 | T2 << 8) & 8191), R3 = i2[9] + (T2 >>> 5 | o2), x2 = 0, C2 = x2 + S3 * c2 + L2 * (5 * d3) + U2 * (5 * p2) + _ * (5 * E2) + j2 * (5 * y3);
    x2 = C2 >>> 13, C2 &= 8191, C2 += g * (5 * h3) + w2 * (5 * f3) + b2 * (5 * l2) + I3 * (5 * u2) + R3 * (5 * a2), x2 += C2 >>> 13, C2 &= 8191;
    let P3 = x2 + S3 * a2 + L2 * c2 + U2 * (5 * d3) + _ * (5 * p2) + j2 * (5 * E2);
    x2 = P3 >>> 13, P3 &= 8191, P3 += g * (5 * y3) + w2 * (5 * h3) + b2 * (5 * f3) + I3 * (5 * l2) + R3 * (5 * u2), x2 += P3 >>> 13, P3 &= 8191;
    let k2 = x2 + S3 * u2 + L2 * a2 + U2 * c2 + _ * (5 * d3) + j2 * (5 * p2);
    x2 = k2 >>> 13, k2 &= 8191, k2 += g * (5 * E2) + w2 * (5 * y3) + b2 * (5 * h3) + I3 * (5 * f3) + R3 * (5 * l2), x2 += k2 >>> 13, k2 &= 8191;
    let M3 = x2 + S3 * l2 + L2 * u2 + U2 * a2 + _ * c2 + j2 * (5 * d3);
    x2 = M3 >>> 13, M3 &= 8191, M3 += g * (5 * p2) + w2 * (5 * E2) + b2 * (5 * y3) + I3 * (5 * h3) + R3 * (5 * f3), x2 += M3 >>> 13, M3 &= 8191;
    let D2 = x2 + S3 * f3 + L2 * l2 + U2 * u2 + _ * a2 + j2 * c2;
    x2 = D2 >>> 13, D2 &= 8191, D2 += g * (5 * d3) + w2 * (5 * p2) + b2 * (5 * E2) + I3 * (5 * y3) + R3 * (5 * h3), x2 += D2 >>> 13, D2 &= 8191;
    let z2 = x2 + S3 * h3 + L2 * f3 + U2 * l2 + _ * u2 + j2 * a2;
    x2 = z2 >>> 13, z2 &= 8191, z2 += g * c2 + w2 * (5 * d3) + b2 * (5 * p2) + I3 * (5 * E2) + R3 * (5 * y3), x2 += z2 >>> 13, z2 &= 8191;
    let Z = x2 + S3 * y3 + L2 * h3 + U2 * f3 + _ * l2 + j2 * u2;
    x2 = Z >>> 13, Z &= 8191, Z += g * a2 + w2 * c2 + b2 * (5 * d3) + I3 * (5 * p2) + R3 * (5 * E2), x2 += Z >>> 13, Z &= 8191;
    let st2 = x2 + S3 * E2 + L2 * y3 + U2 * h3 + _ * f3 + j2 * l2;
    x2 = st2 >>> 13, st2 &= 8191, st2 += g * u2 + w2 * a2 + b2 * c2 + I3 * (5 * d3) + R3 * (5 * p2), x2 += st2 >>> 13, st2 &= 8191;
    let W2 = x2 + S3 * p2 + L2 * E2 + U2 * y3 + _ * h3 + j2 * f3;
    x2 = W2 >>> 13, W2 &= 8191, W2 += g * l2 + w2 * u2 + b2 * a2 + I3 * c2 + R3 * (5 * d3), x2 += W2 >>> 13, W2 &= 8191;
    let J3 = x2 + S3 * d3 + L2 * p2 + U2 * E2 + _ * y3 + j2 * h3;
    x2 = J3 >>> 13, J3 &= 8191, J3 += g * f3 + w2 * l2 + b2 * u2 + I3 * a2 + R3 * c2, x2 += J3 >>> 13, J3 &= 8191, x2 = (x2 << 2) + x2 | 0, x2 = x2 + C2 | 0, C2 = x2 & 8191, x2 = x2 >>> 13, P3 += x2, i2[0] = C2, i2[1] = P3, i2[2] = k2, i2[3] = M3, i2[4] = D2, i2[5] = z2, i2[6] = Z, i2[7] = st2, i2[8] = W2, i2[9] = J3;
  }
  finalize() {
    const { h: e, pad: n } = this, r2 = new Uint16Array(10);
    let o2 = e[1] >>> 13;
    e[1] &= 8191;
    for (let c2 = 2; c2 < 10; c2++) e[c2] += o2, o2 = e[c2] >>> 13, e[c2] &= 8191;
    e[0] += o2 * 5, o2 = e[0] >>> 13, e[0] &= 8191, e[1] += o2, o2 = e[1] >>> 13, e[1] &= 8191, e[2] += o2, r2[0] = e[0] + 5, o2 = r2[0] >>> 13, r2[0] &= 8191;
    for (let c2 = 1; c2 < 10; c2++) r2[c2] = e[c2] + o2, o2 = r2[c2] >>> 13, r2[c2] &= 8191;
    r2[9] -= 8192;
    let i2 = (o2 ^ 1) - 1;
    for (let c2 = 0; c2 < 10; c2++) r2[c2] &= i2;
    i2 = ~i2;
    for (let c2 = 0; c2 < 10; c2++) e[c2] = e[c2] & i2 | r2[c2];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let s2 = e[0] + n[0];
    e[0] = s2 & 65535;
    for (let c2 = 1; c2 < 8; c2++) s2 = (e[c2] + n[c2] | 0) + (s2 >>> 16) | 0, e[c2] = s2 & 65535;
    jt$2(r2);
  }
  update(e) {
    Or$1(this);
    const { buffer: n, blockLen: r2 } = this;
    e = ze$2(e);
    const o2 = e.length;
    for (let i2 = 0; i2 < o2; ) {
      const s2 = Math.min(r2 - this.pos, o2 - i2);
      if (s2 === r2) {
        for (; r2 <= o2 - i2; i2 += r2) this.process(e, i2);
        continue;
      }
      n.set(e.subarray(i2, i2 + s2), this.pos), this.pos += s2, i2 += s2, this.pos === r2 && (this.process(n, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    jt$2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    Or$1(this), ps(e, this), this.finished = true;
    const { buffer: n, h: r2 } = this;
    let { pos: o2 } = this;
    if (o2) {
      for (n[o2++] = 1; o2 < 16; o2++) n[o2] = 0;
      this.process(n, 0, true);
    }
    this.finalize();
    let i2 = 0;
    for (let s2 = 0; s2 < 8; s2++) e[i2++] = r2[s2] >>> 0, e[i2++] = r2[s2] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: n } = this;
    this.digestInto(e);
    const r2 = e.slice(0, n);
    return this.destroy(), r2;
  }
}
function Ts$1(t2) {
  const e = (r2, o2) => t2(o2).update(ze$2(r2)).digest(), n = t2(new Uint8Array(32));
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r2) => t2(r2), e;
}
const Rs = Ts$1((t2) => new Us(t2));
function _s(t2, e, n, r2, o2, i2 = 20) {
  let s2 = t2[0], c2 = t2[1], a2 = t2[2], u2 = t2[3], l2 = e[0], f3 = e[1], h3 = e[2], y3 = e[3], E2 = e[4], p2 = e[5], d3 = e[6], v2 = e[7], m2 = o2, O3 = n[0], N2 = n[1], $2 = n[2], B2 = s2, A2 = c2, T2 = a2, S3 = u2, L2 = l2, U2 = f3, _ = h3, j2 = y3, g = E2, w2 = p2, b2 = d3, I3 = v2, R3 = m2, x2 = O3, C2 = N2, P3 = $2;
  for (let M3 = 0; M3 < i2; M3 += 2) B2 = B2 + L2 | 0, R3 = V$2(R3 ^ B2, 16), g = g + R3 | 0, L2 = V$2(L2 ^ g, 12), B2 = B2 + L2 | 0, R3 = V$2(R3 ^ B2, 8), g = g + R3 | 0, L2 = V$2(L2 ^ g, 7), A2 = A2 + U2 | 0, x2 = V$2(x2 ^ A2, 16), w2 = w2 + x2 | 0, U2 = V$2(U2 ^ w2, 12), A2 = A2 + U2 | 0, x2 = V$2(x2 ^ A2, 8), w2 = w2 + x2 | 0, U2 = V$2(U2 ^ w2, 7), T2 = T2 + _ | 0, C2 = V$2(C2 ^ T2, 16), b2 = b2 + C2 | 0, _ = V$2(_ ^ b2, 12), T2 = T2 + _ | 0, C2 = V$2(C2 ^ T2, 8), b2 = b2 + C2 | 0, _ = V$2(_ ^ b2, 7), S3 = S3 + j2 | 0, P3 = V$2(P3 ^ S3, 16), I3 = I3 + P3 | 0, j2 = V$2(j2 ^ I3, 12), S3 = S3 + j2 | 0, P3 = V$2(P3 ^ S3, 8), I3 = I3 + P3 | 0, j2 = V$2(j2 ^ I3, 7), B2 = B2 + U2 | 0, P3 = V$2(P3 ^ B2, 16), b2 = b2 + P3 | 0, U2 = V$2(U2 ^ b2, 12), B2 = B2 + U2 | 0, P3 = V$2(P3 ^ B2, 8), b2 = b2 + P3 | 0, U2 = V$2(U2 ^ b2, 7), A2 = A2 + _ | 0, R3 = V$2(R3 ^ A2, 16), I3 = I3 + R3 | 0, _ = V$2(_ ^ I3, 12), A2 = A2 + _ | 0, R3 = V$2(R3 ^ A2, 8), I3 = I3 + R3 | 0, _ = V$2(_ ^ I3, 7), T2 = T2 + j2 | 0, x2 = V$2(x2 ^ T2, 16), g = g + x2 | 0, j2 = V$2(j2 ^ g, 12), T2 = T2 + j2 | 0, x2 = V$2(x2 ^ T2, 8), g = g + x2 | 0, j2 = V$2(j2 ^ g, 7), S3 = S3 + L2 | 0, C2 = V$2(C2 ^ S3, 16), w2 = w2 + C2 | 0, L2 = V$2(L2 ^ w2, 12), S3 = S3 + L2 | 0, C2 = V$2(C2 ^ S3, 8), w2 = w2 + C2 | 0, L2 = V$2(L2 ^ w2, 7);
  let k2 = 0;
  r2[k2++] = s2 + B2 | 0, r2[k2++] = c2 + A2 | 0, r2[k2++] = a2 + T2 | 0, r2[k2++] = u2 + S3 | 0, r2[k2++] = l2 + L2 | 0, r2[k2++] = f3 + U2 | 0, r2[k2++] = h3 + _ | 0, r2[k2++] = y3 + j2 | 0, r2[k2++] = E2 + g | 0, r2[k2++] = p2 + w2 | 0, r2[k2++] = d3 + b2 | 0, r2[k2++] = v2 + I3 | 0, r2[k2++] = m2 + R3 | 0, r2[k2++] = O3 + x2 | 0, r2[k2++] = N2 + C2 | 0, r2[k2++] = $2 + P3 | 0;
}
const $s = Ns$1(_s, { counterRight: false, counterLength: 4, allowShortKeys: false }), Ls$1 = new Uint8Array(16), Rr$1 = (t2, e) => {
  t2.update(e);
  const n = e.length % 16;
  n && t2.update(Ls$1.subarray(n));
}, js = new Uint8Array(32);
function _r$1(t2, e, n, r2, o2) {
  const i2 = t2(e, n, js), s2 = Rs.create(i2);
  o2 && Rr$1(s2, o2), Rr$1(s2, r2);
  const c2 = new Uint8Array(16), a2 = gs(c2);
  Ir$1(a2, 0, BigInt(o2 ? o2.length : 0), true), Ir$1(a2, 8, BigInt(r2.length), true), s2.update(c2);
  const u2 = s2.digest();
  return jt$2(i2, c2), u2;
}
const Cs$1 = (t2) => (e, n, r2) => ({ encrypt(i2, s2) {
  const c2 = i2.length;
  s2 = Br$1(c2 + 16, s2, false), s2.set(i2);
  const a2 = s2.subarray(0, -16);
  t2(e, n, a2, a2, 1);
  const u2 = _r$1(t2, e, n, a2, r2);
  return s2.set(u2, c2), jt$2(u2), s2;
}, decrypt(i2, s2) {
  s2 = Br$1(i2.length - 16, s2, false);
  const c2 = i2.subarray(0, -16), a2 = i2.subarray(-16), u2 = _r$1(t2, e, n, c2, r2);
  if (!bs$1(a2, u2)) throw new Error("invalid tag");
  return s2.set(i2.subarray(0, -16)), t2(e, n, s2, s2, 1), jt$2(u2), s2;
} }), $r$1 = Es({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Cs$1($s));
let Lr$1 = class Lr extends ke$3 {
  constructor(e, n) {
    super(), this.finished = false, this.destroyed = false, Ce$1(e);
    const r2 = $t$1(n);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o2 = this.blockLen, i2 = new Uint8Array(o2);
    i2.set(r2.length > o2 ? e.create().update(r2).digest() : r2);
    for (let s2 = 0; s2 < i2.length; s2++) i2[s2] ^= 54;
    this.iHash.update(i2), this.oHash = e.create();
    for (let s2 = 0; s2 < i2.length; s2++) i2[s2] ^= 106;
    this.oHash.update(i2), i2.fill(0);
  }
  update(e) {
    return Rt$2(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    Rt$2(this), Xt$2(e, this.outputLen), this.finished = true, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r2, finished: o2, destroyed: i2, blockLen: s2, outputLen: c2 } = this;
    return e = e, e.finished = o2, e.destroyed = i2, e.blockLen = s2, e.outputLen = c2, e.oHash = n._cloneInto(e.oHash), e.iHash = r2._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
const ye$2 = (t2, e, n) => new Lr$1(t2, e).update(n).digest();
ye$2.create = (t2, e) => new Lr$1(t2, e);
function Ps$1(t2, e, n) {
  return Ce$1(t2), n === void 0 && (n = new Uint8Array(t2.outputLen)), ye$2(t2, $t$1(n), $t$1(e));
}
const Ge$3 = new Uint8Array([0]), jr$1 = new Uint8Array();
function ks$1(t2, e, n, r2 = 32) {
  if (Ce$1(t2), Wt$2(r2), r2 > 255 * t2.outputLen) throw new Error("Length should be <= 255*HashLen");
  const o2 = Math.ceil(r2 / t2.outputLen);
  n === void 0 && (n = jr$1);
  const i2 = new Uint8Array(o2 * t2.outputLen), s2 = ye$2.create(t2, e), c2 = s2._cloneInto(), a2 = new Uint8Array(s2.outputLen);
  for (let u2 = 0; u2 < o2; u2++) Ge$3[0] = u2 + 1, c2.update(u2 === 0 ? jr$1 : a2).update(n).update(Ge$3).digestInto(a2), i2.set(a2, t2.outputLen * u2), s2._cloneInto(c2);
  return s2.destroy(), c2.destroy(), a2.fill(0), Ge$3.fill(0), i2.slice(0, r2);
}
const Vs$1 = (t2, e, n, r2, o2) => ks$1(t2, Ps$1(t2, e, n), r2, o2);
function Ms$1(t2, e, n, r2) {
  if (typeof t2.setBigUint64 == "function") return t2.setBigUint64(e, n, r2);
  const o2 = BigInt(32), i2 = BigInt(4294967295), s2 = Number(n >> o2 & i2), c2 = Number(n & i2), a2 = r2 ? 4 : 0, u2 = r2 ? 0 : 4;
  t2.setUint32(e + a2, s2, r2), t2.setUint32(e + u2, c2, r2);
}
function Ds$1(t2, e, n) {
  return t2 & e ^ ~t2 & n;
}
function Hs(t2, e, n) {
  return t2 & e ^ t2 & n ^ e & n;
}
let qs$1 = class qs extends ke$3 {
  constructor(e, n, r2, o2) {
    super(), this.blockLen = e, this.outputLen = n, this.padOffset = r2, this.isLE = o2, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e), this.view = Pe$1(this.buffer);
  }
  update(e) {
    Rt$2(this);
    const { view: n, buffer: r2, blockLen: o2 } = this;
    e = $t$1(e);
    const i2 = e.length;
    for (let s2 = 0; s2 < i2; ) {
      const c2 = Math.min(o2 - this.pos, i2 - s2);
      if (c2 === o2) {
        const a2 = Pe$1(e);
        for (; o2 <= i2 - s2; s2 += o2) this.process(a2, s2);
        continue;
      }
      r2.set(e.subarray(s2, s2 + c2), this.pos), this.pos += c2, s2 += c2, this.pos === o2 && (this.process(n, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Rt$2(this), Gn$1(e, this), this.finished = true;
    const { buffer: n, view: r2, blockLen: o2, isLE: i2 } = this;
    let { pos: s2 } = this;
    n[s2++] = 128, this.buffer.subarray(s2).fill(0), this.padOffset > o2 - s2 && (this.process(r2, 0), s2 = 0);
    for (let f3 = s2; f3 < o2; f3++) n[f3] = 0;
    Ms$1(r2, o2 - 8, BigInt(this.length * 8), i2), this.process(r2, 0);
    const c2 = Pe$1(e), a2 = this.outputLen;
    if (a2 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u2 = a2 / 4, l2 = this.get();
    if (u2 > l2.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f3 = 0; f3 < u2; f3++) c2.setUint32(4 * f3, l2[f3], i2);
  }
  digest() {
    const { buffer: e, outputLen: n } = this;
    this.digestInto(e);
    const r2 = e.slice(0, n);
    return this.destroy(), r2;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: n, buffer: r2, length: o2, finished: i2, destroyed: s2, pos: c2 } = this;
    return e.length = o2, e.pos = c2, e.finished = i2, e.destroyed = s2, o2 % n && e.buffer.set(r2), e;
  }
};
const Ks = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), wt$2 = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), bt$1 = new Uint32Array(64);
class Fs extends qs$1 {
  constructor() {
    super(64, 32, 8, false), this.A = wt$2[0] | 0, this.B = wt$2[1] | 0, this.C = wt$2[2] | 0, this.D = wt$2[3] | 0, this.E = wt$2[4] | 0, this.F = wt$2[5] | 0, this.G = wt$2[6] | 0, this.H = wt$2[7] | 0;
  }
  get() {
    const { A: e, B: n, C: r2, D: o2, E: i2, F: s2, G: c2, H: a2 } = this;
    return [e, n, r2, o2, i2, s2, c2, a2];
  }
  set(e, n, r2, o2, i2, s2, c2, a2) {
    this.A = e | 0, this.B = n | 0, this.C = r2 | 0, this.D = o2 | 0, this.E = i2 | 0, this.F = s2 | 0, this.G = c2 | 0, this.H = a2 | 0;
  }
  process(e, n) {
    for (let f3 = 0; f3 < 16; f3++, n += 4) bt$1[f3] = e.getUint32(n, false);
    for (let f3 = 16; f3 < 64; f3++) {
      const h3 = bt$1[f3 - 15], y3 = bt$1[f3 - 2], E2 = ct$1(h3, 7) ^ ct$1(h3, 18) ^ h3 >>> 3, p2 = ct$1(y3, 17) ^ ct$1(y3, 19) ^ y3 >>> 10;
      bt$1[f3] = p2 + bt$1[f3 - 7] + E2 + bt$1[f3 - 16] | 0;
    }
    let { A: r2, B: o2, C: i2, D: s2, E: c2, F: a2, G: u2, H: l2 } = this;
    for (let f3 = 0; f3 < 64; f3++) {
      const h3 = ct$1(c2, 6) ^ ct$1(c2, 11) ^ ct$1(c2, 25), y3 = l2 + h3 + Ds$1(c2, a2, u2) + Ks[f3] + bt$1[f3] | 0, p2 = (ct$1(r2, 2) ^ ct$1(r2, 13) ^ ct$1(r2, 22)) + Hs(r2, o2, i2) | 0;
      l2 = u2, u2 = a2, a2 = c2, c2 = s2 + y3 | 0, s2 = i2, i2 = o2, o2 = r2, r2 = y3 + p2 | 0;
    }
    r2 = r2 + this.A | 0, o2 = o2 + this.B | 0, i2 = i2 + this.C | 0, s2 = s2 + this.D | 0, c2 = c2 + this.E | 0, a2 = a2 + this.F | 0, u2 = u2 + this.G | 0, l2 = l2 + this.H | 0, this.set(r2, o2, i2, s2, c2, a2, u2, l2);
  }
  roundClean() {
    bt$1.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Qt$2 = Qn$1(() => new Fs());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const me$2 = BigInt(0), we$2 = BigInt(1), zs = BigInt(2);
function St$3(t2) {
  return t2 instanceof Uint8Array || ArrayBuffer.isView(t2) && t2.constructor.name === "Uint8Array";
}
function te$1(t2) {
  if (!St$3(t2)) throw new Error("Uint8Array expected");
}
function Ct$1(t2, e) {
  if (typeof e != "boolean") throw new Error(t2 + " boolean expected, got " + e);
}
const Zs$1 = Array.from({ length: 256 }, (t2, e) => e.toString(16).padStart(2, "0"));
function Pt$2(t2) {
  te$1(t2);
  let e = "";
  for (let n = 0; n < t2.length; n++) e += Zs$1[t2[n]];
  return e;
}
function kt$2(t2) {
  const e = t2.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function We$2(t2) {
  if (typeof t2 != "string") throw new Error("hex string expected, got " + typeof t2);
  return t2 === "" ? me$2 : BigInt("0x" + t2);
}
const ut$2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Cr$1(t2) {
  if (t2 >= ut$2._0 && t2 <= ut$2._9) return t2 - ut$2._0;
  if (t2 >= ut$2.A && t2 <= ut$2.F) return t2 - (ut$2.A - 10);
  if (t2 >= ut$2.a && t2 <= ut$2.f) return t2 - (ut$2.a - 10);
}
function Vt$2(t2) {
  if (typeof t2 != "string") throw new Error("hex string expected, got " + typeof t2);
  const e = t2.length, n = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const r2 = new Uint8Array(n);
  for (let o2 = 0, i2 = 0; o2 < n; o2++, i2 += 2) {
    const s2 = Cr$1(t2.charCodeAt(i2)), c2 = Cr$1(t2.charCodeAt(i2 + 1));
    if (s2 === void 0 || c2 === void 0) {
      const a2 = t2[i2] + t2[i2 + 1];
      throw new Error('hex string expected, got non-hex character "' + a2 + '" at index ' + i2);
    }
    r2[o2] = s2 * 16 + c2;
  }
  return r2;
}
function Ot$1(t2) {
  return We$2(Pt$2(t2));
}
function ee$1(t2) {
  return te$1(t2), We$2(Pt$2(Uint8Array.from(t2).reverse()));
}
function Mt$2(t2, e) {
  return Vt$2(t2.toString(16).padStart(e * 2, "0"));
}
function be$2(t2, e) {
  return Mt$2(t2, e).reverse();
}
function Ys(t2) {
  return Vt$2(kt$2(t2));
}
function et$1(t2, e, n) {
  let r2;
  if (typeof e == "string") try {
    r2 = Vt$2(e);
  } catch (i2) {
    throw new Error(t2 + " must be hex string or Uint8Array, cause: " + i2);
  }
  else if (St$3(e)) r2 = Uint8Array.from(e);
  else throw new Error(t2 + " must be hex string or Uint8Array");
  const o2 = r2.length;
  if (typeof n == "number" && o2 !== n) throw new Error(t2 + " of length " + n + " expected, got " + o2);
  return r2;
}
function ne$2(...t2) {
  let e = 0;
  for (let r2 = 0; r2 < t2.length; r2++) {
    const o2 = t2[r2];
    te$1(o2), e += o2.length;
  }
  const n = new Uint8Array(e);
  for (let r2 = 0, o2 = 0; r2 < t2.length; r2++) {
    const i2 = t2[r2];
    n.set(i2, o2), o2 += i2.length;
  }
  return n;
}
function Gs(t2, e) {
  if (t2.length !== e.length) return false;
  let n = 0;
  for (let r2 = 0; r2 < t2.length; r2++) n |= t2[r2] ^ e[r2];
  return n === 0;
}
function Ws(t2) {
  if (typeof t2 != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t2));
}
const Xe$2 = (t2) => typeof t2 == "bigint" && me$2 <= t2;
function Ee$3(t2, e, n) {
  return Xe$2(t2) && Xe$2(e) && Xe$2(n) && e <= t2 && t2 < n;
}
function ft$2(t2, e, n, r2) {
  if (!Ee$3(e, n, r2)) throw new Error("expected valid " + t2 + ": " + n + " <= n < " + r2 + ", got " + e);
}
function Pr$1(t2) {
  let e;
  for (e = 0; t2 > me$2; t2 >>= we$2, e += 1) ;
  return e;
}
function Xs(t2, e) {
  return t2 >> BigInt(e) & we$2;
}
function Js(t2, e, n) {
  return t2 | (n ? we$2 : me$2) << BigInt(e);
}
const Je$2 = (t2) => (zs << BigInt(t2 - 1)) - we$2, Qe$2 = (t2) => new Uint8Array(t2), kr$1 = (t2) => Uint8Array.from(t2);
function Vr$1(t2, e, n) {
  if (typeof t2 != "number" || t2 < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof n != "function") throw new Error("hmacFn must be a function");
  let r2 = Qe$2(t2), o2 = Qe$2(t2), i2 = 0;
  const s2 = () => {
    r2.fill(1), o2.fill(0), i2 = 0;
  }, c2 = (...f3) => n(o2, r2, ...f3), a2 = (f3 = Qe$2()) => {
    o2 = c2(kr$1([0]), f3), r2 = c2(), f3.length !== 0 && (o2 = c2(kr$1([1]), f3), r2 = c2());
  }, u2 = () => {
    if (i2++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let f3 = 0;
    const h3 = [];
    for (; f3 < e; ) {
      r2 = c2();
      const y3 = r2.slice();
      h3.push(y3), f3 += r2.length;
    }
    return ne$2(...h3);
  };
  return (f3, h3) => {
    s2(), a2(f3);
    let y3;
    for (; !(y3 = h3(u2())); ) a2();
    return s2(), y3;
  };
}
const Qs = { bigint: (t2) => typeof t2 == "bigint", function: (t2) => typeof t2 == "function", boolean: (t2) => typeof t2 == "boolean", string: (t2) => typeof t2 == "string", stringOrUint8Array: (t2) => typeof t2 == "string" || St$3(t2), isSafeInteger: (t2) => Number.isSafeInteger(t2), array: (t2) => Array.isArray(t2), field: (t2, e) => e.Fp.isValid(t2), hash: (t2) => typeof t2 == "function" && Number.isSafeInteger(t2.outputLen) };
function Dt$1(t2, e, n = {}) {
  const r2 = (o2, i2, s2) => {
    const c2 = Qs[i2];
    if (typeof c2 != "function") throw new Error("invalid validator function");
    const a2 = t2[o2];
    if (!(s2 && a2 === void 0) && !c2(a2, t2)) throw new Error("param " + String(o2) + " is invalid. Expected " + i2 + ", got " + a2);
  };
  for (const [o2, i2] of Object.entries(e)) r2(o2, i2, false);
  for (const [o2, i2] of Object.entries(n)) r2(o2, i2, true);
  return t2;
}
const tc = () => {
  throw new Error("not implemented");
};
function tn$1(t2) {
  const e = /* @__PURE__ */ new WeakMap();
  return (n, ...r2) => {
    const o2 = e.get(n);
    if (o2 !== void 0) return o2;
    const i2 = t2(n, ...r2);
    return e.set(n, i2), i2;
  };
}
var ec = Object.freeze({ __proto__: null, isBytes: St$3, abytes: te$1, abool: Ct$1, bytesToHex: Pt$2, numberToHexUnpadded: kt$2, hexToNumber: We$2, hexToBytes: Vt$2, bytesToNumberBE: Ot$1, bytesToNumberLE: ee$1, numberToBytesBE: Mt$2, numberToBytesLE: be$2, numberToVarBytesBE: Ys, ensureBytes: et$1, concatBytes: ne$2, equalBytes: Gs, utf8ToBytes: Ws, inRange: Ee$3, aInRange: ft$2, bitLen: Pr$1, bitGet: Xs, bitSet: Js, bitMask: Je$2, createHmacDrbg: Vr$1, validateObject: Dt$1, notImplemented: tc, memoized: tn$1 });
const q$1 = BigInt(0), H$1 = BigInt(1), At$1 = BigInt(2), nc = BigInt(3), en = BigInt(4), Mr$1 = BigInt(5), Dr$1 = BigInt(8);
function X$1(t2, e) {
  const n = t2 % e;
  return n >= q$1 ? n : e + n;
}
function Hr$1(t2, e, n) {
  if (e < q$1) throw new Error("invalid exponent, negatives unsupported");
  if (n <= q$1) throw new Error("invalid modulus");
  if (n === H$1) return q$1;
  let r2 = H$1;
  for (; e > q$1; ) e & H$1 && (r2 = r2 * t2 % n), t2 = t2 * t2 % n, e >>= H$1;
  return r2;
}
function it$1(t2, e, n) {
  let r2 = t2;
  for (; e-- > q$1; ) r2 *= r2, r2 %= n;
  return r2;
}
function nn$1(t2, e) {
  if (t2 === q$1) throw new Error("invert: expected non-zero number");
  if (e <= q$1) throw new Error("invert: expected positive modulus, got " + e);
  let n = X$1(t2, e), r2 = e, o2 = q$1, i2 = H$1;
  for (; n !== q$1; ) {
    const c2 = r2 / n, a2 = r2 % n, u2 = o2 - i2 * c2;
    r2 = n, n = a2, o2 = i2, i2 = u2;
  }
  if (r2 !== H$1) throw new Error("invert: does not exist");
  return X$1(o2, e);
}
function rc(t2) {
  const e = (t2 - H$1) / At$1;
  let n, r2, o2;
  for (n = t2 - H$1, r2 = 0; n % At$1 === q$1; n /= At$1, r2++) ;
  for (o2 = At$1; o2 < t2 && Hr$1(o2, e, t2) !== t2 - H$1; o2++) if (o2 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r2 === 1) {
    const s2 = (t2 + H$1) / en;
    return function(a2, u2) {
      const l2 = a2.pow(u2, s2);
      if (!a2.eql(a2.sqr(l2), u2)) throw new Error("Cannot find square root");
      return l2;
    };
  }
  const i2 = (n + H$1) / At$1;
  return function(c2, a2) {
    if (c2.pow(a2, e) === c2.neg(c2.ONE)) throw new Error("Cannot find square root");
    let u2 = r2, l2 = c2.pow(c2.mul(c2.ONE, o2), n), f3 = c2.pow(a2, i2), h3 = c2.pow(a2, n);
    for (; !c2.eql(h3, c2.ONE); ) {
      if (c2.eql(h3, c2.ZERO)) return c2.ZERO;
      let y3 = 1;
      for (let p2 = c2.sqr(h3); y3 < u2 && !c2.eql(p2, c2.ONE); y3++) p2 = c2.sqr(p2);
      const E2 = c2.pow(l2, H$1 << BigInt(u2 - y3 - 1));
      l2 = c2.sqr(E2), f3 = c2.mul(f3, E2), h3 = c2.mul(h3, l2), u2 = y3;
    }
    return f3;
  };
}
function oc(t2) {
  if (t2 % en === nc) {
    const e = (t2 + H$1) / en;
    return function(r2, o2) {
      const i2 = r2.pow(o2, e);
      if (!r2.eql(r2.sqr(i2), o2)) throw new Error("Cannot find square root");
      return i2;
    };
  }
  if (t2 % Dr$1 === Mr$1) {
    const e = (t2 - Mr$1) / Dr$1;
    return function(r2, o2) {
      const i2 = r2.mul(o2, At$1), s2 = r2.pow(i2, e), c2 = r2.mul(o2, s2), a2 = r2.mul(r2.mul(c2, At$1), s2), u2 = r2.mul(c2, r2.sub(a2, r2.ONE));
      if (!r2.eql(r2.sqr(u2), o2)) throw new Error("Cannot find square root");
      return u2;
    };
  }
  return rc(t2);
}
const ic = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function sc(t2) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n = ic.reduce((r2, o2) => (r2[o2] = "function", r2), e);
  return Dt$1(t2, n);
}
function cc(t2, e, n) {
  if (n < q$1) throw new Error("invalid exponent, negatives unsupported");
  if (n === q$1) return t2.ONE;
  if (n === H$1) return e;
  let r2 = t2.ONE, o2 = e;
  for (; n > q$1; ) n & H$1 && (r2 = t2.mul(r2, o2)), o2 = t2.sqr(o2), n >>= H$1;
  return r2;
}
function ac(t2, e) {
  const n = new Array(e.length), r2 = e.reduce((i2, s2, c2) => t2.is0(s2) ? i2 : (n[c2] = i2, t2.mul(i2, s2)), t2.ONE), o2 = t2.inv(r2);
  return e.reduceRight((i2, s2, c2) => t2.is0(s2) ? i2 : (n[c2] = t2.mul(i2, n[c2]), t2.mul(i2, s2)), o2), n;
}
function qr$1(t2, e) {
  const n = e !== void 0 ? e : t2.toString(2).length, r2 = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r2 };
}
function Kr$1(t2, e, n = false, r2 = {}) {
  if (t2 <= q$1) throw new Error("invalid field: expected ORDER > 0, got " + t2);
  const { nBitLength: o2, nByteLength: i2 } = qr$1(t2, e);
  if (i2 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let s2;
  const c2 = Object.freeze({ ORDER: t2, isLE: n, BITS: o2, BYTES: i2, MASK: Je$2(o2), ZERO: q$1, ONE: H$1, create: (a2) => X$1(a2, t2), isValid: (a2) => {
    if (typeof a2 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof a2);
    return q$1 <= a2 && a2 < t2;
  }, is0: (a2) => a2 === q$1, isOdd: (a2) => (a2 & H$1) === H$1, neg: (a2) => X$1(-a2, t2), eql: (a2, u2) => a2 === u2, sqr: (a2) => X$1(a2 * a2, t2), add: (a2, u2) => X$1(a2 + u2, t2), sub: (a2, u2) => X$1(a2 - u2, t2), mul: (a2, u2) => X$1(a2 * u2, t2), pow: (a2, u2) => cc(c2, a2, u2), div: (a2, u2) => X$1(a2 * nn$1(u2, t2), t2), sqrN: (a2) => a2 * a2, addN: (a2, u2) => a2 + u2, subN: (a2, u2) => a2 - u2, mulN: (a2, u2) => a2 * u2, inv: (a2) => nn$1(a2, t2), sqrt: r2.sqrt || ((a2) => (s2 || (s2 = oc(t2)), s2(c2, a2))), invertBatch: (a2) => ac(c2, a2), cmov: (a2, u2, l2) => l2 ? u2 : a2, toBytes: (a2) => n ? be$2(a2, i2) : Mt$2(a2, i2), fromBytes: (a2) => {
    if (a2.length !== i2) throw new Error("Field.fromBytes: expected " + i2 + " bytes, got " + a2.length);
    return n ? ee$1(a2) : Ot$1(a2);
  } });
  return Object.freeze(c2);
}
function Fr$1(t2) {
  if (typeof t2 != "bigint") throw new Error("field order must be bigint");
  const e = t2.toString(2).length;
  return Math.ceil(e / 8);
}
function zr$1(t2) {
  const e = Fr$1(t2);
  return e + Math.ceil(e / 2);
}
function uc(t2, e, n = false) {
  const r2 = t2.length, o2 = Fr$1(e), i2 = zr$1(e);
  if (r2 < 16 || r2 < i2 || r2 > 1024) throw new Error("expected " + i2 + "-1024 bytes of input, got " + r2);
  const s2 = n ? ee$1(t2) : Ot$1(t2), c2 = X$1(s2, e - H$1) + H$1;
  return n ? be$2(c2, o2) : Mt$2(c2, o2);
}
const Zr$1 = BigInt(0), ve$1 = BigInt(1);
function rn$1(t2, e) {
  const n = e.negate();
  return t2 ? n : e;
}
function Yr$1(t2, e) {
  if (!Number.isSafeInteger(t2) || t2 <= 0 || t2 > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t2);
}
function on$1(t2, e) {
  Yr$1(t2, e);
  const n = Math.ceil(e / t2) + 1, r2 = 2 ** (t2 - 1);
  return { windows: n, windowSize: r2 };
}
function fc(t2, e) {
  if (!Array.isArray(t2)) throw new Error("array expected");
  t2.forEach((n, r2) => {
    if (!(n instanceof e)) throw new Error("invalid point at index " + r2);
  });
}
function lc(t2, e) {
  if (!Array.isArray(t2)) throw new Error("array of scalars expected");
  t2.forEach((n, r2) => {
    if (!e.isValid(n)) throw new Error("invalid scalar at index " + r2);
  });
}
const sn$1 = /* @__PURE__ */ new WeakMap(), Gr$1 = /* @__PURE__ */ new WeakMap();
function cn$1(t2) {
  return Gr$1.get(t2) || 1;
}
function dc(t2, e) {
  return { constTimeNegate: rn$1, hasPrecomputes(n) {
    return cn$1(n) !== 1;
  }, unsafeLadder(n, r2, o2 = t2.ZERO) {
    let i2 = n;
    for (; r2 > Zr$1; ) r2 & ve$1 && (o2 = o2.add(i2)), i2 = i2.double(), r2 >>= ve$1;
    return o2;
  }, precomputeWindow(n, r2) {
    const { windows: o2, windowSize: i2 } = on$1(r2, e), s2 = [];
    let c2 = n, a2 = c2;
    for (let u2 = 0; u2 < o2; u2++) {
      a2 = c2, s2.push(a2);
      for (let l2 = 1; l2 < i2; l2++) a2 = a2.add(c2), s2.push(a2);
      c2 = a2.double();
    }
    return s2;
  }, wNAF(n, r2, o2) {
    const { windows: i2, windowSize: s2 } = on$1(n, e);
    let c2 = t2.ZERO, a2 = t2.BASE;
    const u2 = BigInt(2 ** n - 1), l2 = 2 ** n, f3 = BigInt(n);
    for (let h3 = 0; h3 < i2; h3++) {
      const y3 = h3 * s2;
      let E2 = Number(o2 & u2);
      o2 >>= f3, E2 > s2 && (E2 -= l2, o2 += ve$1);
      const p2 = y3, d3 = y3 + Math.abs(E2) - 1, v2 = h3 % 2 !== 0, m2 = E2 < 0;
      E2 === 0 ? a2 = a2.add(rn$1(v2, r2[p2])) : c2 = c2.add(rn$1(m2, r2[d3]));
    }
    return { p: c2, f: a2 };
  }, wNAFUnsafe(n, r2, o2, i2 = t2.ZERO) {
    const { windows: s2, windowSize: c2 } = on$1(n, e), a2 = BigInt(2 ** n - 1), u2 = 2 ** n, l2 = BigInt(n);
    for (let f3 = 0; f3 < s2; f3++) {
      const h3 = f3 * c2;
      if (o2 === Zr$1) break;
      let y3 = Number(o2 & a2);
      if (o2 >>= l2, y3 > c2 && (y3 -= u2, o2 += ve$1), y3 === 0) continue;
      let E2 = r2[h3 + Math.abs(y3) - 1];
      y3 < 0 && (E2 = E2.negate()), i2 = i2.add(E2);
    }
    return i2;
  }, getPrecomputes(n, r2, o2) {
    let i2 = sn$1.get(r2);
    return i2 || (i2 = this.precomputeWindow(r2, n), n !== 1 && sn$1.set(r2, o2(i2))), i2;
  }, wNAFCached(n, r2, o2) {
    const i2 = cn$1(n);
    return this.wNAF(i2, this.getPrecomputes(i2, n, o2), r2);
  }, wNAFCachedUnsafe(n, r2, o2, i2) {
    const s2 = cn$1(n);
    return s2 === 1 ? this.unsafeLadder(n, r2, i2) : this.wNAFUnsafe(s2, this.getPrecomputes(s2, n, o2), r2, i2);
  }, setWindowSize(n, r2) {
    Yr$1(r2, e), Gr$1.set(n, r2), sn$1.delete(n);
  } };
}
function hc(t2, e, n, r2) {
  if (fc(n, t2), lc(r2, e), n.length !== r2.length) throw new Error("arrays of points and scalars must have equal length");
  const o2 = t2.ZERO, i2 = Pr$1(BigInt(n.length)), s2 = i2 > 12 ? i2 - 3 : i2 > 4 ? i2 - 2 : i2 ? 2 : 1, c2 = (1 << s2) - 1, a2 = new Array(c2 + 1).fill(o2), u2 = Math.floor((e.BITS - 1) / s2) * s2;
  let l2 = o2;
  for (let f3 = u2; f3 >= 0; f3 -= s2) {
    a2.fill(o2);
    for (let y3 = 0; y3 < r2.length; y3++) {
      const E2 = r2[y3], p2 = Number(E2 >> BigInt(f3) & BigInt(c2));
      a2[p2] = a2[p2].add(n[y3]);
    }
    let h3 = o2;
    for (let y3 = a2.length - 1, E2 = o2; y3 > 0; y3--) E2 = E2.add(a2[y3]), h3 = h3.add(E2);
    if (l2 = l2.add(h3), f3 !== 0) for (let y3 = 0; y3 < s2; y3++) l2 = l2.double();
  }
  return l2;
}
function Wr$1(t2) {
  return sc(t2.Fp), Dt$1(t2, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...qr$1(t2.n, t2.nBitLength), ...t2, p: t2.Fp.ORDER });
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const Ht$1 = BigInt(0), an$1 = BigInt(1);
function pc(t2) {
  return Dt$1(t2, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...t2 });
}
function gc(t2) {
  const e = pc(t2), { P: n } = e, r2 = (m2) => X$1(m2, n), o2 = e.montgomeryBits, i2 = Math.ceil(o2 / 8), s2 = e.nByteLength, c2 = e.adjustScalarBytes || ((m2) => m2), a2 = e.powPminus2 || ((m2) => Hr$1(m2, n - BigInt(2), n));
  function u2(m2, O3, N2) {
    const $2 = r2(m2 * (O3 - N2));
    return O3 = r2(O3 - $2), N2 = r2(N2 + $2), [O3, N2];
  }
  const l2 = (e.a - BigInt(2)) / BigInt(4);
  function f3(m2, O3) {
    ft$2("u", m2, Ht$1, n), ft$2("scalar", O3, Ht$1, n);
    const N2 = O3, $2 = m2;
    let B2 = an$1, A2 = Ht$1, T2 = m2, S3 = an$1, L2 = Ht$1, U2;
    for (let j2 = BigInt(o2 - 1); j2 >= Ht$1; j2--) {
      const g = N2 >> j2 & an$1;
      L2 ^= g, U2 = u2(L2, B2, T2), B2 = U2[0], T2 = U2[1], U2 = u2(L2, A2, S3), A2 = U2[0], S3 = U2[1], L2 = g;
      const w2 = B2 + A2, b2 = r2(w2 * w2), I3 = B2 - A2, R3 = r2(I3 * I3), x2 = b2 - R3, C2 = T2 + S3, P3 = T2 - S3, k2 = r2(P3 * w2), M3 = r2(C2 * I3), D2 = k2 + M3, z2 = k2 - M3;
      T2 = r2(D2 * D2), S3 = r2($2 * r2(z2 * z2)), B2 = r2(b2 * R3), A2 = r2(x2 * (b2 + r2(l2 * x2)));
    }
    U2 = u2(L2, B2, T2), B2 = U2[0], T2 = U2[1], U2 = u2(L2, A2, S3), A2 = U2[0], S3 = U2[1];
    const _ = a2(A2);
    return r2(B2 * _);
  }
  function h3(m2) {
    return be$2(r2(m2), i2);
  }
  function y3(m2) {
    const O3 = et$1("u coordinate", m2, i2);
    return s2 === 32 && (O3[31] &= 127), ee$1(O3);
  }
  function E2(m2) {
    const O3 = et$1("scalar", m2), N2 = O3.length;
    if (N2 !== i2 && N2 !== s2) {
      let $2 = "" + i2 + " or " + s2;
      throw new Error("invalid scalar, expected " + $2 + " bytes, got " + N2);
    }
    return ee$1(c2(O3));
  }
  function p2(m2, O3) {
    const N2 = y3(O3), $2 = E2(m2), B2 = f3(N2, $2);
    if (B2 === Ht$1) throw new Error("invalid private or public key received");
    return h3(B2);
  }
  const d3 = h3(e.Gu);
  function v2(m2) {
    return p2(m2, d3);
  }
  return { scalarMult: p2, scalarMultBase: v2, getSharedSecret: (m2, O3) => p2(m2, O3), getPublicKey: (m2) => v2(m2), utils: { randomPrivateKey: () => e.randomBytes(e.nByteLength) }, GuBytes: d3 };
}
const un$1 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
const yc = BigInt(1), Xr$1 = BigInt(2), mc = BigInt(3), wc = BigInt(5);
BigInt(8);
function bc(t2) {
  const e = BigInt(10), n = BigInt(20), r2 = BigInt(40), o2 = BigInt(80), i2 = un$1, c2 = t2 * t2 % i2 * t2 % i2, a2 = it$1(c2, Xr$1, i2) * c2 % i2, u2 = it$1(a2, yc, i2) * t2 % i2, l2 = it$1(u2, wc, i2) * u2 % i2, f3 = it$1(l2, e, i2) * l2 % i2, h3 = it$1(f3, n, i2) * f3 % i2, y3 = it$1(h3, r2, i2) * h3 % i2, E2 = it$1(y3, o2, i2) * y3 % i2, p2 = it$1(E2, o2, i2) * y3 % i2, d3 = it$1(p2, e, i2) * l2 % i2;
  return { pow_p_5_8: it$1(d3, Xr$1, i2) * t2 % i2, b2: c2 };
}
function Ec(t2) {
  return t2[0] &= 248, t2[31] &= 127, t2[31] |= 64, t2;
}
const fn$1 = gc({ P: un$1, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (t2) => {
  const e = un$1, { pow_p_5_8: n, b2: r2 } = bc(t2);
  return X$1(it$1(n, mc, e) * r2, e);
}, adjustScalarBytes: Ec, randomBytes: Lt$2 });
function Jr$1(t2) {
  t2.lowS !== void 0 && Ct$1("lowS", t2.lowS), t2.prehash !== void 0 && Ct$1("prehash", t2.prehash);
}
function vc(t2) {
  const e = Wr$1(t2);
  Dt$1(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  const { endo: n, Fp: r2, a: o2 } = e;
  if (n) {
    if (!r2.eql(o2, r2.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof n != "object" || typeof n.beta != "bigint" || typeof n.splitScalar != "function") throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: xc, hexToBytes: Sc } = ec;
class Oc extends Error {
  constructor(e = "") {
    super(e);
  }
}
const lt$1 = { Err: Oc, _tlv: { encode: (t2, e) => {
  const { Err: n } = lt$1;
  if (t2 < 0 || t2 > 256) throw new n("tlv.encode: wrong tag");
  if (e.length & 1) throw new n("tlv.encode: unpadded data");
  const r2 = e.length / 2, o2 = kt$2(r2);
  if (o2.length / 2 & 128) throw new n("tlv.encode: long form length too big");
  const i2 = r2 > 127 ? kt$2(o2.length / 2 | 128) : "";
  return kt$2(t2) + i2 + o2 + e;
}, decode(t2, e) {
  const { Err: n } = lt$1;
  let r2 = 0;
  if (t2 < 0 || t2 > 256) throw new n("tlv.encode: wrong tag");
  if (e.length < 2 || e[r2++] !== t2) throw new n("tlv.decode: wrong tlv");
  const o2 = e[r2++], i2 = !!(o2 & 128);
  let s2 = 0;
  if (!i2) s2 = o2;
  else {
    const a2 = o2 & 127;
    if (!a2) throw new n("tlv.decode(long): indefinite length not supported");
    if (a2 > 4) throw new n("tlv.decode(long): byte length is too big");
    const u2 = e.subarray(r2, r2 + a2);
    if (u2.length !== a2) throw new n("tlv.decode: length bytes not complete");
    if (u2[0] === 0) throw new n("tlv.decode(long): zero leftmost byte");
    for (const l2 of u2) s2 = s2 << 8 | l2;
    if (r2 += a2, s2 < 128) throw new n("tlv.decode(long): not minimal encoding");
  }
  const c2 = e.subarray(r2, r2 + s2);
  if (c2.length !== s2) throw new n("tlv.decode: wrong value length");
  return { v: c2, l: e.subarray(r2 + s2) };
} }, _int: { encode(t2) {
  const { Err: e } = lt$1;
  if (t2 < dt$2) throw new e("integer: negative integers are not allowed");
  let n = kt$2(t2);
  if (Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
  return n;
}, decode(t2) {
  const { Err: e } = lt$1;
  if (t2[0] & 128) throw new e("invalid signature integer: negative");
  if (t2[0] === 0 && !(t2[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
  return xc(t2);
} }, toSig(t2) {
  const { Err: e, _int: n, _tlv: r2 } = lt$1, o2 = typeof t2 == "string" ? Sc(t2) : t2;
  te$1(o2);
  const { v: i2, l: s2 } = r2.decode(48, o2);
  if (s2.length) throw new e("invalid signature: left bytes after parsing");
  const { v: c2, l: a2 } = r2.decode(2, i2), { v: u2, l: l2 } = r2.decode(2, a2);
  if (l2.length) throw new e("invalid signature: left bytes after parsing");
  return { r: n.decode(c2), s: n.decode(u2) };
}, hexFromSig(t2) {
  const { _tlv: e, _int: n } = lt$1, r2 = e.encode(2, n.encode(t2.r)), o2 = e.encode(2, n.encode(t2.s)), i2 = r2 + o2;
  return e.encode(48, i2);
} }, dt$2 = BigInt(0), K$1 = BigInt(1);
BigInt(2);
const Qr$1 = BigInt(3);
BigInt(4);
function Ac(t2) {
  const e = vc(t2), { Fp: n } = e, r2 = Kr$1(e.n, e.nBitLength), o2 = e.toBytes || ((p2, d3, v2) => {
    const m2 = d3.toAffine();
    return ne$2(Uint8Array.from([4]), n.toBytes(m2.x), n.toBytes(m2.y));
  }), i2 = e.fromBytes || ((p2) => {
    const d3 = p2.subarray(1), v2 = n.fromBytes(d3.subarray(0, n.BYTES)), m2 = n.fromBytes(d3.subarray(n.BYTES, 2 * n.BYTES));
    return { x: v2, y: m2 };
  });
  function s2(p2) {
    const { a: d3, b: v2 } = e, m2 = n.sqr(p2), O3 = n.mul(m2, p2);
    return n.add(n.add(O3, n.mul(p2, d3)), v2);
  }
  if (!n.eql(n.sqr(e.Gy), s2(e.Gx))) throw new Error("bad generator point: equation left != right");
  function c2(p2) {
    return Ee$3(p2, K$1, e.n);
  }
  function a2(p2) {
    const { allowedPrivateKeyLengths: d3, nByteLength: v2, wrapPrivateKey: m2, n: O3 } = e;
    if (d3 && typeof p2 != "bigint") {
      if (St$3(p2) && (p2 = Pt$2(p2)), typeof p2 != "string" || !d3.includes(p2.length)) throw new Error("invalid private key");
      p2 = p2.padStart(v2 * 2, "0");
    }
    let N2;
    try {
      N2 = typeof p2 == "bigint" ? p2 : Ot$1(et$1("private key", p2, v2));
    } catch {
      throw new Error("invalid private key, expected hex or " + v2 + " bytes, got " + typeof p2);
    }
    return m2 && (N2 = X$1(N2, O3)), ft$2("private key", N2, K$1, O3), N2;
  }
  function u2(p2) {
    if (!(p2 instanceof h3)) throw new Error("ProjectivePoint expected");
  }
  const l2 = tn$1((p2, d3) => {
    const { px: v2, py: m2, pz: O3 } = p2;
    if (n.eql(O3, n.ONE)) return { x: v2, y: m2 };
    const N2 = p2.is0();
    d3 == null && (d3 = N2 ? n.ONE : n.inv(O3));
    const $2 = n.mul(v2, d3), B2 = n.mul(m2, d3), A2 = n.mul(O3, d3);
    if (N2) return { x: n.ZERO, y: n.ZERO };
    if (!n.eql(A2, n.ONE)) throw new Error("invZ was invalid");
    return { x: $2, y: B2 };
  }), f3 = tn$1((p2) => {
    if (p2.is0()) {
      if (e.allowInfinityPoint && !n.is0(p2.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: d3, y: v2 } = p2.toAffine();
    if (!n.isValid(d3) || !n.isValid(v2)) throw new Error("bad point: x or y not FE");
    const m2 = n.sqr(v2), O3 = s2(d3);
    if (!n.eql(m2, O3)) throw new Error("bad point: equation left != right");
    if (!p2.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class h3 {
    constructor(d3, v2, m2) {
      if (this.px = d3, this.py = v2, this.pz = m2, d3 == null || !n.isValid(d3)) throw new Error("x required");
      if (v2 == null || !n.isValid(v2)) throw new Error("y required");
      if (m2 == null || !n.isValid(m2)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(d3) {
      const { x: v2, y: m2 } = d3 || {};
      if (!d3 || !n.isValid(v2) || !n.isValid(m2)) throw new Error("invalid affine point");
      if (d3 instanceof h3) throw new Error("projective point not allowed");
      const O3 = (N2) => n.eql(N2, n.ZERO);
      return O3(v2) && O3(m2) ? h3.ZERO : new h3(v2, m2, n.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(d3) {
      const v2 = n.invertBatch(d3.map((m2) => m2.pz));
      return d3.map((m2, O3) => m2.toAffine(v2[O3])).map(h3.fromAffine);
    }
    static fromHex(d3) {
      const v2 = h3.fromAffine(i2(et$1("pointHex", d3)));
      return v2.assertValidity(), v2;
    }
    static fromPrivateKey(d3) {
      return h3.BASE.multiply(a2(d3));
    }
    static msm(d3, v2) {
      return hc(h3, r2, d3, v2);
    }
    _setWindowSize(d3) {
      E2.setWindowSize(this, d3);
    }
    assertValidity() {
      f3(this);
    }
    hasEvenY() {
      const { y: d3 } = this.toAffine();
      if (n.isOdd) return !n.isOdd(d3);
      throw new Error("Field doesn't support isOdd");
    }
    equals(d3) {
      u2(d3);
      const { px: v2, py: m2, pz: O3 } = this, { px: N2, py: $2, pz: B2 } = d3, A2 = n.eql(n.mul(v2, B2), n.mul(N2, O3)), T2 = n.eql(n.mul(m2, B2), n.mul($2, O3));
      return A2 && T2;
    }
    negate() {
      return new h3(this.px, n.neg(this.py), this.pz);
    }
    double() {
      const { a: d3, b: v2 } = e, m2 = n.mul(v2, Qr$1), { px: O3, py: N2, pz: $2 } = this;
      let B2 = n.ZERO, A2 = n.ZERO, T2 = n.ZERO, S3 = n.mul(O3, O3), L2 = n.mul(N2, N2), U2 = n.mul($2, $2), _ = n.mul(O3, N2);
      return _ = n.add(_, _), T2 = n.mul(O3, $2), T2 = n.add(T2, T2), B2 = n.mul(d3, T2), A2 = n.mul(m2, U2), A2 = n.add(B2, A2), B2 = n.sub(L2, A2), A2 = n.add(L2, A2), A2 = n.mul(B2, A2), B2 = n.mul(_, B2), T2 = n.mul(m2, T2), U2 = n.mul(d3, U2), _ = n.sub(S3, U2), _ = n.mul(d3, _), _ = n.add(_, T2), T2 = n.add(S3, S3), S3 = n.add(T2, S3), S3 = n.add(S3, U2), S3 = n.mul(S3, _), A2 = n.add(A2, S3), U2 = n.mul(N2, $2), U2 = n.add(U2, U2), S3 = n.mul(U2, _), B2 = n.sub(B2, S3), T2 = n.mul(U2, L2), T2 = n.add(T2, T2), T2 = n.add(T2, T2), new h3(B2, A2, T2);
    }
    add(d3) {
      u2(d3);
      const { px: v2, py: m2, pz: O3 } = this, { px: N2, py: $2, pz: B2 } = d3;
      let A2 = n.ZERO, T2 = n.ZERO, S3 = n.ZERO;
      const L2 = e.a, U2 = n.mul(e.b, Qr$1);
      let _ = n.mul(v2, N2), j2 = n.mul(m2, $2), g = n.mul(O3, B2), w2 = n.add(v2, m2), b2 = n.add(N2, $2);
      w2 = n.mul(w2, b2), b2 = n.add(_, j2), w2 = n.sub(w2, b2), b2 = n.add(v2, O3);
      let I3 = n.add(N2, B2);
      return b2 = n.mul(b2, I3), I3 = n.add(_, g), b2 = n.sub(b2, I3), I3 = n.add(m2, O3), A2 = n.add($2, B2), I3 = n.mul(I3, A2), A2 = n.add(j2, g), I3 = n.sub(I3, A2), S3 = n.mul(L2, b2), A2 = n.mul(U2, g), S3 = n.add(A2, S3), A2 = n.sub(j2, S3), S3 = n.add(j2, S3), T2 = n.mul(A2, S3), j2 = n.add(_, _), j2 = n.add(j2, _), g = n.mul(L2, g), b2 = n.mul(U2, b2), j2 = n.add(j2, g), g = n.sub(_, g), g = n.mul(L2, g), b2 = n.add(b2, g), _ = n.mul(j2, b2), T2 = n.add(T2, _), _ = n.mul(I3, b2), A2 = n.mul(w2, A2), A2 = n.sub(A2, _), _ = n.mul(w2, j2), S3 = n.mul(I3, S3), S3 = n.add(S3, _), new h3(A2, T2, S3);
    }
    subtract(d3) {
      return this.add(d3.negate());
    }
    is0() {
      return this.equals(h3.ZERO);
    }
    wNAF(d3) {
      return E2.wNAFCached(this, d3, h3.normalizeZ);
    }
    multiplyUnsafe(d3) {
      const { endo: v2, n: m2 } = e;
      ft$2("scalar", d3, dt$2, m2);
      const O3 = h3.ZERO;
      if (d3 === dt$2) return O3;
      if (this.is0() || d3 === K$1) return this;
      if (!v2 || E2.hasPrecomputes(this)) return E2.wNAFCachedUnsafe(this, d3, h3.normalizeZ);
      let { k1neg: N2, k1: $2, k2neg: B2, k2: A2 } = v2.splitScalar(d3), T2 = O3, S3 = O3, L2 = this;
      for (; $2 > dt$2 || A2 > dt$2; ) $2 & K$1 && (T2 = T2.add(L2)), A2 & K$1 && (S3 = S3.add(L2)), L2 = L2.double(), $2 >>= K$1, A2 >>= K$1;
      return N2 && (T2 = T2.negate()), B2 && (S3 = S3.negate()), S3 = new h3(n.mul(S3.px, v2.beta), S3.py, S3.pz), T2.add(S3);
    }
    multiply(d3) {
      const { endo: v2, n: m2 } = e;
      ft$2("scalar", d3, K$1, m2);
      let O3, N2;
      if (v2) {
        const { k1neg: $2, k1: B2, k2neg: A2, k2: T2 } = v2.splitScalar(d3);
        let { p: S3, f: L2 } = this.wNAF(B2), { p: U2, f: _ } = this.wNAF(T2);
        S3 = E2.constTimeNegate($2, S3), U2 = E2.constTimeNegate(A2, U2), U2 = new h3(n.mul(U2.px, v2.beta), U2.py, U2.pz), O3 = S3.add(U2), N2 = L2.add(_);
      } else {
        const { p: $2, f: B2 } = this.wNAF(d3);
        O3 = $2, N2 = B2;
      }
      return h3.normalizeZ([O3, N2])[0];
    }
    multiplyAndAddUnsafe(d3, v2, m2) {
      const O3 = h3.BASE, N2 = (B2, A2) => A2 === dt$2 || A2 === K$1 || !B2.equals(O3) ? B2.multiplyUnsafe(A2) : B2.multiply(A2), $2 = N2(this, v2).add(N2(d3, m2));
      return $2.is0() ? void 0 : $2;
    }
    toAffine(d3) {
      return l2(this, d3);
    }
    isTorsionFree() {
      const { h: d3, isTorsionFree: v2 } = e;
      if (d3 === K$1) return true;
      if (v2) return v2(h3, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d3, clearCofactor: v2 } = e;
      return d3 === K$1 ? this : v2 ? v2(h3, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(d3 = true) {
      return Ct$1("isCompressed", d3), this.assertValidity(), o2(h3, this, d3);
    }
    toHex(d3 = true) {
      return Ct$1("isCompressed", d3), Pt$2(this.toRawBytes(d3));
    }
  }
  h3.BASE = new h3(e.Gx, e.Gy, n.ONE), h3.ZERO = new h3(n.ZERO, n.ONE, n.ZERO);
  const y3 = e.nBitLength, E2 = dc(h3, e.endo ? Math.ceil(y3 / 2) : y3);
  return { CURVE: e, ProjectivePoint: h3, normPrivateKeyToScalar: a2, weierstrassEquation: s2, isWithinCurveOrder: c2 };
}
function Bc(t2) {
  const e = Wr$1(t2);
  return Dt$1(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: true, ...e });
}
function Ic(t2) {
  const e = Bc(t2), { Fp: n, n: r2 } = e, o2 = n.BYTES + 1, i2 = 2 * n.BYTES + 1;
  function s2(g) {
    return X$1(g, r2);
  }
  function c2(g) {
    return nn$1(g, r2);
  }
  const { ProjectivePoint: a2, normPrivateKeyToScalar: u2, weierstrassEquation: l2, isWithinCurveOrder: f3 } = Ac({ ...e, toBytes(g, w2, b2) {
    const I3 = w2.toAffine(), R3 = n.toBytes(I3.x), x2 = ne$2;
    return Ct$1("isCompressed", b2), b2 ? x2(Uint8Array.from([w2.hasEvenY() ? 2 : 3]), R3) : x2(Uint8Array.from([4]), R3, n.toBytes(I3.y));
  }, fromBytes(g) {
    const w2 = g.length, b2 = g[0], I3 = g.subarray(1);
    if (w2 === o2 && (b2 === 2 || b2 === 3)) {
      const R3 = Ot$1(I3);
      if (!Ee$3(R3, K$1, n.ORDER)) throw new Error("Point is not on curve");
      const x2 = l2(R3);
      let C2;
      try {
        C2 = n.sqrt(x2);
      } catch (M3) {
        const D2 = M3 instanceof Error ? ": " + M3.message : "";
        throw new Error("Point is not on curve" + D2);
      }
      const P3 = (C2 & K$1) === K$1;
      return (b2 & 1) === 1 !== P3 && (C2 = n.neg(C2)), { x: R3, y: C2 };
    } else if (w2 === i2 && b2 === 4) {
      const R3 = n.fromBytes(I3.subarray(0, n.BYTES)), x2 = n.fromBytes(I3.subarray(n.BYTES, 2 * n.BYTES));
      return { x: R3, y: x2 };
    } else {
      const R3 = o2, x2 = i2;
      throw new Error("invalid Point, expected length of " + R3 + ", or uncompressed " + x2 + ", got " + w2);
    }
  } }), h3 = (g) => Pt$2(Mt$2(g, e.nByteLength));
  function y3(g) {
    const w2 = r2 >> K$1;
    return g > w2;
  }
  function E2(g) {
    return y3(g) ? s2(-g) : g;
  }
  const p2 = (g, w2, b2) => Ot$1(g.slice(w2, b2));
  class d3 {
    constructor(w2, b2, I3) {
      this.r = w2, this.s = b2, this.recovery = I3, this.assertValidity();
    }
    static fromCompact(w2) {
      const b2 = e.nByteLength;
      return w2 = et$1("compactSignature", w2, b2 * 2), new d3(p2(w2, 0, b2), p2(w2, b2, 2 * b2));
    }
    static fromDER(w2) {
      const { r: b2, s: I3 } = lt$1.toSig(et$1("DER", w2));
      return new d3(b2, I3);
    }
    assertValidity() {
      ft$2("r", this.r, K$1, r2), ft$2("s", this.s, K$1, r2);
    }
    addRecoveryBit(w2) {
      return new d3(this.r, this.s, w2);
    }
    recoverPublicKey(w2) {
      const { r: b2, s: I3, recovery: R3 } = this, x2 = B2(et$1("msgHash", w2));
      if (R3 == null || ![0, 1, 2, 3].includes(R3)) throw new Error("recovery id invalid");
      const C2 = R3 === 2 || R3 === 3 ? b2 + e.n : b2;
      if (C2 >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const P3 = (R3 & 1) === 0 ? "02" : "03", k2 = a2.fromHex(P3 + h3(C2)), M3 = c2(C2), D2 = s2(-x2 * M3), z2 = s2(I3 * M3), Z = a2.BASE.multiplyAndAddUnsafe(k2, D2, z2);
      if (!Z) throw new Error("point at infinify");
      return Z.assertValidity(), Z;
    }
    hasHighS() {
      return y3(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new d3(this.r, s2(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Vt$2(this.toDERHex());
    }
    toDERHex() {
      return lt$1.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return Vt$2(this.toCompactHex());
    }
    toCompactHex() {
      return h3(this.r) + h3(this.s);
    }
  }
  const v2 = { isValidPrivateKey(g) {
    try {
      return u2(g), true;
    } catch {
      return false;
    }
  }, normPrivateKeyToScalar: u2, randomPrivateKey: () => {
    const g = zr$1(e.n);
    return uc(e.randomBytes(g), e.n);
  }, precompute(g = 8, w2 = a2.BASE) {
    return w2._setWindowSize(g), w2.multiply(BigInt(3)), w2;
  } };
  function m2(g, w2 = true) {
    return a2.fromPrivateKey(g).toRawBytes(w2);
  }
  function O3(g) {
    const w2 = St$3(g), b2 = typeof g == "string", I3 = (w2 || b2) && g.length;
    return w2 ? I3 === o2 || I3 === i2 : b2 ? I3 === 2 * o2 || I3 === 2 * i2 : g instanceof a2;
  }
  function N2(g, w2, b2 = true) {
    if (O3(g)) throw new Error("first arg must be private key");
    if (!O3(w2)) throw new Error("second arg must be public key");
    return a2.fromHex(w2).multiply(u2(g)).toRawBytes(b2);
  }
  const $2 = e.bits2int || function(g) {
    if (g.length > 8192) throw new Error("input is too large");
    const w2 = Ot$1(g), b2 = g.length * 8 - e.nBitLength;
    return b2 > 0 ? w2 >> BigInt(b2) : w2;
  }, B2 = e.bits2int_modN || function(g) {
    return s2($2(g));
  }, A2 = Je$2(e.nBitLength);
  function T2(g) {
    return ft$2("num < 2^" + e.nBitLength, g, dt$2, A2), Mt$2(g, e.nByteLength);
  }
  function S3(g, w2, b2 = L2) {
    if (["recovered", "canonical"].some((W2) => W2 in b2)) throw new Error("sign() legacy options not supported");
    const { hash: I3, randomBytes: R3 } = e;
    let { lowS: x2, prehash: C2, extraEntropy: P3 } = b2;
    x2 == null && (x2 = true), g = et$1("msgHash", g), Jr$1(b2), C2 && (g = et$1("prehashed msgHash", I3(g)));
    const k2 = B2(g), M3 = u2(w2), D2 = [T2(M3), T2(k2)];
    if (P3 != null && P3 !== false) {
      const W2 = P3 === true ? R3(n.BYTES) : P3;
      D2.push(et$1("extraEntropy", W2));
    }
    const z2 = ne$2(...D2), Z = k2;
    function st2(W2) {
      const J3 = $2(W2);
      if (!f3(J3)) return;
      const Be2 = c2(J3), zt2 = a2.BASE.multiply(J3).toAffine(), vt2 = s2(zt2.x);
      if (vt2 === dt$2) return;
      const Zt2 = s2(Be2 * s2(Z + vt2 * M3));
      if (Zt2 === dt$2) return;
      let Ut2 = (zt2.x === vt2 ? 0 : 2) | Number(zt2.y & K$1), vn2 = Zt2;
      return x2 && y3(Zt2) && (vn2 = E2(Zt2), Ut2 ^= 1), new d3(vt2, vn2, Ut2);
    }
    return { seed: z2, k2sig: st2 };
  }
  const L2 = { lowS: e.lowS, prehash: false }, U2 = { lowS: e.lowS, prehash: false };
  function _(g, w2, b2 = L2) {
    const { seed: I3, k2sig: R3 } = S3(g, w2, b2), x2 = e;
    return Vr$1(x2.hash.outputLen, x2.nByteLength, x2.hmac)(I3, R3);
  }
  a2.BASE._setWindowSize(8);
  function j2(g, w2, b2, I3 = U2) {
    var _a;
    const R3 = g;
    w2 = et$1("msgHash", w2), b2 = et$1("publicKey", b2);
    const { lowS: x2, prehash: C2, format: P3 } = I3;
    if (Jr$1(I3), "strict" in I3) throw new Error("options.strict was renamed to lowS");
    if (P3 !== void 0 && P3 !== "compact" && P3 !== "der") throw new Error("format must be compact or der");
    const k2 = typeof R3 == "string" || St$3(R3), M3 = !k2 && !P3 && typeof R3 == "object" && R3 !== null && typeof R3.r == "bigint" && typeof R3.s == "bigint";
    if (!k2 && !M3) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let D2, z2;
    try {
      if (M3 && (D2 = new d3(R3.r, R3.s)), k2) {
        try {
          P3 !== "compact" && (D2 = d3.fromDER(R3));
        } catch (Ut2) {
          if (!(Ut2 instanceof lt$1.Err)) throw Ut2;
        }
        !D2 && P3 !== "der" && (D2 = d3.fromCompact(R3));
      }
      z2 = a2.fromHex(b2);
    } catch {
      return false;
    }
    if (!D2 || x2 && D2.hasHighS()) return false;
    C2 && (w2 = e.hash(w2));
    const { r: Z, s: st2 } = D2, W2 = B2(w2), J3 = c2(st2), Be2 = s2(W2 * J3), zt2 = s2(Z * J3), vt2 = (_a = a2.BASE.multiplyAndAddUnsafe(z2, Be2, zt2)) == null ? void 0 : _a.toAffine();
    return vt2 ? s2(vt2.x) === Z : false;
  }
  return { CURVE: e, getPublicKey: m2, getSharedSecret: N2, sign: _, verify: j2, ProjectivePoint: a2, Signature: d3, utils: v2 };
}
function Nc(t2) {
  return { hash: t2, hmac: (e, ...n) => ye$2(t2, e, Vi$1(...n)), randomBytes: Lt$2 };
}
function Uc(t2, e) {
  const n = (r2) => Ic({ ...t2, ...Nc(r2) });
  return { ...n(e), create: n };
}
const to$1 = Kr$1(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Tc = to$1.create(BigInt("-3")), Rc = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), _c = Uc({ a: Tc, b: Rc, Fp: to$1, n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"), h: BigInt(1), lowS: false }, Qt$2), ln$1 = "base10", G$1 = "base16", qt$2 = "base64pad", xe$1 = "base64url", Kt$2 = "utf8", dn$1 = 0, Ft$2 = 1, re$2 = 2, $c = 0, eo$1 = 1, oe$1 = 12, hn$1 = 32;
function Lc() {
  const t2 = fn$1.utils.randomPrivateKey(), e = fn$1.getPublicKey(t2);
  return { privateKey: toString(t2, G$1), publicKey: toString(e, G$1) };
}
function jc() {
  const t2 = Lt$2(hn$1);
  return toString(t2, G$1);
}
function Cc(t2, e) {
  const n = fn$1.getSharedSecret(fromString(t2, G$1), fromString(e, G$1)), r2 = Vs$1(Qt$2, n, void 0, void 0, hn$1);
  return toString(r2, G$1);
}
function Pc(t2) {
  const e = Qt$2(fromString(t2, G$1));
  return toString(e, G$1);
}
function kc(t2) {
  const e = Qt$2(fromString(t2, Kt$2));
  return toString(e, G$1);
}
function pn$1(t2) {
  return fromString(`${t2}`, ln$1);
}
function Bt$2(t2) {
  return Number(toString(t2, ln$1));
}
function no$1(t2) {
  return t2.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function ro$1(t2) {
  const e = t2.replace(/-/g, "+").replace(/_/g, "/"), n = (4 - e.length % 4) % 4;
  return e + "=".repeat(n);
}
function Vc(t2) {
  const e = pn$1(typeof t2.type < "u" ? t2.type : dn$1);
  if (Bt$2(e) === Ft$2 && typeof t2.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n = typeof t2.senderPublicKey < "u" ? fromString(t2.senderPublicKey, G$1) : void 0, r2 = typeof t2.iv < "u" ? fromString(t2.iv, G$1) : Lt$2(oe$1), o2 = fromString(t2.symKey, G$1), i2 = $r$1(o2, r2).encrypt(fromString(t2.message, Kt$2)), s2 = gn$1({ type: e, sealed: i2, iv: r2, senderPublicKey: n });
  return t2.encoding === xe$1 ? no$1(s2) : s2;
}
function Mc(t2) {
  const e = fromString(t2.symKey, G$1), { sealed: n, iv: r2 } = Se$1({ encoded: t2.encoded, encoding: t2.encoding }), o2 = $r$1(e, r2).decrypt(n);
  if (o2 === null) throw new Error("Failed to decrypt");
  return toString(o2, Kt$2);
}
function Dc(t2, e) {
  const n = pn$1(re$2), r2 = Lt$2(oe$1), o2 = fromString(t2, Kt$2), i2 = gn$1({ type: n, sealed: o2, iv: r2 });
  return e === xe$1 ? no$1(i2) : i2;
}
function Hc(t2, e) {
  const { sealed: n } = Se$1({ encoded: t2, encoding: e });
  return toString(n, Kt$2);
}
function gn$1(t2) {
  if (Bt$2(t2.type) === re$2) return toString(concat([t2.type, t2.sealed]), qt$2);
  if (Bt$2(t2.type) === Ft$2) {
    if (typeof t2.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString(concat([t2.type, t2.senderPublicKey, t2.iv, t2.sealed]), qt$2);
  }
  return toString(concat([t2.type, t2.iv, t2.sealed]), qt$2);
}
function Se$1(t2) {
  const e = (t2.encoding || qt$2) === xe$1 ? ro$1(t2.encoded) : t2.encoded, n = fromString(e, qt$2), r2 = n.slice($c, eo$1), o2 = eo$1;
  if (Bt$2(r2) === Ft$2) {
    const a2 = o2 + hn$1, u2 = a2 + oe$1, l2 = n.slice(o2, a2), f3 = n.slice(a2, u2), h3 = n.slice(u2);
    return { type: r2, sealed: h3, iv: f3, senderPublicKey: l2 };
  }
  if (Bt$2(r2) === re$2) {
    const a2 = n.slice(o2), u2 = Lt$2(oe$1);
    return { type: r2, sealed: a2, iv: u2 };
  }
  const i2 = o2 + oe$1, s2 = n.slice(o2, i2), c2 = n.slice(i2);
  return { type: r2, sealed: c2, iv: s2 };
}
function qc(t2, e) {
  const n = Se$1({ encoded: t2, encoding: e == null ? void 0 : e.encoding });
  return oo$1({ type: Bt$2(n.type), senderPublicKey: typeof n.senderPublicKey < "u" ? toString(n.senderPublicKey, G$1) : void 0, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey });
}
function oo$1(t2) {
  const e = (t2 == null ? void 0 : t2.type) || dn$1;
  if (e === Ft$2) {
    if (typeof (t2 == null ? void 0 : t2.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (t2 == null ? void 0 : t2.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: t2 == null ? void 0 : t2.senderPublicKey, receiverPublicKey: t2 == null ? void 0 : t2.receiverPublicKey };
}
function Kc(t2) {
  return t2.type === Ft$2 && typeof t2.senderPublicKey == "string" && typeof t2.receiverPublicKey == "string";
}
function Fc(t2) {
  return t2.type === re$2;
}
function io$1(t2) {
  const e = Buffer.from(t2.x, "base64"), n = Buffer.from(t2.y, "base64");
  return concat([new Uint8Array([4]), e, n]);
}
function zc(t2, e) {
  const [n, r2, o2] = t2.split("."), i2 = Buffer.from(ro$1(o2), "base64");
  if (i2.length !== 64) throw new Error("Invalid signature length");
  const s2 = i2.slice(0, 32), c2 = i2.slice(32, 64), a2 = `${n}.${r2}`, u2 = Qt$2(a2), l2 = io$1(e);
  if (!_c.verify(concat([s2, c2]), u2, l2)) throw new Error("Invalid signature");
  return sn$2(t2).payload;
}
const so$1 = "irn";
function Zc(t2) {
  return (t2 == null ? void 0 : t2.relay) || { protocol: so$1 };
}
function Yc(t2) {
  const e = C$2[t2];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${t2}`);
  return e;
}
function co$1(t2, e = "-") {
  const n = {}, r2 = "relay" + e;
  return Object.keys(t2).forEach((o2) => {
    if (o2.startsWith(r2)) {
      const i2 = o2.replace(r2, ""), s2 = t2[o2];
      n[i2] = s2;
    }
  }), n;
}
function Gc(t2) {
  if (!t2.includes("wc:")) {
    const u2 = je$2(t2);
    u2 != null && u2.includes("wc:") && (t2 = u2);
  }
  t2 = t2.includes("wc://") ? t2.replace("wc://", "") : t2, t2 = t2.includes("wc:") ? t2.replace("wc:", "") : t2;
  const e = t2.indexOf(":"), n = t2.indexOf("?") !== -1 ? t2.indexOf("?") : void 0, r2 = t2.substring(0, e), o2 = t2.substring(e + 1, n).split("@"), i2 = typeof n < "u" ? t2.substring(n) : "", s2 = new URLSearchParams(i2), c2 = {};
  s2.forEach((u2, l2) => {
    c2[l2] = u2;
  });
  const a2 = typeof c2.methods == "string" ? c2.methods.split(",") : void 0;
  return { protocol: r2, topic: ao$1(o2[0]), version: parseInt(o2[1], 10), symKey: c2.symKey, relay: co$1(c2), methods: a2, expiryTimestamp: c2.expiryTimestamp ? parseInt(c2.expiryTimestamp, 10) : void 0 };
}
function ao$1(t2) {
  return t2.startsWith("//") ? t2.substring(2) : t2;
}
function uo$1(t2, e = "-") {
  const n = "relay", r2 = {};
  return Object.keys(t2).forEach((o2) => {
    const i2 = o2, s2 = n + e + i2;
    t2[i2] && (r2[s2] = t2[i2]);
  }), r2;
}
function Wc(t2) {
  const e = new URLSearchParams(), n = uo$1(t2.relay);
  Object.keys(n).sort().forEach((o2) => {
    e.set(o2, n[o2]);
  }), e.set("symKey", t2.symKey), t2.expiryTimestamp && e.set("expiryTimestamp", t2.expiryTimestamp.toString()), t2.methods && e.set("methods", t2.methods.join(","));
  const r2 = e.toString();
  return `${t2.protocol}:${t2.topic}@${t2.version}?${r2}`;
}
function Xc(t2, e, n) {
  return `${t2}?wc_ev=${n}&topic=${e}`;
}
var Jc = Object.defineProperty, Qc = Object.defineProperties, ta = Object.getOwnPropertyDescriptors, fo$1 = Object.getOwnPropertySymbols, ea = Object.prototype.hasOwnProperty, na = Object.prototype.propertyIsEnumerable, lo$1 = (t2, e, n) => e in t2 ? Jc(t2, e, { enumerable: true, configurable: true, writable: true, value: n }) : t2[e] = n, ra = (t2, e) => {
  for (var n in e || (e = {})) ea.call(e, n) && lo$1(t2, n, e[n]);
  if (fo$1) for (var n of fo$1(e)) na.call(e, n) && lo$1(t2, n, e[n]);
  return t2;
}, oa = (t2, e) => Qc(t2, ta(e));
function It$2(t2) {
  const e = [];
  return t2.forEach((n) => {
    const [r2, o2] = n.split(":");
    e.push(`${r2}:${o2}`);
  }), e;
}
function ho$1(t2) {
  const e = [];
  return Object.values(t2).forEach((n) => {
    e.push(...It$2(n.accounts));
  }), e;
}
function po$1(t2, e) {
  const n = [];
  return Object.values(t2).forEach((r2) => {
    It$2(r2.accounts).includes(e) && n.push(...r2.methods);
  }), n;
}
function go$1(t2, e) {
  const n = [];
  return Object.values(t2).forEach((r2) => {
    It$2(r2.accounts).includes(e) && n.push(...r2.events);
  }), n;
}
function yn$1(t2) {
  return t2.includes(":");
}
function yo$1(t2) {
  return yn$1(t2) ? t2.split(":")[0] : t2;
}
function ie$1(t2) {
  var e, n, r2;
  const o2 = {};
  if (!Oe$1(t2)) return o2;
  for (const [i2, s2] of Object.entries(t2)) {
    const c2 = yn$1(i2) ? [i2] : s2.chains, a2 = s2.methods || [], u2 = s2.events || [], l2 = yo$1(i2);
    o2[l2] = oa(ra({}, o2[l2]), { chains: ot$1(c2, (e = o2[l2]) == null ? void 0 : e.chains), methods: ot$1(a2, (n = o2[l2]) == null ? void 0 : n.methods), events: ot$1(u2, (r2 = o2[l2]) == null ? void 0 : r2.events) });
  }
  return o2;
}
function mo$1(t2) {
  const e = {};
  return t2 == null ? void 0 : t2.forEach((n) => {
    var r2;
    const [o2, i2] = n.split(":");
    e[o2] || (e[o2] = { accounts: [], chains: [], events: [], methods: [] }), e[o2].accounts.push(n), (r2 = e[o2].chains) == null || r2.push(`${o2}:${i2}`);
  }), e;
}
function ca(t2, e) {
  e = e.map((r2) => r2.replace("did:pkh:", ""));
  const n = mo$1(e);
  for (const [r2, o2] of Object.entries(n)) o2.methods ? o2.methods = ot$1(o2.methods, t2) : o2.methods = t2, o2.events = ["chainChanged", "accountsChanged"];
  return n;
}
function aa(t2, e) {
  var n, r2, o2, i2, s2, c2;
  const a2 = ie$1(t2), u2 = ie$1(e), l2 = {}, f3 = Object.keys(a2).concat(Object.keys(u2));
  for (const h3 of f3) l2[h3] = { chains: ot$1((n = a2[h3]) == null ? void 0 : n.chains, (r2 = u2[h3]) == null ? void 0 : r2.chains), methods: ot$1((o2 = a2[h3]) == null ? void 0 : o2.methods, (i2 = u2[h3]) == null ? void 0 : i2.methods), events: ot$1((s2 = a2[h3]) == null ? void 0 : s2.events, (c2 = u2[h3]) == null ? void 0 : c2.events) };
  return l2;
}
const wo$1 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, bo$1 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function ht$2(t2, e) {
  const { message: n, code: r2 } = bo$1[t2];
  return { message: e ? `${n} ${e}` : n, code: r2 };
}
function Nt$1(t2, e) {
  const { message: n, code: r2 } = wo$1[t2];
  return { message: e ? `${n} ${e}` : n, code: r2 };
}
function se$2(t2, e) {
  return Array.isArray(t2) ? true : false;
}
function Oe$1(t2) {
  return Object.getPrototypeOf(t2) === Object.prototype && Object.keys(t2).length;
}
function Et$2(t2) {
  return typeof t2 > "u";
}
function nt$1(t2, e) {
  return e && Et$2(t2) ? true : typeof t2 == "string" && !!t2.trim().length;
}
function Ae$1(t2, e) {
  return e && Et$2(t2) ? true : typeof t2 == "number" && !isNaN(t2);
}
function ua(t2, e) {
  const { requiredNamespaces: n } = e, r2 = Object.keys(t2.namespaces), o2 = Object.keys(n);
  let i2 = true;
  return gt$2(o2, r2) ? (r2.forEach((s2) => {
    const { accounts: c2, methods: a2, events: u2 } = t2.namespaces[s2], l2 = It$2(c2), f3 = n[s2];
    (!gt$2(ue$2(s2, f3), l2) || !gt$2(f3.methods, a2) || !gt$2(f3.events, u2)) && (i2 = false);
  }), i2) : false;
}
function ce$2(t2) {
  return nt$1(t2, false) && t2.includes(":") ? t2.split(":").length === 2 : false;
}
function Eo$1(t2) {
  if (nt$1(t2, false) && t2.includes(":")) {
    const e = t2.split(":");
    if (e.length === 3) {
      const n = e[0] + ":" + e[1];
      return !!e[2] && ce$2(n);
    }
  }
  return false;
}
function fa(t2) {
  function e(n) {
    try {
      return typeof new URL(n) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (nt$1(t2, false)) {
      if (e(t2)) return true;
      const n = je$2(t2);
      return e(n);
    }
  } catch {
  }
  return false;
}
function la(t2) {
  var e;
  return (e = t2 == null ? void 0 : t2.proposer) == null ? void 0 : e.publicKey;
}
function da(t2) {
  return t2 == null ? void 0 : t2.topic;
}
function ha(t2, e) {
  let n = null;
  return nt$1(t2 == null ? void 0 : t2.publicKey, false) || (n = ht$2("MISSING_OR_INVALID", `${e} controller public key should be a string`)), n;
}
function mn$1(t2) {
  let e = true;
  return se$2(t2) ? t2.length && (e = t2.every((n) => nt$1(n, false))) : e = false, e;
}
function vo$1(t2, e, n) {
  let r2 = null;
  return se$2(e) && e.length ? e.forEach((o2) => {
    r2 || ce$2(o2) || (r2 = Nt$1("UNSUPPORTED_CHAINS", `${n}, chain ${o2} should be a string and conform to "namespace:chainId" format`));
  }) : ce$2(t2) || (r2 = Nt$1("UNSUPPORTED_CHAINS", `${n}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r2;
}
function xo$1(t2, e, n) {
  let r2 = null;
  return Object.entries(t2).forEach(([o2, i2]) => {
    if (r2) return;
    const s2 = vo$1(o2, ue$2(o2, i2), `${e} ${n}`);
    s2 && (r2 = s2);
  }), r2;
}
function So$1(t2, e) {
  let n = null;
  return se$2(t2) ? t2.forEach((r2) => {
    n || Eo$1(r2) || (n = Nt$1("UNSUPPORTED_ACCOUNTS", `${e}, account ${r2} should be a string and conform to "namespace:chainId:address" format`));
  }) : n = Nt$1("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n;
}
function Oo$1(t2, e) {
  let n = null;
  return Object.values(t2).forEach((r2) => {
    if (n) return;
    const o2 = So$1(r2 == null ? void 0 : r2.accounts, `${e} namespace`);
    o2 && (n = o2);
  }), n;
}
function Ao$1(t2, e) {
  let n = null;
  return mn$1(t2 == null ? void 0 : t2.methods) ? mn$1(t2 == null ? void 0 : t2.events) || (n = Nt$1("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : n = Nt$1("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), n;
}
function wn$1(t2, e) {
  let n = null;
  return Object.values(t2).forEach((r2) => {
    if (n) return;
    const o2 = Ao$1(r2, `${e}, namespace`);
    o2 && (n = o2);
  }), n;
}
function pa(t2, e, n) {
  let r2 = null;
  if (t2 && Oe$1(t2)) {
    const o2 = wn$1(t2, e);
    o2 && (r2 = o2);
    const i2 = xo$1(t2, e, n);
    i2 && (r2 = i2);
  } else r2 = ht$2("MISSING_OR_INVALID", `${e}, ${n} should be an object with data`);
  return r2;
}
function Bo$1(t2, e) {
  let n = null;
  if (t2 && Oe$1(t2)) {
    const r2 = wn$1(t2, e);
    r2 && (n = r2);
    const o2 = Oo$1(t2, e);
    o2 && (n = o2);
  } else n = ht$2("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return n;
}
function Io$1(t2) {
  return nt$1(t2.protocol, true);
}
function ga(t2, e) {
  let n = false;
  return !t2 ? n = true : t2 && se$2(t2) && t2.length && t2.forEach((r2) => {
    n = Io$1(r2);
  }), n;
}
function ya(t2) {
  return typeof t2 == "number";
}
function ma(t2) {
  return typeof t2 < "u" && typeof t2 !== null;
}
function wa(t2) {
  return !(!t2 || typeof t2 != "object" || !t2.code || !Ae$1(t2.code, false) || !t2.message || !nt$1(t2.message, false));
}
function ba(t2) {
  return !(Et$2(t2) || !nt$1(t2.method, false));
}
function Ea(t2) {
  return !(Et$2(t2) || Et$2(t2.result) && Et$2(t2.error) || !Ae$1(t2.id, false) || !nt$1(t2.jsonrpc, false));
}
function va(t2) {
  return !(Et$2(t2) || !nt$1(t2.name, false));
}
function xa(t2, e) {
  return !(!ce$2(e) || !ho$1(t2).includes(e));
}
function Sa(t2, e, n) {
  return nt$1(n, false) ? po$1(t2, e).includes(n) : false;
}
function Oa(t2, e, n) {
  return nt$1(n, false) ? go$1(t2, e).includes(n) : false;
}
function No$1(t2, e, n) {
  let r2 = null;
  const o2 = Aa(t2), i2 = Ba(e), s2 = Object.keys(o2), c2 = Object.keys(i2), a2 = Uo$1(Object.keys(t2)), u2 = Uo$1(Object.keys(e)), l2 = a2.filter((f3) => !u2.includes(f3));
  return l2.length && (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l2.toString()}
      Received: ${Object.keys(e).toString()}`)), gt$2(s2, c2) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n} namespaces chains don't satisfy required namespaces.
      Required: ${s2.toString()}
      Approved: ${c2.toString()}`)), Object.keys(e).forEach((f3) => {
    if (!f3.includes(":") || r2) return;
    const h3 = It$2(e[f3].accounts);
    h3.includes(f3) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n} namespaces accounts don't satisfy namespace accounts for ${f3}
        Required: ${f3}
        Approved: ${h3.toString()}`));
  }), s2.forEach((f3) => {
    r2 || (gt$2(o2[f3].methods, i2[f3].methods) ? gt$2(o2[f3].events, i2[f3].events) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n} namespaces events don't satisfy namespace events for ${f3}`)) : r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n} namespaces methods don't satisfy namespace methods for ${f3}`));
  }), r2;
}
function Aa(t2) {
  const e = {};
  return Object.keys(t2).forEach((n) => {
    var r2;
    n.includes(":") ? e[n] = t2[n] : (r2 = t2[n].chains) == null || r2.forEach((o2) => {
      e[o2] = { methods: t2[n].methods, events: t2[n].events };
    });
  }), e;
}
function Uo$1(t2) {
  return [...new Set(t2.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function Ba(t2) {
  const e = {};
  return Object.keys(t2).forEach((n) => {
    if (n.includes(":")) e[n] = t2[n];
    else {
      const r2 = It$2(t2[n].accounts);
      r2 == null ? void 0 : r2.forEach((o2) => {
        e[o2] = { accounts: t2[n].accounts.filter((i2) => i2.includes(`${o2}:`)), methods: t2[n].methods, events: t2[n].events };
      });
    }
  }), e;
}
function Ia(t2, e) {
  return Ae$1(t2, false) && t2 <= e.max && t2 >= e.min;
}
function Na() {
  const t2 = xt$2();
  return new Promise((e) => {
    switch (t2) {
      case Y$2.browser:
        e(To$1());
        break;
      case Y$2.reactNative:
        e(Ro$1());
        break;
      case Y$2.node:
        e(_o$1());
        break;
      default:
        e(true);
    }
  });
}
function To$1() {
  return Tt$2() && (navigator == null ? void 0 : navigator.onLine);
}
async function Ro$1() {
  if (pt$2() && typeof global < "u" && global != null && global.NetInfo) {
    const t2 = await (global == null ? void 0 : global.NetInfo.fetch());
    return t2 == null ? void 0 : t2.isConnected;
  }
  return true;
}
function _o$1() {
  return true;
}
function Ua(t2) {
  switch (xt$2()) {
    case Y$2.browser:
      $o$1(t2);
      break;
    case Y$2.reactNative:
      Lo$1(t2);
      break;
  }
}
function $o$1(t2) {
  !pt$2() && Tt$2() && (window.addEventListener("online", () => t2(true)), window.addEventListener("offline", () => t2(false)));
}
function Lo$1(t2) {
  var _a;
  pt$2() && typeof global < "u" && global != null && global.NetInfo && ((_a = global) == null ? void 0 : _a.NetInfo.addEventListener((e) => t2(e == null ? void 0 : e.isConnected)));
}
function Ta() {
  var t2;
  return Tt$2() && getDocument_1() ? ((t2 = getDocument_1()) == null ? void 0 : t2.visibilityState) === "visible" : true;
}
const bn$1 = {};
class Ra {
  static get(e) {
    return bn$1[e];
  }
  static set(e, n) {
    bn$1[e] = n;
  }
  static delete(e) {
    delete bn$1[e];
  }
}
const ze$1 = "wc", Le$2 = 2, he$1 = "core", B$1 = `${ze$1}@2:${he$1}:`, Et$1 = { logger: "error" }, It$1 = { database: ":memory:" }, Tt$1 = "crypto", ke$2 = "client_ed25519_seed", Ct = cjs.ONE_DAY, Pt$1 = "keychain", St$2 = "0.3", Ot = "messages", Rt$1 = "0.3", je$1 = cjs.SIX_HOURS, At = "publisher", xt$1 = "irn", Nt = "error", Ue$2 = "wss://relay.walletconnect.org", $t = "relayer", C$1 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, zt$1 = "_subscription", L$1 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, Lt$1 = 0.1, _e$2 = "2.21.0", Q$1 = { link_mode: "link_mode", relay: "relay" }, le$1 = { inbound: "inbound", outbound: "outbound" }, kt$1 = "0.3", jt$1 = "WALLETCONNECT_CLIENT_ID", Fe$1 = "WALLETCONNECT_LINK_MODE_APPS", $$2 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, Ut$1 = "subscription", Ft$1 = "0.3", Mt$1 = "pairing", Kt$1 = "0.3", se$1 = { wc_pairingDelete: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: cjs.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: cjs.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 0 } } }, re$1 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, F$1 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, Bt$1 = "history", Vt$1 = "0.3", qt$1 = "expirer", M$1 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, Gt$1 = "0.3", Wt$1 = "verify-api", Zs = "https://verify.walletconnect.com", Ht = "https://verify.walletconnect.org", ue$1 = Ht, Yt$1 = `${ue$1}/v3`, Jt$1 = [Zs, Ht], Xt$1 = "echo", Zt$1 = "https://echo.walletconnect.com", G = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, Y$1 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, er = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, tr = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, ir = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, sr = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, Qt$1 = 0.1, ei = "event-client", ti = 86400, ii = "https://pulse.walletconnect.org/batch";
function rr(r2, e) {
  if (r2.length >= 255) throw new TypeError("Alphabet too long");
  for (var t2 = new Uint8Array(256), i2 = 0; i2 < t2.length; i2++) t2[i2] = 255;
  for (var s2 = 0; s2 < r2.length; s2++) {
    var n = r2.charAt(s2), o2 = n.charCodeAt(0);
    if (t2[o2] !== 255) throw new TypeError(n + " is ambiguous");
    t2[o2] = s2;
  }
  var a2 = r2.length, c2 = r2.charAt(0), h3 = Math.log(a2) / Math.log(256), l2 = Math.log(256) / Math.log(a2);
  function d3(u2) {
    if (u2 instanceof Uint8Array || (ArrayBuffer.isView(u2) ? u2 = new Uint8Array(u2.buffer, u2.byteOffset, u2.byteLength) : Array.isArray(u2) && (u2 = Uint8Array.from(u2))), !(u2 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (u2.length === 0) return "";
    for (var b2 = 0, x2 = 0, I3 = 0, D2 = u2.length; I3 !== D2 && u2[I3] === 0; ) I3++, b2++;
    for (var j2 = (D2 - I3) * l2 + 1 >>> 0, T2 = new Uint8Array(j2); I3 !== D2; ) {
      for (var q2 = u2[I3], J3 = 0, K2 = j2 - 1; (q2 !== 0 || J3 < x2) && K2 !== -1; K2--, J3++) q2 += 256 * T2[K2] >>> 0, T2[K2] = q2 % a2 >>> 0, q2 = q2 / a2 >>> 0;
      if (q2 !== 0) throw new Error("Non-zero carry");
      x2 = J3, I3++;
    }
    for (var H2 = j2 - x2; H2 !== j2 && T2[H2] === 0; ) H2++;
    for (var me2 = c2.repeat(b2); H2 < j2; ++H2) me2 += r2.charAt(T2[H2]);
    return me2;
  }
  function g(u2) {
    if (typeof u2 != "string") throw new TypeError("Expected String");
    if (u2.length === 0) return new Uint8Array();
    var b2 = 0;
    if (u2[b2] !== " ") {
      for (var x2 = 0, I3 = 0; u2[b2] === c2; ) x2++, b2++;
      for (var D2 = (u2.length - b2) * h3 + 1 >>> 0, j2 = new Uint8Array(D2); u2[b2]; ) {
        var T2 = t2[u2.charCodeAt(b2)];
        if (T2 === 255) return;
        for (var q2 = 0, J3 = D2 - 1; (T2 !== 0 || q2 < I3) && J3 !== -1; J3--, q2++) T2 += a2 * j2[J3] >>> 0, j2[J3] = T2 % 256 >>> 0, T2 = T2 / 256 >>> 0;
        if (T2 !== 0) throw new Error("Non-zero carry");
        I3 = q2, b2++;
      }
      if (u2[b2] !== " ") {
        for (var K2 = D2 - I3; K2 !== D2 && j2[K2] === 0; ) K2++;
        for (var H2 = new Uint8Array(x2 + (D2 - K2)), me2 = x2; K2 !== D2; ) H2[me2++] = j2[K2++];
        return H2;
      }
    }
  }
  function _(u2) {
    var b2 = g(u2);
    if (b2) return b2;
    throw new Error(`Non-${e} character`);
  }
  return { encode: d3, decodeUnsafe: g, decode: _ };
}
var nr = rr, or = nr;
const si = (r2) => {
  if (r2 instanceof Uint8Array && r2.constructor.name === "Uint8Array") return r2;
  if (r2 instanceof ArrayBuffer) return new Uint8Array(r2);
  if (ArrayBuffer.isView(r2)) return new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
  throw new Error("Unknown type, must be binary type");
}, ar = (r2) => new TextEncoder().encode(r2), cr = (r2) => new TextDecoder().decode(r2);
class hr {
  constructor(e, t2, i2) {
    this.name = e, this.prefix = t2, this.baseEncode = i2;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class lr {
  constructor(e, t2, i2) {
    if (this.name = e, this.prefix = t2, t2.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t2.codePointAt(0), this.baseDecode = i2;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return ri(this, e);
  }
}
class ur {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return ri(this, e);
  }
  decode(e) {
    const t2 = e[0], i2 = this.decoders[t2];
    if (i2) return i2.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const ri = (r2, e) => new ur({ ...r2.decoders || { [r2.prefix]: r2 }, ...e.decoders || { [e.prefix]: e } });
class dr {
  constructor(e, t2, i2, s2) {
    this.name = e, this.prefix = t2, this.baseEncode = i2, this.baseDecode = s2, this.encoder = new hr(e, t2, i2), this.decoder = new lr(e, t2, s2);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Ee$2 = ({ name: r2, prefix: e, encode: t2, decode: i2 }) => new dr(r2, e, t2, i2), de$1 = ({ prefix: r2, name: e, alphabet: t2 }) => {
  const { encode: i2, decode: s2 } = or(t2, e);
  return Ee$2({ prefix: r2, name: e, encode: i2, decode: (n) => si(s2(n)) });
}, gr = (r2, e, t2, i2) => {
  const s2 = {};
  for (let l2 = 0; l2 < e.length; ++l2) s2[e[l2]] = l2;
  let n = r2.length;
  for (; r2[n - 1] === "="; ) --n;
  const o2 = new Uint8Array(n * t2 / 8 | 0);
  let a2 = 0, c2 = 0, h3 = 0;
  for (let l2 = 0; l2 < n; ++l2) {
    const d3 = s2[r2[l2]];
    if (d3 === void 0) throw new SyntaxError(`Non-${i2} character`);
    c2 = c2 << t2 | d3, a2 += t2, a2 >= 8 && (a2 -= 8, o2[h3++] = 255 & c2 >> a2);
  }
  if (a2 >= t2 || 255 & c2 << 8 - a2) throw new SyntaxError("Unexpected end of data");
  return o2;
}, pr = (r2, e, t2) => {
  const i2 = e[e.length - 1] === "=", s2 = (1 << t2) - 1;
  let n = "", o2 = 0, a2 = 0;
  for (let c2 = 0; c2 < r2.length; ++c2) for (a2 = a2 << 8 | r2[c2], o2 += 8; o2 > t2; ) o2 -= t2, n += e[s2 & a2 >> o2];
  if (o2 && (n += e[s2 & a2 << t2 - o2]), i2) for (; n.length * t2 & 7; ) n += "=";
  return n;
}, P2 = ({ name: r2, prefix: e, bitsPerChar: t2, alphabet: i2 }) => Ee$2({ prefix: e, name: r2, encode(s2) {
  return pr(s2, i2, t2);
}, decode(s2) {
  return gr(s2, i2, t2, r2);
} }), yr = Ee$2({ prefix: "\0", name: "identity", encode: (r2) => cr(r2), decode: (r2) => ar(r2) });
var br = Object.freeze({ __proto__: null, identity: yr });
const mr = P2({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var fr = Object.freeze({ __proto__: null, base2: mr });
const Dr = P2({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var vr = Object.freeze({ __proto__: null, base8: Dr });
const wr = de$1({ prefix: "9", name: "base10", alphabet: "0123456789" });
var _r = Object.freeze({ __proto__: null, base10: wr });
const Er = P2({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Ir = P2({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Tr = Object.freeze({ __proto__: null, base16: Er, base16upper: Ir });
const Cr = P2({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Pr = P2({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Sr = P2({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Or = P2({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Rr = P2({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), Ar = P2({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), xr = P2({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), Nr = P2({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), $r = P2({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var zr = Object.freeze({ __proto__: null, base32: Cr, base32upper: Pr, base32pad: Sr, base32padupper: Or, base32hex: Rr, base32hexupper: Ar, base32hexpad: xr, base32hexpadupper: Nr, base32z: $r });
const Lr2 = de$1({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), kr = de$1({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var jr = Object.freeze({ __proto__: null, base36: Lr2, base36upper: kr });
const Ur = de$1({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), Fr = de$1({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Mr = Object.freeze({ __proto__: null, base58btc: Ur, base58flickr: Fr });
const Kr = P2({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), Br = P2({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Vr = P2({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), qr = P2({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Gr = Object.freeze({ __proto__: null, base64: Kr, base64pad: Br, base64url: Vr, base64urlpad: qr });
const ni = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Wr = ni.reduce((r2, e, t2) => (r2[t2] = e, r2), []), Hr = ni.reduce((r2, e, t2) => (r2[e.codePointAt(0)] = t2, r2), []);
function Yr(r2) {
  return r2.reduce((e, t2) => (e += Wr[t2], e), "");
}
function Jr(r2) {
  const e = [];
  for (const t2 of r2) {
    const i2 = Hr[t2.codePointAt(0)];
    if (i2 === void 0) throw new Error(`Non-base256emoji character: ${t2}`);
    e.push(i2);
  }
  return new Uint8Array(e);
}
const Xr = Ee$2({ prefix: "🚀", name: "base256emoji", encode: Yr, decode: Jr });
var Zr = Object.freeze({ __proto__: null, base256emoji: Xr }), Qr = ai, oi = 128, tn = -128, sn = Math.pow(2, 31);
function ai(r2, e, t2) {
  e = e || [], t2 = t2 || 0;
  for (var i2 = t2; r2 >= sn; ) e[t2++] = r2 & 255 | oi, r2 /= 128;
  for (; r2 & tn; ) e[t2++] = r2 & 255 | oi, r2 >>>= 7;
  return e[t2] = r2 | 0, ai.bytes = t2 - i2 + 1, e;
}
var rn = Me$2, nn = 128, ci = 127;
function Me$2(r2, i2) {
  var t2 = 0, i2 = i2 || 0, s2 = 0, n = i2, o2, a2 = r2.length;
  do {
    if (n >= a2) throw Me$2.bytes = 0, new RangeError("Could not decode varint");
    o2 = r2[n++], t2 += s2 < 28 ? (o2 & ci) << s2 : (o2 & ci) * Math.pow(2, s2), s2 += 7;
  } while (o2 >= nn);
  return Me$2.bytes = n - i2, t2;
}
var on = Math.pow(2, 7), an = Math.pow(2, 14), cn = Math.pow(2, 21), hn = Math.pow(2, 28), ln = Math.pow(2, 35), un = Math.pow(2, 42), dn = Math.pow(2, 49), gn = Math.pow(2, 56), pn = Math.pow(2, 63), yn = function(r2) {
  return r2 < on ? 1 : r2 < an ? 2 : r2 < cn ? 3 : r2 < hn ? 4 : r2 < ln ? 5 : r2 < un ? 6 : r2 < dn ? 7 : r2 < gn ? 8 : r2 < pn ? 9 : 10;
}, bn = { encode: Qr, decode: rn, encodingLength: yn }, hi = bn;
const li = (r2, e, t2 = 0) => (hi.encode(r2, e, t2), e), ui = (r2) => hi.encodingLength(r2), Ke$2 = (r2, e) => {
  const t2 = e.byteLength, i2 = ui(r2), s2 = i2 + ui(t2), n = new Uint8Array(s2 + t2);
  return li(r2, n, 0), li(t2, n, i2), n.set(e, s2), new mn(r2, t2, e, n);
};
class mn {
  constructor(e, t2, i2, s2) {
    this.code = e, this.size = t2, this.digest = i2, this.bytes = s2;
  }
}
const di = ({ name: r2, code: e, encode: t2 }) => new fn(r2, e, t2);
class fn {
  constructor(e, t2, i2) {
    this.name = e, this.code = t2, this.encode = i2;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t2 = this.encode(e);
      return t2 instanceof Uint8Array ? Ke$2(this.code, t2) : t2.then((i2) => Ke$2(this.code, i2));
    } else throw Error("Unknown type, must be binary type");
  }
}
const gi = (r2) => async (e) => new Uint8Array(await crypto.subtle.digest(r2, e)), Dn = di({ name: "sha2-256", code: 18, encode: gi("SHA-256") }), vn = di({ name: "sha2-512", code: 19, encode: gi("SHA-512") });
var wn = Object.freeze({ __proto__: null, sha256: Dn, sha512: vn });
const pi = 0, _n = "identity", yi = si, En2 = (r2) => Ke$2(pi, yi(r2)), In = { code: pi, name: _n, encode: yi, digest: En2 };
var Tn = Object.freeze({ __proto__: null, identity: In });
new TextEncoder(), new TextDecoder();
const bi = { ...br, ...fr, ...vr, ..._r, ...Tr, ...zr, ...jr, ...Mr, ...Gr, ...Zr };
({ ...wn, ...Tn });
function Cn(r2 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r2) : new Uint8Array(r2);
}
function mi(r2, e, t2, i2) {
  return { name: r2, prefix: e, encoder: { name: r2, prefix: e, encode: t2 }, decoder: { decode: i2 } };
}
const fi = mi("utf8", "u", (r2) => "u" + new TextDecoder("utf8").decode(r2), (r2) => new TextEncoder().encode(r2.substring(1))), Be$1 = mi("ascii", "a", (r2) => {
  let e = "a";
  for (let t2 = 0; t2 < r2.length; t2++) e += String.fromCharCode(r2[t2]);
  return e;
}, (r2) => {
  r2 = r2.substring(1);
  const e = Cn(r2.length);
  for (let t2 = 0; t2 < r2.length; t2++) e[t2] = r2.charCodeAt(t2);
  return e;
}), Pn = { utf8: fi, "utf-8": fi, hex: bi.base16, latin1: Be$1, ascii: Be$1, binary: Be$1, ...bi };
function Sn(r2, e = "utf8") {
  const t2 = Pn[e];
  if (!t2) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r2, "utf8") : t2.decoder.decode(`${t2.prefix}${r2}`);
}
var On = Object.defineProperty, Rn = (r2, e, t2) => e in r2 ? On(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, W$1 = (r2, e, t2) => Rn(r2, typeof e != "symbol" ? e + "" : e, t2);
class Di {
  constructor(e, t2) {
    this.core = e, this.logger = t2, W$1(this, "keychain", /* @__PURE__ */ new Map()), W$1(this, "name", Pt$1), W$1(this, "version", St$2), W$1(this, "initialized", false), W$1(this, "storagePrefix", B$1), W$1(this, "init", async () => {
      if (!this.initialized) {
        const i2 = await this.getKeyChain();
        typeof i2 < "u" && (this.keychain = i2), this.initialized = true;
      }
    }), W$1(this, "has", (i2) => (this.isInitialized(), this.keychain.has(i2))), W$1(this, "set", async (i2, s2) => {
      this.isInitialized(), this.keychain.set(i2, s2), await this.persist();
    }), W$1(this, "get", (i2) => {
      this.isInitialized();
      const s2 = this.keychain.get(i2);
      if (typeof s2 > "u") {
        const { message: n } = ht$2("NO_MATCHING_KEY", `${this.name}: ${i2}`);
        throw new Error(n);
      }
      return s2;
    }), W$1(this, "del", async (i2) => {
      this.isInitialized(), this.keychain.delete(i2), await this.persist();
    }), this.core = e, this.logger = E$3(t2, this.name);
  }
  get context() {
    return y$4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, fi$1(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? li$1(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var An = Object.defineProperty, xn = (r2, e, t2) => e in r2 ? An(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, S$1 = (r2, e, t2) => xn(r2, typeof e != "symbol" ? e + "" : e, t2);
class vi {
  constructor(e, t2, i2) {
    this.core = e, this.logger = t2, S$1(this, "name", Tt$1), S$1(this, "keychain"), S$1(this, "randomSessionIdentifier", jc()), S$1(this, "initialized", false), S$1(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), S$1(this, "hasKeys", (s2) => (this.isInitialized(), this.keychain.has(s2))), S$1(this, "getClientId", async () => {
      this.isInitialized();
      const s2 = await this.getClientSeed(), n = Po$1(s2);
      return Qe$3(n.publicKey);
    }), S$1(this, "generateKeyPair", () => {
      this.isInitialized();
      const s2 = Lc();
      return this.setPrivateKey(s2.publicKey, s2.privateKey);
    }), S$1(this, "signJWT", async (s2) => {
      this.isInitialized();
      const n = await this.getClientSeed(), o2 = Po$1(n), a2 = this.randomSessionIdentifier, c2 = Ct;
      return await Qo(a2, s2, c2, o2);
    }), S$1(this, "generateSharedKey", (s2, n, o2) => {
      this.isInitialized();
      const a2 = this.getPrivateKey(s2), c2 = Cc(a2, n);
      return this.setSymKey(c2, o2);
    }), S$1(this, "setSymKey", async (s2, n) => {
      this.isInitialized();
      const o2 = n || Pc(s2);
      return await this.keychain.set(o2, s2), o2;
    }), S$1(this, "deleteKeyPair", async (s2) => {
      this.isInitialized(), await this.keychain.del(s2);
    }), S$1(this, "deleteSymKey", async (s2) => {
      this.isInitialized(), await this.keychain.del(s2);
    }), S$1(this, "encode", async (s2, n, o2) => {
      this.isInitialized();
      const a2 = oo$1(o2), c2 = safeJsonStringify(n);
      if (Fc(a2)) return Dc(c2, o2 == null ? void 0 : o2.encoding);
      if (Kc(a2)) {
        const g = a2.senderPublicKey, _ = a2.receiverPublicKey;
        s2 = await this.generateSharedKey(g, _);
      }
      const h3 = this.getSymKey(s2), { type: l2, senderPublicKey: d3 } = a2;
      return Vc({ type: l2, symKey: h3, message: c2, senderPublicKey: d3, encoding: o2 == null ? void 0 : o2.encoding });
    }), S$1(this, "decode", async (s2, n, o2) => {
      this.isInitialized();
      const a2 = qc(n, o2);
      if (Fc(a2)) {
        const c2 = Hc(n, o2 == null ? void 0 : o2.encoding);
        return safeJsonParse(c2);
      }
      if (Kc(a2)) {
        const c2 = a2.receiverPublicKey, h3 = a2.senderPublicKey;
        s2 = await this.generateSharedKey(c2, h3);
      }
      try {
        const c2 = this.getSymKey(s2), h3 = Mc({ symKey: c2, encoded: n, encoding: o2 == null ? void 0 : o2.encoding });
        return safeJsonParse(h3);
      } catch (c2) {
        this.logger.error(`Failed to decode message from topic: '${s2}', clientId: '${await this.getClientId()}'`), this.logger.error(c2);
      }
    }), S$1(this, "getPayloadType", (s2, n = qt$2) => {
      const o2 = Se$1({ encoded: s2, encoding: n });
      return Bt$2(o2.type);
    }), S$1(this, "getPayloadSenderPublicKey", (s2, n = qt$2) => {
      const o2 = Se$1({ encoded: s2, encoding: n });
      return o2.senderPublicKey ? toString(o2.senderPublicKey, G$1) : void 0;
    }), this.core = e, this.logger = E$3(t2, this.name), this.keychain = i2 || new Di(this.core, this.logger);
  }
  get context() {
    return y$4(this.logger);
  }
  async setPrivateKey(e, t2) {
    return await this.keychain.set(e, t2), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(ke$2);
    } catch {
      e = jc(), await this.keychain.set(ke$2, e);
    }
    return Sn(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Nn = Object.defineProperty, $n = Object.defineProperties, zn = Object.getOwnPropertyDescriptors, wi = Object.getOwnPropertySymbols, Ln = Object.prototype.hasOwnProperty, kn = Object.prototype.propertyIsEnumerable, Ve$1 = (r2, e, t2) => e in r2 ? Nn(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, jn = (r2, e) => {
  for (var t2 in e || (e = {})) Ln.call(e, t2) && Ve$1(r2, t2, e[t2]);
  if (wi) for (var t2 of wi(e)) kn.call(e, t2) && Ve$1(r2, t2, e[t2]);
  return r2;
}, Un = (r2, e) => $n(r2, zn(e)), k$1 = (r2, e, t2) => Ve$1(r2, typeof e != "symbol" ? e + "" : e, t2);
class _i extends y$2 {
  constructor(e, t2) {
    super(e, t2), this.logger = e, this.core = t2, k$1(this, "messages", /* @__PURE__ */ new Map()), k$1(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), k$1(this, "name", Ot), k$1(this, "version", Rt$1), k$1(this, "initialized", false), k$1(this, "storagePrefix", B$1), k$1(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i2 = await this.getRelayerMessages();
          typeof i2 < "u" && (this.messages = i2);
          const s2 = await this.getRelayerMessagesWithoutClientAck();
          typeof s2 < "u" && (this.messagesWithoutClientAck = s2), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i2) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i2);
        } finally {
          this.initialized = true;
        }
      }
    }), k$1(this, "set", async (i2, s2, n) => {
      this.isInitialized();
      const o2 = kc(s2);
      let a2 = this.messages.get(i2);
      if (typeof a2 > "u" && (a2 = {}), typeof a2[o2] < "u") return o2;
      if (a2[o2] = s2, this.messages.set(i2, a2), n === le$1.inbound) {
        const c2 = this.messagesWithoutClientAck.get(i2) || {};
        this.messagesWithoutClientAck.set(i2, Un(jn({}, c2), { [o2]: s2 }));
      }
      return await this.persist(), o2;
    }), k$1(this, "get", (i2) => {
      this.isInitialized();
      let s2 = this.messages.get(i2);
      return typeof s2 > "u" && (s2 = {}), s2;
    }), k$1(this, "getWithoutAck", (i2) => {
      this.isInitialized();
      const s2 = {};
      for (const n of i2) {
        const o2 = this.messagesWithoutClientAck.get(n) || {};
        s2[n] = Object.values(o2);
      }
      return s2;
    }), k$1(this, "has", (i2, s2) => {
      this.isInitialized();
      const n = this.get(i2), o2 = kc(s2);
      return typeof n[o2] < "u";
    }), k$1(this, "ack", async (i2, s2) => {
      this.isInitialized();
      const n = this.messagesWithoutClientAck.get(i2);
      if (typeof n > "u") return;
      const o2 = kc(s2);
      delete n[o2], Object.keys(n).length === 0 ? this.messagesWithoutClientAck.delete(i2) : this.messagesWithoutClientAck.set(i2, n), await this.persist();
    }), k$1(this, "del", async (i2) => {
      this.isInitialized(), this.messages.delete(i2), this.messagesWithoutClientAck.delete(i2), await this.persist();
    }), this.logger = E$3(e, this.name), this.core = t2;
  }
  get context() {
    return y$4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, fi$1(e));
  }
  async setRelayerMessagesWithoutClientAck(e) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, fi$1(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? li$1(e) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e < "u" ? li$1(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Fn = Object.defineProperty, Mn = Object.defineProperties, Kn = Object.getOwnPropertyDescriptors, Ei = Object.getOwnPropertySymbols, Bn = Object.prototype.hasOwnProperty, Vn = Object.prototype.propertyIsEnumerable, qe$1 = (r2, e, t2) => e in r2 ? Fn(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, Ie$1 = (r2, e) => {
  for (var t2 in e || (e = {})) Bn.call(e, t2) && qe$1(r2, t2, e[t2]);
  if (Ei) for (var t2 of Ei(e)) Vn.call(e, t2) && qe$1(r2, t2, e[t2]);
  return r2;
}, Ge$2 = (r2, e) => Mn(r2, Kn(e)), V$1 = (r2, e, t2) => qe$1(r2, typeof e != "symbol" ? e + "" : e, t2);
class qn extends m {
  constructor(e, t2) {
    super(e, t2), this.relayer = e, this.logger = t2, V$1(this, "events", new events.EventEmitter()), V$1(this, "name", At), V$1(this, "queue", /* @__PURE__ */ new Map()), V$1(this, "publishTimeout", cjs.toMiliseconds(cjs.ONE_MINUTE)), V$1(this, "initialPublishTimeout", cjs.toMiliseconds(cjs.ONE_SECOND * 15)), V$1(this, "needsTransportRestart", false), V$1(this, "publish", async (i2, s2, n) => {
      var o2;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i2, message: s2, opts: n } });
      const a2 = (n == null ? void 0 : n.ttl) || je$1, c2 = Zc(n), h3 = (n == null ? void 0 : n.prompt) || false, l2 = (n == null ? void 0 : n.tag) || 0, d3 = (n == null ? void 0 : n.id) || getBigIntRpcId().toString(), g = { topic: i2, message: s2, opts: { ttl: a2, relay: c2, prompt: h3, tag: l2, id: d3, attestation: n == null ? void 0 : n.attestation, tvf: n == null ? void 0 : n.tvf } }, _ = `Failed to publish payload, please try again. id:${d3} tag:${l2}`;
      try {
        const u2 = new Promise(async (b2) => {
          const x2 = ({ id: D2 }) => {
            g.opts.id === D2 && (this.removeRequestFromQueue(D2), this.relayer.events.removeListener(C$1.publish, x2), b2(g));
          };
          this.relayer.events.on(C$1.publish, x2);
          const I3 = yi$1(new Promise((D2, j2) => {
            this.rpcPublish({ topic: i2, message: s2, ttl: a2, prompt: h3, tag: l2, id: d3, attestation: n == null ? void 0 : n.attestation, tvf: n == null ? void 0 : n.tvf }).then(D2).catch((T2) => {
              this.logger.warn(T2, T2 == null ? void 0 : T2.message), j2(T2);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${d3} tag:${l2}`);
          try {
            await I3, this.events.removeListener(C$1.publish, x2);
          } catch (D2) {
            this.queue.set(d3, Ge$2(Ie$1({}, g), { attempt: 1 })), this.logger.warn(D2, D2 == null ? void 0 : D2.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: d3, topic: i2, message: s2, opts: n } }), await yi$1(u2, this.publishTimeout, _);
      } catch (u2) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(u2), (o2 = n == null ? void 0 : n.internal) != null && o2.throwOnFailedPublish) throw u2;
      } finally {
        this.queue.delete(d3);
      }
    }), V$1(this, "on", (i2, s2) => {
      this.events.on(i2, s2);
    }), V$1(this, "once", (i2, s2) => {
      this.events.once(i2, s2);
    }), V$1(this, "off", (i2, s2) => {
      this.events.off(i2, s2);
    }), V$1(this, "removeListener", (i2, s2) => {
      this.events.removeListener(i2, s2);
    }), this.relayer = e, this.logger = E$3(t2, this.name), this.registerEventListeners();
  }
  get context() {
    return y$4(this.logger);
  }
  async rpcPublish(e) {
    var t2, i2, s2, n;
    const { topic: o2, message: a2, ttl: c2 = je$1, prompt: h3, tag: l2, id: d3, attestation: g, tvf: _ } = e, u2 = { method: Yc(Zc().protocol).publish, params: Ie$1({ topic: o2, message: a2, ttl: c2, prompt: h3, tag: l2, attestation: g }, _), id: d3 };
    Et$2((t2 = u2.params) == null ? void 0 : t2.prompt) && ((i2 = u2.params) == null || delete i2.prompt), Et$2((s2 = u2.params) == null ? void 0 : s2.tag) && ((n = u2.params) == null || delete n.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: u2 });
    const b2 = await this.relayer.request(u2);
    return this.relayer.events.emit(C$1.publish, e), this.logger.debug("Successfully Published Payload"), b2;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, t2) => {
      const i2 = e.attempt + 1;
      this.queue.set(t2, Ge$2(Ie$1({}, e), { attempt: i2 }));
      const { topic: s2, message: n, opts: o2, attestation: a2 } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${i2}`), await this.rpcPublish(Ge$2(Ie$1({}, e), { topic: s2, message: n, ttl: o2.ttl, prompt: o2.prompt, tag: o2.tag, id: o2.id, attestation: a2, tvf: o2.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(C$1.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(C$1.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
var Gn = Object.defineProperty, Wn = (r2, e, t2) => e in r2 ? Gn(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, ne$1 = (r2, e, t2) => Wn(r2, typeof e != "symbol" ? e + "" : e, t2);
class Hn {
  constructor() {
    ne$1(this, "map", /* @__PURE__ */ new Map()), ne$1(this, "set", (e, t2) => {
      const i2 = this.get(e);
      this.exists(e, t2) || this.map.set(e, [...i2, t2]);
    }), ne$1(this, "get", (e) => this.map.get(e) || []), ne$1(this, "exists", (e, t2) => this.get(e).includes(t2)), ne$1(this, "delete", (e, t2) => {
      if (typeof t2 > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const i2 = this.get(e);
      if (!this.exists(e, t2)) return;
      const s2 = i2.filter((n) => n !== t2);
      if (!s2.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, s2);
    }), ne$1(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var Yn = Object.defineProperty, Jn = Object.defineProperties, Xn = Object.getOwnPropertyDescriptors, Ii = Object.getOwnPropertySymbols, Zn = Object.prototype.hasOwnProperty, Qn = Object.prototype.propertyIsEnumerable, We$1 = (r2, e, t2) => e in r2 ? Yn(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, ge$1 = (r2, e) => {
  for (var t2 in e || (e = {})) Zn.call(e, t2) && We$1(r2, t2, e[t2]);
  if (Ii) for (var t2 of Ii(e)) Qn.call(e, t2) && We$1(r2, t2, e[t2]);
  return r2;
}, He$1 = (r2, e) => Jn(r2, Xn(e)), f2 = (r2, e, t2) => We$1(r2, typeof e != "symbol" ? e + "" : e, t2);
class Ti extends P$1 {
  constructor(e, t2) {
    super(e, t2), this.relayer = e, this.logger = t2, f2(this, "subscriptions", /* @__PURE__ */ new Map()), f2(this, "topicMap", new Hn()), f2(this, "events", new events.EventEmitter()), f2(this, "name", Ut$1), f2(this, "version", Ft$1), f2(this, "pending", /* @__PURE__ */ new Map()), f2(this, "cached", []), f2(this, "initialized", false), f2(this, "storagePrefix", B$1), f2(this, "subscribeTimeout", cjs.toMiliseconds(cjs.ONE_MINUTE)), f2(this, "initialSubscribeTimeout", cjs.toMiliseconds(cjs.ONE_SECOND * 15)), f2(this, "clientId"), f2(this, "batchSubscribeTopicsLimit", 500), f2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), f2(this, "subscribe", async (i2, s2) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i2, opts: s2 } });
      try {
        const n = Zc(s2), o2 = { topic: i2, relay: n, transportType: s2 == null ? void 0 : s2.transportType };
        this.pending.set(i2, o2);
        const a2 = await this.rpcSubscribe(i2, n, s2);
        return typeof a2 == "string" && (this.onSubscribe(a2, o2), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i2, opts: s2 } })), a2;
      } catch (n) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n), n;
      }
    }), f2(this, "unsubscribe", async (i2, s2) => {
      this.isInitialized(), typeof (s2 == null ? void 0 : s2.id) < "u" ? await this.unsubscribeById(i2, s2.id, s2) : await this.unsubscribeByTopic(i2, s2);
    }), f2(this, "isSubscribed", (i2) => new Promise((s2) => {
      s2(this.topicMap.topics.includes(i2));
    })), f2(this, "isKnownTopic", (i2) => new Promise((s2) => {
      s2(this.topicMap.topics.includes(i2) || this.pending.has(i2) || this.cached.some((n) => n.topic === i2));
    })), f2(this, "on", (i2, s2) => {
      this.events.on(i2, s2);
    }), f2(this, "once", (i2, s2) => {
      this.events.once(i2, s2);
    }), f2(this, "off", (i2, s2) => {
      this.events.off(i2, s2);
    }), f2(this, "removeListener", (i2, s2) => {
      this.events.removeListener(i2, s2);
    }), f2(this, "start", async () => {
      await this.onConnect();
    }), f2(this, "stop", async () => {
      await this.onDisconnect();
    }), f2(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), f2(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const i2 = [];
      this.pending.forEach((s2) => {
        i2.push(s2);
      }), await this.batchSubscribe(i2);
    }), f2(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r.pulse, async () => {
        await this.checkPending();
      }), this.events.on($$2.created, async (i2) => {
        const s2 = $$2.created;
        this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: i2 }), await this.persist();
      }), this.events.on($$2.deleted, async (i2) => {
        const s2 = $$2.deleted;
        this.logger.info(`Emitting ${s2}`), this.logger.debug({ type: "event", event: s2, data: i2 }), await this.persist();
      });
    }), this.relayer = e, this.logger = E$3(t2, this.name), this.clientId = "";
  }
  get context() {
    return y$4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e, t2) {
    let i2 = false;
    try {
      i2 = this.getSubscription(e).topic === t2;
    } catch {
    }
    return i2;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t2) {
    const i2 = this.topicMap.get(e);
    await Promise.all(i2.map(async (s2) => await this.unsubscribeById(e, s2, t2)));
  }
  async unsubscribeById(e, t2, i2) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t2, opts: i2 } });
    try {
      const s2 = Zc(i2);
      await this.restartToComplete({ topic: e, id: t2, relay: s2 }), await this.rpcUnsubscribe(e, t2, s2);
      const n = Nt$1("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t2, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t2, opts: i2 } });
    } catch (s2) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s2), s2;
    }
  }
  async rpcSubscribe(e, t2, i2) {
    var s2;
    (!i2 || (i2 == null ? void 0 : i2.transportType) === Q$1.relay) && await this.restartToComplete({ topic: e, id: e, relay: t2 });
    const n = { method: Yc(t2.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n });
    const o2 = (s2 = i2 == null ? void 0 : i2.internal) == null ? void 0 : s2.throwOnFailedPublish;
    try {
      const a2 = await this.getSubscriptionId(e);
      if ((i2 == null ? void 0 : i2.transportType) === Q$1.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(n).catch((l2) => this.logger.warn(l2));
      }, cjs.toMiliseconds(cjs.ONE_SECOND)), a2;
      const c2 = new Promise(async (l2) => {
        const d3 = (g) => {
          g.topic === e && (this.events.removeListener($$2.created, d3), l2(g.id));
        };
        this.events.on($$2.created, d3);
        try {
          const g = await yi$1(new Promise((_, u2) => {
            this.relayer.request(n).catch((b2) => {
              this.logger.warn(b2, b2 == null ? void 0 : b2.message), u2(b2);
            }).then(_);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener($$2.created, d3), l2(g);
        } catch {
        }
      }), h3 = await yi$1(c2, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!h3 && o2) throw new Error(`Subscribing to ${e} failed, please try again`);
      return h3 ? a2 : null;
    } catch (a2) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(C$1.connection_stalled), o2) throw a2;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const t2 = e[0].relay, i2 = { method: Yc(t2.protocol).batchSubscribe, params: { topics: e.map((s2) => s2.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    try {
      await await yi$1(new Promise((s2) => {
        this.relayer.request(i2).catch((n) => this.logger.warn(n)).then(s2);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(C$1.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length) return;
    const t2 = e[0].relay, i2 = { method: Yc(t2.protocol).batchFetchMessages, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    let s2;
    try {
      s2 = await await yi$1(new Promise((n, o2) => {
        this.relayer.request(i2).catch((a2) => {
          this.logger.warn(a2), o2(a2);
        }).then(n);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(C$1.connection_stalled);
    }
    return s2;
  }
  rpcUnsubscribe(e, t2, i2) {
    const s2 = { method: Yc(i2.protocol).unsubscribe, params: { topic: e, id: t2 } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s2 }), this.relayer.request(s2);
  }
  onSubscribe(e, t2) {
    this.setSubscription(e, He$1(ge$1({}, t2), { id: e })), this.pending.delete(t2.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t2) => {
      this.setSubscription(t2.id, ge$1({}, t2)), this.pending.delete(t2.topic);
    });
  }
  async onUnsubscribe(e, t2, i2) {
    this.events.removeAllListeners(t2), this.hasSubscription(t2, e) && this.deleteSubscription(t2, i2), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t2) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t2 }), this.addSubscription(e, t2);
  }
  addSubscription(e, t2) {
    this.subscriptions.set(e, ge$1({}, t2)), this.topicMap.set(t2.topic, e), this.events.emit($$2.created, t2);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t2 = this.subscriptions.get(e);
    if (!t2) {
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i2);
    }
    return t2;
  }
  deleteSubscription(e, t2) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t2 });
    const i2 = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(i2.topic, e), this.events.emit($$2.deleted, He$1(ge$1({}, i2), { reason: t2 }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($$2.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], t2 = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let i2 = 0; i2 < t2; i2++) {
        const s2 = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(s2);
      }
    }
    this.events.emit($$2.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: t2 } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t2), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t2);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (t2) => He$1(ge$1({}, t2), { id: await this.getSubscriptionId(t2.topic) })))));
  }
  async batchFetchMessages(e) {
    if (!e.length) return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t2 = await this.rpcBatchFetchMessages(e);
    t2 && t2.messages && (await Ni$1(cjs.toMiliseconds(cjs.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t2.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete(e) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e) {
    return kc(e + await this.getClientId());
  }
}
var eo = Object.defineProperty, Ci = Object.getOwnPropertySymbols, to = Object.prototype.hasOwnProperty, io = Object.prototype.propertyIsEnumerable, Ye$1 = (r2, e, t2) => e in r2 ? eo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, Pi = (r2, e) => {
  for (var t2 in e || (e = {})) to.call(e, t2) && Ye$1(r2, t2, e[t2]);
  if (Ci) for (var t2 of Ci(e)) io.call(e, t2) && Ye$1(r2, t2, e[t2]);
  return r2;
}, y$1 = (r2, e, t2) => Ye$1(r2, typeof e != "symbol" ? e + "" : e, t2);
class Si extends d$1 {
  constructor(e) {
    super(e), y$1(this, "protocol", "wc"), y$1(this, "version", 2), y$1(this, "core"), y$1(this, "logger"), y$1(this, "events", new events.EventEmitter()), y$1(this, "provider"), y$1(this, "messages"), y$1(this, "subscriber"), y$1(this, "publisher"), y$1(this, "name", $t), y$1(this, "transportExplicitlyClosed", false), y$1(this, "initialized", false), y$1(this, "connectionAttemptInProgress", false), y$1(this, "relayUrl"), y$1(this, "projectId"), y$1(this, "packageName"), y$1(this, "bundleId"), y$1(this, "hasExperiencedNetworkDisruption", false), y$1(this, "pingTimeout"), y$1(this, "heartBeatTimeout", cjs.toMiliseconds(cjs.THIRTY_SECONDS + cjs.FIVE_SECONDS)), y$1(this, "reconnectTimeout"), y$1(this, "connectPromise"), y$1(this, "reconnectInProgress", false), y$1(this, "requestsInFlight", []), y$1(this, "connectTimeout", cjs.toMiliseconds(cjs.ONE_SECOND * 15)), y$1(this, "request", async (t2) => {
      var i2, s2;
      this.logger.debug("Publishing Request Payload");
      const n = t2.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: n, method: t2.method, topic: (i2 = t2.params) == null ? void 0 : i2.topic }, "relayer.request - publishing...");
        const o2 = `${n}:${((s2 = t2.params) == null ? void 0 : s2.tag) || ""}`;
        this.requestsInFlight.push(o2);
        const a2 = await this.provider.request(t2);
        return this.requestsInFlight = this.requestsInFlight.filter((c2) => c2 !== o2), a2;
      } catch (o2) {
        throw this.logger.debug(`Failed to Publish Request: ${n}`), o2;
      }
    }), y$1(this, "resetPingTimeout", () => {
      _e$3() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var t2, i2, s2, n;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n = (s2 = (i2 = (t2 = this.provider) == null ? void 0 : t2.connection) == null ? void 0 : i2.socket) == null ? void 0 : s2.terminate) == null || n.call(s2);
        } catch (o2) {
          this.logger.warn(o2, o2 == null ? void 0 : o2.message);
        }
      }, this.heartBeatTimeout));
    }), y$1(this, "onPayloadHandler", (t2) => {
      this.onProviderPayload(t2), this.resetPingTimeout();
    }), y$1(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(C$1.connect);
    }), y$1(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), y$1(this, "onProviderErrorHandler", (t2) => {
      this.logger.fatal(`Fatal socket error: ${t2.message}`), this.events.emit(C$1.error, t2), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), y$1(this, "registerProviderListeners", () => {
      this.provider.on(L$1.payload, this.onPayloadHandler), this.provider.on(L$1.connect, this.onConnectHandler), this.provider.on(L$1.disconnect, this.onDisconnectHandler), this.provider.on(L$1.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? E$3(e.logger, this.name) : Ot$2(k$3({ level: e.logger || Nt })), this.messages = new _i(this.logger, e.core), this.subscriber = new Ti(this, this.logger), this.publisher = new qn(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || Ue$2, this.projectId = e.projectId, ei$1() ? this.packageName = ri$1() : ni$1() && (this.bundleId = ri$1()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e) {
      this.logger.warn(e, e == null ? void 0 : e.message);
    }
  }
  get context() {
    return y$4(this.logger);
  }
  get connected() {
    var e, t2, i2;
    return ((i2 = (t2 = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t2.socket) == null ? void 0 : i2.readyState) === 1 || false;
  }
  get connecting() {
    var e, t2, i2;
    return ((i2 = (t2 = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t2.socket) == null ? void 0 : i2.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e, t2, i2) {
    this.isInitialized(), await this.publisher.publish(e, t2, i2), await this.recordMessageEvent({ topic: e, message: t2, publishedAt: Date.now(), transportType: Q$1.relay }, le$1.outbound);
  }
  async subscribe(e, t2) {
    var i2, s2, n;
    this.isInitialized(), (!(t2 != null && t2.transportType) || (t2 == null ? void 0 : t2.transportType) === "relay") && await this.toEstablishConnection();
    const o2 = typeof ((i2 = t2 == null ? void 0 : t2.internal) == null ? void 0 : i2.throwOnFailedPublish) > "u" ? true : (s2 = t2 == null ? void 0 : t2.internal) == null ? void 0 : s2.throwOnFailedPublish;
    let a2 = ((n = this.subscriber.topicMap.get(e)) == null ? void 0 : n[0]) || "", c2;
    const h3 = (l2) => {
      l2.topic === e && (this.subscriber.off($$2.created, h3), c2());
    };
    return await Promise.all([new Promise((l2) => {
      c2 = l2, this.subscriber.on($$2.created, h3);
    }), new Promise(async (l2, d3) => {
      a2 = await this.subscriber.subscribe(e, Pi({ internal: { throwOnFailedPublish: o2 } }, t2)).catch((g) => {
        o2 && d3(g);
      }) || a2, l2();
    })]), a2;
  }
  async unsubscribe(e, t2) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t2);
  }
  on(e, t2) {
    this.events.on(e, t2);
  }
  once(e, t2) {
    this.events.once(e, t2);
  }
  off(e, t2) {
    this.events.off(e, t2);
  }
  removeListener(e, t2) {
    this.events.removeListener(e, t2);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await yi$1(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t2, i2) => {
      await this.connect(e).then(t2).catch(i2).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Na()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t2 = e.sort((i2, s2) => i2.publishedAt - s2.publishedAt);
    this.logger.debug(`Batch of ${t2.length} message events sorted`);
    for (const i2 of t2) try {
      await this.onMessageEvent(i2);
    } catch (s2) {
      this.logger.warn(s2, "Error while processing batch message event: " + (s2 == null ? void 0 : s2.message));
    }
    this.logger.trace(`Batch of ${t2.length} message events processed`);
  }
  async onLinkMessageEvent(e, t2) {
    const { topic: i2 } = e;
    if (!t2.sessionExists) {
      const s2 = Ei$1(cjs.FIVE_MINUTES), n = { topic: i2, expiry: s2, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(i2, n);
    }
    this.events.emit(C$1.message, e), await this.recordMessageEvent(e, le$1.inbound);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t2 = 1;
    for (; t2 < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t2}...`), await this.createProvider(), await new Promise(async (i2, s2) => {
          const n = () => {
            s2(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(L$1.disconnect, n), await yi$1(new Promise((o2, a2) => {
            this.provider.connect().then(o2).catch(a2);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o2) => {
            s2(o2);
          }).finally(() => {
            this.provider.off(L$1.disconnect, n), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o2, a2) => {
            const c2 = () => {
              a2(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(L$1.disconnect, c2), await this.subscriber.start().then(o2).catch(a2).finally(() => {
              this.provider.off(L$1.disconnect, c2);
            });
          }), this.hasExperiencedNetworkDisruption = false, i2();
        });
      } catch (i2) {
        await this.subscriber.stop();
        const s2 = i2;
        this.logger.warn({}, s2.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t2}`);
        break;
      }
      await new Promise((i2) => setTimeout(i2, cjs.toMiliseconds(t2 * 1))), t2++;
    }
  }
  startPingTimeout() {
    var e, t2, i2, s2, n;
    if (_e$3()) try {
      (t2 = (e = this.provider) == null ? void 0 : e.connection) != null && t2.socket && ((n = (s2 = (i2 = this.provider) == null ? void 0 : i2.connection) == null ? void 0 : s2.socket) == null || n.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o2) {
      this.logger.warn(o2, o2 == null ? void 0 : o2.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o(new f$2(si$1({ sdkVersion: _e$2, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e, t2) {
    const { topic: i2, message: s2 } = e;
    await this.messages.set(i2, s2, t2);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t2, message: i2 } = e;
    if (!i2 || i2.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${i2}`), true;
    if (!await this.subscriber.isKnownTopic(t2)) return this.logger.warn(`Ignoring message for unknown topic ${t2}`), true;
    const s2 = this.messages.has(t2, i2);
    return s2 && this.logger.warn(`Ignoring duplicate message: ${i2}`), s2;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), isJsonRpcRequest(e)) {
      if (!e.method.endsWith(zt$1)) return;
      const t2 = e.params, { topic: i2, message: s2, publishedAt: n, attestation: o2 } = t2.data, a2 = { topic: i2, message: s2, publishedAt: n, transportType: Q$1.relay, attestation: o2 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Pi({ type: "event", event: t2.id }, a2)), this.events.emit(t2.id, a2), await this.acknowledgePayload(e), await this.onMessageEvent(a2);
    } else isJsonRpcResponse(e) && this.events.emit(C$1.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, le$1.inbound), this.events.emit(C$1.message, e));
  }
  async acknowledgePayload(e) {
    const t2 = formatJsonRpcResult(e.id, true);
    await this.provider.connection.send(t2);
  }
  unregisterProviderListeners() {
    this.provider.off(L$1.payload, this.onPayloadHandler), this.provider.off(L$1.connect, this.onConnectHandler), this.provider.off(L$1.disconnect, this.onDisconnectHandler), this.provider.off(L$1.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Na();
    Ua(async (t2) => {
      e !== t2 && (e = t2, t2 ? await this.transportOpen().catch((i2) => this.logger.error(i2, i2 == null ? void 0 : i2.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    }), this.core.heartbeat.on(r.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && Ta()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (t2) {
        this.logger.warn(t2, t2 == null ? void 0 : t2.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(C$1.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, cjs.toMiliseconds(Lt$1)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      await this.connect();
    }
  }
}
function so() {
}
function Oi(r2) {
  if (!r2 || typeof r2 != "object") return false;
  const e = Object.getPrototypeOf(r2);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(r2) === "[object Object]" : false;
}
function Ri(r2) {
  return Object.getOwnPropertySymbols(r2).filter((e) => Object.prototype.propertyIsEnumerable.call(r2, e));
}
function Ai(r2) {
  return r2 == null ? r2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r2);
}
const ro = "[object RegExp]", no = "[object String]", oo = "[object Number]", ao = "[object Boolean]", xi = "[object Arguments]", co = "[object Symbol]", ho = "[object Date]", lo = "[object Map]", uo = "[object Set]", go = "[object Array]", po = "[object Function]", yo = "[object ArrayBuffer]", Je$1 = "[object Object]", bo = "[object Error]", mo = "[object DataView]", fo = "[object Uint8Array]", Do = "[object Uint8ClampedArray]", vo = "[object Uint16Array]", wo = "[object Uint32Array]", _o = "[object BigUint64Array]", Eo = "[object Int8Array]", Io = "[object Int16Array]", To = "[object Int32Array]", Co = "[object BigInt64Array]", Po = "[object Float32Array]", So = "[object Float64Array]";
function Oo(r2, e) {
  return r2 === e || Number.isNaN(r2) && Number.isNaN(e);
}
function Ro(r2, e, t2) {
  return pe$1(r2, e, void 0, void 0, void 0, void 0, t2);
}
function pe$1(r2, e, t2, i2, s2, n, o2) {
  const a2 = o2(r2, e, t2, i2, s2, n);
  if (a2 !== void 0) return a2;
  if (typeof r2 == typeof e) switch (typeof r2) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return r2 === e;
    case "number":
      return r2 === e || Object.is(r2, e);
    case "function":
      return r2 === e;
    case "object":
      return ye$1(r2, e, n, o2);
  }
  return ye$1(r2, e, n, o2);
}
function ye$1(r2, e, t2, i2) {
  if (Object.is(r2, e)) return true;
  let s2 = Ai(r2), n = Ai(e);
  if (s2 === xi && (s2 = Je$1), n === xi && (n = Je$1), s2 !== n) return false;
  switch (s2) {
    case no:
      return r2.toString() === e.toString();
    case oo: {
      const c2 = r2.valueOf(), h3 = e.valueOf();
      return Oo(c2, h3);
    }
    case ao:
    case ho:
    case co:
      return Object.is(r2.valueOf(), e.valueOf());
    case ro:
      return r2.source === e.source && r2.flags === e.flags;
    case po:
      return r2 === e;
  }
  t2 = t2 ?? /* @__PURE__ */ new Map();
  const o2 = t2.get(r2), a2 = t2.get(e);
  if (o2 != null && a2 != null) return o2 === e;
  t2.set(r2, e), t2.set(e, r2);
  try {
    switch (s2) {
      case lo: {
        if (r2.size !== e.size) return false;
        for (const [c2, h3] of r2.entries()) if (!e.has(c2) || !pe$1(h3, e.get(c2), c2, r2, e, t2, i2)) return false;
        return true;
      }
      case uo: {
        if (r2.size !== e.size) return false;
        const c2 = Array.from(r2.values()), h3 = Array.from(e.values());
        for (let l2 = 0; l2 < c2.length; l2++) {
          const d3 = c2[l2], g = h3.findIndex((_) => pe$1(d3, _, void 0, r2, e, t2, i2));
          if (g === -1) return false;
          h3.splice(g, 1);
        }
        return true;
      }
      case go:
      case fo:
      case Do:
      case vo:
      case wo:
      case _o:
      case Eo:
      case Io:
      case To:
      case Co:
      case Po:
      case So: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r2) !== Buffer.isBuffer(e) || r2.length !== e.length) return false;
        for (let c2 = 0; c2 < r2.length; c2++) if (!pe$1(r2[c2], e[c2], c2, r2, e, t2, i2)) return false;
        return true;
      }
      case yo:
        return r2.byteLength !== e.byteLength ? false : ye$1(new Uint8Array(r2), new Uint8Array(e), t2, i2);
      case mo:
        return r2.byteLength !== e.byteLength || r2.byteOffset !== e.byteOffset ? false : ye$1(new Uint8Array(r2), new Uint8Array(e), t2, i2);
      case bo:
        return r2.name === e.name && r2.message === e.message;
      case Je$1: {
        if (!(ye$1(r2.constructor, e.constructor, t2, i2) || Oi(r2) && Oi(e))) return false;
        const h3 = [...Object.keys(r2), ...Ri(r2)], l2 = [...Object.keys(e), ...Ri(e)];
        if (h3.length !== l2.length) return false;
        for (let d3 = 0; d3 < h3.length; d3++) {
          const g = h3[d3], _ = r2[g];
          if (!Object.hasOwn(e, g)) return false;
          const u2 = e[g];
          if (!pe$1(_, u2, g, r2, e, t2, i2)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t2.delete(r2), t2.delete(e);
  }
}
function Ao(r2, e) {
  return Ro(r2, e, so);
}
var xo = Object.defineProperty, Ni = Object.getOwnPropertySymbols, No = Object.prototype.hasOwnProperty, $o = Object.prototype.propertyIsEnumerable, Xe$1 = (r2, e, t2) => e in r2 ? xo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, $i = (r2, e) => {
  for (var t2 in e || (e = {})) No.call(e, t2) && Xe$1(r2, t2, e[t2]);
  if (Ni) for (var t2 of Ni(e)) $o.call(e, t2) && Xe$1(r2, t2, e[t2]);
  return r2;
}, z = (r2, e, t2) => Xe$1(r2, typeof e != "symbol" ? e + "" : e, t2);
class zi extends f$1 {
  constructor(e, t2, i2, s2 = B$1, n = void 0) {
    super(e, t2, i2, s2), this.core = e, this.logger = t2, this.name = i2, z(this, "map", /* @__PURE__ */ new Map()), z(this, "version", kt$1), z(this, "cached", []), z(this, "initialized", false), z(this, "getKey"), z(this, "storagePrefix", B$1), z(this, "recentlyDeleted", []), z(this, "recentlyDeletedLimit", 200), z(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o2) => {
        this.getKey && o2 !== null && !Et$2(o2) ? this.map.set(this.getKey(o2), o2) : la(o2) ? this.map.set(o2.id, o2) : da(o2) && this.map.set(o2.topic, o2);
      }), this.cached = [], this.initialized = true);
    }), z(this, "set", async (o2, a2) => {
      this.isInitialized(), this.map.has(o2) ? await this.update(o2, a2) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o2, value: a2 }), this.map.set(o2, a2), await this.persist());
    }), z(this, "get", (o2) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o2 }), this.getData(o2))), z(this, "getAll", (o2) => (this.isInitialized(), o2 ? this.values.filter((a2) => Object.keys(o2).every((c2) => Ao(a2[c2], o2[c2]))) : this.values)), z(this, "update", async (o2, a2) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o2, update: a2 });
      const c2 = $i($i({}, this.getData(o2)), a2);
      this.map.set(o2, c2), await this.persist();
    }), z(this, "delete", async (o2, a2) => {
      this.isInitialized(), this.map.has(o2) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o2, reason: a2 }), this.map.delete(o2), this.addToRecentlyDeleted(o2), await this.persist());
    }), this.logger = E$3(t2, this.name), this.storagePrefix = s2, this.getKey = n;
  }
  get context() {
    return y$4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t2 = this.map.get(e);
    if (!t2) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(s2), new Error(s2);
      }
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i2), new Error(i2);
    }
    return t2;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: t2 } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t2), new Error(t2);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var zo = Object.defineProperty, Lo = (r2, e, t2) => e in r2 ? zo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, p = (r2, e, t2) => Lo(r2, typeof e != "symbol" ? e + "" : e, t2);
class Li {
  constructor(e, t2) {
    this.core = e, this.logger = t2, p(this, "name", Mt$1), p(this, "version", Kt$1), p(this, "events", new Nt$2()), p(this, "pairings"), p(this, "initialized", false), p(this, "storagePrefix", B$1), p(this, "ignoredPayloadTypes", [Ft$2]), p(this, "registeredMethods", []), p(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), p(this, "register", ({ methods: i2 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i2])];
    }), p(this, "create", async (i2) => {
      this.isInitialized();
      const s2 = jc(), n = await this.core.crypto.setSymKey(s2), o2 = Ei$1(cjs.FIVE_MINUTES), a2 = { protocol: xt$1 }, c2 = { topic: n, expiry: o2, relay: a2, active: false, methods: i2 == null ? void 0 : i2.methods }, h3 = Wc({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: s2, relay: a2, expiryTimestamp: o2, methods: i2 == null ? void 0 : i2.methods });
      return this.events.emit(re$1.create, c2), this.core.expirer.set(n, o2), await this.pairings.set(n, c2), await this.core.relayer.subscribe(n, { transportType: i2 == null ? void 0 : i2.transportType }), { topic: n, uri: h3 };
    }), p(this, "pair", async (i2) => {
      this.isInitialized();
      const s2 = this.core.eventClient.createEvent({ properties: { topic: i2 == null ? void 0 : i2.uri, trace: [G.pairing_started] } });
      this.isValidPair(i2, s2);
      const { topic: n, symKey: o2, relay: a2, expiryTimestamp: c2, methods: h3 } = Gc(i2.uri);
      s2.props.properties.topic = n, s2.addTrace(G.pairing_uri_validation_success), s2.addTrace(G.pairing_uri_not_expired);
      let l2;
      if (this.pairings.keys.includes(n)) {
        if (l2 = this.pairings.get(n), s2.addTrace(G.existing_pairing), l2.active) throw s2.setError(Y$1.active_pairing_already_exists), new Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);
        s2.addTrace(G.pairing_not_expired);
      }
      const d3 = c2 || Ei$1(cjs.FIVE_MINUTES), g = { topic: n, relay: a2, expiry: d3, active: false, methods: h3 };
      this.core.expirer.set(n, d3), await this.pairings.set(n, g), s2.addTrace(G.store_new_pairing), i2.activatePairing && await this.activate({ topic: n }), this.events.emit(re$1.create, g), s2.addTrace(G.emit_inactive_pairing), this.core.crypto.keychain.has(n) || await this.core.crypto.setSymKey(o2, n), s2.addTrace(G.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        s2.setError(Y$1.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n, { relay: a2 });
      } catch (_) {
        throw s2.setError(Y$1.subscribe_pairing_topic_failure), _;
      }
      return s2.addTrace(G.subscribe_pairing_topic_success), g;
    }), p(this, "activate", async ({ topic: i2 }) => {
      this.isInitialized();
      const s2 = Ei$1(cjs.FIVE_MINUTES);
      this.core.expirer.set(i2, s2), await this.pairings.update(i2, { active: true, expiry: s2 });
    }), p(this, "ping", async (i2) => {
      this.isInitialized(), await this.isValidPing(i2), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: s2 } = i2;
      if (this.pairings.keys.includes(s2)) {
        const n = await this.sendRequest(s2, "wc_pairingPing", {}), { done: o2, resolve: a2, reject: c2 } = gi$1();
        this.events.once(xi$1("pairing_ping", n), ({ error: h3 }) => {
          h3 ? c2(h3) : a2();
        }), await o2();
      }
    }), p(this, "updateExpiry", async ({ topic: i2, expiry: s2 }) => {
      this.isInitialized(), await this.pairings.update(i2, { expiry: s2 });
    }), p(this, "updateMetadata", async ({ topic: i2, metadata: s2 }) => {
      this.isInitialized(), await this.pairings.update(i2, { peerMetadata: s2 });
    }), p(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), p(this, "disconnect", async (i2) => {
      this.isInitialized(), await this.isValidDisconnect(i2);
      const { topic: s2 } = i2;
      this.pairings.keys.includes(s2) && (await this.sendRequest(s2, "wc_pairingDelete", Nt$1("USER_DISCONNECTED")), await this.deletePairing(s2));
    }), p(this, "formatUriFromPairing", (i2) => {
      this.isInitialized();
      const { topic: s2, relay: n, expiry: o2, methods: a2 } = i2, c2 = this.core.crypto.keychain.get(s2);
      return Wc({ protocol: this.core.protocol, version: this.core.version, topic: s2, symKey: c2, relay: n, expiryTimestamp: o2, methods: a2 });
    }), p(this, "sendRequest", async (i2, s2, n) => {
      const o2 = formatJsonRpcRequest(s2, n), a2 = await this.core.crypto.encode(i2, o2), c2 = se$1[s2].req;
      return this.core.history.set(i2, o2), this.core.relayer.publish(i2, a2, c2), o2.id;
    }), p(this, "sendResult", async (i2, s2, n) => {
      const o2 = formatJsonRpcResult(i2, n), a2 = await this.core.crypto.encode(s2, o2), c2 = (await this.core.history.get(s2, i2)).request.method, h3 = se$1[c2].res;
      await this.core.relayer.publish(s2, a2, h3), await this.core.history.resolve(o2);
    }), p(this, "sendError", async (i2, s2, n) => {
      const o2 = formatJsonRpcError(i2, n), a2 = await this.core.crypto.encode(s2, o2), c2 = (await this.core.history.get(s2, i2)).request.method, h3 = se$1[c2] ? se$1[c2].res : se$1.unregistered_method.res;
      await this.core.relayer.publish(s2, a2, h3), await this.core.history.resolve(o2);
    }), p(this, "deletePairing", async (i2, s2) => {
      await this.core.relayer.unsubscribe(i2), await Promise.all([this.pairings.delete(i2, Nt$1("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i2), s2 ? Promise.resolve() : this.core.expirer.del(i2)]);
    }), p(this, "cleanup", async () => {
      const i2 = this.pairings.getAll().filter((s2) => vi$1(s2.expiry));
      await Promise.all(i2.map((s2) => this.deletePairing(s2.topic)));
    }), p(this, "onRelayEventRequest", async (i2) => {
      const { topic: s2, payload: n } = i2;
      switch (n.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(s2, n);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(s2, n);
        default:
          return await this.onUnknownRpcMethodRequest(s2, n);
      }
    }), p(this, "onRelayEventResponse", async (i2) => {
      const { topic: s2, payload: n } = i2, o2 = (await this.core.history.get(s2, n.id)).request.method;
      switch (o2) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(s2, n);
        default:
          return this.onUnknownRpcMethodResponse(o2);
      }
    }), p(this, "onPairingPingRequest", async (i2, s2) => {
      const { id: n } = s2;
      try {
        this.isValidPing({ topic: i2 }), await this.sendResult(n, i2, true), this.events.emit(re$1.ping, { id: n, topic: i2 });
      } catch (o2) {
        await this.sendError(n, i2, o2), this.logger.error(o2);
      }
    }), p(this, "onPairingPingResponse", (i2, s2) => {
      const { id: n } = s2;
      setTimeout(() => {
        isJsonRpcResult(s2) ? this.events.emit(xi$1("pairing_ping", n), {}) : isJsonRpcError(s2) && this.events.emit(xi$1("pairing_ping", n), { error: s2.error });
      }, 500);
    }), p(this, "onPairingDeleteRequest", async (i2, s2) => {
      const { id: n } = s2;
      try {
        this.isValidDisconnect({ topic: i2 }), await this.deletePairing(i2), this.events.emit(re$1.delete, { id: n, topic: i2 });
      } catch (o2) {
        await this.sendError(n, i2, o2), this.logger.error(o2);
      }
    }), p(this, "onUnknownRpcMethodRequest", async (i2, s2) => {
      const { id: n, method: o2 } = s2;
      try {
        if (this.registeredMethods.includes(o2)) return;
        const a2 = Nt$1("WC_METHOD_UNSUPPORTED", o2);
        await this.sendError(n, i2, a2), this.logger.error(a2);
      } catch (a2) {
        await this.sendError(n, i2, a2), this.logger.error(a2);
      }
    }), p(this, "onUnknownRpcMethodResponse", (i2) => {
      this.registeredMethods.includes(i2) || this.logger.error(Nt$1("WC_METHOD_UNSUPPORTED", i2));
    }), p(this, "isValidPair", (i2, s2) => {
      var n;
      if (!ma(i2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `pair() params: ${i2}`);
        throw s2.setError(Y$1.malformed_pairing_uri), new Error(a2);
      }
      if (!fa(i2.uri)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `pair() uri: ${i2.uri}`);
        throw s2.setError(Y$1.malformed_pairing_uri), new Error(a2);
      }
      const o2 = Gc(i2 == null ? void 0 : i2.uri);
      if (!((n = o2 == null ? void 0 : o2.relay) != null && n.protocol)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw s2.setError(Y$1.malformed_pairing_uri), new Error(a2);
      }
      if (!(o2 != null && o2.symKey)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw s2.setError(Y$1.malformed_pairing_uri), new Error(a2);
      }
      if (o2 != null && o2.expiryTimestamp && cjs.toMiliseconds(o2 == null ? void 0 : o2.expiryTimestamp) < Date.now()) {
        s2.setError(Y$1.pairing_expired);
        const { message: a2 } = ht$2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a2);
      }
    }), p(this, "isValidPing", async (i2) => {
      if (!ma(i2)) {
        const { message: n } = ht$2("MISSING_OR_INVALID", `ping() params: ${i2}`);
        throw new Error(n);
      }
      const { topic: s2 } = i2;
      await this.isValidPairingTopic(s2);
    }), p(this, "isValidDisconnect", async (i2) => {
      if (!ma(i2)) {
        const { message: n } = ht$2("MISSING_OR_INVALID", `disconnect() params: ${i2}`);
        throw new Error(n);
      }
      const { topic: s2 } = i2;
      await this.isValidPairingTopic(s2);
    }), p(this, "isValidPairingTopic", async (i2) => {
      if (!nt$1(i2, false)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `pairing topic should be a string: ${i2}`);
        throw new Error(s2);
      }
      if (!this.pairings.keys.includes(i2)) {
        const { message: s2 } = ht$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i2}`);
        throw new Error(s2);
      }
      if (vi$1(this.pairings.get(i2).expiry)) {
        await this.deletePairing(i2);
        const { message: s2 } = ht$2("EXPIRED", `pairing topic: ${i2}`);
        throw new Error(s2);
      }
    }), this.core = e, this.logger = E$3(t2, this.name), this.pairings = new zi(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y$4(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(C$1.message, async (e) => {
      const { topic: t2, message: i2, transportType: s2 } = e;
      if (this.pairings.keys.includes(t2) && s2 !== Q$1.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i2))) try {
        const n = await this.core.crypto.decode(t2, i2);
        isJsonRpcRequest(n) ? (this.core.history.set(t2, n), await this.onRelayEventRequest({ topic: t2, payload: n })) : isJsonRpcResponse(n) && (await this.core.history.resolve(n), await this.onRelayEventResponse({ topic: t2, payload: n }), this.core.history.delete(t2, n.id)), await this.core.relayer.messages.ack(t2, i2);
      } catch (n) {
        this.logger.error(n);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(M$1.expired, async (e) => {
      const { topic: t2 } = bi$1(e.target);
      t2 && this.pairings.keys.includes(t2) && (await this.deletePairing(t2, true), this.events.emit(re$1.expire, { topic: t2 }));
    });
  }
}
var ko = Object.defineProperty, jo = (r2, e, t2) => e in r2 ? ko(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, O$1 = (r2, e, t2) => jo(r2, typeof e != "symbol" ? e + "" : e, t2);
class ki extends I$1 {
  constructor(e, t2) {
    super(e, t2), this.core = e, this.logger = t2, O$1(this, "records", /* @__PURE__ */ new Map()), O$1(this, "events", new events.EventEmitter()), O$1(this, "name", Bt$1), O$1(this, "version", Vt$1), O$1(this, "cached", []), O$1(this, "initialized", false), O$1(this, "storagePrefix", B$1), O$1(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i2) => this.records.set(i2.id, i2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), O$1(this, "set", (i2, s2, n) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i2, request: s2, chainId: n }), this.records.has(s2.id)) return;
      const o2 = { id: s2.id, topic: i2, request: { method: s2.method, params: s2.params || null }, chainId: n, expiry: Ei$1(cjs.THIRTY_DAYS) };
      this.records.set(o2.id, o2), this.persist(), this.events.emit(F$1.created, o2);
    }), O$1(this, "resolve", async (i2) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i2 }), !this.records.has(i2.id)) return;
      const s2 = await this.getRecord(i2.id);
      typeof s2.response > "u" && (s2.response = isJsonRpcError(i2) ? { error: i2.error } : { result: i2.result }, this.records.set(s2.id, s2), this.persist(), this.events.emit(F$1.updated, s2));
    }), O$1(this, "get", async (i2, s2) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i2, id: s2 }), await this.getRecord(s2))), O$1(this, "delete", (i2, s2) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s2 }), this.values.forEach((n) => {
        if (n.topic === i2) {
          if (typeof s2 < "u" && n.id !== s2) return;
          this.records.delete(n.id), this.events.emit(F$1.deleted, n);
        }
      }), this.persist();
    }), O$1(this, "exists", async (i2, s2) => (this.isInitialized(), this.records.has(s2) ? (await this.getRecord(s2)).topic === i2 : false)), O$1(this, "on", (i2, s2) => {
      this.events.on(i2, s2);
    }), O$1(this, "once", (i2, s2) => {
      this.events.once(i2, s2);
    }), O$1(this, "off", (i2, s2) => {
      this.events.off(i2, s2);
    }), O$1(this, "removeListener", (i2, s2) => {
      this.events.removeListener(i2, s2);
    }), this.logger = E$3(t2, this.name);
  }
  get context() {
    return y$4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t2) => {
      if (typeof t2.response < "u") return;
      const i2 = { topic: t2.topic, request: formatJsonRpcRequest(t2.request.method, t2.request.params, t2.id), chainId: t2.chainId };
      return e.push(i2);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t2 = this.records.get(e);
    if (!t2) {
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i2);
    }
    return t2;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(F$1.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: t2 } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t2), new Error(t2);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(F$1.created, (e) => {
      const t2 = F$1.created;
      this.logger.info(`Emitting ${t2}`), this.logger.debug({ type: "event", event: t2, record: e });
    }), this.events.on(F$1.updated, (e) => {
      const t2 = F$1.updated;
      this.logger.info(`Emitting ${t2}`), this.logger.debug({ type: "event", event: t2, record: e });
    }), this.events.on(F$1.deleted, (e) => {
      const t2 = F$1.deleted;
      this.logger.info(`Emitting ${t2}`), this.logger.debug({ type: "event", event: t2, record: e });
    }), this.core.heartbeat.on(r.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = false;
      this.records.forEach((t2) => {
        cjs.toMiliseconds(t2.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t2.id}`), this.records.delete(t2.id), this.events.emit(F$1.deleted, t2, false), e = true);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Uo = Object.defineProperty, Fo = (r2, e, t2) => e in r2 ? Uo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, A$1 = (r2, e, t2) => Fo(r2, typeof e != "symbol" ? e + "" : e, t2);
class ji extends S$2 {
  constructor(e, t2) {
    super(e, t2), this.core = e, this.logger = t2, A$1(this, "expirations", /* @__PURE__ */ new Map()), A$1(this, "events", new events.EventEmitter()), A$1(this, "name", qt$1), A$1(this, "version", Gt$1), A$1(this, "cached", []), A$1(this, "initialized", false), A$1(this, "storagePrefix", B$1), A$1(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i2) => this.expirations.set(i2.target, i2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), A$1(this, "has", (i2) => {
      try {
        const s2 = this.formatTarget(i2);
        return typeof this.getExpiration(s2) < "u";
      } catch {
        return false;
      }
    }), A$1(this, "set", (i2, s2) => {
      this.isInitialized();
      const n = this.formatTarget(i2), o2 = { target: n, expiry: s2 };
      this.expirations.set(n, o2), this.checkExpiry(n, o2), this.events.emit(M$1.created, { target: n, expiration: o2 });
    }), A$1(this, "get", (i2) => {
      this.isInitialized();
      const s2 = this.formatTarget(i2);
      return this.getExpiration(s2);
    }), A$1(this, "del", (i2) => {
      if (this.isInitialized(), this.has(i2)) {
        const s2 = this.formatTarget(i2), n = this.getExpiration(s2);
        this.expirations.delete(s2), this.events.emit(M$1.deleted, { target: s2, expiration: n });
      }
    }), A$1(this, "on", (i2, s2) => {
      this.events.on(i2, s2);
    }), A$1(this, "once", (i2, s2) => {
      this.events.once(i2, s2);
    }), A$1(this, "off", (i2, s2) => {
      this.events.off(i2, s2);
    }), A$1(this, "removeListener", (i2, s2) => {
      this.events.removeListener(i2, s2);
    }), this.logger = E$3(t2, this.name);
  }
  get context() {
    return y$4(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return mi$1(e);
    if (typeof e == "number") return wi$1(e);
    const { message: t2 } = ht$2("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t2);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(M$1.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: t2 } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t2), new Error(t2);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t2 = this.expirations.get(e);
    if (!t2) {
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(i2), new Error(i2);
    }
    return t2;
  }
  checkExpiry(e, t2) {
    const { expiry: i2 } = t2;
    cjs.toMiliseconds(i2) - Date.now() <= 0 && this.expire(e, t2);
  }
  expire(e, t2) {
    this.expirations.delete(e), this.events.emit(M$1.expired, { target: e, expiration: t2 });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t2) => this.checkExpiry(t2, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r.pulse, () => this.checkExpirations()), this.events.on(M$1.created, (e) => {
      const t2 = M$1.created;
      this.logger.info(`Emitting ${t2}`), this.logger.debug({ type: "event", event: t2, data: e }), this.persist();
    }), this.events.on(M$1.expired, (e) => {
      const t2 = M$1.expired;
      this.logger.info(`Emitting ${t2}`), this.logger.debug({ type: "event", event: t2, data: e }), this.persist();
    }), this.events.on(M$1.deleted, (e) => {
      const t2 = M$1.deleted;
      this.logger.info(`Emitting ${t2}`), this.logger.debug({ type: "event", event: t2, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Mo = Object.defineProperty, Ko = (r2, e, t2) => e in r2 ? Mo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, w = (r2, e, t2) => Ko(r2, typeof e != "symbol" ? e + "" : e, t2);
class Ui extends M$2 {
  constructor(e, t2, i2) {
    super(e, t2, i2), this.core = e, this.logger = t2, this.store = i2, w(this, "name", Wt$1), w(this, "abortController"), w(this, "isDevEnv"), w(this, "verifyUrlV3", Yt$1), w(this, "storagePrefix", B$1), w(this, "version", Le$2), w(this, "publicKey"), w(this, "fetchPromise"), w(this, "init", async () => {
      var s2;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && cjs.toMiliseconds((s2 = this.publicKey) == null ? void 0 : s2.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), w(this, "register", async (s2) => {
      if (!Tt$2() || this.isDevEnv) return;
      const n = window.location.origin, { id: o2, decryptedId: a2 } = s2, c2 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n}&id=${o2}&decryptedId=${a2}`;
      try {
        const h3 = getDocument_1(), l2 = this.startAbortTimer(cjs.ONE_SECOND * 5), d3 = await new Promise((g, _) => {
          const u2 = () => {
            window.removeEventListener("message", x2), h3.body.removeChild(b2), _("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", u2);
          const b2 = h3.createElement("iframe");
          b2.src = c2, b2.style.display = "none", b2.addEventListener("error", u2, { signal: this.abortController.signal });
          const x2 = (I3) => {
            if (I3.data && typeof I3.data == "string") try {
              const D2 = JSON.parse(I3.data);
              if (D2.type === "verify_attestation") {
                if (sn$2(D2.attestation).payload.id !== o2) return;
                clearInterval(l2), h3.body.removeChild(b2), this.abortController.signal.removeEventListener("abort", u2), window.removeEventListener("message", x2), g(D2.attestation === null ? "" : D2.attestation);
              }
            } catch (D2) {
              this.logger.warn(D2);
            }
          };
          h3.body.appendChild(b2), window.addEventListener("message", x2, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", d3), d3;
      } catch (h3) {
        this.logger.warn(h3);
      }
      return "";
    }), w(this, "resolve", async (s2) => {
      if (this.isDevEnv) return "";
      const { attestationId: n, hash: o2, encryptedId: a2 } = s2;
      if (n === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n) {
        if (sn$2(n).payload.id !== a2) return;
        const h3 = await this.isValidJwtAttestation(n);
        if (h3) {
          if (!h3.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h3;
        }
      }
      if (!o2) return;
      const c2 = this.getVerifyUrl(s2 == null ? void 0 : s2.verifyUrl);
      return this.fetchAttestation(o2, c2);
    }), w(this, "fetchAttestation", async (s2, n) => {
      this.logger.debug(`resolving attestation: ${s2} from url: ${n}`);
      const o2 = this.startAbortTimer(cjs.ONE_SECOND * 5), a2 = await fetch(`${n}/attestation/${s2}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o2), a2.status === 200 ? await a2.json() : void 0;
    }), w(this, "getVerifyUrl", (s2) => {
      let n = s2 || ue$1;
      return Jt$1.includes(n) || (this.logger.info(`verify url: ${n}, not included in trusted list, assigning default: ${ue$1}`), n = ue$1), n;
    }), w(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const s2 = this.startAbortTimer(cjs.FIVE_SECONDS), n = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(s2), await n.json();
      } catch (s2) {
        this.logger.warn(s2);
      }
    }), w(this, "persistPublicKey", async (s2) => {
      this.logger.debug("persisting public key to local storage", s2), await this.store.setItem(this.storeKey, s2), this.publicKey = s2;
    }), w(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), w(this, "isValidJwtAttestation", async (s2) => {
      const n = await this.getPublicKey();
      try {
        if (n) return this.validateAttestation(s2, n);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
      const o2 = await this.fetchAndPersistPublicKey();
      try {
        if (o2) return this.validateAttestation(s2, o2);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
    }), w(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), w(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n) => {
        const o2 = await this.fetchPublicKey();
        o2 && (await this.persistPublicKey(o2), n(o2));
      });
      const s2 = await this.fetchPromise;
      return this.fetchPromise = void 0, s2;
    }), w(this, "validateAttestation", (s2, n) => {
      const o2 = zc(s2, n.publicKey), a2 = { hasExpired: cjs.toMiliseconds(o2.exp) < Date.now(), payload: o2 };
      if (a2.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a2.payload.origin, isScam: a2.payload.isScam, isVerified: a2.payload.isVerified };
    }), this.logger = E$3(t2, this.name), this.abortController = new AbortController(), this.isDevEnv = Ii$1(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y$4(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), cjs.toMiliseconds(e));
  }
}
var Bo = Object.defineProperty, Vo = (r2, e, t2) => e in r2 ? Bo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, Fi = (r2, e, t2) => Vo(r2, typeof e != "symbol" ? e + "" : e, t2);
class Mi extends O$2 {
  constructor(e, t2) {
    super(e, t2), this.projectId = e, this.logger = t2, Fi(this, "context", Xt$1), Fi(this, "registerDeviceToken", async (i2) => {
      const { clientId: s2, token: n, notificationType: o2, enableEncrypted: a2 = false } = i2, c2 = `${Zt$1}/${this.projectId}/clients`;
      await fetch(c2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: s2, type: o2, token: n, always_raw: a2 }) });
    }), this.logger = E$3(t2, this.context);
  }
}
var qo = Object.defineProperty, Ki = Object.getOwnPropertySymbols, Go = Object.prototype.hasOwnProperty, Wo = Object.prototype.propertyIsEnumerable, Ze$1 = (r2, e, t2) => e in r2 ? qo(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, be$1 = (r2, e) => {
  for (var t2 in e || (e = {})) Go.call(e, t2) && Ze$1(r2, t2, e[t2]);
  if (Ki) for (var t2 of Ki(e)) Wo.call(e, t2) && Ze$1(r2, t2, e[t2]);
  return r2;
}, E$2 = (r2, e, t2) => Ze$1(r2, typeof e != "symbol" ? e + "" : e, t2);
class Bi extends R$1 {
  constructor(e, t2, i2 = true) {
    super(e, t2, i2), this.core = e, this.logger = t2, E$2(this, "context", ei), E$2(this, "storagePrefix", B$1), E$2(this, "storageVersion", Qt$1), E$2(this, "events", /* @__PURE__ */ new Map()), E$2(this, "shouldPersist", false), E$2(this, "init", async () => {
      if (!Ii$1()) try {
        const s2 = { eventId: Bi$1(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Mn$1(this.core.relayer.protocol, this.core.relayer.version, _e$2) } } };
        await this.sendEvent([s2]);
      } catch (s2) {
        this.logger.warn(s2);
      }
    }), E$2(this, "createEvent", (s2) => {
      const { event: n = "ERROR", type: o2 = "", properties: { topic: a2, trace: c2 } } = s2, h3 = Bi$1(), l2 = this.core.projectId || "", d3 = Date.now(), g = be$1({ eventId: h3, timestamp: d3, props: { event: n, type: o2, properties: { topic: a2, trace: c2 } }, bundleId: l2, domain: this.getAppDomain() }, this.setMethods(h3));
      return this.telemetryEnabled && (this.events.set(h3, g), this.shouldPersist = true), g;
    }), E$2(this, "getEvent", (s2) => {
      const { eventId: n, topic: o2 } = s2;
      if (n) return this.events.get(n);
      const a2 = Array.from(this.events.values()).find((c2) => c2.props.properties.topic === o2);
      if (a2) return be$1(be$1({}, a2), this.setMethods(a2.eventId));
    }), E$2(this, "deleteEvent", (s2) => {
      const { eventId: n } = s2;
      this.events.delete(n), this.shouldPersist = true;
    }), E$2(this, "setEventListeners", () => {
      this.core.heartbeat.on(r.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((s2) => {
          cjs.fromMiliseconds(Date.now()) - cjs.fromMiliseconds(s2.timestamp) > ti && (this.events.delete(s2.eventId), this.shouldPersist = true);
        });
      });
    }), E$2(this, "setMethods", (s2) => ({ addTrace: (n) => this.addTrace(s2, n), setError: (n) => this.setError(s2, n) })), E$2(this, "addTrace", (s2, n) => {
      const o2 = this.events.get(s2);
      o2 && (o2.props.properties.trace.push(n), this.events.set(s2, o2), this.shouldPersist = true);
    }), E$2(this, "setError", (s2, n) => {
      const o2 = this.events.get(s2);
      o2 && (o2.props.type = n, o2.timestamp = Date.now(), this.events.set(s2, o2), this.shouldPersist = true);
    }), E$2(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), E$2(this, "restore", async () => {
      try {
        const s2 = await this.core.storage.getItem(this.storageKey) || [];
        if (!s2.length) return;
        s2.forEach((n) => {
          this.events.set(n.eventId, be$1(be$1({}, n), this.setMethods(n.eventId)));
        });
      } catch (s2) {
        this.logger.warn(s2);
      }
    }), E$2(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const s2 = [];
      for (const [n, o2] of this.events) o2.props.type && s2.push(o2);
      if (s2.length !== 0) try {
        if ((await this.sendEvent(s2)).ok) for (const n of s2) this.events.delete(n.eventId), this.shouldPersist = true;
      } catch (n) {
        this.logger.warn(n);
      }
    }), E$2(this, "sendEvent", async (s2) => {
      const n = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${ii}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${_e$2}${n}`, { method: "POST", body: JSON.stringify(s2) });
    }), E$2(this, "getAppDomain", () => Pn$1().url), this.logger = E$3(t2, this.context), this.telemetryEnabled = i2, i2 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Ho = Object.defineProperty, Vi = Object.getOwnPropertySymbols, Yo = Object.prototype.hasOwnProperty, Jo = Object.prototype.propertyIsEnumerable, Qe$1 = (r2, e, t2) => e in r2 ? Ho(r2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e] = t2, qi = (r2, e) => {
  for (var t2 in e || (e = {})) Yo.call(e, t2) && Qe$1(r2, t2, e[t2]);
  if (Vi) for (var t2 of Vi(e)) Jo.call(e, t2) && Qe$1(r2, t2, e[t2]);
  return r2;
}, v$1 = (r2, e, t2) => Qe$1(r2, typeof e != "symbol" ? e + "" : e, t2);
let Te$1 = class Te extends h$1 {
  constructor(e) {
    var t2;
    super(e), v$1(this, "protocol", ze$1), v$1(this, "version", Le$2), v$1(this, "name", he$1), v$1(this, "relayUrl"), v$1(this, "projectId"), v$1(this, "customStoragePrefix"), v$1(this, "events", new events.EventEmitter()), v$1(this, "logger"), v$1(this, "heartbeat"), v$1(this, "relayer"), v$1(this, "crypto"), v$1(this, "storage"), v$1(this, "history"), v$1(this, "expirer"), v$1(this, "pairing"), v$1(this, "verify"), v$1(this, "echoClient"), v$1(this, "linkModeSupportedApps"), v$1(this, "eventClient"), v$1(this, "initialized", false), v$1(this, "logChunkController"), v$1(this, "on", (a2, c2) => this.events.on(a2, c2)), v$1(this, "once", (a2, c2) => this.events.once(a2, c2)), v$1(this, "off", (a2, c2) => this.events.off(a2, c2)), v$1(this, "removeListener", (a2, c2) => this.events.removeListener(a2, c2)), v$1(this, "dispatchEnvelope", ({ topic: a2, message: c2, sessionExists: h3 }) => {
      if (!a2 || !c2) return;
      const l2 = { topic: a2, message: c2, publishedAt: Date.now(), transportType: Q$1.link_mode };
      this.relayer.onLinkMessageEvent(l2, { sessionExists: h3 });
    });
    const i2 = this.getGlobalCore(e == null ? void 0 : e.customStoragePrefix);
    if (i2) try {
      return this.customStoragePrefix = i2.customStoragePrefix, this.logger = i2.logger, this.heartbeat = i2.heartbeat, this.crypto = i2.crypto, this.history = i2.history, this.expirer = i2.expirer, this.storage = i2.storage, this.relayer = i2.relayer, this.pairing = i2.pairing, this.verify = i2.verify, this.echoClient = i2.echoClient, this.linkModeSupportedApps = i2.linkModeSupportedApps, this.eventClient = i2.eventClient, this.initialized = i2.initialized, this.logChunkController = i2.logChunkController, i2;
    } catch (a2) {
      console.warn("Failed to copy global core", a2);
    }
    this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || Ue$2, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const s2 = k$3({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : Et$1.logger, name: he$1 }), { logger: n, chunkLoggerController: o2 } = A$2({ opts: s2, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = o2, (t2 = this.logChunkController) != null && t2.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a2, c2;
      (a2 = this.logChunkController) != null && a2.downloadLogsBlobInBrowser && ((c2 = this.logChunkController) == null || c2.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E$3(n, this.name), this.heartbeat = new i$1(), this.crypto = new vi(this, this.logger, e == null ? void 0 : e.keychain), this.history = new ki(this, this.logger), this.expirer = new ji(this, this.logger), this.storage = e != null && e.storage ? e.storage : new h$3(qi(qi({}, It$1), e == null ? void 0 : e.storageOptions)), this.relayer = new Si({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Li(this, this.logger), this.verify = new Ui(this, this.logger, this.storage), this.echoClient = new Mi(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Bi(this, this.logger, e == null ? void 0 : e.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e) {
    const t2 = new Te(e);
    await t2.initialize();
    const i2 = await t2.crypto.getClientId();
    return await t2.storage.setItem(jt$1, i2), t2;
  }
  get context() {
    return y$4(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(Fe$1, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Fe$1) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const t2 = `_walletConnectCore_${e}`, i2 = `${t2}_count`;
      return globalThis[i2] = (globalThis[i2] || 0) + 1, globalThis[i2] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[i2]} times.`), globalThis[t2];
    } catch (t2) {
      console.warn("Failed to get global WalletConnect core", t2);
      return;
    }
  }
  setGlobalCore(e) {
    var t2;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const i2 = `_walletConnectCore_${((t2 = e.opts) == null ? void 0 : t2.customStoragePrefix) || ""}`;
      globalThis[i2] = e;
    } catch (i2) {
      console.warn("Failed to set global WalletConnect core", i2);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process$1 < "u" && process$1.env.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return true;
    }
  }
};
const Xo = Te$1;
const De$1 = "wc", Le$1 = 2, ke$1 = "client", we$1 = `${De$1}@${Le$1}:${ke$1}:`, me$1 = { name: ke$1, logger: "error" }, Me$1 = "WALLETCONNECT_DEEPLINK_CHOICE", pt$1 = "proposal", $e$1 = "Proposal expired", ht$1 = "session", J2 = cjs.SEVEN_DAYS, dt$1 = "engine", N$1 = { wc_sessionPropose: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: cjs.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: cjs.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1119 } } }, _e$1 = { min: cjs.FIVE_MINUTES, max: cjs.SEVEN_DAYS }, $$1 = { idle: "IDLE", active: "ACTIVE" }, Ke$1 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } }, ut$1 = "request", gt$1 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], yt$1 = "wc", wt$1 = "auth", mt$1 = "authKeys", _t$1 = "pairingTopics", Et = "requests", ae$1 = `${yt$1}@${1.5}:${wt$1}:`, ce$1 = `${ae$1}:PUB_KEY`;
var vs = Object.defineProperty, Is = Object.defineProperties, Ts = Object.getOwnPropertyDescriptors, ft$1 = Object.getOwnPropertySymbols, qs2 = Object.prototype.hasOwnProperty, Ps = Object.prototype.propertyIsEnumerable, Ue$1 = (S3, n, e) => n in S3 ? vs(S3, n, { enumerable: true, configurable: true, writable: true, value: e }) : S3[n] = e, v = (S3, n) => {
  for (var e in n || (n = {})) qs2.call(n, e) && Ue$1(S3, e, n[e]);
  if (ft$1) for (var e of ft$1(n)) Ps.call(n, e) && Ue$1(S3, e, n[e]);
  return S3;
}, b$1 = (S3, n) => Is(S3, Ts(n)), c = (S3, n, e) => Ue$1(S3, typeof n != "symbol" ? n + "" : n, e);
class Ns extends V$3 {
  constructor(n) {
    super(n), c(this, "name", dt$1), c(this, "events", new Nt$2()), c(this, "initialized", false), c(this, "requestQueue", { state: $$1.idle, queue: [] }), c(this, "sessionRequestQueue", { state: $$1.idle, queue: [] }), c(this, "requestQueueDelay", cjs.ONE_SECOND), c(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c(this, "recentlyDeletedLimit", 200), c(this, "relayMessageCache", []), c(this, "pendingSessions", /* @__PURE__ */ new Map()), c(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N$1) }), this.initialized = true, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, cjs.toMiliseconds(this.requestQueueDelay)));
    }), c(this, "connect", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t2 = b$1(v({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(t2), t2.optionalNamespaces = aa(t2.requiredNamespaces, t2.optionalNamespaces), t2.requiredNamespaces = {};
      const { pairingTopic: s2, requiredNamespaces: i2, optionalNamespaces: r2, sessionProperties: o2, scopedProperties: a2, relays: l2 } = t2;
      let p2 = s2, h3, u2 = false;
      try {
        if (p2) {
          const T2 = this.client.core.pairing.pairings.get(p2);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), u2 = T2.active;
        }
      } catch (T2) {
        throw this.client.logger.error(`connect() -> pairing.get(${p2}) failed`), T2;
      }
      if (!p2 || !u2) {
        const { topic: T2, uri: K2 } = await this.client.core.pairing.create();
        p2 = T2, h3 = K2;
      }
      if (!p2) {
        const { message: T2 } = ht$2("NO_MATCHING_KEY", `connect() pairing topic: ${p2}`);
        throw new Error(T2);
      }
      const d3 = await this.client.core.crypto.generateKeyPair(), w2 = N$1.wc_sessionPropose.req.ttl || cjs.FIVE_MINUTES, m2 = Ei$1(w2), f3 = b$1(v(v({ requiredNamespaces: i2, optionalNamespaces: r2, relays: l2 ?? [{ protocol: xt$1 }], proposer: { publicKey: d3, metadata: this.client.metadata }, expiryTimestamp: m2, pairingTopic: p2 }, o2 && { sessionProperties: o2 }), a2 && { scopedProperties: a2 }), { id: payloadId() }), _ = xi$1("session_connect", f3.id), { reject: g, resolve: A2, done: D2 } = gi$1(w2, $e$1), I3 = ({ id: T2 }) => {
        T2 === f3.id && (this.client.events.off("proposal_expire", I3), this.pendingSessions.delete(f3.id), this.events.emit(_, { error: { message: $e$1, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", I3), this.events.once(_, ({ error: T2, session: K2 }) => {
        this.client.events.off("proposal_expire", I3), T2 ? g(T2) : K2 && A2(K2);
      }), await this.sendRequest({ topic: p2, method: "wc_sessionPropose", params: f3, throwOnFailedPublish: true, clientRpcId: f3.id }), await this.setProposal(f3.id, f3), { uri: h3, approval: D2 };
    }), c(this, "pair", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e);
      } catch (t2) {
        throw this.client.logger.error("pair() failed"), t2;
      }
    }), c(this, "approve", async (e) => {
      var t2, s2, i2;
      const r2 = this.client.core.eventClient.createEvent({ properties: { topic: (t2 = e == null ? void 0 : e.id) == null ? void 0 : t2.toString(), trace: [er.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (q2) {
        throw r2.setError(tr.no_internet_connection), q2;
      }
      try {
        await this.isValidProposalId(e == null ? void 0 : e.id);
      } catch (q2) {
        throw this.client.logger.error(`approve() -> proposal.get(${e == null ? void 0 : e.id}) failed`), r2.setError(tr.proposal_not_found), q2;
      }
      try {
        await this.isValidApprove(e);
      } catch (q2) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r2.setError(tr.session_approve_namespace_validation_failure), q2;
      }
      const { id: o2, relayProtocol: a2, namespaces: l2, sessionProperties: p2, scopedProperties: h3, sessionConfig: u2 } = e, d3 = this.client.proposal.get(o2);
      this.client.core.eventClient.deleteEvent({ eventId: r2.eventId });
      const { pairingTopic: w2, proposer: m2, requiredNamespaces: f3, optionalNamespaces: _ } = d3;
      let g = (s2 = this.client.core.eventClient) == null ? void 0 : s2.getEvent({ topic: w2 });
      g || (g = (i2 = this.client.core.eventClient) == null ? void 0 : i2.createEvent({ type: er.session_approve_started, properties: { topic: w2, trace: [er.session_approve_started, er.session_namespaces_validation_success] } }));
      const A2 = await this.client.core.crypto.generateKeyPair(), D2 = m2.publicKey, I3 = await this.client.core.crypto.generateSharedKey(A2, D2), T2 = v(v(v({ relay: { protocol: a2 ?? "irn" }, namespaces: l2, controller: { publicKey: A2, metadata: this.client.metadata }, expiry: Ei$1(J2) }, p2 && { sessionProperties: p2 }), h3 && { scopedProperties: h3 }), u2 && { sessionConfig: u2 }), K2 = Q$1.relay;
      g.addTrace(er.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(I3, { transportType: K2 });
      } catch (q2) {
        throw g.setError(tr.subscribe_session_topic_failure), q2;
      }
      g.addTrace(er.subscribe_session_topic_success);
      const fe2 = b$1(v({}, T2), { topic: I3, requiredNamespaces: f3, optionalNamespaces: _, pairingTopic: w2, acknowledged: false, self: T2.controller, peer: { publicKey: m2.publicKey, metadata: m2.metadata }, controller: A2, transportType: Q$1.relay });
      await this.client.session.set(I3, fe2), g.addTrace(er.store_session);
      try {
        g.addTrace(er.publishing_session_settle), await this.sendRequest({ topic: I3, method: "wc_sessionSettle", params: T2, throwOnFailedPublish: true }).catch((q2) => {
          throw g == null ? void 0 : g.setError(tr.session_settle_publish_failure), q2;
        }), g.addTrace(er.session_settle_publish_success), g.addTrace(er.publishing_session_approve), await this.sendResult({ id: o2, topic: w2, result: { relay: { protocol: a2 ?? "irn" }, responderPublicKey: A2 }, throwOnFailedPublish: true }).catch((q2) => {
          throw g == null ? void 0 : g.setError(tr.session_approve_publish_failure), q2;
        }), g.addTrace(er.session_approve_publish_success);
      } catch (q2) {
        throw this.client.logger.error(q2), this.client.session.delete(I3, Nt$1("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(I3), q2;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: g.eventId }), await this.client.core.pairing.updateMetadata({ topic: w2, metadata: m2.metadata }), await this.client.proposal.delete(o2, Nt$1("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: w2 }), await this.setExpiry(I3, Ei$1(J2)), { topic: I3, acknowledged: () => Promise.resolve(this.client.session.get(I3)) };
    }), c(this, "reject", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e);
      } catch (r2) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r2;
      }
      const { id: t2, reason: s2 } = e;
      let i2;
      try {
        i2 = this.client.proposal.get(t2).pairingTopic;
      } catch (r2) {
        throw this.client.logger.error(`reject() -> proposal.get(${t2}) failed`), r2;
      }
      i2 && (await this.sendError({ id: t2, topic: i2, error: s2, rpcOpts: N$1.wc_sessionPropose.reject }), await this.client.proposal.delete(t2, Nt$1("USER_DISCONNECTED")));
    }), c(this, "update", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e);
      } catch (h3) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), h3;
      }
      const { topic: t2, namespaces: s2 } = e, { done: i2, resolve: r2, reject: o2 } = gi$1(), a2 = payloadId(), l2 = getBigIntRpcId().toString(), p2 = this.client.session.get(t2).namespaces;
      return this.events.once(xi$1("session_update", a2), ({ error: h3 }) => {
        h3 ? o2(h3) : r2();
      }), await this.client.session.update(t2, { namespaces: s2 }), await this.sendRequest({ topic: t2, method: "wc_sessionUpdate", params: { namespaces: s2 }, throwOnFailedPublish: true, clientRpcId: a2, relayRpcId: l2 }).catch((h3) => {
        this.client.logger.error(h3), this.client.session.update(t2, { namespaces: p2 }), o2(h3);
      }), { acknowledged: i2 };
    }), c(this, "extend", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e);
      } catch (a2) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a2;
      }
      const { topic: t2 } = e, s2 = payloadId(), { done: i2, resolve: r2, reject: o2 } = gi$1();
      return this.events.once(xi$1("session_extend", s2), ({ error: a2 }) => {
        a2 ? o2(a2) : r2();
      }), await this.setExpiry(t2, Ei$1(J2)), this.sendRequest({ topic: t2, method: "wc_sessionExtend", params: {}, clientRpcId: s2, throwOnFailedPublish: true }).catch((a2) => {
        o2(a2);
      }), { acknowledged: i2 };
    }), c(this, "request", async (e) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e);
      } catch (_) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), _;
      }
      const { chainId: t2, request: s2, topic: i2, expiry: r2 = N$1.wc_sessionRequest.req.ttl } = e, o2 = this.client.session.get(i2);
      (o2 == null ? void 0 : o2.transportType) === Q$1.relay && await this.confirmOnlineStateOrThrow();
      const a2 = payloadId(), l2 = getBigIntRpcId().toString(), { done: p2, resolve: h3, reject: u2 } = gi$1(r2, "Request expired. Please try again.");
      this.events.once(xi$1("session_request", a2), ({ error: _, result: g }) => {
        _ ? u2(_) : h3(g);
      });
      const d3 = "wc_sessionRequest", w2 = this.getAppLinkIfEnabled(o2.peer.metadata, o2.transportType);
      if (w2) return await this.sendRequest({ clientRpcId: a2, relayRpcId: l2, topic: i2, method: d3, params: { request: b$1(v({}, s2), { expiryTimestamp: Ei$1(r2) }), chainId: t2 }, expiry: r2, throwOnFailedPublish: true, appLink: w2 }).catch((_) => u2(_)), this.client.events.emit("session_request_sent", { topic: i2, request: s2, chainId: t2, id: a2 }), await p2();
      const m2 = { request: b$1(v({}, s2), { expiryTimestamp: Ei$1(r2) }), chainId: t2 }, f3 = this.shouldSetTVF(d3, m2);
      return await Promise.all([new Promise(async (_) => {
        await this.sendRequest(v({ clientRpcId: a2, relayRpcId: l2, topic: i2, method: d3, params: m2, expiry: r2, throwOnFailedPublish: true }, f3 && { tvf: this.getTVFParams(a2, m2) })).catch((g) => u2(g)), this.client.events.emit("session_request_sent", { topic: i2, request: s2, chainId: t2, id: a2 }), _();
      }), new Promise(async (_) => {
        var g;
        if (!((g = o2.sessionConfig) != null && g.disableDeepLink)) {
          const A2 = await Oi$1(this.client.core.storage, Me$1);
          await Si$1({ id: a2, topic: i2, wcDeepLink: A2 });
        }
        _();
      }), p2()]).then((_) => _[2]);
    }), c(this, "respond", async (e) => {
      this.isInitialized(), await this.isValidRespond(e);
      const { topic: t2, response: s2 } = e, { id: i2 } = s2, r2 = this.client.session.get(t2);
      r2.transportType === Q$1.relay && await this.confirmOnlineStateOrThrow();
      const o2 = this.getAppLinkIfEnabled(r2.peer.metadata, r2.transportType);
      isJsonRpcResult(s2) ? await this.sendResult({ id: i2, topic: t2, result: s2.result, throwOnFailedPublish: true, appLink: o2 }) : isJsonRpcError(s2) && await this.sendError({ id: i2, topic: t2, error: s2.error, appLink: o2 }), this.cleanupAfterResponse(e);
    }), c(this, "ping", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e);
      } catch (s2) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s2;
      }
      const { topic: t2 } = e;
      if (this.client.session.keys.includes(t2)) {
        const s2 = payloadId(), i2 = getBigIntRpcId().toString(), { done: r2, resolve: o2, reject: a2 } = gi$1();
        this.events.once(xi$1("session_ping", s2), ({ error: l2 }) => {
          l2 ? a2(l2) : o2();
        }), await Promise.all([this.sendRequest({ topic: t2, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s2, relayRpcId: i2 }), r2()]);
      } else this.client.core.pairing.pairings.keys.includes(t2) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t2 }));
    }), c(this, "emit", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e);
      const { topic: t2, event: s2, chainId: i2 } = e, r2 = getBigIntRpcId().toString(), o2 = payloadId();
      await this.sendRequest({ topic: t2, method: "wc_sessionEvent", params: { event: s2, chainId: i2 }, throwOnFailedPublish: true, relayRpcId: r2, clientRpcId: o2 });
    }), c(this, "disconnect", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e);
      const { topic: t2 } = e;
      if (this.client.session.keys.includes(t2)) await this.sendRequest({ topic: t2, method: "wc_sessionDelete", params: Nt$1("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t2, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t2)) await this.client.core.pairing.disconnect({ topic: t2 });
      else {
        const { message: s2 } = ht$2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t2}`);
        throw new Error(s2);
      }
    }), c(this, "find", (e) => (this.isInitialized(), this.client.session.getAll().filter((t2) => ua(t2, e)))), c(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c(this, "authenticate", async (e, t2) => {
      var s2;
      this.isInitialized(), this.isValidAuthenticate(e);
      const i2 = t2 && this.client.core.linkModeSupportedApps.includes(t2) && ((s2 = this.client.metadata.redirect) == null ? void 0 : s2.linkMode), r2 = i2 ? Q$1.link_mode : Q$1.relay;
      r2 === Q$1.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o2, statement: a2 = "", uri: l2, domain: p2, nonce: h3, type: u2, exp: d3, nbf: w2, methods: m2 = [], expiry: f3 } = e, _ = [...e.resources || []], { topic: g, uri: A2 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r2 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: g, uri: A2 } });
      const D2 = await this.client.core.crypto.generateKeyPair(), I3 = Pc(D2);
      if (await Promise.all([this.client.auth.authKeys.set(ce$1, { responseTopic: I3, publicKey: D2 }), this.client.auth.pairingTopics.set(I3, { topic: I3, pairingTopic: g })]), await this.client.core.relayer.subscribe(I3, { transportType: r2 }), this.client.logger.info(`sending request to new pairing topic: ${g}`), m2.length > 0) {
        const { namespace: x2 } = Ne$1(o2[0]);
        let L2 = fs(x2, "request", m2);
        pe$2(_) && (L2 = ls(L2, _.pop())), _.push(L2);
      }
      const T2 = f3 && f3 > N$1.wc_sessionAuthenticate.req.ttl ? f3 : N$1.wc_sessionAuthenticate.req.ttl, K2 = { authPayload: { type: u2 ?? "caip122", chains: o2, statement: a2, aud: l2, domain: p2, version: "1", nonce: h3, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d3, nbf: w2, resources: _ }, requester: { publicKey: D2, metadata: this.client.metadata }, expiryTimestamp: Ei$1(T2) }, fe2 = { eip155: { chains: o2, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m2])], events: ["chainChanged", "accountsChanged"] } }, q2 = { requiredNamespaces: {}, optionalNamespaces: fe2, relays: [{ protocol: "irn" }], pairingTopic: g, proposer: { publicKey: D2, metadata: this.client.metadata }, expiryTimestamp: Ei$1(N$1.wc_sessionPropose.req.ttl), id: payloadId() }, { done: Rt2, resolve: je2, reject: Se2 } = gi$1(T2, "Request expired"), te2 = payloadId(), le2 = xi$1("session_connect", q2.id), Re2 = xi$1("session_request", te2), pe2 = async ({ error: x2, session: L2 }) => {
        this.events.off(Re2, ve2), x2 ? Se2(x2) : L2 && je2({ session: L2 });
      }, ve2 = async (x2) => {
        var L2, Fe2, Qe2;
        if (await this.deletePendingAuthRequest(te2, { message: "fulfilled", code: 0 }), x2.error) {
          const ie2 = Nt$1("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return x2.error.code === ie2.code ? void 0 : (this.events.off(le2, pe2), Se2(x2.error.message));
        }
        await this.deleteProposal(q2.id), this.events.off(le2, pe2);
        const { cacaos: He2, responder: Q2 } = x2.result, Te3 = [], ze2 = [];
        for (const ie2 of He2) {
          await is({ cacao: ie2, projectId: this.client.core.projectId }) || (this.client.logger.error(ie2, "Signature verification failed"), Se2(Nt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: qe2 } = ie2, Pe2 = pe$2(qe2.resources), Ye2 = [dr$1(qe2.iss)], vt2 = De$2(qe2.iss);
          if (Pe2) {
            const Ne2 = ds(Pe2), It2 = hs(Pe2);
            Te3.push(...Ne2), Ye2.push(...It2);
          }
          for (const Ne2 of Ye2) ze2.push(`${Ne2}:${vt2}`);
        }
        const se2 = await this.client.core.crypto.generateSharedKey(D2, Q2.publicKey);
        let he2;
        Te3.length > 0 && (he2 = { topic: se2, acknowledged: true, self: { publicKey: D2, metadata: this.client.metadata }, peer: Q2, controller: Q2.publicKey, expiry: Ei$1(J2), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: g, namespaces: ca([...new Set(Te3)], [...new Set(ze2)]), transportType: r2 }, await this.client.core.relayer.subscribe(se2, { transportType: r2 }), await this.client.session.set(se2, he2), g && await this.client.core.pairing.updateMetadata({ topic: g, metadata: Q2.metadata }), he2 = this.client.session.get(se2)), (L2 = this.client.metadata.redirect) != null && L2.linkMode && (Fe2 = Q2.metadata.redirect) != null && Fe2.linkMode && (Qe2 = Q2.metadata.redirect) != null && Qe2.universal && t2 && (this.client.core.addLinkModeSupportedApp(Q2.metadata.redirect.universal), this.client.session.update(se2, { transportType: Q$1.link_mode })), je2({ auths: He2, session: he2 });
      };
      this.events.once(le2, pe2), this.events.once(Re2, ve2);
      let Ie2;
      try {
        if (i2) {
          const x2 = formatJsonRpcRequest("wc_sessionAuthenticate", K2, te2);
          this.client.core.history.set(g, x2);
          const L2 = await this.client.core.crypto.encode("", x2, { type: re$2, encoding: xe$1 });
          Ie2 = Xc(t2, g, L2);
        } else await Promise.all([this.sendRequest({ topic: g, method: "wc_sessionAuthenticate", params: K2, expiry: e.expiry, throwOnFailedPublish: true, clientRpcId: te2 }), this.sendRequest({ topic: g, method: "wc_sessionPropose", params: q2, expiry: N$1.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: q2.id })]);
      } catch (x2) {
        throw this.events.off(le2, pe2), this.events.off(Re2, ve2), x2;
      }
      return await this.setProposal(q2.id, q2), await this.setAuthRequest(te2, { request: b$1(v({}, K2), { verifyContext: {} }), pairingTopic: g, transportType: r2 }), { uri: Ie2 ?? A2, response: Rt2 };
    }), c(this, "approveSessionAuthenticate", async (e) => {
      const { id: t2, auths: s2 } = e, i2 = this.client.core.eventClient.createEvent({ properties: { topic: t2.toString(), trace: [ir.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (f3) {
        throw i2.setError(sr.no_internet_connection), f3;
      }
      const r2 = this.getPendingAuthRequest(t2);
      if (!r2) throw i2.setError(sr.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t2}`);
      const o2 = r2.transportType || Q$1.relay;
      o2 === Q$1.relay && await this.confirmOnlineStateOrThrow();
      const a2 = r2.requester.publicKey, l2 = await this.client.core.crypto.generateKeyPair(), p2 = Pc(a2), h3 = { type: Ft$2, receiverPublicKey: a2, senderPublicKey: l2 }, u2 = [], d3 = [];
      for (const f3 of s2) {
        if (!await is({ cacao: f3, projectId: this.client.core.projectId })) {
          i2.setError(sr.invalid_cacao);
          const I3 = Nt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t2, topic: p2, error: I3, encodeOpts: h3 }), new Error(I3.message);
        }
        i2.addTrace(ir.cacaos_verified);
        const { p: _ } = f3, g = pe$2(_.resources), A2 = [dr$1(_.iss)], D2 = De$2(_.iss);
        if (g) {
          const I3 = ds(g), T2 = hs(g);
          u2.push(...I3), A2.push(...T2);
        }
        for (const I3 of A2) d3.push(`${I3}:${D2}`);
      }
      const w2 = await this.client.core.crypto.generateSharedKey(l2, a2);
      i2.addTrace(ir.create_authenticated_session_topic);
      let m2;
      if ((u2 == null ? void 0 : u2.length) > 0) {
        m2 = { topic: w2, acknowledged: true, self: { publicKey: l2, metadata: this.client.metadata }, peer: { publicKey: a2, metadata: r2.requester.metadata }, controller: a2, expiry: Ei$1(J2), authentication: s2, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r2.pairingTopic, namespaces: ca([...new Set(u2)], [...new Set(d3)]), transportType: o2 }, i2.addTrace(ir.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w2, { transportType: o2 });
        } catch (f3) {
          throw i2.setError(sr.subscribe_authenticated_session_topic_failure), f3;
        }
        i2.addTrace(ir.subscribe_authenticated_session_topic_success), await this.client.session.set(w2, m2), i2.addTrace(ir.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r2.pairingTopic, metadata: r2.requester.metadata });
      }
      i2.addTrace(ir.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: p2, id: t2, result: { cacaos: s2, responder: { publicKey: l2, metadata: this.client.metadata } }, encodeOpts: h3, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r2.requester.metadata, o2) });
      } catch (f3) {
        throw i2.setError(sr.authenticated_session_approve_publish_failure), f3;
      }
      return await this.client.auth.requests.delete(t2, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r2.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i2.eventId }), { session: m2 };
    }), c(this, "rejectSessionAuthenticate", async (e) => {
      this.isInitialized();
      const { id: t2, reason: s2 } = e, i2 = this.getPendingAuthRequest(t2);
      if (!i2) throw new Error(`Could not find pending auth request with id ${t2}`);
      i2.transportType === Q$1.relay && await this.confirmOnlineStateOrThrow();
      const r2 = i2.requester.publicKey, o2 = await this.client.core.crypto.generateKeyPair(), a2 = Pc(r2), l2 = { type: Ft$2, receiverPublicKey: r2, senderPublicKey: o2 };
      await this.sendError({ id: t2, topic: a2, error: s2, encodeOpts: l2, rpcOpts: N$1.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i2.requester.metadata, i2.transportType) }), await this.client.auth.requests.delete(t2, { message: "rejected", code: 0 }), await this.client.proposal.delete(t2, Nt$1("USER_DISCONNECTED"));
    }), c(this, "formatAuthMessage", (e) => {
      this.isInitialized();
      const { request: t2, iss: s2 } = e;
      return hr$1(t2, s2);
    }), c(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const e = this.relayMessageCache.shift();
          e && await this.onRelayMessage(e);
        } catch (e) {
          this.client.logger.error(e);
        }
      }, 50);
    }), c(this, "cleanupDuplicatePairings", async (e) => {
      if (e.pairingTopic) try {
        const t2 = this.client.core.pairing.pairings.get(e.pairingTopic), s2 = this.client.core.pairing.pairings.getAll().filter((i2) => {
          var r2, o2;
          return ((r2 = i2.peerMetadata) == null ? void 0 : r2.url) && ((o2 = i2.peerMetadata) == null ? void 0 : o2.url) === e.peer.metadata.url && i2.topic && i2.topic !== t2.topic;
        });
        if (s2.length === 0) return;
        this.client.logger.info(`Cleaning up ${s2.length} duplicate pairing(s)`), await Promise.all(s2.map((i2) => this.client.core.pairing.disconnect({ topic: i2.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (t2) {
        this.client.logger.error(t2);
      }
    }), c(this, "deleteSession", async (e) => {
      var t2;
      const { topic: s2, expirerHasDeleted: i2 = false, emitEvent: r2 = true, id: o2 = 0 } = e, { self: a2 } = this.client.session.get(s2);
      await this.client.core.relayer.unsubscribe(s2), await this.client.session.delete(s2, Nt$1("USER_DISCONNECTED")), this.addToRecentlyDeleted(s2, "session"), this.client.core.crypto.keychain.has(a2.publicKey) && await this.client.core.crypto.deleteKeyPair(a2.publicKey), this.client.core.crypto.keychain.has(s2) && await this.client.core.crypto.deleteSymKey(s2), i2 || this.client.core.expirer.del(s2), this.client.core.storage.removeItem(Me$1).catch((l2) => this.client.logger.warn(l2)), this.getPendingSessionRequests().forEach((l2) => {
        l2.topic === s2 && this.deletePendingSessionRequest(l2.id, Nt$1("USER_DISCONNECTED"));
      }), s2 === ((t2 = this.sessionRequestQueue.queue[0]) == null ? void 0 : t2.topic) && (this.sessionRequestQueue.state = $$1.idle), r2 && this.client.events.emit("session_delete", { id: o2, topic: s2 });
    }), c(this, "deleteProposal", async (e, t2) => {
      if (t2) try {
        const s2 = this.client.proposal.get(e), i2 = this.client.core.eventClient.getEvent({ topic: s2.pairingTopic });
        i2 == null ? void 0 : i2.setError(tr.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(e, Nt$1("USER_DISCONNECTED")), t2 ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "proposal");
    }), c(this, "deletePendingSessionRequest", async (e, t2, s2 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e, t2), s2 ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i2) => i2.id !== e), s2 && (this.sessionRequestQueue.state = $$1.idle, this.client.events.emit("session_request_expire", { id: e }));
    }), c(this, "deletePendingAuthRequest", async (e, t2, s2 = false) => {
      await Promise.all([this.client.auth.requests.delete(e, t2), s2 ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }), c(this, "setExpiry", async (e, t2) => {
      this.client.session.keys.includes(e) && (this.client.core.expirer.set(e, t2), await this.client.session.update(e, { expiry: t2 }));
    }), c(this, "setProposal", async (e, t2) => {
      this.client.core.expirer.set(e, Ei$1(N$1.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e, t2);
    }), c(this, "setAuthRequest", async (e, t2) => {
      const { request: s2, pairingTopic: i2, transportType: r2 = Q$1.relay } = t2;
      this.client.core.expirer.set(e, s2.expiryTimestamp), await this.client.auth.requests.set(e, { authPayload: s2.authPayload, requester: s2.requester, expiryTimestamp: s2.expiryTimestamp, id: e, pairingTopic: i2, verifyContext: s2.verifyContext, transportType: r2 });
    }), c(this, "setPendingSessionRequest", async (e) => {
      const { id: t2, topic: s2, params: i2, verifyContext: r2 } = e, o2 = i2.request.expiryTimestamp || Ei$1(N$1.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t2, o2), await this.client.pendingRequest.set(t2, { id: t2, topic: s2, params: i2, verifyContext: r2 });
    }), c(this, "sendRequest", async (e) => {
      const { topic: t2, method: s2, params: i2, expiry: r2, relayRpcId: o2, clientRpcId: a2, throwOnFailedPublish: l2, appLink: p2, tvf: h3 } = e, u2 = formatJsonRpcRequest(s2, i2, a2);
      let d3;
      const w2 = !!p2;
      try {
        const _ = w2 ? xe$1 : qt$2;
        d3 = await this.client.core.crypto.encode(t2, u2, { encoding: _ });
      } catch (_) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t2} failed`), _;
      }
      let m2;
      if (gt$1.includes(s2)) {
        const _ = kc(JSON.stringify(u2)), g = kc(d3);
        m2 = await this.client.core.verify.register({ id: g, decryptedId: _ });
      }
      const f3 = N$1[s2].req;
      if (f3.attestation = m2, r2 && (f3.ttl = r2), o2 && (f3.id = o2), this.client.core.history.set(t2, u2), w2) {
        const _ = Xc(p2, t2, d3);
        await global.Linking.openURL(_, this.client.name);
      } else {
        const _ = N$1[s2].req;
        r2 && (_.ttl = r2), o2 && (_.id = o2), _.tvf = b$1(v({}, h3), { correlationId: u2.id }), l2 ? (_.internal = b$1(v({}, _.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t2, d3, _)) : this.client.core.relayer.publish(t2, d3, _).catch((g) => this.client.logger.error(g));
      }
      return u2.id;
    }), c(this, "sendResult", async (e) => {
      const { id: t2, topic: s2, result: i2, throwOnFailedPublish: r2, encodeOpts: o2, appLink: a2 } = e, l2 = formatJsonRpcResult(t2, i2);
      let p2;
      const h3 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const w2 = h3 ? xe$1 : qt$2;
        p2 = await this.client.core.crypto.encode(s2, l2, b$1(v({}, o2 || {}), { encoding: w2 }));
      } catch (w2) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s2} failed`), w2;
      }
      let u2, d3;
      try {
        u2 = await this.client.core.history.get(s2, t2);
        const w2 = u2.request;
        try {
          this.shouldSetTVF(w2.method, w2.params) && (d3 = this.getTVFParams(t2, w2.params, i2));
        } catch (m2) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m2);
        }
      } catch (w2) {
        throw this.client.logger.error(`sendResult() -> history.get(${s2}, ${t2}) failed`), w2;
      }
      if (h3) {
        const w2 = Xc(a2, s2, p2);
        await global.Linking.openURL(w2, this.client.name);
      } else {
        const w2 = u2.request.method, m2 = N$1[w2].res;
        m2.tvf = b$1(v({}, d3), { correlationId: t2 }), r2 ? (m2.internal = b$1(v({}, m2.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s2, p2, m2)) : this.client.core.relayer.publish(s2, p2, m2).catch((f3) => this.client.logger.error(f3));
      }
      await this.client.core.history.resolve(l2);
    }), c(this, "sendError", async (e) => {
      const { id: t2, topic: s2, error: i2, encodeOpts: r2, rpcOpts: o2, appLink: a2 } = e, l2 = formatJsonRpcError(t2, i2);
      let p2;
      const h3 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d3 = h3 ? xe$1 : qt$2;
        p2 = await this.client.core.crypto.encode(s2, l2, b$1(v({}, r2 || {}), { encoding: d3 }));
      } catch (d3) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s2} failed`), d3;
      }
      let u2;
      try {
        u2 = await this.client.core.history.get(s2, t2);
      } catch (d3) {
        throw this.client.logger.error(`sendError() -> history.get(${s2}, ${t2}) failed`), d3;
      }
      if (h3) {
        const d3 = Xc(a2, s2, p2);
        await global.Linking.openURL(d3, this.client.name);
      } else {
        const d3 = u2.request.method, w2 = o2 || N$1[d3].res;
        this.client.core.relayer.publish(s2, p2, w2);
      }
      await this.client.core.history.resolve(l2);
    }), c(this, "cleanup", async () => {
      const e = [], t2 = [];
      this.client.session.getAll().forEach((s2) => {
        let i2 = false;
        vi$1(s2.expiry) && (i2 = true), this.client.core.crypto.keychain.has(s2.topic) || (i2 = true), i2 && e.push(s2.topic);
      }), this.client.proposal.getAll().forEach((s2) => {
        vi$1(s2.expiryTimestamp) && t2.push(s2.id);
      }), await Promise.all([...e.map((s2) => this.deleteSession({ topic: s2 })), ...t2.map((s2) => this.deleteProposal(s2))]);
    }), c(this, "onProviderMessageEvent", async (e) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e) : await this.onRelayMessage(e);
    }), c(this, "onRelayEventRequest", async (e) => {
      this.requestQueue.queue.push(e), await this.processRequestsQueue();
    }), c(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === $$1.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = $$1.active;
        const e = this.requestQueue.queue.shift();
        if (e) try {
          await this.processRequest(e);
        } catch (t2) {
          this.client.logger.warn(t2);
        }
      }
      this.requestQueue.state = $$1.idle;
    }), c(this, "processRequest", async (e) => {
      const { topic: t2, payload: s2, attestation: i2, transportType: r2, encryptedId: o2 } = e, a2 = s2.method;
      if (!this.shouldIgnorePairingRequest({ topic: t2, requestMethod: a2 })) switch (a2) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: t2, payload: s2, attestation: i2, encryptedId: o2 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(t2, s2);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(t2, s2);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(t2, s2);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(t2, s2);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(t2, s2);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: t2, payload: s2, attestation: i2, encryptedId: o2, transportType: r2 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(t2, s2);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: t2, payload: s2, attestation: i2, encryptedId: o2, transportType: r2 });
        default:
          return this.client.logger.info(`Unsupported request method ${a2}`);
      }
    }), c(this, "onRelayEventResponse", async (e) => {
      const { topic: t2, payload: s2, transportType: i2 } = e, r2 = (await this.client.core.history.get(t2, s2.id)).request.method;
      switch (r2) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t2, s2, i2);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t2, s2);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t2, s2);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t2, s2);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t2, s2);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t2, s2);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t2, s2);
        default:
          return this.client.logger.info(`Unsupported response method ${r2}`);
      }
    }), c(this, "onRelayEventUnknownPayload", (e) => {
      const { topic: t2 } = e, { message: s2 } = ht$2("MISSING_OR_INVALID", `Decoded payload on topic ${t2} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s2);
    }), c(this, "shouldIgnorePairingRequest", (e) => {
      const { topic: t2, requestMethod: s2 } = e, i2 = this.expectedPairingMethodMap.get(t2);
      return !i2 || i2.includes(s2) ? false : !!(i2.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c(this, "onSessionProposeRequest", async (e) => {
      const { topic: t2, payload: s2, attestation: i2, encryptedId: r2 } = e, { params: o2, id: a2 } = s2;
      try {
        const l2 = this.client.core.eventClient.getEvent({ topic: t2 });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l2 == null ? void 0 : l2.setError(Y$1.proposal_listener_not_found)), this.isValidConnect(v({}, s2.params));
        const p2 = o2.expiryTimestamp || Ei$1(N$1.wc_sessionPropose.req.ttl), h3 = v({ id: a2, pairingTopic: t2, expiryTimestamp: p2 }, o2);
        await this.setProposal(a2, h3);
        const u2 = await this.getVerifyContext({ attestationId: i2, hash: kc(JSON.stringify(s2)), encryptedId: r2, metadata: h3.proposer.metadata });
        l2 == null ? void 0 : l2.addTrace(G.emit_session_proposal), this.client.events.emit("session_proposal", { id: a2, params: h3, verifyContext: u2 });
      } catch (l2) {
        await this.sendError({ id: a2, topic: t2, error: l2, rpcOpts: N$1.wc_sessionPropose.autoReject }), this.client.logger.error(l2);
      }
    }), c(this, "onSessionProposeResponse", async (e, t2, s2) => {
      const { id: i2 } = t2;
      if (isJsonRpcResult(t2)) {
        const { result: r2 } = t2;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r2 });
        const o2 = this.client.proposal.get(i2);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o2 });
        const a2 = o2.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a2 });
        const l2 = r2.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l2 });
        const p2 = await this.client.core.crypto.generateSharedKey(a2, l2);
        this.pendingSessions.set(i2, { sessionTopic: p2, pairingTopic: e, proposalId: i2, publicKey: a2 });
        const h3 = await this.client.core.relayer.subscribe(p2, { transportType: s2 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h3 }), await this.client.core.pairing.activate({ topic: e });
      } else if (isJsonRpcError(t2)) {
        await this.client.proposal.delete(i2, Nt$1("USER_DISCONNECTED"));
        const r2 = xi$1("session_connect", i2);
        if (this.events.listenerCount(r2) === 0) throw new Error(`emitting ${r2} without any listeners, 954`);
        this.events.emit(r2, { error: t2.error });
      }
    }), c(this, "onSessionSettleRequest", async (e, t2) => {
      const { id: s2, params: i2 } = t2;
      try {
        this.isValidSessionSettleRequest(i2);
        const { relay: r2, controller: o2, expiry: a2, namespaces: l2, sessionProperties: p2, scopedProperties: h3, sessionConfig: u2 } = t2.params, d3 = [...this.pendingSessions.values()].find((f3) => f3.sessionTopic === e);
        if (!d3) return this.client.logger.error(`Pending session not found for topic ${e}`);
        const w2 = this.client.proposal.get(d3.proposalId), m2 = b$1(v(v(v({ topic: e, relay: r2, expiry: a2, namespaces: l2, acknowledged: true, pairingTopic: d3.pairingTopic, requiredNamespaces: w2.requiredNamespaces, optionalNamespaces: w2.optionalNamespaces, controller: o2.publicKey, self: { publicKey: d3.publicKey, metadata: this.client.metadata }, peer: { publicKey: o2.publicKey, metadata: o2.metadata } }, p2 && { sessionProperties: p2 }), h3 && { scopedProperties: h3 }), u2 && { sessionConfig: u2 }), { transportType: Q$1.relay });
        await this.client.session.set(m2.topic, m2), await this.setExpiry(m2.topic, m2.expiry), await this.client.core.pairing.updateMetadata({ topic: d3.pairingTopic, metadata: m2.peer.metadata }), this.client.events.emit("session_connect", { session: m2 }), this.events.emit(xi$1("session_connect", d3.proposalId), { session: m2 }), this.pendingSessions.delete(d3.proposalId), this.deleteProposal(d3.proposalId, false), this.cleanupDuplicatePairings(m2), await this.sendResult({ id: t2.id, topic: e, result: true, throwOnFailedPublish: true });
      } catch (r2) {
        await this.sendError({ id: s2, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }), c(this, "onSessionSettleResponse", async (e, t2) => {
      const { id: s2 } = t2;
      isJsonRpcResult(t2) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(xi$1("session_approve", s2), {})) : isJsonRpcError(t2) && (await this.client.session.delete(e, Nt$1("USER_DISCONNECTED")), this.events.emit(xi$1("session_approve", s2), { error: t2.error }));
    }), c(this, "onSessionUpdateRequest", async (e, t2) => {
      const { params: s2, id: i2 } = t2;
      try {
        const r2 = `${e}_session_update`, o2 = Ra.get(r2);
        if (o2 && this.isRequestOutOfSync(o2, i2)) {
          this.client.logger.warn(`Discarding out of sync request - ${i2}`), this.sendError({ id: i2, topic: e, error: Nt$1("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(v({ topic: e }, s2));
        try {
          Ra.set(r2, i2), await this.client.session.update(e, { namespaces: s2.namespaces }), await this.sendResult({ id: i2, topic: e, result: true, throwOnFailedPublish: true });
        } catch (a2) {
          throw Ra.delete(r2), a2;
        }
        this.client.events.emit("session_update", { id: i2, topic: e, params: s2 });
      } catch (r2) {
        await this.sendError({ id: i2, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }), c(this, "isRequestOutOfSync", (e, t2) => t2.toString().slice(0, -3) < e.toString().slice(0, -3)), c(this, "onSessionUpdateResponse", (e, t2) => {
      const { id: s2 } = t2, i2 = xi$1("session_update", s2);
      if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t2) ? this.events.emit(xi$1("session_update", s2), {}) : isJsonRpcError(t2) && this.events.emit(xi$1("session_update", s2), { error: t2.error });
    }), c(this, "onSessionExtendRequest", async (e, t2) => {
      const { id: s2 } = t2;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, Ei$1(J2)), await this.sendResult({ id: s2, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s2, topic: e });
      } catch (i2) {
        await this.sendError({ id: s2, topic: e, error: i2 }), this.client.logger.error(i2);
      }
    }), c(this, "onSessionExtendResponse", (e, t2) => {
      const { id: s2 } = t2, i2 = xi$1("session_extend", s2);
      if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t2) ? this.events.emit(xi$1("session_extend", s2), {}) : isJsonRpcError(t2) && this.events.emit(xi$1("session_extend", s2), { error: t2.error });
    }), c(this, "onSessionPingRequest", async (e, t2) => {
      const { id: s2 } = t2;
      try {
        this.isValidPing({ topic: e }), await this.sendResult({ id: s2, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s2, topic: e });
      } catch (i2) {
        await this.sendError({ id: s2, topic: e, error: i2 }), this.client.logger.error(i2);
      }
    }), c(this, "onSessionPingResponse", (e, t2) => {
      const { id: s2 } = t2, i2 = xi$1("session_ping", s2);
      setTimeout(() => {
        if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners 2176`);
        isJsonRpcResult(t2) ? this.events.emit(xi$1("session_ping", s2), {}) : isJsonRpcError(t2) && this.events.emit(xi$1("session_ping", s2), { error: t2.error });
      }, 500);
    }), c(this, "onSessionDeleteRequest", async (e, t2) => {
      const { id: s2 } = t2;
      try {
        this.isValidDisconnect({ topic: e, reason: t2.params }), Promise.all([new Promise((i2) => {
          this.client.core.relayer.once(C$1.publish, async () => {
            i2(await this.deleteSession({ topic: e, id: s2 }));
          });
        }), this.sendResult({ id: s2, topic: e, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e, error: Nt$1("USER_DISCONNECTED") })]).catch((i2) => this.client.logger.error(i2));
      } catch (i2) {
        this.client.logger.error(i2);
      }
    }), c(this, "onSessionRequest", async (e) => {
      var t2, s2, i2;
      const { topic: r2, payload: o2, attestation: a2, encryptedId: l2, transportType: p2 } = e, { id: h3, params: u2 } = o2;
      try {
        await this.isValidRequest(v({ topic: r2 }, u2));
        const d3 = this.client.session.get(r2), w2 = await this.getVerifyContext({ attestationId: a2, hash: kc(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", u2, h3))), encryptedId: l2, metadata: d3.peer.metadata, transportType: p2 }), m2 = { id: h3, topic: r2, params: u2, verifyContext: w2 };
        await this.setPendingSessionRequest(m2), p2 === Q$1.link_mode && (t2 = d3.peer.metadata.redirect) != null && t2.universal && this.client.core.addLinkModeSupportedApp((s2 = d3.peer.metadata.redirect) == null ? void 0 : s2.universal), (i2 = this.client.signConfig) != null && i2.disableRequestQueue ? this.emitSessionRequest(m2) : (this.addSessionRequestToSessionRequestQueue(m2), this.processSessionRequestQueue());
      } catch (d3) {
        await this.sendError({ id: h3, topic: r2, error: d3 }), this.client.logger.error(d3);
      }
    }), c(this, "onSessionRequestResponse", (e, t2) => {
      const { id: s2 } = t2, i2 = xi$1("session_request", s2);
      if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t2) ? this.events.emit(xi$1("session_request", s2), { result: t2.result }) : isJsonRpcError(t2) && this.events.emit(xi$1("session_request", s2), { error: t2.error });
    }), c(this, "onSessionEventRequest", async (e, t2) => {
      const { id: s2, params: i2 } = t2;
      try {
        const r2 = `${e}_session_event_${i2.event.name}`, o2 = Ra.get(r2);
        if (o2 && this.isRequestOutOfSync(o2, s2)) {
          this.client.logger.info(`Discarding out of sync request - ${s2}`);
          return;
        }
        this.isValidEmit(v({ topic: e }, i2)), this.client.events.emit("session_event", { id: s2, topic: e, params: i2 }), Ra.set(r2, s2);
      } catch (r2) {
        await this.sendError({ id: s2, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }), c(this, "onSessionAuthenticateResponse", (e, t2) => {
      const { id: s2 } = t2;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e, payload: t2 }), isJsonRpcResult(t2) ? this.events.emit(xi$1("session_request", s2), { result: t2.result }) : isJsonRpcError(t2) && this.events.emit(xi$1("session_request", s2), { error: t2.error });
    }), c(this, "onSessionAuthenticateRequest", async (e) => {
      var t2;
      const { topic: s2, payload: i2, attestation: r2, encryptedId: o2, transportType: a2 } = e;
      try {
        const { requester: l2, authPayload: p2, expiryTimestamp: h3 } = i2.params, u2 = await this.getVerifyContext({ attestationId: r2, hash: kc(JSON.stringify(i2)), encryptedId: o2, metadata: l2.metadata, transportType: a2 }), d3 = { requester: l2, pairingTopic: s2, id: i2.id, authPayload: p2, verifyContext: u2, expiryTimestamp: h3 };
        await this.setAuthRequest(i2.id, { request: d3, pairingTopic: s2, transportType: a2 }), a2 === Q$1.link_mode && (t2 = l2.metadata.redirect) != null && t2.universal && this.client.core.addLinkModeSupportedApp(l2.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s2, params: i2.params, id: i2.id, verifyContext: u2 });
      } catch (l2) {
        this.client.logger.error(l2);
        const p2 = i2.params.requester.publicKey, h3 = await this.client.core.crypto.generateKeyPair(), u2 = this.getAppLinkIfEnabled(i2.params.requester.metadata, a2), d3 = { type: Ft$2, receiverPublicKey: p2, senderPublicKey: h3 };
        await this.sendError({ id: i2.id, topic: s2, error: l2, encodeOpts: d3, rpcOpts: N$1.wc_sessionAuthenticate.autoReject, appLink: u2 });
      }
    }), c(this, "addSessionRequestToSessionRequestQueue", (e) => {
      this.sessionRequestQueue.queue.push(e);
    }), c(this, "cleanupAfterResponse", (e) => {
      this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = $$1.idle, this.processSessionRequestQueue();
      }, cjs.toMiliseconds(this.requestQueueDelay));
    }), c(this, "cleanupPendingSentRequestsForTopic", ({ topic: e, error: t2 }) => {
      const s2 = this.client.core.history.pending;
      s2.length > 0 && s2.filter((i2) => i2.topic === e && i2.request.method === "wc_sessionRequest").forEach((i2) => {
        const r2 = i2.request.id, o2 = xi$1("session_request", r2);
        if (this.events.listenerCount(o2) === 0) throw new Error(`emitting ${o2} without any listeners`);
        this.events.emit(xi$1("session_request", i2.request.id), { error: t2 });
      });
    }), c(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === $$1.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e = this.sessionRequestQueue.queue[0];
      if (!e) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = $$1.active, this.emitSessionRequest(e);
      } catch (t2) {
        this.client.logger.error(t2);
      }
    }), c(this, "emitSessionRequest", (e) => {
      this.client.events.emit("session_request", e);
    }), c(this, "onPairingCreated", (e) => {
      if (e.methods && this.expectedPairingMethodMap.set(e.topic, e.methods), e.active) return;
      const t2 = this.client.proposal.getAll().find((s2) => s2.pairingTopic === e.topic);
      t2 && this.onSessionProposeRequest({ topic: e.topic, payload: formatJsonRpcRequest("wc_sessionPropose", b$1(v({}, t2), { requiredNamespaces: t2.requiredNamespaces, optionalNamespaces: t2.optionalNamespaces, relays: t2.relays, proposer: t2.proposer, sessionProperties: t2.sessionProperties, scopedProperties: t2.scopedProperties }), t2.id) });
    }), c(this, "isValidConnect", async (e) => {
      if (!ma(e)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(l2);
      }
      const { pairingTopic: t2, requiredNamespaces: s2, optionalNamespaces: i2, sessionProperties: r2, scopedProperties: o2, relays: a2 } = e;
      if (Et$2(t2) || await this.isValidPairingTopic(t2), !ga(a2)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `connect() relays: ${a2}`);
        throw new Error(l2);
      }
      if (!Et$2(s2) && Oe$1(s2) !== 0) {
        const l2 = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l2) : this.client.logger.warn(l2), this.validateNamespaces(s2, "requiredNamespaces");
      }
      if (!Et$2(i2) && Oe$1(i2) !== 0 && this.validateNamespaces(i2, "optionalNamespaces"), Et$2(r2) || this.validateSessionProps(r2, "sessionProperties"), !Et$2(o2)) {
        this.validateSessionProps(o2, "scopedProperties");
        const l2 = Object.keys(s2 || {}).concat(Object.keys(i2 || {}));
        if (!Object.keys(o2).every((p2) => l2.includes(p2))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(o2)}, required/optional namespaces: ${JSON.stringify(l2)}`);
      }
    }), c(this, "validateNamespaces", (e, t2) => {
      const s2 = pa(e, "connect()", t2);
      if (s2) throw new Error(s2.message);
    }), c(this, "isValidApprove", async (e) => {
      if (!ma(e)) throw new Error(ht$2("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: t2, namespaces: s2, relayProtocol: i2, sessionProperties: r2, scopedProperties: o2 } = e;
      this.checkRecentlyDeleted(t2), await this.isValidProposalId(t2);
      const a2 = this.client.proposal.get(t2), l2 = Bo$1(s2, "approve()");
      if (l2) throw new Error(l2.message);
      const p2 = No$1(a2.requiredNamespaces, s2, "approve()");
      if (p2) throw new Error(p2.message);
      if (!nt$1(i2, true)) {
        const { message: h3 } = ht$2("MISSING_OR_INVALID", `approve() relayProtocol: ${i2}`);
        throw new Error(h3);
      }
      if (Et$2(r2) || this.validateSessionProps(r2, "sessionProperties"), !Et$2(o2)) {
        this.validateSessionProps(o2, "scopedProperties");
        const h3 = new Set(Object.keys(s2));
        if (!Object.keys(o2).every((u2) => h3.has(u2))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(o2)}, approved namespaces: ${Array.from(h3).join(", ")}`);
      }
    }), c(this, "isValidReject", async (e) => {
      if (!ma(e)) {
        const { message: i2 } = ht$2("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(i2);
      }
      const { id: t2, reason: s2 } = e;
      if (this.checkRecentlyDeleted(t2), await this.isValidProposalId(t2), !wa(s2)) {
        const { message: i2 } = ht$2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s2)}`);
        throw new Error(i2);
      }
    }), c(this, "isValidSessionSettleRequest", (e) => {
      if (!ma(e)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(l2);
      }
      const { relay: t2, controller: s2, namespaces: i2, expiry: r2 } = e;
      if (!Io$1(t2)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l2);
      }
      const o2 = ha(s2, "onSessionSettleRequest()");
      if (o2) throw new Error(o2.message);
      const a2 = Bo$1(i2, "onSessionSettleRequest()");
      if (a2) throw new Error(a2.message);
      if (vi$1(r2)) {
        const { message: l2 } = ht$2("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l2);
      }
    }), c(this, "isValidUpdate", async (e) => {
      if (!ma(e)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: t2, namespaces: s2 } = e;
      this.checkRecentlyDeleted(t2), await this.isValidSessionTopic(t2);
      const i2 = this.client.session.get(t2), r2 = Bo$1(s2, "update()");
      if (r2) throw new Error(r2.message);
      const o2 = No$1(i2.requiredNamespaces, s2, "update()");
      if (o2) throw new Error(o2.message);
    }), c(this, "isValidExtend", async (e) => {
      if (!ma(e)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(s2);
      }
      const { topic: t2 } = e;
      this.checkRecentlyDeleted(t2), await this.isValidSessionTopic(t2);
    }), c(this, "isValidRequest", async (e) => {
      if (!ma(e)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: t2, request: s2, chainId: i2, expiry: r2 } = e;
      this.checkRecentlyDeleted(t2), await this.isValidSessionTopic(t2);
      const { namespaces: o2 } = this.client.session.get(t2);
      if (!xa(o2, i2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() chainId: ${i2}`);
        throw new Error(a2);
      }
      if (!ba(s2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() ${JSON.stringify(s2)}`);
        throw new Error(a2);
      }
      if (!Sa(o2, i2, s2.method)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() method: ${s2.method}`);
        throw new Error(a2);
      }
      if (r2 && !Ia(r2, _e$1)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() expiry: ${r2}. Expiry must be a number (in seconds) between ${_e$1.min} and ${_e$1.max}`);
        throw new Error(a2);
      }
    }), c(this, "isValidRespond", async (e) => {
      var t2;
      if (!ma(e)) {
        const { message: r2 } = ht$2("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(r2);
      }
      const { topic: s2, response: i2 } = e;
      try {
        await this.isValidSessionTopic(s2);
      } catch (r2) {
        throw (t2 = e == null ? void 0 : e.response) != null && t2.id && this.cleanupAfterResponse(e), r2;
      }
      if (!Ea(i2)) {
        const { message: r2 } = ht$2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i2)}`);
        throw new Error(r2);
      }
    }), c(this, "isValidPing", async (e) => {
      if (!ma(e)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(s2);
      }
      const { topic: t2 } = e;
      await this.isValidSessionOrPairingTopic(t2);
    }), c(this, "isValidEmit", async (e) => {
      if (!ma(e)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(o2);
      }
      const { topic: t2, event: s2, chainId: i2 } = e;
      await this.isValidSessionTopic(t2);
      const { namespaces: r2 } = this.client.session.get(t2);
      if (!xa(r2, i2)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() chainId: ${i2}`);
        throw new Error(o2);
      }
      if (!va(s2)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(o2);
      }
      if (!Oa(r2, i2, s2.name)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(o2);
      }
    }), c(this, "isValidDisconnect", async (e) => {
      if (!ma(e)) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(s2);
      }
      const { topic: t2 } = e;
      await this.isValidSessionOrPairingTopic(t2);
    }), c(this, "isValidAuthenticate", (e) => {
      const { chains: t2, uri: s2, domain: i2, nonce: r2 } = e;
      if (!Array.isArray(t2) || t2.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!nt$1(s2, false)) throw new Error("uri is required parameter");
      if (!nt$1(i2, false)) throw new Error("domain is required parameter");
      if (!nt$1(r2, false)) throw new Error("nonce is required parameter");
      if ([...new Set(t2.map((a2) => Ne$1(a2).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: o2 } = Ne$1(t2[0]);
      if (o2 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c(this, "getVerifyContext", async (e) => {
      const { attestationId: t2, hash: s2, encryptedId: i2, metadata: r2, transportType: o2 } = e, a2 = { verified: { verifyUrl: r2.verifyUrl || ue$1, validation: "UNKNOWN", origin: r2.url || "" } };
      try {
        if (o2 === Q$1.link_mode) {
          const p2 = this.getAppLinkIfEnabled(r2, o2);
          return a2.verified.validation = p2 && new URL(p2).origin === new URL(r2.url).origin ? "VALID" : "INVALID", a2;
        }
        const l2 = await this.client.core.verify.resolve({ attestationId: t2, hash: s2, encryptedId: i2, verifyUrl: r2.verifyUrl });
        l2 && (a2.verified.origin = l2.origin, a2.verified.isScam = l2.isScam, a2.verified.validation = l2.origin === new URL(r2.url).origin ? "VALID" : "INVALID");
      } catch (l2) {
        this.client.logger.warn(l2);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a2)}`), a2;
    }), c(this, "validateSessionProps", (e, t2) => {
      Object.values(e).forEach((s2, i2) => {
        if (s2 == null) {
          const { message: r2 } = ht$2("MISSING_OR_INVALID", `${t2} must contain an existing value for each key. Received: ${s2} for key ${Object.keys(e)[i2]}`);
          throw new Error(r2);
        }
      });
    }), c(this, "getPendingAuthRequest", (e) => {
      const t2 = this.client.auth.requests.get(e);
      return typeof t2 == "object" ? t2 : void 0;
    }), c(this, "addToRecentlyDeleted", (e, t2) => {
      if (this.recentlyDeletedMap.set(e, t2), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s2 = 0;
        const i2 = this.recentlyDeletedLimit / 2;
        for (const r2 of this.recentlyDeletedMap.keys()) {
          if (s2++ >= i2) break;
          this.recentlyDeletedMap.delete(r2);
        }
      }
    }), c(this, "checkRecentlyDeleted", (e) => {
      const t2 = this.recentlyDeletedMap.get(e);
      if (t2) {
        const { message: s2 } = ht$2("MISSING_OR_INVALID", `Record was recently deleted - ${t2}: ${e}`);
        throw new Error(s2);
      }
    }), c(this, "isLinkModeEnabled", (e, t2) => {
      var s2, i2, r2, o2, a2, l2, p2, h3, u2;
      return !e || t2 !== Q$1.link_mode ? false : ((i2 = (s2 = this.client.metadata) == null ? void 0 : s2.redirect) == null ? void 0 : i2.linkMode) === true && ((o2 = (r2 = this.client.metadata) == null ? void 0 : r2.redirect) == null ? void 0 : o2.universal) !== void 0 && ((l2 = (a2 = this.client.metadata) == null ? void 0 : a2.redirect) == null ? void 0 : l2.universal) !== "" && ((p2 = e == null ? void 0 : e.redirect) == null ? void 0 : p2.universal) !== void 0 && ((h3 = e == null ? void 0 : e.redirect) == null ? void 0 : h3.universal) !== "" && ((u2 = e == null ? void 0 : e.redirect) == null ? void 0 : u2.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c(this, "getAppLinkIfEnabled", (e, t2) => {
      var s2;
      return this.isLinkModeEnabled(e, t2) ? (s2 = e == null ? void 0 : e.redirect) == null ? void 0 : s2.universal : void 0;
    }), c(this, "handleLinkModeMessage", ({ url: e }) => {
      if (!e || !e.includes("wc_ev") || !e.includes("topic")) return;
      const t2 = Ai$1(e, "topic") || "", s2 = decodeURIComponent(Ai$1(e, "wc_ev") || ""), i2 = this.client.session.keys.includes(t2);
      i2 && this.client.session.update(t2, { transportType: Q$1.link_mode }), this.client.core.dispatchEnvelope({ topic: t2, message: s2, sessionExists: i2 });
    }), c(this, "registerLinkModeListeners", async () => {
      var e;
      if (Ii$1() || pt$2() && (e = this.client.metadata.redirect) != null && e.linkMode) {
        const t2 = global == null ? void 0 : global.Linking;
        if (typeof t2 < "u") {
          t2.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s2 = await t2.getInitialURL();
          s2 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s2 });
          }, 50);
        }
      }
    }), c(this, "shouldSetTVF", (e, t2) => {
      if (!t2 || e !== "wc_sessionRequest") return false;
      const { request: s2 } = t2;
      return Object.keys(Ke$1).includes(s2.method);
    }), c(this, "getTVFParams", (e, t2, s2) => {
      var i2, r2;
      try {
        const o2 = t2.request.method, a2 = this.extractTxHashesFromResult(o2, s2);
        return b$1(v({ correlationId: e, rpcMethods: [o2], chainId: t2.chainId }, this.isValidContractData(t2.request.params) && { contractAddresses: [(r2 = (i2 = t2.request.params) == null ? void 0 : i2[0]) == null ? void 0 : r2.to] }), { txHashes: a2 });
      } catch (o2) {
        this.client.logger.warn("Error getting TVF params", o2);
      }
      return {};
    }), c(this, "isValidContractData", (e) => {
      var t2;
      if (!e) return false;
      try {
        const s2 = (e == null ? void 0 : e.data) || ((t2 = e == null ? void 0 : e[0]) == null ? void 0 : t2.data);
        if (!s2.startsWith("0x")) return false;
        const i2 = s2.slice(2);
        return /^[0-9a-fA-F]*$/.test(i2) ? i2.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c(this, "extractTxHashesFromResult", (e, t2) => {
      try {
        const s2 = Ke$1[e];
        if (typeof t2 == "string") return [t2];
        const i2 = t2[s2.key];
        if (se$2(i2)) return e === "solana_signAllTransactions" ? i2.map((r2) => Ji(r2)) : i2;
        if (typeof i2 == "string") return [i2];
      } catch (s2) {
        this.client.logger.warn("Error extracting tx hashes from result", s2);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const n = this.client.session.keys, e = this.client.core.relayer.messages.getWithoutAck(n);
      for (const [t2, s2] of Object.entries(e)) for (const i2 of s2) try {
        await this.onProviderMessageEvent({ topic: t2, message: i2, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${t2}, message: ${i2}`);
      }
    } catch (n) {
      this.client.logger.warn("processPendingMessageEvents failed", n);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: n } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(n);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(C$1.message, (n) => {
      this.onProviderMessageEvent(n);
    });
  }
  async onRelayMessage(n) {
    const { topic: e, message: t2, attestation: s2, transportType: i2 } = n, { publicKey: r2 } = this.client.auth.authKeys.keys.includes(ce$1) ? this.client.auth.authKeys.get(ce$1) : { publicKey: void 0 };
    try {
      const o2 = await this.client.core.crypto.decode(e, t2, { receiverPublicKey: r2, encoding: i2 === Q$1.link_mode ? xe$1 : qt$2 });
      isJsonRpcRequest(o2) ? (this.client.core.history.set(e, o2), await this.onRelayEventRequest({ topic: e, payload: o2, attestation: s2, transportType: i2, encryptedId: kc(t2) })) : isJsonRpcResponse(o2) ? (await this.client.core.history.resolve(o2), await this.onRelayEventResponse({ topic: e, payload: o2, transportType: i2 }), this.client.core.history.delete(e, o2.id)) : await this.onRelayEventUnknownPayload({ topic: e, payload: o2, transportType: i2 }), await this.client.core.relayer.messages.ack(e, t2);
    } catch (o2) {
      this.client.logger.error(o2);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(M$1.expired, async (n) => {
      const { topic: e, id: t2 } = bi$1(n.target);
      if (t2 && this.client.pendingRequest.keys.includes(t2)) return await this.deletePendingSessionRequest(t2, ht$2("EXPIRED"), true);
      if (t2 && this.client.auth.requests.keys.includes(t2)) return await this.deletePendingAuthRequest(t2, ht$2("EXPIRED"), true);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession({ topic: e, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e })) : t2 && (await this.deleteProposal(t2, true), this.client.events.emit("proposal_expire", { id: t2 }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(re$1.create, (n) => this.onPairingCreated(n)), this.client.core.pairing.events.on(re$1.delete, (n) => {
      this.addToRecentlyDeleted(n.topic, "pairing");
    });
  }
  isValidPairingTopic(n) {
    if (!nt$1(n, false)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `pairing topic should be a string: ${n}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(n)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n}`);
      throw new Error(e);
    }
    if (vi$1(this.client.core.pairing.pairings.get(n).expiry)) {
      const { message: e } = ht$2("EXPIRED", `pairing topic: ${n}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(n) {
    if (!nt$1(n, false)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `session topic should be a string: ${n}`);
      throw new Error(e);
    }
    if (this.checkRecentlyDeleted(n), !this.client.session.keys.includes(n)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `session topic doesn't exist: ${n}`);
      throw new Error(e);
    }
    if (vi$1(this.client.session.get(n).expiry)) {
      await this.deleteSession({ topic: n });
      const { message: e } = ht$2("EXPIRED", `session topic: ${n}`);
      throw new Error(e);
    }
    if (!this.client.core.crypto.keychain.has(n)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${n}`);
      throw await this.deleteSession({ topic: n }), new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(n) {
    if (this.checkRecentlyDeleted(n), this.client.session.keys.includes(n)) await this.isValidSessionTopic(n);
    else if (this.client.core.pairing.pairings.keys.includes(n)) this.isValidPairingTopic(n);
    else if (nt$1(n, false)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n}`);
      throw new Error(e);
    } else {
      const { message: e } = ht$2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(n) {
    if (!ya(n)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `proposal id should be a number: ${n}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(n)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `proposal id doesn't exist: ${n}`);
      throw new Error(e);
    }
    if (vi$1(this.client.proposal.get(n).expiryTimestamp)) {
      await this.deleteProposal(n);
      const { message: e } = ht$2("EXPIRED", `proposal id: ${n}`);
      throw new Error(e);
    }
  }
}
class Os extends zi {
  constructor(n, e) {
    super(n, e, pt$1, we$1), this.core = n, this.logger = e;
  }
}
let St$1 = class St extends zi {
  constructor(n, e) {
    super(n, e, ht$1, we$1), this.core = n, this.logger = e;
  }
};
class bs extends zi {
  constructor(n, e) {
    super(n, e, ut$1, we$1, (t2) => t2.id), this.core = n, this.logger = e;
  }
}
class As extends zi {
  constructor(n, e) {
    super(n, e, mt$1, ae$1, () => ce$1), this.core = n, this.logger = e;
  }
}
class xs extends zi {
  constructor(n, e) {
    super(n, e, _t$1, ae$1), this.core = n, this.logger = e;
  }
}
class Cs extends zi {
  constructor(n, e) {
    super(n, e, Et, ae$1, (t2) => t2.id), this.core = n, this.logger = e;
  }
}
var Vs = Object.defineProperty, Ds = (S3, n, e) => n in S3 ? Vs(S3, n, { enumerable: true, configurable: true, writable: true, value: e }) : S3[n] = e, Ge$1 = (S3, n, e) => Ds(S3, typeof n != "symbol" ? n + "" : n, e);
class Ls {
  constructor(n, e) {
    this.core = n, this.logger = e, Ge$1(this, "authKeys"), Ge$1(this, "pairingTopics"), Ge$1(this, "requests"), this.authKeys = new As(this.core, this.logger), this.pairingTopics = new xs(this.core, this.logger), this.requests = new Cs(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
var ks = Object.defineProperty, Ms = (S3, n, e) => n in S3 ? ks(S3, n, { enumerable: true, configurable: true, writable: true, value: e }) : S3[n] = e, E$1 = (S3, n, e) => Ms(S3, typeof n != "symbol" ? n + "" : n, e);
let Ee$1 = class Ee extends J$1 {
  constructor(n) {
    super(n), E$1(this, "protocol", De$1), E$1(this, "version", Le$1), E$1(this, "name", me$1.name), E$1(this, "metadata"), E$1(this, "core"), E$1(this, "logger"), E$1(this, "events", new events.EventEmitter()), E$1(this, "engine"), E$1(this, "session"), E$1(this, "proposal"), E$1(this, "pendingRequest"), E$1(this, "auth"), E$1(this, "signConfig"), E$1(this, "on", (t2, s2) => this.events.on(t2, s2)), E$1(this, "once", (t2, s2) => this.events.once(t2, s2)), E$1(this, "off", (t2, s2) => this.events.off(t2, s2)), E$1(this, "removeListener", (t2, s2) => this.events.removeListener(t2, s2)), E$1(this, "removeAllListeners", (t2) => this.events.removeAllListeners(t2)), E$1(this, "connect", async (t2) => {
      try {
        return await this.engine.connect(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "pair", async (t2) => {
      try {
        return await this.engine.pair(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "approve", async (t2) => {
      try {
        return await this.engine.approve(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "reject", async (t2) => {
      try {
        return await this.engine.reject(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "update", async (t2) => {
      try {
        return await this.engine.update(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "extend", async (t2) => {
      try {
        return await this.engine.extend(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "request", async (t2) => {
      try {
        return await this.engine.request(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "respond", async (t2) => {
      try {
        return await this.engine.respond(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "ping", async (t2) => {
      try {
        return await this.engine.ping(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "emit", async (t2) => {
      try {
        return await this.engine.emit(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "disconnect", async (t2) => {
      try {
        return await this.engine.disconnect(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "find", (t2) => {
      try {
        return this.engine.find(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t2) {
        throw this.logger.error(t2.message), t2;
      }
    }), E$1(this, "authenticate", async (t2, s2) => {
      try {
        return await this.engine.authenticate(t2, s2);
      } catch (i2) {
        throw this.logger.error(i2.message), i2;
      }
    }), E$1(this, "formatAuthMessage", (t2) => {
      try {
        return this.engine.formatAuthMessage(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "approveSessionAuthenticate", async (t2) => {
      try {
        return await this.engine.approveSessionAuthenticate(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), E$1(this, "rejectSessionAuthenticate", async (t2) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t2);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), this.name = (n == null ? void 0 : n.name) || me$1.name, this.metadata = oi$1(n == null ? void 0 : n.metadata), this.signConfig = n == null ? void 0 : n.signConfig;
    const e = typeof (n == null ? void 0 : n.logger) < "u" && typeof (n == null ? void 0 : n.logger) != "string" ? n.logger : Ot$2(k$3({ level: (n == null ? void 0 : n.logger) || me$1.logger }));
    this.core = (n == null ? void 0 : n.core) || new Xo(n), this.logger = E$3(e, this.name), this.session = new St$1(this.core, this.logger), this.proposal = new Os(this.core, this.logger), this.pendingRequest = new bs(this.core, this.logger), this.engine = new Ns(this), this.auth = new Ls(this.core, this.logger);
  }
  static async init(n) {
    const e = new Ee(n);
    return await e.initialize(), e;
  }
  get context() {
    return y$4(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, cjs.toMiliseconds(cjs.ONE_SECOND));
    } catch (n) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n.message), n;
    }
  }
};
const et = "error", St2 = "wss://relay.walletconnect.org", Dt = "wc", qt = "universal_provider", U = `${Dt}@2:${qt}:`, st = "https://rpc.walletconnect.org/v1/", I2 = "generic", jt = `${st}bundler`, u = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function Rt() {
}
function k(s2) {
  return s2 == null || typeof s2 != "object" && typeof s2 != "function";
}
function W(s2) {
  return ArrayBuffer.isView(s2) && !(s2 instanceof DataView);
}
function _t(s2) {
  if (k(s2)) return s2;
  if (Array.isArray(s2) || W(s2) || s2 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s2 instanceof SharedArrayBuffer) return s2.slice(0);
  const t2 = Object.getPrototypeOf(s2), e = t2.constructor;
  if (s2 instanceof Date || s2 instanceof Map || s2 instanceof Set) return new e(s2);
  if (s2 instanceof RegExp) {
    const i2 = new e(s2);
    return i2.lastIndex = s2.lastIndex, i2;
  }
  if (s2 instanceof DataView) return new e(s2.buffer.slice(0));
  if (s2 instanceof Error) {
    const i2 = new e(s2.message);
    return i2.stack = s2.stack, i2.name = s2.name, i2.cause = s2.cause, i2;
  }
  if (typeof File < "u" && s2 instanceof File) return new e([s2], s2.name, { type: s2.type, lastModified: s2.lastModified });
  if (typeof s2 == "object") {
    const i2 = Object.create(t2);
    return Object.assign(i2, s2);
  }
  return s2;
}
function it(s2) {
  return typeof s2 == "object" && s2 !== null;
}
function rt(s2) {
  return Object.getOwnPropertySymbols(s2).filter((t2) => Object.prototype.propertyIsEnumerable.call(s2, t2));
}
function nt(s2) {
  return s2 == null ? s2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s2);
}
const Ut = "[object RegExp]", at = "[object String]", ct = "[object Number]", ot = "[object Boolean]", ht = "[object Arguments]", Ft = "[object Symbol]", Lt = "[object Date]", Mt = "[object Map]", xt = "[object Set]", Bt = "[object Array]", Gt = "[object ArrayBuffer]", Jt = "[object Object]", zt = "[object DataView]", kt = "[object Uint8Array]", Wt = "[object Uint8ClampedArray]", Kt = "[object Uint16Array]", Vt = "[object Uint32Array]", Xt = "[object Int8Array]", Yt = "[object Int16Array]", Qt = "[object Int32Array]", Zt = "[object Float32Array]", Tt = "[object Float64Array]";
function te(s2, t2) {
  return $(s2, void 0, s2, /* @__PURE__ */ new Map(), t2);
}
function $(s2, t2, e, i2 = /* @__PURE__ */ new Map(), n = void 0) {
  const a2 = n == null ? void 0 : n(s2, t2, e, i2);
  if (a2 != null) return a2;
  if (k(s2)) return s2;
  if (i2.has(s2)) return i2.get(s2);
  if (Array.isArray(s2)) {
    const r2 = new Array(s2.length);
    i2.set(s2, r2);
    for (let c2 = 0; c2 < s2.length; c2++) r2[c2] = $(s2[c2], c2, e, i2, n);
    return Object.hasOwn(s2, "index") && (r2.index = s2.index), Object.hasOwn(s2, "input") && (r2.input = s2.input), r2;
  }
  if (s2 instanceof Date) return new Date(s2.getTime());
  if (s2 instanceof RegExp) {
    const r2 = new RegExp(s2.source, s2.flags);
    return r2.lastIndex = s2.lastIndex, r2;
  }
  if (s2 instanceof Map) {
    const r2 = /* @__PURE__ */ new Map();
    i2.set(s2, r2);
    for (const [c2, o2] of s2) r2.set(c2, $(o2, c2, e, i2, n));
    return r2;
  }
  if (s2 instanceof Set) {
    const r2 = /* @__PURE__ */ new Set();
    i2.set(s2, r2);
    for (const c2 of s2) r2.add($(c2, void 0, e, i2, n));
    return r2;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(s2)) return s2.subarray();
  if (W(s2)) {
    const r2 = new (Object.getPrototypeOf(s2)).constructor(s2.length);
    i2.set(s2, r2);
    for (let c2 = 0; c2 < s2.length; c2++) r2[c2] = $(s2[c2], c2, e, i2, n);
    return r2;
  }
  if (s2 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s2 instanceof SharedArrayBuffer) return s2.slice(0);
  if (s2 instanceof DataView) {
    const r2 = new DataView(s2.buffer.slice(0), s2.byteOffset, s2.byteLength);
    return i2.set(s2, r2), y2(r2, s2, e, i2, n), r2;
  }
  if (typeof File < "u" && s2 instanceof File) {
    const r2 = new File([s2], s2.name, { type: s2.type });
    return i2.set(s2, r2), y2(r2, s2, e, i2, n), r2;
  }
  if (s2 instanceof Blob) {
    const r2 = new Blob([s2], { type: s2.type });
    return i2.set(s2, r2), y2(r2, s2, e, i2, n), r2;
  }
  if (s2 instanceof Error) {
    const r2 = new s2.constructor();
    return i2.set(s2, r2), r2.message = s2.message, r2.name = s2.name, r2.stack = s2.stack, r2.cause = s2.cause, y2(r2, s2, e, i2, n), r2;
  }
  if (typeof s2 == "object" && ee(s2)) {
    const r2 = Object.create(Object.getPrototypeOf(s2));
    return i2.set(s2, r2), y2(r2, s2, e, i2, n), r2;
  }
  return s2;
}
function y2(s2, t2, e = s2, i2, n) {
  const a2 = [...Object.keys(t2), ...rt(t2)];
  for (let r2 = 0; r2 < a2.length; r2++) {
    const c2 = a2[r2], o2 = Object.getOwnPropertyDescriptor(s2, c2);
    (o2 == null || o2.writable) && (s2[c2] = $(t2[c2], c2, e, i2, n));
  }
}
function ee(s2) {
  switch (nt(s2)) {
    case ht:
    case Bt:
    case Gt:
    case zt:
    case ot:
    case Lt:
    case Zt:
    case Tt:
    case Xt:
    case Yt:
    case Qt:
    case Mt:
    case ct:
    case Jt:
    case Ut:
    case xt:
    case at:
    case Ft:
    case kt:
    case Wt:
    case Kt:
    case Vt:
      return true;
    default:
      return false;
  }
}
function se(s2, t2) {
  return te(s2, (e, i2, n, a2) => {
    if (typeof s2 == "object") switch (Object.prototype.toString.call(s2)) {
      case ct:
      case at:
      case ot: {
        const c2 = new s2.constructor(s2 == null ? void 0 : s2.valueOf());
        return y2(c2, s2), c2;
      }
      case ht: {
        const c2 = {};
        return y2(c2, s2), c2.length = s2.length, c2[Symbol.iterator] = s2[Symbol.iterator], c2;
      }
      default:
        return;
    }
  });
}
function pt(s2) {
  return se(s2);
}
function dt(s2) {
  return s2 !== null && typeof s2 == "object" && nt(s2) === "[object Arguments]";
}
function ie(s2) {
  return W(s2);
}
function re(s2) {
  var _a;
  if (typeof s2 != "object" || s2 == null) return false;
  if (Object.getPrototypeOf(s2) === null) return true;
  if (Object.prototype.toString.call(s2) !== "[object Object]") {
    const e = s2[Symbol.toStringTag];
    return e == null || !((_a = Object.getOwnPropertyDescriptor(s2, Symbol.toStringTag)) == null ? void 0 : _a.writable) ? false : s2.toString() === `[object ${e}]`;
  }
  let t2 = s2;
  for (; Object.getPrototypeOf(t2) !== null; ) t2 = Object.getPrototypeOf(t2);
  return Object.getPrototypeOf(s2) === t2;
}
function ne(s2, ...t2) {
  const e = t2.slice(0, -1), i2 = t2[t2.length - 1];
  let n = s2;
  for (let a2 = 0; a2 < e.length; a2++) {
    const r2 = e[a2];
    n = F(n, r2, i2, /* @__PURE__ */ new Map());
  }
  return n;
}
function F(s2, t2, e, i2) {
  if (k(s2) && (s2 = Object(s2)), t2 == null || typeof t2 != "object") return s2;
  if (i2.has(t2)) return _t(i2.get(t2));
  if (i2.set(t2, s2), Array.isArray(t2)) {
    t2 = t2.slice();
    for (let a2 = 0; a2 < t2.length; a2++) t2[a2] = t2[a2] ?? void 0;
  }
  const n = [...Object.keys(t2), ...rt(t2)];
  for (let a2 = 0; a2 < n.length; a2++) {
    const r2 = n[a2];
    let c2 = t2[r2], o2 = s2[r2];
    if (dt(c2) && (c2 = { ...c2 }), dt(o2) && (o2 = { ...o2 }), typeof Buffer < "u" && Buffer.isBuffer(c2) && (c2 = pt(c2)), Array.isArray(c2)) if (typeof o2 == "object" && o2 != null) {
      const w2 = [], v2 = Reflect.ownKeys(o2);
      for (let P3 = 0; P3 < v2.length; P3++) {
        const p2 = v2[P3];
        w2[p2] = o2[p2];
      }
      o2 = w2;
    } else o2 = [];
    const m2 = e(o2, c2, r2, s2, t2, i2);
    m2 != null ? s2[r2] = m2 : Array.isArray(c2) || it(o2) && it(c2) ? s2[r2] = F(o2, c2, e, i2) : o2 == null && re(c2) ? s2[r2] = F({}, c2, e, i2) : o2 == null && ie(c2) ? s2[r2] = pt(c2) : (o2 === void 0 || c2 !== void 0) && (s2[r2] = c2);
  }
  return s2;
}
function ae(s2, ...t2) {
  return ne(s2, ...t2, Rt);
}
var ce = Object.defineProperty, oe = Object.defineProperties, he = Object.getOwnPropertyDescriptors, ut = Object.getOwnPropertySymbols, pe = Object.prototype.hasOwnProperty, de = Object.prototype.propertyIsEnumerable, lt = (s2, t2, e) => t2 in s2 ? ce(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, L = (s2, t2) => {
  for (var e in t2 || (t2 = {})) pe.call(t2, e) && lt(s2, e, t2[e]);
  if (ut) for (var e of ut(t2)) de.call(t2, e) && lt(s2, e, t2[e]);
  return s2;
}, ue = (s2, t2) => oe(s2, he(t2));
function d2(s2, t2, e) {
  var i2;
  const n = Ne$1(s2);
  return ((i2 = t2.rpcMap) == null ? void 0 : i2[n.reference]) || `${st}?chainId=${n.namespace}:${n.reference}&projectId=${e}`;
}
function b(s2) {
  return s2.includes(":") ? s2.split(":")[1] : s2;
}
function ft(s2) {
  return s2.map((t2) => `${t2.split(":")[0]}:${t2.split(":")[1]}`);
}
function le(s2, t2) {
  const e = Object.keys(t2.namespaces).filter((n) => n.includes(s2));
  if (!e.length) return [];
  const i2 = [];
  return e.forEach((n) => {
    const a2 = t2.namespaces[n].accounts;
    i2.push(...a2);
  }), i2;
}
function M2(s2 = {}, t2 = {}) {
  const e = mt(s2), i2 = mt(t2);
  return ae(e, i2);
}
function mt(s2) {
  var t2, e, i2, n, a2;
  const r2 = {};
  if (!Oe$1(s2)) return r2;
  for (const [c2, o2] of Object.entries(s2)) {
    const m2 = yn$1(c2) ? [c2] : o2.chains, w2 = o2.methods || [], v2 = o2.events || [], P3 = o2.rpcMap || {}, p2 = yo$1(c2);
    r2[p2] = ue(L(L({}, r2[p2]), o2), { chains: ot$1(m2, (t2 = r2[p2]) == null ? void 0 : t2.chains), methods: ot$1(w2, (e = r2[p2]) == null ? void 0 : e.methods), events: ot$1(v2, (i2 = r2[p2]) == null ? void 0 : i2.events) }), (Oe$1(P3) || Oe$1(((n = r2[p2]) == null ? void 0 : n.rpcMap) || {})) && (r2[p2].rpcMap = L(L({}, P3), (a2 = r2[p2]) == null ? void 0 : a2.rpcMap));
  }
  return r2;
}
function vt(s2) {
  return s2.includes(":") ? s2.split(":")[2] : s2;
}
function gt(s2) {
  const t2 = {};
  for (const [e, i2] of Object.entries(s2)) {
    const n = i2.methods || [], a2 = i2.events || [], r2 = i2.accounts || [], c2 = yn$1(e) ? [e] : i2.chains ? i2.chains : ft(i2.accounts);
    t2[e] = { chains: c2, methods: n, events: a2, accounts: r2 };
  }
  return t2;
}
function K(s2) {
  return typeof s2 == "number" ? s2 : s2.includes("0x") ? parseInt(s2, 16) : (s2 = s2.includes(":") ? s2.split(":")[1] : s2, isNaN(Number(s2)) ? s2 : Number(s2));
}
const Pt = {}, h2 = (s2) => Pt[s2], V2 = (s2, t2) => {
  Pt[s2] = t2;
};
var fe = Object.defineProperty, me = (s2, t2, e) => t2 in s2 ? fe(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, O2 = (s2, t2, e) => me(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class ve {
  constructor(t2) {
    O2(this, "name", "polkadot"), O2(this, "client"), O2(this, "httpProviders"), O2(this, "events"), O2(this, "namespace"), O2(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t2}`);
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n = b(e);
      t2[n] = this.createHttpProvider(n, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var ge = Object.defineProperty, Pe = Object.defineProperties, we = Object.getOwnPropertyDescriptors, wt = Object.getOwnPropertySymbols, ye = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable, X = (s2, t2, e) => t2 in s2 ? ge(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, yt = (s2, t2) => {
  for (var e in t2 || (t2 = {})) ye.call(t2, e) && X(s2, e, t2[e]);
  if (wt) for (var e of wt(t2)) be.call(t2, e) && X(s2, e, t2[e]);
  return s2;
}, bt = (s2, t2) => Pe(s2, we(t2)), A = (s2, t2, e) => X(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Ie {
  constructor(t2) {
    A(this, "name", "eip155"), A(this, "client"), A(this, "chainId"), A(this, "namespace"), A(this, "httpProviders"), A(this, "events"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(t2) {
    switch (t2.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(t2);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(t2);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(t2);
    }
    return this.namespace.methods.includes(t2.request.method) ? await this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(parseInt(t2), e), this.chainId = parseInt(t2), this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t2}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(`${this.name}:${t2}`, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n = parseInt(b(e));
      t2[n] = this.createHttpProvider(n, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const t2 = this.chainId, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  async handleSwitchChain(t2) {
    var e, i2;
    let n = t2.request.params ? (e = t2.request.params[0]) == null ? void 0 : e.chainId : "0x0";
    n = n.startsWith("0x") ? n : `0x${n}`;
    const a2 = parseInt(n, 16);
    if (this.isChainApproved(a2)) this.setDefaultChain(`${a2}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: t2.topic, request: { method: t2.request.method, params: [{ chainId: n }] }, chainId: (i2 = this.namespace.chains) == null ? void 0 : i2[0] }), this.setDefaultChain(`${a2}`);
    else throw new Error(`Failed to switch to chain 'eip155:${a2}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(t2) {
    return this.namespace.chains.includes(`${this.name}:${t2}`);
  }
  async getCapabilities(t2) {
    var e, i2, n, a2, r2;
    const c2 = (i2 = (e = t2.request) == null ? void 0 : e.params) == null ? void 0 : i2[0], o2 = ((a2 = (n = t2.request) == null ? void 0 : n.params) == null ? void 0 : a2[1]) || [], m2 = `${c2}${o2.join(",")}`;
    if (!c2) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const w2 = this.client.session.get(t2.topic), v2 = ((r2 = w2 == null ? void 0 : w2.sessionProperties) == null ? void 0 : r2.capabilities) || {};
    if (v2 != null && v2[m2]) return v2 == null ? void 0 : v2[m2];
    const P3 = await this.client.request(t2);
    try {
      await this.client.session.update(t2.topic, { sessionProperties: bt(yt({}, w2.sessionProperties || {}), { capabilities: bt(yt({}, v2 || {}), { [m2]: P3 }) }) });
    } catch (p2) {
      console.warn("Failed to update session with capabilities", p2);
    }
    return P3;
  }
  async getCallStatus(t2) {
    var e, i2;
    const n = this.client.session.get(t2.topic), a2 = (e = n.sessionProperties) == null ? void 0 : e.bundler_name;
    if (a2) {
      const c2 = this.getBundlerUrl(t2.chainId, a2);
      try {
        return await this.getUserOperationReceipt(c2, t2);
      } catch (o2) {
        console.warn("Failed to fetch call status from bundler", o2, c2);
      }
    }
    const r2 = (i2 = n.sessionProperties) == null ? void 0 : i2.bundler_url;
    if (r2) try {
      return await this.getUserOperationReceipt(r2, t2);
    } catch (c2) {
      console.warn("Failed to fetch call status from custom bundler", c2, r2);
    }
    if (this.namespace.methods.includes(t2.request.method)) return await this.client.request(t2);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(t2, e) {
    var i2;
    const n = new URL(t2), a2 = await fetch(n, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(i2 = e.request.params) == null ? void 0 : i2[0]])) });
    if (!a2.ok) throw new Error(`Failed to fetch user operation receipt - ${a2.status}`);
    return await a2.json();
  }
  getBundlerUrl(t2, e) {
    return `${jt}?projectId=${this.client.core.projectId}&chainId=${t2}&bundler=${e}`;
  }
}
var $e = Object.defineProperty, Oe = (s2, t2, e) => t2 in s2 ? $e(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, C = (s2, t2, e) => Oe(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Ae {
  constructor(t2) {
    C(this, "name", "solana"), C(this, "client"), C(this, "httpProviders"), C(this, "events"), C(this, "namespace"), C(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t2}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n = b(e);
      t2[n] = this.createHttpProvider(n, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var Ce = Object.defineProperty, He = (s2, t2, e) => t2 in s2 ? Ce(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, H = (s2, t2, e) => He(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Ee2 {
  constructor(t2) {
    H(this, "name", "cosmos"), H(this, "client"), H(this, "httpProviders"), H(this, "events"), H(this, "namespace"), H(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n = b(e);
      t2[n] = this.createHttpProvider(n, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var Ne = Object.defineProperty, Se = (s2, t2, e) => t2 in s2 ? Ne(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, E = (s2, t2, e) => Se(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class De {
  constructor(t2) {
    E(this, "name", "algorand"), E(this, "client"), E(this, "httpProviders"), E(this, "events"), E(this, "namespace"), E(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    if (!this.httpProviders[t2]) {
      const i2 = e || d2(`${this.name}:${t2}`, this.namespace, this.client.core.projectId);
      if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
      this.setHttpProvider(t2, i2);
    }
    this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      t2[e] = this.createHttpProvider(e, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    return typeof i2 > "u" ? void 0 : new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var qe = Object.defineProperty, je = (s2, t2, e) => t2 in s2 ? qe(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, N = (s2, t2, e) => je(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Re {
  constructor(t2) {
    N(this, "name", "cip34"), N(this, "client"), N(this, "httpProviders"), N(this, "events"), N(this, "namespace"), N(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      const i2 = this.getCardanoRPCUrl(e), n = b(e);
      t2[n] = this.createHttpProvider(n, i2);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  getCardanoRPCUrl(t2) {
    const e = this.namespace.rpcMap;
    if (e) return e[t2];
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || this.getCardanoRPCUrl(t2);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var _e = Object.defineProperty, Ue = (s2, t2, e) => t2 in s2 ? _e(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, S2 = (s2, t2, e) => Ue(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Fe {
  constructor(t2) {
    S2(this, "name", "elrond"), S2(this, "client"), S2(this, "httpProviders"), S2(this, "events"), S2(this, "namespace"), S2(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t2}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n = b(e);
      t2[n] = this.createHttpProvider(n, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var Le = Object.defineProperty, Me = (s2, t2, e) => t2 in s2 ? Le(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, D = (s2, t2, e) => Me(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class xe {
  constructor(t2) {
    D(this, "name", "multiversx"), D(this, "client"), D(this, "httpProviders"), D(this, "events"), D(this, "namespace"), D(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t2}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n = b(e);
      t2[n] = this.createHttpProvider(n, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var Be = Object.defineProperty, Ge = (s2, t2, e) => t2 in s2 ? Be(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, q = (s2, t2, e) => Ge(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Je {
  constructor(t2) {
    q(this, "name", "near"), q(this, "client"), q(this, "httpProviders"), q(this, "events"), q(this, "namespace"), q(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    if (this.chainId = t2, !this.httpProviders[t2]) {
      const i2 = e || d2(`${this.name}:${t2}`, this.namespace);
      if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
      this.setHttpProvider(t2, i2);
    }
    this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      t2[e] = this.createHttpProvider(e, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace);
    return typeof i2 > "u" ? void 0 : new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var ze = Object.defineProperty, ke2 = (s2, t2, e) => t2 in s2 ? ze(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, j = (s2, t2, e) => ke2(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class We {
  constructor(t2) {
    j(this, "name", "tezos"), j(this, "client"), j(this, "httpProviders"), j(this, "events"), j(this, "namespace"), j(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace = Object.assign(this.namespace, t2);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider().request(t2.request);
  }
  setDefaultChain(t2, e) {
    if (this.chainId = t2, !this.httpProviders[t2]) {
      const i2 = e || d2(`${this.name}:${t2}`, this.namespace);
      if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
      this.setHttpProvider(t2, i2);
    }
    this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t2 = {};
    return this.namespace.chains.forEach((e) => {
      t2[e] = this.createHttpProvider(e);
    }), t2;
  }
  getHttpProvider() {
    const t2 = `${this.name}:${this.chainId}`, e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace);
    return typeof i2 > "u" ? void 0 : new o(new f$3(i2));
  }
}
var Ke = Object.defineProperty, Ve = (s2, t2, e) => t2 in s2 ? Ke(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, R2 = (s2, t2, e) => Ve(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class Xe {
  constructor(t2) {
    R2(this, "name", I2), R2(this, "client"), R2(this, "httpProviders"), R2(this, "events"), R2(this, "namespace"), R2(this, "chainId"), this.namespace = t2.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t2) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(t2.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(t2.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(t2.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(t2.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t2) {
    return this.namespace.methods.includes(t2.request.method) ? this.client.request(t2) : this.getHttpProvider(t2.chainId).request(t2.request);
  }
  setDefaultChain(t2, e) {
    this.httpProviders[t2] || this.setHttpProvider(t2, e), this.chainId = t2, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t2}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t2 = this.namespace.chains[0];
    if (!t2) throw new Error("ChainId not found");
    return t2.split(":")[1];
  }
  getAccounts() {
    const t2 = this.namespace.accounts;
    return t2 ? [...new Set(t2.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var t2, e;
    const i2 = {};
    return (e = (t2 = this.namespace) == null ? void 0 : t2.accounts) == null || e.forEach((n) => {
      const a2 = Ne$1(n);
      i2[`${a2.namespace}:${a2.reference}`] = this.createHttpProvider(n);
    }), i2;
  }
  getHttpProvider(t2) {
    const e = this.httpProviders[t2];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t2} not found`);
    return e;
  }
  setHttpProvider(t2, e) {
    const i2 = this.createHttpProvider(t2, e);
    i2 && (this.httpProviders[t2] = i2);
  }
  createHttpProvider(t2, e) {
    const i2 = e || d2(t2, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t2}`);
    return new o(new f$3(i2, h2("disableProviderPing")));
  }
}
var Ye = Object.defineProperty, Qe = Object.defineProperties, Ze = Object.getOwnPropertyDescriptors, It = Object.getOwnPropertySymbols, Te2 = Object.prototype.hasOwnProperty, ts = Object.prototype.propertyIsEnumerable, Y = (s2, t2, e) => t2 in s2 ? Ye(s2, t2, { enumerable: true, configurable: true, writable: true, value: e }) : s2[t2] = e, x = (s2, t2) => {
  for (var e in t2 || (t2 = {})) Te2.call(t2, e) && Y(s2, e, t2[e]);
  if (It) for (var e of It(t2)) ts.call(t2, e) && Y(s2, e, t2[e]);
  return s2;
}, Q = (s2, t2) => Qe(s2, Ze(t2)), l = (s2, t2, e) => Y(s2, typeof t2 != "symbol" ? t2 + "" : t2, e);
class B {
  constructor(t2) {
    l(this, "client"), l(this, "namespaces"), l(this, "optionalNamespaces"), l(this, "sessionProperties"), l(this, "scopedProperties"), l(this, "events", new Nt$2()), l(this, "rpcProviders", {}), l(this, "session"), l(this, "providerOpts"), l(this, "logger"), l(this, "uri"), l(this, "disableProviderPing", false), this.providerOpts = t2, this.logger = typeof (t2 == null ? void 0 : t2.logger) < "u" && typeof (t2 == null ? void 0 : t2.logger) != "string" ? t2.logger : Ot$2(k$3({ level: (t2 == null ? void 0 : t2.logger) || et })), this.disableProviderPing = (t2 == null ? void 0 : t2.disableProviderPing) || false;
  }
  static async init(t2) {
    const e = new B(t2);
    return await e.initialize(), e;
  }
  async request(t2, e, i2) {
    const [n, a2] = this.validateChain(e);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(n).request({ request: x({}, t2), chainId: `${n}:${a2}`, topic: this.session.topic, expiry: i2 });
  }
  sendAsync(t2, e, i2, n) {
    const a2 = (/* @__PURE__ */ new Date()).getTime();
    this.request(t2, i2, n).then((r2) => e(null, formatJsonRpcResult(a2, r2))).catch((r2) => e(r2, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var t2;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (t2 = this.session) == null ? void 0 : t2.topic, reason: Nt$1("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(t2) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(t2), await this.cleanupPendingPairings(), !t2.skipPairing) return await this.pair(t2.pairingTopic);
  }
  async authenticate(t2, e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(t2), await this.cleanupPendingPairings();
    const { uri: i2, response: n } = await this.client.authenticate(t2, e);
    i2 && (this.uri = i2, this.events.emit("display_uri", i2));
    const a2 = await n();
    if (this.session = a2.session, this.session) {
      const r2 = gt(this.session.namespaces);
      this.namespaces = M2(this.namespaces, r2), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return a2;
  }
  on(t2, e) {
    this.events.on(t2, e);
  }
  once(t2, e) {
    this.events.once(t2, e);
  }
  removeListener(t2, e) {
    this.events.removeListener(t2, e);
  }
  off(t2, e) {
    this.events.off(t2, e);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(t2) {
    const { uri: e, approval: i2 } = await this.client.connect({ pairingTopic: t2, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    e && (this.uri = e, this.events.emit("display_uri", e));
    const n = await i2();
    this.session = n;
    const a2 = gt(n.namespaces);
    return this.namespaces = M2(this.namespaces, a2), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(t2, e) {
    try {
      if (!this.session) return;
      const [i2, n] = this.validateChain(t2), a2 = this.getProvider(i2);
      a2.name === I2 ? a2.setDefaultChain(`${i2}:${n}`, e) : a2.setDefaultChain(n, e);
    } catch (i2) {
      if (!/Please call connect/.test(i2.message)) throw i2;
    }
  }
  async cleanupPendingPairings(t2 = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const e = this.client.pairing.getAll();
    if (se$2(e)) {
      for (const i2 of e) t2.deletePairings ? this.client.core.expirer.set(i2.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i2.topic);
      this.logger.info(`Inactive pairings cleared: ${e.length}`);
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    var t2, e;
    if (this.client = this.providerOpts.client || await Ee$1.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || et, relayUrl: this.providerOpts.relayUrl || St2, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (i2) {
      throw this.logger.error("Failed to get session", i2), new Error(`The provided session: ${(e = (t2 = this.providerOpts) == null ? void 0 : t2.session) == null ? void 0 : e.topic} doesn't exist in the Sign client`);
    }
    else {
      const i2 = this.client.session.getAll();
      this.session = i2[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const t2 = [...new Set(Object.keys(this.session.namespaces).map((e) => yo$1(e)))];
    V2("client", this.client), V2("events", this.events), V2("disableProviderPing", this.disableProviderPing), t2.forEach((e) => {
      if (!this.session) return;
      const i2 = le(e, this.session), n = ft(i2), a2 = M2(this.namespaces, this.optionalNamespaces), r2 = Q(x({}, a2[e]), { accounts: i2, chains: n });
      switch (e) {
        case "eip155":
          this.rpcProviders[e] = new Ie({ namespace: r2 });
          break;
        case "algorand":
          this.rpcProviders[e] = new De({ namespace: r2 });
          break;
        case "solana":
          this.rpcProviders[e] = new Ae({ namespace: r2 });
          break;
        case "cosmos":
          this.rpcProviders[e] = new Ee2({ namespace: r2 });
          break;
        case "polkadot":
          this.rpcProviders[e] = new ve({ namespace: r2 });
          break;
        case "cip34":
          this.rpcProviders[e] = new Re({ namespace: r2 });
          break;
        case "elrond":
          this.rpcProviders[e] = new Fe({ namespace: r2 });
          break;
        case "multiversx":
          this.rpcProviders[e] = new xe({ namespace: r2 });
          break;
        case "near":
          this.rpcProviders[e] = new Je({ namespace: r2 });
          break;
        case "tezos":
          this.rpcProviders[e] = new We({ namespace: r2 });
          break;
        default:
          this.rpcProviders[I2] ? this.rpcProviders[I2].updateNamespace(r2) : this.rpcProviders[I2] = new Xe({ namespace: r2 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (t2) => {
      var e;
      const { topic: i2 } = t2;
      i2 === ((e = this.session) == null ? void 0 : e.topic) && this.events.emit("session_ping", t2);
    }), this.client.on("session_event", (t2) => {
      var e;
      const { params: i2, topic: n } = t2;
      if (n !== ((e = this.session) == null ? void 0 : e.topic)) return;
      const { event: a2 } = i2;
      if (a2.name === "accountsChanged") {
        const r2 = a2.data;
        r2 && se$2(r2) && this.events.emit("accountsChanged", r2.map(vt));
      } else if (a2.name === "chainChanged") {
        const r2 = i2.chainId, c2 = i2.event.data, o2 = yo$1(r2), m2 = K(r2) !== K(c2) ? `${o2}:${K(c2)}` : r2;
        this.onChainChanged(m2);
      } else this.events.emit(a2.name, a2.data);
      this.events.emit("session_event", t2);
    }), this.client.on("session_update", ({ topic: t2, params: e }) => {
      var i2, n;
      if (t2 !== ((i2 = this.session) == null ? void 0 : i2.topic)) return;
      const { namespaces: a2 } = e, r2 = (n = this.client) == null ? void 0 : n.session.get(t2);
      this.session = Q(x({}, r2), { namespaces: a2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: t2, params: e });
    }), this.client.on("session_delete", async (t2) => {
      var e;
      t2.topic === ((e = this.session) == null ? void 0 : e.topic) && (await this.cleanup(), this.events.emit("session_delete", t2), this.events.emit("disconnect", Q(x({}, Nt$1("USER_DISCONNECTED")), { data: t2.topic })));
    }), this.on(u.DEFAULT_CHAIN_CHANGED, (t2) => {
      this.onChainChanged(t2, true);
    });
  }
  getProvider(t2) {
    return this.rpcProviders[t2] || this.rpcProviders[I2];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((t2) => {
      var e;
      this.getProvider(t2).updateNamespace((e = this.session) == null ? void 0 : e.namespaces[t2]);
    });
  }
  setNamespaces(t2) {
    const { namespaces: e = {}, optionalNamespaces: i2 = {}, sessionProperties: n, scopedProperties: a2 } = t2;
    this.optionalNamespaces = M2(e, i2), this.sessionProperties = n, this.scopedProperties = a2;
  }
  validateChain(t2) {
    const [e, i2] = (t2 == null ? void 0 : t2.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [e, i2];
    if (e && !Object.keys(this.namespaces || {}).map((r2) => yo$1(r2)).includes(e)) throw new Error(`Namespace '${e}' is not configured. Please call connect() first with namespace config.`);
    if (e && i2) return [e, i2];
    const n = yo$1(Object.keys(this.namespaces)[0]), a2 = this.rpcProviders[n].getDefaultChain();
    return [n, a2];
  }
  async requestAccounts() {
    const [t2] = this.validateChain();
    return await this.getProvider(t2).requestAccounts();
  }
  async onChainChanged(t2, e = false) {
    if (!this.namespaces) return;
    const [i2, n] = this.validateChain(t2);
    if (!n) return;
    this.updateNamespaceChain(i2, n), this.events.emit("chainChanged", n);
    const a2 = this.getProvider(i2).getDefaultChain();
    e || this.getProvider(i2).setDefaultChain(n), this.emitAccountsChangedOnChainChange({ namespace: i2, previousChainId: a2, newChainId: t2 }), await this.persist("namespaces", this.namespaces);
  }
  emitAccountsChangedOnChainChange({ namespace: t2, previousChainId: e, newChainId: i2 }) {
    var n, a2;
    try {
      if (e === i2) return;
      const r2 = (a2 = (n = this.session) == null ? void 0 : n.namespaces[t2]) == null ? void 0 : a2.accounts;
      if (!r2) return;
      const c2 = r2.filter((o2) => o2.includes(`${i2}:`)).map(vt);
      if (!se$2(c2)) return;
      this.events.emit("accountsChanged", c2);
    } catch (r2) {
      this.logger.warn("Failed to emit accountsChanged on chain change", r2);
    }
  }
  updateNamespaceChain(t2, e) {
    if (!this.namespaces) return;
    const i2 = this.namespaces[t2] ? t2 : `${t2}:${e}`, n = { chains: [], methods: [], events: [], defaultChain: e };
    this.namespaces[i2] ? this.namespaces[i2] && (this.namespaces[i2].defaultChain = e) : this.namespaces[i2] = n;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: true }), await this.cleanupStorage();
  }
  async persist(t2, e) {
    var i2;
    const n = ((i2 = this.session) == null ? void 0 : i2.topic) || "";
    await this.client.core.storage.setItem(`${U}/${t2}${n}`, e);
  }
  async getFromStore(t2) {
    var e;
    const i2 = ((e = this.session) == null ? void 0 : e.topic) || "";
    return await this.client.core.storage.getItem(`${U}/${t2}${i2}`);
  }
  async deleteFromStore(t2) {
    var e;
    const i2 = ((e = this.session) == null ? void 0 : e.topic) || "";
    await this.client.core.storage.removeItem(`${U}/${t2}${i2}`);
  }
  async cleanupStorage() {
    var t2;
    try {
      if (((t2 = this.client) == null ? void 0 : t2.session.length) > 0) return;
      const e = await this.client.core.storage.getKeys();
      for (const i2 of e) i2.startsWith(U) && await this.client.core.storage.removeItem(i2);
    } catch (e) {
      this.logger.warn("Failed to cleanup storage", e);
    }
  }
}
const SIWXUtil = {
  getSIWX() {
    return OptionsController.state.siwx;
  },
  async initializeIfEnabled() {
    var _a;
    const siwx = OptionsController.state.siwx;
    const caipAddress = ChainController.getActiveCaipAddress();
    if (!(siwx && caipAddress)) {
      return;
    }
    const [namespace, chainId, address] = caipAddress.split(":");
    if (!ChainController.checkIfSupportedNetwork(namespace)) {
      return;
    }
    try {
      const sessions = await siwx.getSessions(`${namespace}:${chainId}`, address);
      if (sessions.length) {
        return;
      }
      await ModalController.open({
        view: "SIWXSignMessage"
      });
    } catch (error) {
      console.error("SIWXUtil:initializeIfEnabled", error);
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: this.getSIWXEventProperties()
      });
      await ((_a = ConnectionController._getClient()) == null ? void 0 : _a.disconnect().catch(console.error));
      RouterController.reset("Connect");
      SnackController.showError("A problem occurred while trying initialize authentication");
    }
  },
  async requestSignMessage() {
    const siwx = OptionsController.state.siwx;
    const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
    const network = ChainController.getActiveCaipNetwork();
    const client = ConnectionController._getClient();
    if (!siwx) {
      throw new Error("SIWX is not enabled");
    }
    if (!address) {
      throw new Error("No ActiveCaipAddress found");
    }
    if (!network) {
      throw new Error("No ActiveCaipNetwork or client found");
    }
    if (!client) {
      throw new Error("No ConnectionController client found");
    }
    try {
      const siwxMessage = await siwx.createMessage({
        chainId: network.caipNetworkId,
        accountAddress: address
      });
      const message = siwxMessage.toString();
      const connectorId = ConnectorController.getConnectorId(network.chainNamespace);
      if (connectorId === ConstantsUtil$3.CONNECTOR_ID.AUTH) {
        RouterController.pushTransactionStack({});
      }
      const signature = await client.signMessage(message);
      await siwx.addSession({
        data: siwxMessage,
        message,
        signature
      });
      ModalController.close();
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_SUCCESS",
        properties: this.getSIWXEventProperties()
      });
    } catch (error) {
      const properties = this.getSIWXEventProperties();
      if (!ModalController.state.open || RouterController.state.view === "ApproveTransaction") {
        await ModalController.open({
          view: "SIWXSignMessage"
        });
      }
      if (properties.isSmartAccount) {
        SnackController.showError("This application might not support Smart Accounts");
      } else {
        SnackController.showError("Signature declined");
      }
      EventsController.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties
      });
      console.error("SWIXUtil:requestSignMessage", error);
    }
  },
  async cancelSignMessage() {
    var _a;
    try {
      const siwx = this.getSIWX();
      const isRequired = (_a = siwx == null ? void 0 : siwx.getRequired) == null ? void 0 : _a.call(siwx);
      if (isRequired) {
        await ConnectionController.disconnect();
      } else {
        ModalController.close();
      }
      RouterController.reset("Connect");
      EventsController.sendEvent({
        event: "CLICK_CANCEL_SIWX",
        type: "track",
        properties: this.getSIWXEventProperties()
      });
    } catch (error) {
      console.error("SIWXUtil:cancelSignMessage", error);
    }
  },
  async getSessions() {
    const siwx = OptionsController.state.siwx;
    const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
    const network = ChainController.getActiveCaipNetwork();
    if (!(siwx && address && network)) {
      return [];
    }
    return siwx.getSessions(network.caipNetworkId, address);
  },
  async isSIWXCloseDisabled() {
    var _a;
    const siwx = this.getSIWX();
    if (siwx) {
      const isApproveSignScreen = RouterController.state.view === "ApproveTransaction";
      const isSiwxSignMessage = RouterController.state.view === "SIWXSignMessage";
      if (isApproveSignScreen || isSiwxSignMessage) {
        return ((_a = siwx.getRequired) == null ? void 0 : _a.call(siwx)) && (await this.getSessions()).length === 0;
      }
    }
    return false;
  },
  async universalProviderAuthenticate({ universalProvider, chains, methods }) {
    var _a, _b, _c2;
    const siwx = SIWXUtil.getSIWX();
    const namespaces = new Set(chains.map((chain) => chain.split(":")[0]));
    if (!siwx || namespaces.size !== 1 || !namespaces.has("eip155")) {
      return false;
    }
    const siwxMessage = await siwx.createMessage({
      chainId: ((_a = ChainController.getActiveCaipNetwork()) == null ? void 0 : _a.caipNetworkId) || "",
      accountAddress: ""
    });
    const result = await universalProvider.authenticate({
      nonce: siwxMessage.nonce,
      domain: siwxMessage.domain,
      uri: siwxMessage.uri,
      exp: siwxMessage.expirationTime,
      iat: siwxMessage.issuedAt,
      nbf: siwxMessage.notBefore,
      requestId: siwxMessage.requestId,
      version: siwxMessage.version,
      resources: siwxMessage.resources,
      statement: siwxMessage.statement,
      chainId: siwxMessage.chainId,
      methods,
      // The first chainId is what is used for universal provider to build the message
      chains: [siwxMessage.chainId, ...chains.filter((chain) => chain !== siwxMessage.chainId)]
    });
    SnackController.showLoading("Authenticating...", { autoClose: false });
    AccountController.setConnectedWalletInfo({
      ...result.session.peer.metadata,
      name: result.session.peer.metadata.name,
      icon: (_b = result.session.peer.metadata.icons) == null ? void 0 : _b[0],
      type: "WALLET_CONNECT"
    }, Array.from(namespaces)[0]);
    if ((_c2 = result == null ? void 0 : result.auths) == null ? void 0 : _c2.length) {
      const sessions = result.auths.map((cacao) => {
        const message = universalProvider.client.formatAuthMessage({
          request: cacao.p,
          iss: cacao.p.iss
        });
        return {
          data: {
            ...cacao.p,
            accountAddress: cacao.p.iss.split(":").slice(-1).join(""),
            chainId: cacao.p.iss.split(":").slice(2, 4).join(":"),
            uri: cacao.p.aud,
            version: cacao.p.version || siwxMessage.version,
            expirationTime: cacao.p.exp,
            issuedAt: cacao.p.iat,
            notBefore: cacao.p.nbf
          },
          message,
          signature: cacao.s.s,
          cacao
        };
      });
      try {
        await siwx.setSessions(sessions);
        EventsController.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: SIWXUtil.getSIWXEventProperties()
        });
      } catch (error) {
        console.error("SIWX:universalProviderAuth - failed to set sessions", error);
        EventsController.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: SIWXUtil.getSIWXEventProperties()
        });
        await universalProvider.disconnect().catch(console.error);
        throw error;
      } finally {
        SnackController.hide();
      }
    }
    return true;
  },
  getSIWXEventProperties() {
    var _a, _b;
    const activeChainNamespace = ChainController.state.activeChain;
    return {
      network: ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.caipNetworkId) || "",
      isSmartAccount: ((_b = AccountController.state.preferredAccountTypes) == null ? void 0 : _b[activeChainNamespace]) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
    };
  },
  async clearSessions() {
    const siwx = this.getSIWX();
    if (siwx) {
      await siwx.setSessions([]);
    }
  }
};
function checkNamespaceConnectorId(namespace, connectorId) {
  return ConnectorController.getConnectorId(namespace) === connectorId;
}
function getChainsToDisconnect(namespace) {
  const namespaces = Array.from(ChainController.state.chains.keys());
  let chains = [];
  if (namespace) {
    chains.push([namespace, ChainController.state.chains.get(namespace)]);
    if (checkNamespaceConnectorId(namespace, ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT)) {
      namespaces.forEach((ns2) => {
        if (ns2 !== namespace && checkNamespaceConnectorId(ns2, ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT)) {
          chains.push([ns2, ChainController.state.chains.get(ns2)]);
        }
      });
    } else if (checkNamespaceConnectorId(namespace, ConstantsUtil$3.CONNECTOR_ID.AUTH)) {
      namespaces.forEach((ns2) => {
        if (ns2 !== namespace && checkNamespaceConnectorId(ns2, ConstantsUtil$3.CONNECTOR_ID.AUTH)) {
          chains.push([ns2, ChainController.state.chains.get(ns2)]);
        }
      });
    }
  } else {
    chains = Array.from(ChainController.state.chains.entries());
  }
  return chains;
}
const ConstantsUtil$1 = {
  EIP155: "eip155",
  CONNECTOR_TYPE_WALLET_CONNECT: "WALLET_CONNECT",
  CONNECTOR_TYPE_INJECTED: "INJECTED",
  CONNECTOR_TYPE_ANNOUNCED: "ANNOUNCED"
};
const PresetsUtil = {
  NetworkImageIds: {
    1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
    42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
    43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
    56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
    250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
    10: "ab9c186a-c52f-464b-2906-ca59d760a400",
    137: "41d04d42-da3b-4453-8506-668cc0727900",
    5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
    295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
    11155111: "e909ea0a-f92a-4512-c8fc-748044ea6800",
    84532: "a18a7ecd-e307-4360-4746-283182228e00",
    1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
    130: "2257980a-3463-48c6-cbac-a42d2a956e00",
    10143: "0a728e83-bacb-46db-7844-948f05434900",
    100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
    9001: "f926ff41-260d-4028-635e-91913fc28e00",
    324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
    314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
    4689: "34e68754-e536-40da-c153-6ef2e7188a00",
    1088: "3897a66d-40b9-4833-162f-a2c90531c900",
    1284: "161038da-44ae-4ec7-1208-0ea569454b00",
    1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
    7777777: "845c60df-d429-4991-e687-91ae45791600",
    42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
    8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
    1313161554: "3ff73439-a619-4894-9262-4470c773a100",
    2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
    2741: "fc2427d1-5af9-4a9c-8da5-6f94627cd900",
    "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "000000000019d6689c085ae165831e93": "0b4838db-0161-4ffe-022d-532bf03dba00",
    "000000000933ea01ad0ee984209779ba": "39354064-d79b-420b-065d-f980c4b78200"
  },
  ConnectorImageIds: {
    [ConstantsUtil$3.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [ConstantsUtil$3.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [ConstantsUtil$3.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [ConstantsUtil$3.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [ConstantsUtil$3.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [ConstantsUtil$3.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [ConstantsUtil$3.CONNECTOR_ID.COINBASE]: "Coinbase",
    [ConstantsUtil$3.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [ConstantsUtil$3.CONNECTOR_ID.LEDGER]: "Ledger",
    [ConstantsUtil$3.CONNECTOR_ID.SAFE]: "Safe"
  }
};
const HelpersUtil = {
  getCaipTokens(tokens) {
    if (!tokens) {
      return void 0;
    }
    const caipTokens = {};
    Object.entries(tokens).forEach(([id, token]) => {
      caipTokens[`${ConstantsUtil$1.EIP155}:${id}`] = token;
    });
    return caipTokens;
  },
  isLowerCaseMatch(str1, str2) {
    return (str1 == null ? void 0 : str1.toLowerCase()) === (str2 == null ? void 0 : str2.toLowerCase());
  }
};
new AbortController();
const ErrorUtil = {
  UniversalProviderErrors: {
    UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
      message: "Unauthorized: origin not allowed",
      alertErrorKey: "INVALID_APP_CONFIGURATION"
    },
    JWT_VALIDATION_ERROR: {
      message: "JWT validation error: JWT Token is not yet valid",
      alertErrorKey: "JWT_TOKEN_NOT_VALID"
    },
    INVALID_KEY: {
      message: "Unauthorized: invalid key",
      alertErrorKey: "INVALID_PROJECT_ID"
    }
  },
  ALERT_ERRORS: {
    SWITCH_NETWORK_NOT_FOUND: {
      shortMessage: "Network Not Found",
      longMessage: "Network not found - please make sure it is included in 'networks' array in createAppKit function"
    },
    INVALID_APP_CONFIGURATION: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => `Origin ${isSafe() ? window.origin : "unknown"} not found on Allowlist - update configuration on cloud.reown.com`
    },
    IFRAME_LOAD_FAILED: {
      shortMessage: "Network Error - Could not load embedded wallet",
      longMessage: () => "There was an issue loading the embedded wallet. Please try again later."
    },
    IFRAME_REQUEST_TIMEOUT: {
      shortMessage: "Embedded Wallet Request Timed Out",
      longMessage: () => "There was an issue doing the request to the embedded wallet. Please try again later."
    },
    UNVERIFIED_DOMAIN: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => "There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com"
    },
    JWT_TOKEN_NOT_VALID: {
      shortMessage: "Session Expired",
      longMessage: "Invalid session found on UniversalProvider - please check your time settings and connect again"
    },
    INVALID_PROJECT_ID: {
      shortMessage: "Invalid App Configuration",
      longMessage: "Invalid Project ID - update configuration"
    },
    PROJECT_ID_NOT_CONFIGURED: {
      shortMessage: "Project ID Not Configured",
      longMessage: "Project ID Not Configured - update configuration on cloud.reown.com"
    }
  }
};
function isSafe() {
  return typeof window !== "undefined";
}
const LoggerUtil = {
  createLogger(onError, level = "error") {
    const loggerOptions = k$3({
      level
    });
    const { logger } = A$2({
      opts: loggerOptions
    });
    logger.error = (...args) => {
      for (const arg of args) {
        if (arg instanceof Error) {
          onError(arg, ...args);
          return;
        }
      }
      onError(void 0, ...args);
    };
    return logger;
  }
};
const RPC_URL_HOST = "rpc.walletconnect.org";
function getBlockchainApiRpcUrl(caipNetworkId, projectId) {
  const url = new URL("https://rpc.walletconnect.org/v1/");
  url.searchParams.set("chainId", caipNetworkId);
  url.searchParams.set("projectId", projectId);
  return url.toString();
}
const WC_HTTP_RPC_SUPPORTED_CHAINS = [
  "near:mainnet",
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "eip155:1101",
  "eip155:56",
  "eip155:42161",
  "eip155:7777777",
  "eip155:59144",
  "eip155:324",
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "eip155:5000",
  "solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz",
  "eip155:80084",
  "eip155:5003",
  "eip155:100",
  "eip155:8453",
  "eip155:42220",
  "eip155:1313161555",
  "eip155:17000",
  "eip155:1",
  "eip155:300",
  "eip155:1313161554",
  "eip155:1329",
  "eip155:84532",
  "eip155:421614",
  "eip155:11155111",
  "eip155:8217",
  "eip155:43114",
  "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  "eip155:999999999",
  "eip155:11155420",
  "eip155:80002",
  "eip155:97",
  "eip155:43113",
  "eip155:137",
  "eip155:10",
  "eip155:1301",
  "bip122:000000000019d6689c085ae165831e93",
  "bip122:000000000933ea01ad0ee984209779ba"
];
const CaipNetworksUtil = {
  extendRpcUrlWithProjectId(rpcUrl, projectId) {
    let isReownUrl = false;
    try {
      const url = new URL(rpcUrl);
      isReownUrl = url.host === RPC_URL_HOST;
    } catch (e) {
      isReownUrl = false;
    }
    if (isReownUrl) {
      const url = new URL(rpcUrl);
      if (!url.searchParams.has("projectId")) {
        url.searchParams.set("projectId", projectId);
      }
      return url.toString();
    }
    return rpcUrl;
  },
  isCaipNetwork(network) {
    return "chainNamespace" in network && "caipNetworkId" in network;
  },
  getChainNamespace(network) {
    if (this.isCaipNetwork(network)) {
      return network.chainNamespace;
    }
    return ConstantsUtil$3.CHAIN.EVM;
  },
  getCaipNetworkId(network) {
    if (this.isCaipNetwork(network)) {
      return network.caipNetworkId;
    }
    return `${ConstantsUtil$3.CHAIN.EVM}:${network.id}`;
  },
  getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId) {
    var _a, _b, _c2;
    const defaultRpcUrl = (_c2 = (_b = (_a = caipNetwork.rpcUrls) == null ? void 0 : _a.default) == null ? void 0 : _b.http) == null ? void 0 : _c2[0];
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetworkId)) {
      return getBlockchainApiRpcUrl(caipNetworkId, projectId);
    }
    return defaultRpcUrl || "";
  },
  extendCaipNetwork(caipNetwork, { customNetworkImageUrls, projectId, customRpcUrls }) {
    var _a, _b, _c2, _d, _e2;
    const chainNamespace = this.getChainNamespace(caipNetwork);
    const caipNetworkId = this.getCaipNetworkId(caipNetwork);
    const networkDefaultRpcUrl = (_a = caipNetwork.rpcUrls.default.http) == null ? void 0 : _a[0];
    const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId);
    const chainDefaultRpcUrl = ((_d = (_c2 = (_b = caipNetwork == null ? void 0 : caipNetwork.rpcUrls) == null ? void 0 : _b["chainDefault"]) == null ? void 0 : _c2.http) == null ? void 0 : _d[0]) || networkDefaultRpcUrl;
    const customRpcUrlsOfNetwork = ((_e2 = customRpcUrls == null ? void 0 : customRpcUrls[caipNetworkId]) == null ? void 0 : _e2.map((i2) => i2.url)) || [];
    const rpcUrls = [...customRpcUrlsOfNetwork, reownRpcUrl];
    const rpcUrlsWithoutReown = [...customRpcUrlsOfNetwork];
    if (chainDefaultRpcUrl && !rpcUrlsWithoutReown.includes(chainDefaultRpcUrl)) {
      rpcUrlsWithoutReown.push(chainDefaultRpcUrl);
    }
    return {
      ...caipNetwork,
      chainNamespace,
      caipNetworkId,
      assets: {
        imageId: PresetsUtil.NetworkImageIds[caipNetwork.id],
        imageUrl: customNetworkImageUrls == null ? void 0 : customNetworkImageUrls[caipNetwork.id]
      },
      rpcUrls: {
        ...caipNetwork.rpcUrls,
        default: {
          http: rpcUrls
        },
        chainDefault: {
          http: rpcUrlsWithoutReown
        }
      }
    };
  },
  extendCaipNetworks(caipNetworks, { customNetworkImageUrls, projectId, customRpcUrls }) {
    return caipNetworks.map((caipNetwork) => CaipNetworksUtil.extendCaipNetwork(caipNetwork, {
      customNetworkImageUrls,
      customRpcUrls,
      projectId
    }));
  },
  getViemTransport(caipNetwork, projectId, customRpcUrls) {
    var _a, _b, _c2;
    const transports = [];
    customRpcUrls == null ? void 0 : customRpcUrls.forEach((rpcUrl) => {
      transports.push(http(rpcUrl.url, rpcUrl.config));
    });
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
      transports.push(http(getBlockchainApiRpcUrl(caipNetwork.caipNetworkId, projectId), {
        fetchOptions: {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      }));
    }
    (_c2 = (_b = (_a = caipNetwork == null ? void 0 : caipNetwork.rpcUrls) == null ? void 0 : _a.default) == null ? void 0 : _b.http) == null ? void 0 : _c2.forEach((rpcUrl) => {
      transports.push(http(rpcUrl));
    });
    return fallback(transports);
  },
  extendWagmiTransports(caipNetwork, projectId, transport) {
    if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
      const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetwork.caipNetworkId, projectId);
      return fallback([transport, http(reownRpcUrl)]);
    }
    return transport;
  },
  getUnsupportedNetwork(caipNetworkId) {
    return {
      id: caipNetworkId.split(":")[1],
      caipNetworkId,
      name: ConstantsUtil$3.UNSUPPORTED_NETWORK_NAME,
      chainNamespace: caipNetworkId.split(":")[0],
      nativeCurrency: {
        name: "",
        decimals: 0,
        symbol: ""
      },
      rpcUrls: {
        default: {
          http: []
        }
      }
    };
  },
  getCaipNetworkFromStorage(defaultCaipNetwork) {
    var _a;
    const caipNetworkIdFromStorage = StorageUtil.getActiveCaipNetworkId();
    const caipNetworks = ChainController.getAllRequestedCaipNetworks();
    const availableNamespaces = Array.from(((_a = ChainController.state.chains) == null ? void 0 : _a.keys()) || []);
    const namespace = caipNetworkIdFromStorage == null ? void 0 : caipNetworkIdFromStorage.split(":")[0];
    const isNamespaceAvailable = namespace ? availableNamespaces.includes(namespace) : false;
    const caipNetwork = caipNetworks == null ? void 0 : caipNetworks.find((cn2) => cn2.caipNetworkId === caipNetworkIdFromStorage);
    const isUnsupportedNetwork = isNamespaceAvailable && !caipNetwork && caipNetworkIdFromStorage;
    if (isUnsupportedNetwork) {
      return this.getUnsupportedNetwork(caipNetworkIdFromStorage);
    }
    if (caipNetwork) {
      return caipNetwork;
    }
    if (defaultCaipNetwork) {
      return defaultCaipNetwork;
    }
    return caipNetworks == null ? void 0 : caipNetworks[0];
  }
};
const CLEAN_PROVIDERS_STATE = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
};
const state = proxy({
  providers: { ...CLEAN_PROVIDERS_STATE },
  providerIds: { ...CLEAN_PROVIDERS_STATE }
});
const ProviderUtil = {
  state,
  subscribeKey(key, callback) {
    return subscribeKey(state, key, callback);
  },
  subscribe(callback) {
    return subscribe(state, () => {
      callback(state);
    });
  },
  subscribeProviders(callback) {
    return subscribe(state.providers, () => callback(state.providers));
  },
  setProvider(chainNamespace, provider) {
    if (provider) {
      state.providers[chainNamespace] = ref(provider);
    }
  },
  getProvider(chainNamespace) {
    return state.providers[chainNamespace];
  },
  setProviderId(chainNamespace, providerId) {
    if (providerId) {
      state.providerIds[chainNamespace] = providerId;
    }
  },
  getProviderId(chainNamespace) {
    if (!chainNamespace) {
      return void 0;
    }
    return state.providerIds[chainNamespace];
  },
  reset() {
    state.providers = { ...CLEAN_PROVIDERS_STATE };
    state.providerIds = { ...CLEAN_PROVIDERS_STATE };
  },
  resetChain(chainNamespace) {
    state.providers[chainNamespace] = void 0;
    state.providerIds[chainNamespace] = void 0;
  }
};
const ConstantsUtil = {
  SECURE_SITE_ORIGIN: (typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org",
  VIEW_DIRECTION: {
    Next: "next",
    Prev: "prev"
  },
  DEFAULT_CONNECT_METHOD_ORDER: ["email", "social", "wallet"],
  ANIMATION_DURATIONS: {
    HeaderText: 120,
    ModalHeight: 150,
    ViewTransition: 150
  }
};
const WalletUtil = {
  filterOutDuplicatesByRDNS(wallets) {
    const connectors = OptionsController.state.enableEIP6963 ? ConnectorController.state.connectors : [];
    const recent = StorageUtil.getRecentWallets();
    const connectorRDNSs = connectors.map((connector) => {
      var _a;
      return (_a = connector.info) == null ? void 0 : _a.rdns;
    }).filter(Boolean);
    const recentRDNSs = recent.map((wallet) => wallet.rdns).filter(Boolean);
    const allRDNSs = connectorRDNSs.concat(recentRDNSs);
    if (allRDNSs.includes("io.metamask.mobile") && CoreHelperUtil.isMobile()) {
      const index = allRDNSs.indexOf("io.metamask.mobile");
      allRDNSs[index] = "io.metamask";
    }
    const filtered = wallets.filter((wallet) => !allRDNSs.includes(String(wallet == null ? void 0 : wallet.rdns)));
    return filtered;
  },
  filterOutDuplicatesByIds(wallets) {
    const connectors = ConnectorController.state.connectors.filter((connector) => connector.type === "ANNOUNCED" || connector.type === "INJECTED");
    const recent = StorageUtil.getRecentWallets();
    const connectorIds = connectors.map((connector) => connector.explorerId);
    const recentIds = recent.map((wallet) => wallet.id);
    const allIds = connectorIds.concat(recentIds);
    const filtered = wallets.filter((wallet) => !allIds.includes(wallet == null ? void 0 : wallet.id));
    return filtered;
  },
  filterOutDuplicateWallets(wallets) {
    const uniqueByRDNS = this.filterOutDuplicatesByRDNS(wallets);
    const uniqueWallets = this.filterOutDuplicatesByIds(uniqueByRDNS);
    return uniqueWallets;
  },
  markWalletsAsInstalled(wallets) {
    const { connectors } = ConnectorController.state;
    const { featuredWalletIds } = OptionsController.state;
    const installedWalletRdnsMap = connectors.filter((connector) => connector.type === "ANNOUNCED").reduce((rdnsMap, connector) => {
      var _a;
      if (!((_a = connector.info) == null ? void 0 : _a.rdns)) {
        return rdnsMap;
      }
      rdnsMap[connector.info.rdns] = true;
      return rdnsMap;
    }, {});
    const walletsWithInstallationStatus = wallets.map((wallet) => ({
      ...wallet,
      installed: Boolean(wallet.rdns) && Boolean(installedWalletRdnsMap[wallet.rdns ?? ""])
    }));
    const sortedWallets = walletsWithInstallationStatus.sort((walletA, walletB) => {
      const installationComparison = Number(walletB.installed) - Number(walletA.installed);
      if (installationComparison !== 0) {
        return installationComparison;
      }
      if (featuredWalletIds == null ? void 0 : featuredWalletIds.length) {
        const walletAFeaturedIndex = featuredWalletIds.indexOf(walletA.id);
        const walletBFeaturedIndex = featuredWalletIds.indexOf(walletB.id);
        if (walletAFeaturedIndex !== -1 && walletBFeaturedIndex !== -1) {
          return walletAFeaturedIndex - walletBFeaturedIndex;
        }
        if (walletAFeaturedIndex !== -1) {
          return -1;
        }
        if (walletBFeaturedIndex !== -1) {
          return 1;
        }
      }
      return 0;
    });
    return sortedWallets;
  },
  getConnectOrderMethod(_features, _connectors) {
    var _a;
    const connectMethodOrder = (_features == null ? void 0 : _features.connectMethodsOrder) || ((_a = OptionsController.state.features) == null ? void 0 : _a.connectMethodsOrder);
    const connectors = _connectors || ConnectorController.state.connectors;
    if (connectMethodOrder) {
      return connectMethodOrder;
    }
    const { injected, announced } = ConnectorUtil.getConnectorsByType(connectors, ApiController.state.recommended, ApiController.state.featured);
    const shownInjected = injected.filter(ConnectorUtil.showConnector);
    const shownAnnounced = announced.filter(ConnectorUtil.showConnector);
    if (shownInjected.length || shownAnnounced.length) {
      return ["wallet", "email", "social"];
    }
    return ConstantsUtil.DEFAULT_CONNECT_METHOD_ORDER;
  },
  isExcluded(wallet) {
    const isRDNSExcluded = Boolean(wallet.rdns) && ApiController.state.excludedWallets.some((w2) => w2.rdns === wallet.rdns);
    const isNameExcluded = Boolean(wallet.name) && ApiController.state.excludedWallets.some((w2) => HelpersUtil.isLowerCaseMatch(w2.name, wallet.name));
    return isRDNSExcluded || isNameExcluded;
  }
};
const ConnectorUtil = {
  getConnectorsByType(connectors, recommended, featured) {
    const { customWallets } = OptionsController.state;
    const recent = StorageUtil.getRecentWallets();
    const filteredRecommended = WalletUtil.filterOutDuplicateWallets(recommended);
    const filteredFeatured = WalletUtil.filterOutDuplicateWallets(featured);
    const multiChain = connectors.filter((connector) => connector.type === "MULTI_CHAIN");
    const announced = connectors.filter((connector) => connector.type === "ANNOUNCED");
    const injected = connectors.filter((connector) => connector.type === "INJECTED");
    const external = connectors.filter((connector) => connector.type === "EXTERNAL");
    return {
      custom: customWallets,
      recent,
      external,
      multiChain,
      announced,
      injected,
      recommended: filteredRecommended,
      featured: filteredFeatured
    };
  },
  showConnector(connector) {
    var _a;
    const rdns = (_a = connector.info) == null ? void 0 : _a.rdns;
    const isRDNSExcluded = Boolean(rdns) && ApiController.state.excludedWallets.some((wallet) => Boolean(wallet.rdns) && wallet.rdns === rdns);
    const isNameExcluded = Boolean(connector.name) && ApiController.state.excludedWallets.some((wallet) => HelpersUtil.isLowerCaseMatch(wallet.name, connector.name));
    if (connector.type === "INJECTED") {
      const isBrowserWallet = connector.name === "Browser Wallet";
      if (isBrowserWallet) {
        if (!CoreHelperUtil.isMobile()) {
          return false;
        }
        if (CoreHelperUtil.isMobile() && !rdns && !ConnectionController.checkInstalled()) {
          return false;
        }
      }
      if (isRDNSExcluded || isNameExcluded) {
        return false;
      }
    }
    if ((connector.type === "ANNOUNCED" || connector.type === "EXTERNAL") && (isRDNSExcluded || isNameExcluded)) {
      return false;
    }
    return true;
  },
  getIsConnectedWithWC() {
    const chains = Array.from(ChainController.state.chains.values());
    const isConnectedWithWC = chains.some((chain) => {
      const connectorId = ConnectorController.getConnectorId(chain.namespace);
      return connectorId === ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT;
    });
    return isConnectedWithWC;
  },
  getConnectorTypeOrder({ recommended, featured, custom, recent, announced, injected, multiChain, external, overriddenConnectors = ((_a) => (_a = OptionsController.state.features) == null ? void 0 : _a.connectorTypeOrder)() ?? [] }) {
    const isConnectedWithWC = ConnectorUtil.getIsConnectedWithWC();
    const isWCEnabled = OptionsController.state.enableWalletConnect;
    const allConnectors = [
      { type: "walletConnect", isEnabled: isWCEnabled && !isConnectedWithWC },
      { type: "recent", isEnabled: recent.length > 0 },
      { type: "injected", isEnabled: [...injected, ...announced, ...multiChain].length > 0 },
      { type: "featured", isEnabled: featured.length > 0 },
      { type: "custom", isEnabled: custom && custom.length > 0 },
      { type: "external", isEnabled: external.length > 0 },
      { type: "recommended", isEnabled: recommended.length > 0 }
    ];
    const enabledConnectors = allConnectors.filter((option) => option.isEnabled);
    const enabledConnectorTypes = new Set(enabledConnectors.map((option) => option.type));
    const prioritizedConnectors = overriddenConnectors.filter((type) => enabledConnectorTypes.has(type)).map((type) => ({ type, isEnabled: true }));
    const remainingConnectors = enabledConnectors.filter(({ type: enabledConnectorType }) => {
      const hasPrioritizedConnector = prioritizedConnectors.some(({ type: prioritizedConnectorType }) => prioritizedConnectorType === enabledConnectorType);
      return !hasPrioritizedConnector;
    });
    return Array.from(new Set([...prioritizedConnectors, ...remainingConnectors].map(({ type }) => type)));
  }
};
let themeTag = void 0;
let darkModeTag = void 0;
let lightModeTag = void 0;
function initializeTheming(themeVariables, themeMode) {
  themeTag = document.createElement("style");
  darkModeTag = document.createElement("style");
  lightModeTag = document.createElement("style");
  themeTag.textContent = createRootStyles(themeVariables).core.cssText;
  darkModeTag.textContent = createRootStyles(themeVariables).dark.cssText;
  lightModeTag.textContent = createRootStyles(themeVariables).light.cssText;
  document.head.appendChild(themeTag);
  document.head.appendChild(darkModeTag);
  document.head.appendChild(lightModeTag);
  setColorTheme(themeMode);
}
function setColorTheme(themeMode) {
  if (darkModeTag && lightModeTag) {
    if (themeMode === "light") {
      darkModeTag.removeAttribute("media");
      lightModeTag.media = "enabled";
    } else {
      lightModeTag.removeAttribute("media");
      darkModeTag.media = "enabled";
    }
  }
}
function setThemeVariables(themeVariables) {
  if (themeTag && darkModeTag && lightModeTag) {
    themeTag.textContent = createRootStyles(themeVariables).core.cssText;
    darkModeTag.textContent = createRootStyles(themeVariables).dark.cssText;
    lightModeTag.textContent = createRootStyles(themeVariables).light.cssText;
  }
}
function createRootStyles(themeVariables) {
  return {
    core: i$2`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-color-mix-strength"]) ? `${themeVariables["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-font-family"]) || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-font-size-master"]) || "10px")};
        --w3m-border-radius-master: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-border-radius-master"]) || "4px")};
        --w3m-z-index: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-z-index"]) || 999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,
    light: i$2`
      :root {
        --w3m-color-mix: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-color-mix"]) || "#fff")};
        --w3m-accent: ${r$1(getW3mThemeVariables(themeVariables, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${r$1(getW3mThemeVariables(themeVariables, "dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,
    dark: i$2`
      :root {
        --w3m-color-mix: ${r$1((themeVariables == null ? void 0 : themeVariables["--w3m-color-mix"]) || "#000")};
        --w3m-accent: ${r$1(getW3mThemeVariables(themeVariables, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${r$1(getW3mThemeVariables(themeVariables, "light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `
  };
}
const resetStyles = i$2`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`;
const elementStyles = i$2`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`;
const colorStyles = i$2`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`;
const WcConstantsUtil = {
  ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
  ERROR_CODE_DEFAULT: 5e3,
  ERROR_INVALID_CHAIN_ID: 32603,
  DEFAULT_ALLOWED_ANCESTORS: [
    "http://localhost:*",
    "https://*.pages.dev",
    "https://*.vercel.app",
    "https://*.ngrok-free.app",
    "https://secure-mobile.walletconnect.com",
    "https://secure-mobile.walletconnect.org"
  ]
};
function defineChain(chain) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...chain
  };
}
const solana = defineChain({
  id: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  name: "Solana",
  network: "solana-mainnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: false,
  chainNamespace: "solana",
  caipNetworkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  deprecatedCaipNetworkId: "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"
});
const solanaDevnet = defineChain({
  id: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  name: "Solana Devnet",
  network: "solana-devnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: true,
  chainNamespace: "solana",
  caipNetworkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  deprecatedCaipNetworkId: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K"
});
defineChain({
  id: "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  name: "Solana Testnet",
  network: "solana-testnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: true,
  chainNamespace: "solana",
  caipNetworkId: "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"
});
defineChain({
  id: "000000000019d6689c085ae165831e93",
  caipNetworkId: "bip122:000000000019d6689c085ae165831e93",
  chainNamespace: "bip122",
  name: "Bitcoin",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8
  },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  }
});
defineChain({
  id: "000000000933ea01ad0ee984209779ba",
  caipNetworkId: "bip122:000000000933ea01ad0ee984209779ba",
  chainNamespace: "bip122",
  name: "Bitcoin Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8
  },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  testnet: true
});
const DEFAULT_METHODS = {
  solana: [
    "solana_signMessage",
    "solana_signTransaction",
    "solana_requestAccounts",
    "solana_getAccounts",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction"
  ],
  eip155: [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    // EIP-5792
    "wallet_getCallsStatus",
    "wallet_showCallsStatus",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    // EIP-7715
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    //EIP-7811
    "wallet_getAssets"
  ],
  bip122: ["sendTransfer", "signMessage", "signPsbt", "getAccountAddresses"]
};
const WcHelpersUtil = {
  getMethodsByChainNamespace(chainNamespace) {
    return DEFAULT_METHODS[chainNamespace] || [];
  },
  createDefaultNamespace(chainNamespace) {
    return {
      methods: this.getMethodsByChainNamespace(chainNamespace),
      events: ["accountsChanged", "chainChanged"],
      chains: [],
      rpcMap: {}
    };
  },
  applyNamespaceOverrides(baseNamespaces, overrides) {
    if (!overrides) {
      return { ...baseNamespaces };
    }
    const result = { ...baseNamespaces };
    const namespacesToOverride = /* @__PURE__ */ new Set();
    if (overrides.methods) {
      Object.keys(overrides.methods).forEach((ns2) => namespacesToOverride.add(ns2));
    }
    if (overrides.chains) {
      Object.keys(overrides.chains).forEach((ns2) => namespacesToOverride.add(ns2));
    }
    if (overrides.events) {
      Object.keys(overrides.events).forEach((ns2) => namespacesToOverride.add(ns2));
    }
    if (overrides.rpcMap) {
      Object.keys(overrides.rpcMap).forEach((chainId) => {
        const [ns2] = chainId.split(":");
        if (ns2) {
          namespacesToOverride.add(ns2);
        }
      });
    }
    namespacesToOverride.forEach((ns2) => {
      if (!result[ns2]) {
        result[ns2] = this.createDefaultNamespace(ns2);
      }
    });
    if (overrides.methods) {
      Object.entries(overrides.methods).forEach(([ns2, methods]) => {
        if (result[ns2]) {
          result[ns2].methods = methods;
        }
      });
    }
    if (overrides.chains) {
      Object.entries(overrides.chains).forEach(([ns2, chains]) => {
        if (result[ns2]) {
          result[ns2].chains = chains;
        }
      });
    }
    if (overrides.events) {
      Object.entries(overrides.events).forEach(([ns2, events2]) => {
        if (result[ns2]) {
          result[ns2].events = events2;
        }
      });
    }
    if (overrides.rpcMap) {
      const processedNamespaces = /* @__PURE__ */ new Set();
      Object.entries(overrides.rpcMap).forEach(([chainId, rpcUrl]) => {
        const [ns2, id] = chainId.split(":");
        if (!ns2 || !id || !result[ns2]) {
          return;
        }
        if (!result[ns2].rpcMap) {
          result[ns2].rpcMap = {};
        }
        if (!processedNamespaces.has(ns2)) {
          result[ns2].rpcMap = {};
          processedNamespaces.add(ns2);
        }
        result[ns2].rpcMap[id] = rpcUrl;
      });
    }
    return result;
  },
  createNamespaces(caipNetworks, configOverride) {
    const defaultNamespaces = caipNetworks.reduce((acc, chain) => {
      const { id, chainNamespace, rpcUrls } = chain;
      const rpcUrl = rpcUrls.default.http[0];
      if (!acc[chainNamespace]) {
        acc[chainNamespace] = this.createDefaultNamespace(chainNamespace);
      }
      const caipNetworkId = `${chainNamespace}:${id}`;
      const namespace = acc[chainNamespace];
      namespace.chains.push(caipNetworkId);
      switch (caipNetworkId) {
        case solana.caipNetworkId:
          namespace.chains.push(solana.deprecatedCaipNetworkId);
          break;
        case solanaDevnet.caipNetworkId:
          namespace.chains.push(solanaDevnet.deprecatedCaipNetworkId);
          break;
      }
      if ((namespace == null ? void 0 : namespace.rpcMap) && rpcUrl) {
        namespace.rpcMap[id] = rpcUrl;
      }
      return acc;
    }, {});
    return this.applyNamespaceOverrides(defaultNamespaces, configOverride);
  },
  resolveReownName: async (name) => {
    var _a;
    const wcNameAddress = await EnsController.resolveName(name);
    const networkNameAddresses = Object.values(wcNameAddress == null ? void 0 : wcNameAddress.addresses) || [];
    return ((_a = networkNameAddresses[0]) == null ? void 0 : _a.address) || false;
  },
  getChainsFromNamespaces(namespaces = {}) {
    return Object.values(namespaces).flatMap((namespace) => {
      const chains = namespace.chains || [];
      const accountsChains = namespace.accounts.map((account) => {
        const [chainNamespace, chainId] = account.split(":");
        return `${chainNamespace}:${chainId}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...chains, ...accountsChains]));
    });
  },
  isSessionEventData(data) {
    return typeof data === "object" && data !== null && "id" in data && "topic" in data && "params" in data && typeof data.params === "object" && data.params !== null && "chainId" in data.params && "event" in data.params && typeof data.params.event === "object" && data.params.event !== null;
  },
  isOriginAllowed(currentOrigin, allowedPatterns, defaultAllowedOrigins) {
    for (const pattern of [...allowedPatterns, ...defaultAllowedOrigins]) {
      if (pattern.includes("*")) {
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
        const regexString = `^${escapedPattern.replace(/\\\*/gu, ".*")}$`;
        const regex = new RegExp(regexString, "u");
        if (regex.test(currentOrigin)) {
          return true;
        }
      } else {
        try {
          if (new URL(pattern).origin === currentOrigin) {
            return true;
          }
        } catch (e) {
          if (pattern === currentOrigin) {
            return true;
          }
        }
      }
    }
    return false;
  }
};
class WalletConnectConnector {
  constructor({ provider, namespace }) {
    this.id = ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT;
    this.name = PresetsUtil.ConnectorNamesMap[ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT];
    this.type = "WALLET_CONNECT";
    this.imageId = PresetsUtil.ConnectorImageIds[ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT];
    this.getCaipNetworks = ChainController.getCaipNetworks.bind(ChainController);
    this.caipNetworks = this.getCaipNetworks();
    this.provider = provider;
    this.chain = namespace;
  }
  get chains() {
    return this.getCaipNetworks();
  }
  async connectWalletConnect() {
    const isAuthenticated = await this.authenticate();
    if (!isAuthenticated) {
      const caipNetworks = this.getCaipNetworks();
      const universalProviderConfigOverride = OptionsController.state.universalProviderConfigOverride;
      const namespaces = WcHelpersUtil.createNamespaces(caipNetworks, universalProviderConfigOverride);
      await this.provider.connect({ optionalNamespaces: namespaces });
    }
    return {
      clientId: await this.provider.client.core.crypto.getClientId(),
      session: this.provider.session
    };
  }
  async disconnect() {
    await this.provider.disconnect();
  }
  async authenticate() {
    const chains = this.chains.map((network) => network.caipNetworkId);
    return SIWXUtil.universalProviderAuthenticate({
      universalProvider: this.provider,
      chains,
      methods: OPTIONAL_METHODS
    });
  }
}
const OPTIONAL_METHODS = [
  "eth_accounts",
  "eth_requestAccounts",
  "eth_sendRawTransaction",
  "eth_sign",
  "eth_signTransaction",
  "eth_signTypedData",
  "eth_signTypedData_v3",
  "eth_signTypedData_v4",
  "eth_sendTransaction",
  "personal_sign",
  "wallet_switchEthereumChain",
  "wallet_addEthereumChain",
  "wallet_getPermissions",
  "wallet_requestPermissions",
  "wallet_registerOnboarding",
  "wallet_watchAsset",
  "wallet_scanQRCode",
  // EIP-5792
  "wallet_getCallsStatus",
  "wallet_sendCalls",
  "wallet_getCapabilities",
  // EIP-7715
  "wallet_grantPermissions",
  "wallet_revokePermissions",
  //EIP-7811
  "wallet_getAssets"
];
class AdapterBlueprint {
  /**
   * Creates an instance of AdapterBlueprint.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  constructor(params) {
    this.availableConnectors = [];
    this.eventListeners = /* @__PURE__ */ new Map();
    this.getCaipNetworks = (namespace) => ChainController.getCaipNetworks(namespace);
    if (params) {
      this.construct(params);
    }
  }
  /**
   * Initializes the adapter with the given parameters.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  construct(params) {
    this.projectId = params.projectId;
    this.namespace = params.namespace;
    this.adapterType = params.adapterType;
  }
  /**
   * Gets the available connectors.
   * @returns {Connector[]} An array of available connectors
   */
  get connectors() {
    return this.availableConnectors;
  }
  /**
   * Gets the supported networks.
   * @returns {CaipNetwork[]} An array of supported networks
   */
  get networks() {
    return this.getCaipNetworks(this.namespace);
  }
  /**
   * Sets the auth provider.
   * @param {W3mFrameProvider} authProvider - The auth provider instance
   */
  setAuthProvider(authProvider) {
    this.addConnector({
      id: ConstantsUtil$3.CONNECTOR_ID.AUTH,
      type: "AUTH",
      name: ConstantsUtil$3.CONNECTOR_NAMES.AUTH,
      provider: authProvider,
      imageId: PresetsUtil.ConnectorImageIds[ConstantsUtil$3.CONNECTOR_ID.AUTH],
      chain: this.namespace,
      chains: []
    });
  }
  /**
   * Adds one or more connectors to the available connectors list.
   * @param {...Connector} connectors - The connectors to add
   */
  addConnector(...connectors) {
    const connectorsAdded = /* @__PURE__ */ new Set();
    this.availableConnectors = [...connectors, ...this.availableConnectors].filter((connector) => {
      if (connectorsAdded.has(connector.id)) {
        return false;
      }
      connectorsAdded.add(connector.id);
      return true;
    });
    this.emit("connectors", this.availableConnectors);
  }
  setStatus(status, chainNamespace) {
    AccountController.setStatus(status, chainNamespace);
  }
  /**
   * Adds an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
   */
  on(eventName, callback) {
    var _a;
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, /* @__PURE__ */ new Set());
    }
    (_a = this.eventListeners.get(eventName)) == null ? void 0 : _a.add(callback);
  }
  /**
   * Removes an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be removed
   */
  off(eventName, callback) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.delete(callback);
    }
  }
  /**
   * Removes all event listeners.
   */
  removeAllEventListeners() {
    this.eventListeners.forEach((listeners) => {
      listeners.clear();
    });
  }
  /**
   * Emits an event with the given name and optional data.
   * @template T
   * @param {T} eventName - The name of the event to emit
   * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
   */
  emit(eventName, data) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }
  /**
   * Connects to WalletConnect.
   * @param {number | string} [_chainId] - Optional chain ID to connect to
   */
  async connectWalletConnect(_chainId) {
    const connector = this.getWalletConnectConnector();
    const result = await connector.connectWalletConnect();
    return { clientId: result.clientId };
  }
  /**
   * Switches the network.
   * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
   */
  async switchNetwork(params) {
    var _a;
    const { caipNetwork, providerType } = params;
    if (!params.provider) {
      return;
    }
    const provider = "provider" in params.provider ? params.provider.provider : params.provider;
    if (providerType === "WALLET_CONNECT") {
      provider.setDefaultChain(caipNetwork.caipNetworkId);
      return;
    }
    if (provider && providerType === "AUTH") {
      const authProvider = provider;
      const preferredAccountType = (_a = AccountController.state.preferredAccountTypes) == null ? void 0 : _a[caipNetwork.chainNamespace];
      await authProvider.switchNetwork(caipNetwork.caipNetworkId);
      const user = await authProvider.getUser({
        chainId: caipNetwork.caipNetworkId,
        preferredAccountType
      });
      this.emit("switchNetwork", user);
    }
  }
  getWalletConnectConnector() {
    const connector = this.connectors.find((c2) => c2 instanceof WalletConnectConnector);
    if (!connector) {
      throw new Error("WalletConnectConnector not found");
    }
    return connector;
  }
}
class UniversalAdapter extends AdapterBlueprint {
  setUniversalProvider(universalProvider) {
    this.addConnector(new WalletConnectConnector({
      provider: universalProvider,
      caipNetworks: this.getCaipNetworks(),
      namespace: this.namespace
    }));
  }
  async connect(params) {
    return Promise.resolve({
      id: "WALLET_CONNECT",
      type: "WALLET_CONNECT",
      chainId: Number(params.chainId),
      provider: this.provider,
      address: ""
    });
  }
  async disconnect() {
    try {
      const connector = this.getWalletConnectConnector();
      await connector.disconnect();
    } catch (error) {
      console.warn("UniversalAdapter:disconnect - error", error);
    }
  }
  async getAccounts({ namespace }) {
    var _a, _b, _c2, _d;
    const provider = this.provider;
    const addresses = ((_d = (_c2 = (_b = (_a = provider == null ? void 0 : provider.session) == null ? void 0 : _a.namespaces) == null ? void 0 : _b[namespace]) == null ? void 0 : _c2.accounts) == null ? void 0 : _d.map((account) => {
      const [, , address] = account.split(":");
      return address;
    }).filter((address, index, self) => self.indexOf(address) === index)) || [];
    return Promise.resolve({
      accounts: addresses.map((address) => CoreHelperUtil.createAccount(namespace, address, namespace === "bip122" ? "payment" : "eoa"))
    });
  }
  async syncConnectors() {
    return Promise.resolve();
  }
  async getBalance(params) {
    var _a, _b, _c2, _d, _e2;
    const isBalanceSupported = params.caipNetwork && ConstantsUtil$2.BALANCE_SUPPORTED_CHAINS.includes((_a = params.caipNetwork) == null ? void 0 : _a.chainNamespace);
    if (!isBalanceSupported || ((_b = params.caipNetwork) == null ? void 0 : _b.testnet)) {
      return {
        balance: "0.00",
        symbol: ((_c2 = params.caipNetwork) == null ? void 0 : _c2.nativeCurrency.symbol) || ""
      };
    }
    if (AccountController.state.balanceLoading && params.chainId === ((_d = ChainController.state.activeCaipNetwork) == null ? void 0 : _d.id)) {
      return {
        balance: AccountController.state.balance || "0.00",
        symbol: AccountController.state.balanceSymbol || ""
      };
    }
    const balances = await AccountController.fetchTokenBalance();
    const balance = balances.find((b2) => {
      var _a2, _b2;
      return b2.chainId === `${(_a2 = params.caipNetwork) == null ? void 0 : _a2.chainNamespace}:${params.chainId}` && b2.symbol === ((_b2 = params.caipNetwork) == null ? void 0 : _b2.nativeCurrency.symbol);
    });
    return {
      balance: (balance == null ? void 0 : balance.quantity.numeric) || "0.00",
      symbol: (balance == null ? void 0 : balance.symbol) || ((_e2 = params.caipNetwork) == null ? void 0 : _e2.nativeCurrency.symbol) || ""
    };
  }
  async signMessage(params) {
    var _a, _b, _c2;
    const { provider, message, address } = params;
    if (!provider) {
      throw new Error("UniversalAdapter:signMessage - provider is undefined");
    }
    let signature = "";
    if (((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.chainNamespace) === ConstantsUtil$3.CHAIN.SOLANA) {
      const response = await provider.request({
        method: "solana_signMessage",
        params: {
          message: bs58.encode(new TextEncoder().encode(message)),
          pubkey: address
        }
      }, (_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.caipNetworkId);
      signature = response.signature;
    } else {
      signature = await provider.request({
        method: "personal_sign",
        params: [message, address]
      }, (_c2 = ChainController.state.activeCaipNetwork) == null ? void 0 : _c2.caipNetworkId);
    }
    return { signature };
  }
  // -- Transaction methods ---------------------------------------------------
  /**
   *
   * These methods are supported only on `wagmi` and `ethers` since the Solana SDK does not support them in the same way.
   * These function definition is to have a type parity between the clients. Currently not in use.
   */
  async estimateGas() {
    return Promise.resolve({
      gas: BigInt(0)
    });
  }
  async sendTransaction() {
    return Promise.resolve({
      hash: ""
    });
  }
  walletGetAssets(_params) {
    return Promise.resolve({});
  }
  async writeContract() {
    return Promise.resolve({
      hash: ""
    });
  }
  parseUnits() {
    return 0n;
  }
  formatUnits() {
    return "0";
  }
  async getCapabilities() {
    return Promise.resolve({});
  }
  async grantPermissions() {
    return Promise.resolve({});
  }
  async revokePermissions() {
    return Promise.resolve("0x");
  }
  async syncConnection() {
    return Promise.resolve({
      id: "WALLET_CONNECT",
      type: "WALLET_CONNECT",
      chainId: 1,
      provider: this.provider,
      address: ""
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async switchNetwork(params) {
    var _a, _b, _c2, _d, _e2, _f;
    const { caipNetwork } = params;
    const connector = this.getWalletConnectConnector();
    if (caipNetwork.chainNamespace === ConstantsUtil$3.CHAIN.EVM) {
      try {
        await ((_a = connector.provider) == null ? void 0 : _a.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(caipNetwork.id) }]
        }));
      } catch (switchError) {
        if (switchError.code === WcConstantsUtil.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || switchError.code === WcConstantsUtil.ERROR_INVALID_CHAIN_ID || switchError.code === WcConstantsUtil.ERROR_CODE_DEFAULT || ((_c2 = (_b = switchError == null ? void 0 : switchError.data) == null ? void 0 : _b.originalError) == null ? void 0 : _c2.code) === WcConstantsUtil.ERROR_CODE_UNRECOGNIZED_CHAIN_ID) {
          try {
            await ((_f = connector.provider) == null ? void 0 : _f.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: toHex(caipNetwork.id),
                  rpcUrls: [(_d = caipNetwork == null ? void 0 : caipNetwork.rpcUrls["chainDefault"]) == null ? void 0 : _d.http],
                  chainName: caipNetwork.name,
                  nativeCurrency: caipNetwork.nativeCurrency,
                  blockExplorerUrls: [(_e2 = caipNetwork.blockExplorers) == null ? void 0 : _e2.default.url]
                }
              ]
            }));
          } catch (error) {
            throw new Error("Chain is not supported");
          }
        }
      }
    }
    connector.provider.setDefaultChain(caipNetwork.caipNetworkId);
  }
  getWalletConnectProvider() {
    const connector = this.connectors.find((c2) => c2.type === "WALLET_CONNECT");
    const provider = connector == null ? void 0 : connector.provider;
    return provider;
  }
}
const FEATURE_KEYS = [
  "email",
  "socials",
  "swaps",
  "onramp",
  "activity",
  "reownBranding"
];
const featureConfig = {
  email: {
    apiFeatureName: "social_login",
    localFeatureName: "email",
    returnType: false,
    isLegacy: false,
    isAvailableOnBasic: false,
    processApi: (apiConfig) => {
      if (!(apiConfig == null ? void 0 : apiConfig.config)) {
        return false;
      }
      const config = apiConfig.config;
      return Boolean(apiConfig.isEnabled) && config.includes("email");
    },
    processFallback: (localValue) => {
      if (localValue === void 0) {
        return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.email;
      }
      return Boolean(localValue);
    }
  },
  socials: {
    apiFeatureName: "social_login",
    localFeatureName: "socials",
    returnType: false,
    isLegacy: false,
    isAvailableOnBasic: false,
    processApi: (apiConfig) => {
      if (!(apiConfig == null ? void 0 : apiConfig.config)) {
        return false;
      }
      const config = apiConfig.config;
      return Boolean(apiConfig.isEnabled) && config.length > 0 ? config.filter((s2) => s2 !== "email") : false;
    },
    processFallback: (localValue) => {
      if (localValue === void 0) {
        return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.socials;
      }
      if (typeof localValue === "boolean") {
        return localValue ? ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.socials : false;
      }
      return localValue;
    }
  },
  swaps: {
    apiFeatureName: "swap",
    localFeatureName: "swaps",
    returnType: false,
    isLegacy: false,
    isAvailableOnBasic: false,
    processApi: (apiConfig) => {
      if (!(apiConfig == null ? void 0 : apiConfig.config)) {
        return false;
      }
      const config = apiConfig.config;
      return Boolean(apiConfig.isEnabled) && config.length > 0 ? config : false;
    },
    processFallback: (localValue) => {
      if (localValue === void 0) {
        return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.swaps;
      }
      if (typeof localValue === "boolean") {
        return localValue ? ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.swaps : false;
      }
      return localValue;
    }
  },
  onramp: {
    apiFeatureName: "onramp",
    localFeatureName: "onramp",
    returnType: false,
    isLegacy: false,
    isAvailableOnBasic: false,
    processApi: (apiConfig) => {
      if (!(apiConfig == null ? void 0 : apiConfig.config)) {
        return false;
      }
      const config = apiConfig.config;
      return Boolean(apiConfig.isEnabled) && config.length > 0 ? config : false;
    },
    processFallback: (localValue) => {
      if (localValue === void 0) {
        return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.onramp;
      }
      if (typeof localValue === "boolean") {
        return localValue ? ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.onramp : false;
      }
      return localValue;
    }
  },
  activity: {
    apiFeatureName: "activity",
    localFeatureName: "history",
    returnType: false,
    isLegacy: true,
    isAvailableOnBasic: false,
    processApi: (apiConfig) => Boolean(apiConfig.isEnabled),
    processFallback: (localValue) => {
      if (localValue === void 0) {
        return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.activity;
      }
      return Boolean(localValue);
    }
  },
  reownBranding: {
    apiFeatureName: "reown_branding",
    localFeatureName: "reownBranding",
    returnType: false,
    isLegacy: false,
    isAvailableOnBasic: false,
    processApi: (apiConfig) => Boolean(apiConfig.isEnabled),
    processFallback: (localValue) => {
      if (localValue === void 0) {
        return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES.reownBranding;
      }
      return Boolean(localValue);
    }
  }
};
const ConfigUtil = {
  localSettingsOverridden: /* @__PURE__ */ new Set(),
  getApiConfig(id, apiProjectConfig) {
    return apiProjectConfig == null ? void 0 : apiProjectConfig.find((f3) => f3.id === id);
  },
  addWarning(localFeatureValue, featureKey) {
    if (localFeatureValue !== void 0) {
      const config = featureConfig[featureKey];
      const warningName = config.isLegacy ? `"features.${config.localFeatureName}" (now "${featureKey}")` : `"features.${featureKey}"`;
      this.localSettingsOverridden.add(warningName);
    }
  },
  processFeature(featureKey, localFeatures, apiProjectConfig, useApi, isBasic) {
    const config = featureConfig[featureKey];
    const localValue = localFeatures[config.localFeatureName];
    if (isBasic && !config.isAvailableOnBasic) {
      return false;
    }
    if (useApi) {
      const apiConfig = this.getApiConfig(config.apiFeatureName, apiProjectConfig);
      if ((apiConfig == null ? void 0 : apiConfig.config) === null) {
        return this.processFallbackFeature(featureKey, localValue);
      }
      if (!(apiConfig == null ? void 0 : apiConfig.config)) {
        return false;
      }
      if (localValue !== void 0) {
        this.addWarning(localValue, featureKey);
      }
      return this.processApiFeature(featureKey, apiConfig);
    }
    return this.processFallbackFeature(featureKey, localValue);
  },
  processApiFeature(featureKey, apiConfig) {
    return featureConfig[featureKey].processApi(apiConfig);
  },
  processFallbackFeature(featureKey, localValue) {
    return featureConfig[featureKey].processFallback(localValue);
  },
  async fetchRemoteFeatures(config) {
    const isBasic = config.basic ?? false;
    const localFeatures = config.features || {};
    this.localSettingsOverridden.clear();
    let apiProjectConfig = null;
    let useApiConfig = false;
    try {
      apiProjectConfig = await ApiController.fetchProjectConfig();
      useApiConfig = apiProjectConfig !== null && apiProjectConfig !== void 0;
    } catch (e) {
      console.warn("[Reown Config] Failed to fetch remote project configuration. Using local/default values.", e);
    }
    const remoteFeaturesConfig = useApiConfig && !isBasic ? ConstantsUtil$2.DEFAULT_REMOTE_FEATURES : ConstantsUtil$2.DEFAULT_REMOTE_FEATURES_DISABLED;
    try {
      for (const featureKey of FEATURE_KEYS) {
        const result = this.processFeature(featureKey, localFeatures, apiProjectConfig, useApiConfig, isBasic);
        Object.assign(remoteFeaturesConfig, { [featureKey]: result });
      }
    } catch (e) {
      console.warn("[Reown Config] Failed to process the configuration from Cloud. Using default values.", e);
      return ConstantsUtil$2.DEFAULT_REMOTE_FEATURES;
    }
    if (useApiConfig && this.localSettingsOverridden.size > 0) {
      const warningMessage = `Your local configuration for ${Array.from(this.localSettingsOverridden).join(", ")} was ignored because a remote configuration was successfully fetched. Please manage these features via your project dashboard on dashboard.reown.com.`;
      AlertController.open({
        shortMessage: "Local configuration ignored",
        longMessage: `[Reown Config Notice] ${warningMessage}`
      }, "warning");
    }
    return remoteFeaturesConfig;
  }
};
class AppKitBaseClient {
  constructor(options) {
    this.chainNamespaces = [];
    this.remoteFeatures = {};
    this.reportedAlertErrors = {};
    this.getCaipNetwork = (chainNamespace, id) => {
      var _a, _b, _c2, _d;
      if (chainNamespace) {
        const caipNetworkWithId = (_b = (_a = ChainController.getNetworkData(chainNamespace)) == null ? void 0 : _a.requestedCaipNetworks) == null ? void 0 : _b.find((c2) => c2.id === id);
        if (caipNetworkWithId) {
          return caipNetworkWithId;
        }
        const namespaceCaipNetwork = (_c2 = ChainController.getNetworkData(chainNamespace)) == null ? void 0 : _c2.caipNetwork;
        if (namespaceCaipNetwork) {
          return namespaceCaipNetwork;
        }
        const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(chainNamespace);
        return (_d = requestedCaipNetworks.filter((c2) => c2.chainNamespace === chainNamespace)) == null ? void 0 : _d[0];
      }
      return ChainController.state.activeCaipNetwork || this.defaultCaipNetwork;
    };
    this.getCaipNetworkId = () => {
      const network = this.getCaipNetwork();
      if (network) {
        return network.id;
      }
      return void 0;
    };
    this.getCaipNetworks = (namespace) => ChainController.getCaipNetworks(namespace);
    this.getActiveChainNamespace = () => ChainController.state.activeChain;
    this.setRequestedCaipNetworks = (requestedCaipNetworks, chain) => {
      ChainController.setRequestedCaipNetworks(requestedCaipNetworks, chain);
    };
    this.getApprovedCaipNetworkIds = () => ChainController.getAllApprovedCaipNetworkIds();
    this.getCaipAddress = (chainNamespace) => {
      if (ChainController.state.activeChain === chainNamespace || !chainNamespace) {
        return ChainController.state.activeCaipAddress;
      }
      return ChainController.getAccountProp("caipAddress", chainNamespace);
    };
    this.setClientId = (clientId) => {
      BlockchainApiController.setClientId(clientId);
    };
    this.getProvider = (namespace) => ProviderUtil.getProvider(namespace);
    this.getProviderType = (namespace) => ProviderUtil.getProviderId(namespace);
    this.getPreferredAccountType = (namespace) => {
      var _a;
      return (_a = AccountController.state.preferredAccountTypes) == null ? void 0 : _a[namespace];
    };
    this.setCaipAddress = (caipAddress, chain) => {
      AccountController.setCaipAddress(caipAddress, chain);
      if (caipAddress && OptionsController.state.enableEmbedded) {
        this.close();
      }
    };
    this.setBalance = (balance, balanceSymbol, chain) => {
      AccountController.setBalance(balance, balanceSymbol, chain);
    };
    this.setProfileName = (profileName, chain) => {
      AccountController.setProfileName(profileName, chain);
    };
    this.setProfileImage = (profileImage, chain) => {
      AccountController.setProfileImage(profileImage, chain);
    };
    this.setUser = (user, chain) => {
      AccountController.setUser(user, chain);
    };
    this.resetAccount = (chain) => {
      AccountController.resetAccount(chain);
    };
    this.setCaipNetwork = (caipNetwork) => {
      ChainController.setActiveCaipNetwork(caipNetwork);
    };
    this.setCaipNetworkOfNamespace = (caipNetwork, chainNamespace) => {
      ChainController.setChainNetworkData(chainNamespace, { caipNetwork });
    };
    this.setAllAccounts = (addresses, chain) => {
      AccountController.setAllAccounts(addresses, chain);
      OptionsController.setHasMultipleAddresses((addresses == null ? void 0 : addresses.length) > 1);
    };
    this.setStatus = (status, chain) => {
      AccountController.setStatus(status, chain);
      if (ConnectorController.isConnected()) {
        StorageUtil.setConnectionStatus("connected");
      } else {
        StorageUtil.setConnectionStatus("disconnected");
      }
    };
    this.getAddressByChainNamespace = (chainNamespace) => ChainController.getAccountProp("address", chainNamespace);
    this.setConnectors = (connectors) => {
      const allConnectors = [...ConnectorController.state.allConnectors, ...connectors];
      ConnectorController.setConnectors(allConnectors);
    };
    this.setConnections = (connections, chainNamespace) => {
      ConnectionController.setConnections(connections, chainNamespace);
    };
    this.fetchIdentity = (request) => BlockchainApiController.fetchIdentity(request);
    this.getReownName = (address) => EnsController.getNamesForAddress(address);
    this.getConnectors = () => ConnectorController.getConnectors();
    this.getConnectorImage = (connector) => AssetUtil.getConnectorImage(connector);
    this.setConnectedWalletInfo = (connectedWalletInfo, chain) => {
      const type = ProviderUtil.getProviderId(chain);
      const walletInfo = connectedWalletInfo ? { ...connectedWalletInfo, type } : void 0;
      AccountController.setConnectedWalletInfo(walletInfo, chain);
    };
    this.getIsConnectedState = () => Boolean(ChainController.state.activeCaipAddress);
    this.addAddressLabel = (address, label, chain) => {
      AccountController.addAddressLabel(address, label, chain);
    };
    this.removeAddressLabel = (address, chain) => {
      AccountController.removeAddressLabel(address, chain);
    };
    this.getAddress = (chainNamespace) => {
      if (ChainController.state.activeChain === chainNamespace || !chainNamespace) {
        return AccountController.state.address;
      }
      return ChainController.getAccountProp("address", chainNamespace);
    };
    this.setApprovedCaipNetworksData = (namespace) => ChainController.setApprovedCaipNetworksData(namespace);
    this.resetNetwork = (namespace) => {
      ChainController.resetNetwork(namespace);
    };
    this.addConnector = (connector) => {
      ConnectorController.addConnector(connector);
    };
    this.resetWcConnection = () => {
      ConnectionController.resetWcConnection();
    };
    this.setAddressExplorerUrl = (addressExplorerUrl, chain) => {
      AccountController.setAddressExplorerUrl(addressExplorerUrl, chain);
    };
    this.setSmartAccountDeployed = (isDeployed, chain) => {
      AccountController.setSmartAccountDeployed(isDeployed, chain);
    };
    this.setSmartAccountEnabledNetworks = (smartAccountEnabledNetworks, chain) => {
      ChainController.setSmartAccountEnabledNetworks(smartAccountEnabledNetworks, chain);
    };
    this.setPreferredAccountType = (preferredAccountType, chain) => {
      AccountController.setPreferredAccountType(preferredAccountType, chain);
    };
    this.setEIP6963Enabled = (enabled) => {
      OptionsController.setEIP6963Enabled(enabled);
    };
    this.handleUnsafeRPCRequest = () => {
      if (this.isOpen()) {
        if (this.isTransactionStackEmpty()) {
          return;
        }
        this.redirect("ApproveTransaction");
      } else {
        this.open({ view: "ApproveTransaction" });
      }
    };
    this.options = options;
    this.version = options.sdkVersion;
    this.caipNetworks = this.extendCaipNetworks(options);
    this.chainNamespaces = this.getChainNamespacesSet(options.adapters, this.caipNetworks);
    this.defaultCaipNetwork = this.extendDefaultCaipNetwork(options);
    this.chainAdapters = this.createAdapters(options.adapters);
    this.readyPromise = this.initialize(options);
  }
  getChainNamespacesSet(adapters, caipNetworks) {
    const adapterNamespaces = adapters == null ? void 0 : adapters.map((adapter) => adapter.namespace).filter((namespace) => Boolean(namespace));
    if (adapterNamespaces == null ? void 0 : adapterNamespaces.length) {
      return [...new Set(adapterNamespaces)];
    }
    const networkNamespaces = caipNetworks == null ? void 0 : caipNetworks.map((network) => network.chainNamespace);
    return [...new Set(networkNamespaces)];
  }
  async initialize(options) {
    var _a, _b, _c2;
    this.initializeProjectSettings(options);
    this.initControllers(options);
    await this.initChainAdapters();
    this.sendInitializeEvent(options);
    await this.syncExistingConnection();
    this.remoteFeatures = await ConfigUtil.fetchRemoteFeatures(options);
    OptionsController.setRemoteFeatures(this.remoteFeatures);
    if (this.remoteFeatures.onramp) {
      OnRampController.setOnrampProviders(this.remoteFeatures.onramp);
    }
    if (((_a = OptionsController.state.remoteFeatures) == null ? void 0 : _a.email) || Array.isArray((_b = OptionsController.state.remoteFeatures) == null ? void 0 : _b.socials) && ((_c2 = OptionsController.state.remoteFeatures) == null ? void 0 : _c2.socials.length) > 0) {
      await this.checkAllowedOrigins();
    }
  }
  async checkAllowedOrigins() {
    const allowedOrigins = await ApiController.fetchAllowedOrigins();
    if (allowedOrigins && CoreHelperUtil.isClient()) {
      const currentOrigin = window.location.origin;
      const isOriginAllowed = WcHelpersUtil.isOriginAllowed(currentOrigin, allowedOrigins, WcConstantsUtil.DEFAULT_ALLOWED_ANCESTORS);
      if (!isOriginAllowed) {
        AlertController.open(ErrorUtil.ALERT_ERRORS.INVALID_APP_CONFIGURATION, "error");
      }
    } else {
      AlertController.open(ErrorUtil.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
    }
  }
  sendInitializeEvent(options) {
    var _a;
    const { ...optionsCopy } = options;
    delete optionsCopy.adapters;
    delete optionsCopy.universalProvider;
    EventsController.sendEvent({
      type: "track",
      event: "INITIALIZE",
      properties: {
        ...optionsCopy,
        networks: options.networks.map((n) => n.id),
        siweConfig: {
          options: ((_a = options.siweConfig) == null ? void 0 : _a.options) || {}
        }
      }
    });
  }
  // -- Controllers initialization ---------------------------------------------------
  initControllers(options) {
    this.initializeOptionsController(options);
    this.initializeChainController(options);
    this.initializeThemeController(options);
    this.initializeConnectionController(options);
    this.initializeConnectorController();
  }
  initializeThemeController(options) {
    if (options.themeMode) {
      ThemeController.setThemeMode(options.themeMode);
    }
    if (options.themeVariables) {
      ThemeController.setThemeVariables(options.themeVariables);
    }
  }
  initializeChainController(options) {
    if (!this.connectionControllerClient || !this.networkControllerClient) {
      throw new Error("ConnectionControllerClient and NetworkControllerClient must be set");
    }
    ChainController.initialize(options.adapters ?? [], this.caipNetworks, {
      connectionControllerClient: this.connectionControllerClient,
      networkControllerClient: this.networkControllerClient
    });
    const network = this.getDefaultNetwork();
    if (network) {
      ChainController.setActiveCaipNetwork(network);
    }
  }
  initializeConnectionController(options) {
    ConnectionController.setWcBasic(options.basic ?? false);
  }
  initializeConnectorController() {
    ConnectorController.initialize(this.chainNamespaces);
  }
  initializeProjectSettings(options) {
    OptionsController.setProjectId(options.projectId);
    OptionsController.setSdkVersion(options.sdkVersion);
  }
  initializeOptionsController(options) {
    var _a;
    OptionsController.setDebug(options.debug !== false);
    OptionsController.setEnableWalletConnect(options.enableWalletConnect !== false);
    OptionsController.setEnableWalletGuide(options.enableWalletGuide !== false);
    OptionsController.setEnableWallets(options.enableWallets !== false);
    OptionsController.setEIP6963Enabled(options.enableEIP6963 !== false);
    OptionsController.setEnableNetworkSwitch(options.enableNetworkSwitch !== false);
    OptionsController.setEnableAuthLogger(options.enableAuthLogger !== false);
    OptionsController.setCustomRpcUrls(options.customRpcUrls);
    OptionsController.setEnableEmbedded(options.enableEmbedded);
    OptionsController.setAllWallets(options.allWallets);
    OptionsController.setIncludeWalletIds(options.includeWalletIds);
    OptionsController.setExcludeWalletIds(options.excludeWalletIds);
    OptionsController.setFeaturedWalletIds(options.featuredWalletIds);
    OptionsController.setTokens(options.tokens);
    OptionsController.setTermsConditionsUrl(options.termsConditionsUrl);
    OptionsController.setPrivacyPolicyUrl(options.privacyPolicyUrl);
    OptionsController.setCustomWallets(options.customWallets);
    OptionsController.setFeatures(options.features);
    OptionsController.setAllowUnsupportedChain(options.allowUnsupportedChain);
    OptionsController.setUniversalProviderConfigOverride(options.universalProviderConfigOverride);
    OptionsController.setPreferUniversalLinks(options.experimental_preferUniversalLinks);
    OptionsController.setDefaultAccountTypes(options.defaultAccountTypes);
    const storedAccountTypes = StorageUtil.getPreferredAccountTypes() || {};
    const defaultTypes = { ...OptionsController.state.defaultAccountTypes, ...storedAccountTypes };
    AccountController.setPreferredAccountTypes(defaultTypes);
    const defaultMetaData = this.getDefaultMetaData();
    if (!options.metadata && defaultMetaData) {
      options.metadata = defaultMetaData;
    }
    OptionsController.setMetadata(options.metadata);
    OptionsController.setDisableAppend(options.disableAppend);
    OptionsController.setEnableEmbedded(options.enableEmbedded);
    OptionsController.setSIWX(options.siwx);
    if (!options.projectId) {
      AlertController.open(ErrorUtil.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      return;
    }
    const evmAdapter = (_a = options.adapters) == null ? void 0 : _a.find((adapter) => adapter.namespace === ConstantsUtil$3.CHAIN.EVM);
    if (evmAdapter) {
      if (options.siweConfig) {
        if (options.siwx) {
          throw new Error("Cannot set both `siweConfig` and `siwx` options");
        }
        OptionsController.setSIWX(options.siweConfig.mapToSIWX());
      }
    }
  }
  getDefaultMetaData() {
    var _a, _b, _c2, _d;
    if (CoreHelperUtil.isClient()) {
      return {
        name: ((_b = (_a = document.getElementsByTagName("title")) == null ? void 0 : _a[0]) == null ? void 0 : _b.textContent) || "",
        description: ((_c2 = document.querySelector('meta[property="og:description"]')) == null ? void 0 : _c2.content) || "",
        url: window.location.origin,
        icons: [((_d = document.querySelector('link[rel~="icon"]')) == null ? void 0 : _d.href) || ""]
      };
    }
    return null;
  }
  // -- Network Initialization ---------------------------------------------------
  setUnsupportedNetwork(chainId) {
    const namespace = this.getActiveChainNamespace();
    if (namespace) {
      const unsupportedNetwork = CaipNetworksUtil.getUnsupportedNetwork(`${namespace}:${chainId}`);
      ChainController.setActiveCaipNetwork(unsupportedNetwork);
    }
  }
  getDefaultNetwork() {
    return CaipNetworksUtil.getCaipNetworkFromStorage(this.defaultCaipNetwork);
  }
  extendCaipNetwork(network, options) {
    const extendedNetwork = CaipNetworksUtil.extendCaipNetwork(network, {
      customNetworkImageUrls: options.chainImages,
      projectId: options.projectId
    });
    return extendedNetwork;
  }
  extendCaipNetworks(options) {
    const extendedNetworks = CaipNetworksUtil.extendCaipNetworks(options.networks, {
      customNetworkImageUrls: options.chainImages,
      customRpcUrls: options.customRpcUrls,
      projectId: options.projectId
    });
    return extendedNetworks;
  }
  extendDefaultCaipNetwork(options) {
    const defaultNetwork = options.networks.find((n) => {
      var _a;
      return n.id === ((_a = options.defaultNetwork) == null ? void 0 : _a.id);
    });
    const extendedNetwork = defaultNetwork ? CaipNetworksUtil.extendCaipNetwork(defaultNetwork, {
      customNetworkImageUrls: options.chainImages,
      customRpcUrls: options.customRpcUrls,
      projectId: options.projectId
    }) : void 0;
    return extendedNetwork;
  }
  async disconnectNamespace(namespace) {
    try {
      const adapter = this.getAdapter(namespace);
      const provider = ProviderUtil.getProvider(namespace);
      const providerType = ProviderUtil.getProviderId(namespace);
      const { caipAddress } = ChainController.getAccountData(namespace) || {};
      this.setLoading(true, namespace);
      if (caipAddress && (adapter == null ? void 0 : adapter.disconnect)) {
        await adapter.disconnect({ provider, providerType });
      }
      StorageUtil.removeConnectedNamespace(namespace);
      ProviderUtil.resetChain(namespace);
      this.setUser(void 0, namespace);
      this.setStatus("disconnected", namespace);
      this.setConnectedWalletInfo(void 0, namespace);
      ConnectorController.removeConnectorId(namespace);
      ChainController.resetAccount(namespace);
      ChainController.resetNetwork(namespace);
      this.setLoading(false, namespace);
    } catch (error) {
      this.setLoading(false, namespace);
      throw new Error(`Failed to disconnect chain ${namespace}: ${error.message}`);
    }
  }
  // -- Client Initialization ---------------------------------------------------
  createClients() {
    this.connectionControllerClient = {
      connectWalletConnect: async () => {
        var _a;
        const activeChain = ChainController.state.activeChain;
        const adapter = this.getAdapter(activeChain);
        const chainId = (_a = this.getCaipNetwork(activeChain)) == null ? void 0 : _a.id;
        if (!adapter) {
          throw new Error("Adapter not found");
        }
        const result = await adapter.connectWalletConnect(chainId);
        this.close();
        this.setClientId((result == null ? void 0 : result.clientId) || null);
        StorageUtil.setConnectedNamespaces([...ChainController.state.chains.keys()]);
        this.chainNamespaces.forEach((namespace) => {
          ConnectorController.setConnectorId(ConstantsUtil$1.CONNECTOR_TYPE_WALLET_CONNECT, namespace);
        });
        await this.syncWalletConnectAccount();
      },
      connectExternal: async ({ id, info, type, provider, chain, caipNetwork, socialUri }) => {
        var _a, _b, _c2, _d, _e2, _f;
        const activeChain = ChainController.state.activeChain;
        const chainToUse = chain || activeChain;
        const adapter = this.getAdapter(chainToUse);
        if (chain && chain !== activeChain && !caipNetwork) {
          const toConnectNetwork = this.getCaipNetworks().find((network) => network.chainNamespace === chain);
          if (toConnectNetwork) {
            this.setCaipNetwork(toConnectNetwork);
          }
        }
        if (!adapter) {
          throw new Error("Adapter not found");
        }
        const fallbackCaipNetwork = this.getCaipNetwork(chainToUse);
        const res = await adapter.connect({
          id,
          info,
          type,
          provider,
          socialUri,
          chainId: (caipNetwork == null ? void 0 : caipNetwork.id) || (fallbackCaipNetwork == null ? void 0 : fallbackCaipNetwork.id),
          rpcUrl: ((_c2 = (_b = (_a = caipNetwork == null ? void 0 : caipNetwork.rpcUrls) == null ? void 0 : _a.default) == null ? void 0 : _b.http) == null ? void 0 : _c2[0]) || ((_f = (_e2 = (_d = fallbackCaipNetwork == null ? void 0 : fallbackCaipNetwork.rpcUrls) == null ? void 0 : _d.default) == null ? void 0 : _e2.http) == null ? void 0 : _f[0])
        });
        if (!res) {
          return;
        }
        StorageUtil.addConnectedNamespace(chainToUse);
        this.syncProvider({ ...res, chainNamespace: chainToUse });
        const syncedAccounts = AccountController.state.allAccounts;
        const { accounts } = (syncedAccounts == null ? void 0 : syncedAccounts.length) > 0 ? (
          // eslint-disable-next-line line-comment-position
          // Using new array else the accounts will have the same reference and react will not re-render
          { accounts: [...syncedAccounts] }
        ) : await adapter.getAccounts({ namespace: chainToUse, id });
        this.setAllAccounts(accounts, chainToUse);
        this.setStatus("connected", chainToUse);
        this.syncConnectedWalletInfo(chainToUse);
      },
      reconnectExternal: async ({ id, info, type, provider }) => {
        var _a;
        const namespace = ChainController.state.activeChain;
        const adapter = this.getAdapter(namespace);
        if (adapter == null ? void 0 : adapter.reconnect) {
          await (adapter == null ? void 0 : adapter.reconnect({ id, info, type, provider, chainId: (_a = this.getCaipNetwork()) == null ? void 0 : _a.id }));
          StorageUtil.addConnectedNamespace(namespace);
          this.syncConnectedWalletInfo(namespace);
        }
      },
      disconnect: async (chainNamespace) => {
        const chainsToDisconnect = getChainsToDisconnect(chainNamespace);
        try {
          const disconnectResults = await Promise.allSettled(chainsToDisconnect.map(async ([ns2]) => this.disconnectNamespace(ns2)));
          SendController.resetSend();
          ConnectionController.resetWcConnection();
          await SIWXUtil.clearSessions();
          ConnectorController.setFilterByNamespace(void 0);
          const failures = disconnectResults.filter((result) => result.status === "rejected");
          if (failures.length > 0) {
            throw new Error(failures.map((f3) => f3.reason.message).join(", "));
          }
          StorageUtil.deleteConnectedSocialProvider();
          EventsController.sendEvent({
            type: "track",
            event: "DISCONNECT_SUCCESS",
            properties: {
              namespace: chainNamespace || "all"
            }
          });
        } catch (error) {
          throw new Error(`Failed to disconnect chains: ${error.message}`);
        }
      },
      checkInstalled: (ids) => {
        if (!ids) {
          return Boolean(window.ethereum);
        }
        return ids.some((id) => {
          var _a;
          return Boolean((_a = window.ethereum) == null ? void 0 : _a[String(id)]);
        });
      },
      signMessage: async (message) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        const result = await (adapter == null ? void 0 : adapter.signMessage({
          message,
          address: AccountController.state.address,
          provider: ProviderUtil.getProvider(ChainController.state.activeChain)
        }));
        return (result == null ? void 0 : result.signature) || "";
      },
      sendTransaction: async (args) => {
        const namespace = args.chainNamespace;
        if (ConstantsUtil$2.SEND_SUPPORTED_NAMESPACES.includes(namespace)) {
          const adapter = this.getAdapter(ChainController.state.activeChain);
          const provider = ProviderUtil.getProvider(namespace);
          const result = await (adapter == null ? void 0 : adapter.sendTransaction({
            ...args,
            caipNetwork: this.getCaipNetwork(),
            provider
          }));
          return (result == null ? void 0 : result.hash) || "";
        }
        return "";
      },
      estimateGas: async (args) => {
        if (args.chainNamespace === ConstantsUtil$3.CHAIN.EVM) {
          const adapter = this.getAdapter(ChainController.state.activeChain);
          const provider = ProviderUtil.getProvider(ChainController.state.activeChain);
          const caipNetwork = this.getCaipNetwork();
          if (!caipNetwork) {
            throw new Error("CaipNetwork is undefined");
          }
          const result = await (adapter == null ? void 0 : adapter.estimateGas({
            ...args,
            provider,
            caipNetwork
          }));
          return (result == null ? void 0 : result.gas) || 0n;
        }
        return 0n;
      },
      getEnsAvatar: async () => {
        var _a;
        await this.syncIdentity({
          address: AccountController.state.address,
          chainId: Number((_a = this.getCaipNetwork()) == null ? void 0 : _a.id),
          chainNamespace: ChainController.state.activeChain
        });
        return AccountController.state.profileImage || false;
      },
      getEnsAddress: async (name) => await WcHelpersUtil.resolveReownName(name),
      writeContract: async (args) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        const caipNetwork = this.getCaipNetwork();
        const caipAddress = this.getCaipAddress();
        const provider = ProviderUtil.getProvider(ChainController.state.activeChain);
        if (!caipNetwork || !caipAddress) {
          throw new Error("CaipNetwork or CaipAddress is undefined");
        }
        const result = await (adapter == null ? void 0 : adapter.writeContract({ ...args, caipNetwork, provider, caipAddress }));
        return result == null ? void 0 : result.hash;
      },
      parseUnits: (value, decimals) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        return (adapter == null ? void 0 : adapter.parseUnits({ value, decimals })) ?? 0n;
      },
      formatUnits: (value, decimals) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        return (adapter == null ? void 0 : adapter.formatUnits({ value, decimals })) ?? "0";
      },
      getCapabilities: async (params) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        return await (adapter == null ? void 0 : adapter.getCapabilities(params));
      },
      grantPermissions: async (params) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        return await (adapter == null ? void 0 : adapter.grantPermissions(params));
      },
      revokePermissions: async (params) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        if (adapter == null ? void 0 : adapter.revokePermissions) {
          return await adapter.revokePermissions(params);
        }
        return "0x";
      },
      walletGetAssets: async (params) => {
        const adapter = this.getAdapter(ChainController.state.activeChain);
        return await (adapter == null ? void 0 : adapter.walletGetAssets(params)) ?? {};
      },
      updateBalance: (namespace) => {
        const caipNetwork = this.getCaipNetwork(namespace);
        if (!caipNetwork || !AccountController.state.address) {
          return;
        }
        this.updateNativeBalance(AccountController.state.address, caipNetwork == null ? void 0 : caipNetwork.id, namespace);
      }
    };
    this.networkControllerClient = {
      switchCaipNetwork: async (caipNetwork) => await this.switchCaipNetwork(caipNetwork),
      // eslint-disable-next-line @typescript-eslint/require-await
      getApprovedCaipNetworksData: async () => this.getApprovedCaipNetworksData()
    };
    ConnectionController.setClient(this.connectionControllerClient);
  }
  getApprovedCaipNetworksData() {
    var _a, _b, _c2, _d, _e2;
    const providerType = ProviderUtil.getProviderId(ChainController.state.activeChain);
    if (providerType === ConstantsUtil$1.CONNECTOR_TYPE_WALLET_CONNECT) {
      const namespaces = (_b = (_a = this.universalProvider) == null ? void 0 : _a.session) == null ? void 0 : _b.namespaces;
      return {
        /*
         * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
         * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
         * will make it possible to switch to other networks.
         */
        supportsAllNetworks: ((_e2 = (_d = (_c2 = this.universalProvider) == null ? void 0 : _c2.session) == null ? void 0 : _d.peer) == null ? void 0 : _e2.metadata.name) === "MetaMask Wallet",
        approvedCaipNetworkIds: this.getChainsFromNamespaces(namespaces)
      };
    }
    return { supportsAllNetworks: true, approvedCaipNetworkIds: [] };
  }
  async switchCaipNetwork(caipNetwork) {
    if (!caipNetwork) {
      return;
    }
    const networkNamespace = caipNetwork.chainNamespace;
    const namespaceAddress = this.getAddressByChainNamespace(caipNetwork.chainNamespace);
    if (namespaceAddress) {
      const provider = ProviderUtil.getProvider(networkNamespace);
      const providerType = ProviderUtil.getProviderId(networkNamespace);
      if (caipNetwork.chainNamespace === ChainController.state.activeChain) {
        const adapter = this.getAdapter(networkNamespace);
        await (adapter == null ? void 0 : adapter.switchNetwork({ caipNetwork, provider, providerType }));
      } else {
        this.setCaipNetwork(caipNetwork);
        if (providerType === ConstantsUtil$1.CONNECTOR_TYPE_WALLET_CONNECT) {
          this.syncWalletConnectAccount();
        } else {
          const address = this.getAddressByChainNamespace(networkNamespace);
          if (address) {
            this.syncAccount({
              address,
              chainId: caipNetwork.id,
              chainNamespace: networkNamespace
            });
          }
        }
      }
    } else {
      this.setCaipNetwork(caipNetwork);
    }
  }
  getChainsFromNamespaces(namespaces = {}) {
    return Object.values(namespaces).flatMap((namespace) => {
      const chains = namespace.chains || [];
      const accountsChains = namespace.accounts.map((account) => {
        const { chainId, chainNamespace } = ParseUtil.parseCaipAddress(account);
        return `${chainNamespace}:${chainId}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...chains, ...accountsChains]));
    });
  }
  // -- Adapter Initialization ---------------------------------------------------
  createAdapters(blueprints) {
    this.createClients();
    return this.chainNamespaces.reduce((adapters, namespace) => {
      var _a;
      const blueprint = blueprints == null ? void 0 : blueprints.find((b2) => b2.namespace === namespace);
      if (blueprint) {
        blueprint.construct({
          namespace,
          projectId: (_a = this.options) == null ? void 0 : _a.projectId,
          networks: this.getCaipNetworks()
        });
        adapters[namespace] = blueprint;
      } else {
        adapters[namespace] = new UniversalAdapter({
          namespace,
          networks: this.getCaipNetworks()
        });
      }
      return adapters;
    }, {});
  }
  async initChainAdapter(namespace) {
    var _a;
    this.onConnectors(namespace);
    this.listenAdapter(namespace);
    await ((_a = this.chainAdapters) == null ? void 0 : _a[namespace].syncConnectors(this.options, this));
    await this.createUniversalProviderForAdapter(namespace);
  }
  async initChainAdapters() {
    await Promise.all(this.chainNamespaces.map(async (namespace) => {
      await this.initChainAdapter(namespace);
    }));
  }
  onConnectors(chainNamespace) {
    const adapter = this.getAdapter(chainNamespace);
    adapter == null ? void 0 : adapter.on("connectors", this.setConnectors.bind(this));
  }
  listenAdapter(chainNamespace) {
    const adapter = this.getAdapter(chainNamespace);
    if (!adapter) {
      return;
    }
    const connectionStatus = StorageUtil.getConnectionStatus();
    if (connectionStatus === "connected") {
      this.setStatus("connecting", chainNamespace);
    } else if (connectionStatus === "disconnected") {
      StorageUtil.clearAddressCache();
      this.setStatus(connectionStatus, chainNamespace);
    } else {
      this.setStatus(connectionStatus, chainNamespace);
    }
    adapter.on("switchNetwork", ({ address, chainId }) => {
      const caipNetwork = this.getCaipNetworks().find((n) => n.id === chainId || n.caipNetworkId === chainId);
      const isSameNamespace = ChainController.state.activeChain === chainNamespace;
      const accountAddress = ChainController.getAccountProp("address", chainNamespace);
      if (caipNetwork) {
        const account = isSameNamespace && address ? address : accountAddress;
        if (account) {
          this.syncAccount({ address: account, chainId: caipNetwork.id, chainNamespace });
        }
      } else {
        this.setUnsupportedNetwork(chainId);
      }
    });
    adapter.on("disconnect", this.disconnect.bind(this, chainNamespace));
    adapter.on("connections", (connections) => {
      this.setConnections(connections, chainNamespace);
    });
    adapter.on("pendingTransactions", () => {
      const address = AccountController.state.address;
      const activeCaipNetwork = ChainController.state.activeCaipNetwork;
      if (!address || !(activeCaipNetwork == null ? void 0 : activeCaipNetwork.id)) {
        return;
      }
      this.updateNativeBalance(address, activeCaipNetwork.id, activeCaipNetwork.chainNamespace);
    });
    adapter.on("accountChanged", ({ address, chainId }) => {
      var _a, _b;
      const isActiveChain = ChainController.state.activeChain === chainNamespace;
      if (isActiveChain && chainId) {
        this.syncAccount({
          address,
          chainId,
          chainNamespace
        });
      } else if (isActiveChain && ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.id)) {
        this.syncAccount({
          address,
          chainId: (_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.id,
          chainNamespace
        });
      } else {
        this.syncAccountInfo(address, chainId, chainNamespace);
      }
      this.syncAllAccounts(chainNamespace);
    });
  }
  async createUniversalProviderForAdapter(chainNamespace) {
    var _a, _b, _c2;
    await this.getUniversalProvider();
    if (this.universalProvider) {
      (_c2 = (_b = (_a = this.chainAdapters) == null ? void 0 : _a[chainNamespace]) == null ? void 0 : _b.setUniversalProvider) == null ? void 0 : _c2.call(_b, this.universalProvider);
    }
  }
  // -- Connection Sync ---------------------------------------------------
  async syncExistingConnection() {
    await Promise.allSettled(this.chainNamespaces.map((namespace) => this.syncNamespaceConnection(namespace)));
  }
  async syncNamespaceConnection(namespace) {
    try {
      if (namespace === ConstantsUtil$3.CHAIN.EVM && CoreHelperUtil.isSafeApp()) {
        ConnectorController.setConnectorId(ConstantsUtil$3.CONNECTOR_ID.SAFE, namespace);
      }
      const connectorId = ConnectorController.getConnectorId(namespace);
      this.setStatus("connecting", namespace);
      switch (connectorId) {
        case ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT:
          await this.syncWalletConnectAccount();
          break;
        case ConstantsUtil$3.CONNECTOR_ID.AUTH:
          break;
        default:
          await this.syncAdapterConnection(namespace);
      }
    } catch (err) {
      console.warn("AppKit couldn't sync existing connection", err);
      this.setStatus("disconnected", namespace);
    }
  }
  async syncAdapterConnection(namespace) {
    var _a, _b, _c2;
    const adapter = this.getAdapter(namespace);
    const connectorId = ConnectorController.getConnectorId(namespace);
    const caipNetwork = this.getCaipNetwork(namespace);
    const connectors = ConnectorController.getConnectors(namespace);
    const connector = connectors.find((c2) => c2.id === connectorId);
    try {
      if (!adapter || !connector) {
        throw new Error(`Adapter or connector not found for namespace ${namespace}`);
      }
      if (!(caipNetwork == null ? void 0 : caipNetwork.id)) {
        throw new Error("CaipNetwork not found");
      }
      const connection = await (adapter == null ? void 0 : adapter.syncConnection({
        namespace,
        id: connector.id,
        chainId: caipNetwork.id,
        rpcUrl: (_c2 = (_b = (_a = caipNetwork == null ? void 0 : caipNetwork.rpcUrls) == null ? void 0 : _a.default) == null ? void 0 : _b.http) == null ? void 0 : _c2[0]
      }));
      if (connection) {
        const accounts = await (adapter == null ? void 0 : adapter.getAccounts({
          namespace,
          id: connector.id
        }));
        if (accounts && accounts.accounts.length > 0) {
          this.setAllAccounts(accounts.accounts, namespace);
        } else {
          this.setAllAccounts([CoreHelperUtil.createAccount(namespace, connection.address, "eoa")], namespace);
        }
        this.syncProvider({ ...connection, chainNamespace: namespace });
        await this.syncAccount({ ...connection, chainNamespace: namespace });
        this.setStatus("connected", namespace);
      } else {
        this.setStatus("disconnected", namespace);
      }
    } catch (e) {
      this.setStatus("disconnected", namespace);
    }
  }
  async syncWalletConnectAccount() {
    const syncTasks = this.chainNamespaces.map(async (chainNamespace) => {
      var _a, _b, _c2, _d, _e2;
      const adapter = this.getAdapter(chainNamespace);
      const namespaceAccounts = ((_d = (_c2 = (_b = (_a = this.universalProvider) == null ? void 0 : _a.session) == null ? void 0 : _b.namespaces) == null ? void 0 : _c2[chainNamespace]) == null ? void 0 : _d.accounts) || [];
      const activeChainId = (_e2 = ChainController.state.activeCaipNetwork) == null ? void 0 : _e2.id;
      const sessionAddress = namespaceAccounts.find((account) => {
        const { chainId } = ParseUtil.parseCaipAddress(account);
        return chainId === (activeChainId == null ? void 0 : activeChainId.toString());
      }) || namespaceAccounts[0];
      if (sessionAddress) {
        const caipAddress = ParseUtil.validateCaipAddress(sessionAddress);
        const { chainId, address } = ParseUtil.parseCaipAddress(caipAddress);
        ProviderUtil.setProviderId(chainNamespace, ConstantsUtil$1.CONNECTOR_TYPE_WALLET_CONNECT);
        if (this.caipNetworks && ChainController.state.activeCaipNetwork && (adapter == null ? void 0 : adapter.namespace) !== ConstantsUtil$3.CHAIN.EVM) {
          const provider = adapter == null ? void 0 : adapter.getWalletConnectProvider({
            caipNetworks: this.getCaipNetworks(),
            provider: this.universalProvider,
            activeCaipNetwork: ChainController.state.activeCaipNetwork
          });
          ProviderUtil.setProvider(chainNamespace, provider);
        } else {
          ProviderUtil.setProvider(chainNamespace, this.universalProvider);
        }
        ConnectorController.setConnectorId(ConstantsUtil$3.CONNECTOR_ID.WALLET_CONNECT, chainNamespace);
        StorageUtil.addConnectedNamespace(chainNamespace);
        this.syncWalletConnectAccounts(chainNamespace);
        await this.syncAccount({
          address,
          chainId,
          chainNamespace
        });
      } else {
        this.setStatus("disconnected", chainNamespace);
      }
      this.syncConnectedWalletInfo(chainNamespace);
      await ChainController.setApprovedCaipNetworksData(chainNamespace);
    });
    await Promise.all(syncTasks);
  }
  syncWalletConnectAccounts(chainNamespace) {
    var _a, _b, _c2, _d, _e2;
    const addresses = (_e2 = (_d = (_c2 = (_b = (_a = this.universalProvider) == null ? void 0 : _a.session) == null ? void 0 : _b.namespaces) == null ? void 0 : _c2[chainNamespace]) == null ? void 0 : _d.accounts) == null ? void 0 : _e2.map((account) => {
      const { address } = ParseUtil.parseCaipAddress(account);
      return address;
    }).filter((address, index, self) => self.indexOf(address) === index);
    if (addresses) {
      this.setAllAccounts(addresses.map((address) => CoreHelperUtil.createAccount(chainNamespace, address, chainNamespace === "bip122" ? "payment" : "eoa")), chainNamespace);
    }
  }
  syncProvider({ type, provider, id, chainNamespace }) {
    ProviderUtil.setProviderId(chainNamespace, type);
    ProviderUtil.setProvider(chainNamespace, provider);
    ConnectorController.setConnectorId(id, chainNamespace);
  }
  async syncAllAccounts(namespace) {
    const connectorId = ConnectorController.getConnectorId(namespace);
    if (!connectorId) {
      return;
    }
    const adapter = this.getAdapter(namespace);
    const accounts = await (adapter == null ? void 0 : adapter.getAccounts({ namespace, id: connectorId }));
    if (accounts && accounts.accounts.length > 0) {
      this.setAllAccounts(accounts.accounts, namespace);
    }
  }
  async syncAccount(params) {
    var _a, _b;
    const isActiveNamespace = params.chainNamespace === ChainController.state.activeChain;
    const networkOfChain = ChainController.getCaipNetworkByNamespace(params.chainNamespace, params.chainId);
    const { address, chainId, chainNamespace } = params;
    const { chainId: activeChainId } = StorageUtil.getActiveNetworkProps();
    const chainIdToUse = chainId || activeChainId;
    const isUnsupportedNetwork = ((_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.name) === ConstantsUtil$3.UNSUPPORTED_NETWORK_NAME;
    const shouldSupportAllNetworks = ChainController.getNetworkProp("supportsAllNetworks", chainNamespace);
    this.setStatus("connected", chainNamespace);
    if (isUnsupportedNetwork && !shouldSupportAllNetworks) {
      return;
    }
    if (chainIdToUse) {
      let caipNetwork = this.getCaipNetworks().find((n) => n.id.toString() === chainIdToUse.toString());
      let fallbackCaipNetwork = this.getCaipNetworks().find((n) => n.chainNamespace === chainNamespace);
      if (!shouldSupportAllNetworks && !caipNetwork && !fallbackCaipNetwork) {
        const caipNetworkIds = this.getApprovedCaipNetworkIds() || [];
        const caipNetworkId = caipNetworkIds.find((id) => {
          var _a2;
          return ((_a2 = ParseUtil.parseCaipNetworkId(id)) == null ? void 0 : _a2.chainId) === chainIdToUse.toString();
        });
        const fallBackCaipNetworkId = caipNetworkIds.find((id) => {
          var _a2;
          return ((_a2 = ParseUtil.parseCaipNetworkId(id)) == null ? void 0 : _a2.chainNamespace) === chainNamespace;
        });
        caipNetwork = this.getCaipNetworks().find((n) => n.caipNetworkId === caipNetworkId);
        fallbackCaipNetwork = this.getCaipNetworks().find((n) => n.caipNetworkId === fallBackCaipNetworkId || // This is a workaround used in Solana network to support deprecated caipNetworkId
        "deprecatedCaipNetworkId" in n && n.deprecatedCaipNetworkId === fallBackCaipNetworkId);
      }
      const network = caipNetwork || fallbackCaipNetwork;
      if ((network == null ? void 0 : network.chainNamespace) === ChainController.state.activeChain) {
        if (OptionsController.state.enableNetworkSwitch && !OptionsController.state.allowUnsupportedChain && ((_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.name) === ConstantsUtil$3.UNSUPPORTED_NETWORK_NAME) {
          ChainController.showUnsupportedChainUI();
        } else {
          this.setCaipNetwork(network);
        }
      } else if (!isActiveNamespace) {
        if (networkOfChain) {
          this.setCaipNetworkOfNamespace(networkOfChain, chainNamespace);
        }
      }
      this.syncConnectedWalletInfo(chainNamespace);
      if (!HelpersUtil.isLowerCaseMatch(address, AccountController.state.address)) {
        this.syncAccountInfo(address, network == null ? void 0 : network.id, chainNamespace);
      }
      if (isActiveNamespace) {
        await this.syncBalance({ address, chainId: network == null ? void 0 : network.id, chainNamespace });
      } else {
        await this.syncBalance({ address, chainId: networkOfChain == null ? void 0 : networkOfChain.id, chainNamespace });
      }
    }
  }
  async syncAccountInfo(address, chainId, chainNamespace) {
    const caipAddress = this.getCaipAddress(chainNamespace);
    const newChainId = chainId || (caipAddress == null ? void 0 : caipAddress.split(":")[1]);
    if (!newChainId) {
      return;
    }
    const newCaipAddress = `${chainNamespace}:${newChainId}:${address}`;
    this.setCaipAddress(newCaipAddress, chainNamespace);
    await this.syncIdentity({
      address,
      chainId: newChainId,
      chainNamespace
    });
  }
  async syncReownName(address, chainNamespace) {
    try {
      const registeredWcNames = await this.getReownName(address);
      if (registeredWcNames[0]) {
        const wcName = registeredWcNames[0];
        this.setProfileName(wcName.name, chainNamespace);
      } else {
        this.setProfileName(null, chainNamespace);
      }
    } catch {
      this.setProfileName(null, chainNamespace);
    }
  }
  syncConnectedWalletInfo(chainNamespace) {
    var _a;
    const connectorId = ConnectorController.getConnectorId(chainNamespace);
    const providerType = ProviderUtil.getProviderId(chainNamespace);
    if (providerType === ConstantsUtil$1.CONNECTOR_TYPE_ANNOUNCED || providerType === ConstantsUtil$1.CONNECTOR_TYPE_INJECTED) {
      if (connectorId) {
        const connector = this.getConnectors().find((c2) => c2.id === connectorId);
        if (connector) {
          const { info, name, imageUrl } = connector;
          const icon = imageUrl || this.getConnectorImage(connector);
          this.setConnectedWalletInfo({ name, icon, ...info }, chainNamespace);
        }
      }
    } else if (providerType === ConstantsUtil$1.CONNECTOR_TYPE_WALLET_CONNECT) {
      const provider = ProviderUtil.getProvider(chainNamespace);
      if (provider == null ? void 0 : provider.session) {
        this.setConnectedWalletInfo({
          ...provider.session.peer.metadata,
          name: provider.session.peer.metadata.name,
          icon: (_a = provider.session.peer.metadata.icons) == null ? void 0 : _a[0]
        }, chainNamespace);
      }
    } else if (connectorId) {
      if (connectorId === ConstantsUtil$3.CONNECTOR_ID.COINBASE) {
        const connector = this.getConnectors().find((c2) => c2.id === ConstantsUtil$3.CONNECTOR_ID.COINBASE);
        this.setConnectedWalletInfo({ name: "Coinbase Wallet", icon: this.getConnectorImage(connector) }, chainNamespace);
      }
    }
  }
  async syncBalance(params) {
    const caipNetwork = NetworkUtil$1.getNetworksByNamespace(this.getCaipNetworks(), params.chainNamespace).find((n) => {
      var _a;
      return n.id.toString() === ((_a = params.chainId) == null ? void 0 : _a.toString());
    });
    if (!caipNetwork || !params.chainId) {
      return;
    }
    await this.updateNativeBalance(params.address, params.chainId, params.chainNamespace);
  }
  async ready() {
    await this.readyPromise;
  }
  async updateNativeBalance(address, chainId, namespace) {
    const adapter = this.getAdapter(namespace);
    const caipNetwork = ChainController.getCaipNetworkByNamespace(namespace, chainId);
    if (adapter) {
      const balance = await adapter.getBalance({
        address,
        chainId,
        caipNetwork,
        tokens: this.options.tokens
      });
      this.setBalance(balance.balance, balance.symbol, namespace);
      return balance;
    }
    return void 0;
  }
  // -- Universal Provider ---------------------------------------------------
  async initializeUniversalAdapter() {
    var _a, _b, _c2, _d, _e2, _f, _g, _h, _i2, _j;
    const logger = LoggerUtil.createLogger((error, ...args) => {
      if (error) {
        this.handleAlertError(error);
      }
      console.error(...args);
    });
    const universalProviderOptions = {
      projectId: (_a = this.options) == null ? void 0 : _a.projectId,
      metadata: {
        name: ((_b = this.options) == null ? void 0 : _b.metadata) ? (_c2 = this.options) == null ? void 0 : _c2.metadata.name : "",
        description: ((_d = this.options) == null ? void 0 : _d.metadata) ? (_e2 = this.options) == null ? void 0 : _e2.metadata.description : "",
        url: ((_f = this.options) == null ? void 0 : _f.metadata) ? (_g = this.options) == null ? void 0 : _g.metadata.url : "",
        icons: ((_h = this.options) == null ? void 0 : _h.metadata) ? (_i2 = this.options) == null ? void 0 : _i2.metadata.icons : [""]
      },
      logger
    };
    OptionsController.setManualWCControl(Boolean((_j = this.options) == null ? void 0 : _j.manualWCControl));
    this.universalProvider = this.options.universalProvider ?? await B.init(universalProviderOptions);
    this.listenWalletConnect();
  }
  listenWalletConnect() {
    if (this.universalProvider) {
      this.universalProvider.on("display_uri", (uri) => {
        ConnectionController.setUri(uri);
      });
      this.universalProvider.on("connect", ConnectionController.finalizeWcConnection);
      this.universalProvider.on("disconnect", () => {
        this.chainNamespaces.forEach((namespace) => {
          this.resetAccount(namespace);
        });
        ConnectionController.resetWcConnection();
      });
      this.universalProvider.on("chainChanged", (chainId) => {
        const caipNetwork = this.getCaipNetworks().find((c2) => c2.id == chainId);
        const currentCaipNetwork = this.getCaipNetwork();
        if (!caipNetwork) {
          this.setUnsupportedNetwork(chainId);
          return;
        }
        if ((currentCaipNetwork == null ? void 0 : currentCaipNetwork.id) !== (caipNetwork == null ? void 0 : caipNetwork.id)) {
          this.setCaipNetwork(caipNetwork);
        }
      });
      this.universalProvider.on("session_event", (callbackData) => {
        if (WcHelpersUtil.isSessionEventData(callbackData)) {
          const { name, data } = callbackData.params.event;
          if (name === "accountsChanged" && Array.isArray(data) && CoreHelperUtil.isCaipAddress(data[0])) {
            this.syncAccount(ParseUtil.parseCaipAddress(data[0]));
          }
        }
      });
    }
  }
  createUniversalProvider() {
    var _a;
    if (!this.universalProviderInitPromise && CoreHelperUtil.isClient() && ((_a = this.options) == null ? void 0 : _a.projectId)) {
      this.universalProviderInitPromise = this.initializeUniversalAdapter();
    }
    return this.universalProviderInitPromise;
  }
  async getUniversalProvider() {
    if (!this.universalProvider) {
      try {
        await this.createUniversalProvider();
      } catch (err) {
        EventsController.sendEvent({
          type: "error",
          event: "INTERNAL_SDK_ERROR",
          properties: {
            errorType: "UniversalProviderInitError",
            errorMessage: err instanceof Error ? err.message : "Unknown",
            uncaught: false
          }
        });
        console.error("AppKit:getUniversalProvider - Cannot create provider", err);
      }
    }
    return this.universalProvider;
  }
  // - Utils -------------------------------------------------------------------
  handleAlertError(error) {
    const matchedUniversalProviderError = Object.entries(ErrorUtil.UniversalProviderErrors).find(([, { message: message2 }]) => error.message.includes(message2));
    const [errorKey, errorValue] = matchedUniversalProviderError ?? [];
    const { message, alertErrorKey } = errorValue ?? {};
    if (errorKey && message && !this.reportedAlertErrors[errorKey]) {
      const alertError = ErrorUtil.ALERT_ERRORS[alertErrorKey];
      if (alertError) {
        AlertController.open(alertError, "error");
        this.reportedAlertErrors[errorKey] = true;
      }
    }
  }
  getAdapter(namespace) {
    var _a;
    if (!namespace) {
      return void 0;
    }
    return (_a = this.chainAdapters) == null ? void 0 : _a[namespace];
  }
  createAdapter(blueprint) {
    var _a;
    if (!blueprint) {
      return;
    }
    const namespace = blueprint.namespace;
    if (!namespace) {
      return;
    }
    this.createClients();
    const adapterBlueprint = blueprint;
    adapterBlueprint.namespace = namespace;
    adapterBlueprint.construct({
      namespace,
      projectId: (_a = this.options) == null ? void 0 : _a.projectId,
      networks: this.getCaipNetworks()
    });
    if (!this.chainNamespaces.includes(namespace)) {
      this.chainNamespaces.push(namespace);
    }
    if (this.chainAdapters) {
      this.chainAdapters[namespace] = adapterBlueprint;
    }
  }
  // -- Public -------------------------------------------------------------------
  async open(options) {
    await this.injectModalUi();
    if (options == null ? void 0 : options.uri) {
      ConnectionController.setUri(options.uri);
    }
    if (options == null ? void 0 : options.arguments) {
      switch (options == null ? void 0 : options.view) {
        case "Swap":
          return ModalController.open({ ...options, data: { swap: options.arguments } });
      }
    }
    return ModalController.open(options);
  }
  async close() {
    await this.injectModalUi();
    ModalController.close();
  }
  setLoading(loading, namespace) {
    ModalController.setLoading(loading, namespace);
  }
  async disconnect(chainNamespace) {
    await ConnectionController.disconnect(chainNamespace);
  }
  getSIWX() {
    return OptionsController.state.siwx;
  }
  // -- review these -------------------------------------------------------------------
  getError() {
    return "";
  }
  getChainId() {
    var _a;
    return (_a = ChainController.state.activeCaipNetwork) == null ? void 0 : _a.id;
  }
  async switchNetwork(appKitNetwork) {
    const network = this.getCaipNetworks().find((n) => n.id === appKitNetwork.id);
    if (!network) {
      AlertController.open(ErrorUtil.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, "error");
      return;
    }
    await ChainController.switchActiveNetwork(network);
  }
  getWalletProvider() {
    return ChainController.state.activeChain ? ProviderUtil.state.providers[ChainController.state.activeChain] : null;
  }
  getWalletProviderType() {
    return ProviderUtil.getProviderId(ChainController.state.activeChain);
  }
  subscribeProviders(callback) {
    return ProviderUtil.subscribeProviders(callback);
  }
  getThemeMode() {
    return ThemeController.state.themeMode;
  }
  getThemeVariables() {
    return ThemeController.state.themeVariables;
  }
  setThemeMode(themeMode) {
    ThemeController.setThemeMode(themeMode);
    setColorTheme(ThemeController.state.themeMode);
  }
  setTermsConditionsUrl(termsConditionsUrl) {
    OptionsController.setTermsConditionsUrl(termsConditionsUrl);
  }
  setPrivacyPolicyUrl(privacyPolicyUrl) {
    OptionsController.setPrivacyPolicyUrl(privacyPolicyUrl);
  }
  setThemeVariables(themeVariables) {
    ThemeController.setThemeVariables(themeVariables);
    setThemeVariables(ThemeController.state.themeVariables);
  }
  subscribeTheme(callback) {
    return ThemeController.subscribe(callback);
  }
  getWalletInfo() {
    return AccountController.state.connectedWalletInfo;
  }
  getAccount(namespace) {
    var _a;
    const authConnector = ConnectorController.getAuthConnector(namespace);
    const accountState2 = ChainController.getAccountData(namespace);
    const activeChain = ChainController.state.activeChain;
    const activeConnectorId = StorageUtil.getConnectedConnectorId(namespace || activeChain);
    if (!accountState2) {
      return void 0;
    }
    return {
      allAccounts: accountState2.allAccounts,
      caipAddress: accountState2.caipAddress,
      address: CoreHelperUtil.getPlainAddress(accountState2.caipAddress),
      isConnected: Boolean(accountState2.caipAddress),
      status: accountState2.status,
      embeddedWalletInfo: authConnector && activeConnectorId === ConstantsUtil$3.CONNECTOR_ID.AUTH ? {
        user: accountState2.user ? {
          ...accountState2.user,
          /*
           * Getting the username from the chain controller works well for social logins,
           * but Farcaster uses a different connection flow and doesn't emit the username via events.
           * Since the username is stored in local storage before the chain controller updates,
           * it's safe to use the local storage value here.
           */
          username: StorageUtil.getConnectedSocialUsername()
        } : void 0,
        authProvider: accountState2.socialProvider || "email",
        accountType: (_a = accountState2.preferredAccountTypes) == null ? void 0 : _a[namespace || activeChain],
        isSmartAccountDeployed: Boolean(accountState2.smartAccountDeployed)
      } : void 0
    };
  }
  subscribeAccount(callback, namespace) {
    const updateVal = () => {
      const account = this.getAccount(namespace);
      if (!account) {
        return;
      }
      callback(account);
    };
    if (namespace) {
      ChainController.subscribeChainProp("accountState", updateVal, namespace);
    } else {
      ChainController.subscribe(updateVal);
    }
    ConnectorController.subscribe(updateVal);
  }
  subscribeNetwork(callback) {
    return ChainController.subscribe(({ activeCaipNetwork }) => {
      callback({
        caipNetwork: activeCaipNetwork,
        chainId: activeCaipNetwork == null ? void 0 : activeCaipNetwork.id,
        caipNetworkId: activeCaipNetwork == null ? void 0 : activeCaipNetwork.caipNetworkId
      });
    });
  }
  subscribeWalletInfo(callback) {
    return AccountController.subscribeKey("connectedWalletInfo", callback);
  }
  subscribeShouldUpdateToAddress(callback) {
    AccountController.subscribeKey("shouldUpdateToAddress", callback);
  }
  subscribeCaipNetworkChange(callback) {
    ChainController.subscribeKey("activeCaipNetwork", callback);
  }
  getState() {
    return PublicStateController.state;
  }
  subscribeState(callback) {
    return PublicStateController.subscribe(callback);
  }
  showErrorMessage(message) {
    SnackController.showError(message);
  }
  showSuccessMessage(message) {
    SnackController.showSuccess(message);
  }
  getEvent() {
    return { ...EventsController.state };
  }
  subscribeEvents(callback) {
    return EventsController.subscribe(callback);
  }
  replace(route) {
    RouterController.replace(route);
  }
  redirect(route) {
    RouterController.push(route);
  }
  popTransactionStack(status) {
    RouterController.popTransactionStack(status);
  }
  isOpen() {
    return ModalController.state.open;
  }
  isTransactionStackEmpty() {
    return RouterController.state.transactionStack.length === 0;
  }
  static getInstance() {
    return this.instance;
  }
  updateFeatures(newFeatures) {
    OptionsController.setFeatures(newFeatures);
  }
  updateRemoteFeatures(newRemoteFeatures) {
    OptionsController.setRemoteFeatures(newRemoteFeatures);
  }
  updateOptions(newOptions) {
    const currentOptions = OptionsController.state || {};
    const updatedOptions = { ...currentOptions, ...newOptions };
    OptionsController.setOptions(updatedOptions);
  }
  setConnectMethodsOrder(connectMethodsOrder) {
    OptionsController.setConnectMethodsOrder(connectMethodsOrder);
  }
  setWalletFeaturesOrder(walletFeaturesOrder) {
    OptionsController.setWalletFeaturesOrder(walletFeaturesOrder);
  }
  setCollapseWallets(collapseWallets) {
    OptionsController.setCollapseWallets(collapseWallets);
  }
  setSocialsOrder(socialsOrder) {
    OptionsController.setSocialsOrder(socialsOrder);
  }
  getConnectMethodsOrder() {
    return WalletUtil.getConnectOrderMethod(OptionsController.state.features, ConnectorController.getConnectors());
  }
  /**
   * Adds a network to an existing adapter in AppKit.
   * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
   * @param network - The network configuration to add
   * @throws Error if adapter for namespace doesn't exist
   */
  addNetwork(namespace, network) {
    if (this.chainAdapters && !this.chainAdapters[namespace]) {
      throw new Error(`Adapter for namespace ${namespace} doesn't exist`);
    }
    const extendedNetwork = this.extendCaipNetwork(network, this.options);
    if (!this.getCaipNetworks().find((n) => n.id === extendedNetwork.id)) {
      ChainController.addNetwork(extendedNetwork);
    }
  }
  /**
   * Removes a network from an existing adapter in AppKit.
   * @param namespace - The chain namespace the network belongs to
   * @param networkId - The network ID to remove
   * @throws Error if adapter for namespace doesn't exist or if removing last network
   */
  removeNetwork(namespace, networkId) {
    if (this.chainAdapters && !this.chainAdapters[namespace]) {
      throw new Error(`Adapter for namespace ${namespace} doesn't exist`);
    }
    const networkToRemove = this.getCaipNetworks().find((n) => n.id === networkId);
    if (!networkToRemove) {
      return;
    }
    ChainController.removeNetwork(namespace, networkId);
  }
}
let isInitialized = false;
class AppKit extends AppKitBaseClient {
  // -- Overrides --------------------------------------------------------------
  async open(options) {
    const isConnected = ConnectorController.isConnected();
    if (!isConnected) {
      await super.open(options);
    }
  }
  async close() {
    await super.close();
    if (this.options.manualWCControl) {
      ConnectionController.finalizeWcConnection();
    }
  }
  async syncIdentity(_request) {
    return Promise.resolve();
  }
  async syncBalance(_params) {
    return Promise.resolve();
  }
  async injectModalUi() {
    if (!isInitialized && CoreHelperUtil.isClient()) {
      await import("./basic-B1_2redr.js");
      await import("./w3m-modal-iax8cENS.js");
      const isElementCreated = document.querySelector("w3m-modal");
      if (!isElementCreated) {
        const modal = document.createElement("w3m-modal");
        if (!OptionsController.state.disableAppend && !OptionsController.state.enableEmbedded) {
          document.body.insertAdjacentElement("beforeend", modal);
        }
      }
      isInitialized = true;
    }
  }
}
const PACKAGE_VERSION = "1.7.8";
function createAppKit(options) {
  return new AppKit({
    ...options,
    basic: true,
    sdkVersion: `html-core-${PACKAGE_VERSION}`
  });
}
const core = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AppKit,
  createAppKit
}, Symbol.toStringTag, { value: "Module" }));
export {
  AlertController as A,
  ChainController as C,
  EventsController as E,
  ModalController as M,
  OptionsController as O,
  RouterController as R,
  SIWXUtil as S,
  ThemeController as T,
  WalletUtil as W,
  subscribe as a,
  AssetUtil as b,
  colorStyles as c,
  AssetController as d,
  elementStyles as e,
  ConstantsUtil as f,
  ConnectorController as g,
  AccountController as h,
  SnackController as i,
  ApiController as j,
  initializeTheming as k,
  CoreHelperUtil as l,
  ConstantsUtil$3 as m,
  ConnectorUtil as n,
  ConnectionController as o,
  proxy as p,
  StorageUtil as q,
  resetStyles as r,
  subscribeKey as s,
  ConstantsUtil$2 as t,
  core as u,
  withErrorBoundary as w
};
//# sourceMappingURL=core-DJurDhwI.js.map
