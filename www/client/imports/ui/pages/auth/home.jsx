import React from 'react'
import LoginForm from '../../components/login-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderForm () {
    return (
      <LoginForm>
        <TextField
          floatingLabelText='Email'
          type='email'
          ref='email'
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          fullWidth
          onKeyDown={this.onKeyDownEmail.bind(this)}
        />
        <TextField
          floatingLabelText='Contraseña'
          type='password'
          ref='password'
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
          fullWidth
          onKeyDown={this.onKeyDownPassword.bind(this)}
        />
        {this.renderButton()}
      </LoginForm>
    )
  }

  renderButton () {
    return (
      <RaisedButton
        label='Entrar'
        disabled={this.props.isLoading}
        secondary
        onTouchTap={this.startLogin}
        fullWidth
        style={{ marginTop: 20 }}
      />
    )
  }

  onKeyDownEmail (event) {
    if (event.keyCode === 13) {
      this.refs.password.focus()
    }
  }

  onKeyDownPassword (event) {
    if (event.keyCode === 13) {
      this.startLogin()
    }
  }

  renderMessages () {
    return (
      <p style={{fontSize: 14}}>
        Si no tienes cuenta <a style={{cursor: 'pointer'}} onTouchTap={() => FlowRouter.go('signup')}>registrate</a>. Si olvidaste tu contraseña haz click <a style={{cursor: 'pointer'}} onTouchTap={() => this.props.setContext('forgot')}>aquí</a>.
      </p>
    )
  }

  render () {
    return (
      <div>
        {this.renderForm()}
        {this.renderMessages()}
        {this.props.tos}
      </div>
    )
  }
}
