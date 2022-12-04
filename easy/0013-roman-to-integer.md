[13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

這一題要把羅馬數字換算成十進位數字，羅馬數字的 I 代表 1，所以 III 代表 3，而 V 代表 5，VII就代表 7。
比較特別的是，IV 代表 4，而 IX 代表 9（X 是 10），依此類推。

一樣從最直覺的解法開始

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  const table = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  let int = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'C') {
      if (s[i + 1] === 'M') {
        int += 900
        i++
      } else if (s[i + 1] === 'D') {
        int += 400
        i++
      } else {
        int += table[s[i]]
      }
    } else if (s[i] === 'X') {
      if (s[i + 1] === 'C') {
        int += 90
        i++
      } else if (s[i + 1] === 'L') {
        int += 40
        i++
      } else {
        int += table[s[i]]
      }
    } else if (s[i] === 'I') {
      if (s[i + 1] === 'X') {
        int += 9
        i++
      } else if (s[i + 1] === 'V') {
        int += 4
        i++
      } else {
        int += table[s[i]]
      }
    } else {
      int += table[s[i]]
    }
  }
  return int
};
```

我知道很醜，但是結果意外的好

```
Runtime: 136 ms (Beats 83.31 % of javascript submissions)
Memory Usage: 49.1 MB (Beats 18.41 % of javascript submissions)
```

看了其他人的寫法，發現其實用同樣的寫法，效能很好的也是大有人在，不過看到了更聰明的寫法

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  const table = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  let int = 0
  for (let i = 0; i < s.length; i++) {
    
    if (table[s[i + 1]] > table[s[i]]) {
      int -= table[s[i]]
    } else {
      int += table[s[i]]
    }
  }
  return int
};
```

不過 submit 了好幾次都沒有我第一的解法來的快，我不相信！所以繼續按 submit，最後終於出現了 128 ms，誤差真的是很大內，真是困擾。