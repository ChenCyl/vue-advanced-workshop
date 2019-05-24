
class Dep {

  constructor() {
    this.subs = []
  }

  depend() {
    this.subs.push(activeUpdate)
  }

  notify() {
    this.subs.forEach(sub => {
      // console.log(sub)
      sub()
    });
  }
}


let activeUpdate;

function autorun(update) {
  // function wrappedUpdate() {
  activeUpdate = update
  update()
  activeUpdate = null
  // }

}

const dep = new Dep()

autorun(() => {
  dep.depend()
  console.log('updated d')
})
// should log: "updated"

dep.notify()
// should log: "updated"