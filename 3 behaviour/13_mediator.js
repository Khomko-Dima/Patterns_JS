class User {
  constructor(name) {
    this.name = name
    this.room = null
  }

  send(message, to) {
    this.room.send(message, this, to)
  }

  receive(message, from) {
    console.log(`${from.name} => ${this.name}: ${message}`)
  }
}

class ChatRoom {
  constructor() {
    this.users = {}
  }

  register(user) {
    this.users[user.name] = user
    user.room = this
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from)
    } else {
      Object.keys(this.users).forEach(key => {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from)
        }
      })
    }
  }
}

const dima = new User('Dima')
const lena = new User('Lena')
const max = new User('Max')

const room = new ChatRoom()

room.register(dima)
room.register(lena)
room.register(max)

dima.send('Hello!', lena)
lena.send('Hello hello!', dima)
max.send('Vsem privet')
