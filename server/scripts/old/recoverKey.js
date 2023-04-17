const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
  let hashedMessage = hashMessage(message);
  return secp256k1.recoverPublicKey(hashedMessage, signature, recoveryBit);
}

module.exports = recoverKey;
