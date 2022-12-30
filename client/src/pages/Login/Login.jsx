import React from 'react'
import { Form } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import authService from '../../services/authService';
import { setUser } from '../../redux/slices/user';
import { saveToStorage } from '../../utils/localStorage';
import PostService from '../../services/postService';
import { setPosts } from '../../redux/slices/post';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const { user:userData } = useSelector((state=>state))
  
    const handleLogin = async (username,email,password) => {
      const { user, accessToken } = await authService.login(username,email,password)
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
      <div>
      {userData.username}
      </div>
      <div>
      {userData.token}
      </div>
      <Form onSubmit={handleLogin} title='Login' />
    </div>
  )
}

export default Login
