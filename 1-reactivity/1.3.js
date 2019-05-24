class Dep{
  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

function observe (obj) {
  let dep = new Dep()
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        console.log("count is: " + value)
        return value
      },
      set(newValue) {
        dep.notify()
        console.log("count is: " + newValue)
        value = newValue
      },
      configurable: true,
      enumerable: true
    })
  })
}

let activeUpdate;
function autorun (update) {
  activeUpdate = update
  update()
  activeUpdate = null
}

//

let state = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(state.count)
})
// should immediately log "count is: 0"

state.count++
// should log "count is: 1"