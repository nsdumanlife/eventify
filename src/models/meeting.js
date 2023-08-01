class Meeting {
  attendees = []

  constructor(name, date, location, description) {
    this.name = name
    this.date = date
    this.location = location
    this.description = description
  }

  static create({ name, date, location, description }) {
    const meeting = new Meeting(name, date, location, description)
    Meeting.list.push(meeting)
    return meeting
  }

  static list = []
}

module.exports = Meeting
