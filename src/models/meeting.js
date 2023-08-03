const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const meetingSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
})

class Meeting {}

meetingSchema.plugin(autopopulate)
meetingSchema.loadClass(Meeting)
module.exports = mongoose.model('Meeting', meetingSchema)
