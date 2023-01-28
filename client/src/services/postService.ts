import io, { Socket, connect } from "socket.io-client";
import { $api } from "../api/api";
import { Post } from "../pages/Home/types";
import { store } from "../redux";
import { createPost } from "../redux/actions";
import { CreatedComment, CreatedPost } from "../redux/slices/post.interface";

type PostSubscriber = (posts: Post[]) => void;

class PostService {
    // private postsSocketChannel: Socket | null = null;
    // private subscribers: PostSubscriber[] = [];
    // connectChannel(): void {
    //     this.postsSocketChannel = connect("ws://localhost:7000", { reconnection: true });
    // }
    async getPosts() {
        // this.postsSocketChannel?.on("updatePosts", (data) => {
        //     this.subscribers.forEach((notificateSubscriber) => notificateSubscriber(data));
        // });
        const posts = await $api.get("/posts");
        if (posts === undefined) {
            return [];
        }
        return posts.data;
    }
    async createPost(post: CreatedPost): Promise<{ responseStatus: "ok" | "failed" }> {
        debugger
        store.dispatch(createPost(post));
        return { responseStatus: "ok" };
    }
    async likePost(postId: number) {
        const response = await $api.post(`/posts/like/${postId}`);
        return response.data;
    }
    async deletePost(postId: number) {
        const response = await $api.delete(`/posts/${postId}`);
        return response.data;
    }
    async getPost(postId: number) {
        const response = await $api.get(`/posts/${postId}`);
        return response.data;
    }
    async addComment(comment: CreatedComment) {
        const response = await $api.post(`/posts/comment`, comment);
        return response.data;
    }
}

export default new PostService();
