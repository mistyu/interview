func getMaxNum (num1 int, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}
// 每个位置的最大值 = (右边大最后一个大于等于当前位置索引 - 左边最后一个大于等于当前位置索引) * 当前位置值
func largestRectangleArea(heights []int) int {
	n := len(heights)
	left, right := make([]int, n), make([]int, n)
	stack := []int{}

	for i := 0; i < n; i++ {
		for len(stack) > 0 && heights[stack[len(stack)-1]] >= heights[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) == 0 {
			left[i] = -1
		} else {
			left[i] = stack[len(stack)-1]
		}
		stack = append(stack, i)
	}

	stack = []int{}

	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && heights[stack[len(stack)-1]] >= heights[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) == 0 {
			right[i] = n
		} else {
			right[i] = stack[len(stack)-1]
		}
		stack = append(stack, i)
	}

	maxArea := 0

	for i := 0; i < n; i++ {
		maxArea = getMaxNum(maxArea, (right[i] - left[i] - 1) * heights[i])
	}

	return maxArea
}
