import React from 'react'
import * as Colors from 'material-ui/styles/colors'
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
    this.state = {}
    this.onError = this.onError.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.setContext = this.setContext.bind(this)
  }

  setContext (context) {
    this.context.router.push(`/${context}`)
  }

  checkIsReady () {
    if (this.props.token) return
    if (this.context.userId) {
      this.onSuccess()
    }
  }

  onSuccess () {
    if (this.props.children.props.returnPath) {
      FlowRouter.go(this.props.children.props.returnPath)
    } else {
      FlowRouter.go('my-account')
    }
  }

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

  renderLogo () {
    return (
      <div style={styles.logo}>
        <Logo />
      </div>
    )
  }

  renderForm () {
    const props = {
      onSuccess: this.onSuccess,
      onError: this.onError,
      setLoading: isLoading => this.setState({isLoading}),
      isLoading: this.state.isLoading,
      setContext: this.setContext,
      token: this.props.token,
      tos: this.renderTos()
    }
    return React.cloneElement(this.props.children, props)
  }

  renderTos () {
    return (
      <div style={styles.tos}>
        Al hacer click en registrarse aceptas la <a href='/politica-de-privacidad' target='_blank'>Política de privacidad</a> y los <a href='/teminos-y-condiciones' target='_blank'>Terminos y condiciones</a>
      </div>
    )
  }

  render () {
    this.checkIsReady()
    return (
      <div>
        {this.renderLogo()}
        <div style={{ color: Colors.red500, marginTop: 10, textAlign: 'center' }}>
          {this.state.errorMessage}
        </div>
        {this.renderForm()}
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

export default LoginForm
