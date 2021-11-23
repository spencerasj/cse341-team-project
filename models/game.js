const mongoose = require("mongoose");
// const User = require("../models/user");

const Schema = mongoose.Schema;

// TODO: Fields to add?
// duration
// rounds
// start time
// end time

const gameSchema = new Schema({
  // accessToken: {
  //   type: String,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  description: { type: String, required: false },
  gameMasters: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  players: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  topPerformer: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "User",
    preformerInfo:{
      name: { 
        type: String, 
        required: true
      },
      score: { 
        type: Number, 
        required: true
      },
      date: { 
        type: Date, 
        required: true
      }
    }
  },
  lowPerformer: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "User",
    preformerInfo: {
      name: { 
        type: String, 
        required: true
      },
      score: { 
        type: Number, 
        required: true
      },
      date: { 
        type: Date, 
        required: true
      }
    }
  },
  playerScores: [
    {
      player: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

// gameSchema.methods.addGameMasterByEmail = function(newGameMasterEmail) {
//   User.find({ email: newGameMasterEmail})
//     .then()
// };

module.exports = mongoose.model("Game", gameSchema);
