const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport-admin');
const adminModel = require('../../models/admin');
const Admin = new adminModel;
const authClass = require('../auth-helpers');
const AuthHelpers = new authClass;

const options = {
  usernameField: 'name',
  passwordField: 'password'
};

init();

passport.use('admin',
  new LocalStrategy(options, (name, password, done) => {
    Admin.findByName(name)
    .then( admin => {
      if (!admin) {
        return done(null, false);
      };
      if (!AuthHelpers.comparePass(password, admin.password_digest)) {
        return done(null, false);
      } else {
        return done(null, admin);
      };
    })
    .catch( err => {
      return done(err)
    });
  })
);

module.exports = passport
