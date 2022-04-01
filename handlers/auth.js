const User = require("../models/user");
const AppError = require("../utilities/appError");

const updateUserOnline = async (req, res) => {
  const { userNumber } = req.body;
  const user = await User.findOne({ userPhonenum: userNumber });
  await user
    .toggleIsOnline()
    .then((data) => {
      console.log("data dari update user handles", data);
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log("error dari catch update user", e);
      res.status(400).send("something went south");
    });
};

module.exports = { updateUserOnline };
