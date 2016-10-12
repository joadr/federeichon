import React from 'react'
import {Form} from 'simple-react-form'
import Votings from '../../../../../imports/api/votings/votings'
import RaisedButton from 'material-ui/RaisedButton'

class VotingsCreate extends React.Component {
  render() {
    return (
      <div>
        <h1>Create voting</h1>
        <Form
        collection={Votings}
        type='insert'
        ref='form'
        onSuccess={(docId) => alert('Created')}/>
        <RaisedButton label='Create' onTouchTap={() => this.refs.form.submit()}/>
      </div>
    )
  },
}