import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
/* import admin from './admin/index'
import news from './news/index'
import surveys from './surveys/index'
import votings from './votings/index' */
import Auth from './auth'
import Home from './home'
import Root from '../layouts/root'

// Load routes in here
render((
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      {Auth}
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('react-root'))
