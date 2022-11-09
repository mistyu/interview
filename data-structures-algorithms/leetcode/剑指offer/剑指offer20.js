const isNumber = s => {
	let len = s.length
	let status = 0
	// 0 初始状态
	// 1 符号位
	// 2 整数 合法
	// 3 小数 合法
	// 4 E右边没数字
	// 5 E符号
	// 6 E有右边数字 合法
	// 7 小数右边无数字
	// 8 小数右边有数字 合法

	let i
	for (i = 0; i < len; i++) {
		if (s[i] === '+' || s[i] === '-') { // 只有初始化或者前面有 E 才可以是合法的
			switch (status) {
				case 0:
					status = 1
					break
				case 4:
					status = 5
					break
				default:
					return false
			}
		} else if (s[i] === '.') { // 只有初始化或前面有符号或整数才可以是合法
			switch (status) {
				case 0:
					status = 7
					break
				case 1:
					status = 7
					break
				case 2:
					status = 8
					break
				default:
					return false
			}
		} else if (s[i] === 'e' || s[i] === 'E') {
			switch (status) {
				case 2:
					status = 4
					break
				case 3:
					status = 4
					break
				case 8:
					status = 4
					break
				default:
					return false
			}
		} else if (s[i] === ' ') { // 如果遇到空字符，可以提前退出状态了
			if (status !== 0) {
				break
			}
		} else if (!isNaN(parseInt(s[i]))) {
			switch (status) {
				case 0:
					status = 2
					break
				case 1:
					status = 2
					break
				case 2:
					status = 2
					break
				case 3:
					status = 3
					break
				case 4:
					status = 6
					break
				case 5:
					status = 6
					break
				case 6:
					status = 6
					break
				case 7:
					status = 3
					break
				case 8:
					status = 8
					break
				default:
					return false
			}
		} else {
			return false
		}
	}
	// 剩下都是的如果有非空字符就是不合法的
	while (i < s.length) {
		if (s[i] !== ' ') {
			return false
		}
		i++
	}

	switch (status) {
		case 2:
			return true
		case 3:
			return true
		case 6:
			return true
		case 8:
			return true
		default:
			return false
	}
}
