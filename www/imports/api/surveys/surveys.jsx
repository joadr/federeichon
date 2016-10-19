import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'

var Surveys = new Mongo.Collection('surveys')

Surveys.attachSchema(new SimpleSchema({
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
  options: {
    type: [Object],
    label: 'Opciones'
  },
  'options.$.name': {
    type: String,
    label: 'Nombre',
    srf: {
      type: Text
    }
  },
  'options.$.description': {
    type: String,
    label: 'Descripción',
    optional: true,
    srf: {
      type: Text
    }
  },
  'options.$.votes': {
    type: [String],
    label: 'Votos'
  }
}))

export default Surveys

