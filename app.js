const path = require("path");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();
app
  .use(express.static(path.join(__dirname, "public")))
  .set("view engine", "ejs")

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
