#leetcode #medium #backtrack #dfs

Given an array of **distinct** integers `candidates` and a target integer `target`, return _a list of all **unique combinations** of_ `candidates` _where the chosen numbers sum to_ `target`_._ You may return the combinations in **any order**.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.

**Example 1:**

```
**Input:** candidates = [2,3,6,7], target = 7
**Output:** [[2,2,3],[7]]
**Explanation:**
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

**Example 2:**

```
**Input:** candidates = [2,3,5], target = 8
**Output:** [[2,2,2,2],[2,3,3],[3,5]]
```

**Example 3:**

```
**Input:** candidates = [2], target = 1
**Output:** []
```

**Constraints:**

-   `1 <= candidates.length <= 30`
-   `2 <= candidates[i] <= 40`
-   All elements of `candidates` are **distinct**.
-   `1 <= target <= 40`

---

## 題目意思

給一個陣列 candidates，裡面的數字不重複，從裡面的數字找出任意組合加起來等於 target，每個數字可以無限次使用，找出所有組合。

第一眼看到就覺得可以用個什麼 dfs 或是 backtrack（雖然我根本不知道 backtrack 是什麼），但是寫半天就是寫不出來，可惡。
最後還是看別人的寫法：

```javascript
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
```

老實說還看不太懂，以後要再研究一下。