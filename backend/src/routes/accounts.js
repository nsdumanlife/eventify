const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

//login
router.post('/session', passport.authenticate('local', { failWithError: true }), (req, res, next) => {
  res.send(req.user)
})

router.delete('/session', (req, res, next) => {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
