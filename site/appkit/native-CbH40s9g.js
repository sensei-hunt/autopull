import { K as global } from "./appkit-DOrUN3iw.js";
function getNativeWebSocket() {
  if (typeof WebSocket !== "undefined")
    return WebSocket;
  if (typeof global.WebSocket !== "undefined")
    return global.WebSocket;
  if (typeof window.WebSocket !== "undefined")
    return window.WebSocket;
  if (typeof self.WebSocket !== "undefined")
    return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}
const WebSocket$1 = getNativeWebSocket();
export {
  WebSocket$1 as WebSocket
};
//# sourceMappingURL=native-CbH40s9g.js.map
