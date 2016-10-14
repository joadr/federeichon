import React from 'react'
import {Route} from 'react-router'
import LoginLayout from '../../layouts/login'
import Home from './home'

export default (
  <Route component={LoginLayout}>
    <Route path='/login' component={Home} />
  </Route>
)
