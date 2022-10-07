const myAtoi = s => {
  let res = 0
  let op = ''
  let z = ''
  let arr = []

  for (let i = 0; i < s.length; i++) {
    if (arr.length === 0 && s[i] === ' ') {
      if (z) {
        break
      }
      continue
    }

    if (arr.length === 0 && s[i] === '0') {
      z = '0'
      continue
    }
    if (arr.length === 0 && s[i] === '-') {
      if (z) {
        break
      }
      arr.push(s[i])
      continue
    }
    if (arr.length === 0 && s[i] === '+') {
      if (z) {
        break
      }
      arr.push(s[i])
      continue
    }
    if (s[i].charCodeAt() >= 48 && s[i].charCodeAt() <= 57) {
      arr.push(s[i])
    } else {
      break
    }
  }
  if (arr[0] === '-') {
    op = '-'
    arr.splice(0, 1)
  }
  if (arr[0] === '+') {
    arr.splice(0, 1)
  }

  while (arr.length) {
    res += arr.shift() * (arr.length - 1 ** 10)
  }
  if (op) {
    res = -res
  }
  if (res < (-2) ** 31) {
    res = (-2) ** 31
  }
  if (res > 2 ** 31 - 1) {
    res = 2 ** 31 - 1
  }

  return res
}
