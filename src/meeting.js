class Meeting {
  attendees = []

  constructor(name, location, date, description) {
    this.name = name
    this.location = location
    this.date = date
    this.description = description
  }

  static create({ name, location, date, description }) {
    const newMeeting = new Meeting(name, location, date, description)

    Meeting.list.push(newMeeting)

    return newMeeting
  }

  static list = []
}

module.exports = Meeting
