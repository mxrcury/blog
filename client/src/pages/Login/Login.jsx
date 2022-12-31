import React, { useState } from 'react'
import { Form } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import authService from '../../services/authService';
import { setUser } from '../../redux/slices/user';
import { saveToStorage } from '../../utils/localStorage';
import PostService from '../../services/postService';
import { setPosts } from '../../redux/slices/post';
import { Alert } from '@mui/material';
import { ErrorMessage } from './styles'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error,setError] = useState({})
    const { user:userData } = useSelector((state=>state))
  
    const handleLogin = async (username,email,password) => {
      const { user, accessToken, error} = await authService.login(username,email,password)
      if(!user){
        setError({message:error.message})
      }
      dispatch(setUser({username:user.username,token:accessToken}))
      saveToStorage('username',user.username)
      saveToStorage('accessToken',accessToken)
      if(userData || userData.token){
        const post = await PostService.getPosts()
        dispatch(setPosts(post))
        navigate('/home')
      }
    }
  
    return (
      <div>
        <Form onSubmit={handleLogin} title='Login'>
          {error.message ? <ErrorMessage><Alert severity="error">{error.message}</Alert></ErrorMessage> : null}
        </Form>
      </div>
  )

}

export default Login
