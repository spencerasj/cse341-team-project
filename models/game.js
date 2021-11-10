const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// TODO: Fields to add?
// duration
// rounds
// start time
// end time

const gameSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
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
  status: { type: String, required: true },
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
  },
  lowPerformer: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "User",
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

module.exports = mongoose.model("Game", gameSchema);
