import { Meteor } from 'meteor/meteor'
import Surveys from '../surveys'

Meteor.publish('surveys-index', function () {
  return Surveys.find()
})

Meteor.publish('edit-surveys-byId', function (newId) {
  return Surveys.find({_id: newId})
})
