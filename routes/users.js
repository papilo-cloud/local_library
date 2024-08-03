const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', (req, res, next) => {
  res.send("That's cool!!")
})

module.exports = router;
