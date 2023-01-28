import { FavoriteBorder, FavoriteOutlined, ArrowForwardIos } from "@mui/icons-material";
import {
    Container,
    CreatedBy,
    PostInfo,
    LikeButton,
    Likes,
    LikesQty,
    TextContent,
    Title,
    CreatedDate,
    Caption,
    MoreLink,
    ArrowIcon,
    MoreLabel,
    // MoreContent
} from "./styles.js";
import {
    useDispatch,
    useSelector,
    toggleLike,
    // deletePost
} from "../../../redux";
import DeleteIcon from "@mui/icons-material/Delete";
import PostService from "../../../services/postService";
import React, { ReactNode } from "react";
import { Post } from "../../../pages/Home/types/index";
import { ResponsePost } from "../../../redux/slices/post.interface.js";

interface IPostItem {
    post: ResponsePost;
}

const PostItem = ({ post }: IPostItem): JSX.Element => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);
    const onDeletePost = async () => {
        const postId = post.id as number;
        const response = await PostService.deletePost(postId);
        if (response.status) {
            // dispatch(deletePost(post.id));
        }
    };
    const likeToggle = async () => {
        const postId = post.id as number;
        dispatch(toggleLike(postId));
        await PostService.likePost(postId);
    };

    return (
        <Container>
            <Title>{post.title} </Title>
            <Caption>{post.caption}</Caption>
            <MoreLink to={`/post/${post.id}`}>
                <ArrowIcon />
                <MoreLabel>Read more</MoreLabel>
            </MoreLink>
            <PostInfo>
                <Likes>
                    <>
                        <LikeButton onClick={likeToggle}>
                            {post.isLiked ? <FavoriteOutlined style={{ color: "rgba(249, 18, 18, 0.8)" }} /> : <FavoriteBorder />}
                        </LikeButton>
                        <LikesQty>{post.likesQty}</LikesQty>
                    </>
                </Likes>
                <CreatedDate>{post.createdAt}</CreatedDate>
                <CreatedBy>created by {post.createdBy}</CreatedBy>
            </PostInfo>
            {post.createdBy === user.userInfo.username ? (
                <button
                    onClick={onDeletePost}
                    style={{
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        background: "none",
                        outline: 0,
                        border: 0,
                        cursor: "pointer",
                    }}
                >
                    <DeleteIcon />
                </button>
            ) : null}
        </Container>
    );
};

export default PostItem;
