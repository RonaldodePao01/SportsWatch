// importing the schema
const user = require("../userSchema.js");

// creating a function to create an instance in the database
exports.create = async function (req, res) {
  let userModel = new user({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
  });
  await userModel.save();
  res.send("user added");
};

// creating a function to find a document in the database
exports.findOne = async function (req, res) {
  let result = await user.findOne({ username: req.body.username });
  return result;
};
