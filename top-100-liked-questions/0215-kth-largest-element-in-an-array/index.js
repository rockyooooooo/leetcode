/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  if (nums.length === 1) return nums[0]

  // function quickSelect (arr, start, end) {
  //   console.log(`start quick select`)
  //   console.log({ arr, start, end })
  //   const l = partition(arr, start, end)
  //   const targetIndex = arr.length - l
  //   console.log({ targetIndex, k })
  //   if (targetIndex === k) {
  //     return l
  //   }
  //   if (targetIndex < k) {
  //     return quickSelect(arr, start, l - 1)
  //   }
  //   if (targetIndex > k) {
  //     return quickSelect(arr, l + 1, end)
  //   } 
  // }

  // const answerIndex = quickSelect(nums, 0, nums.length - 1)
  // console.log({ nums })
  // return nums[answerIndex]

  // return quickSort(nums, 0, nums.length - 1)[nums.length - k]

  nums.sort()
  return nums[nums.length - k]
};

function quickSort (arr, start, end) {
  if (start < end) {
    const l = partition(arr, start, end)
    quickSort(arr, start, l - 1)
    quickSort(arr, l + 1, end)
  }
  return arr
}

function partition (arr, start, end) {
  console.log(`do partition`)
  console.log({ start, end })
  const pivot = arr[end]
  let nextReplaceIndex = start
  for (let i = start; i < end; i++) {
    console.log({ arr })
    if (arr[i] < pivot) {
      swap(arr, i, nextReplaceIndex)
      nextReplaceIndex++
    }
  }
  console.log({ pivot, 'arr[nextReplaceIndex]': arr[nextReplaceIndex] })
  if (pivot < arr[nextReplaceIndex]) {
    swap(arr, end, nextReplaceIndex)
  }
  console.log({ nextReplaceIndex })
  return nextReplaceIndex
}

function swap (arr, i, j) {
  console.log(`swapping ${i} and ${j}`)
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
  console.log(`after swap`)
  console.log({ arr })
}

console.log(findKthLargest([3,2,1,5,6,4], 2))
console.log(findKthLargest([2, 1], 1))
// console.log(quickSort([3,2,1,5,6,4], 0, 5))
// console.log(quickSort([2,1], 0, 1))
