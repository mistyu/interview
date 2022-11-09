const minNumber = nums => {
  return nums.sort((a, b) => {
    const stra = a + ''
    const strb = b + ''
    // 大于 0 的话 b 会在 a 前面；小于 0 的话 a 会在 b 前面
    return (stra + strb) - (strb + stra)
  }).join('')
}
