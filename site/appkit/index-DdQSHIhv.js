import { n as css, r as resetStyles, o as elementStyles, q as i, t as b, C as ChainController, O as OptionsController, aD as AssetController, L as AssetUtil, a as CoreHelperUtil, X as ModalController, u as i$1, E as EventsController, V as StorageUtil, J as ConnectorController, z as ConstantsUtil, R as RouterController, d as ConstantsUtil$1, S as SnackController, y as ConnectionController, D as getPreferredAccountType, W as W3mFrameRpcConstants, hp as ConnectorUtil, hq as ConnectionControllerUtil, aS as HelpersUtil$1, Z as ParseUtil, av as ApiController, hr as WalletUtil, G as AlertController, ax as ErrorUtil, aw as W3mFrameProvider, au as ConstantsUtil$2, T as ThemeController, aH as AppKitError, aI as ErrorUtil$1, hs as CaipNetworksUtil, ht as MobileWalletUtil, aM as SIWXUtil, hu as NetworkUtil } from "./appkit-DOrUN3iw.js";
import { n, r, a as e } from "./class-map-B0iniyJ1.js";
import { o } from "./if-defined-AQastk2C.js";
import { c as customElement, U as UiHelperUtil } from "./index-ClJML15C.js";
import "./index-ZaRmRmdM.js";
import "./index-BJSW5RX-.js";
import "./index-B8tP14nE.js";
import "./index-CeqZ_NJd.js";
import { a, W } from "./index-DMz-qlzl.js";
import "./index-BWnGl6dc.js";
import "./index-DVpkC7_o.js";
import "./index-B_40TOWo.js";
import { H as HelpersUtil } from "./HelpersUtil-CODKQ52v.js";
import { n as networkSvgMd } from "./index-Crml59k7.js";
import { E as ExchangeController } from "./ExchangeController-BJS0zzBb.js";
import "./index-CvTO1LmI.js";
import "./index-BkKa1nrl.js";
import "./index-CG0Dt_kW.js";
import { M as MathUtil } from "./MathUtil-BspOY7Kj.js";
import "./index-7-he8cDb.js";
import { e as e$1, n as n$1 } from "./ref-C0XEJSC7.js";
import "./index-Dv-SFqe_.js";
import "./index-CZhgglo4.js";
import "./index-DD1kXiHv.js";
import "./index-C7E5x43G.js";
import { O as OptionsStateController } from "./index-Cvur3gUp.js";
import { e as executeSocialLogin } from "./index-CfTc1BuF.js";
import "./index-CWw9Bfzp.js";
import "./index-BY3j0KKe.js";
import { N as NavigationUtil } from "./NavigationUtil-Ci15WS4K.js";
import "./index-Da5lbBpB.js";
const styles$N = css`
  :host {
    display: block;
  }

  button {
    border-radius: ${({ borderRadius }) => borderRadius["20"]};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    display: flex;
    gap: ${({ spacing }) => spacing[1]};
    padding: ${({ spacing }) => spacing[1]};
    color: ${({ tokens }) => tokens.theme.textSecondary};
    border-radius: ${({ borderRadius }) => borderRadius[16]};
    height: 32px;
    transition: box-shadow ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: box-shadow;
  }

  button wui-flex.avatar-container {
    width: 28px;
    height: 24px;
    position: relative;

    wui-flex.network-image-container {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 12px;
      height: 12px;
    }

    wui-flex.network-image-container wui-icon {
      background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    }

    wui-avatar {
      width: 24px;
      min-width: 24px;
      height: 24px;
    }

    wui-icon {
      width: 12px;
      height: 12px;
    }
  }

  wui-image,
  wui-icon {
    border-radius: ${({ borderRadius }) => borderRadius[16]};
  }

  wui-text {
    white-space: nowrap;
  }

  button wui-flex.balance-container {
    height: 100%;
    border-radius: ${({ borderRadius }) => borderRadius[16]};
    padding-left: ${({ spacing }) => spacing[1]};
    padding-right: ${({ spacing }) => spacing[1]};
    background: ${({ tokens }) => tokens.theme.foregroundSecondary};
    color: ${({ tokens }) => tokens.theme.textPrimary};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:focus-visible:enabled,
  button:active:enabled {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);

    wui-flex.balance-container {
      background: ${({ tokens }) => tokens.theme.foregroundTertiary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled wui-text,
  button:disabled wui-flex.avatar-container {
    opacity: 0.3;
  }
`;
var __decorate$18 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiAccountButton = class WuiAccountButton2 extends i {
  constructor() {
    super(...arguments);
    this.networkSrc = void 0;
    this.avatarSrc = void 0;
    this.balance = void 0;
    this.isUnsupportedChain = void 0;
    this.disabled = false;
    this.loading = false;
    this.address = "";
    this.profileName = "";
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return b`
      <button
        ?disabled=${this.disabled}
        class=${o(this.balance ? void 0 : "local-no-balance")}
        data-error=${o(this.isUnsupportedChain)}
      >
        ${this.imageTemplate()} ${this.addressTemplate()} ${this.balanceTemplate()}
      </button>
    `;
  }
  imageTemplate() {
    const networkElement = this.networkSrc ? b`<wui-image src=${this.networkSrc}></wui-image>` : b` <wui-icon size="inherit" color="inherit" name="networkPlaceholder"></wui-icon> `;
    return b`<wui-flex class="avatar-container">
      <wui-avatar
        .imageSrc=${this.avatarSrc}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>

      <wui-flex class="network-image-container">${networkElement}</wui-flex>
    </wui-flex>`;
  }
  addressTemplate() {
    return b`<wui-text variant="md-regular" color="inherit">
      ${this.address ? UiHelperUtil.getTruncateString({
      string: this.profileName || this.address,
      charsStart: this.profileName ? 18 : this.charsStart,
      charsEnd: this.profileName ? 0 : this.charsEnd,
      truncate: this.profileName ? "end" : "middle"
    }) : null}
    </wui-text>`;
  }
  balanceTemplate() {
    if (this.balance) {
      const balanceTemplate = this.loading ? b`<wui-loading-spinner size="md" color="inherit"></wui-loading-spinner>` : b`<wui-text variant="md-regular" color="inherit"> ${this.balance}</wui-text>`;
      return b`<wui-flex alignItems="center" justifyContent="center" class="balance-container"
        >${balanceTemplate}</wui-flex
      >`;
    }
    return null;
  }
};
WuiAccountButton.styles = [resetStyles, elementStyles, styles$N];
__decorate$18([
  n()
], WuiAccountButton.prototype, "networkSrc", void 0);
__decorate$18([
  n()
], WuiAccountButton.prototype, "avatarSrc", void 0);
__decorate$18([
  n()
], WuiAccountButton.prototype, "balance", void 0);
__decorate$18([
  n({ type: Boolean })
], WuiAccountButton.prototype, "isUnsupportedChain", void 0);
__decorate$18([
  n({ type: Boolean })
], WuiAccountButton.prototype, "disabled", void 0);
__decorate$18([
  n({ type: Boolean })
], WuiAccountButton.prototype, "loading", void 0);
__decorate$18([
  n()
], WuiAccountButton.prototype, "address", void 0);
__decorate$18([
  n()
], WuiAccountButton.prototype, "profileName", void 0);
__decorate$18([
  n()
], WuiAccountButton.prototype, "charsStart", void 0);
__decorate$18([
  n()
], WuiAccountButton.prototype, "charsEnd", void 0);
WuiAccountButton = __decorate$18([
  customElement("wui-account-button")
], WuiAccountButton);
var __decorate$17 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mAccountButtonBase extends i {
  constructor() {
    super(...arguments);
    this.unsubscribe = [];
    this.disabled = false;
    this.balance = "show";
    this.charsStart = 4;
    this.charsEnd = 6;
    this.namespace = void 0;
    this.isSupported = OptionsController.state.allowUnsupportedChain ? true : ChainController.state.activeChain ? ChainController.checkIfSupportedNetwork(ChainController.state.activeChain) : true;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAccountData(ChainController.getAccountData(this.namespace));
    this.setNetworkData(ChainController.getNetworkData(this.namespace));
  }
  firstUpdated() {
    const namespace = this.namespace;
    if (namespace) {
      this.unsubscribe.push(ChainController.subscribeChainProp("accountState", (val) => {
        this.setAccountData(val);
      }, namespace), ChainController.subscribeChainProp("networkState", (val) => {
        var _a;
        this.setNetworkData(val);
        this.isSupported = ChainController.checkIfSupportedNetwork(namespace, (_a = val == null ? void 0 : val.caipNetwork) == null ? void 0 : _a.caipNetworkId);
      }, namespace));
    } else {
      this.unsubscribe.push(AssetController.subscribeNetworkImages(() => {
        this.networkImage = AssetUtil.getNetworkImage(this.network);
      }), ChainController.subscribeKey("activeCaipAddress", (val) => {
        this.caipAddress = val;
      }), ChainController.subscribeChainProp("accountState", (accountState) => {
        this.setAccountData(accountState);
      }), ChainController.subscribeKey("activeCaipNetwork", (val) => {
        this.network = val;
        this.networkImage = AssetUtil.getNetworkImage(val);
        this.isSupported = (val == null ? void 0 : val.chainNamespace) ? ChainController.checkIfSupportedNetwork(val == null ? void 0 : val.chainNamespace) : true;
        this.fetchNetworkImage(val);
      }));
    }
  }
  updated() {
    this.fetchNetworkImage(this.network);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (!ChainController.state.activeChain) {
      return null;
    }
    const shouldShowBalance = this.balance === "show";
    const shouldShowLoading = typeof this.balanceVal !== "string";
    const { formattedText } = CoreHelperUtil.parseBalance(this.balanceVal, this.balanceSymbol);
    return b`
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        .isUnsupportedChain=${OptionsController.state.allowUnsupportedChain ? false : !this.isSupported}
        address=${o(CoreHelperUtil.getPlainAddress(this.caipAddress))}
        profileName=${o(this.profileName)}
        networkSrc=${o(this.networkImage)}
        avatarSrc=${o(this.profileImage)}
        balance=${shouldShowBalance ? formattedText : ""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace ? `-${this.namespace}` : ""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${shouldShowLoading}
      >
      </wui-account-button>
    `;
  }
  onClick() {
    if (this.isSupported || OptionsController.state.allowUnsupportedChain) {
      ModalController.open({ namespace: this.namespace });
    } else {
      ModalController.open({ view: "UnsupportedChain" });
    }
  }
  async fetchNetworkImage(network) {
    var _a, _b;
    if ((_a = network == null ? void 0 : network.assets) == null ? void 0 : _a.imageId) {
      this.networkImage = await AssetUtil.fetchNetworkImage((_b = network == null ? void 0 : network.assets) == null ? void 0 : _b.imageId);
    }
  }
  setAccountData(accountState) {
    if (!accountState) {
      return;
    }
    this.caipAddress = accountState.caipAddress;
    this.balanceVal = accountState.balance;
    this.balanceSymbol = accountState.balanceSymbol;
    this.profileName = accountState.profileName;
    this.profileImage = accountState.profileImage;
  }
  setNetworkData(networkState) {
    if (!networkState) {
      return;
    }
    this.network = networkState.caipNetwork;
    this.networkImage = AssetUtil.getNetworkImage(networkState.caipNetwork);
  }
}
__decorate$17([
  n({ type: Boolean })
], W3mAccountButtonBase.prototype, "disabled", void 0);
__decorate$17([
  n()
], W3mAccountButtonBase.prototype, "balance", void 0);
__decorate$17([
  n()
], W3mAccountButtonBase.prototype, "charsStart", void 0);
__decorate$17([
  n()
], W3mAccountButtonBase.prototype, "charsEnd", void 0);
__decorate$17([
  n()
], W3mAccountButtonBase.prototype, "namespace", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "caipAddress", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "balanceVal", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "balanceSymbol", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "profileName", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "profileImage", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "network", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "networkImage", void 0);
__decorate$17([
  r()
], W3mAccountButtonBase.prototype, "isSupported", void 0);
let W3mAccountButton = class W3mAccountButton2 extends W3mAccountButtonBase {
};
W3mAccountButton = __decorate$17([
  customElement("w3m-account-button")
], W3mAccountButton);
let AppKitAccountButton = class AppKitAccountButton2 extends W3mAccountButtonBase {
};
AppKitAccountButton = __decorate$17([
  customElement("appkit-account-button")
], AppKitAccountButton);
const styles$M = i$1`
  :host {
    display: block;
    width: max-content;
  }
`;
var __decorate$16 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mButtonBase extends i {
  constructor() {
    super(...arguments);
    this.unsubscribe = [];
    this.disabled = false;
    this.balance = void 0;
    this.size = void 0;
    this.label = void 0;
    this.loadingLabel = void 0;
    this.charsStart = 4;
    this.charsEnd = 6;
    this.namespace = void 0;
  }
  firstUpdated() {
    var _a;
    this.caipAddress = this.namespace ? (_a = ChainController.getAccountData(this.namespace)) == null ? void 0 : _a.caipAddress : ChainController.state.activeCaipAddress;
    if (this.namespace) {
      this.unsubscribe.push(ChainController.subscribeChainProp("accountState", (val) => {
        this.caipAddress = val == null ? void 0 : val.caipAddress;
      }, this.namespace));
    } else {
      this.unsubscribe.push(ChainController.subscribeKey("activeCaipAddress", (val) => this.caipAddress = val));
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return this.caipAddress ? b`
          <appkit-account-button
            .disabled=${Boolean(this.disabled)}
            balance=${o(this.balance)}
            .charsStart=${o(this.charsStart)}
            .charsEnd=${o(this.charsEnd)}
            namespace=${o(this.namespace)}
          >
          </appkit-account-button>
        ` : b`
          <appkit-connect-button
            size=${o(this.size)}
            label=${o(this.label)}
            loadingLabel=${o(this.loadingLabel)}
            namespace=${o(this.namespace)}
          ></appkit-connect-button>
        `;
  }
}
W3mButtonBase.styles = styles$M;
__decorate$16([
  n({ type: Boolean })
], W3mButtonBase.prototype, "disabled", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "balance", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "size", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "label", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "loadingLabel", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "charsStart", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "charsEnd", void 0);
__decorate$16([
  n()
], W3mButtonBase.prototype, "namespace", void 0);
__decorate$16([
  r()
], W3mButtonBase.prototype, "caipAddress", void 0);
let W3mButton = class W3mButton2 extends W3mButtonBase {
};
W3mButton = __decorate$16([
  customElement("w3m-button")
], W3mButton);
let AppKitButton = class AppKitButton2 extends W3mButtonBase {
};
AppKitButton = __decorate$16([
  customElement("appkit-button")
], AppKitButton);
const styles$L = css`
  :host {
    position: relative;
    display: block;
  }

  button {
    border-radius: ${({ borderRadius }) => borderRadius[2]};
  }

  button[data-size='sm'] {
    padding: ${({ spacing }) => spacing[2]};
  }

  button[data-size='md'] {
    padding: ${({ spacing }) => spacing[3]};
  }

  button[data-size='lg'] {
    padding: ${({ spacing }) => spacing[4]};
  }

  button[data-variant='primary'] {
    background: ${({ tokens }) => tokens.core.backgroundAccentPrimary};
  }

  button[data-variant='secondary'] {
    background: ${({ tokens }) => tokens.core.foregroundAccent010};
  }

  button:hover:enabled {
    border-radius: ${({ borderRadius }) => borderRadius[3]};
  }

  button:disabled {
    cursor: not-allowed;
  }

  button[data-loading='true'] {
    cursor: not-allowed;
  }

  button[data-loading='true'][data-size='sm'] {
    border-radius: ${({ borderRadius }) => borderRadius[32]};
    padding: ${({ spacing }) => spacing[2]} ${({ spacing }) => spacing[3]};
  }

  button[data-loading='true'][data-size='md'] {
    border-radius: ${({ borderRadius }) => borderRadius[20]};
    padding: ${({ spacing }) => spacing[3]} ${({ spacing }) => spacing[4]};
  }

  button[data-loading='true'][data-size='lg'] {
    border-radius: ${({ borderRadius }) => borderRadius[16]};
    padding: ${({ spacing }) => spacing[4]} ${({ spacing }) => spacing[5]};
  }
`;
var __decorate$15 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiConnectButton = class WuiConnectButton2 extends i {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.variant = "primary";
    this.loading = false;
    this.text = "Connect Wallet";
  }
  render() {
    return b`
      <button
        data-loading=${this.loading}
        data-variant=${this.variant}
        data-size=${this.size}
        ?disabled=${this.loading}
      >
        ${this.contentTemplate()}
      </button>
    `;
  }
  contentTemplate() {
    const textVariants = {
      lg: "lg-regular",
      md: "md-regular",
      sm: "sm-regular"
    };
    const colors = {
      primary: "invert",
      secondary: "accent-primary"
    };
    if (!this.loading) {
      return b` <wui-text variant=${textVariants[this.size]} color=${colors[this.variant]}>
        ${this.text}
      </wui-text>`;
    }
    return b`<wui-loading-spinner
      color=${colors[this.variant]}
      size=${this.size}
    ></wui-loading-spinner>`;
  }
};
WuiConnectButton.styles = [resetStyles, elementStyles, styles$L];
__decorate$15([
  n()
], WuiConnectButton.prototype, "size", void 0);
__decorate$15([
  n()
], WuiConnectButton.prototype, "variant", void 0);
__decorate$15([
  n({ type: Boolean })
], WuiConnectButton.prototype, "loading", void 0);
__decorate$15([
  n()
], WuiConnectButton.prototype, "text", void 0);
WuiConnectButton = __decorate$15([
  customElement("wui-connect-button")
], WuiConnectButton);
var __decorate$14 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mConnectButtonBase extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.size = "md";
    this.label = "Connect Wallet";
    this.loadingLabel = "Connecting...";
    this.open = ModalController.state.open;
    this.loading = this.namespace ? ModalController.state.loadingNamespaceMap.get(this.namespace) : ModalController.state.loading;
    this.unsubscribe.push(ModalController.subscribe((val) => {
      this.open = val.open;
      this.loading = this.namespace ? val.loadingNamespaceMap.get(this.namespace) : val.loading;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b`
      <wui-connect-button
        size=${o(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace ? `-${this.namespace}` : ""}`}
      >
        ${this.loading ? this.loadingLabel : this.label}
      </wui-connect-button>
    `;
  }
  onClick() {
    if (this.open) {
      ModalController.close();
    } else if (!this.loading) {
      ModalController.open({ view: "Connect", namespace: this.namespace });
    }
  }
}
__decorate$14([
  n()
], W3mConnectButtonBase.prototype, "size", void 0);
__decorate$14([
  n()
], W3mConnectButtonBase.prototype, "label", void 0);
__decorate$14([
  n()
], W3mConnectButtonBase.prototype, "loadingLabel", void 0);
__decorate$14([
  n()
], W3mConnectButtonBase.prototype, "namespace", void 0);
__decorate$14([
  r()
], W3mConnectButtonBase.prototype, "open", void 0);
__decorate$14([
  r()
], W3mConnectButtonBase.prototype, "loading", void 0);
let W3mConnectButton = class W3mConnectButton2 extends W3mConnectButtonBase {
};
W3mConnectButton = __decorate$14([
  customElement("w3m-connect-button")
], W3mConnectButton);
let AppKitConnectButton = class AppKitConnectButton2 extends W3mConnectButtonBase {
};
AppKitConnectButton = __decorate$14([
  customElement("appkit-connect-button")
], AppKitConnectButton);
const styles$K = css`
  :host {
    display: block;
  }

  button {
    border-radius: ${({ borderRadius }) => borderRadius[32]};
    display: flex;
    gap: ${({ spacing }) => spacing[1]};
    padding: ${({ spacing }) => spacing[1]} ${({ spacing }) => spacing[2]}
      ${({ spacing }) => spacing[1]} ${({ spacing }) => spacing[1]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
  }

  button[data-size='sm'] > wui-icon-box,
  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-icon-box,
  button[data-size='md'] > wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='lg'] > wui-icon-box,
  button[data-size='lg'] > wui-image {
    width: 24px;
    height: 24px;
  }

  wui-image,
  wui-icon-box {
    border-radius: ${({ borderRadius }) => borderRadius[32]};
  }
`;
var __decorate$13 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiNetworkButton = class WuiNetworkButton2 extends i {
  constructor() {
    super(...arguments);
    this.imageSrc = void 0;
    this.isUnsupportedChain = void 0;
    this.disabled = false;
    this.size = "lg";
  }
  render() {
    const textVariant = {
      sm: "sm-regular",
      md: "md-regular",
      lg: "lg-regular"
    };
    return b`
      <button data-size=${this.size} data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant=${textVariant[this.size]} color="primary">
          <slot></slot>
        </wui-text>
      </button>
    `;
  }
  visualTemplate() {
    if (this.isUnsupportedChain) {
      return b` <wui-icon-box color="error" icon="warningCircle"></wui-icon-box> `;
    }
    if (this.imageSrc) {
      return b`<wui-image src=${this.imageSrc}></wui-image>`;
    }
    return b` <wui-icon size="xl" color="default" name="networkPlaceholder"></wui-icon> `;
  }
};
WuiNetworkButton.styles = [resetStyles, elementStyles, styles$K];
__decorate$13([
  n()
], WuiNetworkButton.prototype, "imageSrc", void 0);
__decorate$13([
  n({ type: Boolean })
], WuiNetworkButton.prototype, "isUnsupportedChain", void 0);
__decorate$13([
  n({ type: Boolean })
], WuiNetworkButton.prototype, "disabled", void 0);
__decorate$13([
  n()
], WuiNetworkButton.prototype, "size", void 0);
WuiNetworkButton = __decorate$13([
  customElement("wui-network-button")
], WuiNetworkButton);
const styles$J = i$1`
  :host {
    display: block;
    width: max-content;
  }
`;
var __decorate$12 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mNetworkButtonBase extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.disabled = false;
    this.network = ChainController.state.activeCaipNetwork;
    this.networkImage = AssetUtil.getNetworkImage(this.network);
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.loading = ModalController.state.loading;
    this.isSupported = OptionsController.state.allowUnsupportedChain ? true : ChainController.state.activeChain ? ChainController.checkIfSupportedNetwork(ChainController.state.activeChain) : true;
    this.unsubscribe.push(...[
      AssetController.subscribeNetworkImages(() => {
        this.networkImage = AssetUtil.getNetworkImage(this.network);
      }),
      ChainController.subscribeKey("activeCaipAddress", (val) => {
        this.caipAddress = val;
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        var _a;
        this.network = val;
        this.networkImage = AssetUtil.getNetworkImage(val);
        this.isSupported = (val == null ? void 0 : val.chainNamespace) ? ChainController.checkIfSupportedNetwork(val.chainNamespace) : true;
        AssetUtil.fetchNetworkImage((_a = val == null ? void 0 : val.assets) == null ? void 0 : _a.imageId);
      }),
      ModalController.subscribeKey("loading", (val) => this.loading = val)
    ]);
  }
  firstUpdated() {
    var _a, _b;
    AssetUtil.fetchNetworkImage((_b = (_a = this.network) == null ? void 0 : _a.assets) == null ? void 0 : _b.imageId);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const isSupported = this.network ? ChainController.checkIfSupportedNetwork(this.network.chainNamespace) : true;
    return b`
      <wui-network-button
        .disabled=${Boolean(this.disabled || this.loading)}
        .isUnsupportedChain=${OptionsController.state.allowUnsupportedChain ? false : !isSupported}
        imageSrc=${o(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `;
  }
  getLabel() {
    if (this.network) {
      if (!this.isSupported && !OptionsController.state.allowUnsupportedChain) {
        return "Switch Network";
      }
      return this.network.name;
    }
    if (this.label) {
      return this.label;
    }
    if (this.caipAddress) {
      return "Unknown Network";
    }
    return "Select Network";
  }
  onClick() {
    if (!this.loading) {
      EventsController.sendEvent({ type: "track", event: "CLICK_NETWORKS" });
      ModalController.open({ view: "Networks" });
    }
  }
}
W3mNetworkButtonBase.styles = styles$J;
__decorate$12([
  n({ type: Boolean })
], W3mNetworkButtonBase.prototype, "disabled", void 0);
__decorate$12([
  n({ type: String })
], W3mNetworkButtonBase.prototype, "label", void 0);
__decorate$12([
  r()
], W3mNetworkButtonBase.prototype, "network", void 0);
__decorate$12([
  r()
], W3mNetworkButtonBase.prototype, "networkImage", void 0);
__decorate$12([
  r()
], W3mNetworkButtonBase.prototype, "caipAddress", void 0);
__decorate$12([
  r()
], W3mNetworkButtonBase.prototype, "loading", void 0);
__decorate$12([
  r()
], W3mNetworkButtonBase.prototype, "isSupported", void 0);
let W3mNetworkButton = class W3mNetworkButton2 extends W3mNetworkButtonBase {
};
W3mNetworkButton = __decorate$12([
  customElement("w3m-network-button")
], W3mNetworkButton);
let AppKitNetworkButton = class AppKitNetworkButton2 extends W3mNetworkButtonBase {
};
AppKitNetworkButton = __decorate$12([
  customElement("appkit-network-button")
], AppKitNetworkButton);
const styles$I = css`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ spacing }) => spacing[4]};
    padding: ${({ spacing }) => spacing[3]};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    background-color: ${({ tokens }) => tokens.core.foregroundAccent010};
  }

  wui-flex > wui-icon {
    padding: ${({ spacing }) => spacing[2]};
    color: ${({ tokens }) => tokens.theme.textInvert};
    background-color: ${({ tokens }) => tokens.core.backgroundAccentPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[2]};
    align-items: center;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens }) => tokens.core.foregroundAccent020};
    }
  }
