import { $api } from "../api/api";

class PostService {
    async getPosts() {
        const posts = await $api.get('/posts')
        if(posts === undefined){
            return []
        }
            return posts.data
    }
    async createPost(post){
        const createdPost = await $api.post('/posts',post)
        return createdPost.data
    }
    async likePost(postId) {
        const response = await $api.post(`/posts/like/${postId}`)
        return response.data
    }
    async deletePost(postId) {
        const response = await $api.delete(`/posts/${postId}`)
        return response.data
    }
    async getPost(postId){
        const response = await $api.get(`/posts/${postId}`)
        return response.data
    }
    async addComment(post) {
        const response = await $api.post(`/posts/comment`,post)
        return response.data
    }
}

export default new PostService()