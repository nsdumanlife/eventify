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
})
