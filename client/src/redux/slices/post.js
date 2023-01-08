import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // delete posts if no way found how to dispatch data from sockets to reduxtoolkit
    posts:[],
    currentPost:{},
    realTimePosts:null
}

const postSlice = createSlice({
    name:"Post",
    initialState,
    reducers:{
        createPost: (state,action) => {
            const post = action.payload
            state.posts.unshift(post)
        },
        toggleLike: (state,action) => {
            const { id } = action.payload
            state.posts = state.posts.map(post=>{
                if (post.id === id) {
                  return post.isLiked === true
                    ? { ...post, likesQty: --post.likesQty, isLiked: false }
                    : { ...post, likesQty: ++post.likesQty, isLiked: true }
                } else {
                  return post;
                }
            })
        },
        // Delete setPosts
        setPosts:(state,action) => {
            // debugger
            state.posts = action.payload
        },
        deletePost:(state,action) => {
            const postId = action.payload
            state.posts = state.posts.filter(post=>post.id !== postId)
        },
        setCurrentPost:(state,action) => {
            const post = action.payload
            state.currentPost = post
        },
        toggleLikeOnCurrentPost:(state,action)=>{
            if(state.currentPost.isLiked){
                state.currentPost.isLiked = false
                state.currentPost.likesQty -= 1
            } else {
                state.currentPost.isLiked = true
                state.currentPost.likesQty += 1                                
            }
        },
        addCommentOnPost:(state,action) => {
            const post = action.payload
            state.currentPost.comments.unshift(post)
        },
        postUpdating:(state,action) => {
            state.realTimePosts = action.payload
            debugger
            state.posts.unshift(action.payload)
        }

    }
})

export const { createPost, toggleLike, setPosts, deletePost,setCurrentPost, toggleLikeOnCurrentPost, addCommentOnPost,postUpdating } = postSlice.actions
export const postReducer = postSlice.reducer



// Delete if it has no sense
export const setPostsThunk = (socket,posts) => async dispatch => {
    console.log(`setPostsThunk works`);
    // debugger
    await dispatch(setPosts(posts))
}


// const PostThunk = (socket,posts) => dispatch => {

//     return 
// }