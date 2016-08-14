import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Pokemons from './components/Pokemons'
import Accounts from './components/Accounts'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Accounts} />
    <Route path='pokemons' component={Pokemons}/>
    <Route path='accounts' component={Accounts}/>
  </Route>
);
