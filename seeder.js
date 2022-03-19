const add = new User({
  phone: "0811167540",
  username: "arbas",
  contact: [
    {
      phone: "08170167540",
      username: "budioke",
      history: [
        {
          author: "0811167540",
          recepient: "08170167540",
          message: "halo bro ngetest nih",
        },
        {
          author: "08170167540",
          recepient: "0811167540",
          message: "oke siap bro",
        },
        {
          author: "0811167540",
          recepient: "08170167540",
          message: "mantab",
        },
      ],
    },
    {
      phone: "0811111111",
      username: "jonicool",
      history: [
        {
          author: "0811167540",
          recepient: "0811111111",
          message: "halo bro apa kabar?",
        },
        {
          author: "08111111111",
          recepient: "0811167540",
          message: "alhamdulillah baik bro",
        },
        {
          author: "0811167540",
          recepient: "08111111111",
          message: "mantab",
        },
      ],
    },
    {
      phone: "0888888888",
      username: "siapapun",
      history: [
        {
          author: "0811167540",
          recepient: "0888888888",
          message: "bro!",
        },
        {
          author: "0888888888",
          recepient: "0811167540",
          message: "oke siap bro",
        },
        {
          author: "0811167540",
          recepient: "0888888888",
          message: "cakep bro!",
        },
      ],
    },
  ],
});

// add.save();
