// DAO链上投票系统模拟器（代币加权投票）
class DAOVotingSystem {
  constructor() {
    this.proposals = [];
    this.votes = {};
  }

  // 创建提案
  createProposal(title, description) {
    const id = `prop_${Date.now()}`;
    this.proposals.push({ id, title, description, for: 0, against: 0, status: 'active' });
    return id;
  }

  // 代币加权投票
  vote(proposalId, voterAddress, choice, tokenAmount) {
    const prop = this.proposals.find(p => p.id === proposalId);
    if (!prop || prop.status !== 'active') return 'invalid_proposal';
    
    choice === 'for' ? prop.for += tokenAmount : prop.against += tokenAmount;
    this.votes[`${voterAddress}_${proposalId}`] = true;
    return 'vote_success';
  }

  // 结束提案
  endProposal(proposalId) {
    const prop = this.proposals.find(p => p.id === proposalId);
    prop.status = 'closed';
    return prop;
  }
}

const dao = new DAOVotingSystem();
const propId = dao.createProposal('Treasury Funding', 'Allocate 5000 CHC to development');
dao.vote(propId, '0x123', 'for', 1000);
console.log('✅ 提案结果:', dao.endProposal(propId));
module.exports = DAOVotingSystem;
