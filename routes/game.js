const express = require("express");
// const { body } = require("express-validator");
const gameController = require("../controllers/game");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/all-games", isAuth, gameController.getAllGames);

router.get("/add-game", isAuth, gameController.getAddGame);
router.post(
  "/add-game",
  // validation middleware will go here. examples:
  // [
  //   body("title")
  //     .isString()
  //     .isLength({ min: 3 })
  //     .trim()
  //     .withMessage("the title must be at least 3 characters long"),
  //   body("price")
  //     .isFloat()
  //     .withMessage("The price was not valid. Please try again."),
  //   body("description")
  //     .isLength({ min: 5, max: 400 })
  //     .trim()
  //     .withMessage("The description must be between 5 and 400 characters."),
  // ],
  isAuth,
  gameController.postAddGame
);
router.get("/edit-game/:gameId", isAuth, gameController.getEditGame);
router.post(
  "/edit-game",
  // validation middleware will go here. examples:
  // [
  //   body("title")
  //     .isString()
  //     .isLength({ min: 3 })
  //     .trim()
  //     .withMessage("the title must be at least 3 characters long"),
  //   body("price")
  //     .isFloat()
  //     .withMessage("The price was not valid. Please try again."),
  //   body("description")
  //     .isLength({ min: 5, max: 400 })
  //     .trim()
  //     .withMessage("The description must be between 5 and 400 characters."),
  // ],
  isAuth,
  gameController.postEditGame
);
router.post("/delete-game", isAuth, gameController.postDeleteGame);

module.exports = router;
