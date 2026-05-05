import { A } from "./appkit-DOrUN3iw.js";
import { f } from "./async-directive-BId0WYEj.js";
import { e as e$1 } from "./class-map-B0iniyJ1.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = () => new h();
class h {
}
const o = /* @__PURE__ */ new WeakMap(), n = e$1(class extends f {
  render(i) {
    return A;
  }
  update(i, [s]) {
    var _a;
    const e2 = s !== this.G;
    return e2 && void 0 !== this.G && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = s, this.ht = (_a = i.options) == null ? void 0 : _a.host, this.rt(this.ct = i.element)), A;
  }
  rt(t) {
    if (this.isConnected || (t = void 0), "function" == typeof this.G) {
      const i = this.ht ?? globalThis;
      let s = o.get(i);
      void 0 === s && (s = /* @__PURE__ */ new WeakMap(), o.set(i, s)), void 0 !== s.get(this.G) && this.G.call(this.ht, void 0), s.set(this.G, t), void 0 !== t && this.G.call(this.ht, t);
    } else this.G.value = t;
  }
  get lt() {
    var _a, _b;
    return "function" == typeof this.G ? (_a = o.get(this.ht ?? globalThis)) == null ? void 0 : _a.get(this.G) : (_b = this.G) == null ? void 0 : _b.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
export {
  e,
  n
};
//# sourceMappingURL=ref-C0XEJSC7.js.map
