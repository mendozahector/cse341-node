const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lex Fridman!!!')
  })

module.exports = router;