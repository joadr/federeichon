import React from 'react'
import { Radio, Text, List, ListItem } from 'native-base'
import { FieldType } from 'simple-react-form'

const propTypes = {
  ...FieldType.propTypes,
  /**
   * The options for the select input. Each item must have label and value.
   */
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    description: React.PropTypes.string
  })).isRequired
}

export default class RadioComponent extends React.Component {

  renderOptions () {
    return this.props.options.map((option, index) => {
      return (
        <ListItem key={index}>
          <Radio name={option.name} selected={option.value === this.props.value} onPress={() => this.props.onChange(option.value)} />
          <Text onPress={() => this.props.onChange(option.value)}>{option.label}</Text>
          <Text style={{color: 'red'}}>{this.props.errorMessage}</Text>
        </ListItem>
      )
    })
  }

  render () {
    return (
      <List>
        {this.renderOptions()}
      </List>
    )
  }
}

RadioComponent.propTypes = propTypes
