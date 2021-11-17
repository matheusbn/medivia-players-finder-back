const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    lastLogin: String,
    name: String,
    vocation: String,
    level: Number,
    scrapeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scrape' },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Login', schema)
