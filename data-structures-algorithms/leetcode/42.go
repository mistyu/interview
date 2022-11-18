func trap(height []int) int {
	left := 0
	right := len(height) - 1
	// 左边最大高度
	leftMax := 0
	// 右边最大高度
	rightMax := 0
	totalWater := 0

	for left < right {
		if height[right] > height[left] {
			if height[left] < leftMax {
				// 该列能够存储的最多水
				totalWater += leftMax - height[left]
			} else {
				leftMax = height[left]
			}
			left++
		} else {
			if height[right] < rightMax {
				// 该列能够存储的最多水
				totalWater += rightMax - height[right]
			} else {
				rightMax = height[right]
			}
			right--
		}
	}

	return totalWater
}