const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.broadcast.emit(
    "joinmessage",
    `New User connected with id ${socket.id}`
  );
  console.log("connected");

  socket.on("chatMessage", (message) => {
    socket.broadcast.emit("sendToAll", {
      message: message,
      socketid: socket.id,
    });
    socket.to();
  });

  socket.on("disconnect", () => {
    io.emit("leavemessage", `User ${socket.id} left the chat room`);
    console.log("Disconnected");
  });
});

server.listen(8000, () => {
  console.log("sever is running on port 8000");
});
