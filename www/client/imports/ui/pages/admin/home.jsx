import React from 'react'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render () {
    return (
      <div>
        <h1>Admin Panel</h1>
      </div>
    )
  }
}
