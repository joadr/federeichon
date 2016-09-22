import React from 'react'
import {render} from 'react-dom'
import login from '../layouts/login'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
/*import admin from './admin/index'
import news from './news/index'
import surveys from './surveys/index'
import votings from './votings/index'*/
import auth from './auth/index'
import Home from './auth/home'

// Load routes in here
render((
  <Router history={browserHistory}>
    <Route path='/' component={login}>
      <IndexRoute component={Home} />
      {auth}
{/*      {news}
      {surveys}
      {votings}
      {admin}*/}
    </Route>
  </Router>
), document.getElementById('react-root'))
