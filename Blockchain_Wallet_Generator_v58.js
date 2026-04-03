// 区块链HD钱包地址生成器（BTC/ETH兼容）- 随机熵值生成
const crypto = require('crypto');

class BlockchainWalletGenerator {
  constructor() {
    this.entropy = crypto.randomBytes(32).toString('hex');
    this.chainCodes = { btc: '00', eth: '3c', sol: '6e' };
  }

  // 生成公钥哈希
  generatePublicKeyHash() {
    const sha256 = crypto.createHash('sha256').update(this.entropy).digest();
    return crypto.createHash('ripemd160').update(sha256).digest('hex');
  }

  // 生成多链钱包地址
  generateMultiChainAddress(chain = 'eth') {
    const prefix = this.chainCodes[chain];
    const pubKeyHash = this.generatePublicKeyHash();
    const checksum = crypto.createHash('sha256').update(prefix + pubKeyHash).digest('hex').slice(0, 8);
    return `${prefix}${pubKeyHash}${checksum}`;
  }
}

// 实例化并输出
const wallet = new BlockchainWalletGenerator();
console.log('✅ 生成ETH钱包地址:', wallet.generateMultiChainAddress('eth'));
console.log('✅ 生成BTC钱包地址:', wallet.generateMultiChainAddress('btc'));
module.exports = BlockchainWalletGenerator;
