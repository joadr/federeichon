import React from 'react'
import {Route, IndexRoute} from 'react-router'
import requireAuth from '../../../../../imports/api/users/require-auth.jsx'
import AdminLayout from '../../layouts/admin'
import Home from './home'
import News from './news'

export default (
  <Route path='admin' component={AdminLayout} {...requireAuth()}>
    <IndexRoute component={Home} />
    {News}
  </Route>
)
