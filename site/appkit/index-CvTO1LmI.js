import { aJ as getDefaultExportFromCjs, aK as commonjsGlobal, n as css, q as i, t as b, r as resetStyles, C as ChainController, aL as TransactionsController, a as CoreHelperUtil, R as RouterController, O as OptionsController, E as EventsController, D as getPreferredAccountType, W as W3mFrameRpcConstants } from "./appkit-DOrUN3iw.js";
import { n, r } from "./class-map-B0iniyJ1.js";
import { U as UiHelperUtil, c as customElement } from "./index-ClJML15C.js";
import "./index-CeqZ_NJd.js";
import "./index-CWw9Bfzp.js";
import { o } from "./if-defined-AQastk2C.js";
import "./index-ZaRmRmdM.js";
import "./index-CZhgglo4.js";
var dayjs_min = { exports: {} };
(function(module, exports$1) {
  !(function(t, e) {
    module.exports = e();
  })(commonjsGlobal, (function() {
    var t = 1e3, e = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s = "minute", u = "hour", a = "day", o2 = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n3 = t2 % 100;
      return "[" + t2 + (e2[(n3 - 20) % 10] || e2[n3] || e2[0]) + "]";
    } }, m = function(t2, e2, n3) {
      var r3 = String(t2);
      return !r3 || r3.length >= e2 ? t2 : "" + Array(e2 + 1 - r3.length).join(n3) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n3 = Math.abs(e2), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r3, 2, "0") + ":" + m(i3, 2, "0");
    }, m: function t2(e2, n3) {
      if (e2.date() < n3.date()) return -t2(n3, e2);
      var r3 = 12 * (n3.year() - e2.year()) + (n3.month() - e2.month()), i3 = e2.clone().add(r3, c), s2 = n3 - i3 < 0, u2 = e2.clone().add(r3 + (s2 ? -1 : 1), c);
      return +(-(r3 + (n3 - i3) / (s2 ? i3 - u2 : u2 - i3)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c, y: h, w: o2, d: a, D: d, h: u, m: s, s: i2, ms: r2, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return void 0 === t2;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t2(e2, n3, r3) {
      var i3;
      if (!e2) return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i3 = s2), n3 && (D[s2] = n3, i3 = s2);
        var u2 = e2.split("-");
        if (!i3 && u2.length > 1) return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i3 = a2;
      }
      return !r3 && i3 && (g = i3), i3 || !r3 && g;
    }, O = function(t2, e2) {
      if (S(t2)) return t2.clone();
      var n3 = "object" == typeof e2 ? e2 : {};
      return n3.date = t2, n3.args = arguments, new _(n3);
    }, b2 = v;
    b2.l = w, b2.i = S, b2.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = (function() {
      function M2(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = (function(t3) {
          var e2 = t3.date, n3 = t3.utc;
          if (null === e2) return /* @__PURE__ */ new Date(NaN);
          if (b2.u(e2)) return /* @__PURE__ */ new Date();
          if (e2 instanceof Date) return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r3 = e2.match($);
            if (r3) {
              var i3 = r3[2] - 1 || 0, s2 = (r3[7] || "0").substring(0, 3);
              return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2);
            }
          }
          return new Date(e2);
        })(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b2;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n3 = O(t2);
        return this.startOf(e2) <= n3 && n3 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n3) {
        return b2.u(t2) ? this[e2] : this.set(n3, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n3 = this, r3 = !!b2.u(e2) || e2, f2 = b2.p(t2), l2 = function(t3, e3) {
          var i3 = b2.w(n3.$u ? Date.UTC(n3.$y, e3, t3) : new Date(n3.$y, e3, t3), n3);
          return r3 ? i3 : i3.endOf(a);
        }, $2 = function(t3, e3) {
          return b2.w(n3.toDate()[t3].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n3);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h:
            return r3 ? l2(1, 0) : l2(31, 11);
          case c:
            return r3 ? l2(1, M3) : l2(0, M3 + 1);
          case o2:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r3 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i2:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n3, o3 = b2.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n3 = {}, n3[a] = f2 + "Date", n3[d] = f2 + "Date", n3[c] = f2 + "Month", n3[h] = f2 + "FullYear", n3[u] = f2 + "Hours", n3[s] = f2 + "Minutes", n3[i2] = f2 + "Seconds", n3[r2] = f2 + "Milliseconds", n3)[o3], $2 = o3 === a ? this.$D + (e2 - this.$W) : e2;
        if (o3 === c || o3 === h) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b2.p(t2)]();
      }, m2.add = function(r3, f2) {
        var d2, l2 = this;
        r3 = Number(r3);
        var $2 = b2.p(f2), y2 = function(t2) {
          var e2 = O(l2);
          return b2.w(e2.date(e2.date() + Math.round(t2 * r3)), l2);
        };
        if ($2 === c) return this.set(c, this.$M + r3);
        if ($2 === h) return this.set(h, this.$y + r3);
        if ($2 === a) return y2(1);
        if ($2 === o2) return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n2, d2[i2] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r3 * M3;
        return b2.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n3 = this.$locale();
        if (!this.isValid()) return n3.invalidDate || l;
        var r3 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o3 = n3.weekdays, c2 = n3.months, f2 = n3.meridiem, h2 = function(t3, n4, i4, s3) {
          return t3 && (t3[n4] || t3(e2, r3)) || i4[n4].slice(0, s3);
        }, d2 = function(t3) {
          return b2.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n4) {
          var r4 = t3 < 12 ? "AM" : "PM";
          return n4 ? r4.toLowerCase() : r4;
        };
        return r3.replace(y, (function(t3, r4) {
          return r4 || (function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b2.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b2.s(a2 + 1, 2, "0");
              case "MMM":
                return h2(n3.monthsShort, a2, c2, 3);
              case "MMMM":
                return h2(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b2.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h2(n3.weekdaysMin, e2.$W, o3, 2);
              case "ddd":
                return h2(n3.weekdaysShort, e2.$W, o3, 3);
              case "dddd":
                return o3[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b2.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b2.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b2.s(e2.$s, 2, "0");
              case "SSS":
                return b2.s(e2.$ms, 3, "0");
              case "Z":
                return i3;
            }
            return null;
          })(t3) || i3.replace(":", "");
        }));
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r3, d2, l2) {
        var $2, y2 = this, M3 = b2.p(d2), m3 = O(r3), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b2.m(y2, m3);
        };
        switch (M3) {
          case h:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o2:
            $2 = (g2 - v2) / 6048e5;
            break;
          case a:
            $2 = (g2 - v2) / 864e5;
            break;
          case u:
            $2 = g2 / n2;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i2:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b2.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2) return this.$L;
        var n3 = this.clone(), r3 = w(t2, e2, true);
        return r3 && (n3.$L = r3), n3;
      }, m2.clone = function() {
        return b2.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    })(), k = _.prototype;
    return O.prototype = k, [["$ms", r2], ["$s", i2], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach((function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    })), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1e3 * t2);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  }));
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
var en = { exports: {} };
(function(module, exports$1) {
  !(function(e, n2) {
    module.exports = n2();
  })(commonjsGlobal, (function() {
    return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(e) {
      var n2 = ["th", "st", "nd", "rd"], t = e % 100;
      return "[" + e + (n2[(t - 20) % 10] || n2[t] || n2[0]) + "]";
    } };
  }));
})(en);
var enExports = en.exports;
const englishLocale = /* @__PURE__ */ getDefaultExportFromCjs(enExports);
var relativeTime$1 = { exports: {} };
(function(module, exports$1) {
  !(function(r2, e) {
    module.exports = e();
  })(commonjsGlobal, (function() {
    return function(r2, e, t) {
      r2 = r2 || {};
      var n2 = e.prototype, o2 = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i2(r3, e2, t2, o3) {
        return n2.fromToBase(r3, e2, t2, o3);
      }
      t.en.relativeTime = o2, n2.fromToBase = function(e2, n3, i3, d2, u) {
        for (var f, a, s, l = i3.$locale().relativeTime || o2, h = r2.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c = 0; c < m; c += 1) {
          var y = h[c];
          y.d && (f = d2 ? t(e2).diff(i3, y.d, true) : i3.diff(e2, y.d, true));
          var p = (r2.rounding || Math.round)(Math.abs(f));
          if (s = f > 0, p <= y.r || !y.r) {
            p <= 1 && c > 0 && (y = h[c - 1]);
            var v = l[y.l];
            u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n3, y.l, s);
            break;
          }
        }
        if (n3) return a;
        var M = s ? l.future : l.past;
        return "function" == typeof M ? M(a) : M.replace("%s", a);
      }, n2.to = function(r3, e2) {
        return i2(r3, e2, this, true);
      }, n2.from = function(r3, e2) {
        return i2(r3, e2, this);
      };
      var d = function(r3) {
        return r3.$u ? t.utc() : t();
      };
      n2.toNow = function(r3) {
        return this.to(d(this), r3);
      }, n2.fromNow = function(r3) {
        return this.from(d(this), r3);
      };
    };
  }));
})(relativeTime$1);
var relativeTimeExports = relativeTime$1.exports;
const relativeTime = /* @__PURE__ */ getDefaultExportFromCjs(relativeTimeExports);
var updateLocale$1 = { exports: {} };
(function(module, exports$1) {
  !(function(e, n2) {
    module.exports = n2();
  })(commonjsGlobal, (function() {
    return function(e, n2, t) {
      t.updateLocale = function(e2, n3) {
        var o2 = t.Ls[e2];
        if (o2) return (n3 ? Object.keys(n3) : []).forEach((function(e3) {
          o2[e3] = n3[e3];
        })), o2;
      };
    };
  }));
})(updateLocale$1);
var updateLocaleExports = updateLocale$1.exports;
const updateLocale = /* @__PURE__ */ getDefaultExportFromCjs(updateLocaleExports);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
const localeObject = {
  ...englishLocale,
  name: "en-web3-modal",
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "1 min",
    mm: "%d min",
    h: "1 hr",
    hh: "%d hrs",
    d: "1 d",
    dd: "%d d",
    M: "1 mo",
    MM: "%d mo",
    y: "1 yr",
    yy: "%d yr"
  }
};
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
dayjs.locale("en-web3-modal", localeObject);
const DateUtil = {
  getMonthNameByIndex(monthIndex) {
    return MONTH_NAMES[monthIndex];
  },
  getYear(date = (/* @__PURE__ */ new Date()).toISOString()) {
    return dayjs(date).year();
  },
  getRelativeDateFromNow(date) {
    return dayjs(date).locale("en-web3-modal").fromNow(true);
  },
  formatDate(date, format = "DD MMM") {
    return dayjs(date).format(format);
  }
};
const FLOAT_FIXED_VALUE = 3;
const GAS_FEE_THRESHOLD = 0.1;
const plusTypes = ["receive", "deposit", "borrow", "claim"];
const minusTypes = ["withdraw", "repay", "burn"];
const TransactionUtil = {
  getTransactionGroupTitle(year, month) {
    const currentYear = DateUtil.getYear();
    const monthName = DateUtil.getMonthNameByIndex(month);
    const isCurrentYear = year === currentYear;
    const groupTitle = isCurrentYear ? monthName : `${monthName} ${year}`;
    return groupTitle;
  },
  getTransactionImages(transfers) {
    const [transfer] = transfers;
    const hasMultipleTransfers = (transfers == null ? void 0 : transfers.length) > 1;
    if (hasMultipleTransfers) {
      return transfers.map((item) => this.getTransactionImage(item));
    }
    return [this.getTransactionImage(transfer)];
  },
  getTransactionImage(transfer) {
    return {
      type: TransactionUtil.getTransactionTransferTokenType(transfer),
      url: TransactionUtil.getTransactionImageURL(transfer)
    };
  },
  getTransactionImageURL(transfer) {
    var _a, _b, _c, _d, _e;
    let imageURL = void 0;
    const isNFT = Boolean(transfer == null ? void 0 : transfer.nft_info);
    const isFungible = Boolean(transfer == null ? void 0 : transfer.fungible_info);
    if (transfer && isNFT) {
      imageURL = (_c = (_b = (_a = transfer == null ? void 0 : transfer.nft_info) == null ? void 0 : _a.content) == null ? void 0 : _b.preview) == null ? void 0 : _c.url;
    } else if (transfer && isFungible) {
      imageURL = (_e = (_d = transfer == null ? void 0 : transfer.fungible_info) == null ? void 0 : _d.icon) == null ? void 0 : _e.url;
    }
    return imageURL;
  },
  getTransactionTransferTokenType(transfer) {
    if (transfer == null ? void 0 : transfer.fungible_info) {
      return "FUNGIBLE";
    } else if (transfer == null ? void 0 : transfer.nft_info) {
      return "NFT";
    }
    return void 0;
  },
  getTransactionDescriptions(transaction, mergedTransfers) {
    var _a;
    const type = (_a = transaction == null ? void 0 : transaction.metadata) == null ? void 0 : _a.operationType;
    const transfers = mergedTransfers || (transaction == null ? void 0 : transaction.transfers);
    const hasTransfer = transfers && transfers.length > 0;
    const hasMultipleTransfers = transfers && transfers.length > 1;
    const isFungible = hasTransfer && transfers.every((transfer) => Boolean(transfer == null ? void 0 : transfer.fungible_info));
    const [firstTransfer, secondTransfer] = transfers || [];
    let firstDescription = this.getTransferDescription(firstTransfer);
    let secondDescription = this.getTransferDescription(secondTransfer);
    if (!hasTransfer) {
      const isSendOrReceive = type === "send" || type === "receive";
      if (isSendOrReceive && isFungible) {
        firstDescription = UiHelperUtil.getTruncateString({
          string: transaction == null ? void 0 : transaction.metadata.sentFrom,
          charsStart: 4,
          charsEnd: 6,
          truncate: "middle"
        });
        secondDescription = UiHelperUtil.getTruncateString({
          string: transaction == null ? void 0 : transaction.metadata.sentTo,
          charsStart: 4,
          charsEnd: 6,
          truncate: "middle"
        });
        return [firstDescription, secondDescription];
      }
      return [transaction.metadata.status];
    }
    if (hasMultipleTransfers) {
      return transfers == null ? void 0 : transfers.map((item) => this.getTransferDescription(item));
    }
    let prefix = "";
    if (plusTypes.includes(type)) {
      prefix = "+";
    } else if (minusTypes.includes(type)) {
      prefix = "-";
    }
    firstDescription = prefix.concat(firstDescription);
    return [firstDescription];
  },
  getTransferDescription(transfer) {
    var _a;
    let description = "";
    if (!transfer) {
      return description;
    }
    if (transfer == null ? void 0 : transfer.nft_info) {
      description = ((_a = transfer == null ? void 0 : transfer.nft_info) == null ? void 0 : _a.name) || "-";
    } else if (transfer == null ? void 0 : transfer.fungible_info) {
      description = this.getFungibleTransferDescription(transfer) || "-";
    }
    return description;
  },
  getFungibleTransferDescription(transfer) {
    var _a;
    if (!transfer) {
      return null;
    }
    const quantity = this.getQuantityFixedValue(transfer == null ? void 0 : transfer.quantity.numeric);
    const description = [quantity, (_a = transfer == null ? void 0 : transfer.fungible_info) == null ? void 0 : _a.symbol].join(" ").trim();
    return description;
  },
  mergeTransfers(transfers) {
    if ((transfers == null ? void 0 : transfers.length) <= 1) {
      return transfers;
    }
    const filteredTransfers = this.filterGasFeeTransfers(transfers);
    const mergedTransfers = filteredTransfers.reduce((acc, t) => {
      var _a;
      const name = (_a = t == null ? void 0 : t.fungible_info) == null ? void 0 : _a.name;
      const existingTransfer = acc.find(({ fungible_info, direction }) => name && name === (fungible_info == null ? void 0 : fungible_info.name) && direction === t.direction);
      if (existingTransfer) {
        const quantity = Number(existingTransfer.quantity.numeric) + Number(t.quantity.numeric);
        existingTransfer.quantity.numeric = quantity.toString();
        existingTransfer.value = (existingTransfer.value || 0) + (t.value || 0);
      } else {
        acc.push(t);
      }
      return acc;
    }, []);
    let finalTransfers = mergedTransfers;
    if (mergedTransfers.length > 2) {
      finalTransfers = mergedTransfers.sort((a, b2) => (b2.value || 0) - (a.value || 0)).slice(0, 2);
    }
    finalTransfers = finalTransfers.sort((a, b2) => {
      if (a.direction === "out" && b2.direction === "in") {
        return -1;
      }
      if (a.direction === "in" && b2.direction === "out") {
        return 1;
      }
      return 0;
    });
    return finalTransfers;
  },
  filterGasFeeTransfers(transfers) {
    const tokenGroups = transfers == null ? void 0 : transfers.reduce((groups, transfer) => {
      var _a;
      const tokenName = (_a = transfer == null ? void 0 : transfer.fungible_info) == null ? void 0 : _a.name;
      if (tokenName) {
        if (!groups[tokenName]) {
          groups[tokenName] = [];
        }
        groups[tokenName].push(transfer);
      }
      return groups;
    }, {});
    const filteredTransfers = [];
    Object.values(tokenGroups ?? {}).forEach((tokenTransfers) => {
      if (tokenTransfers.length === 1) {
        const firstTransfer = tokenTransfers[0];
        if (firstTransfer) {
          filteredTransfers.push(firstTransfer);
        }
      } else {
        const inTransfers = tokenTransfers.filter((t) => t.direction === "in");
        const outTransfers = tokenTransfers.filter((t) => t.direction === "out");
        if (inTransfers.length === 1 && outTransfers.length === 1) {
          const inTransfer = inTransfers[0];
          const outTransfer = outTransfers[0];
          let didApplyGasFeeFilter = false;
          if (inTransfer && outTransfer) {
            const inAmount = Number(inTransfer.quantity.numeric);
            const outAmount = Number(outTransfer.quantity.numeric);
            if (outAmount < inAmount * GAS_FEE_THRESHOLD) {
              filteredTransfers.push(inTransfer);
              didApplyGasFeeFilter = true;
            } else if (inAmount < outAmount * GAS_FEE_THRESHOLD) {
              filteredTransfers.push(outTransfer);
              didApplyGasFeeFilter = true;
            }
          }
          if (!didApplyGasFeeFilter) {
            filteredTransfers.push(...tokenTransfers);
          }
        } else {
          const significantTransfers = this.filterGasFeesFromTokenGroup(tokenTransfers);
          filteredTransfers.push(...significantTransfers);
        }
      }
    });
    transfers == null ? void 0 : transfers.forEach((transfer) => {
      var _a;
      if (!((_a = transfer == null ? void 0 : transfer.fungible_info) == null ? void 0 : _a.name)) {
        filteredTransfers.push(transfer);
      }
    });
    return filteredTransfers;
  },
  filterGasFeesFromTokenGroup(tokenTransfers) {
    if (tokenTransfers.length <= 1) {
      return tokenTransfers;
    }
    const amounts = tokenTransfers == null ? void 0 : tokenTransfers.map((t) => Number(t.quantity.numeric));
    const maxAmount = Math.max(...amounts);
    const minAmount = Math.min(...amounts);
    const extremeGasThreshold = 0.01;
    if (minAmount < maxAmount * extremeGasThreshold) {
      const filtered = tokenTransfers == null ? void 0 : tokenTransfers.filter((t) => {
        const amount = Number(t.quantity.numeric);
        return amount >= maxAmount * extremeGasThreshold;
      });
      return filtered;
    }
    const inTransfers = tokenTransfers == null ? void 0 : tokenTransfers.filter((t) => t.direction === "in");
    const outTransfers = tokenTransfers == null ? void 0 : tokenTransfers.filter((t) => t.direction === "out");
    if (inTransfers.length === 1 && outTransfers.length === 1) {
      const inTransfer = inTransfers[0];
      const outTransfer = outTransfers[0];
      if (inTransfer && outTransfer) {
        const inAmount = Number(inTransfer.quantity.numeric);
        const outAmount = Number(outTransfer.quantity.numeric);
        if (outAmount < inAmount * GAS_FEE_THRESHOLD) {
          return [inTransfer];
        } else if (inAmount < outAmount * GAS_FEE_THRESHOLD) {
          return [outTransfer];
        }
      }
    }
    return tokenTransfers;
  },
  getQuantityFixedValue(value) {
    if (!value) {
      return null;
    }
    const parsedValue = parseFloat(value);
    return parsedValue.toFixed(FLOAT_FIXED_VALUE);
  }
};
var TransactionTypePastTense;
(function(TransactionTypePastTense2) {
  TransactionTypePastTense2["approve"] = "approved";
  TransactionTypePastTense2["bought"] = "bought";
  TransactionTypePastTense2["borrow"] = "borrowed";
  TransactionTypePastTense2["burn"] = "burnt";
  TransactionTypePastTense2["cancel"] = "canceled";
  TransactionTypePastTense2["claim"] = "claimed";
  TransactionTypePastTense2["deploy"] = "deployed";
  TransactionTypePastTense2["deposit"] = "deposited";
  TransactionTypePastTense2["execute"] = "executed";
  TransactionTypePastTense2["mint"] = "minted";
  TransactionTypePastTense2["receive"] = "received";
  TransactionTypePastTense2["repay"] = "repaid";
  TransactionTypePastTense2["send"] = "sent";
  TransactionTypePastTense2["sell"] = "sold";
  TransactionTypePastTense2["stake"] = "staked";
  TransactionTypePastTense2["trade"] = "swapped";
  TransactionTypePastTense2["unstake"] = "unstaked";
  TransactionTypePastTense2["withdraw"] = "withdrawn";
})(TransactionTypePastTense || (TransactionTypePastTense = {}));
const styles$4 = css`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.core.glass010};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  :host([data-no-images='true']) > wui-flex {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[3]} !important;
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }

  .swap-fallback-container {
    position: absolute;
    inset: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swap-fallback-container.first {
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-fallback-container.last {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }

  wui-flex.status-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
    border-radius: ${({ borderRadius }) => borderRadius[4]};
    background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.theme.backgroundPrimary};
    overflow: hidden;
    width: 16px;
    height: 16px;
  }
`;
var __decorate$4 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTransactionVisual = class WuiTransactionVisual2 extends i {
  constructor() {
    super(...arguments);
    this.images = [];
    this.secondImage = {
      type: void 0,
      url: ""
    };
    this.failedImageUrls = /* @__PURE__ */ new Set();
  }
  handleImageError(url) {
    return (event) => {
      event.stopPropagation();
      this.failedImageUrls.add(url);
      this.requestUpdate();
    };
  }
  render() {
    const [firstImage, secondImage] = this.images;
    if (!this.images.length) {
      this.dataset["noImages"] = "true";
    }
    const isLeftNFT = (firstImage == null ? void 0 : firstImage.type) === "NFT";
    const isRightNFT = (secondImage == null ? void 0 : secondImage.url) ? secondImage.type === "NFT" : isLeftNFT;
    const leftRadius = isLeftNFT ? "var(--apkt-borderRadius-3)" : "var(--apkt-borderRadius-5)";
    const rightRadius = isRightNFT ? "var(--apkt-borderRadius-3)" : "var(--apkt-borderRadius-5)";
    this.style.cssText = `
    --local-left-border-radius: ${leftRadius};
    --local-right-border-radius: ${rightRadius};
    `;
    return b`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`;
  }
  templateVisual() {
    const [firstImage, secondImage] = this.images;
    const hasTwoImages = this.images.length === 2;
    if (hasTwoImages && ((firstImage == null ? void 0 : firstImage.url) || (secondImage == null ? void 0 : secondImage.url))) {
      return this.renderSwapImages(firstImage, secondImage);
    }
    if ((firstImage == null ? void 0 : firstImage.url) && !this.failedImageUrls.has(firstImage.url)) {
      return this.renderSingleImage(firstImage);
    }
    if ((firstImage == null ? void 0 : firstImage.type) === "NFT") {
      return this.renderPlaceholderIcon("nftPlaceholder");
    }
    return this.renderPlaceholderIcon("coinPlaceholder");
  }
  renderSwapImages(firstImage, secondImage) {
    return b`<div class="swap-images-container">
      ${(firstImage == null ? void 0 : firstImage.url) ? this.renderImageOrFallback(firstImage, "first", true) : null}
      ${(secondImage == null ? void 0 : secondImage.url) ? this.renderImageOrFallback(secondImage, "last", true) : null}
    </div>`;
  }
  renderSingleImage(image) {
    return this.renderImageOrFallback(image, void 0, false);
  }
  renderImageOrFallback(image, position, isInSwapContainer = false) {
    if (!image.url) {
      return null;
    }
    if (this.failedImageUrls.has(image.url)) {
      if (isInSwapContainer && position) {
        return this.renderFallbackIconInContainer(position);
      }
      return this.renderFallbackIcon();
    }
    return b`<wui-image
      src=${image.url}
      alt="Transaction image"
      @onLoadError=${this.handleImageError(image.url)}
    ></wui-image>`;
  }
  renderFallbackIconInContainer(position) {
    return b`<div class="swap-fallback-container ${position}">${this.renderFallbackIcon()}</div>`;
  }
  renderFallbackIcon() {
    return b`<wui-icon
      size="xl"
      weight="regular"
      color="default"
      name="networkPlaceholder"
    ></wui-icon>`;
  }
  renderPlaceholderIcon(iconName) {
    return b`<wui-icon size="xl" weight="regular" color="default" name=${iconName}></wui-icon>`;
  }
  templateIcon() {
    let color = "accent-primary";
    let icon = void 0;
    icon = this.getIcon();
    if (this.status) {
      color = this.getStatusColor();
    }
    if (!icon) {
      return null;
    }
    return b`
      <wui-flex alignItems="center" justifyContent="center" class="status-box">
        <wui-icon-box size="sm" color=${color} icon=${icon}></wui-icon-box>
      </wui-flex>
    `;
  }
  getDirectionIcon() {
    switch (this.direction) {
      case "in":
        return "arrowBottom";
      case "out":
        return "arrowTop";
      default:
        return void 0;
    }
  }
  getIcon() {
    if (this.onlyDirectionIcon) {
      return this.getDirectionIcon();
    }
    if (this.type === "trade") {
      return "swapHorizontal";
    } else if (this.type === "approve") {
      return "checkmark";
    } else if (this.type === "cancel") {
      return "close";
    }
    return this.getDirectionIcon();
  }
  getStatusColor() {
    switch (this.status) {
      case "confirmed":
        return "success";
      case "failed":
        return "error";
      case "pending":
        return "inverse";
      default:
        return "accent-primary";
    }
  }
};
WuiTransactionVisual.styles = [styles$4];
__decorate$4([
  n()
], WuiTransactionVisual.prototype, "type", void 0);
__decorate$4([
  n()
], WuiTransactionVisual.prototype, "status", void 0);
__decorate$4([
  n()
], WuiTransactionVisual.prototype, "direction", void 0);
__decorate$4([
  n({ type: Boolean })
], WuiTransactionVisual.prototype, "onlyDirectionIcon", void 0);
__decorate$4([
  n({ type: Array })
], WuiTransactionVisual.prototype, "images", void 0);
__decorate$4([
  n({ type: Object })
], WuiTransactionVisual.prototype, "secondImage", void 0);
__decorate$4([
  r()
], WuiTransactionVisual.prototype, "failedImageUrls", void 0);
WuiTransactionVisual = __decorate$4([
  customElement("wui-transaction-visual")
], WuiTransactionVisual);
const styles$3 = css`
  :host {
    width: 100%;
  }

  :host > wui-flex:first-child {
    align-items: center;
    column-gap: ${({ spacing }) => spacing[2]};
    padding: ${({ spacing }) => spacing[1]} ${({ spacing }) => spacing[2]};
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;
var __decorate$3 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTransactionListItem = class WuiTransactionListItem2 extends i {
  constructor() {
    super(...arguments);
    this.type = "approve";
    this.onlyDirectionIcon = false;
    this.images = [];
  }
  render() {
    return b`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${o(this.direction)}
          type=${this.type}
          .onlyDirectionIcon=${this.onlyDirectionIcon}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="lg-medium" color="primary">
            ${TransactionTypePastTense[this.type] || this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="sm-medium" color="secondary"><span>${this.date}</span></wui-text>
      </wui-flex>
    `;
  }
  templateDescription() {
    var _a;
    const description = (_a = this.descriptions) == null ? void 0 : _a[0];
    return description ? b`
          <wui-text variant="md-regular" color="secondary">
            <span>${description}</span>
          </wui-text>
        ` : null;
  }
  templateSecondDescription() {
    var _a;
    const description = (_a = this.descriptions) == null ? void 0 : _a[1];
    return description ? b`
          <wui-icon class="description-separator-icon" size="sm" name="arrowRight"></wui-icon>
          <wui-text variant="md-regular" color="secondary">
            <span>${description}</span>
          </wui-text>
        ` : null;
  }
};
WuiTransactionListItem.styles = [resetStyles, styles$3];
__decorate$3([
  n()
], WuiTransactionListItem.prototype, "type", void 0);
__decorate$3([
  n({ type: Array })
], WuiTransactionListItem.prototype, "descriptions", void 0);
__decorate$3([
  n()
], WuiTransactionListItem.prototype, "date", void 0);
__decorate$3([
  n({ type: Boolean })
], WuiTransactionListItem.prototype, "onlyDirectionIcon", void 0);
__decorate$3([
  n()
], WuiTransactionListItem.prototype, "status", void 0);
__decorate$3([
  n()
], WuiTransactionListItem.prototype, "direction", void 0);
__decorate$3([
  n({ type: Array })
], WuiTransactionListItem.prototype, "images", void 0);
WuiTransactionListItem = __decorate$3([
  customElement("wui-transaction-list-item")
], WuiTransactionListItem);
const styles$2 = css`
  wui-flex {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  wui-image {
    border-radius: ${({ borderRadius }) => borderRadius[128]};
  }

  .fallback-icon {
    color: ${({ tokens }) => tokens.theme.iconInverse};
    border-radius: ${({ borderRadius }) => borderRadius[3]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .direction-icon,
  .status-image {
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: ${({ borderRadius }) => borderRadius[128]};
    border: 2px solid ${({ tokens }) => tokens.theme.backgroundPrimary};
  }

  .direction-icon {
    padding: ${({ spacing }) => spacing["01"]};
    color: ${({ tokens }) => tokens.core.iconSuccess};

    background-color: color-mix(
      in srgb,
      ${({ tokens }) => tokens.core.textSuccess} 30%,
      ${({ tokens }) => tokens.theme.backgroundPrimary} 70%
    );
  }

  /* -- Sizes --------------------------------------------------- */
  :host([data-size='sm']) > wui-image:not(.status-image),
  :host([data-size='sm']) > wui-flex {
    width: 24px;
    height: 24px;
  }

  :host([data-size='lg']) > wui-image:not(.status-image),
  :host([data-size='lg']) > wui-flex {
    width: 40px;
    height: 40px;
  }

  :host([data-size='sm']) .fallback-icon {
    height: 16px;
    width: 16px;
    padding: ${({ spacing }) => spacing[1]};
  }

  :host([data-size='lg']) .fallback-icon {
    height: 32px;
    width: 32px;
    padding: ${({ spacing }) => spacing[1]};
  }

  :host([data-size='sm']) .direction-icon,
  :host([data-size='sm']) .status-image {
    transform: translate(40%, 30%);
  }

  :host([data-size='lg']) .direction-icon,
  :host([data-size='lg']) .status-image {
    transform: translate(40%, 10%);
  }

  :host([data-size='sm']) .status-image {
    height: 14px;
    width: 14px;
  }

  :host([data-size='lg']) .status-image {
    height: 20px;
    width: 20px;
  }

  /* -- Crop effects --------------------------------------------------- */
  .swap-crop-left-image,
  .swap-crop-right-image {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .swap-crop-left-image {
    left: 0;
    clip-path: inset(0px calc(50% + 1.5px) 0px 0%);
  }

  .swap-crop-right-image {
    right: 0;
    clip-path: inset(0px 0px 0px calc(50% + 1.5px));
  }
`;
var __decorate$2 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const ICON_SIZE = {
  sm: "xxs",
  lg: "md"
};
let WuiTransactionThumbnail = class WuiTransactionThumbnail2 extends i {
  constructor() {
    super(...arguments);
    this.type = "approve";
    this.size = "lg";
    this.statusImageUrl = "";
    this.images = [];
  }
  render() {
    return b`<wui-flex>${this.templateVisual()} ${this.templateIcon()}</wui-flex>`;
  }
  templateVisual() {
    this.dataset["size"] = this.size;
    switch (this.type) {
      case "trade":
        return this.swapTemplate();
      case "fiat":
        return this.fiatTemplate();
      case "unknown":
        return this.unknownTemplate();
      default:
        return this.tokenTemplate();
    }
  }
  swapTemplate() {
    const [firstImageUrl, secondImageUrl] = this.images;
    const twoImages = this.images.length === 2 && (firstImageUrl || secondImageUrl);
    if (twoImages) {
      return b`
        <wui-image class="swap-crop-left-image" src=${firstImageUrl} alt="Swap image"></wui-image>
        <wui-image class="swap-crop-right-image" src=${secondImageUrl} alt="Swap image"></wui-image>
      `;
    }
    if (firstImageUrl) {
      return b`<wui-image src=${firstImageUrl} alt="Swap image"></wui-image>`;
    }
    return null;
  }
  fiatTemplate() {
    return b`<wui-icon
      class="fallback-icon"
      size=${ICON_SIZE[this.size]}
      name="dollar"
    ></wui-icon>`;
  }
  unknownTemplate() {
    return b`<wui-icon
      class="fallback-icon"
      size=${ICON_SIZE[this.size]}
      name="questionMark"
    ></wui-icon>`;
  }
  tokenTemplate() {
    const [imageUrl] = this.images;
    if (imageUrl) {
      return b`<wui-image src=${imageUrl} alt="Token image"></wui-image> `;
    }
    return b`<wui-icon
      class="fallback-icon"
      name=${this.type === "nft" ? "image" : "coinPlaceholder"}
    ></wui-icon>`;
  }
  templateIcon() {
    if (this.statusImageUrl) {
      return b`<wui-image
        class="status-image"
        src=${this.statusImageUrl}
        alt="Status image"
      ></wui-image>`;
    }
    return b`<wui-icon
      class="direction-icon"
      size=${ICON_SIZE[this.size]}
      name=${this.getTemplateIcon()}
    ></wui-icon>`;
  }
  getTemplateIcon() {
    if (this.type === "trade") {
      return "arrowClockWise";
    }
    return "arrowBottom";
  }
};
WuiTransactionThumbnail.styles = [styles$2];
__decorate$2([
  n()
], WuiTransactionThumbnail.prototype, "type", void 0);
__decorate$2([
  n()
], WuiTransactionThumbnail.prototype, "size", void 0);
__decorate$2([
  n()
], WuiTransactionThumbnail.prototype, "statusImageUrl", void 0);
__decorate$2([
  n({ type: Array })
], WuiTransactionThumbnail.prototype, "images", void 0);
WuiTransactionThumbnail = __decorate$2([
  customElement("wui-transaction-thumbnail")
], WuiTransactionThumbnail);
const styles$1 = css`
  :host > wui-flex:first-child {
    gap: ${({ spacing }) => spacing[2]};
    padding: ${({ spacing }) => spacing[3]};
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;
var __decorate$1 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTransactionListItemLoader = class WuiTransactionListItemLoader2 extends i {
  render() {
    return b`
      <wui-flex alignItems="center" .padding=${["1", "2", "1", "2"]}>
        <wui-shimmer width="40px" height="40px" rounded></wui-shimmer>
        <wui-flex flexDirection="column" gap="1">
          <wui-shimmer width="124px" height="16px" rounded></wui-shimmer>
          <wui-shimmer width="60px" height="14px" rounded></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" rounded></wui-shimmer>
      </wui-flex>
    `;
  }
};
WuiTransactionListItemLoader.styles = [resetStyles, styles$1];
WuiTransactionListItemLoader = __decorate$1([
  customElement("wui-transaction-list-item-loader")
], WuiTransactionListItemLoader);
const styles = css`
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: ${({ spacing }) => spacing["3"]};
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

  .emptyContainer {
    height: 100%;
  }
`;
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PAGINATOR_ID = "last-transaction";
const LOADING_ITEM_COUNT = 7;
let W3mActivityList = class W3mActivityList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.paginationObserver = void 0;
    this.page = "activity";
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.transactionsByYear = TransactionsController.state.transactionsByYear;
    this.loading = TransactionsController.state.loading;
    this.empty = TransactionsController.state.empty;
    this.next = TransactionsController.state.next;
    TransactionsController.clearCursor();
    this.unsubscribe.push(...[
      ChainController.subscribeKey("activeCaipAddress", (val) => {
        if (val) {
          if (this.caipAddress !== val) {
            TransactionsController.resetTransactions();
            TransactionsController.fetchTransactions(val);
          }
        }
        this.caipAddress = val;
      }),
      ChainController.subscribeKey("activeCaipNetwork", () => {
        this.updateTransactionView();
      }),
      TransactionsController.subscribe((val) => {
        this.transactionsByYear = val.transactionsByYear;
        this.loading = val.loading;
        this.empty = val.empty;
        this.next = val.next;
      })
    ]);
  }
  firstUpdated() {
    this.updateTransactionView();
    this.createPaginationObserver();
  }
  updated() {
    this.setPaginationObserver();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return b` ${this.empty ? null : this.templateTransactionsByYear()}
    ${this.loading ? this.templateLoading() : null}
    ${!this.loading && this.empty ? this.templateEmpty() : null}`;
  }
  updateTransactionView() {
    TransactionsController.resetTransactions();
    if (this.caipAddress) {
      TransactionsController.fetchTransactions(CoreHelperUtil.getPlainAddress(this.caipAddress));
    }
  }
  templateTransactionsByYear() {
    const sortedYearKeys = Object.keys(this.transactionsByYear).sort().reverse();
    return sortedYearKeys.map((year) => {
      const yearInt = parseInt(year, 10);
      const sortedMonthIndexes = new Array(12).fill(null).map((_, idx) => {
        var _a;
        const groupTitle = TransactionUtil.getTransactionGroupTitle(yearInt, idx);
        const transactions = (_a = this.transactionsByYear[yearInt]) == null ? void 0 : _a[idx];
        return {
          groupTitle,
          transactions
        };
      }).filter(({ transactions }) => transactions).reverse();
      return sortedMonthIndexes.map(({ groupTitle, transactions }, index) => {
        const isLastGroup = index === sortedMonthIndexes.length - 1;
        if (!transactions) {
          return null;
        }
        return b`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${isLastGroup ? "true" : "false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["2", "3", "3", "3"]}
            >
              <wui-text variant="md-medium" color="secondary" data-testid="group-title">
                ${groupTitle}
              </wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="2">
              ${this.templateTransactions(transactions, isLastGroup)}
            </wui-flex>
          </wui-flex>
        `;
      });
    });
  }
  templateRenderTransaction(transaction, isLastTransaction) {
    const { date, descriptions, direction, images, status, type, transfers, isAllNFT } = this.getTransactionListItemProps(transaction);
    return b`
      <wui-transaction-list-item
        date=${date}
        .direction=${direction}
        id=${isLastTransaction && this.next ? PAGINATOR_ID : ""}
        status=${status}
        type=${type}
        .images=${images}
        .onlyDirectionIcon=${isAllNFT || transfers.length === 1}
        .descriptions=${descriptions}
      ></wui-transaction-list-item>
    `;
  }
  templateTransactions(transactions, isLastGroup) {
    return transactions.map((transaction, index) => {
      const isLastTransaction = isLastGroup && index === transactions.length - 1;
      return b`${this.templateRenderTransaction(transaction, isLastTransaction)}`;
    });
  }
  emptyStateActivity() {
    return b`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${["10", "5", "10", "5"]}
      gap="5"
      data-testid="empty-activity-state"
    >
      <wui-icon-box color="default" icon="wallet" size="xl"></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="2">
        <wui-text align="center" variant="lg-medium" color="primary">No Transactions yet</wui-text>
        <wui-text align="center" variant="lg-regular" color="secondary"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`;
  }
  emptyStateAccount() {
    return b`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="4"
      data-testid="empty-account-state"
    >
      <wui-icon-box icon="swapHorizontal" size="lg" color="default"></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="2"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="md-regular" align="center" color="primary">No activity yet</wui-text>
        <wui-text variant="sm-regular" align="center" color="secondary"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`;
  }
  templateEmpty() {
    if (this.page === "account") {
      return b`${this.emptyStateAccount()}`;
    }
    return b`${this.emptyStateActivity()}`;
  }
  templateLoading() {
    if (this.page === "activity") {
      return b` <wui-flex flexDirection="column" width="100%">
        <wui-flex .padding=${["2", "3", "3", "3"]}>
          <wui-shimmer width="70px" height="16px" rounded></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2" width="100%">
          ${Array(LOADING_ITEM_COUNT).fill(b` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map((item) => item)}
        </wui-flex>
      </wui-flex>`;
    }
    return null;
  }
  onReceiveClick() {
    RouterController.push("WalletReceive");
  }
  createPaginationObserver() {
    const { projectId } = OptionsController.state;
    this.paginationObserver = new IntersectionObserver(([element]) => {
      if ((element == null ? void 0 : element.isIntersecting) && !this.loading) {
        TransactionsController.fetchTransactions(CoreHelperUtil.getPlainAddress(this.caipAddress));
        EventsController.sendEvent({
          type: "track",
          event: "LOAD_MORE_TRANSACTIONS",
          properties: {
            address: CoreHelperUtil.getPlainAddress(this.caipAddress),
            projectId,
            cursor: this.next,
            isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
          }
        });
      }
    }, {});
    this.setPaginationObserver();
  }
  setPaginationObserver() {
    var _a, _b, _c;
    (_a = this.paginationObserver) == null ? void 0 : _a.disconnect();
    const lastItem = (_b = this.shadowRoot) == null ? void 0 : _b.querySelector(`#${PAGINATOR_ID}`);
    if (lastItem) {
      (_c = this.paginationObserver) == null ? void 0 : _c.observe(lastItem);
    }
  }
  getTransactionListItemProps(transaction) {
    var _a, _b, _c;
    const date = DateUtil.formatDate((_a = transaction == null ? void 0 : transaction.metadata) == null ? void 0 : _a.minedAt);
    const transfers = TransactionUtil.mergeTransfers((transaction == null ? void 0 : transaction.transfers) || []);
    const descriptions = TransactionUtil.getTransactionDescriptions(transaction, transfers);
    const transfer = transfers == null ? void 0 : transfers[0];
    const isAllNFT = Boolean(transfer) && (transfers == null ? void 0 : transfers.every((item) => Boolean(item.nft_info)));
    const images = TransactionUtil.getTransactionImages(transfers);
    return {
      date,
      direction: transfer == null ? void 0 : transfer.direction,
      descriptions,
      isAllNFT,
      images,
      status: (_b = transaction.metadata) == null ? void 0 : _b.status,
      transfers,
      type: (_c = transaction.metadata) == null ? void 0 : _c.operationType
    };
  }
};
W3mActivityList.styles = styles;
__decorate([
  n()
], W3mActivityList.prototype, "page", void 0);
__decorate([
  r()
], W3mActivityList.prototype, "caipAddress", void 0);
__decorate([
  r()
], W3mActivityList.prototype, "transactionsByYear", void 0);
__decorate([
  r()
], W3mActivityList.prototype, "loading", void 0);
__decorate([
  r()
], W3mActivityList.prototype, "empty", void 0);
__decorate([
  r()
], W3mActivityList.prototype, "next", void 0);
W3mActivityList = __decorate([
  customElement("w3m-activity-list")
], W3mActivityList);
//# sourceMappingURL=index-CvTO1LmI.js.map
