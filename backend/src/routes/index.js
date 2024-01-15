var express = require('express')
var router = express.Router()

const User = require('../models/user')
const Meeting = require('../models/meeting')

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Meeting App' })
// })

router.delete('/db', async function (req, res, next) {
  await User.deleteMany({})
  await Meeting.deleteMany({})

  res.sendStatus(200)
})

router.get('/ping', function (req, res, next) {
  res.send('pong')
})

module.exports = router
