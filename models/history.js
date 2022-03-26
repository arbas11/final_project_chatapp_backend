const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    recepient: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
