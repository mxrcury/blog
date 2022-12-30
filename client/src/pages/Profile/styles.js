import { styled } from "@mui/material";
import { Button as ButtonTemplate } from '@mui/material'

export const Button = styled(ButtonTemplate)(()=>({
    maxWidth:"600px",
    display:"block",
    margin:"0 auto",
    border:"1.4px solid rgba(170,170,170,0.5)",
    borderRadius:"4px",
    padding:"5px",
    marginBottom:"20px",
    "&:last-child":{
        marginBottom:"0px"
    }
}))