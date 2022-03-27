const express = require("express");
const user = require("../handlers/user");
const catchAsync = require("../utilities/catchAsync");

const router = express.Router({ mergeParams: true });

router.post("/getuser", catchAsync(user.findUserByPhone));
router.post("/createuser", catchAsync(user.createUser));

module.exports = router;
