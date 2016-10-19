import React from 'react'
import { Form } from 'simple-react-form'
import News from '../../../../../../imports/api/news/news'
import RaisedButton from 'material-ui/RaisedButton'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

const contextTypes = {
  userId: React.PropTypes.string,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

class NewsUpdate extends React.Component {
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
        <h1>Editar Noticia</h1>
        <Form
          collection={News}
          type='update'
          ref='form'
          doc={this.state.doc}
          onSuccess={(docId) => this.context.router.push('admin/news')}
        />
        <RaisedButton label='Editar' onTouchTap={() => this.refs.form.submit()} />
      </div>
    )
  }
}

NewsUpdate.contextTypes = contextTypes

export default createContainer((props) => {
  const docId = props.params.docId

  const Handler = Meteor.subscribe('edit-news-byId', docId)
  const loading = !Handler.ready()

  const doc = News.findOne()

  return {
    doc,
    loading
  }
}, NewsUpdate)
