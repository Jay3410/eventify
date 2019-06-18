const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: new Date().valueOf()
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  desc: {
    type: String,
    required: true,
    min: 3
  },
  likes: [String],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      comment: String,
      date: {
        type: Date,
        default: new Date().valueOf()
      }
    }
  ]
});

const Event = mongoose.model("Events", EventSchema);

module.exports = Event;
