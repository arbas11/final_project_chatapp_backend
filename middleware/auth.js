const admin = require("../config/firebase-config");

const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) {
      //context
      req.user = decodeValue;
      return next();
    }
    return res.json({ message: "unauthorize" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "server error" });
  }
};

module.exports = decodeToken;
