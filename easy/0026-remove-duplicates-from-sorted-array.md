[Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

也是之前就解過的題目。
這個題目是要把一個排序好的 array 裡，重複的元素去除掉，題目是這樣說，但其實不用真的移除。
假設 input 的 array 是 `[1, 1, 2, 3]`，那答案就是 `[1, 2, 3]` 嘛，不過要 return 的是它的長度，所以是 3，但是要直接修改原本的 array（in place），不能自己宣告一個新的 array 來做，而且就算你把 array 變成 `[1, 2, 3, 1]` 也沒關係，因為正確答案的長度是 3，所以他只看前 3 個。

第一次解法：
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length < 2) return nums.length
  nums.push(false)
  while(true) {
    if (nums[0] === false) {
      nums.shift()
      return nums.length
    }
    if (nums[0] === nums[1]) {
      nums.shift()
    } else {
      nums.push(nums.shift())
    }
  }
};
```
因為要 in place 的修改 array，所以我就直覺地想到用 `shift()` 來重頭把重複的元素都拿掉，當遇到不一樣的，一樣 `shift()`，但是要 `push()` 回最後面。
直到遇到我在最一開始插在 array 最後面的 `false`，就可以把它 `shift()` 掉之後 return 長度。
結果：
```
Runtime: 144 ms (Beats 30.01 % of javascript submissions)
Memory Usage: 45.7 MB (Beats 8.23 % of javascript submissions)
```
差強人意，想來想去，懷疑是 `push()` 跟 `shift()` 效能不好，所以稍微查了一下，發現很多人說 `shift()` 的效能比 `pop()` 差很多，因為 array 的 index 會整個不一樣。
所以我就改成~~從後面來~~從後面開始 for loop，這樣變成比較多的 `pop()`，當不一樣的時候才會 `unshift()` 到前面，減少 index 重新排列的次數。
結果：
```
Runtime: 124 ms (Beats 44.41 % of javascript submissions)
Memory Usage: 45.6 MB (Beats 9.77 % of javascript submissions)
```
痾...是有比較好一點點了啦...不過還是修改一下策略好了。
而且在最一開始插入 `false` 來判斷結束，總覺得怪怪的。

最後解法：
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length < 2) return nums.length
  if (nums[0] === nums[nums.length - 1]) return 1
  const firstNum = nums[0]
  let count = 0
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i] === firstNum) {
      nums.unshift(nums[i])
      return ++count
    }
    if (nums[i] !== nums[i - 1]) {
      nums.unshift(nums[i])
      ++i
      ++count
    }
  }
};
```
這次的想法是，先把第一個數記下來，然後用 `count` 來計算不重複的數字有幾個。
一樣從最後面開始 for loop，當找到不一樣的數時，把目前的數字 `unshift()` 插到最前面，並 `++count`，直到目前的數字跟 `firstNum` 一樣，表示做完了。
要注意的是，在進入 for loop 之前，就要先檢查第一個數跟最後一個數是不是一樣的，如果是一樣的，因為排序過了，所以表示不重複的數只有一個，就直接 `return 1`（其實在前面的解法應該也要加，雖然不會錯，但是可以省很多時間）。

結果：
```
Runtime: 83 ms (Beats 81.41 % of javascript submissions)
Memory Usage: 44.7 MB (Beats 51.97 % of javascript submissions)
```

後來偷看了一下 runtime 最少的解法（48 ms）：
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */ 
var removeDuplicates = function(nums) {
  let currentIndex = 0;

  for( i=1;i<nums.length;i++ ){
    if(nums[currentIndex] != nums[i] ){
      if( currentIndex+1 != i ){
        currentIndex++;
        nums[currentIndex] = nums[i];
      }else{
        currentIndex++;
      }
    }
  }
  currentIndex++
  return currentIndex
};
```

一個恍然大悟，對啊！我只要有兩個 pointer，一個指著現在不重複的數字到哪裡（`currentIndex`），另一個去跑整個 array（for loop 的 `i`），當遇到不一樣的數字，就把他放到前面去，最後 `currentIndex` 就是不重複數字的個數了。
這樣也根本不用在那邊 `pop()` 來 `shift()` 去了，讚！

---
之前竟然第一次 Accepted 的 performance 就蠻不錯的
```
Runtime: 84 ms (Beats 80.66 % of javascript submissions)
Memory Usage: 40.7 MB (Beats 99.67 % of javascript submissions)
```

不過複製之前的 code，已經沒有跟之前同樣的 performance，難道是 javascript 內建函式的實作有改變？
```
Runtime: 129 ms (Beats 40.54 % of javascript submissions)
Memory Usage: 45 MB (Beats 35.81 % of javascript submissions)
```
也差太多 XD