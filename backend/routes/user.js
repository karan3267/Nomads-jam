const express = require("express");
const User = require("../models/User");
const router = express.Router();
const passport = require("passport");

// ... other middleware

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id; // Access user ID from authentication

      // Connect to MongoDB or your database
      const user = await User.findById(userId); // Replace 'User' with your model

      if (user) {
        console.log(user);
        res.json({ user }); // Send user data as JSON response
      } else {
        res.status(404).send("User not found"); // Handle user not found
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).send("Internal server error"); // Handle unexpected errors
    }
  }
);

module.exports = router;
