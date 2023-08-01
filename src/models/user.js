const Meeting = require('./meeting')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meeting',
    },
  ],
})

class User {
  createMeeting(name, date, location, description) {
    const newMeeting = Meeting.create({ name, date, location, description })
    this.meetings.push(newMeeting)
    newMeeting.attendees.push(this.name)

    return newMeeting
  }

  joinMeeting(meeting) {
    meeting.attendees.push(this.name)
    this.meetings.push(meeting)
  }

  leaveMeeting(meeting) {
    const indexOfUser = meeting.attendees.indexOf(this.name)
    meeting.attendees.splice(indexOfUser, 1)

    const indexOfMeeting = this.meetings.indexOf(meeting)
    this.meetings.splice(indexOfMeeting, 1)
  }
}

module.exports = mongoose.model('User', userSchema)
