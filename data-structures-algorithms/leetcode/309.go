func getMaxNum(num1 int, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}

func maxProfit(prices []int) int {
	length := len(prices)
	if length == 1 {
		return 0
	}
	memo := make([][3]int, length)
	memo[0][0] = -prices[0]

	for i := 1; i < length; i++ {
		// 有股票时，最大收益
		memo[i][0] = getMaxNum(memo[i-1][0], memo[i-1][2]-prices[i])
		// 没有股票且在冷冻期，最大收益
		memo[i][1] = memo[i-1][0] + prices[i]
		// 没有股票且不在冷冻期，最大收益
		memo[i][2] = getMaxNum(memo[i-1][1], memo[i-1][2])
	}

	return getMaxNum(memo[length-1][1], memo[length-1][2])
}
