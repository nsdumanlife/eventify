const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting')
const User = require('../models/user')

/* GET meetings listing. */
router.get('/', async function (req, res, next) {
  const allMeetings = await Meeting.find()
  if (req.query.view === 'json') {
    return res.send(allMeetings)
  }

  res.render('meetings', { meetings: allMeetings })
})

// get a single meeting
router.get('/:meetingName', async function (req, res, next) {
  const { meetingName } = req.params
  const meeting = await Meeting.findOne({ name: meetingName })

  if (req.query.view === 'json') {
    return res.send(meeting)
  }

  res.render('meeting-detail', { meeting })
})

// create a new meeting
router.post('/', async function (req, res, next) {
  const { name, location, date, description, userName } = req.body
  const user = await User.findOne({ name: userName })
  const newMeeting = await user.createMeeting(name, location, date, description)

  res.send({
    name: newMeeting.name,
    location: newMeeting.location,
    date: newMeeting.date,
    description: newMeeting.description,
  })
})

// user joins a meeting
router.post('/:meetingName/attendees', async function (req, res, next) {
  const { meetingName } = req.params
  const { userName } = req.body
  const meeting = await Meeting.findOne({ name: meetingName })
  const user = await User.findOne({ name: userName })

  await user.joinMeeting(meeting)

  res.send({ name: meeting.name, attendees: meeting.attendees.map(attendee => attendee.name) })
})

// user leaves a meeting
router.delete('/:meetingName/attendees/:userName', async function (req, res, next) {
  const { meetingName, userName } = req.params
  const meeting = await Meeting.findOne({ name: meetingName })
  const user = await User.findOne({ name: userName })

  await user.leaveMeeting(meeting)

  res.send({ name: meeting.name, attendees: meeting.attendees.map(attendee => attendee.name) })
})

module.exports = router
