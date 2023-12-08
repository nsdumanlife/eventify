// I need to have two main object, User and Meeting
// User will have a name and a list of meetings
// Meeting will have a name, a date, location, description and a list of attendees
// User should be able to create a meeting
// User should be able to join a meeting
// User should be able to leave a meeting

const User = require('./user')
const Meeting = require('./meeting')

const numan = new User('numan', 30)
const ege = new User('Ege', 18)
const selman = new User('Selman', 33)

numan.secret = 'something else'

// const egesMeeting = new Meeting('eges meeting', 'Istanbul', '12.12.2023', 'Meeting for JS101 lecture')
// const preetsBdayParty = new Meeting('Preets Bday Party', 'Hamburg', '10.12.2023', 'You are all welcome')

const egesMeeting = ege.createMeeting('eges meeting', 'Istanbul', '12.12.2023', 'Meeting for JS101 lecture')
const preetsBdayParty = numan.createMeeting('Preets Bday Party', 'Hamburg', '10.12.2023', 'You are all welcome')

numan.joinMeeting(egesMeeting)
ege.joinMeeting(preetsBdayParty)
selman.joinMeeting(preetsBdayParty)

numan.leaveMeeting(preetsBdayParty)
ege.leaveMeeting(preetsBdayParty)
// selman.leaveMeeting(preetsBdayParty)

// console.log('age of numan: ', numan.age)
// console.log('length of numans meetings: ', numan.meetings.length)
// console.log('numan is attending 2 meetings : ', numan.meetings.length === 2)
// console.log('Number of attendees of eges meeting should be 1 :', egesMeeting.attendees.length === 1)
// console.log('Number of attendees of preetsBdayParty meeting should be 2 :', preetsBdayParty.attendees.length === 2)
console.log('Preets Bday Party : ', preetsBdayParty)
console.log('numan: ', numan)
