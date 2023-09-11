func removeDuplicates(nums []int) int {
	res := 1
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[res-1] {
			nums[res] = nums[i]
			res++
		}
	}
	return res
}
