import React from 'react'
import {Form} from 'simple-react-form'
import Surveys from '../../../../../imports/api/surveys/surveys'
import RaisedButton from 'material-ui/RaisedButton'

class SurveysCreate extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a survey</h1>
        <Form
        collection={Surveys}
        type='insert'
        ref='form'
        onSuccess={(docId) => alert('Created')}/>
        <RaisedButton label='Create' onTouchTap={() => this.refs.form.submit()}/>
      </div>
    )
  },
}