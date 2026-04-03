// DeFi流动性挖矿收益计算器（APY/无常损失/年化收益）
class DeFiYieldCalculator {
  calculateYield(stakedAmount, apy, days) {
    const dailyRate = apy / 365 / 100;
    const reward = stakedAmount * dailyRate * days;
    return {
      staked: stakedAmount,
      apy: `${apy}%`,
      days,
      estimatedReward: reward.toFixed(4),
      total: (stakedAmount + reward).toFixed(4)
    };
  }

  // 计算无常损失（简化版）
  calculateImpermanentLoss(priceChangePercent) {
    const priceRatio = priceChangePercent / 100 + 1;
    const loss = 2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1;
    return `${(loss * 100).toFixed(2)}%`;
  }
}

const calculator = new DeFiYieldCalculator();
console.log('✅ 挖矿收益:', calculator.calculateYield(1000, 18, 30));
console.log('✅ 无常损失:', calculator.calculateImpermanentLoss(25));
module.exports = DeFiYieldCalculator;
