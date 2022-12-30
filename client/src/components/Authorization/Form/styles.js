import { Button, TextField, styled } from "@mui/material";


export const Container = styled('div')(()=>({
    display:"block",
    margin:"0 auto",
    width:'400px',
    marginTop:'30px'
}))
export const Form = styled('div')(()=>({
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
}))
export const Input = styled(TextField)(()=>({
    marginBottom:'15px',
    ':last-child':{
        marginBottom:0
    }
}))
export const SubmitButton = styled(Button)(()=>({
    
}))
export const FormTitle = styled('h1')(()=>({
    textAlign:'center'
}))

