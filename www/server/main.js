import '../imports/startup/server/index'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import News from '../imports/api/news/news'
import Surveys from '../imports/api/surveys/surveys'
import Votings from '../imports/api/votings/votings'

global.News = News
global.Surveys = Surveys
global.Votings = Votings

/*Meteor.startup(() => {
  Accounts.createUser({email: 'admin@federeichon.com', 'password': 'federeichon-admin'})
})
*/
