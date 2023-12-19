const express = require('express')
const router = express.Router()
const User = require('../user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

// get a single user
router.get('/:userName', function (req, res, next) {
  const { userName } = req.params
  const user = User.list.find(user => user.name === userName)

  res.send(user)
})

// create a new user
router.post('/', function (req, res, next) {
  const { name, age } = req.body
  const newUser = User.create({ name, age })

  res.send(newUser)
})

module.exports = router
