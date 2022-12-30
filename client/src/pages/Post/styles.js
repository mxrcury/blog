import { Container, TextField, styled } from "@mui/material";
import { Button as ButtonTemplate } from '@mui/material'

export const PostContainer = styled(Container)(()=>({
    
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
export const CommentButton = styled(ButtonTemplate)(()=>({
    border:0,
    outline:0,
    marginBottom:'2px',
    fontSize:'20px'
}))
export const CommentInput = styled(TextField)(()=>({
    border:0,
    outline:0,
    marginBottom:'2px',
    fontSize:'20px'
}))
export const CommentContainer = styled('div')(()=>({
    display:'flex',
    flex: 'auto'
    // justifyContent:'center',
    // width:"100%",
    // flexDirection:'inherit'
 }))
export const BackButton = styled(ButtonTemplate)(()=>({
   marginTop:'30px'
}))