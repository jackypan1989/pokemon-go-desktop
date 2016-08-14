import React from 'react'
import {Link} from 'react-router'
import {branch} from 'baobab-react/higher-order'
import {Menu} from 'antd'

const styles = {
  logo: {
    height: 48,
    marginLeft: 24,
    marginRight: 24,
    float: 'left'
  },
  logo_img: {
    height: 32,
    marginTop: 8,
    verticalAlign: 'top'
  },
  username: {
    marginRight: 24,
    float: 'right'
  }
}

class Header extends React.Component {
  render () {
    const {
      account
    } = this.props

    return <Menu theme='dark' mode='horizontal'
      defaultSelectedKeys={['1']} style={{lineHeight: '48px'}}>
      <div style={styles.logo}>
        <img style={styles.logo_img} src='http://localhost:3000/pixel_icons/Poke_Stop_Plus.png'/>
        Pokemon GO Desktop
      </div>
      <Menu.Item key='1'><Link to='/accounts'>Account</Link></Menu.Item>
      <Menu.Item key='2'><Link to='/pokemons'>Pokemon</Link></Menu.Item>
      {account.username?<div style={styles.username}>{account.username}</div>
        :<div style={styles.username}>Please login ...</div>}
    </Menu>
  }
}

export default branch({
  account: ['currentAccount']
}, Header)
