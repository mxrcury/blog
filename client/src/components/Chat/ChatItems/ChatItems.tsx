import { List } from "@mui/material";
import React from "react";
import { ChatItem } from "../ChatItem/ChatItem";
import { Chat } from "../ChatItem/types";

interface ChatItemsProps {
  chatList: Chat[];
  activeChat: number
  handleChatActive: (chatId: number) => void
}

export const ChatItems = ({ chatList, activeChat, handleChatActive }: ChatItemsProps) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, background: "gray", height: "250px", overflowY: "auto" }}>
      {chatList.map((chat) => (
        <div onClick={() => handleChatActive(chat.id)} >
          <ChatItem {...chat} key={chat.id} activeChat={chat.id === activeChat} />
        </div>
      ))}
    </List>
  );
};
