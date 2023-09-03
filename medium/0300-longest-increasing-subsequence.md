# [300\. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)

Given an integer array `nums`, return *the length of the longest **strictly increasing***

***subsequence***.



**Example 1:**

```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

```

**Example 2:**

```
Input: nums = [0,1,0,3,2,3]
Output: 4

```

**Example 3:**

```
Input: nums = [7,7,7,7,7,7,7]
Output: 1

```



**Constraints:**

- `1 <= nums.length <= 2500`

- `-104 <= nums[i] <= 104`



**Follow up:** Can you come up with an algorithm that runs in `O(n log(n))` time complexity?



---



找這題來做是因為之前生菜問了一個題目：

```javascript
// Description:
//   給一個 array of number，找出最長的 subarray，而且這個 array 要是嚴格遞增的
// Example:
//   Input: [1, 1, 6, 2, 3]
//   Output: [1, 2, 3]
// Explain: 
//   嚴格遞增是每個數字都要比前一個大，符合這項條件的有：
//   [1, 6]、[1, 2]、[1, 2, 3]、[1, 3]、[2, 3]
//   其中最長的是 [1, 2, 3]
```



想到之前做過的一題 [78\. Subsets](https://leetcode.com/problems/subsets/)，這題我印象中最後是直接找解答來看了，當時的[筆記](https://github.com/rockyooooooo/leetcode/blob/main/top-100-liked-questions/0078-subsets.md)

感覺應該可以朝這個思路去延伸，只要再加上「嚴格遞增」跟「找出最長」這兩個條件就好了。



所以我寫出了這個答案：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  let ans = 0

  function recursive(nums, idx, auxArr) {
    const theMaxPotentialLengthOfTheCurrentTry = (auxArr.length + (nums.length - 1 - idx))
    if (idx === nums.length || theMaxPotentialLengthOfTheCurrentTry < ans) {
      if (auxArr.length > ans) {
        ans = auxArr.length
      }
      return
    }

    // can take
    if (auxArr.length === 0 || nums[idx] > auxArr[auxArr.length - 1]) {
      // take it
      recursive(nums, idx + 1, [...auxArr, nums[idx]])
      // don't take
      recursive(nums, idx + 1, auxArr)
    }
    // can't take
    else {
      recursive(nums, idx + 1, auxArr)
    }
  }

  nums.forEach((num, index) => {
    recursive(nums, index, [])
  })

  return ans
};
```



主要修改了兩個地方：

1. 原本 Subset 的解法是用了一個 `result` 來裝所有的 subset，但這題只要找出最長的，所以只需要一個變數 `ans` 來記錄目前找到的最長的 subarray。

2. 原本 Subset 只要考慮目前這個數字要不要拿，這題的話變成：

   1. 這個數字可不可以拿

   2. 可以拿的話，要不要拿



這樣的寫法可以處理大部分的狀況，但是 leetcode 有一個 testcase 是，`[-1, -2, -3, …, -2498, -2499, -2500]`，也就是每個數字都比前面的還要小，完全就是我這個解法的 worst case。



我想是因為 recursion 創造了太多的 call stack，所以我改成 iteration：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0

  let ans = 0
  let idxStack = []
  let arrStack = []

  let arr = []
  for (let i = 0; i < nums.length; i++) {
    if (arr.length === 0 || nums[i] > arr[arr.length - 1]) {
      /**
       * Save this index so that we can come back to try the result of not taking the number,
       * since we can choose to take this number or not,
       * so we take it at first, then try the result of not take.
       *
       * If already the last number, we must take it if possible,
       * because we won't get a better result if not take.
       */
      if (i !== nums.length - 1) {
        idxStack.push(i)
        arrStack.push(arr.slice())
      }
      arr.push(nums[i])
    }

    // Keep the answer if current result is greater.
    if (arr.length > ans) {
      ans = arr.length
    }

    // Go back to the kept idx, trying the result of not taking the number.
    if (i === nums.length - 1) {
      i = idxStack.pop()
      arr = arrStack.pop()
    }
  }

  return ans
};
```



想法是，iteration 沒辦法像 recursion 利用 call stack 來記錄每個 stack 當下的 state，所以就自己把「可以選擇拿或不拿」情況下的 state 記錄下來，先嘗試「拿」的所有結果，再回來嘗試「不拿」的所有結果。

果然改成這樣就解決了每個數字都比前面小的狀況了，啪一聲就結束。

但還有一個 case 是 `[1, 2, 3, …, 2498, 2499, 2500]`，可惡…，的確，如果每個數字都比前面的大，那我的 `arrStack` 就會遇到一樣的問題，根本就沒有解決，只是自己寫一個 call stack 而已。

