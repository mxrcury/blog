import { useSelector } from 'react-redux'
import { PostItem, PostTags } from "../../components"
import { useEffect } from 'react'
import postService from '../../services/postService'
import { useDispatch } from 'react-redux';
import { setPosts } from '../../redux/slices/post';
import { Navigate, useParams } from 'react-router';
import { Button } from '@mui/material';


const Home = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { post, user } = useSelector(({ post, user })=>{
    return {
      post,
      user
    }
  })
    const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magnam nam voluptate nihil quae culpa, atque dolor a corrupti neque!"
  useEffect(() => {
    async function fetchPost(){ 
      if(!post.posts.length){
        const posts = await postService.getPosts()
        dispatch(setPosts(posts))      
      }
    }
    fetchPost()
  }, [user.username])
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
        {post.posts.map(post=><PostItem key={post.id} post={post} />)}
    </div>
  )
}

export default Home
