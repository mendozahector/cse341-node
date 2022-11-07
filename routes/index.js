const express = require("express");
const router = express.Router();

const mainController = require('../controllers');
router.get('/', mainController.getAll);

router.use('/contacts', require('./contacts'))

// router.get('/', (req, res) => {
//   res.send('Lex Fridman!!!')
// })

module.exports = router;