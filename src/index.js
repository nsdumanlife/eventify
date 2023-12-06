// I need to have two main object, User and Meeting
// User will have a name and a list of meetings
// Meeting will have a name, a date, location, description and a list of attendees
// User should be able to create a meeting
// User should be able to join a meeting
// User should be able to leave a meeting

const numan = {
  name: 'numan',
  age: 30,
  meetings: [],
  joinMeeting(meeting) {
    meeting.attendees.push(this)
    this.meetings.push(meeting)
  },
}

const ege = {
  name: 'ege',
  age: '20',
  meetings: [],
  joinMeeting(meeting) {
    meeting.attendees.push(this)
    this.meetings.push(meeting)
  },
}

const egesMeeting = {
  name: 'eges meeting',
  location: 'Istanbul',
  date: '12.12.2023',
  description: 'Meeting for JS101 lecture',
  attendees: [],
}

const preetsBdayParty = {
  name: 'Preets Bday Party',
  location: 'Hamburg',
  date: '10.12.2023',
  description: 'You are all welcome',
  attendees: [],
}

numan.joinMeeting(egesMeeting)
ege.joinMeeting(preetsBdayParty)
numan.joinMeeting(preetsBdayParty)

console.log('length of numans meetings: ', numan.meetings.length)
console.log('numan is attending 2 meetings : ', numan.meetings.length === 2)
console.log('Number of attendees of eges meeting should be 1 :', egesMeeting.attendees.length === 1)
console.log('Number of attendees of preetsBdayParty meeting should be 2 :', preetsBdayParty.attendees.length === 2)
