const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = mongoose.model("users");

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(`ERROR ${err}`);
  }
});

// process user register
router.post("/register", async (req, res) => {
  const { email, password, password2 } = req.body;

  if (!email) {
    req.flash("error_msg", "Email is required");
    return res.redirect("/");
  }

  if (!password || password != password2) {
    req.flash("error_msg", "Password is does not match");
    return res.redirect("/");
  }

  try {
    // see if user exist
    User.findOne({ email }).then((user) => {
      if (user) {
        req.flash("error_msg", "Email is already in used");
        return res.redirect("/");
      }

      const newUser = new User({
        username: email,
        email,
        password,
      });

      // encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              req.flash("success_msg", "Account successfully created");
              return res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        });
      });
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

// process user login
router.post("/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash("error_msg", "Invalid Login");
      return res.redirect("/");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      req.flash("success_msg", `Welcome ${user.email}`);
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = router;
