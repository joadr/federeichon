import '../imports/startup/server/index'

import News from '../imports/api/news/news'
import Surveys from '../imports/api/surveys/surveys'
import Votings from '../imports/api/votings/votings'

global.News = News
global.Surveys = Surveys
global.Votings = Votings
