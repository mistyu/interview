func mySqrt(x int) int {
  left := 0
  right := x
  ans := 0

  for left <= right {
    mid := (right + left) / 2
    product := mid * mid
    if product == x {
        return mid
    } else if product < x {
        left = mid + 1
    } else {
        right = mid - 1
        ans = right
    }
  }

  return ans
}
