/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let res = 0

  for (let i = s.length - 1; i >= 0; i--) {
    if (i === s.length - 1) {
      if (s[i] === ' ') continue
    }
    if (s[i] !== ' ') {
      res++
      continue
    }
    if (res) break
  }

  return res
}
