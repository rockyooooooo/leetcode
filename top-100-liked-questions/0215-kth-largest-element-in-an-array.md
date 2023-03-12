# [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

#leetcode #medium 

Given an integer array `nums` and an integer `k`, return _the_ `kth` _largest element in the array_.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

You must solve it in `O(n)` time complexity.

**Example 1:**

```
**Input:** nums = [3,2,1,5,6,4], k = 2
**Output:** 5
```

**Example 2:**

```
**Input:** nums = [3,2,3,1,2,4,5,5,6], k = 4
**Output:** 4
```

**Constraints:**

-   `1 <= k <= nums.length <= 105`
-   `-104 <= nums[i] <= 104`

---

## 題目意思

很直白，就是給一個 array of number，找出第 k 大個數字，有趣的是最後一句話：

> You must solve it in `O(n)` time complexity.

## 解題思路

最簡單的方式就是直接 sort 之後直接選對應的數字就好了：

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => a - b)
    return nums[nums.length - k]
};
```

但是 sort 的 time complexity 據我所知也要 O(nlogn)，但 leetcode 卻可以接受這樣的答案。

Google 後才知道原來應該要用 [Quick select](https://zh.wikipedia.org/zh-tw/%E5%BF%AB%E9%80%9F%E9%80%89%E6%8B%A9)，是一個基於 [Quick sort](https://zh.wikipedia.org/zh-tw/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F) 的演算法，在 sort 的過程就可以先檢查是不是已經選到了目標。

```javascript
var findKthLargest = function(nums, k) {
  if (nums.length === 1) return nums[0]

  function quickSelect (arr, start, end) {
    const l = partition(arr, start, end)
    const targetIndex = arr.length - l
    if (targetIndex === k) {
      return l
    }
    if (targetIndex < k) {
      return quickSelect(arr, start, l - 1)
    }
    if (targetIndex > k) {
      return quickSelect(arr, l + 1, end)
    }
  }

  const answerIndex = quickSelect(nums, 0, nums.length - 1)
  return nums[answerIndex]
};

function partition (arr, start, end) {
  const pivot = arr[end]
  let l = start
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, l)
      l++
    }
  }
  if (pivot < arr[l]) {
    swap(arr, end, l)
  }
  return l
}

function swap (arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}
```

這樣平均就會是 O(n)。