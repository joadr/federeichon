import React from 'react'
import LoginForm from '../../components/login-form'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderForm () {
    return (
      <LoginForm />
    )
  }

  render () {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}
