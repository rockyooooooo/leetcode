# [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

#leetcode #medium 

Given an integer array `nums`, return _an array_ `answer` _such that_ `answer[i]` _is equal to the product of all the elements of_ `nums` _except_ `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example 1:**

```
**Input:** nums = [1,2,3,4]
**Output:** [24,12,8,6]
```

**Example 2:**

```
**Input:** nums = [-1,1,0,-3,3]
**Output:** [0,0,9,0,0]
```

**Constraints:**

-   `2 <= nums.length <= 105`
-   `-30 <= nums[i] <= 30`
-   The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

**Follow up:** Can you solve the problem in `O(1)` extra space complexity? (The output array **does not** count as extra space for space complexity analysis.)

---

## 題目意思

把 array 裡面除了自己的數都乘起來。

例如：

```
nums = [2, 3, 4, 5]
answer = [3*4*5, 2*4*5, 2*3*5, 2*3*4]
```

## 解題思路

這我看完題目後沒多久就宣告我一定想不到解法了XD，google 後果然，沒解過應該是不太有機會自己想到怎麼解。（也可能是我太爛）

解法是用兩個 array `L`、`R`，分別從前面跟從後面開始。

從前面開始的 `L` 先在的第一個位置放 `1`（或是做一個跟 `nums` 一樣長的 array 並填滿 `1`），再來就可以從 `nums` 的第二個開始 for loop 了，每次都把 `nums` 跟 `L` 的第 `i` 個數字的**前一個**相乘放到 `L[i]`，以剛剛的例子來看就會得到 `L = [(1), (1)*2, (1*2)*3, (2*3)*4]`。（括號內為 `L[i - 1]` 的值）

從後面開始的 `R` 則是在最後一個位置放 `1`（或是跟 `L` 一樣放滿 `1`），再來從倒數第二個開始往前 for loop，每次把 `nums` 跟 `R` 的第 `i` 個數字的**後一個**相乘放到 `R[i]`，以剛剛的例子來看就會得到 `R = [(1*4*5)*3, (1*5)*4, (1)*5, (1)]`。

最後把 `L` 跟 `R` 相乘：`answer = [3*4*5, 2*4*5, 2*3*5, 2*3*4]`。

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const L = []
  const R = []
  const answer = []
  L[0] = 1
  for (let i = 1; i < nums.length; i++) {
    L[i] = L[i - 1] * nums[i - 1]
  }
  R[nums.length - 1] = 1
  for (let i = nums.length - 2; i >= 0; i--) {
    R[i] = R[i + 1] * nums[i + 1]
  }
  for (let i = 0; i < nums.length; i++) {
    answer[i] = L[i] * R[i]
  }
  return answer
};
```

最後的 follow up 說，可以試試看用 space extra complexity O(1) 來解。

看過上面的解法就大概可以猜到有可以優化的地方，其實根本就不需要額外宣告兩個 array 來存相乘的值，存到 `L` 的值可以直接存進 `answer`，存在 `R` 的值只需要一個 number 就解決了，不需要存成 array，因為我們只需要紀錄從後面一直乘過來會經過的數字（可以觀察上面例子 `L` 跟 `R` 的括號裡的數字）。

```javascript nums={7}
var productExceptSelf = function(nums) {
  const answer = Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    answer[i] = answer[i - 1] * nums[i - 1]
  }
  let r = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    answer[i] = answer[i] * r
    r *= nums[i]
  }
  return answer
};
```

要注意的是第二個 for loop 會有點不太一樣。