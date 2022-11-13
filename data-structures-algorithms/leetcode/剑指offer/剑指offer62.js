// 约瑟夫环问题
// 比较好的解释  https://blog.csdn.net/u011500062/article/details/72855826

function lastRemaining  (n, m) {
	let start = 0

	for (let i = 2; i <= n; i++) {
		// (i - 1 个人时活着的位置加上 m)% 1 就是 i 个人时活着的位置
		start = (start + m) % i
	}

	return start
}
