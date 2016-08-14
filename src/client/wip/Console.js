import React, { PureComponent } from 'react'
import {branch} from 'baobab-react/higher-order'

const styles = {
  flex: 1,
  backgroundColor: 'black',
  color: 'lime',
  padding: 16
}

class Console extends PureComponent {
  render() {
    let {
      logs = [],
    } = this.props

    return <div style={styles}>
      {logs.map(log=><div>{log}</div>)}
    </div>
  }
}

export default branch({
  logs: ['logs']
}, Console)
