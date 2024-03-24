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
 * @return {number}
 */
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

const root = [3,9,20,null,null,15,7]
maxDepth(root)
