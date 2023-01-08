import React, { useState } from 'react'
import { Container, Input, Form as FormContainer, SubmitButton, FormTitle } from './styles';
import useInput from '../../../hooks/useInput';

const Form = ({ onSubmit, title = 'Login', children }) => {
  // const [value, setValue] = useState({})

  const { value:{username,email,password}, onChange } = useInput('username','email','password')

  // const onChange = (e) => {
  //   setValue({
  //     ...value,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  return (
    <Container>
      <FormContainer>
        <FormTitle>
          {title.toUpperCase()}
        </FormTitle>
        <Input
          name='username'
          label="Username"
          id="outlined-size-small"
          defaultValue=""
          required
          value={username.value}
          onChange={onChange}
          size="small"
        />
        <Input
          name='email'
          label="Email"
          type='email'
          required
          id="outlined-size-small"
          defaultValue=""
          value={email.value}
          onChange={onChange}
          size="small"
        />
        <Input
          name='password'
          type='password'
          label="Password"
          required
          id="outlined-size-small"
          defaultValue=""
          value={password.value}
          onChange={onChange}
          size="small"
        />
        <SubmitButton variant="contained" onClick={() => onSubmit(username.value, email.value, password.value)}>
          {title}
        </SubmitButton>
      </FormContainer>
      {children}
    </Container>
  )
}

export default Form
