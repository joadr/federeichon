import React from 'react'
import { Drawer } from 'native-base'
import { Platform, StyleSheet, Dimensions, Navigator } from 'react-native'
import SplashScreen from '../pages/splash'
import Login from '../pages/login'
import NotFound from '../pages/not-found'
import News from '../pages/news'
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
    this.getNavigator().push({name: route})
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
    console.log('loading route:', route.name)
    switch (route.name) {
      case 'splash':
        return <SplashScreen navigator={navigator} denyPan={this.denyPan.bind(this)} />
      case 'login':
        return <Login navigator={navigator} acceptPan={this.acceptPan.bind(this)} denyPan={this.denyPan.bind(this)} />
      case 'news':
        return <News navigator={navigator} acceptPan={this.acceptPan.bind(this)} />
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
        <Navigator
          initialRoute={{name: 'splash', index: 0}}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene}
          ref='nav'
        />
      </Drawer>
    )
  }
}

PanelLayout.propTypes = propTypes

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: 'stretch',
    // resizeMode: 'cover',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover'
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingLeft: 11,
    paddingTop: (Platform.OS === 'android') ? 7 : 5
  },
  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: (Platform.OS === 'android') ? 21 : 25,
    backgroundColor: 'transparent'
  },
  text: {
    fontWeight: '500',
    fontSize: 16
  }
})
