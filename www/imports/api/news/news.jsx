import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import File from 'simple-react-form-material-ui/lib/file'
import { deleteFunction, uploadFunction } from './upload'

var News = new Mongo.Collection('news')

News.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título',
    srf: {
      type: Text
    }
  },
  body: {
    type: String,
    label: 'Cuerpo',
    srf: {
      type: Textarea
    }
  },
  attachments: {
    type: [Object],
    label: 'Adjuntos',
    optional: true,
    srf: {
      type: File,
      upload: uploadFunction,
      delete: deleteFunction,
      multi: true
    }
  },
  createdby: {
    type: String,
    label: 'Autor',
    autoValue: function () {
      return this.userId
    },
    srf: {
      omit: true
    }
  }
}))

export default News

