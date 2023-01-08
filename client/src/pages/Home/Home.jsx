import { PostItem, PostTags } from "../../components"
import { Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import useFetchPosts from "./hooks/usePosts";
import useAuthRedirect from './../../hooks/useAuthRedirect';
import { userStatuses } from "../../constants/auth";

const Home = () => {
  const { posts, updatePosts, togglePostLike } = useFetchPosts()
  useAuthRedirect(userStatuses.UNAUTHORIZATED, '/login')  
    return (
    <div>
        <Button onClick={updatePosts} variant='contained' style={{display:'block', margin:'0 auto', marginBottom:'15px', marginTop:'20px'}}>UPDATE FEED</Button>
        <div style={{textAlign:'center'}} ><PostTags /> </div>
        {posts.length ? posts.map(post=><PostItem key={post.id} post={post} togglePostLike={togglePostLike} />) : <CircularProgress sx={{display:'block',margin:'120px auto'}}/> }
    </div>
  )
}

export default Home