`;
var __decorate$11 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiNoticeCard = class WuiNoticeCard2 extends i {
  constructor() {
    super(...arguments);
    this.label = "";
    this.description = "";
    this.icon = "wallet";
  }
  render() {
    return b`
      <button>
        <wui-flex gap="2" alignItems="center">
          <wui-icon weight="fill" size="lg" name=${this.icon} color="inherit"></wui-icon>
          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="md-medium" color="primary">${this.label}</wui-text>
            <wui-text variant="md-regular" color="tertiary">${this.description}</wui-text>
          </wui-flex>
        </wui-flex>
        <wui-icon size="lg" color="accent-primary" name="chevronRight"></wui-icon>
      </button>
    `;
  }
};
WuiNoticeCard.styles = [resetStyles, elementStyles, styles$I];
__decorate$11([
  n()
], WuiNoticeCard.prototype, "label", void 0);
__decorate$11([
  n()
], WuiNoticeCard.prototype, "description", void 0);
__decorate$11([
  n()
], WuiNoticeCard.prototype, "icon", void 0);
WuiNoticeCard = __decorate$11([
  customElement("wui-notice-card")
], WuiNoticeCard);
var __decorate$10 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountAuthButton = class W3mAccountAuthButton2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.socialProvider = StorageUtil.getConnectedSocialProvider();
    this.socialUsername = StorageUtil.getConnectedSocialUsername();
    this.namespace = ChainController.state.activeChain;
    this.unsubscribe.push(ChainController.subscribeKey("activeChain", (namespace) => {
      this.namespace = namespace;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsub) => unsub());
  }
  render() {
    const connectorId = ConnectorController.getConnectorId(this.namespace);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector || connectorId !== ConstantsUtil.CONNECTOR_ID.AUTH) {
      this.style.cssText = `display: none`;
      return null;
    }
    const email = authConnector.provider.getEmail() ?? "";
    if (!email && !this.socialUsername) {
      this.style.cssText = `display: none`;
      return null;
    }
    return b`
      <wui-list-item
        ?rounded=${true}
        icon=${this.socialProvider ?? "mail"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${() => {
      this.onGoToUpdateEmail(email, this.socialProvider);
    }}
      >
        <wui-text variant="lg-regular" color="primary">${this.getAuthName(email)}</wui-text>
      </wui-list-item>
    `;
  }
  onGoToUpdateEmail(email, socialProvider) {
    if (!socialProvider) {
      RouterController.push("UpdateEmailWallet", { email, redirectView: "Account" });
    }
  }
  getAuthName(email) {
    if (this.socialUsername) {
      if (this.socialProvider === "discord" && this.socialUsername.endsWith("0")) {
        return this.socialUsername.slice(0, -1);
      }
      return this.socialUsername;
    }
    return email.length > 30 ? `${email.slice(0, -3)}...` : email;
  }
};
__decorate$10([
  r()
], W3mAccountAuthButton.prototype, "namespace", void 0);
W3mAccountAuthButton = __decorate$10([
  customElement("w3m-account-auth-button")
], W3mAccountAuthButton);
var __decorate$$ = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountSettingsView = class W3mAccountSettingsView2 extends i {
  constructor() {
    var _a, _b, _c;
    super();
    this.usubscribe = [];
    this.networkImages = AssetController.state.networkImages;
    this.address = (_a = ChainController.getAccountData()) == null ? void 0 : _a.address;
    this.profileImage = (_b = ChainController.getAccountData()) == null ? void 0 : _b.profileImage;
    this.profileName = (_c = ChainController.getAccountData()) == null ? void 0 : _c.profileName;
    this.network = ChainController.state.activeCaipNetwork;
    this.disconnecting = false;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.usubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val) {
          this.address = val.address;
          this.profileImage = val.profileImage;
          this.profileName = val.profileName;
        }
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        if (val == null ? void 0 : val.id) {
          this.network = val;
        }
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => {
        this.remoteFeatures = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.usubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    var _a, _b, _c;
    if (!this.address) {
      throw new Error("w3m-account-settings-view: No account provided");
    }
    const networkImage = this.networkImages[((_b = (_a = this.network) == null ? void 0 : _a.assets) == null ? void 0 : _b.imageId) ?? ""];
    return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["0", "5", "3", "5"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${o(this.profileImage)}
          size="lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="1" alignItems="center" justifyContent="center">
            <wui-text variant="h5-medium" color="primary" data-testid="account-settings-address">
              ${UiHelperUtil.getTruncateString({
      string: this.address,
      charsStart: 4,
      charsEnd: 6,
      truncate: "middle"
    })}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="default"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="4">
        <wui-flex flexDirection="column" gap="2" .padding=${["6", "4", "3", "4"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            imageSrc=${o(networkImage)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            ?fullSize=${true}
            ?rounded=${true}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="lg-regular" color="primary">
              ${((_c = this.network) == null ? void 0 : _c.name) ?? "Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.smartAccountSettingsTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            ?rounded=${true}
            icon="power"
            iconColor="error"
            ?chevron=${false}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="lg-regular" color="primary">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
  }
  chooseNameButtonTemplate() {
    var _a;
    const namespace = (_a = this.network) == null ? void 0 : _a.chainNamespace;
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    const hasNetworkSupport = ChainController.checkIfNamesSupported();
    if (!hasNetworkSupport || !authConnector || connectorId !== ConstantsUtil.CONNECTOR_ID.AUTH || this.profileName) {
      return null;
    }
    return b`
      <wui-list-item
        icon="id"
        ?rounded=${true}
        ?chevron=${true}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="lg-regular" color="primary">Choose account name </wui-text>
      </wui-list-item>
    `;
  }
  authCardTemplate() {
    var _a;
    const connectorId = ConnectorController.getConnectorId((_a = this.network) == null ? void 0 : _a.chainNamespace);
    const authConnector = ConnectorController.getAuthConnector();
    const { origin } = location;
    if (!authConnector || connectorId !== ConstantsUtil.CONNECTOR_ID.AUTH || origin.includes(ConstantsUtil$1.SECURE_SITE)) {
      return null;
    }
    return b`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
  }
  isAllowedNetworkSwitch() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
    const isValidNetwork = requestedCaipNetworks == null ? void 0 : requestedCaipNetworks.find(({ id }) => {
      var _a;
      return id === ((_a = this.network) == null ? void 0 : _a.id);
    });
    return isMultiNetwork || !isValidNetwork;
  }
  onCopyAddress() {
    try {
      if (this.address) {
        CoreHelperUtil.copyToClopboard(this.address);
        SnackController.showSuccess("Address copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
  smartAccountSettingsTemplate() {
    var _a;
    const namespace = (_a = this.network) == null ? void 0 : _a.chainNamespace;
    const isNetworkEnabled = ChainController.checkIfSmartAccountEnabled();
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector || connectorId !== ConstantsUtil.CONNECTOR_ID.AUTH || !isNetworkEnabled) {
      return null;
    }
    return b`
      <wui-list-item
        icon="user"
        ?rounded=${true}
        ?chevron=${true}
        @click=${this.onSmartAccountSettings.bind(this)}
        data-testid="account-smart-account-settings-button"
      >
        <wui-text variant="lg-regular" color="primary">Smart Account Settings</wui-text>
      </wui-list-item>
    `;
  }
  onChooseName() {
    RouterController.push("ChooseAccountName");
  }
  onNetworks() {
    if (this.isAllowedNetworkSwitch()) {
      RouterController.push("Networks");
    }
  }
  async onDisconnect() {
    var _a, _b;
    try {
      this.disconnecting = true;
      const namespace = (_a = this.network) == null ? void 0 : _a.chainNamespace;
      const connectionsByNamespace = ConnectionController.getConnections(namespace);
      const hasConnections = connectionsByNamespace.length > 0;
      const connectorId = namespace && ConnectorController.state.activeConnectorIds[namespace];
      const isMultiWalletEnabled = (_b = this.remoteFeatures) == null ? void 0 : _b.multiWallet;
      await ConnectionController.disconnect(isMultiWalletEnabled ? { id: connectorId, namespace } : {});
      if (hasConnections && isMultiWalletEnabled) {
        RouterController.push("ProfileWallets");
        SnackController.showSuccess("Wallet deleted");
      }
    } catch {
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: { message: "Failed to disconnect" }
      });
      SnackController.showError("Failed to disconnect");
    } finally {
      this.disconnecting = false;
    }
  }
  onGoToUpgradeView() {
    EventsController.sendEvent({ type: "track", event: "EMAIL_UPGRADE_FROM_MODAL" });
    RouterController.push("UpgradeEmailWallet");
  }
  onSmartAccountSettings() {
    RouterController.push("SmartAccountSettings");
  }
};
__decorate$$([
  r()
], W3mAccountSettingsView.prototype, "address", void 0);
__decorate$$([
  r()
], W3mAccountSettingsView.prototype, "profileImage", void 0);
__decorate$$([
  r()
], W3mAccountSettingsView.prototype, "profileName", void 0);
__decorate$$([
  r()
], W3mAccountSettingsView.prototype, "network", void 0);
__decorate$$([
  r()
], W3mAccountSettingsView.prototype, "disconnecting", void 0);
__decorate$$([
  r()
], W3mAccountSettingsView.prototype, "remoteFeatures", void 0);
W3mAccountSettingsView = __decorate$$([
  customElement("w3m-account-settings-view")
], W3mAccountSettingsView);
const styles$H = css`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({ spacing }) => spacing[1]} ${({ spacing }) => spacing[2]};
    column-gap: ${({ spacing }) => spacing[1]};
    color: ${({ tokens }) => tokens.theme.textSecondary};
    border-radius: ${({ borderRadius }) => borderRadius[20]};
    background-color: transparent;
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({ tokens }) => tokens.theme.textPrimary};
    background-color: ${({ tokens }) => tokens.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({ tokens }) => tokens.theme.textPrimary};
    }
  }
`;
var __decorate$_ = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_VARIANT_BY_SIZE = {
  lg: "lg-regular",
  md: "md-regular",
  sm: "sm-regular"
};
const ICON_SIZE = {
  lg: "md",
  md: "sm",
  sm: "sm"
};
let WuiTab = class WuiTab2 extends i {
  constructor() {
    super(...arguments);
    this.icon = "mobile";
    this.size = "md";
    this.label = "";
    this.active = false;
  }
  render() {
    return b`
      <button data-active=${this.active}>
        ${this.icon ? b`<wui-icon size=${ICON_SIZE[this.size]} name=${this.icon}></wui-icon>` : ""}
        <wui-text variant=${TEXT_VARIANT_BY_SIZE[this.size]}> ${this.label} </wui-text>
      </button>
    `;
  }
};
WuiTab.styles = [resetStyles, elementStyles, styles$H];
__decorate$_([
  n()
], WuiTab.prototype, "icon", void 0);
__decorate$_([
  n()
], WuiTab.prototype, "size", void 0);
__decorate$_([
  n()
], WuiTab.prototype, "label", void 0);
__decorate$_([
  n({ type: Boolean })
], WuiTab.prototype, "active", void 0);
WuiTab = __decorate$_([
  customElement("wui-tab-item")
], WuiTab);
const styles$G = css`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    border-radius: ${({ borderRadius }) => borderRadius[32]};
    padding: ${({ spacing }) => spacing["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;
var __decorate$Z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTabs = class WuiTabs2 extends i {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.onTabChange = () => null;
    this.size = "md";
    this.activeTab = 0;
  }
  render() {
    this.dataset["size"] = this.size;
    return this.tabs.map((tab, index) => {
      var _a;
      const isActive = index === this.activeTab;
      return b`
        <wui-tab-item
          @click=${() => this.onTabClick(index)}
          icon=${tab.icon}
          size=${this.size}
          label=${tab.label}
          ?active=${isActive}
          data-active=${isActive}
          data-testid="tab-${(_a = tab.label) == null ? void 0 : _a.toLowerCase()}"
        ></wui-tab-item>
      `;
    });
  }
  onTabClick(index) {
    this.activeTab = index;
    this.onTabChange(index);
  }
};
WuiTabs.styles = [resetStyles, elementStyles, styles$G];
__decorate$Z([
  n({ type: Array })
], WuiTabs.prototype, "tabs", void 0);
__decorate$Z([
  n()
], WuiTabs.prototype, "onTabChange", void 0);
__decorate$Z([
  n()
], WuiTabs.prototype, "size", void 0);
__decorate$Z([
  r()
], WuiTabs.prototype, "activeTab", void 0);
WuiTabs = __decorate$Z([
  customElement("wui-tabs")
], WuiTabs);
const styles$F = css`
  wui-icon-link {
    margin-right: calc(${({ spacing }) => spacing["8"]} * -1);
  }

  wui-notice-card {
    margin-bottom: ${({ spacing }) => spacing["1"]};
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .balance-container {
    display: inline;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .symbol {
    transform: translateY(-2px);
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing }) => spacing["3"]};
    height: 48px;
    padding: ${({ spacing }) => spacing["2"]};
    padding-right: ${({ spacing }) => spacing["3"]};
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.theme.foregroundPrimary};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[6]};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
  }

  .account-button:hover {
    background-color: ${({ tokens }) => tokens.core.glass010};
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.core.glass010};
  }

  wui-wallet-switch {
    margin-top: ${({ spacing }) => spacing["2"]};
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.core.glass010};
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color ${({ durations }) => durations["md"]}
        ${({ easings }) => easings["ease-out-power-1"]},
      opacity ${({ durations }) => durations["md"]} ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;
