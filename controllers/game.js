const { validationResult } = require("express-validator");
const Game = require("../models/game");

exports.getAllGames = (req, res, next) => {
  Game.find({ gameMasters: req.user._id })
    .populate("gameMasters")
    .then((games) => {
      res.render("game/all", {
        title: "List of Games",
        path: "/game/all",
        games: games,
        user: req.user,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddGame = (req, res, next) => {
  res.render("game/edit", {
    title: "Add Game",
    path: "/game/add",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.getScoreBoard = (req, res, next) => {
  Game.find()
  // Game.find({ players: req.user._id })
  // .select('')
  // .populate('userId')
  .then((games) => {
    res.render("game/score", {
      title: "Scoreboard",
      path: "/game/score",
      games: games,
      user: req.user
    });
  })
  .catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.postAddGame = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const highestScoreEverName = req.body.highestScoreEverName;
  const highestScoreEverScore = req.body.highestScoreEverScore;
  const highestScoreEverDate = req.body.highestScoreEverDate;
  const lowestScoreEverName = req.body.lowestScoreEverName;
  const lowestScoreEverScore = req.body.lowestScoreEverScore;
  const lowestScoreEverDate = req.body.lowestScoreEverDate;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("game/edit", {
      title: "Add Game",
      path: "/game/add",
      editing: false,
      hasError: true,
      game: {
        name: name,
        description: description,
        highestScoreEver: {
          name: highestScoreEverName,
          score: highestScoreEverScore,
          date: highestScoreEverDate,
        },
        lowestScoreEver: {
          name: lowestScoreEverName,
          score: lowestScoreEverScore,
          date: lowestScoreEverDate,
        },
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const game = new Game({
    name: name,
    description: description,
    game: {
      name: name,
      description: description,
      highestScoreEver: {
        name: highestScoreEverName,
        score: highestScoreEverScore,
        date: highestScoreEverDate,
      },
      lowestScoreEver: {
        name: lowestScoreEverName,
        score: lowestScoreEverScore,
        date: lowestScoreEverDate,
      },
    },
  });

  game
    .save()
    .then((result) => {
      // Fixes the issue of scores not saving on create game. Also adds user as a game master
      Game.findById(result._id)
        .then((game) => {
          game.highestScoreEver.name = highestScoreEverName;
          game.highestScoreEver.score = highestScoreEverScore;
          game.highestScoreEver.date = highestScoreEverDate;
          game.lowestScoreEver.name = lowestScoreEverName;
          game.lowestScoreEver.score = lowestScoreEverScore;
          game.lowestScoreEver.date = lowestScoreEverDate;

          game.gameMasters.push(req.user._id);

          return game.save().then((result) => {
            res.redirect("/game/all");
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.postAddPlayerToGame = (req, res, next) => {
//   const gameId = req.body.gameId;
//   const playerId = req.body.playerId;

// Get game from db
//  If user not a game master:
// Error message
// If user is a game master:
// get user with playerId:

// Add player to game as a player

// Save game
// redirect

// const game = new Game({
//   name: name,
//   description: description,
//   status: status,
// });
// game
//   .save()
//   .then((result) => {
//     res.redirect("/games/all");
//   })
//   .catch((err) => {
//     const error = new Error(err);
//     error.httpStatusCode = 500;
//     return next(error);
//   });
// };

exports.getEditGame = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .then((game) => {
      if (!game) {
        return res.redirect("/game/all");
      }

      // Check to see if the user is a game master, if not, redirect
      if (
        game.gameMasters.filter(
          (gameMaster) => gameMaster._id.toString() === req.user._id.toString()
        ).length !== 1
      ) {
        return res.redirect("/game/all");
      }

      res.render("game/edit", {
        title: "Edit Game",
        path: "/game/edit",
        editing: editMode,
        game: game,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditGame = (req, res, next) => {
  const gameId = req.body.gameId;
  const updatedName = req.body.name;
  const updatedDescription = req.body.description;
  const updatedHighestScoreEverName = req.body.highestScoreEverName;
  const updatedHighestScoreEverScore = req.body.highestScoreEverScore;
  const updatedHighestScoreEverDate = req.body.highestScoreEverDate;
  const updatedLowestScoreEverName = req.body.lowestScoreEverName;
  const updatedLowestScoreEverScore = req.body.lowestScoreEverScore;
  const updatedLowestScoreEverDate = req.body.lowestScoreEverDate;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("game/edit", {
      title: "Edit Game",
      path: "/game/edit",
      editing: true,
      hasError: true,
      game: {
        _id: gameId,
        name: updatedName,
        description: updatedDescription,
        highestScoreEver: {
          name: updatedHighestScoreEverName,
          score: updatedHighestScoreEverScore,
          date: updatedHighestScoreEverDate,
        },
        lowestScoreEver: {
          name: updatedLowestScoreEverName,
          score: updatedLowestScoreEverScore,
          date: updatedLowestScoreEverDate,
        },
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Game.findById(gameId)
    .then((game) => {
      // Check to see if the logged in user is a game master
      if (
        game.gameMasters.filter(
          (gameMaster) => gameMaster._id.toString() === req.user._id.toString()
        ).length !== 1
      ) {
        return res.redirect("/game/all");
      }

      game.name = updatedName;
      game.description = updatedDescription;
      game.highestScoreEver.name = updatedHighestScoreEverName;
      game.highestScoreEver.score = updatedHighestScoreEverScore;
      game.highestScoreEver.date = updatedHighestScoreEverDate;
      game.lowestScoreEver.name = updatedLowestScoreEverName;
      game.lowestScoreEver.score = updatedLowestScoreEverScore;
      game.lowestScoreEver.date = updatedLowestScoreEverDate;

      return game.save().then((result) => {
        res.redirect("/game/all");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteGame = (req, res, next) => {
  const gameId = req.body.gameId;

  Game.findById(gameId)
    .then((game) => {
      if (!game) {
        return next(new Error("game not found"));
      }

      // Only a gamemaster can delete a game
      if (
        game.gameMasters.filter(
          (gameMaster) => gameMaster._id.toString() === req.user._id.toString()
        ).length === 1
      ) {
        return Game.deleteOne({ _id: gameId, gameMaster: req.user._id });
      } else {
        return res.redirect("/game/all");
      }
    })
    .then(() => {
      res.redirect("/game/all");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
