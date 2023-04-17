const express = require("express");
const crypto = require("./scripts/crypto");
const { toHex } = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xb5a6ce460803e179545a25befe8d2c977aeb7e66": 100,
  "0xe2090d63852cf572a91242f9be134cfc2ed81cdf": 50,
  "0x3f9aa534329fa1cf5530d95e480bfe00ffec5e2c": 75,
};

const publicKeys = {
  "0xb5a6ce460803e179545a25befe8d2c977aeb7e66":
    "0250acb1d24b74d83199e3c4f0d43896f2418fbd7b64340d85a24896a8b93ab07a",
  "0xe2090d63852cf572a91242f9be134cfc2ed81cdf":
    "039ce157e8aa3ade5cf5c698608bc1fdb4818e289312b04a3476af0b5f7c0a54f6",
  "0x3f9aa534329fa1cf5530d95e480bfe00ffec5e2c":
    "03d33a1b562712da2b148bc3cfa60041db3eafe7b00ae0ae7a81be508d56297264",
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // Get a signature from the client-side application
  const { message, signature } = req.body;
  const { amount, recipient } = message;

  // Recover the public address from the signature and convert it to ethereum address
  const publicKey = crypto.signatureToPublicKey(message, signature);
  const sender = crypto.publicKeyToAddress(publicKey);
  console.log(sender);
  console.log(publicKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    console.log(balances[sender]);
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
