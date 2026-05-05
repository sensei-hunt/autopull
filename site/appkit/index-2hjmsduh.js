import { aK as commonjsGlobal } from "./appkit-DOrUN3iw.js";
var dist = {};
var endpoint = {};
var utils = {};
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(utils, "__esModule", { value: true });
utils.insertParams = insertParams;
utils.stringifyQuery = stringifyQuery;
utils.fetchData = fetchData;
utils.getData = getData;
const isErrorResponse = (data) => {
  const isObject = typeof data === "object" && data !== null;
  return isObject && ("code" in data || "statusCode" in data) && "message" in data;
};
function replaceParam(str, key, value) {
  return str.replace(new RegExp(`\\{${key}\\}`, "g"), value);
}
function insertParams(template, params) {
  return params ? Object.keys(params).reduce((result, key) => {
    return replaceParam(result, key, String(params[key]));
  }, template) : template;
}
function stringifyQuery(query) {
  if (!query) {
    return "";
  }
  const searchParams = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    if (query[key] != null) {
      searchParams.append(key, String(query[key]));
    }
  });
  const searchString = searchParams.toString();
  return searchString ? `?${searchString}` : "";
}
function parseResponse(resp) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a;
    let json;
    try {
      json = yield resp.json();
    } catch (_b) {
      json = {};
    }
    if (!resp.ok) {
      const errTxt = isErrorResponse(json) ? `CGW error - ${(_a = json.code) !== null && _a !== void 0 ? _a : json.statusCode}: ${json.message}` : `CGW error - status ${resp.statusText}`;
      throw new Error(errTxt);
    }
    return json;
  });
}
function fetchData(url, method, body, headers, credentials) {
  return __awaiter(this, void 0, void 0, function* () {
    const requestHeaders = Object.assign({ "Content-Type": "application/json" }, headers);
    const options = {
      method: method !== null && method !== void 0 ? method : "POST",
      headers: requestHeaders
    };
    if (credentials) {
      options["credentials"] = credentials;
    }
    if (body != null) {
      options.body = typeof body === "string" ? body : JSON.stringify(body);
    }
    const resp = yield fetch(url, options);
    return parseResponse(resp);
  });
}
function getData(url, headers, credentials) {
  return __awaiter(this, void 0, void 0, function* () {
    const options = {
      method: "GET"
    };
    if (headers) {
      options["headers"] = Object.assign(Object.assign({}, headers), { "Content-Type": "application/json" });
    }
    if (credentials) {
      options["credentials"] = credentials;
    }
    const resp = yield fetch(url, options);
    return parseResponse(resp);
  });
}
Object.defineProperty(endpoint, "__esModule", { value: true });
endpoint.postEndpoint = postEndpoint;
endpoint.putEndpoint = putEndpoint;
endpoint.deleteEndpoint = deleteEndpoint;
endpoint.getEndpoint = getEndpoint;
const utils_1 = utils;
function makeUrl(baseUrl, path, pathParams, query) {
  const pathname = (0, utils_1.insertParams)(path, pathParams);
  const search = (0, utils_1.stringifyQuery)(query);
  return `${baseUrl}${pathname}${search}`;
}
function postEndpoint(baseUrl, path, params) {
  const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
  return (0, utils_1.fetchData)(url, "POST", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
function putEndpoint(baseUrl, path, params) {
  const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
  return (0, utils_1.fetchData)(url, "PUT", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
function deleteEndpoint(baseUrl, path, params) {
  const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
  return (0, utils_1.fetchData)(url, "DELETE", params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
function getEndpoint(baseUrl, path, params, rawUrl) {
  if (rawUrl) {
    return (0, utils_1.getData)(rawUrl, void 0, params === null || params === void 0 ? void 0 : params.credentials);
  }
  const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
  return (0, utils_1.getData)(url, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
var config = {};
Object.defineProperty(config, "__esModule", { value: true });
config.DEFAULT_BASE_URL = void 0;
config.DEFAULT_BASE_URL = "https://safe-client.safe.global";
var safeInfo = {};
Object.defineProperty(safeInfo, "__esModule", { value: true });
safeInfo.ImplementationVersionState = void 0;
var ImplementationVersionState;
(function(ImplementationVersionState2) {
  ImplementationVersionState2["UP_TO_DATE"] = "UP_TO_DATE";
  ImplementationVersionState2["OUTDATED"] = "OUTDATED";
  ImplementationVersionState2["UNKNOWN"] = "UNKNOWN";
})(ImplementationVersionState || (safeInfo.ImplementationVersionState = ImplementationVersionState = {}));
var safeApps = {};
Object.defineProperty(safeApps, "__esModule", { value: true });
safeApps.SafeAppSocialPlatforms = safeApps.SafeAppFeatures = safeApps.SafeAppAccessPolicyTypes = void 0;
var SafeAppAccessPolicyTypes;
(function(SafeAppAccessPolicyTypes2) {
  SafeAppAccessPolicyTypes2["NoRestrictions"] = "NO_RESTRICTIONS";
  SafeAppAccessPolicyTypes2["DomainAllowlist"] = "DOMAIN_ALLOWLIST";
})(SafeAppAccessPolicyTypes || (safeApps.SafeAppAccessPolicyTypes = SafeAppAccessPolicyTypes = {}));
var SafeAppFeatures;
(function(SafeAppFeatures2) {
  SafeAppFeatures2["BATCHED_TRANSACTIONS"] = "BATCHED_TRANSACTIONS";
})(SafeAppFeatures || (safeApps.SafeAppFeatures = SafeAppFeatures = {}));
var SafeAppSocialPlatforms;
(function(SafeAppSocialPlatforms2) {
  SafeAppSocialPlatforms2["TWITTER"] = "TWITTER";
  SafeAppSocialPlatforms2["GITHUB"] = "GITHUB";
  SafeAppSocialPlatforms2["DISCORD"] = "DISCORD";
  SafeAppSocialPlatforms2["TELEGRAM"] = "TELEGRAM";
})(SafeAppSocialPlatforms || (safeApps.SafeAppSocialPlatforms = SafeAppSocialPlatforms = {}));
var transactions = {};
Object.defineProperty(transactions, "__esModule", { value: true });
transactions.LabelValue = transactions.StartTimeValue = transactions.DurationType = transactions.DetailedExecutionInfoType = transactions.TransactionListItemType = transactions.ConflictType = transactions.TransactionInfoType = transactions.SettingsInfoType = transactions.TransactionTokenType = transactions.TransferDirection = transactions.TransactionStatus = transactions.Operation = void 0;
var Operation;
(function(Operation2) {
  Operation2[Operation2["CALL"] = 0] = "CALL";
  Operation2[Operation2["DELEGATE"] = 1] = "DELEGATE";
})(Operation || (transactions.Operation = Operation = {}));
var TransactionStatus;
(function(TransactionStatus2) {
  TransactionStatus2["AWAITING_CONFIRMATIONS"] = "AWAITING_CONFIRMATIONS";
  TransactionStatus2["AWAITING_EXECUTION"] = "AWAITING_EXECUTION";
  TransactionStatus2["CANCELLED"] = "CANCELLED";
  TransactionStatus2["FAILED"] = "FAILED";
  TransactionStatus2["SUCCESS"] = "SUCCESS";
})(TransactionStatus || (transactions.TransactionStatus = TransactionStatus = {}));
var TransferDirection;
(function(TransferDirection2) {
  TransferDirection2["INCOMING"] = "INCOMING";
  TransferDirection2["OUTGOING"] = "OUTGOING";
  TransferDirection2["UNKNOWN"] = "UNKNOWN";
})(TransferDirection || (transactions.TransferDirection = TransferDirection = {}));
var TransactionTokenType;
(function(TransactionTokenType2) {
  TransactionTokenType2["ERC20"] = "ERC20";
  TransactionTokenType2["ERC721"] = "ERC721";
  TransactionTokenType2["NATIVE_COIN"] = "NATIVE_COIN";
})(TransactionTokenType || (transactions.TransactionTokenType = TransactionTokenType = {}));
var SettingsInfoType;
(function(SettingsInfoType2) {
  SettingsInfoType2["SET_FALLBACK_HANDLER"] = "SET_FALLBACK_HANDLER";
  SettingsInfoType2["ADD_OWNER"] = "ADD_OWNER";
  SettingsInfoType2["REMOVE_OWNER"] = "REMOVE_OWNER";
  SettingsInfoType2["SWAP_OWNER"] = "SWAP_OWNER";
  SettingsInfoType2["CHANGE_THRESHOLD"] = "CHANGE_THRESHOLD";
  SettingsInfoType2["CHANGE_IMPLEMENTATION"] = "CHANGE_IMPLEMENTATION";
  SettingsInfoType2["ENABLE_MODULE"] = "ENABLE_MODULE";
  SettingsInfoType2["DISABLE_MODULE"] = "DISABLE_MODULE";
  SettingsInfoType2["SET_GUARD"] = "SET_GUARD";
  SettingsInfoType2["DELETE_GUARD"] = "DELETE_GUARD";
})(SettingsInfoType || (transactions.SettingsInfoType = SettingsInfoType = {}));
var TransactionInfoType;
(function(TransactionInfoType2) {
  TransactionInfoType2["TRANSFER"] = "Transfer";
  TransactionInfoType2["SETTINGS_CHANGE"] = "SettingsChange";
  TransactionInfoType2["CUSTOM"] = "Custom";
  TransactionInfoType2["CREATION"] = "Creation";
  TransactionInfoType2["SWAP_ORDER"] = "SwapOrder";
  TransactionInfoType2["TWAP_ORDER"] = "TwapOrder";
  TransactionInfoType2["SWAP_TRANSFER"] = "SwapTransfer";
  TransactionInfoType2["NATIVE_STAKING_DEPOSIT"] = "NativeStakingDeposit";
  TransactionInfoType2["NATIVE_STAKING_VALIDATORS_EXIT"] = "NativeStakingValidatorsExit";
  TransactionInfoType2["NATIVE_STAKING_WITHDRAW"] = "NativeStakingWithdraw";
})(TransactionInfoType || (transactions.TransactionInfoType = TransactionInfoType = {}));
var ConflictType;
(function(ConflictType2) {
  ConflictType2["NONE"] = "None";
  ConflictType2["HAS_NEXT"] = "HasNext";
  ConflictType2["END"] = "End";
})(ConflictType || (transactions.ConflictType = ConflictType = {}));
var TransactionListItemType;
(function(TransactionListItemType2) {
  TransactionListItemType2["TRANSACTION"] = "TRANSACTION";
  TransactionListItemType2["LABEL"] = "LABEL";
  TransactionListItemType2["CONFLICT_HEADER"] = "CONFLICT_HEADER";
  TransactionListItemType2["DATE_LABEL"] = "DATE_LABEL";
})(TransactionListItemType || (transactions.TransactionListItemType = TransactionListItemType = {}));
var DetailedExecutionInfoType;
(function(DetailedExecutionInfoType2) {
  DetailedExecutionInfoType2["MULTISIG"] = "MULTISIG";
  DetailedExecutionInfoType2["MODULE"] = "MODULE";
})(DetailedExecutionInfoType || (transactions.DetailedExecutionInfoType = DetailedExecutionInfoType = {}));
var DurationType;
(function(DurationType2) {
  DurationType2["AUTO"] = "AUTO";
  DurationType2["LIMIT_DURATION"] = "LIMIT_DURATION";
})(DurationType || (transactions.DurationType = DurationType = {}));
var StartTimeValue;
(function(StartTimeValue2) {
  StartTimeValue2["AT_MINING_TIME"] = "AT_MINING_TIME";
  StartTimeValue2["AT_EPOCH"] = "AT_EPOCH";
})(StartTimeValue || (transactions.StartTimeValue = StartTimeValue = {}));
var LabelValue;
(function(LabelValue2) {
  LabelValue2["Queued"] = "Queued";
  LabelValue2["Next"] = "Next";
})(LabelValue || (transactions.LabelValue = LabelValue = {}));
var chains = {};
Object.defineProperty(chains, "__esModule", { value: true });
chains.FEATURES = chains.GAS_PRICE_TYPE = chains.RPC_AUTHENTICATION = void 0;
var RPC_AUTHENTICATION;
(function(RPC_AUTHENTICATION2) {
  RPC_AUTHENTICATION2["API_KEY_PATH"] = "API_KEY_PATH";
  RPC_AUTHENTICATION2["NO_AUTHENTICATION"] = "NO_AUTHENTICATION";
  RPC_AUTHENTICATION2["UNKNOWN"] = "UNKNOWN";
})(RPC_AUTHENTICATION || (chains.RPC_AUTHENTICATION = RPC_AUTHENTICATION = {}));
var GAS_PRICE_TYPE;
(function(GAS_PRICE_TYPE2) {
  GAS_PRICE_TYPE2["ORACLE"] = "ORACLE";
  GAS_PRICE_TYPE2["FIXED"] = "FIXED";
  GAS_PRICE_TYPE2["FIXED_1559"] = "FIXED1559";
  GAS_PRICE_TYPE2["UNKNOWN"] = "UNKNOWN";
})(GAS_PRICE_TYPE || (chains.GAS_PRICE_TYPE = GAS_PRICE_TYPE = {}));
var FEATURES;
(function(FEATURES2) {
  FEATURES2["ERC721"] = "ERC721";
  FEATURES2["SAFE_APPS"] = "SAFE_APPS";
  FEATURES2["CONTRACT_INTERACTION"] = "CONTRACT_INTERACTION";
  FEATURES2["DOMAIN_LOOKUP"] = "DOMAIN_LOOKUP";
  FEATURES2["SPENDING_LIMIT"] = "SPENDING_LIMIT";
  FEATURES2["EIP1559"] = "EIP1559";
  FEATURES2["SAFE_TX_GAS_OPTIONAL"] = "SAFE_TX_GAS_OPTIONAL";
  FEATURES2["TX_SIMULATION"] = "TX_SIMULATION";
  FEATURES2["EIP1271"] = "EIP1271";
})(FEATURES || (chains.FEATURES = FEATURES = {}));
var common = {};
Object.defineProperty(common, "__esModule", { value: true });
common.TokenType = void 0;
var TokenType;
(function(TokenType2) {
  TokenType2["ERC20"] = "ERC20";
  TokenType2["ERC721"] = "ERC721";
  TokenType2["NATIVE_TOKEN"] = "NATIVE_TOKEN";
  TokenType2["UNKNOWN"] = "UNKNOWN";
})(TokenType || (common.TokenType = TokenType = {}));
var masterCopies = {};
Object.defineProperty(masterCopies, "__esModule", { value: true });
var decodedData = {};
Object.defineProperty(decodedData, "__esModule", { value: true });
decodedData.NativeStakingStatus = decodedData.ConfirmationViewTypes = void 0;
var ConfirmationViewTypes;
(function(ConfirmationViewTypes2) {
  ConfirmationViewTypes2["GENERIC"] = "GENERIC";
  ConfirmationViewTypes2["COW_SWAP_ORDER"] = "COW_SWAP_ORDER";
  ConfirmationViewTypes2["COW_SWAP_TWAP_ORDER"] = "COW_SWAP_TWAP_ORDER";
  ConfirmationViewTypes2["KILN_NATIVE_STAKING_DEPOSIT"] = "KILN_NATIVE_STAKING_DEPOSIT";
  ConfirmationViewTypes2["KILN_NATIVE_STAKING_VALIDATORS_EXIT"] = "KILN_NATIVE_STAKING_VALIDATORS_EXIT";
  ConfirmationViewTypes2["KILN_NATIVE_STAKING_WITHDRAW"] = "KILN_NATIVE_STAKING_WITHDRAW";
})(ConfirmationViewTypes || (decodedData.ConfirmationViewTypes = ConfirmationViewTypes = {}));
var NativeStakingStatus;
(function(NativeStakingStatus2) {
  NativeStakingStatus2["NOT_STAKED"] = "NOT_STAKED";
  NativeStakingStatus2["ACTIVATING"] = "ACTIVATING";
  NativeStakingStatus2["DEPOSIT_IN_PROGRESS"] = "DEPOSIT_IN_PROGRESS";
  NativeStakingStatus2["ACTIVE"] = "ACTIVE";
  NativeStakingStatus2["EXIT_REQUESTED"] = "EXIT_REQUESTED";
  NativeStakingStatus2["EXITING"] = "EXITING";
  NativeStakingStatus2["EXITED"] = "EXITED";
  NativeStakingStatus2["SLASHED"] = "SLASHED";
})(NativeStakingStatus || (decodedData.NativeStakingStatus = NativeStakingStatus = {}));
var safeMessages = {};
Object.defineProperty(safeMessages, "__esModule", { value: true });
safeMessages.SafeMessageStatus = safeMessages.SafeMessageListItemType = void 0;
var SafeMessageListItemType;
(function(SafeMessageListItemType2) {
  SafeMessageListItemType2["DATE_LABEL"] = "DATE_LABEL";
  SafeMessageListItemType2["MESSAGE"] = "MESSAGE";
})(SafeMessageListItemType || (safeMessages.SafeMessageListItemType = SafeMessageListItemType = {}));
var SafeMessageStatus;
(function(SafeMessageStatus2) {
  SafeMessageStatus2["NEEDS_CONFIRMATION"] = "NEEDS_CONFIRMATION";
  SafeMessageStatus2["CONFIRMED"] = "CONFIRMED";
})(SafeMessageStatus || (safeMessages.SafeMessageStatus = SafeMessageStatus = {}));
var notifications = {};
Object.defineProperty(notifications, "__esModule", { value: true });
notifications.DeviceType = void 0;
var DeviceType;
(function(DeviceType2) {
  DeviceType2["ANDROID"] = "ANDROID";
  DeviceType2["IOS"] = "IOS";
  DeviceType2["WEB"] = "WEB";
})(DeviceType || (notifications.DeviceType = DeviceType = {}));
var relay = {};
Object.defineProperty(relay, "__esModule", { value: true });
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
  exports$1.setBaseUrl = void 0;
  exports$1.relayTransaction = relayTransaction;
  exports$1.getRelayCount = getRelayCount;
  exports$1.getSafeInfo = getSafeInfo;
  exports$1.getIncomingTransfers = getIncomingTransfers;
  exports$1.getModuleTransactions = getModuleTransactions;
  exports$1.getMultisigTransactions = getMultisigTransactions;
  exports$1.getBalances = getBalances;
  exports$1.getFiatCurrencies = getFiatCurrencies;
  exports$1.getOwnedSafes = getOwnedSafes;
  exports$1.getAllOwnedSafes = getAllOwnedSafes;
  exports$1.getCollectibles = getCollectibles;
  exports$1.getCollectiblesPage = getCollectiblesPage;
  exports$1.getTransactionHistory = getTransactionHistory;
  exports$1.getTransactionQueue = getTransactionQueue;
  exports$1.getTransactionDetails = getTransactionDetails;
  exports$1.deleteTransaction = deleteTransaction;
  exports$1.postSafeGasEstimation = postSafeGasEstimation;
  exports$1.getNonces = getNonces;
  exports$1.proposeTransaction = proposeTransaction;
  exports$1.getConfirmationView = getConfirmationView;
  exports$1.getTxPreview = getTxPreview;
  exports$1.getChainsConfig = getChainsConfig;
  exports$1.getChainConfig = getChainConfig;
  exports$1.getSafeApps = getSafeApps;
  exports$1.getMasterCopies = getMasterCopies;
  exports$1.getDecodedData = getDecodedData;
  exports$1.getSafeMessages = getSafeMessages;
  exports$1.getSafeMessage = getSafeMessage;
  exports$1.proposeSafeMessage = proposeSafeMessage;
  exports$1.confirmSafeMessage = confirmSafeMessage;
  exports$1.getDelegates = getDelegates;
  exports$1.registerDevice = registerDevice;
  exports$1.unregisterSafe = unregisterSafe;
  exports$1.unregisterDevice = unregisterDevice;
  exports$1.registerEmail = registerEmail;
  exports$1.changeEmail = changeEmail;
  exports$1.resendEmailVerificationCode = resendEmailVerificationCode;
  exports$1.verifyEmail = verifyEmail;
  exports$1.getRegisteredEmail = getRegisteredEmail;
  exports$1.deleteRegisteredEmail = deleteRegisteredEmail;
  exports$1.registerRecoveryModule = registerRecoveryModule;
  exports$1.unsubscribeSingle = unsubscribeSingle;
  exports$1.unsubscribeAll = unsubscribeAll;
  exports$1.getSafeOverviews = getSafeOverviews;
  exports$1.getContract = getContract;
  exports$1.getAuthNonce = getAuthNonce;
  exports$1.verifyAuth = verifyAuth;
  exports$1.createAccount = createAccount;
  exports$1.getAccount = getAccount;
  exports$1.deleteAccount = deleteAccount;
  exports$1.getAccountDataTypes = getAccountDataTypes;
  exports$1.getAccountDataSettings = getAccountDataSettings;
  exports$1.putAccountDataSettings = putAccountDataSettings;
  exports$1.getIndexingStatus = getIndexingStatus;
  const endpoint_1 = endpoint;
  const config_1 = config;
  __exportStar(safeInfo, exports$1);
  __exportStar(safeApps, exports$1);
  __exportStar(transactions, exports$1);
  __exportStar(chains, exports$1);
  __exportStar(common, exports$1);
  __exportStar(masterCopies, exports$1);
  __exportStar(decodedData, exports$1);
  __exportStar(safeMessages, exports$1);
  __exportStar(notifications, exports$1);
  __exportStar(relay, exports$1);
  let baseUrl = config_1.DEFAULT_BASE_URL;
  const setBaseUrl = (url) => {
    baseUrl = url;
  };
  exports$1.setBaseUrl = setBaseUrl;
  function relayTransaction(chainId, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/relay", { path: { chainId }, body });
  }
  function getRelayCount(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/relay/{address}", { path: { chainId, address } });
  }
  function getSafeInfo(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}", { path: { chainId, address } });
  }
  function getIncomingTransfers(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/incoming-transfers/", {
      path: { chainId, address },
      query
    }, pageUrl);
  }
  function getModuleTransactions(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/module-transactions/", {
      path: { chainId, address },
      query
    }, pageUrl);
  }
  function getMultisigTransactions(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/multisig-transactions/", {
      path: { chainId, address },
      query
    }, pageUrl);
  }
  function getBalances(chainId, address, currency = "usd", query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/balances/{currency}", {
      path: { chainId, address, currency },
      query
    });
  }
  function getFiatCurrencies() {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/balances/supported-fiat-codes");
  }
  function getOwnedSafes(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/owners/{address}/safes", { path: { chainId, address } });
  }
  function getAllOwnedSafes(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/owners/{address}/safes", { path: { address } });
  }
  function getCollectibles(chainId, address, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{address}/collectibles", {
      path: { chainId, address },
      query
    });
  }
  function getCollectiblesPage(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v2/chains/{chainId}/safes/{address}/collectibles", { path: { chainId, address }, query }, pageUrl);
  }
  function getTransactionHistory(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/transactions/history", { path: { chainId, safe_address: address }, query }, pageUrl);
  }
  function getTransactionQueue(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/transactions/queued", { path: { chainId, safe_address: address }, query }, pageUrl);
  }
  function getTransactionDetails(chainId, transactionId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{transactionId}", {
      path: { chainId, transactionId }
    });
  }
  function deleteTransaction(chainId, safeTxHash, signature) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safeTxHash}", {
      path: { chainId, safeTxHash },
      body: { signature }
    });
  }
  function postSafeGasEstimation(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations", {
      path: { chainId, safe_address: address },
      body
    });
  }
  function getNonces(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/nonces", {
      path: { chainId, safe_address: address }
    });
  }
  function proposeTransaction(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safe_address}/propose", {
      path: { chainId, safe_address: address },
      body
    });
  }
  function getConfirmationView(chainId, safeAddress, operation, data, to, value) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation", {
      path: { chainId, safe_address: safeAddress },
      body: { operation, data, to, value }
    });
  }
  function getTxPreview(chainId, safeAddress, operation, data, to, value) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/transactions/{safe_address}/preview", {
      path: { chainId, safe_address: safeAddress },
      body: { operation, data, to, value }
    });
  }
  function getChainsConfig(query) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains", {
      query
    });
  }
  function getChainConfig(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}", {
      path: { chainId }
    });
  }
  function getSafeApps(chainId, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safe-apps", {
      path: { chainId },
      query
    });
  }
  function getMasterCopies(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/about/master-copies", {
      path: { chainId }
    });
  }
  function getDecodedData(chainId, operation, encodedData, to) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/data-decoder", {
      path: { chainId },
      body: { operation, data: encodedData, to }
    });
  }
  function getSafeMessages(chainId, address, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/messages", { path: { chainId, safe_address: address }, query: {} }, pageUrl);
  }
  function getSafeMessage(chainId, messageHash) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/messages/{message_hash}", {
      path: { chainId, message_hash: messageHash }
    });
  }
  function proposeSafeMessage(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/messages", {
      path: { chainId, safe_address: address },
      body
    });
  }
  function confirmSafeMessage(chainId, messageHash, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/messages/{message_hash}/signatures", {
      path: { chainId, message_hash: messageHash },
      body
    });
  }
  function getDelegates(chainId, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v2/chains/{chainId}/delegates", {
      path: { chainId },
      query
    });
  }
  function registerDevice(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/register/notifications", {
      body
    });
  }
  function unregisterSafe(chainId, address, uuid) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}", {
      path: { chainId, safe_address: address, uuid }
    });
  }
  function unregisterDevice(chainId, uuid) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/notifications/devices/{uuid}", {
      path: { chainId, uuid }
    });
  }
  function registerEmail(chainId, safeAddress, body, headers) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails", {
      path: { chainId, safe_address: safeAddress },
      body,
      headers
    });
  }
  function changeEmail(chainId, safeAddress, signerAddress, body, headers) {
    return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId, safe_address: safeAddress, signer: signerAddress },
      body,
      headers
    });
  }
  function resendEmailVerificationCode(chainId, safeAddress, signerAddress) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend", {
      path: { chainId, safe_address: safeAddress, signer: signerAddress },
      body: ""
    });
  }
  function verifyEmail(chainId, safeAddress, signerAddress, body) {
    return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify", {
      path: { chainId, safe_address: safeAddress, signer: signerAddress },
      body
    });
  }
  function getRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId, safe_address: safeAddress, signer: signerAddress },
      headers
    });
  }
  function deleteRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId, safe_address: safeAddress, signer: signerAddress },
      headers
    });
  }
  function registerRecoveryModule(chainId, safeAddress, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/chains/{chainId}/safes/{safe_address}/recovery", {
      path: { chainId, safe_address: safeAddress },
      body
    });
  }
  function unsubscribeSingle(query) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/subscriptions", { query });
  }
  function unsubscribeAll(query) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/subscriptions/all", { query });
  }
  function getSafeOverviews(safes, query) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/safes", {
      query: Object.assign(Object.assign({}, query), { safes: safes.join(",") })
    });
  }
  function getContract(chainId, contractAddress) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/contracts/{contractAddress}", {
      path: {
        chainId,
        contractAddress
      }
    });
  }
  function getAuthNonce() {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/auth/nonce", { credentials: "include" });
  }
  function verifyAuth(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/auth/verify", {
      body,
      credentials: "include"
    });
  }
  function createAccount(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, "/v1/accounts", {
      body,
      credentials: "include"
    });
  }
  function getAccount(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/{address}", {
      path: { address },
      credentials: "include"
    });
  }
  function deleteAccount(address) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, "/v1/accounts/{address}", {
      path: { address },
      credentials: "include"
    });
  }
  function getAccountDataTypes() {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/data-types");
  }
  function getAccountDataSettings(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/accounts/{address}/data-settings", {
      path: { address },
      credentials: "include"
    });
  }
  function putAccountDataSettings(address, body) {
    return (0, endpoint_1.putEndpoint)(baseUrl, "/v1/accounts/{address}/data-settings", {
      path: { address },
      body,
      credentials: "include"
    });
  }
  function getIndexingStatus(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, "/v1/chains/{chainId}/about/indexing", {
      path: { chainId }
    });
  }
})(dist);
export {
  dist as d
};
//# sourceMappingURL=index-2hjmsduh.js.map
