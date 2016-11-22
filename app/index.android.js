/**
 * Federeichon Project App
 * https://github.com/joadr/federeichon
 */
import Meteor from 'react-native-meteor'
import PanelLayout from './js/layouts/panel-layout'
import { AppRegistry } from 'react-native'

Meteor.connect('ws://45.55.141.9/websocket')

AppRegistry.registerComponent('Federeichon', () => PanelLayout)
