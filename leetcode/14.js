var longestCommonPrefix = function(strs) {
  let shortestStr = strs[0]
  for (let i = 1; i < strs.length; i++) {
    if (shortestStr.length < strs[i].length) {
      shortestStr = strs[i]
    }
  }
  // 判断是否已经存在不同的字符了
  let flag = false
  let res = ''
  for (let i = 0; i < shortestStr.length; i++) {
    // 存在就可以直接退出循环了
    if (flag) break
    res += shortestStr[i]
    for (let j = 0; j < strs.length; j++) {
      if (strs[j] === shortestStr) continue
      if (strs[j][i] !== shortestStr[i]) {
        res = res.substring(0, i)
        flag = true
        break
      }
    }
  }

  return res
}
