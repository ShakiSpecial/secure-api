const {
  encrypt,
  decrypt,
} = require("./utils/encryption");

const secret =
  "My final year project is secure";

const encrypted = encrypt(secret);

console.log("Encrypted:");
console.log(encrypted);

console.log("Decrypted:");
console.log(decrypt(encrypted));