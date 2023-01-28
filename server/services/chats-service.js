const pool = require("../db");

class ChatsService {
  async getMessages() {
    const messagesFromDb = await pool.query(`SELECT * FROM messages;`);
    const messages = messagesFromDb.rows.map((message) => {
      const newMessage = {
        ...message,
        userId: message.user_id,
        createdAt: message.created_at,
      };
      delete newMessage.user_id;
      delete newMessage.created_at;
      return newMessage;
    });
    return messages;
  }
}

module.exports = new ChatsService();
