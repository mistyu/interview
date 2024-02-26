var maximalSquare = function (matrix) {
  const matrixRowLength = matrix.length
  const matrixColLength = matrix[0].length
  // 记录的最长边
  let max = 0
  if (matrixRowLength === 0) return 0
  // 记录每个位置最长边  索引 1 对应 索引 0
  const memo = new Array(matrixRowLength + 1).fill(0).map(_ => Array(matrixColLength + 1).fill(0))
  for (let row = 1; row <= matrixRowLength; row++) {
    for (let col = 1; col <= matrixColLength; col++) {
      // 如果当前值为 0 说明最长边 是 0
      if (matrix[row - 1][col - 1] === '0') {
        memo[row][col] = 0
      } else {
        // 取对角 左边 右边 的最小值  即是当前位置能组成正方形的最大边
        memo[row][col] = Math.min(memo[row - 1][col - 1], memo[row - 1][col], memo[row][col - 1]) + 1
        // 记录每次的最大边长
        max = Math.max(max, memo[row][col])
      }
    }
  }
  return max * max
};
