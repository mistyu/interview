class Solution {
  List<int> twoSum(List<int> nums, int target) {
    // map diff
    Map<int, int> map = {};
    for (int i = 0; i < nums.length; i++) {
      if (map.containsKey(nums[i])) {
        return [map[nums[i]]!, i];
      } else {
        map[target - nums[i]] = i;
      }
    }
    return [];
  }
}
