import { bv as concat$1, bw as pad$1, bx as numberToHex, by as size$2, aG as hashTypedData, bz as encodeAbiParameters, bA as keccak256, bB as createNonceManager, bC as serializeErc6492Signature, bD as getAction, bE as getCode, bF as readContract, bG as parseAbi, bH as BaseError$1, bI as prettyPrint, bJ as formatGwei, bK as decodeErrorResult, bL as ContractFunctionZeroDataError, bM as ContractFunctionRevertedError, bN as ContractFunctionExecutionError, bO as hexToBigInt, bP as AccountNotFoundError, bQ as parseAccount, aE as encodeFunctionData, bR as estimateFeesPerGas, bS as prepareAuthorization, bT as getChainId, bU as serializeStateOverride, bV as formatLog, bW as formatTransactionReceipt, bX as stringify$1, bY as observe, bZ as poll, b_ as createClient, b$ as sha256$1, c0 as createCurve, c1 as Field, c2 as sha256$2, c3 as sha384, c4 as sha512 } from "./appkit-DOrUN3iw.js";
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e2) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, void 0)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e2) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e2);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set2, get2, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get2,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get2() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set2(...args);
      void setItem();
    },
    get2,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get2()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get2()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get2()) != null ? _a2 : configResult
      );
      set2(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get2();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e2) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e2);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore$1 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var n, l$1, u$1, i$1, o$1, r$1, f$1, e$1, c$1, s$1, h$1 = {}, v$1 = [], p$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, y$1 = Array.isArray;
