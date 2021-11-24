const express = require("express");
const { body } = require("express-validator");
const gameController = require("../controllers/game");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/all", isAuth, gameController.getAllGames);
router.get("/score", isAuth, gameController.getScoreBoard);

router.get("/add", isAuth, gameController.getAddGame);
router.post(
  "/add",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("the game name must be at least 3 characters long"),
    body("description")
      .trim()
      .isLength({ min: 5, max: 400 })
      .withMessage("The description must be between 5 and 400 characters."),
  ],
  isAuth,
  gameController.postAddGame
);
router.get("/edit/:gameId", isAuth, gameController.getEditGame);
router.post(
  "/edit",
  [
    body("name")
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("the game name must be at least 3 characters long"),
    body("description")
      .trim()
      .isLength({ min: 5, max: 400 })
      .withMessage("The description must be between 5 and 400 characters."),
  ],
  isAuth,
  gameController.postEditGame
);
router.post("/delete", isAuth, gameController.postDeleteGame);

module.exports = router;
