const _ = require("lodash");
const validator = require("validator");

const registerValidation = userData => {
  const errors = {};

  const firstName = _.isEmpty(userData.firstName) ? "" : userData.firstName;
  const lastName = _.isEmpty(userData.lastName) ? "" : userData.lastName;
  const email = _.isEmpty(userData.email) ? "" : userData.email;
  const password = _.isEmpty(userData.password) ? "" : userData.password;
  const password2 = _.isEmpty(userData.password2) ? "" : userData.password2;

  // first name
  if (!validator.isLength(firstName, { min: 3 })) {
    errors.firstName = "At least contain 3 characters";
  }
  if (validator.isEmpty(firstName)) {
    errors.firstName = "First name is required";
  }

  //last name
  if (!validator.isLength(lastName, { min: 3 })) {
    errors.lastName = "At least contain 3 characters";
  }
  if (validator.isEmpty(lastName)) {
    errors.lastName = "Last name is required";
  }

  //email
  if (!validator.isEmail(email)) {
    errors.email = "Not a valid Email";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email is required";
  }

  // password
  if (!validator.isLength(password, { min: 6 })) {
    errors.password = "At least contain 6 characters";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
  }

  //password 2 (confirm pass)
  if (password !== password2) {
    errors.password2 = "Confirm password must match";
  }
  if (validator.isEmpty(password2)) {
    errors.password2 = "confirm password is required";
  }
  return {
    errors,
    isEmpty: _.isEmpty(errors)
  };
};

module.exports = registerValidation;
