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
    type: Object,
    label: 'Adjuntos',
    optional: true,
    srf: {
      type: File,
      upload: uploadFunction
      // delete: deleteFunction,
      // multi: true
    }
  },
  createdBy: {
    type: String,
    label: 'Autor',
    optional: true,
    autoValue: function () {
      return this.userId
    },
    srf: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date()
      }
    },
    srf: {
      omit: true
    }
  }
}))

News.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.createdBy === userId)
  },
  update: function (userId, doc, fields, modifier) {
    // the user must be logged in, and the document must be owned by the user
    return doc.createdBy === userId
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.createdBy === userId
  },
  fetch: ['createdBy']
})

export default News

