import R from 'ramda'

const playerFields = [
  'username',
  'prvider',
  'latitude',
  'longitude',
  'level',
  'experience',
  'prev_level_xp',
  'next_level_xp'
]

const inventoryFields = [
  'items',
  'pokemons',
  'eggs',
  'candies'
]

export default {
  pickPlayer: R.pick(playerFields),
  pickInventory: R.pick(inventoryFields)
}
