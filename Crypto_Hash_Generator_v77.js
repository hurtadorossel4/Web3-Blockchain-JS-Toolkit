// 区块链专用多算法哈希生成器（SHA256/SHA512/RIPEMD160）
const crypto = require('crypto');

class CryptoHashGenerator {
  generateSHA256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  generateSHA512(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
  }

  generateRIPEMD160(data) {
    return crypto.createHash('ripemd160').update(data).digest('hex');
  }

  // 双重哈希（区块链标准）
  generateDoubleSHA256(data) {
    const first = this.generateSHA256(data);
    return this.generateSHA256(first);
  }
}

const hashGen = new CryptoHashGenerator();
const testData = 'blockchain_transaction_19283';
console.log('✅ SHA256:', hashGen.generateSHA256(testData));
console.log('✅ 双重SHA256:', hashGen.generateDoubleSHA256(testData));
module.exports = CryptoHashGenerator;
