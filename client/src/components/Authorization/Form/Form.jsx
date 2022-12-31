import React, { useState } from 'react'
import { Container, Input, Form as FormContainer, SubmitButton, FormTitle } from './styles';

const Form = ({ onSubmit, title = 'Login', children }) => {
  const [value, setValue] = useState({})

  const onChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    })
  }

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
          value={value.username}
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
          value={value.email}
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
          value={value.password}
          onChange={onChange}
          size="small"
        />
        <SubmitButton variant="contained" onClick={() => onSubmit(value.username, value.email, value.password)}>
          {title}
        </SubmitButton>
      </FormContainer>
      {children}
    </Container>
  )
}

export default Form
