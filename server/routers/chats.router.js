const Router = require("express");
const ChatsController = require("../controllers/chats-controller");

const chatsRouter = new Router();

chatsRouter.get("/:id/messages", ChatsController.getMessages);
chatsRouter.get("/:id", ChatsController.getChats);
chatsRouter.post("/send-message", ChatsController.sendMessage);

module.exports = chatsRouter;
