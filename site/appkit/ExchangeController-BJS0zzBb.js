import { p as proxy, g as getBuyStatus, C as ChainController, E as EventsController, a as CoreHelperUtil, S as SnackController, b as getPayUrl, f as formatCaip19Asset, c as getExchanges, d as ConstantsUtil, O as OptionsController, N as NumberUtil, e as getActiveNetworkTokenAddress, B as BlockchainApiController, h as getPaymentAssetsForNetwork, s as subscribeKey, i as subscribe } from "./appkit-DOrUN3iw.js";
const DEFAULT_PAGE = 0;
const DEFAULT_STATE = {
  paymentAsset: null,
  amount: null,
  tokenAmount: 0,
  priceLoading: false,
  error: null,
  exchanges: [],
  isLoading: false,
  currentPayment: void 0,
  isPaymentInProgress: false,
  paymentId: "",
  assets: []
};
const state = proxy(DEFAULT_STATE);
const ExchangeController = {
  state,
  // -- Subscriptions ----------------------------------- //
  subscribe(callback) {
    return subscribe(state, () => callback(state));
  },
  subscribeKey(key, callback) {
    return subscribeKey(state, key, callback);
  },
  resetState() {
    Object.assign(state, { ...DEFAULT_STATE });
  },
  async getAssetsForNetwork(network) {
    const assets = getPaymentAssetsForNetwork(network);
    const metadata = await ExchangeController.getAssetsImageAndPrice(assets);
    const assetsWithPrice = assets.map((asset) => {
      var _a, _b, _c, _d;
      const assetAddress = asset.asset === "native" ? getActiveNetworkTokenAddress() : `${asset.network}:${asset.asset}`;
      const assetMetadata = metadata.find((m) => {
        var _a2, _b2, _c2;
        return ((_c2 = (_b2 = (_a2 = m.fungibles) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.address) == null ? void 0 : _c2.toLowerCase()) === assetAddress.toLowerCase();
      });
      return {
        ...asset,
        price: ((_b = (_a = assetMetadata == null ? void 0 : assetMetadata.fungibles) == null ? void 0 : _a[0]) == null ? void 0 : _b.price) || 1,
        metadata: {
          ...asset.metadata,
          iconUrl: (_d = (_c = assetMetadata == null ? void 0 : assetMetadata.fungibles) == null ? void 0 : _c[0]) == null ? void 0 : _d.iconUrl
        }
      };
    });
    state.assets = assetsWithPrice;
    return assetsWithPrice;
  },
  async getAssetsImageAndPrice(assets) {
    const addresses = assets.map((asset) => asset.asset === "native" ? getActiveNetworkTokenAddress() : `${asset.network}:${asset.asset}`);
    const metadata = await Promise.all(addresses.map((address) => BlockchainApiController.fetchTokenPrice({ addresses: [address] })));
    return metadata;
  },
  getTokenAmount() {
    var _a;
    if (!((_a = state == null ? void 0 : state.paymentAsset) == null ? void 0 : _a.price)) {
      throw new Error("Cannot get token price");
    }
    const bigAmount = NumberUtil.bigNumber(state.amount ?? 0).round(8);
    const bigPrice = NumberUtil.bigNumber(state.paymentAsset.price).round(8);
    return bigAmount.div(bigPrice).round(8).toNumber();
  },
  setAmount(amount) {
    var _a;
    state.amount = amount;
    if ((_a = state.paymentAsset) == null ? void 0 : _a.price) {
      state.tokenAmount = ExchangeController.getTokenAmount();
    }
  },
  setPaymentAsset(asset) {
    state.paymentAsset = asset;
  },
  isPayWithExchangeEnabled() {
    var _a;
    return (_a = OptionsController.state.remoteFeatures) == null ? void 0 : _a.payWithExchange;
  },
  isPayWithExchangeSupported() {
    return ExchangeController.isPayWithExchangeEnabled() && ChainController.state.activeCaipNetwork && ConstantsUtil.PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES.includes(ChainController.state.activeCaipNetwork.chainNamespace);
  },
  // -- Getters ----------------------------------------- //
  async fetchExchanges() {
    var _a;
    try {
      const isPayWithExchangeSupported = ExchangeController.isPayWithExchangeSupported();
      if (!state.paymentAsset || !isPayWithExchangeSupported) {
        state.exchanges = [];
        state.isLoading = false;
        return;
      }
      state.isLoading = true;
      const response = await getExchanges({
        page: DEFAULT_PAGE,
        asset: formatCaip19Asset(state.paymentAsset.network, state.paymentAsset.asset),
        amount: ((_a = state.amount) == null ? void 0 : _a.toString()) ?? "0"
      });
      state.exchanges = response.exchanges.slice(0, 2);
    } catch (error) {
      SnackController.showError("Unable to get exchanges");
      throw new Error("Unable to get exchanges");
    } finally {
      state.isLoading = false;
    }
  },
  async getPayUrl(exchangeId, params) {
    try {
      const numericAmount = Number(params.amount);
      const response = await getPayUrl({
        exchangeId,
        asset: formatCaip19Asset(params.network, params.asset),
        amount: numericAmount.toString(),
        recipient: `${params.network}:${params.recipient}`
      });
      EventsController.sendEvent({
        type: "track",
        event: "PAY_EXCHANGE_SELECTED",
        properties: {
          exchange: {
            id: exchangeId
          },
          configuration: {
            network: params.network,
            asset: params.asset,
            recipient: params.recipient,
            amount: numericAmount
          },
          currentPayment: {
            type: "exchange",
            exchangeId
          },
          source: "fund-from-exchange",
          headless: false
        }
      });
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes("is not supported")) {
        throw new Error("Asset not supported");
      }
      throw new Error(error.message);
    }
  },
  async handlePayWithExchange(exchangeId) {
    var _a;
    try {
      const address = (_a = ChainController.getAccountData()) == null ? void 0 : _a.address;
      if (!address) {
        throw new Error("No account connected");
      }
      if (!state.paymentAsset) {
        throw new Error("No payment asset selected");
      }
      const popupWindow = CoreHelperUtil.returnOpenHref("", "popupWindow", "scrollbar=yes,width=480,height=720");
      if (!popupWindow) {
        throw new Error("Could not create popup window");
      }
      state.isPaymentInProgress = true;
      state.paymentId = crypto.randomUUID();
      state.currentPayment = {
        type: "exchange",
        exchangeId
      };
      const { network, asset } = state.paymentAsset;
      const payUrlParams = {
        network,
        asset,
        amount: state.tokenAmount,
        recipient: address
      };
      const payUrl = await ExchangeController.getPayUrl(exchangeId, payUrlParams);
      if (!payUrl) {
        try {
          popupWindow.close();
        } catch (err) {
          console.error("Unable to close popup window", err);
        }
        throw new Error("Unable to initiate payment");
      }
      state.currentPayment.sessionId = payUrl.sessionId;
      state.currentPayment.status = "IN_PROGRESS";
      state.currentPayment.exchangeId = exchangeId;
      popupWindow.location.href = payUrl.url;
    } catch (error) {
      state.error = "Unable to initiate payment";
      SnackController.showError(state.error);
    }
  },
  async waitUntilComplete({ exchangeId, sessionId, paymentId, retries = 20 }) {
    const status = await ExchangeController.getBuyStatus(exchangeId, sessionId, paymentId);
    if (status.status === "SUCCESS" || status.status === "FAILED") {
      return status;
    }
    if (retries === 0) {
      throw new Error("Unable to get deposit status");
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 5e3);
    });
    return ExchangeController.waitUntilComplete({
      exchangeId,
      sessionId,
      paymentId,
      retries: retries - 1
    });
  },
  async getBuyStatus(exchangeId, sessionId, paymentId) {
    var _a, _b, _c, _d, _e;
    try {
      if (!state.currentPayment) {
        throw new Error("No current payment");
      }
      const status = await getBuyStatus({ sessionId, exchangeId });
      state.currentPayment.status = status.status;
      if (status.status === "SUCCESS" || status.status === "FAILED") {
        const address = (_a = ChainController.getAccountData()) == null ? void 0 : _a.address;
        state.currentPayment.result = status.txHash;
        state.isPaymentInProgress = false;
        EventsController.sendEvent({
          type: "track",
          event: status.status === "SUCCESS" ? "PAY_SUCCESS" : "PAY_ERROR",
          properties: {
            message: status.status === "FAILED" ? CoreHelperUtil.parseError(state.error) : void 0,
            source: "fund-from-exchange",
            paymentId,
            configuration: {
              network: ((_b = state.paymentAsset) == null ? void 0 : _b.network) || "",
              asset: ((_c = state.paymentAsset) == null ? void 0 : _c.asset) || "",
              recipient: address || "",
              amount: state.amount ?? 0
            },
            currentPayment: {
              type: "exchange",
              exchangeId: (_d = state.currentPayment) == null ? void 0 : _d.exchangeId,
              sessionId: (_e = state.currentPayment) == null ? void 0 : _e.sessionId,
              result: status.txHash
            }
          }
        });
      }
      return status;
    } catch (error) {
      return {
        status: "UNKNOWN",
        txHash: ""
      };
    }
  },
  reset() {
    state.currentPayment = void 0;
    state.isPaymentInProgress = false;
    state.paymentId = "";
    state.paymentAsset = null;
    state.amount = 0;
    state.tokenAmount = 0;
    state.priceLoading = false;
    state.error = null;
    state.exchanges = [];
    state.isLoading = false;
  }
};
export {
  ExchangeController as E
};
//# sourceMappingURL=ExchangeController-BJS0zzBb.js.map
