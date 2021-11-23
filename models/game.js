const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

  highestScoreEver: {
    // type: Schema.Types.ObjectId,
    // required: false,
    // ref: "User",
    // preformerInfo: {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // },
  },
  lowestScoreEver: {
    // type: Schema.Types.ObjectId,
    // required: false,
    // ref: "User",
    // performerInfo: {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // },
  },
});

// gameSchema.methods.addGameMasterByEmail = function(newGameMasterEmail) {
//   User.find({ email: newGameMasterEmail})
//     .then()
// };

module.exports = mongoose.model("Game", gameSchema);
