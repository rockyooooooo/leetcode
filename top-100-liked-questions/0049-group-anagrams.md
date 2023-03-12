# [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)

#leetcode #medium 

Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

```
**Input:** strs = ["eat","tea","tan","ate","nat","bat"]
**Output:** [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Example 2:**

```
**Input:** strs = [""]
**Output:** [[""]]
```

**Example 3:**

```
**Input:** strs = ["a"]
**Output:** [["a"]]
```

**Constraints:**

-   `1 <= strs.length <= 104`
-   `0 <= strs[i].length <= 100`
-   `strs[i]` consists of lowercase English letters.

---

## 題目意思

給一堆字串，如果字串用的字母一樣，只是排列不同而已，就屬於同一個 group，把同一個 group 的字串放在一起，回傳分組好的結果。

一開始有點愣住，不知道該怎麼判斷是不是同一個 group，後來放棄直接用最暴力的方式，把每個字串都先 sort，這樣只要是同一個 group 的字串，sort 過的結果都會一樣，把 sort 完的字串當作 map 的 key，只要字串 sort 完之後 match 這個 key ，就放到同一組，最後再把 map 的 values 倒出來就好了。

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = {}
  for (const str of strs) {
    const sortedStr = str.split('').sort().join('')
    if (!map[sortedStr]) {
      map[sortedStr] = [str]
    }
    else {
      map[sortedStr].push(str)
    }
  }

  const result = Object.values(map)
  return result
};
```

原本以為這樣寫會 time limit exceeded，結果竟然沒有，還蠻正常的時間跑完。

看其他人的作法是，先列出前 26 個質數，每個質數對應一個英文字母，把字串的每個字母對應的質數相乘，因為不同質數相乘的積一定會不一樣，所以一樣的話就會是同一個 group。

還有 create 一個長度 26 的 array，把字串出現過的字母放進對應的位置，都擺定位之後直接把 array toString 來當成 map 的 key 的，有夠酷。

如果 test case 再更嚴峻的話，我覺得可能只有質數才是比較好的做法。