import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'

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
    label: 'Candidatos'
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
    srf: {
      type: Text
    }
  },
  'candidates.$.members': {
    type: [String],
    label: 'Miembros'
  },
  'candidates.$.votes': {
    type: [String],
    label: 'Votos'
  }
}))

export default Votings

