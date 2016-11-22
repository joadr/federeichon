import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'
import Array from 'simple-react-form-material-ui/lib/array'
import slugify from 'underscore.string/slugify'

var Surveys = new Mongo.Collection('surveys')

Surveys.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título',
    srf: {
      type: Text
    }
  },
  slug: {
    type: String,
    label: 'slug',
    optional: true,
    srf: {
      omit: true
    },
    autovalue: function () {
      var content = this.field('title').value
      return slugify(content)
    }
  },
  description: {
    type: String,
    label: 'Descripción',
    optional: true,
    srf: {
      type: Text
    }
  },
  questions: {
    type: [Object],
    label: 'Preguntas',
    srf: {
      type: Array
    }
  },
  'questions.$.question': {
    type: String,
    label: 'Pregunta',
    srf: {
      type: Text
    }
  },
  'questions.$.options': {
    type: [Object],
    label: 'Opciones',
    srf: {
      type: Array
    }
  },
  'questions.$.options.$.name': {
    type: String,
    label: 'Nombre',
    srf: {
      type: Text
    }
  },
  'questions.$.options.$.description': {
    type: String,
    label: 'Descripción',
    optional: true,
    srf: {
      type: Text
    }
  },
  'questions.$.options.$.votes': {
    type: [String],
    label: 'Votos',
    optional: true,
    srf: {
      type: Array,
      omit: true
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

Surveys.allow({
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

export default Surveys

