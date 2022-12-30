import React from 'react'
import { Form } from '../../components'
import AuthService from '../../services/authService'

const Register = () => {
    //TODO:
    const handleRegister = async (username,email,password) => {
      await AuthService.register(username,email,password)
    }

  return (
    <>
    <Form onSubmit={handleRegister} title='Register'  /> 
    </>
  )
}

export default Register