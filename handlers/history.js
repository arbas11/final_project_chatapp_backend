const History = require("../models/history");
const Contact = require("../models/contact");
const AppError = require("../utilities/appError");

//:::::::::::one message history format:::::::::::::
//time setter function
const time = () => {
  const date = new Date();
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  currentHours = ("0" + currentHours).slice(-2);
  currentMinutes = ("0" + currentMinutes).slice(-2);
  return currentHours + ":" + currentMinutes;
};

//--------------------------------------------------------

const addHistoryToContact = async (req, res, next) => {
  try {
    const { owner, contact } = req.body;
    const contactToAdd = await Contact.findOne({
      userPhonenum: owner,
      contactNumber: contact,
    });
    const newHistory = new History(req.body);
    contactToAdd.history.push(newHistory);

    await newHistory.save();
    await contactToAdd.save();
  } catch (e) {
    next(e);
  }
};
const addHistorySender = async (messageData) => {
  try {
    const { owner, contact } = messageData;
    const contactToAdd = await Contact.findOne({
      userPhonenum: owner,
      contactNumber: contact,
    });
    const newHistory = new History(messageData);
    contactToAdd.history.push(newHistory);

    await newHistory.save();
    await contactToAdd.save();
  } catch (e) {
    throw new AppError("something wrong, try again later", 500);
  }
};
const addHistoryReceiver = async (messageData) => {
  try {
    const { owner, contact } = messageData;
    const contactToAdd = await Contact.findOne({
      userPhonenum: contact,
      contactNumber: owner,
    });
    const receiveMsgData = {
      owner: messageData.contact,
      contact: messageData.owner,
      author: messageData.author,
      recepient: messageData.recepient,
      message: messageData.message,
      time: messageData.time,
    };
    const newHistory = new History(receiveMsgData);
    contactToAdd.history.push(newHistory);

    await newHistory.save();
    await contactToAdd.save();
    return newHistory;
  } catch (e) {
    throw new AppError("User has not add your contact", 500);
  }
};
// addHistoryToContact(oneHistory);
//--------------------------------------------------------
//show one contact history:

const showContactHistory = async (req, res, next) => {
  const { userNumber, contactNumber } = req.body;
  console.log("req body dari hist handler", req.body);
  const q = parseInt(req.body.q);
  const page = parseInt(req.body.page);
  console.log("page dalam history handler", page);
  await History.find({
    owner: userNumber,
    contact: contactNumber,
  })
    .limit(q)
    .skip(page)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).send("something wrong please comeback soon");
    });
};

module.exports = {
  addHistoryToContact,
  showContactHistory,
  addHistoryReceiver,
  addHistorySender,
};
