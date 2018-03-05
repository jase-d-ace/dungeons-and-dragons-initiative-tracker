const adminModel = require ('../models/admin');
const Admin = new adminModel;
const bcrypt = require('bcryptjs');

class AdminController {
  create(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    Admin.create({
      name: req.body.name,
      password_digest: hash
    })
    .then( admin => {
      res.json({
        message: 'GET DOWN WITH YOU DM SELF',
        admin
      });
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({
        message: 'noo',
        err
      });
    });
  };
};

module.exports = AdminController;

