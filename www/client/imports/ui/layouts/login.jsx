import React from 'react'
import theme from './styles/theme'
import muiTheme from './styles/mui-theme'
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'underscore'
import FlatButton from 'material-ui/FlatButton'

const propTypes = {
}

const childContextTypes = {
  muiTheme: React.PropTypes.object
}

export default class Layout extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      muiTheme: _.extend(getMuiTheme(theme), muiTheme)
    }

    this.handleSignIn = this.handleSignIn.bind(this)
  }

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme
    }
  }

  handleSignIn () {
  }

  render () {
    return (
      <div>
        <AppBar
          title='Federeichon'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          iconElementRight={<FlatButton label='Iniciar sesión' onTouchTap={this.handleSignIn} />}
        />
        {this.props.children}
      </div>
    )
  }

}

Layout.propTypes = propTypes
Layout.childContextTypes = childContextTypes
