import { k as parseSignature, l as parseStructs, m as isStructSignature, I as InvalidAbiItemError } from "./appkit-DOrUN3iw.js";
function parseAbiItem(signature) {
  let abiItem;
  if (typeof signature === "string")
    abiItem = parseSignature(signature);
  else {
    const structs = parseStructs(signature);
    const length = signature.length;
    for (let i = 0; i < length; i++) {
      const signature_ = signature[i];
      if (isStructSignature(signature_))
        continue;
      abiItem = parseSignature(signature_, structs);
      break;
    }
  }
  if (!abiItem)
    throw new InvalidAbiItemError({ signature });
  return abiItem;
}
export {
  parseAbiItem as p
};
//# sourceMappingURL=parseAbiItem-CnWYfqJJ.js.map
