import { styled, TextField } from "@mui/material";
import { Button as ButtonTemplate } from "@mui/material";

export const Button = styled(ButtonTemplate)(() => ({
  marginLeft:'10px'
}));

export const Input = styled(TextField)(() => ({}));
export const CommentsSubtitle = styled('h5')(() => ({
  marginBottom:'10px',
  fontSize:'16px'
}));
