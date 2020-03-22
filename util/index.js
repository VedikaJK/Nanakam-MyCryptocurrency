const EC = require('elliptic').ec;
const sha256 = require('./sha-256');

const ec = new EC('secp256k1');

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

  return keyFromPublic.verify(sha256(data), signature);
};

module.exports = { ec, verifySignature, sha256 };