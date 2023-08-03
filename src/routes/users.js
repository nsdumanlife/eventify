const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find()

  res.send(users)
})

// Get user details by id
router.get('/:id', async function (req, res, next) {
  const user = await User.findById(req.params.id)
  res.send(user)
})

// Create a new user
router.post('/', async function (req, res, next) {
  const user = await User.create({ name: req.body.name })
  res.send(user)
})

// Update a user
router.put('/:id', async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    res.send(user)
  } catch (error) {
    res.status(404).send('User not found')
  }
})

module.exports = router