如果你滿了，我就漫出來了。



最後只好看答案了，果然九成以上都是用 DP(Dynamic Programming) 來解：

```javascript
var lengthOfLIS = function(nums) {
  let ans = 1
  const dp = []
  for (let i = 0; i < nums.length; i++) {
    dp.push(1)
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
        ans = Math.max(ans, dp[i])
      }
    }
  }
  return ans
};
```



因為題目限制有提到，`1 <= nums.length <= 2500`，所以答案最少會是 `1`，就先初始化為 `1`。

再來宣告一個 array `dp`，`dp[i]` 用來紀錄以 `nums[i]` 為結尾的 LIS 長度，例如：

```plain
Input: [5, 6 ,1, 9, 3]
dp[0]:
  [5] 的 LIS: [5]
  長度: 1
dp[3]:
  [5 ,6 ,1] 的 LIS: [5 ,6]
  長度: 2
```

DP 的一個概念就是 Divide and Conquer，把複雜的問題拆成小問題，再把這些小問題的答案一層一層疊起來，進而解決複雜問題。

以上面的例子（`[5, 6 ,1, 9, 3]`）來看，我們可以先找到 `[5]` 的答案，再用這個答案去找 `[5, 6]` 的答案，直到找出完整的答案。

流程：

1. `[5]`\
   應該沒什麼好說的，就是自己而已，所以答案是 `1`\
   這時候 `dp = [1]`

2. `[5, 6]`\
   發現 `6` 可以接在 `5` 後面，所以把 `5` 的答案加上 `1`，得到 `2` 成為 `6` 的答案\
   這時候 `dp = [1, 2]`

3. `[5, 6, 1]`\
   因為 1 比前面的數字都小，他完全沒辦法幫前面的答案創造更多的可能，所以他的答案就是他自己而已\
   這時候 `dp = [1, 2, 1]`

4. `[5, 6, 1, 9]`\
   `9` 可以接在 `5` 跟 `6` 後面，所以他的答案會是 `5` 的答案 `+1` 跟 `6` 的答案 `+1`，取大的那個，所以是 `3` \
   這時候 `dp = [1, 2, 1, 3]` 

5. `[5, 6, 1, 9, 3]` \
   `3` 只能接在 `1` 的後面，所以他的答案會是 `1` 的答案 `+1`，所以是 `2` \
   `dp = [1, 2, 1, 3, 2]`

6. 最後只要找出 `dp` 裡面最大的數字就可以了，所以答案是 `3` 



另外看到一個解法，蠻有趣的

```javascript
var lengthOfLIS = nums => {
  const rlt = nums.reduce((sequence, num) => {
    if (num > sequence[sequence.length - 1]) sequence.push(num);
    else sequence[sequence.findIndex(val => val >= num)] = num;
    return sequence;
  }, [nums[0]])
  console.log(rlt)
  return rlt.length
};
```



概念差不多，不過不用額外宣告一個 array 紀錄不同長度的答案。

1. 如果目前的數字（`num`）大於目前 `sequence` 的最後一個數字，就把他加進去 LIS

2. 不是的話，就把目前的 `sequence` 裡第一個大於或等於 `num` 的替換成 `num`

3. 最後，`sequence` 的長度就是答案



這個解法有趣的地方在於，最後結果的 `sequence` 不一定會是 LIS，但是它的長度會跟 LIS 一樣。

當我們把目前的 `sequence` 裡第一個大於或等於 `num` 的替換成 `num` 時，不會影響到原本的結果，因為在遇到可以把目前 LIS 繼續增大的數字的時候，我們只看最後一個數字。

而當我們替換的是 LIS 的最後一個數字的時候，其實就跟加入新的數字到 LIS 的最後一個位置一樣，LIS 的守門員換人當了。差別在於加入一個新的數字在最後面的時候，是最單純的情況，沒什麼好說的。而把最後一個數字替換掉，代表在這個被替換掉的數字後面，LIS 有變的更長的可能性。

例如：`[1, 2, 10, 3, 4]` 只看前三個的話，LIS 就是 `[1, 2, 10]` ，但是繼續往下看的話，我們可以把 `10` 換成 `3`，因為 `[1, 2, 3]` 跟 `[1, 2, 10]` 的長度是一樣的，都可以是 LIS，但是 `10` 太大了，只要後面有超過 1 個比 10 小的數字，就會有比 `[1, 2, 10]` 長的 sequence，以這個例子來看，我們就可以把 `4` 放進來，變成 `[1, 2, 3, 4]`，成為 LIS。



那為什麼說這個解法最後結果不一定是 LIS 呢？

試看看 `[4, 5, 6, 1, 2]` 就知道為什麼了。
