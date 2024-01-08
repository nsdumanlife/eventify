const User = require('./models/user')
const Meeting = require('./models/meeting')

const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  await axios.delete('/db')
  console.log('All records deleted successfully.')

  const numan = await axios.post('/users', { name: 'numan', age: 30 })

  const ege = await axios.post('/users', { name: 'ege', age: 18 })

  const userForUpdateAndDelete = await axios.post('/users', { name: 'userForUpdateAndDelete', age: 18 })

  // console.log('numan: ', numan.data)

  const egesMeeting = await axios.post('/meetings', {
    name: 'eges meeting',
    location: 'Istanbul',
    date: '12.12.2023',
    description: 'Meeting for JS101 lecture',
    userId: ege.data._id,
  })

  // console.log('egesMeeting: ', egesMeeting.data)

  const preetsBdayParty = await axios.post('/meetings', {
    name: 'Preets Bday Party',
    location: 'Hamburg',
    date: '10.12.2023',
    description: 'You are all welcome',
    userId: numan.data._id,
  })

  // console.log('preetsBdayParty: ', preetsBdayParty.data)

  const updatedUser = await axios.put(`/users/${userForUpdateAndDelete.data._id}`, {
    newValues: { name: 'updated user', age: 100 },
  })
  // console.log('updatedUser: ', updatedUser.data)

  //delete updatedUser
  await axios.delete(`/users/${updatedUser.data._id}`)

  // numan joins eges meeting
  await axios.post(`/meetings/${egesMeeting.data._id}/attendees`, {
    userId: numan.data._id,
  })

  //numan leaves eges meeting
  await axios.delete(`/meetings/${egesMeeting.data._id}/attendees/${numan.data._id}`)

  // // get all meetings of numan
  // const numansMeetings = await axios.get('/users/numan/meetings')
  // // console.log('numansMeetings: ', numansMeetings.data)

  // const allUsers = await axios.get('/users')
  // // console.log('allUsers: ', allUsers.data)

  // const allMeetings = await axios.get('/meetings?view=json')
  // console.log('allMeetings: ', allMeetings.data)
}

main().catch(error => {
  console.log('error: ', error.message, error.stack)
})

// axios
//   .post('http://localhost:3000/users', { name: 'John Doe', age: 30 })
//   .then(response => {
//     console.log('response: ', response)
//   })
//   .catch(error => {
//     console.log('error: ', error)
//   })

// const numan = new User('numan', 30)
// const ege = new User('Ege', 18)
// const selman = new User('Selman', 33)
// const toprak = User.create('Toprak', 30)

// numan.secret = 'something else'

// // const egesMeeting = new Meeting('eges meeting', 'Istanbul', '12.12.2023', 'Meeting for JS101 lecture')
// // const preetsBdayParty = new Meeting('Preets Bday Party', 'Hamburg', '10.12.2023', 'You are all welcome')

// const egesMeeting = ege.createMeeting('eges meeting', 'Istanbul', '12.12.2023', 'Meeting for JS101 lecture')
// const preetsBdayParty = numan.createMeeting('Preets Bday Party', 'Hamburg', '10.12.2023', 'You are all welcome')

// numan.joinMeeting(egesMeeting)
// ege.joinMeeting(preetsBdayParty)
// selman.joinMeeting(preetsBdayParty)

// numan.leaveMeeting(preetsBdayParty)
// ege.leaveMeeting(preetsBdayParty)
// selman.leaveMeeting(preetsBdayParty)

// // console.log('age of numan: ', numan.age)
// console.log('length of numans meetings: ', numan.meetings.length)
// console.log('numan is attending 1 meetings : ', numan.meetings.length === 1)
// console.log('Number of attendees of eges meeting should be 2 :', egesMeeting.attendees.length === 2)
// console.log('Number of attendees of preetsBdayParty meeting should be 2 :', preetsBdayParty.attendees.length === 2)
// console.log('Preets Bday Party : ', preetsBdayParty)
// console.log('numan: ', numan)
