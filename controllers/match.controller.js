// importing the schema
const match = require("../matchSchema.js");

// creating a function that creates an instance of a fixture in the database
exports.create = async function (req, res) {
  let matchModel = new match({
    short: req.body.short,
    teams: req.body.teams,
    long: req.body.long,
    date: req.body.date,
    time: req.body.time,
  });
  await matchModel.save();
  res.send("match saved");
};

// creating a function to delete a document in the database
exports.deleteMatch = async function (req, res) {
  let result = await match.deleteOne({ _id: req.body._id });
  res.json(result);
};

// creating a function to find all the documents in the database
exports.findAll = async function (req, res) {
  let result = await match.find();
  res.json(result);
};

// creating a function to update a document in the database
exports.updateMatch = async function (req, res) {
  const filter = { _id: req.body._id };
  const update = {
    short: req.body.newShort,
    teams: req.body.newTeams,
    long: req.body.newLong,
    date: req.body.newDate,
    time: req.body.newTime,
  };
  // using findByIdAndUpdate to update the document
  const result = await match.findByIdAndUpdate(filter, update, {
    returnOriginal: false,
  });
  result;
  res.json({ msg: "updated" });
};
