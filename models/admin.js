const db = require('../db/config');

class Admin {

  findByName(name) {
    return db.oneOrNone(`SELECT * FROM admins WHERE name = $1`, name);
  };

  create(admin) {
    return db.oneOrNone(`INSERT INTO admins(name, password_digest) VALUES($1, $2) RETURNING *`, [admin.name, admin.password_digest])
  };
};

module.exports = Admin;

