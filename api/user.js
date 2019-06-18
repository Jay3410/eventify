const express = require("express");
const route = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = require("../config/config").secretOrKey;
const registerValidation = require("../validation/registerValidation");
const signinValidation = require("../validation/signinValidation");

// sign up
route.post("/signup", (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  const { errors, isEmpty } = registerValidation(req.body);

  if (!isEmpty) {
    return res.status(400).send(errors);
  }

  // finding if email already exists
  User.findOne({ email }).then(user => {
    // not found email
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).send(errors);
    }

    if (!user) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password
      });

      // salting password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save().then(user => res.send(user));
        });
      });
    }
  });
});

// sign in
route.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const { errors, isEmpty } = signinValidation(req.body);

  if (!isEmpty) {
    return res.status(400).send(errors);
  }

  User.findOne({ email }).then(user => {
    if (user) {
      // check for password match
      if (!user) {
        errors.email = "Email does not exist";
        return res.status(404).send(errors);
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        // password match
        if (!isMatch) {
          errors.password = "Incorrect password";
          return res.status(400).send(errors);
        }

        if (isMatch) {
          // providing jwt
          // payload
          const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          };
          // jwt token
          const token = jwt.sign(payload, secret, { expiresIn: "12h" });
          return res.send({ token: "bearer " + token });
        }
      });
    }
  });
});

module.exports = route;
