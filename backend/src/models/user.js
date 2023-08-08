const Meeting = require('./meeting')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meeting',
      autopopulate: { maxDepth: 1 },
    },
  ],
})

class User {
  async createMeeting(name, date, location, description) {
    const newMeeting = await Meeting.create({ name, date, location, description })
    this.meetings.push(newMeeting)
    newMeeting.attendees.push(this)

    await newMeeting.save()
    await this.save()

    return newMeeting
  }

  async joinMeeting(meeting) {
    meeting.attendees.push(this)
    this.meetings.push(meeting)

    await meeting.save()
    await this.save()

    return meeting
  }

  async leaveMeeting(meeting) {
    meeting.attendees.pull(this)
    this.meetings.pull(meeting)

    await meeting.save()
    await this.save()

    return meeting
  }
}

userSchema.plugin(autopopulate)
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
