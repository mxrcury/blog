import { useInput, useTime } from "../../../hooks";
import { useParams } from "react-router-dom";
import {
  clearCurrentPost,
  setCurrentPost,
  toggleLikeOnCurrentPost,
  useSelector,
  useDispatch,
  addCommentOnPost,
} from "../../../redux";
import { useEffect } from "react";
import PostService from "../../../services/postService";
import { CreatedComment, PostComment } from "../../../redux/slices/post.interface";

interface IUseFetchPost { }

export const useFetchPost = () => {
  const {
    onChange,
    value: { comment: commentInput },
    clearInputs,
  } = useInput("comment");
  const { id } = useParams();
  const { getCurrentDateInISO } = useTime();
  const dispatch = useDispatch();
  const {
    post: { currentPost },
    user: { userInfo },
  } = useSelector((state) => state);
  useEffect(() => {
    async function getPost() {
      const postId = Number(id);
      const post = await PostService.getPost(postId);
      dispatch(setCurrentPost(post));
    }
    getPost();
    return () => {
      dispatch(clearCurrentPost());
    };
  }, []);

  const toggleLikeOnPost = async () => {
    if (currentPost.id) {
      const response = await PostService.likePost(currentPost.id);
      if (response) {
        dispatch(toggleLikeOnCurrentPost());
      }
    }
  };
  const addComment = async () => {
    if (!commentInput.value.length) {
      return;
    }
    if (currentPost.id && userInfo.username) {
      const comment: CreatedComment = {
        postId: currentPost.id,
        createdBy: userInfo.username,
        createdAt: getCurrentDateInISO(Date),
        text: commentInput.value,
      };
      const addedComment = await PostService.addComment(comment);

      dispatch(addCommentOnPost(addedComment));
      clearInputs();
    }
  };
  return { addComment, toggleLikeOnPost, onChange, commentInput, currentPost };
};
