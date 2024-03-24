function canVisitAllRooms(rooms: number[][]): boolean {
  const keys = [0]
  const visitedRooms: number[] = []

  while (keys.length > 0) {
    const roomId = keys.pop()!
    if (visitedRooms.includes(roomId)) continue
    // console.log({ rooms, roomId, keys, visitedRooms })
    visitedRooms.push(roomId)

    rooms[roomId].forEach(key => {
      if (visitedRooms.includes(key)) return
      if (!keys.includes(key)) keys.push(key)
    })
  }

  // console.log(visitedRooms)
  return visitedRooms.length === rooms.length
}

console.log(canVisitAllRooms([[1], [2], [3], []]))
console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]))
console.log(canVisitAllRooms([[1, 2], [2, 1], [1]]))
console.log(canVisitAllRooms([[1, 3, 2], [2, 3], [2, 3, 1], []]))
