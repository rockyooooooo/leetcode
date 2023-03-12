# [136. Single Number](https://leetcode.com/problems/single-number/)

#leetcode #easy 

Given a **non-empty** array of integers `nums`, every element appears _twice_ except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

```
**Input:** nums = [2,2,1]
**Output:** 1
```

**Example 2:**

```
**Input:** nums = [4,1,2,1,2]
**Output:** 4
```

**Example 3:**

```
**Input:** nums = [1]
**Output:** 1
```

**Constraints:**

-   `1 <= nums.length <= 3 * 104`
-   `-3 * 104 <= nums[i] <= 3 * 104`
-   Each element in the array appears twice except for one element which appears only once.

---

## 題目意思
給一個 array 裡面每個數字都只會出現兩次，有一個數字只會出現一次，找出那個只出現一次的數字。

蠻簡單的，很快就想出來了：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  const candidates = {}
  for (const num of nums) {
    if (candidates[num]) {
      delete candidates[num]
    } else {
      candidates[num] = true
    }
  }
  return Object.keys(candidates)[0]
};
```

用一個 object 把每 loop 過的每個數字都放進去，只要有存在 object 裡面就把它刪掉，最後就只會剩下一個數字，就是我們要的答案。

但看到 `Object.keys(candidates)[0]` 就知道這肯定不是最聰明的方法，於是看了其他人的答案，原來只要利用 XOR 的特性就可以很優雅的解掉這題了：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let temp = 0
    for (let i=0; i<nums.length; i++){
        temp ^= nums[i]
    }
    return temp
};
```

自己對自己做 XOR 運算會得到 0，所以只要對每個數字一路做 XOR 運算，最後就會剩下那個只出現一次的數字了。
