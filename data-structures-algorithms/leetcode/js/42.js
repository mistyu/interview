function trap(height) {
  const stack = []
  let totalWater = 0

  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop()
			// 如果左边没有了则收集不到雨水
      if (!stack.length) {
        continue
      }
      const left = stack[stack.length - 1]
      const currentWidth = i - left - 1
      const currentHeight = Math.min(height[left], height[i]) - height[top]
      totalWater += currentHeight * currentWidth
    }

    stack.push(i)
  }

  return totalWater
}
