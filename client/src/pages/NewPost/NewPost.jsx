import { Alert, Container, Snackbar } from "@mui/material";
import React from "react";
import { PostForm } from "../../components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { PostTitle } from "./styles";
import { useToggle } from "../../hooks";

const NewPost = () => {
  const successSnackBar = useToggle();
  const { user } = useSelector(({ user }) => ({ user }));

  if (!user.isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <PostTitle>You can create a post</PostTitle>
      <PostForm successSnackBar={successSnackBar} />

      <Snackbar
        open={successSnackBar.status}
        autoHideDuration={3300}
        onClose={successSnackBar.close}
      >
        <Alert
          onClose={successSnackBar.close}
          severity="success"
          sx={{ width: "100%" }}
        >
          Post successfully was added
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewPost;
