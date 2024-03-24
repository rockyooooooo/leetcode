/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function(nums) {
  let isIncreasing = nums[0] < nums[nums.length - 1]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1] && !isIncreasing) return false
    if (nums[i] < nums[i - 1] && isIncreasing) return false
  }
  return true;
};

console.log(isMonotonic([1, 2, 2, 3]));
console.log(isMonotonic([6, 5, 4, 4]));
console.log(isMonotonic([1, 3, 2]));
console.log(isMonotonic([1, 1, 1]));
