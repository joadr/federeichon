import React from 'react'
import { Form } from 'simple-react-form'
import Votings from '../../../../../../imports/api/votings/votings'
import RaisedButton from 'material-ui/RaisedButton'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

class VotingsUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      doc: props.doc
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      doc: nextProps.doc
    })
  }

  render () {
    return (
      <div>
        <h1>Editar Votacion</h1>
        <Form
          collection={Votings}
          type='update'
          ref='form'
          doc={this.state.doc}
          onSuccess={(docId) => this.context.router.push('admin/votings')}
        />
        <RaisedButton label='Editar' onTouchTap={() => this.refs.form.submit()} />
      </div>
    )
  }
}

VotingsUpdate.contextTypes = contextTypes

export default createContainer((props) => {
  const docId = props.params.docId

  const Handler = Meteor.subscribe('edit-votings-byId', docId)
  const loading = !Handler.ready()

  const doc = Votings.findOne()

  return {
    doc,
    loading
  }
}, VotingsUpdate)
