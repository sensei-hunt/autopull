import { j as process$1 } from "./appkit-DOrUN3iw.js";
const ConstantsUtil = {
  ACCOUNT_TABS: [{ label: "Tokens" }, { label: "Activity" }],
  SECURE_SITE_ORIGIN: (typeof process$1 !== "undefined" && typeof process$1.env !== "undefined" ? process$1.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org",
  VIEW_DIRECTION: {
    Next: "next",
    Prev: "prev"
  },
  ANIMATION_DURATIONS: {
    HeaderText: 120
  },
  VIEWS_WITH_LEGAL_FOOTER: [
    "Connect",
    "ConnectWallets",
    "OnRampTokenSelect",
    "OnRampFiatSelect",
    "OnRampProviders"
  ],
  VIEWS_WITH_DEFAULT_FOOTER: ["Networks"]
};
export {
  ConstantsUtil as C
};
//# sourceMappingURL=ConstantsUtil-CkzhOBMd.js.map
