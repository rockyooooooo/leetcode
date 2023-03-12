# [46. Permutations](https://leetcode.com/problems/permutations/)

#leetcode #medium 

Given an array `nums` of distinct integers, return _all the possible permutations_. You can return the answer in **any order**.

**Example 1:**

```
**Input:** nums = [1,2,3]
**Output:** [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**

```
**Input:** nums = [0,1]
**Output:** [[0,1],[1,0]]
```

**Example 3:**

```
**Input:** nums = [1]
**Output:** [[1]]
```

**Constraints:**

-   `1 <= nums.length <= 6`
-   `-10 <= nums[i] <= 10`
-   All the integers of `nums` are **unique**.

---

## 題目意思

給一個 array of number，數字不會重複，回傳所有可能的排序。
想了一陣子想不出來怎麼解，於是偷看別人的解題方向，但沒有直接看 code。

## 解題方向

選一個數，剩下的數丟進去遞迴再解一樣的問題，於是第一次寫出了這樣的 code：

```javascript nums
var permute = function(nums) {
  if (nums.length === 1) return [nums]
  const result = []
  for (let i = 0; i < nums.length; i++) {
    // 把從 i 之後的數丟進 `permute` 再遞迴一次
    const permutations = permute(nums.slice(i + 1))
    // loop permute 回來的結果，把 nums[i] 依順序插入頭尾及各個空隙
    for (let j = 0; j < permutations.length; j++) {
      const arr = permutations[j]
      for (let k = 0; k <= arr.length; k++) {
        const temp = arr.slice()
        temp.splice(k, 0, nums[i])
        result.push(temp)
      }
    }
  }
  return result
}
```

但這樣出來的結果會包含低於 `nums.length` 的結果，例如：

```javascript
input: [1, 2, 3]
output: [
  [ 1, 2, 3 ],
  [ 2, 1, 3 ],
  [ 2, 3, 1 ],
  [ 1, 3, 2 ],
  [ 3, 1, 2 ],
  [ 3, 2, 1 ],
  [ 2, 3 ], // 非預期結果
  [ 3, 2 ]  // 非預期結果
]
```

偷懶一點可以直接把這個結果的長度不等於 `nums.length` 的 filter 掉就可以了。

猜測是 `const permutations = permute(nums.slice(i + 1))` 這一行的關係，因為應該是每更深一層遞迴的 input 都會變短，而不是 for loop 每次傳進去遞迴的 input 變短。

```javascript nums{5-8}
var permute = function(nums) {
  if (nums.length === 1) return [nums]
  const result = []
  for (let i = 0; i < nums.length; i++) {
    // 把從 nums[i] 之外的數丟進 `permute` 再遞迴一次
    const numsClone = [...nums]
    numsClone.splice(i, 1)
    const permutations = permute(numsClone)
    // loop permute 回來的結果，把 nums[i] 依順序插入頭尾及各個空隙
    for (let j = 0; j < permutations.length; j++) {
      const arr = permutations[j]
      for (let k = 0; k <= arr.length; k++) {
        const temp = arr.slice()
        temp.splice(k, 0, nums[i])
        result.push(temp)
      }
    }
  }
  return result
}
```

但這樣會有一大堆重複的結果，原本只有 6 種排序，這個 code 會有 6 * 6 個結果。有 24 種排序就會變成 24 * 24 個結果。
那是因為根本就不需要把 `nums[i]` 依序插入頭尾及更個空隙，只要固定一個位置放就好了，`nums[n]` 就會包含 `nums[i]` 在每個位置的排序。

```javascript nums{9, 11}
var permute = function(nums) {
  if (nums.length === 1) return [nums]
  const result = []
  for (let i = 0; i < nums.length; i++) {
    // 把從 i 之後的數丟進 `permute` 再遞迴一次
    const numsClone = [...nums]
    numsClone.splice(i, 1)
    const permutations = permute(numsClone)
    // loop permute 回來的結果，把 nums[i] 放在 permutations[j] 的最前面或最後面
    for (let j = 0; j < permutations.length; j++) {
      result.push([nums[i], ...permutations[j]])
    }
  }
  return result
}
```

這樣的結果就會是正確的了。

後來看了 leetcode 上其他人的答案，大致上有幾種解法，back trace、DFS，看起來都蠻像的，其中有一個解法最精簡：

```javascript nums
var permute = function(nums) {
  const result = []
  findPermutes(nums, [], 0, result)
  return result
}

function findPermutes(nums, currentPerm, index, result){
  if (currentPerm.length === nums.length){
    result.push(currentPerm)
  } else {
    for(let i = 0; i < currentPerm.length + 1; i++){
      let copyPerm = currentPerm.slice(0)
      copyPerm.splice(i, 0, nums[index])
      findPermutes(nums, copyPerm, index + 1, result)
    }
  }
}
```

這個的方向是，每次要插入新的數字到 currentPerm，都會把每個插入的位置的可能都做一次。
假設 input 是 `[1, 2, 3]`，一開始要插入 1 到 currentPerm，就只有一個位置可以插入，所以是 `[1]`，再來要插入 2，有頭跟尾可以插入，所以是 `[2, 1]`、`[1, 2]`，最後是 3，他可以插入的位置有頭、中、尾，以 `[2, 1]` 來說就會是 `[3, 2, 1]`, `[2, 3, 1]`，`[2, 1, 3]`，以 `[1, 2]` 來說就會是 `[3, 1, 2]`，`[1, 3, 2]`，`[1, 2, 3]`，把這兩組合併起來就會是最後的答案了，讚讚。