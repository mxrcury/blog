require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const SocketEvents = require("./socket");
const socketSingleton = require('./singletones/Socket')
const PORT = process.env.PORT || 7000;

const app = express();
const server = require("http").Server(app);
const socketServer = socketSingleton.configure(server)

const socketConnect = SocketEvents.connect(socketServer)


app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use(cookieParser());

// TODO:Refactor and make "controllers" for sockets
// socket
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
