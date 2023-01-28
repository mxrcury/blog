const Router = require("express");
const ChatsController = require("../controllers/chats-controller");

const chatsRouter = new Router();

chatsRouter.get("", ChatsController.getMessages);

module.exports = chatsRouter;