var __decorate$Y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountDefaultWidget = class W3mAccountDefaultWidget2 extends i {
  constructor() {
    var _a, _b, _c, _d, _e, _f;
    super();
    this.unsubscribe = [];
    this.caipAddress = (_a = ChainController.getAccountData()) == null ? void 0 : _a.caipAddress;
    this.address = CoreHelperUtil.getPlainAddress((_b = ChainController.getAccountData()) == null ? void 0 : _b.caipAddress);
    this.profileImage = (_c = ChainController.getAccountData()) == null ? void 0 : _c.profileImage;
    this.profileName = (_d = ChainController.getAccountData()) == null ? void 0 : _d.profileName;
    this.disconnecting = false;
    this.balance = (_e = ChainController.getAccountData()) == null ? void 0 : _e.balance;
    this.balanceSymbol = (_f = ChainController.getAccountData()) == null ? void 0 : _f.balanceSymbol;
    this.features = OptionsController.state.features;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.namespace = ChainController.state.activeChain;
    this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        this.address = CoreHelperUtil.getPlainAddress(val == null ? void 0 : val.caipAddress);
        this.caipAddress = val == null ? void 0 : val.caipAddress;
        this.balance = val == null ? void 0 : val.balance;
        this.balanceSymbol = val == null ? void 0 : val.balanceSymbol;
        this.profileName = val == null ? void 0 : val.profileName;
        this.profileImage = val == null ? void 0 : val.profileImage;
      }),
      OptionsController.subscribeKey("features", (val) => this.features = val),
      OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val),
      ConnectorController.subscribeKey("activeConnectorIds", (newActiveConnectorIds) => {
        this.activeConnectorIds = newActiveConnectorIds;
      }),
      ChainController.subscribeKey("activeChain", (val) => this.namespace = val),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        if (val == null ? void 0 : val.chainNamespace) {
          this.namespace = val == null ? void 0 : val.chainNamespace;
        }
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (!this.caipAddress || !this.namespace) {
      return null;
    }
    const connectorId = this.activeConnectorIds[this.namespace];
    const connector = connectorId ? ConnectorController.getConnectorById(connectorId) : void 0;
    const connectorImage = AssetUtil.getConnectorImage(connector);
    const { value, decimals, symbol } = CoreHelperUtil.parseBalance(this.balance, this.balanceSymbol);
    return b`<wui-flex
        flexDirection="column"
        .padding=${["0", "5", "4", "5"]}
        alignItems="center"
        gap="3"
      >
        <wui-avatar
          alt=${o(this.caipAddress)}
          address=${o(CoreHelperUtil.getPlainAddress(this.caipAddress))}
          imageSrc=${o(this.profileImage === null ? void 0 : this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${connectorImage}
          alt=${connector == null ? void 0 : connector.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <div class="balance-container">
          <wui-text variant="h3-regular" color="primary">${value}</wui-text>
          <wui-text variant="h3-regular" color="secondary">.${decimals}</wui-text>
          <wui-text variant="h6-medium" color="primary" class="symbol">${symbol}</wui-text>
        </div>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="2" .padding=${["0", "3", "3", "3"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          .rounded=${true}
          icon="power"
          iconColor="error"
          ?chevron=${false}
          .loading=${this.disconnecting}
          .rightIcon=${false}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="lg-regular" color="primary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`;
  }
  fundWalletTemplate() {
    var _a, _b;
    if (!this.namespace) {
      return null;
    }
    const isOnrampSupported = ConstantsUtil$1.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
    const isReceiveEnabled = Boolean((_a = this.features) == null ? void 0 : _a.receive);
    const isOnrampEnabled = ((_b = this.remoteFeatures) == null ? void 0 : _b.onramp) && isOnrampSupported;
    const isPayWithExchangeEnabled = ExchangeController.isPayWithExchangeEnabled();
    if (!isOnrampEnabled && !isReceiveEnabled && !isPayWithExchangeEnabled) {
      return null;
    }
    return b`
      <wui-list-item
        .rounded=${true}
        data-testid="w3m-account-default-fund-wallet-button"
        iconVariant="blue"
        icon="dollar"
        ?chevron=${true}
        @click=${this.handleClickFundWallet.bind(this)}
      >
        <wui-text variant="lg-regular" color="primary">Fund wallet</wui-text>
      </wui-list-item>
    `;
  }
  orderedFeaturesTemplate() {
    var _a;
    const featuresOrder = ((_a = this.features) == null ? void 0 : _a.walletFeaturesOrder) || ConstantsUtil$1.DEFAULT_FEATURES.walletFeaturesOrder;
    return featuresOrder.map((feature) => {
      switch (feature) {
        case "onramp":
          return this.fundWalletTemplate();
        case "swaps":
          return this.swapsTemplate();
        case "send":
          return this.sendTemplate();
        default:
          return null;
      }
    });
  }
  activityTemplate() {
    var _a;
    if (!this.namespace) {
      return null;
    }
    const isEnabled = ((_a = this.remoteFeatures) == null ? void 0 : _a.activity) && ConstantsUtil$1.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace);
    return isEnabled ? b` <wui-list-item
          .rounded=${true}
          icon="clock"
          ?chevron=${true}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="lg-regular" color="primary">Activity</wui-text>
        </wui-list-item>` : null;
  }
  swapsTemplate() {
    var _a;
    const isSwapsEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.swaps;
    const isEvm = ChainController.state.activeChain === ConstantsUtil.CHAIN.EVM;
    if (!isSwapsEnabled || !isEvm) {
      return null;
    }
    return b`
      <wui-list-item
        .rounded=${true}
        icon="recycleHorizontal"
        ?chevron=${true}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="lg-regular" color="primary">Swap</wui-text>
      </wui-list-item>
    `;
  }
  sendTemplate() {
    var _a;
    const isSendEnabled = (_a = this.features) == null ? void 0 : _a.send;
    const namespace = ChainController.state.activeChain;
    if (!namespace) {
      throw new Error("SendController:sendTemplate - namespace is required");
    }
    const isSendSupported = ConstantsUtil$1.SEND_SUPPORTED_NAMESPACES.includes(namespace);
    if (!isSendEnabled || !isSendSupported) {
      return null;
    }
    return b`
      <wui-list-item
        .rounded=${true}
        icon="send"
        ?chevron=${true}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="lg-regular" color="primary">Send</wui-text>
      </wui-list-item>
    `;
  }
  authCardTemplate() {
    const namespace = ChainController.state.activeChain;
    if (!namespace) {
      throw new Error("AuthCardTemplate:authCardTemplate - namespace is required");
    }
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    const { origin } = location;
    if (!authConnector || connectorId !== ConstantsUtil.CONNECTOR_ID.AUTH || origin.includes(ConstantsUtil$1.SECURE_SITE)) {
      return null;
    }
    return b`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
  }
  handleClickFundWallet() {
    RouterController.push("FundWallet");
  }
  handleClickSwap() {
    RouterController.push("Swap");
  }
  handleClickSend() {
    RouterController.push("WalletSend");
  }
  explorerBtnTemplate() {
    var _a;
    const addressExplorerUrl = (_a = ChainController.getAccountData()) == null ? void 0 : _a.addressExplorerUrl;
    if (!addressExplorerUrl) {
      return null;
    }
    return b`
      <wui-button size="md" variant="accent-primary" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `;
  }
  onTransactions() {
    EventsController.sendEvent({
      type: "track",
      event: "CLICK_TRANSACTIONS",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("Transactions");
  }
  async onDisconnect() {
    var _a;
    try {
      this.disconnecting = true;
      const connectionsByNamespace = ConnectionController.getConnections(this.namespace);
      const hasConnections = connectionsByNamespace.length > 0;
      const connectorId = this.namespace && ConnectorController.state.activeConnectorIds[this.namespace];
      const isMultiWalletEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.multiWallet;
      await ConnectionController.disconnect(isMultiWalletEnabled ? { id: connectorId, namespace: this.namespace } : {});
      if (hasConnections && isMultiWalletEnabled) {
        RouterController.push("ProfileWallets");
        SnackController.showSuccess("Wallet deleted");
      }
    } catch {
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: { message: "Failed to disconnect" }
      });
      SnackController.showError("Failed to disconnect");
    } finally {
      this.disconnecting = false;
    }
  }
  onExplorer() {
    var _a;
    const addressExplorerUrl = (_a = ChainController.getAccountData()) == null ? void 0 : _a.addressExplorerUrl;
    if (addressExplorerUrl) {
      CoreHelperUtil.openHref(addressExplorerUrl, "_blank");
    }
  }
  onGoToUpgradeView() {
    EventsController.sendEvent({ type: "track", event: "EMAIL_UPGRADE_FROM_MODAL" });
    RouterController.push("UpgradeEmailWallet");
  }
  onGoToProfileWalletsView() {
    RouterController.push("ProfileWallets");
  }
};
W3mAccountDefaultWidget.styles = styles$F;
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "caipAddress", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "address", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "profileImage", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "profileName", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "disconnecting", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "balance", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "balanceSymbol", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "features", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "remoteFeatures", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "namespace", void 0);
__decorate$Y([
  r()
], W3mAccountDefaultWidget.prototype, "activeConnectorIds", void 0);
W3mAccountDefaultWidget = __decorate$Y([
  customElement("w3m-account-default-widget")
], W3mAccountDefaultWidget);
const styles$E = css`
  span {
    font-weight: 500;
    font-size: 38px;
    color: ${({ tokens }) => tokens.theme.textPrimary};
    line-height: 38px;
    letter-spacing: -2%;
    text-align: center;
    font-family: var(--apkt-fontFamily-regular);
  }

  .pennies {
    color: ${({ tokens }) => tokens.theme.textSecondary};
  }
`;
var __decorate$X = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiBalance = class WuiBalance2 extends i {
  constructor() {
    super(...arguments);
    this.dollars = "0";
    this.pennies = "00";
  }
  render() {
    return b`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`;
  }
};
WuiBalance.styles = [resetStyles, styles$E];
__decorate$X([
  n()
], WuiBalance.prototype, "dollars", void 0);
__decorate$X([
  n()
], WuiBalance.prototype, "pennies", void 0);
WuiBalance = __decorate$X([
  customElement("wui-balance")
], WuiBalance);
const styles$D = css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  /* -- Variants --------------------------------------------------------- */
  :host([data-variant='fill']) {
    background-color: ${({ colors }) => colors.neutrals100};
  }

  :host([data-variant='shade']) {
    background-color: ${({ colors }) => colors.neutrals900};
  }

  :host([data-variant='fill']) > wui-text {
    color: ${({ colors }) => colors.black};
  }

  :host([data-variant='shade']) > wui-text {
    color: ${({ colors }) => colors.white};
  }

  :host([data-variant='fill']) > wui-icon {
    color: ${({ colors }) => colors.neutrals100};
  }

  :host([data-variant='shade']) > wui-icon {
    color: ${({ colors }) => colors.neutrals900};
  }

  /* -- Sizes --------------------------------------------------------- */
  :host([data-size='sm']) {
    padding: ${({ spacing }) => spacing[1]} ${({ spacing }) => spacing[2]};
    border-radius: ${({ borderRadius }) => borderRadius[2]};
  }

  :host([data-size='md']) {
    padding: ${({ spacing }) => spacing[2]} ${({ spacing }) => spacing[3]};
    border-radius: ${({ borderRadius }) => borderRadius[3]};
  }

  /* -- Placements --------------------------------------------------------- */
  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;
var __decorate$W = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TEXT_SIZE = {
  sm: "sm-regular",
  md: "md-regular"
};
let WuiTooltip = class WuiTooltip2 extends i {
  constructor() {
    super(...arguments);
    this.placement = "top";
    this.variant = "fill";
    this.size = "md";
    this.message = "";
  }
  render() {
    this.dataset["variant"] = this.variant;
    this.dataset["size"] = this.size;
    return b`<wui-icon data-placement=${this.placement} size="inherit" name="cursor"></wui-icon>
      <wui-text variant=${TEXT_SIZE[this.size]}>${this.message}</wui-text>`;
  }
};
WuiTooltip.styles = [resetStyles, elementStyles, styles$D];
__decorate$W([
  n()
], WuiTooltip.prototype, "placement", void 0);
__decorate$W([
  n()
], WuiTooltip.prototype, "variant", void 0);
__decorate$W([
  n()
], WuiTooltip.prototype, "size", void 0);
__decorate$W([
  n()
], WuiTooltip.prototype, "message", void 0);
WuiTooltip = __decorate$W([
  customElement("wui-tooltip")
], WuiTooltip);
const styles$C = i$1`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$V = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountActivityWidget = class W3mAccountActivityWidget2 extends i {
  render() {
    return b`<w3m-activity-list page="account"></w3m-activity-list>`;
  }
};
W3mAccountActivityWidget.styles = styles$C;
W3mAccountActivityWidget = __decorate$V([
  customElement("w3m-account-activity-widget")
], W3mAccountActivityWidget);
const styles$B = css`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ spacing }) => spacing[4]};
    padding: ${({ spacing }) => spacing[4]};
    background-color: transparent;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  wui-text {
    max-width: 174px;
  }

  .tag-container {
    width: fit-content;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    }
  }
`;
var __decorate$U = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListDescription = class WuiListDescription2 extends i {
  constructor() {
    super(...arguments);
    this.icon = "card";
    this.text = "";
    this.description = "";
    this.tag = void 0;
    this.disabled = false;
  }
  render() {
    return b`
      <button ?disabled=${this.disabled}>
        <wui-flex alignItems="center" gap="3">
          <wui-icon-box padding="2" color="secondary" icon=${this.icon} size="lg"></wui-icon-box>
          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="md-medium" color="primary">${this.text}</wui-text>
            ${this.description ? b`<wui-text variant="md-regular" color="secondary">
                  ${this.description}</wui-text
                >` : null}
          </wui-flex>
        </wui-flex>

        <wui-flex class="tag-container" alignItems="center" gap="1" justifyContent="flex-end">
          ${this.tag ? b`<wui-tag tagType="main" size="sm">${this.tag}</wui-tag>` : null}
          <wui-icon size="md" name="chevronRight" color="default"></wui-icon>
        </wui-flex>
      </button>
    `;
  }
};
WuiListDescription.styles = [resetStyles, elementStyles, styles$B];
__decorate$U([
  n()
], WuiListDescription.prototype, "icon", void 0);
__decorate$U([
  n()
], WuiListDescription.prototype, "text", void 0);
__decorate$U([
  n()
], WuiListDescription.prototype, "description", void 0);
__decorate$U([
  n()
], WuiListDescription.prototype, "tag", void 0);
__decorate$U([
  n({ type: Boolean })
], WuiListDescription.prototype, "disabled", void 0);
WuiListDescription = __decorate$U([
  customElement("wui-list-description")
], WuiListDescription);
const styles$A = i$1`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$T = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountTokensWidget = class W3mAccountTokensWidget2 extends i {
  constructor() {
    var _a;
    super();
    this.unsubscribe = [];
    this.tokenBalance = (_a = ChainController.getAccountData()) == null ? void 0 : _a.tokenBalance;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        this.tokenBalance = val == null ? void 0 : val.tokenBalance;
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => {
        this.remoteFeatures = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b`${this.tokenTemplate()}`;
  }
  tokenTemplate() {
    var _a;
    if (this.tokenBalance && ((_a = this.tokenBalance) == null ? void 0 : _a.length) > 0) {
      return b`<wui-flex class="contentContainer" flexDirection="column" gap="2">
        ${this.tokenItemTemplate()}
      </wui-flex>`;
    }
    return b` <wui-flex flexDirection="column">
      ${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Scan the QR code and receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="w3m-account-receive-button"
      ></wui-list-description
    ></wui-flex>`;
  }
  onRampTemplate() {
    var _a;
    if ((_a = this.remoteFeatures) == null ? void 0 : _a.onramp) {
      return b`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="w3m-account-onramp-button"
      ></wui-list-description>`;
    }
    return b``;
  }
  tokenItemTemplate() {
    var _a;
    return (_a = this.tokenBalance) == null ? void 0 : _a.map((token) => b`<wui-list-token
          tokenName=${token.name}
          tokenImageUrl=${token.iconUrl}
          tokenAmount=${token.quantity.numeric}
          tokenValue=${token.value}
          tokenCurrency=${token.symbol}
        ></wui-list-token>`);
  }
  onReceiveClick() {
    RouterController.push("WalletReceive");
  }
  onBuyClick() {
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_BUY_CRYPTO",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("OnRampProviders");
  }
};
W3mAccountTokensWidget.styles = styles$A;
__decorate$T([
  r()
], W3mAccountTokensWidget.prototype, "tokenBalance", void 0);
__decorate$T([
  r()
], W3mAccountTokensWidget.prototype, "remoteFeatures", void 0);
W3mAccountTokensWidget = __decorate$T([
  customElement("w3m-account-tokens-widget")
], W3mAccountTokensWidget);
const styles$z = css`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * ${({ spacing }) => spacing["4"]});
  }

  wui-promo + wui-profile-button {
    margin-top: ${({ spacing }) => spacing["4"]};
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;
var __decorate$S = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountWalletFeaturesWidget = class W3mAccountWalletFeaturesWidget2 extends i {
  constructor() {
    var _a, _b, _c, _d;
    super(...arguments);
    this.unsubscribe = [];
    this.network = ChainController.state.activeCaipNetwork;
    this.profileName = (_a = ChainController.getAccountData()) == null ? void 0 : _a.profileName;
    this.address = (_b = ChainController.getAccountData()) == null ? void 0 : _b.address;
    this.currentTab = (_c = ChainController.getAccountData()) == null ? void 0 : _c.currentTab;
    this.tokenBalance = (_d = ChainController.getAccountData()) == null ? void 0 : _d.tokenBalance;
    this.features = OptionsController.state.features;
    this.namespace = ChainController.state.activeChain;
    this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
  }
  firstUpdated() {
    ChainController.fetchTokenBalance();
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val == null ? void 0 : val.address) {
          this.address = val.address;
          this.profileName = val.profileName;
          this.currentTab = val.currentTab;
          this.tokenBalance = val.tokenBalance;
        } else {
          ModalController.close();
        }
      })
    ], ConnectorController.subscribeKey("activeConnectorIds", (newActiveConnectorIds) => {
      this.activeConnectorIds = newActiveConnectorIds;
    }), ChainController.subscribeKey("activeChain", (val) => this.namespace = val), ChainController.subscribeKey("activeCaipNetwork", (val) => this.network = val), OptionsController.subscribeKey("features", (val) => this.features = val), OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
    this.watchSwapValues();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    clearInterval(this.watchTokenBalance);
  }
  render() {
    if (!this.address) {
      throw new Error("w3m-account-features-widget: No account provided");
    }
    if (!this.namespace) {
      return null;
    }
    const connectorId = this.activeConnectorIds[this.namespace];
    const connector = connectorId ? ConnectorController.getConnectorById(connectorId) : void 0;
    const { icon, iconSize } = this.getAuthData();
    return b`<wui-flex
      flexDirection="column"
      .padding=${["0", "3", "4", "3"]}
      alignItems="center"
      gap="4"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="2">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${icon}
          iconSize=${iconSize}
          alt=${connector == null ? void 0 : connector.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`;
  }
  orderedWalletFeatures() {
    var _a;
    const walletFeaturesOrder = ((_a = this.features) == null ? void 0 : _a.walletFeaturesOrder) || ConstantsUtil$1.DEFAULT_FEATURES.walletFeaturesOrder;
    const isAllDisabled = walletFeaturesOrder.every((feature) => {
      var _a2, _b;
      if (feature === "send" || feature === "receive") {
        return !((_a2 = this.features) == null ? void 0 : _a2[feature]);
      }
      if (feature === "swaps" || feature === "onramp") {
        return !((_b = this.remoteFeatures) == null ? void 0 : _b[feature]);
      }
      return true;
    });
    if (isAllDisabled) {
      return null;
    }
    const mergedFeaturesOrder = walletFeaturesOrder.map((feature) => {
      if (feature === "receive" || feature === "onramp") {
        return "fund";
      }
      return feature;
    });
    const deduplicatedFeaturesOrder = [...new Set(mergedFeaturesOrder)];
    return b`<wui-flex gap="2">
      ${deduplicatedFeaturesOrder.map((feature) => {
      switch (feature) {
        case "fund":
          return this.fundWalletTemplate();
        case "swaps":
          return this.swapsTemplate();
        case "send":
          return this.sendTemplate();
        default:
          return null;
      }
    })}
    </wui-flex>`;
  }
  fundWalletTemplate() {
    var _a, _b;
    if (!this.namespace) {
      return null;
    }
    const isOnrampSupported = ConstantsUtil$1.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
    const isReceiveEnabled = (_a = this.features) == null ? void 0 : _a.receive;
    const isOnrampEnabled = ((_b = this.remoteFeatures) == null ? void 0 : _b.onramp) && isOnrampSupported;
    const isPayWithExchangeEnabled = ExchangeController.isPayWithExchangeEnabled();
    if (!isOnrampEnabled && !isReceiveEnabled && !isPayWithExchangeEnabled) {
      return null;
    }
    return b`
      <w3m-tooltip-trigger text="Fund wallet">
        <wui-button
          data-testid="wallet-features-fund-wallet-button"
          @click=${this.onFundWalletClick.bind(this)}
          variant="accent-secondary"
          size="lg"
          fullWidth
        >
          <wui-icon name="dollar"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `;
  }
  swapsTemplate() {
    var _a;
    const isSwapsEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.swaps;
    const isEvm = ChainController.state.activeChain === ConstantsUtil.CHAIN.EVM;
    if (!isSwapsEnabled || !isEvm) {
      return null;
    }
    return b`
      <w3m-tooltip-trigger text="Swap">
        <wui-button
          fullWidth
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          variant="accent-secondary"
          size="lg"
        >
          <wui-icon name="recycleHorizontal"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `;
  }
  sendTemplate() {
    var _a;
    const isSendEnabled = (_a = this.features) == null ? void 0 : _a.send;
    const activeNamespace = ChainController.state.activeChain;
    const isSendSupported = ConstantsUtil$1.SEND_SUPPORTED_NAMESPACES.includes(activeNamespace);
    if (!isSendEnabled || !isSendSupported) {
      return null;
    }
    return b`
      <w3m-tooltip-trigger text="Send">
        <wui-button
          fullWidth
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          variant="accent-secondary"
          size="lg"
        >
          <wui-icon name="send"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `;
  }
  watchSwapValues() {
    this.watchTokenBalance = setInterval(() => ChainController.fetchTokenBalance((error) => this.onTokenBalanceError(error)), 1e4);
  }
  onTokenBalanceError(error) {
    if (error instanceof Error && error.cause instanceof Response) {
      const statusCode = error.cause.status;
      if (statusCode === ConstantsUtil.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE) {
        clearInterval(this.watchTokenBalance);
      }
    }
  }
  listContentTemplate() {
    if (this.currentTab === 0) {
      return b`<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
    }
    if (this.currentTab === 1) {
      return b`<w3m-account-activity-widget></w3m-account-activity-widget>`;
    }
    return b`<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
  }
  tokenBalanceTemplate() {
    var _a;
    if (this.tokenBalance && ((_a = this.tokenBalance) == null ? void 0 : _a.length) >= 0) {
      const value = CoreHelperUtil.calculateBalance(this.tokenBalance);
      const { dollars = "0", pennies = "00" } = CoreHelperUtil.formatTokenBalance(value);
      return b`<wui-balance dollars=${dollars} pennies=${pennies}></wui-balance>`;
    }
    return b`<wui-balance dollars="0" pennies="00"></wui-balance>`;
  }
  tabsTemplate() {
    const tabsByNamespace = HelpersUtil.getTabsByNamespace(ChainController.state.activeChain);
    if (tabsByNamespace.length === 0) {
      return null;
    }
    return b`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      .tabs=${tabsByNamespace}
    ></wui-tabs>`;
  }
  onTabChange(index) {
    ChainController.setAccountProp("currentTab", index, this.namespace);
  }
  onFundWalletClick() {
    RouterController.push("FundWallet");
  }
  onSwapClick() {
    var _a, _b, _c;
    if (((_a = this.network) == null ? void 0 : _a.caipNetworkId) && !ConstantsUtil$1.SWAP_SUPPORTED_NETWORKS.includes((_b = this.network) == null ? void 0 : _b.caipNetworkId)) {
      RouterController.push("UnsupportedChain", {
        swapUnsupportedChain: true
      });
    } else {
      EventsController.sendEvent({
        type: "track",
        event: "OPEN_SWAP",
        properties: {
          network: ((_c = this.network) == null ? void 0 : _c.caipNetworkId) || "",
          isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      RouterController.push("Swap");
    }
  }
  getAuthData() {
    const socialProvider = StorageUtil.getConnectedSocialProvider();
    const socialUsername = StorageUtil.getConnectedSocialUsername();
    const authConnector = ConnectorController.getAuthConnector();
    const email = (authConnector == null ? void 0 : authConnector.provider.getEmail()) ?? "";
    return {
      name: ConnectorUtil.getAuthName({
        email,
        socialUsername,
        socialProvider
      }),
      icon: socialProvider ?? "mail",
      iconSize: socialProvider ? "xl" : "md"
    };
  }
  onGoToProfileWalletsView() {
    RouterController.push("ProfileWallets");
  }
  onSendClick() {
    var _a;
    EventsController.sendEvent({
      type: "track",
      event: "OPEN_SEND",
      properties: {
        network: ((_a = this.network) == null ? void 0 : _a.caipNetworkId) || "",
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("WalletSend");
  }
};
W3mAccountWalletFeaturesWidget.styles = styles$z;
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "watchTokenBalance", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "network", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "profileName", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "address", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "currentTab", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "tokenBalance", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "features", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "namespace", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "activeConnectorIds", void 0);
__decorate$S([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "remoteFeatures", void 0);
W3mAccountWalletFeaturesWidget = __decorate$S([
  customElement("w3m-account-wallet-features-widget")
], W3mAccountWalletFeaturesWidget);
var __decorate$R = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountView = class W3mAccountView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.namespace = ChainController.state.activeChain;
    this.unsubscribe.push(ChainController.subscribeKey("activeChain", (namespace) => {
      this.namespace = namespace;
    }));
  }
  render() {
    if (!this.namespace) {
      return null;
    }
    const connectorId = ConnectorController.getConnectorId(this.namespace);
    const authConnector = ConnectorController.getAuthConnector();
    return b`
      ${authConnector && connectorId === ConstantsUtil.CONNECTOR_ID.AUTH ? this.walletFeaturesTemplate() : this.defaultTemplate()}
    `;
  }
  walletFeaturesTemplate() {
    return b`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`;
  }
  defaultTemplate() {
    return b`<w3m-account-default-widget></w3m-account-default-widget>`;
  }
};
__decorate$R([
  r()
], W3mAccountView.prototype, "namespace", void 0);
W3mAccountView = __decorate$R([
  customElement("w3m-account-view")
], W3mAccountView);
const styles$y = css`
  wui-image {
    width: 24px;
    height: 24px;
    border-radius: ${({ borderRadius }) => borderRadius[2]};
  }

  wui-image,
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius }) => borderRadius[2]};
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    border-radius: ${({ borderRadius }) => borderRadius[2]};
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border: 2px solid ${({ tokens }) => tokens.theme.backgroundPrimary};
    border-radius: 50%;
    padding: ${({ spacing }) => spacing["01"]};
  }

  .icon-badge {
    width: 8px;
    height: 8px;
  }
`;
var __decorate$Q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiActiveProfileWalletItem = class WuiActiveProfileWalletItem2 extends i {
  constructor() {
    super(...arguments);
    this.address = "";
    this.profileName = "";
    this.content = [];
    this.alt = "";
    this.imageSrc = "";
    this.icon = void 0;
    this.iconSize = "md";
    this.iconBadge = void 0;
    this.iconBadgeSize = "md";
    this.buttonVariant = "neutral-primary";
    this.enableMoreButton = false;
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return b`
      <wui-flex flexDirection="column" rowgap="2">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `;
  }
  topTemplate() {
    return b`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          variant="secondary"
          size="md"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          variant="secondary"
          size="md"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton ? b`<wui-icon-link
              variant="secondary"
              size="md"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>` : null}
      </wui-flex>
    `;
  }
  bottomTemplate() {
    return b` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `;
  }
  imageOrIconTemplate() {
    if (this.icon) {
      return b`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon size="lg" color="default" name=${this.icon} class="custom-icon"></wui-icon>

            ${this.iconBadge ? b`<wui-icon
                  color="accent-primary"
                  size="inherit"
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>` : null}
          </wui-flex>
        </wui-flex>
      `;
    }
    return b`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `;
  }
  contentTemplate() {
    if (this.content.length === 0) {
      return null;
    }
    return b`
      <wui-flex flexDirection="column" rowgap="3">
        ${this.content.map((item) => this.labelAndTagTemplate(item))}
      </wui-flex>
    `;
  }
  labelAndTagTemplate({ address, profileName, label, description, enableButton, buttonType, buttonLabel, buttonVariant, tagVariant, tagLabel, alignItems = "flex-end" }) {
    return b`
      <wui-flex justifyContent="space-between" alignItems=${alignItems} columngap="1">
        <wui-flex flexDirection="column" rowgap="01">
          ${label ? b`<wui-text variant="sm-medium" color="secondary">${label}</wui-text>` : null}

          <wui-flex alignItems="center" columngap="1">
            <wui-text variant="md-regular" color="primary">
              ${UiHelperUtil.getTruncateString({
      string: profileName || address,
      charsStart: profileName ? 16 : this.charsStart,
      charsEnd: profileName ? 0 : this.charsEnd,
      truncate: profileName ? "end" : "middle"
    })}
            </wui-text>

            ${tagVariant && tagLabel ? b`<wui-tag variant=${tagVariant} size="sm">${tagLabel}</wui-tag>` : null}
          </wui-flex>

          ${description ? b`<wui-text variant="sm-regular" color="secondary">${description}</wui-text>` : null}
        </wui-flex>

        ${enableButton ? this.buttonTemplate({ buttonType, buttonLabel, buttonVariant }) : null}
      </wui-flex>
    `;
  }
  buttonTemplate({ buttonType, buttonLabel, buttonVariant }) {
    return b`
      <wui-button
        size="sm"
        variant=${buttonVariant}
        @click=${buttonType === "disconnect" ? this.dispatchDisconnectEvent.bind(this) : this.dispatchSwitchEvent.bind(this)}
        data-testid=${buttonType === "disconnect" ? "wui-active-profile-wallet-item-disconnect-button" : "wui-active-profile-wallet-item-switch-button"}
      >
        ${buttonLabel}
      </wui-button>
    `;
  }
  dispatchDisconnectEvent() {
    this.dispatchEvent(new CustomEvent("disconnect", { bubbles: true, composed: true }));
  }
  dispatchSwitchEvent() {
    this.dispatchEvent(new CustomEvent("switch", { bubbles: true, composed: true }));
  }
  dispatchExternalLinkEvent() {
    this.dispatchEvent(new CustomEvent("externalLink", { bubbles: true, composed: true }));
  }
  dispatchMoreButtonEvent() {
    this.dispatchEvent(new CustomEvent("more", { bubbles: true, composed: true }));
  }
  dispatchCopyEvent() {
    this.dispatchEvent(new CustomEvent("copy", { bubbles: true, composed: true }));
  }
};
WuiActiveProfileWalletItem.styles = [resetStyles, elementStyles, styles$y];
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "address", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "profileName", void 0);
__decorate$Q([
  n({ type: Array })
], WuiActiveProfileWalletItem.prototype, "content", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "alt", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "imageSrc", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "icon", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "iconSize", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "iconBadge", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
__decorate$Q([
  n()
], WuiActiveProfileWalletItem.prototype, "buttonVariant", void 0);
__decorate$Q([
  n({ type: Boolean })
], WuiActiveProfileWalletItem.prototype, "enableMoreButton", void 0);
__decorate$Q([
  n({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsStart", void 0);
__decorate$Q([
  n({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiActiveProfileWalletItem = __decorate$Q([
  customElement("wui-active-profile-wallet-item")
], WuiActiveProfileWalletItem);
const styles$x = css`
  wui-image,
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius }) => borderRadius[2]};
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border: 2px solid ${({ tokens }) => tokens.theme.backgroundPrimary};
    border-radius: 50%;
    padding: ${({ spacing }) => spacing["01"]};
  }

  .icon-badge {
    width: 8px;
    height: 8px;
  }
`;
var __decorate$P = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiInactiveProfileWalletItem = class WuiInactiveProfileWalletItem2 extends i {
  constructor() {
    super(...arguments);
    this.address = "";
    this.profileName = "";
    this.alt = "";
    this.buttonLabel = "";
    this.buttonVariant = "accent-primary";
    this.imageSrc = "";
    this.icon = void 0;
    this.iconSize = "md";
    this.iconBadgeSize = "md";
    this.rightIcon = "signOut";
    this.rightIconSize = "md";
    this.loading = false;
    this.charsStart = 4;
    this.charsEnd = 6;
  }
  render() {
    return b`
      <wui-flex alignItems="center" columngap="2">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `;
  }
  imageOrIconTemplate() {
    if (this.icon) {
      return b`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon size="lg" color="default" name=${this.icon} class="custom-icon"></wui-icon>

            ${this.iconBadge ? b`<wui-icon
                  color="default"
                  size="inherit"
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>` : null}
          </wui-flex>
        </wui-flex>
      `;
    }
    return b`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`;
  }
  labelAndDescriptionTemplate() {
    return b`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="lg-regular" color="primary">
          ${UiHelperUtil.getTruncateString({
      string: this.profileName || this.address,
      charsStart: this.profileName ? 16 : this.charsStart,
      charsEnd: this.profileName ? 0 : this.charsEnd,
      truncate: this.profileName ? "end" : "middle"
    })}
        </wui-text>
      </wui-flex>
    `;
  }
  buttonActionTemplate() {
    return b`
      <wui-flex columngap="1" alignItems="center" justifyContent="center">
        <wui-button
          size="sm"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          variant="secondary"
          size="md"
          icon=${o(this.rightIcon)}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `;
  }
  handleButtonClick() {
    this.dispatchEvent(new CustomEvent("buttonClick", { bubbles: true, composed: true }));
  }
  handleIconClick() {
    this.dispatchEvent(new CustomEvent("iconClick", { bubbles: true, composed: true }));
  }
};
WuiInactiveProfileWalletItem.styles = [resetStyles, elementStyles, styles$x];
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "address", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "profileName", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "alt", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "buttonLabel", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "buttonVariant", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "imageSrc", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "icon", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "iconSize", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "iconBadge", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "rightIcon", void 0);
__decorate$P([
  n()
], WuiInactiveProfileWalletItem.prototype, "rightIconSize", void 0);
__decorate$P([
  n({ type: Boolean })
], WuiInactiveProfileWalletItem.prototype, "loading", void 0);
__decorate$P([
  n({ type: Number })
], WuiInactiveProfileWalletItem.prototype, "charsStart", void 0);
__decorate$P([
  n({ type: Number })
], WuiInactiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiInactiveProfileWalletItem = __decorate$P([
  customElement("wui-inactive-profile-wallet-item")
], WuiInactiveProfileWalletItem);
const ConnectionUtil = {
  getAuthData(connection) {
    var _a, _b;
    const isAuth = connection.connectorId === ConstantsUtil.CONNECTOR_ID.AUTH;
    if (!isAuth) {
      return { isAuth: false, icon: void 0, iconSize: void 0, name: void 0 };
    }
    const socialProvider = ((_a = connection == null ? void 0 : connection.auth) == null ? void 0 : _a.name) ?? StorageUtil.getConnectedSocialProvider();
    const socialUsername = ((_b = connection == null ? void 0 : connection.auth) == null ? void 0 : _b.username) ?? StorageUtil.getConnectedSocialUsername();
    const authConnector = ConnectorController.getAuthConnector();
    const email = (authConnector == null ? void 0 : authConnector.provider.getEmail()) ?? "";
    return {
      isAuth: true,
      icon: socialProvider ?? "mail",
      iconSize: socialProvider ? "xl" : "md",
      name: isAuth ? ConnectorUtil.getAuthName({ email, socialUsername, socialProvider }) : void 0
    };
  }
};
const styles$w = css`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["md"]};
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: ${({ spacing }) => spacing["4"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
  }

  wui-separator {
    margin: ${({ spacing }) => spacing["2"]} 0 ${({ spacing }) => spacing["2"]} 0;
  }

  .active-connection {
    padding: ${({ spacing }) => spacing["2"]};
  }

  .recent-connection {
    padding: ${({ spacing }) => spacing["2"]} 0 ${({ spacing }) => spacing["2"]} 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`;
var __decorate$O = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const UI_CONFIG = {
  ADDRESS_DISPLAY: { START: 4, END: 6 },
  BADGE: { SIZE: "md", ICON: "lightbulb" },
  SCROLL_THRESHOLD: 50,
  OPACITY_RANGE: [0, 1]
};
const NAMESPACE_ICONS = {
  eip155: "ethereum",
  solana: "solana",
  bip122: "bitcoin",
  ton: "ton",
  tron: "tron"
};
const NAMESPACE_TABS = [
  { namespace: "eip155", icon: NAMESPACE_ICONS.eip155, label: "EVM" },
  { namespace: "solana", icon: NAMESPACE_ICONS.solana, label: "Solana" },
  { namespace: "bip122", icon: NAMESPACE_ICONS.bip122, label: "Bitcoin" },
  { namespace: "ton", icon: NAMESPACE_ICONS.ton, label: "Ton" },
  { namespace: "tron", icon: NAMESPACE_ICONS.tron, label: "Tron" }
];
const CHAIN_LABELS = {
  eip155: { title: "Add EVM Wallet", description: "Add your first EVM wallet" },
  solana: { title: "Add Solana Wallet", description: "Add your first Solana wallet" },
  bip122: { title: "Add Bitcoin Wallet", description: "Add your first Bitcoin wallet" },
  ton: { title: "Add TON Wallet", description: "Add your first TON wallet" },
  tron: { title: "Add TRON Wallet", description: "Add your first TRON wallet" }
};
let W3mProfileWalletsView = class W3mProfileWalletsView2 extends i {
  constructor() {
    var _a, _b, _c;
    super();
    this.unsubscribers = [];
    this.currentTab = 0;
    this.namespace = ChainController.state.activeChain;
    this.namespaces = Array.from(ChainController.state.chains.keys());
    this.caipAddress = void 0;
    this.profileName = void 0;
    this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
    this.lastSelectedAddress = "";
    this.lastSelectedConnectorId = "";
    this.isSwitching = false;
    this.caipNetwork = ChainController.state.activeCaipNetwork;
    this.user = (_a = ChainController.getAccountData()) == null ? void 0 : _a.user;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.currentTab = this.namespace ? this.namespaces.indexOf(this.namespace) : 0;
    this.caipAddress = (_b = ChainController.getAccountData(this.namespace)) == null ? void 0 : _b.caipAddress;
    this.profileName = (_c = ChainController.getAccountData(this.namespace)) == null ? void 0 : _c.profileName;
    this.unsubscribers.push(...[
      ConnectionController.subscribeKey("connections", () => this.onConnectionsChange()),
      ConnectionController.subscribeKey("recentConnections", () => this.requestUpdate()),
      ConnectorController.subscribeKey("activeConnectorIds", (ids) => {
        this.activeConnectorIds = ids;
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => this.caipNetwork = val),
      ChainController.subscribeChainProp("accountState", (val) => {
        this.user = val == null ? void 0 : val.user;
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val)
    ]);
    this.chainListener = ChainController.subscribeChainProp("accountState", (accountState) => {
      this.caipAddress = accountState == null ? void 0 : accountState.caipAddress;
      this.profileName = accountState == null ? void 0 : accountState.profileName;
    }, this.namespace);
  }
  disconnectedCallback() {
    var _a, _b;
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    (_a = this.resizeObserver) == null ? void 0 : _a.disconnect();
    this.removeScrollListener();
    (_b = this.chainListener) == null ? void 0 : _b.call(this);
  }
  firstUpdated() {
    var _a;
    const walletListEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".wallet-list");
    if (!walletListEl) {
      return;
    }
    const handleScroll = () => this.updateScrollOpacity(walletListEl);
    requestAnimationFrame(handleScroll);
    walletListEl.addEventListener("scroll", handleScroll);
    this.resizeObserver = new ResizeObserver(handleScroll);
    this.resizeObserver.observe(walletListEl);
    handleScroll();
  }
  render() {
    const namespace = this.namespace;
    if (!namespace) {
      throw new Error("Namespace is not set");
    }
    return b`
      <wui-flex flexDirection="column" .padding=${["0", "4", "4", "4"]} gap="4">
        ${this.renderTabs()} ${this.renderHeader(namespace)} ${this.renderConnections(namespace)}
        ${this.renderAddConnectionButton(namespace)}
      </wui-flex>
    `;
  }
  renderTabs() {
    const availableTabs = this.namespaces.map((namespace) => NAMESPACE_TABS.find((tab) => tab.namespace === namespace)).filter(Boolean);
    const tabCount = availableTabs.length;
    if (tabCount > 1) {
      return b`
        <wui-tabs
          .onTabChange=${(index) => this.handleTabChange(index)}
          .activeTab=${this.currentTab}
          .tabs=${availableTabs}
        ></wui-tabs>
      `;
    }
    return null;
  }
  renderHeader(namespace) {
    const connections = this.getActiveConnections(namespace);
    const totalConnections = connections.flatMap(({ accounts }) => accounts).length + (this.caipAddress ? 1 : 0);
    return b`
      <wui-flex alignItems="center" columngap="1">
        <wui-icon
          size="sm"
          name=${NAMESPACE_ICONS[namespace] ?? NAMESPACE_ICONS.eip155}
        ></wui-icon>
        <wui-text color="secondary" variant="lg-regular"
          >${totalConnections > 1 ? "Wallets" : "Wallet"}</wui-text
        >
        <wui-text
          color="primary"
          variant="lg-regular"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${totalConnections}
        </wui-text>
        <wui-link
          color="secondary"
          variant="secondary"
          @click=${() => ConnectionController.disconnect({ namespace })}
          ?disabled=${!this.hasAnyConnections(namespace)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `;
  }
  renderConnections(namespace) {
    const hasConnections = this.hasAnyConnections(namespace);
    const classes = {
      "wallet-list": true,
      "active-wallets-box": hasConnections,
      "empty-wallet-list-box": !hasConnections
    };
    return b`
      <wui-flex flexDirection="column" class=${e(classes)} rowgap="3">
        ${hasConnections ? this.renderActiveConnections(namespace) : this.renderEmptyState(namespace)}
      </wui-flex>
    `;
  }
  renderActiveConnections(namespace) {
    const connections = this.getActiveConnections(namespace);
    const connectorId = this.activeConnectorIds[namespace];
    const plainAddress = this.getPlainAddress();
    return b`
      ${plainAddress || connectorId || connections.length > 0 ? b`<wui-flex
            flexDirection="column"
            .padding=${["4", "0", "4", "0"]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(namespace)} ${this.renderActiveConnectionsList(namespace)}
          </wui-flex>` : null}
      ${this.renderRecentConnections(namespace)}
    `;
  }
  renderActiveProfile(namespace) {
    const connectorId = this.activeConnectorIds[namespace];
    if (!connectorId) {
      return null;
    }
    const { connections } = ConnectionControllerUtil.getConnectionsData(namespace);
    const connector = ConnectorController.getConnectorById(connectorId);
    const connectorImage = AssetUtil.getConnectorImage(connector);
    const plainAddress = this.getPlainAddress();
    if (!plainAddress) {
      return null;
    }
    const isBitcoin = namespace === ConstantsUtil.CHAIN.BITCOIN;
    const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
    const shouldShowSeparator = this.getActiveConnections(namespace).flatMap((connection2) => connection2.accounts).length > 0;
    const connection = connections.find((c) => c.connectorId === connectorId);
    const account = connection == null ? void 0 : connection.accounts.filter((a2) => !HelpersUtil$1.isLowerCaseMatch(a2.address, plainAddress));
    return b`
      <wui-flex flexDirection="column" .padding=${["0", "4", "0", "4"]}>
        <wui-active-profile-wallet-item
          address=${plainAddress}
          alt=${connector == null ? void 0 : connector.name}
          .content=${this.getProfileContent({
      address: plainAddress,
      connections,
      connectorId,
      namespace
    })}
          .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
          .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
          .icon=${authData.icon}
          .iconSize=${authData.iconSize}
          .iconBadge=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.ICON : void 0}
          .iconBadgeSize=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.SIZE : void 0}
          imageSrc=${connectorImage}
          ?enableMoreButton=${authData.isAuth}
          @copy=${() => this.handleCopyAddress(plainAddress)}
          @disconnect=${() => this.handleDisconnect(namespace, connectorId)}
          @switch=${() => {
      if (isBitcoin && connection && (account == null ? void 0 : account[0])) {
        this.handleSwitchWallet(connection, account[0].address, namespace);
      }
    }}
          @externalLink=${() => this.handleExternalLink(plainAddress)}
          @more=${() => this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${shouldShowSeparator ? b`<wui-separator></wui-separator>` : null}
      </wui-flex>
    `;
  }
  renderActiveConnectionsList(namespace) {
    const connections = this.getActiveConnections(namespace);
    if (connections.length === 0) {
      return null;
    }
    return b`
      <wui-flex flexDirection="column" .padding=${["0", "2", "0", "2"]}>
        ${this.renderConnectionList(connections, false, namespace)}
      </wui-flex>
    `;
  }
  renderRecentConnections(namespace) {
    const { recentConnections } = ConnectionControllerUtil.getConnectionsData(namespace);
    const allAccounts = recentConnections.flatMap((connection) => connection.accounts);
    if (allAccounts.length === 0) {
      return null;
    }
    return b`
      <wui-flex flexDirection="column" .padding=${["0", "2", "0", "2"]} rowGap="2">
        <wui-text color="secondary" variant="sm-medium" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${["0", "2", "0", "2"]}>
          ${this.renderConnectionList(recentConnections, true, namespace)}
        </wui-flex>
      </wui-flex>
    `;
  }
  renderConnectionList(connections, isRecentConnections, namespace) {
    return connections.filter((connection) => connection.accounts.length > 0).map((connection, connectionIdx) => {
      const connector = ConnectorController.getConnectorById(connection.connectorId);
      const connectorImage = AssetUtil.getConnectorImage(connector) ?? "";
      const authData = ConnectionUtil.getAuthData(connection);
      return connection.accounts.map((account, accountIdx) => {
        const shouldShowSeparator = connectionIdx !== 0 || accountIdx !== 0;
        const isLoading = this.isAccountLoading(connection.connectorId, account.address);
        return b`
            <wui-flex flexDirection="column">
              ${shouldShowSeparator ? b`<wui-separator></wui-separator>` : null}
              <wui-inactive-profile-wallet-item
                address=${account.address}
                alt=${connection.connectorId}
                buttonLabel=${isRecentConnections ? "Connect" : "Switch"}
                buttonVariant=${isRecentConnections ? "neutral-secondary" : "accent-secondary"}
                rightIcon=${isRecentConnections ? "bin" : "power"}
                rightIconSize="sm"
                class=${isRecentConnections ? "recent-connection" : "active-connection"}
                data-testid=${isRecentConnections ? "recent-connection" : "active-connection"}
                imageSrc=${connectorImage}
                .iconBadge=${this.isSmartAccount(account.address) ? UI_CONFIG.BADGE.ICON : void 0}
                .iconBadgeSize=${this.isSmartAccount(account.address) ? UI_CONFIG.BADGE.SIZE : void 0}
                .icon=${authData.icon}
                .iconSize=${authData.iconSize}
                .loading=${isLoading}
                .showBalance=${false}
                .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
                .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
                @buttonClick=${() => this.handleSwitchWallet(connection, account.address, namespace)}
                @iconClick=${() => this.handleWalletAction({
          connection,
          address: account.address,
          isRecentConnection: isRecentConnections,
          namespace
        })}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `;
      });
    });
  }
  renderAddConnectionButton(namespace) {
    if (!this.isMultiWalletEnabled() && this.caipAddress) {
      return null;
    }
    if (!this.hasAnyConnections(namespace)) {
      return null;
    }
    const { title } = this.getChainLabelInfo(namespace);
    return b`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${true}
        @click=${() => this.handleAddConnection(namespace)}
        data-testid="add-connection-button"
      >
        <wui-text variant="md-medium" color="secondary">${title}</wui-text>
      </wui-list-item>
    `;
  }
  renderEmptyState(namespace) {
    const { title, description } = this.getChainLabelInfo(namespace);
    return b`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowgap="3"
          class="empty-box"
        >
          <wui-icon-box size="xl" icon="wallet" color="secondary"></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="1">
            <wui-text color="primary" variant="lg-regular" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="secondary" variant="md-regular" data-testid="empty-state-description"
              >${description}</wui-text
            >
          </wui-flex>

          <wui-link
            @click=${() => this.handleAddConnection(namespace)}
            data-testid="empty-state-button"
            icon="plus"
          >
            ${title}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
  }
  handleTabChange(index) {
    var _a, _b, _c;
    const nextNamespace = this.namespaces[index];
    if (nextNamespace) {
      (_a = this.chainListener) == null ? void 0 : _a.call(this);
      this.currentTab = this.namespaces.indexOf(nextNamespace);
      this.namespace = nextNamespace;
      this.caipAddress = (_b = ChainController.getAccountData(nextNamespace)) == null ? void 0 : _b.caipAddress;
      this.profileName = (_c = ChainController.getAccountData(nextNamespace)) == null ? void 0 : _c.profileName;
      this.chainListener = ChainController.subscribeChainProp("accountState", (accountState) => {
        this.caipAddress = accountState == null ? void 0 : accountState.caipAddress;
      }, nextNamespace);
    }
  }
  async handleSwitchWallet(connection, address, namespace) {
    var _a;
    try {
      this.isSwitching = true;
      this.lastSelectedConnectorId = connection.connectorId;
      this.lastSelectedAddress = address;
      const isDifferentNamespace = ((_a = this.caipNetwork) == null ? void 0 : _a.chainNamespace) !== namespace;
      if (isDifferentNamespace && (connection == null ? void 0 : connection.caipNetwork)) {
        ConnectorController.setFilterByNamespace(namespace);
        await ChainController.switchActiveNetwork(connection == null ? void 0 : connection.caipNetwork);
      }
      await ConnectionController.switchConnection({
        connection,
        address,
        namespace,
        closeModalOnConnect: false,
        onChange({ hasSwitchedAccount, hasSwitchedWallet }) {
          if (hasSwitchedWallet) {
            SnackController.showSuccess("Wallet switched");
          } else if (hasSwitchedAccount) {
            SnackController.showSuccess("Account switched");
          }
        }
      });
    } catch (error) {
      SnackController.showError("Failed to switch wallet");
    } finally {
      this.isSwitching = false;
    }
  }
  handleWalletAction(params) {
    const { connection, address, isRecentConnection, namespace } = params;
    if (isRecentConnection) {
      StorageUtil.deleteAddressFromConnection({
        connectorId: connection.connectorId,
        address,
        namespace
      });
      ConnectionController.syncStorageConnections();
      SnackController.showSuccess("Wallet deleted");
    } else {
      this.handleDisconnect(namespace, connection.connectorId);
    }
  }
  async handleDisconnect(namespace, id) {
    try {
      await ConnectionController.disconnect({ id, namespace });
      SnackController.showSuccess("Wallet disconnected");
    } catch {
      SnackController.showError("Failed to disconnect wallet");
    }
  }
  handleCopyAddress(address) {
    CoreHelperUtil.copyToClopboard(address);
    SnackController.showSuccess("Address copied");
  }
  handleMore() {
    RouterController.push("AccountSettings");
  }
  handleExternalLink(address) {
    var _a, _b;
    const explorerUrl = (_b = (_a = this.caipNetwork) == null ? void 0 : _a.blockExplorers) == null ? void 0 : _b.default.url;
    if (explorerUrl) {
      CoreHelperUtil.openHref(`${explorerUrl}/address/${address}`, "_blank");
    }
  }
  handleAddConnection(namespace) {
    ConnectorController.setFilterByNamespace(namespace);
    RouterController.push("Connect", {
      addWalletForNamespace: namespace
    });
  }
  getChainLabelInfo(namespace) {
    return CHAIN_LABELS[namespace] ?? {
      title: "Add Wallet",
      description: "Add your first wallet"
    };
  }
  isSmartAccount(address) {
    var _a, _b;
    if (!this.namespace) {
      return false;
    }
    const smartAccount = (_b = (_a = this.user) == null ? void 0 : _a.accounts) == null ? void 0 : _b.find((account) => account.type === "smartAccount");
    if (smartAccount && address) {
      return HelpersUtil$1.isLowerCaseMatch(smartAccount.address, address);
    }
    return false;
  }
  getPlainAddress() {
    return this.caipAddress ? CoreHelperUtil.getPlainAddress(this.caipAddress) : void 0;
  }
  getActiveConnections(namespace) {
    const connectorId = this.activeConnectorIds[namespace];
    const { connections } = ConnectionControllerUtil.getConnectionsData(namespace);
    const [connectedConnection] = connections.filter((connection) => HelpersUtil$1.isLowerCaseMatch(connection.connectorId, connectorId));
    if (!connectorId) {
      return connections;
    }
    const isBitcoin = namespace === ConstantsUtil.CHAIN.BITCOIN;
    const { address } = this.caipAddress ? ParseUtil.parseCaipAddress(this.caipAddress) : {};
    let addresses = [...address ? [address] : []];
    if (isBitcoin && connectedConnection) {
      addresses = connectedConnection.accounts.map((account) => account.address) || [];
    }
    return ConnectionControllerUtil.excludeConnectorAddressFromConnections({
      connectorId,
      addresses,
      connections
    });
  }
  hasAnyConnections(namespace) {
    const connections = this.getActiveConnections(namespace);
    const { recentConnections } = ConnectionControllerUtil.getConnectionsData(namespace);
    return Boolean(this.caipAddress) || connections.length > 0 || recentConnections.length > 0;
  }
  isAccountLoading(connectorId, address) {
    return HelpersUtil$1.isLowerCaseMatch(this.lastSelectedConnectorId, connectorId) && HelpersUtil$1.isLowerCaseMatch(this.lastSelectedAddress, address) && this.isSwitching;
  }
  getProfileContent(params) {
    const { address, connections, connectorId, namespace } = params;
    const [connectedConnection] = connections.filter((connection) => HelpersUtil$1.isLowerCaseMatch(connection.connectorId, connectorId));
    if (namespace === ConstantsUtil.CHAIN.BITCOIN && (connectedConnection == null ? void 0 : connectedConnection.accounts.every((account) => typeof account.type === "string"))) {
      return this.getBitcoinProfileContent(connectedConnection.accounts, address);
    }
    const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
    return [
      {
        address,
        tagLabel: "Active",
        tagVariant: "success",
        enableButton: true,
        profileName: this.profileName,
        buttonType: "disconnect",
        buttonLabel: "Disconnect",
        buttonVariant: "neutral-secondary",
        ...authData.isAuth ? { description: this.isSmartAccount(address) ? "Smart Account" : "EOA Account" } : {}
      }
    ];
  }
  getBitcoinProfileContent(accounts, address) {
    const hasMultipleAccounts = accounts.length > 1;
    const plainAddress = this.getPlainAddress();
    return accounts.map((account) => {
      const isConnected = HelpersUtil$1.isLowerCaseMatch(account.address, plainAddress);
      let label = "PAYMENT";
      if (account.type === "ordinal") {
        label = "ORDINALS";
      }
      return {
        address: account.address,
        tagLabel: HelpersUtil$1.isLowerCaseMatch(account.address, address) ? "Active" : void 0,
        tagVariant: HelpersUtil$1.isLowerCaseMatch(account.address, address) ? "success" : void 0,
        enableButton: true,
        ...hasMultipleAccounts ? {
          label,
          alignItems: "flex-end",
          buttonType: isConnected ? "disconnect" : "switch",
          buttonLabel: isConnected ? "Disconnect" : "Switch",
          buttonVariant: isConnected ? "neutral-secondary" : "accent-secondary"
        } : {
          alignItems: "center",
          buttonType: "disconnect",
          buttonLabel: "Disconnect",
          buttonVariant: "neutral-secondary"
        }
      };
    });
  }
  removeScrollListener() {
    var _a;
    const connectEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".wallet-list");
    if (connectEl) {
      connectEl.removeEventListener("scroll", () => this.handleConnectListScroll());
    }
  }
  handleConnectListScroll() {
    var _a;
    const walletListEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".wallet-list");
    if (walletListEl) {
      this.updateScrollOpacity(walletListEl);
    }
  }
  isMultiWalletEnabled() {
    var _a;
    return Boolean((_a = this.remoteFeatures) == null ? void 0 : _a.multiWallet);
  }
  updateScrollOpacity(element) {
    element.style.setProperty("--connect-scroll--top-opacity", MathUtil.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollTop).toString());
    element.style.setProperty("--connect-scroll--bottom-opacity", MathUtil.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollHeight - element.scrollTop - element.offsetHeight).toString());
  }
  onConnectionsChange() {
    if (this.isMultiWalletEnabled()) {
      if (this.namespace) {
        const { connections } = ConnectionControllerUtil.getConnectionsData(this.namespace);
        if (connections.length === 0) {
          RouterController.reset("ProfileWallets");
        }
      }
    }
    this.requestUpdate();
  }
};
W3mProfileWalletsView.styles = styles$w;
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "currentTab", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "namespace", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "namespaces", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "caipAddress", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "profileName", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "activeConnectorIds", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "lastSelectedAddress", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "lastSelectedConnectorId", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "isSwitching", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "caipNetwork", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "user", void 0);
__decorate$O([
  r()
], W3mProfileWalletsView.prototype, "remoteFeatures", void 0);
W3mProfileWalletsView = __decorate$O([
  customElement("w3m-profile-wallets-view")
], W3mProfileWalletsView);
var __decorate$N = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mFundWalletView = class W3mFundWalletView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.activeCaipNetwork = ChainController.state.activeCaipNetwork;
    this.features = OptionsController.state.features;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.exchangesLoading = ExchangeController.state.isLoading;
    this.exchanges = ExchangeController.state.exchanges;
    this.unsubscribe.push(...[
      OptionsController.subscribeKey("features", (val) => this.features = val),
      OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        this.activeCaipNetwork = val;
        this.setDefaultPaymentAsset();
      }),
      ExchangeController.subscribeKey("isLoading", (val) => this.exchangesLoading = val),
      ExchangeController.subscribeKey("exchanges", (val) => this.exchanges = val)
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  async firstUpdated() {
    const isPayWithExchangeSupported = ExchangeController.isPayWithExchangeSupported();
    if (isPayWithExchangeSupported) {
      await this.setDefaultPaymentAsset();
      await ExchangeController.fetchExchanges();
    }
  }
  render() {
    return b`
      <wui-flex flexDirection="column" .padding=${["1", "3", "3", "3"]} gap="2">
        ${this.onrampTemplate()} ${this.receiveTemplate()} ${this.depositFromExchangeTemplate()}
      </wui-flex>
    `;
  }
  async setDefaultPaymentAsset() {
    if (!this.activeCaipNetwork) {
      return;
    }
    const assets = await ExchangeController.getAssetsForNetwork(this.activeCaipNetwork.caipNetworkId);
    const usdc = assets.find((asset) => asset.metadata.symbol === "USDC") || assets[0];
    if (usdc) {
      ExchangeController.setPaymentAsset(usdc);
    }
  }
  onrampTemplate() {
    var _a;
    if (!this.activeCaipNetwork) {
      return null;
    }
    const isOnrampEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.onramp;
    const hasNetworkSupport = ConstantsUtil$1.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.activeCaipNetwork.chainNamespace);
    if (!isOnrampEnabled || !hasNetworkSupport) {
      return null;
    }
    return b`
      <wui-list-item
        @click=${this.onBuyCrypto.bind(this)}
        icon="card"
        data-testid="wallet-features-onramp-button"
      >
        <wui-text variant="lg-regular" color="primary">Buy crypto</wui-text>
      </wui-list-item>
    `;
  }
  depositFromExchangeTemplate() {
    if (!this.activeCaipNetwork) {
      return null;
    }
    const isPayWithExchangeSupported = ExchangeController.isPayWithExchangeSupported();
    if (!isPayWithExchangeSupported) {
      return null;
    }
    return b`
      <wui-list-item
        @click=${this.onDepositFromExchange.bind(this)}
        icon="arrowBottomCircle"
        data-testid="wallet-features-deposit-from-exchange-button"
        ?loading=${this.exchangesLoading}
        ?disabled=${this.exchangesLoading || !this.exchanges.length}
      >
        <wui-text variant="lg-regular" color="primary">Deposit from exchange</wui-text>
      </wui-list-item>
    `;
  }
  receiveTemplate() {
    var _a;
    const isReceiveEnabled = Boolean((_a = this.features) == null ? void 0 : _a.receive);
    if (!isReceiveEnabled) {
      return null;
    }
    return b`
      <wui-list-item
        @click=${this.onReceive.bind(this)}
        icon="qrCode"
        data-testid="wallet-features-receive-button"
      >
        <wui-text variant="lg-regular" color="primary">Receive funds</wui-text>
      </wui-list-item>
    `;
  }
  onBuyCrypto() {
    RouterController.push("OnRampProviders");
  }
  onReceive() {
    RouterController.push("WalletReceive");
  }
  onDepositFromExchange() {
    var _a;
    ExchangeController.reset();
    RouterController.push("PayWithExchange", {
      redirectView: (_a = RouterController.state.data) == null ? void 0 : _a.redirectView
    });
  }
};
__decorate$N([
  r()
], W3mFundWalletView.prototype, "activeCaipNetwork", void 0);
__decorate$N([
  r()
], W3mFundWalletView.prototype, "features", void 0);
__decorate$N([
  r()
], W3mFundWalletView.prototype, "remoteFeatures", void 0);
__decorate$N([
  r()
], W3mFundWalletView.prototype, "exchangesLoading", void 0);
__decorate$N([
  r()
], W3mFundWalletView.prototype, "exchanges", void 0);
W3mFundWalletView = __decorate$N([
  customElement("w3m-fund-wallet-view")
], W3mFundWalletView);
const styles$v = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      color ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      border ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      box-shadow ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      width ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      height ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ colors }) => colors.neutrals300};
    border-radius: ${({ borderRadius }) => borderRadius.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      color ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      border ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      box-shadow ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      width ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      height ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({ colors }) => colors.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({ tokens }) => tokens.core.iconAccentPrimary};
    background-color: ${({ tokens }) => tokens.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({ tokens }) => tokens.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({ tokens }) => tokens.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({ colors }) => colors.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({ colors }) => colors.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({ colors }) => colors.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({ colors }) => colors.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({ colors }) => colors.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({ tokens }) => tokens.theme.textTertiary};
  }
`;
var __decorate$M = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiToggle = class WuiToggle2 extends i {
  constructor() {
    super(...arguments);
    this.inputElementRef = e$1();
    this.checked = false;
    this.disabled = false;
    this.size = "md";
  }
  render() {
    return b`
      <label data-size=${this.size}>
        <input
          ${n$1(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
  }
  dispatchChangeEvent() {
    var _a;
    this.dispatchEvent(new CustomEvent("switchChange", {
      detail: (_a = this.inputElementRef.value) == null ? void 0 : _a.checked,
      bubbles: true,
      composed: true
    }));
  }
};
WuiToggle.styles = [resetStyles, elementStyles, styles$v];
__decorate$M([
  n({ type: Boolean })
], WuiToggle.prototype, "checked", void 0);
__decorate$M([
  n({ type: Boolean })
], WuiToggle.prototype, "disabled", void 0);
__decorate$M([
  n()
], WuiToggle.prototype, "size", void 0);
WuiToggle = __decorate$M([
  customElement("wui-toggle")
], WuiToggle);
const styles$u = css`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({ spacing }) => spacing["2"]};
    padding: ${({ spacing }) => spacing["2"]} ${({ spacing }) => spacing["3"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.theme.foregroundPrimary};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;
var __decorate$L = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCertifiedSwitch = class WuiCertifiedSwitch2 extends i {
  constructor() {
    super(...arguments);
    this.checked = false;
  }
  render() {
    return b`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `;
  }
  handleToggleChange(event) {
    event.stopPropagation();
    this.checked = event.detail;
    this.dispatchSwitchEvent();
  }
  dispatchSwitchEvent() {
    this.dispatchEvent(new CustomEvent("certifiedSwitchChange", {
      detail: this.checked,
      bubbles: true,
      composed: true
    }));
  }
};
WuiCertifiedSwitch.styles = [resetStyles, elementStyles, styles$u];
__decorate$L([
  n({ type: Boolean })
], WuiCertifiedSwitch.prototype, "checked", void 0);
WuiCertifiedSwitch = __decorate$L([
  customElement("wui-certified-switch")
], WuiCertifiedSwitch);
const styles$t = css`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ spacing }) => spacing[3]};
    color: ${({ tokens }) => tokens.theme.iconDefault};
    cursor: pointer;
    padding: ${({ spacing }) => spacing[2]};
    background-color: transparent;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
  }
`;
var __decorate$K = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiSearchBar = class WuiSearchBar2 extends i {
  constructor() {
    super(...arguments);
    this.inputComponentRef = e$1();
    this.inputValue = "";
  }
  render() {
    return b`
      <wui-input-text
        ${n$1(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue ? b`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>` : null}
      </wui-input-text>
    `;
  }
  onInputChange(event) {
    this.inputValue = event.detail || "";
  }
  clearValue() {
    const component = this.inputComponentRef.value;
    const inputElement = component == null ? void 0 : component.inputElementRef.value;
    if (inputElement) {
      inputElement.value = "";
      this.inputValue = "";
      inputElement.focus();
      inputElement.dispatchEvent(new Event("input"));
    }
  }
};
WuiSearchBar.styles = [resetStyles, styles$t];
__decorate$K([
  n()
], WuiSearchBar.prototype, "inputValue", void 0);
WuiSearchBar = __decorate$K([
  customElement("wui-search-bar")
], WuiSearchBar);
const styles$s = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({ spacing }) => spacing[2]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({ tokens }) => tokens.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;
var __decorate$J = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCardSelectLoader = class WuiCardSelectLoader2 extends i {
  constructor() {
    super(...arguments);
    this.type = "wallet";
  }
  render() {
    return b`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `;
  }
  shimmerTemplate() {
    if (this.type === "network") {
      return b` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${networkSvgMd}`;
    }
    return b`<wui-shimmer width="56px" height="56px"></wui-shimmer>`;
  }
};
WuiCardSelectLoader.styles = [resetStyles, elementStyles, styles$s];
__decorate$J([
  n()
], WuiCardSelectLoader.prototype, "type", void 0);
WuiCardSelectLoader = __decorate$J([
  customElement("wui-card-select-loader")
], WuiCardSelectLoader);
const styles$r = i$1`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;
var __decorate$I = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiGrid = class WuiGrid2 extends i {
  render() {
    this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap && `var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && UiHelperUtil.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && UiHelperUtil.getSpacingStyles(this.margin, 3)};
    `;
    return b`<slot></slot>`;
  }
};
WuiGrid.styles = [resetStyles, styles$r];
__decorate$I([
  n()
], WuiGrid.prototype, "gridTemplateRows", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "gridTemplateColumns", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "justifyItems", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "alignItems", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "justifyContent", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "alignContent", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "columnGap", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "rowGap", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "gap", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "padding", void 0);
__decorate$I([
  n()
], WuiGrid.prototype, "margin", void 0);
WuiGrid = __decorate$I([
  customElement("wui-grid")
], WuiGrid);
const styles$q = css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({ spacing }) => spacing["2"]};
    padding: ${({ spacing }) => spacing["3"]} ${({ spacing }) => spacing["0"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({ borderRadius }) => borderRadius["4"]}, 20px);
    transition:
      color ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-1"]},
      background-color ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]},
      border-radius ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({ tokens }) => tokens.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({ tokens }) => tokens.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({ colors }) => colors.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({ colors }) => colors.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({ colors }) => colors.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;
var __decorate$H = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsListItem = class W3mAllWalletsListItem2 extends i {
  constructor() {
    super();
    this.observer = new IntersectionObserver(() => void 0);
    this.visible = false;
    this.imageSrc = void 0;
    this.imageLoading = false;
    this.isImpressed = false;
    this.explorerId = "";
    this.walletQuery = "";
    this.certified = false;
    this.displayIndex = 0;
    this.wallet = void 0;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.visible = true;
          this.fetchImageSrc();
          this.sendImpressionEvent();
        } else {
          this.visible = false;
        }
      });
    }, { threshold: 0.01 });
  }
  firstUpdated() {
    this.observer.observe(this);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    var _a, _b;
    const certified = ((_a = this.wallet) == null ? void 0 : _a.badge_type) === "certified";
    return b`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${o(certified ? "certified" : void 0)}
            >${(_b = this.wallet) == null ? void 0 : _b.name}</wui-text
          >
          ${certified ? b`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
  }
  imageTemplate() {
    var _a, _b;
    if (!this.visible && !this.imageSrc || this.imageLoading) {
      return this.shimmerTemplate();
    }
    return b`
      <wui-wallet-image
        size="lg"
        imageSrc=${o(this.imageSrc)}
        name=${o((_a = this.wallet) == null ? void 0 : _a.name)}
        .installed=${((_b = this.wallet) == null ? void 0 : _b.installed) ?? false}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
  }
  shimmerTemplate() {
    return b`<wui-shimmer width="56px" height="56px"></wui-shimmer>`;
  }
  async fetchImageSrc() {
    if (!this.wallet) {
      return;
    }
    this.imageSrc = AssetUtil.getWalletImage(this.wallet);
    if (this.imageSrc) {
      return;
    }
    this.imageLoading = true;
    this.imageSrc = await AssetUtil.fetchWalletImage(this.wallet.image_id);
    this.imageLoading = false;
  }
  sendImpressionEvent() {
    if (!this.wallet || this.isImpressed) {
      return;
    }
    this.isImpressed = true;
    EventsController.sendWalletImpressionEvent({
      name: this.wallet.name,
      walletRank: this.wallet.order,
      explorerId: this.explorerId,
      view: RouterController.state.view,
      query: this.walletQuery,
      certified: this.certified,
      displayIndex: this.displayIndex
    });
  }
};
W3mAllWalletsListItem.styles = styles$q;
__decorate$H([
  r()
], W3mAllWalletsListItem.prototype, "visible", void 0);
__decorate$H([
  r()
], W3mAllWalletsListItem.prototype, "imageSrc", void 0);
__decorate$H([
  r()
], W3mAllWalletsListItem.prototype, "imageLoading", void 0);
__decorate$H([
  r()
], W3mAllWalletsListItem.prototype, "isImpressed", void 0);
__decorate$H([
  n()
], W3mAllWalletsListItem.prototype, "explorerId", void 0);
__decorate$H([
  n()
], W3mAllWalletsListItem.prototype, "walletQuery", void 0);
__decorate$H([
  n()
], W3mAllWalletsListItem.prototype, "certified", void 0);
__decorate$H([
  n()
], W3mAllWalletsListItem.prototype, "displayIndex", void 0);
__decorate$H([
  n({ type: Object })
], W3mAllWalletsListItem.prototype, "wallet", void 0);
W3mAllWalletsListItem = __decorate$H([
  customElement("w3m-all-wallets-list-item")
], W3mAllWalletsListItem);
const styles$p = css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({ durations }) => durations["xl"]};
    animation-timing-function: ${({ easings }) => easings["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({ spacing }) => spacing["4"]};
    padding-bottom: ${({ spacing }) => spacing["4"]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;
var __decorate$G = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PAGINATOR_ID = "local-paginator";
let W3mAllWalletsList = class W3mAllWalletsList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.paginationObserver = void 0;
    this.loading = !ApiController.state.wallets.length;
    this.wallets = ApiController.state.wallets;
    this.mobileFullScreen = OptionsController.state.enableMobileFullScreen;
    this.unsubscribe.push(...[ApiController.subscribeKey("wallets", (val) => this.wallets = val)]);
  }
  firstUpdated() {
    this.initialFetch();
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var _a;
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    (_a = this.paginationObserver) == null ? void 0 : _a.disconnect();
  }
  render() {
    if (this.mobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    return b`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0", "3", "3", "3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading ? this.shimmerTemplate(16) : this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `;
  }
  async initialFetch() {
    var _a;
    this.loading = true;
    const gridEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-grid");
    if (gridEl) {
      await ApiController.fetchWalletsByPage({ page: 1 });
      await gridEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.loading = false;
      gridEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  shimmerTemplate(items, id) {
    return [...Array(items)].map(() => b`
        <wui-card-select-loader type="wallet" id=${o(id)}></wui-card-select-loader>
      `);
  }
  walletsTemplate() {
    return WalletUtil.getWalletConnectWallets(this.wallets).map((wallet, index) => b`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${wallet.id}"
          @click=${() => this.onConnectWallet(wallet)}
          .wallet=${wallet}
          explorerId=${wallet.id}
          certified=${this.badge === "certified"}
          displayIndex=${index}
        ></w3m-all-wallets-list-item>
      `);
  }
  paginationLoaderTemplate() {
    const { wallets, recommended, featured, count, mobileFilteredOutWalletsLength } = ApiController.state;
    const columns = window.innerWidth < 352 ? 3 : 4;
    const currentWallets = wallets.length + recommended.length;
    const minimumRows = Math.ceil(currentWallets / columns);
    let shimmerCount = minimumRows * columns - currentWallets + columns;
    shimmerCount -= wallets.length ? featured.length % columns : 0;
    if (count === 0 && featured.length > 0) {
      return null;
    }
    if (count === 0 || [...featured, ...wallets, ...recommended].length < count - (mobileFilteredOutWalletsLength ?? 0)) {
      return this.shimmerTemplate(shimmerCount, PAGINATOR_ID);
    }
    return null;
  }
  createPaginationObserver() {
    var _a;
    const loaderEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(`#${PAGINATOR_ID}`);
    if (loaderEl) {
      this.paginationObserver = new IntersectionObserver(([element]) => {
        if ((element == null ? void 0 : element.isIntersecting) && !this.loading) {
          const { page, count, wallets } = ApiController.state;
          if (wallets.length < count) {
            ApiController.fetchWalletsByPage({ page: page + 1 });
          }
        }
      });
      this.paginationObserver.observe(loaderEl);
    }
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
W3mAllWalletsList.styles = styles$p;
__decorate$G([
  r()
], W3mAllWalletsList.prototype, "loading", void 0);
__decorate$G([
  r()
], W3mAllWalletsList.prototype, "wallets", void 0);
__decorate$G([
  r()
], W3mAllWalletsList.prototype, "badge", void 0);
__decorate$G([
  r()
], W3mAllWalletsList.prototype, "mobileFullScreen", void 0);
W3mAllWalletsList = __decorate$G([
  customElement("w3m-all-wallets-list")
], W3mAllWalletsList);
const styles$o = i$1`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
var __decorate$F = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsSearch = class W3mAllWalletsSearch2 extends i {
  constructor() {
    super(...arguments);
    this.prevQuery = "";
    this.prevBadge = void 0;
    this.loading = true;
    this.mobileFullScreen = OptionsController.state.enableMobileFullScreen;
    this.query = "";
  }
  render() {
    if (this.mobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    this.onSearch();
    return this.loading ? b`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>` : this.walletsTemplate();
  }
  async onSearch() {
    if (this.query.trim() !== this.prevQuery.trim() || this.badge !== this.prevBadge) {
      this.prevQuery = this.query;
      this.prevBadge = this.badge;
      this.loading = true;
      await ApiController.searchWallet({ search: this.query, badge: this.badge });
      this.loading = false;
    }
  }
  walletsTemplate() {
    const { search } = ApiController.state;
    const markedInstalledWallets = WalletUtil.markWalletsAsInstalled(search);
    const walletsByWcSupport = WalletUtil.filterWalletsByWcSupport(markedInstalledWallets);
    if (!walletsByWcSupport.length) {
      return b`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
    }
    return b`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0", "3", "3", "3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${walletsByWcSupport.map((wallet, index) => b`
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(wallet)}
              .wallet=${wallet}
              data-testid="wallet-search-item-${wallet.id}"
              explorerId=${wallet.id}
              certified=${this.badge === "certified"}
              walletQuery=${this.query}
              displayIndex=${index}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `;
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
W3mAllWalletsSearch.styles = styles$o;
__decorate$F([
  r()
], W3mAllWalletsSearch.prototype, "loading", void 0);
__decorate$F([
  r()
], W3mAllWalletsSearch.prototype, "mobileFullScreen", void 0);
__decorate$F([
  n()
], W3mAllWalletsSearch.prototype, "query", void 0);
__decorate$F([
  n()
], W3mAllWalletsSearch.prototype, "badge", void 0);
W3mAllWalletsSearch = __decorate$F([
  customElement("w3m-all-wallets-search")
], W3mAllWalletsSearch);
var __decorate$E = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsView = class W3mAllWalletsView2 extends i {
  constructor() {
    super(...arguments);
    this.search = "";
    this.badge = void 0;
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    });
  }
  render() {
    const isSearch = this.search.length >= 2;
    return b`
      <wui-flex .padding=${["1", "3", "3", "3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge === "certified"}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${isSearch || this.badge ? b`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>` : b`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `;
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  onCertifiedSwitchChange(event) {
    if (event.detail) {
      this.badge = "certified";
      SnackController.showSvg("Only WalletConnect certified", {
        icon: "walletConnectBrown",
        iconColor: "accent-100"
      });
    } else {
      this.badge = void 0;
    }
  }
  qrButtonTemplate() {
    if (CoreHelperUtil.isMobile()) {
      return b`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `;
    }
    return null;
  }
  onWalletConnectQr() {
    RouterController.push("ConnectingWalletConnect");
  }
};
__decorate$E([
  r()
], W3mAllWalletsView.prototype, "search", void 0);
__decorate$E([
  r()
], W3mAllWalletsView.prototype, "badge", void 0);
W3mAllWalletsView = __decorate$E([
  customElement("w3m-all-wallets-view")
], W3mAllWalletsView);
const styles$n = css`
  button {
    display: flex;
    gap: ${({ spacing }) => spacing[1]};
    padding: ${({ spacing }) => spacing[4]};
    width: 100%;
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    justify-content: center;
    align-items: center;
  }

  :host([data-size='sm']) button {
    padding: ${({ spacing }) => spacing[2]};
    border-radius: ${({ borderRadius }) => borderRadius[2]};
  }

  :host([data-size='md']) button {
    padding: ${({ spacing }) => spacing[3]};
    border-radius: ${({ borderRadius }) => borderRadius[3]};
  }

  button:hover {
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  button:disabled {
    opacity: 0.5;
  }
`;
var __decorate$D = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListButton = class WuiListButton2 extends i {
  constructor() {
    super(...arguments);
    this.text = "";
    this.disabled = false;
    this.size = "lg";
    this.icon = "copy";
    this.tabIdx = void 0;
  }
  render() {
    this.dataset["size"] = this.size;
    const textVariant = `${this.size}-regular`;
    return b`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-icon name=${this.icon} size=${this.size} color="default"></wui-icon>
        <wui-text align="center" variant=${textVariant} color="primary">${this.text}</wui-text>
      </button>
    `;
  }
};
WuiListButton.styles = [resetStyles, elementStyles, styles$n];
__decorate$D([
  n()
], WuiListButton.prototype, "text", void 0);
__decorate$D([
  n({ type: Boolean })
], WuiListButton.prototype, "disabled", void 0);
__decorate$D([
  n()
], WuiListButton.prototype, "size", void 0);
__decorate$D([
  n()
], WuiListButton.prototype, "icon", void 0);
__decorate$D([
  n()
], WuiListButton.prototype, "tabIdx", void 0);
WuiListButton = __decorate$D([
  customElement("wui-list-button")
], WuiListButton);
const styles$m = css`
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: ${({ spacing }) => spacing["2"]};
  }

  wui-loading-spinner {
    right: ${({ spacing }) => spacing["3"]};
  }

  wui-text {
    margin: ${({ spacing }) => spacing["2"]} ${({ spacing }) => spacing["3"]}
      ${({ spacing }) => spacing["0"]} ${({ spacing }) => spacing["3"]};
  }
`;
var __decorate$C = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mEmailLoginWidget = class W3mEmailLoginWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.formRef = e$1();
    this.email = "";
    this.loading = false;
    this.error = "";
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.hasExceededUsageLimit = ApiController.state.plan.hasExceededUsageLimit;
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => {
      this.remoteFeatures = val;
    }), ApiController.subscribeKey("plan", (val) => this.hasExceededUsageLimit = val.hasExceededUsageLimit));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  firstUpdated() {
    var _a;
    (_a = this.formRef.value) == null ? void 0 : _a.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.onSubmitEmail(event);
      }
    });
  }
  render() {
    const hasConnection = ConnectionController.hasAnyConnection(ConstantsUtil.CONNECTOR_ID.AUTH);
    return b`
      <form ${n$1(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${o(this.tabIdx)}
          ?disabled=${hasConnection || this.hasExceededUsageLimit}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `;
  }
  submitButtonTemplate() {
    const showSubmit = !this.loading && this.email.length > 3;
    return showSubmit ? b`
          <wui-icon-link
            size="lg"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        ` : null;
  }
  loadingTemplate() {
    return this.loading ? b`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>` : null;
  }
  templateError() {
    if (this.error) {
      return b`<wui-text variant="sm-medium" color="error">${this.error}</wui-text>`;
    }
    return null;
  }
  onEmailInputChange(event) {
    this.email = event.detail.trim();
    this.error = "";
  }
  async onSubmitEmail(event) {
    var _a;
    if (!HelpersUtil.isValidEmail(this.email)) {
      AlertController.open({
        displayMessage: ErrorUtil.ALERT_WARNINGS.INVALID_EMAIL.displayMessage
      }, "warning");
      return;
    }
    const isAvailableChain = ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((chain) => chain === ChainController.state.activeChain);
    if (!isAvailableChain) {
      const caipNetwork = ChainController.getFirstCaipNetworkSupportsAuthConnector();
      if (caipNetwork) {
        RouterController.push("SwitchNetwork", { network: caipNetwork });
        return;
      }
    }
    try {
      if (this.loading) {
        return;
      }
      this.loading = true;
      event.preventDefault();
      const authConnector = ConnectorController.getAuthConnector();
      if (!authConnector) {
        throw new Error("w3m-email-login-widget: Auth connector not found");
      }
      const { action } = await authConnector.provider.connectEmail({ email: this.email });
      EventsController.sendEvent({ type: "track", event: "EMAIL_SUBMITTED" });
      if (action === "VERIFY_OTP") {
        EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_SENT" });
        RouterController.push("EmailVerifyOtp", { email: this.email });
      } else if (action === "VERIFY_DEVICE") {
        RouterController.push("EmailVerifyDevice", { email: this.email });
      } else if (action === "CONNECT") {
        const isMultiWalletEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.multiWallet;
        await ConnectionController.connectExternal(authConnector, ChainController.state.activeChain);
        if (isMultiWalletEnabled) {
          RouterController.replace("ProfileWallets");
          SnackController.showSuccess("New Wallet Added");
        } else {
          RouterController.replace("Account");
        }
      }
    } catch (error) {
      const parsedError = CoreHelperUtil.parseError(error);
      if (parsedError == null ? void 0 : parsedError.includes("Invalid email")) {
        this.error = "Invalid email. Try again.";
      } else {
        SnackController.showError(error);
      }
    } finally {
      this.loading = false;
    }
  }
  onFocusEvent() {
    EventsController.sendEvent({ type: "track", event: "EMAIL_LOGIN_SELECTED" });
  }
};
W3mEmailLoginWidget.styles = styles$m;
__decorate$C([
  n()
], W3mEmailLoginWidget.prototype, "tabIdx", void 0);
__decorate$C([
  r()
], W3mEmailLoginWidget.prototype, "email", void 0);
__decorate$C([
  r()
], W3mEmailLoginWidget.prototype, "loading", void 0);
__decorate$C([
  r()
], W3mEmailLoginWidget.prototype, "error", void 0);
__decorate$C([
  r()
], W3mEmailLoginWidget.prototype, "remoteFeatures", void 0);
__decorate$C([
  r()
], W3mEmailLoginWidget.prototype, "hasExceededUsageLimit", void 0);
W3mEmailLoginWidget = __decorate$C([
  customElement("w3m-email-login-widget")
], W3mEmailLoginWidget);
const styles$l = css`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
var __decorate$B = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLogoSelect = class WuiLogoSelect2 extends i {
  constructor() {
    super(...arguments);
    this.logo = "google";
    this.disabled = false;
    this.tabIdx = void 0;
  }
  render() {
    return b`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-icon size="xxl" name=${this.logo}></wui-icon>
      </button>
    `;
  }
};
WuiLogoSelect.styles = [resetStyles, elementStyles, styles$l];
__decorate$B([
  n()
], WuiLogoSelect.prototype, "logo", void 0);
__decorate$B([
  n({ type: Boolean })
], WuiLogoSelect.prototype, "disabled", void 0);
__decorate$B([
  n()
], WuiLogoSelect.prototype, "tabIdx", void 0);
WuiLogoSelect = __decorate$B([
  customElement("wui-logo-select")
], WuiLogoSelect);
const styles$k = css`
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1)
      ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$A = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const MAX_TOP_VIEW = 2;
const MAXIMUM_LENGTH = 6;
let W3mSocialLoginWidget = class W3mSocialLoginWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.walletGuide = "get-started";
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    this.isPwaLoading = false;
    this.hasExceededUsageLimit = ApiController.state.plan.hasExceededUsageLimit;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => {
      this.connectors = val;
      this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    }), OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val), ApiController.subscribeKey("plan", (val) => this.hasExceededUsageLimit = val.hasExceededUsageLimit));
  }
  connectedCallback() {
    super.connectedCallback();
    this.handlePwaFrameLoad();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="2"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `;
  }
  topViewTemplate() {
    var _a;
    const isCreateWalletPage = this.walletGuide === "explore";
    let socials = (_a = this.remoteFeatures) == null ? void 0 : _a.socials;
    if (!socials && isCreateWalletPage) {
      socials = ConstantsUtil$1.DEFAULT_SOCIALS;
      return this.renderTopViewContent(socials);
    }
    if (!socials) {
      return null;
    }
    return this.renderTopViewContent(socials);
  }
  renderTopViewContent(socials) {
    if (socials.length === 2) {
      return b` <wui-flex gap="2">
        ${socials.slice(0, MAX_TOP_VIEW).map((social) => b`<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
        this.onSocialClick(social);
      }}
              logo=${social}
              tabIdx=${o(this.tabIdx)}
              ?disabled=${this.isPwaLoading || this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>`;
    }
    return b` <wui-list-button
      data-testid=${`social-selector-${socials[0]}`}
      @click=${() => {
      this.onSocialClick(socials[0]);
    }}
      size="lg"
      icon=${o(socials[0])}
      text=${`Continue with ${UiHelperUtil.capitalize(socials[0])}`}
      tabIdx=${o(this.tabIdx)}
      ?disabled=${this.isPwaLoading || this.hasConnection()}
    ></wui-list-button>`;
  }
  bottomViewTemplate() {
    var _a;
    let socials = (_a = this.remoteFeatures) == null ? void 0 : _a.socials;
    const isCreateWalletPage = this.walletGuide === "explore";
    const isSocialDisabled = !this.authConnector || !socials || socials.length === 0;
    if (isSocialDisabled && isCreateWalletPage) {
      socials = ConstantsUtil$1.DEFAULT_SOCIALS;
    }
    if (!socials) {
      return null;
    }
    if (socials.length <= MAX_TOP_VIEW) {
      return null;
    }
    if (socials && socials.length > MAXIMUM_LENGTH) {
      return b`<wui-flex gap="2">
        ${socials.slice(1, MAXIMUM_LENGTH - 1).map((social) => b`<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
        this.onSocialClick(social);
      }}
              logo=${social}
              tabIdx=${o(this.tabIdx)}
              ?focusable=${this.tabIdx !== void 0 && this.tabIdx >= 0}
              ?disabled=${this.isPwaLoading || this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${o(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading || this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`;
    }
    if (!socials) {
      return null;
    }
    return b`<wui-flex gap="2">
      ${socials.slice(1, socials.length).map((social) => b`<wui-logo-select
            data-testid=${`social-selector-${social}`}
            @click=${() => {
      this.onSocialClick(social);
    }}
            logo=${social}
            tabIdx=${o(this.tabIdx)}
            ?focusable=${this.tabIdx !== void 0 && this.tabIdx >= 0}
            ?disabled=${this.isPwaLoading || this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>`;
  }
  onMoreSocialsClick() {
    RouterController.push("ConnectSocials");
  }
  async onSocialClick(socialProvider) {
    if (this.hasExceededUsageLimit) {
      RouterController.push("UsageExceeded");
      return;
    }
    const isAvailableChain = ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((chain) => chain === ChainController.state.activeChain);
    if (!isAvailableChain) {
      const caipNetwork = ChainController.getFirstCaipNetworkSupportsAuthConnector();
      if (caipNetwork) {
        RouterController.push("SwitchNetwork", { network: caipNetwork });
        return;
      }
    }
    if (socialProvider) {
      await executeSocialLogin(socialProvider);
    }
  }
  async handlePwaFrameLoad() {
    var _a;
    if (CoreHelperUtil.isPWA()) {
      this.isPwaLoading = true;
      try {
        if (((_a = this.authConnector) == null ? void 0 : _a.provider) instanceof W3mFrameProvider) {
          await this.authConnector.provider.init();
        }
      } catch (error) {
        AlertController.open({
          displayMessage: "Error loading embedded wallet in PWA",
          debugMessage: error.message
        }, "error");
      } finally {
        this.isPwaLoading = false;
      }
    }
  }
  hasConnection() {
    return ConnectionController.hasAnyConnection(ConstantsUtil.CONNECTOR_ID.AUTH);
  }
};
W3mSocialLoginWidget.styles = styles$k;
__decorate$A([
  n()
], W3mSocialLoginWidget.prototype, "walletGuide", void 0);
__decorate$A([
  n()
], W3mSocialLoginWidget.prototype, "tabIdx", void 0);
__decorate$A([
  r()
], W3mSocialLoginWidget.prototype, "connectors", void 0);
__decorate$A([
  r()
], W3mSocialLoginWidget.prototype, "remoteFeatures", void 0);
__decorate$A([
  r()
], W3mSocialLoginWidget.prototype, "authConnector", void 0);
__decorate$A([
  r()
], W3mSocialLoginWidget.prototype, "isPwaLoading", void 0);
__decorate$A([
  r()
], W3mSocialLoginWidget.prototype, "hasExceededUsageLimit", void 0);
W3mSocialLoginWidget = __decorate$A([
  customElement("w3m-social-login-widget")
], W3mSocialLoginWidget);
var __decorate$z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsWidget = class W3mAllWalletsWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.count = ApiController.state.count;
    this.filteredCount = ApiController.state.filteredWallets.length;
    this.isFetchingRecommendedWallets = ApiController.state.isFetchingRecommendedWallets;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val), ApiController.subscribeKey("count", (val) => this.count = val), ApiController.subscribeKey("filteredWallets", (val) => this.filteredCount = val.length), ApiController.subscribeKey("isFetchingRecommendedWallets", (val) => this.isFetchingRecommendedWallets = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const wcConnector = this.connectors.find((c) => c.id === "walletConnect");
    const { allWallets } = OptionsController.state;
    if (!wcConnector || allWallets === "HIDE") {
      return null;
    }
    if (allWallets === "ONLY_MOBILE" && !CoreHelperUtil.isMobile()) {
      return null;
    }
    const featuredCount = ApiController.state.featured.length;
    const rawCount = this.count + featuredCount;
    const roundedCount = rawCount < 10 ? rawCount : Math.floor(rawCount / 10) * 10;
    const count = this.filteredCount > 0 ? this.filteredCount : roundedCount;
    let tagLabel = `${count}`;
    if (this.filteredCount > 0) {
      tagLabel = `${this.filteredCount}`;
    } else if (count < rawCount) {
      tagLabel = `${count}+`;
    }
    const hasWcConnection = ConnectionController.hasAnyConnection(ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT);
    return b`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${tagLabel}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${o(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${hasWcConnection}
        size="sm"
      ></wui-list-wallet>
    `;
  }
  onAllWallets() {
    var _a;
    EventsController.sendEvent({ type: "track", event: "CLICK_ALL_WALLETS" });
    RouterController.push("AllWallets", { redirectView: (_a = RouterController.state.data) == null ? void 0 : _a.redirectView });
  }
};
__decorate$z([
  n()
], W3mAllWalletsWidget.prototype, "tabIdx", void 0);
__decorate$z([
  r()
], W3mAllWalletsWidget.prototype, "connectors", void 0);
__decorate$z([
  r()
], W3mAllWalletsWidget.prototype, "count", void 0);
__decorate$z([
  r()
], W3mAllWalletsWidget.prototype, "filteredCount", void 0);
__decorate$z([
  r()
], W3mAllWalletsWidget.prototype, "isFetchingRecommendedWallets", void 0);
W3mAllWalletsWidget = __decorate$z([
  customElement("w3m-all-wallets-widget")
], W3mAllWalletsWidget);
const styles$j = css`
  :host {
    margin-top: ${({ spacing }) => spacing["1"]};
  }
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1)
      ${({ spacing }) => spacing["2"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectorList = class W3mConnectorList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.explorerWallets = ApiController.state.explorerWallets;
    this.connections = ConnectionController.state.connections;
    this.connectorImages = AssetController.state.connectorImages;
    this.loadingTelegram = false;
    this.unsubscribe.push(ConnectionController.subscribeKey("connections", (val) => this.connections = val), AssetController.subscribeKey("connectorImages", (val) => this.connectorImages = val), ApiController.subscribeKey("explorerFilteredWallets", (val) => {
      this.explorerWallets = (val == null ? void 0 : val.length) ? val : ApiController.state.explorerWallets;
    }), ApiController.subscribeKey("explorerWallets", (val) => {
      var _a;
      if (!((_a = this.explorerWallets) == null ? void 0 : _a.length)) {
        this.explorerWallets = val;
      }
    }));
    if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
      this.loadingTelegram = !ConnectionController.state.wcUri;
      this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", (val) => this.loadingTelegram = !val));
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `;
  }
  connectorListTemplate() {
    return ConnectorUtil.connectorList().map((item, displayIndex) => {
      if (item.kind === "connector") {
        return this.renderConnector(item, displayIndex);
      }
      return this.renderWallet(item, displayIndex);
    });
  }
  getConnectorNamespaces(item) {
    var _a;
    if (item.subtype === "walletConnect") {
      return [];
    }
    if (item.subtype === "multiChain") {
      return ((_a = item.connector.connectors) == null ? void 0 : _a.map((c) => c.chain)) || [];
    }
    return [item.connector.chain];
  }
  renderConnector(item, index) {
    var _a, _b;
    const connector = item.connector;
    const imageSrc = AssetUtil.getConnectorImage(connector) || this.connectorImages[(connector == null ? void 0 : connector.imageId) ?? ""];
    const connectionsByNamespace = this.connections.get(connector.chain) ?? [];
    const isAlreadyConnected = connectionsByNamespace.some((c) => HelpersUtil$1.isLowerCaseMatch(c.connectorId, connector.id));
    let tagLabel = void 0;
    let tagVariant = void 0;
    if (item.subtype === "walletConnect") {
      tagLabel = "qr code";
      tagVariant = "accent";
    } else if (item.subtype === "injected" || item.subtype === "announced") {
      tagLabel = isAlreadyConnected ? "connected" : "installed";
      tagVariant = isAlreadyConnected ? "info" : "success";
    } else {
      tagLabel = void 0;
      tagVariant = void 0;
    }
    const hasWcConnection = ConnectionController.hasAnyConnection(ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT);
    const disabled = item.subtype === "walletConnect" || item.subtype === "external" ? hasWcConnection : false;
    return b`
      <w3m-list-wallet
        displayIndex=${index}
        imageSrc=${o(imageSrc)}
        .installed=${true}
        name=${connector.name ?? "Unknown"}
        .tagVariant=${tagVariant}
        tagLabel=${o(tagLabel)}
        data-testid=${`wallet-selector-${connector.id.toLowerCase()}`}
        size="sm"
        @click=${() => this.onClickConnector(item)}
        tabIdx=${o(this.tabIdx)}
        ?disabled=${disabled}
        rdnsId=${o(((_a = connector.explorerWallet) == null ? void 0 : _a.rdns) || void 0)}
        walletRank=${o((_b = connector.explorerWallet) == null ? void 0 : _b.order)}
        .namespaces=${this.getConnectorNamespaces(item)}
      >
      </w3m-list-wallet>
    `;
  }
  onClickConnector(item) {
    var _a;
    const redirectView = (_a = RouterController.state.data) == null ? void 0 : _a.redirectView;
    if (item.subtype === "walletConnect") {
      ConnectorController.setActiveConnector(item.connector);
      if (CoreHelperUtil.isMobile()) {
        RouterController.push("AllWallets");
      } else {
        RouterController.push("ConnectingWalletConnect", { redirectView });
      }
      return;
    }
    if (item.subtype === "multiChain") {
      ConnectorController.setActiveConnector(item.connector);
      RouterController.push("ConnectingMultiChain", { redirectView });
      return;
    }
    if (item.subtype === "injected") {
      ConnectorController.setActiveConnector(item.connector);
      RouterController.push("ConnectingExternal", {
        connector: item.connector,
        redirectView,
        wallet: item.connector.explorerWallet
      });
      return;
    }
    if (item.subtype === "announced") {
      if (item.connector.id === "walletConnect") {
        if (CoreHelperUtil.isMobile()) {
          RouterController.push("AllWallets");
        } else {
          RouterController.push("ConnectingWalletConnect", { redirectView });
        }
        return;
      }
      RouterController.push("ConnectingExternal", {
        connector: item.connector,
        redirectView,
        wallet: item.connector.explorerWallet
      });
      return;
    }
    RouterController.push("ConnectingExternal", {
      connector: item.connector,
      redirectView
    });
  }
  renderWallet(item, index) {
    const wallet = item.wallet;
    const imageSrc = AssetUtil.getWalletImage(wallet);
    const hasWcConnection = ConnectionController.hasAnyConnection(ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT);
    const disabled = hasWcConnection;
    const loading = this.loadingTelegram;
    const tagLabel = item.subtype === "recent" ? "recent" : void 0;
    const tagVariant = item.subtype === "recent" ? "info" : void 0;
    return b`
      <w3m-list-wallet
        displayIndex=${index}
        imageSrc=${o(imageSrc)}
        name=${wallet.name ?? "Unknown"}
        @click=${() => this.onClickWallet(item)}
        size="sm"
        data-testid=${`wallet-selector-${wallet.id}`}
        tabIdx=${o(this.tabIdx)}
        ?loading=${loading}
        ?disabled=${disabled}
        rdnsId=${o(wallet.rdns || void 0)}
        walletRank=${o(wallet.order)}
        tagLabel=${o(tagLabel)}
        .tagVariant=${tagVariant}
      >
      </w3m-list-wallet>
    `;
  }
  onClickWallet(item) {
    var _a;
    const redirectView = (_a = RouterController.state.data) == null ? void 0 : _a.redirectView;
    const namespace = ChainController.state.activeChain;
    if (item.subtype === "featured") {
      ConnectorController.selectWalletConnector(item.wallet);
      return;
    }
    if (item.subtype === "recent") {
      if (this.loadingTelegram) {
        return;
      }
      ConnectorController.selectWalletConnector(item.wallet);
      return;
    }
    if (item.subtype === "custom") {
      if (this.loadingTelegram) {
        return;
      }
      RouterController.push("ConnectingWalletConnect", { wallet: item.wallet, redirectView });
      return;
    }
    if (this.loadingTelegram) {
      return;
    }
    const connector = namespace ? ConnectorController.getConnector({ id: item.wallet.id, namespace }) : void 0;
    if (connector) {
      RouterController.push("ConnectingExternal", { connector, redirectView });
    } else {
      RouterController.push("ConnectingWalletConnect", { wallet: item.wallet, redirectView });
    }
  }
};
W3mConnectorList.styles = styles$j;
__decorate$y([
  n({ type: Number })
], W3mConnectorList.prototype, "tabIdx", void 0);
__decorate$y([
  r()
], W3mConnectorList.prototype, "explorerWallets", void 0);
__decorate$y([
  r()
], W3mConnectorList.prototype, "connections", void 0);
__decorate$y([
  r()
], W3mConnectorList.prototype, "connectorImages", void 0);
__decorate$y([
  r()
], W3mConnectorList.prototype, "loadingTelegram", void 0);
W3mConnectorList = __decorate$y([
  customElement("w3m-connector-list")
], W3mConnectorList);
var __decorate$x = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletLoginList = class W3mWalletLoginList2 extends i {
  constructor() {
    super(...arguments);
    this.tabIdx = void 0;
  }
  render() {
    return b`
      <wui-flex flexDirection="column" gap="2">
        <w3m-connector-list tabIdx=${o(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${o(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `;
  }
};
__decorate$x([
  n()
], W3mWalletLoginList.prototype, "tabIdx", void 0);
W3mWalletLoginList = __decorate$x([
  customElement("w3m-wallet-login-list")
], W3mWalletLoginList);
const styles$i = css`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$w = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const SCROLL_THRESHOLD = 470;
let W3mConnectView = class W3mConnectView2 extends i {
  constructor() {
    var _a, _b;
    super();
    this.unsubscribe = [];
    this.connectors = ConnectorController.state.connectors;
    this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    this.features = OptionsController.state.features;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.enableWallets = OptionsController.state.enableWallets;
    this.noAdapters = ChainController.state.noAdapters;
    this.walletGuide = "get-started";
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.isEmailEnabled = ((_a = this.remoteFeatures) == null ? void 0 : _a.email) && !ChainController.state.noAdapters;
    this.isSocialEnabled = ((_b = this.remoteFeatures) == null ? void 0 : _b.socials) && this.remoteFeatures.socials.length > 0 && !ChainController.state.noAdapters;
    this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => {
      this.connectors = val;
      this.authConnector = this.connectors.find((c) => c.type === "AUTH");
      this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
    }), OptionsController.subscribeKey("features", (val) => {
      this.features = val;
    }), OptionsController.subscribeKey("remoteFeatures", (val) => {
      this.remoteFeatures = val;
      this.setEmailAndSocialEnableCheck(this.noAdapters, this.remoteFeatures);
    }), OptionsController.subscribeKey("enableWallets", (val) => this.enableWallets = val), ChainController.subscribeKey("noAdapters", (val) => this.setEmailAndSocialEnableCheck(val, this.remoteFeatures)), OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => this.checked = val));
  }
  disconnectedCallback() {
    var _a, _b;
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    (_a = this.resizeObserver) == null ? void 0 : _a.disconnect();
    const connectEl = (_b = this.shadowRoot) == null ? void 0 : _b.querySelector(".connect");
    connectEl == null ? void 0 : connectEl.removeEventListener("scroll", this.handleConnectListScroll.bind(this));
  }
  firstUpdated() {
    var _a, _b;
    const connectEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".connect");
    if (connectEl) {
      requestAnimationFrame(this.handleConnectListScroll.bind(this));
      connectEl == null ? void 0 : connectEl.addEventListener("scroll", this.handleConnectListScroll.bind(this));
      this.resizeObserver = new ResizeObserver(() => {
        this.handleConnectListScroll();
      });
      (_b = this.resizeObserver) == null ? void 0 : _b.observe(connectEl);
      this.handleConnectListScroll();
    }
  }
  render() {
    var _a;
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const isLegalCheckbox = (_a = OptionsController.state.features) == null ? void 0 : _a.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const isShowLegalCheckbox = Boolean(legalUrl) && Boolean(isLegalCheckbox) && this.walletGuide === "get-started";
    const isDisabled = isShowLegalCheckbox && !this.checked;
    const classes = {
      connect: true,
      disabled: isDisabled
    };
    const isEnableWalletGuide = OptionsController.state.enableWalletGuide;
    const isEnableWallets = this.enableWallets;
    const socialOrEmailLoginEnabled = this.isSocialEnabled || this.authConnector;
    const tabIndex = isDisabled ? -1 : void 0;
    return b`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          .padding=${["0", "0", "4", "0"]}
          class=${e(classes)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="2"
            .padding=${socialOrEmailLoginEnabled && isEnableWallets && isEnableWalletGuide && this.walletGuide === "get-started" ? ["0", "3", "0", "3"] : ["0", "3", "3", "3"]}
          >
            ${this.renderConnectMethod(tabIndex)}
          </wui-flex>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `;
  }
  reownBrandingTemplate() {
    var _a;
    if (HelpersUtil.hasFooter()) {
      return null;
    }
    if (!((_a = this.remoteFeatures) == null ? void 0 : _a.reownBranding)) {
      return null;
    }
    return b`<wui-ux-by-reown></wui-ux-by-reown>`;
  }
  setEmailAndSocialEnableCheck(noAdapters, remoteFeatures) {
    this.isEmailEnabled = (remoteFeatures == null ? void 0 : remoteFeatures.email) && !noAdapters;
    this.isSocialEnabled = (remoteFeatures == null ? void 0 : remoteFeatures.socials) && remoteFeatures.socials.length > 0 && !noAdapters;
    this.remoteFeatures = remoteFeatures;
    this.noAdapters = noAdapters;
  }
  checkIfAuthEnabled(connectors) {
    const namespacesWithAuthConnector = connectors.filter((c) => c.type === ConstantsUtil$2.CONNECTOR_TYPE_AUTH).map((i2) => i2.chain);
    const authSupportedNamespaces = ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS;
    return authSupportedNamespaces.some((ns) => namespacesWithAuthConnector.includes(ns));
  }
  renderConnectMethod(tabIndex) {
    const connectMethodsOrder = WalletUtil.getConnectOrderMethod(this.features, this.connectors);
    return b`${connectMethodsOrder.map((method, index) => {
      switch (method) {
        case "email":
          return b`${this.emailTemplate(tabIndex)} ${this.separatorTemplate(index, "email")}`;
        case "social":
          return b`${this.socialListTemplate(tabIndex)}
          ${this.separatorTemplate(index, "social")}`;
        case "wallet":
          return b`${this.walletListTemplate(tabIndex)}
          ${this.separatorTemplate(index, "wallet")}`;
        default:
          return null;
      }
    })}`;
  }
  checkMethodEnabled(name) {
    switch (name) {
      case "wallet":
        return this.enableWallets;
      case "social":
        return this.isSocialEnabled && this.isAuthEnabled;
      case "email":
        return this.isEmailEnabled && this.isAuthEnabled;
      default:
        return null;
    }
  }
  checkIsThereNextMethod(currentIndex) {
    const connectMethodsOrder = WalletUtil.getConnectOrderMethod(this.features, this.connectors);
    const nextMethod = connectMethodsOrder[currentIndex + 1];
    if (!nextMethod) {
      return void 0;
    }
    const isNextMethodEnabled = this.checkMethodEnabled(nextMethod);
    if (isNextMethodEnabled) {
      return nextMethod;
    }
    return this.checkIsThereNextMethod(currentIndex + 1);
  }
  separatorTemplate(index, type) {
    const nextEnabledMethod = this.checkIsThereNextMethod(index);
    const isExplore = this.walletGuide === "explore";
    switch (type) {
      case "wallet": {
        const isWalletEnable = this.enableWallets;
        return isWalletEnable && nextEnabledMethod && !isExplore ? b`<wui-separator data-testid="wui-separator" text="or"></wui-separator>` : null;
      }
      case "email": {
        const isNextMethodSocial = nextEnabledMethod === "social";
        return this.isAuthEnabled && this.isEmailEnabled && !isNextMethodSocial && nextEnabledMethod ? b`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>` : null;
      }
      case "social": {
        const isNextMethodEmail = nextEnabledMethod === "email";
        return this.isAuthEnabled && this.isSocialEnabled && !isNextMethodEmail && nextEnabledMethod ? b`<wui-separator data-testid="wui-separator" text="or"></wui-separator>` : null;
      }
      default:
        return null;
    }
  }
  emailTemplate(tabIndex) {
    if (!this.isEmailEnabled || !this.isAuthEnabled) {
      return null;
    }
    return b`<w3m-email-login-widget tabIdx=${o(tabIndex)}></w3m-email-login-widget>`;
  }
  socialListTemplate(tabIndex) {
    if (!this.isSocialEnabled || !this.isAuthEnabled) {
      return null;
    }
    return b`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${o(tabIndex)}
    ></w3m-social-login-widget>`;
  }
  walletListTemplate(tabIndex) {
    var _a, _b;
    const isEnableWallets = this.enableWallets;
    const isCollapseWalletsOldProp = ((_a = this.features) == null ? void 0 : _a.emailShowWallets) === false;
    const isCollapseWallets = (_b = this.features) == null ? void 0 : _b.collapseWallets;
    const shouldCollapseWallets = isCollapseWalletsOldProp || isCollapseWallets;
    if (!isEnableWallets) {
      return null;
    }
    if (CoreHelperUtil.isTelegram() && (CoreHelperUtil.isSafari() || CoreHelperUtil.isIos())) {
      ConnectionController.connectWalletConnect().catch((_e) => ({}));
    }
    if (this.walletGuide === "explore") {
      return null;
    }
    const hasOtherMethods = this.isAuthEnabled && (this.isEmailEnabled || this.isSocialEnabled);
    if (hasOtherMethods && shouldCollapseWallets) {
      return b`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${o(tabIndex)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
        icon="wallet"
      ></wui-list-button>`;
    }
    return b`<w3m-wallet-login-list tabIdx=${o(tabIndex)}></w3m-wallet-login-list>`;
  }
  legalCheckboxTemplate() {
    if (this.walletGuide === "explore") {
      return null;
    }
    return b`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`;
  }
  handleConnectListScroll() {
    var _a;
    const connectEl = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".connect");
    if (!connectEl) {
      return;
    }
    const shouldApplyMask = connectEl.scrollHeight > SCROLL_THRESHOLD;
    if (shouldApplyMask) {
      connectEl.style.setProperty("--connect-mask-image", `linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 100px,
          black calc(100% - 100px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`);
      connectEl.style.setProperty("--connect-scroll--top-opacity", MathUtil.interpolate([0, 50], [0, 1], connectEl.scrollTop).toString());
      connectEl.style.setProperty("--connect-scroll--bottom-opacity", MathUtil.interpolate([0, 50], [0, 1], connectEl.scrollHeight - connectEl.scrollTop - connectEl.offsetHeight).toString());
    } else {
      connectEl.style.setProperty("--connect-mask-image", "none");
      connectEl.style.setProperty("--connect-scroll--top-opacity", "0");
      connectEl.style.setProperty("--connect-scroll--bottom-opacity", "0");
    }
  }
  onContinueWalletClick() {
    RouterController.push("ConnectWallets");
  }
};
W3mConnectView.styles = styles$i;
__decorate$w([
  r()
], W3mConnectView.prototype, "connectors", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "authConnector", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "features", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "remoteFeatures", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "enableWallets", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "noAdapters", void 0);
__decorate$w([
  n()
], W3mConnectView.prototype, "walletGuide", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "checked", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "isEmailEnabled", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "isSocialEnabled", void 0);
__decorate$w([
  r()
], W3mConnectView.prototype, "isAuthEnabled", void 0);
W3mConnectView = __decorate$w([
  customElement("w3m-connect-view")
], W3mConnectView);
const styles$h = css`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[5]};
    padding-left: ${({ spacing }) => spacing[3]};
    padding-right: ${({ spacing }) => spacing[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ spacing }) => spacing[6]};
  }

  wui-text {
    color: ${({ tokens }) => tokens.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;
var __decorate$v = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiCtaButton = class WuiCtaButton2 extends i {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.label = "";
    this.buttonLabel = "";
  }
  render() {
    return b`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
  }
};
WuiCtaButton.styles = [resetStyles, elementStyles, styles$h];
__decorate$v([
  n({ type: Boolean })
], WuiCtaButton.prototype, "disabled", void 0);
__decorate$v([
  n()
], WuiCtaButton.prototype, "label", void 0);
__decorate$v([
  n()
], WuiCtaButton.prototype, "buttonLabel", void 0);
WuiCtaButton = __decorate$v([
  customElement("wui-cta-button")
], WuiCtaButton);
const styles$g = css`
  :host {
    display: block;
    padding: 0 ${({ spacing }) => spacing["5"]} ${({ spacing }) => spacing["5"]};
  }
`;
var __decorate$u = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mMobileDownloadLinks = class W3mMobileDownloadLinks2 extends i {
  constructor() {
    super(...arguments);
    this.wallet = void 0;
  }
  render() {
    if (!this.wallet) {
      this.style.display = "none";
      return null;
    }
    const { name, app_store, play_store, chrome_store, homepage } = this.wallet;
    const isMobile = CoreHelperUtil.isMobile();
    const isIos = CoreHelperUtil.isIos();
    const isAndroid = CoreHelperUtil.isAndroid();
    const isMultiple = [app_store, play_store, homepage, chrome_store].filter(Boolean).length > 1;
    const shortName = UiHelperUtil.getTruncateString({
      string: name,
      charsStart: 12,
      charsEnd: 0,
      truncate: "end"
    });
    if (isMultiple && !isMobile) {
      return b`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${() => RouterController.push("Downloads", { wallet: this.wallet })}
        ></wui-cta-button>
      `;
    }
    if (!isMultiple && homepage) {
      return b`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `;
    }
    if (app_store && isIos) {
      return b`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `;
    }
    if (play_store && isAndroid) {
      return b`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `;
    }
    this.style.display = "none";
    return null;
  }
  onAppStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.app_store) {
      CoreHelperUtil.openHref(this.wallet.app_store, "_blank");
    }
  }
  onPlayStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.play_store) {
      CoreHelperUtil.openHref(this.wallet.play_store, "_blank");
    }
  }
  onHomePage() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.homepage) {
      CoreHelperUtil.openHref(this.wallet.homepage, "_blank");
    }
  }
};
W3mMobileDownloadLinks.styles = [styles$g];
__decorate$u([
  n({ type: Object })
], W3mMobileDownloadLinks.prototype, "wallet", void 0);
W3mMobileDownloadLinks = __decorate$u([
  customElement("w3m-mobile-download-links")
], W3mMobileDownloadLinks);
const styles$f = css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({ durations }) => durations["lg"]};
    transition-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({ spacing }) => spacing["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({ easings }) => easings["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;
var __decorate$t = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mConnectingWidget extends i {
  constructor() {
    var _a, _b, _c, _d, _e;
    super();
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
    this.connector = (_b = RouterController.state.data) == null ? void 0 : _b.connector;
    this.timeout = void 0;
    this.secondaryBtnIcon = "refresh";
    this.onConnect = void 0;
    this.onRender = void 0;
    this.onAutoConnect = void 0;
    this.isWalletConnect = true;
    this.unsubscribe = [];
    this.imageSrc = AssetUtil.getConnectorImage(this.connector) ?? AssetUtil.getWalletImage(this.wallet);
    this.name = ((_c = this.wallet) == null ? void 0 : _c.name) ?? ((_d = this.connector) == null ? void 0 : _d.name) ?? "Wallet";
    this.isRetrying = false;
    this.uri = ConnectionController.state.wcUri;
    this.error = ConnectionController.state.wcError;
    this.ready = false;
    this.showRetry = false;
    this.label = void 0;
    this.secondaryBtnLabel = "Try again";
    this.secondaryLabel = "Accept connection request in the wallet";
    this.isLoading = false;
    this.isMobile = false;
    this.onRetry = void 0;
    this.unsubscribe.push(...[
      ConnectionController.subscribeKey("wcUri", (val) => {
        var _a2;
        this.uri = val;
        if (this.isRetrying && this.onRetry) {
          this.isRetrying = false;
          (_a2 = this.onConnect) == null ? void 0 : _a2.call(this);
        }
      }),
      ConnectionController.subscribeKey("wcError", (val) => this.error = val)
    ]);
    if ((CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari()) && CoreHelperUtil.isIos() && ConnectionController.state.wcUri) {
      (_e = this.onConnect) == null ? void 0 : _e.call(this);
    }
  }
  firstUpdated() {
    var _a;
    (_a = this.onAutoConnect) == null ? void 0 : _a.call(this);
    this.showRetry = !this.onAutoConnect;
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    ConnectionController.setWcError(false);
    clearTimeout(this.timeout);
  }
  render() {
    var _a;
    (_a = this.onRender) == null ? void 0 : _a.call(this);
    this.onShowRetry();
    const subLabel = this.error ? "Connection can be declined if a previous request is still active" : this.secondaryLabel;
    let label = "";
    if (this.label) {
      label = this.label;
    } else {
      label = `Continue in ${this.name}`;
      if (this.error) {
        label = "Connection declined";
      }
    }
    return b`
      <wui-flex
        data-error=${o(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "5", "5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${o(this.imageSrc)}></wui-wallet-image>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2", "0", "0", "0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error ? "error" : "primary"}>
            ${label}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${subLabel}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel ? b`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying || this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              ` : null}
      </wui-flex>

      ${this.isWalletConnect ? b`
              <wui-flex .padding=${["0", "5", "5", "5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            ` : null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `;
  }
  onShowRetry() {
    var _a;
    if (this.error && !this.showRetry) {
      this.showRetry = true;
      const retryButton = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-button");
      retryButton == null ? void 0 : retryButton.animate([{ opacity: 0 }, { opacity: 1 }], {
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  onTryAgain() {
    var _a, _b;
    ConnectionController.setWcError(false);
    if (this.onRetry) {
      this.isRetrying = true;
      (_a = this.onRetry) == null ? void 0 : _a.call(this);
    } else {
      (_b = this.onConnect) == null ? void 0 : _b.call(this);
    }
  }
  loaderTemplate() {
    const borderRadiusMaster = ThemeController.state.themeVariables["--w3m-border-radius-master"];
    const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace("px", ""), 10) : 4;
    return b`<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
  }
  onCopyUri() {
    try {
      if (this.uri) {
        CoreHelperUtil.copyToClopboard(this.uri);
        SnackController.showSuccess("Link copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
}
W3mConnectingWidget.styles = styles$f;
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "isRetrying", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "uri", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "error", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "ready", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "showRetry", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "label", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "secondaryBtnLabel", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "secondaryLabel", void 0);
__decorate$t([
  r()
], W3mConnectingWidget.prototype, "isLoading", void 0);
__decorate$t([
  n({ type: Boolean })
], W3mConnectingWidget.prototype, "isMobile", void 0);
__decorate$t([
  n()
], W3mConnectingWidget.prototype, "onRetry", void 0);
var __decorate$s = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingExternalView = class W3mConnectingExternalView2 extends W3mConnectingWidget {
  constructor() {
    var _a, _b, _c, _d, _e;
    super();
    this.externalViewUnsubscribe = [];
    this.connectionsByNamespace = ConnectionController.getConnections((_a = this.connector) == null ? void 0 : _a.chain);
    this.hasMultipleConnections = this.connectionsByNamespace.length > 0;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.currentActiveConnectorId = ConnectorController.state.activeConnectorIds[(_b = this.connector) == null ? void 0 : _b.chain];
    if (!this.connector) {
      throw new Error("w3m-connecting-view: No connector provided");
    }
    const namespace = (_c = this.connector) == null ? void 0 : _c.chain;
    if (this.isAlreadyConnected(this.connector)) {
      this.secondaryBtnLabel = void 0;
      this.label = `This account is already linked, change your account in ${this.connector.name}`;
      this.secondaryLabel = `To link a new account, open ${this.connector.name} and switch to the account you want to link`;
    }
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.connector.name ?? "Unknown",
        platform: "browser",
        displayIndex: (_d = this.wallet) == null ? void 0 : _d.display_index,
        walletRank: (_e = this.wallet) == null ? void 0 : _e.order,
        view: RouterController.state.view
      }
    });
    this.onConnect = this.onConnectProxy.bind(this);
    this.onAutoConnect = this.onConnectProxy.bind(this);
    this.isWalletConnect = false;
    this.externalViewUnsubscribe.push(ConnectorController.subscribeKey("activeConnectorIds", (val) => {
      var _a2;
      const newActiveConnectorId = val[namespace];
      const isMultiWalletEnabled = (_a2 = this.remoteFeatures) == null ? void 0 : _a2.multiWallet;
      const { redirectView } = RouterController.state.data ?? {};
      if (newActiveConnectorId !== this.currentActiveConnectorId) {
        if (this.hasMultipleConnections && isMultiWalletEnabled) {
          RouterController.replace("ProfileWallets");
          SnackController.showSuccess("New Wallet Added");
        } else if (redirectView) {
          RouterController.replace(redirectView);
        } else {
          ModalController.close();
        }
      }
    }), ConnectionController.subscribeKey("connections", this.onConnectionsChange.bind(this)));
  }
  disconnectedCallback() {
    this.externalViewUnsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  async onConnectProxy() {
    try {
      this.error = false;
      if (this.connector) {
        if (this.isAlreadyConnected(this.connector)) {
          return;
        }
        if (this.connector.id !== ConstantsUtil.CONNECTOR_ID.COINBASE_SDK || !this.error) {
          await ConnectionController.connectExternal(this.connector, this.connector.chain);
        }
      }
    } catch (error) {
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      if (isUserRejectedRequestError) {
        EventsController.sendEvent({
          type: "track",
          event: "USER_REJECTED",
          properties: { message: error.message }
        });
      } else {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: (error == null ? void 0 : error.message) ?? "Unknown" }
        });
      }
      this.error = true;
    }
  }
  onConnectionsChange(connections) {
    var _a, _b;
    if (((_a = this.connector) == null ? void 0 : _a.chain) && connections.get(this.connector.chain) && this.isAlreadyConnected(this.connector)) {
      const newConnections = connections.get(this.connector.chain) ?? [];
      const isMultiWalletEnabled = (_b = this.remoteFeatures) == null ? void 0 : _b.multiWallet;
      if (newConnections.length === 0) {
        RouterController.replace("Connect");
      } else {
        const accounts = ConnectionControllerUtil.getConnectionsByConnectorId(this.connectionsByNamespace, this.connector.id).flatMap((c) => c.accounts);
        const newAccounts = ConnectionControllerUtil.getConnectionsByConnectorId(newConnections, this.connector.id).flatMap((c) => c.accounts);
        if (newAccounts.length === 0) {
          if (this.hasMultipleConnections && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
            SnackController.showSuccess("Wallet deleted");
          } else {
            ModalController.close();
          }
        } else {
          const isAllAccountsSame = accounts.every((a2) => newAccounts.some((b2) => HelpersUtil$1.isLowerCaseMatch(a2.address, b2.address)));
          if (!isAllAccountsSame && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
          }
        }
      }
    }
  }
  isAlreadyConnected(connector) {
    return Boolean(connector) && this.connectionsByNamespace.some((c) => HelpersUtil$1.isLowerCaseMatch(c.connectorId, connector.id));
  }
};
W3mConnectingExternalView = __decorate$s([
  customElement("w3m-connecting-external-view")
], W3mConnectingExternalView);
const styles$e = i$1`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;
var __decorate$r = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingMultiChainView = class W3mConnectingMultiChainView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.activeConnector = ConnectorController.state.activeConnector;
    this.unsubscribe.push(...[ConnectorController.subscribeKey("activeConnector", (val) => this.activeConnector = val)]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    var _a;
    return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3", "5", "5", "5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${o(AssetUtil.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["0", "3", "0", "3"]}
        >
          <wui-text variant="lg-medium" color="primary">
            Select Chain for ${(_a = this.activeConnector) == null ? void 0 : _a.name}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2", "0", "2", "0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `;
  }
  networksTemplate() {
    var _a, _b;
    return (_b = (_a = this.activeConnector) == null ? void 0 : _a.connectors) == null ? void 0 : _b.map((connector, index) => {
      var _a2;
      return connector.name ? b`
            <w3m-list-wallet
              displayIndex=${index}
              imageSrc=${o(AssetUtil.getChainImage(connector.chain))}
              name=${ConstantsUtil.CHAIN_NAME_MAP[connector.chain]}
              @click=${() => this.onConnector(connector)}
              size="sm"
              data-testid="wui-list-chain-${connector.chain}"
              rdnsId=${(_a2 = connector.explorerWallet) == null ? void 0 : _a2.rdns}
            ></w3m-list-wallet>
          ` : null;
    });
  }
  onConnector(provider) {
    var _a, _b, _c, _d;
    const connector = (_b = (_a = this.activeConnector) == null ? void 0 : _a.connectors) == null ? void 0 : _b.find((p) => p.chain === provider.chain);
    const redirectView = (_c = RouterController.state.data) == null ? void 0 : _c.redirectView;
    if (!connector) {
      SnackController.showError("Failed to find connector");
      return;
    }
    if (connector.id === "walletConnect") {
      if (CoreHelperUtil.isMobile()) {
        RouterController.push("AllWallets");
      } else {
        RouterController.push("ConnectingWalletConnect", { redirectView });
      }
    } else {
      RouterController.push("ConnectingExternal", {
        connector,
        redirectView,
        wallet: (_d = this.activeConnector) == null ? void 0 : _d.explorerWallet
      });
    }
  }
};
W3mConnectingMultiChainView.styles = styles$e;
__decorate$r([
  r()
], W3mConnectingMultiChainView.prototype, "activeConnector", void 0);
W3mConnectingMultiChainView = __decorate$r([
  customElement("w3m-connecting-multi-chain-view")
], W3mConnectingMultiChainView);
var __decorate$q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingHeader = class W3mConnectingHeader2 extends i {
  constructor() {
    super(...arguments);
    this.platformTabs = [];
    this.unsubscribe = [];
    this.platforms = [];
    this.onSelectPlatfrom = void 0;
  }
  disconnectCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const tabs = this.generateTabs();
    return b`
      <wui-flex justifyContent="center" .padding=${["0", "0", "4", "0"]}>
        <wui-tabs .tabs=${tabs} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `;
  }
  generateTabs() {
    const tabs = this.platforms.map((platform) => {
      if (platform === "browser") {
        return { label: "Browser", icon: "extension", platform: "browser" };
      } else if (platform === "mobile") {
        return { label: "Mobile", icon: "mobile", platform: "mobile" };
      } else if (platform === "qrcode") {
        return { label: "Mobile", icon: "mobile", platform: "qrcode" };
      } else if (platform === "web") {
        return { label: "Webapp", icon: "browser", platform: "web" };
      } else if (platform === "desktop") {
        return { label: "Desktop", icon: "desktop", platform: "desktop" };
      }
      return { label: "Browser", icon: "extension", platform: "unsupported" };
    });
    this.platformTabs = tabs.map(({ platform }) => platform);
    return tabs;
  }
  onTabChange(index) {
    var _a;
    const tab = this.platformTabs[index];
    if (tab) {
      (_a = this.onSelectPlatfrom) == null ? void 0 : _a.call(this, tab);
    }
  }
};
__decorate$q([
  n({ type: Array })
], W3mConnectingHeader.prototype, "platforms", void 0);
__decorate$q([
  n()
], W3mConnectingHeader.prototype, "onSelectPlatfrom", void 0);
W3mConnectingHeader = __decorate$q([
  customElement("w3m-connecting-header")
], W3mConnectingHeader);
var __decorate$p = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcBrowser = class W3mConnectingWcBrowser2 extends W3mConnectingWidget {
  constructor() {
    var _a;
    super();
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-browser: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.onAutoConnect = this.onConnectProxy.bind(this);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "browser",
        displayIndex: (_a = this.wallet) == null ? void 0 : _a.display_index,
        walletRank: this.wallet.order,
        view: RouterController.state.view
      }
    });
  }
  async onConnectProxy() {
    try {
      this.error = false;
      const { connectors } = ConnectorController.state;
      const connector = connectors.find((c) => {
        var _a, _b, _c;
        return c.type === "ANNOUNCED" && ((_a = c.info) == null ? void 0 : _a.rdns) === ((_b = this.wallet) == null ? void 0 : _b.rdns) || c.type === "INJECTED" || c.name === ((_c = this.wallet) == null ? void 0 : _c.name);
      });
      if (connector) {
        await ConnectionController.connectExternal(connector, connector.chain);
      } else {
        throw new Error("w3m-connecting-wc-browser: No connector found");
      }
      ModalController.close();
    } catch (error) {
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      if (isUserRejectedRequestError) {
        EventsController.sendEvent({
          type: "track",
          event: "USER_REJECTED",
          properties: { message: error.message }
        });
      } else {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: (error == null ? void 0 : error.message) ?? "Unknown" }
        });
      }
      this.error = true;
    }
  }
};
W3mConnectingWcBrowser = __decorate$p([
  customElement("w3m-connecting-wc-browser")
], W3mConnectingWcBrowser);
var __decorate$o = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcDesktop = class W3mConnectingWcDesktop2 extends W3mConnectingWidget {
  constructor() {
    var _a;
    super();
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-desktop: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.onRender = this.onRenderProxy.bind(this);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "desktop",
        displayIndex: (_a = this.wallet) == null ? void 0 : _a.display_index,
        walletRank: this.wallet.order,
        view: RouterController.state.view
      }
    });
  }
  onRenderProxy() {
    var _a;
    if (!this.ready && this.uri) {
      this.ready = true;
      (_a = this.onConnect) == null ? void 0 : _a.call(this);
    }
  }
  onConnectProxy() {
    var _a;
    if (((_a = this.wallet) == null ? void 0 : _a.desktop_link) && this.uri) {
      try {
        this.error = false;
        const { desktop_link, name } = this.wallet;
        const { redirect, href } = CoreHelperUtil.formatNativeUrl(desktop_link, this.uri);
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(this.wallet);
        CoreHelperUtil.openHref(redirect, "_blank");
      } catch {
        this.error = true;
      }
    }
  }
};
W3mConnectingWcDesktop = __decorate$o([
  customElement("w3m-connecting-wc-desktop")
], W3mConnectingWcDesktop);
var __decorate$n = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcMobile = class W3mConnectingWcMobile2 extends W3mConnectingWidget {
  constructor() {
    var _a;
    super();
    this.btnLabelTimeout = void 0;
    this.redirectDeeplink = void 0;
    this.redirectUniversalLink = void 0;
    this.target = void 0;
    this.preferUniversalLinks = OptionsController.state.experimental_preferUniversalLinks;
    this.isLoading = true;
    this.onConnect = () => {
      ConnectionControllerUtil.onConnectMobile(this.wallet);
    };
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-mobile: No wallet provided");
    }
    this.secondaryBtnLabel = "Open";
    this.secondaryLabel = ConstantsUtil$1.CONNECT_LABELS.MOBILE;
    this.secondaryBtnIcon = "externalLink";
    this.onHandleURI();
    this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", () => {
      this.onHandleURI();
    }));
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "mobile",
        displayIndex: (_a = this.wallet) == null ? void 0 : _a.display_index,
        walletRank: this.wallet.order,
        view: RouterController.state.view
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.btnLabelTimeout);
  }
  onHandleURI() {
    var _a;
    this.isLoading = !this.uri;
    if (!this.ready && this.uri) {
      this.ready = true;
      (_a = this.onConnect) == null ? void 0 : _a.call(this);
    }
  }
  onTryAgain() {
    var _a;
    ConnectionController.setWcError(false);
    (_a = this.onConnect) == null ? void 0 : _a.call(this);
  }
};
__decorate$n([
  r()
], W3mConnectingWcMobile.prototype, "redirectDeeplink", void 0);
__decorate$n([
  r()
], W3mConnectingWcMobile.prototype, "redirectUniversalLink", void 0);
__decorate$n([
  r()
], W3mConnectingWcMobile.prototype, "target", void 0);
__decorate$n([
  r()
], W3mConnectingWcMobile.prototype, "preferUniversalLinks", void 0);
__decorate$n([
  r()
], W3mConnectingWcMobile.prototype, "isLoading", void 0);
W3mConnectingWcMobile = __decorate$n([
  customElement("w3m-connecting-wc-mobile")
], W3mConnectingWcMobile);
const styles$d = css`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({ durations }) => durations["xl"]};
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
var __decorate$m = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcQrcode = class W3mConnectingWcQrcode2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.basic = false;
  }
  firstUpdated() {
    var _a, _b, _c;
    if (!this.basic) {
      EventsController.sendEvent({
        type: "track",
        event: "SELECT_WALLET",
        properties: {
          name: ((_a = this.wallet) == null ? void 0 : _a.name) ?? "WalletConnect",
          platform: "qrcode",
          displayIndex: (_b = this.wallet) == null ? void 0 : _b.display_index,
          walletRank: (_c = this.wallet) == null ? void 0 : _c.order,
          view: RouterController.state.view
        }
      });
    }
  }
  disconnectedCallback() {
    var _a;
    super.disconnectedCallback();
    (_a = this.unsubscribe) == null ? void 0 : _a.forEach((unsub) => unsub());
  }
  render() {
    this.onRenderProxy();
    return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0", "5", "5", "5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
  onRenderProxy() {
    if (!this.ready && this.uri) {
      this.ready = true;
    }
  }
  qrCodeTemplate() {
    if (!this.uri || !this.ready) {
      return null;
    }
    const alt = this.wallet ? this.wallet.name : void 0;
    ConnectionController.setWcLinking(void 0);
    ConnectionController.setRecentWallet(this.wallet);
    const qrColor = ThemeController.state.themeVariables["--apkt-qr-color"] ?? ThemeController.state.themeVariables["--w3m-qr-color"];
    return b` <wui-qr-code
      theme=${ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${o(AssetUtil.getWalletImage(this.wallet))}
      color=${o(qrColor)}
      alt=${o(alt)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`;
  }
  copyTemplate() {
    const inactive = !this.uri || !this.ready;
    return b`<wui-button
      .disabled=${inactive}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`;
  }
};
W3mConnectingWcQrcode.styles = styles$d;
__decorate$m([
  n({ type: Boolean })
], W3mConnectingWcQrcode.prototype, "basic", void 0);
W3mConnectingWcQrcode = __decorate$m([
  customElement("w3m-connecting-wc-qrcode")
], W3mConnectingWcQrcode);
var __decorate$l = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcUnsupported = class W3mConnectingWcUnsupported2 extends i {
  constructor() {
    var _a, _b, _c;
    super();
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-unsupported: No wallet provided");
    }
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "browser",
        displayIndex: (_b = this.wallet) == null ? void 0 : _b.display_index,
        walletRank: (_c = this.wallet) == null ? void 0 : _c.order,
        view: RouterController.state.view
      }
    });
  }
  render() {
    return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "5", "5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${o(AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
};
W3mConnectingWcUnsupported = __decorate$l([
  customElement("w3m-connecting-wc-unsupported")
], W3mConnectingWcUnsupported);
var __decorate$k = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcWeb = class W3mConnectingWcWeb2 extends W3mConnectingWidget {
  constructor() {
    var _a, _b;
    super();
    this.isLoading = true;
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-web: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.secondaryBtnLabel = "Open";
    this.secondaryLabel = ConstantsUtil$1.CONNECT_LABELS.MOBILE;
    this.secondaryBtnIcon = "externalLink";
    this.updateLoadingState();
    this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", () => {
      this.updateLoadingState();
    }));
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "web",
        displayIndex: (_a = this.wallet) == null ? void 0 : _a.display_index,
        walletRank: (_b = this.wallet) == null ? void 0 : _b.order,
        view: RouterController.state.view
      }
    });
  }
  updateLoadingState() {
    this.isLoading = !this.uri;
  }
  onConnectProxy() {
    var _a;
    if (((_a = this.wallet) == null ? void 0 : _a.webapp_link) && this.uri) {
      try {
        this.error = false;
        const { webapp_link, name } = this.wallet;
        const { redirect, href } = CoreHelperUtil.formatUniversalUrl(webapp_link, this.uri);
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(this.wallet);
        CoreHelperUtil.openHref(redirect, "_blank");
      } catch {
        this.error = true;
      }
    }
  }
};
__decorate$k([
  r()
], W3mConnectingWcWeb.prototype, "isLoading", void 0);
W3mConnectingWcWeb = __decorate$k([
  customElement("w3m-connecting-wc-web")
], W3mConnectingWcWeb);
const styles$c = css`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;
var __decorate$j = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcView = class W3mConnectingWcView2 extends i {
  constructor() {
    var _a;
    super();
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
    this.unsubscribe = [];
    this.platform = void 0;
    this.platforms = [];
    this.isSiwxEnabled = Boolean(OptionsController.state.siwx);
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.displayBranding = true;
    this.basic = false;
    this.determinePlatforms();
    this.initializeConnection();
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (OptionsController.state.enableMobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    return b`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `;
  }
  reownBrandingTemplate() {
    var _a;
    if (!((_a = this.remoteFeatures) == null ? void 0 : _a.reownBranding) || !this.displayBranding) {
      return null;
    }
    return b`<wui-ux-by-reown></wui-ux-by-reown>`;
  }
  async initializeConnection(retry = false) {
    var _a, _b;
    if (this.platform === "browser" || OptionsController.state.manualWCControl && !retry) {
      return;
    }
    try {
      const { wcPairingExpiry, status } = ConnectionController.state;
      const { redirectView } = RouterController.state.data ?? {};
      if (retry || OptionsController.state.enableEmbedded || CoreHelperUtil.isPairingExpired(wcPairingExpiry) || status === "connecting") {
        const connectionsByNamespace = ConnectionController.getConnections(ChainController.state.activeChain);
        const isMultiWalletEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.multiWallet;
        const hasConnections = connectionsByNamespace.length > 0;
        await ConnectionController.connectWalletConnect({ cache: "never" });
        if (!this.isSiwxEnabled) {
          if (hasConnections && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
            SnackController.showSuccess("New Wallet Added");
          } else if (redirectView) {
            RouterController.replace(redirectView);
          } else {
            ModalController.close();
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("An error occurred when attempting to switch chain") && !OptionsController.state.enableNetworkSwitch) {
        if (ChainController.state.activeChain) {
          ChainController.setActiveCaipNetwork(CaipNetworksUtil.getUnsupportedNetwork(`${ChainController.state.activeChain}:${(_b = ChainController.state.activeCaipNetwork) == null ? void 0 : _b.id}`));
          ChainController.showUnsupportedChainUI();
          return;
        }
      }
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      if (isUserRejectedRequestError) {
        EventsController.sendEvent({
          type: "track",
          event: "USER_REJECTED",
          properties: { message: error.message }
        });
      } else {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: (error == null ? void 0 : error.message) ?? "Unknown" }
        });
      }
      ConnectionController.setWcError(true);
      SnackController.showError(error.message ?? "Connection error");
      ConnectionController.resetWcConnection();
      RouterController.goBack();
    }
  }
  determinePlatforms() {
    if (!this.wallet) {
      this.platforms.push("qrcode");
      this.platform = "qrcode";
      return;
    }
    if (this.platform) {
      return;
    }
    const { mobile_link, desktop_link, webapp_link, injected, rdns } = this.wallet;
    const injectedIds = injected == null ? void 0 : injected.map(({ injected_id }) => injected_id).filter(Boolean);
    const browserIds = [...rdns ? [rdns] : injectedIds ?? []];
    const isBrowser = OptionsController.state.isUniversalProvider ? false : browserIds.length;
    const hasMobileWCLink = mobile_link;
    const isWebWc = webapp_link;
    const isBrowserInstalled = ConnectionController.checkInstalled(browserIds);
    const isBrowserWc = isBrowser && isBrowserInstalled;
    const isDesktopWc = desktop_link && !CoreHelperUtil.isMobile();
    if (isBrowserWc && !ChainController.state.noAdapters) {
      this.platforms.push("browser");
    }
    if (hasMobileWCLink) {
      this.platforms.push(CoreHelperUtil.isMobile() ? "mobile" : "qrcode");
    }
    if (isWebWc) {
      this.platforms.push("web");
    }
    if (isDesktopWc) {
      this.platforms.push("desktop");
    }
    const isCustomDeeplinkWallet = MobileWalletUtil.isCustomDeeplinkWallet(this.wallet.id, ChainController.state.activeChain);
    if (!isBrowserWc && isBrowser && !ChainController.state.noAdapters && !isCustomDeeplinkWallet) {
      this.platforms.push("unsupported");
    }
    this.platform = this.platforms[0];
  }
  platformTemplate() {
    switch (this.platform) {
      case "browser":
        return b`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;
      case "web":
        return b`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;
      case "desktop":
        return b`
          <w3m-connecting-wc-desktop .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-desktop>
        `;
      case "mobile":
        return b`
          <w3m-connecting-wc-mobile isMobile .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-mobile>
        `;
      case "qrcode":
        return b`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;
      default:
        return b`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`;
    }
  }
  headerTemplate() {
    const multiPlatform = this.platforms.length > 1;
    if (!multiPlatform) {
      return null;
    }
    return b`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `;
  }
  async onSelectPlatform(platform) {
    var _a;
    const container = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("div");
    if (container) {
      await container.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.platform = platform;
      container.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
};
W3mConnectingWcView.styles = styles$c;
__decorate$j([
  r()
], W3mConnectingWcView.prototype, "platform", void 0);
__decorate$j([
  r()
], W3mConnectingWcView.prototype, "platforms", void 0);
__decorate$j([
  r()
], W3mConnectingWcView.prototype, "isSiwxEnabled", void 0);
__decorate$j([
  r()
], W3mConnectingWcView.prototype, "remoteFeatures", void 0);
__decorate$j([
  n({ type: Boolean })
], W3mConnectingWcView.prototype, "displayBranding", void 0);
__decorate$j([
  n({ type: Boolean })
], W3mConnectingWcView.prototype, "basic", void 0);
W3mConnectingWcView = __decorate$j([
  customElement("w3m-connecting-wc-view")
], W3mConnectingWcView);
var __decorate$i = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcBasicView = class W3mConnectingWcBasicView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.isMobile = CoreHelperUtil.isMobile();
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (this.isMobile) {
      const { featured, recommended } = ApiController.state;
      const { customWallets } = OptionsController.state;
      const recent = StorageUtil.getRecentWallets();
      const showConnectors = featured.length || recommended.length || (customWallets == null ? void 0 : customWallets.length) || recent.length;
      return b`<wui-flex flexDirection="column" gap="2" .margin=${["1", "3", "3", "3"]}>
        ${showConnectors ? b`<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
    }
    return b`<wui-flex flexDirection="column" .padding=${["0", "0", "4", "0"]}>
        <w3m-connecting-wc-view ?basic=${true} .displayBranding=${false}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0", "3", "0", "3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `;
  }
  reownBrandingTemplate() {
    var _a;
    if (!((_a = this.remoteFeatures) == null ? void 0 : _a.reownBranding)) {
      return null;
    }
    return b` <wui-flex flexDirection="column" .padding=${["1", "0", "1", "0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`;
  }
};
__decorate$i([
  r()
], W3mConnectingWcBasicView.prototype, "isMobile", void 0);
__decorate$i([
  r()
], W3mConnectingWcBasicView.prototype, "remoteFeatures", void 0);
W3mConnectingWcBasicView = __decorate$i([
  customElement("w3m-connecting-wc-basic-view")
], W3mConnectingWcBasicView);
const styles$b = i$1`
  .continue-button-container {
    width: 100%;
  }
`;
var __decorate$h = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mChooseAccountNameView = class W3mChooseAccountNameView2 extends i {
  constructor() {
    super(...arguments);
    this.loading = false;
  }
  render() {
    return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0", "0", "4", "0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
      CoreHelperUtil.openHref(NavigationUtil.URLS.FAQ, "_blank");
    }}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
  }
  onboardingTemplate() {
    return b` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0", "6", "0", "6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box icon="id" size="xl" iconSize="xxl" color="default"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="lg-medium" color="primary">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`;
  }
  buttonsTemplate() {
    return b`<wui-flex
      .padding=${["0", "8", "0", "8"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`;
  }
  handleContinue() {
    RouterController.push("RegisterAccountName");
    EventsController.sendEvent({
      type: "track",
      event: "OPEN_ENS_FLOW",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
  }
};
W3mChooseAccountNameView.styles = styles$b;
__decorate$h([
  r()
], W3mChooseAccountNameView.prototype, "loading", void 0);
W3mChooseAccountNameView = __decorate$h([
  customElement("w3m-choose-account-name-view")
], W3mChooseAccountNameView);
var __decorate$g = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mDownloadsView = class W3mDownloadsView2 extends i {
  constructor() {
    var _a;
    super(...arguments);
    this.wallet = (_a = RouterController.state.data) == null ? void 0 : _a.wallet;
  }
  render() {
    if (!this.wallet) {
      throw new Error("w3m-downloads-view");
    }
    return b`
      <wui-flex gap="2" flexDirection="column" .padding=${["3", "3", "4", "3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
  }
  chromeTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.chrome_store)) {
      return null;
    }
    return b`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`;
  }
  iosTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.app_store)) {
      return null;
    }
    return b`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`;
  }
  androidTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.play_store)) {
      return null;
    }
    return b`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`;
  }
  homepageTemplate() {
    var _a;
    if (!((_a = this.wallet) == null ? void 0 : _a.homepage)) {
      return null;
    }
    return b`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `;
  }
  openStore(params) {
    if (params.href && this.wallet) {
      EventsController.sendEvent({
        type: "track",
        event: "GET_WALLET",
        properties: {
          name: this.wallet.name,
          walletRank: this.wallet.order,
          explorerId: this.wallet.id,
          type: params.type
        }
      });
      CoreHelperUtil.openHref(params.href, "_blank");
    }
  }
  onChromeStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.chrome_store) {
      this.openStore({ href: this.wallet.chrome_store, type: "chrome_store" });
    }
  }
  onAppStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.app_store) {
      this.openStore({ href: this.wallet.app_store, type: "app_store" });
    }
  }
  onPlayStore() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.play_store) {
      this.openStore({ href: this.wallet.play_store, type: "play_store" });
    }
  }
  onHomePage() {
    var _a;
    if ((_a = this.wallet) == null ? void 0 : _a.homepage) {
      this.openStore({ href: this.wallet.homepage, type: "homepage" });
    }
  }
};
W3mDownloadsView = __decorate$g([
  customElement("w3m-downloads-view")
], W3mDownloadsView);
var __decorate$f = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const EXPLORER = "https://walletconnect.com/explorer";
let W3mGetWalletView = class W3mGetWalletView2 extends i {
  render() {
    return b`
      <wui-flex flexDirection="column" .padding=${["0", "3", "3", "3"]} gap="2">
        ${this.recommendedWalletsTemplate()}
        <w3m-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          size="sm"
          @click=${() => {
      CoreHelperUtil.openHref("https://walletconnect.com/explorer?type=wallet", "_blank");
    }}
        ></w3m-list-wallet>
      </wui-flex>
    `;
  }
  recommendedWalletsTemplate() {
    const { recommended, featured } = ApiController.state;
    const { customWallets } = OptionsController.state;
    const wallets = [...featured, ...customWallets ?? [], ...recommended].slice(0, 4);
    return wallets.map((wallet, index) => b`
        <w3m-list-wallet
          displayIndex=${index}
          name=${wallet.name ?? "Unknown"}
          tagVariant="accent"
          size="sm"
          imageSrc=${o(AssetUtil.getWalletImage(wallet))}
          @click=${() => {
      this.onWalletClick(wallet);
    }}
        ></w3m-list-wallet>
      `);
  }
  onWalletClick(wallet) {
    EventsController.sendEvent({
      type: "track",
      event: "GET_WALLET",
      properties: {
        name: wallet.name,
        walletRank: void 0,
        explorerId: wallet.id,
        type: "homepage"
      }
    });
    CoreHelperUtil.openHref(wallet.homepage ?? EXPLORER, "_blank");
  }
};
W3mGetWalletView = __decorate$f([
  customElement("w3m-get-wallet-view")
], W3mGetWalletView);
var __decorate$e = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mHelpWidget = class W3mHelpWidget2 extends i {
  constructor() {
    super(...arguments);
    this.data = [];
  }
  render() {
    return b`
      <wui-flex flexDirection="column" alignItems="center" gap="4">
        ${this.data.map((item) => b`
            <wui-flex flexDirection="column" alignItems="center" gap="5">
              <wui-flex flexDirection="row" justifyContent="center" gap="1">
                ${item.images.map((image) => b`<wui-visual size="sm" name=${image}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="1">
              <wui-text variant="md-regular" color="primary" align="center">${item.title}</wui-text>
              <wui-text variant="sm-regular" color="secondary" align="center"
                >${item.text}</wui-text
              >
            </wui-flex>
          `)}
      </wui-flex>
    `;
  }
};
__decorate$e([
  n({ type: Array })
], W3mHelpWidget.prototype, "data", void 0);
W3mHelpWidget = __decorate$e([
  customElement("w3m-help-widget")
], W3mHelpWidget);
var __decorate$d = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const data$1 = [
  {
    images: ["login", "profile", "lock"],
    title: "One login for all of web3",
    text: "Log in to any app by connecting your wallet. Say goodbye to countless passwords!"
  },
  {
    images: ["defi", "nft", "eth"],
    title: "A home for your digital assets",
    text: "A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."
  },
  {
    images: ["browser", "noun", "dao"],
    title: "Your gateway to a new web",
    text: "With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."
  }
];
let W3mWhatIsAWalletView = class W3mWhatIsAWalletView2 extends i {
  render() {
    return b`
      <wui-flex
        flexDirection="column"
        .padding=${["6", "5", "5", "5"]}
        alignItems="center"
        gap="5"
      >
        <w3m-help-widget .data=${data$1}></w3m-help-widget>
        <wui-button variant="accent-primary" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `;
  }
  onGetWallet() {
    EventsController.sendEvent({ type: "track", event: "CLICK_GET_WALLET_HELP" });
    RouterController.push("GetWallet");
  }
};
W3mWhatIsAWalletView = __decorate$d([
  customElement("w3m-what-is-a-wallet-view")
], W3mWhatIsAWalletView);
const styles$a = css`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var __decorate$c = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectWalletsView = class W3mConnectWalletsView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.unsubscribe.push(OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => {
      this.checked = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    var _a;
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = (_a = OptionsController.state.features) == null ? void 0 : _a.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
    const disabled = showLegalCheckbox && !this.checked;
    const tabIndex = disabled ? -1 : void 0;
    return b`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${showLegalCheckbox ? ["0", "3", "3", "3"] : "3"}
        gap="2"
        class=${o(disabled ? "disabled" : void 0)}
      >
        <w3m-wallet-login-list tabIdx=${o(tabIndex)}></w3m-wallet-login-list>
      </wui-flex>
    `;
  }
};
W3mConnectWalletsView.styles = styles$a;
__decorate$c([
  r()
], W3mConnectWalletsView.prototype, "checked", void 0);
W3mConnectWalletsView = __decorate$c([
  customElement("w3m-connect-wallets-view")
], W3mConnectWalletsView);
const styles$9 = css`
  :host {
    display: block;
    width: 120px;
    height: 120px;
  }

  svg {
    width: 120px;
    height: 120px;
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: ${(tokens) => tokens.colors.accent100};
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;
var __decorate$b = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiLoadingHexagon = class WuiLoadingHexagon2 extends i {
  render() {
    return b`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `;
  }
};
WuiLoadingHexagon.styles = [resetStyles, styles$9];
WuiLoadingHexagon = __decorate$b([
  customElement("wui-loading-hexagon")
], WuiLoadingHexagon);
const styles$8 = i$1`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;
var __decorate$a = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mNetworkSwitchView = class W3mNetworkSwitchView2 extends i {
  constructor() {
    var _a;
    super();
    this.network = (_a = RouterController.state.data) == null ? void 0 : _a.network;
    this.unsubscribe = [];
    this.showRetry = false;
    this.error = false;
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  firstUpdated() {
    this.onSwitchNetwork();
  }
  render() {
    if (!this.network) {
      throw new Error("w3m-network-switch-view: No network provided");
    }
    this.onShowRetry();
    const label = this.getLabel();
    const subLabel = this.getSubLabel();
    return b`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "10", "5"]}
        gap="7"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${o(AssetUtil.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error ? null : b`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="h6-regular" color="primary">${label}</wui-text>
          <wui-text align="center" variant="md-regular" color="secondary">${subLabel}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent-primary"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `;
  }
  getSubLabel() {
    const connectorId = ConnectorController.getConnectorId(ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (authConnector && connectorId === ConstantsUtil.CONNECTOR_ID.AUTH) {
      return "";
    }
    return this.error ? "Switch can be declined if chain is not supported by a wallet or previous request is still active" : "Accept connection request in your wallet";
  }
  getLabel() {
    var _a;
    const connectorId = ConnectorController.getConnectorId(ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (authConnector && connectorId === ConstantsUtil.CONNECTOR_ID.AUTH) {
      return `Switching to ${((_a = this.network) == null ? void 0 : _a.name) ?? "Unknown"} network...`;
    }
    return this.error ? "Switch declined" : "Approve in wallet";
  }
  onShowRetry() {
    var _a;
    if (this.error && !this.showRetry) {
      this.showRetry = true;
      const retryButton = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("wui-button");
      retryButton == null ? void 0 : retryButton.animate([{ opacity: 0 }, { opacity: 1 }], {
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  async onSwitchNetwork() {
    var _a;
    try {
      this.error = false;
      if (ChainController.state.activeChain !== ((_a = this.network) == null ? void 0 : _a.chainNamespace)) {
        ChainController.setIsSwitchingNamespace(true);
      }
      if (this.network) {
        await ChainController.switchActiveNetwork(this.network);
        const isAuthenticated = await SIWXUtil.isAuthenticated();
        if (isAuthenticated) {
          RouterController.goBack();
        }
      }
    } catch (error) {
      this.error = true;
    }
  }
};
W3mNetworkSwitchView.styles = styles$8;
__decorate$a([
  r()
], W3mNetworkSwitchView.prototype, "showRetry", void 0);
__decorate$a([
  r()
], W3mNetworkSwitchView.prototype, "error", void 0);
W3mNetworkSwitchView = __decorate$a([
  customElement("w3m-network-switch-view")
], W3mNetworkSwitchView);
const styles$7 = css`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ spacing }) => spacing[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
var __decorate$9 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiListNetwork = class WuiListNetwork2 extends i {
  constructor() {
    super(...arguments);
    this.imageSrc = void 0;
    this.name = "Ethereum";
    this.disabled = false;
  }
  render() {
    return b`
      <button ?disabled=${this.disabled} tabindex=${o(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          ${this.imageTemplate()}
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `;
  }
  imageTemplate() {
    if (this.imageSrc) {
      return b`<wui-image ?boxed=${true} src=${this.imageSrc}></wui-image>`;
    }
    return b`<wui-image
      ?boxed=${true}
      icon="networkPlaceholder"
      size="lg"
      iconColor="default"
    ></wui-image>`;
  }
};
WuiListNetwork.styles = [resetStyles, elementStyles, styles$7];
__decorate$9([
  n()
], WuiListNetwork.prototype, "imageSrc", void 0);
__decorate$9([
  n()
], WuiListNetwork.prototype, "name", void 0);
__decorate$9([
  n()
], WuiListNetwork.prototype, "tabIdx", void 0);
__decorate$9([
  n({ type: Boolean })
], WuiListNetwork.prototype, "disabled", void 0);
WuiListNetwork = __decorate$9([
  customElement("wui-list-network")
], WuiListNetwork);
const styles$6 = i$1`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$8 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mNetworksView = class W3mNetworksView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.network = ChainController.state.activeCaipNetwork;
    this.requestedCaipNetworks = ChainController.getCaipNetworks();
    this.search = "";
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    }, 100);
    this.unsubscribe.push(AssetController.subscribeNetworkImages(() => this.requestUpdate()), ChainController.subscribeKey("activeCaipNetwork", (val) => this.network = val), ChainController.subscribe(() => {
      this.requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0", "3", "3", "3"]}
        flexDirection="column"
        gap="2"
      >
        ${this.networksTemplate()}
      </wui-flex>
    `;
  }
  templateSearchInput() {
    return b`
      <wui-flex gap="2" .padding=${["0", "3", "3", "3"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  networksTemplate() {
    var _a;
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, this.requestedCaipNetworks);
    if (this.search) {
      this.filteredNetworks = sortedNetworks == null ? void 0 : sortedNetworks.filter((network) => {
        var _a2;
        return (_a2 = network == null ? void 0 : network.name) == null ? void 0 : _a2.toLowerCase().includes(this.search.toLowerCase());
      });
    } else {
      this.filteredNetworks = sortedNetworks;
    }
    return (_a = this.filteredNetworks) == null ? void 0 : _a.map((network) => {
      var _a2;
      return b`
        <wui-list-network
          .selected=${((_a2 = this.network) == null ? void 0 : _a2.id) === network.id}
          imageSrc=${o(AssetUtil.getNetworkImage(network))}
          type="network"
          name=${network.name ?? network.id}
          @click=${() => this.onSwitchNetwork(network)}
          .disabled=${ChainController.isCaipNetworkDisabled(network)}
          data-testid=${`w3m-network-switch-${network.name ?? network.id}`}
        ></wui-list-network>
      `;
    });
  }
  onSwitchNetwork(network) {
    NetworkUtil.onSwitchNetwork({ network });
  }
};
W3mNetworksView.styles = styles$6;
__decorate$8([
  r()
], W3mNetworksView.prototype, "network", void 0);
__decorate$8([
  r()
], W3mNetworksView.prototype, "requestedCaipNetworks", void 0);
__decorate$8([
  r()
], W3mNetworksView.prototype, "filteredNetworks", void 0);
__decorate$8([
  r()
], W3mNetworksView.prototype, "search", void 0);
W3mNetworksView = __decorate$8([
  customElement("w3m-networks-view")
], W3mNetworksView);
const styles$5 = css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["1"]} * 9 - ${({ borderRadius }) => borderRadius["3"]}
    );
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["1"]} * 9 - ${({ borderRadius }) => borderRadius["3"]}
    );
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.core.glass010};
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({ spacing }) => spacing["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({ easings }) => easings["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: ${({ spacing }) => spacing["01"]} ${({ spacing }) => spacing["2"]};
  }

  .capitalize {
    text-transform: capitalize;
  }
`;
var __decorate$7 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const chainIconNameMap = {
  eip155: "eth",
  solana: "solana",
  bip122: "bitcoin",
  polkadot: void 0
};
let W3mSwitchActiveChainView = class W3mSwitchActiveChainView2 extends i {
  constructor() {
    var _a, _b;
    super(...arguments);
    this.unsubscribe = [];
    this.switchToChain = (_a = RouterController.state.data) == null ? void 0 : _a.switchToChain;
    this.caipNetwork = (_b = RouterController.state.data) == null ? void 0 : _b.network;
    this.activeChain = ChainController.state.activeChain;
  }
  firstUpdated() {
    this.unsubscribe.push(ChainController.subscribeKey("activeChain", (val) => this.activeChain = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const switchedChainNameString = this.switchToChain ? ConstantsUtil.CHAIN_NAME_MAP[this.switchToChain] : "supported";
    if (!this.switchToChain) {
      return null;
    }
    const nextChainName = ConstantsUtil.CHAIN_NAME_MAP[this.switchToChain];
    return b`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["4", "2", "2", "2"]}
        gap="4"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="2">
          <wui-visual
            size="md"
            name=${o(chainIconNameMap[this.switchToChain])}
          ></wui-visual>
          <wui-flex gap="2" flexDirection="column" alignItems="center">
            <wui-text
              data-testid=${`w3m-switch-active-chain-to-${nextChainName}`}
              variant="lg-regular"
              color="primary"
              align="center"
              >Switch to <span class="capitalize">${nextChainName}</span></wui-text
            >
            <wui-text variant="md-regular" color="secondary" align="center">
              Connected wallet doesn't support connecting to ${switchedChainNameString} chain. You
              need to connect with a different wallet.
            </wui-text>
          </wui-flex>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `;
  }
  async switchActiveChain() {
    if (!this.switchToChain) {
      return;
    }
    ChainController.setIsSwitchingNamespace(true);
    ConnectorController.setFilterByNamespace(this.switchToChain);
    if (this.caipNetwork) {
      await ChainController.switchActiveNetwork(this.caipNetwork);
    } else {
      ChainController.setActiveNamespace(this.switchToChain);
    }
    RouterController.reset("Connect");
  }
};
W3mSwitchActiveChainView.styles = styles$5;
__decorate$7([
  n()
], W3mSwitchActiveChainView.prototype, "activeChain", void 0);
W3mSwitchActiveChainView = __decorate$7([
  customElement("w3m-switch-active-chain-view")
], W3mSwitchActiveChainView);
var __decorate$6 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const data = [
  {
    images: ["network", "layers", "system"],
    title: "The system’s nuts and bolts",
    text: "A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."
  },
  {
    images: ["noun", "defiAlt", "dao"],
    title: "Designed for different uses",
    text: "Each network is designed differently, and may therefore suit certain apps and experiences."
  }
];
let W3mWhatIsANetworkView = class W3mWhatIsANetworkView2 extends i {
  render() {
    return b`
      <wui-flex
        flexDirection="column"
        .padding=${["6", "5", "5", "5"]}
        alignItems="center"
        gap="5"
      >
        <w3m-help-widget .data=${data}></w3m-help-widget>
        <wui-button
          variant="accent-primary"
          size="md"
          @click=${() => {
      CoreHelperUtil.openHref("https://ethereum.org/en/developers/docs/networks/", "_blank");
    }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
  }
};
W3mWhatIsANetworkView = __decorate$6([
  customElement("w3m-what-is-a-network-view")
], W3mWhatIsANetworkView);
const styles$4 = i$1`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$5 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUnsupportedChainView = class W3mUnsupportedChainView2 extends i {
  constructor() {
    var _a;
    super();
    this.swapUnsupportedChain = (_a = RouterController.state.data) == null ? void 0 : _a.swapUnsupportedChain;
    this.unsubscribe = [];
    this.disconnecting = false;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(AssetController.subscribeNetworkImages(() => this.requestUpdate()), OptionsController.subscribeKey("remoteFeatures", (val) => {
      this.remoteFeatures = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["3", "5", "2", "5"]}
          alignItems="center"
          gap="5"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="3" gap="2"> ${this.networksTemplate()} </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="3" gap="2">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="signOut"
            ?chevron=${false}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="md-medium" color="secondary">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
  }
  descriptionTemplate() {
    if (this.swapUnsupportedChain) {
      return b`
        <wui-text variant="sm-regular" color="secondary" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `;
    }
    return b`
      <wui-text variant="sm-regular" color="secondary" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `;
  }
  networksTemplate() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    const filteredNetworks = this.swapUnsupportedChain ? sortedNetworks.filter((network) => ConstantsUtil$1.SWAP_SUPPORTED_NETWORKS.includes(network.caipNetworkId)) : sortedNetworks;
    return filteredNetworks.map((network) => b`
        <wui-list-network
          imageSrc=${o(AssetUtil.getNetworkImage(network))}
          name=${network.name ?? "Unknown"}
          @click=${() => this.onSwitchNetwork(network)}
        >
        </wui-list-network>
      `);
  }
  async onDisconnect() {
    var _a;
    try {
      this.disconnecting = true;
      const namespace = ChainController.state.activeChain;
      const connectionsByNamespace = ConnectionController.getConnections(namespace);
      const hasConnections = connectionsByNamespace.length > 0;
      const connectorId = namespace && ConnectorController.state.activeConnectorIds[namespace];
      const isMultiWalletEnabled = (_a = this.remoteFeatures) == null ? void 0 : _a.multiWallet;
      await ConnectionController.disconnect(isMultiWalletEnabled ? { id: connectorId, namespace } : {});
      if (hasConnections && isMultiWalletEnabled) {
        RouterController.push("ProfileWallets");
        SnackController.showSuccess("Wallet deleted");
      }
    } catch {
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: { message: "Failed to disconnect" }
      });
      SnackController.showError("Failed to disconnect");
    } finally {
      this.disconnecting = false;
    }
  }
  async onSwitchNetwork(network) {
    const caipAddress = ChainController.getActiveCaipAddress();
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const shouldSupportAllNetworks = ChainController.getNetworkProp("supportsAllNetworks", network.chainNamespace);
    const routerData = RouterController.state.data;
    if (caipAddress) {
      if (approvedCaipNetworkIds == null ? void 0 : approvedCaipNetworkIds.includes(network.caipNetworkId)) {
        await ChainController.switchActiveNetwork(network);
      } else if (shouldSupportAllNetworks) {
        RouterController.push("SwitchNetwork", { ...routerData, network });
      } else {
        RouterController.push("SwitchNetwork", { ...routerData, network });
      }
    } else if (!caipAddress) {
      ChainController.setActiveCaipNetwork(network);
      RouterController.push("Connect");
    }
  }
};
W3mUnsupportedChainView.styles = styles$4;
__decorate$5([
  r()
], W3mUnsupportedChainView.prototype, "disconnecting", void 0);
__decorate$5([
  r()
], W3mUnsupportedChainView.prototype, "remoteFeatures", void 0);
W3mUnsupportedChainView = __decorate$5([
  customElement("w3m-unsupported-chain-view")
], W3mUnsupportedChainView);
const styles$3 = css`
  wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing }) => spacing[2]};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    padding: ${({ spacing }) => spacing[3]};
  }

  /* -- Types --------------------------------------------------------- */
  wui-flex[data-type='info'] {
    color: ${({ tokens }) => tokens.theme.textSecondary};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  wui-flex[data-type='success'] {
    color: ${({ tokens }) => tokens.core.textSuccess};
    background-color: ${({ tokens }) => tokens.core.backgroundSuccess};
  }

  wui-flex[data-type='error'] {
    color: ${({ tokens }) => tokens.core.textError};
    background-color: ${({ tokens }) => tokens.core.backgroundError};
  }

  wui-flex[data-type='warning'] {
    color: ${({ tokens }) => tokens.core.textWarning};
    background-color: ${({ tokens }) => tokens.core.backgroundWarning};
  }

  wui-flex[data-type='info'] wui-icon-box {
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  wui-flex[data-type='success'] wui-icon-box {
    background-color: ${({ tokens }) => tokens.core.backgroundSuccess};
  }

  wui-flex[data-type='error'] wui-icon-box {
    background-color: ${({ tokens }) => tokens.core.backgroundError};
  }

  wui-flex[data-type='warning'] wui-icon-box {
    background-color: ${({ tokens }) => tokens.core.backgroundWarning};
  }

  wui-text {
    flex: 1;
  }
`;
var __decorate$4 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiBanner = class WuiBanner2 extends i {
  constructor() {
    super(...arguments);
    this.icon = "externalLink";
    this.text = "";
    this.type = "info";
  }
  render() {
    return b`
      <wui-flex alignItems="center" data-type=${this.type}>
        <wui-icon-box size="sm" color="inherit" icon=${this.icon}></wui-icon-box>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
      </wui-flex>
    `;
  }
};
WuiBanner.styles = [resetStyles, elementStyles, styles$3];
__decorate$4([
  n()
], WuiBanner.prototype, "icon", void 0);
__decorate$4([
  n()
], WuiBanner.prototype, "text", void 0);
__decorate$4([
  n()
], WuiBanner.prototype, "type", void 0);
WuiBanner = __decorate$4([
  customElement("wui-banner")
], WuiBanner);
const styles$2 = i$1`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$3 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletCompatibleNetworksView = class W3mWalletCompatibleNetworksView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b` <wui-flex flexDirection="column" .padding=${["2", "3", "3", "3"]} gap="2">
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`;
  }
  networkTemplate() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const caipNetwork = ChainController.state.activeCaipNetwork;
    const isNetworkEnabledForSmartAccounts = ChainController.checkIfSmartAccountEnabled();
    let sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    if (isNetworkEnabledForSmartAccounts && getPreferredAccountType(caipNetwork == null ? void 0 : caipNetwork.chainNamespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT) {
      if (!caipNetwork) {
        return null;
      }
      sortedNetworks = [caipNetwork];
    }
    const namespaceNetworks = sortedNetworks.filter((network) => network.chainNamespace === (caipNetwork == null ? void 0 : caipNetwork.chainNamespace));
    return namespaceNetworks.map((network) => b`
        <wui-list-network
          imageSrc=${o(AssetUtil.getNetworkImage(network))}
          name=${network.name ?? "Unknown"}
          ?transparent=${true}
        >
        </wui-list-network>
      `);
  }
};
W3mWalletCompatibleNetworksView.styles = styles$2;
W3mWalletCompatibleNetworksView = __decorate$3([
  customElement("w3m-wallet-compatible-networks-view")
], W3mWalletCompatibleNetworksView);
const styles$1 = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    box-shadow: 0 0 0 8px ${({ tokens }) => tokens.theme.borderPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    overflow: hidden;
  }

  :host([data-border-radius-full='true']) {
    border-radius: 50px;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`;
var __decorate$2 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiVisualThumbnail = class WuiVisualThumbnail2 extends i {
  render() {
    this.dataset["borderRadiusFull"] = this.borderRadiusFull ? "true" : "false";
    return b`${this.templateVisual()}`;
  }
  templateVisual() {
    if (this.imageSrc) {
      return b`<wui-image src=${this.imageSrc} alt=${this.alt ?? ""}></wui-image>`;
    }
    return b`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`;
  }
};
WuiVisualThumbnail.styles = [resetStyles, styles$1];
__decorate$2([
  n()
], WuiVisualThumbnail.prototype, "imageSrc", void 0);
__decorate$2([
  n()
], WuiVisualThumbnail.prototype, "alt", void 0);
__decorate$2([
  n({ type: Boolean })
], WuiVisualThumbnail.prototype, "borderRadiusFull", void 0);
WuiVisualThumbnail = __decorate$2([
  customElement("wui-visual-thumbnail")
], WuiVisualThumbnail);
const styles = css`
  :host {
    display: flex;
    justify-content: center;
    gap: ${({ spacing }) => spacing["4"]};
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;
var __decorate$1 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSIWXSignMessageThumbnails = class W3mSIWXSignMessageThumbnails2 extends i {
  constructor() {
    var _a, _b, _c;
    super(...arguments);
    this.dappImageUrl = (_a = OptionsController.state.metadata) == null ? void 0 : _a.icons;
    this.walletImageUrl = (_c = (_b = ChainController.getAccountData()) == null ? void 0 : _b.connectedWalletInfo) == null ? void 0 : _c.icon;
  }
  firstUpdated() {
    var _a;
    const visuals = (_a = this.shadowRoot) == null ? void 0 : _a.querySelectorAll("wui-visual-thumbnail");
    if (visuals == null ? void 0 : visuals[0]) {
      this.createAnimation(visuals[0], "translate(18px)");
    }
    if (visuals == null ? void 0 : visuals[1]) {
      this.createAnimation(visuals[1], "translate(-18px)");
    }
  }
  render() {
    var _a;
    return b`
      <wui-visual-thumbnail
        ?borderRadiusFull=${true}
        .imageSrc=${(_a = this.dappImageUrl) == null ? void 0 : _a[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
  }
  createAnimation(element, translation) {
    element.animate([{ transform: "translateX(0px)" }, { transform: translation }], {
      duration: 1600,
      easing: "cubic-bezier(0.56, 0, 0.48, 1)",
      direction: "alternate",
      iterations: Infinity
    });
  }
};
W3mSIWXSignMessageThumbnails.styles = styles;
W3mSIWXSignMessageThumbnails = __decorate$1([
  customElement("w3m-siwx-sign-message-thumbnails")
], W3mSIWXSignMessageThumbnails);
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSIWXSignMessageView = class W3mSIWXSignMessageView2 extends i {
  constructor() {
    var _a;
    super(...arguments);
    this.dappName = (_a = OptionsController.state.metadata) == null ? void 0 : _a.name;
    this.isCancelling = false;
    this.isSigning = false;
  }
  render() {
    return b`
      <wui-flex justifyContent="center" .padding=${["8", "0", "6", "0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex .padding=${["0", "20", "5", "20"]} gap="3" justifyContent="space-between">
        <wui-text variant="lg-medium" align="center" color="primary"
          >${this.dappName ?? "Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["0", "10", "4", "10"]} gap="3" justifyContent="space-between">
        <wui-text variant="md-regular" align="center" color="secondary"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["4", "5", "5", "5"]} gap="3" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral-secondary"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling ? "Cancelling..." : "Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral-primary"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning ? "Signing..." : "Sign"}
        </wui-button>
      </wui-flex>
    `;
  }
  async onSign() {
    this.isSigning = true;
    try {
      await SIWXUtil.requestSignMessage();
    } catch (error) {
      if (error instanceof Error && error.message.includes("OTP is required")) {
        SnackController.showError({
          message: "Something went wrong. We need to verify your account again."
        });
        RouterController.replace("DataCapture");
        return;
      }
      throw error;
    } finally {
      this.isSigning = false;
    }
  }
  async onCancel() {
    this.isCancelling = true;
    await SIWXUtil.cancelSignMessage().finally(() => this.isCancelling = false);
  }
};
__decorate([
  r()
], W3mSIWXSignMessageView.prototype, "isCancelling", void 0);
__decorate([
  r()
], W3mSIWXSignMessageView.prototype, "isSigning", void 0);
W3mSIWXSignMessageView = __decorate([
  customElement("w3m-siwx-sign-message-view")
], W3mSIWXSignMessageView);
export {
  AppKitAccountButton,
  AppKitButton,
  AppKitConnectButton,
  AppKitNetworkButton,
  W3mAccountButton,
  W3mAccountSettingsView,
  W3mAccountView,
  W3mAllWalletsView,
  W3mButton,
  W3mChooseAccountNameView,
  W3mConnectButton,
  W3mConnectView,
  W3mConnectWalletsView,
  W3mConnectingExternalView,
  W3mConnectingMultiChainView,
  W3mConnectingWcBasicView,
  W3mConnectingWcView,
  W3mDownloadsView,
  a as W3mFooter,
  W3mFundWalletView,
  W3mGetWalletView,
  W3mNetworkButton,
  W3mNetworkSwitchView,
  W3mNetworksView,
  W3mProfileWalletsView,
  W as W3mRouter,
  W3mSIWXSignMessageView,
  W3mSwitchActiveChainView,
  W3mUnsupportedChainView,
  W3mWalletCompatibleNetworksView,
  W3mWhatIsANetworkView,
  W3mWhatIsAWalletView
};
//# sourceMappingURL=index-DdQSHIhv.js.map
