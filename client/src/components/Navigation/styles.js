import { rgbToHex, styled } from '@mui/material'
import { Link as LinkTemplate} from '@mui/material'

export const Links = styled('div')(()=>({
    display:'flex',
    justifyContent:'center',
    paddingTop: "24px",
    paddingBottom: "20px",
    // background:"rgb(34, 34, 34)"
    borderBottom:"2px solid gray"
    // justifyContent:'space-around'
}))
export const Link = styled(LinkTemplate)(()=>({
    // color:'rgb(29, 29, 29)',
    marginRight:'10px',
    color:'rgb(0,0,0)'
}))