import { Container } from '@mui/material'
import React from 'react'
import { PostForm } from '../../components'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const NewPost = () => {
  const { user } = useSelector(({user})=>({user}))

  if(!user.isAuth) {
    return <Navigate to='/login' />
  }
  return (
    <Container>
      NewPost page.
      <PostForm /> 
    </Container>
  )
}

export default NewPost
