import R from 'ramda'

const cp_tier = {
  S: [
    'Dragonite', 'Snorlax', 'Lapras', 'Arcanine', 'Vaporeon',
    'Gyarados', 'Exeggutor', 'Muk', 'Weezing', 'Flareon'
  ],
  A: [
    'Slowbro', 'Victreebel', 'Machamp', 'Poliwrath', 'Clefable',
    'Nidoking', 'Venusaur', 'Charizard', 'Golduck', 'Magmar',
    'Nidoqueen', 'Vileplume', 'Blastoise', 'Weezing', 'Omastar',
    'Aerodactyl', 'Golem', 'Wigglytuff', 'Dewgong', 'Ninetales',
    'Magmar', 'Blastoise', 'Kabutops', 'Electabuzz', 'Starmie',
    'Jolteon', 'Rapidash', 'Pinsir', 'Scyther', 'Tentacruel',
    'Gengar', 'Hypno', 'Pidgeot', 'Rhydon', 'Seaking',
    'Kangaskhan', 'Cloyster', 'Pinsir'
  ],
  B: [
    'Primeape', 'Golbat', 'Raichu', 'Cloyster', 'Kingler',
    'Tauros', 'Magneton', 'Venomoth', 'Alakazam', 'Tangela',
    'Dragonair', 'Arbok', 'Dodrio', 'Growlythe', 'Porygon',
    'Machoke', 'Fearow', 'Parasect', 'Sandslash',	'Jynx',
    'Lickitung', 'Seadra', 'Marowak', 'Ivysaur', 'Persian',
    'Drowzee', 'Electrode', 'Hitmonchan', 'Hitmonlee', 'Mr. Mime',
    'Gloom', 'Ponyta', 'Weepinbell', 'Raticate', 'Beedrill',
    'Butterfree', 'Pidgeotto', 'Haunter', 'Eevee', 'Dugtrio',
    'Clefairy', 'Polywhirl', 'Kadabra', 'Bellsprout', 'Seel',
    'Koffing', 'Rhyhorn', 'Kabuto'
  ],
  F: [
    'Oddish', 'Squirtle', 'Bulbasaur', 'Charmander', 'Dratini',
    'Onix', 'Vulpix', 'Paras', 'Pikachu', 'Mankey', 'Magnemite',
    'Ekans', 'Sandshrew', 'Zubat', 'Geodude', 'Gastly',
    'Pidgey', 'Doduo', 'Abra', 'Chansey', 'Rattata',
    'Diglett', 'Magikarp'
  ]
}

export default {
  getTier: (name) =>
    R.pipe(
      R.pickBy(
        (val, key) => R.contains(name, val)
      ),
      R.keys(),
      R.head()
    )(cp_tier) || 'N/A'
}
