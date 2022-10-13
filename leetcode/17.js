const letterCombinations = digits => {
  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  }
  let res = []

  const dfs = (str, index) => {
    // 累加到最后一个数 可以结束了
    if (index >= digits.length) {
      if (str) {
        res.push(str)
      }
      return
    }
      
    for (const i of map[digits[index]]) {
      dfs(str + i, index + 1) 
    }
  }

  dfs('', 0)

  return res
}
