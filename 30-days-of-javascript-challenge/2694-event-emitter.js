class EventEmitter {
  constructor () {
    this.eventMap = {}
  }

  subscribe(event, cb) {
    const id = Math.random()
    if (this.eventMap[event]) {
      this.eventMap[event][id] = cb
    }
    else {
      this.eventMap[event] = {
        [id]: cb
      }
    }
    return {
        unsubscribe: () => {
          this.eventMap[event][id] = null
        }
    };
  }

  emit(event, args = []) {
    if (!this.eventMap[event]) return []

    const rlt = []
    for (const id in this.eventMap[event]) {
      const cb = this.eventMap[event][id]
      if (!cb) return
      rlt.push(cb(...args))
    }
    return rlt
  }
}

const emitter = new EventEmitter();

// Subscribe to the onClick event with onClickCallback
function onClickCallback() { return 99 }
const sub = emitter.subscribe('onClick', onClickCallback);

emitter.emit('onClick'); // [99]
sub.unsubscribe(); // undefined
emitter.emit('onClick'); // []
