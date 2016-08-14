import React, { PureComponent } from 'react'
import {branch} from 'baobab-react/higher-order'
import Actions from '../actions'

import Button from 'antd/lib/button';
const ButtonGroup = Button.Group;

const styles = {
  minHeight: 300,
  padding: 16
}

class Controller extends PureComponent {
  render() {
    let {
      location = {},
      profile = {},
      inventory = {},
      mapObjects = {}
    } = this.props

    return <div style={styles}>
      <br/>
      <ButtonGroup>
        <Button icon='up' onClick={()=>Actions.Go('up')}></Button>
        <Button icon='right' onClick={()=>Actions.Go('right')}></Button>
        <Button icon='down' onClick={()=>Actions.Go('down')}></Button>
        <Button icon='left' onClick={()=>Actions.Go('left')}></Button>
      </ButtonGroup>
      <br/>
      <br/>
      <Button onClick={()=>Actions.GetMapObjects()}>Refresh</Button>
      <Button onClick={()=>Actions.CollectFort()}>Collect Fort</Button>
      <Button onClick={()=>Actions.CatchPokemon()}>Catch Pokemon</Button>
    </div>
  }
}

export default branch({
  logs: ['logs'],
  location: ['location'],
  profile: ['profile'],
  inventory: ['inventory'],
  mapObjects: ['mapObjects']
}, Controller)
