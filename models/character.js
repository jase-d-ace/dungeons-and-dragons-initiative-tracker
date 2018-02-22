const db = require('../db/config');

class Character {
  findOne(id) {
    return db.oneOrNone(`SELECT *, characters.name FROM characters JOIN spells ON spells.character_id = 1 WHERE characters.id=$1`, id);
  }
}

module.exports = Character
