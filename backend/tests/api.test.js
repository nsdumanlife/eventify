const request = require('supertest')
const app = require('../src/app')

describe('API tests', () => {
  beforeEach(async () => {
    await request(app).delete('/db')
  })

  it('should create a user', async () => {
    const name = 'numan'
    const age = 30
    const meetings = []

    const expectedOutput = {
      name,
      age,
      meetings,
    }

    const actualOutput = await request(app).post('/users').send({ name, age })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should create a meeting', async () => {
    const name = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2023'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const userId = (await request(app).post('/users').send({ name: 'ege', age: 18 })).body._id

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
    }

    const actualOutput = await request(app).post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId,
    })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should update a user', async () => {
    const name = 'userForUpdateAndDelete'
    const age = 18

    const user = await request(app).post('/users').send({ name, age })

    const newValues = { name: 'updated user', age: 100 }

    const expectedOutput = {
      ...user.body,
      ...newValues,
    }

    const actualOutput = await request(app).put(`/users/${user.body._id}`).send({ newValues })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should delete a user', async () => {
    const name = 'userForUpdateAndDelete'
    const age = 18

    const user = await request(app).post('/users').send({ name, age })

    const actualOutput = await request(app).delete(`/users/${user.body._id}`)

    expect(actualOutput.statusCode).toEqual(200)
  })

  it('should get a user', async () => {
    const name = 'numan'
    const age = 30
    const meetings = []

    const user = await request(app).post('/users').send({ name, age })

    const expectedOutput = {
      name,
      age,
      meetings,
    }

    const actualOutput = await request(app).get(`/users/${user.body._id}`)

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('responds with 404 if user not found', async () => {
    const userId = '5e9e4c8c49d1f1c7b1f2e3f8'

    const actualOutput = await request(app).get(`/users/${userId}`)

    expect(actualOutput.statusCode).toEqual(404)
    expect(actualOutput.body.message).toEqual('User not found')
  })

  it('should respond with 404 if user not found when getting all meetings of a user', async () => {
    const userId = '5e9e4c8c49d1f1c7b1f2e3f8'

    const actualOutput = await request(app).get(`/users/${userId}/meetings`)

    expect(actualOutput.statusCode).toEqual(404)
    expect(actualOutput.body.message).toEqual('User not found')
  })

  it('should get all meetings of a user', async () => {
    const name = 'numan'
    const age = 30
    const meetings = []

    const user = await request(app).post('/users').send({ name, age })

    const expectedOutput = meetings

    const actualOutput = await request(app).get(`/users/${user.body._id}/meetings`)

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body).toMatchObject(expectedOutput)

    // after joining a meeting
    const meetingName = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2023'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const userId = (await request(app).post('/users').send({ name: 'ege', age: 18 })).body._id

    const meeting = await request(app).post('/meetings').send({
      name: meetingName,
      location,
      date,
      time,
      description,
      userId,
    })

    await request(app).post(`/meetings/${meeting.body._id}/attendees`).send({ userId: user.body._id })

    const expectedOutputAfterJoiningMeeting = meeting.body

    const actualOutputAfterJoiningMeeting = await request(app).get(`/users/${user.body._id}/meetings`)

    expect(actualOutputAfterJoiningMeeting.statusCode).toEqual(200)
    expect(actualOutputAfterJoiningMeeting.body).toHaveLength(1)
  })

  it('should get all users', async () => {
    const name = 'numan'
    const age = 30
    const meetings = []

    const user = await request(app).post('/users').send({ name, age })

    const expectedOutput = {
      name,
      age,
      meetings,
    }

    const actualOutput = await request(app).get('/users')

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body[0]).toMatchObject(expectedOutput)
    expect(actualOutput.body).toHaveLength(1)
  })

  it('should get all meetings', async () => {
    const name = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2023'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const userId = (await request(app).post('/users').send({ name: 'ege', age: 18 })).body._id

    const meeting = await request(app).post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId,
    })

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
    }

    const actualOutput = await request(app).get('/meetings')

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body[0]).toMatchObject(expectedOutput)
    expect(actualOutput.body).toHaveLength(1)
  })

  it('should get a meeting', async () => {
    const name = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2023'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const userId = (await request(app).post('/users').send({ name: 'ege', age: 18 })).body._id

    const meeting = await request(app).post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId,
    })

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
    }

    const actualOutput = await request(app).get(`/meetings/${meeting.body._id}`)

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should join a meeting', async () => {
    const name = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2023'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const user = await request(app).post('/users').send({ name: 'ege', age: 18 })
    const attendee = await request(app).post('/users').send({ name: 'numan', age: 30 })

    const meeting = await request(app).post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId: user.body._id,
    })

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
      attendees: [user.body, attendee.body],
    }

    const actualOutput = await request(app)
      .post(`/meetings/${meeting.body._id}/attendees`)
      .send({ userId: attendee.body._id })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body.attendees).toHaveLength(2)
    expect(actualOutput.body.attendees[0]._id).toBe(expectedOutput.attendees[0]._id)
    expect(actualOutput.body.attendees[1]._id).toBe(expectedOutput.attendees[1]._id)
  })

  it('should leave a meeting', async () => {
    const name = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2023'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const user = await request(app).post('/users').send({ name: 'ege', age: 18 })
    const attendee = await request(app).post('/users').send({ name: 'numan', age: 30 })

    const meeting = await request(app).post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId: user.body._id,
    })

    await request(app).post(`/meetings/${meeting.body._id}/attendees`).send({ userId: attendee.body._id })

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
      attendees: [user.body],
    }

    const actualOutput = await request(app).delete(`/meetings/${meeting.body._id}/attendees/${attendee.body._id}`)

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body.attendees).toHaveLength(1)
    expect(actualOutput.body.attendees[0]._id).toBe(expectedOutput.attendees[0]._id)
  })

  it('should respond with 404', async () => {
    const actualOutput = await request(app).get('/non-existing-route')

    expect(actualOutput.statusCode).toEqual(404)
  })
})
