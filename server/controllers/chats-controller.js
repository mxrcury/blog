const pool = require("../db");
const ChatsService = require("../services/chats-service");

class ChatsController {
  async getMessages(req, res, next) {
    try {
      const messages = await ChatsService.getMessages();
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatsController();
