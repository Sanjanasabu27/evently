const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  eventName: String,

  description: String,

  category: String,

  image: String,

  room: String,

  status: {
    type: String,
    default: "Open"
  },

  eventDates: [
    {
      date: String,
      capacity: Number
    }
  ]

});

module.exports =
mongoose.model("Event", eventSchema);