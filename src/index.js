// I need to have two main object, User and Meeting
// User will have a name and a list of meetings
// Meeting will have a name, a date, location, description and a list of attendees
// User should be able to create a meeting
// User should be able to join a meeting
// User should be able to leave a meeting
// User should be able to delete a meeting
const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  // create users
  const numan = await axios.post('/users', { name: 'Numan' })
  const toprak = await axios.post('/users', { name: 'Toprak' })
  const gizem = await axios.post('/users', { name: 'Gizem' })

  // update user name Numan to Selman
  const updatedNuman = await axios.put('/users/Numan', { name: 'Selman' })

  const topraksMeeting = await axios.post('/meetings', {
    creator: toprak.data,
    name: 'TopraksMeeting',
    date: '12/12/2023',
    location: 'Berlin',
    description: 'This is a meeting for Toprak',
  })

  const gizemAttendsTopraksMeeting = await axios.post('/meetings/TopraksMeeting/attendees', {
    user: 'Gizem',
  })

  const updatedNumanAttendsTopraksMeeting = await axios.post('/meetings/TopraksMeeting/attendees', {
    user: 'Selman',
  })

  const updatedNumanLeavesTopraksMeeting = await axios.delete('/meetings/TopraksMeeting/attendees/Selman')
}
main()

// const numan = new User('Numan')
// const mich = new User('Mich')
// const marvin = new User('Marvin')

// const numansMeeting = numan.createMeeting('Numans Meeting', '12/12/2023', 'Berlin', 'This is a meeting for Numan')
// const marvinsMeeting = marvin.createMeeting(
//   'Marvins Meeting',
//   '11/11/2023',
//   'Frankfurt',
//   'This is a meeting for Marvin'
// )

// mich.joinMeeting(numansMeeting)
// numan.joinMeeting(marvinsMeeting)
// numan.leaveMeeting(marvinsMeeting)

// // console.log('numan: ', numan)
// // console.log('numansMeeting: ', numansMeeting)

// console.log(`User Numan should have name Numan ${numan.name === 'Numan' ? chalk.blue(true) : chalk.red(false)}`)
// console.log(
//   `User Numan has ${numan.meetings.length} meetings ${
//     numan.meetings.length === 1 ? chalk.blue(true) : chalk.red(false)
//   }`
// )
// console.log(
//   `Mitch joins Marvins meeting at in Berlin ${
//     numan.meetings[0].location === 'Berlin' ? chalk.blue(true) : chalk.red(false)
//   }`
// )
// console.log(
//   `User Marvin has ${marvin.meetings.length} meetings ${
//     marvin.meetings.length === 1 ? chalk.blue(true) : chalk.red(false)
//   }`
// )
