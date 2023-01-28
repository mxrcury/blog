import React, { useEffect, useState, ChangeEvent } from "react";
import { useSelector } from "../../../redux";
import { socketCL } from "../../../redux/middlewares/socket-middleware";

interface IUseFetchMessages {
  messages: ResponseMessage[];
  messageText: string;
  sendMessage: () => void;
  onMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
let messagesData: ResponseMessage[] = [];

let tempAutoIncrementId = 1;

export const useFetchMessages = (): IUseFetchMessages => {
  const { user } = useSelector((state) => state);
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<ResponseMessage[]>([]);

  useEffect(() => {
    socketCL.connect("ws://localhost:7000");
    socketCL.event("sendMessage", (data, dispatch) => {
      messagesData.push(data)
      setMessages([...messages, data]);
    });
  }, []);
  const sendMessage = () => {
    // TODO:change to Message type after adding posibility to store messages in DB
    const message: ResponseMessage = {
      createdAt: String(Date.now()),
      userId: user.userInfo.id as number,
      createdBy: user.userInfo.username as string,
      text: messageText as string,
      id: ++tempAutoIncrementId,
    };
    socketCL.send("sendMessage", message);
  };

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  return { messages: messagesData, messageText, sendMessage, onMessageChange };
};

export interface Message {
  userId: number;
  text: string;
  createdAt: string;
  createdBy: string;
}

export interface ResponseMessage extends Message {
  id: number;
}
