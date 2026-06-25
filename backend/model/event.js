const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  room: String,

  eventDates: [
    {
      date: String,
      capacity: Number
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);