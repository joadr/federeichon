import { Meteor } from 'meteor/meteor'
import Votings from '../votings'

Meteor.publish('votings-index', function () {
  return Votings.find()
})

Meteor.publish('edit-votings-byId', function (newId) {
  return Votings.find({_id: newId})
})
