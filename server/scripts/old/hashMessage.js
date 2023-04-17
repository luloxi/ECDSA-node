const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  // console.log("Message:", message);
  // console.log("Keccak hashed:", keccak256(utf8ToBytes(message)));
  return keccak256(utf8ToBytes(message));
}

// hashMessage("Tucson");

module.exports = hashMessage;
