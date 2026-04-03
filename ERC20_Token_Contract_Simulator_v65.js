// ERC20代币合约模拟器（增发/转账/余额查询全功能）
class ERC20TokenSimulator {
  constructor(name, symbol, totalSupply) {
    this.name = name;
    this.symbol = symbol;
    this.totalSupply = totalSupply;
    this.balances = {};
    this.allowance = {};
  }

  // 转账
  transfer(from, to, amount) {
    if (this.balances[from] < amount) return 'insufficient_balance';
    this.balances[from] -= amount;
    this.balances[to] = (this.balances[to] || 0) + amount;
    return 'transfer_success';
  }

  // 增发代币
  mint(address, amount) {
    this.balances[address] = (this.balances[address] || 0) + amount;
    this.totalSupply += amount;
    return `minted ${amount} ${this.symbol}`;
  }

  // 查询余额
  balanceOf(address) {
    return this.balances[address] || 0;
  }
}

const token = new ERC20TokenSimulator('ChainCoin', 'CHC', 1000000);
token.mint('0x123', 5000);
console.log('✅ 余额:', token.balanceOf('0x123'));
module.exports = ERC20TokenSimulator;
