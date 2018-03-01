const router = require('express').Router();
const usersController = require('../controllers/users-controller');
const controller = new usersController;
const passport = require('../services/local');
const authClass = require('../services/auth-helpers');
const AuthHelpers = new authClass;


router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.post('/register', controller.create);

module.exports = router;
