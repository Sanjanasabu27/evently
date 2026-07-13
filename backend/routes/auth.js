const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

/* User Signup */

router.post("/signup", async (req, res) => {

    try {

        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

            fullName,
            email,
            password: hashedPassword

        });

        await user.save();

        res.status(201).json({

            message: "User Registered Successfully"

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

});
router.get("/signup", (req, res) => {
  res.send("Signup Route Working");
});
/* User Login */

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check whether the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password"
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "event_secret_key",
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});
module.exports = router;