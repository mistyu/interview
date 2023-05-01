func reverse(x int) int {
	y := x
	res := 0
	for y != 0 {
		res = res * 10 + y % 10
		y = int(y / 10)
	}
	// 处理边界
	if res < math.MinInt32 || res > math.MaxInt32 {
		return 0
	}
	return res
}