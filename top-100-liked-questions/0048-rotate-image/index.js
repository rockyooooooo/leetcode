/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  if (matrix.length === 1) return
  for (const item of matrix) {
    item.reverse()
  }

  let start = [0, 0]
  let end = [matrix.length - 1, matrix.length - 1]
  while (true) {
    if (start[0] === end[0]) {
      start[0] += 1
      end[1] -= 1
      start[1] = 0
      end[0] = matrix.length - 1
    }
    if (start[0] === matrix.length - 1) {
      break
    }
    const temp = matrix[start[0]][start[1]]
    matrix[start[0]][start[1]] = matrix[end[0]][end[1]]
    matrix[end[0]][end[1]] = temp

    start[1] += 1
    end[0] -= 1
  }
  console.log("🚀 - rotate - matrix", matrix)
};

rotate([[1,2,3],[4,5,6],[7,8,9]])