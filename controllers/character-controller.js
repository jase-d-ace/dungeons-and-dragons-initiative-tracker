const character = require('../models/character');
const Character = new character;

class Controller {
  show(req, res) {
    Character.findOne(1)
    .then( character => {
      res.json({
        message: 'OK',
        character,
        status: 200
      })
    })
    .catch( err => {
      console.log('noooo', err)
      res.status(500).json(err)
    })
  }
}

module.exports = Controller;
