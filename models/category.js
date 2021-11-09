const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  gameId: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
