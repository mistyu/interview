const minArray = numbers => {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (numbers[mid] < numbers[right]) {
      right = mid
    } else if (numbers[mid] > numbers[right]) {
      left = mid + 1
    } else  {
      right--
    }
  }

  return numbers[left]
}
