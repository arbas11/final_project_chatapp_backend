const Contact = require("./models/contact");
const History = require("./models/history");
const User = require("./models/user");
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
//--------------------------------------------------------

const deleteManyHistory = async (owner, contact) => {
  await History.deleteMany({ owner: owner, contact: contact });
};
// deleteManyHistory("03", "02");
//--------------------------------------------------------
//::::::::::delete list di parentnya:::::
const deleteOneContact = async (id, phone) => {
  await Contact.findByIdAndUpdate(id, { $pull: { history: phone } });
};
// deleteOneContact("623ee80506079ad912659468", "62433bd0da575ab833542d19");
//::::::::::delete actual contactnya:::::
const deleteActualContact = async (id) => {
  await Contact.findByIdAndDelete(id);
};
// deleteActualContact("623ee525ef843b63d20e2927");
//--------------------------------------------------------
//:::::::::::user relation function:::::::::::::
//create user function
const dataNeeded = {
  userPhonenum: "08170167540",
  displayName: "ario baskoro",
  contactNumber: "0811167540",
};

const createUser = async (userToCreate) => {
  const { userPhonenum, displayName } = userToCreate;
  const user = new User({
    userPhonenum: userPhonenum,
    displayName: displayName,
  });
  await user
    .save()
    .then((u) => {
      console.log(u);
    })
    .then((e) => {
      console.log(e);
    });
};
// createUser(dataNeeded);
//--------------------------------------------------------
//find one user by phone number
const findUserByPhone = async (dataNeeded) => {
  const { userPhonenum } = dataNeeded;
  const user = await User.findOne(
    { userPhonenum: userPhonenum },
    "displayName userPhonenum"
  );
  console.log(user);
};

// findUserByPhone(dataNeeded);

//:::::::::::contact relation function:::::::::::::
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

  console.log("owner:", owner);
  console.log("contact:", contactsToAdd);
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
//:::::::::::one message history format:::::::::::::

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
  const history = await History.findOne({
    owner: userNum,
    contact: contactNum,
  });
  console.log(history);
};
const { owner, contact } = oneHistory;
// showContactHistory(owner, contact);
//const add = new User({
//   phone: "0811167540",
//   username: "arbas",
//   contact: [
//     {
//       phone: "08170167540",
//       username: "budioke",
//       history: [
//         {
//           author: "0811167540",
//           recepient: "08170167540",
//           message: "halo bro ngetest nih",
//         },
//         {
//           author: "08170167540",
//           recepient: "0811167540",
//           message: "oke siap bro",
//         },
//         {
//           author: "0811167540",
//           recepient: "08170167540",
//           message: "mantab",
//         },
//       ],
//     },
//     {
//       phone: "0811111111",
//       username: "jonicool",
//       history: [
//         {
//           author: "0811167540",
//           recepient: "0811111111",
//           message: "halo bro apa kabar?",
//         },
//         {
//           author: "08111111111",
//           recepient: "0811167540",
//           message: "alhamdulillah baik bro",
//         },
//         {
//           author: "0811167540",
//           recepient: "08111111111",
//           message: "mantab",
//         },
//       ],
//     },
//     {
//       phone: "0888888888",
//       username: "siapapun",
//       history: [
//         {
//           author: "0811167540",
//           recepient: "0888888888",
//           message: "bro!",
//         },
//         {
//           author: "0888888888",
//           recepient: "0811167540",
//           message: "oke siap bro",
//         },
//         {
//           author: "0811167540",
//           recepient: "0888888888",
//           message: "cakep bro!",
//         },
//       ],
//     },
//   ],
// });
