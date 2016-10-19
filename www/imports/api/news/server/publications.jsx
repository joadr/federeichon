import { Meteor } from 'meteor/meteor'
import News from '../news'

Meteor.publish('news.index', function () {
  return News.find()
})
