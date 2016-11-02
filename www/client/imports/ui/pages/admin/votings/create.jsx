import React from 'react'
import { Form } from 'simple-react-form'
import Votings from '../../../../../../imports/api/votings/votings'
import RaisedButton from 'material-ui/RaisedButton'

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

export default class VotingsCreate extends React.Component {
  render () {
    return (
      <div>
        <h1>Crear Votacion</h1>
        <Form
          collection={Votings}
          type='insert'
          ref='form'
          onSuccess={(docId) => this.context.router.push('/admin/votings')}
        />
        <RaisedButton label='Create' onTouchTap={() => this.refs.form.submit()} />
      </div>
    )
  }
}

VotingsCreate.contextTypes = contextTypes
