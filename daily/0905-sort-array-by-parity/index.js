/**
 * @param {number[]} nums
 * @return {number[]}
 */

// Solution 2: Two pointer, go the same side.
var sortArrayByParity = function(nums) {
  for (
    let readPointer = 0, writePointer = 0;
    readPointer < nums.length;
    readPointer++
  ) {
    if (nums[readPointer] & 1) {
      continue;
    }

    [nums[readPointer], nums[writePointer]] = [
      nums[writePointer],
      nums[readPointer],
    ];
    writePointer++;
  }

  return nums;
};

// Solution 1: Two pointer, go different side.
// var sortArrayByParity = function(nums) {
//   let l = 0;
//   let r = nums.length - 1;
//   while (l < r) {
//     const leftIsEven = nums[l] % 2 === 0;
//     const rightIsOdd = nums[r] % 2 !== 0;
//
//     if (leftIsEven && rightIsOdd) {
//       l++;
//       r--;
//       continue;
//     }
//     if (!leftIsEven && !rightIsOdd) {
//       [nums[r], nums[l]] = [nums[l], nums[r]];
//       l++;
//       r--;
//       continue;
//     }
//     if (leftIsEven && !rightIsOdd) {
//       l++;
//       continue;
//     }
//     if (!leftIsEven && rightIsOdd) {
//       r--;
//       continue;
//     }
//   }
//
//   return nums;
// };

console.log(sortArrayByParity([3, 1, 2, 4]));
console.log(sortArrayByParity([0]));
