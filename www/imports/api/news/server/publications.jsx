import { Meteor } from 'meteor/meteor'
import News from '../news'

Meteor.publish('news-index', function () {
  return News.find()
})

Meteor.publish('edit-news-byId', function (newId) {
  return News.find({_id: newId})
})
