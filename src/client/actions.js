import store from '../store'

let socket = io('http://localhost:3000')

socket.on('store-update', data => {
  store.set(data)
  console.log(data)
})

export default {
  login: (account) => socket.emit('login', account),
  addAccount: (account) => socket.emit('addAccount', account),
  removeAccount: (account) => socket.emit('removeAccount', account),
  releasePokemon: (id) => socket.emit('releasePokemon', {id: id}),
  releasePokemonBatch: (ids) => socket.emit('releasePokemonBatch', {ids: ids}),
  releasePokemon: (id) => socket.emit('releasePokemon', {id: id}),
};
