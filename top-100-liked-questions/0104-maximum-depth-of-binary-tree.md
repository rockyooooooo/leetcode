# [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

#leetcode #easy #binarytree 

Given the `root` of a binary tree, return _its maximum depth_.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)

**Input:** root = [3,9,20,null,null,15,7]
**Output:** 3

**Example 2:**

**Input:** root = [1,null,2]
**Output:** 2

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 104]`.
-   `-100 <= Node.val <= 100`

---
## 題目意思

找出 Binary tree 的深度，binary tree 應該就是 DFS 或 BFS 吧，所以很快就解出來了。

```javascript
var maxDepth = function(root) {
  let maxDepth = 0
  const recursive = (treeNode, currentDepth) => {
    if (!treeNode.val) return
    currentDepth++
    if (treeNode.left) recursive(treeNode.left, currentDepth)
    if (treeNode.right) recursive(treeNode.right, currentDepth)
    if (currentDepth > maxDepth) maxDepth = currentDepth
  }
  recursive(root, maxDepth)
  return maxDepth
};
```

看了一下別人的解法，有很簡短的，好讚

```javascript
var maxDepth = function(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

