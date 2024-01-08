const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  description: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
class Meeting {}

module.exports = mongoose.model('Meeting', meetingSchema)
