func twoSum(nums []int, target int) []int {
	// 创建一个空 hash 表
	hashMap := make(map[int]int)
	for i, num := range nums {
		if j, ok := hashMap[target-num]; ok {
			return []int{i, j}
		}
		hashMap[num] = i
	}
	return nil
}
