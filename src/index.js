// I need to have two main object, User and Meeting
// User will have a name and a list of meetings
// Meeting will have a name, a date, location, description and a list of attendees
// User should be able to create a meeting
// User should be able to join a meeting
// User should be able to leave a meeting
// User should be able to delete a meeting

const numan = {
  name: 'Numan',
  meetings: [],
  joinMeeting(meeting) {
    meeting.attendees.push(this.name)
    this.meetings.push(meeting)
  },
}

const mich = {
  name: 'Mich',
  meetings: [],
  joinMeeting(meeting) {
    meeting.attendees.push(this.name)
    this.meetings.push(meeting)
  },
}

const numansMeeting = {
  name: 'Numans Meeting',
  date: '12/12/2023',
  location: 'Berlin',
  description: 'This is a meeting for Numan',
  attendees: [],
}

const marvinsMeeting = {
  name: 'Marvins Meeting',
  date: '11/11/2023',
  location: 'Frankurt',
  description: 'This is a meeting for Marvin',
  attendees: [],
}

mich.joinMeeting(numansMeeting)
numan.joinMeeting(marvinsMeeting)

// console.log('mich: ', mich)
// console.log('numansMeeting: ', numansMeeting)
