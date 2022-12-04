[Two Sum](https://leetcode.com/problems/two-sum/)

第一天的 leetcode 系列，先小試身手，從最簡單經典的 Two Sum 開始做做看。
之前就有解過這題，那次解完之後實在不知道還可以怎麼解比較好，於是就偷看了別人的答案。
沒想到還記得，所以稍微想了一下，測試完沒問題就直接 Submit 了。

最基礎解法：
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j]
    }
  }
};
```
沒什麼特別的，就是把 `nums` 直接雙層 for loop 過去。
但這個解法的時間複雜度是 $O(N^2)$

$O(N)$解法
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const hashTable = {}
  for (let i = 0; i < nums.length; i++) {
    if (hashTable.hasOwnProperty(nums[i])) return [i, hashTable[nums[i]]]
    hashTable[target - nums[i]] = i
  }
};
```
策略是，把 for loop 過的 element 所需要的對應數字記下來，當 loop 到那個數字的時候，就表示找到答案了。
例如：
```
Input: nums = [2, 5, 7, 11], target = 9
```
### i = 0
`nums[0] = 2`
`target - 2 = 7`
把 7 跟這個 index 記錄起來
```
hashTable = {
  7: 0
}
```
### i = 1
`nums[1] = 5`
找 hashTable 裡面有沒有 5 這個 key，沒找到，表示前面找過的數字沒有一個加 5 會等於 `target` 的。
`target - 5 = 4`
繼續加入 hashTable，此時 hashTable 長這樣：
```javascript
hashTable = {
  7: 0,
  4: 1
}
```
### i = 2
`nums[2] = 7`
找 hashTable 裡面有沒有 7 這個 key，有找到，表示前面第 0 個 element 可以跟他配對，所以答案是 `[0, 2]`