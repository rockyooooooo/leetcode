#leetcode #medium
You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be `s`.

Return _a list of integers representing the size of these parts_.

**Example 1:**

```
**Input:** s = "ababcbacadefegdehijhklij"
**Output:** [9,7,8]
**Explanation:**
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
```

**Example 2:**

```
**Input:** s = "eccbbbbdec"
**Output:** [10]
```

**Constraints:**

-   `1 <= s.length <= 500`
-   `s` consists of lowercase English letters.

---
## 題目意思

給一個字串 `s`，盡可能切最多的分段，每段出現的字母不能出現在其他分段。
一開始看題目完全看不懂在寫什麼，也不是英文單字看不懂，查了其他人寫的中文文章才看懂，看來理解能力還要再加強。

## 解題方向

稍微思考一下不寫 code 自己做的邏輯會是如何：
input: `'ababcbacadefegdehijhklij'`
1. 看到 `'a'`，這是第一個分段 `'a'`
2. 看到 `'b'`，可以再切分段 `'a'`, `'b'`
3. 又看到 `'a'`，那剛剛切的分段要全部合併起來，變成 `'aba'`
4. 又是 `'b'`，繼續加入第一個分段，`'abab'`
5. 遇到 `'c'`，可以切新的分段，`'abab'`, `'c'`
6. 依序遇到 `'b'`, `'a'`，分段要合併加入第一分段，`'ababcba'`
7. 依序遇到 `'c'`, `'a'`，加入第一個分段，`'ababcbaca'`
8. 遇到 `'d'`，切新分段，`'ababcbaca'`, `'d'`
9. 遇到 `'e'`，切新分段，`'ababcbaca'`, `'d'`, `'e'`
10. 遇到 `'f'`，切新分段，`'ababcbaca'`, `'d'`, `'e'`, `'f'`
11. 遇到 `'e'`，前功盡棄，合併到第二個分段，`'ababcbaca'`, `'defe'`
12. 遇到 `'g'`，切新分段，`'ababcbaca'`, `'defe'`, `'g'`
13. 依序遇到 `'d'`, `'e'`，一樣合併到第二個分段，`'ababcbaca'`, `'defegde'`
14. 依序遇到 `'h'`, `'i'`, `'j'`，切新分段，`'ababcbaca'`, `'defegde'`, `'h'`, `'i'`, `'j'`
15. 遇到 `'h'`，第三分段之後的都合併到第三個分段，`'ababcbaca'`, `'defegde'`, `'hijh'`
16. 遇到 `'k'`，切新分段，`'ababcbaca'`, `'defegde'`, `'hijh'`, `'k'`
17. 遇到 `'l'`，切新分段，`'ababcbaca'`, `'defegde'`, `'hijh'`, `'k'`, `'l'`
18. 依序遇到 `'i'`, `'j'`，第三分段之後的都合併到第三個分段，`'ababcbaca'`, `'defegde'`, `'hijhklij'`
19. 結束

所以 code 寫起來就是：

```javascript
var partitionLabels = function(s) {
  const arr = [s[0]]
  for (let i = 1; i < s.length; i++) {
    const arrLen = arr.length
    let pushed = false
    for (let j = 0; j < arrLen; j++) {
      // 如果 s[i] 存在某個 partition，把 s[i] 之前的 labels 全部加進該 partition
      // 如果沒有任何一個 partition 有這個字母，就 push 進 arr
      if (arr[j].includes(s[i])) {
        arr[j] = arr[j].concat(...arr.splice(j + 1))
        // 如果還沒 push 過，要自己把它加進去
        if (!pushed) arr[j] += s[i]
        break
      } else {
        // 如果已經 push 過了，就不要再 push 一次
        if (pushed) continue
        arr.push(s[i])
        pushed = true
      }
    }
  }
  return arr.map(item => item.length)
};
```

剛好花費一小時完成這個一看就知道不會是最佳解的 solution，於是看了別人的解法。

```javascript
var partitionLabels = function (s) {
  var lastOccurence = {};
  for (let i = 0; i < s.length; i++) {
      lastOccurence[s[i]] = i;
  }
  var start = -1, end = -1, ans = [];
  for (let i = 0; i < s.length; i++) {
      end = Math.max(end, lastOccurence[s[i]])
       if (i == end) {
          ans.push(end - start)
          start = i;
      }
  }
  return ans;
};
```

有夠讚。
這個解法的方向是，只要是出現過的字母，找到他最後出現的位置，就至少會是一個分段，除非這個分段之間有某個字母的最後出現位置夠後面，那就會把分段的最後一個位置繼續往後推。
