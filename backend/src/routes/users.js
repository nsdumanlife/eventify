const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})

// get a single user
router.get('/:userId', async function (req, res, next) {
  const { userId } = req.params
  const user = await User.findById(userId)

  if (!user) {
    return next({ status: 404, message: 'User not found' })
  }

  res.send(user)
})

// create a user with a name
router.post('/', async function (req, res, next) {
  const { name, age, email, password } = req.body

  const user = await User.register({ name, email, age }, password)

  res.send(user)
})

// update a user
router.put('/:userId', async function (req, res, next) {
  const { userId } = req.params
  const { newValues } = req.body

  const updatedUser = await User.findByIdAndUpdate(userId, { $set: newValues }, { new: true })

  res.send(updatedUser)
})

// delete a user
router.delete('/:userId', async function (req, res, next) {
  const { userId } = req.params

  await User.findByIdAndDelete(userId)

  res.sendStatus(200)
})

// get all meetings of a user
router.get('/:userId/meetings', async function (req, res, next) {
  const { userId } = req.params
  const user = await User.findById(userId)

  if (!user) {
    return next({ status: 404, message: 'User not found' })
  }

  res.send(user.meetings)
})

module.exports = router
