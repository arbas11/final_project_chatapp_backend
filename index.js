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

const User = require("./models/user");
const isAuth = require("./middleware/auth");

const PORT = process.env.PORT || 3001;

// app.use(isAuth);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.handshake.query.username}`);
  console.log(socket.id);
  const id = socket.handshake.query.username;
  socket.join(id);

  socket.on("send-message", (messageData) => {
    console.log(messageData.recepientId);
    console.log("messagedata pas send", messageData);
    socket.broadcast
      .to(messageData.recepientId)
      .emit("receive-message", messageData);
    console.log(messageData.recepientId);

    console.log("messagedata pas recive", messageData);
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

app.get("/", (req, res) => {
  res.send("hola world");
});
server.listen(PORT, () => {
  console.log(`on port ${PORT}`);
});
