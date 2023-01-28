import { Action, AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import PostService from "../../services/postService";
import { RootState } from "../store";
import { CreatedPost, CurrentPost, InitialState, PostComment, ResponsePost } from "./post.interface";

const initialState: InitialState = {
    // delete posts if no way found how to dispatch data from sockets to reduxtoolkit
    posts: [],
    currentPost: {
        id: null,
        title: null,
        caption: null,
        content: null,
        createdAt: null,
        createdBy: null,
        likesQty: 0,
        isLiked: false,
        comments: [],
        userId: null,
    },
    // realTimePosts:null
};

const postSlice = createSlice({
    name: "Post",
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.posts = state.posts.map((post) => {
                if (post.id === id) {
                    return post.isLiked === true
                        ? { ...post, likesQty: --post.likesQty, isLiked: false }
                        : { ...post, likesQty: ++post.likesQty, isLiked: true };
                } else {
                    return post;
                }
            });
        },
        setPosts: (state, action: PayloadAction<ResponsePost[]>) => {
            state.posts = action.payload;
            debugger;
        },
        // deletePost:(state,action) => {
        //     const postId = action.payload
        //     state.posts = state.posts.filter(post=>post.id !== postId)
        // },
        setCurrentPost: (state, action: PayloadAction<CurrentPost>) => {
            const post = action.payload;
            state.currentPost = post;
        },
        toggleLikeOnCurrentPost: (state) => {
            if (state.currentPost.isLiked) {
                state.currentPost.isLiked = false;
                state.currentPost.likesQty -= 1;
            } else {
                state.currentPost.isLiked = true;
                state.currentPost.likesQty += 1;
            }
        },
        addCommentOnPost: (state, action: PayloadAction<PostComment>) => {
            const comment = action.payload;
            state.currentPost.comments.unshift(comment);
        },
        clearCurrentPost: (state) => {
            state.currentPost = {
                id: null,
                title: null,
                caption: null,
                content: null,
                createdAt: null,
                createdBy: null,
                likesQty: 0,
                isLiked: false,
                comments: [],
                userId: null,
            };
        },
        updatePosts: (state, action: PayloadAction<ResponsePost>) => {
            const { id, ...post } = action.payload;
            // state.posts.forEach(post => {
            //     if (post.id === id) {
            //         return;
            //     }})
            state.posts.unshift({ id, ...post });
        },
    },
    extraReducers: (build) => {
        build.addCase("WEBSOCKET_CREATE_POST", (state, action: any) => {
            const { socket } = action;
            if (socket) {
                socket.emit("updatePosts", action.payload);
                debugger;
            }
        });
    },
});

export const {
    // createPost,
    toggleLike,
    setPosts,
    // deletePost,
    setCurrentPost,
    toggleLikeOnCurrentPost,
    addCommentOnPost,
    clearCurrentPost,
    updatePosts,
} = postSlice.actions;

export const postReducer = postSlice.reducer;

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>;
export const getPosts = (): ThunkType => async (dispatch) => {
    const posts = await PostService.getPosts();
    dispatch(setPosts(posts));
};
