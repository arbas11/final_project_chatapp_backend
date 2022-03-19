const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  contact: [
    {
      phone: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
      history: [
        {
          author: String,
          recepient: String,
          message: String,
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
