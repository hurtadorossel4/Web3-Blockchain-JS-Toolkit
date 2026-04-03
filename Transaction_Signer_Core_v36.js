// 区块链交易签名核心工具（ECDSA非对称加密）
const crypto = require('crypto');

class TransactionSigner {
  constructor() {
    this.keyPair = crypto.generateKeyPairSync('ec', { namedCurve: 'secp256k1' });
  }

  // 签名交易
  signTransaction(txData) {
    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(txData));
    sign.end();
    const signature = sign.sign(this.keyPair.privateKey, 'hex');
    return { txData, signature, publicKey: this.keyPair.publicKey.export({type:'spki',format:'hex'}) };
  }

  // 验证签名
  verifySignature(signedTx) {
    const verify = crypto.createVerify('SHA256');
    verify.update(JSON.stringify(signedTx.txData));
    verify.end();
    return verify.verify(signedTx.publicKey, signedTx.signature, 'hex');
  }
}

const signer = new TransactionSigner();
const tx = { from: '0x123...', to: '0x456...', amount: 0.5, nonce: 128 };
const signed = signer.signTransaction(tx);
console.log('✅ 交易签名:', signed);
console.log('✅ 签名验证:', signer.verifySignature(signed));
module.exports = TransactionSigner;
