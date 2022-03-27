const History = require("../models/history");

//database connection:
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/chat_app_dibimbing")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection error");
    console.log(error);
  });

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
const addHistoryToContact = async (oneHistory) => {
  const { owner, contact } = oneHistory;
  const contactToAdd = await Contact.findOne({
    userPhonenum: owner,
    contactNumber: contact,
  });
  const newHistory = new History(oneHistory);
  contactToAdd.history.push(newHistory);

  await newHistory.save();
  await contactToAdd.save();
  console.log("contact yg di add", contactToAdd);
  console.log("history yg di add", newHistory);
};
// addHistoryToContact(oneHistory);
//--------------------------------------------------------
//show one contact history:

const showContactHistory = async (userNum, contactNum) => {
  const history = await History.find({
    owner: userNum,
    contact: contactNum,
  });
  console.log(history);
};
const { owner, contact } = oneHistory;
// showContactHistory(owner, contact);

module.exports = { addHistoryToContact, showContactHistory };
