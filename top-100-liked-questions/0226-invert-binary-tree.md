#leetcode #easy
Given the `root` of a binary tree, invert the tree, and return _its root_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

```
**Input:** root = [4,2,7,1,3,6,9]
**Output:** [4,7,2,9,6,3,1]
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

```
**Input:** root = [2,1,3]
**Output:** [2,3,1]
```

**Example 3:**

```
**Input:** root = []
**Output:** []
```

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 100]`.
-   `-100 <= Node.val <= 100`

---
## 題目意思

把一個 Binary tree 顛倒，很好理解，但是我沒有把 input 搞懂。
我一直以為 input 跟 output 會是一個 array，因為 example 就是寫成 array 的樣子。
但是其實 code 那邊註解有寫：

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
 * @return {TreeNode}
 */
```

但是我沒有看懂，所以就直接用 array 來解題。

## 解題方向

看起來就是 tree 的每一個 tier 顛倒就好了，所以只要把每一個 tier 該做就事做好就好。
1. 先算出有幾個 tier
2. 每個 tier 的第一個 node 跟最後一個 node 對調，第二個 node 跟倒數第二個 node 對調，依此類推

```javascript
var invertTree = function(root) {
  if (root.length === 0) return root

  let tierCount = 0
  while (true) {
    if (Math.pow(2, tierCount) === root.length + 1) break
    tierCount++
  }

  for (let tier = 0; tier < tierCount; tier++) {
    let left = Math.pow(2, tier)
    let right = Math.pow(2, tier) * 2 - 1
    while (left < right) {
      const temp = root[left - 1]
      root[left - 1] = root[right - 1]
      root[right - 1] = temp
      left++
      right--
    }
  }
  return root
};
```

但是這樣放上 leetcode 去跑，一直逾時，再簡單的 input 都逾時。
於是直接看解答才知道，原來 input 有 val, left, right 三個 attribute，分別是 node 的值，右邊的 child node，左邊的 child node。
原來註解寫的 TreeNode 是這個意思，懂了。
那這樣就很簡單了，而且已經偷看過答案所以就可以直接寫出來：

```javascript
var invertTree = function(root) {
  if (!root) return root
  ;[root.left, root.right] = [root.right, root.left]
  if (root.left) invertTree(root.left)
  if (root.right) invertTree(root.right)
  return root
};
```

其他人的解法也都一樣，但我想再試看看不要用 recursive 來解看看：

```javascript
var invertTree = function(root) {
  if (!root) return root
  let queue = [root]
  while (queue.length) {
    let currentNode = queue.pop() // DFS
    // let currentNode = queue.shift() // BFS
    ;[currentNode.left, currentNode.right] = [currentNode.right, currentNode.left]
    if (currentNode.left) queue.push(currentNode.left)
    if (currentNode.right) queue.push(currentNode.right)
  }
  return root
};
```

一開始沒什麼想法，但就是想到什麼就寫，結果發現一直往 tree 的下面做完之後，往上回來會有問題，因為沒辦法判斷 node 有沒有做過了。
所以又偷看了一下答案，原來要用一個 queue 來存放 node，這樣就明白了。
只要把 queue 裡面的 node 拿出來做，再把 child node 放進 queue 裡，只要 queue 裡面有東西，就一直做，直到 queue 做完。
比較有趣的是，看到有其他人的作法，我這樣的寫法是 DFS，只要把 `pop()` 改成 `shift()` 就變成 BFS 了。