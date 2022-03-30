const User = require("../models/user");

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

module.exports = { findUserByPhone, createUser };
