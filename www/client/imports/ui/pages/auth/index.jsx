import React from 'react'
import Home from './home'
import LoginLayout from '../../layouts/login'
import {Route, IndexRoute} from 'react-router'

export default (
  <Route path='/login' component={LoginLayout}>
    <IndexRoute component={Home} />
  </Route>
)
