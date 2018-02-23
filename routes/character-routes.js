const characterController = require('../controllers/character-controller');
const controller = new characterController;
const router = require('express').Router();

router.get('/', controller.show)

module.exports = router;
