import { styled } from '@mui/material'
import { Link as LinkTemplate} from '@mui/material'

export const Links = styled('div')(()=>({
    display:'flex',
    justifyContent:'center'
    // justifyContent:'space-around'
}))
export const Link = styled(LinkTemplate)(()=>({
    color:'black',
    marginRight:'10px'
}))