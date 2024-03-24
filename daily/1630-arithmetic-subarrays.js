/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
var checkArithmeticSubarrays = function(nums, l, r) {
  let gap = null
  let isArithmetic = true
  const ans = []

  for (let n = 0; n < l.length; n++) {
    console.log({ n })
    const arr = nums.slice(l[n], r[n] + 1).sort((a, b) => a - b)
    console.log({ arr })

    for (let idx = 1; idx < arr.length; idx++) {
      const cur = arr[idx]
      const prev = arr[idx - 1]

      if (gap === null) {
        gap = cur - prev
        continue
      }

      if (gap !== cur - prev) {
        isArithmetic = false
        break
      }
    }
    ans.push(isArithmetic)
    gap = null
    isArithmetic = true
  }

  return ans
};

let nums
let l
let r

nums = [4, 6, 5, 9, 3, 7]
l = [0, 0, 2]
r = [2, 3, 5]
console.log(checkArithmeticSubarrays(nums, l, r))

nums = [-12, -9, -3, -12, -6, 15, 20, -25, -20, -15, -10]
l = [0, 1, 6, 4, 8, 7]
r = [4, 4, 9, 7, 9, 10]
console.log(checkArithmeticSubarrays(nums, l, r))
