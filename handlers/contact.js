const Contact = require("../models/contact");
const History = require("../models/history");
const User = require("../models/user");
const AppError = require("../utilities/appError");

//--------------------------------------------------------
//get all user contact:
const getAllUserContact = async (req, res, next) => {
  const { userEmail } = req.body;
  await Contact.find({ owner: userEmail })
    .populate("contactData", "displayName userEmail profilePic status isOnline")
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
    const { userEmail, contactEmail, contactName } = req.body;
    const owner = await User.findOne({ userEmail: userEmail });
    const toAdd = await User.findOne({ userEmail: contactEmail });
    if (!toAdd) {
      throw new AppError("contact doesn't exist", 400);
    }
    const contactsToAdd = new Contact({
      owner: owner.userEmail,
      contactEmail: toAdd.userEmail,
      contactName: contactName,
    });
    contactsToAdd.owner = owner.userEmail;
    contactsToAdd.contactData = toAdd;
    owner.contacts.push(contactsToAdd);
    await contactsToAdd.save().then((data) => {
      return res
        .status(200)
        .json({ name: data.contactName, email: data.contactEmail });
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
  const { userEmail, contactEmail } = userData;
  const oneContactData = await Contact.findOne({
    owner: userEmail,
    contactNumber: contactEmail,
  }).populate("contactData");
};
// getOneUserContact(dataNeeded);
//--------------------------------------------------------
//delete one contact
const deleteOneContact = async (req, res, next) => {
  const { userEmail, contactEmail, contactId } = req.body;
  await Contact.findOneAndDelete({
    owner: userEmail,
    contactNumber: contactEmail,
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
    { userEmail: userEmail },
    { $pull: { contacts: contactId } }
  );
  await History.deleteMany({ owner: userEmail, contact: contactEmail });
};
//--------------------------------------------------------
//update contact name
const updateContactName = async (req, res) => {
  const { userEmail, contactEmail, newContactName } = req.body;
  await Contact.findOneAndUpdate(
    { owner: userEmail, contactEmail: contactEmail },
    { contactName: newContactName }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
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
