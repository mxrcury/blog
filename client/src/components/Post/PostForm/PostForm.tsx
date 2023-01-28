import { Container, Input, Button, Textarea } from "./styles";
import React from "react";
import { useDispatch, useSelector } from "../../../redux";
// import { createPost } from "../../../redux/slices/post";
import PostService from "../../../services/postService";
// Change import of actions in index.js file
import { useInput } from "./../../../hooks/";
import { useTime } from "../../../hooks";
import { ToggleElementType } from "../../../hooks/useToggle";
import { CreatedPost } from "../../../redux/slices/post.interface";

interface IPostForm {
  successSnackBar: ToggleElementType;
}

const PostForm = ({ successSnackBar }: IPostForm): JSX.Element => {
  const {
    user: { userInfo },
  } = useSelector((state) => state);
  const { getCurrentDateInISO } = useTime();
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
    const isTextNotValid = !text.value.length;
    const isTitleNotValid = !title.value.length;
    if (isTitleNotValid) {
      handleInputError("title");
      return;
    }
    if (isTextNotValid) {
      handleInputError("text");
      return;
    }
    const post: CreatedPost = {
      title: title.value,
      content: text.value,
      caption: caption.value,
      created_by: userInfo.username as string,
      created_at: getCurrentDateInISO(Date),
      likes: [],
    };
    const { responseStatus } = await PostService.createPost(post);
    // dispatch({ type: "WEBSOCKET", payload: post });
    if (responseStatus === "ok") {
      successSnackBar.open();
    }
    clearInputs();
  };
  return (
    <Container>
      <Input
        error={errorCheck("title")}
        onBlur={() => {
          if (errorCheck("title")) {
            handleInputError("title");
          }
        }}
        id="outlined-password-input"
        label="Title"
        name="title"
        value={title.value}
        onChange={onChange}
        placeholder="Enter a title"
        helperText={handlerErrorMessage("title")}
        style={{ marginBottom: title.isError ? "20px" : undefined }}
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
            handleInputError("text");
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
