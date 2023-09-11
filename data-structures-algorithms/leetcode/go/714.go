// 贪心
func maxProfit(prices []int, fee int) int {
	profit := 0
	// 最低价格
	minPrice := prices[0] + fee

	for i := 1; i < len(prices); i++ {
		// 卖出的价格 > 买入的价格 + fee 那么就是有得赚
		if prices[i] > minPrice {
			profit += prices[i] - minPrice
			minPrice = prices[i]
			// 上一次的价格 - fee 还大于当前的价格说明可以卖掉上一次的 买入现在的
		} else if prices[i] < minPrice - fee {
			minPrice = prices[i] + fee
		}
	}

	return profit
}
