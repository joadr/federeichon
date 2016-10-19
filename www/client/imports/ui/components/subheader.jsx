import React from 'react'
import Typography from 'material-ui/styles/typography'

const propTypes = {
  text: React.PropTypes.string,
  insetSubheader: React.PropTypes.bool
}

export default class Subheader extends React.Component {
  constructor (props) {
    super(props)
    if (!this.props.insetSubheader) { this.props.insetSubheader = false }
  }

  getStyles () {
    return {
      color: Typography.textLightBlack,
      fontSize: 14,
      fontWeight: Typography.fontWeightMedium,
      lineHeight: '48px',
      paddingLeft: this.props.insetSubheader ? 72 : 16
    }
  }

  render () {
    return (
      <div style={this.getStyles()}>
        {this.props.text}
      </div>
    )
  }
}

Subheader.propTypes = propTypes
