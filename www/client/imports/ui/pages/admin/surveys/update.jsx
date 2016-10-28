import React from 'react'
import { Form } from 'simple-react-form'
import Surveys from '../../../../../../imports/api/surveys/surveys'
import RaisedButton from 'material-ui/RaisedButton'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

class SurveysUpdate extends React.Component {
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
        <h1>Editar Encuesta</h1>
        <Form
          collection={Surveys}
          type='update'
          ref='form'
          doc={this.state.doc}
          onSuccess={(docId) => this.context.router.push('admin/surveys')}
        />
        <RaisedButton label='Editar' onTouchTap={() => this.refs.form.submit()} />
      </div>
    )
  }
}

SurveysUpdate.contextTypes = contextTypes

export default createContainer((props) => {
  const docId = props.params.docId

  const Handler = Meteor.subscribe('edit-surveys-byId', docId)
  const loading = !Handler.ready()

  const doc = Surveys.findOne()

  return {
    doc,
    loading
  }
}, SurveysUpdate)
