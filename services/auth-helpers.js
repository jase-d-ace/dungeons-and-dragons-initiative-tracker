const bcrypt = require('bcryptjs');

class AuthHelpers {

  comparePass(userPass, dbPass) {
    return bcrypt.compareSync(userPass, dbPass);
  };

  loginRedirect(req, res, next) {
    if (req.user) return res.redirect('/');
    return next();
  };

  loginRequired(req, res, next) {
    if (!req.user) return res.redirect('/auth/login');
    return next();
  };
};

module.exports = AuthHelpers;
