function longestConsecutive (nums) {
  const set = new Set()
  let longest = 0

  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i])
  }

  for (const num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num
      let currentLongest = 1

      while (set.has(currentNum + 1)) {
        currentNum += 1
        currentLongest += 1
      }

      longest = Math.max(longest, currentLongest)
    }
  }

  return longest
}
