const express = require('express')
const router = express.Router()
const User = require('../user')

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
router.post('/', function (req, res, next) {
  const { name, age } = req.body
  const newUser = User.create({ name, age })

  res.send(newUser)
})

// update a user
router.put('/:userName', function (req, res, next) {
  const { userName } = req.params
  const { newValues } = req.body
  const userIndex = User.list.findIndex(user => user.name === userName)

  const updatedUser = { ...User.list[userIndex], ...newValues }

  User.list.splice(userIndex, 1, updatedUser)

  res.send({
    name: updatedUser.name,
    age: updatedUser.age,
    meetings: updatedUser.meetings.map(meeting => meeting.name),
  })
})

// delete a user
router.delete('/:userName', function (req, res, next) {
  const { userName } = req.params
  const userIndex = User.list.findIndex(user => user.name === userName)
  User.list.splice(userIndex, 1)

  res.sendStatus(200)
})

module.exports = router
