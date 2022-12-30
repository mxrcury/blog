import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import PostService from '../../services/postService'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost, addCommentOnPost, toggleLikeOnCurrentPost } from '../../redux';
import { PostContainer } from './styles'
import { Link } from 'react-router-dom';
import { FavoriteBorder, FavoriteOutlined  } from '@mui/icons-material'
import { LikeButton, Likes, LikesQty,CommentButton, CommentInput, BackButton, CommentContainer } from './styles.js'
// import { TextField } from '@mui/material';
import useInput from './../../hooks/useInput';

const Post = () => {
    const { onChange, value:{comment:commentInput}, clearInputs } = useInput('comment')
    const { id } = useParams()
    const dispatch = useDispatch()
    const { post:{currentPost}, user } = useSelector(state=>state)
    useEffect(()=>{
        async function getPost(){
            const post = await PostService.getPost(id)
            dispatch(setCurrentPost(post))
        }
        getPost()
        return () => {
            dispatch(setCurrentPost({}))
        }
    },[])

    const toggleLikeOnPost = async () => {
        const response = await PostService.likePost(currentPost.id)
        if (response) {
            dispatch(toggleLikeOnCurrentPost({ id: currentPost.id }))
        }
    }
    const addComment = async () => {
        if(!commentInput.value.length){
            return;
        }
        const currentDate = new Date()
        const currentDateToISO = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        const comment = {
            postId:currentPost.id,
            createdBy:user.username,
            createdAt:currentDateToISO,
            text:commentInput.value
        }
        const addedComment = await PostService.addComment(comment)
        console.log(`ADDED COMMENT - `,addedComment);
        dispatch(addCommentOnPost(comment))
        clearInputs()
    }


    return (
        <PostContainer maxWidth="sm">
            <Link style={{ color: 'white', textDecoration: 'none' }} to='/home' ><BackButton variant='contained' >{`< Back`}</BackButton> </Link>
            <h2>{currentPost.title}</h2>
            <h4>{currentPost.caption}</h4>
            <p style={{color:'gray'}} > Author <a style={{ color: 'rgba(20,20,20,0.9)' }} href={`/users/${currentPost.userId}`}>{currentPost.created_by}</a></p>
            <p style={{ color: 'rgba(20,20,20,0.6)' }} >{currentPost.created_at} </p>
            <p>{currentPost.content}</p>
            <Likes>
                <>
                    <LikeButton onClick={toggleLikeOnPost}>
                            {currentPost.isLiked ? <FavoriteOutlined style={{ color: 'rgba(249, 18, 18, 0.8)' }} /> : <FavoriteBorder />}
                        </LikeButton>
                        <LikesQty>
                            {currentPost.likesQty}
                        </LikesQty>
                    </>
                </Likes>
      <hr/>
          <h5>Comments:</h5>
          <CommentContainer>
              <CommentInput name='comment' type='text' variant='outlined' placeholder='Enter a text' value={commentInput.value} onChange={onChange} /> <CommentButton onClick={addComment} variant='contained' >Add</CommentButton>
          </CommentContainer>
          {currentPost.comments ? currentPost.comments.map(comment => <div style={{ border: '2px solid gray', marginBottom: '5px' }} >
                  <h5>{comment.createdBy}</h5>
                  <p>{comment.text}</p>
              </div>) : null}
      </PostContainer>
  )
}

export default Post
