const { Router } = require('express')
const usersController = require('./users')

const router = Router()

router.use('/users', usersController)

module.exports = router
