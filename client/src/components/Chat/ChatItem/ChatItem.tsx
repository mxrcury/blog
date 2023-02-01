import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Chat } from "./types";

interface ChatItemProps extends Chat {
  activeChat: boolean
}

export const ChatItem = ({ lastMessage, username, activeChat }: ChatItemProps): JSX.Element => {
  return (
    <ListItem alignItems="flex-start" sx={{ background: activeChat ? "red" : "gray", borderBottom: "2px solid black" }}>
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={username}
        secondary={
          <React.Fragment>
            {/* <Typography
              sx={{ display: "inline", maxWidth: "110px" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {username}
            </Typography> */}
            {lastMessage}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
