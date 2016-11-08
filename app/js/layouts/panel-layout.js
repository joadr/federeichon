import React from 'react'
import { Drawer, Text } from 'native-base'
import { View } from 'react-native'
import SideBar from '../components/side-bar'

const propTypes = {
  component: React.PropTypes.any
}

export default class PanelLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Drawer
        ref='drawer'
        type='overlay'
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.drawer.close()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3
          }
        }}
        tweenHandler={(ratio) => {
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2
            }
          }
        }}
        negotiatePan
      >
        <View>
          {this.props.component}
        </View>
      </Drawer>
    )
  }
}

PanelLayout.propTypes = propTypes
