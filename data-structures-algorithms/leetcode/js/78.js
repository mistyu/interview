function subsets (nums) {
  const res = [[]]

  const dfs = (arr, i) => {
    res.push(arr)
    // 说明结束了，不需要在 dfs 了
    if (i === nums.length) {
      return
    }
    for (let j = i + 1; j < nums.length; j++) {
      dfs([...arr, nums[j]], j)
    }
  }

  for (let i = 0; i < nums.length; i++) {
    dfs([nums[i]], i)
  }

  return res
}
