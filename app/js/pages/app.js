/**
 * Federeichon Project Mobile Application
 * https://github.com/joadr/federeichon
 */

import React from 'react'
import { Navigator } from 'react-native'
import SplashScreen from './splash'
import Login from './login'
import NotFound from './not-found'
import PanelLayout from '../layouts/panel-layout'
import News from './news'

const NoBackSwipe = {
  ...Navigator.SceneConfigs.FloatFromBottom,
  gestures: {
    pop: {}
  }
}

export default class App extends React.Component {
  renderScene (route, navigator) {
    console.log('loading route:', route.name)
    switch (route.name) {
      case 'splash':
        return <SplashScreen navigator={navigator} />
      case 'login':
        return <Login navigator={navigator} />
      case 'news':
        return <PanelLayout navigator={navigator} component={News} />
      default:
        return <NotFound />
    }
  }

  configureScene (route) {
    switch (route.name) {
      case 'login':
        return NoBackSwipe
      case 'news':
        return NoBackSwipe
      default:
        return Navigator.SceneConfigs.FloatFromRight
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{name: 'splash', index: 0}}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    )
  }
}
