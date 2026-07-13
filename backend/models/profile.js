const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  contactNumber: String,
  city: String,
  state: String,
  bio: String,
  image: String
});

module.exports = mongoose.model("Profile", profileSchema);