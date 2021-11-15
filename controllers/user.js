const bcrypt = require("bcryptjs");
const crypto = require("crypto");
//const nodemailer = require("nodemailer");
//const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");

const User = require("../models/user");


exports.getCreateUser = (req, res, next) => {
    let errorMessage = req.flash("error");
    if (errorMessage.length > 0) {
      errorMessage = errorMessage[0];
    } else {
      errorMessage = null;
    }
  
    res.render("/user/create-user", {
      path: "/user/create-user",
      title: "Create User",
      errorMessage: errorMessage,
      successMessage: ""
    });
  };
  
  exports.postCreateUser = (req, res, next) => {
    const name =  req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
  
      res.status(422).render("/user/create-user", {
        path: "/user/create-user",
        title: "Create User",
        errorMessage: errors.array()[0].msg,
        userId: userId.toString(),
        passwordToken: passwordToken,
        validationErrors: errors.array(),
      });
    }

    User.findOne({ email: email })
    .then((userDoc) => {
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          return req.flash(
            "success",
            "A new user has been created successfully."
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
    
  };