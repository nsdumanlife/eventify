const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(
    User.list.map(user => ({ name: user.name, age: user.age, meetings: user.meetings.map(meeting => meeting.name) }))
  )
})

// get a single user
router.get('/:userName', function (req, res, next) {
  const { userName } = req.params
  const user = User.list.find(user => user.name === userName)

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
router.delete('/:userName', function (req, res, next) {
  const { userName } = req.params
  const userIndex = User.list.findIndex(user => user.name === userName)
  User.list.splice(userIndex, 1)

  res.sendStatus(200)
})

// get all meetings of a user
router.get('/:userName/meetings', function (req, res, next) {
  const { userName } = req.params
  const user = User.list.find(user => user.name === userName)

  res.send(
    user.meetings.map(meeting => ({
      name: meeting.name,
      location: meeting.location,
      date: meeting.date,
      description: meeting.description,
    }))
  )
})

// get a single meeting of a user

module.exports = router
