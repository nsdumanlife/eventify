const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

// Get user details by id
router.get('/:id', function (req, res, next) {
  const user = User.list.find(user => user.name === req.params.id)
  res.send(user)
})

// Create a new user
router.post('/', async function (req, res, next) {
  const user = User.create({ name: req.body.name })
  res.send(user)
})

// Update a user
router.put('/:id', async function (req, res, next) {
  try {
    const user = User.list.find(user => user.name === req.params.id)
    user.name = req.body.name
    res.send(user)
  } catch (error) {
    res.status(404).send('User not found')
  }
})

module.exports = router
