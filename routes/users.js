const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.route('/').get(async (req, res, next) => {
  console.log(req.userJwt)
  const user = await User.find()

  res.send(user)
})

module.exports = router
