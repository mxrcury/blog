import { PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export interface InitialState {
  // delete posts if no way found how to dispatch data from sockets to reduxtoolkit
  posts: ResponsePost[];
  currentPost: CurrentPost;
  // realTimePosts: null;
}

export interface ResponsePost {
  id: number;
  title: string;
  caption: string;
  content: string;
  createdAt: string;
  createdBy: string;
  isLiked?: boolean;
  likesQty: number;
}
export interface CurrentPost {
  id: Nullable<number>;
  title: Nullable<string>;
  caption: Nullable<string>;
  content: Nullable<string>;
  createdAt: Nullable<string>;
  createdBy: Nullable<string>;
  isLiked?: boolean;
  likesQty: number;
  userId: Nullable<number>;
  comments: PostComment[];
}

export interface CreatedPost {
  title: string;
  caption: string;
  content: string;
  created_at: string;
  created_by: string;
  likes: [];
}
export interface CreatedComment {
  postId: number;
  createdBy: string;
  createdAt: string;
  text: string;
}

export interface Comment {
  id: number;
  createdAt: string;
  createdBy: string;
  text: string;
}
export interface PostComment extends Comment {
  postId: number;
}

// export interface UserComment extends Comment {
//   userId: number;
//   id:number
// }

// export interface SocketPayloadAction extends PayloadAction {
//   socket: Socket;
// }

export type Nullable<T> = T | null;
