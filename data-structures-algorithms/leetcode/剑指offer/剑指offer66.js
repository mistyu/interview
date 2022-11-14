function constructArr (a) {
	if (a.length === 0) return []
	const b = [1]
	// 先把左边的存下来
	for (let i = 1; i < a.length; i++) {
		b[i] = b[i - 1] * a[i - 1]
	}

	let right = 1
	for (let i = a.length - 1; i >= 0; i--) {
		// 每次都更新乘上右边的数
    b[i] *= right
    right *= a[i]
  }

  return b
}
