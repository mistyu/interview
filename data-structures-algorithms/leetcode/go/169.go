// 投票法
func majorityElement(nums []int) int {
	count := 1
	num := nums[0]

	for i := 1; i < len(nums); i++ {
		if nums[i] == num {
			count++
		} else {
			count--
		}
		if count == 0 {
			num = nums[i]
			count = 1
		}
	}

	return num
}
