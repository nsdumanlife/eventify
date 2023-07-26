const Meeting = require('./meeting')

class User {
  meetings = []

  constructor(name) {
    this.name = name
  }

  createMeeting(name, date, location, description) {
    const newMeeting = new Meeting(name, date, location, description)
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
    this.meetings.splice(indexOfMeeting, 1) // check later?
  }

  static create({ name }) {
    const newUser = new User(name)

    User.list.push(newUser)
    return newUser
  }

  static list = []
}

module.exports = User
