import React from 'react'
import { Container, Content, InputGroup, Input, Icon, Button, Text } from 'native-base'
import { StyleSheet, Dimensions, Image, View } from 'react-native'
// import { Accounts } from 'react-native-meteor'
import Meteor from 'react-native-meteor'
import endsWith from 'underscore.string/endsWith'
import _ from 'underscore'

const propTypes = {

}

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: 'admin@federeichon.com',
      password: 'federeichon-admin'
    }
  }

  componentDidMount () {
    this.props.denyPan()
  }

  onSubmit () {
    if (_.isEmpty(this.state.user)) {
      this.setState({ userError: true })
      return false
    } else {
      this.setState({ userError: false })
    }

    if (_.isEmpty(this.state.password)) {
      this.setState({ passwordError: true })
      return false
    } else {
      this.setState({ passwordError: false })
    }

    Meteor.loginWithPassword(this.state.user, this.state.password, (error) => {
      if (error) {
        var errorMsg
        if (error.error === 403) {
          errorMsg = 'Usuario no encontrado'
        } else {
          errorMsg = 'Usuario y/o contraseña inválidos'
        }
        this.setState({error: errorMsg, userError: true, passwordError: true})
      } else {
        this.props.acceptPan()
        this.props.navigator.push({
          name: 'news'
        })
      }
    })
  }

  userInputChange (value) {
    var userError = false
    if (value || !_.isEmpty(value)) {
      userError = false
    } else {
      userError = true
    }

    if (!endsWith(value, '@alumnos.uai.cl')) {
      userError = true
    }

    this.setState({user: value, userError: userError})
  }

  passwordInputChange (value) {
    var passwordError = false
    if (value || !_.isEmpty(value)) {
      passwordError = false
    } else {
      passwordError = true
    }

    this.setState({user: value, passwordError: passwordError})
  }

  renderError () {
    if (this.state.error) {
      return <Text style={{alignSelf: 'center', color: 'red'}}>{this.state.error}</Text>
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <Image source={require('../../images/federeichon-logo.png')} style={styles.logo} />
          <View style={styles.form}>
            {this.renderError()}
            <InputGroup style={styles.input} error={this.state.userError}>
              <Icon name='md-person' />
              <Input placeholder='Usuario' value={this.state.user} onChangeText={this.userInputChange.bind(this)} />
            </InputGroup>
            <InputGroup style={styles.input} error={this.state.passwordError}>
              <Icon name='md-unlock' />
              <Input secureTextEntry placeholder='Contraseña' value={this.state.password} onChangeText={(value) => { this.setState({password: value}) }} />
            </InputGroup>
            <View style={styles.buttonContainer}>
              <Button style={{marginRight: 10}} onPress={this.onSubmit.bind(this)}>Iniciar sesión</Button><Button transparent style={{marginLeft: 10}}> Registrarme </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  form: {
    marginTop: 60
  },
  logo: {
    flex: 1,
    marginTop: 100,
    marginLeft: 50,
    resizeMode: 'contain',
    width: deviceWidth - 100
  },
  input: {
    marginBottom: 20
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: 'row'
  }
})

Login.propTypes = propTypes
