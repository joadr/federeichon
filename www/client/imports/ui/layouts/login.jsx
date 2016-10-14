import React from 'react'
import Paper from 'material-ui/Paper'

const propTypes = {
  token: React.PropTypes.string,
  children: React.PropTypes.any
}

export default class LoginLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.background = 'linear-gradient(to bottom, #2196f3 0%,#4096ee 100%)'
  }

  renderContainer () {
    return (
      <div style={styles.container}>
        <Paper key='papercontainer' style={styles.paperContainer}>
          {this.props.children}
        </Paper>
      </div>
    )
  }

  render () {
    const backgroundImage = this.background
    return (
      <div style={{...styles.root, backgroundImage}}>
        {this.renderContainer()}
      </div>
    )
  }
}

LoginLayout.propTypes = propTypes

const styles = {
  root: {
    backgrondPosition: 'center',
    backgroundSize: 'cover',
    position: 'fixed',
    height: '100%',
    width: '100%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    overflow: 'auto'
  },
  paperContainer: {
    width: '100%',
    maxWidth: 400,
    margin: 20,
    padding: 40
  }
}

LoginLayout.propTypes = propTypes
