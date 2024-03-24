/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// My solution
// var permute = function(nums) {
//   if (nums.length === 1) return [nums]
//   const result = []
//   for (let i = 0; i < nums.length; i++) {
//     // 把從 i 之後的數丟進 `permute` 再遞迴一次
//     const numsClone = [...nums]
//     numsClone.splice(i, 1)
//     const permutations = permute(numsClone)
//     // loop permute 回來的結果，把 nums[i] 放在 permutations[j] 的最前面或最後面
//     for (let j = 0; j < permutations.length; j++) {
//       result.push([...permutations[j], nums[i]])
//     }
//   }
//   return result
// }

// from leetcode 1st place
var permute = function(nums) {
  const result = []
  findPermutes(nums,[],0,result)
  return result
}

function findPermutes(nums, currentPerm, index, result){
  if (currentPerm.length === nums.length){
    result.push(currentPerm)
  } else {
    for(let i = 0; i < currentPerm.length + 1; i++){
      let copyPerm = currentPerm.slice(0)
      copyPerm.splice(i, 0, nums[index])
      findPermutes(nums, copyPerm, index + 1, result)
    }
  }
}

console.log(permute([1, 2, 3]))
