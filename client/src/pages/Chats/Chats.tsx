import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography,List } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { ResponseMessage, useFetchMessages } from "./hooks/useFetchMessages";

const Chats = (): JSX.Element => {
  const { messages, messageText, onMessageChange, sendMessage } = useFetchMessages();
  console.log(messages);
  return (
    <Container maxWidth="lg">
      <List sx={{ width: '100%', maxWidth: 360, background: 'gray' }}>
        <ListItem alignItems="flex-start" sx={{ background: "gray" }} >
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline', maxWidth: "110px" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
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
    </Container >
  );
};

export default Chats;
