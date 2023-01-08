import io from 'socket.io-client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostService from '../../../services/postService';

const socket = io("ws://localhost:7000")

const useFetchPosts = () => {
    const dispatch = useDispatch()
  // posts are just for test, delete in the future, alternative - from redux store(!)
  const [posts, setPosts] = useState([])
  const { user } = useSelector(({ user })=>({user}))
  useEffect(() => {
    async function fetchPost() {
      // if(!posts.length){
      const posts = await PostService.getPosts()
      dispatch(setPosts(posts))
      // }
    }
    fetchPost()
    // TODO: Refactor this operations to some function and add var socket to main store - reduxtk, find way to dispatch got data every
    // time from sockets
    socket.on("connect", () => {
      socket.send(user.userInfo.username)
    })
    socket.on("updatePosts", async data => {
      const { createdPost } = data
      setPosts(prev => [createdPost, ...prev])
      // postUpdating(createdPost)
    })
    return () => {
      socket.off("updatePosts")
    }
  }, [])
  const updatePosts = async () => {
    const posts = await PostService.getPosts()
    dispatch(setPosts(posts))      
  }

  const togglePostLike = async (postId) => {
        await PostService.likePost(postId)
        const updatedPosts = posts.filter(post=>{
            if(post.id === postId){
              console.log(postId);
              const likedPost = {...post}
              likedPost.isLiked = (!post.isLiked || true)
              console.log(likedPost);
              return likedPost
              }
            return post
        })
        setPosts(updatedPosts)
        // For reduxTK -
        // if (response) {
        //     dispatch(toggleLike({ id: post.id }))
        // }
  } 

  return { posts, updatePosts, togglePostLike }
}

export default useFetchPosts
