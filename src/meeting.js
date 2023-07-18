class Meeting {
  attendees = []

  constructor(name, date, location, description) {
    this.name = name
    this.date = date
    this.location = location
    this.description = description
  }
}

module.exports = Meeting
