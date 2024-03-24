/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// my solution
// var subsets = function(nums) {
//   const result = []
//   for (let n = 0; n <= nums.length - 1; n++) {
//     recursive(nums, n, result)
//   }
//   return result
// };

// function recursive(subset, index, result) {
//   result.push(subset)
//   if (index > subset.length - 1) return
//   const subsetClone = [...subset]
//   subsetClone.splice(index, 1)
//   recursive(subsetClone, index, result)
// }

/**
 * - 一次抓 n 個數，從 0 個開始抓，抓到 nums.length 個
 * - 遞迴？每次都拿掉一個數，再把每個被拿掉一個數之後的 array 再丟進去遞迴
 */

/**
 * reference: https://leetcode.com/problems/subsets/solutions/940599/3-approaches-for-your-interview-dry-run-iterative-recursive-bitmasking/
 */
/**
 * 1. take it or don't take
 * 每個數字都可決定要拿或不拿，就會長出像這樣的 tree：
 *                                         [1, 2, 3]
 *                                       /          \
 *                                     /             \
 *                                   /                \
 *                                 /                   \
 *                               /                      \
 *                             /                         \
 *                           /                            \
 *                         /                               \
 *                       1                                  x
 *                     /  \                               /  \
 *                   /     \                            /     \
 *                 /        \                         /        \
 *               /           \                      /           \
 *             /              \                   /              \      
 *           2                 x                2                 x     
 *         /  \              /  \             /  \              /  \    
 *       3     x           3     x          3     x           3     x   
 *     /        \        /        \       /        \        /        \  
 * [1, 2, 3]  [1, 2]  [1, 3]      [1]   [2, 3]     [2]    [3]        []
 * 
 * 我知道很佔空間但我還是想畫
 * 
 * [1, 2, 3] ------ 1 ------ 2 ------ 3 ------ [1, 2, 3]
 *             |        |        |
 *             |        |        ---- x ------ [1, 2]
 *             |        |                     
 *             |        ---- x ------ 3 ------ [1, 3]
 *             |                 |
 *             |                 ---- x ------ [1]
 *             |                              
 *             ---- x ------ 2 ------ 3 ------ [2, 3]
 *                      |        |
 *                      |        ---- x ------ [2]
 *                      |
 *                      ---- x ------ 3 ------ [3]
 *                               |
 *                               ---- x ------ []
 * 
 * 畫上癮所以又畫了另種圖，總之就是每個數都分為拿或不拿，展開來就長這樣，就會把所有可能都排出來了。
 */
var subsets = function(nums) {
  const result = []
  function recursive(nums, idx, auxArr) {
    if (idx === nums.length) {
      result.push(auxArr)
      return
    }
  
    // take it
    recursive(nums, idx + 1, [...auxArr, nums[idx]])
    // don't take
    recursive(nums, idx + 1, auxArr)
  }
  recursive(nums, 0, [])
  return result
}

console.log(subsets([1, 2, 3]))