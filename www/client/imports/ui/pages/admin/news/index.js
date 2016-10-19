import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from './home'
import NewsCreate from './create'
import NewsUpdate from './update'

export default (
  <Route path='news'>
    <IndexRoute component={Home} />
    <Route path='create' component={NewsCreate} />
    <Route path='update/:docId' component={NewsUpdate} />
  </Route>
)
