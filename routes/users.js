const express = require("express");
const router = express.Router();
// importing jsonwebtoken
const jwt = require("jsonwebtoken");
// importing the middleware
const { checkToken, checkGmail } = require("./middleware");
// importing the controller functions
const {
  create,
  deleteMatch,
  findAll,
  updateMatch,
} = require("../controllers/match.controller");

const { findOne } = require("../controllers/user.controller");
// importing the user and match schemas
const match = require("../matchSchema");
const user = require("../userSchema");

// Making a newMatch endpoint with the POST operation
router.post("/newMatch", async function (req, res) {
  let matchModel = new match({
    short: req.body.short,
    teams: req.body.teams,
    long: req.body.long,
    date: req.body.date,
    time: req.body.time,
  });
  console.log(matchModel);
  await matchModel.save();
  res.json({ msg: "added match" });
});

// Making a newUser endpoint with the POST operation which has the checkGmail middleware attached to it
router.post("/newUser", checkGmail, async function (req, res) {
  if (req.body.password === "") {
    res.json({ msg: "noChar" });
  } else {
    let check = await findOne(req, res);
    if (check) {
      res.json({ msg: "AccFound" });
    } else {
      let userModel = new user({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin,
      });
      console.log(userModel);
      await userModel.save();
      res.json({ msg: "added user" });
    }
  }
});

// Making a login endpoint with the post operation
router.post("/login", async function (req, res) {
  let result = await findOne(req, res);
  if (result) {
    if (
      result.password == req.body.password &&
      result.username === req.body.username
    ) {
      // creating the jwt
      let jwtToken = jwt.sign(
        {
          username: result.username,
        },
        //secret key
        "secretKey"
      );
      // sending over the token, username and admin status
      res.json({
        token: jwtToken,
        user: result.username,
        admin: result.admin,
      });
    } else {
      res.json({ msg: "noMatch" });
    }
  } else {
    res.json({ msg: "notFound" });
  }
});

// making a deleteMatch endpoint with the DELETE operation and the checkToken middlware attached to it
router.delete("/deleteMatch", checkToken, async function (req, res) {
  deleteMatch(req, res);
});

//making an allMatches endpoint with the GET operation and the checkToken middleware attached to it
router.get("/allMatches", checkToken, async function (req, res) {
  findAll(req, res);
});

//making an updateMatch endpoint with the PUT operation and the checkToken middlware attached to it
router.put("/updateMatch", checkToken, async function (req, res) {
  updateMatch(req, res);
});

// making a gmail endpoint with the get operation and the checkGmail middleware attached to it
router.get("/gmail", checkGmail, function (req, res) {
  checkGmail(req, res);
});

module.exports = router;
