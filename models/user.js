const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: String,
    password: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", schema);
