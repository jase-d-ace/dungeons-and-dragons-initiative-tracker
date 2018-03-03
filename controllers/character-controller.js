const character = require('../models/character');
const Character = new character;

class CharacterController {
  show(req, res) {
    Character.findOne(req.user.id)
    .then( character => {
      res.json({
        message: 'OK',
        character,
        status: 200
      })
    })
    .catch( err => {
      res.status(500).json(err)
    })
  }
}

module.exports = CharacterController;
