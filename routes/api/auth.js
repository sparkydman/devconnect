const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../model/User");

// @route GET api/auth
// @desc Test  route
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

// @route POST api/auth
// @desc authenticate user & get token
// @access public
router.post(
  "/",
  [
    check("email", "Incorrent login credentials").isEmail(),
    check("password", "Incorrent login credentials").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // check if users exist
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          errors: [{ msg: "Invalid credentials" }],
        });
      }

      // check password matches
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({
          errors: [{ msg: "Incorrent crediential" }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Servver error");
    }
  }
);

module.exports = router;
