const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    ticketCount: {
        type: Number,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    nameOfEvent: {
        type: String,
        required: true
    },

    eventDate: {
        type: Date,
        required: true
    },

    room: {
        type: String,
        required: true
    },

    paymentStatus: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Registration", registrationSchema);