const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const meetingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'Remote',
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: String,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})

class Meeting {}

meetingSchema.loadClass(Meeting)
meetingSchema.plugin(autopopulate)

module.exports = mongoose.model('Meeting', meetingSchema)
