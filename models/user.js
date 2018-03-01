const db = require('../db/config');

class User {
  findByName(name) {
    return db.oneOrNone(`SELECT * FROM users WHERE name = $1`, name);
  };

  create(user) {
    return db.oneOrNone(`INSERT INTO users(name, password_digest) VALUES($1, $2) RETURNING *`, [user.name, user.password_digest])
  };
};

module.exports = User;
