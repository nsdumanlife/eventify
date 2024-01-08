const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})

// get a single user
router.get('/:userName', async function (req, res, next) {
  const { userName } = req.params
  const user = await User.findOne({ name: userName })

  res.send(user)
})

// create a new user
router.post('/', async function (req, res, next) {
  const { name, age } = req.body
  const newUser = await User.create({ name, age })

  res.send(newUser)
})

// update a user
router.put('/:userName', async function (req, res, next) {
  const { userName } = req.params
  const { newValues } = req.body

  const updatedUser = await User.findOneAndUpdate({ name: userName }, { $set: newValues }, { new: true })

  res.send(updatedUser)
})

// delete a user
router.delete('/:userName', async function (req, res, next) {
  const { userName } = req.params

  await User.findOneAndDelete({ name: userName })

  res.sendStatus(200)
})

// get all meetings of a user
router.get('/:userName/meetings', async function (req, res, next) {
  const { userName } = req.params
  const user = await User.findOne({ name: userName })

  res.send(user.meetings)
})

module.exports = router
