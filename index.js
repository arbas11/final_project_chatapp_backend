if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const http = require("http");
const server = http.createServer(app);

// const authRoutes = require('./routes/auth')
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");
const historyRoutes = require("./routes/history");
const User = require("./models/user");
const isAuth = require("./middleware/auth");

const PORT = process.env.PORT || 3001;

// app.use(isAuth);
app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.handshake.query.userPhonenum}`);
  console.log(socket.id);
  const phonenum = socket.handshake.query.userPhonenum;
  socket.join(phonenum);

  socket.on("send-message", (messageData) => {
    socket.broadcast
      .to(messageData.recepient)
      .emit("receive-message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

mongoose
  .connect("mongodb://localhost:27017/chat_app_dibimbing")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection error");
    console.log(error);
  });

// app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/history", historyRoutes);

app.get("/test", (req, res) => {
  res.send("hola world");
});

// app.use((error, req, res, next) => {
//   if (res.headersSent) {
//     return next(error);
//   }
//   const { message = "something is not right", status = 500 } = error;
//   res.status(status).send(message);
// });

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

server.listen(PORT, () => {
  console.log(`on port ${PORT}`);
});
