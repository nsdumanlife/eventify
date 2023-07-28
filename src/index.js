// I need to have two main object, User and Meeting
// User will have a name and a list of meetings
// Meeting will have a name, a date, location, description and a list of attendees
// User should be able to create a meeting
// User should be able to join a meeting
// User should be able to leave a meeting
// User should be able to delete a meeting
const axios = require('axios')
const User = require('./user')
const chalk = require('chalk')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  const numan = await axios.post('http://localhost:3000/users', { name: 'Numan' })
  console.log('numan: ', numan.data)

  const updatedNuman = await axios.put('http://localhost:3000/users/Numan', { name: 'Selman' })
  console.log('updatedNuman: ', updatedNuman.data)

  const allUsers = await axios.get('http://localhost:3000/users')

  console.log('all users: ', allUsers.data)
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
