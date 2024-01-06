const express = require('express')
const router = express.Router()
const Meeting = require('../meeting')
const User = require('../user')

/* GET meetings listing. */
router.get('/', function (req, res, next) {
  if (req.query.view === 'json') {
    return res.send(
      Meeting.list.map(meeting => ({
        name: meeting.name,
        location: meeting.location,
        date: meeting.date,
        attendees: meeting.attendees.map(attendee => attendee.name),
      }))
    )
  }

  res.render('meetings', { meetings: Meeting.list })
})

// get a single meeting
router.get('/:meetingName', function (req, res, next) {
  const { meetingName } = req.params
  const meeting = Meeting.list.find(meeting => meeting.name === meetingName)

  if (req.query.view === 'json') {
    return res.send({
      name: meeting.name,
      location: meeting.location,
      date: meeting.date,
      attendees: meeting.attendees.map(attendee => attendee.name),
    })
  }

  res.render('meeting-detail', { meeting })
})

// create a new meeting
router.post('/', function (req, res, next) {
  const { name, location, date, description, userName } = req.body
  const user = User.list.find(user => user.name === userName)
  const newMeeting = user.createMeeting(name, location, date, description)

  res.send({
    name: newMeeting.name,
    location: newMeeting.location,
    date: newMeeting.date,
    description: newMeeting.description,
  })
})

// user joins a meeting
router.post('/:meetingName/attendees', function (req, res, next) {
  const { meetingName } = req.params
  const { userName } = req.body
  const meeting = Meeting.list.find(meeting => meeting.name === meetingName)
  const user = User.list.find(user => user.name === userName)

  user.joinMeeting(meeting)

  res.send({ name: meeting.name, attendees: meeting.attendees.map(attendee => attendee.name) })
})

// user leaves a meeting
router.delete('/:meetingName/attendees/:userName', function (req, res, next) {
  const { meetingName, userName } = req.params
  const meeting = Meeting.list.find(meeting => meeting.name === meetingName)
  const user = User.list.find(user => user.name === userName)

  user.leaveMeeting(meeting)

  res.send({ name: meeting.name, attendees: meeting.attendees.map(attendee => attendee.name) })
})

module.exports = router
