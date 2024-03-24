# **[905\. Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity/)**

Given an integer array `nums`, move all the even integers at the beginning of the array followed by all the odd integers.

Return ***any array** that satisfies this condition*.



**Example 1:**

```
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

```

**Example 2:**

```
Input: nums = [0]
Output: [0]

```



**Constraints:**

- `1 <= nums.length <= 5000`

- `0 <= nums[i] <= 5000`



---



不知道為什麼，看到這個題目就突然閃過可以用 two pointer 的想法。



那就直接開始吧。

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const leftIsEven = nums[l] % 2 === 0;
    const rightIsOdd = nums[r] % 2 !== 0;

    if (leftIsEven && rightIsOdd) {
      l++;
      r--;
      continue;
    }
    if (!leftIsEven && !rightIsOdd) {
      [nums[r], nums[l]] = [nums[l], nums[r]];
      l++;
      r--;
      continue;
    }
    if (leftIsEven && !rightIsOdd) {
      l++;
      continue;
    }
    if (!leftIsEven && rightIsOdd) {
      r--;
      continue;
    }
  }

  return nums;
};
```



想法很簡單，從兩個指針分別從 array 的前面跟後面開始走，因為題目要偶數在前半段，奇數在後半段，所以左指針找到奇數就停下來，右指針找到偶數就停下來，當兩個指針都停下來，就把這兩個指針的數字直接交換，直到左右指針碰到對方。



也可以兩指針都在 array 最前面往後面走，`readPointer` 一直往右邊走，遇到偶數就跟 `writePointer` 的數字交換，然後 `writePointer` 往右走一步，`readPointer` 繼續往右走，直到走完整個 array。



```javascript
var sortArrayByParity = function(nums) {
  for (let readPointer = 0, writePointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] % 2 === 0) {
      let temp = nums[readPointer]
      nums[readPointer] = nums[writePointer]
      nums[writePointer] = temp
      writePointer++;
    }
  }

  return nums;
};
```



Time complexity 是 O(n)

Space complexity 是 O(1)，因為直接操作 `nums`，沒有用到額外的空間



另外，判斷奇數偶數的方式除了 `num % 2` 之外，還可以用 bitwise 的方式：`num & 1`，似乎會比較快一點。


