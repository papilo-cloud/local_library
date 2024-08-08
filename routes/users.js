const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userId', (req, res, next) => {
  // res.send("That's cool!!")
  res.send(req.params)
})

router.get('/cool', (req, res, next) => {
  res.send("You're so cool!")
})

module.exports = router;
