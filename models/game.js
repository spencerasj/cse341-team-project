const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
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
    name: {
      type: String,
      // With these fields required, Editing works but Adding does not.
      // required: true,
    },
    score: {
      type: Number,
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
    },
  },
  lowestScoreEver: {
    name: {
      type: String,
      // required: true,
    },
    score: {
      type: Number,
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
    },
  },
});

// gameSchema.methods.addGameMasterByEmail = function(newGameMasterEmail) {
//   User.find({ email: newGameMasterEmail})
//     .then()
// };

module.exports = mongoose.model("Game", gameSchema);
