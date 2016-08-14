import Baobab from 'baobab'
import DemoPlayer from './shared/player'
import DemoInventory from './shared/inventory'

// lat: 37.7921513,
// lng: -122.3909161,

const store = new Baobab({
  accounts: [],
  currentAccount: {},
  player: {},
  inventory: {}
})

store.on('invalid', function(e) {
  console.log('Error:', e.data.error);
})

export default store
