func exchange(nums []int) []int {
	left := 0
	right := len(nums) - 1
	res := make([]int, len(nums))

	for i := 0; i < len(nums); i++ {
		if (nums[i] % 2 == 1) {
			res[left] = nums[i]
			left++
		} else {
			res[right] = nums[i]
			right--
		}
	}

	return res
}
