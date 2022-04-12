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

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");
const historyRoutes = require("./routes/history");
const isAuth = require("./middleware/auth");
const { addHistoryReceiver, addHistorySender } = require("./handlers/history");
const { urlencoded } = require("express");

const prodDB = process.env.DB_URL;
// const localDB = process.env.LOCAL_DB;

const originProdUrl = "https://ngocech.herokuapp.com/";
// const originDevUrl = "http://localhost:3000";

const dbUrl = prodDB;
const originUrl = originProdUrl;

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(isAuth);

const io = new Server(server, {
  cors: {
    origin: originUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const userEmail = socket.handshake.query.userEmail;
  socket.join(userEmail);

  socket.on("send-message", async (messageData) => {
    socket.broadcast
      .to(messageData.recepient)
      .emit("receive-message", messageData);
    await addHistoryReceiver(messageData)
      .then((data) => console.log("message received"))
      .catch((e) => console.log(e));
    await addHistorySender(messageData)
      .then((data) => console.log("message send"))
      .catch((e) => console.log(e));
  });
  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection error");
    console.log(error);
  });

app.use("/api", isAuth, authRoutes);
app.use("/api/user", isAuth, userRoutes);
app.use("/api/contact", isAuth, contactRoutes);
app.use("/api/history", isAuth, historyRoutes);

app.get("/test", (req, res) => {
  res.send("hola world");
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const { message = "something is not right", status = 500 } = error;
  res.status(status).send(message);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

server.listen(PORT, () => {
  console.log(`on port ${PORT}`);
});