function d$1(n2, l2) {
  for (var u2 in l2) n2[u2] = l2[u2];
  return n2;
}
function w$1(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l2, u2, t2) {
  var i2, o2, r2, f2 = {};
  for (r2 in u2) "key" == r2 ? i2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : f2[r2] = u2[r2];
  if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (r2 in l2.defaultProps) void 0 === f2[r2] && (f2[r2] = l2.defaultProps[r2]);
  return g(l2, f2, i2, o2, null);
}
function g(n2, t2, i2, o2, r2) {
  var f2 = { type: n2, props: t2, key: i2, ref: o2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r2 ? ++u$1 : r2, __i: -1, __u: 0 };
  return null == r2 && null != l$1.vnode && l$1.vnode(f2), f2;
}
function b(n2) {
  return n2.children;
}
function k$1(n2, l2) {
  this.props = n2, this.context = l2;
}
function x(n2, l2) {
  if (null == l2) return n2.__ ? x(n2.__, n2.__i + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? x(n2) : null;
}
function C$1(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
      n2.__e = n2.__c.base = u2.__e;
      break;
    }
    return C$1(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i$1.push(n2) && !P.__r++ || o$1 !== l$1.debounceRendering) && ((o$1 = l$1.debounceRendering) || r$1)(P);
}
function P() {
  var n2, u2, t2, o2, r2, e2, c2, s2;
  for (i$1.sort(f$1); n2 = i$1.shift(); ) n2.__d && (u2 = i$1.length, o2 = void 0, e2 = (r2 = (t2 = n2).__v).__e, c2 = [], s2 = [], t2.__P && ((o2 = d$1({}, r2)).__v = r2.__v + 1, l$1.vnode && l$1.vnode(o2), O(t2.__P, o2, r2, t2.__n, t2.__P.namespaceURI, 32 & r2.__u ? [e2] : null, c2, null == e2 ? x(r2) : e2, !!(32 & r2.__u), s2), o2.__v = r2.__v, o2.__.__k[o2.__i] = o2, j$1(c2, o2, s2), o2.__e != e2 && C$1(o2)), i$1.length > u2 && i$1.sort(f$1));
  P.__r = 0;
}
function S(n2, l2, u2, t2, i2, o2, r2, f2, e2, c2, s2) {
  var a2, p2, y2, d2, w2, _2 = t2 && t2.__k || v$1, g2 = l2.length;
  for (u2.__d = e2, $(u2, l2, _2), e2 = u2.__d, a2 = 0; a2 < g2; a2++) null != (y2 = u2.__k[a2]) && (p2 = -1 === y2.__i ? h$1 : _2[y2.__i] || h$1, y2.__i = a2, O(n2, y2, p2, i2, o2, r2, f2, e2, c2, s2), d2 = y2.__e, y2.ref && p2.ref != y2.ref && (p2.ref && N(p2.ref, null, y2), s2.push(y2.ref, y2.__c || d2, y2)), null == w2 && null != d2 && (w2 = d2), 65536 & y2.__u || p2.__k === y2.__k ? e2 = I(y2, e2, n2) : "function" == typeof y2.type && void 0 !== y2.__d ? e2 = y2.__d : d2 && (e2 = d2.nextSibling), y2.__d = void 0, y2.__u &= -196609);
  u2.__d = e2, u2.__e = w2;
}
function $(n2, l2, u2) {
  var t2, i2, o2, r2, f2, e2 = l2.length, c2 = u2.length, s2 = c2, a2 = 0;
  for (n2.__k = [], t2 = 0; t2 < e2; t2++) null != (i2 = l2[t2]) && "boolean" != typeof i2 && "function" != typeof i2 ? (r2 = t2 + a2, (i2 = n2.__k[t2] = "string" == typeof i2 || "number" == typeof i2 || "bigint" == typeof i2 || i2.constructor == String ? g(null, i2, null, null, null) : y$1(i2) ? g(b, { children: i2 }, null, null, null) : void 0 === i2.constructor && i2.__b > 0 ? g(i2.type, i2.props, i2.key, i2.ref ? i2.ref : null, i2.__v) : i2).__ = n2, i2.__b = n2.__b + 1, o2 = null, -1 !== (f2 = i2.__i = L(i2, u2, r2, s2)) && (s2--, (o2 = u2[f2]) && (o2.__u |= 131072)), null == o2 || null === o2.__v ? (-1 == f2 && a2--, "function" != typeof i2.type && (i2.__u |= 65536)) : f2 !== r2 && (f2 == r2 - 1 ? a2-- : f2 == r2 + 1 ? a2++ : (f2 > r2 ? a2-- : a2++, i2.__u |= 65536))) : i2 = n2.__k[t2] = null;
  if (s2) for (t2 = 0; t2 < c2; t2++) null != (o2 = u2[t2]) && 0 == (131072 & o2.__u) && (o2.__e == n2.__d && (n2.__d = x(o2)), V(o2, o2));
}
function I(n2, l2, u2) {
  var t2, i2;
  if ("function" == typeof n2.type) {
    for (t2 = n2.__k, i2 = 0; t2 && i2 < t2.length; i2++) t2[i2] && (t2[i2].__ = n2, l2 = I(t2[i2], l2, u2));
    return l2;
  }
  n2.__e != l2 && (l2 && n2.type && !u2.contains(l2) && (l2 = x(n2)), u2.insertBefore(n2.__e, l2 || null), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 === l2.nodeType);
  return l2;
}
function L(n2, l2, u2, t2) {
  var i2 = n2.key, o2 = n2.type, r2 = u2 - 1, f2 = u2 + 1, e2 = l2[u2];
  if (null === e2 || e2 && i2 == e2.key && o2 === e2.type && 0 == (131072 & e2.__u)) return u2;
  if (t2 > (null != e2 && 0 == (131072 & e2.__u) ? 1 : 0)) for (; r2 >= 0 || f2 < l2.length; ) {
    if (r2 >= 0) {
      if ((e2 = l2[r2]) && 0 == (131072 & e2.__u) && i2 == e2.key && o2 === e2.type) return r2;
      r2--;
    }
    if (f2 < l2.length) {
      if ((e2 = l2[f2]) && 0 == (131072 & e2.__u) && i2 == e2.key && o2 === e2.type) return f2;
      f2++;
    }
  }
  return -1;
}
function T$1(n2, l2, u2) {
  "-" === l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || p$1.test(l2) ? u2 : u2 + "px";
}
function A(n2, l2, u2, t2, i2) {
  var o2;
  n: if ("style" === l2) if ("string" == typeof u2) n2.style.cssText = u2;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || T$1(n2.style, l2, "");
    if (u2) for (l2 in u2) t2 && u2[l2] === t2[l2] || T$1(n2.style, l2, u2[l2]);
  }
  else if ("o" === l2[0] && "n" === l2[1]) o2 = l2 !== (l2 = l2.replace(/(PointerCapture)$|Capture$/i, "$1")), l2 = l2.toLowerCase() in n2 || "onFocusOut" === l2 || "onFocusIn" === l2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = e$1, n2.addEventListener(l2, o2 ? s$1 : c$1, o2)) : n2.removeEventListener(l2, o2 ? s$1 : c$1, o2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && "-" !== l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
  }
}
function F(n2) {
  return function(u2) {
    if (this.l) {
      var t2 = this.l[u2.type + n2];
      if (null == u2.t) u2.t = e$1++;
      else if (u2.t < t2.u) return;
      return t2(l$1.event ? l$1.event(u2) : u2);
    }
  };
}
function O(n2, u2, t2, i2, o2, r2, f2, e2, c2, s2) {
  var a2, h2, v2, p2, w2, _2, g2, m2, x2, C2, M2, P2, $2, I2, H, L2, T2 = u2.type;
  if (void 0 !== u2.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), r2 = [e2 = u2.__e = t2.__e]), (a2 = l$1.__b) && a2(u2);
  n: if ("function" == typeof T2) try {
    if (m2 = u2.props, x2 = "prototype" in T2 && T2.prototype.render, C2 = (a2 = T2.contextType) && i2[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i2, t2.__c ? g2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (x2 ? u2.__c = h2 = new T2(m2, M2) : (u2.__c = h2 = new k$1(m2, M2), h2.constructor = T2, h2.render = q), C2 && C2.sub(h2), h2.props = m2, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i2, v2 = h2.__d = true, h2.__h = [], h2._sb = []), x2 && null == h2.__s && (h2.__s = h2.state), x2 && null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d$1({}, h2.__s)), d$1(h2.__s, T2.getDerivedStateFromProps(m2, h2.__s))), p2 = h2.props, w2 = h2.state, h2.__v = u2, v2) x2 && null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), x2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
    else {
      if (x2 && null == T2.getDerivedStateFromProps && m2 !== p2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(m2, M2), !h2.__e && (null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(m2, h2.__s, M2) || u2.__v === t2.__v)) {
        for (u2.__v !== t2.__v && (h2.props = m2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
          n3 && (n3.__ = u2);
        }), P2 = 0; P2 < h2._sb.length; P2++) h2.__h.push(h2._sb[P2]);
        h2._sb = [], h2.__h.length && f2.push(h2);
        break n;
      }
      null != h2.componentWillUpdate && h2.componentWillUpdate(m2, h2.__s, M2), x2 && null != h2.componentDidUpdate && h2.__h.push(function() {
        h2.componentDidUpdate(p2, w2, _2);
      });
    }
    if (h2.context = M2, h2.props = m2, h2.__P = n2, h2.__e = false, $2 = l$1.__r, I2 = 0, x2) {
      for (h2.state = h2.__s, h2.__d = false, $2 && $2(u2), a2 = h2.render(h2.props, h2.state, h2.context), H = 0; H < h2._sb.length; H++) h2.__h.push(h2._sb[H]);
      h2._sb = [];
    } else do {
      h2.__d = false, $2 && $2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
    } while (h2.__d && ++I2 < 25);
    h2.state = h2.__s, null != h2.getChildContext && (i2 = d$1(d$1({}, i2), h2.getChildContext())), x2 && !v2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(p2, w2)), S(n2, y$1(L2 = null != a2 && a2.type === b && null == a2.key ? a2.props.children : a2) ? L2 : [L2], u2, t2, i2, o2, r2, f2, e2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && f2.push(h2), g2 && (h2.__E = h2.__ = null);
  } catch (n3) {
    if (u2.__v = null, c2 || null != r2) {
      for (u2.__u |= c2 ? 160 : 32; e2 && 8 === e2.nodeType && e2.nextSibling; ) e2 = e2.nextSibling;
      r2[r2.indexOf(e2)] = null, u2.__e = e2;
    } else u2.__e = t2.__e, u2.__k = t2.__k;
    l$1.__e(n3, u2, t2);
  }
  else null == r2 && u2.__v === t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : u2.__e = z$1(t2.__e, u2, t2, i2, o2, r2, f2, c2, s2);
  (a2 = l$1.diffed) && a2(u2);
}
function j$1(n2, u2, t2) {
  u2.__d = void 0;
  for (var i2 = 0; i2 < t2.length; i2++) N(t2[i2], t2[++i2], t2[++i2]);
  l$1.__c && l$1.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l$1.__e(n3, u3.__v);
    }
  });
}
function z$1(u2, t2, i2, o2, r2, f2, e2, c2, s2) {
  var a2, v2, p2, d2, _2, g2, m2, b2 = i2.props, k2 = t2.props, C2 = t2.type;
  if ("svg" === C2 ? r2 = "http://www.w3.org/2000/svg" : "math" === C2 ? r2 = "http://www.w3.org/1998/Math/MathML" : r2 || (r2 = "http://www.w3.org/1999/xhtml"), null != f2) {
    for (a2 = 0; a2 < f2.length; a2++) if ((_2 = f2[a2]) && "setAttribute" in _2 == !!C2 && (C2 ? _2.localName === C2 : 3 === _2.nodeType)) {
      u2 = _2, f2[a2] = null;
      break;
    }
  }
  if (null == u2) {
    if (null === C2) return document.createTextNode(k2);
    u2 = document.createElementNS(r2, C2, k2.is && k2), c2 && (l$1.__m && l$1.__m(t2, f2), c2 = false), f2 = null;
  }
  if (null === C2) b2 === k2 || c2 && u2.data === k2 || (u2.data = k2);
  else {
    if (f2 = f2 && n.call(u2.childNodes), b2 = i2.props || h$1, !c2 && null != f2) for (b2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) b2[(_2 = u2.attributes[a2]).name] = _2.value;
    for (a2 in b2) if (_2 = b2[a2], "children" == a2) ;
    else if ("dangerouslySetInnerHTML" == a2) p2 = _2;
    else if (!(a2 in k2)) {
      if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
      A(u2, a2, null, _2, r2);
    }
    for (a2 in k2) _2 = k2[a2], "children" == a2 ? d2 = _2 : "dangerouslySetInnerHTML" == a2 ? v2 = _2 : "value" == a2 ? g2 = _2 : "checked" == a2 ? m2 = _2 : c2 && "function" != typeof _2 || b2[a2] === _2 || A(u2, a2, _2, b2[a2], r2);
    if (v2) c2 || p2 && (v2.__html === p2.__html || v2.__html === u2.innerHTML) || (u2.innerHTML = v2.__html), t2.__k = [];
    else if (p2 && (u2.innerHTML = ""), S(u2, y$1(d2) ? d2 : [d2], t2, i2, o2, "foreignObject" === C2 ? "http://www.w3.org/1999/xhtml" : r2, f2, e2, f2 ? f2[0] : i2.__k && x(i2, 0), c2, s2), null != f2) for (a2 = f2.length; a2--; ) w$1(f2[a2]);
    c2 || (a2 = "value", "progress" === C2 && null == g2 ? u2.removeAttribute("value") : void 0 !== g2 && (g2 !== u2[a2] || "progress" === C2 && !g2 || "option" === C2 && g2 !== b2[a2]) && A(u2, a2, g2, b2[a2], r2), a2 = "checked", void 0 !== m2 && m2 !== u2[a2] && A(u2, a2, m2, b2[a2], r2));
  }
  return u2;
}
function N(n2, u2, t2) {
  try {
    if ("function" == typeof n2) {
      var i2 = "function" == typeof n2.__u;
      i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
    } else n2.current = u2;
  } catch (n3) {
    l$1.__e(n3, t2);
  }
}
function V(n2, u2, t2) {
  var i2, o2;
  if (l$1.unmount && l$1.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current !== n2.__e || N(i2, null, u2)), null != (i2 = n2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (n3) {
      l$1.__e(n3, u2);
    }
    i2.base = i2.__P = null;
  }
  if (i2 = n2.__k) for (o2 = 0; o2 < i2.length; o2++) i2[o2] && V(i2[o2], u2, t2 || "function" != typeof n2.type);
  t2 || w$1(n2.__e), n2.__c = n2.__ = n2.__e = n2.__d = void 0;
}
function q(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function B$1(u2, t2, i2) {
  var o2, r2, f2, e2;
  l$1.__ && l$1.__(u2, t2), r2 = (o2 = false) ? null : t2.__k, f2 = [], e2 = [], O(t2, u2 = t2.__k = _(b, null, [u2]), r2 || h$1, h$1, t2.namespaceURI, r2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, f2, r2 ? r2.__e : t2.firstChild, o2, e2), j$1(f2, u2, e2);
}
n = v$1.slice, l$1 = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u$1 = 0, k$1.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d$1({}, this.state), "function" == typeof n2 && (n2 = n2(d$1({}, u2), this.props)), n2 && d$1(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
}, k$1.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, k$1.prototype.render = b, i$1 = [], r$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f$1 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, P.__r = 0, e$1 = 0, c$1 = F(false), s$1 = F(true);
var t, r, u, i, o = 0, f = [], c = l$1, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
function d(n2, t2) {
  c.__h && c.__h(r, n2, o || t2), o = 0;
  var u2 = r.__H || (r.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
}
function h(n2) {
  return o = 1, p(D, n2);
}
function p(n2, u2, i2) {
  var o2 = d(t++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [D(void 0, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r, !r.u)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H) return true;
      var u3 = o2.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u3.every(function(n4) {
        return !n4.__N;
      })) return !c2 || c2.call(this, n3, t2, r2);
      var i3 = false;
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
        }
      }), !(!i3 && o2.__c.props === n3) && (!c2 || c2.call(this, n3, t2, r2));
    };
    r.u = true;
    var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
    r.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = void 0, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
}
function y(n2, u2) {
  var i2 = d(t++, 3);
  !c.__s && C(i2.__H, u2) && (i2.__ = n2, i2.i = u2, r.__H.__h.push(i2));
}
function T(n2, r2) {
  var u2 = d(t++, 7);
  return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
}
function j() {
  for (var n2; n2 = f.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z), n2.__H.__h.forEach(B), n2.__H.__h = [];
  } catch (t2) {
    n2.__H.__h = [], c.__e(t2, n2.__v);
  }
}
c.__b = function(n2) {
  r = null, e && e(n2);
}, c.__ = function(n2, t2) {
  n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s && s(n2, t2);
}, c.__r = function(n2) {
  a && a(n2), t = 0;
  var i2 = (r = n2.__c).__H;
  i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.i = n3.__N = void 0;
  })) : (i2.__h.forEach(z), i2.__h.forEach(B), i2.__h = [], t = 0)), u = r;
}, c.diffed = function(n2) {
  v && v(n2);
  var t2 = n2.__c;
  t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j)), t2.__H.__.forEach(function(n3) {
    n3.i && (n3.__H = n3.i), n3.i = void 0;
  })), u = r = null;
}, c.__c = function(n2, t2) {
  t2.some(function(n3) {
    try {
      n3.__h.forEach(z), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B(n4);
      });
    } catch (r2) {
      t2.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t2 = [], c.__e(r2, n3.__v);
    }
  }), l && l(n2, t2);
}, c.unmount = function(n2) {
  m && m(n2);
  var t2, r2 = n2.__c;
  r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
    try {
      z(n3);
    } catch (n4) {
      t2 = n4;
    }
  }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
};
var k = "function" == typeof requestAnimationFrame;
function w(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 100);
  k && (t2 = requestAnimationFrame(r2));
}
function z(n2) {
  var t2 = r, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r = t2;
}
function B(n2) {
  var t2 = r;
  n2.__c = n2.__(), r = t2;
}
function C(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n2[r2];
  });
}
function D(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
const entryPoint06Abi = [
  {
    inputs: [
      { name: "preOpGas", type: "uint256" },
      { name: "paid", type: "uint256" },
      { name: "validAfter", type: "uint48" },
      { name: "validUntil", type: "uint48" },
      { name: "targetSuccess", type: "bool" },
      { name: "targetResult", type: "bytes" }
    ],
    name: "ExecutionResult",
    type: "error"
  },
  {
    inputs: [
      { name: "opIndex", type: "uint256" },
      { name: "reason", type: "string" }
    ],
    name: "FailedOp",
    type: "error"
  },
  {
    inputs: [{ name: "sender", type: "address" }],
    name: "SenderAddressResult",
    type: "error"
  },
  {
    inputs: [{ name: "aggregator", type: "address" }],
    name: "SignatureValidationFailed",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          { name: "preOpGas", type: "uint256" },
          { name: "prefund", type: "uint256" },
          { name: "sigFailed", type: "bool" },
          { name: "validAfter", type: "uint48" },
          { name: "validUntil", type: "uint48" },
          { name: "paymasterContext", type: "bytes" }
        ],
        name: "returnInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" }
        ],
        name: "senderInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" }
        ],
        name: "factoryInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" }
        ],
        name: "paymasterInfo",
        type: "tuple"
      }
    ],
    name: "ValidationResult",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          { name: "preOpGas", type: "uint256" },
          { name: "prefund", type: "uint256" },
          { name: "sigFailed", type: "bool" },
          { name: "validAfter", type: "uint48" },
          { name: "validUntil", type: "uint48" },
          { name: "paymasterContext", type: "bytes" }
        ],
        name: "returnInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" }
        ],
        name: "senderInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" }
        ],
        name: "factoryInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" }
        ],
        name: "paymasterInfo",
        type: "tuple"
      },
      {
        components: [
          { name: "aggregator", type: "address" },
          {
            components: [
              { name: "stake", type: "uint256" },
              {
                name: "unstakeDelaySec",
                type: "uint256"
              }
            ],
            name: "stakeInfo",
            type: "tuple"
          }
        ],
        name: "aggregatorInfo",
        type: "tuple"
      }
    ],
    name: "ValidationResultWithAggregation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "userOpHash",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        name: "factory",
        type: "address"
      },
      {
        indexed: false,
        name: "paymaster",
        type: "address"
      }
    ],
    name: "AccountDeployed",
    type: "event"
  },
  { anonymous: false, inputs: [], name: "BeforeExecution", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "totalDeposit",
        type: "uint256"
      }
    ],
    name: "Deposited",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "aggregator",
        type: "address"
      }
    ],
    name: "SignatureAggregatorChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "totalStaked",
        type: "uint256"
      },
      {
        indexed: false,
        name: "unstakeDelaySec",
        type: "uint256"
      }
    ],
    name: "StakeLocked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "withdrawTime",
        type: "uint256"
      }
    ],
    name: "StakeUnlocked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "withdrawAddress",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      }
    ],
    name: "StakeWithdrawn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "userOpHash",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        name: "paymaster",
        type: "address"
      },
      {
        indexed: false,
        name: "nonce",
        type: "uint256"
      },
      { indexed: false, name: "success", type: "bool" },
      {
        indexed: false,
        name: "actualGasCost",
        type: "uint256"
      },
      {
        indexed: false,
        name: "actualGasUsed",
        type: "uint256"
      }
    ],
    name: "UserOperationEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "userOpHash",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        name: "revertReason",
        type: "bytes"
      }
    ],
    name: "UserOperationRevertReason",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        name: "withdrawAddress",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Withdrawn",
    type: "event"
  },
  {
    inputs: [],
    name: "SIG_VALIDATION_FAILED",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "initCode", type: "bytes" },
      { name: "sender", type: "address" },
      { name: "paymasterAndData", type: "bytes" }
    ],
    name: "_validateSenderAndPaymaster",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "unstakeDelaySec", type: "uint32" }],
    name: "addStake",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "depositTo",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ name: "", type: "address" }],
    name: "deposits",
    outputs: [
      { name: "deposit", type: "uint112" },
      { name: "staked", type: "bool" },
      { name: "stake", type: "uint112" },
      { name: "unstakeDelaySec", type: "uint32" },
      { name: "withdrawTime", type: "uint48" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "getDepositInfo",
    outputs: [
      {
        components: [
          { name: "deposit", type: "uint112" },
          { name: "staked", type: "bool" },
          { name: "stake", type: "uint112" },
          { name: "unstakeDelaySec", type: "uint32" },
          { name: "withdrawTime", type: "uint48" }
        ],
        name: "info",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "sender", type: "address" },
      { name: "key", type: "uint192" }
    ],
    name: "getNonce",
    outputs: [{ name: "nonce", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "initCode", type: "bytes" }],
    name: "getSenderAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          {
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            name: "preVerificationGas",
            type: "uint256"
          },
          { name: "maxFeePerGas", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" }
        ],
        name: "userOp",
        type: "tuple"
      }
    ],
    name: "getUserOpHash",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: "sender", type: "address" },
              { name: "nonce", type: "uint256" },
              { name: "initCode", type: "bytes" },
              { name: "callData", type: "bytes" },
              {
                name: "callGasLimit",
                type: "uint256"
              },
              {
                name: "verificationGasLimit",
                type: "uint256"
              },
              {
                name: "preVerificationGas",
                type: "uint256"
              },
              {
                name: "maxFeePerGas",
                type: "uint256"
              },
              {
                name: "maxPriorityFeePerGas",
                type: "uint256"
              },
              {
                name: "paymasterAndData",
                type: "bytes"
              },
              { name: "signature", type: "bytes" }
            ],
            name: "userOps",
            type: "tuple[]"
          },
          {
            name: "aggregator",
            type: "address"
          },
          { name: "signature", type: "bytes" }
        ],
        name: "opsPerAggregator",
        type: "tuple[]"
      },
      { name: "beneficiary", type: "address" }
    ],
    name: "handleAggregatedOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          {
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            name: "preVerificationGas",
            type: "uint256"
          },
          { name: "maxFeePerGas", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" }
        ],
        name: "ops",
        type: "tuple[]"
      },
      { name: "beneficiary", type: "address" }
    ],
    name: "handleOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "key", type: "uint192" }],
    name: "incrementNonce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "callData", type: "bytes" },
      {
        components: [
          {
            components: [
              { name: "sender", type: "address" },
              { name: "nonce", type: "uint256" },
              {
                name: "callGasLimit",
                type: "uint256"
              },
              {
                name: "verificationGasLimit",
                type: "uint256"
              },
              {
                name: "preVerificationGas",
                type: "uint256"
              },
              { name: "paymaster", type: "address" },
              {
                name: "maxFeePerGas",
                type: "uint256"
              },
              {
                name: "maxPriorityFeePerGas",
                type: "uint256"
              }
            ],
            name: "mUserOp",
            type: "tuple"
          },
          { name: "userOpHash", type: "bytes32" },
          { name: "prefund", type: "uint256" },
          { name: "contextOffset", type: "uint256" },
          { name: "preOpGas", type: "uint256" }
        ],
        name: "opInfo",
        type: "tuple"
      },
      { name: "context", type: "bytes" }
    ],
    name: "innerHandleOp",
    outputs: [{ name: "actualGasCost", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint192" }
    ],
    name: "nonceSequenceNumber",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          {
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            name: "preVerificationGas",
            type: "uint256"
          },
          { name: "maxFeePerGas", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" }
        ],
        name: "op",
        type: "tuple"
      },
      { name: "target", type: "address" },
      { name: "targetCallData", type: "bytes" }
    ],
    name: "simulateHandleOp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          {
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            name: "preVerificationGas",
            type: "uint256"
          },
          { name: "maxFeePerGas", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" }
        ],
        name: "userOp",
        type: "tuple"
      }
    ],
    name: "simulateValidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unlockStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "withdrawAddress",
        type: "address"
      }
    ],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "withdrawAddress",
        type: "address"
      },
      { name: "withdrawAmount", type: "uint256" }
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];
const entryPoint06Address = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
function getInitCode(userOperation, options = {}) {
  const { forHash } = options;
  const { authorization, factory, factoryData } = userOperation;
  if (forHash && (factory === "0x7702" || factory === "0x7702000000000000000000000000000000000000")) {
    if (!authorization)
      return "0x7702000000000000000000000000000000000000";
    return concat$1([authorization.address, factoryData ?? "0x"]);
  }
  if (!factory)
    return "0x";
  return concat$1([factory, factoryData ?? "0x"]);
}
const paymasterSignatureMagic = "0x22e325a297439656";
function toPackedUserOperation(userOperation, options = {}) {
  const { callGasLimit, callData, maxPriorityFeePerGas, maxFeePerGas, paymaster, paymasterData, paymasterPostOpGasLimit, paymasterSignature, paymasterVerificationGasLimit, sender, signature = "0x", verificationGasLimit } = userOperation;
  const accountGasLimits = concat$1([
    pad$1(numberToHex(verificationGasLimit || 0n), { size: 16 }),
    pad$1(numberToHex(callGasLimit || 0n), { size: 16 })
  ]);
  const initCode = getInitCode(userOperation, options);
  const gasFees = concat$1([
    pad$1(numberToHex(maxPriorityFeePerGas || 0n), { size: 16 }),
    pad$1(numberToHex(maxFeePerGas || 0n), { size: 16 })
  ]);
  const nonce = userOperation.nonce ?? 0n;
  const paymasterAndData = paymaster ? concat$1([
    paymaster,
    pad$1(numberToHex(paymasterVerificationGasLimit || 0n), {
      size: 16
    }),
    pad$1(numberToHex(paymasterPostOpGasLimit || 0n), {
      size: 16
    }),
    paymasterData || "0x",
    ...paymasterSignature ? options.forHash ? [paymasterSignatureMagic] : [
      paymasterSignature,
      pad$1(numberToHex(size$2(paymasterSignature)), { size: 2 }),
      paymasterSignatureMagic
    ] : []
  ]) : "0x";
  const preVerificationGas = userOperation.preVerificationGas ?? 0n;
  return {
    accountGasLimits,
    callData,
    initCode,
    gasFees,
    nonce,
    paymasterAndData,
    preVerificationGas,
    sender,
    signature
  };
}
const types = {
  PackedUserOperation: [
    { type: "address", name: "sender" },
    { type: "uint256", name: "nonce" },
    { type: "bytes", name: "initCode" },
    { type: "bytes", name: "callData" },
    { type: "bytes32", name: "accountGasLimits" },
    { type: "uint256", name: "preVerificationGas" },
    { type: "bytes32", name: "gasFees" },
    { type: "bytes", name: "paymasterAndData" }
  ]
};
function getUserOperationTypedData(parameters) {
  const { chainId, entryPointAddress, userOperation } = parameters;
  const packedUserOp = toPackedUserOperation(userOperation, { forHash: true });
  return {
    types,
    primaryType: "PackedUserOperation",
    domain: {
      name: "ERC4337",
      version: "1",
      chainId,
      verifyingContract: entryPointAddress
    },
    message: packedUserOp
  };
}
function getUserOperationHash(parameters) {
  const { chainId, entryPointAddress, entryPointVersion } = parameters;
  const userOperation = parameters.userOperation;
  const { authorization, callData = "0x", callGasLimit, maxFeePerGas, maxPriorityFeePerGas, nonce, paymasterAndData = "0x", preVerificationGas, sender, verificationGasLimit } = userOperation;
  if (entryPointVersion === "0.8" || entryPointVersion === "0.9")
    return hashTypedData(getUserOperationTypedData({
      chainId,
      entryPointAddress,
      userOperation
    }));
  const packedUserOp = (() => {
    var _a, _b;
    if (entryPointVersion === "0.6") {
      const factory = (_a = userOperation.initCode) == null ? void 0 : _a.slice(0, 42);
      const factoryData = (_b = userOperation.initCode) == null ? void 0 : _b.slice(42);
      const initCode = getInitCode({
        authorization,
        factory,
        factoryData
      }, { forHash: true });
      return encodeAbiParameters([
        { type: "address" },
        { type: "uint256" },
        { type: "bytes32" },
        { type: "bytes32" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "bytes32" }
      ], [
        sender,
        nonce,
        keccak256(initCode),
        keccak256(callData),
        callGasLimit,
        verificationGasLimit,
        preVerificationGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        keccak256(paymasterAndData)
      ]);
    }
    if (entryPointVersion === "0.7") {
      const packedUserOp2 = toPackedUserOperation(userOperation, {
        forHash: true
      });
      return encodeAbiParameters([
        { type: "address" },
        { type: "uint256" },
        { type: "bytes32" },
        { type: "bytes32" },
        { type: "bytes32" },
        { type: "uint256" },
        { type: "bytes32" },
        { type: "bytes32" }
      ], [
        packedUserOp2.sender,
        packedUserOp2.nonce,
        keccak256(packedUserOp2.initCode),
        keccak256(packedUserOp2.callData),
        packedUserOp2.accountGasLimits,
        packedUserOp2.preVerificationGas,
        packedUserOp2.gasFees,
        keccak256(packedUserOp2.paymasterAndData)
      ]);
    }
    throw new Error(`entryPointVersion "${entryPointVersion}" not supported.`);
  })();
  return keccak256(encodeAbiParameters([{ type: "bytes32" }, { type: "address" }, { type: "uint256" }], [keccak256(packedUserOp), entryPointAddress, BigInt(chainId)]));
}
async function toSmartAccount(implementation) {
  const { extend, nonceKeyManager = createNonceManager({
    source: {
      get() {
        return Date.now();
      },
      set() {
      }
    }
  }), ...rest } = implementation;
  let deployed = false;
  const address = await implementation.getAddress();
  return {
    ...extend,
    ...rest,
    address,
    async getFactoryArgs() {
      if ("isDeployed" in this && await this.isDeployed())
        return { factory: void 0, factoryData: void 0 };
      return implementation.getFactoryArgs();
    },
    async getNonce(parameters) {
      const key = (parameters == null ? void 0 : parameters.key) ?? BigInt(await nonceKeyManager.consume({
        address,
        chainId: implementation.client.chain.id,
        client: implementation.client
      }));
      if (implementation.getNonce)
        return await implementation.getNonce({ ...parameters, key });
      const nonce = await readContract(implementation.client, {
        abi: parseAbi([
          "function getNonce(address, uint192) pure returns (uint256)"
        ]),
        address: implementation.entryPoint.address,
        functionName: "getNonce",
        args: [address, key]
      });
      return nonce;
    },
    async isDeployed() {
      if (deployed)
        return true;
      const code = await getAction(implementation.client, getCode, "getCode")({
        address
      });
      deployed = Boolean(code);
      return deployed;
    },
    ...implementation.sign ? {
      async sign(parameters) {
        const [{ factory, factoryData }, signature] = await Promise.all([
          this.getFactoryArgs(),
          implementation.sign(parameters)
        ]);
        if (factory && factoryData)
          return serializeErc6492Signature({
            address: factory,
            data: factoryData,
            signature
          });
        return signature;
      }
    } : {},
    async signMessage(parameters) {
      const [{ factory, factoryData }, signature] = await Promise.all([
        this.getFactoryArgs(),
        implementation.signMessage(parameters)
      ]);
      if (factory && factoryData && factory !== "0x7702")
        return serializeErc6492Signature({
          address: factory,
          data: factoryData,
          signature
        });
      return signature;
    },
    async signTypedData(parameters) {
      const [{ factory, factoryData }, signature] = await Promise.all([
        this.getFactoryArgs(),
        implementation.signTypedData(parameters)
      ]);
      if (factory && factoryData && factory !== "0x7702")
        return serializeErc6492Signature({
          address: factory,
          data: factoryData,
          signature
        });
      return signature;
    },
    type: "smart"
  };
}
class AccountNotDeployedError extends BaseError$1 {
  constructor({ cause }) {
    super("Smart Account is not deployed.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- No `factory`/`factoryData` or `initCode` properties are provided for Smart Account deployment.",
        "- An incorrect `sender` address is provided."
      ],
      name: "AccountNotDeployedError"
    });
  }
}
Object.defineProperty(AccountNotDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa20/
});
class ExecutionRevertedError extends BaseError$1 {
  constructor({ cause, data, message } = {}) {
    var _a;
    const reason = (_a = message == null ? void 0 : message.replace("execution reverted: ", "")) == null ? void 0 : _a.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause,
      name: "ExecutionRevertedError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.data = data;
  }
}
Object.defineProperty(ExecutionRevertedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32521
});
Object.defineProperty(ExecutionRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /execution reverted/
});
class FailedToSendToBeneficiaryError extends BaseError$1 {
  constructor({ cause }) {
    super("Failed to send funds to beneficiary.", {
      cause,
      name: "FailedToSendToBeneficiaryError"
    });
  }
}
Object.defineProperty(FailedToSendToBeneficiaryError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa91/
});
class GasValuesOverflowError extends BaseError$1 {
  constructor({ cause }) {
    super("Gas value overflowed.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- one of the gas values exceeded 2**120 (uint120)"
      ].filter(Boolean),
      name: "GasValuesOverflowError"
    });
  }
}
Object.defineProperty(GasValuesOverflowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa94/
});
class HandleOpsOutOfGasError extends BaseError$1 {
  constructor({ cause }) {
    super("The `handleOps` function was called by the Bundler with a gas limit too low.", {
      cause,
      name: "HandleOpsOutOfGasError"
    });
  }
}
Object.defineProperty(HandleOpsOutOfGasError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa95/
});
class InitCodeFailedError extends BaseError$1 {
  constructor({ cause, factory, factoryData, initCode }) {
    super("Failed to simulate deployment for Smart Account.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- Invalid `factory`/`factoryData` or `initCode` properties are present",
        "- Smart Account deployment execution ran out of gas (low `verificationGasLimit` value)",
        "- Smart Account deployment execution reverted with an error\n",
        factory && `factory: ${factory}`,
        factoryData && `factoryData: ${factoryData}`,
        initCode && `initCode: ${initCode}`
      ].filter(Boolean),
      name: "InitCodeFailedError"
    });
  }
}
Object.defineProperty(InitCodeFailedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa13/
});
class InitCodeMustCreateSenderError extends BaseError$1 {
  constructor({ cause, factory, factoryData, initCode }) {
    super("Smart Account initialization implementation did not create an account.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- `factory`/`factoryData` or `initCode` properties are invalid",
        "- Smart Account initialization implementation is incorrect\n",
        factory && `factory: ${factory}`,
        factoryData && `factoryData: ${factoryData}`,
        initCode && `initCode: ${initCode}`
      ].filter(Boolean),
      name: "InitCodeMustCreateSenderError"
    });
  }
}
Object.defineProperty(InitCodeMustCreateSenderError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa15/
});
class InitCodeMustReturnSenderError extends BaseError$1 {
  constructor({ cause, factory, factoryData, initCode, sender }) {
    super("Smart Account initialization implementation does not return the expected sender.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "Smart Account initialization implementation does not return a sender address\n",
        factory && `factory: ${factory}`,
        factoryData && `factoryData: ${factoryData}`,
        initCode && `initCode: ${initCode}`,
        sender && `sender: ${sender}`
      ].filter(Boolean),
      name: "InitCodeMustReturnSenderError"
    });
  }
}
Object.defineProperty(InitCodeMustReturnSenderError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa14/
});
class InsufficientPrefundError extends BaseError$1 {
  constructor({ cause }) {
    super("Smart Account does not have sufficient funds to execute the User Operation.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the Smart Account does not have sufficient funds to cover the required prefund, or",
        "- a Paymaster was not provided"
      ].filter(Boolean),
      name: "InsufficientPrefundError"
    });
  }
}
Object.defineProperty(InsufficientPrefundError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa21/
});
class InternalCallOnlyError extends BaseError$1 {
  constructor({ cause }) {
    super("Bundler attempted to call an invalid function on the EntryPoint.", {
      cause,
      name: "InternalCallOnlyError"
    });
  }
}
Object.defineProperty(InternalCallOnlyError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa92/
});
class InvalidAggregatorError extends BaseError$1 {
  constructor({ cause }) {
    super("Bundler used an invalid aggregator for handling aggregated User Operations.", {
      cause,
      name: "InvalidAggregatorError"
    });
  }
}
Object.defineProperty(InvalidAggregatorError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa96/
});
class InvalidAccountNonceError extends BaseError$1 {
  constructor({ cause, nonce }) {
    super("Invalid Smart Account nonce used for User Operation.", {
      cause,
      metaMessages: [nonce && `nonce: ${nonce}`].filter(Boolean),
      name: "InvalidAccountNonceError"
    });
  }
}
Object.defineProperty(InvalidAccountNonceError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa25/
});
class InvalidBeneficiaryError extends BaseError$1 {
  constructor({ cause }) {
    super("Bundler has not set a beneficiary address.", {
      cause,
      name: "InvalidBeneficiaryError"
    });
  }
}
Object.defineProperty(InvalidBeneficiaryError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa90/
});
class InvalidFieldsError extends BaseError$1 {
  constructor({ cause }) {
    super("Invalid fields set on User Operation.", {
      cause,
      name: "InvalidFieldsError"
    });
  }
}
Object.defineProperty(InvalidFieldsError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32602
});
class InvalidPaymasterAndDataError extends BaseError$1 {
  constructor({ cause, paymasterAndData }) {
    super("Paymaster properties provided are invalid.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the `paymasterAndData` property is of an incorrect length\n",
        paymasterAndData && `paymasterAndData: ${paymasterAndData}`
      ].filter(Boolean),
      name: "InvalidPaymasterAndDataError"
    });
  }
}
Object.defineProperty(InvalidPaymasterAndDataError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa93/
});
class PaymasterDepositTooLowError extends BaseError$1 {
  constructor({ cause }) {
    super("Paymaster deposit for the User Operation is too low.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the Paymaster has deposited less than the expected amount via the `deposit` function"
      ].filter(Boolean),
      name: "PaymasterDepositTooLowError"
    });
  }
}
Object.defineProperty(PaymasterDepositTooLowError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32508
});
Object.defineProperty(PaymasterDepositTooLowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa31/
});
class PaymasterFunctionRevertedError extends BaseError$1 {
  constructor({ cause }) {
    super("The `validatePaymasterUserOp` function on the Paymaster reverted.", {
      cause,
      name: "PaymasterFunctionRevertedError"
    });
  }
}
Object.defineProperty(PaymasterFunctionRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa33/
});
class PaymasterNotDeployedError extends BaseError$1 {
  constructor({ cause }) {
    super("The Paymaster contract has not been deployed.", {
      cause,
      name: "PaymasterNotDeployedError"
    });
  }
}
Object.defineProperty(PaymasterNotDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa30/
});
class PaymasterRateLimitError extends BaseError$1 {
  constructor({ cause }) {
    super("UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.", {
      cause,
      name: "PaymasterRateLimitError"
    });
  }
}
Object.defineProperty(PaymasterRateLimitError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32504
});
class PaymasterStakeTooLowError extends BaseError$1 {
  constructor({ cause }) {
    super("UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.", {
      cause,
      name: "PaymasterStakeTooLowError"
    });
  }
}
Object.defineProperty(PaymasterStakeTooLowError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32505
});
class PaymasterPostOpFunctionRevertedError extends BaseError$1 {
  constructor({ cause }) {
    super("Paymaster `postOp` function reverted.", {
      cause,
      name: "PaymasterPostOpFunctionRevertedError"
    });
  }
}
Object.defineProperty(PaymasterPostOpFunctionRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa50/
});
class SenderAlreadyConstructedError extends BaseError$1 {
  constructor({ cause, factory, factoryData, initCode }) {
    super("Smart Account has already been deployed.", {
      cause,
      metaMessages: [
        "Remove the following properties and try again:",
        factory && "`factory`",
        factoryData && "`factoryData`",
        initCode && "`initCode`"
      ].filter(Boolean),
      name: "SenderAlreadyConstructedError"
    });
  }
}
Object.defineProperty(SenderAlreadyConstructedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa10/
});
class SignatureCheckFailedError extends BaseError$1 {
  constructor({ cause }) {
    super("UserOperation rejected because account signature check failed (or paymaster signature, if the paymaster uses its data as signature).", {
      cause,
      name: "SignatureCheckFailedError"
    });
  }
}
Object.defineProperty(SignatureCheckFailedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32507
});
class SmartAccountFunctionRevertedError extends BaseError$1 {
  constructor({ cause }) {
    super("The `validateUserOp` function on the Smart Account reverted.", {
      cause,
      name: "SmartAccountFunctionRevertedError"
    });
  }
}
Object.defineProperty(SmartAccountFunctionRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa23/
});
class UnsupportedSignatureAggregatorError extends BaseError$1 {
  constructor({ cause }) {
    super("UserOperation rejected because account specified unsupported signature aggregator.", {
      cause,
      name: "UnsupportedSignatureAggregatorError"
    });
  }
}
Object.defineProperty(UnsupportedSignatureAggregatorError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32506
});
class UserOperationExpiredError extends BaseError$1 {
  constructor({ cause }) {
    super("User Operation expired.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the `validAfter` or `validUntil` values returned from `validateUserOp` on the Smart Account are not satisfied"
      ].filter(Boolean),
      name: "UserOperationExpiredError"
    });
  }
}
Object.defineProperty(UserOperationExpiredError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa22/
});
class UserOperationPaymasterExpiredError extends BaseError$1 {
  constructor({ cause }) {
    super("Paymaster for User Operation expired.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the `validAfter` or `validUntil` values returned from `validatePaymasterUserOp` on the Paymaster are not satisfied"
      ].filter(Boolean),
      name: "UserOperationPaymasterExpiredError"
    });
  }
}
Object.defineProperty(UserOperationPaymasterExpiredError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa32/
});
class UserOperationSignatureError extends BaseError$1 {
  constructor({ cause }) {
    super("Signature provided for the User Operation is invalid.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Smart Account"
      ].filter(Boolean),
      name: "UserOperationSignatureError"
    });
  }
}
Object.defineProperty(UserOperationSignatureError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa24/
});
class UserOperationPaymasterSignatureError extends BaseError$1 {
  constructor({ cause }) {
    super("Signature provided for the User Operation is invalid.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Paymaster"
      ].filter(Boolean),
      name: "UserOperationPaymasterSignatureError"
    });
  }
}
Object.defineProperty(UserOperationPaymasterSignatureError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa34/
});
class UserOperationRejectedByEntryPointError extends BaseError$1 {
  constructor({ cause }) {
    super("User Operation rejected by EntryPoint's `simulateValidation` during account creation or validation.", {
      cause,
      name: "UserOperationRejectedByEntryPointError"
    });
  }
}
Object.defineProperty(UserOperationRejectedByEntryPointError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32500
});
class UserOperationRejectedByPaymasterError extends BaseError$1 {
  constructor({ cause }) {
    super("User Operation rejected by Paymaster's `validatePaymasterUserOp`.", {
      cause,
      name: "UserOperationRejectedByPaymasterError"
    });
  }
}
Object.defineProperty(UserOperationRejectedByPaymasterError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32501
});
class UserOperationRejectedByOpCodeError extends BaseError$1 {
  constructor({ cause }) {
    super("User Operation rejected with op code validation error.", {
      cause,
      name: "UserOperationRejectedByOpCodeError"
    });
  }
}
Object.defineProperty(UserOperationRejectedByOpCodeError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32502
});
class UserOperationOutOfTimeRangeError extends BaseError$1 {
  constructor({ cause }) {
    super("UserOperation out of time-range: either wallet or paymaster returned a time-range, and it is already expired (or will expire soon).", {
      cause,
      name: "UserOperationOutOfTimeRangeError"
    });
  }
}
Object.defineProperty(UserOperationOutOfTimeRangeError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: -32503
});
class UnknownBundlerError extends BaseError$1 {
  constructor({ cause }) {
    super(`An error occurred while executing user operation: ${cause == null ? void 0 : cause.shortMessage}`, {
      cause,
      name: "UnknownBundlerError"
    });
  }
}
class VerificationGasLimitExceededError extends BaseError$1 {
  constructor({ cause }) {
    super("User Operation verification gas limit exceeded.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the gas used for verification exceeded the `verificationGasLimit`"
      ].filter(Boolean),
      name: "VerificationGasLimitExceededError"
    });
  }
}
Object.defineProperty(VerificationGasLimitExceededError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa40/
});
class VerificationGasLimitTooLowError extends BaseError$1 {
  constructor({ cause }) {
    super("User Operation verification gas limit is too low.", {
      cause,
      metaMessages: [
        "This could arise when:",
        "- the `verificationGasLimit` is too low to verify the User Operation"
      ].filter(Boolean),
      name: "VerificationGasLimitTooLowError"
    });
  }
}
Object.defineProperty(VerificationGasLimitTooLowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa41/
});
class UserOperationExecutionError extends BaseError$1 {
  constructor(cause, { callData, callGasLimit, docsPath, factory, factoryData, initCode, maxFeePerGas, maxPriorityFeePerGas, nonce, paymaster, paymasterAndData, paymasterData, paymasterPostOpGasLimit, paymasterVerificationGasLimit, preVerificationGas, sender, signature, verificationGasLimit }) {
    const prettyArgs = prettyPrint({
      callData,
      callGasLimit,
      factory,
      factoryData,
      initCode,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce,
      paymaster,
      paymasterAndData,
      paymasterData,
      paymasterPostOpGasLimit,
      paymasterVerificationGasLimit,
      preVerificationGas,
      sender,
      signature,
      verificationGasLimit
    });
    super(cause.shortMessage, {
      cause,
      docsPath,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Request Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "UserOperationExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
}
class UserOperationReceiptNotFoundError extends BaseError$1 {
  constructor({ hash }) {
    super(`User Operation receipt with hash "${hash}" could not be found. The User Operation may not have been processed yet.`, { name: "UserOperationReceiptNotFoundError" });
  }
}
class UserOperationNotFoundError extends BaseError$1 {
  constructor({ hash }) {
    super(`User Operation with hash "${hash}" could not be found.`, {
      name: "UserOperationNotFoundError"
    });
  }
}
class WaitForUserOperationReceiptTimeoutError extends BaseError$1 {
  constructor({ hash }) {
    super(`Timed out while waiting for User Operation with hash "${hash}" to be confirmed.`, { name: "WaitForUserOperationReceiptTimeoutError" });
  }
}
const bundlerErrors = [
  ExecutionRevertedError,
  InvalidFieldsError,
  PaymasterDepositTooLowError,
  PaymasterRateLimitError,
  PaymasterStakeTooLowError,
  SignatureCheckFailedError,
  UnsupportedSignatureAggregatorError,
  UserOperationOutOfTimeRangeError,
  UserOperationRejectedByEntryPointError,
  UserOperationRejectedByPaymasterError,
  UserOperationRejectedByOpCodeError
];
function getBundlerError(err, args) {
  const message = (err.details || "").toLowerCase();
  if (AccountNotDeployedError.message.test(message))
    return new AccountNotDeployedError({
      cause: err
    });
  if (FailedToSendToBeneficiaryError.message.test(message))
    return new FailedToSendToBeneficiaryError({
      cause: err
    });
  if (GasValuesOverflowError.message.test(message))
    return new GasValuesOverflowError({
      cause: err
    });
  if (HandleOpsOutOfGasError.message.test(message))
    return new HandleOpsOutOfGasError({
      cause: err
    });
  if (InitCodeFailedError.message.test(message))
    return new InitCodeFailedError({
      cause: err,
      factory: args.factory,
      factoryData: args.factoryData,
      initCode: args.initCode
    });
  if (InitCodeMustCreateSenderError.message.test(message))
    return new InitCodeMustCreateSenderError({
      cause: err,
      factory: args.factory,
      factoryData: args.factoryData,
      initCode: args.initCode
    });
  if (InitCodeMustReturnSenderError.message.test(message))
    return new InitCodeMustReturnSenderError({
      cause: err,
      factory: args.factory,
      factoryData: args.factoryData,
      initCode: args.initCode,
      sender: args.sender
    });
  if (InsufficientPrefundError.message.test(message))
    return new InsufficientPrefundError({
      cause: err
    });
  if (InternalCallOnlyError.message.test(message))
    return new InternalCallOnlyError({
      cause: err
    });
  if (InvalidAccountNonceError.message.test(message))
    return new InvalidAccountNonceError({
      cause: err,
      nonce: args.nonce
    });
  if (InvalidAggregatorError.message.test(message))
    return new InvalidAggregatorError({
      cause: err
    });
  if (InvalidBeneficiaryError.message.test(message))
    return new InvalidBeneficiaryError({
      cause: err
    });
  if (InvalidPaymasterAndDataError.message.test(message))
    return new InvalidPaymasterAndDataError({
      cause: err
    });
  if (PaymasterDepositTooLowError.message.test(message))
    return new PaymasterDepositTooLowError({
      cause: err
    });
  if (PaymasterFunctionRevertedError.message.test(message))
    return new PaymasterFunctionRevertedError({
      cause: err
    });
  if (PaymasterNotDeployedError.message.test(message))
    return new PaymasterNotDeployedError({
      cause: err
    });
  if (PaymasterPostOpFunctionRevertedError.message.test(message))
    return new PaymasterPostOpFunctionRevertedError({
      cause: err
    });
  if (SmartAccountFunctionRevertedError.message.test(message))
    return new SmartAccountFunctionRevertedError({
      cause: err
    });
  if (SenderAlreadyConstructedError.message.test(message))
    return new SenderAlreadyConstructedError({
      cause: err,
      factory: args.factory,
      factoryData: args.factoryData,
      initCode: args.initCode
    });
  if (UserOperationExpiredError.message.test(message))
    return new UserOperationExpiredError({
      cause: err
    });
  if (UserOperationPaymasterExpiredError.message.test(message))
    return new UserOperationPaymasterExpiredError({
      cause: err
    });
  if (UserOperationPaymasterSignatureError.message.test(message))
    return new UserOperationPaymasterSignatureError({
      cause: err
    });
  if (UserOperationSignatureError.message.test(message))
    return new UserOperationSignatureError({
      cause: err
    });
  if (VerificationGasLimitExceededError.message.test(message))
    return new VerificationGasLimitExceededError({
      cause: err
    });
  if (VerificationGasLimitTooLowError.message.test(message))
    return new VerificationGasLimitTooLowError({
      cause: err
    });
  const error = err.walk((e2) => bundlerErrors.some((error2) => error2.code === e2.code));
  if (error) {
    if (error.code === ExecutionRevertedError.code)
      return new ExecutionRevertedError({
        cause: err,
        data: error.data,
        message: error.details
      });
    if (error.code === InvalidFieldsError.code)
      return new InvalidFieldsError({
        cause: err
      });
    if (error.code === PaymasterDepositTooLowError.code)
      return new PaymasterDepositTooLowError({
        cause: err
      });
    if (error.code === PaymasterRateLimitError.code)
      return new PaymasterRateLimitError({
        cause: err
      });
    if (error.code === PaymasterStakeTooLowError.code)
      return new PaymasterStakeTooLowError({
        cause: err
      });
    if (error.code === SignatureCheckFailedError.code)
      return new SignatureCheckFailedError({
        cause: err
      });
    if (error.code === UnsupportedSignatureAggregatorError.code)
      return new UnsupportedSignatureAggregatorError({
        cause: err
      });
    if (error.code === UserOperationOutOfTimeRangeError.code)
      return new UserOperationOutOfTimeRangeError({
        cause: err
      });
    if (error.code === UserOperationRejectedByEntryPointError.code)
      return new UserOperationRejectedByEntryPointError({
        cause: err
      });
    if (error.code === UserOperationRejectedByPaymasterError.code)
      return new UserOperationRejectedByPaymasterError({
        cause: err
      });
    if (error.code === UserOperationRejectedByOpCodeError.code)
      return new UserOperationRejectedByOpCodeError({
        cause: err
      });
  }
  return new UnknownBundlerError({
    cause: err
  });
}
function getUserOperationError(err, { calls, docsPath, ...args }) {
  const cause = (() => {
    const cause2 = getBundlerError(err, args);
    if (calls && cause2 instanceof ExecutionRevertedError) {
      const revertData = getRevertData(cause2);
      const contractCalls = calls == null ? void 0 : calls.filter((call) => call.abi);
      if (revertData && contractCalls.length > 0)
        return getContractError({ calls: contractCalls, revertData });
    }
    return cause2;
  })();
  return new UserOperationExecutionError(cause, {
    docsPath,
    ...args
  });
}
function getRevertData(error) {
  let revertData;
  error.walk((e2) => {
    var _a, _b, _c, _d;
    const error2 = e2;
    if (typeof error2.data === "string" || typeof ((_a = error2.data) == null ? void 0 : _a.revertData) === "string" || !(error2 instanceof BaseError$1) && typeof error2.message === "string") {
      const match = (_d = (_c = ((_b = error2.data) == null ? void 0 : _b.revertData) || error2.data || error2.message).match) == null ? void 0 : _d.call(_c, /(0x[A-Za-z0-9]*)/);
      if (match) {
        revertData = match[1];
        return true;
      }
    }
    return false;
  });
  return revertData;
}
function getContractError(parameters) {
  const { calls, revertData } = parameters;
  const { abi, functionName, args, to } = (() => {
    const contractCalls = calls == null ? void 0 : calls.filter((call) => Boolean(call.abi));
    if (contractCalls.length === 1)
      return contractCalls[0];
    const compatContractCalls = contractCalls.filter((call) => {
      try {
        return Boolean(decodeErrorResult({
          abi: call.abi,
          data: revertData
        }));
      } catch {
        return false;
      }
    });
    if (compatContractCalls.length === 1)
      return compatContractCalls[0];
    return {
      abi: [],
      functionName: contractCalls.reduce((acc, call) => `${acc ? `${acc} | ` : ""}${call.functionName}`, ""),
      args: void 0,
      to: void 0
    };
  })();
  const cause = (() => {
    if (revertData === "0x")
      return new ContractFunctionZeroDataError({ functionName });
    return new ContractFunctionRevertedError({
      abi,
      data: revertData,
      functionName
    });
  })();
  return new ContractFunctionExecutionError(cause, {
    abi,
    args,
    contractAddress: to,
    functionName
  });
}
function formatUserOperationGas(parameters) {
  const gas = {};
  if (parameters.callGasLimit)
    gas.callGasLimit = BigInt(parameters.callGasLimit);
  if (parameters.preVerificationGas)
    gas.preVerificationGas = BigInt(parameters.preVerificationGas);
  if (parameters.verificationGasLimit)
    gas.verificationGasLimit = BigInt(parameters.verificationGasLimit);
  if (parameters.paymasterPostOpGasLimit)
    gas.paymasterPostOpGasLimit = BigInt(parameters.paymasterPostOpGasLimit);
  if (parameters.paymasterVerificationGasLimit)
    gas.paymasterVerificationGasLimit = BigInt(parameters.paymasterVerificationGasLimit);
  return gas;
}
function formatUserOperationRequest(request) {
  const rpcRequest = {};
  if (typeof request.callData !== "undefined")
    rpcRequest.callData = request.callData;
  if (typeof request.callGasLimit !== "undefined")
    rpcRequest.callGasLimit = numberToHex(request.callGasLimit);
  if (typeof request.factory !== "undefined")
    rpcRequest.factory = request.factory;
  if (typeof request.factoryData !== "undefined")
    rpcRequest.factoryData = request.factoryData;
  if (typeof request.initCode !== "undefined")
    rpcRequest.initCode = request.initCode;
  if (typeof request.maxFeePerGas !== "undefined")
    rpcRequest.maxFeePerGas = numberToHex(request.maxFeePerGas);
  if (typeof request.maxPriorityFeePerGas !== "undefined")
    rpcRequest.maxPriorityFeePerGas = numberToHex(request.maxPriorityFeePerGas);
  if (typeof request.nonce !== "undefined")
    rpcRequest.nonce = numberToHex(request.nonce);
  if (typeof request.paymaster !== "undefined")
    rpcRequest.paymaster = request.paymaster;
  if (typeof request.paymasterAndData !== "undefined")
    rpcRequest.paymasterAndData = request.paymasterAndData || "0x";
  if (typeof request.paymasterData !== "undefined")
    rpcRequest.paymasterData = request.paymasterData;
  if (typeof request.paymasterPostOpGasLimit !== "undefined")
    rpcRequest.paymasterPostOpGasLimit = numberToHex(request.paymasterPostOpGasLimit);
  if (typeof request.paymasterSignature !== "undefined")
    rpcRequest.paymasterSignature = request.paymasterSignature;
  if (typeof request.paymasterVerificationGasLimit !== "undefined")
    rpcRequest.paymasterVerificationGasLimit = numberToHex(request.paymasterVerificationGasLimit);
  if (typeof request.preVerificationGas !== "undefined")
    rpcRequest.preVerificationGas = numberToHex(request.preVerificationGas);
  if (typeof request.sender !== "undefined")
    rpcRequest.sender = request.sender;
  if (typeof request.signature !== "undefined")
    rpcRequest.signature = request.signature;
  if (typeof request.verificationGasLimit !== "undefined")
    rpcRequest.verificationGasLimit = numberToHex(request.verificationGasLimit);
  if (typeof request.authorization !== "undefined")
    rpcRequest.eip7702Auth = formatAuthorization(request.authorization);
  return rpcRequest;
}
function formatAuthorization(authorization) {
  return {
    address: authorization.address,
    chainId: numberToHex(authorization.chainId),
    nonce: numberToHex(authorization.nonce),
    r: authorization.r ? numberToHex(BigInt(authorization.r), { size: 32 }) : pad$1("0x", { size: 32 }),
    s: authorization.s ? numberToHex(BigInt(authorization.s), { size: 32 }) : pad$1("0x", { size: 32 }),
    yParity: authorization.yParity ? numberToHex(authorization.yParity, { size: 1 }) : pad$1("0x", { size: 32 })
  };
}
async function getPaymasterData(client, parameters) {
  const { chainId, entryPointAddress, context, ...userOperation } = parameters;
  const request = formatUserOperationRequest(userOperation);
  const { paymasterPostOpGasLimit, paymasterVerificationGasLimit, ...rest } = await client.request({
    method: "pm_getPaymasterData",
    params: [
      {
        ...request,
        callGasLimit: request.callGasLimit ?? "0x0",
        verificationGasLimit: request.verificationGasLimit ?? "0x0",
        preVerificationGas: request.preVerificationGas ?? "0x0"
      },
      entryPointAddress,
      numberToHex(chainId),
      context
    ]
  });
  return {
    ...rest,
    ...paymasterPostOpGasLimit && {
      paymasterPostOpGasLimit: hexToBigInt(paymasterPostOpGasLimit)
    },
    ...paymasterVerificationGasLimit && {
      paymasterVerificationGasLimit: hexToBigInt(paymasterVerificationGasLimit)
    }
  };
}
async function getPaymasterStubData(client, parameters) {
  const { chainId, entryPointAddress, context, ...userOperation } = parameters;
  const request = formatUserOperationRequest(userOperation);
  const { paymasterPostOpGasLimit, paymasterVerificationGasLimit, ...rest } = await client.request({
    method: "pm_getPaymasterStubData",
    params: [
      {
        ...request,
        callGasLimit: request.callGasLimit ?? "0x0",
        verificationGasLimit: request.verificationGasLimit ?? "0x0",
        preVerificationGas: request.preVerificationGas ?? "0x0"
      },
      entryPointAddress,
      numberToHex(chainId),
      context
    ]
  });
  return {
    ...rest,
    ...paymasterPostOpGasLimit && {
      paymasterPostOpGasLimit: hexToBigInt(paymasterPostOpGasLimit)
    },
    ...paymasterVerificationGasLimit && {
      paymasterVerificationGasLimit: hexToBigInt(paymasterVerificationGasLimit)
    }
  };
}
const defaultParameters = [
  "factory",
  "fees",
  "gas",
  "paymaster",
  "nonce",
  "signature",
  "authorization"
];
async function prepareUserOperation(client, parameters_) {
  var _a, _b;
  const parameters = parameters_;
  const { account: account_ = client.account, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : (_a = client.dataSuffix) == null ? void 0 : _a.value, parameters: properties = defaultParameters, stateOverride } = parameters;
  if (!account_)
    throw new AccountNotFoundError();
  const account = parseAccount(account_);
  const bundlerClient = client;
  const paymaster = parameters.paymaster ?? (bundlerClient == null ? void 0 : bundlerClient.paymaster);
  const paymasterAddress = typeof paymaster === "string" ? paymaster : void 0;
  const { getPaymasterStubData: getPaymasterStubData$1, getPaymasterData: getPaymasterData$1 } = (() => {
    if (paymaster === true)
      return {
        getPaymasterStubData: (parameters2) => getAction(bundlerClient, getPaymasterStubData, "getPaymasterStubData")(parameters2),
        getPaymasterData: (parameters2) => getAction(bundlerClient, getPaymasterData, "getPaymasterData")(parameters2)
      };
    if (typeof paymaster === "object") {
      const { getPaymasterStubData: getPaymasterStubData2, getPaymasterData: getPaymasterData2 } = paymaster;
      return {
        getPaymasterStubData: getPaymasterData2 && getPaymasterStubData2 ? getPaymasterStubData2 : getPaymasterData2,
        getPaymasterData: getPaymasterData2 && getPaymasterStubData2 ? getPaymasterData2 : void 0
      };
    }
    return {
      getPaymasterStubData: void 0,
      getPaymasterData: void 0
    };
  })();
  const paymasterContext = parameters.paymasterContext ? parameters.paymasterContext : bundlerClient == null ? void 0 : bundlerClient.paymasterContext;
  let request = {
    ...parameters,
    paymaster: paymasterAddress,
    sender: account.address
  };
  const [callData, factory, fees, nonce, authorization] = await Promise.all([
    (async () => {
      if (parameters.calls)
        return account.encodeCalls(parameters.calls.map((call_) => {
          const call = call_;
          if (call.abi)
            return {
              data: encodeFunctionData(call),
              to: call.to,
              value: call.value
            };
          return call;
        }));
      return parameters.callData;
    })(),
    (async () => {
      if (!properties.includes("factory"))
        return void 0;
      if (parameters.initCode)
        return { initCode: parameters.initCode };
      if (parameters.factory && parameters.factoryData) {
        return {
          factory: parameters.factory,
          factoryData: parameters.factoryData
        };
      }
      const { factory: factory2, factoryData } = await account.getFactoryArgs();
      if (account.entryPoint.version === "0.6")
        return {
          initCode: factory2 && factoryData ? concat$1([factory2, factoryData]) : void 0
        };
      return {
        factory: factory2,
        factoryData
      };
    })(),
    (async () => {
      var _a2;
      if (!properties.includes("fees"))
        return void 0;
      if (typeof parameters.maxFeePerGas === "bigint" && typeof parameters.maxPriorityFeePerGas === "bigint")
        return request;
      if ((_a2 = bundlerClient == null ? void 0 : bundlerClient.userOperation) == null ? void 0 : _a2.estimateFeesPerGas) {
        const fees2 = await bundlerClient.userOperation.estimateFeesPerGas({
          account,
          bundlerClient,
          userOperation: request
        });
        return {
          ...request,
          ...fees2
        };
      }
      try {
        const client_ = bundlerClient.client ?? client;
        const fees2 = await getAction(client_, estimateFeesPerGas, "estimateFeesPerGas")({
          chain: client_.chain,
          type: "eip1559"
        });
        return {
          maxFeePerGas: typeof parameters.maxFeePerGas === "bigint" ? parameters.maxFeePerGas : BigInt(
            // Bundlers unfortunately have strict rules on fee prechecks – we will need to set a generous buffer.
            2n * fees2.maxFeePerGas
          ),
          maxPriorityFeePerGas: typeof parameters.maxPriorityFeePerGas === "bigint" ? parameters.maxPriorityFeePerGas : BigInt(
            // Bundlers unfortunately have strict rules on fee prechecks – we will need to set a generous buffer.
            2n * fees2.maxPriorityFeePerGas
          )
        };
      } catch {
        return void 0;
      }
    })(),
    (async () => {
      if (!properties.includes("nonce"))
        return void 0;
      if (typeof parameters.nonce === "bigint")
        return parameters.nonce;
      return account.getNonce();
    })(),
    (async () => {
      if (!properties.includes("authorization"))
        return void 0;
      if (typeof parameters.authorization === "object")
        return parameters.authorization;
      if (account.authorization && !await account.isDeployed()) {
        const authorization2 = await prepareAuthorization(account.client, account.authorization);
        return {
          ...authorization2,
          r: "0xfffffffffffffffffffffffffffffff000000000000000000000000000000000",
          s: "0x7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          yParity: 1
        };
      }
      return void 0;
    })()
  ]);
  if (typeof callData !== "undefined")
    request.callData = dataSuffix ? concat$1([callData, dataSuffix]) : callData;
  if (typeof factory !== "undefined")
    request = { ...request, ...factory };
  if (typeof fees !== "undefined")
    request = { ...request, ...fees };
  if (typeof nonce !== "undefined")
    request.nonce = nonce;
  if (typeof authorization !== "undefined")
    request.authorization = authorization;
  if (properties.includes("signature")) {
    if (typeof parameters.signature !== "undefined")
      request.signature = parameters.signature;
    else
      request.signature = await account.getStubSignature(request);
  }
  if (account.entryPoint.version === "0.6" && !request.initCode)
    request.initCode = "0x";
  let chainId;
  async function getChainId$1() {
    if (chainId)
      return chainId;
    if (client.chain)
      return client.chain.id;
    const chainId_ = await getAction(client, getChainId, "getChainId")({});
    chainId = chainId_;
    return chainId;
  }
  let isPaymasterPopulated = false;
  if (properties.includes("paymaster") && getPaymasterStubData$1 && !paymasterAddress && !parameters.paymasterAndData) {
    const { isFinal = false, sponsor: _2, ...paymasterArgs } = await getPaymasterStubData$1({
      chainId: await getChainId$1(),
      entryPointAddress: account.entryPoint.address,
      context: paymasterContext,
      ...request
    });
    isPaymasterPopulated = isFinal;
    request = {
      ...request,
      ...paymasterArgs
    };
  }
  if (account.entryPoint.version === "0.6" && !request.paymasterAndData)
    request.paymasterAndData = "0x";
  if (properties.includes("gas")) {
    if ((_b = account.userOperation) == null ? void 0 : _b.estimateGas) {
      const gas = await account.userOperation.estimateGas(request);
      request = {
        ...request,
        ...gas
      };
    }
    if (typeof request.callGasLimit === "undefined" || typeof request.preVerificationGas === "undefined" || typeof request.verificationGasLimit === "undefined" || request.paymaster && typeof request.paymasterPostOpGasLimit === "undefined" || request.paymaster && typeof request.paymasterVerificationGasLimit === "undefined") {
      const gas = await getAction(bundlerClient, estimateUserOperationGas, "estimateUserOperationGas")({
        account,
        // Some Bundlers fail if nullish gas values are provided for gas estimation :') –
        // so we will need to set a default zeroish value.
        callGasLimit: 0n,
        preVerificationGas: 0n,
        verificationGasLimit: 0n,
        stateOverride,
        ...request.paymaster ? {
          paymasterPostOpGasLimit: 0n,
          paymasterVerificationGasLimit: 0n
        } : {},
        ...request
      });
      request = {
        ...request,
        callGasLimit: request.callGasLimit ?? gas.callGasLimit,
        preVerificationGas: request.preVerificationGas ?? gas.preVerificationGas,
        verificationGasLimit: request.verificationGasLimit ?? gas.verificationGasLimit,
        paymasterPostOpGasLimit: request.paymasterPostOpGasLimit ?? gas.paymasterPostOpGasLimit,
        paymasterVerificationGasLimit: request.paymasterVerificationGasLimit ?? gas.paymasterVerificationGasLimit
      };
    }
  }
  if (properties.includes("paymaster") && getPaymasterData$1 && !paymasterAddress && !parameters.paymasterAndData && !isPaymasterPopulated) {
    const paymaster2 = await getPaymasterData$1({
      chainId: await getChainId$1(),
      entryPointAddress: account.entryPoint.address,
      context: paymasterContext,
      ...request
    });
    request = {
      ...request,
      ...paymaster2
    };
  }
  delete request.calls;
  delete request.parameters;
  delete request.paymasterContext;
  if (typeof request.paymaster !== "string")
    delete request.paymaster;
  return request;
}
async function estimateUserOperationGas(client, parameters) {
  var _a;
  const { account: account_ = client.account, entryPointAddress, stateOverride } = parameters;
  if (!account_ && !parameters.sender)
    throw new AccountNotFoundError();
  const account = account_ ? parseAccount(account_) : void 0;
  const rpcStateOverride = serializeStateOverride(stateOverride);
  const request = account ? await getAction(client, prepareUserOperation, "prepareUserOperation")({
    ...parameters,
    parameters: [
      "authorization",
      "factory",
      "nonce",
      "paymaster",
      "signature"
    ]
  }) : parameters;
  try {
    const params = [
      formatUserOperationRequest(request),
      entryPointAddress ?? ((_a = account == null ? void 0 : account.entryPoint) == null ? void 0 : _a.address)
    ];
    const result = await client.request({
      method: "eth_estimateUserOperationGas",
      params: rpcStateOverride ? [...params, rpcStateOverride] : [...params]
    });
    return formatUserOperationGas(result);
  } catch (error) {
    const calls = parameters.calls;
    throw getUserOperationError(error, {
      ...request,
      ...calls ? { calls } : {}
    });
  }
}
function getSupportedEntryPoints(client) {
  return client.request({ method: "eth_supportedEntryPoints" });
}
function formatUserOperation(parameters) {
  const userOperation = { ...parameters };
  if (parameters.callGasLimit)
    userOperation.callGasLimit = BigInt(parameters.callGasLimit);
  if (parameters.maxFeePerGas)
    userOperation.maxFeePerGas = BigInt(parameters.maxFeePerGas);
  if (parameters.maxPriorityFeePerGas)
    userOperation.maxPriorityFeePerGas = BigInt(parameters.maxPriorityFeePerGas);
  if (parameters.nonce)
    userOperation.nonce = BigInt(parameters.nonce);
  if (parameters.paymasterPostOpGasLimit)
    userOperation.paymasterPostOpGasLimit = BigInt(parameters.paymasterPostOpGasLimit);
  if (parameters.paymasterVerificationGasLimit)
    userOperation.paymasterVerificationGasLimit = BigInt(parameters.paymasterVerificationGasLimit);
  if (parameters.preVerificationGas)
    userOperation.preVerificationGas = BigInt(parameters.preVerificationGas);
  if (parameters.verificationGasLimit)
    userOperation.verificationGasLimit = BigInt(parameters.verificationGasLimit);
  return userOperation;
}
async function getUserOperation(client, { hash }) {
  const result = await client.request({
    method: "eth_getUserOperationByHash",
    params: [hash]
  }, { dedupe: true });
  if (!result)
    throw new UserOperationNotFoundError({ hash });
  const { blockHash, blockNumber, entryPoint, transactionHash, userOperation } = result;
  return {
    blockHash,
    blockNumber: BigInt(blockNumber),
    entryPoint,
    transactionHash,
    userOperation: formatUserOperation(userOperation)
  };
}
function formatUserOperationReceipt(parameters) {
  const receipt = { ...parameters };
  if (parameters.actualGasCost)
    receipt.actualGasCost = BigInt(parameters.actualGasCost);
  if (parameters.actualGasUsed)
    receipt.actualGasUsed = BigInt(parameters.actualGasUsed);
  if (parameters.logs)
    receipt.logs = parameters.logs.map((log) => formatLog(log));
  if (parameters.receipt)
    receipt.receipt = formatTransactionReceipt(receipt.receipt);
  return receipt;
}
async function getUserOperationReceipt(client, { hash }) {
  const receipt = await client.request({
    method: "eth_getUserOperationReceipt",
    params: [hash]
  }, { dedupe: true });
  if (!receipt)
    throw new UserOperationReceiptNotFoundError({ hash });
  return formatUserOperationReceipt(receipt);
}
async function sendUserOperation(client, parameters) {
  var _a, _b;
  const { account: account_ = client.account, entryPointAddress } = parameters;
  if (!account_ && !parameters.sender)
    throw new AccountNotFoundError();
  const account = account_ ? parseAccount(account_) : void 0;
  const request = account ? await getAction(client, prepareUserOperation, "prepareUserOperation")(parameters) : parameters;
  const signature = parameters.signature || await ((_a = account == null ? void 0 : account.signUserOperation) == null ? void 0 : _a.call(account, request));
  const rpcParameters = formatUserOperationRequest({
    ...request,
    signature
  });
  try {
    return await client.request({
      method: "eth_sendUserOperation",
      params: [
        rpcParameters,
        entryPointAddress ?? ((_b = account == null ? void 0 : account.entryPoint) == null ? void 0 : _b.address)
      ]
    }, { retryCount: 0 });
  } catch (error) {
    const calls = parameters.calls;
    throw getUserOperationError(error, {
      ...request,
      ...calls ? { calls } : {},
      signature
    });
  }
}
function waitForUserOperationReceipt(client, parameters) {
  const { hash, pollingInterval = client.pollingInterval, retryCount, timeout = 12e4 } = parameters;
  let count = 0;
  const observerId = stringify$1([
    "waitForUserOperationReceipt",
    client.uid,
    hash
  ]);
  return new Promise((resolve, reject) => {
    const unobserve = observe(observerId, { resolve, reject }, (emit) => {
      const done = (fn) => {
        unpoll();
        fn();
        unobserve();
      };
      const timeoutId = timeout ? setTimeout(() => done(() => emit.reject(new WaitForUserOperationReceiptTimeoutError({ hash }))), timeout) : void 0;
      const unpoll = poll(async () => {
        if (retryCount && count >= retryCount) {
          clearTimeout(timeoutId);
          done(() => emit.reject(new WaitForUserOperationReceiptTimeoutError({ hash })));
        }
        try {
          const receipt = await getAction(client, getUserOperationReceipt, "getUserOperationReceipt")({ hash });
          clearTimeout(timeoutId);
          done(() => emit.resolve(receipt));
        } catch (err) {
          const error = err;
          if (error.name !== "UserOperationReceiptNotFoundError") {
            clearTimeout(timeoutId);
            done(() => emit.reject(error));
          }
        }
        count++;
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return unpoll;
    });
  });
}
function bundlerActions(client) {
  return {
    estimateUserOperationGas: (parameters) => estimateUserOperationGas(client, parameters),
    getChainId: () => getChainId(client),
    getSupportedEntryPoints: () => getSupportedEntryPoints(client),
    getUserOperation: (parameters) => getUserOperation(client, parameters),
    getUserOperationReceipt: (parameters) => getUserOperationReceipt(client, parameters),
    prepareUserOperation: (parameters) => prepareUserOperation(client, parameters),
    sendUserOperation: (parameters) => sendUserOperation(client, parameters),
    waitForUserOperationReceipt: (parameters) => waitForUserOperationReceipt(client, parameters)
  };
}
function createBundlerClient(parameters) {
  const { client: client_, dataSuffix, key = "bundler", name = "Bundler Client", paymaster, paymasterContext, transport, userOperation } = parameters;
  const client = Object.assign(createClient({
    ...parameters,
    chain: parameters.chain ?? (client_ == null ? void 0 : client_.chain),
    key,
    name,
    transport,
    type: "bundlerClient"
  }), {
    client: client_,
    dataSuffix: dataSuffix ?? (client_ == null ? void 0 : client_.dataSuffix),
    paymaster,
    paymasterContext,
    userOperation
  });
  return client.extend(bundlerActions);
}
const version = "0.1.1";
function getVersion() {
  return version;
}
class BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      var _a;
      if (options.cause instanceof BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if ((_a = options.cause) == null ? void 0 : _a.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x2) => typeof x2 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
function walk(err, fn) {
  if (fn == null ? void 0 : fn(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn);
  return fn ? null : err;
}
const bigIntSuffix = "#__bigint";
function stringify(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}
function assertSize$1(bytes, size_) {
  if (size(bytes) > size_)
    throw new SizeOverflowError2({
      givenSize: size(bytes),
      maxSize: size_
    });
}
function assertStartOffset$1(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError2({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset$1(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError2({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function assertSize(hex, size_) {
  if (size$1(hex) > size_)
    throw new SizeOverflowError$1({
      givenSize: size$1(hex),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size$1(value) - 1)
    throw new SliceOffsetOutOfBoundsError$1({
      offset: start,
      position: "start",
      size: size$1(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size$1(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError$1({
      offset: end,
      position: "end",
      size: size$1(value)
    });
  }
}
function pad(hex_, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
const encoder = /* @__PURE__ */ new TextEncoder();
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i2) => i2.toString(16).padStart(2, "0"));
function assert$3(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError(value);
}
function concat(...values) {
  return `0x${values.reduce((acc, x2) => acc + x2.replace("0x", ""), "")}`;
}
function from$2(value) {
  if (value instanceof Uint8Array)
    return fromBytes$2(value);
  if (Array.isArray(value))
    return fromBytes$2(new Uint8Array(value));
  return value;
}
function fromBytes$2(value, options = {}) {
  let string = "";
  for (let i2 = 0; i2 < value.length; i2++)
    string += hexes[value[i2]];
  const hex = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size2 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size2)
    return padLeft(hex, size2);
  return hex;
}
function fromString(value, options = {}) {
  return fromBytes$2(encoder.encode(value), options);
}
function padLeft(value, size2) {
  return pad(value, { dir: "left", size: size2 });
}
function padRight(value, size2) {
  return pad(value, { dir: "right", size: size2 });
}
function slice$1(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function size$1(value) {
  return Math.ceil((value.length - 2) / 2);
}
function toBigInt$1(hex, options = {}) {
  const { signed } = options;
  if (options.size)
    assertSize(hex, options.size);
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max_unsigned = (1n << BigInt(size2) * 8n) - 1n;
  const max_signed = max_unsigned >> 1n;
  if (value <= max_signed)
    return value;
  return value - max_unsigned - 1n;
}
function validate$1(value, options = {}) {
  const { strict = false } = options;
  try {
    assert$3(value, { strict });
    return true;
  } catch {
    return false;
  }
}
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number \`${value}\` is not in safe${size2 ? ` ${size2 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
}
class InvalidHexTypeError extends BaseError {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
}
class InvalidHexValueError extends BaseError {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
}
let SizeOverflowError$1 = class SizeOverflowError extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
let SliceOffsetOutOfBoundsError$1 = class SliceOffsetOutOfBoundsError extends BaseError {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
};
class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
}
function assert$2(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError(value);
}
function from$1(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex$3(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex$3(value, options = {}) {
  const { size: size2 } = options;
  let hex = value;
  if (size2) {
    assertSize(value, size2);
    hex = padRight(value, size2);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j2 = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j2++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j2++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j2 - 2]}${hexString[j2 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function size(value) {
  return value.length;
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset$1(value, start);
  const value_ = value.slice(start, end);
  if (strict)
    assertEndOffset$1(value_, start, end);
  return value_;
}
function toBigInt(bytes, options = {}) {
  const { size: size2 } = options;
  if (typeof size2 !== "undefined")
    assertSize$1(bytes, size2);
  const hex = fromBytes$2(bytes, options);
  return toBigInt$1(hex, options);
}
function validate(value) {
  try {
    assert$2(value);
    return true;
  } catch {
    return false;
  }
}
class InvalidBytesTypeError extends BaseError {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
      metaMessages: ["Bytes values must be of type `Bytes`."]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.InvalidBytesTypeError"
    });
  }
}
class SizeOverflowError2 extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
}
class SliceOffsetOutOfBoundsError2 extends BaseError {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SliceOffsetOutOfBoundsError"
    });
  }
}
function sha256(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = sha256$1(from$1(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes$2(bytes);
}
function assert$1(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x: x2, y: y2 } = publicKey;
  if (compressed === false || typeof x2 === "bigint" && typeof y2 === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidUncompressedPrefixError()
      });
    return;
  }
  if (compressed === true || typeof x2 === "bigint" && typeof y2 === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidCompressedPrefixError()
      });
    return;
  }
  throw new InvalidError({ publicKey });
}
function from(value) {
  const publicKey = (() => {
    if (validate$1(value))
      return fromHex$2(value);
    if (validate(value))
      return fromBytes$1(value);
    const { prefix, x: x2, y: y2 } = value;
    if (typeof x2 === "bigint" && typeof y2 === "bigint")
      return { prefix: prefix ?? 4, x: x2, y: y2 };
    return { prefix, x: x2 };
  })();
  assert$1(publicKey);
  return publicKey;
}
function fromBytes$1(publicKey) {
  return fromHex$2(fromBytes$2(publicKey));
}
function fromHex$2(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError$1({ publicKey });
  if (publicKey.length === 130) {
    const x3 = BigInt(slice$1(publicKey, 0, 32));
    const y2 = BigInt(slice$1(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x3,
      y: y2
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice$1(publicKey, 0, 1));
    const x3 = BigInt(slice$1(publicKey, 1, 33));
    const y2 = BigInt(slice$1(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x3,
      y: y2
    };
  }
  const prefix = Number(slice$1(publicKey, 0, 1));
  const x2 = BigInt(slice$1(publicKey, 1, 33));
  return {
    prefix,
    x: x2
  };
}
function toHex$1(publicKey, options = {}) {
  assert$1(publicKey);
  const { prefix, x: x2, y: y2 } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x2, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y2 === "bigint" ? fromNumber(y2, { size: 32 }) : "0x"
  );
  return publicKey_;
}
class InvalidError extends BaseError {
  constructor({ publicKey }) {
    super(`Value \`${stringify(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
}
class InvalidPrefixError extends BaseError {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
}
class InvalidCompressedPrefixError extends BaseError {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
}
class InvalidUncompressedPrefixError extends BaseError {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
}
let InvalidSerializedSizeError$1 = class InvalidSerializedSizeError extends BaseError {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size$1(from$2(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};
const maxUint256 = 2n ** 256n - 1n;
function assert(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError({ signature });
  if (signature.r < 0n || signature.r > maxUint256)
    throw new InvalidRError({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint256)
    throw new InvalidSError({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError({ value: signature.yParity });
}
function fromHex$1(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError2({ signature });
  const r2 = BigInt(slice$1(signature, 0, 32));
  const s2 = BigInt(slice$1(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r: r2,
      s: s2
    };
  return {
    r: r2,
    s: s2,
    yParity
  };
}
function toHex(signature) {
  assert(signature);
  const r2 = signature.r;
  const s2 = signature.s;
  const signature_ = concat(
    fromNumber(r2, { size: 32 }),
    fromNumber(s2, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === "number" ? fromNumber(yParityToV(signature.yParity), { size: 1 }) : "0x"
  );
  return signature_;
}
function vToYParity(v2) {
  if (v2 === 0 || v2 === 27)
    return 0;
  if (v2 === 1 || v2 === 28)
    return 1;
  if (v2 >= 35)
    return v2 % 2 === 0 ? 1 : 0;
  throw new InvalidVError({ value: v2 });
}
function yParityToV(yParity) {
  if (yParity === 0)
    return 27;
  if (yParity === 1)
    return 28;
  throw new InvalidYParityError({ value: yParity });
}
class InvalidSerializedSizeError2 extends BaseError {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size$1(from$2(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
}
class MissingPropertiesError extends BaseError {
  constructor({ signature }) {
    super(`Signature \`${stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
}
class InvalidRError extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
}
class InvalidSError extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
}
class InvalidYParityError extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
}
class InvalidVError extends BaseError {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
}
const decoder = /* @__PURE__ */ new TextDecoder();
const integerToCharacter = /* @__PURE__ */ Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a2, i2) => [i2, a2.charCodeAt(0)]));
({
  ...Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a2, i2) => [a2.charCodeAt(0), i2]))
});
function fromBytes(value, options = {}) {
  const { pad: pad2 = true, url = false } = options;
  const encoded = new Uint8Array(Math.ceil(value.length / 3) * 4);
  for (let i2 = 0, j2 = 0; j2 < value.length; i2 += 4, j2 += 3) {
    const y2 = (value[j2] << 16) + (value[j2 + 1] << 8) + (value[j2 + 2] | 0);
    encoded[i2] = integerToCharacter[y2 >> 18];
    encoded[i2 + 1] = integerToCharacter[y2 >> 12 & 63];
    encoded[i2 + 2] = integerToCharacter[y2 >> 6 & 63];
    encoded[i2 + 3] = integerToCharacter[y2 & 63];
  }
  const k2 = value.length % 3;
  const end = Math.floor(value.length / 3) * 4 + (k2 && k2 + 1);
  let base64 = decoder.decode(new Uint8Array(encoded.buffer, 0, end));
  if (pad2 && k2 === 1)
    base64 += "==";
  if (pad2 && k2 === 2)
    base64 += "=";
  if (url)
    base64 = base64.replaceAll("+", "-").replaceAll("/", "_");
  return base64;
}
function fromHex(value, options = {}) {
  return fromBytes(fromHex$3(value), options);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const p256_CURVE = {
  p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  h: BigInt(1),
  a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
  b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
};
const p384_CURVE = {
  p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
  n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
  h: BigInt(1),
  a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
  b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
  Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
  Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
};
const p521_CURVE = {
  p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
  n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
  h: BigInt(1),
  a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
  b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
  Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
  Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
};
const Fp256 = Field(p256_CURVE.p);
const Fp384 = Field(p384_CURVE.p);
const Fp521 = Field(p521_CURVE.p);
const p256$1 = createCurve({ ...p256_CURVE, Fp: Fp256, lowS: false }, sha256$2);
createCurve({ ...p384_CURVE, Fp: Fp384, lowS: false }, sha384);
createCurve({ ...p521_CURVE, Fp: Fp521, lowS: false, allowedPrivateKeyLengths: [130, 131, 132] }, sha512);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const p256 = p256$1;
Uint8Array.from([
  105,
  171,
  180,
  181,
  160,
  222,
  75,
  198,
  42,
  42,
  32,
  31,
  141,
  37,
  186,
  233
]);
function getAuthenticatorData(options = {}) {
  const { flag = 5, rpId = window.location.hostname, signCount = 0 } = options;
  const rpIdHash = sha256(fromString(rpId));
  const flag_bytes = fromNumber(flag, { size: 1 });
  const signCount_bytes = fromNumber(signCount, { size: 4 });
  return concat(rpIdHash, flag_bytes, signCount_bytes);
}
function getClientDataJSON(options) {
  const { challenge, crossOrigin = false, extraClientData, origin = window.location.origin } = options;
  return JSON.stringify({
    type: "webauthn.get",
    challenge: fromHex(challenge, { url: true, pad: false }),
    origin,
    crossOrigin,
    ...extraClientData
  });
}
function getSignPayload(options) {
  const { challenge, crossOrigin, extraClientData, flag, origin, rpId, signCount, userVerification = "required" } = options;
  const authenticatorData = getAuthenticatorData({
    flag,
    rpId,
    signCount
  });
  const clientDataJSON = getClientDataJSON({
    challenge,
    crossOrigin,
    extraClientData,
    origin
  });
  const clientDataJSONHash = sha256(fromString(clientDataJSON));
  const challengeIndex = clientDataJSON.indexOf('"challenge"');
  const typeIndex = clientDataJSON.indexOf('"type"');
  const metadata = {
    authenticatorData,
    clientDataJSON,
    challengeIndex,
    typeIndex,
    userVerificationRequired: userVerification === "required"
  };
  const payload = concat(authenticatorData, clientDataJSONHash);
  return { metadata, payload };
}
async function createKeyPair(options = {}) {
  const { extractable = false } = options;
  const keypair = await globalThis.crypto.subtle.generateKey({
    name: "ECDSA",
    namedCurve: "P-256"
  }, extractable, ["sign", "verify"]);
  const publicKey_raw = await globalThis.crypto.subtle.exportKey("raw", keypair.publicKey);
  const publicKey = from(new Uint8Array(publicKey_raw));
  return {
    privateKey: keypair.privateKey,
    publicKey
  };
}
async function sign(options) {
  const { payload, privateKey } = options;
  const signature = await globalThis.crypto.subtle.sign({
    name: "ECDSA",
    hash: "SHA-256"
  }, privateKey, from$1(payload));
  const signature_bytes = fromArray(new Uint8Array(signature));
  const r2 = toBigInt(slice(signature_bytes, 0, 32));
  let s2 = toBigInt(slice(signature_bytes, 32, 64));
  if (s2 > p256.CURVE.n / 2n)
    s2 = p256.CURVE.n - s2;
  return { r: r2, s: s2 };
}
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
export {
  B$1 as B,
  T,
  _,
  createJSONStorage as a,
  createBundlerClient as b,
  createStore$1 as c,
  createStore as d,
  del as e,
  slice$1 as f,
  get as g,
  h,
  getSignPayload as i,
  sign as j,
  toHex as k,
  l$1 as l,
  createKeyPair as m,
  fromHex$1 as n,
  toSmartAccount as o,
  persist as p,
  entryPoint06Address as q,
  entryPoint06Abi as r,
  set as s,
  toHex$1 as t,
  getUserOperationHash as u,
  y
};
//# sourceMappingURL=index-Cp6hYbwr.js.map
