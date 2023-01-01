import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserService from "../../services/userService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCommentToUser, setChosenUser } from "../../redux";
import { Container } from "@mui/material";
import useInput from "../../hooks/useInput.js";
import { Button, Input, CommentsSubtitle } from "./styles";
import { useTime } from "../../hooks";

const User = () => {
    const dispatch = useDispatch();
    const {
        onChange,
        value: { comment: commentInput }, clearInputs
    } = useInput("comment");
    const { getCurrentDateInISO } = useTime();
    const { id } = useParams();
    const {
        user: { chosenUser, userInfo },
    } = useSelector((state) => state);

    useEffect(() => {
        async function getUser() {
            const user = await UserService.getUser(id);
            dispatch(setChosenUser(user));
        }
        getUser();
        return () => {
            dispatch(setChosenUser({}));
        };
    }, []);
    const addComment = async () => {
        const currentTime = getCurrentDateInISO(Date);
        const comment = {
            text: commentInput.value,
            createdBy: userInfo.username,
            createdAt: currentTime,
            userId: chosenUser.id,
        };
        dispatch(addCommentToUser(comment));
        clearInputs()
        await UserService.addComment(comment);
    };
    return (
        // REFACTOR BRO, divide on components and styled items, add comments feature
        <Container maxWidth="sm">
            <div style={{ marginTop: "40px" }}>
                {`${chosenUser.username}'s profile`}:
                <div style={{ textAlign: "center" }}>
                    <h3>{chosenUser.username}</h3>
                    <h5>{chosenUser.email}</h5>
                    <h5>{chosenUser.jobPosition}</h5>
                    <h5>{chosenUser.companyName}</h5>
                    <div style={{display:'flex',justifyContent:'space-between',gap:'5px'}} >

                    {chosenUser.skills ? chosenUser.skills.split(',').map(skill=><div style={{background:'rgba(30, 139, 195, 1)', width:'50%',display:'inline', color:'white', padding:'2px 5px',borderRadius:'5px'}}>{skill}</div>) : null}
                    </div>
                    <h5>{chosenUser.age}</h5>
                    <button
                        style={{ marginBottom: "10px" }}
                    >{`Open chat with ${chosenUser.username}`}</button>
                    <hr style={{ marginBottom: "10px" }} />
                </div>
                <CommentsSubtitle >{`${chosenUser.username}'s profile comments:`}</CommentsSubtitle>
                <div style={{display:'flex',justifyContent:'start',marginBottom:'10px'}} >
                    <Input
                        name="comment"
                        onChange={onChange}
                        value={commentInput.value}
                        placeholder='Enter a text'
                    />
                    <Button variant='contained' onClick={addComment}>Send</Button>
                </div>
                <div>
                    {chosenUser.comments
                        ? chosenUser.comments.map((comment) => (
                            <div
                                style={{ border: "1px solid gray", marginBottom: "10px", padding: '5px', borderRadius:'6px' }}
                                key={comment.id}
                            >
                                <h5>{comment.createdBy}</h5>
                                <p>{comment.text}</p>
                                <p style={{ textAlign: 'end', color: 'gray', fontSize: '14px', marginRight: '5px' }}>{comment.createdAt}</p>
                            </div>
                        ))
                        : null}
                </div>
            </div>
        </Container>
    );
};

export default User;
