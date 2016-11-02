import React from 'react'
import theme from './styles/theme'
import muiTheme from './styles/mui-theme'
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'underscore'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from '../components/subheader'

const propTypes = {
}

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
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

  setContext (context) {
    this.context.router.push(`/${context}`)
  }

  render () {
    return (
      <div>
        <AppBar />
        <Drawer open={this.state.open}>
          <Subheader text='Noticias' />
          <MenuItem onTouchTap={this.setContext.bind(this, 'admin/news')}>Ver Noticias</MenuItem>
          <MenuItem onTouchTap={this.setContext.bind(this, 'admin/news/create')}>Crear Noticia</MenuItem>
          <Subheader text='Encuestas' />
          <MenuItem onTouchTap={this.setContext.bind(this, 'admin/surveys')}>Ver Encuestas</MenuItem>
          <MenuItem onTouchTap={this.setContext.bind(this, 'admin/surveys/create')}>Crear Encuesta</MenuItem>
          <Subheader text='Votaciones' />
          <MenuItem onTouchTap={this.setContext.bind(this, 'admin/votings')}>Ver Votaciones</MenuItem>
          <MenuItem onTouchTap={this.setContext.bind(this, 'admin/votings/create')}>Crear Votacion</MenuItem>
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
Layout.contextTypes = contextTypes
