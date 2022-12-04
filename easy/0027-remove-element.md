[27. Remove Element](https://leetcode.com/problems/remove-element/)

之前做過的題目的最後一題了，做完這題之後就都是沒做過的題目。

這題跟昨天的 [Remove Duplicates from Sorted Array](https://rockyooooooo.coderbridge.io/2022/03/27/remove-duplicates-from-sorted-array/) 很像，不過這次是要把一個沒有 sort 過的 array，移除指定的數字。
然後一樣是要 in place 的修改 array，有效長度之後的數字都不影響答案。

所以我就用昨天偷看到效能最好的解法來解看看：
```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  if (nums.length === 0) return 0
  let currentIndex = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      if (currentIndex === i) {
        currentIndex++
      } else {
        nums[currentIndex] = nums[i]
        currentIndex++
      }
    }
  }
  return currentIndex
};
```

結果：
```
Runtime: 80 ms (Beats 54.77 % of javascript submissions)
Memory Usage: 41.8 MB (Beats 86.76 % of javascript submissions)
```

是還不錯，不過沒有到我這個系列的目標：贏過 60% 的 submissions。
好奇看了一下之前的解法，果然也是用 `splice()`：
```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  for(let i = 0; i < nums.length; i++){
    if(nums[i] === val){
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};
```
雖然之前這樣解的效能跟這次差不多，不過因為昨天的經驗，所以想試試看是不是現在用一樣的 code，也會有不一樣的結果

結果：
```
Runtime: 68 ms (Beats 75.89 % of javascript submissions)
Memory Usage: 42.1 MB (Beats 63.76 % of javascript submissions)
```

痾...結果變快了，而且直接達到我的期望，真是尷尬。

但是我覺得其實蠻看運氣的，因為我用第一次的解法多 submit 了幾次，出現了兩次 100 ms 左右的成績之後，就出現了一個 64 ms 的成績了。

```
Runtime: 64 ms (Beats 85.51 % of javascript submissions)
Memory Usage: 42 MB (Beats 71.48 % of javascript submissions)
```

所以我猜這應該已經是很好的答案。
看了一下最快的兩個 submission，也是這兩種解法，所以今天就先這樣吧！