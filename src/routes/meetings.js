const express = require('express')
const router = express.Router()
const Meeting = require('../meeting')

/* GET meetings listing. */
router.get('/', function (req, res, next) {
  res.send(Meeting.list)
})

// get a single meeting
router.get('/:meetingName', function (req, res, next) {
  const { meetingName } = req.params
  const meeting = Meeting.list.find(meeting => meeting.name === meetingName)

  res.send(meeting)
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
})

module.exports = router
