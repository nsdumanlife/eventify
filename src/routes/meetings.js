const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting')
const User = require('../models/user')
const meeting = require('../models/meeting')

/* GET meetings listing. */
router.get('/', async function (req, res, next) {
  const allMeetings = await Meeting.find()
  if (req.query.view === 'json') {
    return res.send(allMeetings)
  }

  res.render('meetings', { meetings: allMeetings })
})

// get a single meeting
router.get('/:meetingId', async function (req, res, next) {
  const { meetingId } = req.params
  const meeting = await Meeting.findById(meetingId)

  if (req.query.view === 'json') {
    return res.send(meeting)
  }

  res.render('meeting-detail', { meeting })
})

// create a new meeting
router.post('/', async function (req, res, next) {
  const { name, location, date, description, userId } = req.body
  const user = await User.findById(userId)
  const newMeeting = await user.createMeeting(name, location, date, description)

  res.send(newMeeting)
})

// user joins a meeting
router.post('/:meetingId/attendees', async function (req, res, next) {
  const { meetingId } = req.params
  const { userId } = req.body
  const meeting = await Meeting.findById(meetingId)
  const user = await User.findById(userId)

  await user.joinMeeting(meeting)

  res.send(meeting)
})

// user leaves a meeting
router.delete('/:meetingId/attendees/:userId', async function (req, res, next) {
  const { meetingId, userId } = req.params
  const meeting = await Meeting.findById(meetingId)
  const user = await User.findById(userId)

  await user.leaveMeeting(meeting)

  res.send(meeting)
})

module.exports = router
