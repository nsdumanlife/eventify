const Meeting = require('./meeting')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', autopopulate: true }],
})
class User {
  async joinMeeting(meeting) {
    meeting.attendees.push(this)
    this.meetings.push(meeting)

    await meeting.save()
    await this.save()

    return meeting
  }

  async createMeeting(name, location, date, time, description) {
    const newMeeting = await Meeting.create({ name, location, date, time, description })

    this.meetings.push(newMeeting)
    newMeeting.attendees.push(this)

    await this.save()
    await newMeeting.save()

    return newMeeting
  }

  async leaveMeeting(meetingRequestedToLeave) {
    this.meetings.pull(meetingRequestedToLeave)
    meetingRequestedToLeave.attendees.pull(this)

    await meetingRequestedToLeave.save()
    await this.save()

    return meetingRequestedToLeave
  }

  // get detailsOfUser() {
  //   return `Name of the user is ${this.name} and its age is ${this.age}`
  // }

  // get yearOfBirth() {
  //   const today = new Date()
  //   const year = today.getFullYear()

  //   return year - this.age
  // }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)
