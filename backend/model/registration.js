const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    userName: String,
    ticketCount: Number,
    contact: String,
    paymentStatus: String
});

module.exports = mongoose.model(
    "Registration",
    registrationSchema
);