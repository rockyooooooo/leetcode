// /**
//  * @param {string} s
//  * @return {number[]}
//  */
//  var partitionLabels = function(s) {
//   const arr = [s[0]]
//   for (let i = 1; i < s.length; i++) {
//     const arrLen = arr.length
//     let pushed = false
//     for (let j = 0; j < arrLen; j++) {
//       // 如果 s[i] 存在某個 partition，把 s[i] 之前的 labels 全部加進該 partition
//       // 如果沒有任何一個 partition 有這個字母，就 push 進 arr
//       if (arr[j].includes(s[i])) {
//         arr[j] = arr[j].concat(...arr.splice(j + 1))
//         // 可能還沒 push 過就找到了，所以要自己把它加進去
//         if (!pushed) arr[j] += s[i]
//         break
//       } else {
//         // 如果已經 push 過了，就不要再重複 push
//         if (pushed) continue
//         arr.push(s[i])
//         pushed = true
//       }
//     }
//   }
//   return arr.map(item => item.length)
// };

var partitionLabels = function (s) {
  var lastOccurence = {};
  for (let i = 0; i < s.length; i++) {
      lastOccurence[s[i]] = i;
  }
  var start = -1, end = -1, ans = [];
  for (let i = 0; i < s.length; i++) {
      end = Math.max(end, lastOccurence[s[i]])
       if (i == end) {
          ans.push(end - start)
          start = i;
      }
  }

  return ans;
};

console.log(partitionLabels("ababcbacadefegdehijhklij"))
console.log(partitionLabels("eccbbbbdec"))
