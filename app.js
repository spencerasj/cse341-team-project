const path = require("path");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

app
  .use(express.static(path.join(__dirname, "public")))
  .set("view engine", "ejs");

const corsOptions = {
  origin: "https://git.heroku.com/beat-that.git",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4,
};

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
