const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting')
const User = require('../models/user')

// get all meetings
router.get('/', function (req, res, next) {
  res.send(Meeting.list)
})

// create a new meeting
router.post('/', async function (req, res, next) {
  const { creator, name, date, location, description } = req.body
  const user = User.list.find(user => user.name === creator.name)
  const newMeeting = user.createMeeting(name, date, location, description)

  res.send(newMeeting)
})

// get meeting details by id
router.get('/:id', function (req, res, next) {
  const meeting = Meeting.list.find(meeting => meeting.name === req.params.id)

  res.send(meeting)
})

// attend a meeting
router.post('/:id/attendees', async function (req, res, next) {
  const meeting = Meeting.list.find(meeting => meeting.name === req.params.id)
  const user = User.list.find(user => user.name === req.body.user)

  user.joinMeeting(meeting)

  res.send(meeting)
})

// leave a meeting
router.delete('/:meetingId/attendees/:attendeeId', async function (req, res, next) {
  const meeting = Meeting.list.find(meeting => meeting.name === req.params.meetingId)
  const user = User.list.find(user => user.name === req.params.attendeeId)

  user.leaveMeeting(meeting)

  res.send(meeting)
})

module.exports = router
