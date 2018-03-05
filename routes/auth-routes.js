const router = require('express').Router();
const usersController = require('../controllers/users-controller');
const controller = new usersController;
const passport = require('../services/local');
const authClass = require('../services/auth-helpers');
const AuthHelpers = new authClass;
const adminClass = require('../controllers/admin-controller');
const adminController = new adminClass;

router.post('/player/login', passport.authenticate('player'), (req, res) => {
  res.redirect('/');
});

router.post('/admin/login', passport.authenticate('admin'), (req, res) => {
  res.redirect('/');
});

router.post('/player/register', controller.create);

router.post('/admin/register', adminController.create);

module.exports = router;
