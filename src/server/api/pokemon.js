import pogobuf from 'pogobuf'

const pokemon = (client, store) => ({
  getInventory: async function getInventory() {
    let inventory = await client.getInventory(0)
    inventory = pogobuf.Utils.splitInventory(inventory);
    store.set(['inventory', 'pokemon'], inventory.pokemon)
    console.log('haha')
  }
})

export async function getInventory() {
  let inventory = await client.getInventory(0)
  inventory = pogobuf.Utils.splitInventory(inventory);
  store.set(['inventory', 'pokemon'], inventory.pokemon)
  console.log('haha')
}
