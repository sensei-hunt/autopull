import { aX as bases, aY as getWindowMetadata_1, aZ as cjs, K as global, j as process$1, a_ as getDocument_1, a$ as C$4, b0 as getNavigator_1, b1 as detect, b2 as getLocation_1, a1 as Buffer, b3 as sn$2, $ as bs58, aJ as getDefaultExportFromCjs, b4 as safeJsonStringify, b5 as IEvents, b6 as events, b7 as i$2, b8 as h$2, b9 as formatJsonRpcRequest, ba as r, bb as o, bc as f$4, bd as isJsonRpcRequest, be as isJsonRpcResponse, bf as formatJsonRpcResult, bg as Nt$2, bh as Po$1, bi as Qe$3, bj as Qo, bk as safeJsonParse, bl as getBigIntRpcId, bm as formatJsonRpcError, bn as isJsonRpcResult, bo as isJsonRpcError, bp as payloadId, bq as f$5 } from "./appkit-DOrUN3iw.js";
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
const version = "2.23.2";
let errorConfig = {
  getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
  version: `viem@${version}`
};
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    var _a;
    const details = (() => {
      var _a2;
      if (args.cause instanceof BaseError)
        return args.cause.details;
      if ((_a2 = args.cause) == null ? void 0 : _a2.message)
        return args.cause.message;
      return args.details;
    })();
    const docsPath = (() => {
      if (args.cause instanceof BaseError)
        return args.cause.docsPath || args.docsPath;
      return args.docsPath;
    })();
    const docsUrl = (_a = errorConfig.getDocsUrl) == null ? void 0 : _a.call(errorConfig, { ...args, docsPath });
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsUrl ? [`Docs: ${docsUrl}`] : [],
      ...details ? [`Details: ${details}`] : [],
      ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
    ].join("\n");
    super(message, args.cause ? { cause: args.cause } : void 0);
    Object.defineProperty(this, "details", {
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
    Object.defineProperty(this, "metaMessages", {
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
    Object.defineProperty(this, "version", {
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
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.name = args.name ?? this.name;
    this.shortMessage = shortMessage;
    this.version = version;
  }
  walk(fn2) {
    return walk(this, fn2);
  }
}
function walk(err, fn2) {
  if (fn2 == null ? void 0 : fn2(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn2);
  return fn2 ? null : err;
}
class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
  }
}
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i2 = 0; i2 < size2; i2++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i2 : size2 - i2 - 1] = bytes[padEnd ? i2 : bytes.length - i2 - 1];
  }
  return paddedBytes;
}
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
  }
}
class SizeOverflowError extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
  }
}
function assertSize(hexOrBytes, { size: size$1 }) {
  if (size(hexOrBytes) > size$1)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size$1
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size2) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i2) => i2.toString(16).padStart(2, "0"));
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string2 = "";
  for (let i2 = 0; i2 < value.length; i2++) {
    string2 += hexes[value[i2]];
  }
  const hex = `0x${string2}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
const encoder$1 = /* @__PURE__ */ new TextEncoder();
function stringToHex(value_, opts = {}) {
  const value = encoder$1.encode(value_);
  return bytesToHex(value, opts);
}
const encoder = /* @__PURE__ */ new TextEncoder();
function toBytes$1(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
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
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
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
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
function anumber(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error("positive integer expected, got " + n2);
}
function isBytes(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function abytes(b2, ...lengths) {
  if (!isBytes(b2))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b2.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b2.length);
}
function ahash(h3) {
  if (typeof h3 !== "function" || typeof h3.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  anumber(h3.outputLen);
  anumber(h3.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n2, le2 = false) {
  if (le2)
    return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
  return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
}
function split(lst, le2 = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i2 = 0; i2 < lst.length; i2++) {
    const { h: h3, l: l2 } = fromBig(lst[i2], le2);
    [Ah[i2], Al[i2]] = [h3, l2];
  }
  return [Ah, Al];
}
const rotlSH = (h3, l2, s) => h3 << s | l2 >>> 32 - s;
const rotlSL = (h3, l2, s) => l2 << s | h3 >>> 32 - s;
const rotlBH = (h3, l2, s) => l2 << s - 32 | h3 >>> 64 - s;
const rotlBL = (h3, l2, s) => h3 << s - 32 | l2 >>> 64 - s;
const crypto$1 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i2 = 0; i2 < arr.length; i2++) {
    arr[i2] = byteSwap(arr[i2]);
  }
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("utf8ToBytes expected string, got " + typeof str);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i2 = 0; i2 < arrays.length; i2++) {
    const a2 = arrays[i2];
    abytes(a2);
    sum += a2.length;
  }
  const res = new Uint8Array(sum);
  for (let i2 = 0, pad2 = 0; i2 < arrays.length; i2++) {
    const a2 = arrays[i2];
    res.set(a2, pad2);
    pad2 += a2.length;
  }
  return res;
}
class Hash {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto$1 && typeof crypto$1.getRandomValues === "function") {
    return crypto$1.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto$1 && typeof crypto$1.randomBytes === "function") {
    return crypto$1.randomBytes(bytesLength);
  }
  throw new Error("crypto.getRandomValues must be defined");
}
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R3 = _1n, x2 = 1, y3 = 0; round < 24; round++) {
  [x2, y3] = [y3, (2 * x2 + 3 * y3) % 5];
  SHA3_PI.push(2 * (5 * y3 + x2));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j2 = 0; j2 < 7; j2++) {
    R3 = (R3 << _1n ^ (R3 >> _7n) * _0x71n) % _256n;
    if (R3 & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j2)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
const rotlH = (h3, l2, s) => s > 32 ? rotlBH(h3, l2, s) : rotlSH(h3, l2, s);
const rotlL = (h3, l2, s) => s > 32 ? rotlBL(h3, l2, s) : rotlSL(h3, l2, s);
function keccakP(s, rounds = 24) {
  const B4 = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x2 = 0; x2 < 10; x2++)
      B4[x2] = s[x2] ^ s[x2 + 10] ^ s[x2 + 20] ^ s[x2 + 30] ^ s[x2 + 40];
    for (let x2 = 0; x2 < 10; x2 += 2) {
      const idx1 = (x2 + 8) % 10;
      const idx0 = (x2 + 2) % 10;
      const B0 = B4[idx0];
      const B1 = B4[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B4[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B4[idx1 + 1];
      for (let y3 = 0; y3 < 50; y3 += 10) {
        s[x2 + y3] ^= Th;
        s[x2 + y3 + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y3 = 0; y3 < 50; y3 += 10) {
      for (let x2 = 0; x2 < 10; x2++)
        B4[x2] = s[y3 + x2];
      for (let x2 = 0; x2 < 10; x2++)
        s[y3 + x2] ^= ~B4[(x2 + 2) % 10] & B4[(x2 + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B4.fill(0);
}
class Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    anumber(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    if (!isLE)
      byteSwap32(this.state32);
    keccakP(this.state32, this.rounds);
    if (!isLE)
      byteSwap32(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i2 = 0; i2 < take; i2++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to2) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to2 || (to2 = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to2.state32.set(this.state32);
    to2.pos = this.pos;
    to2.posOut = this.posOut;
    to2.finished = this.finished;
    to2.rounds = rounds;
    to2.suffix = suffix;
    to2.outputLen = outputLen;
    to2.enableXOF = enableXOF;
    to2.destroyed = this.destroyed;
    return to2;
  }
}
const gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
const keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
function keccak256(value, to_) {
  const to2 = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes$1(value) : value);
  if (to2 === "bytes")
    return bytes;
  return toHex(bytes);
}
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
}
const checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = hexAddress.split("");
  for (let i2 = 0; i2 < 40; i2 += 2) {
    if (hash[i2 >> 1] >> 4 >= 8 && address[i2]) {
      address[i2] = address[i2].toUpperCase();
    }
    if ((hash[i2 >> 1] & 15) >= 8 && address[i2 + 1]) {
      address[i2 + 1] = address[i2 + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1 } = await import("./secp256k1-BI_rjtKV.js");
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r: r2, s, v: v2, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v2);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k1.Signature(hexToBigInt(r2), hexToBigInt(s)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k1.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}
function allocUnsafe(size2 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size2);
  }
  return new Uint8Array(size2);
}
function concat(arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
function createCodec(name, prefix, encode, decode) {
  return {
    name,
    prefix,
    encoder: {
      name,
      prefix,
      encode
    },
    decoder: { decode }
  };
}
const string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder2 = new TextEncoder();
  return encoder2.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i2 = 0; i2 < buf.length; i2++) {
    string2 += String.fromCharCode(buf[i2]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i2 = 0; i2 < str.length; i2++) {
    buf[i2] = str.charCodeAt(i2);
  }
  return buf;
});
const BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
function fromString(string2, encoding = "utf8") {
  const base = BASES[encoding];
  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base.decoder.decode(`${base.prefix}${string2}`);
}
function toString(array, encoding = "utf8") {
  const base = BASES[encoding];
  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base.encoder.encode(array).substring(1);
}
const ae$2 = ":";
function Ne$1(t) {
  const [e, n2] = t.split(ae$2);
  return { namespace: e, reference: n2 };
}
function Ko$1(t, e = []) {
  const n2 = [];
  return Object.keys(t).forEach((r2) => {
    if (e.length && !e.includes(r2)) return;
    const o2 = t[r2];
    n2.push(...o2.accounts);
  }), n2;
}
function ue$2(t, e) {
  return t.includes(":") ? [t] : e.chains || [];
}
var Zo = Object.defineProperty, Yo$1 = Object.defineProperties, Go$1 = Object.getOwnPropertyDescriptors, Tn$1 = Object.getOwnPropertySymbols, Wo$1 = Object.prototype.hasOwnProperty, Xo$1 = Object.prototype.propertyIsEnumerable, Rn$1 = (t, e, n2) => e in t ? Zo(t, e, { enumerable: true, configurable: true, writable: true, value: n2 }) : t[e] = n2, _n$1 = (t, e) => {
  for (var n2 in e || (e = {})) Wo$1.call(e, n2) && Rn$1(t, n2, e[n2]);
  if (Tn$1) for (var n2 of Tn$1(e)) Xo$1.call(e, n2) && Rn$1(t, n2, e[n2]);
  return t;
}, Jo$1 = (t, e) => Yo$1(t, Go$1(e));
const $n$1 = "ReactNative", Y$3 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, jn$1 = "js";
function _e$3() {
  return typeof process$1 < "u" && typeof process$1.versions < "u" && typeof process$1.versions.node < "u";
}
function pt$2() {
  return !getDocument_1() && !!getNavigator_1() && navigator.product === $n$1;
}
function ei$1() {
  return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function ni$1() {
  return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Tt$2() {
  return !_e$3() && !!getNavigator_1() && !!getDocument_1();
}
function xt$2() {
  return pt$2() ? Y$3.reactNative : _e$3() ? Y$3.node : Tt$2() ? Y$3.browser : Y$3.unknown;
}
function ri$1() {
  var t;
  try {
    return pt$2() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (t = global.Application) == null ? void 0 : t.applicationId : void 0;
  } catch {
    return;
  }
}
function Cn$1(t, e) {
  const n2 = new URLSearchParams(t);
  for (const r2 of Object.keys(e).sort()) if (e.hasOwnProperty(r2)) {
    const o2 = e[r2];
    o2 !== void 0 && n2.set(r2, o2);
  }
  return n2.toString();
}
function oi$1(t) {
  var e, n2;
  const r2 = Pn$1();
  try {
    return t != null && t.url && r2.url && new URL(t.url).host !== new URL(r2.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${r2.url}. This is probably unintended and can lead to issues.`), t.url = r2.url), (e = t == null ? void 0 : t.icons) != null && e.length && t.icons.length > 0 && (t.icons = t.icons.filter((o2) => o2 !== "")), Jo$1(_n$1(_n$1({}, r2), t), { url: (t == null ? void 0 : t.url) || r2.url, name: (t == null ? void 0 : t.name) || r2.name, description: (t == null ? void 0 : t.description) || r2.description, icons: (n2 = t == null ? void 0 : t.icons) != null && n2.length && t.icons.length > 0 ? t.icons : r2.icons });
  } catch (o2) {
    return console.warn("Error populating app metadata", o2), t || r2;
  }
}
function Pn$1() {
  return getWindowMetadata_1() || { name: "", description: "", url: "", icons: [""] };
}
function kn$1() {
  if (xt$2() === Y$3.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n2, Version: r2 } = global.Platform;
    return [n2, r2].join("-");
  }
  const t = detect();
  if (t === null) return "unknown";
  const e = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
  return t.type === "browser" ? [e, t.name, t.version].join("-") : [e, t.version].join("-");
}
function Vn$1() {
  var t;
  const e = xt$2();
  return e === Y$3.browser ? [e, ((t = getLocation_1()) == null ? void 0 : t.host) || "unknown"].join(":") : e;
}
function Mn$1(t, e, n2) {
  const r2 = kn$1(), o2 = Vn$1();
  return [[t, e].join("-"), [jn$1, n2].join("-"), r2, o2].join("/");
}
function si$1({ protocol: t, version: e, relayUrl: n2, sdkVersion: r2, auth: o2, projectId: i2, useOnCloseEvent: s, bundleId: c2, packageName: a2 }) {
  const u2 = n2.split("?"), l2 = Mn$1(t, e, r2), f3 = { auth: o2, ua: l2, projectId: i2, useOnCloseEvent: s, packageName: a2 || void 0, bundleId: c2 || void 0 }, h3 = Cn$1(u2[1] || "", f3);
  return u2[0] + "?" + h3;
}
function gt$2(t, e) {
  return t.filter((n2) => e.includes(n2)).length === t.length;
}
function fi$1(t) {
  return Object.fromEntries(t.entries());
}
function li$1(t) {
  return new Map(Object.entries(t));
}
function gi$1(t = cjs.FIVE_MINUTES, e) {
  const n2 = cjs.toMiliseconds(t || cjs.FIVE_MINUTES);
  let r2, o2, i2, s;
  return { resolve: (c2) => {
    i2 && r2 && (clearTimeout(i2), r2(c2), s = Promise.resolve(c2));
  }, reject: (c2) => {
    i2 && o2 && (clearTimeout(i2), o2(c2));
  }, done: () => new Promise((c2, a2) => {
    if (s) return c2(s);
    i2 = setTimeout(() => {
      const u2 = new Error(e);
      s = Promise.reject(u2), a2(u2);
    }, n2), r2 = c2, o2 = a2;
  }) };
}
function yi$1(t, e, n2) {
  return new Promise(async (r2, o2) => {
    const i2 = setTimeout(() => o2(new Error(n2)), e);
    try {
      const s = await t;
      r2(s);
    } catch (s) {
      o2(s);
    }
    clearTimeout(i2);
  });
}
function $e$2(t, e) {
  if (typeof e == "string" && e.startsWith(`${t}:`)) return e;
  if (t.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (t.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${t}`);
}
function mi$1(t) {
  return $e$2("topic", t);
}
function wi$1(t) {
  return $e$2("id", t);
}
function bi$1(t) {
  const [e, n2] = t.split(":"), r2 = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof n2 == "string") r2.topic = n2;
  else if (e === "id" && Number.isInteger(Number(n2))) r2.id = Number(n2);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${n2}`);
  return r2;
}
function Ei$1(t, e) {
  return cjs.fromMiliseconds(Date.now() + cjs.toMiliseconds(t));
}
function vi$1(t) {
  return Date.now() >= cjs.toMiliseconds(t);
}
function xi$1(t, e) {
  return `${t}${e ? `:${e}` : ""}`;
}
function ot$1(t = [], e = []) {
  return [.../* @__PURE__ */ new Set([...t, ...e])];
}
async function Si$1({ id: t, topic: e, wcDeepLink: n2 }) {
  var r2;
  try {
    if (!n2) return;
    const o2 = typeof n2 == "string" ? JSON.parse(n2) : n2, i2 = o2 == null ? void 0 : o2.href;
    if (typeof i2 != "string") return;
    const s = Kn$1(i2, t, e), c2 = xt$2();
    if (c2 === Y$3.browser) {
      if (!((r2 = getDocument_1()) != null && r2.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      Fn$1(s);
    } else c2 === Y$3.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(s);
  } catch (o2) {
    console.error(o2);
  }
}
function Kn$1(t, e, n2) {
  const r2 = `requestId=${e}&sessionTopic=${n2}`;
  t.endsWith("/") && (t = t.slice(0, -1));
  let o2 = `${t}`;
  if (t.startsWith("https://t.me")) {
    const i2 = t.includes("?") ? "&startapp=" : "?startapp=";
    o2 = `${o2}${i2}${Yn$1(r2, true)}`;
  } else o2 = `${o2}/wc?${r2}`;
  return o2;
}
function Fn$1(t) {
  let e = "_self";
  Zn$1() ? e = "_top" : (zn$1() || t.startsWith("https://") || t.startsWith("http://")) && (e = "_blank"), window.open(t, e, "noreferrer noopener");
}
async function Oi$1(t, e) {
  let n2 = "";
  try {
    if (Tt$2() && (n2 = localStorage.getItem(e), n2)) return n2;
    n2 = await t.getItem(e);
  } catch (r2) {
    console.error(r2);
  }
  return n2;
}
function Ai$1(t, e) {
  if (!t.includes(e)) return null;
  const n2 = t.split(/([&,?,=])/), r2 = n2.indexOf(e);
  return n2[r2 + 2];
}
function Bi$1() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
function Ii$1() {
  return typeof process$1 < "u" && process$1.env.IS_VITEST === "true";
}
function zn$1() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Zn$1() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function Yn$1(t, e = false) {
  const n2 = Buffer.from(t).toString("base64");
  return e ? n2.replace(/[=]/g, "") : n2;
}
function je$2(t) {
  return Buffer.from(t, "base64").toString("utf-8");
}
function Ni$1(t) {
  return new Promise((e) => setTimeout(e, t));
}
function Wt$2(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function Ui$1(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Xt$2(t, ...e) {
  if (!Ui$1(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function Ce$1(t) {
  if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Wt$2(t.outputLen), Wt$2(t.blockLen);
}
function Rt$2(t, e = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function Gn$1(t, e) {
  Xt$2(t);
  const n2 = e.outputLen;
  if (t.length < n2) throw new Error("digestInto() expects output buffer of length at least " + n2);
}
const le$2 = BigInt(2 ** 32 - 1), Wn$1 = BigInt(32);
function Ti$1(t, e = false) {
  return e ? { h: Number(t & le$2), l: Number(t >> Wn$1 & le$2) } : { h: Number(t >> Wn$1 & le$2) | 0, l: Number(t & le$2) | 0 };
}
function Ri$1(t, e = false) {
  let n2 = new Uint32Array(t.length), r2 = new Uint32Array(t.length);
  for (let o2 = 0; o2 < t.length; o2++) {
    const { h: i2, l: s } = Ti$1(t[o2], e);
    [n2[o2], r2[o2]] = [i2, s];
  }
  return [n2, r2];
}
const _i$1 = (t, e, n2) => t << n2 | e >>> 32 - n2, $i$1 = (t, e, n2) => e << n2 | t >>> 32 - n2, Li$1 = (t, e, n2) => e << n2 - 32 | t >>> 64 - n2, ji$1 = (t, e, n2) => t << n2 - 32 | e >>> 64 - n2, _t$2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Ci$1(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function Pe$1(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function ct$1(t, e) {
  return t << 32 - e | t >>> e;
}
const Xn$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Pi$1(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
function Jn$1(t) {
  for (let e = 0; e < t.length; e++) t[e] = Pi$1(t[e]);
}
function ki$1(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function $t$1(t) {
  return typeof t == "string" && (t = ki$1(t)), Xt$2(t), t;
}
function Vi$1(...t) {
  let e = 0;
  for (let r2 = 0; r2 < t.length; r2++) {
    const o2 = t[r2];
    Xt$2(o2), e += o2.length;
  }
  const n2 = new Uint8Array(e);
  for (let r2 = 0, o2 = 0; r2 < t.length; r2++) {
    const i2 = t[r2];
    n2.set(i2, o2), o2 += i2.length;
  }
  return n2;
}
let ke$3 = class ke {
  clone() {
    return this._cloneInto();
  }
};
function Qn$1(t) {
  const e = (r2) => t().update($t$1(r2)).digest(), n2 = t();
  return e.outputLen = n2.outputLen, e.blockLen = n2.blockLen, e.create = () => t(), e;
}
function Lt$2(t = 32) {
  if (_t$2 && typeof _t$2.getRandomValues == "function") return _t$2.getRandomValues(new Uint8Array(t));
  if (_t$2 && typeof _t$2.randomBytes == "function") return _t$2.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
const tr$1 = [], er$1 = [], nr$1 = [], Mi$1 = BigInt(0), Jt$2 = BigInt(1), Di$1 = BigInt(2), Hi = BigInt(7), qi$1 = BigInt(256), Ki$1 = BigInt(113);
for (let t = 0, e = Jt$2, n2 = 1, r2 = 0; t < 24; t++) {
  [n2, r2] = [r2, (2 * n2 + 3 * r2) % 5], tr$1.push(2 * (5 * r2 + n2)), er$1.push((t + 1) * (t + 2) / 2 % 64);
  let o2 = Mi$1;
  for (let i2 = 0; i2 < 7; i2++) e = (e << Jt$2 ^ (e >> Hi) * Ki$1) % qi$1, e & Di$1 && (o2 ^= Jt$2 << (Jt$2 << BigInt(i2)) - Jt$2);
  nr$1.push(o2);
}
const [Fi$1, zi$1] = Ri$1(nr$1, true), rr$1 = (t, e, n2) => n2 > 32 ? Li$1(t, e, n2) : _i$1(t, e, n2), or$1 = (t, e, n2) => n2 > 32 ? ji$1(t, e, n2) : $i$1(t, e, n2);
function Zi(t, e = 24) {
  const n2 = new Uint32Array(10);
  for (let r2 = 24 - e; r2 < 24; r2++) {
    for (let s = 0; s < 10; s++) n2[s] = t[s] ^ t[s + 10] ^ t[s + 20] ^ t[s + 30] ^ t[s + 40];
    for (let s = 0; s < 10; s += 2) {
      const c2 = (s + 8) % 10, a2 = (s + 2) % 10, u2 = n2[a2], l2 = n2[a2 + 1], f3 = rr$1(u2, l2, 1) ^ n2[c2], h3 = or$1(u2, l2, 1) ^ n2[c2 + 1];
      for (let y3 = 0; y3 < 50; y3 += 10) t[s + y3] ^= f3, t[s + y3 + 1] ^= h3;
    }
    let o2 = t[2], i2 = t[3];
    for (let s = 0; s < 24; s++) {
      const c2 = er$1[s], a2 = rr$1(o2, i2, c2), u2 = or$1(o2, i2, c2), l2 = tr$1[s];
      o2 = t[l2], i2 = t[l2 + 1], t[l2] = a2, t[l2 + 1] = u2;
    }
    for (let s = 0; s < 50; s += 10) {
      for (let c2 = 0; c2 < 10; c2++) n2[c2] = t[s + c2];
      for (let c2 = 0; c2 < 10; c2++) t[s + c2] ^= ~n2[(c2 + 2) % 10] & n2[(c2 + 4) % 10];
    }
    t[0] ^= Fi$1[r2], t[1] ^= zi$1[r2];
  }
  n2.fill(0);
}
let En$1 = class En extends ke$3 {
  constructor(e, n2, r2, o2 = false, i2 = 24) {
    if (super(), this.blockLen = e, this.suffix = n2, this.outputLen = r2, this.enableXOF = o2, this.rounds = i2, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Wt$2(r2), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ci$1(this.state);
  }
  keccak() {
    Xn$1 || Jn$1(this.state32), Zi(this.state32, this.rounds), Xn$1 || Jn$1(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    Rt$2(this);
    const { blockLen: n2, state: r2 } = this;
    e = $t$1(e);
    const o2 = e.length;
    for (let i2 = 0; i2 < o2; ) {
      const s = Math.min(n2 - this.pos, o2 - i2);
      for (let c2 = 0; c2 < s; c2++) r2[this.pos++] ^= e[i2++];
      this.pos === n2 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: e, suffix: n2, pos: r2, blockLen: o2 } = this;
    e[r2] ^= n2, (n2 & 128) !== 0 && r2 === o2 - 1 && this.keccak(), e[o2 - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    Rt$2(this, false), Xt$2(e), this.finish();
    const n2 = this.state, { blockLen: r2 } = this;
    for (let o2 = 0, i2 = e.length; o2 < i2; ) {
      this.posOut >= r2 && this.keccak();
      const s = Math.min(r2 - this.posOut, i2 - o2);
      e.set(n2.subarray(this.posOut, this.posOut + s), o2), this.posOut += s, o2 += s;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return Wt$2(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (Gn$1(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: n2, suffix: r2, outputLen: o2, rounds: i2, enableXOF: s } = this;
    return e || (e = new En(n2, r2, o2, s, i2)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i2, e.suffix = r2, e.outputLen = o2, e.enableXOF = s, e.destroyed = this.destroyed, e;
  }
};
const Yi = (t, e, n2) => Qn$1(() => new En$1(e, t, n2)), Gi = Yi(1, 136, 256 / 8), Wi = "https://rpc.walletconnect.org/v1";
function Ve$2(t) {
  const e = `Ethereum Signed Message:
${t.length}`, n2 = new TextEncoder().encode(e + t);
  return "0x" + Buffer.from(Gi(n2)).toString("hex");
}
async function ir$1(t, e, n2, r2, o2, i2) {
  switch (n2.t) {
    case "eip191":
      return await sr$1(t, e, n2.s);
    case "eip1271":
      return await cr$1(t, e, n2.s, r2, o2, i2);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n2.t}`);
  }
}
async function sr$1(t, e, n2) {
  return (await recoverAddress({ hash: Ve$2(e), signature: n2 })).toLowerCase() === t.toLowerCase();
}
async function cr$1(t, e, n2, r2, o2, i2) {
  const s = Ne$1(r2);
  if (!s.namespace || !s.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r2}`);
  try {
    const c2 = "0x1626ba7e", a2 = "0000000000000000000000000000000000000000000000000000000000000040", u2 = "0000000000000000000000000000000000000000000000000000000000000041", l2 = n2.substring(2), f3 = Ve$2(e).substring(2), h3 = c2 + f3 + a2 + u2 + l2, y3 = await fetch(`${i2 || Wi}/?chainId=${r2}&projectId=${o2}`, { method: "POST", body: JSON.stringify({ id: Xi(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t, data: h3 }, "latest"] }) }), { result: E2 } = await y3.json();
    return E2 ? E2.slice(0, c2.length).toLowerCase() === c2.toLowerCase() : false;
  } catch (c2) {
    return console.error("isValidEip1271Signature: ", c2), false;
  }
}
function Xi() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function Ji(t) {
  const e = atob(t), n2 = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++) n2[s] = e.charCodeAt(s);
  const r2 = n2[0];
  if (r2 === 0) throw new Error("No signatures found");
  const o2 = 1 + r2 * 64;
  if (n2.length < o2) throw new Error("Transaction data too short for claimed signature count");
  if (n2.length < 100) throw new Error("Transaction too short");
  const i2 = Buffer.from(t, "base64").slice(1, 65);
  return bs58.encode(i2);
}
var Qi = Object.defineProperty, ts$1 = Object.defineProperties, es$1 = Object.getOwnPropertyDescriptors, ar$1 = Object.getOwnPropertySymbols, ns = Object.prototype.hasOwnProperty, rs = Object.prototype.propertyIsEnumerable, ur$1 = (t, e, n2) => e in t ? Qi(t, e, { enumerable: true, configurable: true, writable: true, value: n2 }) : t[e] = n2, Me$3 = (t, e) => {
  for (var n2 in e || (e = {})) ns.call(e, n2) && ur$1(t, n2, e[n2]);
  if (ar$1) for (var n2 of ar$1(e)) rs.call(e, n2) && ur$1(t, n2, e[n2]);
  return t;
}, fr$1 = (t, e) => ts$1(t, es$1(e));
const os = "did:pkh:", de$2 = (t) => t == null ? void 0 : t.split(":"), lr$1 = (t) => {
  const e = t && de$2(t);
  if (e) return t.includes(os) ? e[3] : e[1];
}, dr$1 = (t) => {
  const e = t && de$2(t);
  if (e) return e[2] + ":" + e[3];
}, De$2 = (t) => {
  const e = t && de$2(t);
  if (e) return e.pop();
};
async function is(t) {
  const { cacao: e, projectId: n2 } = t, { s: r2, p: o2 } = e, i2 = hr$1(o2, o2.iss), s = De$2(o2.iss);
  return await ir$1(s, i2, r2, dr$1(o2.iss), n2);
}
const hr$1 = (t, e) => {
  const n2 = `${t.domain} wants you to sign in with your Ethereum account:`, r2 = De$2(e);
  if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let o2 = t.statement || void 0;
  const i2 = `URI: ${t.aud || t.uri}`, s = `Version: ${t.version}`, c2 = `Chain ID: ${lr$1(e)}`, a2 = `Nonce: ${t.nonce}`, u2 = `Issued At: ${t.iat}`, l2 = t.exp ? `Expiration Time: ${t.exp}` : void 0, f3 = t.nbf ? `Not Before: ${t.nbf}` : void 0, h3 = t.requestId ? `Request ID: ${t.requestId}` : void 0, y3 = t.resources ? `Resources:${t.resources.map((p2) => `
- ${p2}`).join("")}` : void 0, E2 = pe$2(t.resources);
  if (E2) {
    const p2 = yt$2(E2);
    o2 = Ke$3(o2, p2);
  }
  return [n2, r2, "", o2, "", i2, s, c2, a2, u2, l2, f3, h3, y3].filter((p2) => p2 != null).join(`
`);
};
function mr$1(t) {
  return Buffer.from(JSON.stringify(t)).toString("base64");
}
function wr$1(t) {
  return JSON.parse(Buffer.from(t, "base64").toString("utf-8"));
}
function at$1(t) {
  if (!t) throw new Error("No recap provided, value is undefined");
  if (!t.att) throw new Error("No `att` property found");
  const e = Object.keys(t.att);
  if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
  e.forEach((n2) => {
    const r2 = t.att[n2];
    if (Array.isArray(r2)) throw new Error(`Resource must be an object: ${n2}`);
    if (typeof r2 != "object") throw new Error(`Resource must be an object: ${n2}`);
    if (!Object.keys(r2).length) throw new Error(`Resource object is empty: ${n2}`);
    Object.keys(r2).forEach((o2) => {
      const i2 = r2[o2];
      if (!Array.isArray(i2)) throw new Error(`Ability limits ${o2} must be an array of objects, found: ${i2}`);
      if (!i2.length) throw new Error(`Value of ${o2} is empty array, must be an array with objects`);
      i2.forEach((s) => {
        if (typeof s != "object") throw new Error(`Ability limits (${o2}) must be an array of objects, found: ${s}`);
      });
    });
  });
}
function br$1(t, e, n2, r2 = {}) {
  return n2 == null ? void 0 : n2.sort((o2, i2) => o2.localeCompare(i2)), { att: { [t]: He$2(e, n2, r2) } };
}
function He$2(t, e, n2 = {}) {
  e = e == null ? void 0 : e.sort((o2, i2) => o2.localeCompare(i2));
  const r2 = e.map((o2) => ({ [`${t}/${o2}`]: [n2] }));
  return Object.assign({}, ...r2);
}
function he$2(t) {
  return at$1(t), `urn:recap:${mr$1(t).replace(/=/g, "")}`;
}
function yt$2(t) {
  const e = wr$1(t.replace("urn:recap:", ""));
  return at$1(e), e;
}
function fs(t, e, n2) {
  const r2 = br$1(t, e, n2);
  return he$2(r2);
}
function qe$2(t) {
  return t && t.includes("urn:recap:");
}
function ls(t, e) {
  const n2 = yt$2(t), r2 = yt$2(e), o2 = vr$1(n2, r2);
  return he$2(o2);
}
function vr$1(t, e) {
  at$1(t), at$1(e);
  const n2 = Object.keys(t.att).concat(Object.keys(e.att)).sort((o2, i2) => o2.localeCompare(i2)), r2 = { att: {} };
  return n2.forEach((o2) => {
    var i2, s;
    Object.keys(((i2 = t.att) == null ? void 0 : i2[o2]) || {}).concat(Object.keys(((s = e.att) == null ? void 0 : s[o2]) || {})).sort((c2, a2) => c2.localeCompare(a2)).forEach((c2) => {
      var a2, u2;
      r2.att[o2] = fr$1(Me$3({}, r2.att[o2]), { [c2]: ((a2 = t.att[o2]) == null ? void 0 : a2[c2]) || ((u2 = e.att[o2]) == null ? void 0 : u2[c2]) });
    });
  }), r2;
}
function Ke$3(t = "", e) {
  at$1(e);
  const n2 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t.includes(n2)) return t;
  const r2 = [];
  let o2 = 0;
  Object.keys(e.att).forEach((c2) => {
    const a2 = Object.keys(e.att[c2]).map((f3) => ({ ability: f3.split("/")[0], action: f3.split("/")[1] }));
    a2.sort((f3, h3) => f3.action.localeCompare(h3.action));
    const u2 = {};
    a2.forEach((f3) => {
      u2[f3.ability] || (u2[f3.ability] = []), u2[f3.ability].push(f3.action);
    });
    const l2 = Object.keys(u2).map((f3) => (o2++, `(${o2}) '${f3}': '${u2[f3].join("', '")}' for '${c2}'.`));
    r2.push(l2.join(", ").replace(".,", "."));
  });
  const i2 = r2.join(" "), s = `${n2}${i2}`;
  return `${t ? t + " " : ""}${s}`;
}
function ds(t) {
  var e;
  const n2 = yt$2(t);
  at$1(n2);
  const r2 = (e = n2.att) == null ? void 0 : e.eip155;
  return r2 ? Object.keys(r2).map((o2) => o2.split("/")[1]) : [];
}
function hs(t) {
  const e = yt$2(t);
  at$1(e);
  const n2 = [];
  return Object.values(e.att).forEach((r2) => {
    Object.values(r2).forEach((o2) => {
      var i2;
      (i2 = o2 == null ? void 0 : o2[0]) != null && i2.chains && n2.push(o2[0].chains);
    });
  }), [...new Set(n2.flat())];
}
function pe$2(t) {
  if (!t) return;
  const e = t == null ? void 0 : t[t.length - 1];
  return qe$2(e) ? e : void 0;
}
function Fe$2(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function Sr$1(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function tt$1(t, ...e) {
  if (!Sr$1(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function Or$1(t, e = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function ps(t, e) {
  tt$1(t);
  const n2 = e.outputLen;
  if (t.length < n2) throw new Error("digestInto() expects output buffer of length at least " + n2);
}
function Ar$1(t) {
  if (typeof t != "boolean") throw new Error(`boolean expected, not ${t}`);
}
const mt$2 = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), gs = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), ys = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!ys) throw new Error("Non little-endian hardware is not supported");
function ms(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function ze$2(t) {
  if (typeof t == "string") t = ms(t);
  else if (Sr$1(t)) t = Ze$2(t);
  else throw new Error("Uint8Array expected, got " + typeof t);
  return t;
}
function ws(t, e) {
  if (e == null || typeof e != "object") throw new Error("options must be defined");
  return Object.assign(t, e);
}
function bs$1(t, e) {
  if (t.length !== e.length) return false;
  let n2 = 0;
  for (let r2 = 0; r2 < t.length; r2++) n2 |= t[r2] ^ e[r2];
  return n2 === 0;
}
const Es = (t, e) => {
  function n2(r2, ...o2) {
    if (tt$1(r2), t.nonceLength !== void 0) {
      const l2 = o2[0];
      if (!l2) throw new Error("nonce / iv required");
      t.varSizeNonce ? tt$1(l2) : tt$1(l2, t.nonceLength);
    }
    const i2 = t.tagLength;
    i2 && o2[1] !== void 0 && tt$1(o2[1]);
    const s = e(r2, ...o2), c2 = (l2, f3) => {
      if (f3 !== void 0) {
        if (l2 !== 2) throw new Error("cipher output not supported");
        tt$1(f3);
      }
    };
    let a2 = false;
    return { encrypt(l2, f3) {
      if (a2) throw new Error("cannot encrypt() twice with same key + nonce");
      return a2 = true, tt$1(l2), c2(s.encrypt.length, f3), s.encrypt(l2, f3);
    }, decrypt(l2, f3) {
      if (tt$1(l2), i2 && l2.length < i2) throw new Error("invalid ciphertext length: smaller than tagLength=" + i2);
      return c2(s.decrypt.length, f3), s.decrypt(l2, f3);
    } };
  }
  return Object.assign(n2, t), n2;
};
function Br$1(t, e, n2 = true) {
  if (e === void 0) return new Uint8Array(t);
  if (e.length !== t) throw new Error("invalid output length, expected " + t + ", got: " + e.length);
  if (n2 && !vs$1(e)) throw new Error("invalid output, must be aligned");
  return e;
}
function Ir$1(t, e, n2, r2) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n2, r2);
  const o2 = BigInt(32), i2 = BigInt(4294967295), s = Number(n2 >> o2 & i2), c2 = Number(n2 & i2), a2 = 4, u2 = 0;
  t.setUint32(e + a2, s, r2), t.setUint32(e + u2, c2, r2);
}
function vs$1(t) {
  return t.byteOffset % 4 === 0;
}
function Ze$2(t) {
  return Uint8Array.from(t);
}
function jt$2(...t) {
  for (let e = 0; e < t.length; e++) t[e].fill(0);
}
const Nr$1 = (t) => Uint8Array.from(t.split("").map((e) => e.charCodeAt(0))), xs$1 = Nr$1("expand 16-byte k"), Ss = Nr$1("expand 32-byte k"), Os$1 = mt$2(xs$1), As$1 = mt$2(Ss);
function V$4(t, e) {
  return t << e | t >>> 32 - e;
}
function Ye$2(t) {
  return t.byteOffset % 4 === 0;
}
const ge$2 = 64, Bs = 16, Ur$1 = 2 ** 32 - 1, Tr$1 = new Uint32Array();
function Is$1(t, e, n2, r2, o2, i2, s, c2) {
  const a2 = o2.length, u2 = new Uint8Array(ge$2), l2 = mt$2(u2), f3 = Ye$2(o2) && Ye$2(i2), h3 = f3 ? mt$2(o2) : Tr$1, y3 = f3 ? mt$2(i2) : Tr$1;
  for (let E2 = 0; E2 < a2; s++) {
    if (t(e, n2, r2, l2, s, c2), s >= Ur$1) throw new Error("arx: counter overflow");
    const p2 = Math.min(ge$2, a2 - E2);
    if (f3 && p2 === ge$2) {
      const d4 = E2 / 4;
      if (E2 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let v2 = 0, m3; v2 < Bs; v2++) m3 = d4 + v2, y3[m3] = h3[m3] ^ l2[v2];
      E2 += ge$2;
      continue;
    }
    for (let d4 = 0, v2; d4 < p2; d4++) v2 = E2 + d4, i2[v2] = o2[v2] ^ u2[d4];
    E2 += p2;
  }
}
function Ns$1(t, e) {
  const { allowShortKeys: n2, extendNonceFn: r2, counterLength: o2, counterRight: i2, rounds: s } = ws({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, e);
  if (typeof t != "function") throw new Error("core must be a function");
  return Fe$2(o2), Fe$2(s), Ar$1(i2), Ar$1(n2), (c2, a2, u2, l2, f3 = 0) => {
    tt$1(c2), tt$1(a2), tt$1(u2);
    const h3 = u2.length;
    if (l2 === void 0 && (l2 = new Uint8Array(h3)), tt$1(l2), Fe$2(f3), f3 < 0 || f3 >= Ur$1) throw new Error("arx: counter overflow");
    if (l2.length < h3) throw new Error(`arx: output (${l2.length}) is shorter than data (${h3})`);
    const y3 = [];
    let E2 = c2.length, p2, d4;
    if (E2 === 32) y3.push(p2 = Ze$2(c2)), d4 = As$1;
    else if (E2 === 16 && n2) p2 = new Uint8Array(32), p2.set(c2), p2.set(c2, 16), d4 = Os$1, y3.push(p2);
    else throw new Error(`arx: invalid 32-byte key, got length=${E2}`);
    Ye$2(a2) || y3.push(a2 = Ze$2(a2));
    const v2 = mt$2(p2);
    if (r2) {
      if (a2.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r2(d4, v2, mt$2(a2.subarray(0, 16)), v2), a2 = a2.subarray(16);
    }
    const m3 = 16 - o2;
    if (m3 !== a2.length) throw new Error(`arx: nonce must be ${m3} or 16 bytes`);
    if (m3 !== 12) {
      const N2 = new Uint8Array(12);
      N2.set(a2, i2 ? 0 : 12 - a2.length), a2 = N2, y3.push(a2);
    }
    const O4 = mt$2(a2);
    return Is$1(t, d4, v2, O4, u2, l2, f3, s), jt$2(...y3), l2;
  };
}
const F$3 = (t, e) => t[e++] & 255 | (t[e++] & 255) << 8;
class Us {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, e = ze$2(e), tt$1(e, 32);
    const n2 = F$3(e, 0), r2 = F$3(e, 2), o2 = F$3(e, 4), i2 = F$3(e, 6), s = F$3(e, 8), c2 = F$3(e, 10), a2 = F$3(e, 12), u2 = F$3(e, 14);
    this.r[0] = n2 & 8191, this.r[1] = (n2 >>> 13 | r2 << 3) & 8191, this.r[2] = (r2 >>> 10 | o2 << 6) & 7939, this.r[3] = (o2 >>> 7 | i2 << 9) & 8191, this.r[4] = (i2 >>> 4 | s << 12) & 255, this.r[5] = s >>> 1 & 8190, this.r[6] = (s >>> 14 | c2 << 2) & 8191, this.r[7] = (c2 >>> 11 | a2 << 5) & 8065, this.r[8] = (a2 >>> 8 | u2 << 8) & 8191, this.r[9] = u2 >>> 5 & 127;
    for (let l2 = 0; l2 < 8; l2++) this.pad[l2] = F$3(e, 16 + 2 * l2);
  }
  process(e, n2, r2 = false) {
    const o2 = r2 ? 0 : 2048, { h: i2, r: s } = this, c2 = s[0], a2 = s[1], u2 = s[2], l2 = s[3], f3 = s[4], h3 = s[5], y3 = s[6], E2 = s[7], p2 = s[8], d4 = s[9], v2 = F$3(e, n2 + 0), m3 = F$3(e, n2 + 2), O4 = F$3(e, n2 + 4), N2 = F$3(e, n2 + 6), $2 = F$3(e, n2 + 8), B4 = F$3(e, n2 + 10), A2 = F$3(e, n2 + 12), T2 = F$3(e, n2 + 14);
    let S3 = i2[0] + (v2 & 8191), L3 = i2[1] + ((v2 >>> 13 | m3 << 3) & 8191), U2 = i2[2] + ((m3 >>> 10 | O4 << 6) & 8191), _2 = i2[3] + ((O4 >>> 7 | N2 << 9) & 8191), j2 = i2[4] + ((N2 >>> 4 | $2 << 12) & 8191), g2 = i2[5] + ($2 >>> 1 & 8191), w2 = i2[6] + (($2 >>> 14 | B4 << 2) & 8191), b2 = i2[7] + ((B4 >>> 11 | A2 << 5) & 8191), I3 = i2[8] + ((A2 >>> 8 | T2 << 8) & 8191), R3 = i2[9] + (T2 >>> 5 | o2), x2 = 0, C2 = x2 + S3 * c2 + L3 * (5 * d4) + U2 * (5 * p2) + _2 * (5 * E2) + j2 * (5 * y3);
    x2 = C2 >>> 13, C2 &= 8191, C2 += g2 * (5 * h3) + w2 * (5 * f3) + b2 * (5 * l2) + I3 * (5 * u2) + R3 * (5 * a2), x2 += C2 >>> 13, C2 &= 8191;
    let P3 = x2 + S3 * a2 + L3 * c2 + U2 * (5 * d4) + _2 * (5 * p2) + j2 * (5 * E2);
    x2 = P3 >>> 13, P3 &= 8191, P3 += g2 * (5 * y3) + w2 * (5 * h3) + b2 * (5 * f3) + I3 * (5 * l2) + R3 * (5 * u2), x2 += P3 >>> 13, P3 &= 8191;
    let k2 = x2 + S3 * u2 + L3 * a2 + U2 * c2 + _2 * (5 * d4) + j2 * (5 * p2);
    x2 = k2 >>> 13, k2 &= 8191, k2 += g2 * (5 * E2) + w2 * (5 * y3) + b2 * (5 * h3) + I3 * (5 * f3) + R3 * (5 * l2), x2 += k2 >>> 13, k2 &= 8191;
    let M3 = x2 + S3 * l2 + L3 * u2 + U2 * a2 + _2 * c2 + j2 * (5 * d4);
    x2 = M3 >>> 13, M3 &= 8191, M3 += g2 * (5 * p2) + w2 * (5 * E2) + b2 * (5 * y3) + I3 * (5 * h3) + R3 * (5 * f3), x2 += M3 >>> 13, M3 &= 8191;
    let D2 = x2 + S3 * f3 + L3 * l2 + U2 * u2 + _2 * a2 + j2 * c2;
    x2 = D2 >>> 13, D2 &= 8191, D2 += g2 * (5 * d4) + w2 * (5 * p2) + b2 * (5 * E2) + I3 * (5 * y3) + R3 * (5 * h3), x2 += D2 >>> 13, D2 &= 8191;
    let z2 = x2 + S3 * h3 + L3 * f3 + U2 * l2 + _2 * u2 + j2 * a2;
    x2 = z2 >>> 13, z2 &= 8191, z2 += g2 * c2 + w2 * (5 * d4) + b2 * (5 * p2) + I3 * (5 * E2) + R3 * (5 * y3), x2 += z2 >>> 13, z2 &= 8191;
    let Z2 = x2 + S3 * y3 + L3 * h3 + U2 * f3 + _2 * l2 + j2 * u2;
    x2 = Z2 >>> 13, Z2 &= 8191, Z2 += g2 * a2 + w2 * c2 + b2 * (5 * d4) + I3 * (5 * p2) + R3 * (5 * E2), x2 += Z2 >>> 13, Z2 &= 8191;
    let st2 = x2 + S3 * E2 + L3 * y3 + U2 * h3 + _2 * f3 + j2 * l2;
    x2 = st2 >>> 13, st2 &= 8191, st2 += g2 * u2 + w2 * a2 + b2 * c2 + I3 * (5 * d4) + R3 * (5 * p2), x2 += st2 >>> 13, st2 &= 8191;
    let W2 = x2 + S3 * p2 + L3 * E2 + U2 * y3 + _2 * h3 + j2 * f3;
    x2 = W2 >>> 13, W2 &= 8191, W2 += g2 * l2 + w2 * u2 + b2 * a2 + I3 * c2 + R3 * (5 * d4), x2 += W2 >>> 13, W2 &= 8191;
    let J3 = x2 + S3 * d4 + L3 * p2 + U2 * E2 + _2 * y3 + j2 * h3;
    x2 = J3 >>> 13, J3 &= 8191, J3 += g2 * f3 + w2 * l2 + b2 * u2 + I3 * a2 + R3 * c2, x2 += J3 >>> 13, J3 &= 8191, x2 = (x2 << 2) + x2 | 0, x2 = x2 + C2 | 0, C2 = x2 & 8191, x2 = x2 >>> 13, P3 += x2, i2[0] = C2, i2[1] = P3, i2[2] = k2, i2[3] = M3, i2[4] = D2, i2[5] = z2, i2[6] = Z2, i2[7] = st2, i2[8] = W2, i2[9] = J3;
  }
  finalize() {
    const { h: e, pad: n2 } = this, r2 = new Uint16Array(10);
    let o2 = e[1] >>> 13;
    e[1] &= 8191;
    for (let c2 = 2; c2 < 10; c2++) e[c2] += o2, o2 = e[c2] >>> 13, e[c2] &= 8191;
    e[0] += o2 * 5, o2 = e[0] >>> 13, e[0] &= 8191, e[1] += o2, o2 = e[1] >>> 13, e[1] &= 8191, e[2] += o2, r2[0] = e[0] + 5, o2 = r2[0] >>> 13, r2[0] &= 8191;
    for (let c2 = 1; c2 < 10; c2++) r2[c2] = e[c2] + o2, o2 = r2[c2] >>> 13, r2[c2] &= 8191;
    r2[9] -= 8192;
    let i2 = (o2 ^ 1) - 1;
    for (let c2 = 0; c2 < 10; c2++) r2[c2] &= i2;
    i2 = ~i2;
    for (let c2 = 0; c2 < 10; c2++) e[c2] = e[c2] & i2 | r2[c2];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let s = e[0] + n2[0];
    e[0] = s & 65535;
    for (let c2 = 1; c2 < 8; c2++) s = (e[c2] + n2[c2] | 0) + (s >>> 16) | 0, e[c2] = s & 65535;
    jt$2(r2);
  }
  update(e) {
    Or$1(this);
    const { buffer: n2, blockLen: r2 } = this;
    e = ze$2(e);
    const o2 = e.length;
    for (let i2 = 0; i2 < o2; ) {
      const s = Math.min(r2 - this.pos, o2 - i2);
      if (s === r2) {
        for (; r2 <= o2 - i2; i2 += r2) this.process(e, i2);
        continue;
      }
      n2.set(e.subarray(i2, i2 + s), this.pos), this.pos += s, i2 += s, this.pos === r2 && (this.process(n2, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    jt$2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    Or$1(this), ps(e, this), this.finished = true;
    const { buffer: n2, h: r2 } = this;
    let { pos: o2 } = this;
    if (o2) {
      for (n2[o2++] = 1; o2 < 16; o2++) n2[o2] = 0;
      this.process(n2, 0, true);
    }
    this.finalize();
    let i2 = 0;
    for (let s = 0; s < 8; s++) e[i2++] = r2[s] >>> 0, e[i2++] = r2[s] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: n2 } = this;
    this.digestInto(e);
    const r2 = e.slice(0, n2);
    return this.destroy(), r2;
  }
}
function Ts$1(t) {
  const e = (r2, o2) => t(o2).update(ze$2(r2)).digest(), n2 = t(new Uint8Array(32));
  return e.outputLen = n2.outputLen, e.blockLen = n2.blockLen, e.create = (r2) => t(r2), e;
}
const Rs = Ts$1((t) => new Us(t));
function _s(t, e, n2, r2, o2, i2 = 20) {
  let s = t[0], c2 = t[1], a2 = t[2], u2 = t[3], l2 = e[0], f3 = e[1], h3 = e[2], y3 = e[3], E2 = e[4], p2 = e[5], d4 = e[6], v2 = e[7], m3 = o2, O4 = n2[0], N2 = n2[1], $2 = n2[2], B4 = s, A2 = c2, T2 = a2, S3 = u2, L3 = l2, U2 = f3, _2 = h3, j2 = y3, g2 = E2, w2 = p2, b2 = d4, I3 = v2, R3 = m3, x2 = O4, C2 = N2, P3 = $2;
  for (let M3 = 0; M3 < i2; M3 += 2) B4 = B4 + L3 | 0, R3 = V$4(R3 ^ B4, 16), g2 = g2 + R3 | 0, L3 = V$4(L3 ^ g2, 12), B4 = B4 + L3 | 0, R3 = V$4(R3 ^ B4, 8), g2 = g2 + R3 | 0, L3 = V$4(L3 ^ g2, 7), A2 = A2 + U2 | 0, x2 = V$4(x2 ^ A2, 16), w2 = w2 + x2 | 0, U2 = V$4(U2 ^ w2, 12), A2 = A2 + U2 | 0, x2 = V$4(x2 ^ A2, 8), w2 = w2 + x2 | 0, U2 = V$4(U2 ^ w2, 7), T2 = T2 + _2 | 0, C2 = V$4(C2 ^ T2, 16), b2 = b2 + C2 | 0, _2 = V$4(_2 ^ b2, 12), T2 = T2 + _2 | 0, C2 = V$4(C2 ^ T2, 8), b2 = b2 + C2 | 0, _2 = V$4(_2 ^ b2, 7), S3 = S3 + j2 | 0, P3 = V$4(P3 ^ S3, 16), I3 = I3 + P3 | 0, j2 = V$4(j2 ^ I3, 12), S3 = S3 + j2 | 0, P3 = V$4(P3 ^ S3, 8), I3 = I3 + P3 | 0, j2 = V$4(j2 ^ I3, 7), B4 = B4 + U2 | 0, P3 = V$4(P3 ^ B4, 16), b2 = b2 + P3 | 0, U2 = V$4(U2 ^ b2, 12), B4 = B4 + U2 | 0, P3 = V$4(P3 ^ B4, 8), b2 = b2 + P3 | 0, U2 = V$4(U2 ^ b2, 7), A2 = A2 + _2 | 0, R3 = V$4(R3 ^ A2, 16), I3 = I3 + R3 | 0, _2 = V$4(_2 ^ I3, 12), A2 = A2 + _2 | 0, R3 = V$4(R3 ^ A2, 8), I3 = I3 + R3 | 0, _2 = V$4(_2 ^ I3, 7), T2 = T2 + j2 | 0, x2 = V$4(x2 ^ T2, 16), g2 = g2 + x2 | 0, j2 = V$4(j2 ^ g2, 12), T2 = T2 + j2 | 0, x2 = V$4(x2 ^ T2, 8), g2 = g2 + x2 | 0, j2 = V$4(j2 ^ g2, 7), S3 = S3 + L3 | 0, C2 = V$4(C2 ^ S3, 16), w2 = w2 + C2 | 0, L3 = V$4(L3 ^ w2, 12), S3 = S3 + L3 | 0, C2 = V$4(C2 ^ S3, 8), w2 = w2 + C2 | 0, L3 = V$4(L3 ^ w2, 7);
  let k2 = 0;
  r2[k2++] = s + B4 | 0, r2[k2++] = c2 + A2 | 0, r2[k2++] = a2 + T2 | 0, r2[k2++] = u2 + S3 | 0, r2[k2++] = l2 + L3 | 0, r2[k2++] = f3 + U2 | 0, r2[k2++] = h3 + _2 | 0, r2[k2++] = y3 + j2 | 0, r2[k2++] = E2 + g2 | 0, r2[k2++] = p2 + w2 | 0, r2[k2++] = d4 + b2 | 0, r2[k2++] = v2 + I3 | 0, r2[k2++] = m3 + R3 | 0, r2[k2++] = O4 + x2 | 0, r2[k2++] = N2 + C2 | 0, r2[k2++] = $2 + P3 | 0;
}
const $s = Ns$1(_s, { counterRight: false, counterLength: 4, allowShortKeys: false }), Ls$1 = new Uint8Array(16), Rr$1 = (t, e) => {
  t.update(e);
  const n2 = e.length % 16;
  n2 && t.update(Ls$1.subarray(n2));
}, js = new Uint8Array(32);
function _r$1(t, e, n2, r2, o2) {
  const i2 = t(e, n2, js), s = Rs.create(i2);
  o2 && Rr$1(s, o2), Rr$1(s, r2);
  const c2 = new Uint8Array(16), a2 = gs(c2);
  Ir$1(a2, 0, BigInt(o2 ? o2.length : 0), true), Ir$1(a2, 8, BigInt(r2.length), true), s.update(c2);
  const u2 = s.digest();
  return jt$2(i2, c2), u2;
}
const Cs$1 = (t) => (e, n2, r2) => ({ encrypt(i2, s) {
  const c2 = i2.length;
  s = Br$1(c2 + 16, s, false), s.set(i2);
  const a2 = s.subarray(0, -16);
  t(e, n2, a2, a2, 1);
  const u2 = _r$1(t, e, n2, a2, r2);
  return s.set(u2, c2), jt$2(u2), s;
}, decrypt(i2, s) {
  s = Br$1(i2.length - 16, s, false);
  const c2 = i2.subarray(0, -16), a2 = i2.subarray(-16), u2 = _r$1(t, e, n2, c2, r2);
  if (!bs$1(a2, u2)) throw new Error("invalid tag");
  return s.set(i2.subarray(0, -16)), t(e, n2, s, s, 1), jt$2(u2), s;
} }), $r$1 = Es({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Cs$1($s));
let Lr$1 = class Lr extends ke$3 {
  constructor(e, n2) {
    super(), this.finished = false, this.destroyed = false, Ce$1(e);
    const r2 = $t$1(n2);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o2 = this.blockLen, i2 = new Uint8Array(o2);
    i2.set(r2.length > o2 ? e.create().update(r2).digest() : r2);
    for (let s = 0; s < i2.length; s++) i2[s] ^= 54;
    this.iHash.update(i2), this.oHash = e.create();
    for (let s = 0; s < i2.length; s++) i2[s] ^= 106;
    this.oHash.update(i2), i2.fill(0);
  }
  update(e) {
    return Rt$2(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    Rt$2(this), Xt$2(e, this.outputLen), this.finished = true, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n2, iHash: r2, finished: o2, destroyed: i2, blockLen: s, outputLen: c2 } = this;
    return e = e, e.finished = o2, e.destroyed = i2, e.blockLen = s, e.outputLen = c2, e.oHash = n2._cloneInto(e.oHash), e.iHash = r2._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
const ye$2 = (t, e, n2) => new Lr$1(t, e).update(n2).digest();
ye$2.create = (t, e) => new Lr$1(t, e);
function Ps$1(t, e, n2) {
  return Ce$1(t), n2 === void 0 && (n2 = new Uint8Array(t.outputLen)), ye$2(t, $t$1(n2), $t$1(e));
}
const Ge$3 = new Uint8Array([0]), jr$1 = new Uint8Array();
function ks$1(t, e, n2, r2 = 32) {
  if (Ce$1(t), Wt$2(r2), r2 > 255 * t.outputLen) throw new Error("Length should be <= 255*HashLen");
  const o2 = Math.ceil(r2 / t.outputLen);
  n2 === void 0 && (n2 = jr$1);
  const i2 = new Uint8Array(o2 * t.outputLen), s = ye$2.create(t, e), c2 = s._cloneInto(), a2 = new Uint8Array(s.outputLen);
  for (let u2 = 0; u2 < o2; u2++) Ge$3[0] = u2 + 1, c2.update(u2 === 0 ? jr$1 : a2).update(n2).update(Ge$3).digestInto(a2), i2.set(a2, t.outputLen * u2), s._cloneInto(c2);
  return s.destroy(), c2.destroy(), a2.fill(0), Ge$3.fill(0), i2.slice(0, r2);
}
const Vs$1 = (t, e, n2, r2, o2) => ks$1(t, Ps$1(t, e, n2), r2, o2);
function Ms$1(t, e, n2, r2) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n2, r2);
  const o2 = BigInt(32), i2 = BigInt(4294967295), s = Number(n2 >> o2 & i2), c2 = Number(n2 & i2), a2 = r2 ? 4 : 0, u2 = r2 ? 0 : 4;
  t.setUint32(e + a2, s, r2), t.setUint32(e + u2, c2, r2);
}
function Ds$1(t, e, n2) {
  return t & e ^ ~t & n2;
}
function Hs(t, e, n2) {
  return t & e ^ t & n2 ^ e & n2;
}
let qs$1 = class qs extends ke$3 {
  constructor(e, n2, r2, o2) {
    super(), this.blockLen = e, this.outputLen = n2, this.padOffset = r2, this.isLE = o2, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e), this.view = Pe$1(this.buffer);
  }
  update(e) {
    Rt$2(this);
    const { view: n2, buffer: r2, blockLen: o2 } = this;
    e = $t$1(e);
    const i2 = e.length;
    for (let s = 0; s < i2; ) {
      const c2 = Math.min(o2 - this.pos, i2 - s);
      if (c2 === o2) {
        const a2 = Pe$1(e);
        for (; o2 <= i2 - s; s += o2) this.process(a2, s);
        continue;
      }
      r2.set(e.subarray(s, s + c2), this.pos), this.pos += c2, s += c2, this.pos === o2 && (this.process(n2, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Rt$2(this), Gn$1(e, this), this.finished = true;
    const { buffer: n2, view: r2, blockLen: o2, isLE: i2 } = this;
    let { pos: s } = this;
    n2[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > o2 - s && (this.process(r2, 0), s = 0);
    for (let f3 = s; f3 < o2; f3++) n2[f3] = 0;
    Ms$1(r2, o2 - 8, BigInt(this.length * 8), i2), this.process(r2, 0);
    const c2 = Pe$1(e), a2 = this.outputLen;
    if (a2 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u2 = a2 / 4, l2 = this.get();
    if (u2 > l2.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f3 = 0; f3 < u2; f3++) c2.setUint32(4 * f3, l2[f3], i2);
  }
  digest() {
    const { buffer: e, outputLen: n2 } = this;
    this.digestInto(e);
    const r2 = e.slice(0, n2);
    return this.destroy(), r2;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: n2, buffer: r2, length: o2, finished: i2, destroyed: s, pos: c2 } = this;
    return e.length = o2, e.pos = c2, e.finished = i2, e.destroyed = s, o2 % n2 && e.buffer.set(r2), e;
  }
};
const Ks = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), wt$2 = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), bt$1 = new Uint32Array(64);
class Fs extends qs$1 {
  constructor() {
    super(64, 32, 8, false), this.A = wt$2[0] | 0, this.B = wt$2[1] | 0, this.C = wt$2[2] | 0, this.D = wt$2[3] | 0, this.E = wt$2[4] | 0, this.F = wt$2[5] | 0, this.G = wt$2[6] | 0, this.H = wt$2[7] | 0;
  }
  get() {
    const { A: e, B: n2, C: r2, D: o2, E: i2, F: s, G: c2, H: a2 } = this;
    return [e, n2, r2, o2, i2, s, c2, a2];
  }
  set(e, n2, r2, o2, i2, s, c2, a2) {
    this.A = e | 0, this.B = n2 | 0, this.C = r2 | 0, this.D = o2 | 0, this.E = i2 | 0, this.F = s | 0, this.G = c2 | 0, this.H = a2 | 0;
  }
  process(e, n2) {
    for (let f3 = 0; f3 < 16; f3++, n2 += 4) bt$1[f3] = e.getUint32(n2, false);
    for (let f3 = 16; f3 < 64; f3++) {
      const h3 = bt$1[f3 - 15], y3 = bt$1[f3 - 2], E2 = ct$1(h3, 7) ^ ct$1(h3, 18) ^ h3 >>> 3, p2 = ct$1(y3, 17) ^ ct$1(y3, 19) ^ y3 >>> 10;
      bt$1[f3] = p2 + bt$1[f3 - 7] + E2 + bt$1[f3 - 16] | 0;
    }
    let { A: r2, B: o2, C: i2, D: s, E: c2, F: a2, G: u2, H: l2 } = this;
    for (let f3 = 0; f3 < 64; f3++) {
      const h3 = ct$1(c2, 6) ^ ct$1(c2, 11) ^ ct$1(c2, 25), y3 = l2 + h3 + Ds$1(c2, a2, u2) + Ks[f3] + bt$1[f3] | 0, p2 = (ct$1(r2, 2) ^ ct$1(r2, 13) ^ ct$1(r2, 22)) + Hs(r2, o2, i2) | 0;
      l2 = u2, u2 = a2, a2 = c2, c2 = s + y3 | 0, s = i2, i2 = o2, o2 = r2, r2 = y3 + p2 | 0;
    }
    r2 = r2 + this.A | 0, o2 = o2 + this.B | 0, i2 = i2 + this.C | 0, s = s + this.D | 0, c2 = c2 + this.E | 0, a2 = a2 + this.F | 0, u2 = u2 + this.G | 0, l2 = l2 + this.H | 0, this.set(r2, o2, i2, s, c2, a2, u2, l2);
  }
  roundClean() {
    bt$1.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Qt$2 = Qn$1(() => new Fs());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const me$2 = BigInt(0), we$2 = BigInt(1), zs = BigInt(2);
function St$3(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function te$1(t) {
  if (!St$3(t)) throw new Error("Uint8Array expected");
}
function Ct$1(t, e) {
  if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const Zs$1 = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Pt$2(t) {
  te$1(t);
  let e = "";
  for (let n2 = 0; n2 < t.length; n2++) e += Zs$1[t[n2]];
  return e;
}
function kt$2(t) {
  const e = t.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function We$2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? me$2 : BigInt("0x" + t);
}
const ut$2 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Cr$1(t) {
  if (t >= ut$2._0 && t <= ut$2._9) return t - ut$2._0;
  if (t >= ut$2.A && t <= ut$2.F) return t - (ut$2.A - 10);
  if (t >= ut$2.a && t <= ut$2.f) return t - (ut$2.a - 10);
}
function Vt$2(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e = t.length, n2 = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const r2 = new Uint8Array(n2);
  for (let o2 = 0, i2 = 0; o2 < n2; o2++, i2 += 2) {
    const s = Cr$1(t.charCodeAt(i2)), c2 = Cr$1(t.charCodeAt(i2 + 1));
    if (s === void 0 || c2 === void 0) {
      const a2 = t[i2] + t[i2 + 1];
      throw new Error('hex string expected, got non-hex character "' + a2 + '" at index ' + i2);
    }
    r2[o2] = s * 16 + c2;
  }
  return r2;
}
function Ot$2(t) {
  return We$2(Pt$2(t));
}
function ee$1(t) {
  return te$1(t), We$2(Pt$2(Uint8Array.from(t).reverse()));
}
function Mt$2(t, e) {
  return Vt$2(t.toString(16).padStart(e * 2, "0"));
}
function be$2(t, e) {
  return Mt$2(t, e).reverse();
}
function Ys(t) {
  return Vt$2(kt$2(t));
}
function et$2(t, e, n2) {
  let r2;
  if (typeof e == "string") try {
    r2 = Vt$2(e);
  } catch (i2) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + i2);
  }
  else if (St$3(e)) r2 = Uint8Array.from(e);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o2 = r2.length;
  if (typeof n2 == "number" && o2 !== n2) throw new Error(t + " of length " + n2 + " expected, got " + o2);
  return r2;
}
function ne$2(...t) {
  let e = 0;
  for (let r2 = 0; r2 < t.length; r2++) {
    const o2 = t[r2];
    te$1(o2), e += o2.length;
  }
  const n2 = new Uint8Array(e);
  for (let r2 = 0, o2 = 0; r2 < t.length; r2++) {
    const i2 = t[r2];
    n2.set(i2, o2), o2 += i2.length;
  }
  return n2;
}
function Gs(t, e) {
  if (t.length !== e.length) return false;
  let n2 = 0;
  for (let r2 = 0; r2 < t.length; r2++) n2 |= t[r2] ^ e[r2];
  return n2 === 0;
}
function Ws(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
const Xe$2 = (t) => typeof t == "bigint" && me$2 <= t;
function Ee$3(t, e, n2) {
  return Xe$2(t) && Xe$2(e) && Xe$2(n2) && e <= t && t < n2;
}
function ft$2(t, e, n2, r2) {
  if (!Ee$3(e, n2, r2)) throw new Error("expected valid " + t + ": " + n2 + " <= n < " + r2 + ", got " + e);
}
function Pr$1(t) {
  let e;
  for (e = 0; t > me$2; t >>= we$2, e += 1) ;
  return e;
}
function Xs(t, e) {
  return t >> BigInt(e) & we$2;
}
function Js(t, e, n2) {
  return t | (n2 ? we$2 : me$2) << BigInt(e);
}
const Je$2 = (t) => (zs << BigInt(t - 1)) - we$2, Qe$2 = (t) => new Uint8Array(t), kr$1 = (t) => Uint8Array.from(t);
function Vr$1(t, e, n2) {
  if (typeof t != "number" || t < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof n2 != "function") throw new Error("hmacFn must be a function");
  let r2 = Qe$2(t), o2 = Qe$2(t), i2 = 0;
  const s = () => {
    r2.fill(1), o2.fill(0), i2 = 0;
  }, c2 = (...f3) => n2(o2, r2, ...f3), a2 = (f3 = Qe$2()) => {
    o2 = c2(kr$1([0]), f3), r2 = c2(), f3.length !== 0 && (o2 = c2(kr$1([1]), f3), r2 = c2());
  }, u2 = () => {
    if (i2++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let f3 = 0;
    const h3 = [];
    for (; f3 < e; ) {
      r2 = c2();
      const y3 = r2.slice();
      h3.push(y3), f3 += r2.length;
    }
    return ne$2(...h3);
  };
  return (f3, h3) => {
    s(), a2(f3);
    let y3;
    for (; !(y3 = h3(u2())); ) a2();
    return s(), y3;
  };
}
const Qs = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || St$3(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e) => e.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Dt$1(t, e, n2 = {}) {
  const r2 = (o2, i2, s) => {
    const c2 = Qs[i2];
    if (typeof c2 != "function") throw new Error("invalid validator function");
    const a2 = t[o2];
    if (!(s && a2 === void 0) && !c2(a2, t)) throw new Error("param " + String(o2) + " is invalid. Expected " + i2 + ", got " + a2);
  };
  for (const [o2, i2] of Object.entries(e)) r2(o2, i2, false);
  for (const [o2, i2] of Object.entries(n2)) r2(o2, i2, true);
  return t;
}
const tc = () => {
  throw new Error("not implemented");
};
function tn$1(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (n2, ...r2) => {
    const o2 = e.get(n2);
    if (o2 !== void 0) return o2;
    const i2 = t(n2, ...r2);
    return e.set(n2, i2), i2;
  };
}
var ec = Object.freeze({ __proto__: null, isBytes: St$3, abytes: te$1, abool: Ct$1, bytesToHex: Pt$2, numberToHexUnpadded: kt$2, hexToNumber: We$2, hexToBytes: Vt$2, bytesToNumberBE: Ot$2, bytesToNumberLE: ee$1, numberToBytesBE: Mt$2, numberToBytesLE: be$2, numberToVarBytesBE: Ys, ensureBytes: et$2, concatBytes: ne$2, equalBytes: Gs, utf8ToBytes: Ws, inRange: Ee$3, aInRange: ft$2, bitLen: Pr$1, bitGet: Xs, bitSet: Js, bitMask: Je$2, createHmacDrbg: Vr$1, validateObject: Dt$1, notImplemented: tc, memoized: tn$1 });
const q$2 = BigInt(0), H$2 = BigInt(1), At$1 = BigInt(2), nc = BigInt(3), en = BigInt(4), Mr$1 = BigInt(5), Dr$1 = BigInt(8);
function X$2(t, e) {
  const n2 = t % e;
  return n2 >= q$2 ? n2 : e + n2;
}
function Hr$1(t, e, n2) {
  if (e < q$2) throw new Error("invalid exponent, negatives unsupported");
  if (n2 <= q$2) throw new Error("invalid modulus");
  if (n2 === H$2) return q$2;
  let r2 = H$2;
  for (; e > q$2; ) e & H$2 && (r2 = r2 * t % n2), t = t * t % n2, e >>= H$2;
  return r2;
}
function it$1(t, e, n2) {
  let r2 = t;
  for (; e-- > q$2; ) r2 *= r2, r2 %= n2;
  return r2;
}
function nn$1(t, e) {
  if (t === q$2) throw new Error("invert: expected non-zero number");
  if (e <= q$2) throw new Error("invert: expected positive modulus, got " + e);
  let n2 = X$2(t, e), r2 = e, o2 = q$2, i2 = H$2;
  for (; n2 !== q$2; ) {
    const c2 = r2 / n2, a2 = r2 % n2, u2 = o2 - i2 * c2;
    r2 = n2, n2 = a2, o2 = i2, i2 = u2;
  }
  if (r2 !== H$2) throw new Error("invert: does not exist");
  return X$2(o2, e);
}
function rc(t) {
  const e = (t - H$2) / At$1;
  let n2, r2, o2;
  for (n2 = t - H$2, r2 = 0; n2 % At$1 === q$2; n2 /= At$1, r2++) ;
  for (o2 = At$1; o2 < t && Hr$1(o2, e, t) !== t - H$2; o2++) if (o2 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r2 === 1) {
    const s = (t + H$2) / en;
    return function(a2, u2) {
      const l2 = a2.pow(u2, s);
      if (!a2.eql(a2.sqr(l2), u2)) throw new Error("Cannot find square root");
      return l2;
    };
  }
  const i2 = (n2 + H$2) / At$1;
  return function(c2, a2) {
    if (c2.pow(a2, e) === c2.neg(c2.ONE)) throw new Error("Cannot find square root");
    let u2 = r2, l2 = c2.pow(c2.mul(c2.ONE, o2), n2), f3 = c2.pow(a2, i2), h3 = c2.pow(a2, n2);
    for (; !c2.eql(h3, c2.ONE); ) {
      if (c2.eql(h3, c2.ZERO)) return c2.ZERO;
      let y3 = 1;
      for (let p2 = c2.sqr(h3); y3 < u2 && !c2.eql(p2, c2.ONE); y3++) p2 = c2.sqr(p2);
      const E2 = c2.pow(l2, H$2 << BigInt(u2 - y3 - 1));
      l2 = c2.sqr(E2), f3 = c2.mul(f3, E2), h3 = c2.mul(h3, l2), u2 = y3;
    }
    return f3;
  };
}
function oc(t) {
  if (t % en === nc) {
    const e = (t + H$2) / en;
    return function(r2, o2) {
      const i2 = r2.pow(o2, e);
      if (!r2.eql(r2.sqr(i2), o2)) throw new Error("Cannot find square root");
      return i2;
    };
  }
  if (t % Dr$1 === Mr$1) {
    const e = (t - Mr$1) / Dr$1;
    return function(r2, o2) {
      const i2 = r2.mul(o2, At$1), s = r2.pow(i2, e), c2 = r2.mul(o2, s), a2 = r2.mul(r2.mul(c2, At$1), s), u2 = r2.mul(c2, r2.sub(a2, r2.ONE));
      if (!r2.eql(r2.sqr(u2), o2)) throw new Error("Cannot find square root");
      return u2;
    };
  }
  return rc(t);
}
const ic = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function sc(t) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n2 = ic.reduce((r2, o2) => (r2[o2] = "function", r2), e);
  return Dt$1(t, n2);
}
function cc(t, e, n2) {
  if (n2 < q$2) throw new Error("invalid exponent, negatives unsupported");
  if (n2 === q$2) return t.ONE;
  if (n2 === H$2) return e;
  let r2 = t.ONE, o2 = e;
  for (; n2 > q$2; ) n2 & H$2 && (r2 = t.mul(r2, o2)), o2 = t.sqr(o2), n2 >>= H$2;
  return r2;
}
function ac(t, e) {
  const n2 = new Array(e.length), r2 = e.reduce((i2, s, c2) => t.is0(s) ? i2 : (n2[c2] = i2, t.mul(i2, s)), t.ONE), o2 = t.inv(r2);
  return e.reduceRight((i2, s, c2) => t.is0(s) ? i2 : (n2[c2] = t.mul(i2, n2[c2]), t.mul(i2, s)), o2), n2;
}
function qr$1(t, e) {
  const n2 = e !== void 0 ? e : t.toString(2).length, r2 = Math.ceil(n2 / 8);
  return { nBitLength: n2, nByteLength: r2 };
}
function Kr$1(t, e, n2 = false, r2 = {}) {
  if (t <= q$2) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: o2, nByteLength: i2 } = qr$1(t, e);
  if (i2 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let s;
  const c2 = Object.freeze({ ORDER: t, isLE: n2, BITS: o2, BYTES: i2, MASK: Je$2(o2), ZERO: q$2, ONE: H$2, create: (a2) => X$2(a2, t), isValid: (a2) => {
    if (typeof a2 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof a2);
    return q$2 <= a2 && a2 < t;
  }, is0: (a2) => a2 === q$2, isOdd: (a2) => (a2 & H$2) === H$2, neg: (a2) => X$2(-a2, t), eql: (a2, u2) => a2 === u2, sqr: (a2) => X$2(a2 * a2, t), add: (a2, u2) => X$2(a2 + u2, t), sub: (a2, u2) => X$2(a2 - u2, t), mul: (a2, u2) => X$2(a2 * u2, t), pow: (a2, u2) => cc(c2, a2, u2), div: (a2, u2) => X$2(a2 * nn$1(u2, t), t), sqrN: (a2) => a2 * a2, addN: (a2, u2) => a2 + u2, subN: (a2, u2) => a2 - u2, mulN: (a2, u2) => a2 * u2, inv: (a2) => nn$1(a2, t), sqrt: r2.sqrt || ((a2) => (s || (s = oc(t)), s(c2, a2))), invertBatch: (a2) => ac(c2, a2), cmov: (a2, u2, l2) => l2 ? u2 : a2, toBytes: (a2) => n2 ? be$2(a2, i2) : Mt$2(a2, i2), fromBytes: (a2) => {
    if (a2.length !== i2) throw new Error("Field.fromBytes: expected " + i2 + " bytes, got " + a2.length);
    return n2 ? ee$1(a2) : Ot$2(a2);
  } });
  return Object.freeze(c2);
}
function Fr$1(t) {
  if (typeof t != "bigint") throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function zr$1(t) {
  const e = Fr$1(t);
  return e + Math.ceil(e / 2);
}
function uc(t, e, n2 = false) {
  const r2 = t.length, o2 = Fr$1(e), i2 = zr$1(e);
  if (r2 < 16 || r2 < i2 || r2 > 1024) throw new Error("expected " + i2 + "-1024 bytes of input, got " + r2);
  const s = n2 ? ee$1(t) : Ot$2(t), c2 = X$2(s, e - H$2) + H$2;
  return n2 ? be$2(c2, o2) : Mt$2(c2, o2);
}
const Zr$1 = BigInt(0), ve$1 = BigInt(1);
function rn$1(t, e) {
  const n2 = e.negate();
  return t ? n2 : e;
}
function Yr$1(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function on$1(t, e) {
  Yr$1(t, e);
  const n2 = Math.ceil(e / t) + 1, r2 = 2 ** (t - 1);
  return { windows: n2, windowSize: r2 };
}
function fc(t, e) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n2, r2) => {
    if (!(n2 instanceof e)) throw new Error("invalid point at index " + r2);
  });
}
function lc(t, e) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n2, r2) => {
    if (!e.isValid(n2)) throw new Error("invalid scalar at index " + r2);
  });
}
const sn$1 = /* @__PURE__ */ new WeakMap(), Gr$1 = /* @__PURE__ */ new WeakMap();
function cn$1(t) {
  return Gr$1.get(t) || 1;
}
function dc(t, e) {
  return { constTimeNegate: rn$1, hasPrecomputes(n2) {
    return cn$1(n2) !== 1;
  }, unsafeLadder(n2, r2, o2 = t.ZERO) {
    let i2 = n2;
    for (; r2 > Zr$1; ) r2 & ve$1 && (o2 = o2.add(i2)), i2 = i2.double(), r2 >>= ve$1;
    return o2;
  }, precomputeWindow(n2, r2) {
    const { windows: o2, windowSize: i2 } = on$1(r2, e), s = [];
    let c2 = n2, a2 = c2;
    for (let u2 = 0; u2 < o2; u2++) {
      a2 = c2, s.push(a2);
      for (let l2 = 1; l2 < i2; l2++) a2 = a2.add(c2), s.push(a2);
      c2 = a2.double();
    }
    return s;
  }, wNAF(n2, r2, o2) {
    const { windows: i2, windowSize: s } = on$1(n2, e);
    let c2 = t.ZERO, a2 = t.BASE;
    const u2 = BigInt(2 ** n2 - 1), l2 = 2 ** n2, f3 = BigInt(n2);
    for (let h3 = 0; h3 < i2; h3++) {
      const y3 = h3 * s;
      let E2 = Number(o2 & u2);
      o2 >>= f3, E2 > s && (E2 -= l2, o2 += ve$1);
      const p2 = y3, d4 = y3 + Math.abs(E2) - 1, v2 = h3 % 2 !== 0, m3 = E2 < 0;
      E2 === 0 ? a2 = a2.add(rn$1(v2, r2[p2])) : c2 = c2.add(rn$1(m3, r2[d4]));
    }
    return { p: c2, f: a2 };
  }, wNAFUnsafe(n2, r2, o2, i2 = t.ZERO) {
    const { windows: s, windowSize: c2 } = on$1(n2, e), a2 = BigInt(2 ** n2 - 1), u2 = 2 ** n2, l2 = BigInt(n2);
    for (let f3 = 0; f3 < s; f3++) {
      const h3 = f3 * c2;
      if (o2 === Zr$1) break;
      let y3 = Number(o2 & a2);
      if (o2 >>= l2, y3 > c2 && (y3 -= u2, o2 += ve$1), y3 === 0) continue;
      let E2 = r2[h3 + Math.abs(y3) - 1];
      y3 < 0 && (E2 = E2.negate()), i2 = i2.add(E2);
    }
    return i2;
  }, getPrecomputes(n2, r2, o2) {
    let i2 = sn$1.get(r2);
    return i2 || (i2 = this.precomputeWindow(r2, n2), n2 !== 1 && sn$1.set(r2, o2(i2))), i2;
  }, wNAFCached(n2, r2, o2) {
    const i2 = cn$1(n2);
    return this.wNAF(i2, this.getPrecomputes(i2, n2, o2), r2);
  }, wNAFCachedUnsafe(n2, r2, o2, i2) {
    const s = cn$1(n2);
    return s === 1 ? this.unsafeLadder(n2, r2, i2) : this.wNAFUnsafe(s, this.getPrecomputes(s, n2, o2), r2, i2);
  }, setWindowSize(n2, r2) {
    Yr$1(r2, e), Gr$1.set(n2, r2), sn$1.delete(n2);
  } };
}
function hc(t, e, n2, r2) {
  if (fc(n2, t), lc(r2, e), n2.length !== r2.length) throw new Error("arrays of points and scalars must have equal length");
  const o2 = t.ZERO, i2 = Pr$1(BigInt(n2.length)), s = i2 > 12 ? i2 - 3 : i2 > 4 ? i2 - 2 : i2 ? 2 : 1, c2 = (1 << s) - 1, a2 = new Array(c2 + 1).fill(o2), u2 = Math.floor((e.BITS - 1) / s) * s;
  let l2 = o2;
  for (let f3 = u2; f3 >= 0; f3 -= s) {
    a2.fill(o2);
    for (let y3 = 0; y3 < r2.length; y3++) {
      const E2 = r2[y3], p2 = Number(E2 >> BigInt(f3) & BigInt(c2));
      a2[p2] = a2[p2].add(n2[y3]);
    }
    let h3 = o2;
    for (let y3 = a2.length - 1, E2 = o2; y3 > 0; y3--) E2 = E2.add(a2[y3]), h3 = h3.add(E2);
    if (l2 = l2.add(h3), f3 !== 0) for (let y3 = 0; y3 < s; y3++) l2 = l2.double();
  }
  return l2;
}
function Wr$1(t) {
  return sc(t.Fp), Dt$1(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...qr$1(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const Ht$1 = BigInt(0), an$1 = BigInt(1);
function pc(t) {
  return Dt$1(t, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...t });
}
function gc(t) {
  const e = pc(t), { P: n2 } = e, r2 = (m3) => X$2(m3, n2), o2 = e.montgomeryBits, i2 = Math.ceil(o2 / 8), s = e.nByteLength, c2 = e.adjustScalarBytes || ((m3) => m3), a2 = e.powPminus2 || ((m3) => Hr$1(m3, n2 - BigInt(2), n2));
  function u2(m3, O4, N2) {
    const $2 = r2(m3 * (O4 - N2));
    return O4 = r2(O4 - $2), N2 = r2(N2 + $2), [O4, N2];
  }
  const l2 = (e.a - BigInt(2)) / BigInt(4);
  function f3(m3, O4) {
    ft$2("u", m3, Ht$1, n2), ft$2("scalar", O4, Ht$1, n2);
    const N2 = O4, $2 = m3;
    let B4 = an$1, A2 = Ht$1, T2 = m3, S3 = an$1, L3 = Ht$1, U2;
    for (let j2 = BigInt(o2 - 1); j2 >= Ht$1; j2--) {
      const g2 = N2 >> j2 & an$1;
      L3 ^= g2, U2 = u2(L3, B4, T2), B4 = U2[0], T2 = U2[1], U2 = u2(L3, A2, S3), A2 = U2[0], S3 = U2[1], L3 = g2;
      const w2 = B4 + A2, b2 = r2(w2 * w2), I3 = B4 - A2, R3 = r2(I3 * I3), x2 = b2 - R3, C2 = T2 + S3, P3 = T2 - S3, k2 = r2(P3 * w2), M3 = r2(C2 * I3), D2 = k2 + M3, z2 = k2 - M3;
      T2 = r2(D2 * D2), S3 = r2($2 * r2(z2 * z2)), B4 = r2(b2 * R3), A2 = r2(x2 * (b2 + r2(l2 * x2)));
    }
    U2 = u2(L3, B4, T2), B4 = U2[0], T2 = U2[1], U2 = u2(L3, A2, S3), A2 = U2[0], S3 = U2[1];
    const _2 = a2(A2);
    return r2(B4 * _2);
  }
  function h3(m3) {
    return be$2(r2(m3), i2);
  }
  function y3(m3) {
    const O4 = et$2("u coordinate", m3, i2);
    return s === 32 && (O4[31] &= 127), ee$1(O4);
  }
  function E2(m3) {
    const O4 = et$2("scalar", m3), N2 = O4.length;
    if (N2 !== i2 && N2 !== s) {
      let $2 = "" + i2 + " or " + s;
      throw new Error("invalid scalar, expected " + $2 + " bytes, got " + N2);
    }
    return ee$1(c2(O4));
  }
  function p2(m3, O4) {
    const N2 = y3(O4), $2 = E2(m3), B4 = f3(N2, $2);
    if (B4 === Ht$1) throw new Error("invalid private or public key received");
    return h3(B4);
  }
  const d4 = h3(e.Gu);
  function v2(m3) {
    return p2(m3, d4);
  }
  return { scalarMult: p2, scalarMultBase: v2, getSharedSecret: (m3, O4) => p2(m3, O4), getPublicKey: (m3) => v2(m3), utils: { randomPrivateKey: () => e.randomBytes(e.nByteLength) }, GuBytes: d4 };
}
const un$1 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
const yc = BigInt(1), Xr$1 = BigInt(2), mc = BigInt(3), wc = BigInt(5);
BigInt(8);
function bc(t) {
  const e = BigInt(10), n2 = BigInt(20), r2 = BigInt(40), o2 = BigInt(80), i2 = un$1, c2 = t * t % i2 * t % i2, a2 = it$1(c2, Xr$1, i2) * c2 % i2, u2 = it$1(a2, yc, i2) * t % i2, l2 = it$1(u2, wc, i2) * u2 % i2, f3 = it$1(l2, e, i2) * l2 % i2, h3 = it$1(f3, n2, i2) * f3 % i2, y3 = it$1(h3, r2, i2) * h3 % i2, E2 = it$1(y3, o2, i2) * y3 % i2, p2 = it$1(E2, o2, i2) * y3 % i2, d4 = it$1(p2, e, i2) * l2 % i2;
  return { pow_p_5_8: it$1(d4, Xr$1, i2) * t % i2, b2: c2 };
}
function Ec(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
const fn$1 = gc({ P: un$1, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (t) => {
  const e = un$1, { pow_p_5_8: n2, b2: r2 } = bc(t);
  return X$2(it$1(n2, mc, e) * r2, e);
}, adjustScalarBytes: Ec, randomBytes: Lt$2 });
function Jr$1(t) {
  t.lowS !== void 0 && Ct$1("lowS", t.lowS), t.prehash !== void 0 && Ct$1("prehash", t.prehash);
}
function vc(t) {
  const e = Wr$1(t);
  Dt$1(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  const { endo: n2, Fp: r2, a: o2 } = e;
  if (n2) {
    if (!r2.eql(o2, r2.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof n2 != "object" || typeof n2.beta != "bigint" || typeof n2.splitScalar != "function") throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: xc, hexToBytes: Sc } = ec;
class Oc extends Error {
  constructor(e = "") {
    super(e);
  }
}
const lt$1 = { Err: Oc, _tlv: { encode: (t, e) => {
  const { Err: n2 } = lt$1;
  if (t < 0 || t > 256) throw new n2("tlv.encode: wrong tag");
  if (e.length & 1) throw new n2("tlv.encode: unpadded data");
  const r2 = e.length / 2, o2 = kt$2(r2);
  if (o2.length / 2 & 128) throw new n2("tlv.encode: long form length too big");
  const i2 = r2 > 127 ? kt$2(o2.length / 2 | 128) : "";
  return kt$2(t) + i2 + o2 + e;
}, decode(t, e) {
  const { Err: n2 } = lt$1;
  let r2 = 0;
  if (t < 0 || t > 256) throw new n2("tlv.encode: wrong tag");
  if (e.length < 2 || e[r2++] !== t) throw new n2("tlv.decode: wrong tlv");
  const o2 = e[r2++], i2 = !!(o2 & 128);
  let s = 0;
  if (!i2) s = o2;
  else {
    const a2 = o2 & 127;
    if (!a2) throw new n2("tlv.decode(long): indefinite length not supported");
    if (a2 > 4) throw new n2("tlv.decode(long): byte length is too big");
    const u2 = e.subarray(r2, r2 + a2);
    if (u2.length !== a2) throw new n2("tlv.decode: length bytes not complete");
    if (u2[0] === 0) throw new n2("tlv.decode(long): zero leftmost byte");
    for (const l2 of u2) s = s << 8 | l2;
    if (r2 += a2, s < 128) throw new n2("tlv.decode(long): not minimal encoding");
  }
  const c2 = e.subarray(r2, r2 + s);
  if (c2.length !== s) throw new n2("tlv.decode: wrong value length");
  return { v: c2, l: e.subarray(r2 + s) };
} }, _int: { encode(t) {
  const { Err: e } = lt$1;
  if (t < dt$2) throw new e("integer: negative integers are not allowed");
  let n2 = kt$2(t);
  if (Number.parseInt(n2[0], 16) & 8 && (n2 = "00" + n2), n2.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
  return n2;
}, decode(t) {
  const { Err: e } = lt$1;
  if (t[0] & 128) throw new e("invalid signature integer: negative");
  if (t[0] === 0 && !(t[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
  return xc(t);
} }, toSig(t) {
  const { Err: e, _int: n2, _tlv: r2 } = lt$1, o2 = typeof t == "string" ? Sc(t) : t;
  te$1(o2);
  const { v: i2, l: s } = r2.decode(48, o2);
  if (s.length) throw new e("invalid signature: left bytes after parsing");
  const { v: c2, l: a2 } = r2.decode(2, i2), { v: u2, l: l2 } = r2.decode(2, a2);
  if (l2.length) throw new e("invalid signature: left bytes after parsing");
  return { r: n2.decode(c2), s: n2.decode(u2) };
}, hexFromSig(t) {
  const { _tlv: e, _int: n2 } = lt$1, r2 = e.encode(2, n2.encode(t.r)), o2 = e.encode(2, n2.encode(t.s)), i2 = r2 + o2;
  return e.encode(48, i2);
} }, dt$2 = BigInt(0), K$2 = BigInt(1);
BigInt(2);
const Qr$1 = BigInt(3);
BigInt(4);
function Ac(t) {
  const e = vc(t), { Fp: n2 } = e, r2 = Kr$1(e.n, e.nBitLength), o2 = e.toBytes || ((p2, d4, v2) => {
    const m3 = d4.toAffine();
    return ne$2(Uint8Array.from([4]), n2.toBytes(m3.x), n2.toBytes(m3.y));
  }), i2 = e.fromBytes || ((p2) => {
    const d4 = p2.subarray(1), v2 = n2.fromBytes(d4.subarray(0, n2.BYTES)), m3 = n2.fromBytes(d4.subarray(n2.BYTES, 2 * n2.BYTES));
    return { x: v2, y: m3 };
  });
  function s(p2) {
    const { a: d4, b: v2 } = e, m3 = n2.sqr(p2), O4 = n2.mul(m3, p2);
    return n2.add(n2.add(O4, n2.mul(p2, d4)), v2);
  }
  if (!n2.eql(n2.sqr(e.Gy), s(e.Gx))) throw new Error("bad generator point: equation left != right");
  function c2(p2) {
    return Ee$3(p2, K$2, e.n);
  }
  function a2(p2) {
    const { allowedPrivateKeyLengths: d4, nByteLength: v2, wrapPrivateKey: m3, n: O4 } = e;
    if (d4 && typeof p2 != "bigint") {
      if (St$3(p2) && (p2 = Pt$2(p2)), typeof p2 != "string" || !d4.includes(p2.length)) throw new Error("invalid private key");
      p2 = p2.padStart(v2 * 2, "0");
    }
    let N2;
    try {
      N2 = typeof p2 == "bigint" ? p2 : Ot$2(et$2("private key", p2, v2));
    } catch {
      throw new Error("invalid private key, expected hex or " + v2 + " bytes, got " + typeof p2);
    }
    return m3 && (N2 = X$2(N2, O4)), ft$2("private key", N2, K$2, O4), N2;
  }
  function u2(p2) {
    if (!(p2 instanceof h3)) throw new Error("ProjectivePoint expected");
  }
  const l2 = tn$1((p2, d4) => {
    const { px: v2, py: m3, pz: O4 } = p2;
    if (n2.eql(O4, n2.ONE)) return { x: v2, y: m3 };
    const N2 = p2.is0();
    d4 == null && (d4 = N2 ? n2.ONE : n2.inv(O4));
    const $2 = n2.mul(v2, d4), B4 = n2.mul(m3, d4), A2 = n2.mul(O4, d4);
    if (N2) return { x: n2.ZERO, y: n2.ZERO };
    if (!n2.eql(A2, n2.ONE)) throw new Error("invZ was invalid");
    return { x: $2, y: B4 };
  }), f3 = tn$1((p2) => {
    if (p2.is0()) {
      if (e.allowInfinityPoint && !n2.is0(p2.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: d4, y: v2 } = p2.toAffine();
    if (!n2.isValid(d4) || !n2.isValid(v2)) throw new Error("bad point: x or y not FE");
    const m3 = n2.sqr(v2), O4 = s(d4);
    if (!n2.eql(m3, O4)) throw new Error("bad point: equation left != right");
    if (!p2.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class h3 {
    constructor(d4, v2, m3) {
      if (this.px = d4, this.py = v2, this.pz = m3, d4 == null || !n2.isValid(d4)) throw new Error("x required");
      if (v2 == null || !n2.isValid(v2)) throw new Error("y required");
      if (m3 == null || !n2.isValid(m3)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(d4) {
      const { x: v2, y: m3 } = d4 || {};
      if (!d4 || !n2.isValid(v2) || !n2.isValid(m3)) throw new Error("invalid affine point");
      if (d4 instanceof h3) throw new Error("projective point not allowed");
      const O4 = (N2) => n2.eql(N2, n2.ZERO);
      return O4(v2) && O4(m3) ? h3.ZERO : new h3(v2, m3, n2.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(d4) {
      const v2 = n2.invertBatch(d4.map((m3) => m3.pz));
      return d4.map((m3, O4) => m3.toAffine(v2[O4])).map(h3.fromAffine);
    }
    static fromHex(d4) {
      const v2 = h3.fromAffine(i2(et$2("pointHex", d4)));
      return v2.assertValidity(), v2;
    }
    static fromPrivateKey(d4) {
      return h3.BASE.multiply(a2(d4));
    }
    static msm(d4, v2) {
      return hc(h3, r2, d4, v2);
    }
    _setWindowSize(d4) {
      E2.setWindowSize(this, d4);
    }
    assertValidity() {
      f3(this);
    }
    hasEvenY() {
      const { y: d4 } = this.toAffine();
      if (n2.isOdd) return !n2.isOdd(d4);
      throw new Error("Field doesn't support isOdd");
    }
    equals(d4) {
      u2(d4);
      const { px: v2, py: m3, pz: O4 } = this, { px: N2, py: $2, pz: B4 } = d4, A2 = n2.eql(n2.mul(v2, B4), n2.mul(N2, O4)), T2 = n2.eql(n2.mul(m3, B4), n2.mul($2, O4));
      return A2 && T2;
    }
    negate() {
      return new h3(this.px, n2.neg(this.py), this.pz);
    }
    double() {
      const { a: d4, b: v2 } = e, m3 = n2.mul(v2, Qr$1), { px: O4, py: N2, pz: $2 } = this;
      let B4 = n2.ZERO, A2 = n2.ZERO, T2 = n2.ZERO, S3 = n2.mul(O4, O4), L3 = n2.mul(N2, N2), U2 = n2.mul($2, $2), _2 = n2.mul(O4, N2);
      return _2 = n2.add(_2, _2), T2 = n2.mul(O4, $2), T2 = n2.add(T2, T2), B4 = n2.mul(d4, T2), A2 = n2.mul(m3, U2), A2 = n2.add(B4, A2), B4 = n2.sub(L3, A2), A2 = n2.add(L3, A2), A2 = n2.mul(B4, A2), B4 = n2.mul(_2, B4), T2 = n2.mul(m3, T2), U2 = n2.mul(d4, U2), _2 = n2.sub(S3, U2), _2 = n2.mul(d4, _2), _2 = n2.add(_2, T2), T2 = n2.add(S3, S3), S3 = n2.add(T2, S3), S3 = n2.add(S3, U2), S3 = n2.mul(S3, _2), A2 = n2.add(A2, S3), U2 = n2.mul(N2, $2), U2 = n2.add(U2, U2), S3 = n2.mul(U2, _2), B4 = n2.sub(B4, S3), T2 = n2.mul(U2, L3), T2 = n2.add(T2, T2), T2 = n2.add(T2, T2), new h3(B4, A2, T2);
    }
    add(d4) {
      u2(d4);
      const { px: v2, py: m3, pz: O4 } = this, { px: N2, py: $2, pz: B4 } = d4;
      let A2 = n2.ZERO, T2 = n2.ZERO, S3 = n2.ZERO;
      const L3 = e.a, U2 = n2.mul(e.b, Qr$1);
      let _2 = n2.mul(v2, N2), j2 = n2.mul(m3, $2), g2 = n2.mul(O4, B4), w2 = n2.add(v2, m3), b2 = n2.add(N2, $2);
      w2 = n2.mul(w2, b2), b2 = n2.add(_2, j2), w2 = n2.sub(w2, b2), b2 = n2.add(v2, O4);
      let I3 = n2.add(N2, B4);
      return b2 = n2.mul(b2, I3), I3 = n2.add(_2, g2), b2 = n2.sub(b2, I3), I3 = n2.add(m3, O4), A2 = n2.add($2, B4), I3 = n2.mul(I3, A2), A2 = n2.add(j2, g2), I3 = n2.sub(I3, A2), S3 = n2.mul(L3, b2), A2 = n2.mul(U2, g2), S3 = n2.add(A2, S3), A2 = n2.sub(j2, S3), S3 = n2.add(j2, S3), T2 = n2.mul(A2, S3), j2 = n2.add(_2, _2), j2 = n2.add(j2, _2), g2 = n2.mul(L3, g2), b2 = n2.mul(U2, b2), j2 = n2.add(j2, g2), g2 = n2.sub(_2, g2), g2 = n2.mul(L3, g2), b2 = n2.add(b2, g2), _2 = n2.mul(j2, b2), T2 = n2.add(T2, _2), _2 = n2.mul(I3, b2), A2 = n2.mul(w2, A2), A2 = n2.sub(A2, _2), _2 = n2.mul(w2, j2), S3 = n2.mul(I3, S3), S3 = n2.add(S3, _2), new h3(A2, T2, S3);
    }
    subtract(d4) {
      return this.add(d4.negate());
    }
    is0() {
      return this.equals(h3.ZERO);
    }
    wNAF(d4) {
      return E2.wNAFCached(this, d4, h3.normalizeZ);
    }
    multiplyUnsafe(d4) {
      const { endo: v2, n: m3 } = e;
      ft$2("scalar", d4, dt$2, m3);
      const O4 = h3.ZERO;
      if (d4 === dt$2) return O4;
      if (this.is0() || d4 === K$2) return this;
      if (!v2 || E2.hasPrecomputes(this)) return E2.wNAFCachedUnsafe(this, d4, h3.normalizeZ);
      let { k1neg: N2, k1: $2, k2neg: B4, k2: A2 } = v2.splitScalar(d4), T2 = O4, S3 = O4, L3 = this;
      for (; $2 > dt$2 || A2 > dt$2; ) $2 & K$2 && (T2 = T2.add(L3)), A2 & K$2 && (S3 = S3.add(L3)), L3 = L3.double(), $2 >>= K$2, A2 >>= K$2;
      return N2 && (T2 = T2.negate()), B4 && (S3 = S3.negate()), S3 = new h3(n2.mul(S3.px, v2.beta), S3.py, S3.pz), T2.add(S3);
    }
    multiply(d4) {
      const { endo: v2, n: m3 } = e;
      ft$2("scalar", d4, K$2, m3);
      let O4, N2;
      if (v2) {
        const { k1neg: $2, k1: B4, k2neg: A2, k2: T2 } = v2.splitScalar(d4);
        let { p: S3, f: L3 } = this.wNAF(B4), { p: U2, f: _2 } = this.wNAF(T2);
        S3 = E2.constTimeNegate($2, S3), U2 = E2.constTimeNegate(A2, U2), U2 = new h3(n2.mul(U2.px, v2.beta), U2.py, U2.pz), O4 = S3.add(U2), N2 = L3.add(_2);
      } else {
        const { p: $2, f: B4 } = this.wNAF(d4);
        O4 = $2, N2 = B4;
      }
      return h3.normalizeZ([O4, N2])[0];
    }
    multiplyAndAddUnsafe(d4, v2, m3) {
      const O4 = h3.BASE, N2 = (B4, A2) => A2 === dt$2 || A2 === K$2 || !B4.equals(O4) ? B4.multiplyUnsafe(A2) : B4.multiply(A2), $2 = N2(this, v2).add(N2(d4, m3));
      return $2.is0() ? void 0 : $2;
    }
    toAffine(d4) {
      return l2(this, d4);
    }
    isTorsionFree() {
      const { h: d4, isTorsionFree: v2 } = e;
      if (d4 === K$2) return true;
      if (v2) return v2(h3, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d4, clearCofactor: v2 } = e;
      return d4 === K$2 ? this : v2 ? v2(h3, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(d4 = true) {
      return Ct$1("isCompressed", d4), this.assertValidity(), o2(h3, this, d4);
    }
    toHex(d4 = true) {
      return Ct$1("isCompressed", d4), Pt$2(this.toRawBytes(d4));
    }
  }
  h3.BASE = new h3(e.Gx, e.Gy, n2.ONE), h3.ZERO = new h3(n2.ZERO, n2.ONE, n2.ZERO);
  const y3 = e.nBitLength, E2 = dc(h3, e.endo ? Math.ceil(y3 / 2) : y3);
  return { CURVE: e, ProjectivePoint: h3, normPrivateKeyToScalar: a2, weierstrassEquation: s, isWithinCurveOrder: c2 };
}
function Bc(t) {
  const e = Wr$1(t);
  return Dt$1(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: true, ...e });
}
function Ic(t) {
  const e = Bc(t), { Fp: n2, n: r2 } = e, o2 = n2.BYTES + 1, i2 = 2 * n2.BYTES + 1;
  function s(g2) {
    return X$2(g2, r2);
  }
  function c2(g2) {
    return nn$1(g2, r2);
  }
  const { ProjectivePoint: a2, normPrivateKeyToScalar: u2, weierstrassEquation: l2, isWithinCurveOrder: f3 } = Ac({ ...e, toBytes(g2, w2, b2) {
    const I3 = w2.toAffine(), R3 = n2.toBytes(I3.x), x2 = ne$2;
    return Ct$1("isCompressed", b2), b2 ? x2(Uint8Array.from([w2.hasEvenY() ? 2 : 3]), R3) : x2(Uint8Array.from([4]), R3, n2.toBytes(I3.y));
  }, fromBytes(g2) {
    const w2 = g2.length, b2 = g2[0], I3 = g2.subarray(1);
    if (w2 === o2 && (b2 === 2 || b2 === 3)) {
      const R3 = Ot$2(I3);
      if (!Ee$3(R3, K$2, n2.ORDER)) throw new Error("Point is not on curve");
      const x2 = l2(R3);
      let C2;
      try {
        C2 = n2.sqrt(x2);
      } catch (M3) {
        const D2 = M3 instanceof Error ? ": " + M3.message : "";
        throw new Error("Point is not on curve" + D2);
      }
      const P3 = (C2 & K$2) === K$2;
      return (b2 & 1) === 1 !== P3 && (C2 = n2.neg(C2)), { x: R3, y: C2 };
    } else if (w2 === i2 && b2 === 4) {
      const R3 = n2.fromBytes(I3.subarray(0, n2.BYTES)), x2 = n2.fromBytes(I3.subarray(n2.BYTES, 2 * n2.BYTES));
      return { x: R3, y: x2 };
    } else {
      const R3 = o2, x2 = i2;
      throw new Error("invalid Point, expected length of " + R3 + ", or uncompressed " + x2 + ", got " + w2);
    }
  } }), h3 = (g2) => Pt$2(Mt$2(g2, e.nByteLength));
  function y3(g2) {
    const w2 = r2 >> K$2;
    return g2 > w2;
  }
  function E2(g2) {
    return y3(g2) ? s(-g2) : g2;
  }
  const p2 = (g2, w2, b2) => Ot$2(g2.slice(w2, b2));
  class d4 {
    constructor(w2, b2, I3) {
      this.r = w2, this.s = b2, this.recovery = I3, this.assertValidity();
    }
    static fromCompact(w2) {
      const b2 = e.nByteLength;
      return w2 = et$2("compactSignature", w2, b2 * 2), new d4(p2(w2, 0, b2), p2(w2, b2, 2 * b2));
    }
    static fromDER(w2) {
      const { r: b2, s: I3 } = lt$1.toSig(et$2("DER", w2));
      return new d4(b2, I3);
    }
    assertValidity() {
      ft$2("r", this.r, K$2, r2), ft$2("s", this.s, K$2, r2);
    }
    addRecoveryBit(w2) {
      return new d4(this.r, this.s, w2);
    }
    recoverPublicKey(w2) {
      const { r: b2, s: I3, recovery: R3 } = this, x2 = B4(et$2("msgHash", w2));
      if (R3 == null || ![0, 1, 2, 3].includes(R3)) throw new Error("recovery id invalid");
      const C2 = R3 === 2 || R3 === 3 ? b2 + e.n : b2;
      if (C2 >= n2.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const P3 = (R3 & 1) === 0 ? "02" : "03", k2 = a2.fromHex(P3 + h3(C2)), M3 = c2(C2), D2 = s(-x2 * M3), z2 = s(I3 * M3), Z2 = a2.BASE.multiplyAndAddUnsafe(k2, D2, z2);
      if (!Z2) throw new Error("point at infinify");
      return Z2.assertValidity(), Z2;
    }
    hasHighS() {
      return y3(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new d4(this.r, s(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Vt$2(this.toDERHex());
    }
    toDERHex() {
      return lt$1.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return Vt$2(this.toCompactHex());
    }
    toCompactHex() {
      return h3(this.r) + h3(this.s);
    }
  }
  const v2 = { isValidPrivateKey(g2) {
    try {
      return u2(g2), true;
    } catch {
      return false;
    }
  }, normPrivateKeyToScalar: u2, randomPrivateKey: () => {
    const g2 = zr$1(e.n);
    return uc(e.randomBytes(g2), e.n);
  }, precompute(g2 = 8, w2 = a2.BASE) {
    return w2._setWindowSize(g2), w2.multiply(BigInt(3)), w2;
  } };
  function m3(g2, w2 = true) {
    return a2.fromPrivateKey(g2).toRawBytes(w2);
  }
  function O4(g2) {
    const w2 = St$3(g2), b2 = typeof g2 == "string", I3 = (w2 || b2) && g2.length;
    return w2 ? I3 === o2 || I3 === i2 : b2 ? I3 === 2 * o2 || I3 === 2 * i2 : g2 instanceof a2;
  }
  function N2(g2, w2, b2 = true) {
    if (O4(g2)) throw new Error("first arg must be private key");
    if (!O4(w2)) throw new Error("second arg must be public key");
    return a2.fromHex(w2).multiply(u2(g2)).toRawBytes(b2);
  }
  const $2 = e.bits2int || function(g2) {
    if (g2.length > 8192) throw new Error("input is too large");
    const w2 = Ot$2(g2), b2 = g2.length * 8 - e.nBitLength;
    return b2 > 0 ? w2 >> BigInt(b2) : w2;
  }, B4 = e.bits2int_modN || function(g2) {
    return s($2(g2));
  }, A2 = Je$2(e.nBitLength);
  function T2(g2) {
    return ft$2("num < 2^" + e.nBitLength, g2, dt$2, A2), Mt$2(g2, e.nByteLength);
  }
  function S3(g2, w2, b2 = L3) {
    if (["recovered", "canonical"].some((W2) => W2 in b2)) throw new Error("sign() legacy options not supported");
    const { hash: I3, randomBytes: R3 } = e;
    let { lowS: x2, prehash: C2, extraEntropy: P3 } = b2;
    x2 == null && (x2 = true), g2 = et$2("msgHash", g2), Jr$1(b2), C2 && (g2 = et$2("prehashed msgHash", I3(g2)));
    const k2 = B4(g2), M3 = u2(w2), D2 = [T2(M3), T2(k2)];
    if (P3 != null && P3 !== false) {
      const W2 = P3 === true ? R3(n2.BYTES) : P3;
      D2.push(et$2("extraEntropy", W2));
    }
    const z2 = ne$2(...D2), Z2 = k2;
    function st2(W2) {
      const J3 = $2(W2);
      if (!f3(J3)) return;
      const Be2 = c2(J3), zt2 = a2.BASE.multiply(J3).toAffine(), vt2 = s(zt2.x);
      if (vt2 === dt$2) return;
      const Zt2 = s(Be2 * s(Z2 + vt2 * M3));
      if (Zt2 === dt$2) return;
      let Ut2 = (zt2.x === vt2 ? 0 : 2) | Number(zt2.y & K$2), vn2 = Zt2;
      return x2 && y3(Zt2) && (vn2 = E2(Zt2), Ut2 ^= 1), new d4(vt2, vn2, Ut2);
    }
    return { seed: z2, k2sig: st2 };
  }
  const L3 = { lowS: e.lowS, prehash: false }, U2 = { lowS: e.lowS, prehash: false };
  function _2(g2, w2, b2 = L3) {
    const { seed: I3, k2sig: R3 } = S3(g2, w2, b2), x2 = e;
    return Vr$1(x2.hash.outputLen, x2.nByteLength, x2.hmac)(I3, R3);
  }
  a2.BASE._setWindowSize(8);
  function j2(g2, w2, b2, I3 = U2) {
    var _a;
    const R3 = g2;
    w2 = et$2("msgHash", w2), b2 = et$2("publicKey", b2);
    const { lowS: x2, prehash: C2, format: P3 } = I3;
    if (Jr$1(I3), "strict" in I3) throw new Error("options.strict was renamed to lowS");
    if (P3 !== void 0 && P3 !== "compact" && P3 !== "der") throw new Error("format must be compact or der");
    const k2 = typeof R3 == "string" || St$3(R3), M3 = !k2 && !P3 && typeof R3 == "object" && R3 !== null && typeof R3.r == "bigint" && typeof R3.s == "bigint";
    if (!k2 && !M3) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let D2, z2;
    try {
      if (M3 && (D2 = new d4(R3.r, R3.s)), k2) {
        try {
          P3 !== "compact" && (D2 = d4.fromDER(R3));
        } catch (Ut2) {
          if (!(Ut2 instanceof lt$1.Err)) throw Ut2;
        }
        !D2 && P3 !== "der" && (D2 = d4.fromCompact(R3));
      }
      z2 = a2.fromHex(b2);
    } catch {
      return false;
    }
    if (!D2 || x2 && D2.hasHighS()) return false;
    C2 && (w2 = e.hash(w2));
    const { r: Z2, s: st2 } = D2, W2 = B4(w2), J3 = c2(st2), Be2 = s(W2 * J3), zt2 = s(Z2 * J3), vt2 = (_a = a2.BASE.multiplyAndAddUnsafe(z2, Be2, zt2)) == null ? void 0 : _a.toAffine();
    return vt2 ? s(vt2.x) === Z2 : false;
  }
  return { CURVE: e, getPublicKey: m3, getSharedSecret: N2, sign: _2, verify: j2, ProjectivePoint: a2, Signature: d4, utils: v2 };
}
function Nc(t) {
  return { hash: t, hmac: (e, ...n2) => ye$2(t, e, Vi$1(...n2)), randomBytes: Lt$2 };
}
function Uc(t, e) {
  const n2 = (r2) => Ic({ ...t, ...Nc(r2) });
  return { ...n2(e), create: n2 };
}
const to$1 = Kr$1(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Tc = to$1.create(BigInt("-3")), Rc = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), _c = Uc({ a: Tc, b: Rc, Fp: to$1, n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"), h: BigInt(1), lowS: false }, Qt$2), ln$1 = "base10", G$2 = "base16", qt$2 = "base64pad", xe$1 = "base64url", Kt$2 = "utf8", dn$1 = 0, Ft$2 = 1, re$2 = 2, $c = 0, eo$1 = 1, oe$1 = 12, hn$1 = 32;
function Lc() {
  const t = fn$1.utils.randomPrivateKey(), e = fn$1.getPublicKey(t);
  return { privateKey: toString(t, G$2), publicKey: toString(e, G$2) };
}
function jc() {
  const t = Lt$2(hn$1);
  return toString(t, G$2);
}
function Cc(t, e) {
  const n2 = fn$1.getSharedSecret(fromString(t, G$2), fromString(e, G$2)), r2 = Vs$1(Qt$2, n2, void 0, void 0, hn$1);
  return toString(r2, G$2);
}
function Pc(t) {
  const e = Qt$2(fromString(t, G$2));
  return toString(e, G$2);
}
function kc(t) {
  const e = Qt$2(fromString(t, Kt$2));
  return toString(e, G$2);
}
function pn$1(t) {
  return fromString(`${t}`, ln$1);
}
function Bt$2(t) {
  return Number(toString(t, ln$1));
}
function no$1(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function ro$1(t) {
  const e = t.replace(/-/g, "+").replace(/_/g, "/"), n2 = (4 - e.length % 4) % 4;
  return e + "=".repeat(n2);
}
function Vc(t) {
  const e = pn$1(typeof t.type < "u" ? t.type : dn$1);
  if (Bt$2(e) === Ft$2 && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n2 = typeof t.senderPublicKey < "u" ? fromString(t.senderPublicKey, G$2) : void 0, r2 = typeof t.iv < "u" ? fromString(t.iv, G$2) : Lt$2(oe$1), o2 = fromString(t.symKey, G$2), i2 = $r$1(o2, r2).encrypt(fromString(t.message, Kt$2)), s = gn$1({ type: e, sealed: i2, iv: r2, senderPublicKey: n2 });
  return t.encoding === xe$1 ? no$1(s) : s;
}
function Mc(t) {
  const e = fromString(t.symKey, G$2), { sealed: n2, iv: r2 } = Se$1({ encoded: t.encoded, encoding: t.encoding }), o2 = $r$1(e, r2).decrypt(n2);
  if (o2 === null) throw new Error("Failed to decrypt");
  return toString(o2, Kt$2);
}
function Dc(t, e) {
  const n2 = pn$1(re$2), r2 = Lt$2(oe$1), o2 = fromString(t, Kt$2), i2 = gn$1({ type: n2, sealed: o2, iv: r2 });
  return e === xe$1 ? no$1(i2) : i2;
}
function Hc(t, e) {
  const { sealed: n2 } = Se$1({ encoded: t, encoding: e });
  return toString(n2, Kt$2);
}
function gn$1(t) {
  if (Bt$2(t.type) === re$2) return toString(concat([t.type, t.sealed]), qt$2);
  if (Bt$2(t.type) === Ft$2) {
    if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString(concat([t.type, t.senderPublicKey, t.iv, t.sealed]), qt$2);
  }
  return toString(concat([t.type, t.iv, t.sealed]), qt$2);
}
function Se$1(t) {
  const e = (t.encoding || qt$2) === xe$1 ? ro$1(t.encoded) : t.encoded, n2 = fromString(e, qt$2), r2 = n2.slice($c, eo$1), o2 = eo$1;
  if (Bt$2(r2) === Ft$2) {
    const a2 = o2 + hn$1, u2 = a2 + oe$1, l2 = n2.slice(o2, a2), f3 = n2.slice(a2, u2), h3 = n2.slice(u2);
    return { type: r2, sealed: h3, iv: f3, senderPublicKey: l2 };
  }
  if (Bt$2(r2) === re$2) {
    const a2 = n2.slice(o2), u2 = Lt$2(oe$1);
    return { type: r2, sealed: a2, iv: u2 };
  }
  const i2 = o2 + oe$1, s = n2.slice(o2, i2), c2 = n2.slice(i2);
  return { type: r2, sealed: c2, iv: s };
}
function qc(t, e) {
  const n2 = Se$1({ encoded: t, encoding: e == null ? void 0 : e.encoding });
  return oo$1({ type: Bt$2(n2.type), senderPublicKey: typeof n2.senderPublicKey < "u" ? toString(n2.senderPublicKey, G$2) : void 0, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey });
}
function oo$1(t) {
  const e = (t == null ? void 0 : t.type) || dn$1;
  if (e === Ft$2) {
    if (typeof (t == null ? void 0 : t.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (t == null ? void 0 : t.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: t == null ? void 0 : t.senderPublicKey, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey };
}
function Kc(t) {
  return t.type === Ft$2 && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function Fc(t) {
  return t.type === re$2;
}
function io$1(t) {
  const e = Buffer.from(t.x, "base64"), n2 = Buffer.from(t.y, "base64");
  return concat([new Uint8Array([4]), e, n2]);
}
function zc(t, e) {
  const [n2, r2, o2] = t.split("."), i2 = Buffer.from(ro$1(o2), "base64");
  if (i2.length !== 64) throw new Error("Invalid signature length");
  const s = i2.slice(0, 32), c2 = i2.slice(32, 64), a2 = `${n2}.${r2}`, u2 = Qt$2(a2), l2 = io$1(e);
  if (!_c.verify(concat([s, c2]), u2, l2)) throw new Error("Invalid signature");
  return sn$2(t).payload;
}
const so$1 = "irn";
function Zc(t) {
  return (t == null ? void 0 : t.relay) || { protocol: so$1 };
}
function Yc(t) {
  const e = C$4[t];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${t}`);
  return e;
}
function co$1(t, e = "-") {
  const n2 = {}, r2 = "relay" + e;
  return Object.keys(t).forEach((o2) => {
    if (o2.startsWith(r2)) {
      const i2 = o2.replace(r2, ""), s = t[o2];
      n2[i2] = s;
    }
  }), n2;
}
function Gc(t) {
  if (!t.includes("wc:")) {
    const u2 = je$2(t);
    u2 != null && u2.includes("wc:") && (t = u2);
  }
  t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
  const e = t.indexOf(":"), n2 = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, r2 = t.substring(0, e), o2 = t.substring(e + 1, n2).split("@"), i2 = typeof n2 < "u" ? t.substring(n2) : "", s = new URLSearchParams(i2), c2 = {};
  s.forEach((u2, l2) => {
    c2[l2] = u2;
  });
  const a2 = typeof c2.methods == "string" ? c2.methods.split(",") : void 0;
  return { protocol: r2, topic: ao$1(o2[0]), version: parseInt(o2[1], 10), symKey: c2.symKey, relay: co$1(c2), methods: a2, expiryTimestamp: c2.expiryTimestamp ? parseInt(c2.expiryTimestamp, 10) : void 0 };
}
function ao$1(t) {
  return t.startsWith("//") ? t.substring(2) : t;
}
function uo$1(t, e = "-") {
  const n2 = "relay", r2 = {};
  return Object.keys(t).forEach((o2) => {
    const i2 = o2, s = n2 + e + i2;
    t[i2] && (r2[s] = t[i2]);
  }), r2;
}
function Wc(t) {
  const e = new URLSearchParams(), n2 = uo$1(t.relay);
  Object.keys(n2).sort().forEach((o2) => {
    e.set(o2, n2[o2]);
  }), e.set("symKey", t.symKey), t.expiryTimestamp && e.set("expiryTimestamp", t.expiryTimestamp.toString()), t.methods && e.set("methods", t.methods.join(","));
  const r2 = e.toString();
  return `${t.protocol}:${t.topic}@${t.version}?${r2}`;
}
function Xc(t, e, n2) {
  return `${t}?wc_ev=${n2}&topic=${e}`;
}
var Jc = Object.defineProperty, Qc = Object.defineProperties, ta = Object.getOwnPropertyDescriptors, fo$1 = Object.getOwnPropertySymbols, ea = Object.prototype.hasOwnProperty, na = Object.prototype.propertyIsEnumerable, lo$1 = (t, e, n2) => e in t ? Jc(t, e, { enumerable: true, configurable: true, writable: true, value: n2 }) : t[e] = n2, ra = (t, e) => {
  for (var n2 in e || (e = {})) ea.call(e, n2) && lo$1(t, n2, e[n2]);
  if (fo$1) for (var n2 of fo$1(e)) na.call(e, n2) && lo$1(t, n2, e[n2]);
  return t;
}, oa = (t, e) => Qc(t, ta(e));
function It$2(t) {
  const e = [];
  return t.forEach((n2) => {
    const [r2, o2] = n2.split(":");
    e.push(`${r2}:${o2}`);
  }), e;
}
function ho$1(t) {
  const e = [];
  return Object.values(t).forEach((n2) => {
    e.push(...It$2(n2.accounts));
  }), e;
}
function po$1(t, e) {
  const n2 = [];
  return Object.values(t).forEach((r2) => {
    It$2(r2.accounts).includes(e) && n2.push(...r2.methods);
  }), n2;
}
function go$1(t, e) {
  const n2 = [];
  return Object.values(t).forEach((r2) => {
    It$2(r2.accounts).includes(e) && n2.push(...r2.events);
  }), n2;
}
function yn$1(t) {
  return t.includes(":");
}
function yo$1(t) {
  return yn$1(t) ? t.split(":")[0] : t;
}
function ie$1(t) {
  var e, n2, r2;
  const o2 = {};
  if (!Oe$1(t)) return o2;
  for (const [i2, s] of Object.entries(t)) {
    const c2 = yn$1(i2) ? [i2] : s.chains, a2 = s.methods || [], u2 = s.events || [], l2 = yo$1(i2);
    o2[l2] = oa(ra({}, o2[l2]), { chains: ot$1(c2, (e = o2[l2]) == null ? void 0 : e.chains), methods: ot$1(a2, (n2 = o2[l2]) == null ? void 0 : n2.methods), events: ot$1(u2, (r2 = o2[l2]) == null ? void 0 : r2.events) });
  }
  return o2;
}
function mo$1(t) {
  const e = {};
  return t == null ? void 0 : t.forEach((n2) => {
    var r2;
    const [o2, i2] = n2.split(":");
    e[o2] || (e[o2] = { accounts: [], chains: [], events: [], methods: [] }), e[o2].accounts.push(n2), (r2 = e[o2].chains) == null || r2.push(`${o2}:${i2}`);
  }), e;
}
function ca(t, e) {
  e = e.map((r2) => r2.replace("did:pkh:", ""));
  const n2 = mo$1(e);
  for (const [r2, o2] of Object.entries(n2)) o2.methods ? o2.methods = ot$1(o2.methods, t) : o2.methods = t, o2.events = ["chainChanged", "accountsChanged"];
  return n2;
}
function aa(t, e) {
  var n2, r2, o2, i2, s, c2;
  const a2 = ie$1(t), u2 = ie$1(e), l2 = {}, f3 = Object.keys(a2).concat(Object.keys(u2));
  for (const h3 of f3) l2[h3] = { chains: ot$1((n2 = a2[h3]) == null ? void 0 : n2.chains, (r2 = u2[h3]) == null ? void 0 : r2.chains), methods: ot$1((o2 = a2[h3]) == null ? void 0 : o2.methods, (i2 = u2[h3]) == null ? void 0 : i2.methods), events: ot$1((s = a2[h3]) == null ? void 0 : s.events, (c2 = u2[h3]) == null ? void 0 : c2.events) };
  return l2;
}
const wo$1 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, bo$1 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function ht$2(t, e) {
  const { message: n2, code: r2 } = bo$1[t];
  return { message: e ? `${n2} ${e}` : n2, code: r2 };
}
function Nt$1(t, e) {
  const { message: n2, code: r2 } = wo$1[t];
  return { message: e ? `${n2} ${e}` : n2, code: r2 };
}
function se$2(t, e) {
  return Array.isArray(t) ? true : false;
}
function Oe$1(t) {
  return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function Et$2(t) {
  return typeof t > "u";
}
function nt$2(t, e) {
  return e && Et$2(t) ? true : typeof t == "string" && !!t.trim().length;
}
function Ae$1(t, e) {
  return e && Et$2(t) ? true : typeof t == "number" && !isNaN(t);
}
function ua(t, e) {
  const { requiredNamespaces: n2 } = e, r2 = Object.keys(t.namespaces), o2 = Object.keys(n2);
  let i2 = true;
  return gt$2(o2, r2) ? (r2.forEach((s) => {
    const { accounts: c2, methods: a2, events: u2 } = t.namespaces[s], l2 = It$2(c2), f3 = n2[s];
    (!gt$2(ue$2(s, f3), l2) || !gt$2(f3.methods, a2) || !gt$2(f3.events, u2)) && (i2 = false);
  }), i2) : false;
}
function ce$2(t) {
  return nt$2(t, false) && t.includes(":") ? t.split(":").length === 2 : false;
}
function Eo$1(t) {
  if (nt$2(t, false) && t.includes(":")) {
    const e = t.split(":");
    if (e.length === 3) {
      const n2 = e[0] + ":" + e[1];
      return !!e[2] && ce$2(n2);
    }
  }
  return false;
}
function fa(t) {
  function e(n2) {
    try {
      return typeof new URL(n2) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (nt$2(t, false)) {
      if (e(t)) return true;
      const n2 = je$2(t);
      return e(n2);
    }
  } catch {
  }
  return false;
}
function la(t) {
  var e;
  return (e = t == null ? void 0 : t.proposer) == null ? void 0 : e.publicKey;
}
function da(t) {
  return t == null ? void 0 : t.topic;
}
function ha(t, e) {
  let n2 = null;
  return nt$2(t == null ? void 0 : t.publicKey, false) || (n2 = ht$2("MISSING_OR_INVALID", `${e} controller public key should be a string`)), n2;
}
function mn$1(t) {
  let e = true;
  return se$2(t) ? t.length && (e = t.every((n2) => nt$2(n2, false))) : e = false, e;
}
function vo$1(t, e, n2) {
  let r2 = null;
  return se$2(e) && e.length ? e.forEach((o2) => {
    r2 || ce$2(o2) || (r2 = Nt$1("UNSUPPORTED_CHAINS", `${n2}, chain ${o2} should be a string and conform to "namespace:chainId" format`));
  }) : ce$2(t) || (r2 = Nt$1("UNSUPPORTED_CHAINS", `${n2}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r2;
}
function xo$1(t, e, n2) {
  let r2 = null;
  return Object.entries(t).forEach(([o2, i2]) => {
    if (r2) return;
    const s = vo$1(o2, ue$2(o2, i2), `${e} ${n2}`);
    s && (r2 = s);
  }), r2;
}
function So$1(t, e) {
  let n2 = null;
  return se$2(t) ? t.forEach((r2) => {
    n2 || Eo$1(r2) || (n2 = Nt$1("UNSUPPORTED_ACCOUNTS", `${e}, account ${r2} should be a string and conform to "namespace:chainId:address" format`));
  }) : n2 = Nt$1("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n2;
}
function Oo$1(t, e) {
  let n2 = null;
  return Object.values(t).forEach((r2) => {
    if (n2) return;
    const o2 = So$1(r2 == null ? void 0 : r2.accounts, `${e} namespace`);
    o2 && (n2 = o2);
  }), n2;
}
function Ao$1(t, e) {
  let n2 = null;
  return mn$1(t == null ? void 0 : t.methods) ? mn$1(t == null ? void 0 : t.events) || (n2 = Nt$1("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : n2 = Nt$1("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), n2;
}
function wn$1(t, e) {
  let n2 = null;
  return Object.values(t).forEach((r2) => {
    if (n2) return;
    const o2 = Ao$1(r2, `${e}, namespace`);
    o2 && (n2 = o2);
  }), n2;
}
function pa(t, e, n2) {
  let r2 = null;
  if (t && Oe$1(t)) {
    const o2 = wn$1(t, e);
    o2 && (r2 = o2);
    const i2 = xo$1(t, e, n2);
    i2 && (r2 = i2);
  } else r2 = ht$2("MISSING_OR_INVALID", `${e}, ${n2} should be an object with data`);
  return r2;
}
function Bo$1(t, e) {
  let n2 = null;
  if (t && Oe$1(t)) {
    const r2 = wn$1(t, e);
    r2 && (n2 = r2);
    const o2 = Oo$1(t, e);
    o2 && (n2 = o2);
  } else n2 = ht$2("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return n2;
}
function Io$1(t) {
  return nt$2(t.protocol, true);
}
function ga(t, e) {
  let n2 = false;
  return !t ? n2 = true : t && se$2(t) && t.length && t.forEach((r2) => {
    n2 = Io$1(r2);
  }), n2;
}
function ya(t) {
  return typeof t == "number";
}
function ma(t) {
  return typeof t < "u" && typeof t !== null;
}
function wa(t) {
  return !(!t || typeof t != "object" || !t.code || !Ae$1(t.code, false) || !t.message || !nt$2(t.message, false));
}
function ba(t) {
  return !(Et$2(t) || !nt$2(t.method, false));
}
function Ea(t) {
  return !(Et$2(t) || Et$2(t.result) && Et$2(t.error) || !Ae$1(t.id, false) || !nt$2(t.jsonrpc, false));
}
function va(t) {
  return !(Et$2(t) || !nt$2(t.name, false));
}
function xa(t, e) {
  return !(!ce$2(e) || !ho$1(t).includes(e));
}
function Sa(t, e, n2) {
  return nt$2(n2, false) ? po$1(t, e).includes(n2) : false;
}
function Oa(t, e, n2) {
  return nt$2(n2, false) ? go$1(t, e).includes(n2) : false;
}
function No$1(t, e, n2) {
  let r2 = null;
  const o2 = Aa(t), i2 = Ba(e), s = Object.keys(o2), c2 = Object.keys(i2), a2 = Uo$1(Object.keys(t)), u2 = Uo$1(Object.keys(e)), l2 = a2.filter((f3) => !u2.includes(f3));
  return l2.length && (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n2} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l2.toString()}
      Received: ${Object.keys(e).toString()}`)), gt$2(s, c2) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n2} namespaces chains don't satisfy required namespaces.
      Required: ${s.toString()}
      Approved: ${c2.toString()}`)), Object.keys(e).forEach((f3) => {
    if (!f3.includes(":") || r2) return;
    const h3 = It$2(e[f3].accounts);
    h3.includes(f3) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n2} namespaces accounts don't satisfy namespace accounts for ${f3}
        Required: ${f3}
        Approved: ${h3.toString()}`));
  }), s.forEach((f3) => {
    r2 || (gt$2(o2[f3].methods, i2[f3].methods) ? gt$2(o2[f3].events, i2[f3].events) || (r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n2} namespaces events don't satisfy namespace events for ${f3}`)) : r2 = ht$2("NON_CONFORMING_NAMESPACES", `${n2} namespaces methods don't satisfy namespace methods for ${f3}`));
  }), r2;
}
function Aa(t) {
  const e = {};
  return Object.keys(t).forEach((n2) => {
    var r2;
    n2.includes(":") ? e[n2] = t[n2] : (r2 = t[n2].chains) == null || r2.forEach((o2) => {
      e[o2] = { methods: t[n2].methods, events: t[n2].events };
    });
  }), e;
}
function Uo$1(t) {
  return [...new Set(t.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function Ba(t) {
  const e = {};
  return Object.keys(t).forEach((n2) => {
    if (n2.includes(":")) e[n2] = t[n2];
    else {
      const r2 = It$2(t[n2].accounts);
      r2 == null ? void 0 : r2.forEach((o2) => {
        e[o2] = { accounts: t[n2].accounts.filter((i2) => i2.includes(`${o2}:`)), methods: t[n2].methods, events: t[n2].events };
      });
    }
  }), e;
}
function Ia(t, e) {
  return Ae$1(t, false) && t <= e.max && t >= e.min;
}
function Na() {
  const t = xt$2();
  return new Promise((e) => {
    switch (t) {
      case Y$3.browser:
        e(To$1());
        break;
      case Y$3.reactNative:
        e(Ro$1());
        break;
      case Y$3.node:
        e(_o$1());
        break;
      default:
        e(true);
    }
  });
}
function To$1() {
  return Tt$2() && (navigator == null ? void 0 : navigator.onLine);
}
async function Ro$1() {
  if (pt$2() && typeof global < "u" && global != null && global.NetInfo) {
    const t = await (global == null ? void 0 : global.NetInfo.fetch());
    return t == null ? void 0 : t.isConnected;
  }
  return true;
}
function _o$1() {
  return true;
}
function Ua(t) {
  switch (xt$2()) {
    case Y$3.browser:
      $o$1(t);
      break;
    case Y$3.reactNative:
      Lo$1(t);
      break;
  }
}
function $o$1(t) {
  !pt$2() && Tt$2() && (window.addEventListener("online", () => t(true)), window.addEventListener("offline", () => t(false)));
}
function Lo$1(t) {
  var _a;
  pt$2() && typeof global < "u" && global != null && global.NetInfo && ((_a = global) == null ? void 0 : _a.NetInfo.addEventListener((e) => t(e == null ? void 0 : e.isConnected)));
}
function Ta() {
  var t;
  return Tt$2() && getDocument_1() ? ((t = getDocument_1()) == null ? void 0 : t.visibilityState) === "visible" : true;
}
const bn$1 = {};
class Ra {
  static get(e) {
    return bn$1[e];
  }
  static set(e, n2) {
    bn$1[e] = n2;
  }
  static delete(e) {
    delete bn$1[e];
  }
}
function tryStringify(o2) {
  try {
    return JSON.stringify(o2);
  } catch (e) {
    return '"[Circular]"';
  }
}
var quickFormatUnescaped = format$1;
function format$1(f3, args, opts) {
  var ss = opts && opts.stringify || tryStringify;
  var offset = 1;
  if (typeof f3 === "object" && f3 !== null) {
    var len = args.length + offset;
    if (len === 1) return f3;
    var objects = new Array(len);
    objects[0] = ss(f3);
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index]);
    }
    return objects.join(" ");
  }
  if (typeof f3 !== "string") {
    return f3;
  }
  var argLen = args.length;
  if (argLen === 0) return f3;
  var str = "";
  var a2 = 1 - offset;
  var lastPos = -1;
  var flen = f3 && f3.length || 0;
  for (var i2 = 0; i2 < flen; ) {
    if (f3.charCodeAt(i2) === 37 && i2 + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0;
      switch (f3.charCodeAt(i2 + 1)) {
        case 100:
        // 'd'
        case 102:
          if (a2 >= argLen)
            break;
          if (args[a2] == null) break;
          if (lastPos < i2)
            str += f3.slice(lastPos, i2);
          str += Number(args[a2]);
          lastPos = i2 + 2;
          i2++;
          break;
        case 105:
          if (a2 >= argLen)
            break;
          if (args[a2] == null) break;
          if (lastPos < i2)
            str += f3.slice(lastPos, i2);
          str += Math.floor(Number(args[a2]));
          lastPos = i2 + 2;
          i2++;
          break;
        case 79:
        // 'O'
        case 111:
        // 'o'
        case 106:
          if (a2 >= argLen)
            break;
          if (args[a2] === void 0) break;
          if (lastPos < i2)
            str += f3.slice(lastPos, i2);
          var type = typeof args[a2];
          if (type === "string") {
            str += "'" + args[a2] + "'";
            lastPos = i2 + 2;
            i2++;
            break;
          }
          if (type === "function") {
            str += args[a2].name || "<anonymous>";
            lastPos = i2 + 2;
            i2++;
            break;
          }
          str += ss(args[a2]);
          lastPos = i2 + 2;
          i2++;
          break;
        case 115:
          if (a2 >= argLen)
            break;
          if (lastPos < i2)
            str += f3.slice(lastPos, i2);
          str += String(args[a2]);
          lastPos = i2 + 2;
          i2++;
          break;
        case 37:
          if (lastPos < i2)
            str += f3.slice(lastPos, i2);
          str += "%";
          lastPos = i2 + 2;
          i2++;
          a2--;
          break;
      }
      ++a2;
    }
    ++i2;
  }
  if (lastPos === -1)
    return f3;
  else if (lastPos < flen) {
    str += f3.slice(lastPos);
  }
  return str;
}
const format = quickFormatUnescaped;
var browser = pino;
const _console = pfGlobalThisOrFallback().console || {};
const stdSerializers = {
  mapHttpRequest: mock,
  mapHttpResponse: mock,
  wrapRequestSerializer: passthrough,
  wrapResponseSerializer: passthrough,
  wrapErrorSerializer: passthrough,
  req: mock,
  res: mock,
  err: asErrValue
};
function shouldSerialize(serialize, serializers) {
  if (Array.isArray(serialize)) {
    const hasToFilter = serialize.filter(function(k2) {
      return k2 !== "!stdSerializers.err";
    });
    return hasToFilter;
  } else if (serialize === true) {
    return Object.keys(serializers);
  }
  return false;
}
function pino(opts) {
  opts = opts || {};
  opts.browser = opts.browser || {};
  const transmit2 = opts.browser.transmit;
  if (transmit2 && typeof transmit2.send !== "function") {
    throw Error("pino: transmit option must have a send function");
  }
  const proto = opts.browser.write || _console;
  if (opts.browser.write) opts.browser.asObject = true;
  const serializers = opts.serializers || {};
  const serialize = shouldSerialize(opts.browser.serialize, serializers);
  let stdErrSerialize = opts.browser.serialize;
  if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
  const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
  if (typeof proto === "function") {
    proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
  }
  if (opts.enabled === false) opts.level = "silent";
  const level = opts.level || "info";
  const logger = Object.create(proto);
  if (!logger.log) logger.log = noop;
  Object.defineProperty(logger, "levelVal", {
    get: getLevelVal
  });
  Object.defineProperty(logger, "level", {
    get: getLevel,
    set: setLevel
  });
  const setOpts = {
    transmit: transmit2,
    serialize,
    asObject: opts.browser.asObject,
    levels,
    timestamp: getTimeFunction(opts)
  };
  logger.levels = pino.levels;
  logger.level = level;
  logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
  logger.serializers = serializers;
  logger._serialize = serialize;
  logger._stdErrSerialize = stdErrSerialize;
  logger.child = child;
  if (transmit2) logger._logEvent = createLogEventShape();
  function getLevelVal() {
    return this.level === "silent" ? Infinity : this.levels.values[this.level];
  }
  function getLevel() {
    return this._level;
  }
  function setLevel(level2) {
    if (level2 !== "silent" && !this.levels.values[level2]) {
      throw Error("unknown level " + level2);
    }
    this._level = level2;
    set(setOpts, logger, "error", "log");
    set(setOpts, logger, "fatal", "error");
    set(setOpts, logger, "warn", "error");
    set(setOpts, logger, "info", "log");
    set(setOpts, logger, "debug", "log");
    set(setOpts, logger, "trace", "log");
  }
  function child(bindings, childOptions) {
    if (!bindings) {
      throw new Error("missing bindings for child Pino");
    }
    childOptions = childOptions || {};
    if (serialize && bindings.serializers) {
      childOptions.serializers = bindings.serializers;
    }
    const childOptionsSerializers = childOptions.serializers;
    if (serialize && childOptionsSerializers) {
      var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
      var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
      delete bindings.serializers;
      applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
    }
    function Child(parent) {
      this._childLevel = (parent._childLevel | 0) + 1;
      this.error = bind(parent, bindings, "error");
      this.fatal = bind(parent, bindings, "fatal");
      this.warn = bind(parent, bindings, "warn");
      this.info = bind(parent, bindings, "info");
      this.debug = bind(parent, bindings, "debug");
      this.trace = bind(parent, bindings, "trace");
      if (childSerializers) {
        this.serializers = childSerializers;
        this._serialize = childSerialize;
      }
      if (transmit2) {
        this._logEvent = createLogEventShape(
          [].concat(parent._logEvent.bindings, bindings)
        );
      }
    }
    Child.prototype = this;
    return new Child(this);
  }
  return logger;
}
pino.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: "trace",
    20: "debug",
    30: "info",
    40: "warn",
    50: "error",
    60: "fatal"
  }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
function set(opts, logger, level, fallback) {
  const proto = Object.getPrototypeOf(logger);
  logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
  wrap(opts, logger, level);
}
function wrap(opts, logger, level) {
  if (!opts.transmit && logger[level] === noop) return;
  logger[level] = /* @__PURE__ */ (function(write) {
    return function LOG() {
      const ts2 = opts.timestamp();
      const args = new Array(arguments.length);
      const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
      for (var i2 = 0; i2 < args.length; i2++) args[i2] = arguments[i2];
      if (opts.serialize && !opts.asObject) {
        applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
      }
      if (opts.asObject) write.call(proto, asObject(this, level, args, ts2));
      else write.apply(proto, args);
      if (opts.transmit) {
        const transmitLevel = opts.transmit.level || logger.level;
        const transmitValue = pino.levels.values[transmitLevel];
        const methodValue = pino.levels.values[level];
        if (methodValue < transmitValue) return;
        transmit(this, {
          ts: ts2,
          methodLevel: level,
          methodValue,
          transmitValue: pino.levels.values[opts.transmit.level || logger.level],
          send: opts.transmit.send,
          val: logger.levelVal
        }, args);
      }
    };
  })(logger[level]);
}
function asObject(logger, level, args, ts2) {
  if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
  const argsCloned = args.slice();
  let msg = argsCloned[0];
  const o2 = {};
  if (ts2) {
    o2.time = ts2;
  }
  o2.level = pino.levels.values[level];
  let lvl = (logger._childLevel | 0) + 1;
  if (lvl < 1) lvl = 1;
  if (msg !== null && typeof msg === "object") {
    while (lvl-- && typeof argsCloned[0] === "object") {
      Object.assign(o2, argsCloned.shift());
    }
    msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
  } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
  if (msg !== void 0) o2.msg = msg;
  return o2;
}
function applySerializers(args, serialize, serializers, stdErrSerialize) {
  for (const i2 in args) {
    if (stdErrSerialize && args[i2] instanceof Error) {
      args[i2] = pino.stdSerializers.err(args[i2]);
    } else if (typeof args[i2] === "object" && !Array.isArray(args[i2])) {
      for (const k2 in args[i2]) {
        if (serialize && serialize.indexOf(k2) > -1 && k2 in serializers) {
          args[i2][k2] = serializers[k2](args[i2][k2]);
        }
      }
    }
  }
}
function bind(parent, bindings, level) {
  return function() {
    const args = new Array(1 + arguments.length);
    args[0] = bindings;
    for (var i2 = 1; i2 < args.length; i2++) {
      args[i2] = arguments[i2 - 1];
    }
    return parent[level].apply(this, args);
  };
}
function transmit(logger, opts, args) {
  const send = opts.send;
  const ts2 = opts.ts;
  const methodLevel = opts.methodLevel;
  const methodValue = opts.methodValue;
  const val = opts.val;
  const bindings = logger._logEvent.bindings;
  applySerializers(
    args,
    logger._serialize || Object.keys(logger.serializers),
    logger.serializers,
    logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
  );
  logger._logEvent.ts = ts2;
  logger._logEvent.messages = args.filter(function(arg) {
    return bindings.indexOf(arg) === -1;
  });
  logger._logEvent.level.label = methodLevel;
  logger._logEvent.level.value = methodValue;
  send(methodLevel, logger._logEvent, val);
  logger._logEvent = createLogEventShape(bindings);
}
function createLogEventShape(bindings) {
  return {
    ts: 0,
    messages: [],
    bindings: bindings || [],
    level: { label: "", value: 0 }
  };
}
function asErrValue(err) {
  const obj = {
    type: err.constructor.name,
    msg: err.message,
    stack: err.stack
  };
  for (const key in err) {
    if (obj[key] === void 0) {
      obj[key] = err[key];
    }
  }
  return obj;
}
function getTimeFunction(opts) {
  if (typeof opts.timestamp === "function") {
    return opts.timestamp;
  }
  if (opts.timestamp === false) {
    return nullTime;
  }
  return epochTime;
}
function mock() {
  return {};
}
function passthrough(a2) {
  return a2;
}
function noop() {
}
function nullTime() {
  return false;
}
function epochTime() {
  return Date.now();
}
function unixTime() {
  return Math.round(Date.now() / 1e3);
}
function isoTime() {
  return new Date(Date.now()).toISOString();
}
function pfGlobalThisOrFallback() {
  function defd(o2) {
    return typeof o2 !== "undefined" && o2;
  }
  try {
    if (typeof globalThis !== "undefined") return globalThis;
    Object.defineProperty(Object.prototype, "globalThis", {
      get: function() {
        delete Object.prototype.globalThis;
        return this.globalThis = this;
      },
      configurable: true
    });
    return globalThis;
  } catch (e) {
    return defd(self) || defd(window) || defd(this) || {};
  }
}
const Ot$1 = /* @__PURE__ */ getDefaultExportFromCjs(browser);
const c$2 = { level: "info" }, n = "custom_context", l$1 = 1e3 * 1024;
let O$3 = class O {
  constructor(e) {
    this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
let d$2 = class d {
  constructor(e) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
  }
  append(e) {
    const t = new O$3(e);
    if (t.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);
    for (; this.size + t.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
  }
  shift() {
    if (!this.head) return;
    const e = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
  }
  toArray() {
    const e = [];
    let t = this.head;
    for (; t !== null; ) e.push(t.value), t = t.next;
    return e;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e = this.head;
    return { next: () => {
      if (!e) return { done: true, value: null };
      const t = e.value;
      return e = e.next, { done: false, value: t };
    } };
  }
};
let L$3 = class L {
  constructor(e, t = l$1) {
    this.level = e ?? "error", this.levelValue = browser.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d$2(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e, t) {
    t === browser.levels.values.error ? console.error(e) : t === browser.levels.values.warn ? console.warn(e) : t === browser.levels.values.debug ? console.debug(e) : t === browser.levels.values.trace ? console.trace(e) : console.log(e);
  }
  appendToLogs(e) {
    this.logs.append(safeJsonStringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e }));
    const t = typeof e == "string" ? JSON.parse(e).level : e.level;
    t >= this.levelValue && this.forwardToConsole(e, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new d$2(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e) {
    const t = this.getLogArray();
    return t.push(safeJsonStringify({ extraMetadata: e })), new Blob(t, { type: "application/json" });
  }
};
let m$1 = class m {
  constructor(e, t = l$1) {
    this.baseChunkLogger = new L$3(e, t);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
  downloadLogsBlobInBrowser(e) {
    const t = URL.createObjectURL(this.logsToBlob(e)), o2 = document.createElement("a");
    o2.href = t, o2.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o2), o2.click(), document.body.removeChild(o2), URL.revokeObjectURL(t);
  }
};
let B$3 = class B {
  constructor(e, t = l$1) {
    this.baseChunkLogger = new L$3(e, t);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
};
var x$1 = Object.defineProperty, S$4 = Object.defineProperties, _$1 = Object.getOwnPropertyDescriptors, p$3 = Object.getOwnPropertySymbols, T$2 = Object.prototype.hasOwnProperty, z$2 = Object.prototype.propertyIsEnumerable, f$3 = (r2, e, t) => e in r2 ? x$1(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, i$1 = (r2, e) => {
  for (var t in e || (e = {})) T$2.call(e, t) && f$3(r2, t, e[t]);
  if (p$3) for (var t of p$3(e)) z$2.call(e, t) && f$3(r2, t, e[t]);
  return r2;
}, g = (r2, e) => S$4(r2, _$1(e));
function k$4(r2) {
  return g(i$1({}, r2), { level: (r2 == null ? void 0 : r2.level) || c$2.level });
}
function v$4(r2, e = n) {
  return r2[e] || "";
}
function b$4(r2, e, t = n) {
  return r2[t] = e, r2;
}
function y$3(r2, e = n) {
  let t = "";
  return typeof r2.bindings > "u" ? t = v$4(r2, e) : t = r2.bindings().context || "", t;
}
function w$2(r2, e, t = n) {
  const o2 = y$3(r2, t);
  return o2.trim() ? `${o2}/${e}` : e;
}
function E$4(r2, e, t = n) {
  const o2 = w$2(r2, e, t), a2 = r2.child({ context: o2 });
  return b$4(a2, o2, t);
}
function C$3(r2) {
  var e, t;
  const o2 = new m$1((e = r2.opts) == null ? void 0 : e.level, r2.maxSizeInBytes);
  return { logger: Ot$1(g(i$1({}, r2.opts), { level: "trace", browser: g(i$1({}, (t = r2.opts) == null ? void 0 : t.browser), { write: (a2) => o2.write(a2) }) })), chunkLoggerController: o2 };
}
function I$3(r2) {
  var e;
  const t = new B$3((e = r2.opts) == null ? void 0 : e.level, r2.maxSizeInBytes);
  return { logger: Ot$1(g(i$1({}, r2.opts), { level: "trace" }), t), chunkLoggerController: t };
}
function A$3(r2) {
  return typeof r2.loggerOverride < "u" && typeof r2.loggerOverride != "string" ? { logger: r2.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? C$3(r2) : I$3(r2);
}
var a = Object.defineProperty, u$1 = (e, s, r2) => s in e ? a(e, s, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[s] = r2, c$1 = (e, s, r2) => u$1(e, typeof s != "symbol" ? s + "" : s, r2);
let h$1 = class h extends IEvents {
  constructor(s) {
    super(), this.opts = s, c$1(this, "protocol", "wc"), c$1(this, "version", 2);
  }
};
var p$2 = Object.defineProperty, b$3 = (e, s, r2) => s in e ? p$2(e, s, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[s] = r2, v$3 = (e, s, r2) => b$3(e, s + "", r2);
let I$2 = class I extends IEvents {
  constructor(s, r2) {
    super(), this.core = s, this.logger = r2, v$3(this, "records", /* @__PURE__ */ new Map());
  }
};
let y$2 = class y {
  constructor(s, r2) {
    this.logger = s, this.core = r2;
  }
};
class m2 extends IEvents {
  constructor(s, r2) {
    super(), this.relayer = s, this.logger = r2;
  }
}
let d$1 = class d2 extends IEvents {
  constructor(s) {
    super();
  }
};
let f$2 = class f {
  constructor(s, r2, t, q2) {
    this.core = s, this.logger = r2, this.name = t;
  }
};
let P$2 = class P extends IEvents {
  constructor(s, r2) {
    super(), this.relayer = s, this.logger = r2;
  }
};
let S$3 = class S extends IEvents {
  constructor(s, r2) {
    super(), this.core = s, this.logger = r2;
  }
};
let M$3 = class M {
  constructor(s, r2, t) {
    this.core = s, this.logger = r2, this.store = t;
  }
};
let O$2 = class O2 {
  constructor(s, r2) {
    this.projectId = s, this.logger = r2;
  }
};
let R$2 = class R {
  constructor(s, r2, t) {
    this.core = s, this.logger = r2, this.telemetryEnabled = t;
  }
};
var T$1 = Object.defineProperty, k$3 = (e, s, r2) => s in e ? T$1(e, s, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[s] = r2, i = (e, s, r2) => k$3(e, typeof s != "symbol" ? s + "" : s, r2);
let J$2 = class J {
  constructor(s) {
    this.opts = s, i(this, "protocol", "wc"), i(this, "version", 2);
  }
};
let V$3 = class V {
  constructor(s) {
    this.client = s;
  }
};
const ze$1 = "wc", Le$2 = 2, he$1 = "core", B$2 = `${ze$1}@2:${he$1}:`, Et$1 = { logger: "error" }, It$1 = { database: ":memory:" }, Tt$1 = "crypto", ke$2 = "client_ed25519_seed", Ct = cjs.ONE_DAY, Pt$1 = "keychain", St$2 = "0.3", Ot = "messages", Rt$1 = "0.3", je$1 = cjs.SIX_HOURS, At = "publisher", xt$1 = "irn", Nt = "error", Ue$2 = "wss://relay.walletconnect.org", $t = "relayer", C$2 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, zt$1 = "_subscription", L$2 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, Lt$1 = 0.1, _e$2 = "2.21.1", Q$2 = { link_mode: "link_mode", relay: "relay" }, le$1 = { inbound: "inbound", outbound: "outbound" }, kt$1 = "0.3", jt$1 = "WALLETCONNECT_CLIENT_ID", Fe$1 = "WALLETCONNECT_LINK_MODE_APPS", $$3 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, Ut$1 = "subscription", Ft$1 = "0.3", Mt$1 = "pairing", Kt$1 = "0.3", se$1 = { wc_pairingDelete: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: cjs.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: cjs.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 0 } } }, re$1 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, F$2 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, Bt$1 = "history", Vt$1 = "0.3", qt$1 = "expirer", M$2 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, Gt$1 = "0.3", Wt$1 = "verify-api", Zs = "https://verify.walletconnect.com", Ht = "https://verify.walletconnect.org", ue$1 = Ht, Yt$1 = `${ue$1}/v3`, Jt$1 = [Zs, Ht], Xt$1 = "echo", Zt$1 = "https://echo.walletconnect.com", G$1 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, Y$2 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, er = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, tr = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, ir = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, sr = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, Qt$1 = 0.1, ei = "event-client", ti = 86400, ii = "https://pulse.walletconnect.org/batch";
function rr(r2, e) {
  if (r2.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i2 = 0; i2 < t.length; i2++) t[i2] = 255;
  for (var s = 0; s < r2.length; s++) {
    var n2 = r2.charAt(s), o2 = n2.charCodeAt(0);
    if (t[o2] !== 255) throw new TypeError(n2 + " is ambiguous");
    t[o2] = s;
  }
  var a2 = r2.length, c2 = r2.charAt(0), h3 = Math.log(a2) / Math.log(256), l2 = Math.log(256) / Math.log(a2);
  function d4(u2) {
    if (u2 instanceof Uint8Array || (ArrayBuffer.isView(u2) ? u2 = new Uint8Array(u2.buffer, u2.byteOffset, u2.byteLength) : Array.isArray(u2) && (u2 = Uint8Array.from(u2))), !(u2 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (u2.length === 0) return "";
    for (var b2 = 0, x2 = 0, I3 = 0, D2 = u2.length; I3 !== D2 && u2[I3] === 0; ) I3++, b2++;
    for (var j2 = (D2 - I3) * l2 + 1 >>> 0, T2 = new Uint8Array(j2); I3 !== D2; ) {
      for (var q2 = u2[I3], J3 = 0, K2 = j2 - 1; (q2 !== 0 || J3 < x2) && K2 !== -1; K2--, J3++) q2 += 256 * T2[K2] >>> 0, T2[K2] = q2 % a2 >>> 0, q2 = q2 / a2 >>> 0;
      if (q2 !== 0) throw new Error("Non-zero carry");
      x2 = J3, I3++;
    }
    for (var H2 = j2 - x2; H2 !== j2 && T2[H2] === 0; ) H2++;
    for (var me2 = c2.repeat(b2); H2 < j2; ++H2) me2 += r2.charAt(T2[H2]);
    return me2;
  }
  function g2(u2) {
    if (typeof u2 != "string") throw new TypeError("Expected String");
    if (u2.length === 0) return new Uint8Array();
    var b2 = 0;
    if (u2[b2] !== " ") {
      for (var x2 = 0, I3 = 0; u2[b2] === c2; ) x2++, b2++;
      for (var D2 = (u2.length - b2) * h3 + 1 >>> 0, j2 = new Uint8Array(D2); u2[b2]; ) {
        var T2 = t[u2.charCodeAt(b2)];
        if (T2 === 255) return;
        for (var q2 = 0, J3 = D2 - 1; (T2 !== 0 || q2 < I3) && J3 !== -1; J3--, q2++) T2 += a2 * j2[J3] >>> 0, j2[J3] = T2 % 256 >>> 0, T2 = T2 / 256 >>> 0;
        if (T2 !== 0) throw new Error("Non-zero carry");
        I3 = q2, b2++;
      }
      if (u2[b2] !== " ") {
        for (var K2 = D2 - I3; K2 !== D2 && j2[K2] === 0; ) K2++;
        for (var H2 = new Uint8Array(x2 + (D2 - K2)), me2 = x2; K2 !== D2; ) H2[me2++] = j2[K2++];
        return H2;
      }
    }
  }
  function _2(u2) {
    var b2 = g2(u2);
    if (b2) return b2;
    throw new Error(`Non-${e} character`);
  }
  return { encode: d4, decodeUnsafe: g2, decode: _2 };
}
var nr = rr, or = nr;
const si = (r2) => {
  if (r2 instanceof Uint8Array && r2.constructor.name === "Uint8Array") return r2;
  if (r2 instanceof ArrayBuffer) return new Uint8Array(r2);
  if (ArrayBuffer.isView(r2)) return new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
  throw new Error("Unknown type, must be binary type");
}, ar = (r2) => new TextEncoder().encode(r2), cr = (r2) => new TextDecoder().decode(r2);
class hr {
  constructor(e, t, i2) {
    this.name = e, this.prefix = t, this.baseEncode = i2;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class lr {
  constructor(e, t, i2) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i2;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return ri(this, e);
  }
}
class ur {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return ri(this, e);
  }
  decode(e) {
    const t = e[0], i2 = this.decoders[t];
    if (i2) return i2.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const ri = (r2, e) => new ur({ ...r2.decoders || { [r2.prefix]: r2 }, ...e.decoders || { [e.prefix]: e } });
class dr {
  constructor(e, t, i2, s) {
    this.name = e, this.prefix = t, this.baseEncode = i2, this.baseDecode = s, this.encoder = new hr(e, t, i2), this.decoder = new lr(e, t, s);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Ee$2 = ({ name: r2, prefix: e, encode: t, decode: i2 }) => new dr(r2, e, t, i2), de$1 = ({ prefix: r2, name: e, alphabet: t }) => {
  const { encode: i2, decode: s } = or(t, e);
  return Ee$2({ prefix: r2, name: e, encode: i2, decode: (n2) => si(s(n2)) });
}, gr = (r2, e, t, i2) => {
  const s = {};
  for (let l2 = 0; l2 < e.length; ++l2) s[e[l2]] = l2;
  let n2 = r2.length;
  for (; r2[n2 - 1] === "="; ) --n2;
  const o2 = new Uint8Array(n2 * t / 8 | 0);
  let a2 = 0, c2 = 0, h3 = 0;
  for (let l2 = 0; l2 < n2; ++l2) {
    const d4 = s[r2[l2]];
    if (d4 === void 0) throw new SyntaxError(`Non-${i2} character`);
    c2 = c2 << t | d4, a2 += t, a2 >= 8 && (a2 -= 8, o2[h3++] = 255 & c2 >> a2);
  }
  if (a2 >= t || 255 & c2 << 8 - a2) throw new SyntaxError("Unexpected end of data");
  return o2;
}, pr = (r2, e, t) => {
  const i2 = e[e.length - 1] === "=", s = (1 << t) - 1;
  let n2 = "", o2 = 0, a2 = 0;
  for (let c2 = 0; c2 < r2.length; ++c2) for (a2 = a2 << 8 | r2[c2], o2 += 8; o2 > t; ) o2 -= t, n2 += e[s & a2 >> o2];
  if (o2 && (n2 += e[s & a2 << t - o2]), i2) for (; n2.length * t & 7; ) n2 += "=";
  return n2;
}, P$1 = ({ name: r2, prefix: e, bitsPerChar: t, alphabet: i2 }) => Ee$2({ prefix: e, name: r2, encode(s) {
  return pr(s, i2, t);
}, decode(s) {
  return gr(s, i2, t, r2);
} }), yr = Ee$2({ prefix: "\0", name: "identity", encode: (r2) => cr(r2), decode: (r2) => ar(r2) });
var br = Object.freeze({ __proto__: null, identity: yr });
const mr = P$1({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var fr = Object.freeze({ __proto__: null, base2: mr });
const Dr = P$1({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var vr = Object.freeze({ __proto__: null, base8: Dr });
const wr = de$1({ prefix: "9", name: "base10", alphabet: "0123456789" });
var _r = Object.freeze({ __proto__: null, base10: wr });
const Er = P$1({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Ir = P$1({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Tr = Object.freeze({ __proto__: null, base16: Er, base16upper: Ir });
const Cr = P$1({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Pr = P$1({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Sr = P$1({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Or = P$1({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Rr = P$1({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), Ar = P$1({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), xr = P$1({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), Nr = P$1({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), $r = P$1({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var zr = Object.freeze({ __proto__: null, base32: Cr, base32upper: Pr, base32pad: Sr, base32padupper: Or, base32hex: Rr, base32hexupper: Ar, base32hexpad: xr, base32hexpadupper: Nr, base32z: $r });
const Lr2 = de$1({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), kr = de$1({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var jr = Object.freeze({ __proto__: null, base36: Lr2, base36upper: kr });
const Ur = de$1({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), Fr = de$1({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Mr = Object.freeze({ __proto__: null, base58btc: Ur, base58flickr: Fr });
const Kr = P$1({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), Br = P$1({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Vr = P$1({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), qr = P$1({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Gr = Object.freeze({ __proto__: null, base64: Kr, base64pad: Br, base64url: Vr, base64urlpad: qr });
const ni = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Wr = ni.reduce((r2, e, t) => (r2[t] = e, r2), []), Hr = ni.reduce((r2, e, t) => (r2[e.codePointAt(0)] = t, r2), []);
function Yr(r2) {
  return r2.reduce((e, t) => (e += Wr[t], e), "");
}
function Jr(r2) {
  const e = [];
  for (const t of r2) {
    const i2 = Hr[t.codePointAt(0)];
    if (i2 === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e.push(i2);
  }
  return new Uint8Array(e);
}
const Xr = Ee$2({ prefix: "🚀", name: "base256emoji", encode: Yr, decode: Jr });
var Zr = Object.freeze({ __proto__: null, base256emoji: Xr }), Qr = ai, oi = 128, tn = -128, sn = Math.pow(2, 31);
function ai(r2, e, t) {
  e = e || [], t = t || 0;
  for (var i2 = t; r2 >= sn; ) e[t++] = r2 & 255 | oi, r2 /= 128;
  for (; r2 & tn; ) e[t++] = r2 & 255 | oi, r2 >>>= 7;
  return e[t] = r2 | 0, ai.bytes = t - i2 + 1, e;
}
var rn = Me$2, nn = 128, ci = 127;
function Me$2(r2, i2) {
  var t = 0, i2 = i2 || 0, s = 0, n2 = i2, o2, a2 = r2.length;
  do {
    if (n2 >= a2) throw Me$2.bytes = 0, new RangeError("Could not decode varint");
    o2 = r2[n2++], t += s < 28 ? (o2 & ci) << s : (o2 & ci) * Math.pow(2, s), s += 7;
  } while (o2 >= nn);
  return Me$2.bytes = n2 - i2, t;
}
var on = Math.pow(2, 7), an = Math.pow(2, 14), cn = Math.pow(2, 21), hn = Math.pow(2, 28), ln = Math.pow(2, 35), un = Math.pow(2, 42), dn = Math.pow(2, 49), gn = Math.pow(2, 56), pn = Math.pow(2, 63), yn = function(r2) {
  return r2 < on ? 1 : r2 < an ? 2 : r2 < cn ? 3 : r2 < hn ? 4 : r2 < ln ? 5 : r2 < un ? 6 : r2 < dn ? 7 : r2 < gn ? 8 : r2 < pn ? 9 : 10;
}, bn = { encode: Qr, decode: rn, encodingLength: yn }, hi = bn;
const li = (r2, e, t = 0) => (hi.encode(r2, e, t), e), ui = (r2) => hi.encodingLength(r2), Ke$2 = (r2, e) => {
  const t = e.byteLength, i2 = ui(r2), s = i2 + ui(t), n2 = new Uint8Array(s + t);
  return li(r2, n2, 0), li(t, n2, i2), n2.set(e, s), new mn(r2, t, e, n2);
};
class mn {
  constructor(e, t, i2, s) {
    this.code = e, this.size = t, this.digest = i2, this.bytes = s;
  }
}
const di = ({ name: r2, code: e, encode: t }) => new fn(r2, e, t);
class fn {
  constructor(e, t, i2) {
    this.name = e, this.code = t, this.encode = i2;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? Ke$2(this.code, t) : t.then((i2) => Ke$2(this.code, i2));
    } else throw Error("Unknown type, must be binary type");
  }
}
const gi = (r2) => async (e) => new Uint8Array(await crypto.subtle.digest(r2, e)), Dn = di({ name: "sha2-256", code: 18, encode: gi("SHA-256") }), vn = di({ name: "sha2-512", code: 19, encode: gi("SHA-512") });
var wn = Object.freeze({ __proto__: null, sha256: Dn, sha512: vn });
const pi = 0, _n = "identity", yi = si, En2 = (r2) => Ke$2(pi, yi(r2)), In = { code: pi, name: _n, encode: yi, digest: En2 };
var Tn = Object.freeze({ __proto__: null, identity: In });
new TextEncoder(), new TextDecoder();
const bi = { ...br, ...fr, ...vr, ..._r, ...Tr, ...zr, ...jr, ...Mr, ...Gr, ...Zr };
({ ...wn, ...Tn });
function Cn(r2 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r2) : new Uint8Array(r2);
}
function mi(r2, e, t, i2) {
  return { name: r2, prefix: e, encoder: { name: r2, prefix: e, encode: t }, decoder: { decode: i2 } };
}
const fi = mi("utf8", "u", (r2) => "u" + new TextDecoder("utf8").decode(r2), (r2) => new TextEncoder().encode(r2.substring(1))), Be$1 = mi("ascii", "a", (r2) => {
  let e = "a";
  for (let t = 0; t < r2.length; t++) e += String.fromCharCode(r2[t]);
  return e;
}, (r2) => {
  r2 = r2.substring(1);
  const e = Cn(r2.length);
  for (let t = 0; t < r2.length; t++) e[t] = r2.charCodeAt(t);
  return e;
}), Pn = { utf8: fi, "utf-8": fi, hex: bi.base16, latin1: Be$1, ascii: Be$1, binary: Be$1, ...bi };
function Sn(r2, e = "utf8") {
  const t = Pn[e];
  if (!t) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r2, "utf8") : t.decoder.decode(`${t.prefix}${r2}`);
}
var On = Object.defineProperty, Rn = (r2, e, t) => e in r2 ? On(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, W$2 = (r2, e, t) => Rn(r2, typeof e != "symbol" ? e + "" : e, t);
class Di {
  constructor(e, t) {
    this.core = e, this.logger = t, W$2(this, "keychain", /* @__PURE__ */ new Map()), W$2(this, "name", Pt$1), W$2(this, "version", St$2), W$2(this, "initialized", false), W$2(this, "storagePrefix", B$2), W$2(this, "init", async () => {
      if (!this.initialized) {
        const i2 = await this.getKeyChain();
        typeof i2 < "u" && (this.keychain = i2), this.initialized = true;
      }
    }), W$2(this, "has", (i2) => (this.isInitialized(), this.keychain.has(i2))), W$2(this, "set", async (i2, s) => {
      this.isInitialized(), this.keychain.set(i2, s), await this.persist();
    }), W$2(this, "get", (i2) => {
      this.isInitialized();
      const s = this.keychain.get(i2);
      if (typeof s > "u") {
        const { message: n2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${i2}`);
        throw new Error(n2);
      }
      return s;
    }), W$2(this, "del", async (i2) => {
      this.isInitialized(), this.keychain.delete(i2), await this.persist();
    }), this.core = e, this.logger = E$4(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, fi$1(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? li$1(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var An = Object.defineProperty, xn = (r2, e, t) => e in r2 ? An(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, S$2 = (r2, e, t) => xn(r2, typeof e != "symbol" ? e + "" : e, t);
class vi {
  constructor(e, t, i2) {
    this.core = e, this.logger = t, S$2(this, "name", Tt$1), S$2(this, "keychain"), S$2(this, "randomSessionIdentifier", jc()), S$2(this, "initialized", false), S$2(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), S$2(this, "hasKeys", (s) => (this.isInitialized(), this.keychain.has(s))), S$2(this, "getClientId", async () => {
      this.isInitialized();
      const s = await this.getClientSeed(), n2 = Po$1(s);
      return Qe$3(n2.publicKey);
    }), S$2(this, "generateKeyPair", () => {
      this.isInitialized();
      const s = Lc();
      return this.setPrivateKey(s.publicKey, s.privateKey);
    }), S$2(this, "signJWT", async (s) => {
      this.isInitialized();
      const n2 = await this.getClientSeed(), o2 = Po$1(n2), a2 = this.randomSessionIdentifier, c2 = Ct;
      return await Qo(a2, s, c2, o2);
    }), S$2(this, "generateSharedKey", (s, n2, o2) => {
      this.isInitialized();
      const a2 = this.getPrivateKey(s), c2 = Cc(a2, n2);
      return this.setSymKey(c2, o2);
    }), S$2(this, "setSymKey", async (s, n2) => {
      this.isInitialized();
      const o2 = n2 || Pc(s);
      return await this.keychain.set(o2, s), o2;
    }), S$2(this, "deleteKeyPair", async (s) => {
      this.isInitialized(), await this.keychain.del(s);
    }), S$2(this, "deleteSymKey", async (s) => {
      this.isInitialized(), await this.keychain.del(s);
    }), S$2(this, "encode", async (s, n2, o2) => {
      this.isInitialized();
      const a2 = oo$1(o2), c2 = safeJsonStringify(n2);
      if (Fc(a2)) return Dc(c2, o2 == null ? void 0 : o2.encoding);
      if (Kc(a2)) {
        const g2 = a2.senderPublicKey, _2 = a2.receiverPublicKey;
        s = await this.generateSharedKey(g2, _2);
      }
      const h3 = this.getSymKey(s), { type: l2, senderPublicKey: d4 } = a2;
      return Vc({ type: l2, symKey: h3, message: c2, senderPublicKey: d4, encoding: o2 == null ? void 0 : o2.encoding });
    }), S$2(this, "decode", async (s, n2, o2) => {
      this.isInitialized();
      const a2 = qc(n2, o2);
      if (Fc(a2)) {
        const c2 = Hc(n2, o2 == null ? void 0 : o2.encoding);
        return safeJsonParse(c2);
      }
      if (Kc(a2)) {
        const c2 = a2.receiverPublicKey, h3 = a2.senderPublicKey;
        s = await this.generateSharedKey(c2, h3);
      }
      try {
        const c2 = this.getSymKey(s), h3 = Mc({ symKey: c2, encoded: n2, encoding: o2 == null ? void 0 : o2.encoding });
        return safeJsonParse(h3);
      } catch (c2) {
        this.logger.error(`Failed to decode message from topic: '${s}', clientId: '${await this.getClientId()}'`), this.logger.error(c2);
      }
    }), S$2(this, "getPayloadType", (s, n2 = qt$2) => {
      const o2 = Se$1({ encoded: s, encoding: n2 });
      return Bt$2(o2.type);
    }), S$2(this, "getPayloadSenderPublicKey", (s, n2 = qt$2) => {
      const o2 = Se$1({ encoded: s, encoding: n2 });
      return o2.senderPublicKey ? toString(o2.senderPublicKey, G$2) : void 0;
    }), this.core = e, this.logger = E$4(t, this.name), this.keychain = i2 || new Di(this.core, this.logger);
  }
  get context() {
    return y$3(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(ke$2);
    } catch {
      e = jc(), await this.keychain.set(ke$2, e);
    }
    return Sn(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Nn = Object.defineProperty, $n = Object.defineProperties, zn = Object.getOwnPropertyDescriptors, wi = Object.getOwnPropertySymbols, Ln = Object.prototype.hasOwnProperty, kn = Object.prototype.propertyIsEnumerable, Ve$1 = (r2, e, t) => e in r2 ? Nn(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, jn = (r2, e) => {
  for (var t in e || (e = {})) Ln.call(e, t) && Ve$1(r2, t, e[t]);
  if (wi) for (var t of wi(e)) kn.call(e, t) && Ve$1(r2, t, e[t]);
  return r2;
}, Un = (r2, e) => $n(r2, zn(e)), k$2 = (r2, e, t) => Ve$1(r2, typeof e != "symbol" ? e + "" : e, t);
class _i extends y$2 {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, k$2(this, "messages", /* @__PURE__ */ new Map()), k$2(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), k$2(this, "name", Ot), k$2(this, "version", Rt$1), k$2(this, "initialized", false), k$2(this, "storagePrefix", B$2), k$2(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i2 = await this.getRelayerMessages();
          typeof i2 < "u" && (this.messages = i2);
          const s = await this.getRelayerMessagesWithoutClientAck();
          typeof s < "u" && (this.messagesWithoutClientAck = s), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i2) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i2);
        } finally {
          this.initialized = true;
        }
      }
    }), k$2(this, "set", async (i2, s, n2) => {
      this.isInitialized();
      const o2 = kc(s);
      let a2 = this.messages.get(i2);
      if (typeof a2 > "u" && (a2 = {}), typeof a2[o2] < "u") return o2;
      if (a2[o2] = s, this.messages.set(i2, a2), n2 === le$1.inbound) {
        const c2 = this.messagesWithoutClientAck.get(i2) || {};
        this.messagesWithoutClientAck.set(i2, Un(jn({}, c2), { [o2]: s }));
      }
      return await this.persist(), o2;
    }), k$2(this, "get", (i2) => {
      this.isInitialized();
      let s = this.messages.get(i2);
      return typeof s > "u" && (s = {}), s;
    }), k$2(this, "getWithoutAck", (i2) => {
      this.isInitialized();
      const s = {};
      for (const n2 of i2) {
        const o2 = this.messagesWithoutClientAck.get(n2) || {};
        s[n2] = Object.values(o2);
      }
      return s;
    }), k$2(this, "has", (i2, s) => {
      this.isInitialized();
      const n2 = this.get(i2), o2 = kc(s);
      return typeof n2[o2] < "u";
    }), k$2(this, "ack", async (i2, s) => {
      this.isInitialized();
      const n2 = this.messagesWithoutClientAck.get(i2);
      if (typeof n2 > "u") return;
      const o2 = kc(s);
      delete n2[o2], Object.keys(n2).length === 0 ? this.messagesWithoutClientAck.delete(i2) : this.messagesWithoutClientAck.set(i2, n2), await this.persist();
    }), k$2(this, "del", async (i2) => {
      this.isInitialized(), this.messages.delete(i2), this.messagesWithoutClientAck.delete(i2), await this.persist();
    }), this.logger = E$4(e, this.name), this.core = t;
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, fi$1(e));
  }
  async setRelayerMessagesWithoutClientAck(e) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, fi$1(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? li$1(e) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e < "u" ? li$1(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Fn = Object.defineProperty, Mn = Object.defineProperties, Kn = Object.getOwnPropertyDescriptors, Ei = Object.getOwnPropertySymbols, Bn = Object.prototype.hasOwnProperty, Vn = Object.prototype.propertyIsEnumerable, qe$1 = (r2, e, t) => e in r2 ? Fn(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, Ie$1 = (r2, e) => {
  for (var t in e || (e = {})) Bn.call(e, t) && qe$1(r2, t, e[t]);
  if (Ei) for (var t of Ei(e)) Vn.call(e, t) && qe$1(r2, t, e[t]);
  return r2;
}, Ge$2 = (r2, e) => Mn(r2, Kn(e)), V$2 = (r2, e, t) => qe$1(r2, typeof e != "symbol" ? e + "" : e, t);
class qn extends m2 {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, V$2(this, "events", new events.EventEmitter()), V$2(this, "name", At), V$2(this, "queue", /* @__PURE__ */ new Map()), V$2(this, "publishTimeout", cjs.toMiliseconds(cjs.ONE_MINUTE)), V$2(this, "initialPublishTimeout", cjs.toMiliseconds(cjs.ONE_SECOND * 15)), V$2(this, "needsTransportRestart", false), V$2(this, "publish", async (i2, s, n2) => {
      var o2;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i2, message: s, opts: n2 } });
      const a2 = (n2 == null ? void 0 : n2.ttl) || je$1, c2 = Zc(n2), h3 = (n2 == null ? void 0 : n2.prompt) || false, l2 = (n2 == null ? void 0 : n2.tag) || 0, d4 = (n2 == null ? void 0 : n2.id) || getBigIntRpcId().toString(), g2 = { topic: i2, message: s, opts: { ttl: a2, relay: c2, prompt: h3, tag: l2, id: d4, attestation: n2 == null ? void 0 : n2.attestation, tvf: n2 == null ? void 0 : n2.tvf } }, _2 = `Failed to publish payload, please try again. id:${d4} tag:${l2}`;
      try {
        const u2 = new Promise(async (b2) => {
          const x2 = ({ id: D2 }) => {
            g2.opts.id === D2 && (this.removeRequestFromQueue(D2), this.relayer.events.removeListener(C$2.publish, x2), b2(g2));
          };
          this.relayer.events.on(C$2.publish, x2);
          const I3 = yi$1(new Promise((D2, j2) => {
            this.rpcPublish({ topic: i2, message: s, ttl: a2, prompt: h3, tag: l2, id: d4, attestation: n2 == null ? void 0 : n2.attestation, tvf: n2 == null ? void 0 : n2.tvf }).then(D2).catch((T2) => {
              this.logger.warn(T2, T2 == null ? void 0 : T2.message), j2(T2);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${d4} tag:${l2}`);
          try {
            await I3, this.events.removeListener(C$2.publish, x2);
          } catch (D2) {
            this.queue.set(d4, Ge$2(Ie$1({}, g2), { attempt: 1 })), this.logger.warn(D2, D2 == null ? void 0 : D2.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: d4, topic: i2, message: s, opts: n2 } }), await yi$1(u2, this.publishTimeout, _2);
      } catch (u2) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(u2), (o2 = n2 == null ? void 0 : n2.internal) != null && o2.throwOnFailedPublish) throw u2;
      } finally {
        this.queue.delete(d4);
      }
    }), V$2(this, "on", (i2, s) => {
      this.events.on(i2, s);
    }), V$2(this, "once", (i2, s) => {
      this.events.once(i2, s);
    }), V$2(this, "off", (i2, s) => {
      this.events.off(i2, s);
    }), V$2(this, "removeListener", (i2, s) => {
      this.events.removeListener(i2, s);
    }), this.relayer = e, this.logger = E$4(t, this.name), this.registerEventListeners();
  }
  get context() {
    return y$3(this.logger);
  }
  async rpcPublish(e) {
    var t, i2, s, n2;
    const { topic: o2, message: a2, ttl: c2 = je$1, prompt: h3, tag: l2, id: d4, attestation: g2, tvf: _2 } = e, u2 = { method: Yc(Zc().protocol).publish, params: Ie$1({ topic: o2, message: a2, ttl: c2, prompt: h3, tag: l2, attestation: g2 }, _2), id: d4 };
    Et$2((t = u2.params) == null ? void 0 : t.prompt) && ((i2 = u2.params) == null || delete i2.prompt), Et$2((s = u2.params) == null ? void 0 : s.tag) && ((n2 = u2.params) == null || delete n2.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: u2 });
    const b2 = await this.relayer.request(u2);
    return this.relayer.events.emit(C$2.publish, e), this.logger.debug("Successfully Published Payload"), b2;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, t) => {
      const i2 = e.attempt + 1;
      this.queue.set(t, Ge$2(Ie$1({}, e), { attempt: i2 }));
      const { topic: s, message: n2, opts: o2, attestation: a2 } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${i2}`), await this.rpcPublish(Ge$2(Ie$1({}, e), { topic: s, message: n2, ttl: o2.ttl, prompt: o2.prompt, tag: o2.tag, id: o2.id, attestation: a2, tvf: o2.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(C$2.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(C$2.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
var Gn = Object.defineProperty, Wn = (r2, e, t) => e in r2 ? Gn(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, ne$1 = (r2, e, t) => Wn(r2, typeof e != "symbol" ? e + "" : e, t);
class Hn {
  constructor() {
    ne$1(this, "map", /* @__PURE__ */ new Map()), ne$1(this, "set", (e, t) => {
      const i2 = this.get(e);
      this.exists(e, t) || this.map.set(e, [...i2, t]);
    }), ne$1(this, "get", (e) => this.map.get(e) || []), ne$1(this, "exists", (e, t) => this.get(e).includes(t)), ne$1(this, "delete", (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const i2 = this.get(e);
      if (!this.exists(e, t)) return;
      const s = i2.filter((n2) => n2 !== t);
      if (!s.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, s);
    }), ne$1(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var Yn = Object.defineProperty, Jn = Object.defineProperties, Xn = Object.getOwnPropertyDescriptors, Ii = Object.getOwnPropertySymbols, Zn = Object.prototype.hasOwnProperty, Qn = Object.prototype.propertyIsEnumerable, We$1 = (r2, e, t) => e in r2 ? Yn(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, ge$1 = (r2, e) => {
  for (var t in e || (e = {})) Zn.call(e, t) && We$1(r2, t, e[t]);
  if (Ii) for (var t of Ii(e)) Qn.call(e, t) && We$1(r2, t, e[t]);
  return r2;
}, He$1 = (r2, e) => Jn(r2, Xn(e)), f$1 = (r2, e, t) => We$1(r2, typeof e != "symbol" ? e + "" : e, t);
class Ti extends P$2 {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, f$1(this, "subscriptions", /* @__PURE__ */ new Map()), f$1(this, "topicMap", new Hn()), f$1(this, "events", new events.EventEmitter()), f$1(this, "name", Ut$1), f$1(this, "version", Ft$1), f$1(this, "pending", /* @__PURE__ */ new Map()), f$1(this, "cached", []), f$1(this, "initialized", false), f$1(this, "storagePrefix", B$2), f$1(this, "subscribeTimeout", cjs.toMiliseconds(cjs.ONE_MINUTE)), f$1(this, "initialSubscribeTimeout", cjs.toMiliseconds(cjs.ONE_SECOND * 15)), f$1(this, "clientId"), f$1(this, "batchSubscribeTopicsLimit", 500), f$1(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), f$1(this, "subscribe", async (i2, s) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i2, opts: s } });
      try {
        const n2 = Zc(s), o2 = { topic: i2, relay: n2, transportType: s == null ? void 0 : s.transportType };
        this.pending.set(i2, o2);
        const a2 = await this.rpcSubscribe(i2, n2, s);
        return typeof a2 == "string" && (this.onSubscribe(a2, o2), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i2, opts: s } })), a2;
      } catch (n2) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n2), n2;
      }
    }), f$1(this, "unsubscribe", async (i2, s) => {
      this.isInitialized(), typeof (s == null ? void 0 : s.id) < "u" ? await this.unsubscribeById(i2, s.id, s) : await this.unsubscribeByTopic(i2, s);
    }), f$1(this, "isSubscribed", (i2) => new Promise((s) => {
      s(this.topicMap.topics.includes(i2));
    })), f$1(this, "isKnownTopic", (i2) => new Promise((s) => {
      s(this.topicMap.topics.includes(i2) || this.pending.has(i2) || this.cached.some((n2) => n2.topic === i2));
    })), f$1(this, "on", (i2, s) => {
      this.events.on(i2, s);
    }), f$1(this, "once", (i2, s) => {
      this.events.once(i2, s);
    }), f$1(this, "off", (i2, s) => {
      this.events.off(i2, s);
    }), f$1(this, "removeListener", (i2, s) => {
      this.events.removeListener(i2, s);
    }), f$1(this, "start", async () => {
      await this.onConnect();
    }), f$1(this, "stop", async () => {
      await this.onDisconnect();
    }), f$1(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), f$1(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const i2 = [];
      this.pending.forEach((s) => {
        i2.push(s);
      }), await this.batchSubscribe(i2);
    }), f$1(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r.pulse, async () => {
        await this.checkPending();
      }), this.events.on($$3.created, async (i2) => {
        const s = $$3.created;
        this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: i2 }), await this.persist();
      }), this.events.on($$3.deleted, async (i2) => {
        const s = $$3.deleted;
        this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: i2 }), await this.persist();
      });
    }), this.relayer = e, this.logger = E$4(t, this.name), this.clientId = "";
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e, t) {
    let i2 = false;
    try {
      i2 = this.getSubscription(e).topic === t;
    } catch {
    }
    return i2;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const i2 = this.topicMap.get(e);
    await Promise.all(i2.map(async (s) => await this.unsubscribeById(e, s, t)));
  }
  async unsubscribeById(e, t, i2) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i2 } });
    try {
      const s = Zc(i2);
      await this.restartToComplete({ topic: e, id: t, relay: s }), await this.rpcUnsubscribe(e, t, s);
      const n2 = Nt$1("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, n2), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i2 } });
    } catch (s) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
    }
  }
  async rpcSubscribe(e, t, i2) {
    var s;
    (!i2 || (i2 == null ? void 0 : i2.transportType) === Q$2.relay) && await this.restartToComplete({ topic: e, id: e, relay: t });
    const n2 = { method: Yc(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n2 });
    const o2 = (s = i2 == null ? void 0 : i2.internal) == null ? void 0 : s.throwOnFailedPublish;
    try {
      const a2 = await this.getSubscriptionId(e);
      if ((i2 == null ? void 0 : i2.transportType) === Q$2.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(n2).catch((l2) => this.logger.warn(l2));
      }, cjs.toMiliseconds(cjs.ONE_SECOND)), a2;
      const c2 = new Promise(async (l2) => {
        const d4 = (g2) => {
          g2.topic === e && (this.events.removeListener($$3.created, d4), l2(g2.id));
        };
        this.events.on($$3.created, d4);
        try {
          const g2 = await yi$1(new Promise((_2, u2) => {
            this.relayer.request(n2).catch((b2) => {
              this.logger.warn(b2, b2 == null ? void 0 : b2.message), u2(b2);
            }).then(_2);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener($$3.created, d4), l2(g2);
        } catch {
        }
      }), h3 = await yi$1(c2, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!h3 && o2) throw new Error(`Subscribing to ${e} failed, please try again`);
      return h3 ? a2 : null;
    } catch (a2) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(C$2.connection_stalled), o2) throw a2;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const t = e[0].relay, i2 = { method: Yc(t.protocol).batchSubscribe, params: { topics: e.map((s) => s.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    try {
      await await yi$1(new Promise((s) => {
        this.relayer.request(i2).catch((n2) => this.logger.warn(n2)).then(s);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(C$2.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length) return;
    const t = e[0].relay, i2 = { method: Yc(t.protocol).batchFetchMessages, params: { topics: e.map((n2) => n2.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    let s;
    try {
      s = await await yi$1(new Promise((n2, o2) => {
        this.relayer.request(i2).catch((a2) => {
          this.logger.warn(a2), o2(a2);
        }).then(n2);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(C$2.connection_stalled);
    }
    return s;
  }
  rpcUnsubscribe(e, t, i2) {
    const s = { method: Yc(i2.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s }), this.relayer.request(s);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, He$1(ge$1({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, ge$1({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, i2) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i2), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t);
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, ge$1({}, t)), this.topicMap.set(t.topic, e), this.events.emit($$3.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i2);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const i2 = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(i2.topic, e), this.events.emit($$3.deleted, He$1(ge$1({}, i2), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($$3.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let i2 = 0; i2 < t; i2++) {
        const s = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(s);
      }
    }
    this.events.emit($$3.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (t) => He$1(ge$1({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e) {
    if (!e.length) return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e);
    t && t.messages && (await Ni$1(cjs.toMiliseconds(cjs.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete(e) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e) {
    return kc(e + await this.getClientId());
  }
}
var eo = Object.defineProperty, Ci = Object.getOwnPropertySymbols, to = Object.prototype.hasOwnProperty, io = Object.prototype.propertyIsEnumerable, Ye$1 = (r2, e, t) => e in r2 ? eo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, Pi = (r2, e) => {
  for (var t in e || (e = {})) to.call(e, t) && Ye$1(r2, t, e[t]);
  if (Ci) for (var t of Ci(e)) io.call(e, t) && Ye$1(r2, t, e[t]);
  return r2;
}, y$1 = (r2, e, t) => Ye$1(r2, typeof e != "symbol" ? e + "" : e, t);
class Si extends d$1 {
  constructor(e) {
    super(e), y$1(this, "protocol", "wc"), y$1(this, "version", 2), y$1(this, "core"), y$1(this, "logger"), y$1(this, "events", new events.EventEmitter()), y$1(this, "provider"), y$1(this, "messages"), y$1(this, "subscriber"), y$1(this, "publisher"), y$1(this, "name", $t), y$1(this, "transportExplicitlyClosed", false), y$1(this, "initialized", false), y$1(this, "connectionAttemptInProgress", false), y$1(this, "relayUrl"), y$1(this, "projectId"), y$1(this, "packageName"), y$1(this, "bundleId"), y$1(this, "hasExperiencedNetworkDisruption", false), y$1(this, "pingTimeout"), y$1(this, "heartBeatTimeout", cjs.toMiliseconds(cjs.THIRTY_SECONDS + cjs.FIVE_SECONDS)), y$1(this, "reconnectTimeout"), y$1(this, "connectPromise"), y$1(this, "reconnectInProgress", false), y$1(this, "requestsInFlight", []), y$1(this, "connectTimeout", cjs.toMiliseconds(cjs.ONE_SECOND * 15)), y$1(this, "request", async (t) => {
      var i2, s;
      this.logger.debug("Publishing Request Payload");
      const n2 = t.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: n2, method: t.method, topic: (i2 = t.params) == null ? void 0 : i2.topic }, "relayer.request - publishing...");
        const o2 = `${n2}:${((s = t.params) == null ? void 0 : s.tag) || ""}`;
        this.requestsInFlight.push(o2);
        const a2 = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((c2) => c2 !== o2), a2;
      } catch (o2) {
        throw this.logger.debug(`Failed to Publish Request: ${n2}`), o2;
      }
    }), y$1(this, "resetPingTimeout", () => {
      _e$3() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var t, i2, s, n2;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n2 = (s = (i2 = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : i2.socket) == null ? void 0 : s.terminate) == null || n2.call(s);
        } catch (o2) {
          this.logger.warn(o2, o2 == null ? void 0 : o2.message);
        }
      }, this.heartBeatTimeout));
    }), y$1(this, "onPayloadHandler", (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }), y$1(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(C$2.connect);
    }), y$1(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), y$1(this, "onProviderErrorHandler", (t) => {
      this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(C$2.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), y$1(this, "registerProviderListeners", () => {
      this.provider.on(L$2.payload, this.onPayloadHandler), this.provider.on(L$2.connect, this.onConnectHandler), this.provider.on(L$2.disconnect, this.onDisconnectHandler), this.provider.on(L$2.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? E$4(e.logger, this.name) : Ot$1(k$4({ level: e.logger || Nt })), this.messages = new _i(this.logger, e.core), this.subscriber = new Ti(this, this.logger), this.publisher = new qn(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || Ue$2, this.projectId = e.projectId, ei$1() ? this.packageName = ri$1() : ni$1() && (this.bundleId = ri$1()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e) {
      this.logger.warn(e, e == null ? void 0 : e.message);
    }
  }
  get context() {
    return y$3(this.logger);
  }
  get connected() {
    var e, t, i2;
    return ((i2 = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : i2.readyState) === 1 || false;
  }
  get connecting() {
    var e, t, i2;
    return ((i2 = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : i2.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e, t, i2) {
    this.isInitialized(), await this.publisher.publish(e, t, i2), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now(), transportType: Q$2.relay }, le$1.outbound);
  }
  async subscribe(e, t) {
    var i2, s, n2;
    this.isInitialized(), (!(t != null && t.transportType) || (t == null ? void 0 : t.transportType) === "relay") && await this.toEstablishConnection();
    const o2 = typeof ((i2 = t == null ? void 0 : t.internal) == null ? void 0 : i2.throwOnFailedPublish) > "u" ? true : (s = t == null ? void 0 : t.internal) == null ? void 0 : s.throwOnFailedPublish;
    let a2 = ((n2 = this.subscriber.topicMap.get(e)) == null ? void 0 : n2[0]) || "", c2;
    const h3 = (l2) => {
      l2.topic === e && (this.subscriber.off($$3.created, h3), c2());
    };
    return await Promise.all([new Promise((l2) => {
      c2 = l2, this.subscriber.on($$3.created, h3);
    }), new Promise(async (l2, d4) => {
      a2 = await this.subscriber.subscribe(e, Pi({ internal: { throwOnFailedPublish: o2 } }, t)).catch((g2) => {
        o2 && d4(g2);
      }) || a2, l2();
    })]), a2;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await yi$1(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, i2) => {
      await this.connect(e).then(t).catch(i2).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Na()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e.sort((i2, s) => i2.publishedAt - s.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const i2 of t) try {
      await this.onMessageEvent(i2);
    } catch (s) {
      this.logger.warn(s, "Error while processing batch message event: " + (s == null ? void 0 : s.message));
    }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e, t) {
    const { topic: i2 } = e;
    if (!t.sessionExists) {
      const s = Ei$1(cjs.FIVE_MINUTES), n2 = { topic: i2, expiry: s, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(i2, n2);
    }
    this.events.emit(C$2.message, e), await this.recordMessageEvent(e, le$1.inbound);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (i2, s) => {
          const n2 = () => {
            s(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(L$2.disconnect, n2), await yi$1(new Promise((o2, a2) => {
            this.provider.connect().then(o2).catch(a2);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o2) => {
            s(o2);
          }).finally(() => {
            this.provider.off(L$2.disconnect, n2), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o2, a2) => {
            const c2 = () => {
              a2(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(L$2.disconnect, c2), await this.subscriber.start().then(o2).catch(a2).finally(() => {
              this.provider.off(L$2.disconnect, c2);
            });
          }), this.hasExperiencedNetworkDisruption = false, i2();
        });
      } catch (i2) {
        await this.subscriber.stop();
        const s = i2;
        this.logger.warn({}, s.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((i2) => setTimeout(i2, cjs.toMiliseconds(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e, t, i2, s, n2;
    if (_e$3()) try {
      (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((n2 = (s = (i2 = this.provider) == null ? void 0 : i2.connection) == null ? void 0 : s.socket) == null || n2.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o2) {
      this.logger.warn(o2, o2 == null ? void 0 : o2.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o(new f$4(si$1({ sdkVersion: _e$2, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e, t) {
    const { topic: i2, message: s } = e;
    await this.messages.set(i2, s, t);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: i2 } = e;
    if (!i2 || i2.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${i2}`), true;
    if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), true;
    const s = this.messages.has(t, i2);
    return s && this.logger.warn(`Ignoring duplicate message: ${i2}`), s;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), isJsonRpcRequest(e)) {
      if (!e.method.endsWith(zt$1)) return;
      const t = e.params, { topic: i2, message: s, publishedAt: n2, attestation: o2 } = t.data, a2 = { topic: i2, message: s, publishedAt: n2, transportType: Q$2.relay, attestation: o2 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Pi({ type: "event", event: t.id }, a2)), this.events.emit(t.id, a2), await this.acknowledgePayload(e), await this.onMessageEvent(a2);
    } else isJsonRpcResponse(e) && this.events.emit(C$2.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, le$1.inbound), this.events.emit(C$2.message, e));
  }
  async acknowledgePayload(e) {
    const t = formatJsonRpcResult(e.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(L$2.payload, this.onPayloadHandler), this.provider.off(L$2.connect, this.onConnectHandler), this.provider.off(L$2.disconnect, this.onDisconnectHandler), this.provider.off(L$2.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Na();
    Ua(async (t) => {
      e !== t && (e = t, t ? await this.transportOpen().catch((i2) => this.logger.error(i2, i2 == null ? void 0 : i2.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    }), this.core.heartbeat.on(r.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && Ta()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (t) {
        this.logger.warn(t, t == null ? void 0 : t.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(C$2.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, cjs.toMiliseconds(Lt$1)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      await this.connect();
    }
  }
}
function so() {
}
function Oi(r2) {
  if (!r2 || typeof r2 != "object") return false;
  const e = Object.getPrototypeOf(r2);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(r2) === "[object Object]" : false;
}
function Ri(r2) {
  return Object.getOwnPropertySymbols(r2).filter((e) => Object.prototype.propertyIsEnumerable.call(r2, e));
}
function Ai(r2) {
  return r2 == null ? r2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r2);
}
const ro = "[object RegExp]", no = "[object String]", oo = "[object Number]", ao = "[object Boolean]", xi = "[object Arguments]", co = "[object Symbol]", ho = "[object Date]", lo = "[object Map]", uo = "[object Set]", go = "[object Array]", po = "[object Function]", yo = "[object ArrayBuffer]", Je$1 = "[object Object]", bo = "[object Error]", mo = "[object DataView]", fo = "[object Uint8Array]", Do = "[object Uint8ClampedArray]", vo = "[object Uint16Array]", wo = "[object Uint32Array]", _o = "[object BigUint64Array]", Eo = "[object Int8Array]", Io = "[object Int16Array]", To = "[object Int32Array]", Co = "[object BigInt64Array]", Po = "[object Float32Array]", So = "[object Float64Array]";
function Oo(r2, e) {
  return r2 === e || Number.isNaN(r2) && Number.isNaN(e);
}
function Ro(r2, e, t) {
  return pe$1(r2, e, void 0, void 0, void 0, void 0, t);
}
function pe$1(r2, e, t, i2, s, n2, o2) {
  const a2 = o2(r2, e, t, i2, s, n2);
  if (a2 !== void 0) return a2;
  if (typeof r2 == typeof e) switch (typeof r2) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return r2 === e;
    case "number":
      return r2 === e || Object.is(r2, e);
    case "function":
      return r2 === e;
    case "object":
      return ye$1(r2, e, n2, o2);
  }
  return ye$1(r2, e, n2, o2);
}
function ye$1(r2, e, t, i2) {
  if (Object.is(r2, e)) return true;
  let s = Ai(r2), n2 = Ai(e);
  if (s === xi && (s = Je$1), n2 === xi && (n2 = Je$1), s !== n2) return false;
  switch (s) {
    case no:
      return r2.toString() === e.toString();
    case oo: {
      const c2 = r2.valueOf(), h3 = e.valueOf();
      return Oo(c2, h3);
    }
    case ao:
    case ho:
    case co:
      return Object.is(r2.valueOf(), e.valueOf());
    case ro:
      return r2.source === e.source && r2.flags === e.flags;
    case po:
      return r2 === e;
  }
  t = t ?? /* @__PURE__ */ new Map();
  const o2 = t.get(r2), a2 = t.get(e);
  if (o2 != null && a2 != null) return o2 === e;
  t.set(r2, e), t.set(e, r2);
  try {
    switch (s) {
      case lo: {
        if (r2.size !== e.size) return false;
        for (const [c2, h3] of r2.entries()) if (!e.has(c2) || !pe$1(h3, e.get(c2), c2, r2, e, t, i2)) return false;
        return true;
      }
      case uo: {
        if (r2.size !== e.size) return false;
        const c2 = Array.from(r2.values()), h3 = Array.from(e.values());
        for (let l2 = 0; l2 < c2.length; l2++) {
          const d4 = c2[l2], g2 = h3.findIndex((_2) => pe$1(d4, _2, void 0, r2, e, t, i2));
          if (g2 === -1) return false;
          h3.splice(g2, 1);
        }
        return true;
      }
      case go:
      case fo:
      case Do:
      case vo:
      case wo:
      case _o:
      case Eo:
      case Io:
      case To:
      case Co:
      case Po:
      case So: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r2) !== Buffer.isBuffer(e) || r2.length !== e.length) return false;
        for (let c2 = 0; c2 < r2.length; c2++) if (!pe$1(r2[c2], e[c2], c2, r2, e, t, i2)) return false;
        return true;
      }
      case yo:
        return r2.byteLength !== e.byteLength ? false : ye$1(new Uint8Array(r2), new Uint8Array(e), t, i2);
      case mo:
        return r2.byteLength !== e.byteLength || r2.byteOffset !== e.byteOffset ? false : ye$1(new Uint8Array(r2), new Uint8Array(e), t, i2);
      case bo:
        return r2.name === e.name && r2.message === e.message;
      case Je$1: {
        if (!(ye$1(r2.constructor, e.constructor, t, i2) || Oi(r2) && Oi(e))) return false;
        const h3 = [...Object.keys(r2), ...Ri(r2)], l2 = [...Object.keys(e), ...Ri(e)];
        if (h3.length !== l2.length) return false;
        for (let d4 = 0; d4 < h3.length; d4++) {
          const g2 = h3[d4], _2 = r2[g2];
          if (!Object.hasOwn(e, g2)) return false;
          const u2 = e[g2];
          if (!pe$1(_2, u2, g2, r2, e, t, i2)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t.delete(r2), t.delete(e);
  }
}
function Ao(r2, e) {
  return Ro(r2, e, so);
}
var xo = Object.defineProperty, Ni = Object.getOwnPropertySymbols, No = Object.prototype.hasOwnProperty, $o = Object.prototype.propertyIsEnumerable, Xe$1 = (r2, e, t) => e in r2 ? xo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, $i = (r2, e) => {
  for (var t in e || (e = {})) No.call(e, t) && Xe$1(r2, t, e[t]);
  if (Ni) for (var t of Ni(e)) $o.call(e, t) && Xe$1(r2, t, e[t]);
  return r2;
}, z$1 = (r2, e, t) => Xe$1(r2, typeof e != "symbol" ? e + "" : e, t);
class zi extends f$2 {
  constructor(e, t, i2, s = B$2, n2 = void 0) {
    super(e, t, i2, s), this.core = e, this.logger = t, this.name = i2, z$1(this, "map", /* @__PURE__ */ new Map()), z$1(this, "version", kt$1), z$1(this, "cached", []), z$1(this, "initialized", false), z$1(this, "getKey"), z$1(this, "storagePrefix", B$2), z$1(this, "recentlyDeleted", []), z$1(this, "recentlyDeletedLimit", 200), z$1(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o2) => {
        this.getKey && o2 !== null && !Et$2(o2) ? this.map.set(this.getKey(o2), o2) : la(o2) ? this.map.set(o2.id, o2) : da(o2) && this.map.set(o2.topic, o2);
      }), this.cached = [], this.initialized = true);
    }), z$1(this, "set", async (o2, a2) => {
      this.isInitialized(), this.map.has(o2) ? await this.update(o2, a2) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o2, value: a2 }), this.map.set(o2, a2), await this.persist());
    }), z$1(this, "get", (o2) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o2 }), this.getData(o2))), z$1(this, "getAll", (o2) => (this.isInitialized(), o2 ? this.values.filter((a2) => Object.keys(o2).every((c2) => Ao(a2[c2], o2[c2]))) : this.values)), z$1(this, "update", async (o2, a2) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o2, update: a2 });
      const c2 = $i($i({}, this.getData(o2)), a2);
      this.map.set(o2, c2), await this.persist();
    }), z$1(this, "delete", async (o2, a2) => {
      this.isInitialized(), this.map.has(o2) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o2, reason: a2 }), this.map.delete(o2), this.addToRecentlyDeleted(o2), await this.persist());
    }), this.logger = E$4(t, this.name), this.storagePrefix = s, this.getKey = n2;
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: s } = ht$2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(s), new Error(s);
      }
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i2), new Error(i2);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var zo = Object.defineProperty, Lo = (r2, e, t) => e in r2 ? zo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, p$1 = (r2, e, t) => Lo(r2, typeof e != "symbol" ? e + "" : e, t);
class Li {
  constructor(e, t) {
    this.core = e, this.logger = t, p$1(this, "name", Mt$1), p$1(this, "version", Kt$1), p$1(this, "events", new Nt$2()), p$1(this, "pairings"), p$1(this, "initialized", false), p$1(this, "storagePrefix", B$2), p$1(this, "ignoredPayloadTypes", [Ft$2]), p$1(this, "registeredMethods", []), p$1(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), p$1(this, "register", ({ methods: i2 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i2])];
    }), p$1(this, "create", async (i2) => {
      this.isInitialized();
      const s = jc(), n2 = await this.core.crypto.setSymKey(s), o2 = Ei$1(cjs.FIVE_MINUTES), a2 = { protocol: xt$1 }, c2 = { topic: n2, expiry: o2, relay: a2, active: false, methods: i2 == null ? void 0 : i2.methods }, h3 = Wc({ protocol: this.core.protocol, version: this.core.version, topic: n2, symKey: s, relay: a2, expiryTimestamp: o2, methods: i2 == null ? void 0 : i2.methods });
      return this.events.emit(re$1.create, c2), this.core.expirer.set(n2, o2), await this.pairings.set(n2, c2), await this.core.relayer.subscribe(n2, { transportType: i2 == null ? void 0 : i2.transportType }), { topic: n2, uri: h3 };
    }), p$1(this, "pair", async (i2) => {
      this.isInitialized();
      const s = this.core.eventClient.createEvent({ properties: { topic: i2 == null ? void 0 : i2.uri, trace: [G$1.pairing_started] } });
      this.isValidPair(i2, s);
      const { topic: n2, symKey: o2, relay: a2, expiryTimestamp: c2, methods: h3 } = Gc(i2.uri);
      s.props.properties.topic = n2, s.addTrace(G$1.pairing_uri_validation_success), s.addTrace(G$1.pairing_uri_not_expired);
      let l2;
      if (this.pairings.keys.includes(n2)) {
        if (l2 = this.pairings.get(n2), s.addTrace(G$1.existing_pairing), l2.active) throw s.setError(Y$2.active_pairing_already_exists), new Error(`Pairing already exists: ${n2}. Please try again with a new connection URI.`);
        s.addTrace(G$1.pairing_not_expired);
      }
      const d4 = c2 || Ei$1(cjs.FIVE_MINUTES), g2 = { topic: n2, relay: a2, expiry: d4, active: false, methods: h3 };
      this.core.expirer.set(n2, d4), await this.pairings.set(n2, g2), s.addTrace(G$1.store_new_pairing), i2.activatePairing && await this.activate({ topic: n2 }), this.events.emit(re$1.create, g2), s.addTrace(G$1.emit_inactive_pairing), this.core.crypto.keychain.has(n2) || await this.core.crypto.setSymKey(o2, n2), s.addTrace(G$1.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        s.setError(Y$2.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n2, { relay: a2 });
      } catch (_2) {
        throw s.setError(Y$2.subscribe_pairing_topic_failure), _2;
      }
      return s.addTrace(G$1.subscribe_pairing_topic_success), g2;
    }), p$1(this, "activate", async ({ topic: i2 }) => {
      this.isInitialized();
      const s = Ei$1(cjs.FIVE_MINUTES);
      this.core.expirer.set(i2, s), await this.pairings.update(i2, { active: true, expiry: s });
    }), p$1(this, "ping", async (i2) => {
      this.isInitialized(), await this.isValidPing(i2), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: s } = i2;
      if (this.pairings.keys.includes(s)) {
        const n2 = await this.sendRequest(s, "wc_pairingPing", {}), { done: o2, resolve: a2, reject: c2 } = gi$1();
        this.events.once(xi$1("pairing_ping", n2), ({ error: h3 }) => {
          h3 ? c2(h3) : a2();
        }), await o2();
      }
    }), p$1(this, "updateExpiry", async ({ topic: i2, expiry: s }) => {
      this.isInitialized(), await this.pairings.update(i2, { expiry: s });
    }), p$1(this, "updateMetadata", async ({ topic: i2, metadata: s }) => {
      this.isInitialized(), await this.pairings.update(i2, { peerMetadata: s });
    }), p$1(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), p$1(this, "disconnect", async (i2) => {
      this.isInitialized(), await this.isValidDisconnect(i2);
      const { topic: s } = i2;
      this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", Nt$1("USER_DISCONNECTED")), await this.deletePairing(s));
    }), p$1(this, "formatUriFromPairing", (i2) => {
      this.isInitialized();
      const { topic: s, relay: n2, expiry: o2, methods: a2 } = i2, c2 = this.core.crypto.keychain.get(s);
      return Wc({ protocol: this.core.protocol, version: this.core.version, topic: s, symKey: c2, relay: n2, expiryTimestamp: o2, methods: a2 });
    }), p$1(this, "sendRequest", async (i2, s, n2) => {
      const o2 = formatJsonRpcRequest(s, n2), a2 = await this.core.crypto.encode(i2, o2), c2 = se$1[s].req;
      return this.core.history.set(i2, o2), this.core.relayer.publish(i2, a2, c2), o2.id;
    }), p$1(this, "sendResult", async (i2, s, n2) => {
      const o2 = formatJsonRpcResult(i2, n2), a2 = await this.core.crypto.encode(s, o2), c2 = (await this.core.history.get(s, i2)).request.method, h3 = se$1[c2].res;
      await this.core.relayer.publish(s, a2, h3), await this.core.history.resolve(o2);
    }), p$1(this, "sendError", async (i2, s, n2) => {
      const o2 = formatJsonRpcError(i2, n2), a2 = await this.core.crypto.encode(s, o2), c2 = (await this.core.history.get(s, i2)).request.method, h3 = se$1[c2] ? se$1[c2].res : se$1.unregistered_method.res;
      await this.core.relayer.publish(s, a2, h3), await this.core.history.resolve(o2);
    }), p$1(this, "deletePairing", async (i2, s) => {
      await this.core.relayer.unsubscribe(i2), await Promise.all([this.pairings.delete(i2, Nt$1("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i2), s ? Promise.resolve() : this.core.expirer.del(i2)]);
    }), p$1(this, "cleanup", async () => {
      const i2 = this.pairings.getAll().filter((s) => vi$1(s.expiry));
      await Promise.all(i2.map((s) => this.deletePairing(s.topic)));
    }), p$1(this, "onRelayEventRequest", async (i2) => {
      const { topic: s, payload: n2 } = i2;
      switch (n2.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(s, n2);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(s, n2);
        default:
          return await this.onUnknownRpcMethodRequest(s, n2);
      }
    }), p$1(this, "onRelayEventResponse", async (i2) => {
      const { topic: s, payload: n2 } = i2, o2 = (await this.core.history.get(s, n2.id)).request.method;
      switch (o2) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(s, n2);
        default:
          return this.onUnknownRpcMethodResponse(o2);
      }
    }), p$1(this, "onPairingPingRequest", async (i2, s) => {
      const { id: n2 } = s;
      try {
        this.isValidPing({ topic: i2 }), await this.sendResult(n2, i2, true), this.events.emit(re$1.ping, { id: n2, topic: i2 });
      } catch (o2) {
        await this.sendError(n2, i2, o2), this.logger.error(o2);
      }
    }), p$1(this, "onPairingPingResponse", (i2, s) => {
      const { id: n2 } = s;
      setTimeout(() => {
        isJsonRpcResult(s) ? this.events.emit(xi$1("pairing_ping", n2), {}) : isJsonRpcError(s) && this.events.emit(xi$1("pairing_ping", n2), { error: s.error });
      }, 500);
    }), p$1(this, "onPairingDeleteRequest", async (i2, s) => {
      const { id: n2 } = s;
      try {
        this.isValidDisconnect({ topic: i2 }), await this.deletePairing(i2), this.events.emit(re$1.delete, { id: n2, topic: i2 });
      } catch (o2) {
        await this.sendError(n2, i2, o2), this.logger.error(o2);
      }
    }), p$1(this, "onUnknownRpcMethodRequest", async (i2, s) => {
      const { id: n2, method: o2 } = s;
      try {
        if (this.registeredMethods.includes(o2)) return;
        const a2 = Nt$1("WC_METHOD_UNSUPPORTED", o2);
        await this.sendError(n2, i2, a2), this.logger.error(a2);
      } catch (a2) {
        await this.sendError(n2, i2, a2), this.logger.error(a2);
      }
    }), p$1(this, "onUnknownRpcMethodResponse", (i2) => {
      this.registeredMethods.includes(i2) || this.logger.error(Nt$1("WC_METHOD_UNSUPPORTED", i2));
    }), p$1(this, "isValidPair", (i2, s) => {
      var n2;
      if (!ma(i2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `pair() params: ${i2}`);
        throw s.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      if (!fa(i2.uri)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `pair() uri: ${i2.uri}`);
        throw s.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      const o2 = Gc(i2 == null ? void 0 : i2.uri);
      if (!((n2 = o2 == null ? void 0 : o2.relay) != null && n2.protocol)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw s.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      if (!(o2 != null && o2.symKey)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw s.setError(Y$2.malformed_pairing_uri), new Error(a2);
      }
      if (o2 != null && o2.expiryTimestamp && cjs.toMiliseconds(o2 == null ? void 0 : o2.expiryTimestamp) < Date.now()) {
        s.setError(Y$2.pairing_expired);
        const { message: a2 } = ht$2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a2);
      }
    }), p$1(this, "isValidPing", async (i2) => {
      if (!ma(i2)) {
        const { message: n2 } = ht$2("MISSING_OR_INVALID", `ping() params: ${i2}`);
        throw new Error(n2);
      }
      const { topic: s } = i2;
      await this.isValidPairingTopic(s);
    }), p$1(this, "isValidDisconnect", async (i2) => {
      if (!ma(i2)) {
        const { message: n2 } = ht$2("MISSING_OR_INVALID", `disconnect() params: ${i2}`);
        throw new Error(n2);
      }
      const { topic: s } = i2;
      await this.isValidPairingTopic(s);
    }), p$1(this, "isValidPairingTopic", async (i2) => {
      if (!nt$2(i2, false)) {
        const { message: s } = ht$2("MISSING_OR_INVALID", `pairing topic should be a string: ${i2}`);
        throw new Error(s);
      }
      if (!this.pairings.keys.includes(i2)) {
        const { message: s } = ht$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i2}`);
        throw new Error(s);
      }
      if (vi$1(this.pairings.get(i2).expiry)) {
        await this.deletePairing(i2);
        const { message: s } = ht$2("EXPIRED", `pairing topic: ${i2}`);
        throw new Error(s);
      }
    }), this.core = e, this.logger = E$4(t, this.name), this.pairings = new zi(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y$3(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(C$2.message, async (e) => {
      const { topic: t, message: i2, transportType: s } = e;
      if (this.pairings.keys.includes(t) && s !== Q$2.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i2))) try {
        const n2 = await this.core.crypto.decode(t, i2);
        isJsonRpcRequest(n2) ? (this.core.history.set(t, n2), await this.onRelayEventRequest({ topic: t, payload: n2 })) : isJsonRpcResponse(n2) && (await this.core.history.resolve(n2), await this.onRelayEventResponse({ topic: t, payload: n2 }), this.core.history.delete(t, n2.id)), await this.core.relayer.messages.ack(t, i2);
      } catch (n2) {
        this.logger.error(n2);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(M$2.expired, async (e) => {
      const { topic: t } = bi$1(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(re$1.expire, { topic: t }));
    });
  }
}
var ko = Object.defineProperty, jo = (r2, e, t) => e in r2 ? ko(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, O$1 = (r2, e, t) => jo(r2, typeof e != "symbol" ? e + "" : e, t);
class ki extends I$2 {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, O$1(this, "records", /* @__PURE__ */ new Map()), O$1(this, "events", new events.EventEmitter()), O$1(this, "name", Bt$1), O$1(this, "version", Vt$1), O$1(this, "cached", []), O$1(this, "initialized", false), O$1(this, "storagePrefix", B$2), O$1(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i2) => this.records.set(i2.id, i2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), O$1(this, "set", (i2, s, n2) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i2, request: s, chainId: n2 }), this.records.has(s.id)) return;
      const o2 = { id: s.id, topic: i2, request: { method: s.method, params: s.params || null }, chainId: n2, expiry: Ei$1(cjs.THIRTY_DAYS) };
      this.records.set(o2.id, o2), this.persist(), this.events.emit(F$2.created, o2);
    }), O$1(this, "resolve", async (i2) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i2 }), !this.records.has(i2.id)) return;
      const s = await this.getRecord(i2.id);
      typeof s.response > "u" && (s.response = isJsonRpcError(i2) ? { error: i2.error } : { result: i2.result }, this.records.set(s.id, s), this.persist(), this.events.emit(F$2.updated, s));
    }), O$1(this, "get", async (i2, s) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i2, id: s }), await this.getRecord(s))), O$1(this, "delete", (i2, s) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s }), this.values.forEach((n2) => {
        if (n2.topic === i2) {
          if (typeof s < "u" && n2.id !== s) return;
          this.records.delete(n2.id), this.events.emit(F$2.deleted, n2);
        }
      }), this.persist();
    }), O$1(this, "exists", async (i2, s) => (this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i2 : false)), O$1(this, "on", (i2, s) => {
      this.events.on(i2, s);
    }), O$1(this, "once", (i2, s) => {
      this.events.once(i2, s);
    }), O$1(this, "off", (i2, s) => {
      this.events.off(i2, s);
    }), O$1(this, "removeListener", (i2, s) => {
      this.events.removeListener(i2, s);
    }), this.logger = E$4(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u") return;
      const i2 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(i2);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i2);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(F$2.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(F$2.created, (e) => {
      const t = F$2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(F$2.updated, (e) => {
      const t = F$2.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(F$2.deleted, (e) => {
      const t = F$2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.core.heartbeat.on(r.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = false;
      this.records.forEach((t) => {
        cjs.toMiliseconds(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(F$2.deleted, t, false), e = true);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Uo = Object.defineProperty, Fo = (r2, e, t) => e in r2 ? Uo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, A$2 = (r2, e, t) => Fo(r2, typeof e != "symbol" ? e + "" : e, t);
class ji extends S$3 {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, A$2(this, "expirations", /* @__PURE__ */ new Map()), A$2(this, "events", new events.EventEmitter()), A$2(this, "name", qt$1), A$2(this, "version", Gt$1), A$2(this, "cached", []), A$2(this, "initialized", false), A$2(this, "storagePrefix", B$2), A$2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i2) => this.expirations.set(i2.target, i2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), A$2(this, "has", (i2) => {
      try {
        const s = this.formatTarget(i2);
        return typeof this.getExpiration(s) < "u";
      } catch {
        return false;
      }
    }), A$2(this, "set", (i2, s) => {
      this.isInitialized();
      const n2 = this.formatTarget(i2), o2 = { target: n2, expiry: s };
      this.expirations.set(n2, o2), this.checkExpiry(n2, o2), this.events.emit(M$2.created, { target: n2, expiration: o2 });
    }), A$2(this, "get", (i2) => {
      this.isInitialized();
      const s = this.formatTarget(i2);
      return this.getExpiration(s);
    }), A$2(this, "del", (i2) => {
      if (this.isInitialized(), this.has(i2)) {
        const s = this.formatTarget(i2), n2 = this.getExpiration(s);
        this.expirations.delete(s), this.events.emit(M$2.deleted, { target: s, expiration: n2 });
      }
    }), A$2(this, "on", (i2, s) => {
      this.events.on(i2, s);
    }), A$2(this, "once", (i2, s) => {
      this.events.once(i2, s);
    }), A$2(this, "off", (i2, s) => {
      this.events.off(i2, s);
    }), A$2(this, "removeListener", (i2, s) => {
      this.events.removeListener(i2, s);
    }), this.logger = E$4(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return mi$1(e);
    if (typeof e == "number") return wi$1(e);
    const { message: t } = ht$2("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(M$2.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: t } = ht$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: i2 } = ht$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(i2), new Error(i2);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: i2 } = t;
    cjs.toMiliseconds(i2) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(M$2.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r.pulse, () => this.checkExpirations()), this.events.on(M$2.created, (e) => {
      const t = M$2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(M$2.expired, (e) => {
      const t = M$2.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(M$2.deleted, (e) => {
      const t = M$2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Mo = Object.defineProperty, Ko = (r2, e, t) => e in r2 ? Mo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, w$1 = (r2, e, t) => Ko(r2, typeof e != "symbol" ? e + "" : e, t);
class Ui extends M$3 {
  constructor(e, t, i2) {
    super(e, t, i2), this.core = e, this.logger = t, this.store = i2, w$1(this, "name", Wt$1), w$1(this, "abortController"), w$1(this, "isDevEnv"), w$1(this, "verifyUrlV3", Yt$1), w$1(this, "storagePrefix", B$2), w$1(this, "version", Le$2), w$1(this, "publicKey"), w$1(this, "fetchPromise"), w$1(this, "init", async () => {
      var s;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && cjs.toMiliseconds((s = this.publicKey) == null ? void 0 : s.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), w$1(this, "register", async (s) => {
      if (!Tt$2() || this.isDevEnv) return;
      const n2 = window.location.origin, { id: o2, decryptedId: a2 } = s, c2 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n2}&id=${o2}&decryptedId=${a2}`;
      try {
        const h3 = getDocument_1(), l2 = this.startAbortTimer(cjs.ONE_SECOND * 5), d4 = await new Promise((g2, _2) => {
          const u2 = () => {
            window.removeEventListener("message", x2), h3.body.removeChild(b2), _2("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", u2);
          const b2 = h3.createElement("iframe");
          b2.src = c2, b2.style.display = "none", b2.addEventListener("error", u2, { signal: this.abortController.signal });
          const x2 = (I3) => {
            if (I3.data && typeof I3.data == "string") try {
              const D2 = JSON.parse(I3.data);
              if (D2.type === "verify_attestation") {
                if (sn$2(D2.attestation).payload.id !== o2) return;
                clearInterval(l2), h3.body.removeChild(b2), this.abortController.signal.removeEventListener("abort", u2), window.removeEventListener("message", x2), g2(D2.attestation === null ? "" : D2.attestation);
              }
            } catch (D2) {
              this.logger.warn(D2);
            }
          };
          h3.body.appendChild(b2), window.addEventListener("message", x2, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", d4), d4;
      } catch (h3) {
        this.logger.warn(h3);
      }
      return "";
    }), w$1(this, "resolve", async (s) => {
      if (this.isDevEnv) return "";
      const { attestationId: n2, hash: o2, encryptedId: a2 } = s;
      if (n2 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n2) {
        if (sn$2(n2).payload.id !== a2) return;
        const h3 = await this.isValidJwtAttestation(n2);
        if (h3) {
          if (!h3.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h3;
        }
      }
      if (!o2) return;
      const c2 = this.getVerifyUrl(s == null ? void 0 : s.verifyUrl);
      return this.fetchAttestation(o2, c2);
    }), w$1(this, "fetchAttestation", async (s, n2) => {
      this.logger.debug(`resolving attestation: ${s} from url: ${n2}`);
      const o2 = this.startAbortTimer(cjs.ONE_SECOND * 5), a2 = await fetch(`${n2}/attestation/${s}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o2), a2.status === 200 ? await a2.json() : void 0;
    }), w$1(this, "getVerifyUrl", (s) => {
      let n2 = s || ue$1;
      return Jt$1.includes(n2) || (this.logger.info(`verify url: ${n2}, not included in trusted list, assigning default: ${ue$1}`), n2 = ue$1), n2;
    }), w$1(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const s = this.startAbortTimer(cjs.FIVE_SECONDS), n2 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(s), await n2.json();
      } catch (s) {
        this.logger.warn(s);
      }
    }), w$1(this, "persistPublicKey", async (s) => {
      this.logger.debug("persisting public key to local storage", s), await this.store.setItem(this.storeKey, s), this.publicKey = s;
    }), w$1(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), w$1(this, "isValidJwtAttestation", async (s) => {
      const n2 = await this.getPublicKey();
      try {
        if (n2) return this.validateAttestation(s, n2);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
      const o2 = await this.fetchAndPersistPublicKey();
      try {
        if (o2) return this.validateAttestation(s, o2);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
    }), w$1(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), w$1(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n2) => {
        const o2 = await this.fetchPublicKey();
        o2 && (await this.persistPublicKey(o2), n2(o2));
      });
      const s = await this.fetchPromise;
      return this.fetchPromise = void 0, s;
    }), w$1(this, "validateAttestation", (s, n2) => {
      const o2 = zc(s, n2.publicKey), a2 = { hasExpired: cjs.toMiliseconds(o2.exp) < Date.now(), payload: o2 };
      if (a2.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a2.payload.origin, isScam: a2.payload.isScam, isVerified: a2.payload.isVerified };
    }), this.logger = E$4(t, this.name), this.abortController = new AbortController(), this.isDevEnv = Ii$1(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y$3(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), cjs.toMiliseconds(e));
  }
}
var Bo = Object.defineProperty, Vo = (r2, e, t) => e in r2 ? Bo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, Fi = (r2, e, t) => Vo(r2, typeof e != "symbol" ? e + "" : e, t);
class Mi extends O$2 {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, Fi(this, "context", Xt$1), Fi(this, "registerDeviceToken", async (i2) => {
      const { clientId: s, token: n2, notificationType: o2, enableEncrypted: a2 = false } = i2, c2 = `${Zt$1}/${this.projectId}/clients`;
      await fetch(c2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: s, type: o2, token: n2, always_raw: a2 }) });
    }), this.logger = E$4(t, this.context);
  }
}
var qo = Object.defineProperty, Ki = Object.getOwnPropertySymbols, Go = Object.prototype.hasOwnProperty, Wo = Object.prototype.propertyIsEnumerable, Ze$1 = (r2, e, t) => e in r2 ? qo(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, be$1 = (r2, e) => {
  for (var t in e || (e = {})) Go.call(e, t) && Ze$1(r2, t, e[t]);
  if (Ki) for (var t of Ki(e)) Wo.call(e, t) && Ze$1(r2, t, e[t]);
  return r2;
}, E$3 = (r2, e, t) => Ze$1(r2, typeof e != "symbol" ? e + "" : e, t);
class Bi extends R$2 {
  constructor(e, t, i2 = true) {
    super(e, t, i2), this.core = e, this.logger = t, E$3(this, "context", ei), E$3(this, "storagePrefix", B$2), E$3(this, "storageVersion", Qt$1), E$3(this, "events", /* @__PURE__ */ new Map()), E$3(this, "shouldPersist", false), E$3(this, "init", async () => {
      if (!Ii$1()) try {
        const s = { eventId: Bi$1(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Mn$1(this.core.relayer.protocol, this.core.relayer.version, _e$2) } } };
        await this.sendEvent([s]);
      } catch (s) {
        this.logger.warn(s);
      }
    }), E$3(this, "createEvent", (s) => {
      const { event: n2 = "ERROR", type: o2 = "", properties: { topic: a2, trace: c2 } } = s, h3 = Bi$1(), l2 = this.core.projectId || "", d4 = Date.now(), g2 = be$1({ eventId: h3, timestamp: d4, props: { event: n2, type: o2, properties: { topic: a2, trace: c2 } }, bundleId: l2, domain: this.getAppDomain() }, this.setMethods(h3));
      return this.telemetryEnabled && (this.events.set(h3, g2), this.shouldPersist = true), g2;
    }), E$3(this, "getEvent", (s) => {
      const { eventId: n2, topic: o2 } = s;
      if (n2) return this.events.get(n2);
      const a2 = Array.from(this.events.values()).find((c2) => c2.props.properties.topic === o2);
      if (a2) return be$1(be$1({}, a2), this.setMethods(a2.eventId));
    }), E$3(this, "deleteEvent", (s) => {
      const { eventId: n2 } = s;
      this.events.delete(n2), this.shouldPersist = true;
    }), E$3(this, "setEventListeners", () => {
      this.core.heartbeat.on(r.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((s) => {
          cjs.fromMiliseconds(Date.now()) - cjs.fromMiliseconds(s.timestamp) > ti && (this.events.delete(s.eventId), this.shouldPersist = true);
        });
      });
    }), E$3(this, "setMethods", (s) => ({ addTrace: (n2) => this.addTrace(s, n2), setError: (n2) => this.setError(s, n2) })), E$3(this, "addTrace", (s, n2) => {
      const o2 = this.events.get(s);
      o2 && (o2.props.properties.trace.push(n2), this.events.set(s, o2), this.shouldPersist = true);
    }), E$3(this, "setError", (s, n2) => {
      const o2 = this.events.get(s);
      o2 && (o2.props.type = n2, o2.timestamp = Date.now(), this.events.set(s, o2), this.shouldPersist = true);
    }), E$3(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), E$3(this, "restore", async () => {
      try {
        const s = await this.core.storage.getItem(this.storageKey) || [];
        if (!s.length) return;
        s.forEach((n2) => {
          this.events.set(n2.eventId, be$1(be$1({}, n2), this.setMethods(n2.eventId)));
        });
      } catch (s) {
        this.logger.warn(s);
      }
    }), E$3(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const s = [];
      for (const [n2, o2] of this.events) o2.props.type && s.push(o2);
      if (s.length !== 0) try {
        if ((await this.sendEvent(s)).ok) for (const n2 of s) this.events.delete(n2.eventId), this.shouldPersist = true;
      } catch (n2) {
        this.logger.warn(n2);
      }
    }), E$3(this, "sendEvent", async (s) => {
      const n2 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${ii}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${_e$2}${n2}`, { method: "POST", body: JSON.stringify(s) });
    }), E$3(this, "getAppDomain", () => Pn$1().url), this.logger = E$4(t, this.context), this.telemetryEnabled = i2, i2 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Ho = Object.defineProperty, Vi = Object.getOwnPropertySymbols, Yo = Object.prototype.hasOwnProperty, Jo = Object.prototype.propertyIsEnumerable, Qe$1 = (r2, e, t) => e in r2 ? Ho(r2, e, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e] = t, qi = (r2, e) => {
  for (var t in e || (e = {})) Yo.call(e, t) && Qe$1(r2, t, e[t]);
  if (Vi) for (var t of Vi(e)) Jo.call(e, t) && Qe$1(r2, t, e[t]);
  return r2;
}, v$2 = (r2, e, t) => Qe$1(r2, typeof e != "symbol" ? e + "" : e, t);
let Te$1 = class Te extends h$1 {
  constructor(e) {
    var t;
    super(e), v$2(this, "protocol", ze$1), v$2(this, "version", Le$2), v$2(this, "name", he$1), v$2(this, "relayUrl"), v$2(this, "projectId"), v$2(this, "customStoragePrefix"), v$2(this, "events", new events.EventEmitter()), v$2(this, "logger"), v$2(this, "heartbeat"), v$2(this, "relayer"), v$2(this, "crypto"), v$2(this, "storage"), v$2(this, "history"), v$2(this, "expirer"), v$2(this, "pairing"), v$2(this, "verify"), v$2(this, "echoClient"), v$2(this, "linkModeSupportedApps"), v$2(this, "eventClient"), v$2(this, "initialized", false), v$2(this, "logChunkController"), v$2(this, "on", (a2, c2) => this.events.on(a2, c2)), v$2(this, "once", (a2, c2) => this.events.once(a2, c2)), v$2(this, "off", (a2, c2) => this.events.off(a2, c2)), v$2(this, "removeListener", (a2, c2) => this.events.removeListener(a2, c2)), v$2(this, "dispatchEnvelope", ({ topic: a2, message: c2, sessionExists: h3 }) => {
      if (!a2 || !c2) return;
      const l2 = { topic: a2, message: c2, publishedAt: Date.now(), transportType: Q$2.link_mode };
      this.relayer.onLinkMessageEvent(l2, { sessionExists: h3 });
    });
    const i2 = this.getGlobalCore(e == null ? void 0 : e.customStoragePrefix);
    if (i2) try {
      return this.customStoragePrefix = i2.customStoragePrefix, this.logger = i2.logger, this.heartbeat = i2.heartbeat, this.crypto = i2.crypto, this.history = i2.history, this.expirer = i2.expirer, this.storage = i2.storage, this.relayer = i2.relayer, this.pairing = i2.pairing, this.verify = i2.verify, this.echoClient = i2.echoClient, this.linkModeSupportedApps = i2.linkModeSupportedApps, this.eventClient = i2.eventClient, this.initialized = i2.initialized, this.logChunkController = i2.logChunkController, i2;
    } catch (a2) {
      console.warn("Failed to copy global core", a2);
    }
    this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || Ue$2, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const s = k$4({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : Et$1.logger, name: he$1 }), { logger: n2, chunkLoggerController: o2 } = A$3({ opts: s, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = o2, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a2, c2;
      (a2 = this.logChunkController) != null && a2.downloadLogsBlobInBrowser && ((c2 = this.logChunkController) == null || c2.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E$4(n2, this.name), this.heartbeat = new i$2(), this.crypto = new vi(this, this.logger, e == null ? void 0 : e.keychain), this.history = new ki(this, this.logger), this.expirer = new ji(this, this.logger), this.storage = e != null && e.storage ? e.storage : new h$2(qi(qi({}, It$1), e == null ? void 0 : e.storageOptions)), this.relayer = new Si({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Li(this, this.logger), this.verify = new Ui(this, this.logger, this.storage), this.echoClient = new Mi(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Bi(this, this.logger, e == null ? void 0 : e.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e) {
    const t = new Te(e);
    await t.initialize();
    const i2 = await t.crypto.getClientId();
    return await t.storage.setItem(jt$1, i2), t;
  }
  get context() {
    return y$3(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(Fe$1, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Fe$1) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const t = `_walletConnectCore_${e}`, i2 = `${t}_count`;
      return globalThis[i2] = (globalThis[i2] || 0) + 1, globalThis[i2] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[i2]} times.`), globalThis[t];
    } catch (t) {
      console.warn("Failed to get global WalletConnect core", t);
      return;
    }
  }
  setGlobalCore(e) {
    var t;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const i2 = `_walletConnectCore_${((t = e.opts) == null ? void 0 : t.customStoragePrefix) || ""}`;
      globalThis[i2] = e;
    } catch (i2) {
      console.warn("Failed to set global WalletConnect core", i2);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process$1 < "u" && process$1.env.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return true;
    }
  }
};
const Xo = Te$1;
const De$1 = "wc", Le$1 = 2, ke$1 = "client", we$1 = `${De$1}@${Le$1}:${ke$1}:`, me$1 = { name: ke$1, logger: "error" }, Me$1 = "WALLETCONNECT_DEEPLINK_CHOICE", pt$1 = "proposal", $e$1 = "Proposal expired", ht$1 = "session", J$1 = cjs.SEVEN_DAYS, dt$1 = "engine", N$1 = { wc_sessionPropose: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: cjs.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: cjs.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1119 } } }, _e$1 = { min: cjs.FIVE_MINUTES, max: cjs.SEVEN_DAYS }, $$2 = { idle: "IDLE", active: "ACTIVE" }, Ke$1 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } }, ut$1 = "request", gt$1 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], yt$1 = "wc", wt$1 = "auth", mt$1 = "authKeys", _t$1 = "pairingTopics", Et = "requests", ae$1 = `${yt$1}@${1.5}:${wt$1}:`, ce$1 = `${ae$1}:PUB_KEY`;
var vs = Object.defineProperty, Is = Object.defineProperties, Ts = Object.getOwnPropertyDescriptors, ft$1 = Object.getOwnPropertySymbols, qs2 = Object.prototype.hasOwnProperty, Ps = Object.prototype.propertyIsEnumerable, Ue$1 = (S3, n2, e) => n2 in S3 ? vs(S3, n2, { enumerable: true, configurable: true, writable: true, value: e }) : S3[n2] = e, v$1 = (S3, n2) => {
  for (var e in n2 || (n2 = {})) qs2.call(n2, e) && Ue$1(S3, e, n2[e]);
  if (ft$1) for (var e of ft$1(n2)) Ps.call(n2, e) && Ue$1(S3, e, n2[e]);
  return S3;
}, b$2 = (S3, n2) => Is(S3, Ts(n2)), c = (S3, n2, e) => Ue$1(S3, typeof n2 != "symbol" ? n2 + "" : n2, e);
class Ns extends V$3 {
  constructor(n2) {
    super(n2), c(this, "name", dt$1), c(this, "events", new Nt$2()), c(this, "initialized", false), c(this, "requestQueue", { state: $$2.idle, queue: [] }), c(this, "sessionRequestQueue", { state: $$2.idle, queue: [] }), c(this, "requestQueueDelay", cjs.ONE_SECOND), c(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c(this, "recentlyDeletedLimit", 200), c(this, "relayMessageCache", []), c(this, "pendingSessions", /* @__PURE__ */ new Map()), c(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N$1) }), this.initialized = true, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, cjs.toMiliseconds(this.requestQueueDelay)));
    }), c(this, "connect", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t = b$2(v$1({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(t), t.optionalNamespaces = aa(t.requiredNamespaces, t.optionalNamespaces), t.requiredNamespaces = {};
      const { pairingTopic: s, requiredNamespaces: i2, optionalNamespaces: r2, sessionProperties: o2, scopedProperties: a2, relays: l2 } = t;
      let p2 = s, h3, u2 = false;
      try {
        if (p2) {
          const T2 = this.client.core.pairing.pairings.get(p2);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), u2 = T2.active;
        }
      } catch (T2) {
        throw this.client.logger.error(`connect() -> pairing.get(${p2}) failed`), T2;
      }
      if (!p2 || !u2) {
        const { topic: T2, uri: K2 } = await this.client.core.pairing.create();
        p2 = T2, h3 = K2;
      }
      if (!p2) {
        const { message: T2 } = ht$2("NO_MATCHING_KEY", `connect() pairing topic: ${p2}`);
        throw new Error(T2);
      }
      const d4 = await this.client.core.crypto.generateKeyPair(), w2 = N$1.wc_sessionPropose.req.ttl || cjs.FIVE_MINUTES, m3 = Ei$1(w2), f3 = b$2(v$1(v$1({ requiredNamespaces: i2, optionalNamespaces: r2, relays: l2 ?? [{ protocol: xt$1 }], proposer: { publicKey: d4, metadata: this.client.metadata }, expiryTimestamp: m3, pairingTopic: p2 }, o2 && { sessionProperties: o2 }), a2 && { scopedProperties: a2 }), { id: payloadId() }), _2 = xi$1("session_connect", f3.id), { reject: g2, resolve: A2, done: D2 } = gi$1(w2, $e$1), I3 = ({ id: T2 }) => {
        T2 === f3.id && (this.client.events.off("proposal_expire", I3), this.pendingSessions.delete(f3.id), this.events.emit(_2, { error: { message: $e$1, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", I3), this.events.once(_2, ({ error: T2, session: K2 }) => {
        this.client.events.off("proposal_expire", I3), T2 ? g2(T2) : K2 && A2(K2);
      }), await this.sendRequest({ topic: p2, method: "wc_sessionPropose", params: f3, throwOnFailedPublish: true, clientRpcId: f3.id }), await this.setProposal(f3.id, f3), { uri: h3, approval: D2 };
    }), c(this, "pair", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }), c(this, "approve", async (e) => {
      var t, s, i2;
      const r2 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e == null ? void 0 : e.id) == null ? void 0 : t.toString(), trace: [er.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (q2) {
        throw r2.setError(tr.no_internet_connection), q2;
      }
      try {
        await this.isValidProposalId(e == null ? void 0 : e.id);
      } catch (q2) {
        throw this.client.logger.error(`approve() -> proposal.get(${e == null ? void 0 : e.id}) failed`), r2.setError(tr.proposal_not_found), q2;
      }
      try {
        await this.isValidApprove(e);
      } catch (q2) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r2.setError(tr.session_approve_namespace_validation_failure), q2;
      }
      const { id: o2, relayProtocol: a2, namespaces: l2, sessionProperties: p2, scopedProperties: h3, sessionConfig: u2 } = e, d4 = this.client.proposal.get(o2);
      this.client.core.eventClient.deleteEvent({ eventId: r2.eventId });
      const { pairingTopic: w2, proposer: m3, requiredNamespaces: f3, optionalNamespaces: _2 } = d4;
      let g2 = (s = this.client.core.eventClient) == null ? void 0 : s.getEvent({ topic: w2 });
      g2 || (g2 = (i2 = this.client.core.eventClient) == null ? void 0 : i2.createEvent({ type: er.session_approve_started, properties: { topic: w2, trace: [er.session_approve_started, er.session_namespaces_validation_success] } }));
      const A2 = await this.client.core.crypto.generateKeyPair(), D2 = m3.publicKey, I3 = await this.client.core.crypto.generateSharedKey(A2, D2), T2 = v$1(v$1(v$1({ relay: { protocol: a2 ?? "irn" }, namespaces: l2, controller: { publicKey: A2, metadata: this.client.metadata }, expiry: Ei$1(J$1) }, p2 && { sessionProperties: p2 }), h3 && { scopedProperties: h3 }), u2 && { sessionConfig: u2 }), K2 = Q$2.relay;
      g2.addTrace(er.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(I3, { transportType: K2 });
      } catch (q2) {
        throw g2.setError(tr.subscribe_session_topic_failure), q2;
      }
      g2.addTrace(er.subscribe_session_topic_success);
      const fe2 = b$2(v$1({}, T2), { topic: I3, requiredNamespaces: f3, optionalNamespaces: _2, pairingTopic: w2, acknowledged: false, self: T2.controller, peer: { publicKey: m3.publicKey, metadata: m3.metadata }, controller: A2, transportType: Q$2.relay });
      await this.client.session.set(I3, fe2), g2.addTrace(er.store_session);
      try {
        g2.addTrace(er.publishing_session_settle), await this.sendRequest({ topic: I3, method: "wc_sessionSettle", params: T2, throwOnFailedPublish: true }).catch((q2) => {
          throw g2 == null ? void 0 : g2.setError(tr.session_settle_publish_failure), q2;
        }), g2.addTrace(er.session_settle_publish_success), g2.addTrace(er.publishing_session_approve), await this.sendResult({ id: o2, topic: w2, result: { relay: { protocol: a2 ?? "irn" }, responderPublicKey: A2 }, throwOnFailedPublish: true }).catch((q2) => {
          throw g2 == null ? void 0 : g2.setError(tr.session_approve_publish_failure), q2;
        }), g2.addTrace(er.session_approve_publish_success);
      } catch (q2) {
        throw this.client.logger.error(q2), this.client.session.delete(I3, Nt$1("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(I3), q2;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: g2.eventId }), await this.client.core.pairing.updateMetadata({ topic: w2, metadata: m3.metadata }), await this.client.proposal.delete(o2, Nt$1("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: w2 }), await this.setExpiry(I3, Ei$1(J$1)), { topic: I3, acknowledged: () => Promise.resolve(this.client.session.get(I3)) };
    }), c(this, "reject", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e);
      } catch (r2) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r2;
      }
      const { id: t, reason: s } = e;
      let i2;
      try {
        i2 = this.client.proposal.get(t).pairingTopic;
      } catch (r2) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r2;
      }
      i2 && (await this.sendError({ id: t, topic: i2, error: s, rpcOpts: N$1.wc_sessionPropose.reject }), await this.client.proposal.delete(t, Nt$1("USER_DISCONNECTED")));
    }), c(this, "update", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e);
      } catch (h3) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), h3;
      }
      const { topic: t, namespaces: s } = e, { done: i2, resolve: r2, reject: o2 } = gi$1(), a2 = payloadId(), l2 = getBigIntRpcId().toString(), p2 = this.client.session.get(t).namespaces;
      return this.events.once(xi$1("session_update", a2), ({ error: h3 }) => {
        h3 ? o2(h3) : r2();
      }), await this.client.session.update(t, { namespaces: s }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s }, throwOnFailedPublish: true, clientRpcId: a2, relayRpcId: l2 }).catch((h3) => {
        this.client.logger.error(h3), this.client.session.update(t, { namespaces: p2 }), o2(h3);
      }), { acknowledged: i2 };
    }), c(this, "extend", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e);
      } catch (a2) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a2;
      }
      const { topic: t } = e, s = payloadId(), { done: i2, resolve: r2, reject: o2 } = gi$1();
      return this.events.once(xi$1("session_extend", s), ({ error: a2 }) => {
        a2 ? o2(a2) : r2();
      }), await this.setExpiry(t, Ei$1(J$1)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s, throwOnFailedPublish: true }).catch((a2) => {
        o2(a2);
      }), { acknowledged: i2 };
    }), c(this, "request", async (e) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e);
      } catch (_2) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), _2;
      }
      const { chainId: t, request: s, topic: i2, expiry: r2 = N$1.wc_sessionRequest.req.ttl } = e, o2 = this.client.session.get(i2);
      (o2 == null ? void 0 : o2.transportType) === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const a2 = payloadId(), l2 = getBigIntRpcId().toString(), { done: p2, resolve: h3, reject: u2 } = gi$1(r2, "Request expired. Please try again.");
      this.events.once(xi$1("session_request", a2), ({ error: _2, result: g2 }) => {
        _2 ? u2(_2) : h3(g2);
      });
      const d4 = "wc_sessionRequest", w2 = this.getAppLinkIfEnabled(o2.peer.metadata, o2.transportType);
      if (w2) return await this.sendRequest({ clientRpcId: a2, relayRpcId: l2, topic: i2, method: d4, params: { request: b$2(v$1({}, s), { expiryTimestamp: Ei$1(r2) }), chainId: t }, expiry: r2, throwOnFailedPublish: true, appLink: w2 }).catch((_2) => u2(_2)), this.client.events.emit("session_request_sent", { topic: i2, request: s, chainId: t, id: a2 }), await p2();
      const m3 = { request: b$2(v$1({}, s), { expiryTimestamp: Ei$1(r2) }), chainId: t }, f3 = this.shouldSetTVF(d4, m3);
      return await Promise.all([new Promise(async (_2) => {
        await this.sendRequest(v$1({ clientRpcId: a2, relayRpcId: l2, topic: i2, method: d4, params: m3, expiry: r2, throwOnFailedPublish: true }, f3 && { tvf: this.getTVFParams(a2, m3) })).catch((g2) => u2(g2)), this.client.events.emit("session_request_sent", { topic: i2, request: s, chainId: t, id: a2 }), _2();
      }), new Promise(async (_2) => {
        var g2;
        if (!((g2 = o2.sessionConfig) != null && g2.disableDeepLink)) {
          const A2 = await Oi$1(this.client.core.storage, Me$1);
          await Si$1({ id: a2, topic: i2, wcDeepLink: A2 });
        }
        _2();
      }), p2()]).then((_2) => _2[2]);
    }), c(this, "respond", async (e) => {
      this.isInitialized(), await this.isValidRespond(e);
      const { topic: t, response: s } = e, { id: i2 } = s, r2 = this.client.session.get(t);
      r2.transportType === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const o2 = this.getAppLinkIfEnabled(r2.peer.metadata, r2.transportType);
      isJsonRpcResult(s) ? await this.sendResult({ id: i2, topic: t, result: s.result, throwOnFailedPublish: true, appLink: o2 }) : isJsonRpcError(s) && await this.sendError({ id: i2, topic: t, error: s.error, appLink: o2 }), this.cleanupAfterResponse(e);
    }), c(this, "ping", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e);
      } catch (s) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s;
      }
      const { topic: t } = e;
      if (this.client.session.keys.includes(t)) {
        const s = payloadId(), i2 = getBigIntRpcId().toString(), { done: r2, resolve: o2, reject: a2 } = gi$1();
        this.events.once(xi$1("session_ping", s), ({ error: l2 }) => {
          l2 ? a2(l2) : o2();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s, relayRpcId: i2 }), r2()]);
      } else this.client.core.pairing.pairings.keys.includes(t) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t }));
    }), c(this, "emit", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e);
      const { topic: t, event: s, chainId: i2 } = e, r2 = getBigIntRpcId().toString(), o2 = payloadId();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s, chainId: i2 }, throwOnFailedPublish: true, relayRpcId: r2, clientRpcId: o2 });
    }), c(this, "disconnect", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e);
      const { topic: t } = e;
      if (this.client.session.keys.includes(t)) await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: Nt$1("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t)) await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s } = ht$2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s);
      }
    }), c(this, "find", (e) => (this.isInitialized(), this.client.session.getAll().filter((t) => ua(t, e)))), c(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c(this, "authenticate", async (e, t) => {
      var s;
      this.isInitialized(), this.isValidAuthenticate(e);
      const i2 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s = this.client.metadata.redirect) == null ? void 0 : s.linkMode), r2 = i2 ? Q$2.link_mode : Q$2.relay;
      r2 === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o2, statement: a2 = "", uri: l2, domain: p2, nonce: h3, type: u2, exp: d4, nbf: w2, methods: m3 = [], expiry: f3 } = e, _2 = [...e.resources || []], { topic: g2, uri: A2 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r2 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: g2, uri: A2 } });
      const D2 = await this.client.core.crypto.generateKeyPair(), I3 = Pc(D2);
      if (await Promise.all([this.client.auth.authKeys.set(ce$1, { responseTopic: I3, publicKey: D2 }), this.client.auth.pairingTopics.set(I3, { topic: I3, pairingTopic: g2 })]), await this.client.core.relayer.subscribe(I3, { transportType: r2 }), this.client.logger.info(`sending request to new pairing topic: ${g2}`), m3.length > 0) {
        const { namespace: x2 } = Ne$1(o2[0]);
        let L3 = fs(x2, "request", m3);
        pe$2(_2) && (L3 = ls(L3, _2.pop())), _2.push(L3);
      }
      const T2 = f3 && f3 > N$1.wc_sessionAuthenticate.req.ttl ? f3 : N$1.wc_sessionAuthenticate.req.ttl, K2 = { authPayload: { type: u2 ?? "caip122", chains: o2, statement: a2, aud: l2, domain: p2, version: "1", nonce: h3, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d4, nbf: w2, resources: _2 }, requester: { publicKey: D2, metadata: this.client.metadata }, expiryTimestamp: Ei$1(T2) }, fe2 = { eip155: { chains: o2, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m3])], events: ["chainChanged", "accountsChanged"] } }, q2 = { requiredNamespaces: {}, optionalNamespaces: fe2, relays: [{ protocol: "irn" }], pairingTopic: g2, proposer: { publicKey: D2, metadata: this.client.metadata }, expiryTimestamp: Ei$1(N$1.wc_sessionPropose.req.ttl), id: payloadId() }, { done: Rt2, resolve: je2, reject: Se2 } = gi$1(T2, "Request expired"), te2 = payloadId(), le2 = xi$1("session_connect", q2.id), Re2 = xi$1("session_request", te2), pe2 = async ({ error: x2, session: L3 }) => {
        this.events.off(Re2, ve2), x2 ? Se2(x2) : L3 && je2({ session: L3 });
      }, ve2 = async (x2) => {
        var L3, Fe2, Qe2;
        if (await this.deletePendingAuthRequest(te2, { message: "fulfilled", code: 0 }), x2.error) {
          const ie2 = Nt$1("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return x2.error.code === ie2.code ? void 0 : (this.events.off(le2, pe2), Se2(x2.error.message));
        }
        await this.deleteProposal(q2.id), this.events.off(le2, pe2);
        const { cacaos: He2, responder: Q2 } = x2.result, Te3 = [], ze2 = [];
        for (const ie2 of He2) {
          await is({ cacao: ie2, projectId: this.client.core.projectId }) || (this.client.logger.error(ie2, "Signature verification failed"), Se2(Nt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: qe2 } = ie2, Pe2 = pe$2(qe2.resources), Ye2 = [dr$1(qe2.iss)], vt2 = De$2(qe2.iss);
          if (Pe2) {
            const Ne2 = ds(Pe2), It2 = hs(Pe2);
            Te3.push(...Ne2), Ye2.push(...It2);
          }
          for (const Ne2 of Ye2) ze2.push(`${Ne2}:${vt2}`);
        }
        const se2 = await this.client.core.crypto.generateSharedKey(D2, Q2.publicKey);
        let he2;
        Te3.length > 0 && (he2 = { topic: se2, acknowledged: true, self: { publicKey: D2, metadata: this.client.metadata }, peer: Q2, controller: Q2.publicKey, expiry: Ei$1(J$1), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: g2, namespaces: ca([...new Set(Te3)], [...new Set(ze2)]), transportType: r2 }, await this.client.core.relayer.subscribe(se2, { transportType: r2 }), await this.client.session.set(se2, he2), g2 && await this.client.core.pairing.updateMetadata({ topic: g2, metadata: Q2.metadata }), he2 = this.client.session.get(se2)), (L3 = this.client.metadata.redirect) != null && L3.linkMode && (Fe2 = Q2.metadata.redirect) != null && Fe2.linkMode && (Qe2 = Q2.metadata.redirect) != null && Qe2.universal && t && (this.client.core.addLinkModeSupportedApp(Q2.metadata.redirect.universal), this.client.session.update(se2, { transportType: Q$2.link_mode })), je2({ auths: He2, session: he2 });
      };
      this.events.once(le2, pe2), this.events.once(Re2, ve2);
      let Ie2;
      try {
        if (i2) {
          const x2 = formatJsonRpcRequest("wc_sessionAuthenticate", K2, te2);
          this.client.core.history.set(g2, x2);
          const L3 = await this.client.core.crypto.encode("", x2, { type: re$2, encoding: xe$1 });
          Ie2 = Xc(t, g2, L3);
        } else await Promise.all([this.sendRequest({ topic: g2, method: "wc_sessionAuthenticate", params: K2, expiry: e.expiry, throwOnFailedPublish: true, clientRpcId: te2 }), this.sendRequest({ topic: g2, method: "wc_sessionPropose", params: q2, expiry: N$1.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: q2.id })]);
      } catch (x2) {
        throw this.events.off(le2, pe2), this.events.off(Re2, ve2), x2;
      }
      return await this.setProposal(q2.id, q2), await this.setAuthRequest(te2, { request: b$2(v$1({}, K2), { verifyContext: {} }), pairingTopic: g2, transportType: r2 }), { uri: Ie2 ?? A2, response: Rt2 };
    }), c(this, "approveSessionAuthenticate", async (e) => {
      const { id: t, auths: s } = e, i2 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [ir.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (f3) {
        throw i2.setError(sr.no_internet_connection), f3;
      }
      const r2 = this.getPendingAuthRequest(t);
      if (!r2) throw i2.setError(sr.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const o2 = r2.transportType || Q$2.relay;
      o2 === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const a2 = r2.requester.publicKey, l2 = await this.client.core.crypto.generateKeyPair(), p2 = Pc(a2), h3 = { type: Ft$2, receiverPublicKey: a2, senderPublicKey: l2 }, u2 = [], d4 = [];
      for (const f3 of s) {
        if (!await is({ cacao: f3, projectId: this.client.core.projectId })) {
          i2.setError(sr.invalid_cacao);
          const I3 = Nt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: p2, error: I3, encodeOpts: h3 }), new Error(I3.message);
        }
        i2.addTrace(ir.cacaos_verified);
        const { p: _2 } = f3, g2 = pe$2(_2.resources), A2 = [dr$1(_2.iss)], D2 = De$2(_2.iss);
        if (g2) {
          const I3 = ds(g2), T2 = hs(g2);
          u2.push(...I3), A2.push(...T2);
        }
        for (const I3 of A2) d4.push(`${I3}:${D2}`);
      }
      const w2 = await this.client.core.crypto.generateSharedKey(l2, a2);
      i2.addTrace(ir.create_authenticated_session_topic);
      let m3;
      if ((u2 == null ? void 0 : u2.length) > 0) {
        m3 = { topic: w2, acknowledged: true, self: { publicKey: l2, metadata: this.client.metadata }, peer: { publicKey: a2, metadata: r2.requester.metadata }, controller: a2, expiry: Ei$1(J$1), authentication: s, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r2.pairingTopic, namespaces: ca([...new Set(u2)], [...new Set(d4)]), transportType: o2 }, i2.addTrace(ir.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w2, { transportType: o2 });
        } catch (f3) {
          throw i2.setError(sr.subscribe_authenticated_session_topic_failure), f3;
        }
        i2.addTrace(ir.subscribe_authenticated_session_topic_success), await this.client.session.set(w2, m3), i2.addTrace(ir.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r2.pairingTopic, metadata: r2.requester.metadata });
      }
      i2.addTrace(ir.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: p2, id: t, result: { cacaos: s, responder: { publicKey: l2, metadata: this.client.metadata } }, encodeOpts: h3, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r2.requester.metadata, o2) });
      } catch (f3) {
        throw i2.setError(sr.authenticated_session_approve_publish_failure), f3;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r2.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i2.eventId }), { session: m3 };
    }), c(this, "rejectSessionAuthenticate", async (e) => {
      this.isInitialized();
      const { id: t, reason: s } = e, i2 = this.getPendingAuthRequest(t);
      if (!i2) throw new Error(`Could not find pending auth request with id ${t}`);
      i2.transportType === Q$2.relay && await this.confirmOnlineStateOrThrow();
      const r2 = i2.requester.publicKey, o2 = await this.client.core.crypto.generateKeyPair(), a2 = Pc(r2), l2 = { type: Ft$2, receiverPublicKey: r2, senderPublicKey: o2 };
      await this.sendError({ id: t, topic: a2, error: s, encodeOpts: l2, rpcOpts: N$1.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i2.requester.metadata, i2.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.client.proposal.delete(t, Nt$1("USER_DISCONNECTED"));
    }), c(this, "formatAuthMessage", (e) => {
      this.isInitialized();
      const { request: t, iss: s } = e;
      return hr$1(t, s);
    }), c(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const e = this.relayMessageCache.shift();
          e && await this.onRelayMessage(e);
        } catch (e) {
          this.client.logger.error(e);
        }
      }, 50);
    }), c(this, "cleanupDuplicatePairings", async (e) => {
      if (e.pairingTopic) try {
        const t = this.client.core.pairing.pairings.get(e.pairingTopic), s = this.client.core.pairing.pairings.getAll().filter((i2) => {
          var r2, o2;
          return ((r2 = i2.peerMetadata) == null ? void 0 : r2.url) && ((o2 = i2.peerMetadata) == null ? void 0 : o2.url) === e.peer.metadata.url && i2.topic && i2.topic !== t.topic;
        });
        if (s.length === 0) return;
        this.client.logger.info(`Cleaning up ${s.length} duplicate pairing(s)`), await Promise.all(s.map((i2) => this.client.core.pairing.disconnect({ topic: i2.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c(this, "deleteSession", async (e) => {
      var t;
      const { topic: s, expirerHasDeleted: i2 = false, emitEvent: r2 = true, id: o2 = 0 } = e, { self: a2 } = this.client.session.get(s);
      await this.client.core.relayer.unsubscribe(s), await this.client.session.delete(s, Nt$1("USER_DISCONNECTED")), this.addToRecentlyDeleted(s, "session"), this.client.core.crypto.keychain.has(a2.publicKey) && await this.client.core.crypto.deleteKeyPair(a2.publicKey), this.client.core.crypto.keychain.has(s) && await this.client.core.crypto.deleteSymKey(s), i2 || this.client.core.expirer.del(s), this.client.core.storage.removeItem(Me$1).catch((l2) => this.client.logger.warn(l2)), this.getPendingSessionRequests().forEach((l2) => {
        l2.topic === s && this.deletePendingSessionRequest(l2.id, Nt$1("USER_DISCONNECTED"));
      }), s === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = $$2.idle), r2 && this.client.events.emit("session_delete", { id: o2, topic: s });
    }), c(this, "deleteProposal", async (e, t) => {
      if (t) try {
        const s = this.client.proposal.get(e), i2 = this.client.core.eventClient.getEvent({ topic: s.pairingTopic });
        i2 == null ? void 0 : i2.setError(tr.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(e, Nt$1("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "proposal");
    }), c(this, "deletePendingSessionRequest", async (e, t, s = false) => {
      await Promise.all([this.client.pendingRequest.delete(e, t), s ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i2) => i2.id !== e), s && (this.sessionRequestQueue.state = $$2.idle, this.client.events.emit("session_request_expire", { id: e }));
    }), c(this, "deletePendingAuthRequest", async (e, t, s = false) => {
      await Promise.all([this.client.auth.requests.delete(e, t), s ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }), c(this, "setExpiry", async (e, t) => {
      this.client.session.keys.includes(e) && (this.client.core.expirer.set(e, t), await this.client.session.update(e, { expiry: t }));
    }), c(this, "setProposal", async (e, t) => {
      this.client.core.expirer.set(e, Ei$1(N$1.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e, t);
    }), c(this, "setAuthRequest", async (e, t) => {
      const { request: s, pairingTopic: i2, transportType: r2 = Q$2.relay } = t;
      this.client.core.expirer.set(e, s.expiryTimestamp), await this.client.auth.requests.set(e, { authPayload: s.authPayload, requester: s.requester, expiryTimestamp: s.expiryTimestamp, id: e, pairingTopic: i2, verifyContext: s.verifyContext, transportType: r2 });
    }), c(this, "setPendingSessionRequest", async (e) => {
      const { id: t, topic: s, params: i2, verifyContext: r2 } = e, o2 = i2.request.expiryTimestamp || Ei$1(N$1.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, o2), await this.client.pendingRequest.set(t, { id: t, topic: s, params: i2, verifyContext: r2 });
    }), c(this, "sendRequest", async (e) => {
      const { topic: t, method: s, params: i2, expiry: r2, relayRpcId: o2, clientRpcId: a2, throwOnFailedPublish: l2, appLink: p2, tvf: h3 } = e, u2 = formatJsonRpcRequest(s, i2, a2);
      let d4;
      const w2 = !!p2;
      try {
        const _2 = w2 ? xe$1 : qt$2;
        d4 = await this.client.core.crypto.encode(t, u2, { encoding: _2 });
      } catch (_2) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), _2;
      }
      let m3;
      if (gt$1.includes(s)) {
        const _2 = kc(JSON.stringify(u2)), g2 = kc(d4);
        m3 = await this.client.core.verify.register({ id: g2, decryptedId: _2 });
      }
      const f3 = N$1[s].req;
      if (f3.attestation = m3, r2 && (f3.ttl = r2), o2 && (f3.id = o2), this.client.core.history.set(t, u2), w2) {
        const _2 = Xc(p2, t, d4);
        await global.Linking.openURL(_2, this.client.name);
      } else {
        const _2 = N$1[s].req;
        r2 && (_2.ttl = r2), o2 && (_2.id = o2), _2.tvf = b$2(v$1({}, h3), { correlationId: u2.id }), l2 ? (_2.internal = b$2(v$1({}, _2.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, d4, _2)) : this.client.core.relayer.publish(t, d4, _2).catch((g2) => this.client.logger.error(g2));
      }
      return u2.id;
    }), c(this, "sendResult", async (e) => {
      const { id: t, topic: s, result: i2, throwOnFailedPublish: r2, encodeOpts: o2, appLink: a2 } = e, l2 = formatJsonRpcResult(t, i2);
      let p2;
      const h3 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const w2 = h3 ? xe$1 : qt$2;
        p2 = await this.client.core.crypto.encode(s, l2, b$2(v$1({}, o2 || {}), { encoding: w2 }));
      } catch (w2) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s} failed`), w2;
      }
      let u2, d4;
      try {
        u2 = await this.client.core.history.get(s, t);
        const w2 = u2.request;
        try {
          this.shouldSetTVF(w2.method, w2.params) && (d4 = this.getTVFParams(t, w2.params, i2));
        } catch (m3) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m3);
        }
      } catch (w2) {
        throw this.client.logger.error(`sendResult() -> history.get(${s}, ${t}) failed`), w2;
      }
      if (h3) {
        const w2 = Xc(a2, s, p2);
        await global.Linking.openURL(w2, this.client.name);
      } else {
        const w2 = u2.request.method, m3 = N$1[w2].res;
        m3.tvf = b$2(v$1({}, d4), { correlationId: t }), r2 ? (m3.internal = b$2(v$1({}, m3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s, p2, m3)) : this.client.core.relayer.publish(s, p2, m3).catch((f3) => this.client.logger.error(f3));
      }
      await this.client.core.history.resolve(l2);
    }), c(this, "sendError", async (e) => {
      const { id: t, topic: s, error: i2, encodeOpts: r2, rpcOpts: o2, appLink: a2 } = e, l2 = formatJsonRpcError(t, i2);
      let p2;
      const h3 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d4 = h3 ? xe$1 : qt$2;
        p2 = await this.client.core.crypto.encode(s, l2, b$2(v$1({}, r2 || {}), { encoding: d4 }));
      } catch (d4) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s} failed`), d4;
      }
      let u2;
      try {
        u2 = await this.client.core.history.get(s, t);
      } catch (d4) {
        throw this.client.logger.error(`sendError() -> history.get(${s}, ${t}) failed`), d4;
      }
      if (h3) {
        const d4 = Xc(a2, s, p2);
        await global.Linking.openURL(d4, this.client.name);
      } else {
        const d4 = u2.request.method, w2 = o2 || N$1[d4].res;
        this.client.core.relayer.publish(s, p2, w2);
      }
      await this.client.core.history.resolve(l2);
    }), c(this, "cleanup", async () => {
      const e = [], t = [];
      this.client.session.getAll().forEach((s) => {
        let i2 = false;
        vi$1(s.expiry) && (i2 = true), this.client.core.crypto.keychain.has(s.topic) || (i2 = true), i2 && e.push(s.topic);
      }), this.client.proposal.getAll().forEach((s) => {
        vi$1(s.expiryTimestamp) && t.push(s.id);
      }), await Promise.all([...e.map((s) => this.deleteSession({ topic: s })), ...t.map((s) => this.deleteProposal(s))]);
    }), c(this, "onProviderMessageEvent", async (e) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e) : await this.onRelayMessage(e);
    }), c(this, "onRelayEventRequest", async (e) => {
      this.requestQueue.queue.push(e), await this.processRequestsQueue();
    }), c(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === $$2.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = $$2.active;
        const e = this.requestQueue.queue.shift();
        if (e) try {
          await this.processRequest(e);
        } catch (t) {
          this.client.logger.warn(t);
        }
      }
      this.requestQueue.state = $$2.idle;
    }), c(this, "processRequest", async (e) => {
      const { topic: t, payload: s, attestation: i2, transportType: r2, encryptedId: o2 } = e, a2 = s.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a2 })) switch (a2) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: t, payload: s, attestation: i2, encryptedId: o2 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(t, s);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(t, s);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(t, s);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(t, s);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(t, s);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: t, payload: s, attestation: i2, encryptedId: o2, transportType: r2 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(t, s);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: t, payload: s, attestation: i2, encryptedId: o2, transportType: r2 });
        default:
          return this.client.logger.info(`Unsupported request method ${a2}`);
      }
    }), c(this, "onRelayEventResponse", async (e) => {
      const { topic: t, payload: s, transportType: i2 } = e, r2 = (await this.client.core.history.get(t, s.id)).request.method;
      switch (r2) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s, i2);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s);
        default:
          return this.client.logger.info(`Unsupported response method ${r2}`);
      }
    }), c(this, "onRelayEventUnknownPayload", (e) => {
      const { topic: t } = e, { message: s } = ht$2("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s);
    }), c(this, "shouldIgnorePairingRequest", (e) => {
      const { topic: t, requestMethod: s } = e, i2 = this.expectedPairingMethodMap.get(t);
      return !i2 || i2.includes(s) ? false : !!(i2.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c(this, "onSessionProposeRequest", async (e) => {
      const { topic: t, payload: s, attestation: i2, encryptedId: r2 } = e, { params: o2, id: a2 } = s;
      try {
        const l2 = this.client.core.eventClient.getEvent({ topic: t });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l2 == null ? void 0 : l2.setError(Y$2.proposal_listener_not_found)), this.isValidConnect(v$1({}, s.params));
        const p2 = o2.expiryTimestamp || Ei$1(N$1.wc_sessionPropose.req.ttl), h3 = v$1({ id: a2, pairingTopic: t, expiryTimestamp: p2 }, o2);
        await this.setProposal(a2, h3);
        const u2 = await this.getVerifyContext({ attestationId: i2, hash: kc(JSON.stringify(s)), encryptedId: r2, metadata: h3.proposer.metadata });
        l2 == null ? void 0 : l2.addTrace(G$1.emit_session_proposal), this.client.events.emit("session_proposal", { id: a2, params: h3, verifyContext: u2 });
      } catch (l2) {
        await this.sendError({ id: a2, topic: t, error: l2, rpcOpts: N$1.wc_sessionPropose.autoReject }), this.client.logger.error(l2);
      }
    }), c(this, "onSessionProposeResponse", async (e, t, s) => {
      const { id: i2 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r2 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r2 });
        const o2 = this.client.proposal.get(i2);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o2 });
        const a2 = o2.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a2 });
        const l2 = r2.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l2 });
        const p2 = await this.client.core.crypto.generateSharedKey(a2, l2);
        this.pendingSessions.set(i2, { sessionTopic: p2, pairingTopic: e, proposalId: i2, publicKey: a2 });
        const h3 = await this.client.core.relayer.subscribe(p2, { transportType: s });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h3 }), await this.client.core.pairing.activate({ topic: e });
      } else if (isJsonRpcError(t)) {
        await this.client.proposal.delete(i2, Nt$1("USER_DISCONNECTED"));
        const r2 = xi$1("session_connect", i2);
        if (this.events.listenerCount(r2) === 0) throw new Error(`emitting ${r2} without any listeners, 954`);
        this.events.emit(r2, { error: t.error });
      }
    }), c(this, "onSessionSettleRequest", async (e, t) => {
      const { id: s, params: i2 } = t;
      try {
        this.isValidSessionSettleRequest(i2);
        const { relay: r2, controller: o2, expiry: a2, namespaces: l2, sessionProperties: p2, scopedProperties: h3, sessionConfig: u2 } = t.params, d4 = [...this.pendingSessions.values()].find((f3) => f3.sessionTopic === e);
        if (!d4) return this.client.logger.error(`Pending session not found for topic ${e}`);
        const w2 = this.client.proposal.get(d4.proposalId), m3 = b$2(v$1(v$1(v$1({ topic: e, relay: r2, expiry: a2, namespaces: l2, acknowledged: true, pairingTopic: d4.pairingTopic, requiredNamespaces: w2.requiredNamespaces, optionalNamespaces: w2.optionalNamespaces, controller: o2.publicKey, self: { publicKey: d4.publicKey, metadata: this.client.metadata }, peer: { publicKey: o2.publicKey, metadata: o2.metadata } }, p2 && { sessionProperties: p2 }), h3 && { scopedProperties: h3 }), u2 && { sessionConfig: u2 }), { transportType: Q$2.relay });
        await this.client.session.set(m3.topic, m3), await this.setExpiry(m3.topic, m3.expiry), await this.client.core.pairing.updateMetadata({ topic: d4.pairingTopic, metadata: m3.peer.metadata }), this.client.events.emit("session_connect", { session: m3 }), this.events.emit(xi$1("session_connect", d4.proposalId), { session: m3 }), this.pendingSessions.delete(d4.proposalId), this.deleteProposal(d4.proposalId, false), this.cleanupDuplicatePairings(m3), await this.sendResult({ id: t.id, topic: e, result: true, throwOnFailedPublish: true });
      } catch (r2) {
        await this.sendError({ id: s, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }), c(this, "onSessionSettleResponse", async (e, t) => {
      const { id: s } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(xi$1("session_approve", s), {})) : isJsonRpcError(t) && (await this.client.session.delete(e, Nt$1("USER_DISCONNECTED")), this.events.emit(xi$1("session_approve", s), { error: t.error }));
    }), c(this, "onSessionUpdateRequest", async (e, t) => {
      const { params: s, id: i2 } = t;
      try {
        const r2 = `${e}_session_update`, o2 = Ra.get(r2);
        if (o2 && this.isRequestOutOfSync(o2, i2)) {
          this.client.logger.warn(`Discarding out of sync request - ${i2}`), this.sendError({ id: i2, topic: e, error: Nt$1("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(v$1({ topic: e }, s));
        try {
          Ra.set(r2, i2), await this.client.session.update(e, { namespaces: s.namespaces }), await this.sendResult({ id: i2, topic: e, result: true, throwOnFailedPublish: true });
        } catch (a2) {
          throw Ra.delete(r2), a2;
        }
        this.client.events.emit("session_update", { id: i2, topic: e, params: s });
      } catch (r2) {
        await this.sendError({ id: i2, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }), c(this, "isRequestOutOfSync", (e, t) => t.toString().slice(0, -3) < e.toString().slice(0, -3)), c(this, "onSessionUpdateResponse", (e, t) => {
      const { id: s } = t, i2 = xi$1("session_update", s);
      if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(xi$1("session_update", s), {}) : isJsonRpcError(t) && this.events.emit(xi$1("session_update", s), { error: t.error });
    }), c(this, "onSessionExtendRequest", async (e, t) => {
      const { id: s } = t;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, Ei$1(J$1)), await this.sendResult({ id: s, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s, topic: e });
      } catch (i2) {
        await this.sendError({ id: s, topic: e, error: i2 }), this.client.logger.error(i2);
      }
    }), c(this, "onSessionExtendResponse", (e, t) => {
      const { id: s } = t, i2 = xi$1("session_extend", s);
      if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(xi$1("session_extend", s), {}) : isJsonRpcError(t) && this.events.emit(xi$1("session_extend", s), { error: t.error });
    }), c(this, "onSessionPingRequest", async (e, t) => {
      const { id: s } = t;
      try {
        this.isValidPing({ topic: e }), await this.sendResult({ id: s, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s, topic: e });
      } catch (i2) {
        await this.sendError({ id: s, topic: e, error: i2 }), this.client.logger.error(i2);
      }
    }), c(this, "onSessionPingResponse", (e, t) => {
      const { id: s } = t, i2 = xi$1("session_ping", s);
      setTimeout(() => {
        if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners 2176`);
        isJsonRpcResult(t) ? this.events.emit(xi$1("session_ping", s), {}) : isJsonRpcError(t) && this.events.emit(xi$1("session_ping", s), { error: t.error });
      }, 500);
    }), c(this, "onSessionDeleteRequest", async (e, t) => {
      const { id: s } = t;
      try {
        this.isValidDisconnect({ topic: e, reason: t.params }), Promise.all([new Promise((i2) => {
          this.client.core.relayer.once(C$2.publish, async () => {
            i2(await this.deleteSession({ topic: e, id: s }));
          });
        }), this.sendResult({ id: s, topic: e, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e, error: Nt$1("USER_DISCONNECTED") })]).catch((i2) => this.client.logger.error(i2));
      } catch (i2) {
        this.client.logger.error(i2);
      }
    }), c(this, "onSessionRequest", async (e) => {
      var t, s, i2;
      const { topic: r2, payload: o2, attestation: a2, encryptedId: l2, transportType: p2 } = e, { id: h3, params: u2 } = o2;
      try {
        await this.isValidRequest(v$1({ topic: r2 }, u2));
        const d4 = this.client.session.get(r2), w2 = await this.getVerifyContext({ attestationId: a2, hash: kc(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", u2, h3))), encryptedId: l2, metadata: d4.peer.metadata, transportType: p2 }), m3 = { id: h3, topic: r2, params: u2, verifyContext: w2 };
        await this.setPendingSessionRequest(m3), p2 === Q$2.link_mode && (t = d4.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s = d4.peer.metadata.redirect) == null ? void 0 : s.universal), (i2 = this.client.signConfig) != null && i2.disableRequestQueue ? this.emitSessionRequest(m3) : (this.addSessionRequestToSessionRequestQueue(m3), this.processSessionRequestQueue());
      } catch (d4) {
        await this.sendError({ id: h3, topic: r2, error: d4 }), this.client.logger.error(d4);
      }
    }), c(this, "onSessionRequestResponse", (e, t) => {
      const { id: s } = t, i2 = xi$1("session_request", s);
      if (this.events.listenerCount(i2) === 0) throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(xi$1("session_request", s), { result: t.result }) : isJsonRpcError(t) && this.events.emit(xi$1("session_request", s), { error: t.error });
    }), c(this, "onSessionEventRequest", async (e, t) => {
      const { id: s, params: i2 } = t;
      try {
        const r2 = `${e}_session_event_${i2.event.name}`, o2 = Ra.get(r2);
        if (o2 && this.isRequestOutOfSync(o2, s)) {
          this.client.logger.info(`Discarding out of sync request - ${s}`);
          return;
        }
        this.isValidEmit(v$1({ topic: e }, i2)), this.client.events.emit("session_event", { id: s, topic: e, params: i2 }), Ra.set(r2, s);
      } catch (r2) {
        await this.sendError({ id: s, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }), c(this, "onSessionAuthenticateResponse", (e, t) => {
      const { id: s } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e, payload: t }), isJsonRpcResult(t) ? this.events.emit(xi$1("session_request", s), { result: t.result }) : isJsonRpcError(t) && this.events.emit(xi$1("session_request", s), { error: t.error });
    }), c(this, "onSessionAuthenticateRequest", async (e) => {
      var t;
      const { topic: s, payload: i2, attestation: r2, encryptedId: o2, transportType: a2 } = e;
      try {
        const { requester: l2, authPayload: p2, expiryTimestamp: h3 } = i2.params, u2 = await this.getVerifyContext({ attestationId: r2, hash: kc(JSON.stringify(i2)), encryptedId: o2, metadata: l2.metadata, transportType: a2 }), d4 = { requester: l2, pairingTopic: s, id: i2.id, authPayload: p2, verifyContext: u2, expiryTimestamp: h3 };
        await this.setAuthRequest(i2.id, { request: d4, pairingTopic: s, transportType: a2 }), a2 === Q$2.link_mode && (t = l2.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(l2.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s, params: i2.params, id: i2.id, verifyContext: u2 });
      } catch (l2) {
        this.client.logger.error(l2);
        const p2 = i2.params.requester.publicKey, h3 = await this.client.core.crypto.generateKeyPair(), u2 = this.getAppLinkIfEnabled(i2.params.requester.metadata, a2), d4 = { type: Ft$2, receiverPublicKey: p2, senderPublicKey: h3 };
        await this.sendError({ id: i2.id, topic: s, error: l2, encodeOpts: d4, rpcOpts: N$1.wc_sessionAuthenticate.autoReject, appLink: u2 });
      }
    }), c(this, "addSessionRequestToSessionRequestQueue", (e) => {
      this.sessionRequestQueue.queue.push(e);
    }), c(this, "cleanupAfterResponse", (e) => {
      this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = $$2.idle, this.processSessionRequestQueue();
      }, cjs.toMiliseconds(this.requestQueueDelay));
    }), c(this, "cleanupPendingSentRequestsForTopic", ({ topic: e, error: t }) => {
      const s = this.client.core.history.pending;
      s.length > 0 && s.filter((i2) => i2.topic === e && i2.request.method === "wc_sessionRequest").forEach((i2) => {
        const r2 = i2.request.id, o2 = xi$1("session_request", r2);
        if (this.events.listenerCount(o2) === 0) throw new Error(`emitting ${o2} without any listeners`);
        this.events.emit(xi$1("session_request", i2.request.id), { error: t });
      });
    }), c(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === $$2.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e = this.sessionRequestQueue.queue[0];
      if (!e) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = $$2.active, this.emitSessionRequest(e);
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c(this, "emitSessionRequest", (e) => {
      this.client.events.emit("session_request", e);
    }), c(this, "onPairingCreated", (e) => {
      if (e.methods && this.expectedPairingMethodMap.set(e.topic, e.methods), e.active) return;
      const t = this.client.proposal.getAll().find((s) => s.pairingTopic === e.topic);
      t && this.onSessionProposeRequest({ topic: e.topic, payload: formatJsonRpcRequest("wc_sessionPropose", b$2(v$1({}, t), { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties, scopedProperties: t.scopedProperties }), t.id) });
    }), c(this, "isValidConnect", async (e) => {
      if (!ma(e)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(l2);
      }
      const { pairingTopic: t, requiredNamespaces: s, optionalNamespaces: i2, sessionProperties: r2, scopedProperties: o2, relays: a2 } = e;
      if (Et$2(t) || await this.isValidPairingTopic(t), !ga(a2)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `connect() relays: ${a2}`);
        throw new Error(l2);
      }
      if (!Et$2(s) && Oe$1(s) !== 0) {
        const l2 = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l2) : this.client.logger.warn(l2), this.validateNamespaces(s, "requiredNamespaces");
      }
      if (!Et$2(i2) && Oe$1(i2) !== 0 && this.validateNamespaces(i2, "optionalNamespaces"), Et$2(r2) || this.validateSessionProps(r2, "sessionProperties"), !Et$2(o2)) {
        this.validateSessionProps(o2, "scopedProperties");
        const l2 = Object.keys(s || {}).concat(Object.keys(i2 || {}));
        if (!Object.keys(o2).every((p2) => l2.includes(p2))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(o2)}, required/optional namespaces: ${JSON.stringify(l2)}`);
      }
    }), c(this, "validateNamespaces", (e, t) => {
      const s = pa(e, "connect()", t);
      if (s) throw new Error(s.message);
    }), c(this, "isValidApprove", async (e) => {
      if (!ma(e)) throw new Error(ht$2("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: t, namespaces: s, relayProtocol: i2, sessionProperties: r2, scopedProperties: o2 } = e;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const a2 = this.client.proposal.get(t), l2 = Bo$1(s, "approve()");
      if (l2) throw new Error(l2.message);
      const p2 = No$1(a2.requiredNamespaces, s, "approve()");
      if (p2) throw new Error(p2.message);
      if (!nt$2(i2, true)) {
        const { message: h3 } = ht$2("MISSING_OR_INVALID", `approve() relayProtocol: ${i2}`);
        throw new Error(h3);
      }
      if (Et$2(r2) || this.validateSessionProps(r2, "sessionProperties"), !Et$2(o2)) {
        this.validateSessionProps(o2, "scopedProperties");
        const h3 = new Set(Object.keys(s));
        if (!Object.keys(o2).every((u2) => h3.has(u2))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(o2)}, approved namespaces: ${Array.from(h3).join(", ")}`);
      }
    }), c(this, "isValidReject", async (e) => {
      if (!ma(e)) {
        const { message: i2 } = ht$2("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(i2);
      }
      const { id: t, reason: s } = e;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !wa(s)) {
        const { message: i2 } = ht$2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s)}`);
        throw new Error(i2);
      }
    }), c(this, "isValidSessionSettleRequest", (e) => {
      if (!ma(e)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(l2);
      }
      const { relay: t, controller: s, namespaces: i2, expiry: r2 } = e;
      if (!Io$1(t)) {
        const { message: l2 } = ht$2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l2);
      }
      const o2 = ha(s, "onSessionSettleRequest()");
      if (o2) throw new Error(o2.message);
      const a2 = Bo$1(i2, "onSessionSettleRequest()");
      if (a2) throw new Error(a2.message);
      if (vi$1(r2)) {
        const { message: l2 } = ht$2("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l2);
      }
    }), c(this, "isValidUpdate", async (e) => {
      if (!ma(e)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: t, namespaces: s } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i2 = this.client.session.get(t), r2 = Bo$1(s, "update()");
      if (r2) throw new Error(r2.message);
      const o2 = No$1(i2.requiredNamespaces, s, "update()");
      if (o2) throw new Error(o2.message);
    }), c(this, "isValidExtend", async (e) => {
      if (!ma(e)) {
        const { message: s } = ht$2("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(s);
      }
      const { topic: t } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }), c(this, "isValidRequest", async (e) => {
      if (!ma(e)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: t, request: s, chainId: i2, expiry: r2 } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: o2 } = this.client.session.get(t);
      if (!xa(o2, i2)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() chainId: ${i2}`);
        throw new Error(a2);
      }
      if (!ba(s)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() ${JSON.stringify(s)}`);
        throw new Error(a2);
      }
      if (!Sa(o2, i2, s.method)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() method: ${s.method}`);
        throw new Error(a2);
      }
      if (r2 && !Ia(r2, _e$1)) {
        const { message: a2 } = ht$2("MISSING_OR_INVALID", `request() expiry: ${r2}. Expiry must be a number (in seconds) between ${_e$1.min} and ${_e$1.max}`);
        throw new Error(a2);
      }
    }), c(this, "isValidRespond", async (e) => {
      var t;
      if (!ma(e)) {
        const { message: r2 } = ht$2("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(r2);
      }
      const { topic: s, response: i2 } = e;
      try {
        await this.isValidSessionTopic(s);
      } catch (r2) {
        throw (t = e == null ? void 0 : e.response) != null && t.id && this.cleanupAfterResponse(e), r2;
      }
      if (!Ea(i2)) {
        const { message: r2 } = ht$2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i2)}`);
        throw new Error(r2);
      }
    }), c(this, "isValidPing", async (e) => {
      if (!ma(e)) {
        const { message: s } = ht$2("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(s);
      }
      const { topic: t } = e;
      await this.isValidSessionOrPairingTopic(t);
    }), c(this, "isValidEmit", async (e) => {
      if (!ma(e)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(o2);
      }
      const { topic: t, event: s, chainId: i2 } = e;
      await this.isValidSessionTopic(t);
      const { namespaces: r2 } = this.client.session.get(t);
      if (!xa(r2, i2)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() chainId: ${i2}`);
        throw new Error(o2);
      }
      if (!va(s)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s)}`);
        throw new Error(o2);
      }
      if (!Oa(r2, i2, s.name)) {
        const { message: o2 } = ht$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s)}`);
        throw new Error(o2);
      }
    }), c(this, "isValidDisconnect", async (e) => {
      if (!ma(e)) {
        const { message: s } = ht$2("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(s);
      }
      const { topic: t } = e;
      await this.isValidSessionOrPairingTopic(t);
    }), c(this, "isValidAuthenticate", (e) => {
      const { chains: t, uri: s, domain: i2, nonce: r2 } = e;
      if (!Array.isArray(t) || t.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!nt$2(s, false)) throw new Error("uri is required parameter");
      if (!nt$2(i2, false)) throw new Error("domain is required parameter");
      if (!nt$2(r2, false)) throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a2) => Ne$1(a2).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: o2 } = Ne$1(t[0]);
      if (o2 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c(this, "getVerifyContext", async (e) => {
      const { attestationId: t, hash: s, encryptedId: i2, metadata: r2, transportType: o2 } = e, a2 = { verified: { verifyUrl: r2.verifyUrl || ue$1, validation: "UNKNOWN", origin: r2.url || "" } };
      try {
        if (o2 === Q$2.link_mode) {
          const p2 = this.getAppLinkIfEnabled(r2, o2);
          return a2.verified.validation = p2 && new URL(p2).origin === new URL(r2.url).origin ? "VALID" : "INVALID", a2;
        }
        const l2 = await this.client.core.verify.resolve({ attestationId: t, hash: s, encryptedId: i2, verifyUrl: r2.verifyUrl });
        l2 && (a2.verified.origin = l2.origin, a2.verified.isScam = l2.isScam, a2.verified.validation = l2.origin === new URL(r2.url).origin ? "VALID" : "INVALID");
      } catch (l2) {
        this.client.logger.warn(l2);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a2)}`), a2;
    }), c(this, "validateSessionProps", (e, t) => {
      Object.values(e).forEach((s, i2) => {
        if (s == null) {
          const { message: r2 } = ht$2("MISSING_OR_INVALID", `${t} must contain an existing value for each key. Received: ${s} for key ${Object.keys(e)[i2]}`);
          throw new Error(r2);
        }
      });
    }), c(this, "getPendingAuthRequest", (e) => {
      const t = this.client.auth.requests.get(e);
      return typeof t == "object" ? t : void 0;
    }), c(this, "addToRecentlyDeleted", (e, t) => {
      if (this.recentlyDeletedMap.set(e, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s = 0;
        const i2 = this.recentlyDeletedLimit / 2;
        for (const r2 of this.recentlyDeletedMap.keys()) {
          if (s++ >= i2) break;
          this.recentlyDeletedMap.delete(r2);
        }
      }
    }), c(this, "checkRecentlyDeleted", (e) => {
      const t = this.recentlyDeletedMap.get(e);
      if (t) {
        const { message: s } = ht$2("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e}`);
        throw new Error(s);
      }
    }), c(this, "isLinkModeEnabled", (e, t) => {
      var s, i2, r2, o2, a2, l2, p2, h3, u2;
      return !e || t !== Q$2.link_mode ? false : ((i2 = (s = this.client.metadata) == null ? void 0 : s.redirect) == null ? void 0 : i2.linkMode) === true && ((o2 = (r2 = this.client.metadata) == null ? void 0 : r2.redirect) == null ? void 0 : o2.universal) !== void 0 && ((l2 = (a2 = this.client.metadata) == null ? void 0 : a2.redirect) == null ? void 0 : l2.universal) !== "" && ((p2 = e == null ? void 0 : e.redirect) == null ? void 0 : p2.universal) !== void 0 && ((h3 = e == null ? void 0 : e.redirect) == null ? void 0 : h3.universal) !== "" && ((u2 = e == null ? void 0 : e.redirect) == null ? void 0 : u2.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c(this, "getAppLinkIfEnabled", (e, t) => {
      var s;
      return this.isLinkModeEnabled(e, t) ? (s = e == null ? void 0 : e.redirect) == null ? void 0 : s.universal : void 0;
    }), c(this, "handleLinkModeMessage", ({ url: e }) => {
      if (!e || !e.includes("wc_ev") || !e.includes("topic")) return;
      const t = Ai$1(e, "topic") || "", s = decodeURIComponent(Ai$1(e, "wc_ev") || ""), i2 = this.client.session.keys.includes(t);
      i2 && this.client.session.update(t, { transportType: Q$2.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s, sessionExists: i2 });
    }), c(this, "registerLinkModeListeners", async () => {
      var e;
      if (Ii$1() || pt$2() && (e = this.client.metadata.redirect) != null && e.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s = await t.getInitialURL();
          s && setTimeout(() => {
            this.handleLinkModeMessage({ url: s });
          }, 50);
        }
      }
    }), c(this, "shouldSetTVF", (e, t) => {
      if (!t || e !== "wc_sessionRequest") return false;
      const { request: s } = t;
      return Object.keys(Ke$1).includes(s.method);
    }), c(this, "getTVFParams", (e, t, s) => {
      var i2, r2;
      try {
        const o2 = t.request.method, a2 = this.extractTxHashesFromResult(o2, s);
        return b$2(v$1({ correlationId: e, rpcMethods: [o2], chainId: t.chainId }, this.isValidContractData(t.request.params) && { contractAddresses: [(r2 = (i2 = t.request.params) == null ? void 0 : i2[0]) == null ? void 0 : r2.to] }), { txHashes: a2 });
      } catch (o2) {
        this.client.logger.warn("Error getting TVF params", o2);
      }
      return {};
    }), c(this, "isValidContractData", (e) => {
      var t;
      if (!e) return false;
      try {
        const s = (e == null ? void 0 : e.data) || ((t = e == null ? void 0 : e[0]) == null ? void 0 : t.data);
        if (!s.startsWith("0x")) return false;
        const i2 = s.slice(2);
        return /^[0-9a-fA-F]*$/.test(i2) ? i2.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c(this, "extractTxHashesFromResult", (e, t) => {
      try {
        const s = Ke$1[e];
        if (typeof t == "string") return [t];
        const i2 = t[s.key];
        if (se$2(i2)) return e === "solana_signAllTransactions" ? i2.map((r2) => Ji(r2)) : i2;
        if (typeof i2 == "string") return [i2];
      } catch (s) {
        this.client.logger.warn("Error extracting tx hashes from result", s);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const n2 = this.client.session.keys, e = this.client.core.relayer.messages.getWithoutAck(n2);
      for (const [t, s] of Object.entries(e)) for (const i2 of s) try {
        await this.onProviderMessageEvent({ topic: t, message: i2, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${t}, message: ${i2}`);
      }
    } catch (n2) {
      this.client.logger.warn("processPendingMessageEvents failed", n2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: n2 } = ht$2("NOT_INITIALIZED", this.name);
      throw new Error(n2);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(C$2.message, (n2) => {
      this.onProviderMessageEvent(n2);
    });
  }
  async onRelayMessage(n2) {
    const { topic: e, message: t, attestation: s, transportType: i2 } = n2, { publicKey: r2 } = this.client.auth.authKeys.keys.includes(ce$1) ? this.client.auth.authKeys.get(ce$1) : { publicKey: void 0 };
    try {
      const o2 = await this.client.core.crypto.decode(e, t, { receiverPublicKey: r2, encoding: i2 === Q$2.link_mode ? xe$1 : qt$2 });
      isJsonRpcRequest(o2) ? (this.client.core.history.set(e, o2), await this.onRelayEventRequest({ topic: e, payload: o2, attestation: s, transportType: i2, encryptedId: kc(t) })) : isJsonRpcResponse(o2) ? (await this.client.core.history.resolve(o2), await this.onRelayEventResponse({ topic: e, payload: o2, transportType: i2 }), this.client.core.history.delete(e, o2.id)) : await this.onRelayEventUnknownPayload({ topic: e, payload: o2, transportType: i2 }), await this.client.core.relayer.messages.ack(e, t);
    } catch (o2) {
      this.client.logger.error(o2);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(M$2.expired, async (n2) => {
      const { topic: e, id: t } = bi$1(n2.target);
      if (t && this.client.pendingRequest.keys.includes(t)) return await this.deletePendingSessionRequest(t, ht$2("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t)) return await this.deletePendingAuthRequest(t, ht$2("EXPIRED"), true);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession({ topic: e, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(re$1.create, (n2) => this.onPairingCreated(n2)), this.client.core.pairing.events.on(re$1.delete, (n2) => {
      this.addToRecentlyDeleted(n2.topic, "pairing");
    });
  }
  isValidPairingTopic(n2) {
    if (!nt$2(n2, false)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `pairing topic should be a string: ${n2}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(n2)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n2}`);
      throw new Error(e);
    }
    if (vi$1(this.client.core.pairing.pairings.get(n2).expiry)) {
      const { message: e } = ht$2("EXPIRED", `pairing topic: ${n2}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(n2) {
    if (!nt$2(n2, false)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `session topic should be a string: ${n2}`);
      throw new Error(e);
    }
    if (this.checkRecentlyDeleted(n2), !this.client.session.keys.includes(n2)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `session topic doesn't exist: ${n2}`);
      throw new Error(e);
    }
    if (vi$1(this.client.session.get(n2).expiry)) {
      await this.deleteSession({ topic: n2 });
      const { message: e } = ht$2("EXPIRED", `session topic: ${n2}`);
      throw new Error(e);
    }
    if (!this.client.core.crypto.keychain.has(n2)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${n2}`);
      throw await this.deleteSession({ topic: n2 }), new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(n2) {
    if (this.checkRecentlyDeleted(n2), this.client.session.keys.includes(n2)) await this.isValidSessionTopic(n2);
    else if (this.client.core.pairing.pairings.keys.includes(n2)) this.isValidPairingTopic(n2);
    else if (nt$2(n2, false)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n2}`);
      throw new Error(e);
    } else {
      const { message: e } = ht$2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n2}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(n2) {
    if (!ya(n2)) {
      const { message: e } = ht$2("MISSING_OR_INVALID", `proposal id should be a number: ${n2}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(n2)) {
      const { message: e } = ht$2("NO_MATCHING_KEY", `proposal id doesn't exist: ${n2}`);
      throw new Error(e);
    }
    if (vi$1(this.client.proposal.get(n2).expiryTimestamp)) {
      await this.deleteProposal(n2);
      const { message: e } = ht$2("EXPIRED", `proposal id: ${n2}`);
      throw new Error(e);
    }
  }
}
class Os extends zi {
  constructor(n2, e) {
    super(n2, e, pt$1, we$1), this.core = n2, this.logger = e;
  }
}
let St$1 = class St extends zi {
  constructor(n2, e) {
    super(n2, e, ht$1, we$1), this.core = n2, this.logger = e;
  }
};
class bs extends zi {
  constructor(n2, e) {
    super(n2, e, ut$1, we$1, (t) => t.id), this.core = n2, this.logger = e;
  }
}
class As extends zi {
  constructor(n2, e) {
    super(n2, e, mt$1, ae$1, () => ce$1), this.core = n2, this.logger = e;
  }
}
class xs extends zi {
  constructor(n2, e) {
    super(n2, e, _t$1, ae$1), this.core = n2, this.logger = e;
  }
}
class Cs extends zi {
  constructor(n2, e) {
    super(n2, e, Et, ae$1, (t) => t.id), this.core = n2, this.logger = e;
  }
}
var Vs = Object.defineProperty, Ds = (S3, n2, e) => n2 in S3 ? Vs(S3, n2, { enumerable: true, configurable: true, writable: true, value: e }) : S3[n2] = e, Ge$1 = (S3, n2, e) => Ds(S3, typeof n2 != "symbol" ? n2 + "" : n2, e);
class Ls {
  constructor(n2, e) {
    this.core = n2, this.logger = e, Ge$1(this, "authKeys"), Ge$1(this, "pairingTopics"), Ge$1(this, "requests"), this.authKeys = new As(this.core, this.logger), this.pairingTopics = new xs(this.core, this.logger), this.requests = new Cs(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
var ks = Object.defineProperty, Ms = (S3, n2, e) => n2 in S3 ? ks(S3, n2, { enumerable: true, configurable: true, writable: true, value: e }) : S3[n2] = e, E$2 = (S3, n2, e) => Ms(S3, typeof n2 != "symbol" ? n2 + "" : n2, e);
let Ee$1 = class Ee extends J$2 {
  constructor(n2) {
    super(n2), E$2(this, "protocol", De$1), E$2(this, "version", Le$1), E$2(this, "name", me$1.name), E$2(this, "metadata"), E$2(this, "core"), E$2(this, "logger"), E$2(this, "events", new events.EventEmitter()), E$2(this, "engine"), E$2(this, "session"), E$2(this, "proposal"), E$2(this, "pendingRequest"), E$2(this, "auth"), E$2(this, "signConfig"), E$2(this, "on", (t, s) => this.events.on(t, s)), E$2(this, "once", (t, s) => this.events.once(t, s)), E$2(this, "off", (t, s) => this.events.off(t, s)), E$2(this, "removeListener", (t, s) => this.events.removeListener(t, s)), E$2(this, "removeAllListeners", (t) => this.events.removeAllListeners(t)), E$2(this, "connect", async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "pair", async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "approve", async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "reject", async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "update", async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "extend", async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "request", async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "respond", async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "ping", async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "emit", async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "disconnect", async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "find", (t) => {
      try {
        return this.engine.find(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }), E$2(this, "authenticate", async (t, s) => {
      try {
        return await this.engine.authenticate(t, s);
      } catch (i2) {
        throw this.logger.error(i2.message), i2;
      }
    }), E$2(this, "formatAuthMessage", (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "approveSessionAuthenticate", async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), E$2(this, "rejectSessionAuthenticate", async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), this.name = (n2 == null ? void 0 : n2.name) || me$1.name, this.metadata = oi$1(n2 == null ? void 0 : n2.metadata), this.signConfig = n2 == null ? void 0 : n2.signConfig;
    const e = typeof (n2 == null ? void 0 : n2.logger) < "u" && typeof (n2 == null ? void 0 : n2.logger) != "string" ? n2.logger : Ot$1(k$4({ level: (n2 == null ? void 0 : n2.logger) || me$1.logger }));
    this.core = (n2 == null ? void 0 : n2.core) || new Xo(n2), this.logger = E$4(e, this.name), this.session = new St$1(this.core, this.logger), this.proposal = new Os(this.core, this.logger), this.pendingRequest = new bs(this.core, this.logger), this.engine = new Ns(this), this.auth = new Ls(this.core, this.logger);
  }
  static async init(n2) {
    const e = new Ee(n2);
    return await e.initialize(), e;
  }
  get context() {
    return y$3(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, cjs.toMiliseconds(cjs.ONE_SECOND));
    } catch (n2) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n2.message), n2;
    }
  }
};
const et$1 = "error", St2 = "wss://relay.walletconnect.org", Dt = "wc", qt = "universal_provider", U$1 = `${Dt}@2:${qt}:`, st$1 = "https://rpc.walletconnect.org/v1/", I$1 = "generic", jt = `${st$1}bundler`, u = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function Rt() {
}
function k$1(s) {
  return s == null || typeof s != "object" && typeof s != "function";
}
function W$1(s) {
  return ArrayBuffer.isView(s) && !(s instanceof DataView);
}
function _t(s) {
  if (k$1(s)) return s;
  if (Array.isArray(s) || W$1(s) || s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
  const t = Object.getPrototypeOf(s), e = t.constructor;
  if (s instanceof Date || s instanceof Map || s instanceof Set) return new e(s);
  if (s instanceof RegExp) {
    const i2 = new e(s);
    return i2.lastIndex = s.lastIndex, i2;
  }
  if (s instanceof DataView) return new e(s.buffer.slice(0));
  if (s instanceof Error) {
    const i2 = new e(s.message);
    return i2.stack = s.stack, i2.name = s.name, i2.cause = s.cause, i2;
  }
  if (typeof File < "u" && s instanceof File) return new e([s], s.name, { type: s.type, lastModified: s.lastModified });
  if (typeof s == "object") {
    const i2 = Object.create(t);
    return Object.assign(i2, s);
  }
  return s;
}
function it(s) {
  return typeof s == "object" && s !== null;
}
function rt(s) {
  return Object.getOwnPropertySymbols(s).filter((t) => Object.prototype.propertyIsEnumerable.call(s, t));
}
function nt$1(s) {
  return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const Ut = "[object RegExp]", at = "[object String]", ct = "[object Number]", ot = "[object Boolean]", ht = "[object Arguments]", Ft = "[object Symbol]", Lt = "[object Date]", Mt = "[object Map]", xt = "[object Set]", Bt = "[object Array]", Gt = "[object ArrayBuffer]", Jt = "[object Object]", zt = "[object DataView]", kt = "[object Uint8Array]", Wt = "[object Uint8ClampedArray]", Kt = "[object Uint16Array]", Vt = "[object Uint32Array]", Xt = "[object Int8Array]", Yt = "[object Int16Array]", Qt = "[object Int32Array]", Zt = "[object Float32Array]", Tt = "[object Float64Array]";
function te(s, t) {
  return $$1(s, void 0, s, /* @__PURE__ */ new Map(), t);
}
function $$1(s, t, e, i2 = /* @__PURE__ */ new Map(), n2 = void 0) {
  const a2 = n2 == null ? void 0 : n2(s, t, e, i2);
  if (a2 != null) return a2;
  if (k$1(s)) return s;
  if (i2.has(s)) return i2.get(s);
  if (Array.isArray(s)) {
    const r2 = new Array(s.length);
    i2.set(s, r2);
    for (let c2 = 0; c2 < s.length; c2++) r2[c2] = $$1(s[c2], c2, e, i2, n2);
    return Object.hasOwn(s, "index") && (r2.index = s.index), Object.hasOwn(s, "input") && (r2.input = s.input), r2;
  }
  if (s instanceof Date) return new Date(s.getTime());
  if (s instanceof RegExp) {
    const r2 = new RegExp(s.source, s.flags);
    return r2.lastIndex = s.lastIndex, r2;
  }
  if (s instanceof Map) {
    const r2 = /* @__PURE__ */ new Map();
    i2.set(s, r2);
    for (const [c2, o2] of s) r2.set(c2, $$1(o2, c2, e, i2, n2));
    return r2;
  }
  if (s instanceof Set) {
    const r2 = /* @__PURE__ */ new Set();
    i2.set(s, r2);
    for (const c2 of s) r2.add($$1(c2, void 0, e, i2, n2));
    return r2;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(s)) return s.subarray();
  if (W$1(s)) {
    const r2 = new (Object.getPrototypeOf(s)).constructor(s.length);
    i2.set(s, r2);
    for (let c2 = 0; c2 < s.length; c2++) r2[c2] = $$1(s[c2], c2, e, i2, n2);
    return r2;
  }
  if (s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
  if (s instanceof DataView) {
    const r2 = new DataView(s.buffer.slice(0), s.byteOffset, s.byteLength);
    return i2.set(s, r2), y2(r2, s, e, i2, n2), r2;
  }
  if (typeof File < "u" && s instanceof File) {
    const r2 = new File([s], s.name, { type: s.type });
    return i2.set(s, r2), y2(r2, s, e, i2, n2), r2;
  }
  if (s instanceof Blob) {
    const r2 = new Blob([s], { type: s.type });
    return i2.set(s, r2), y2(r2, s, e, i2, n2), r2;
  }
  if (s instanceof Error) {
    const r2 = new s.constructor();
    return i2.set(s, r2), r2.message = s.message, r2.name = s.name, r2.stack = s.stack, r2.cause = s.cause, y2(r2, s, e, i2, n2), r2;
  }
  if (typeof s == "object" && ee(s)) {
    const r2 = Object.create(Object.getPrototypeOf(s));
    return i2.set(s, r2), y2(r2, s, e, i2, n2), r2;
  }
  return s;
}
function y2(s, t, e = s, i2, n2) {
  const a2 = [...Object.keys(t), ...rt(t)];
  for (let r2 = 0; r2 < a2.length; r2++) {
    const c2 = a2[r2], o2 = Object.getOwnPropertyDescriptor(s, c2);
    (o2 == null || o2.writable) && (s[c2] = $$1(t[c2], c2, e, i2, n2));
  }
}
function ee(s) {
  switch (nt$1(s)) {
    case ht:
    case Bt:
    case Gt:
    case zt:
    case ot:
    case Lt:
    case Zt:
    case Tt:
    case Xt:
    case Yt:
    case Qt:
    case Mt:
    case ct:
    case Jt:
    case Ut:
    case xt:
    case at:
    case Ft:
    case kt:
    case Wt:
    case Kt:
    case Vt:
      return true;
    default:
      return false;
  }
}
function se(s, t) {
  return te(s, (e, i2, n2, a2) => {
    if (typeof s == "object") switch (Object.prototype.toString.call(s)) {
      case ct:
      case at:
      case ot: {
        const c2 = new s.constructor(s == null ? void 0 : s.valueOf());
        return y2(c2, s), c2;
      }
      case ht: {
        const c2 = {};
        return y2(c2, s), c2.length = s.length, c2[Symbol.iterator] = s[Symbol.iterator], c2;
      }
      default:
        return;
    }
  });
}
function pt(s) {
  return se(s);
}
function dt(s) {
  return s !== null && typeof s == "object" && nt$1(s) === "[object Arguments]";
}
function ie(s) {
  return W$1(s);
}
function re(s) {
  var _a;
  if (typeof s != "object" || s == null) return false;
  if (Object.getPrototypeOf(s) === null) return true;
  if (Object.prototype.toString.call(s) !== "[object Object]") {
    const e = s[Symbol.toStringTag];
    return e == null || !((_a = Object.getOwnPropertyDescriptor(s, Symbol.toStringTag)) == null ? void 0 : _a.writable) ? false : s.toString() === `[object ${e}]`;
  }
  let t = s;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(s) === t;
}
function ne(s, ...t) {
  const e = t.slice(0, -1), i2 = t[t.length - 1];
  let n2 = s;
  for (let a2 = 0; a2 < e.length; a2++) {
    const r2 = e[a2];
    n2 = F$1(n2, r2, i2, /* @__PURE__ */ new Map());
  }
  return n2;
}
function F$1(s, t, e, i2) {
  if (k$1(s) && (s = Object(s)), t == null || typeof t != "object") return s;
  if (i2.has(t)) return _t(i2.get(t));
  if (i2.set(t, s), Array.isArray(t)) {
    t = t.slice();
    for (let a2 = 0; a2 < t.length; a2++) t[a2] = t[a2] ?? void 0;
  }
  const n2 = [...Object.keys(t), ...rt(t)];
  for (let a2 = 0; a2 < n2.length; a2++) {
    const r2 = n2[a2];
    let c2 = t[r2], o2 = s[r2];
    if (dt(c2) && (c2 = { ...c2 }), dt(o2) && (o2 = { ...o2 }), typeof Buffer < "u" && Buffer.isBuffer(c2) && (c2 = pt(c2)), Array.isArray(c2)) if (typeof o2 == "object" && o2 != null) {
      const w2 = [], v2 = Reflect.ownKeys(o2);
      for (let P3 = 0; P3 < v2.length; P3++) {
        const p2 = v2[P3];
        w2[p2] = o2[p2];
      }
      o2 = w2;
    } else o2 = [];
    const m3 = e(o2, c2, r2, s, t, i2);
    m3 != null ? s[r2] = m3 : Array.isArray(c2) || it(o2) && it(c2) ? s[r2] = F$1(o2, c2, e, i2) : o2 == null && re(c2) ? s[r2] = F$1({}, c2, e, i2) : o2 == null && ie(c2) ? s[r2] = pt(c2) : (o2 === void 0 || c2 !== void 0) && (s[r2] = c2);
  }
  return s;
}
function ae(s, ...t) {
  return ne(s, ...t, Rt);
}
var ce = Object.defineProperty, oe = Object.defineProperties, he = Object.getOwnPropertyDescriptors, ut = Object.getOwnPropertySymbols, pe = Object.prototype.hasOwnProperty, de = Object.prototype.propertyIsEnumerable, lt = (s, t, e) => t in s ? ce(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, L$1 = (s, t) => {
  for (var e in t || (t = {})) pe.call(t, e) && lt(s, e, t[e]);
  if (ut) for (var e of ut(t)) de.call(t, e) && lt(s, e, t[e]);
  return s;
}, ue = (s, t) => oe(s, he(t));
function d3(s, t, e) {
  var i2;
  const n2 = Ne$1(s);
  return ((i2 = t.rpcMap) == null ? void 0 : i2[n2.reference]) || `${st$1}?chainId=${n2.namespace}:${n2.reference}&projectId=${e}`;
}
function b$1(s) {
  return s.includes(":") ? s.split(":")[1] : s;
}
function ft(s) {
  return s.map((t) => `${t.split(":")[0]}:${t.split(":")[1]}`);
}
function le(s, t) {
  const e = Object.keys(t.namespaces).filter((n2) => n2.includes(s));
  if (!e.length) return [];
  const i2 = [];
  return e.forEach((n2) => {
    const a2 = t.namespaces[n2].accounts;
    i2.push(...a2);
  }), i2;
}
function M$1(s = {}, t = {}) {
  const e = mt(s), i2 = mt(t);
  return ae(e, i2);
}
function mt(s) {
  var t, e, i2, n2, a2;
  const r2 = {};
  if (!Oe$1(s)) return r2;
  for (const [c2, o2] of Object.entries(s)) {
    const m3 = yn$1(c2) ? [c2] : o2.chains, w2 = o2.methods || [], v2 = o2.events || [], P3 = o2.rpcMap || {}, p2 = yo$1(c2);
    r2[p2] = ue(L$1(L$1({}, r2[p2]), o2), { chains: ot$1(m3, (t = r2[p2]) == null ? void 0 : t.chains), methods: ot$1(w2, (e = r2[p2]) == null ? void 0 : e.methods), events: ot$1(v2, (i2 = r2[p2]) == null ? void 0 : i2.events) }), (Oe$1(P3) || Oe$1(((n2 = r2[p2]) == null ? void 0 : n2.rpcMap) || {})) && (r2[p2].rpcMap = L$1(L$1({}, P3), (a2 = r2[p2]) == null ? void 0 : a2.rpcMap));
  }
  return r2;
}
function vt(s) {
  return s.includes(":") ? s.split(":")[2] : s;
}
function gt(s) {
  const t = {};
  for (const [e, i2] of Object.entries(s)) {
    const n2 = i2.methods || [], a2 = i2.events || [], r2 = i2.accounts || [], c2 = yn$1(e) ? [e] : i2.chains ? i2.chains : ft(i2.accounts);
    t[e] = { chains: c2, methods: n2, events: a2, accounts: r2 };
  }
  return t;
}
function K$1(s) {
  return typeof s == "number" ? s : s.includes("0x") ? parseInt(s, 16) : (s = s.includes(":") ? s.split(":")[1] : s, isNaN(Number(s)) ? s : Number(s));
}
const Pt = {}, h2 = (s) => Pt[s], V$1 = (s, t) => {
  Pt[s] = t;
};
var fe = Object.defineProperty, me = (s, t, e) => t in s ? fe(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, O3 = (s, t, e) => me(s, typeof t != "symbol" ? t + "" : t, e);
class ve {
  constructor(t) {
    O3(this, "name", "polkadot"), O3(this, "client"), O3(this, "httpProviders"), O3(this, "events"), O3(this, "namespace"), O3(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n2 = b$1(e);
      t[n2] = this.createHttpProvider(n2, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var ge = Object.defineProperty, Pe = Object.defineProperties, we = Object.getOwnPropertyDescriptors, wt = Object.getOwnPropertySymbols, ye = Object.prototype.hasOwnProperty, be = Object.prototype.propertyIsEnumerable, X$1 = (s, t, e) => t in s ? ge(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, yt = (s, t) => {
  for (var e in t || (t = {})) ye.call(t, e) && X$1(s, e, t[e]);
  if (wt) for (var e of wt(t)) be.call(t, e) && X$1(s, e, t[e]);
  return s;
}, bt = (s, t) => Pe(s, we(t)), A$1 = (s, t, e) => X$1(s, typeof t != "symbol" ? t + "" : t, e);
class Ie {
  constructor(t) {
    A$1(this, "name", "eip155"), A$1(this, "client"), A$1(this, "chainId"), A$1(this, "namespace"), A$1(this, "httpProviders"), A$1(this, "events"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(t) {
    switch (t.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(t);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(t);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(t);
    }
    return this.namespace.methods.includes(t.request.method) ? await this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(parseInt(t), e), this.chainId = parseInt(t), this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n2 = parseInt(b$1(e));
      t[n2] = this.createHttpProvider(n2, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const t = this.chainId, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  async handleSwitchChain(t) {
    var e, i2;
    let n2 = t.request.params ? (e = t.request.params[0]) == null ? void 0 : e.chainId : "0x0";
    n2 = n2.startsWith("0x") ? n2 : `0x${n2}`;
    const a2 = parseInt(n2, 16);
    if (this.isChainApproved(a2)) this.setDefaultChain(`${a2}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: t.topic, request: { method: t.request.method, params: [{ chainId: n2 }] }, chainId: (i2 = this.namespace.chains) == null ? void 0 : i2[0] }), this.setDefaultChain(`${a2}`);
    else throw new Error(`Failed to switch to chain 'eip155:${a2}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(t) {
    return this.namespace.chains.includes(`${this.name}:${t}`);
  }
  async getCapabilities(t) {
    var e, i2, n2, a2, r2;
    const c2 = (i2 = (e = t.request) == null ? void 0 : e.params) == null ? void 0 : i2[0], o2 = ((a2 = (n2 = t.request) == null ? void 0 : n2.params) == null ? void 0 : a2[1]) || [], m3 = `${c2}${o2.join(",")}`;
    if (!c2) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const w2 = this.client.session.get(t.topic), v2 = ((r2 = w2 == null ? void 0 : w2.sessionProperties) == null ? void 0 : r2.capabilities) || {};
    if (v2 != null && v2[m3]) return v2 == null ? void 0 : v2[m3];
    const P3 = await this.client.request(t);
    try {
      await this.client.session.update(t.topic, { sessionProperties: bt(yt({}, w2.sessionProperties || {}), { capabilities: bt(yt({}, v2 || {}), { [m3]: P3 }) }) });
    } catch (p2) {
      console.warn("Failed to update session with capabilities", p2);
    }
    return P3;
  }
  async getCallStatus(t) {
    var e, i2;
    const n2 = this.client.session.get(t.topic), a2 = (e = n2.sessionProperties) == null ? void 0 : e.bundler_name;
    if (a2) {
      const c2 = this.getBundlerUrl(t.chainId, a2);
      try {
        return await this.getUserOperationReceipt(c2, t);
      } catch (o2) {
        console.warn("Failed to fetch call status from bundler", o2, c2);
      }
    }
    const r2 = (i2 = n2.sessionProperties) == null ? void 0 : i2.bundler_url;
    if (r2) try {
      return await this.getUserOperationReceipt(r2, t);
    } catch (c2) {
      console.warn("Failed to fetch call status from custom bundler", c2, r2);
    }
    if (this.namespace.methods.includes(t.request.method)) return await this.client.request(t);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(t, e) {
    var i2;
    const n2 = new URL(t), a2 = await fetch(n2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(i2 = e.request.params) == null ? void 0 : i2[0]])) });
    if (!a2.ok) throw new Error(`Failed to fetch user operation receipt - ${a2.status}`);
    return await a2.json();
  }
  getBundlerUrl(t, e) {
    return `${jt}?projectId=${this.client.core.projectId}&chainId=${t}&bundler=${e}`;
  }
}
var $e = Object.defineProperty, Oe = (s, t, e) => t in s ? $e(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, C$1 = (s, t, e) => Oe(s, typeof t != "symbol" ? t + "" : t, e);
class Ae {
  constructor(t) {
    C$1(this, "name", "solana"), C$1(this, "client"), C$1(this, "httpProviders"), C$1(this, "events"), C$1(this, "namespace"), C$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n2 = b$1(e);
      t[n2] = this.createHttpProvider(n2, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var Ce = Object.defineProperty, He = (s, t, e) => t in s ? Ce(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, H$1 = (s, t, e) => He(s, typeof t != "symbol" ? t + "" : t, e);
class Ee2 {
  constructor(t) {
    H$1(this, "name", "cosmos"), H$1(this, "client"), H$1(this, "httpProviders"), H$1(this, "events"), H$1(this, "namespace"), H$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n2 = b$1(e);
      t[n2] = this.createHttpProvider(n2, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var Ne = Object.defineProperty, Se = (s, t, e) => t in s ? Ne(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, E$1 = (s, t, e) => Se(s, typeof t != "symbol" ? t + "" : t, e);
class De {
  constructor(t) {
    E$1(this, "name", "algorand"), E$1(this, "client"), E$1(this, "httpProviders"), E$1(this, "events"), E$1(this, "namespace"), E$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    if (!this.httpProviders[t]) {
      const i2 = e || d3(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
      if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i2);
    }
    this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      t[e] = this.createHttpProvider(e, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    return typeof i2 > "u" ? void 0 : new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var qe = Object.defineProperty, je = (s, t, e) => t in s ? qe(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, N = (s, t, e) => je(s, typeof t != "symbol" ? t + "" : t, e);
class Re {
  constructor(t) {
    N(this, "name", "cip34"), N(this, "client"), N(this, "httpProviders"), N(this, "events"), N(this, "namespace"), N(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      const i2 = this.getCardanoRPCUrl(e), n2 = b$1(e);
      t[n2] = this.createHttpProvider(n2, i2);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  getCardanoRPCUrl(t) {
    const e = this.namespace.rpcMap;
    if (e) return e[t];
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || this.getCardanoRPCUrl(t);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var _e = Object.defineProperty, Ue = (s, t, e) => t in s ? _e(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, S$1 = (s, t, e) => Ue(s, typeof t != "symbol" ? t + "" : t, e);
class Fe {
  constructor(t) {
    S$1(this, "name", "elrond"), S$1(this, "client"), S$1(this, "httpProviders"), S$1(this, "events"), S$1(this, "namespace"), S$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n2 = b$1(e);
      t[n2] = this.createHttpProvider(n2, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var Le = Object.defineProperty, Me = (s, t, e) => t in s ? Le(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, D$1 = (s, t, e) => Me(s, typeof t != "symbol" ? t + "" : t, e);
class xe {
  constructor(t) {
    D$1(this, "name", "multiversx"), D$1(this, "client"), D$1(this, "httpProviders"), D$1(this, "events"), D$1(this, "namespace"), D$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      const n2 = b$1(e);
      t[n2] = this.createHttpProvider(n2, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var Be = Object.defineProperty, Ge = (s, t, e) => t in s ? Be(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, q$1 = (s, t, e) => Ge(s, typeof t != "symbol" ? t + "" : t, e);
class Je {
  constructor(t) {
    q$1(this, "name", "near"), q$1(this, "client"), q$1(this, "httpProviders"), q$1(this, "events"), q$1(this, "namespace"), q$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    if (this.chainId = t, !this.httpProviders[t]) {
      const i2 = e || d3(`${this.name}:${t}`, this.namespace);
      if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i2);
    }
    this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      var i2;
      t[e] = this.createHttpProvider(e, (i2 = this.namespace.rpcMap) == null ? void 0 : i2[e]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace);
    return typeof i2 > "u" ? void 0 : new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var ze = Object.defineProperty, ke2 = (s, t, e) => t in s ? ze(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, j = (s, t, e) => ke2(s, typeof t != "symbol" ? t + "" : t, e);
class We {
  constructor(t) {
    j(this, "name", "tezos"), j(this, "client"), j(this, "httpProviders"), j(this, "events"), j(this, "namespace"), j(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e) {
    if (this.chainId = t, !this.httpProviders[t]) {
      const i2 = e || d3(`${this.name}:${t}`, this.namespace);
      if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i2);
    }
    this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e) => {
      t[e] = this.createHttpProvider(e);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace);
    return typeof i2 > "u" ? void 0 : new o(new f$5(i2));
  }
}
var Ke = Object.defineProperty, Ve = (s, t, e) => t in s ? Ke(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, R$1 = (s, t, e) => Ve(s, typeof t != "symbol" ? t + "" : t, e);
class Xe {
  constructor(t) {
    R$1(this, "name", I$1), R$1(this, "client"), R$1(this, "httpProviders"), R$1(this, "events"), R$1(this, "namespace"), R$1(this, "chainId"), this.namespace = t.namespace, this.events = h2("events"), this.client = h2("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(t.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(t.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(t.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(t.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider(t.chainId).request(t.request);
  }
  setDefaultChain(t, e) {
    this.httpProviders[t] || this.setHttpProvider(t, e), this.chainId = t, this.events.emit(u.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e) => e.split(":")[1] === this.chainId.toString()).map((e) => e.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var t, e;
    const i2 = {};
    return (e = (t = this.namespace) == null ? void 0 : t.accounts) == null || e.forEach((n2) => {
      const a2 = Ne$1(n2);
      i2[`${a2.namespace}:${a2.reference}`] = this.createHttpProvider(n2);
    }), i2;
  }
  getHttpProvider(t) {
    const e = this.httpProviders[t];
    if (typeof e > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e;
  }
  setHttpProvider(t, e) {
    const i2 = this.createHttpProvider(t, e);
    i2 && (this.httpProviders[t] = i2);
  }
  createHttpProvider(t, e) {
    const i2 = e || d3(t, this.namespace, this.client.core.projectId);
    if (!i2) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o(new f$5(i2, h2("disableProviderPing")));
  }
}
var Ye = Object.defineProperty, Qe = Object.defineProperties, Ze = Object.getOwnPropertyDescriptors, It = Object.getOwnPropertySymbols, Te2 = Object.prototype.hasOwnProperty, ts = Object.prototype.propertyIsEnumerable, Y$1 = (s, t, e) => t in s ? Ye(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, x = (s, t) => {
  for (var e in t || (t = {})) Te2.call(t, e) && Y$1(s, e, t[e]);
  if (It) for (var e of It(t)) ts.call(t, e) && Y$1(s, e, t[e]);
  return s;
}, Q$1 = (s, t) => Qe(s, Ze(t)), l = (s, t, e) => Y$1(s, typeof t != "symbol" ? t + "" : t, e);
let B$1 = class B2 {
  constructor(t) {
    l(this, "client"), l(this, "namespaces"), l(this, "optionalNamespaces"), l(this, "sessionProperties"), l(this, "scopedProperties"), l(this, "events", new Nt$2()), l(this, "rpcProviders", {}), l(this, "session"), l(this, "providerOpts"), l(this, "logger"), l(this, "uri"), l(this, "disableProviderPing", false), this.providerOpts = t, this.logger = typeof (t == null ? void 0 : t.logger) < "u" && typeof (t == null ? void 0 : t.logger) != "string" ? t.logger : Ot$1(k$4({ level: (t == null ? void 0 : t.logger) || et$1 })), this.disableProviderPing = (t == null ? void 0 : t.disableProviderPing) || false;
  }
  static async init(t) {
    const e = new B2(t);
    return await e.initialize(), e;
  }
  async request(t, e, i2) {
    const [n2, a2] = this.validateChain(e);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(n2).request({ request: x({}, t), chainId: `${n2}:${a2}`, topic: this.session.topic, expiry: i2 });
  }
  sendAsync(t, e, i2, n2) {
    const a2 = (/* @__PURE__ */ new Date()).getTime();
    this.request(t, i2, n2).then((r2) => e(null, formatJsonRpcResult(a2, r2))).catch((r2) => e(r2, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var t;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (t = this.session) == null ? void 0 : t.topic, reason: Nt$1("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(t) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(t), await this.cleanupPendingPairings(), !t.skipPairing) return await this.pair(t.pairingTopic);
  }
  async authenticate(t, e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(t), await this.cleanupPendingPairings();
    const { uri: i2, response: n2 } = await this.client.authenticate(t, e);
    i2 && (this.uri = i2, this.events.emit("display_uri", i2));
    const a2 = await n2();
    if (this.session = a2.session, this.session) {
      const r2 = gt(this.session.namespaces);
      this.namespaces = M$1(this.namespaces, r2), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return a2;
  }
  on(t, e) {
    this.events.on(t, e);
  }
  once(t, e) {
    this.events.once(t, e);
  }
  removeListener(t, e) {
    this.events.removeListener(t, e);
  }
  off(t, e) {
    this.events.off(t, e);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(t) {
    const { uri: e, approval: i2 } = await this.client.connect({ pairingTopic: t, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    e && (this.uri = e, this.events.emit("display_uri", e));
    const n2 = await i2();
    this.session = n2;
    const a2 = gt(n2.namespaces);
    return this.namespaces = M$1(this.namespaces, a2), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(t, e) {
    try {
      if (!this.session) return;
      const [i2, n2] = this.validateChain(t), a2 = this.getProvider(i2);
      a2.name === I$1 ? a2.setDefaultChain(`${i2}:${n2}`, e) : a2.setDefaultChain(n2, e);
    } catch (i2) {
      if (!/Please call connect/.test(i2.message)) throw i2;
    }
  }
  async cleanupPendingPairings(t = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const e = this.client.pairing.getAll();
    if (se$2(e)) {
      for (const i2 of e) t.deletePairings ? this.client.core.expirer.set(i2.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i2.topic);
      this.logger.info(`Inactive pairings cleared: ${e.length}`);
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    var t, e;
    if (this.client = this.providerOpts.client || await Ee$1.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || et$1, relayUrl: this.providerOpts.relayUrl || St2, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (i2) {
      throw this.logger.error("Failed to get session", i2), new Error(`The provided session: ${(e = (t = this.providerOpts) == null ? void 0 : t.session) == null ? void 0 : e.topic} doesn't exist in the Sign client`);
    }
    else {
      const i2 = this.client.session.getAll();
      this.session = i2[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const t = [...new Set(Object.keys(this.session.namespaces).map((e) => yo$1(e)))];
    V$1("client", this.client), V$1("events", this.events), V$1("disableProviderPing", this.disableProviderPing), t.forEach((e) => {
      if (!this.session) return;
      const i2 = le(e, this.session), n2 = ft(i2), a2 = M$1(this.namespaces, this.optionalNamespaces), r2 = Q$1(x({}, a2[e]), { accounts: i2, chains: n2 });
      switch (e) {
        case "eip155":
          this.rpcProviders[e] = new Ie({ namespace: r2 });
          break;
        case "algorand":
          this.rpcProviders[e] = new De({ namespace: r2 });
          break;
        case "solana":
          this.rpcProviders[e] = new Ae({ namespace: r2 });
          break;
        case "cosmos":
          this.rpcProviders[e] = new Ee2({ namespace: r2 });
          break;
        case "polkadot":
          this.rpcProviders[e] = new ve({ namespace: r2 });
          break;
        case "cip34":
          this.rpcProviders[e] = new Re({ namespace: r2 });
          break;
        case "elrond":
          this.rpcProviders[e] = new Fe({ namespace: r2 });
          break;
        case "multiversx":
          this.rpcProviders[e] = new xe({ namespace: r2 });
          break;
        case "near":
          this.rpcProviders[e] = new Je({ namespace: r2 });
          break;
        case "tezos":
          this.rpcProviders[e] = new We({ namespace: r2 });
          break;
        default:
          this.rpcProviders[I$1] ? this.rpcProviders[I$1].updateNamespace(r2) : this.rpcProviders[I$1] = new Xe({ namespace: r2 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (t) => {
      var e;
      const { topic: i2 } = t;
      i2 === ((e = this.session) == null ? void 0 : e.topic) && this.events.emit("session_ping", t);
    }), this.client.on("session_event", (t) => {
      var e;
      const { params: i2, topic: n2 } = t;
      if (n2 !== ((e = this.session) == null ? void 0 : e.topic)) return;
      const { event: a2 } = i2;
      if (a2.name === "accountsChanged") {
        const r2 = a2.data;
        r2 && se$2(r2) && this.events.emit("accountsChanged", r2.map(vt));
      } else if (a2.name === "chainChanged") {
        const r2 = i2.chainId, c2 = i2.event.data, o2 = yo$1(r2), m3 = K$1(r2) !== K$1(c2) ? `${o2}:${K$1(c2)}` : r2;
        this.onChainChanged(m3);
      } else this.events.emit(a2.name, a2.data);
      this.events.emit("session_event", t);
    }), this.client.on("session_update", ({ topic: t, params: e }) => {
      var i2, n2;
      if (t !== ((i2 = this.session) == null ? void 0 : i2.topic)) return;
      const { namespaces: a2 } = e, r2 = (n2 = this.client) == null ? void 0 : n2.session.get(t);
      this.session = Q$1(x({}, r2), { namespaces: a2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: t, params: e });
    }), this.client.on("session_delete", async (t) => {
      var e;
      t.topic === ((e = this.session) == null ? void 0 : e.topic) && (await this.cleanup(), this.events.emit("session_delete", t), this.events.emit("disconnect", Q$1(x({}, Nt$1("USER_DISCONNECTED")), { data: t.topic })));
    }), this.on(u.DEFAULT_CHAIN_CHANGED, (t) => {
      this.onChainChanged(t, true);
    });
  }
  getProvider(t) {
    return this.rpcProviders[t] || this.rpcProviders[I$1];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((t) => {
      var e;
      this.getProvider(t).updateNamespace((e = this.session) == null ? void 0 : e.namespaces[t]);
    });
  }
  setNamespaces(t) {
    const { namespaces: e = {}, optionalNamespaces: i2 = {}, sessionProperties: n2, scopedProperties: a2 } = t;
    this.optionalNamespaces = M$1(e, i2), this.sessionProperties = n2, this.scopedProperties = a2;
  }
  validateChain(t) {
    const [e, i2] = (t == null ? void 0 : t.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [e, i2];
    if (e && !Object.keys(this.namespaces || {}).map((r2) => yo$1(r2)).includes(e)) throw new Error(`Namespace '${e}' is not configured. Please call connect() first with namespace config.`);
    if (e && i2) return [e, i2];
    const n2 = yo$1(Object.keys(this.namespaces)[0]), a2 = this.rpcProviders[n2].getDefaultChain();
    return [n2, a2];
  }
  async requestAccounts() {
    const [t] = this.validateChain();
    return await this.getProvider(t).requestAccounts();
  }
  async onChainChanged(t, e = false) {
    if (!this.namespaces) return;
    const [i2, n2] = this.validateChain(t);
    if (!n2) return;
    this.updateNamespaceChain(i2, n2), this.events.emit("chainChanged", n2);
    const a2 = this.getProvider(i2).getDefaultChain();
    e || this.getProvider(i2).setDefaultChain(n2), this.emitAccountsChangedOnChainChange({ namespace: i2, previousChainId: a2, newChainId: t }), await this.persist("namespaces", this.namespaces);
  }
  emitAccountsChangedOnChainChange({ namespace: t, previousChainId: e, newChainId: i2 }) {
    var n2, a2;
    try {
      if (e === i2) return;
      const r2 = (a2 = (n2 = this.session) == null ? void 0 : n2.namespaces[t]) == null ? void 0 : a2.accounts;
      if (!r2) return;
      const c2 = r2.filter((o2) => o2.includes(`${i2}:`)).map(vt);
      if (!se$2(c2)) return;
      this.events.emit("accountsChanged", c2);
    } catch (r2) {
      this.logger.warn("Failed to emit accountsChanged on chain change", r2);
    }
  }
  updateNamespaceChain(t, e) {
    if (!this.namespaces) return;
    const i2 = this.namespaces[t] ? t : `${t}:${e}`, n2 = { chains: [], methods: [], events: [], defaultChain: e };
    this.namespaces[i2] ? this.namespaces[i2] && (this.namespaces[i2].defaultChain = e) : this.namespaces[i2] = n2;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: true }), await this.cleanupStorage();
  }
  async persist(t, e) {
    var i2;
    const n2 = ((i2 = this.session) == null ? void 0 : i2.topic) || "";
    await this.client.core.storage.setItem(`${U$1}/${t}${n2}`, e);
  }
  async getFromStore(t) {
    var e;
    const i2 = ((e = this.session) == null ? void 0 : e.topic) || "";
    return await this.client.core.storage.getItem(`${U$1}/${t}${i2}`);
  }
  async deleteFromStore(t) {
    var e;
    const i2 = ((e = this.session) == null ? void 0 : e.topic) || "";
    await this.client.core.storage.removeItem(`${U$1}/${t}${i2}`);
  }
  async cleanupStorage() {
    var t;
    try {
      if (((t = this.client) == null ? void 0 : t.session.length) > 0) return;
      const e = await this.client.core.storage.getKeys();
      for (const i2 of e) i2.startsWith(U$1) && await this.client.core.storage.removeItem(i2);
    } catch (e) {
      this.logger.warn("Failed to cleanup storage", e);
    }
  }
};
const es = B$1;
const $ = "wc", k = "ethereum_provider", q = `${$}@2:${k}:`, U = "https://rpc.walletconnect.org/v1/", f2 = ["eth_sendTransaction", "personal_sign"], A = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"], C = ["chainChanged", "accountsChanged"], P2 = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"], D = async () => {
  const { createAppKit: s } = await import("./core-DJurDhwI.js").then((n2) => n2.u);
  return s;
};
var z = Object.defineProperty, L2 = Object.defineProperties, K = Object.getOwnPropertyDescriptors, M2 = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, V2 = Object.prototype.propertyIsEnumerable, _ = (s, t, e) => t in s ? z(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, v = (s, t) => {
  for (var e in t || (t = {})) Q.call(t, e) && _(s, e, t[e]);
  if (M2) for (var e of M2(t)) V2.call(t, e) && _(s, e, t[e]);
  return s;
}, w = (s, t) => L2(s, K(t)), p = (s, t, e) => _(s, typeof t != "symbol" ? t + "" : t, e);
function I2(s) {
  return Number(s[0].split(":")[1]);
}
function E(s) {
  return `0x${s.toString(16)}`;
}
function G(s) {
  const { chains: t, optionalChains: e, methods: n2, optionalMethods: i2, events: a2, optionalEvents: o2, rpcMap: u2 } = s;
  if (!se$2(t)) throw new Error("Invalid chains");
  const c2 = { chains: t, methods: n2 || f2, events: a2 || C, rpcMap: v({}, t.length ? { [I2(t)]: u2[I2(t)] } : {}) }, l2 = a2 == null ? void 0 : a2.filter((d4) => !C.includes(d4)), r2 = n2 == null ? void 0 : n2.filter((d4) => !f2.includes(d4));
  if (!e && !o2 && !i2 && !(l2 != null && l2.length) && !(r2 != null && r2.length)) return { required: t.length ? c2 : void 0 };
  const m3 = (l2 == null ? void 0 : l2.length) && (r2 == null ? void 0 : r2.length) || !e, h3 = { chains: [...new Set(m3 ? c2.chains.concat(e || []) : e)], methods: [...new Set(c2.methods.concat(i2 != null && i2.length ? i2 : A))], events: [...new Set(c2.events.concat(o2 != null && o2.length ? o2 : P2))], rpcMap: u2 };
  return { required: t.length ? c2 : void 0, optional: e.length ? h3 : void 0 };
}
class b {
  constructor() {
    p(this, "events", new events.EventEmitter()), p(this, "namespace", "eip155"), p(this, "accounts", []), p(this, "signer"), p(this, "chainId", 1), p(this, "modal"), p(this, "rpc"), p(this, "STORAGE_KEY", q), p(this, "on", (t, e) => (this.events.on(t, e), this)), p(this, "once", (t, e) => (this.events.once(t, e), this)), p(this, "removeListener", (t, e) => (this.events.removeListener(t, e), this)), p(this, "off", (t, e) => (this.events.off(t, e), this)), p(this, "parseAccount", (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t), this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const e = new b();
    return await e.initialize(t), e;
  }
  async request(t, e) {
    return await this.signer.request(t, this.formatChainId(this.chainId), e);
  }
  sendAsync(t, e, n2) {
    this.signer.sendAsync(t, e, this.formatChainId(this.chainId), n2);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    var e;
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: n2, optional: i2 } = G(this.rpc);
    try {
      const a2 = await new Promise(async (u2, c2) => {
        var l2, r2;
        this.rpc.showQrModal && ((l2 = this.modal) == null || l2.open(), (r2 = this.modal) == null || r2.subscribeState((h3) => {
          !h3.open && !this.signer.session && (this.signer.abortPairingAttempt(), c2(new Error("Connection request reset. Please try again.")));
        }));
        const m3 = t != null && t.scopedProperties ? { [this.namespace]: t.scopedProperties } : void 0;
        await this.signer.connect(w(v({ namespaces: v({}, n2 && { [this.namespace]: n2 }) }, i2 && { optionalNamespaces: { [this.namespace]: i2 } }), { pairingTopic: t == null ? void 0 : t.pairingTopic, scopedProperties: m3 })).then((h3) => {
          u2(h3);
        }).catch((h3) => {
          var d4;
          (d4 = this.modal) == null || d4.showErrorMessage("Unable to connect"), c2(new Error(h3.message));
        });
      });
      if (!a2) return;
      const o2 = Ko$1(a2.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o2), this.setAccounts(o2), this.events.emit("connect", { chainId: E(this.chainId) });
    } catch (a2) {
      throw this.signer.logger.error(a2), a2;
    } finally {
      (e = this.modal) == null || e.close();
    }
  }
  async authenticate(t, e) {
    var n2;
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: t == null ? void 0 : t.chains });
    try {
      const i2 = await new Promise(async (o2, u2) => {
        var c2, l2;
        this.rpc.showQrModal && ((c2 = this.modal) == null || c2.open(), (l2 = this.modal) == null || l2.subscribeState((r2) => {
          !r2.open && !this.signer.session && (this.signer.abortPairingAttempt(), u2(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(w(v({}, t), { chains: this.rpc.chains }), e).then((r2) => {
          o2(r2);
        }).catch((r2) => {
          var m3;
          (m3 = this.modal) == null || m3.showErrorMessage("Unable to connect"), u2(new Error(r2.message));
        });
      }), a2 = i2.session;
      if (a2) {
        const o2 = Ko$1(a2.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o2), this.setAccounts(o2), this.events.emit("connect", { chainId: E(this.chainId) });
      }
      return i2;
    } catch (i2) {
      throw this.signer.logger.error(i2), i2;
    } finally {
      (n2 = this.modal) == null || n2.close();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: e } = t, { event: n2 } = e;
      n2.name === "accountsChanged" ? (this.accounts = this.parseAccounts(n2.data), this.events.emit("accountsChanged", this.accounts)) : n2.name === "chainChanged" ? this.setChainId(this.formatChainId(n2.data)) : this.events.emit(n2.name, n2.data), this.events.emit("session_event", t);
    }), this.signer.on("accountsChanged", (t) => {
      this.accounts = this.parseAccounts(t), this.events.emit("accountsChanged", this.accounts);
    }), this.signer.on("chainChanged", (t) => {
      const e = parseInt(t);
      this.chainId = e, this.events.emit("chainChanged", E(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", w(v({}, Nt$1("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const e = t.filter((n2) => this.isCompatibleChainId(n2)).map((n2) => this.parseChainId(n2));
    e.length && (this.chainId = e[0], this.events.emit("chainChanged", E(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const e = this.parseChainId(t);
      this.chainId = e, this.switchEthereumChain(e);
    }
  }
  parseAccountId(t) {
    const [e, n2, i2] = t.split(":");
    return { chainId: `${e}:${n2}`, address: i2 };
  }
  setAccounts(t) {
    this.accounts = t.filter((e) => this.parseChainId(this.parseAccountId(e).chainId) === this.chainId).map((e) => this.parseAccountId(e).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var e, n2;
    const i2 = (e = t == null ? void 0 : t.chains) != null ? e : [], a2 = (n2 = t == null ? void 0 : t.optionalChains) != null ? n2 : [], o2 = i2.concat(a2);
    if (!o2.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
    const u2 = i2.length ? (t == null ? void 0 : t.methods) || f2 : [], c2 = i2.length ? (t == null ? void 0 : t.events) || C : [], l2 = (t == null ? void 0 : t.optionalMethods) || [], r2 = (t == null ? void 0 : t.optionalEvents) || [], m3 = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(o2, t.projectId), h3 = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: i2 == null ? void 0 : i2.map((d4) => this.formatChainId(d4)), optionalChains: a2.map((d4) => this.formatChainId(d4)), methods: u2, events: c2, optionalMethods: l2, optionalEvents: r2, rpcMap: m3, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: h3, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, e) {
    const n2 = {};
    return t.forEach((i2) => {
      n2[i2] = this.getRpcUrl(i2, e);
    }), n2;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? I2(this.rpc.chains) : I2(this.rpc.optionalChains), this.signer = await es.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storage: t.storage, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled, logger: t.logger }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let e;
      try {
        const n2 = await D(), { convertWCMToAppKitOptions: i2 } = await Promise.resolve().then(function() {
          return nt;
        }), a2 = i2(w(v({}, this.rpc.qrModalOptions), { chains: [.../* @__PURE__ */ new Set([...this.rpc.chains, ...this.rpc.optionalChains])], metadata: this.rpc.metadata, projectId: this.rpc.projectId }));
        if (!a2.networks.length) throw new Error("No networks found for WalletConnect·");
        e = n2(w(v({}, a2), { universalProvider: this.signer, manualWCControl: true }));
      } catch (n2) {
        throw console.warn(n2), new Error("To use QR modal, please install @reown/appkit package");
      }
      if (e) try {
        this.modal = e;
      } catch (n2) {
        throw this.signer.logger.error(n2), new Error("Could not generate WalletConnectModal Instance");
      }
    }
  }
  loadConnectOpts(t) {
    if (!t) return;
    const { chains: e, optionalChains: n2, rpcMap: i2 } = t;
    e && se$2(e) && (this.rpc.chains = e.map((a2) => this.formatChainId(a2)), e.forEach((a2) => {
      this.rpc.rpcMap[a2] = (i2 == null ? void 0 : i2[a2]) || this.getRpcUrl(a2);
    })), n2 && se$2(n2) && (this.rpc.optionalChains = [], this.rpc.optionalChains = n2 == null ? void 0 : n2.map((a2) => this.formatChainId(a2)), n2.forEach((a2) => {
      this.rpc.rpcMap[a2] = (i2 == null ? void 0 : i2[a2]) || this.getRpcUrl(a2);
    }));
  }
  getRpcUrl(t, e) {
    var n2;
    return ((n2 = this.rpc.rpcMap) == null ? void 0 : n2[t]) || `${U}?chainId=eip155:${t}&projectId=${e || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session) try {
      const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), e = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
      this.setChainIds(t ? [this.formatChainId(t)] : e == null ? void 0 : e.accounts), this.setAccounts(e == null ? void 0 : e.accounts);
    } catch (t) {
      this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((e) => this.signer.logger.warn(e));
    }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((e) => this.parseAccount(e));
  }
}
const Y = b;
var H = Object.defineProperty, B3 = Object.defineProperties, F = Object.getOwnPropertyDescriptors, S2 = Object.getOwnPropertySymbols, X = Object.prototype.hasOwnProperty, J2 = Object.prototype.propertyIsEnumerable, T = (s, t, e) => t in s ? H(s, t, { enumerable: true, configurable: true, writable: true, value: e }) : s[t] = e, R2 = (s, t) => {
  for (var e in t || (t = {})) X.call(t, e) && T(s, e, t[e]);
  if (S2) for (var e of S2(t)) J2.call(t, e) && T(s, e, t[e]);
  return s;
}, Z = (s, t) => B3(s, F(t));
function tt(s) {
  if (s) return { "--w3m-font-family": s["--wcm-font-family"], "--w3m-accent": s["--wcm-accent-color"], "--w3m-color-mix": s["--wcm-background-color"], "--w3m-z-index": s["--wcm-z-index"] ? Number(s["--wcm-z-index"]) : void 0, "--w3m-qr-color": s["--wcm-accent-color"], "--w3m-font-size-master": s["--wcm-text-medium-regular-size"], "--w3m-border-radius-master": s["--wcm-container-border-radius"], "--w3m-color-mix-strength": 0 };
}
const et = (s) => {
  const [t, e] = s.split(":");
  return W({ id: e, caipNetworkId: s, chainNamespace: t, name: "", nativeCurrency: { name: "", symbol: "", decimals: 8 }, rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } } });
};
function st(s) {
  var t, e, n2, i2, a2, o2, u2;
  const c2 = (t = s.chains) == null ? void 0 : t.map(et).filter(Boolean);
  if (c2.length === 0) throw new Error("At least one chain must be specified");
  const l2 = c2.find((m3) => {
    var h3;
    return m3.id === ((h3 = s.defaultChain) == null ? void 0 : h3.id);
  }), r2 = { projectId: s.projectId, networks: c2, themeMode: s.themeMode, themeVariables: tt(s.themeVariables), chainImages: s.chainImages, connectorImages: s.walletImages, defaultNetwork: l2, metadata: Z(R2({}, s.metadata), { name: ((e = s.metadata) == null ? void 0 : e.name) || "WalletConnect", description: ((n2 = s.metadata) == null ? void 0 : n2.description) || "Connect to WalletConnect-compatible wallets", url: ((i2 = s.metadata) == null ? void 0 : i2.url) || "https://walletconnect.org", icons: ((a2 = s.metadata) == null ? void 0 : a2.icons) || ["https://walletconnect.org/walletconnect-logo.png"] }), showWallets: true, featuredWalletIds: s.explorerRecommendedWalletIds === "NONE" ? [] : Array.isArray(s.explorerRecommendedWalletIds) ? s.explorerRecommendedWalletIds : [], excludeWalletIds: s.explorerExcludedWalletIds === "ALL" ? [] : Array.isArray(s.explorerExcludedWalletIds) ? s.explorerExcludedWalletIds : [], enableEIP6963: false, enableInjected: false, enableCoinbase: true, enableWalletConnect: true, features: { email: false, socials: false } };
  if ((o2 = s.mobileWallets) != null && o2.length || (u2 = s.desktopWallets) != null && u2.length) {
    const m3 = [...(s.mobileWallets || []).map((g2) => ({ id: g2.id, name: g2.name, links: g2.links })), ...(s.desktopWallets || []).map((g2) => ({ id: g2.id, name: g2.name, links: { native: g2.links.native, universal: g2.links.universal } }))], h3 = [...r2.featuredWalletIds || [], ...r2.excludeWalletIds || []], d4 = m3.filter((g2) => !h3.includes(g2.id));
    d4.length && (r2.customWallets = d4);
  }
  return r2;
}
function W(s) {
  return R2({ formatters: void 0, fees: void 0, serializers: void 0 }, s);
}
var nt = Object.freeze({ __proto__: null, convertWCMToAppKitOptions: st, defineChain: W });
const index_es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EthereumProvider: Y,
  OPTIONAL_EVENTS: P2,
  OPTIONAL_METHODS: A,
  REQUIRED_EVENTS: C,
  REQUIRED_METHODS: f2,
  default: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  A$3 as A,
  E$4 as E,
  Hash as H,
  Ot$1 as O,
  aexists as a,
  aoutput as b,
  createView as c,
  ahash as d,
  abytes as e,
  randomBytes as f,
  concatBytes as g,
  fromString as h,
  toString as i,
  concat as j,
  recoverAddress as k,
  k$4 as l,
  index_es as m,
  rotr as r,
  toBytes as t,
  wrapConstructor as w,
  y$3 as y
};
//# sourceMappingURL=index.es-Dck9cDZL.js.map
