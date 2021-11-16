const routes = require("express").Router();
const authRoutes = require("./auth");
const gameRoutes = require("./game");
const errorController = require("../controllers/error");

routes
  .use("/game", gameRoutes)
  .use("/auth", authRoutes)
  .get("/", (req, res, next) => {
    res.render("index", {
      title: "WELCOME to Beat That! ",
      path: "/index",
    });
  })

  .get("/500", errorController.get500)
  .use(errorController.get404);

module.exports = routes;
