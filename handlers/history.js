const History = require("../models/history");
const Contact = require("../models/contact");

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
const oneHistory = {
  owner: "0811167540",
  contact: "08170167540",
  author: "08170167540",
  recepient: "0811167540",
  message: "Alhamdulilah baik nih lu gimana kabarnya?",
  time: time(),
};

//--------------------------------------------------------
//add history to contact:
// owner: "0811167540"
// contact: "08170167540"
// author: "0811167540"
// recepient: "08170167540"
// message: "Halo brother gimana kabarnya?"
// time: "17:42"

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
    next(e);
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
  } catch (e) {
    next(e);
  }
};
// addHistoryToContact(oneHistory);
//--------------------------------------------------------
//show one contact history:

const showContactHistory = async (req, res, next) => {
  const { userNumber, contactNumber } = req.body;
  await History.find({
    owner: userNumber,
    contact: contactNumber,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).send("something went south");
    });
};

module.exports = {
  addHistoryToContact,
  showContactHistory,
  addHistoryReceiver,
  addHistorySender,
};
