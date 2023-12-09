/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  const len = ratings.length

  const left = new Array(len).fill(1)
  const right = new Array(len).fill(1)
  let res = 0
  // 先计算从左到右的递增序列
  for (let i = 1; i < len; i++) {
    if (ratings[i] > ratings[i - 1]) {
      left[i] = left[i - 1] + 1
    } else {
      left[i] = 1
    }
  }
  // 从右到左计算递增序列
  for (let i = len - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      right[i] = right[i + 1] + 1
    } else {
      right[i] = 1
    }
  }
  // 取两个数组中的最大值加起来
  for (let i = 0; i < len; i++) {
    res += Math.max(left[i], right[i])
  }

  return res
};