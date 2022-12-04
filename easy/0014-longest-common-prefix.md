[14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)

這題是給一個 array of string，找出這些 strings 最長共用前綴。

想了一下之後，不囉嗦直接寫 code 了

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  let prefix = strs[0]
  for (let i = 1; i < strs.length; i++) {
    const currentStr = strs[i]
    while (!currentStr.startsWith(prefix)) {
      prefix = prefix.slice(0, prefix.length - 1)
    }
    if (prefix === '') return prefix
  }
  return prefix
};
```

直接把第一個 string 當作 prefix，然後去跟下一個 string 看他們兩個的最長共用前綴是什麼，出來的結果再繼續跟下一個比較，直到 prefix 已經是空字串，或是 for loop 結束。

原本以為這樣效能一定超爛的，但是不這麼做到底還能怎麼寫？

結果意料之外的好，因為有了前幾次的經驗，知道可能要多 submit 幾次，可能會有比較好的成績，結果就出現了這樣的成績：
```
Runtime: 56 ms (Beats 99.01 % of javascript submissions)
Memory Usage: 42.2 MB (Beats 83.54 % of javascript submissions)
```

竟然打敗了 99% 的 submissions，笑死

不過也有出現這樣的成績：
```
Runtime: 139 ms (Beats 5.36 % of javascript submissions)
Memory Usage: 42.2 MB (Beats 83.54 % of javascript submissions)
```

看來這題真的就只能這樣解了，下課。