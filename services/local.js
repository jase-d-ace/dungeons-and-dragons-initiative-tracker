const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const userModel = require('../models/user');
const User = new userModel;
const authClass = require('./auth-helpers');
const AuthHelpers = new authClass;

const options = {
  usernameField: 'name',
  passwordField: 'password'
};

init();

passport.use('player',
  new LocalStrategy(options, (name, password, done) => {
    User.findByName(name)
    .then( user => {
      if (!user) {
        return done(null, false);
      };
      if (!AuthHelpers.comparePass(password, user.password_digest)) {
        return done(null, false);
      } else {
        return done(null, user);
      };
    })
    .catch( err => {
      console.log('messed up in local', err);
      return done(err);
    });
  })
);

module.exports = passport;

