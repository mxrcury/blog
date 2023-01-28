import React, { useState } from 'react'
import { LINKS } from './data'
import { Links, Link } from './styles'
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from 'react-redux';


const Navigation = () => {
  const { isAuth } = useSelector(({user})=>user)

  if (!isAuth) {
    return (
      <Links>
        {LINKS.UNATHORIZATED.map((link) => (
          <Link component={RouterLink} to={link.path} sx={{color:"white"}} color="secondary" >
            {link.title}
          </Link>
        ))}
      </Links>
    );
  }

  return (
        <Links>
            {LINKS.AUTHORIZATED.map(link=><Link component={RouterLink} to={link.path} >{link.title}</Link>)}
        </Links>
  )
}

export default Navigation
