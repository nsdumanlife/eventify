const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting')
const User = require('../models/user')
const meeting = require('../models/meeting')

/* GET meetings listing. */
router.get('/', async function (req, res, next) {
  const allMeetings = await Meeting.find()

  if (!allMeetings) return next({ status: 404, message: 'Meetings not found' })

  res.send(allMeetings)
})

// get a single meeting
router.get('/:meetingId', async function (req, res, next) {
  const { meetingId } = req.params
  const meeting = await Meeting.findById(meetingId)

  if (!meeting) return next({ status: 404, message: 'Meeting not found' })

  res.send(meeting)
})

// create a new meeting
router.post('/', async function (req, res, next) {
  const { name, location, date, time, description, userId } = req.body
  const user = await User.findById(userId)

  if (!user) return next({ status: 404, message: 'User not found' })

  const newMeeting = await user.createMeeting(name, location, date, time, description)

  res.send(newMeeting)
})

// user joins a meeting
router.post('/:meetingId/attendees', async function (req, res, next) {
  const { meetingId } = req.params
  const { userId } = req.body
  const meeting = await Meeting.findById(meetingId)

  if (!meeting) return next({ status: 404, message: 'Meeting not found' })

  const user = await User.findById(userId)

  if (!user) return next({ status: 404, message: 'User not found' })

  const updatedMeeting = await user.joinMeeting(meeting)

  res.send(updatedMeeting)
})

// user leaves a meeting
router.delete('/:meetingId/attendees/:userId', async function (req, res, next) {
  const { meetingId, userId } = req.params
  const meeting = await Meeting.findById(meetingId)

  if (!meeting) return next({ status: 404, message: 'Meeting not found' })

  const user = await User.findById(userId)

  if (!user) return next({ status: 404, message: 'User not found' })

  await user.leaveMeeting(meeting)

  res.send(meeting)
})

module.exports = router
