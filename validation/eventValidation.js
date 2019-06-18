const _ = require("lodash");
const validator = require("validator");

const eventValidator = event => {
  const errors = {};

  const title = _.isEmpty(event.title) ? "" : event.title;
  const desc = _.isEmpty(event.desc) ? "" : event.desc;

  if (!validator.isLength(title, { min: 3, max: 20 })) {
    errors.title = "Title must contain 3 to 20 characters";
  }

  if (validator.isEmpty(title)) {
    errors.title = "Title is required";
  }

  if (!validator.isLength(desc, { min: 3 })) {
    errors.desc = "Desc must contain 3 characters";
  }

  if (validator.isEmpty(desc)) {
    errors.desc = "Desc is required";
  }

  return {
    errors,
    isEmpty: _.isEmpty(errors)
  };
};

module.exports = eventValidator;
