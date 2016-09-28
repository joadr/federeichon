import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

var News = new Mongo.Collection('news')

News.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Título'
  },
  body: {
    type: String,
    label: 'Cuerpo',
  },
  createdby: {
    type: String,
    label: 'Autor'
  },
  attachments: {
    type: [Object]
    label: 'Adjuntos'
    optional: true
  },
  
}))

export default News

