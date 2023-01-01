import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { Form } from '../../components'
import AuthService from '../../services/authService'

const Register = () => {
    const { user } = useSelector(state=>state)
    //TODO:
    const handleRegister = async (username,email,password) => {
      await AuthService.register(username,email,password)
    }
    if(user.isAuth){
      return <Navigate to='/home' />
    }

  return (
    <>
    <Form onSubmit={handleRegister} title='Register'  /> 
    </>
  )
}

export default Register