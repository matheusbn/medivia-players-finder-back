const { Router } = require('express')
const usersController = require('./users')
const authController = require('./auth')

const router = Router()

router.use('/', authController)
router.use('/users', usersController)

module.exports = router
