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
// recursive
var invertTree = function(root) {
  if (!root) return root
  ;[root.left, root.right] = [root.right, root.left]
  if (root.left) invertTree(root.left)
  if (root.right) invertTree(root.right)
  return root
};

// iterative
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

console.log(invertTree([4,2,7,1,3,6,9]))
console.log(invertTree([2,1,3]))
console.log(invertTree([]))