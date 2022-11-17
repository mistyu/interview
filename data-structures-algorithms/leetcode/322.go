func getMinNum (num1 int, num2 int) int {
	if num1 < num2 {
		return num1
	}
	return num2
}

func coinChange(coins []int, amount int) int {
	dp := make([]int, amount+1)
	// 填充 dp
	for i := 0; i < amount + 1; i++ {
		dp[i] = amount + 1
	}
	// 当 amount 为 0 时，不需要
	dp[0] = 0
	for i := 0; i < amount + 1; i++ {
		for _, coin := range coins {
			// 金额小于零钱 那么找不开继续下一个
			if i - coin < 0 {
				continue
			}
			// 当前金额可以找开的最小个数
			dp[i] = getMinNum(dp[i], 1 + dp[i-coin])
		}
	}
	// fmt.Println(dp)
	// 找不开的情况
	if dp[amount] == amount + 1 {
		return -1
	}
    
	return dp[amount]
}