const Contact = require("../models/contact");
const History = require("../models/history");
const User = require("../models/user");
const AppError = require("../utilities/appError");

//--------------------------------------------------------
//get all user contact:
const getAllUserContact = async (req, res, next) => {
  const { userPhonenum } = req.body;
  await Contact.find({ owner: userPhonenum })
    .populate(
      "contactData",
      "displayName userPhonenum profilePic status isOnline"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).send("something went south");
    });
};

// getAllUserContact(dataNeeded);
//--------------------------------------------------------
//add contact to user

const addContact = async (req, res, next) => {
  try {
    const { userPhonenum, contactNumber, contactName } = req.body;
    const owner = await User.findOne({ userPhonenum: userPhonenum });
    const toAdd = await User.findOne({ userPhonenum: contactNumber });
    if (!toAdd) {
      throw new AppError("contact doesn't exist", 400);
    }
    const contactsToAdd = new Contact({
      owner: owner.userPhonenum,
      contactNumber: toAdd.userPhonenum,
      contactName: contactName,
    });
    contactsToAdd.owner = owner.userPhonenum;
    contactsToAdd.contactData = toAdd;
    owner.contacts.push(contactsToAdd);
    await contactsToAdd.save().then((data) => {
      return res
        .status(200)
        .json({ name: data.contactName, number: data.contactNumber });
    });
    await owner
      .save()
      .then((data) => {})
      .catch(() => {
        throw new AppError("Sorry something went wrong", 500);
      });
  } catch (e) {
    throw new AppError(e, 500);
  }
};

// addContact(dataNeeded);
//--------------------------------------------------------
//get one contact:
const getOneUserContact = async (userData) => {
  const { userPhonenum, contactNumber } = userData;
  const oneContactData = await Contact.findOne({
    owner: userPhonenum,
    contactNumber: contactNumber,
  }).populate("contactData");
};
// getOneUserContact(dataNeeded);
//--------------------------------------------------------
//delete one contact
const deleteOneContact = async (req, res, next) => {
  const { userNumber, contactNumber, contactId } = req.body;
  await Contact.findOneAndDelete({
    owner: userNumber,
    contactNumber: contactNumber,
  })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
  await User.findOneAndUpdate(
    { userPhonenum: userNumber },
    { $pull: { contacts: contactId } }
  );
  await History.deleteMany({ owner: userNumber, contact: contactNumber });
};
//--------------------------------------------------------
//update contact name
const updateContactName = async (req, res) => {
  const { userPhonenum, contactNumber, newContactName } = req.body;
  console.log(req.body, "req.body dari update user");
  await Contact.findOneAndUpdate(
    { owner: userPhonenum, contactNumber: contactNumber },
    { contactName: newContactName }
  )
    .then((data) => {
      console.log("data dari update user handles", data);
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log("error dari catch update user", e);
      res.status(400).send("something went south");
    });
};

module.exports = {
  addContact,
  getAllUserContact,
  getOneUserContact,
  deleteOneContact,
  updateContactName,
};
