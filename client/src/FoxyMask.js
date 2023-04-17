import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

/**
 * WALLET PROTOTYPE
 * Stores private keys safely (hopefully behind a password or 2FA)
 * Gives access to public key/address
 * Keys are stored in hexadecimal format.
 */

// List of account keys in hexa format without the '0x'
const ACCOUNT_KEYS = new Map([
  [
    "Alakazam",
    {
      private:
        "f37a3b807ceadf05c52a1a83b36b98913e6b7c61d0da1f3b7d30c458ea782308",
      public:
        "0250acb1d24b74d83199e3c4f0d43896f2418fbd7b64340d85a24896a8b93ab07a",
    },
  ],
  [
    "Bellsprout",
    {
      private:
        "52278765384b1b51460b31210a4151e35ed9d5b8141628e369661ae88a517e2a",
      public:
        "039ce157e8aa3ade5cf5c698608bc1fdb4818e289312b04a3476af0b5f7c0a54f6",
    },
  ],
  [
    "Charmeleon",
    {
      private:
        "1844507cbad56e23db7b9ff36080648e9977eb28ad42ffee6e3f544d91473856",
      public:
        "03d33a1b562712da2b148bc3cfa60041db3eafe7b00ae0ae7a81be508d56297264",
    },
  ],
]);

// user names derived from the list of accounts
const USERS = Array.from(ACCOUNT_KEYS.keys());

const hashMessage = (message) => keccak256(Uint8Array.from(message));

// Returns the private key as a Uint8Array.
const getPrivateKey = (user) => {
  if (!user) return null;
  return hexToBytes(ACCOUNT_KEYS.get(user).private);
};

// Returns the public key as a Uint8Array.
const getPublicKey = (user) => {
  if (!user) return null;
  return hexToBytes(ACCOUNT_KEYS.get(user).public);
};

// Get and return Ethereum address from the Public Key of a user
const getAddress = (user) => {
  if (!user) return null;
  const pubKey = getPublicKey(user);
  const hash = keccak256(pubKey.slice(1));
  return "0x" + toHex(hash.slice(-20));
};

// Get the public key of a user in Uppercase Hex format
// Necessary? Where is it used?
const getHexPubKey = (user) => {
  if (!user) return null;
  return toHex(getPublicKey(user)).toUpperCase();
};

// Sign a message, by entering a user and a message
// Returns a signature in hex format with the recovery bit as the first byte
const sign = async (username, message) => {
  const privateKey = getPrivateKey(username);
  const hash = hashMessage(message);

  const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
    recovered: true,
  });

  const fullSignature = new Uint8Array([recoveryBit, ...signature]);
  // console.log(toHex(fullSignature));
  return toHex(fullSignature);
};

const FoxyMask = {
  USERS,
  sign,
  getAddress,
  getHexPubKey,
};
export default FoxyMask;
