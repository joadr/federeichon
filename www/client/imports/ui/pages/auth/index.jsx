import React from 'react'
import Home from './home'
import login from '../../layouts/login'
import {Route, IndexRoute} from 'react-router'

export default (
  <Route path='/login' component={login}>
    <IndexRoute component={Home} />
  </Route>
)
