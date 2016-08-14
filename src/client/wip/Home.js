import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import {branch} from 'baobab-react/higher-order'

import PokeMap from './PokeMap'
import Controller from './Controller'
import Console from './Console'
import Actions from '../actions'

const styles = {
  root: {
    display: 'flex',
    height: '100%'
  },
  map: {
    flex: 1,
    minWidth: 400
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 400
  }
}

class Home extends PureComponent {
  static defaultProps = {
    center: {lat: 37.7921513, lng: -122.3909161},
    zoom: 18
  };

  render() {
    let {
      logs,
      location,
      profile,
      inventory,
      mapObjects
    } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.map}>
          <PokeMap />
        </div>
        <div style={styles.panel}>
          <Console />
          <Controller />
        </div>
      </div>
    );
  }
}

export default branch({
  logs: ['logs'],
  location: ['location'],
  profile: ['profile'],
  inventory: ['inventory'],
  mapObjects: ['mapObjects']
}, Home);
