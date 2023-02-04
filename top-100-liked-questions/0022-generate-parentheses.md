#leetcode #medium 
Given `n` pairs of parentheses, write a function to _generate all combinations of well-formed parentheses_.

**Example 1:**

```
**Input:** n = 3
**Output:** ["((()))","(()())","(())()","()(())","()()()"]
```

**Example 2:**

```
**Input:** n = 1
**Output:** ["()"]
```

**Constraints:**

-   `1 <= n <= 8`

---

## 題目意思
給 n 個 `()`，把所有可能的組合列出來。

## 解題方向
看到這個題目，直覺想到應該也是跟樹有關係，但被有效的 `()` 的規則給制約（放一個 `)` 之前要先有 `(`），於是一直卡著想不出來，索性看了網路上的分享。

看了一眼之後發現，沒錯，的確是樹，只是這個樹的長法要符合有效的 `()` 的規則，所以就寫出來了：

```javascript nums{15}
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
```

我覺得重點在於第 15 行，右邊的數量不能大於左邊，這樣就可以列出所有有效的 `()` 組合。
