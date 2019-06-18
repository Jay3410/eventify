const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const db = require("./config/config").mongoURI;
// api routes
const user = require("./api/user");
const event = require("./api/event");

const port = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongo"))
  .catch(e => console.log(e));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
require("./config/jwtStrategy")(passport);

//route middleware
app.use("/user", user);
app.use("/event", event);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("connected to " + port));
