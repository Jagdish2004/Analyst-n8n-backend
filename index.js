// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socketServer");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});


socketHandler(io);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});