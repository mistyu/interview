func getMax(num1 int, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}

func canJump(nums []int) bool {
	jumpDistance := 0

	for i := 0; i <= jumpDistance; i++ {
		if i + nums[i] >= len(nums) - 1 {
			return true
		}
		jumpDistance = getMax(jumpDistance, i + nums[i])
	}

	return false
}
