import io from "socket.io-client";
import { useState, useEffect } from "react";
import { store, useDispatch, useSelector, setPosts } from "../../../redux";
import PostService from "../../../services/postService";
import { Post } from "../types";
import { ResponsePost } from "../../../redux/slices/post.interface";
// import { connect, event } from "../../../redux/middlewares/socket-middleware";
import { socketCL } from "./../../../redux/middlewares/socket-middleware";
import { updatePosts, getPosts } from "../../../redux/slices/post";

// export const socket = io("ws://localhost:7000");

interface IUseFetchPosts {
    posts: ResponsePost[];
    // updatePosts: () => Promise<void>;
    togglePostLike: (postId: number) => Promise<void>;
}

const useFetchPosts = (): IUseFetchPosts => {
    const dispatch = useDispatch();
    const {
        post: { posts },
    } = useSelector((state) => state);
    useEffect(() => {
        dispatch(getPosts());
        socketCL.connect("ws://localhost:7000");
        socketCL.event("updatePosts", (data, dispatch) => {
            dispatch(updatePosts(data));
        });
    }, []);
    const togglePostLike = async (postId: number): Promise<void> => {
        await PostService.likePost(postId);
        const updatedPosts = posts.filter((post) => {
            if (post.id === postId) {
                // console.log(postId);
                const likedPost = { ...post };
                likedPost.isLiked = !post.isLiked || true;
                // console.log(likedPost);
                return likedPost;
            }
            return post;
        });
        setPosts(updatedPosts);
        // For reduxTK -
        // if (response) {
        //     dispatch(toggleLike({ id: post.id }))
        // }
    };
    // console.log(posts);
    return { posts, togglePostLike };
};

export default useFetchPosts;
