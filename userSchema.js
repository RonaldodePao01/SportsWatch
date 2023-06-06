// importing mongoose
const mongoose = require("mongoose");
// creating the schema for the user collection in the database
let user = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// exporting the user model
module.exports = mongoose.model("user", user);
