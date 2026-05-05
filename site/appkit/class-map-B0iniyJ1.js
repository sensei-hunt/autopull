import { M as f, P as u, Q as E } from "./appkit-DOrUN3iw.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n2, metadata: i2 } = r2;
  let s = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s && globalThis.litPropertyMetadata.set(i2, s = /* @__PURE__ */ new Map()), "setter" === n2 && ((t2 = Object.create(t2)).wrapped = true), s.set(r2.name, t2), "accessor" === n2) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n3 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n3, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n2) {
    const { name: o2 } = r2;
    return function(r3) {
      const n3 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n3, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n2);
};
function n(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = e$1(class extends i {
  constructor(t$1) {
    var _a;
    if (super(t$1), t$1.type !== t.ATTRIBUTE || "class" !== t$1.name || ((_a = t$1.strings) == null ? void 0 : _a.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s) => t2[s]).join(" ") + " ";
  }
  update(s, [i2]) {
    var _a, _b;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s.strings && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i2) i2[t2] && !((_a = this.nt) == null ? void 0 : _a.has(t2)) && this.st.add(t2);
      return this.render(i2);
    }
    const r2 = s.element.classList;
    for (const t2 of this.st) t2 in i2 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i2) {
      const s2 = !!i2[t2];
      s2 === this.st.has(t2) || ((_b = this.nt) == null ? void 0 : _b.has(t2)) || (s2 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return E;
  }
});
export {
  e as a,
  e$1 as e,
  i,
  n,
  r,
  t
};
//# sourceMappingURL=class-map-B0iniyJ1.js.map
