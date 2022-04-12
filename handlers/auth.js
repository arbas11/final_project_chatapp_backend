const User = require("../models/user");
const AppError = require("../utilities/appError");

const userLogin = async (req, res) => {
  const { userEmail, displayName, profilePic } = req.body;
  try {
    const user = await User.findOne({ userEmail: userEmail });
    if (user) {
      user.toggleLogin();
      res.status(200).json(user);
    } else {
      const newUser = new User({
        userEmail: userEmail,
        displayName: displayName,
        profilePic: profilePic,
      });
      await newUser.save().then((data) => {
        return res.status(200).json(data);
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const userLogout = async (req, res) => {
  const { userEmail } = req.body;
  const user = await User.findOne({ userEmail: userEmail });
  user.toggleLogout();
};
module.exports = { userLogin, userLogout };
