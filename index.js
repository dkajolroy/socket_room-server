import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
const app = express();

//configure app
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("connected ID: " + socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(5000, () => {
  console.log("server Started  ");
});
