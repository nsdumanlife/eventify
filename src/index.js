// I need to have two main object, User and Meeting
// User will have a name and a list of meetings
// Meeting will have a name, a date, location, description and a list of attendees
// User should be able to create a meeting
// User should be able to join a meeting
// User should be able to leave a meeting
// User should be able to delete a meeting

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
}

class Meeting {
  attendees = []

  constructor(name, date, location, description) {
    this.name = name
    this.date = date
    this.location = location
    this.description = description
  }
}

const numan = new User('Numan')
const mich = new User('Mich')
const marvin = new User('Marvin')

const numansMeeting = numan.createMeeting('Numans Meeting', '12/12/2023', 'Berlin', 'This is a meeting for Numan')
const marvinsMeeting = marvin.createMeeting('Marvins Meeting', '11/11/2023', 'Frankurt', 'This is a meeting for Marvin')
// const numansMeeting = new Meeting('Numans Meeting', '12/12/2023', 'Berlin', 'This is a meeting for Numan')
// const marvinsMeeting = new Meeting('Marvins Meeting', '11/11/2023', 'Frankurt', 'This is a meeting for Marvin')

mich.joinMeeting(numansMeeting)
numan.joinMeeting(marvinsMeeting)

// console.log('mich: ', mich)
console.log('numansMeeting: ', numansMeeting)
