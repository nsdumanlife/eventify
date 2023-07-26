const express = require('express')
const router = express.Router()
const User = require('../user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/', async function (req, res, next) {
  const user = User.create({ name: req.body.name })
  res.send(user)
})

module.exports = router
