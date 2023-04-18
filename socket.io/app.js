const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {
    Server
} = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`); 
    socket.on("join_room", (data) => {
        socket.join(data._id);
        console.log(`User with ID: ${socket.id} joined room: ${data.name}`);
    });

    socket.on("send_message", (data) => {
         socket.to(data.message.room).emit("receive_message", data.message);
         socket.to(data.to).emit("send_notification" , data);
    });

    socket.on('send_type_info' , data => {
        socket.to(data.to).emit('recieve_type_info' , data.typing)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});