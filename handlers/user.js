const User = require("../models/user");

//:::::::::::user related function:::::::::::::
//create user function
const createUser = async (req, res) => {
  const { userPhonenum, displayName } = req.body;
  console.log(req.body, "ini req");
  const user = new User({
    userPhonenum: userPhonenum,
    displayName: displayName,
  });
  await user
    .save()
    .then((u) => {
      console.log(u);
    })
    .then((e) => {
      res.status(400).json({
        error: "phone number and display name cannot be empty",
      });
    });
};
// createUser(dataNeeded);
//--------------------------------------------------------
//find one user by phone number
const findUserByPhone = async (req, res) => {
  const { userPhonenum } = req.body;
  console.log(req.body);
  await User.findOne({ userPhonenum: userPhonenum }, "displayName userPhonenum")
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).send("something went south");
    });
  console.log(user);
};

// findUserByPhone(dataNeeded);
//--------------------------------------------------------

module.exports = { findUserByPhone, createUser };
