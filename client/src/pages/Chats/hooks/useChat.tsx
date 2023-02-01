import React, { useEffect, useState, ChangeEvent } from "react";
import { $api } from "../../../api/api";
import { Chat } from "../../../components/Chat/ChatItem/types";
import { useTime } from "../../../hooks";
import { useSelector } from "../../../redux";
import { socketCL } from "../../../redux/middlewares/socket-middleware";
import { ResponseMessage } from "../types";

interface IUseChat {
  messages: ResponseMessage[];
  messageText: string;
  sendMessage: () => void;
  onMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  chatList: Chat[];
  activeChat: number;
  handleChatActive: (chatId: number) => void;
}
let messagesData: ResponseMessage[] = [];

let tempAutoIncrementId = 1;

export const useChat = (): IUseChat => {
  const { user } = useSelector((state) => state);
  const { getCurrentDateInISO } = useTime();
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<ResponseMessage[]>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number>(2);
  useEffect(() => {
    setChatList([
      {
        avatarImg: "",
        lastMessage: "Hello bro",
        userId: 1,
        username: "mercury",
        id: 1,
      },
      {
        avatarImg: "",
        lastMessage: "Hello bro",
        userId: 2,
        username: "rone",
        id: 2,
      },
      {
        avatarImg: "",
        lastMessage: "Hello dwdwbro",
        userId: 3,
        username: "harry",
        id: 3,
      },
      {
        avatarImg: "",
        lastMessage: "Hdwadawello bro",
        userId: 4,
        username: "hermione",
        id: 4,
      },
    ]);
    socketCL.connect("ws://localhost:7000");
    socketCL.event("newMessage", (data, dispatch) => {
      console.log(data)
      messagesData.push(data);
      setMessages([...messages, data]);
    });
  }, []);
  const sendMessage = async () => {
    // const { sendFromId, sendToId, chatId, text, createdAt, createdBy } =

    const message = {
      createdAt: getCurrentDateInISO(Date),
      sendFromId: user.userInfo.id,
      sendToId: 130, // TODO:change this to real user but it need to some room i think
      createdBy: user.userInfo.username,
      chatId: 1, // TODO:also change to chat id
      text: messageText,
    };
    console.log(`message created but not sent to server - `, message)
    // TODO: change it to separate file in service, thunk or mb rtk query
    await $api.post(`/chats/send-message`, message);
  };

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleChatActive = (chatId: number) => {
    setActiveChat(chatId);
  };

  return {
    messages: messagesData,
    messageText,
    sendMessage,
    onMessageChange,
    chatList,
    activeChat,
    handleChatActive,
  };
};
