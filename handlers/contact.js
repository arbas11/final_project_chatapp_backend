const Contact = require("../models/contact");
const User = require("../models/user");

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
    const contactsToAdd = new Contact({
      owner: owner.userPhonenum,
      contactNumber: toAdd.userPhonenum,
      contactName: contactName,
    });
    contactsToAdd.owner = owner.userPhonenum;
    contactsToAdd.contactData = toAdd;
    owner.contacts.push(contactsToAdd);
    await contactsToAdd.save();
    await owner
      .save()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((e) => {
        next(e);
      });
  } catch {
    return next(e);
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

module.exports = { addContact, getAllUserContact, getOneUserContact };
