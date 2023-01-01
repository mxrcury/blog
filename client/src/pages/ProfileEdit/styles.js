import { styled } from "@mui/material";
import { Button as ButtonTemplate } from "@mui/material";
import { Link } from 'react-router-dom';

export const BackLink = styled(Link)(() => ({
    textDecoration:'none'
}));
export const FieldItem = styled('div')(() => ({
    width:'200px',
    // marginBottom:'10px'
}));
export const FieldContainer = styled('div')(() => ({
    display:'flex',
    alignItems:'center'
}));
