const lengthOfLongestSubstring = (s) => {
  const set = new Set()
  let res = 0
  let left = 0
  let right = 0

  while (right < s.length) {
    while (set.has(s[right])) {
      set.delete(s[left])
      left++
    }
    set.add(s[right])
    right++
    res = Math.max(set.size, res)
  }
  return res
}
