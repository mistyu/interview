var maxProfit = function(prices) {
  const len = prices.length
  
  const maxProfitDp = new Array(len).fill(0).map(() => new Array(3).fill(0))
  // 有股票的最大收益
  maxProfitDp[0][0] = -prices[0]
  for (let i = 1; i < len; i++) {
    maxProfitDp[i][0] = Math.max(maxProfitDp[i - 1][0], maxProfitDp[i - 1][2] - prices[i])
    // 没有股票在冷冻期的最大收益
    maxProfitDp[i][1] = maxProfitDp[i - 1][0] + prices[i]
    // 没有股票不在冷冻期的最大收益
    maxProfitDp[i][2] = Math.max(maxProfitDp[i - 1][2], maxProfitDp[i - 1][1])
  }

  return Math.max(maxProfitDp[len - 1][1], maxProfitDp[len - 1][2])
}
