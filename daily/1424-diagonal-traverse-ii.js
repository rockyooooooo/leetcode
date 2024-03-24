/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var findDiagonalOrder = function(nums) {
  let i = 0
  let j = 0
  let maxJ = 0
  const ans = []

  while (true) {
    let x = i
    let y = j

    while (x >= 0 && y < nums.length) {
      if (!nums[x] || !nums[x][y]) continue
      ans.push(nums[x][y])
      if (y > maxJ) maxJ = y
      x--
      y++
    }

    if (i < nums.length - 1) {
      i++
    }
    else if (i === nums.length - 1) {
      if (!nums[i][j + 1]) break
      j++
      if (j > maxJ) maxJ = j
    }
  }

  return ans
};

console.log(findDiagonalOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
console.log(findDiagonalOrder([[1, 2, 3, 4, 5], [6, 7], [8], [9, 10, 11], [12, 13, 14, 15, 16]]))

// 0, 0
//
// 1, 0
// 0, 1
//
// 2, 0
// 1, 1
// 0, 2
//
// 2, 1
// 1, 2
//
// 2, 2
