const longestPalindrome = s => {
  if (s.length < 2) return s
  let max = 1
  let res = s[0]
  for (let i = 0; i < s.length; i++) {
    let left = i
    let right = i + 1
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > max) {
        res = s.slice(left, right + 1)
        max = right - left + 1 
      }
      left--
      right++
    }
    left = i
    right = i + 1
    while (left >= 0 && right < s.length && s[left - 1] === s[right]) {
      if (right - (left - 1) + 1 > max) {
        res = s.slice(left - 1, right + 1)
        max = right - (left - 1) + 1 
      }
      left--
      right++
    }
  }
  return res
}