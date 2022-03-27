const express = require("express");
const contact = require("../handlers/contact");
const catchAsync = require("../utilities/catchAsync");

const router = express.Router({ mergeParams: true });

router.post("/getallcontact", catchAsync(contact.getAllUserContact));
router.post("/getonecontact", catchAsync(contact.getOneUserContact));
router.post("/addcontact", catchAsync(contact.addContact));

module.exports = router;
