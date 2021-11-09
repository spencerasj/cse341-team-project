const path = require("path");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf({});

app
  .use(express.static(path.join(__dirname, "public")))
  .use(
    session({
      secret: process.env.SESSION_SECRET || "default secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  )
  .use(csrfProtection)
  .use(flash())
  .use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  })
  .use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  })
  .use(authRoutes)
  .use("/game", gameRoutes)
  .set("view engine", "ejs");

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
