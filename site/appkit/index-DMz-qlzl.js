import { n as css, q as i, R as RouterController, t as b, E as EventsController, r as resetStyles, o as elementStyles } from "./appkit-DOrUN3iw.js";
import { r, n } from "./class-map-B0iniyJ1.js";
import { c as customElement } from "./index-ClJML15C.js";
import "./index-DD1kXiHv.js";
import { H as HelpersUtil } from "./HelpersUtil-CODKQ52v.js";
import { o } from "./if-defined-AQastk2C.js";
import "./index-CeqZ_NJd.js";
import "./index-Crml59k7.js";
const styles$3 = css`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;
var __decorate$3 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mFooter = class W3mFooter2 extends i {
  constructor() {
    super(...arguments);
    this.resizeObserver = void 0;
    this.unsubscribe = [];
    this.status = "hide";
    this.view = RouterController.state.view;
  }
  firstUpdated() {
    this.status = HelpersUtil.hasFooter() ? "show" : "hide";
    this.unsubscribe.push(RouterController.subscribeKey("view", (val) => {
      this.view = val;
      this.status = HelpersUtil.hasFooter() ? "show" : "hide";
      if (this.status === "hide") {
        const globalStyles = document.documentElement.style;
        globalStyles.setProperty("--apkt-footer-height", "0px");
      }
    }));
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.getWrapper()) {
          const newHeight = `${entry.contentRect.height}px`;
          const globalStyles = document.documentElement.style;
          globalStyles.setProperty("--apkt-footer-height", newHeight);
        }
      }
    });
    this.resizeObserver.observe(this.getWrapper());
  }
  render() {
    return b`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `;
  }
  templatePageContainer() {
    if (HelpersUtil.hasFooter()) {
      return b` ${this.templateFooter()}`;
    }
    return null;
  }
  templateFooter() {
    switch (this.view) {
      case "Networks":
        return this.templateNetworksFooter();
      case "Connect":
      case "ConnectWallets":
      case "OnRampFiatSelect":
      case "OnRampTokenSelect":
        return b`<w3m-legal-footer></w3m-legal-footer>`;
      case "OnRampProviders":
        return b`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;
      default:
        return null;
    }
  }
  templateNetworksFooter() {
    return b` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`;
  }
  onNetworkHelp() {
    EventsController.sendEvent({ type: "track", event: "CLICK_NETWORK_HELP" });
    RouterController.push("WhatIsANetwork");
  }
  getWrapper() {
    var _a;
    return (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("div.container");
  }
};
W3mFooter.styles = [styles$3];
__decorate$3([
  r()
], W3mFooter.prototype, "status", void 0);
__decorate$3([
  r()
], W3mFooter.prototype, "view", void 0);
W3mFooter = __decorate$3([
  customElement("w3m-footer")
], W3mFooter);
const styles$2 = css`
  :host {
    display: block;
    width: inherit;
  }
`;
var __decorate$2 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mRouter = class W3mRouter2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.viewState = RouterController.state.view;
    this.history = RouterController.state.history.join(",");
    this.unsubscribe.push(RouterController.subscribeKey("view", () => {
      this.history = RouterController.state.history.join(",");
      document.documentElement.style.setProperty("--apkt-duration-dynamic", "var(--apkt-durations-lg)");
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    document.documentElement.style.setProperty("--apkt-duration-dynamic", "0s");
  }
  render() {
    return b`${this.templatePageContainer()}`;
  }
  templatePageContainer() {
    return b`<w3m-router-container
      history=${this.history}
      .setView=${() => {
      this.viewState = RouterController.state.view;
    }}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`;
  }
  viewTemplate(view) {
    switch (view) {
      case "AccountSettings":
        return b`<w3m-account-settings-view></w3m-account-settings-view>`;
      case "Account":
        return b`<w3m-account-view></w3m-account-view>`;
      case "AllWallets":
        return b`<w3m-all-wallets-view></w3m-all-wallets-view>`;
      case "ApproveTransaction":
        return b`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;
      case "BuyInProgress":
        return b`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;
      case "ChooseAccountName":
        return b`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;
      case "Connect":
        return b`<w3m-connect-view></w3m-connect-view>`;
      case "Create":
        return b`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;
      case "ConnectingWalletConnect":
        return b`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;
      case "ConnectingWalletConnectBasic":
        return b`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;
      case "ConnectingExternal":
        return b`<w3m-connecting-external-view></w3m-connecting-external-view>`;
      case "ConnectingSiwe":
        return b`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;
      case "ConnectWallets":
        return b`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;
      case "ConnectSocials":
        return b`<w3m-connect-socials-view></w3m-connect-socials-view>`;
      case "ConnectingSocial":
        return b`<w3m-connecting-social-view></w3m-connecting-social-view>`;
      case "DataCapture":
        return b`<w3m-data-capture-view></w3m-data-capture-view>`;
      case "DataCaptureOtpConfirm":
        return b`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;
      case "Downloads":
        return b`<w3m-downloads-view></w3m-downloads-view>`;
      case "EmailLogin":
        return b`<w3m-email-login-view></w3m-email-login-view>`;
      case "EmailVerifyOtp":
        return b`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;
      case "EmailVerifyDevice":
        return b`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;
      case "GetWallet":
        return b`<w3m-get-wallet-view></w3m-get-wallet-view>`;
      case "Networks":
        return b`<w3m-networks-view></w3m-networks-view>`;
      case "SwitchNetwork":
        return b`<w3m-network-switch-view></w3m-network-switch-view>`;
      case "ProfileWallets":
        return b`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;
      case "Transactions":
        return b`<w3m-transactions-view></w3m-transactions-view>`;
      case "OnRampProviders":
        return b`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;
      case "OnRampTokenSelect":
        return b`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;
      case "OnRampFiatSelect":
        return b`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;
      case "UpgradeEmailWallet":
        return b`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;
      case "UpdateEmailWallet":
        return b`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;
      case "UpdateEmailPrimaryOtp":
        return b`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;
      case "UpdateEmailSecondaryOtp":
        return b`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;
      case "UnsupportedChain":
        return b`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;
      case "Swap":
        return b`<w3m-swap-view></w3m-swap-view>`;
      case "SwapSelectToken":
        return b`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;
      case "SwapPreview":
        return b`<w3m-swap-preview-view></w3m-swap-preview-view>`;
      case "WalletSend":
        return b`<w3m-wallet-send-view></w3m-wallet-send-view>`;
      case "WalletSendSelectToken":
        return b`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;
      case "WalletSendPreview":
        return b`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;
      case "WalletSendConfirmed":
        return b`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;
      case "WhatIsABuy":
        return b`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;
      case "WalletReceive":
        return b`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;
      case "WalletCompatibleNetworks":
        return b`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;
      case "WhatIsAWallet":
        return b`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;
      case "ConnectingMultiChain":
        return b`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;
      case "WhatIsANetwork":
        return b`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;
      case "ConnectingFarcaster":
        return b`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;
      case "SwitchActiveChain":
        return b`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;
      case "RegisterAccountName":
        return b`<w3m-register-account-name-view></w3m-register-account-name-view>`;
      case "RegisterAccountNameSuccess":
        return b`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;
      case "SmartSessionCreated":
        return b`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;
      case "SmartSessionList":
        return b`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;
      case "SIWXSignMessage":
        return b`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;
      case "Pay":
        return b`<w3m-pay-view></w3m-pay-view>`;
      case "PayLoading":
        return b`<w3m-pay-loading-view></w3m-pay-loading-view>`;
      case "PayQuote":
        return b`<w3m-pay-quote-view></w3m-pay-quote-view>`;
      case "FundWallet":
        return b`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;
      case "PayWithExchange":
        return b`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;
      case "PayWithExchangeSelectAsset":
        return b`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;
      case "UsageExceeded":
        return b`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;
      case "SmartAccountSettings":
        return b`<w3m-smart-account-settings-view></w3m-smart-account-settings-view>`;
      default:
        return b`<w3m-connect-view></w3m-connect-view>`;
    }
  }
};
W3mRouter.styles = [styles$2];
__decorate$2([
  r()
], W3mRouter.prototype, "viewState", void 0);
__decorate$2([
  r()
], W3mRouter.prototype, "history", void 0);
W3mRouter = __decorate$2([
  customElement("w3m-router")
], W3mRouter);
const styles$1 = css`
  :host {
    position: relative;
    border-radius: ${({ borderRadius }) => borderRadius[2]};
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: ${({ spacing }) => spacing[1]};
    padding: ${({ spacing }) => spacing[1]};
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }
`;
var __decorate$1 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const TOTAL_IMAGES = 4;
let WuiAllWalletsImage = class WuiAllWalletsImage2 extends i {
  constructor() {
    super(...arguments);
    this.walletImages = [];
  }
  render() {
    const isPlaceholders = this.walletImages.length < TOTAL_IMAGES;
    return b`${this.walletImages.slice(0, TOTAL_IMAGES).map(({ src, walletName }) => b`
          <wui-wallet-image
            size="sm"
            imageSrc=${src}
            name=${o(walletName)}
          ></wui-wallet-image>
        `)}
    ${isPlaceholders ? [...Array(TOTAL_IMAGES - this.walletImages.length)].map(() => b` <wui-wallet-image size="sm" name=""></wui-wallet-image>`) : null} `;
  }
};
WuiAllWalletsImage.styles = [resetStyles, styles$1];
__decorate$1([
  n({ type: Array })
], WuiAllWalletsImage.prototype, "walletImages", void 0);
WuiAllWalletsImage = __decorate$1([
  customElement("wui-all-wallets-image")
], WuiAllWalletsImage);
const styles = css`
  :host {
    width: 100%;
  }

  button {
    column-gap: ${({ spacing }) => spacing[2]};
    padding: ${({ spacing }) => spacing[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    color: ${({ tokens }) => tokens.theme.textPrimary};
  }

  button > wui-wallet-image {
    background: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:hover:enabled {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  button[data-all-wallets='true'] {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  button[data-all-wallets='true']:hover:enabled {
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  button:focus-visible:enabled {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    box-shadow: 0 0 0 4px ${({ tokens }) => tokens.core.foregroundAccent020};
  }

  button:disabled {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: ${({ tokens }) => tokens.core.glass010};
    color: ${({ tokens }) => tokens.theme.foregroundTertiary};
  }

  wui-flex.namespace-icon {
    width: 16px;
    height: 16px;
    border-radius: ${({ borderRadius }) => borderRadius.round};
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.theme.backgroundPrimary};
    transition: box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
  }

  button:hover:enabled wui-flex.namespace-icon {
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  wui-flex.namespace-icon > wui-icon {
    width: 10px;
    height: 10px;
  }

  wui-flex.namespace-icon:not(:first-child) {
    margin-left: -4px;
  }
`;
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const NAMESPACE_ICONS = {
  eip155: "ethereum",
  solana: "solana",
  bip122: "bitcoin",
  polkadot: void 0,
  cosmos: void 0,
  sui: void 0,
  stacks: void 0,
  ton: "ton",
  tron: "tron"
};
let WuiListWallet = class WuiListWallet2 extends i {
  constructor() {
    super(...arguments);
    this.walletImages = [];
    this.imageSrc = "";
    this.name = "";
    this.size = "md";
    this.tabIdx = void 0;
    this.namespaces = [];
    this.disabled = false;
    this.showAllWallets = false;
    this.loading = false;
    this.loadingSpinnerColor = "accent-100";
  }
  render() {
    this.dataset["size"] = this.size;
    return b`
      <button
        ?disabled=${this.disabled}
        data-all-wallets=${this.showAllWallets}
        tabindex=${o(this.tabIdx)}
      >
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-flex flexDirection="column" justifyContent="center" alignItems="flex-start" gap="1">
          <wui-text variant="lg-regular" color="inherit">${this.name}</wui-text>
          ${this.templateNamespaces()}
        </wui-flex>
        ${this.templateStatus()}
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `;
  }
  templateNamespaces() {
    var _a;
    if ((_a = this.namespaces) == null ? void 0 : _a.length) {
      return b`<wui-flex alignItems="center" gap="0">
        ${this.namespaces.map((namespace, index) => {
        var _a2;
        return b`<wui-flex
              alignItems="center"
              justifyContent="center"
              zIndex=${(((_a2 = this.namespaces) == null ? void 0 : _a2.length) ?? 0) * 2 - index}
              class="namespace-icon"
            >
              <wui-icon
                name=${o(NAMESPACE_ICONS[namespace])}
                size="sm"
                color="default"
              ></wui-icon>
            </wui-flex>`;
      })}
      </wui-flex>`;
    }
    return null;
  }
  templateAllWallets() {
    if (this.showAllWallets && this.imageSrc) {
      return b` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `;
    } else if (this.showAllWallets && this.walletIcon) {
      return b` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `;
    }
    return null;
  }
  templateWalletImage() {
    if (!this.showAllWallets && this.imageSrc) {
      return b`<wui-wallet-image
        size=${o(this.size === "sm" ? "sm" : "md")}
        imageSrc=${this.imageSrc}
        name=${this.name}
      ></wui-wallet-image>`;
    } else if (!this.showAllWallets && !this.imageSrc) {
      return b`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`;
    }
    return null;
  }
  templateStatus() {
    if (this.loading) {
      return b`<wui-loading-spinner size="lg" color="accent-primary"></wui-loading-spinner>`;
    } else if (this.tagLabel && this.tagVariant) {
      return b`<wui-tag size="sm" variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`;
    }
    return null;
  }
};
WuiListWallet.styles = [resetStyles, elementStyles, styles];
__decorate([
  n({ type: Array })
], WuiListWallet.prototype, "walletImages", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "imageSrc", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "name", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "size", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "tagLabel", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "tagVariant", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "walletIcon", void 0);
__decorate([
  n()
], WuiListWallet.prototype, "tabIdx", void 0);
__decorate([
  n({ type: Array })
], WuiListWallet.prototype, "namespaces", void 0);
__decorate([
  n({ type: Boolean })
], WuiListWallet.prototype, "disabled", void 0);
__decorate([
  n({ type: Boolean })
], WuiListWallet.prototype, "showAllWallets", void 0);
__decorate([
  n({ type: Boolean })
], WuiListWallet.prototype, "loading", void 0);
__decorate([
  n({ type: String })
], WuiListWallet.prototype, "loadingSpinnerColor", void 0);
WuiListWallet = __decorate([
  customElement("wui-list-wallet")
], WuiListWallet);
export {
  W3mRouter as W,
  W3mFooter as a
};
//# sourceMappingURL=index-DMz-qlzl.js.map
