const findContinuousSequence = target => {
	if (target === 1) return [[1]]
	const continuousSequence = []

	let left = 1
	let right = 1
	let sum = 1

	while (right <= Math.ceil(target / 2)) {
		if (sum < target) {
			right++
			sum += right
		} else if (sum > target) {
			sum -= left
			left++
		} else {
			// 符合的数组
			const sequence = []
			for (let i = left; i <= right; i++) {
				sequence.push(i)
			}
			continuousSequence.push(sequence)
			sum -= left
			left++
			right++
			sum += right
		}
	}
	return continuousSequence
}
