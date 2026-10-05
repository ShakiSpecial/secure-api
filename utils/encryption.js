const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// Must be exactly 32 characters
const secretKey =
  process.env.AES_SECRET ||
  "12345678901234567890123456789012";

// Must be exactly 16 characters
const iv =
  process.env.AES_IV ||
  "1234567890123456";

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    iv
  );

  let encrypted = cipher.update(
    text,
    "utf8",
    "hex"
  );

  encrypted += cipher.final("hex");

  return encrypted;
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    iv
  );

  let decrypted = decipher.update(
    encryptedText,
    "hex",
    "utf8"
  );

  decrypted += decipher.final("utf8");

  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};