# [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

#leetcode #medium 

Given the `root` of a binary search tree, and an integer `k`, return _the_ `kth` _smallest value (**1-indexed**) of all the values of the nodes in the tree_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg)

```
**Input:** root = [3,1,4,null,2], k = 1
**Output:** 1
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg)

```
**Input:** root = [5,3,6,2,4,null,null,1], k = 3
**Output:** 3
```

**Constraints:**

-   The number of nodes in the tree is `n`.
-   `1 <= k <= n <= 104`
-   `0 <= Node.val <= 104`

**Follow up:** If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

----

## 題目意思

這是一個二元搜尋樹，可以用深度優先排序把樹從最小排到最大，再取題目要的第 k 個就好了：

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  const arr = []
  function inorder (node) {
    if (node.left) {
      inorder(node.left)
    }
    arr.push(node.val)
    if (node.right) {
      inorder(node.right)
    }
  }
  inorder(root)
  return arr[k - 1]
};
```

看了別人的答案，其實不需要存成一個陣列，只要找到那第 k 個，剩下的就不用繼續排了：

```javascript
var kthSmallest = function(root, k) {
  let target = null
  function inorder (node) {
    if (target !== null) {
      return
    }
    if (node.left) {
      inorder(node.left)
    }
    k--
    if (k === 0) {
      target = node.val
    }
    if (node.right) {
      inorder(node.right)
    }
  }
  inorder(root)
  return target
};
```

這題蠻簡單的，但是困難度是 `medium`，不知道是不是因為要知道 BST 的關係，還是因為最後的那個 **Follow up**？但我看其他人也都是這樣解而已，不知道還有沒有效能更好的做法。
