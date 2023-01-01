import { styled } from "@mui/material";
import { Button as ButtonTemplate } from "@mui/material";
import { Link } from "react-router-dom";

export const Button = styled(ButtonTemplate)(() => ({
    maxWidth: "600px",
    display: "block",
    margin: "0 auto",
    border: "1.4px solid rgba(170,170,170,0.5)",
    borderRadius: "4px",
    padding: "5px",
    marginBottom: "20px",
    "&:last-child": {
        marginBottom: "0px",
    },
}));
export const LogOutButton = styled(ButtonTemplate)(() => ({
    marginRight:'10px',
}));
export const EditLink = styled(Link)(() => ({
    textDecoration:'none'
}));

export const ButtonsContainer = styled('div')(() => ({
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
}));
