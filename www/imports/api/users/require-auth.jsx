import { Meteor } from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'

// requireAuth Function
export default function requireAuth () {
  return {
    onEnter: function (nextState, replace, callback) {
      checkAuth(nextState, replace, callback)
    },
    onChange: function (prevState, nextState, replace, callback) {
      checkAuth(nextState, replace, callback)
    }
  }
}

function checkAuth (nextState, replace, callback) {
  waitForLoginState(() => {
    if (!Meteor.user()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
      callback()
    } else {
      callback()
    }
  })
}

function waitForLoginState (done) {
  Tracker.autorun((computation) => {
    if (!Meteor.loggingIn()) {
      computation.stop()
      done()
    }
  })
}
