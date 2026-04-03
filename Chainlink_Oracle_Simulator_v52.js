// Chainlink预言机模拟器（链下数据上链喂价）
class ChainlinkOracleSimulator {
  constructor() {
    this.feeds = { BTC: 0, ETH: 0, BNB: 0 };
  }

  // 模拟获取加密货币价格
  async fetchPrice(coin = 'ETH') {
    await new Promise(res => setTimeout(res, 200));
    const basePrice = coin === 'BTC' ? 60000 : coin === 'ETH' ? 3000 : 300;
    const price = basePrice + (Math.random() * 500 - 250);
    this.feeds[coin] = price.toFixed(2);
    return {
      coin,
      price: this.feeds[coin],
      timestamp: new Date().toISOString(),
      oracle: 'Chainlink_Simulator'
    };
  }

  // 批量喂价
  async batchFetch() {
    const btc = await this.fetchPrice('BTC');
    const eth = await this.fetchPrice('ETH');
    return [btc, eth];
  }
}

const oracle = new ChainlinkOracleSimulator();
oracle.batchFetch().then(res => console.log('✅ 预言机喂价:', res));
module.exports = ChainlinkOracleSimulator;
