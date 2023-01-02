require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = process.env.PORT || 7000;

const app = express();
const server = require("http").Server(app);
// const { Server } = require('socket.io')
const socketSingleton = require('./singletones/Socket')
const socketServer = socketSingleton.configure(server)



app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use(cookieParser());

// TODO:Refactor and make "controllers" for sockets
socketServer.io.on("connection", (socket) => {
    console.log(`User connected`);
    socket.emit('update')
    socket.on('message',(msg) => {
        console.log(`Message from client - `, msg)
        socket.emit('update')
    })
});
// --- sockets

app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is started on PORT - ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
