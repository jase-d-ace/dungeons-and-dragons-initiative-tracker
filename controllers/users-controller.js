const userModel = require('../models/user');
const User = new userModel;
const bcrypt = require('bcryptjs');

class UsersController {
  create(req, res) {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.create({
      name: req.body.name,
      password_digest: hash
    })
    .then( user => {
      res.json({
        message: 'we\'re good, buddy!',
        user
      });
    })
    .catch( err => {
      console.log('user is NOT live', err);
      res.status(500).json({
        message: 'nooooo',
        err
      });
    });
  };
};

module.exports = UsersController;
