func getMaxNum(num1 int, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}

func maxProfit(prices []int) int {
	res := 0
	min := prices[0]

	for i := 1; i < len(prices); i++ {
		if prices[i] <= min {
			min = prices[i]
		} else {
			res = getMaxNum(res, prices[i] - min)
		}
	}

	return res
}
