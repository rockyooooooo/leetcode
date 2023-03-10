#leetcode #medium #stack

Given an array of integers `temperatures` represents the daily temperatures, return _an array_ `answer` _such that_ `answer[i]` _is the number of days you have to wait after the_ `ith` _day to get a warmer temperature_. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

**Example 1:**

```
**Input:** temperatures = [73,74,75,71,69,72,76,73]
**Output:** [1,1,4,2,1,1,0,0]
```

**Example 2:**

```
**Input:** temperatures = [30,40,50,60]
**Output:** [1,1,1,0]
```

**Example 3:**

```
**Input:** temperatures = [30,60,90]
**Output:** [1,1,0]
```

**Constraints:**

-   `1 <= temperatures.length <= 105`
-   `30 <= temperatures[i] <= 100`

---

## 題目意思

有一串 array of number，代表每日溫度，找出每天的「還要幾天才會變溫暖」。

例如：`temperatures = [73,74,75,71,69,72,76,73]`
第一天是 73 度，第二天是 74 度，所以第一天要再一天才會變溫暖。
第三天是 75 度，要到第七天 76 度才會變溫暖。

很快就想到 solution 了，但是會很慢：

```javascript
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
  const result = []
  for (let i = 0; i < temperatures.length; i++) {
    let day = 0
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        day = j - i
        break
      }
    }
    result.push(day)
  }
  return result
};
```

因為每次都要往後一直 loop 過去，所以最壞的情況下每一個都要找到最後一個才會找到更溫暖的溫度，時間複雜度會是 O(n^2)

Submit 之後果然花費的時間非常久，本來還不相信，以為是因為在高鐵上網路比較不穩（不確定 leetcode 會不會受網路速度影響），所以又多 submit 了幾次，都還是很慢，但想了半天還是想不到怎麼 optimize，甚至看別人的答案也看不太懂，所以一樣求助 google 大神。

後來是看到這個影片才理解的 [739.Daily Temperatures每日温度【LeetCode单题讲解系列】](https://youtu.be/4Gf7s8QqO-k)

這個解法會從 array 的後面開始往前 for loop，然後要維護一個 stack，stack 裡面放的溫度保證下面的會比上面的高。
所以 loop 的時候，目前的溫度如果比 stack 裡最上面的還高，就要把它 pop 出來，直到遇到更高的溫度，或是 stack 空了。
當遇到更高的溫度時，將他的 index 扣掉目前溫度的 index，就會是要放進答案的「天數」。

```javascript
var dailyTemperatures = function(temperatures) {
  const answer = []
  const stack = []
  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (stack.length && temperatures[stack[stack.length - 1] ] <= temperatures[i]) {
      stack.pop()
    }
    answer[i] = stack.length ? stack[stack.length - 1]  - i : 0
    stack.push(i)
  }
  return answer
};
```

這樣做的概念是，以剛剛的例子來說，我們從最後面開始往前找「擋板」：
（以下 stack 存的其實是 index，但以溫度表示比較好理解）
第一次是 `73`，因為還沒有擋板，所以自己就變成擋板，塞進 stack，`[73]`，前面的溫度如果比 `73` 還低，就會被我擋住。
第二次是 `76`，比剛剛的 `73` 還要高，所以前面的溫度到這裡就被擋住了，根本不會再去跟 `73` 比較，所以把剛剛的 `73` pop 出來，把 `76` 塞進去。
第三次是 `72`，比 `76` 小，紀錄自己要再一天（stack 裡存的是 index，將兩個 index 相減得到 `1`）才會變溫暖，同時把自己放進擋板 stack。
第四次是 `69`，跟剛剛一樣。
第五次是 `71`，比 `69` 大，所以把 `69` pop 出來，他再也擋不到任何人了，因為在被遇到他之前就會先被 `71` 擋下來，而 `71` 比 `72` 小，所以紀錄自己要再兩天才會變溫暖，同時把 `71` 放進 stack。
第六次是 `75`，現在的 stack 裡面有 `[71 , 72, 76]`，因為只有 `76` 比 `75` 大，所以 `71`，`72` 都要被 pop 出來，紀錄自己要再四天才會變溫暖，同時把 `75` 放進 stack，目前 stack `[75, 76]`。
接下來的 `74`， `73` 就依此類推。

誰想出來的解法，是天才吧。