import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import UserService from '../../services/userService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addCommentToUser, setChosenUser } from '../../redux';
import { Container } from '@mui/material';

const User = () => {
    const dispatch = useDispatch()
    // only for testing, delete in future update --
    const [comment,setComment] = useState('')
    const { id } = useParams()
    const { user:{ chosenUser,username } } = useSelector(state=>state)

    useEffect(()=>{
        async function getUser(){
            const user = await UserService.getUser(id)
            dispatch(setChosenUser(user))
        }
        getUser()
        return ()=> {
            dispatch(setChosenUser({}))
        }
    },[])
    // only for testing comments with rtk
    const addComment = () => {
        dispatch(addCommentToUser({text:comment,author:username}))
    }

    return (
        // REFACTOR BRO, divide on components and styled items, add comments feature
        <Container maxWidth='sm' >
            <div style={{ marginTop: '40px' }}>
                You are on page:
                <div style={{ textAlign: 'center' }} >
                    <h3>{chosenUser.username}</h3>
                    <h5>{chosenUser.email}</h5>
                    <button style={{ marginBottom: '10px' }}>{`Open chat with ${chosenUser.username}`}</button>
                    <hr style={{ marginBottom: '10px' }} />
                </div>
                <h5>Comments:</h5>
                <input value={comment} onChange={e => setComment(e.target.value)} /> <button onClick={addComment} >Send</button>
                <div>
                    {chosenUser.comments
                        ? chosenUser.comments.map(comment =>
                            <div style={{ border: '1px solid gray', marginBottom: '5px' }} key={comment.author}>
                                                                                                            <h5>{comment.author}</h5>
                                                                                                            <p>{comment.text}</p>
                            </div>)
                        : null}
                </div>
            </div>
        </Container>
  )
}

export default User
