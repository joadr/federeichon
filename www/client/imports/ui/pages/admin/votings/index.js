import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from './home'
import VotingsCreate from './create'

export default (
  <Route path='votings'>
    <IndexRoute component={Home} />
    <Route path='create' component={VotingsCreate} />
  </Route>
)
