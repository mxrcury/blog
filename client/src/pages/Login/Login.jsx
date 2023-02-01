import React from "react";
import { Form } from "../../components";
import { Navigate } from "react-router";
import { Alert } from "@mui/material";
import { ErrorMessage } from "./styles";
import { useLogin } from "./hooks/useLogin";

const Login = () => {
  const { error, isAuth, handleLogin } = useLogin()
  if (isAuth) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <Form onSubmit={handleLogin} title="Login">
        {error.message ? (
          <ErrorMessage>
            <Alert severity="error">{error.message}</Alert>
          </ErrorMessage>
        ) : null}
      </Form>
    </div>
  );
};

export default Login;
