import React from 'react'
import {red500} from 'material-ui/styles/colors'
import autobind from 'autobind-decorator'
import { Meteor } from 'meteor/meteor'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
// import Logo from '../../components/logo'

const propTypes = {
  token: React.PropTypes.string,
  children: React.PropTypes.any
}

const defaultProps = {

}

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

export default class LoginForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  @autobind
  setContext (context) {
    this.context.router.push(`/${context}`)
  }

  @autobind
  setLoading (isLoading) {
    this.setState({isLoading})
  }

  checkIsReady () {
    if (this.props.token) return
    if (this.context.userId) {
      this.onSuccess()
    }
  }

  @autobind
  startLogin () {
    console.log('dead mouse')
    if (!this.state.email || !this.state.password) {
      this.onError({ reason: 'Debes completar introducir tu email y contraseña' })
      return
    }

    this.refs.email.blur()
    this.refs.password.blur()

    this.setLoading(true)
    setTimeout(() => {
      Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
        this.setLoading(false)
        if (error) {
          this.onError(error)
        } else {
          this.onSuccess()
        }
      })
    }, 400)
  }

  @autobind
  onSuccess () {
    const {location} = this.context
    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/admin')
    }
  }

  @autobind
  onError (error) {
    if (error.error === 403) {
      if (error.reason === 'Email already exists.') {
        this.setState({errorMessage: 'El email ya existe'})
      } else if (error.reason === 'Incorrect password') {
        this.setState({errorMessage: 'Contraseña incorrecta'})
      } else if (error.reason === 'User not found') {
        this.setState({errorMessage: 'Usuario no encontrado'})
      } else {
        this.setState({errorMessage: error.reason})
      }
    } else {
      this.setState({ errorMessage: error.reason })
    }
    console.log('Auth error', error)
  }

  @autobind
  onKeyDownEmail (event) {
    if (event.keyCode === 13) {
      this.refs.password.focus()
    }
  }

  @autobind
  onKeyDownPassword (event) {
    if (event.keyCode === 13) {
      this.startLogin()
    }
  }

  renderLogo () {
    return (
      <div style={styles.logo}>
        Logo
      </div>
    )
  }

  renderButton () {
    return (
      <RaisedButton
        label='Entrar'
        disabled={this.state.isLoading}
        secondary
        onTouchTap={this.startLogin}
        fullWidth
        style={{ marginTop: 20 }}
      />
    )
  }

  renderMessages () {
    return (
      <p style={{fontSize: 14}}>
        Si no tienes cuenta <a style={{cursor: 'pointer'}} onTouchTap={() => this.setContext('signup')}>registrate</a>. Si olvidaste tu contraseña haz click <a style={{cursor: 'pointer'}} onTouchTap={() => this.setContext('forgot')}>aquí</a>.
      </p>
    )
  }

  renderTos () {
    return (
      <div style={styles.tos}>
        Al hacer click en registrarse aceptas la <a href='/politica-de-privacidad' target='_blank'>Política de privacidad</a> y los <a href='/teminos-y-condiciones' target='_blank'>Terminos y condiciones</a>
      </div>
    )
  }

  renderForm () {
    return (
      <div>
        <TextField
          floatingLabelText='Email'
          type='email'
          ref='email'
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          fullWidth
          onKeyDown={this.onKeyDownEmail}
        />
        <TextField
          floatingLabelText='Contraseña'
          type='password'
          ref='password'
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
          fullWidth
          onKeyDown={this.onKeyDownPassword}
        />
        {this.renderButton()}
      </div>
    )
  }

  render () {
    this.checkIsReady()
    return (
      <div>
        {this.renderLogo()}
        <div style={{ color: red500, marginTop: 10, textAlign: 'center' }}>
          {this.state.errorMessage}
        </div>
        {this.renderForm()}
        {this.renderMessages()}
        {this.renderTos()}
      </div>
    )
  }

}

const styles = {
  logo: {
    textAlign: 'center'
  },
  tos: {
    fontSize: 12
  }
}

LoginForm.propTypes = propTypes
LoginForm.defaultProps = defaultProps
LoginForm.contextTypes = contextTypes
