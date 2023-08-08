const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting')
const User = require('../models/user')

// get all meetings
router.get('/', async function (req, res, next) {
  res.send(await Meeting.find())
})

// create a new meeting
router.post('/', async function (req, res, next) {
  const { creator, name, date, location, description } = req.body

  const user = await User.findById(creator)
  if (!user) return next({ status: 404, message: 'User not found' })

  const newMeeting = await user.createMeeting(name, date, location, description)

  res.send(newMeeting)
})

// get meeting details by id
router.get('/:id', async function (req, res, next) {
  const meeting = await Meeting.findById(req.params.id)

  res.send(meeting)
})

// attend a meeting
router.post('/:id/attendees', async function (req, res, next) {
  const meeting = await Meeting.findById(req.params.id)
  const user = await User.findById(req.body.attendee)

  await user.joinMeeting(meeting)

  res.send(meeting)
})

// leave a meeting
router.delete('/:meetingId/attendees/:attendeeId', async function (req, res, next) {
  const meeting = await Meeting.findById(req.params.meetingId)
  const user = await User.findById(req.params.attendeeId)

  await user.leaveMeeting(meeting)

  res.send(meeting)
})

module.exports = router
