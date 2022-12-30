import { Paper, styled } from "@mui/material";
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom';

export const Input = styled(TextField)(()=>({
    display:'flex',
    justifyContent:'center',
    width:'300px'
}))
export const UsersList = styled('div')(()=>({
    display:'grid',
    width:'100%',
    // height:'calc(100vh - 40vh)',
    gridTemplateColumns:'30%',
    gridGap:'20px',
    justifyContent:'center'
}))
export const UserItem = styled(Paper)(()=>({
    width:'100%',
    padding:'20px 0px',
    textAlign:'center'
}))
export const UserLink = styled(Link)(()=>({
    display:'inline-block'
}))

export const UserContainer = styled('div')(()=>({
        // maxWidth:"600px",
        // display:"block",
        // margin:"0 auto",
        // // border:"1.4px solid rgba(170,170,170,0.5)",
        // // borderRadius:"4px",
        // padding:"5px 10px",
        // marginBottom:"20px",
        // position:'relative',
        // "&:last-child":{
        //     marginBottom:"0px"
        // }
}))