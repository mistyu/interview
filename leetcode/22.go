func dfs(left, right int, str string, res *[]string) {
	/* 
		回溯跳出条件，
		并不需要判断左括号是否用完，因为右括号生成的条件 right > left ，
		所以右括号用完了就意味着左括号必定用完了
	*/ 
	if right == 0 {
		*res = append(*res, str)
		return
	}
	// 生成左括号
	if left > 0 {
		dfs(left - 1, right, str + "(", res)
	}

	// 括号成对存在，有左括号才会有右括号
	if right > left {
		dfs(left, right - 1, str + ")", res)
	}
}

func generateParenthesis(n int) []string {
	// 使用new方法开辟内存返回内存地址
	// res := new([]string)
	res := make([]string, 0)
	dfs(n, n, "", &res)

	return res
}
