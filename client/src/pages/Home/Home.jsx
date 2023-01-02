import { useSelector } from 'react-redux'
import { PostItem, PostTags } from "../../components"
import { useEffect } from 'react'
import postService from '../../services/postService'
import { useDispatch } from 'react-redux';
import { setPosts } from '../../redux/slices/post';
import { Navigate, useParams } from 'react-router';
import { Button } from '@mui/material';

import io from 'socket.io-client'
import { setPostsFromSockets } from "../../redux/slices/post";
import { postUpdating } from '../../redux';
import { useState } from 'react';

const socket = io("ws://localhost:7000")

const Home = () => {
  const dispatch = useDispatch()
  // posts are just for test, delete in the future, alternative - from redux store(!)
  const [posts, setPosts] = useState([])
  const { post, user } = useSelector(({ post, user })=>{
    return {
      post,
      user
    }
  })
  useEffect(() => {
    async function fetchPost(){ 
      // if(!posts.length){
        const posts = await postService.getPosts()
        dispatch(setPosts(posts))      
      // }
    }
    fetchPost()
  // TODO: Refactor this operations to some function and add var socket to main store - reduxtk, find way to dispatch got data every
        // time from sockets
    socket.on("connect",()=>{
      console.log(`Posts are connected`)
      socket.send(`To server`)            
  })
  socket.on("updatePosts",data=>{
    const { createdPost } = data  
    setPosts(prev=>[createdPost,...prev])
    postUpdating(createdPost)
  })

  }, [])
  const updatePosts = async () => {
    const posts = await postService.getPosts()
    dispatch(setPosts(posts))      
  }
  
  if(!user.isAuth) {
    return <Navigate to='/login' />
  }
    return (
    <div>
        <Button onClick={updatePosts} variant='contained' style={{display:'block', margin:'0 auto', marginBottom:'15px', marginTop:'20px'}}>UPDATE FEED</Button>
        <div style={{textAlign:'center'}} ><PostTags /> </div>
        {posts.map(post=><PostItem key={post.id} post={post} />)}
    </div>
  )
}

export default Home
