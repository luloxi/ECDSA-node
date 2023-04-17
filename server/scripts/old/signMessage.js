const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function signMessage(msg, privateKey) {
  let msgHash = hashMessage(msg);
  console.log(secp256k1.sign(msgHash, privateKey));
  return secp256k1.sign(msgHash, privateKey);
}

console.log("##########", "User 1 signature", "##########");
signMessage(
  "I'm the owner",
  "f37a3b807ceadf05c52a1a83b36b98913e6b7c61d0da1f3b7d30c458ea782308"
);

console.log("##########", "User 2 signature", "##########");
signMessage(
  "I'm the owner",
  "52278765384b1b51460b31210a4151e35ed9d5b8141628e369661ae88a517e2a"
);

console.log("##########", "User 3 signature", "##########");
signMessage(
  "I'm the owner",
  "1844507cbad56e23db7b9ff36080648e9977eb28ad42ffee6e3f544d91473856"
);

module.exports = signMessage;
