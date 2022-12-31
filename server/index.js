require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use(cookieParser());
app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is started on PORT - ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
