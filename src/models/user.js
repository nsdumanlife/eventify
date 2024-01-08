const Meeting = require('./meeting')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }],
})
class User {
  async joinMeeting(meeting) {
    meeting.attendees.push(this)
    this.meetings.push(meeting)

    await meeting.save()
    await this.save()

    return meeting
  }

  async createMeeting(name, location, date, description) {
    const newMeeting = await Meeting.create({ name, location, date, description })

    this.meetings.push(newMeeting)
    newMeeting.attendees.push(this)

    await this.save()
    await newMeeting.save()

    return newMeeting
  }

  leaveMeeting(meetingRequestedToLeave) {
    // meetingRequestedToLeave.attendees = meetingRequestedToLeave.attendees.filter(
    //   attendee => attendee.name !== this.name
    // )
    // this.meetings = this.meetings.filter(meeting => meeting.name !== meetingRequestedToLeave.name)

    const indexOfUser = meetingRequestedToLeave.attendees.findIndex(attendee => attendee.name === this.name)
    meetingRequestedToLeave.attendees.splice(indexOfUser, 1)

    const indexOfMeetingRequestedToLeave = this.meetings.findIndex(
      meeting => meeting.name === meetingRequestedToLeave.name
    )
    this.meetings.splice(indexOfMeetingRequestedToLeave, 1)
  }

  get detailsOfUser() {
    return `Name of the user is ${this.name} and its age is ${this.age}`
  }

  get yearOfBirth() {
    const today = new Date()
    const year = today.getFullYear()

    return year - this.age
  }

  static create({ name, age }) {
    const newUser = new User(name, age)

    User.list.push(newUser)

    return newUser
  }

  static list = []
}

userSchema.loadClass(User)

module.exports = mongoose.model('User', userSchema)
