/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const ans = []
  const recursive = (left, right, result) => {
    if (left === n && right === n) {
      ans.push(result)
      return
    }
    if (left < n) {
      recursive(left + 1, right, result + '(')
    }
    if (right < left) {
      recursive(left, right + 1, result + ')')
    }
  }

  recursive(0, 0, '')
  return ans
};

console.log(generateParenthesis(3))