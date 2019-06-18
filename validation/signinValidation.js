const _ = require("lodash");
const validator = require("validator");

const signinValidation = userData => {
  const errors = {};
  const email = _.isEmpty(userData.email) ? "" : userData.email;
  const password = _.isEmpty(userData.password) ? "" : userData.password;

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

  return {
    errors,
    isEmpty: _.isEmpty(errors)
  };
};

module.exports = signinValidation;
