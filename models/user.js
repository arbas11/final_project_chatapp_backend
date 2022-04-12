const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    status: {
      type: String,
      default: "online",
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toggleLogout = function () {
  this.isOnline = false;
  return this.save();
};
userSchema.methods.toggleLogin = function () {
  this.isOnline = true;
  return this.save();
};
const User = mongoose.model("User", userSchema);

module.exports = User;
