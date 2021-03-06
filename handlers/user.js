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
const findUserByEmail = async (req, res) => {
  const { userEmail } = req.body;
  await User.findOne({ userEmail: userEmail })
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
  const { userEmail, displayName, profilePic, userStatus } = req.body;
  await User.findOneAndUpdate(
    { userEmail: userEmail },
    { displayName: displayName, profilePic: profilePic, status: userStatus }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).send("something went south");
    });
};

module.exports = { findUserByEmail, createUser, updateUserData };
