import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from './home'
import SurveysCreate from './create'
import SurveysUpdate from './update'

export default (
  <Route path='surveys'>
    <IndexRoute component={Home} />
    <Route path='create' component={SurveysCreate} />
    <Route path='update/:docId' component={SurveysUpdate} />
  </Route>
)
