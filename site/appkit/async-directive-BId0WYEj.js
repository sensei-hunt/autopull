import "./appkit-DOrUN3iw.js";
import { i, t } from "./class-map-B0iniyJ1.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = (o2) => null === o2 || "object" != typeof o2 && "function" != typeof o2, r$1 = (o2) => void 0 === o2.strings;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = (i2, t2) => {
  var _a;
  const e = i2._$AN;
  if (void 0 === e) return false;
  for (const i3 of e) (_a = i3._$AO) == null ? void 0 : _a.call(i3, t2, false), s(i3, t2);
  return true;
}, o = (i2) => {
  let t2, e;
  do {
    if (void 0 === (t2 = i2._$AM)) break;
    e = t2._$AN, e.delete(i2), i2 = t2;
  } while (0 === (e == null ? void 0 : e.size));
}, r = (i2) => {
  for (let t2; t2 = i2._$AM; i2 = t2) {
    let e = t2._$AN;
    if (void 0 === e) t2._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(i2)) break;
    e.add(i2), c(t2);
  }
};
function h(i2) {
  void 0 !== this._$AN ? (o(this), this._$AM = i2, r(this)) : this._$AM = i2;
}
function n(i2, t2 = false, e = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size) if (t2) if (Array.isArray(r2)) for (let i3 = e; i3 < r2.length; i3++) s(r2[i3], false), o(r2[i3]);
  else null != r2 && (s(r2, false), o(r2));
  else s(this, i2);
}
const c = (i2) => {
  i2.type == t.CHILD && (i2._$AP ?? (i2._$AP = n), i2._$AQ ?? (i2._$AQ = h));
};
class f extends i {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i2, t2, e) {
    super._$AT(i2, t2, e), r(this), this.isConnected = i2._$AU;
  }
  _$AO(i2, t2 = true) {
    var _a, _b;
    i2 !== this.isConnected && (this.isConnected = i2, i2 ? (_a = this.reconnected) == null ? void 0 : _a.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), t2 && (s(this, i2), o(this));
  }
  setValue(t2) {
    if (r$1(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i2 = [...this._$Ct._$AH];
      i2[this._$Ci] = t2, this._$Ct._$AI(i2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
export {
  f,
  n$1 as n
};
//# sourceMappingURL=async-directive-BId0WYEj.js.map
