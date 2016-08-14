import R from 'ramda';
import stat from '../shared/stat'

import {ecpm, findPokemonLV} from '../shared/ecpm'
import {getTier} from '../shared/cp_tier'

export default {
  calcStat: R.pipe(
    R.filter(x=>x.pokemon_id),
    R.map(x=>{
      return ({
      ...x,
      img: `http://localhost:3000/pixel_icons/${x.pokemon_id}.png`,
      name: stat[x.pokemon_id-1].Identifier,
      base_attack: stat[x.pokemon_id-1].BaseAttack,
      base_defense: stat[x.pokemon_id-1].BaseDefense,
      base_stamina: stat[x.pokemon_id-1].BaseStamina,
      ecpm: x.cp_multiplier + x.additional_cp_multiplier,
      iv_perfect: (x.individual_attack + x.individual_defense + x.individual_stamina)/45,
      level: findPokemonLV(x.cp_multiplier)
    })}),
    R.map(x=>({
      ...x,
      calc_cp: R.max(
        10,
        (x.base_attack + x.individual_attack)
        * Math.pow((x.base_defense + x.individual_defense), 0.5)
        * Math.pow((x.base_stamina + x.individual_stamina), 0.5)
        * Math.pow(x.ecpm, 2) / 10
      ),
      hp: R.max(
        10,
        Math.round(x.ecpm * (x.base_stamina + x.individual_stamina) * 2)
      ),
      cp_tier: getTier(x.name),
      attack: x.base_attack + x.individual_attack,
      defense: x.base_defense + x.individual_defense,
      stamina: x.base_stamina + x.individual_stamina
    }))
  )
}
