/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const answer = Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    answer[i] = answer[i - 1] * nums[i - 1]
    console.log({ answer })
  }
  let r = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    answer[i] = answer[i] * r
    r *= nums[i]
    console.log({ answer })
  }
  return answer
};

let nums = [2,3,4,5]
console.log({ nums })
console.log(productExceptSelf(nums))
// nums = [-1,1,0,-3,3]
// console.log({ nums })
// console.log(productExceptSelf(nums))
