#leetcode #easy #linkedlist 
Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

```
**Input:** head = [1,2,3,4,5]
**Output:** [5,4,3,2,1]
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

```
**Input:** head = [1,2]
**Output:** [2,1]
```

**Example 3:**

```
**Input:** head = []
**Output:** []
```

**Constraints:**

-   The number of nodes in the list is the range `[0, 5000]`.
-   `-5000 <= Node.val <= 5000`

**Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?

---

## 題目意思
就是把一個 linked list 反轉。

不難所以直接上 code：

```javascript nums{15, 21-23, 27}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (!head) return head

  let rlt = null
  const reverse = (curNode, prevNode) => {
    if (curNode.next) {
      reverse(curNode.next, curNode)
    }
    curNode.next = prevNode
    if (!rlt) {
      rlt = curNode
    }
  }

  reverse(head, null)
  return rlt
};
```

比較需要注意的是，最後的結果要的是反轉過後的 head，也就是原本 input 的 tail。

再來是 iterative 版本：

```javascript
var reverseList = function(head) {
  if (!head) return head

  let rlt = null
  let curNode = head
  let prevNode = null
  while (true) {
    let nextNode = curNode.next
    curNode.next = prevNode
    prevNode = curNode
    curNode = nextNode
    if (!curNode) {
      rlt = prevNode
      break
    }
  }

  return rlt
};
```

也不難，就是要把 prevNode 存起來，然後跟 node.next 對調，再往下一個 node 前進，直到 `null`，看了別人的答案發現也是一樣的做法，但是我多寫了一段邏輯，判斷 `curNode === null`  可以放在 while，最後 return `preNode` 就好了：

```javascript nums{7, 14}
var reverseList = function(head) {
  if (!head) return head

  let rlt = null
  let curNode = head
  let prevNode = null
  while (curNode) {
    let nextNode = curNode.next
    curNode.next = prevNode
    prevNode = curNode
    curNode = nextNode
  }

  return prevNode
};
```