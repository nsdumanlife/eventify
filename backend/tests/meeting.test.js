const request = require('supertest')
const app = require('../src/app')
const Meeting = require('../src/models/meeting')
const User = require('../src/models/user')

describe('Meeting app', () => {
  beforeEach(async () => {
    await Meeting.deleteMany()
    await User.deleteMany()
  })

  it('should create a user', async () => {
    const name = 'Numan'
    const expectedOutput = { name, meetings: [] }

    const actualOutput = await request(app).post('/users').send({ name })

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
  })

  it('should update a user', async () => {
    const name = 'Numan'
    const newName = 'Selman'
    const expectedOutput = { name: newName, meetings: [] }

    const user = await request(app).post('/users').send({ name })
    const actualOutput = await request(app).put(`/users/${user.body._id}`).send({ name: newName })

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
  })

  it('should get user details by id', async () => {
    const name = 'Numan'
    const expectedOutput = { name, meetings: [] }

    const user = await request(app).post('/users').send({ name })
    const actualOutput = await request(app).get(`/users/${user.body._id}`)

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
  })

  it('should get all users', async () => {
    const name = 'Numan'
    const expectedOutput = { name, meetings: [] }

    await request(app).post('/users').send({ name })
    const actualOutput = await request(app).get('/users')

    expect(actualOutput.body[0].name).toBe(expectedOutput.name)
    expect(actualOutput.body[0]).toMatchObject(expectedOutput)
    expect(actualOutput.body[0]._id).toBeDefined()
  })

  it(`should respond with an error '404 User not found'`, async () => {
    const name = 'Numan'
    const newName = 'Selman'
    const expectedOutput = 'User not found'

    const user = await request(app).post('/users').send({ name })
    const actualOutput = await request(app).put(`/users/1234566789`).send({ name: newName })

    expect(actualOutput.text).toBe(expectedOutput)
  })

  it('should create a meeting', async () => {
    const name = 'Numan'

    const user = await request(app).post('/users').send({ name })

    const meetingName = 'Meeting'
    const meetingDate = '2020-12-12'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = {
      name: meetingName,
      date: new Date(meetingDate).toISOString(),
      location: meetingLocation,
      description: meetingDescription,
      attendees: [user.body],
    }

    const actualOutput = await request(app).post('/meetings').send({
      creator: user.body._id,
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
  })

  it('should get all meetings', async () => {
    const name = 'Numan'
    const meetingName = 'Meeting'
    const meetingDate = '2020-12-12'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = {
      name: meetingName,
      date: new Date(meetingDate).toISOString(),
      location: meetingLocation,
      description: meetingDescription,
    }

    const user = await request(app).post('/users').send({ name })
    await request(app).post('/meetings').send({
      creator: user.body._id,
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })
    const actualOutput = await request(app).get('/meetings')

    expect(actualOutput.body[0].name).toBe(expectedOutput.name)
    expect(actualOutput.body[0]).toMatchObject(expectedOutput)
    expect(actualOutput.body[0]._id).toBeDefined()
  })

  it('should get meeting details by id', async () => {
    const name = 'Numan'
    const meetingName = 'Meeting'
    const meetingDate = '2020-12-12'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = {
      name: meetingName,
      date: new Date(meetingDate).toISOString(),
      location: meetingLocation,
      description: meetingDescription,
    }

    const user = await request(app).post('/users').send({ name })
    const meeting = await request(app).post('/meetings').send({
      creator: user.body._id,
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })
    const actualOutput = await request(app).get(`/meetings/${meeting.body._id}`)

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
  })

  it('should add a user to a meeting', async () => {
    const attendeeName = 'Numan'
    const creatorName = 'Selman'

    const userAttendee = await request(app).post('/users').send({ name: attendeeName })
    const userCreator = await request(app).post('/users').send({ name: creatorName })

    const meetingName = 'Meeting'
    const meetingDate = '2020-12-12'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = {
      name: meetingName,
      date: new Date(meetingDate).toISOString(),
      location: meetingLocation,
      description: meetingDescription,
      attendees: [{ _id: userCreator.body._id }, { _id: userAttendee.body._id }],
    }

    const meeting = await request(app).post('/meetings').send({
      creator: userCreator.body._id,
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })
    const actualOutput = await request(app)
      .post(`/meetings/${meeting.body._id}/attendees`)
      .send({ attendee: userAttendee.body._id })

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body.attendees[0].name).toBe(userCreator.body.name)
    expect(actualOutput.body.attendees[1].name).toBe(userAttendee.body.name)
  })

  it('should response the GET method', async () => {
    const actualOutput = await request(app).get('/')
    expect(actualOutput.statusCode).toBe(200)
  })

  it('should throw an error with status 404', async () => {
    const meetingName = 'Meeting'
    const meetingDate = '2020-12-12'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = { message: 'User not found' }

    const actualOutput = await request(app).post('/meetings').send({
      creator: '64d21363e0e66b66aa31da79',
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })

    expect(actualOutput.status).toBe(404)
  })

  it('should list all meetings', async () => {
    const name = 'Numan'
    const meetingName = 'Meeting'
    const meetingDate = '2020-12-12'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = {
      name: meetingName,
      date: new Date(meetingDate).toISOString(),
      location: meetingLocation,
      description: meetingDescription,
    }

    const user = await request(app).post('/users').send({ name })
    const meeting = await request(app).post('/meetings').send({
      creator: user.body._id,
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })
    const actualOutput = await request(app).get('/meetings')

    expect(actualOutput.body[0].name).toBe(expectedOutput.name)
    expect(actualOutput.body[0]).toMatchObject(expectedOutput)
    expect(actualOutput.body[0]._id).toBeDefined()
  })

  it('should delete user from meeting', async () => {
    const attendeeName = 'Numan'
    const creatorName = 'Selman'

    const userAttendee = await request(app).post('/users').send({ name: attendeeName })
    const userCreator = await request(app).post('/users').send({ name: creatorName })

    const meetingName = 'Meeting'
    const meetingDate = '2025-10-10'
    const meetingLocation = 'Istanbul'
    const meetingDescription = 'Description'

    const expectedOutput = {
      name: meetingName,
      date: new Date(meetingDate).toISOString(),
      location: meetingLocation,
      description: meetingDescription,
      attendees: [{ _id: userCreator.body._id }],
    }

    const meeting = await request(app).post('/meetings').send({
      creator: userCreator.body._id,
      name: meetingName,
      date: meetingDate,
      location: meetingLocation,
      description: meetingDescription,
    })

    // user attends meeting
    await request(app).post(`/meetings/${meeting.body._id}/attendees`).send({ attendee: userAttendee.body._id })

    // user leaves meeting
    const actualOutput = await request(app).delete(`/meetings/${meeting.body._id}/attendees/${userAttendee.body._id}`)

    expect(actualOutput.body.attendees.length).toBe(1)
    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body.attendees[0].name).toBe(userCreator.body.name)
  })

  it('should get 404 error', async () => {
    const actualOutput = await request(app).get('/not-found')
    expect(actualOutput.status).toBe(404)
  })
})
