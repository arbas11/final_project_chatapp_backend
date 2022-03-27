const express = require("express");
const history = require("../handlers/history");
const catchAsync = require("../utilities/catchAsync");

const router = express.Router({ mergeParams: true });

router.get("/history/showuserhistory", catchAsync(history.showContactHistory));
router.post("/history/addhistory", catchAsync(history.addHistoryToContact));

module.exports = router;
