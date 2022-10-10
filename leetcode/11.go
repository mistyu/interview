func maxArea(height []int) int {
  left := 0
  right := len(height) - 1
  maxWater := 0

  for left < right {
    if (height[left] < height[right]) {
      if (right - left) * height[left] > maxWater {
        maxWater = (right - left) * height[left]
      }
      left++
    } else {
      if (right - left) * height[right] > maxWater {
        maxWater = (right - left) * height[right]
      }
      right--
    }
  }
  return maxWater
}
