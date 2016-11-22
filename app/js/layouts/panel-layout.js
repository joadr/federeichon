import React from 'react'
import { Drawer } from 'native-base'
import { Navigator, StatusBar } from 'react-native'
import SplashScreen from '../pages/splash'
import Login from '../pages/login'
import NotFound from '../pages/not-found'
import News from '../pages/news'
import SingleNew from '../pages/single-new'
import Surveys from '../pages/surveys'
import SingleSurvey from '../pages/single-survey'
import SideBar from '../components/side-bar'

const propTypes = {
  component: React.PropTypes.any
}

const NoBackSwipe = {
  ...Navigator.SceneConfigs.FloatFromBottom,
  gestures: {
    pop: {}
  }
}

export default class PanelLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      acceptPan: false
    }
    this.renderScene = this.renderScene.bind(this)
  }

  openDrawer () {
    this._drawer.open()
  }

  closeDrawer () {
    this._drawer.close()
  }

  getNavigator () {
    return this.refs.nav
  }

  navigate (route) {
    this.getNavigator().push({ name: route })
    this._drawer.close()
  }

  acceptPan () {
    this.setState({
      acceptPan: true
    })
  }

  denyPan () {
    this.setState({
      acceptPan: false
    })
  }

  // Navigator stuff
  renderScene (route, navigator) {
    console.log('loading route:', route.name, route)
    switch (route.name) {
      case 'splash':
        return <SplashScreen navigator={navigator} denyPan={this.denyPan.bind(this)} />
      case 'login':
        return <Login navigator={navigator} acceptPan={this.acceptPan.bind(this)} denyPan={this.denyPan.bind(this)} />
      case 'news':
        return <News navigator={navigator} acceptPan={this.acceptPan.bind(this)} />
      case 'singleNew':
        return <SingleNew navigator={navigator} id={route.id} />
      case 'surveys':
        return <Surveys navigator={navigator} acceptPan={this.acceptPan.bind(this)} />
      case 'singleSurvey':
        return <SingleSurvey navigator={navigator} id={route.id} />
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
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        type='overlay'
        tweenDuration={150}
        content={<SideBar navigate={this.navigate.bind(this)} />}
        tapToClose
        acceptPan={this.state.acceptPan}
        onClose={() => this.closeDrawer.bind(this)}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3
          }
        }}
        tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2
            }
          }
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor='#EE4611'
          barStyle='light-content'
         />
        <Navigator
          initialRoute={{name: 'splash', index: 0}}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          ref='nav'
        />
      </Drawer>
    )
  }
}

PanelLayout.propTypes = propTypes
