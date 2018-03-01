const passport = require('passport');
const userClass = require('../models/user');
const User = new userClass;

module.exports = () => {
  passport.serializeUser( (user, done) => {
    done(null, user.name)
  });

  passport.deserializeUser( (name, done) => {
    User.findByName(name)
    .then( user => {
      done(null, user);
    })
    .catch( err => {
      done(err, null);
    });
  });
};

