import { aK as commonjsGlobal, bt as getAugmentedNamespace, bu as _esm, b6 as events, aJ as getDefaultExportFromCjs } from "./appkit-DOrUN3iw.js";
import { d as dist$1 } from "./index-2hjmsduh.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var dist = {};
var provider = {};
var cjs = {};
var sdk$1 = {};
var communication = {};
var messageFormatter = {};
var version = {};
Object.defineProperty(version, "__esModule", { value: true });
version.getSDKVersion = void 0;
const getSDKVersion = () => "9.1.0";
version.getSDKVersion = getSDKVersion;
var utils$1 = {};
Object.defineProperty(utils$1, "__esModule", { value: true });
utils$1.generateRequestId = void 0;
const dec2hex = (dec) => dec.toString(16).padStart(2, "0");
const generateId = (len) => {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};
const generateRequestId = () => {
  if (typeof window !== "undefined") {
    return generateId(10);
  }
  return (/* @__PURE__ */ new Date()).getTime().toString(36);
};
utils$1.generateRequestId = generateRequestId;
Object.defineProperty(messageFormatter, "__esModule", { value: true });
messageFormatter.MessageFormatter = void 0;
const version_js_1 = version;
const utils_js_1 = utils$1;
class MessageFormatter {
}
messageFormatter.MessageFormatter = MessageFormatter;
MessageFormatter.makeRequest = (method, params) => {
  const id = (0, utils_js_1.generateRequestId)();
  return {
    id,
    method,
    params,
    env: {
      sdkVersion: (0, version_js_1.getSDKVersion)()
    }
  };
};
MessageFormatter.makeResponse = (id, data, version2) => ({
  id,
  success: true,
  version: version2,
  data
});
MessageFormatter.makeErrorResponse = (id, error, version2) => ({
  id,
  success: false,
  error,
  version: version2
});
var methods = {};
Object.defineProperty(methods, "__esModule", { value: true });
methods.RestrictedMethods = methods.Methods = void 0;
var Methods;
(function(Methods2) {
  Methods2["sendTransactions"] = "sendTransactions";
  Methods2["rpcCall"] = "rpcCall";
  Methods2["getChainInfo"] = "getChainInfo";
  Methods2["getSafeInfo"] = "getSafeInfo";
  Methods2["getTxBySafeTxHash"] = "getTxBySafeTxHash";
  Methods2["getSafeBalances"] = "getSafeBalances";
  Methods2["signMessage"] = "signMessage";
  Methods2["signTypedMessage"] = "signTypedMessage";
  Methods2["getEnvironmentInfo"] = "getEnvironmentInfo";
  Methods2["getOffChainSignature"] = "getOffChainSignature";
  Methods2["requestAddressBook"] = "requestAddressBook";
  Methods2["wallet_getPermissions"] = "wallet_getPermissions";
  Methods2["wallet_requestPermissions"] = "wallet_requestPermissions";
})(Methods || (methods.Methods = Methods = {}));
var RestrictedMethods;
(function(RestrictedMethods2) {
  RestrictedMethods2["requestAddressBook"] = "requestAddressBook";
})(RestrictedMethods || (methods.RestrictedMethods = RestrictedMethods = {}));
(function(exports$1) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports$12) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
  };
  Object.defineProperty(exports$1, "__esModule", { value: true });
  const messageFormatter_js_1 = messageFormatter;
  class PostMessageCommunicator {
    constructor(allowedOrigins = null, debugMode = false) {
      this.allowedOrigins = null;
      this.callbacks = /* @__PURE__ */ new Map();
      this.debugMode = false;
      this.isServer = typeof window === "undefined";
      this.isValidMessage = ({ origin, data, source }) => {
        const emptyOrMalformed = !data;
        const sentFromParentEl = !this.isServer && source === window.parent;
        const majorVersionNumber = typeof data.version !== "undefined" && parseInt(data.version.split(".")[0]);
        const allowedSDKVersion = typeof majorVersionNumber === "number" && majorVersionNumber >= 1;
        let validOrigin = true;
        if (Array.isArray(this.allowedOrigins)) {
          validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== void 0;
        }
        return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
      };
      this.logIncomingMessage = (msg) => {
        console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
      };
      this.onParentMessage = (msg) => {
        if (this.isValidMessage(msg)) {
          this.debugMode && this.logIncomingMessage(msg);
          this.handleIncomingMessage(msg.data);
        }
      };
      this.handleIncomingMessage = (payload) => {
        const { id } = payload;
        const cb = this.callbacks.get(id);
        if (cb) {
          cb(payload);
          this.callbacks.delete(id);
        }
      };
      this.send = (method, params) => {
        const request = messageFormatter_js_1.MessageFormatter.makeRequest(method, params);
        if (this.isServer) {
          throw new Error("Window doesn't exist");
        }
        window.parent.postMessage(request, "*");
        return new Promise((resolve, reject) => {
          this.callbacks.set(request.id, (response) => {
            if (!response.success) {
              reject(new Error(response.error));
              return;
            }
            resolve(response);
          });
        });
      };
      this.allowedOrigins = allowedOrigins;
      this.debugMode = debugMode;
      if (!this.isServer) {
        window.addEventListener("message", this.onParentMessage);
      }
    }
  }
  exports$1.default = PostMessageCommunicator;
  __exportStar(methods, exports$1);
})(communication);
var txs = {};
var types = {};
var sdk = {};
Object.defineProperty(sdk, "__esModule", { value: true });
sdk.isObjectEIP712TypedData = void 0;
const isObjectEIP712TypedData = (obj) => {
  return typeof obj === "object" && obj != null && "domain" in obj && "types" in obj && "message" in obj;
};
sdk.isObjectEIP712TypedData = isObjectEIP712TypedData;
var rpc = {};
Object.defineProperty(rpc, "__esModule", { value: true });
var gateway = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.TransferDirection = exports$1.TransactionStatus = exports$1.TokenType = exports$1.Operation = void 0;
  var safe_gateway_typescript_sdk_1 = dist$1;
  Object.defineProperty(exports$1, "Operation", { enumerable: true, get: function() {
    return safe_gateway_typescript_sdk_1.Operation;
  } });
  Object.defineProperty(exports$1, "TokenType", { enumerable: true, get: function() {
    return safe_gateway_typescript_sdk_1.TokenType;
  } });
  Object.defineProperty(exports$1, "TransactionStatus", { enumerable: true, get: function() {
    return safe_gateway_typescript_sdk_1.TransactionStatus;
  } });
  Object.defineProperty(exports$1, "TransferDirection", { enumerable: true, get: function() {
    return safe_gateway_typescript_sdk_1.TransferDirection;
  } });
})(gateway);
var messaging = {};
Object.defineProperty(messaging, "__esModule", { value: true });
(function(exports$1) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports$12) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
  };
  Object.defineProperty(exports$1, "__esModule", { value: true });
  __exportStar(sdk, exports$1);
  __exportStar(rpc, exports$1);
  __exportStar(gateway, exports$1);
  __exportStar(messaging, exports$1);
})(types);
Object.defineProperty(txs, "__esModule", { value: true });
txs.TXs = void 0;
const methods_js_1$3 = methods;
const index_js_1$3 = types;
class TXs {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getBySafeTxHash(safeTxHash) {
    if (!safeTxHash) {
      throw new Error("Invalid safeTxHash");
    }
    const response = await this.communicator.send(methods_js_1$3.Methods.getTxBySafeTxHash, { safeTxHash });
    return response.data;
  }
  async signMessage(message) {
    const messagePayload = {
      message
    };
    const response = await this.communicator.send(methods_js_1$3.Methods.signMessage, messagePayload);
    return response.data;
  }
  async signTypedMessage(typedData) {
    if (!(0, index_js_1$3.isObjectEIP712TypedData)(typedData)) {
      throw new Error("Invalid typed data");
    }
    const response = await this.communicator.send(methods_js_1$3.Methods.signTypedMessage, { typedData });
    return response.data;
  }
  async send({ txs: txs2, params }) {
    if (!txs2 || !txs2.length) {
      throw new Error("No transactions were passed");
    }
    const messagePayload = {
      txs: txs2,
      params
    };
    const response = await this.communicator.send(methods_js_1$3.Methods.sendTransactions, messagePayload);
    return response.data;
  }
}
txs.TXs = TXs;
var eth = {};
var constants = {};
Object.defineProperty(constants, "__esModule", { value: true });
constants.RPC_CALLS = void 0;
constants.RPC_CALLS = {
  eth_call: "eth_call",
  eth_gasPrice: "eth_gasPrice",
  eth_getLogs: "eth_getLogs",
  eth_getBalance: "eth_getBalance",
  eth_getCode: "eth_getCode",
  eth_getBlockByHash: "eth_getBlockByHash",
  eth_getBlockByNumber: "eth_getBlockByNumber",
  eth_getStorageAt: "eth_getStorageAt",
  eth_getTransactionByHash: "eth_getTransactionByHash",
  eth_getTransactionReceipt: "eth_getTransactionReceipt",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_estimateGas: "eth_estimateGas",
  safe_setSettings: "safe_setSettings"
};
Object.defineProperty(eth, "__esModule", { value: true });
eth.Eth = void 0;
const constants_js_1$1 = constants;
const methods_js_1$2 = methods;
const inputFormatters = {
  defaultBlockParam: (arg = "latest") => arg,
  returnFullTxObjectParam: (arg = false) => arg,
  blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg
};
class Eth {
  constructor(communicator) {
    this.communicator = communicator;
    this.call = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getBalance = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getCode = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getStorageAt = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getStorageAt,
      formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam]
    });
    this.getPastLogs = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getLogs
    });
    this.getBlockByHash = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.returnFullTxObjectParam]
    });
    this.getBlockByNumber = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getBlockByNumber,
      formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam]
    });
    this.getTransactionByHash = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getTransactionByHash
    });
    this.getTransactionReceipt = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getTransactionReceipt
    });
    this.getTransactionCount = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_getTransactionCount,
      formatters: [null, inputFormatters.defaultBlockParam]
    });
    this.getGasPrice = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_gasPrice
    });
    this.getEstimateGas = (transaction) => this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.eth_estimateGas
    })([transaction]);
    this.setSafeSettings = this.buildRequest({
      call: constants_js_1$1.RPC_CALLS.safe_setSettings
    });
  }
  buildRequest(args) {
    const { call, formatters } = args;
    return async (params) => {
      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter, i) => {
          if (formatter) {
            params[i] = formatter(params[i]);
          }
        });
      }
      const payload = {
        call,
        params: params || []
      };
      const response = await this.communicator.send(methods_js_1$2.Methods.rpcCall, payload);
      return response.data;
    };
  }
}
eth.Eth = Eth;
var safe = {};
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(_esm);
var signatures = {};
Object.defineProperty(signatures, "__esModule", { value: true });
signatures.MAGIC_VALUE_BYTES = signatures.MAGIC_VALUE = void 0;
const MAGIC_VALUE = "0x1626ba7e";
signatures.MAGIC_VALUE = MAGIC_VALUE;
const MAGIC_VALUE_BYTES = "0x20c13b0b";
signatures.MAGIC_VALUE_BYTES = MAGIC_VALUE_BYTES;
var requirePermissions = {};
var wallet = {};
var permissions = {};
Object.defineProperty(permissions, "__esModule", { value: true });
permissions.PermissionsError = permissions.PERMISSIONS_REQUEST_REJECTED = void 0;
permissions.PERMISSIONS_REQUEST_REJECTED = 4001;
class PermissionsError extends Error {
  constructor(message, code, data) {
    super(message);
    this.code = code;
    this.data = data;
    Object.setPrototypeOf(this, PermissionsError.prototype);
  }
}
permissions.PermissionsError = PermissionsError;
Object.defineProperty(wallet, "__esModule", { value: true });
wallet.Wallet = void 0;
const methods_js_1$1 = methods;
const permissions_js_1$1 = permissions;
class Wallet {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getPermissions() {
    const response = await this.communicator.send(methods_js_1$1.Methods.wallet_getPermissions, void 0);
    return response.data;
  }
  async requestPermissions(permissions2) {
    if (!this.isPermissionRequestValid(permissions2)) {
      throw new permissions_js_1$1.PermissionsError("Permissions request is invalid", permissions_js_1$1.PERMISSIONS_REQUEST_REJECTED);
    }
    try {
      const response = await this.communicator.send(methods_js_1$1.Methods.wallet_requestPermissions, permissions2);
      return response.data;
    } catch {
      throw new permissions_js_1$1.PermissionsError("Permissions rejected", permissions_js_1$1.PERMISSIONS_REQUEST_REJECTED);
    }
  }
  isPermissionRequestValid(permissions2) {
    return permissions2.every((pr) => {
      if (typeof pr === "object") {
        return Object.keys(pr).every((method) => {
          if (Object.values(methods_js_1$1.RestrictedMethods).includes(method)) {
            return true;
          }
          return false;
        });
      }
      return false;
    });
  }
}
wallet.Wallet = Wallet;
Object.defineProperty(requirePermissions, "__esModule", { value: true });
const index_js_1$2 = wallet;
const permissions_js_1 = permissions;
const hasPermission = (required, permissions2) => permissions2.some((permission) => permission.parentCapability === required);
const requirePermission = () => (_, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function() {
    const wallet2 = new index_js_1$2.Wallet(this.communicator);
    let currentPermissions = await wallet2.getPermissions();
    if (!hasPermission(propertyKey, currentPermissions)) {
      currentPermissions = await wallet2.requestPermissions([{ [propertyKey]: {} }]);
    }
    if (!hasPermission(propertyKey, currentPermissions)) {
      throw new permissions_js_1.PermissionsError("Permissions rejected", permissions_js_1.PERMISSIONS_REQUEST_REJECTED);
    }
    return originalMethod.apply(this);
  };
  return descriptor;
};
requirePermissions.default = requirePermission;
var __decorate = commonjsGlobal && commonjsGlobal.__decorate || function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(safe, "__esModule", { value: true });
safe.Safe = void 0;
const viem_1 = require$$0;
const signatures_js_1 = signatures;
const methods_js_1 = methods;
const constants_js_1 = constants;
const index_js_1$1 = types;
const requirePermissions_js_1 = __importDefault$1(requirePermissions);
class Safe {
  constructor(communicator) {
    this.communicator = communicator;
  }
  async getChainInfo() {
    const response = await this.communicator.send(methods_js_1.Methods.getChainInfo, void 0);
    return response.data;
  }
  async getInfo() {
    const response = await this.communicator.send(methods_js_1.Methods.getSafeInfo, void 0);
    return response.data;
  }
  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency = "usd" } = {}) {
    const response = await this.communicator.send(methods_js_1.Methods.getSafeBalances, {
      currency
    });
    return response.data;
  }
  async check1271Signature(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = (0, viem_1.encodeFunctionData)({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_dataHash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: constants_js_1.RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(methods_js_1.Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === signatures_js_1.MAGIC_VALUE;
    } catch (err) {
      return false;
    }
  }
  async check1271SignatureBytes(messageHash, signature = "0x") {
    const safeInfo = await this.getInfo();
    const encodedIsValidSignatureCall = (0, viem_1.encodeFunctionData)({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_data",
              type: "bytes"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [messageHash, signature]
    });
    const payload = {
      call: constants_js_1.RPC_CALLS.eth_call,
      params: [
        {
          to: safeInfo.safeAddress,
          data: encodedIsValidSignatureCall
        },
        "latest"
      ]
    };
    try {
      const response = await this.communicator.send(methods_js_1.Methods.rpcCall, payload);
      return response.data.slice(0, 10).toLowerCase() === signatures_js_1.MAGIC_VALUE_BYTES;
    } catch (err) {
      return false;
    }
  }
  calculateMessageHash(message) {
    return (0, viem_1.hashMessage)(message);
  }
  calculateTypedMessageHash(typedMessage) {
    const chainId = typeof typedMessage.domain.chainId === "object" ? typedMessage.domain.chainId.toNumber() : Number(typedMessage.domain.chainId);
    let primaryType = typedMessage.primaryType;
    if (!primaryType) {
      const fields = Object.values(typedMessage.types);
      const primaryTypes = Object.keys(typedMessage.types).filter((typeName) => fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace("[", "").replace("]", "") !== typeName)));
      if (primaryTypes.length === 0 || primaryTypes.length > 1)
        throw new Error("Please specify primaryType");
      primaryType = primaryTypes[0];
    }
    return (0, viem_1.hashTypedData)({
      message: typedMessage.message,
      domain: {
        ...typedMessage.domain,
        chainId,
        verifyingContract: typedMessage.domain.verifyingContract,
        salt: typedMessage.domain.salt
      },
      types: typedMessage.types,
      primaryType
    });
  }
  async getOffChainSignature(messageHash) {
    const response = await this.communicator.send(methods_js_1.Methods.getOffChainSignature, messageHash);
    return response.data;
  }
  async isMessageSigned(message, signature = "0x") {
    let check;
    if (typeof message === "string") {
      check = async () => {
        const messageHash = this.calculateMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if ((0, index_js_1$1.isObjectEIP712TypedData)(message)) {
      check = async () => {
        const messageHash = this.calculateTypedMessageHash(message);
        const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
        return messageHashSigned;
      };
    }
    if (check) {
      const isValid = await check();
      return isValid;
    }
    throw new Error("Invalid message type");
  }
  async isMessageHashSigned(messageHash, signature = "0x") {
    const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
    for (const check of checks) {
      const isValid = await check(messageHash, signature);
      if (isValid) {
        return true;
      }
    }
    return false;
  }
  async getEnvironmentInfo() {
    const response = await this.communicator.send(methods_js_1.Methods.getEnvironmentInfo, void 0);
    return response.data;
  }
  async requestAddressBook() {
    const response = await this.communicator.send(methods_js_1.Methods.requestAddressBook, void 0);
    return response.data;
  }
}
safe.Safe = Safe;
__decorate([
  (0, requirePermissions_js_1.default)()
], Safe.prototype, "requestAddressBook", null);
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(sdk$1, "__esModule", { value: true });
const index_js_1 = __importDefault(communication);
const index_js_2 = txs;
const index_js_3 = eth;
const index_js_4 = safe;
const index_js_5 = wallet;
class SafeAppsSDK {
  constructor(opts = {}) {
    const { allowedDomains = null, debug = false } = opts;
    this.communicator = new index_js_1.default(allowedDomains, debug);
    this.eth = new index_js_3.Eth(this.communicator);
    this.txs = new index_js_2.TXs(this.communicator);
    this.safe = new index_js_4.Safe(this.communicator);
    this.wallet = new index_js_5.Wallet(this.communicator);
  }
}
sdk$1.default = SafeAppsSDK;
(function(exports$1) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports$12) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.getSDKVersion = void 0;
  const sdk_js_1 = __importDefault2(sdk$1);
  exports$1.default = sdk_js_1.default;
  __exportStar(sdk$1, exports$1);
  __exportStar(types, exports$1);
  __exportStar(methods, exports$1);
  __exportStar(messageFormatter, exports$1);
  var version_js_12 = version;
  Object.defineProperty(exports$1, "getSDKVersion", { enumerable: true, get: function() {
    return version_js_12.getSDKVersion;
  } });
  __exportStar(constants, exports$1);
})(cjs);
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.numberToHex = utils.getLowerCase = void 0;
function getLowerCase(value) {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}
utils.getLowerCase = getLowerCase;
function numberToHex(value) {
  return `0x${value.toString(16)}`;
}
utils.numberToHex = numberToHex;
Object.defineProperty(provider, "__esModule", { value: true });
provider.SafeAppProvider = void 0;
const safe_apps_sdk_1 = cjs;
const events_1 = events;
const utils_1 = utils;
class SafeAppProvider extends events_1.EventEmitter {
  constructor(safe2, sdk2) {
    super();
    this.submittedTxs = /* @__PURE__ */ new Map();
    this.safe = safe2;
    this.sdk = sdk2;
  }
  async connect() {
    this.emit("connect", { chainId: this.chainId });
    return;
  }
  async disconnect() {
    return;
  }
  get chainId() {
    return this.safe.chainId;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async request(request) {
    var _a, _b, _c, _d;
    const { method, params = [] } = request;
    switch (method) {
      case "eth_accounts":
        return [this.safe.safeAddress];
      case "net_version":
      case "eth_chainId":
        return (0, utils_1.numberToHex)(this.chainId);
      case "personal_sign": {
        const [message, address] = params;
        if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
          throw new Error("The address or message hash is invalid");
        }
        const response = await this.sdk.txs.signMessage(message);
        const signature = "signature" in response ? response.signature : void 0;
        return signature || "0x";
      }
      case "eth_sign": {
        const [address, messageHash] = params;
        if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase() || !messageHash.startsWith("0x")) {
          throw new Error("The address or message hash is invalid");
        }
        const response = await this.sdk.txs.signMessage(messageHash);
        const signature = "signature" in response ? response.signature : void 0;
        return signature || "0x";
      }
      case "eth_signTypedData":
      case "eth_signTypedData_v4": {
        const [address, typedData] = params;
        const parsedTypedData = typeof typedData === "string" ? JSON.parse(typedData) : typedData;
        if (this.safe.safeAddress.toLowerCase() !== address.toLowerCase()) {
          throw new Error("The address is invalid");
        }
        const response = await this.sdk.txs.signTypedMessage(parsedTypedData);
        const signature = "signature" in response ? response.signature : void 0;
        return signature || "0x";
      }
      case "eth_sendTransaction":
        const tx = {
          ...params[0],
          value: params[0].value || "0",
          data: params[0].data || "0x"
        };
        if (typeof tx.gas === "string" && tx.gas.startsWith("0x")) {
          tx.gas = parseInt(tx.gas, 16);
        }
        const resp = await this.sdk.txs.send({
          txs: [tx],
          params: { safeTxGas: tx.gas }
        });
        this.submittedTxs.set(resp.safeTxHash, {
          from: this.safe.safeAddress,
          hash: resp.safeTxHash,
          gas: 0,
          gasPrice: "0x00",
          nonce: 0,
          input: tx.data,
          value: tx.value,
          to: tx.to,
          blockHash: null,
          blockNumber: null,
          transactionIndex: null
        });
        return resp.safeTxHash;
      case "eth_blockNumber":
        const block = await this.sdk.eth.getBlockByNumber(["latest"]);
        return block.number;
      case "eth_getBalance":
        return this.sdk.eth.getBalance([(0, utils_1.getLowerCase)(params[0]), params[1]]);
      case "eth_getCode":
        return this.sdk.eth.getCode([(0, utils_1.getLowerCase)(params[0]), params[1]]);
      case "eth_getTransactionCount":
        return this.sdk.eth.getTransactionCount([(0, utils_1.getLowerCase)(params[0]), params[1]]);
      case "eth_getStorageAt":
        return this.sdk.eth.getStorageAt([(0, utils_1.getLowerCase)(params[0]), params[1], params[2]]);
      case "eth_getBlockByNumber":
        return this.sdk.eth.getBlockByNumber([params[0], params[1]]);
      case "eth_getBlockByHash":
        return this.sdk.eth.getBlockByHash([params[0], params[1]]);
      case "eth_getTransactionByHash":
        let txHash = params[0];
        try {
          const resp2 = await this.sdk.txs.getBySafeTxHash(txHash);
          txHash = resp2.txHash || txHash;
        } catch (e) {
        }
        if (this.submittedTxs.has(txHash)) {
          return this.submittedTxs.get(txHash);
        }
        return this.sdk.eth.getTransactionByHash([txHash]).then((tx2) => {
          if (tx2) {
            tx2.hash = params[0];
          }
          return tx2;
        });
      case "eth_getTransactionReceipt": {
        let txHash2 = params[0];
        try {
          const resp2 = await this.sdk.txs.getBySafeTxHash(txHash2);
          txHash2 = resp2.txHash || txHash2;
        } catch (e) {
        }
        return this.sdk.eth.getTransactionReceipt([txHash2]).then((tx2) => {
          if (tx2) {
            tx2.transactionHash = params[0];
          }
          return tx2;
        });
      }
      case "eth_estimateGas": {
        return this.sdk.eth.getEstimateGas(params[0]);
      }
      case "eth_call": {
        return this.sdk.eth.call([params[0], params[1]]);
      }
      case "eth_getLogs":
        return this.sdk.eth.getPastLogs([params[0]]);
      case "eth_gasPrice":
        return this.sdk.eth.getGasPrice();
      case "wallet_getPermissions":
        return this.sdk.wallet.getPermissions();
      case "wallet_requestPermissions":
        return this.sdk.wallet.requestPermissions(params[0]);
      case "safe_setSettings":
        return this.sdk.eth.setSafeSettings([params[0]]);
      case "wallet_sendCalls": {
        const { from, calls, chainId } = params[0];
        if (chainId !== (0, utils_1.numberToHex)(this.chainId)) {
          throw new Error(`Safe is not on chain ${chainId}`);
        }
        if (from !== this.safe.safeAddress) {
          throw Error("Invalid from address");
        }
        const txs2 = calls.map((call, i) => {
          if (!call.to) {
            throw new Error(`Invalid call #${i}: missing "to" field`);
          }
          return {
            to: call.to,
            data: call.data ?? "0x",
            value: call.value ?? (0, utils_1.numberToHex)(0)
          };
        });
        const { safeTxHash } = await this.sdk.txs.send({ txs: txs2 });
        const result = {
          id: safeTxHash
        };
        return result;
      }
      case "wallet_getCallsStatus": {
        const safeTxHash = params[0];
        const CallStatus = {
          [safe_apps_sdk_1.TransactionStatus.AWAITING_CONFIRMATIONS]: 100,
          [safe_apps_sdk_1.TransactionStatus.AWAITING_EXECUTION]: 100,
          [safe_apps_sdk_1.TransactionStatus.SUCCESS]: 200,
          [safe_apps_sdk_1.TransactionStatus.CANCELLED]: 400,
          [safe_apps_sdk_1.TransactionStatus.FAILED]: 500
        };
        const tx2 = await this.sdk.txs.getBySafeTxHash(safeTxHash);
        const result = {
          version: "1.0",
          id: safeTxHash,
          chainId: (0, utils_1.numberToHex)(this.chainId),
          status: CallStatus[tx2.txStatus]
        };
        if (!tx2.txHash) {
          return result;
        }
        const receipt = await this.sdk.eth.getTransactionReceipt([tx2.txHash]);
        if (!receipt) {
          return result;
        }
        const calls = ((_b = (_a = tx2.txData) == null ? void 0 : _a.dataDecoded) == null ? void 0 : _b.method) !== "multiSend" ? 1 : (
          // Number of batched transactions
          ((_d = (_c = tx2.txData.dataDecoded.parameters) == null ? void 0 : _c[0].valueDecoded) == null ? void 0 : _d.length) ?? 1
        );
        const blockNumber = Number(receipt.blockNumber);
        const gasUsed = Number(receipt.gasUsed);
        result.receipts = Array(calls).fill({
          logs: receipt.logs,
          status: (0, utils_1.numberToHex)(tx2.txStatus === safe_apps_sdk_1.TransactionStatus.SUCCESS ? 1 : 0),
          blockHash: receipt.blockHash,
          blockNumber: (0, utils_1.numberToHex)(blockNumber),
          gasUsed: (0, utils_1.numberToHex)(gasUsed),
          transactionHash: tx2.txHash
        });
        return result;
      }
      case "wallet_showCallsStatus": {
        throw new Error(`"${request.method}" not supported`);
      }
      case "wallet_getCapabilities": {
        return {
          [(0, utils_1.numberToHex)(this.chainId)]: {
            atomicBatch: {
              supported: true
            }
          }
        };
      }
      default:
        throw Error(`"${request.method}" not implemented`);
    }
  }
  // this method is needed for ethers v4
  // https://github.com/ethers-io/ethers.js/blob/427e16826eb15d52d25c4f01027f8db22b74b76c/src.ts/providers/web3-provider.ts#L41-L55
  send(request, callback) {
    if (!request)
      callback("Undefined request");
    this.request(request).then((result) => callback(null, { jsonrpc: "2.0", id: request.id, result })).catch((error) => callback(error, null));
  }
}
provider.SafeAppProvider = SafeAppProvider;
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.SafeAppProvider = void 0;
  var provider_1 = provider;
  Object.defineProperty(exports$1, "SafeAppProvider", { enumerable: true, get: function() {
    return provider_1.SafeAppProvider;
  } });
})(dist);
const index = /* @__PURE__ */ getDefaultExportFromCjs(dist);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [dist]);
export {
  index$1 as i
};
//# sourceMappingURL=index-B13QEh3A.js.map
