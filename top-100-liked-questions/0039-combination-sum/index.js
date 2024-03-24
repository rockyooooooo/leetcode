/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  const combinations = []

  function backtracking (arr = [], sum = 0, idx = 0) {
    if (sum > target) return
    if (sum === target) {
      combinations.push(arr)
    }
    for (let i = idx; i < candidates.length; i++) {
      backtracking([...arr, candidates[i]], sum + candidates[i], i)
    }
  }

  backtracking()
  return combinations
};
