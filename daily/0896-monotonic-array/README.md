# **[896\. Monotonic Array](https://leetcode.com/problems/monotonic-array/)**

An array is **monotonic** if it is either monotone increasing or monotone decreasing.

An array `nums` is monotone increasing if for all `i <= j`, `nums[i] <= nums[j]`. An array `nums` is monotone decreasing if for all `i <= j`, `nums[i] >= nums[j]`.

Given an integer array `nums`, return `true` *if the given array is monotonic, or* `false` *otherwise*.



**Example 1:**

```
Input: nums = [1,2,2,3]
Output: true

```

**Example 2:**

```
Input: nums = [6,5,4,4]
Output: true

```

**Example 3:**

```
Input: nums = [1,3,2]
Output: false

```



**Constraints:**

- `1 <= nums.length <= 105`

- `-105 <= nums[i] <= 105`



---



也是很直覺的想法：

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function(nums) {
  let isIncreasing = null
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue
    if (isIncreasing === null) {
      isIncreasing = nums[i] > nums[i - 1]
      continue
    }
    if (nums[i] > nums[i - 1] && !isIncreasing) return false
    if (nums[i] < nums[i - 1] && isIncreasing) return false
  }
  return true
};
```



用 `isIncreasing` 來記錄是變大還是變小，然後一個 for loop 跑過去

1. 如果目前這個數字跟前一個數字一樣大，就跳過不用做事

2. 如果 `isIncreasing` 還沒被設定，就按照第一個遇到兩數不同的狀況來設定

3. 再來就看有沒有持續 increasing 或 decreasing 就好了



後來發現不用寫那麼多判斷，一開始就可以先比較第一個數字跟最後一個數字，看有沒有變大或變小，然後在 for loop 裡面只要判斷有沒有保持變大或變小就好：

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function(nums) {
  let isIncreasing = nums[0] < nums[nums.length - 1]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1] && !isIncreasing) return false
    if (nums[i] < nums[i - 1] && isIncreasing) return false
  }
  return true
};
```



看到這樣寫的時候，原本想說如果 array 裡面的數字都一樣，也會過嗎？



仔細想想，一開始 `isIncreasing` 就會是 false，然後在 for loop 裡面的兩個 if 也都不會進去，所以最後 return 的確是 `true` 沒錯。


