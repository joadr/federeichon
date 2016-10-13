import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {createContainer} from 'meteor/react-meteor-data'
import _ from 'underscore'
import muiTheme from './styles/mui-theme'
import theme from './styles/theme'
// import Loading from './loading'
import {Meteor} from 'meteor/meteor'

const propTypes = {
  children: React.PropTypes.any, // the children nodes
  user: React.PropTypes.object, // logged in user
  userId: React.PropTypes.string, // logged in user id
  loggingIn: React.PropTypes.bool.isRequired, // is logginIn?
  connectionStatus: React.PropTypes.object.isRequired,
  roles: React.PropTypes.arrayOf(React.PropTypes.string),
  mustBeLoggedIn: React.PropTypes.bool, // True or false if the route requires logged in
  loginComponent: React.PropTypes.any // The login component to be rendered.
}

const defaultProps = {

}

const childContextTypes = {
  user: React.PropTypes.object,
  userId: React.PropTypes.string,
  loggingIn: React.PropTypes.bool
}

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  getChildContext () {
    return {
      user: this.props.user,
      userId: this.props.userId,
      loggingIn: this.props.loggingIn
    }
  }

  hasPermissions () {
    if (!this.props.roles) return true
    if (!this.props.user) return false
    if (!this.props.user.roles) return false
    // var hasRole = _.contains(this.props.user.roles, 'admin')
    let hasRole = false
    _.each(this.props.roles, (role) => {
      if (_.contains(this.props.user.roles, role)) {
        hasRole = true
      }
    })
    return hasRole
  }

  renderContent () {
    if (this.props.loggingIn && false) {
      return (
        <div>Cargando...</div>
      )
      // <Loading />
    }

    if (this.props.mustBeLoggedIn && !this.props.userId) {
      if (this.props.loginComponent) {
        return React.createElement(this.props.loginComponent)
      } else {
        return this.renderNotLoggedIn()
      }
    }

    if (!this.hasPermissions()) {
      return this.renderNoPermissions()
    }

    return (
      <div>
        {this.props.children}
      </div>
    )
  }

  renderNoPermissions () {
    return (
      <div>
        <h4 style={{ textAlign: 'center' }}>No tienes los permisos para usar este modulo</h4>
      </div>
    )
  }

  renderNotLoggedIn () {
    return (
      <div>
        <h4 style={{ textAlign: 'center' }}>Debes estar conectado</h4>
      </div>
    )
  }

  render () {
    return (
      <div>
        <MuiThemeProvider muiTheme={_.extend(getMuiTheme(theme), muiTheme)}>
          <div>
            {this.renderContent()}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}

Root.propTypes = propTypes
Root.defaultProps = defaultProps
Root.childContextTypes = childContextTypes

export default createContainer(() => {
  let status = {status: 'connected', connected: true, retryCount: 0}
  if (Meteor.isClient) status = Meteor.status()
  return {
    user: Meteor.user(),
    userId: Meteor.userId(),
    loggingIn: Meteor.loggingIn(),
    connectionStatus: status
  }
}, Root)
