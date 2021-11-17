const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')
const bcrypt = require('bcrypt')

const router = Router()

function generateToken(user) {
  return jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: '7d',
  })
}

router.route('/signin').post(async (req, res, next) => {
  const { username, password } = req.body
  try {

  const user = await User.findOne({ username })

  if (!user) return res.status(404).send("User not found")


  if (await bcrypt.compare(password, user.password)) {
    return res.send({
      user,
      token: generateToken(user),
    })
  }

    res.status(401).send("Wrong password")
  } catch(error) {
    next(error)
  }
})

router.route('/signup').post(async (req, res, next) => {
  try {
    const user = new User(req.body)
    await user.save()

    res.send({
      user,
      token: generateToken(user),
    })
  } catch (error) {
    if (error.message.startsWith('E11000 duplicate key'))
      return res.status(409).send('Username taken')

    next(error)
  }
})

module.exports = router
