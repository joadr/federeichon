import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from './home'
import NewsCreate from './create'

export default (
  <Route path='news'>
    <IndexRoute component={Home} />
    <Route path='create' component={NewsCreate} />
  </Route>
)
