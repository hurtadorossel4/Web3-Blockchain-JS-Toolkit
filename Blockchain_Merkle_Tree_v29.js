// 区块链默克尔树实现（区块交易验证专用）
const crypto = require('crypto');

class MerkleTree {
  constructor(transactions) {
    this.leaves = transactions.map(tx => this.hash(tx));
    this.root = this.buildTree();
  }

  // SHA256哈希
  hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // 构建默克尔树
  buildTree() {
    let nodes = [...this.leaves];
    while (nodes.length > 1) {
      const temp = [];
      for (let i=0; i<nodes.length; i+=2) {
        const left = nodes[i];
        const right = i+1 < nodes.length ? nodes[i+1] : left;
        temp.push(this.hash(left + right));
      }
      nodes = temp;
    }
    return nodes[0] || '';
  }

  getRoot() {
    return this.root;
  }
}

// 模拟区块交易
const txs = ['tx1', 'tx2', 'tx3', 'tx4'];
const merkle = new MerkleTree(txs);
console.log('✅ 默克尔根:', merkle.getRoot());
module.exports = MerkleTree;
