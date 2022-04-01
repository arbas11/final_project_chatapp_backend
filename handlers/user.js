const User = require("../models/user");
const AppError = require("../utilities/appError");

//:::::::::::user related function:::::::::::::
//create user function
const createUser = async (req, res, next) => {
  const { userPhonenum, displayName } = req.body;
  const user = new User({
    userPhonenum: userPhonenum,
    displayName: displayName,
  });
  await user
    .save()
    .then((data) => {
      return res.status(200).json(data);
    })
    .then((e) => {
      return next(e);
    });
};
// createUser(dataNeeded);
//--------------------------------------------------------
//find one user by phone number
const findUserByPhone = async (req, res) => {
  const { userPhonenum } = req.body;
  await User.findOne({ userPhonenum: userPhonenum })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).send("something went south");
    });
};

// findUserByPhone(dataNeeded);
//--------------------------------------------------------
//update user displayName, profilePic
const updateUserData = async (req, res) => {
  const { userPhonenum, displayName, profilePic, userStatus } = req.body;
  console.log(req.body, "req.body dari update user");
  await User.findOneAndUpdate(
    { userPhonenum: userPhonenum },
    { displayName: displayName, profilePic: profilePic, status: userStatus }
  )
    .then((data) => {
      console.log("data dari update user handles", data);
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log("error dari catch update user", e);
      res.status(400).send("something went south");
    });
};

module.exports = { findUserByPhone, createUser, updateUserData };
