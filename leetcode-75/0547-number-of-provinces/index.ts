function findCircleNum(isConnected: number[][]): number {
  let numberOfProvices = 0
  const isSeen = new Array(isConnected.length).fill(false)

  isSeen.forEach((seen, id) => {
    if (seen) return

    const stack = [id]

    while (stack.length > 0) {
      const nextId = stack.pop()!
      isSeen[nextId] = true
      isConnected[nextId].forEach((connected, connectedId) => {
        if (!connected) return
        if (isSeen[connectedId]) return
        stack.push(connectedId)
      })
    }

    numberOfProvices++
  })

  return numberOfProvices
}

console.log(findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]))
console.log(findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))
