const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../model/Profile");
const User = require("../../model/User");

// @route GET api/profile/me
// @desc Get current user's profile
// @access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
