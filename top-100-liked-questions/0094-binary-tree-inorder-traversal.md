#leetcode #easy 
Given the `root` of a binary tree, return _the inorder traversal of its nodes' values_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

```
**Input:** root = [1,null,2,3]
**Output:** [1,3,2]
```

**Example 2:**

```
**Input:** root = []
**Output:** []
```

**Example 3:**

```
**Input:** root = [1]
**Output:** [1]
```

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 100]`.
-   `-100 <= Node.val <= 100`

**Follow up:** Recursive solution is trivial, could you do it iteratively?

---

## 題目意思
把一個 Binary Tree 用（inorder traversal）中序遍歷來排序，完全忘記中序遍歷是怎樣，還查了一下：

- 前序遍歷：中 -> 左 -> 右
- 中序遍歷：左 -> 中 -> 右
- 後序遍歷：左 -> 右 -> 中

挺簡單的，馬上就寫出來了：

```javascript
var inorderTraversal = function(root) {
  const rlt = []
  if (root === null) return rlt
  if (root.left) {
    rlt.push(...inorderTraversal(root.left))
  }
  rlt.push(root.val)
  if (root.right) {
    rlt.push(...inorderTraversal(root.right))
  }
  return rlt
};
```

Submit 之後才發現題目最後一句：

> Recursive solution is trivial, could you do it iteratively?

可惡。

不過洗個澡就想出來了，雖然有偷看到別人的答案，看到關鍵字「stack」。
於是就寫出來了：

```javascript
var inorderTraversal = function(root) {
  const rlt = []
  const stack = []
  if (root === null) return rlt

  stack.push(root)
  while(stack.length > 0) {
    const node = stack.pop()
    if (typeof node === 'number') {
      rlt.push(node)
      continue
    }
    if (node.right) stack.push(node.right)
    if (!node.left) {
      rlt.push(node.val)
    }
    else {
      stack.push(node.val)
      stack.push(node.left)
    }
  }

  return rlt
}; 
```

基本上就是用一個 stack 來存下一個要做的 node，因為 stack 是先進後出，我們要做的是中序遍歷，所以要先判斷如果有 right node，就要先放進 stack，再來判斷如果沒有 left node 的話就可以直接把目前的 node value 放進 `rlt`，如果有 left node 的話，就要先把目前的 node value 放進 stack，再把 left node 放進 stack，最後要記得，每個 while loop 一開始要先判斷 stack pop 出來的是不是一個 number，如果是的話就直接把他放進去 `rlt` 然後直接做下一個 loop。