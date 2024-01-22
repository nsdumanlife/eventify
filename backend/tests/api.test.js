const request = require('supertest')
const app = require('../src/app')

// use a Supertest agent to maintain cookies and sessions
const agent = request.agent(app)

describe('API tests', () => {
  beforeEach(async () => {
    await request(app).delete('/db')
  })

  it('should register a user', async () => {
    const name = 'numan'
    const email = 'numan@gmail.com'
    const password = '123456'
    const age = 30
    const meetings = []

    const expectedOutput = {
      name,
      age,
      meetings,
    }

    const actualOutput = await request(app).post('/users').send({ name, age, email, password })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should login a user', async () => {
    const name = 'numan'
    const email = 'numan@mail.com'
    const age = 30
    const password = '123456'

    const user = await request(app).post('/users').send({ name, age, email, password })

    const expectedOutput = {
      name,
      age,
      email,
    }

    const actualOutput = await request(app).post('/accounts/session').send({ email, password })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should logout a logged in user', async () => {
    const name = 'numan'
    const email = 'numan@mail.com'
    const age = 30
    const password = '123456'

    const user = await request(app).post('/users').send({ name, age, email, password })

    const loggedInUser = await agent.post('/accounts/session').send({ email, password })

    const expectedOutput = {}

    const actualOutput = await agent.delete('/accounts/session')

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should get session', async () => {
    const name = 'numan'
    const email = 'numan@mail.co'
    const password = '123456'
    const age = 30

    const user = await request(app).post('/users').send({ name, age, email, password })

    const loggedInUser = await agent.post('/accounts/session').send({ email, password })

    const expectedOutput = {
      name,
      age,
      email,
    }

    const actualOutput = await agent.get('/accounts/session')

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

    const userName = 'ege'
    const age = 22
    const email = 'ege@gmail.com'
    const password = '123456'

    const user = await request(app).post('/users').send({ name: userName, age, email, password })

    const loggedInUser = await agent.post('/accounts/session').send({ email, password })

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
    }

    const actualOutput = await agent.post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
    })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should update a user', async () => {
    const name = 'userForUpdateAndDelete'
    const age = 18
    const email = 'some@email.com'
    const password = '123456'

    const user = await request(app).post('/users').send({ name, age, email, password })

    // user logs in to update his/her profile
    await agent.post('/accounts/session').send({ email, password })

    const newValues = { name: 'updated user', age: 100 }

    const expectedOutput = {
      ...user.body,
      ...newValues,
    }

    const actualOutput = await agent.put(`/users/${user.body._id}`).send({ newValues })

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body._id).toBeDefined()
    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body.age).toBe(expectedOutput.age)
  })

  it('should respond with 403 if user tries to update another user', async () => {
    const name = 'userForUpdateAndDelete'
    const age = 18
    const email = 'some@mail.com'
    const password = '123456'

    const user = await request(app).post('/users').send({ name, age, email, password })
    const anotherUser = await request(app).post('/users').send({
      name: 'another user',
      age: 18,
      email: 'another@mail.com',
      password: '123456',
    })

    // user logs in to update his/her profile
    await agent.post('/accounts/session').send({ email, password })

    const newValues = { name: 'updated user', age: 100 }

    const actualOutput = await agent.put(`/users/${anotherUser.body._id}`).send({ newValues })

    expect(actualOutput.statusCode).toEqual(403)
    expect(actualOutput.body.message).toEqual('You are not allowed to update this user')
  })

  it('should delete a user', async () => {
    const name = 'userForUpdateAndDelete'
    const age = 18
    const email = 'some@mail.com'
    const password = '123456'

    const user = await request(app).post('/users').send({ name, age, email, password })

    // user logs in to delete his/her profile
    await agent.post('/accounts/session').send({ email, password })

    const actualOutput = await agent.delete(`/users/${user.body._id}`)

    expect(actualOutput.statusCode).toEqual(200)
  })

  it('should respond with 403 if user tries to delete another user', async () => {
    const name = 'userForUpdateAndDelete'
    const age = 18
    const email = 'some@mail.com'
    const password = '123456'

    const user = await request(app).post('/users').send({ name, age, email, password })
    const anotherUser = await request(app).post('/users').send({
      name: 'another user',
      age: 18,
      email: 'another@mail.com',
      password: '123456',
    })

    // user logs in to delete his/her profile
    await agent.post('/accounts/session').send({ email, password })

    const actualOutput = await agent.delete(`/users/${anotherUser.body._id}`)

    expect(actualOutput.statusCode).toEqual(403)
    expect(actualOutput.body.message).toEqual('You are not allowed to delete this user')
  })

  it('should get a user', async () => {
    const name = 'numan'
    const age = 30
    const email = 'numan@mail.com'
    const password = '123456'
    const meetings = []

    const user = await request(app).post('/users').send({ name, age, email, password })

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
    const email = 'some@mail.com'
    const password = '123456'
    const meetings = []

    const user = await request(app).post('/users').send({ name, age, email, password })

    const expectedOutput = meetings

    const actualOutput = await request(app).get(`/users/${user.body._id}/meetings`)

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body).toMatchObject(expectedOutput)

    // after joining a meeting
    const meetingName = 'eges meeting'
    const location = 'Istanbul'
    const date = '12.12.2024'
    const time = '12:00'
    const description = 'Meeting for JS101 lecture'

    const userEge = await request(app)
      .post('/users')
      .send({ name: 'ege', age: 18, email: 'ege@mail.com', password: '123456' })

    // user ege logs in to create a meeting
    await agent.post('/accounts/session').send({ email: 'ege@mail.com', password: '123456' })

    const meeting = await agent.post('/meetings').send({
      name: meetingName,
      location,
      date,
      time,
      description,
    })

    // user ege logs out
    await agent.delete('/accounts/session')

    // user numan logs in to join the meeting
    await agent.post('/accounts/session').send({ email, password })

    // user numan joins the meeting
    await agent.post(`/meetings/${meeting.body._id}/attendees`).send({ userId: user.body._id })

    const expectedOutputAfterJoiningMeeting = meeting.body

    const actualOutputAfterJoiningMeeting = await request(app).get(`/users/${user.body._id}/meetings`)

    expect(actualOutputAfterJoiningMeeting.statusCode).toEqual(200)
    expect(actualOutputAfterJoiningMeeting.body).toHaveLength(1)
  })

  it('should get all users', async () => {
    const name = 'numan'
    const age = 30
    const email = 'some@mail.com'
    const password = '123456'
    const meetings = []

    const user = await request(app).post('/users').send({ name, age, email, password })

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

    const user = await request(app)
      .post('/users')
      .send({ name: 'ege', age: 18, email: 'some@mail.com', password: '123456' })

    // user logs in to create a meeting
    await agent.post('/accounts/session').send({ email: 'some@mail.com', password: '123456' })

    const meeting = await agent.post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
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

    const user = await request(app)
      .post('/users')
      .send({ name: 'ege', age: 18, email: 'some@mail.com', password: '123456' })

    // user logs in to create a meeting
    await agent.post('/accounts/session').send({ email: 'some@mail.com', password: '123456' })

    const meeting = await agent.post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
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

    const user = await request(app)
      .post('/users')
      .send({ name: 'ege', age: 18, email: 'ege@mail.com', password: '123456' })
    const attendee = await request(app)
      .post('/users')
      .send({ name: 'numan', age: 30, email: 'numan@mail.com', password: '123456' })

    // user logs in to create a meeting
    await agent.post('/accounts/session').send({ email: 'ege@mail.com', password: '123456' })

    const meeting = await agent.post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId: user.body._id,
    })

    // user logs out
    await agent.delete('/accounts/session')

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
      attendees: [user.body, attendee.body],
    }

    // attendee logs in
    await agent.post('/accounts/session').send({ email: 'numan@mail.com', password: '123456' })
    const actualOutput = await agent.post(`/meetings/${meeting.body._id}/attendees`)

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

    const user = await request(app)
      .post('/users')
      .send({ name: 'ege', age: 18, email: 'user@mail.com', password: '123456' })
    const attendee = await request(app)
      .post('/users')
      .send({ name: 'numan', age: 30, email: 'attendee@mail.com', password: '123456' })

    // user logs in to create a meeting
    await agent.post('/accounts/session').send({ email: 'user@mail.com', password: '123456' })
    const meeting = await agent.post('/meetings').send({
      name,
      location,
      date,
      time,
      description,
      userId: user.body._id,
    })

    // user logs out
    await agent.delete('/accounts/session')

    // attendee logs in
    await agent.post('/accounts/session').send({ email: 'attendee@mail.com', password: '123456' })

    await agent.post(`/meetings/${meeting.body._id}/attendees`).send({ userId: attendee.body._id })

    const expectedOutput = {
      name,
      location,
      date,
      time,
      description,
      attendees: [user.body],
    }

    const actualOutput = await agent.delete(`/meetings/${meeting.body._id}/attendees/${attendee.body._id}`)

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.body.attendees).toHaveLength(1)
    expect(actualOutput.body.attendees[0]._id).toBe(expectedOutput.attendees[0]._id)
  })

  it('should respond with 404', async () => {
    const actualOutput = await request(app).get('/non-existing-route')

    expect(actualOutput.statusCode).toEqual(404)
  })

  it('should respond with pong', async () => {
    const actualOutput = await request(app).get('/ping')

    expect(actualOutput.statusCode).toEqual(200)
    expect(actualOutput.text).toEqual('pong')
  })
})
