import React, { PureComponent } from 'react'
import {branch} from 'baobab-react/higher-order'

import geolib from 'geolib'
import GoogleMap from 'google-map-react'

let distance = (x, y) =>
  geolib.getDistance(x, y)

let MapObject = (props) =>
  <div><img style={{width: 40}} src={props.src}/></div>

let playerpin = location => {
  return (<MapObject
    lat={location.latitude}
    lng={location.longitude}
    src={`http:/localhost:3000/pixel_icons/Poke_Stop_Plus.png`}
  />)
}

let catchable_pokemons = items => {
  return items.map(item => {
    return <MapObject
      lat={item.latitude}
      lng={item.longitude}
      src={`http:/localhost:3000/pixel_icons/${item.pokemon_id}.png`}
    />
  })
}

let forts = (items, location) => {
  return items.map(item => {
    let {latitude, longitude} = item
    let src = `http:/localhost:3000/pixel_icons/Poke_Stop_Blue.png`

    if (distance({latitude, longitude}, location) > 40) {
      if (item.lure_info) {
        src = `http:/localhost:3000/pixel_icons/Poke_Stop_FarAwayWithConfetti.png`
      } else {
        src = `http:/localhost:3000/pixel_icons/Poke_Stop_FarAway.png`
      }
    } else {
      if (!item.cooldown) {
        if (item.lure_info) {
          src = `http:/localhost:3000/pixel_icons/Poke_Stop_BlueWithConfetti.png`
        } else {
          src = `http:/localhost:3000/pixel_icons/Poke_Stop_Blue.png`
        }
      } else {
        if (item.lure_info) {
          src = `http:/localhost:3000/pixel_icons/Poke_Stop_PurpleWithConfetti.png`
        } else {
          src = `http:/localhost:3000/pixel_icons/Poke_Stop_Purple.png`
        }
      }
    }

    return <MapObject
      lat={item.latitude}
      lng={item.longitude}
      src={src}
    />
  })
}

class PokeMap extends PureComponent {
  render() {
    let {
      location,
      mapObjects
    } = this.props

    return <GoogleMap
      center={{lat: location.latitude, lng: location.longitude}}
      zoom={18}>
    </GoogleMap>
  }
}

export default branch({
  location: ['location'],
  mapObjects: ['mapObjects'],
}, PokeMap)
