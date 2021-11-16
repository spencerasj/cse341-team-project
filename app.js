const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const csrf = require("csurf");
const csrfProtection = csrf({});

const flash = require("connect-flash");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: "https://beat-that.herokuapp.com/",
  optionsSuccessStatus: 200,
};

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
const routes = require("./routes");

const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app
  .set("view engine", "ejs")
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors(corsOptions))
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
        console.log("we have a logged in user " + user._id);
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
  .use("/", routes);

const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4,
};

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
