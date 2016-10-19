import React from 'react'
import theme from './styles/theme'
import muiTheme from './styles/mui-theme'
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'underscore'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from '../components/subheader'
import autobind from 'autobind-decorator'

const propTypes = {
}

const childContextTypes = {
  muiTheme: React.PropTypes.object
}

export default class Layout extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      muiTheme: _.extend(getMuiTheme(theme), muiTheme),
      open: true
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

  @autobind
  redirectNewsIndex () {
    console.log('redirecting...')
  }

  @autobind
  redirectNewsCreate () {
    console.log('redirecting 2...')
  }

  render () {
    return (
      <div>
        <AppBar />
        <Drawer open={this.state.open}>
          <Subheader text='Noticias' />
          <MenuItem onTouchTap={this.redirectNewsIndex}>Ver Noticias</MenuItem>
          <MenuItem onTouchTap={this.redirectNewsCreate}>Crear Noticia</MenuItem>
        </Drawer>
        <div style={{marginLeft: 256, padding: 10}}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

Layout.propTypes = propTypes
Layout.childContextTypes = childContextTypes
