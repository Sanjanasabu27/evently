const express = require("express");
const Contact = require("../models/contact");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Request Submitted Successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.json(contacts);
});
router.put("/resolve/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(
    req.params.id,
    { status: "Resolved" }
  );

  res.json({ message: "Resolved" });
});
module.exports = router;