function largestNumber (nums) {
  nums.sort((x, y) => {
    let sx = 10, sy = 10
    while (sx <= x) {
        sx *= 10
    }
    while (sy <= y) {
        sy *= 10
    }
    // 比较两个数连起来后谁更大
    return (sx * y + x) - (sy * x + y)
  })

  if (nums[0] === 0) {
    return '0'
  }
  
  return nums.join('')
}
