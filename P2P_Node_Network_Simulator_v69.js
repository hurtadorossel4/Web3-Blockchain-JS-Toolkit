// 区块链P2P节点网络模拟器（节点发现/广播区块/同步账本）
class P2PNodeNetwork {
  constructor() {
    this.nodes = new Set();
    this.chain = [];
  }

  // 注册节点
  registerNode(nodeId) {
    this.nodes.add(nodeId);
    return `node_${nodeId} registered`;
  }

  // 广播区块到全网
  broadcastBlock(block) {
    this.chain.push(block);
    return `block broadcasted to ${this.nodes.size} nodes`;
  }

  // 获取节点列表
  getNodeList() {
    return Array.from(this.nodes);
  }
}

const p2p = new P2PNodeNetwork();
p2p.registerNode('node_eth_001');
p2p.registerNode('node_eth_002');
console.log('✅ 节点列表:', p2p.getNodeList());
console.log('✅ 广播结果:', p2p.broadcastBlock({ index:1, hash:'0xabc' }));
module.exports = P2PNodeNetwork;
