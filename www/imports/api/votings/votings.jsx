import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'
import Array from 'simple-react-form-material-ui/lib/array'
import Checkbox from 'simple-react-form-material-ui/lib/checkbox'
import Tags from 'simple-react-form-material-ui/lib/tags'

var Votings = new Mongo.Collection('votings')

Votings.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título',
    srf: {
      type: Text
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
  candidates: {
    type: [Object], // Means it'll be an array of objects
    label: 'Candidatos',
    srf: {
      type: Array
    }
  },
  // the '.$.' means that is an attribute of an array's object, in case it's just and object, you just write candidates.name
  'candidates.$.name': {
    type: String,
    label: 'Nombre',
    srf: {
      type: Text
    }
  },
  'candidates.$.description': {
    type: String,
    label: 'Descripción',
    optional: true,
    srf: {
      type: Text
    }
  },
  'candidates.$.members': {
    type: [String],
    label: 'Miembros',
    srf: {
      type: Tags
    }
  },
  'candidates.$.votes': {
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
  },
  enabled: {
    type: Boolean,
    label: 'Habilitado',
    optional: true,
    srf: {
      type: Checkbox
    }
  }
}))

Votings.allow({
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

export default Votings

