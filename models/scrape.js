const mongoose = require('mongoose')

const scrapeSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Scrape', scrapeSchema)
