const express = require("express");
const { check, body } = require("express-validator");

const userController = require("../controllers/user.js");

const router = express.Router();

const User = require("../models/user");

router.get("/user/create-user", userController.getCreateUser);
router.post("/user/create-user", [
    body("name")
        .isAlphanumeric()
        .withMessage("Please enter a name"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email invalid. Please enter a valid email address"
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
  userController.postCreateUser
);