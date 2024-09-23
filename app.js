var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// specifying the port that will be used
let PORT = process.env.PORT || 8032;
// importing mongoose
let mongoose = require("mongoose");
// importing helmet
let helmet = require("helmet");
// specifying the URI to connect to the database
const uri =
  "mongodb+srv://ronaldodepao01:sTJfSAGtF6HNg7HO@cluster0.zk6eufz.mongodb.net/";
mongoose.Promise = global.Promise;
// specifying the DB name to connect to it
mongoose.connect(uri, {
  dbName: "sportsMatches",
});

// function for when there is an error connecting to the database
mongoose.connection.on("error", function () {
  console.log("could not connect to the database, exiting now");
  process.exit();
});

// function for when the connection to the database is successfull
mongoose.connection.once("open", function () {
  console.log("successfully connected to the database");
});

// making use of the routes
let indexRouter = require("../middleware-app/routes/index");
let usersRouter = require("../middleware-app/routes/users");

let app = express();

// making use of helmet
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//message that informs you which port is being used
app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

module.exports = app;
