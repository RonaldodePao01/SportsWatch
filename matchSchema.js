// importing mongoose
const mongoose = require("mongoose");

// creating the schema for the match collection in the database
let match = mongoose.Schema({
  short: {
    type: String,
    required: true,
  },
  teams: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: "tbc",
  },
  time: {
    type: String,
    required: true,
    default: "tbc",
  },
});

// exporting the match model
module.exports = mongoose.model("match", match);
