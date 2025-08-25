const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socketServer");
const routes = require("./routes/sessionRoutes");
const client = require("./connectDb");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(cors({
  origin: process.env.FRONTEND_URL,  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true                 
}));

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",routes);

socketHandler(io);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});