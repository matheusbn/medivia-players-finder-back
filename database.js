const mongoose = require('mongoose')
const config = require('./config')

// how not to bypass mongoose middlewares:
// https://twm.me/correct-way-to-use-mongoose/

module.exports = {
  connect: () => {
    mongoose.connect(config.databaseUrl)
  },
  disconnect: mongoose.disconnect,
}
