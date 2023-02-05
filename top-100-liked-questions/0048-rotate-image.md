#leetcode #medium 
You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm), which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)

```
**Input:** matrix = [[1,2,3],[4,5,6],[7,8,9]]
**Output:** [[7,4,1],[8,5,2],[9,6,3]]
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)

```
**Input:** matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
**Output:** [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

**Constraints:**

-   `n == matrix.length == matrix[i].length`
-   `1 <= n <= 20`
-   `-1000 <= matrix[i][j] <= 1000`

---

## 題目意思

把 Array 想像成像圖片那樣 n * n 的排列，求出把圖片順時針旋轉 90 度之後，得到的 Array。

## 解題方向

其實一開始完全沒有頭緒，後來自己亂排列之後意外發現，先把矩陣左右顛倒，再以對角線右上到左下的方向左右顛倒，就可以得到答案了，總覺得好像以前學過。

```javascript
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  if (matrix.length === 1) return
  for (const item of matrix) {
    item.reverse()
  }

  let start = [0, 0]
  let end = [matrix.length - 1, matrix.length - 1]
  while (true) {
    if (start[0] === end[0]) {
      start[0] += 1
      end[1] -= 1
      start[1] = 0
      end[0] = matrix.length - 1
    }
    if (start[0] === matrix.length - 1) {
      break
    }

    const temp = matrix[start[0]][start[1]]
    matrix[start[0]][start[1]] = matrix[end[0]][end[1]]
    matrix[end[0]][end[1]] = temp

    start[1] += 1
    end[0] -= 1
  }
};
```

寫得很醜，不知道哪裡卡到，但是有過就好，之後再來重寫。
後來才知道原來對角線顛倒叫做轉置矩陣，大學線性代數會教，果然有學過！（雖然都還給老師了）