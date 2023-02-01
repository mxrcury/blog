const pool = require("../db");
const ChatsService = require("../services/chats-service");
const socket = require("../socket");

class ChatsController {
  async getMessages(req, res, next) {
    try {
      const messages = await ChatsService.getMessages();
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
  async sendMessage(req, res, next) {
    try {
      const messageInfo = req.body;
      console.log(messageInfo);
      const newMessage = await ChatsService.sendMessage(messageInfo);
      await socket._socketServer.emit("newMessage", newMessage);
      res.json({ message: `Successfully send`, status: "ok" });
    } catch (error) {
      next(error);
    }
  }
  async getChats(req, res, next) {
    try {
      const { id } = req.params;
      const chats = await ChatsService.getChats(id);
      res.json(chats);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChatsController();
