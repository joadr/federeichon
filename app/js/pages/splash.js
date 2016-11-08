import { StyleSheet, Dimensions, Image } from 'react-native'
import { Container, Text, Content } from 'native-base'
import React from 'react'
import Meteor, { createContainer } from 'react-native-meteor'
import _ from 'underscore'

Meteor.connect('ws://45.55.141.9/websocket')

class Splash extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: props.status,
      userId: props.userId || false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (_.isEqual(nextProps.status, this.state.status)) {
      return false
    }
    console.log(nextProps.status)
    this.setState({
      status: nextProps.status,
      userId: nextProps.userId
    }, () => {
      this.checkLogin()
    })
  }

  checkLogin () {
    if (this.state.status) {
      if (!this.state.userId) {
        console.log('Going for login')
        this.props.navigator.push({
          name: 'login'
        })
      } else {
        this.props.navigator.push({
          name: 'news'
        })
      }
    }
  }
  status () {
    if (this.state.status) {
      return 'Connected'
    } else {
      return 'Disconnected'
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <Image source={require('../../images/federeichon-logo.png')} style={styles.logo} />
          <Text>Status: {this.status()}</Text>
        </Content>
      </Container>
    )
  }
}

export default createContainer((params) => {
  return {
    status: Meteor.status().connected,
    userId: Meteor.userId()
  }
}, Splash)

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5722'
  },
  logo: {
    flex: 1,
    marginTop: deviceHeight / 2.5,
    resizeMode: 'contain',
    // backgroundColor: 'black',
    width: deviceWidth
    // width: 100
  }
})
