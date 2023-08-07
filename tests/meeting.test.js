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
})
