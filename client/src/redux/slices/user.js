import { createSlice } from '@reduxjs/toolkit'
import { getFromStorage } from '../../utils/localStorage'

const initialState = {
    username: getFromStorage('username') || null,
    // email:null,
    token: getFromStorage('accessToken') || null,
    isAuth: !!getFromStorage('username') || null,
    // id:null,
    users: {},
    chosenUser: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { username, token } = action.payload
            state.username = username
            state.token = token
            state.isAuth = !!token
            // state.username = id
            // state.username = username

        },
        clearUser: (state) => {
            state.username = null
            state.token = null
            state.isAuth = null
        },
        updateToken: (state, action) => {
            state.token = action.payload
        },
        setUsers: (state, action) => {
            state.users.results = action.payload.results
            state.users.totalCounts = action.payload.totalCounts
            console.log(state.users);
        },
        setChosenUser: (state, action) => {
            state.chosenUser = action.payload
        },
        addCommentToUser: (state, action) => {
            const comment = action.payload
            state.chosenUser.comments.unshift(comment)
        }

    }
})
const userReducer = userSlice.reducer
const { setUser, clearUser, updateToken, setUsers, setChosenUser, addCommentToUser } = userSlice.actions

export { userReducer, setUser, clearUser, updateToken, setUsers, setChosenUser, addCommentToUser }
