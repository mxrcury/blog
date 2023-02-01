const Router = require("express");
const authRouter = require("./auth.router");
const postRouter = require("./posts.router");
const authMiddleware = require("../middlewares/auth-middleware");
const usersRouter = require("./users.router");
const chatsRouter = require("./chats.router");

const rootRouter = new Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/posts", authMiddleware, postRouter);
rootRouter.use("/users", authMiddleware, usersRouter);
rootRouter.use("/chats", chatsRouter);
// authMiddleware;

module.exports = rootRouter;
