import { Container, Input, Button, Textarea } from "./styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../redux/slices/post";
import PostService from "../../../services/postService";
// Change import of actions in index.js file
import useInput from "./../../../hooks/useInput";
import { useTime } from "../../../hooks";

const PostForm = ({ successSnackBar }) => {
  const { user:{ userInfo } } = useSelector(state => state);
  const { getCurrentDateInISO } = useTime()
  const dispatch = useDispatch();
  const {
    onChange,
    clearInputs,
    value: { title, text, caption },
    handleInputError,
    errorCheck,
    handlerErrorMessage,
  } = useInput("title", "text", "caption");
  const onSubmit = async () => {
    if (!title.value.length) {
      handleInputError("title");
      return;
    }
    if (!text.value.length) {
      handleInputError("text");
      return;
    }
    const post = {
      title: title.value,
      content: text.value,
      caption: caption.value,
      created_by: userInfo.username,
      created_at: getCurrentDateInISO(Date),
      likes: [],
    };
    const createdPost = await PostService.createPost(post);

    if (createdPost.status === "ok") {
      successSnackBar.open();
      dispatch(createPost({ ...post, id: createdPost.id, likesQty: 0 }));
    }

    clearInputs();
  };
  return (
    <Container>
      <Input
        error={errorCheck("title")}
        onBlur={() => {
          if (errorCheck("title")) {
            handleInputError("title", false);
          }
        }}
        id="outlined-password-input"
        label="Title"
        name="title"
        value={title.value}
        onChange={onChange}
        placeholder="Enter a title"
        helperText={handlerErrorMessage("title")}
        style={{ marginBottom: title.isError ? "20px" : null }}
      />
      <Input
        id="outlined-password-input"
        label="Caption"
        name="caption"
        value={caption.value}
        onChange={onChange}
        placeholder="Enter a caption"
      />
      <Textarea
        id="outlined-multiline-static"
        label="Text"
        multiline
        rows={6}
        name="text"
        value={text.value}
        onChange={onChange}
        placeholder="Enter a text"
        error={errorCheck("text")}
        onBlur={() => {
          if (errorCheck("text")) {
            handleInputError("text", false);
          }
        }}
        helperText={handlerErrorMessage("text")}
        style={{ marginBottom: "10px" }}
      />
      <Button onClick={onSubmit}>Add post</Button>
    </Container>
  );
};

export default PostForm;
