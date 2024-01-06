const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  description: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
class Meeting {
  static create({ name, location, date, description }) {
    const newMeeting = new Meeting(name, location, date, description)

    Meeting.list.push(newMeeting)

    return newMeeting
  }

  static list = []
}

module.exports = mongoose.model('Meeting', meetingSchema)
