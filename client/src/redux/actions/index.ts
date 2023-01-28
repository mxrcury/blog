import { CreatedPost } from "../slices/post.interface";

export const createPost = (post: CreatedPost) => ({ type: "WEBSOCKET_CREATE_POST", payload: post })
