const db = require('../db/config');

class Character {
  findByCharacterName(name) {
    return db.oneOrNone(`SELECT * FROM characters WHERE name = $1`, name)
  }
  findOne(id) {
    return db.oneOrNone(`SELECT * FROM characters WHERE user_id = $1`, id)
  }
}

module.exports = Character
