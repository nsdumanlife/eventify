class Meeting {
  attendees = []

  constructor(name, location, date, description) {
    this.name = name
    this.location = location
    this.date = date
    this.description = description
  }
}

module.exports = Meeting
