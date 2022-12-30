import { FavoriteBorder, FavoriteOutlined, ArrowForwardIos  } from '@mui/icons-material'
import { Container, CreatedBy, PostInfo, LikeButton, Likes, LikesQty, TextContent, Title, CreatedDate, Caption, MoreLink,ArrowIcon, MoreLabel, MoreContent } from './styles.js'
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import PostService from '../../../services/postService.js';
import { toggleLike,deletePost } from '../../../redux/index.js';


const PostItem = ({children, post}) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state)=>state)
    const toggleLikeOnPost = async () => {
        const response = await PostService.likePost(post.id)
        if (response) {
            dispatch(toggleLike({ id: post.id }))
        }
    }
    const onDeletePost = async () => {
        const response = await PostService.deletePost(post.id)
        if(response.status){
            dispatch(deletePost(post.id))
        }
    }

    return (
        <Container elevation={3}>
            <Title>{post.title} </Title>
            <Caption>{post.caption}</Caption>
                <MoreLink to={`/post/${post.id}`} >
                <ArrowIcon />
                <MoreLabel>Read more</MoreLabel>
                </MoreLink>
            <PostInfo>
                <Likes>
                    <>
                        <LikeButton onClick={toggleLikeOnPost}>
                            {post.isLiked ? <FavoriteOutlined style={{ color: 'rgba(249, 18, 18, 0.8)' }} /> : <FavoriteBorder />}
                        </LikeButton>
                        <LikesQty>
                            {post.likesQty}
                        </LikesQty>
                    </>
                </Likes>
                <CreatedDate>{post.created_at}</CreatedDate>
                <CreatedBy>
                    created by {post.created_by}
                </CreatedBy>
            </PostInfo>
            {post.created_by === user.username ? <button onClick={onDeletePost} style={{ position: 'absolute', right: '5px', top: '5px', background: 'none', outline: 0, border: 0, cursor: 'pointer' }} ><DeleteIcon /></button> : null}
        </Container>
    )
}

export default PostItem