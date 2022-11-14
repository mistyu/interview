function strToInt (str) {
	// 状态机
  let state = 0
  // 0 初始状态
  // 1 符号
  // 2 数字
  // 3 字母
  // 4 结束

  let validateString = ''

  for (let i = 0; i < str.length; i++) {
    
    if (str[i] === ' ') {
      if (state === 0) {
        continue
      } else {
        return getValidateNumber(validateString)
      }
    } else if (str[i] === '+' || str[i] === '-') {
      if (state === 0) {
        validateString += str[i]
        state = 1
      } else {
        return getValidateNumber(validateString)
      }
    } else if (isNaN(str[i])) {
      return getValidateNumber(validateString)
    } else {
      state = 2
      validateString += str[i]
    }
  }
	// 获取有效的返回值
  function getValidateNumber (validateString) {
    const validateNumber = isNaN(Number(validateString)) ? 0 : Number(validateString)
    if (validateNumber < -(2 ** 31)) {
      return -(2 ** 31)
    } else if (validateNumber > 2 ** 31 - 1) {
      return 2 ** 31 - 1
    } else {
      return validateNumber
    }
  }

  return getValidateNumber(validateString)
}
