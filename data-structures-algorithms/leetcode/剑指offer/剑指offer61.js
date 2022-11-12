function isStraight (nums) {
	const set = new Set()
	let min = 14
	let max = 0

	for (num of nums) {
		if (num === 0) continue
	
		max = Math.max(num, max)
		min = Math.min(num, min)

		if (set.has(num)) {
			return false
		}

		set.add(num)
	}

	return max - min < 5
}
