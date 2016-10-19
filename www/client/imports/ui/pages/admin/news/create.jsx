import React from 'react'
import { Form } from 'simple-react-form'
import News from '../../../../../../imports/api/news/news'
import RaisedButton from 'material-ui/RaisedButton'

export default class NewsCreate extends React.Component {
  render () {
    return (
      <div>
        <h1>Crear Noticia</h1>
        <Form
          collection={News}
          type='insert'
          ref='form'
          onSuccess={(docId) => global.alert('Posted')} />
        <RaisedButton label='Create' onTouchTap={() => this.refs.form.submit()} />
      </div>
    )
  }
}
