func maxNum(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func merge(intervals [][]int) [][]int {
	// 先排序
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	start := intervals[0][0]
	end := intervals[0][1]
	res := [][]int{}

	for i := 1; i < len(intervals); i++ {
		if intervals[i][0] > end {
			res = append(res, []int{start, end})
			start = intervals[i][0]
			end = intervals[i][1]
		} else {
				end = maxNum(end, intervals[i][1])
		}
	}

	// 把最后的推入
	res = append(res, []int{start, end})

	return res
}
