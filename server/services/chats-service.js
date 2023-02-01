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
  async sendMessage(messageInfo) {
    const { sendFromId, sendToId, chatId, text, createdAt, createdBy } =
      messageInfo;

    const chat = await pool.query(
      `SELECT * FROM chat WHERE user_id = $1 AND partner_id = $2;`,
      [sendFromId, sendToId]
    );
    const isChatAlreadyCreated =
      chat.rows.length &&
      chat.rows.filter((chat) => chat.user_id === sendFromId).length;
    if (!isChatAlreadyCreated) {
      // if no chat with some user, chat will be created
      const partnerUsername = await pool.query(
        `SELECT users.username FROM users WHERE id = $1;`,
        [sendToId]
      );
      // create chat
      await pool.query(
        `INSERT INTO chat (user_id,partner_id,partner_name) values ($1,$2,$3);`,
        [sendFromId, sendToId, partnerUsername.rows[0].username]
      );
    }
    const message = await pool.query(
      `INSERT INTO chat_messages (
      send_from_id,
      send_to_id,
      chat_id,
      text,
      created_at,
      created_by) values ($1,$2,$3,$4,$5,$6) RETURNING*;`,
      [sendFromId, sendToId, chatId, text, createdAt, createdBy]
    );
    const updatedMessage = {
      ...message.rows[0],
      createdAt: message.rows[0].created_at,
      createdBy: message.rows[0].created_by,
      sendFromId: message.rows[0].send_from_id,
      sendToId: message.rows[0].send_to_id,
      chatId: message.rows[0].chat_id,
    };
    delete updatedMessage.created_at;
    delete updatedMessage.created_by;
    delete updatedMessage.send_to_id;
    delete updatedMessage.send_from_id;
    delete updatedMessage.chat_id;
    return updatedMessage;
  }
  async getChats(userId) {
    const chats = await pool.query(`SELECT * FROM chat WHERE user_id = $1;`, [
      userId,
    ]);
    return chats.rows;
  }
}

module.exports = new ChatsService();
