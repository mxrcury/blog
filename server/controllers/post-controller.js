const pool = require("../db")
const ApiError = require("../exceptions/api-error")
const PostService = require("../services/post-service")
const socketServer = require("../singletones/Socket");


class PostController {
    async getAll(req,res,next) {
        try {
            const { user } = req
            if(!user) {
                throw ApiError.UnAuthorizated()
            }
            const posts = await PostService.getAll(user.id)
            res.json(posts)
        } catch (error) {
            next(error)
        }
    }
    async create(req,res,next){
        try {
            const { body } = req            
            const createdPost = await PostService.createPost(body)
            const isEmitted = socketServer.io.sockets.emit('updatePosts', createdPost)
            if(!isEmitted){
                throw ApiError.BadRequest()
            }
            res.json({message:'Post has been created',status:'ok'})
        } catch (error) {
            next(error)
        }
    }
    async delete(req,res,next){
        try {
            const { id } = req.params
            const deletedPost = await PostService.deletePost(id)
            res.json({status:'ok', post:deletedPost})                
        } catch (error) {
            next(error)
        }
    }
    async addComment(req,res,next){
        try {
            const { body } = req
            const { post_id } = await PostService.addComment(body)
            res.json({message:`Comment successfully was added`,status:'ok', postId:post_id})
        } catch (error) {
            next(error)
        }   
    }
    async likePost(req,res,next){
        try {
            const { id } = req.params
            const { user } = req
            const likedPost = await PostService.toggleLikeOnPost(id,user.id)
            res.json(likedPost)   
        } catch (error) {
            next(error)    
        }
    }
    async getOne(req,res,next) {
        try {
            const { id } = req.params
            const { user } = req
            const post = await PostService.getOnePost(id,user.id)
            res.json(post)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()