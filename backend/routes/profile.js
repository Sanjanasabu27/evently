var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");
router.post("/", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne({});

    if (!profile) {
      profile = await Profile.create({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        contactNumber: "",
        city: "",
        state: "",
        bio: "",
        image: ""
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/", async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;