func combinationSum(candidates []int, target int) [][]int {
	combines := make([][]int, 0)

	var dfs func(target int, combine []int, idx int)
	dfs = func (target int, combine []int, idx int) {
		if idx >= len(candidates) || target < 0 {
			return
		}
		if target == 0 {
			combines = append(combines, append([]int(nil), combine...))
			return
		}
		if target - candidates[idx] >= 0 {
			// 数组合并
			dfs(target - candidates[idx], append(combine, candidates[idx]), idx)
		}
		// candidates 可能是无序的
		dfs(target, combine, idx + 1)
	}

	dfs(target, []int{}, 0)

	return combines
}
