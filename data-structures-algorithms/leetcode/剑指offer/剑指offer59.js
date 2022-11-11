const maxSlidingWindow = (nums, k) => {
	const maxNums = []
	const queue = [] // 维护窗口大小的队列，队列中存的数组的索引

	for (let i = 0; i < nums.length; i++) {
		while (queue.length && queue[0] <= i - k) {
			// 超出了窗口数量
			queue.shift()
		}
		// 进来的元素大于等于队尾元素，就弹出队尾元素
		while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
			queue.pop()
		}
		queue.push(i)
		// 从索引 k - 1 开始插入
		if (i >= k - 1) {
			maxNums.push(nums[queue[0]])
		}
	}

	return maxNums
}
