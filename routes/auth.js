const express = require("express");
const auth = require("../handlers/auth");
const catchAsync = require("../utilities/catchAsync");

const router = express.Router({ mergeParams: true });

router.post("/logout", catchAsync(auth.updateUserOnline));

module.exports = router;
