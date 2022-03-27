const Contact = require("../models/contact");

//:::::::::::contact related function:::::::::::::
const dataNeeded = {
  userPhonenum: "08170167540",
  displayName: "ario baskoro",
  contactNumber: "0811167540",
};
//--------------------------------------------------------
//add contact to user

const addContact = async (userToAdd) => {
  const { userPhonenum, contactNumber } = userToAdd;
  const owner = await User.findOne({ userPhonenum: userPhonenum });
  const toAdd = await User.findOne({ userPhonenum: contactNumber });
  const contactsToAdd = new Contact({
    userPhonenum: owner.userPhonenum,
    contactNumber: toAdd.userPhonenum,
  });

  owner.contacts.push(contactsToAdd);
  contactsToAdd.owner = owner.userPhonenum;
  contactsToAdd.contactData = toAdd;

  await contactsToAdd.save();
  await owner.save();
};

// addContact(dataNeeded);
//--------------------------------------------------------
//get all user contact:
const getAllUserContact = async (userData) => {
  const { userPhonenum } = userData;
  const allContact = await Contact.find({ owner: userPhonenum }).populate(
    "contactData"
  );
  for (contact of allContact) {
    console.log(contact.contactData);
  }
};

// getAllUserContact(dataNeeded);
//--------------------------------------------------------
//get one contact:
const getOneUserContact = async (userData) => {
  const { userPhonenum, contactNumber } = userData;
  const oneContactData = await Contact.findOne({
    owner: userPhonenum,
    contactNumber: contactNumber,
  }).populate("contactData");
  console.log(oneContactData);
};
// getOneUserContact(dataNeeded);
//--------------------------------------------------------

module.exports = { addContact, getAllUserContact, getOneUserContact };
