import React, { PureComponent, PropTypes } from 'react'
import {Link} from 'react-router'
import {root} from 'baobab-react/higher-order'

import store from '../../store'
import Actions from '../actions'

import LocaleProvider from 'antd/lib/locale-provider'
import enUS from 'antd/lib/locale-provider/en_US'

import Header from './Header'

const styles = {
  app: {
    height: '100%'
  }
};

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <LocaleProvider locale={enUS}>
        <div style={styles.app}>
          <Header />
          <div>
            {this.props.children}
          </div>
        </div>
      </LocaleProvider>
    );
  }
}

export default root(store, App);
