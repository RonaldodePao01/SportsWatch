// // importing jsonwebtoken
const jwt = require("jsonwebtoken");

// creating middleware that verify the token
function checkToken(req, res, next) {
  if (req.headers["authorization"]) {
    // getting the token from the header
    let token = req.headers["authorization"].split(" ")[1];
    // verifying the token
    jwt.verify(token, "secretKey", function (error, data) {
      if (error) {
        res.send({ message: "invalid token" });
        next();
      } else {
        req.username = data.username;
        req.password = data.password;
        req.token = token;
        next();
      }
    });
  } else {
    res.send({ message: "no token attached to the request" });
  }
}

// creating middleware to check if a new users username ends in "@gmail.com"
function checkGmail(req, res, next) {
  let username = req.body.username;
  if (!username.match(/@gmail.com/gi)) {
    res.status(403).send({ msg: "gmail" });
  } else {
    next();
  }
}

// exporting the middleware
module.exports = {
  checkToken,
  checkGmail,
};
