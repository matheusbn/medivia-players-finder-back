const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    position: String,
    sex: String,
    profession: String,
    level: Number,
    world: String,
    residence: String,
    lastLogin: String,
    status: String,
    accountStatus: String,
    // name: String,
    // position: String,
    // vocation: String,
    // sex: String,
    // profession: String,
    // level: Number,
    // world: String,
    // residence: String,
    // house: String,
    // lastLogin: String,
    // status: String,
    // accountStatus: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Character", schema);
