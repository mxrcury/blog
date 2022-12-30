import { ButtonBase, Container as ContainerTemplate, InputBase, OutlinedInput, styled, TextareaAutosize, TextField } from "@mui/material";


export const Container = styled(ContainerTemplate)(()=>({
    // display:'flex',
    display:'grid',
    // flexDirection:'column',
    width:'500px',
}))

export const Input = styled(TextField)(()=>({
    height:'60px',
    marginBottom:'10px'
}))
export const Textarea = styled(TextField)(()=>({
    marginBottom:'10px',
}))
export const Button = styled(ButtonBase)(()=>({
    height:'60px',
    marginBottom:'10px',
    border:"1px solid rgba(170,170,170,0.5)",
    borderRadius:"5px",
    fontSize:'24px',
    width:'200px,'
}))