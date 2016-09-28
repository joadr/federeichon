import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

var Surveys = new Mongo.Collection('surveys')

Surveys.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título'
  },
  description: {
    type: String,
    label: 'Descripción',
    optional: true
  },
  options: {
    type: [Object],
    label: 'Opciones'
  },
  'options.$.name': {
    type: String,
    label: 'Nombre'
  },
  'options.$.description': {
    type: String,
    label: 'Descripción',
    optional: true
  },
  'options.$.votes': {
    type: [String],
    label: 'Votos'
  }
  
}))

export default Surveys

