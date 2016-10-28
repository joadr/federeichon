import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from './home'
import VotingsCreate from './create'
import VotingsUpdate from './update'

export default (
  <Route path='votings'>
    <IndexRoute component={Home} />
    <Route path='create' component={VotingsCreate} />
    <Route path='update/:docId' component={VotingsUpdate} />
  </Route>
)
