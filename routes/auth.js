const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

const User = require("../models/user");

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "There is no registered user with that email address. Please sign up."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with letters and numbers and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/sign-up", authController.getSignUp);

router.post(
  "/sign-up",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            console.log("found a user");
            return Promise.reject(
              "Email exists already, please pick a different one."
            );
          } else {
            console.log("no user found.");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with letters and numbers and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postSignUp
);

router.get("/reset/:token", authController.getNewPassword);

router.get("/reset", authController.getReset);

router.post(
  "/reset",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "There is no registered user with that email address. Please create an account instead."
            );
          }
        });
      }),
  ],
  authController.postReset
);

router.post(
  "/new-password",
  [
    body(
      "password",
      "Please enter a password with letters and numbers and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postNewPassword
);

module.exports = router;
