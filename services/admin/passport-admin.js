const passport = require('passport');
const adminClass = require('../../models/admin');
const Admin = new adminClass;

module.exports = () => {
  passport.serializeUser( (user, done) => {
    done(null, user.name)
  });

  passport.deserializeUser( (name, done) => {
    Admin.findByName(name)
    .then( admin => {
      done(null, admin);
    })
    .catch( err => {
      done(err, null);
    });
  });
};
