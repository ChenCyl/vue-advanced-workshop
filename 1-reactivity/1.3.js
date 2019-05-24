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
        return value
      },
      set(newValue) {
        value = newValue
        dep.notify()
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

// 被观察的对象
let state = {
  count: 0
}

// 观察它
observe(state)

// 每次被观察的对象改变会触发 autorun 的参数 - update 函数
autorun(() => {
  console.log(state.count)
})
// should immediately log "count is: 0"

state.count++
// should log "count is: 1"
state.count++
