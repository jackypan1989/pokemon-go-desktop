import fs from 'fs'
import socketIO from 'socket.io'
import store from '../store'
import {pickPlayer, pickInventory} from './utils'
import pogobuf from 'pogobuf'
import Long from 'long'
import R from 'ramda'

let loginCache = []
let client
let io = socketIO()

async function init(account) {
  let predicates = R.allPass([
    R.propEq('username', account.username),
    R.propEq('provider', account.provider)
  ])
  let {username, password, lat, lng} = R.find(predicates, loginCache)
  let login = new pogobuf.GoogleLogin()
  const token = await login.login(username, password)
  client = new pogobuf.Client()
  client.setAuthInfo('google', token)
  client.setPosition(lat, lng)
  await client.init()
  store.set(['currentAccount'], {username, password, lat, lng})
  await getInventory()
}

async function getInventory() {
  let inventory = await client.getInventory(0)
  inventory = pogobuf.Utils.splitInventory(inventory)
  store.set(['inventory', 'pokemon'], inventory.pokemon)
}

async function releasePokemon(id) {
  id = Long.fromString(id, true)
  let result = await client.releasePokemon(id)
  console.log(result)
  await getInventory()
}

async function releasePokemonBatch(ids) {
  client.batchStart()
  R.forEach(id => client.releasePokemon(Long.fromString(id, true)), ids)
  let results = await client.batchCall()
  console.log(results)
  await getInventory()
}

function loadAccounts() {
  // check cache
  try {
    loginCache = JSON.parse(fs.readFileSync(__dirname+'/.loginCache'))
  } catch(e) {}

  if (loginCache.length > 0) {
    let accounts =
      R.map(
        x => R.pick(['username', 'provider', 'lat', 'lng'], x),
        loginCache
      )
    store.set('accounts', accounts)
  }
}

function addAccount({username, password, provider, lat, lng}) {
  lat = parseFloat(lat)
  lng = parseFloat(lng)

  // add account
  let predicates = R.allPass([
    R.propEq('username', username),
    R.propEq('provider', provider)
  ]);
  let index = R.findIndex(predicates, loginCache);
  if (index !== -1) {
    loginCache[index] = {username, password, provider, lat, lng}
  } else {
    loginCache.push({username, password, provider, lat, lng})
  }

  // write file
  try {
    fs.writeFileSync(
      __dirname+'/.loginCache',
      JSON.stringify(loginCache, null, 2)
    )
  } catch(e) {}

  if (loginCache.length > 0) {
    let accounts =
      R.map(
        x => R.pick(['username', 'provider', 'lat', 'lng'], x),
        loginCache
      )
    store.set('accounts', accounts)
  }
}

function removeAccount({username, provider}) {
  // find account and remove
  let predicates = R.allPass([
    R.propEq('username', username),
    R.propEq('provider', provider)
  ]);
  let index = R.findIndex(predicates, loginCache)
  loginCache = R.remove(index, 1, loginCache)

  // write file
  try {
    fs.writeFileSync(
      __dirname+'/.loginCache',
      JSON.stringify(loginCache, null, 2)
    )
  } catch(e) {}

  if (loginCache.length > 0) {
    let accounts =
      R.map(
        x => R.pick(['username', 'provider', 'lat', 'lng'], x),
        loginCache
      )
    store.set('accounts', accounts)
  } else {
    store.set('accounts', [])
  }
}

export default server => {


  io.attach(server)
  io.on('connection', socket => {
    // check socket
    console.log('Socket connected: ' + socket.id)

    // when server store updated, emit to client
    store.on('update', () => {
      socket.emit('store-update', store.get())
    })

    // listen client event
    socket.on('addAccount', (account) => addAccount(account))
    socket.on('removeAccount', (account) => removeAccount(account))
    socket.on('login', (account) => init(account))
    socket.on('getInventory', () => getInventory())
    socket.on('releasePokemon', ({id}) => releasePokemon(id))
    socket.on('releasePokemonBatch', ({ids}) => releasePokemonBatch(ids))

    // load
    loadAccounts()
  })
}
