import { ArrowBack } from "@mui/icons-material";
import { styled, Paper } from "@mui/material";
import { Link } from "react-router-dom";


export const Container = styled(Paper)(()=>({
    // maxWidth:"600px",
    // width:"60%",
    width:"500px",
    display:"block",
    margin:"0 auto",
    height:"140px",
    // border:"1.4px solid rgba(170,170,170,0.5)",
    // borderRadius:"4px",
    padding:"5px 10px",
    marginBottom:"20px",
    position:'relative',
    "&:last-child":{
        marginBottom:"0px"
    }
}))

export const PostInfo = styled("div")(()=>({
    display:'flex',
    justifyContent:"space-between",
    alignItems:'center'
}))

export const Likes = styled("div")(()=>({
    display:"flex",
    alignItems:'center'
}))

export const LikeButton = styled("button")(()=>({
    border:0,
    outline:0,
    marginRight:'5px',
    background:'none',
    cursor:'pointer'
    // marginTop:'3px'
}))
export const LikesQty = styled("p")(()=>({
    border:0,
    outline:0,
    marginBottom:'2px',
    fontSize:'20px'
}))

export const CreatedBy = styled("p")(()=>({
    display:'flex',
    justifyContent:"end",
    color:"rgba(110,110,110,0.8)"
}))
export const TextContent = styled("p")(()=>({fontSize:'18px',marginBottom:'15px',textAlign:'left'}))
export const Title = styled("h2")(()=>({marginBottom:'7px'}))
export const CreatedDate = styled("p")(()=>({marginBottom:'7px', fontSize:'17px'}))
export const Caption = styled("h4")(()=>({ fontSize:'17px'}))
export const MoreLink = styled(Link)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "7px",
  marginRight: "10px",
  color: "black",
  alignItems: "center",
  cursor:'pointer',
  textDecoration:'none',
  transition:'.12 ease',
  ':hover':{
    opacity:'0.9'
  }
}));
export const MoreLabel = styled('label')(() => ({
    transition:'.1s ease',
        cursor:'pointer',
        marginLeft:'3px',
    ':hover':{
    marginLeft:'6px',
  }
}));
export const ArrowIcon = styled(ArrowBack)(() => ({ width:'18px'}));



