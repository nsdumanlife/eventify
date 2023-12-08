const Meeting = require('./meeting')

class User {
  meetings = []
  // #secret = 'this is a secret'

  constructor(name, age) {
    this.name = name
    this.age = age
    // this.#secret = 'this is a secret'
    // this.meetings = []
  }

  joinMeeting(meeting) {
    meeting.attendees.push(this)
    this.meetings.push(meeting)
  }

  createMeeting(name, location, date, description) {
    const newMeeting = new Meeting(name, location, date, description)

    this.meetings.push(newMeeting)
    newMeeting.attendees.push(this)

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

  // get secret() {
  //   return this.#secret
  // }
  // set secret(newValue) {
  //   return (this.#secret = newValue)
  // }

  get detailsOfUser() {
    return `Name of the user is ${this.name} and its age is ${this.age}`
  }

  get yearOfBirth() {
    const today = new Date()
    const year = today.getFullYear()

    return year - this.age
  }
}

module.exports = User
