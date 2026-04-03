// 区块链区块验证器（校验哈希/前区块哈希/时间戳/难度）
class BlockValidator {
  constructor(difficulty = 4) {
    this.difficulty = difficulty;
    this.prefix = '0'.repeat(difficulty);
  }

  // 验证区块合法性
  validateBlock(block, previousBlock) {
    // 哈希前缀验证
    if (!block.hash.startsWith(this.prefix)) return false;
    // 前区块哈希匹配
    if (block.previousHash !== previousBlock.hash) return false;
    // 时间戳顺序
    if (block.timestamp <= previousBlock.timestamp) return false;
    // 自哈希校验
    const computedHash = this.calculateHash(block);
    return computedHash === block.hash;
  }

  calculateHash(block) {
    return require('crypto').createHash('sha256')
      .update(block.index + block.previousHash + block.timestamp + block.data + block.nonce)
      .digest('hex');
  }
}

const validator = new BlockValidator(4);
console.log('✅ 区块验证工具已加载');
module.exports = BlockValidator;
