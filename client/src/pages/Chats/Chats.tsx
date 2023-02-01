import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  List,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { ChatItems } from "../../components/Chat/ChatItems/ChatItems";
import { useChat } from "./hooks/useChat";
import { ChatContainer } from "./styles";

const Chats = (): JSX.Element => {
  const { messages, messageText, onMessageChange, sendMessage, chatList, activeChat, handleChatActive } = useChat();
  console.log(messages);
  return (
    <>
      <Container maxWidth="lg">
        <ChatContainer>
          <ChatItems chatList={chatList} activeChat={activeChat} handleChatActive={handleChatActive} />
          <div>
            <div style={{ height: "500px" }}>
              {messages.length
                ? messages.map((message) => (
                  <div key={message.id}>
                    <h4>{message.createdBy}</h4>
                    <p>{message.text}</p>
                    {/*JSON.stringify(message)*/}
                  </div>
                ))
                : null}
            </div>
            <input value={messageText} onChange={onMessageChange} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </ChatContainer>
      </Container>
    </>
  );
};

export default Chats;
