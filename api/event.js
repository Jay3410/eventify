const express = require("express");
const route = express.Router();
const passport = require("passport");
const Event = require("../model/event");
const eventValidator = require("../validation/eventValidation");
const mongoose = require("mongoose");
const _ = require("lodash");

// get events
route.get("/", (req, res) => {
  Event.find().then(events => res.send(events));
});

// create event
route.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { title, desc } = req.body;
    const { errors, isEmpty } = eventValidator(req.body);

    if (!isEmpty) {
      return res.status(400).send(errors);
    }

    const newEvent = new Event({
      user: req.user._id,
      title,
      desc
    });
    newEvent.save().then(event => res.send(event));
  }
);

// delete event by id
route.delete(
  "/delete/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.event_id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ event: "Event not found" });
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      const errors = {};

      Event.findById(id).then(event => {
        if (!event) {
          errors.event = "Event not found";
          return res.status(404).send(errors);
        }
        if (event) {
          // check event creator and event deletor are same
          // both are object type
          if (event.user.toString() === req.user._id.toString()) {
            Event.findByIdAndDelete(id).then(() => res.send({ success: true }));
          } else {
            errors.unauthorized = "Only event creator can delete an event";
            return res.status(400).send(errors);
          }
        }
      });
    }
  }
);

// update event with id
route.put(
  "/update/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.event_id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ event: "Event not found" });
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      const { title, desc } = req.body;
      const { errors, isEmpty } = eventValidator(req.body);

      if (!isEmpty) {
        return res.status(400).send(errors);
      } else {
        Event.findById(id).then(event => {
          if (!event) {
            errors.event = "Event not found";
            return res.status(404).send(errors);
          }
          if (event) {
            // check event creator and event deletor are same
            if (event.user.toString() === req.user._id.toString()) {
              Event.findByIdAndUpdate(
                id,
                { $set: { title, desc } },
                { new: true }
              ).then(event => res.send(event));
            } else {
              errors.unauthorized = "Only event creator can update an event";
              return res.status(400).send(errors);
            }
          }
        });
      }
    }
  }
);

// like event by id
route.put(
  "/like/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.event_id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ event: "Event not found" });
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      Event.findById(id).then(event => {
        if (!event) {
          errors.event = "Event not found";
          return res.status(404).send(errors);
        }
        if (event) {
          // check event creator and event deletor are same
          const alreadyLiked = event.likes.filter(
            like => like.toString() === req.user._id.toString()
          );
          if (alreadyLiked.length === 0) {
            event.likes.push(req.user._id);
            event.save().then(user => res.send(user));
          } else {
            res.status(400).send({ alreadyLiked: true });
          }
        }
      });
    }
  }
);

// comment event by id
route.put(
  "/comment/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.event_id;
    const { comment } = req.body;
    if (_.isEmpty(comment)) {
      res.status(400).send({ comment: "Comment is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({ event: "Event not found" });
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      Event.findById(id).then(event => {
        if (!event) {
          errors.event = "Event not found";
          return res.status(404).send(errors);
        }
        if (event) {
          // check event creator and event deletor are same
          event.comments.unshift({
            user: req.user._id,
            comment
          });

          event.save().then(event => res.send(event));
        }
      });
    }
  }
);

module.exports = route;
