const express = require("express");
const history = require("../handlers/history");
const catchAsync = require("../utilities/catchAsync");

const router = express.Router({ mergeParams: true });

router.post("/showuserhistory", catchAsync(history.showContactHistory));
router.post("/addhistory", catchAsync(history.addHistoryToContact));

module.exports = router;
