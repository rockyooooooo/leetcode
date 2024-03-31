// function minReorder(n: number, connections: number[][]): number {
//   const routeTable = new Map<number, Set<number>>()
//   connections.forEach(connection => {
//     if (routeTable.has(connection[1])) {
//       routeTable.get(connection[1])!.add(connection[0])
//     }
//     else {
//       routeTable.set(connection[1], new Set([connection[0]]))
//     }
//   })
//   console.log(routeTable)

//   let changeCnt = 0
//   function dfs(target: number, parent: number | null) {
//     if (routeTable.has(target)) {
//       routeTable.get(target)!.forEach(node => {
//         dfs(node, target)
//       })
//     }

//     [...routeTable.entries()].forEach(([node, route]) => {
//       if (route.has(target) && node !== parent) {
//         route.delete(target)

//         if (routeTable.has(target)) {
//           const temp = routeTable.get(target)!
//           temp.add(node)
//         }
//         else {
//           routeTable.set(target, new Set([node]))
//         }

//         changeCnt++

//         if (route.size === 0) {
//           routeTable.delete(node)
//         }

//         dfs(node, target)
//       }
//     })
//   }

//   dfs(0, null)
//   console.log(routeTable)
//   return changeCnt
// }

// function minReorder(n: number, connections: number[][]): number {
//   let changeCnt = 0

//   function dfs(target: number, parent: number) {
//     connections.forEach(connection => {
//       if (!connection.includes(target)) return
//       if (connection[0] === target && connection[1] === parent) return

//       if (connection[0] === target) {
//         [connection[0], connection[1]] = [connection[1], connection[0]]
//         changeCnt++
//       }

//       dfs(connection[0], connection[1])
//     })
//   }

//   dfs(0, -1)
//   return changeCnt
// }

// function dfs(target: number, parent: number, map: Map<number, number[][]>, count: number) {
//   map.get(target)!.forEach(([neighbor, relation]) => {
//     if (neighbor === parent) return
//     count = dfs(neighbor, target, map, count + relation)
//   })
//   return count
// }

// function minReorder(n: number, connections: number[][]): number {
//   const map: Map<number, number[][]> = new Map()
//   connections.forEach(connection => {
//     if (!map.has(connection[0])) {
//       map.set(connection[0], [])
//     }
//     map.get(connection[0])!.push([connection[1], 1])
//     if (!map.has(connection[1])) {
//       map.set(connection[1], [])
//     }
//     map.get(connection[1])!.push([connection[0], 0])
//   })

//   return dfs(0, -1, map, 0)
// }

// BFS
function minReorder(n: number, connections: number[][]): number {
  let queue = connections
  const map: Map<number, number> = new Map()
  let count = 0

  map.set(0, 0)
  while (queue.length > 0) {
    let nextQueue: number[][] = []
    queue.forEach(([from, to]) => {
      if(map.has(from)) {
        count++
        map.set(to, from)
      }
      else if (map.has(to)) {
        map.set(from, to)
      }
      else {
        nextQueue.push([from, to])
      }
    })

    if (nextQueue.length > queue.length - 2) {
      nextQueue.reverse()
    }

    queue = nextQueue
  }

  return count
}

console.log(minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]))
console.log(minReorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]))
console.log(minReorder(3, [[1, 0], [2, 0]]))
console.log(minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 5], [4, 0]]))
console.log(minReorder(6, [[4, 5], [1, 3], [2, 3], [4, 0], [0, 1]]))
