import React from 'react'
import { Form } from 'simple-react-form'
import Surveys from '../../../../../../imports/api/surveys/surveys'
import RaisedButton from 'material-ui/RaisedButton'

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

export default class SurveysCreate extends React.Component {
  render () {
    return (
      <div>
        <h1>Crear Encuesta</h1>
        <Form
          collection={Surveys}
          type='insert'
          ref='form'
          onSuccess={(docId) => this.context.router.push('/admin/surveys')}
        />
        <RaisedButton label='Create' onTouchTap={() => this.refs.form.submit()} />
      </div>
    )
  }
}

SurveysCreate.contextTypes = contextTypes
