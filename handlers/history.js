const History = require("../models/history");
const Contact = require("../models/contact");
const AppError = require("../utilities/appError");

//:::::::::::one message history format:::::::::::::
//--------------------------------------------------------

const addHistoryToContact = async (req, res, next) => {
  try {
    const { owner, contact } = req.body;
    const contactToAdd = await Contact.findOne({
      userEmail: owner,
      contactEmail: contact,
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
  console.log("hit me on history handler add history sender");
  try {
    const { owner, contact } = messageData;
    const contactToAdd = await Contact.findOne({
      userEmail: owner,
      contactEmail: contact,
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
  console.log("hit me on history handler add history receiver");
  try {
    const { owner, contact } = messageData;
    const contactToAdd = await Contact.findOne({
      userEmail: contact,
      contactEmail: owner,
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
  console.log("hit me on history handler show histoy");
  const { userEmail, contactEmail } = req.body;
  await History.find({
    owner: userEmail,
    contact: contactEmail,
  })
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
