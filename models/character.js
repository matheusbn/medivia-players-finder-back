const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    vocation: String,
    sex: String,
    profession: String,
    level: Number,
    world: String,
    residence: String,
    house: String,
    lastLogin: String,
    status: String,
    accountStatus: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Character", characterSchema);
