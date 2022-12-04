[Palindrome Number](https://leetcode.com/problems/palindrome-number/)

開始沒有寫過的題目了，這次選的是 Palindrome Number，Palindrome Number 指的是一個數字從前面跟從後面看都一樣，例如：121 反過來也是 121，123 反過來是 321，所以 121 是 Palindrome Number，而 123 不是。

這個題目要判斷一個數字是不是 Palindrome Number。

最簡單的方法就是，把直接轉成 string 來做：
```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) return false
  const str = x.toString()

  let i = 0
  let j = str.length - 1
  while(true) {
    if (str[i] !== str[j]) return false
    if (i >= j) return true
    i++
    j--
  }
};
```
轉成 string 就可以用兩個 index，一個從頭一個從尾巴，只要一看到不一樣的，就可以 return false 了，如果兩個 index 會合，就表示是 Palindrome Number，return true。

不過這樣做的效能不好，應該主要是因為 `toString()` 很慢吧。
結果：
```
Runtime: 292 ms (Beats 32.10 % of javascript submissions)
Memory Usage: 51.1 MB (Beats 59.10 % of javascript submissions)
```
相當之差。
我也試了把 `x.toString()` 改成 `x + ''`，結果更慘：
```
Runtime: 488 ms (Beats 5.01 % of javascript submissions)
Memory Usage: 51.2 MB (Beats 52.67 % of javascript submissions)
```

然後因為題目有一個小挑戰，就是不要轉換成 string 來解，所以就又多了下面這個版本：
```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) return false
  const arr = []
  let dividend = x
  while (dividend) {
    arr.push(dividend % 10)
    dividend = Math.floor(dividend / 10)
  }

  let i = 0
  let j = arr.length - 1
  while(true) {
    if (arr[i] !== arr[j]) return false
    if (i >= j) return true
    i++
    j--
  }
};
```
基本上就是把 `toString()` 變成轉換成 array 而已，直覺這樣不會好到哪裡 XD
果然：
```
Runtime: 313 ms (Beats 24.23 % of javascript submissions)
Memory Usage: 51 MB (Beats 59.10 % of javascript submissions)
```

過了一陣子還是想不到更好的方法，所以就直接看了別人的解法。
最快的那個竟然是用 `toString()` 做的，可惡，難道他的 `toString()` 比較高級嗎？

第二名的則是用跟我很像的解法，不過是比較聰明的版本：
```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  let y = 0
  let z = x
  while (z > 0)  {
    y = (z % 10) + (y * 10)
    z = Math.trunc(z / 10)
  }
  return x === y
}; 
```
直接在 while loop 裡面用每次的 remainder 計算出把 x 反轉的數字，再直接判斷是不是跟 x 一樣就好了。
結果：
```
Runtime: 427 ms (Beats 8.07 % of javascript submissions)
Memory Usage: 50.1 MB (Beats 94.72 % of javascript submissions)
```

什麼？一模一樣的 code，竟然只贏過 8.07% 的 submissions，太扯ㄌㄅ。
不過後來我在前面加了 `if (x < 0) return false`，讓 x 是負數時就直接 return false，就跑出很好的結果了。
```
Runtime: 160 ms (Beats 90.46 % of javascript submissions)
Memory Usage: 50 MB (Beats 96.07 % of javascript submissions)
```

後來又多 submit 了幾次，也會跑出 200 多 ms，300 多 ms 的成績，果然還是要看運氣的嗎？
