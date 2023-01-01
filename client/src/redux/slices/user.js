import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../../utils/localStorage";

const userInfo = getFromStorage("userInfo");

const initialState = {
    token: getFromStorage("accessToken") || null,
    isAuth: !!getFromStorage("accessToken") || null,
    userInfo: {
        username: userInfo.username || null,
        email: userInfo.email || null,
        jobPosition: userInfo.jobPosition || null,
        skills: userInfo.skills || null,
        companyName: userInfo.companyName || null,
        age: userInfo.age || null,
    },
    users: {},
    chosenUser: {
        username:null,
        email:null,
        jobPosition:null,
        skills:null,
        companyName:null,
        age:null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { username, token, email, companyName, jobPosition, skills, age } =
                action.payload;
            state.token = token;
            state.isAuth = !!token;
            // age option - optional
            state.userInfo = {
                username,
                email,
                jobPosition,
                skills,
                companyName,
                age,
            };
        },
        clearUser: (state) => {
            state.username = {
                username: null,
                email: null,
                jobPosition: null,
                skills: null,
                age: null,
                companuName: null,
            };
            state.token = null;
            state.isAuth = null;
        },
        updateToken: (state, action) => {
            state.token = action.payload;
        },
        setUsers: (state, action) => {
            state.users.results = action.payload.results;
            state.users.totalCounts = action.payload.totalCounts;
            console.log(state.users);
        },
        setChosenUser: (state, action) => {
            state.chosenUser = action.payload;
        },
        addCommentToUser: (state, action) => {
            const comment = action.payload;
            state.chosenUser.comments.unshift(comment);
        },
        editProfileInfo: (state, action) => {
            const options = action.payload
            for (const key in options) {
                state.userInfo[key] = options[key].value
            }
        }
    }
    },
);
const userReducer = userSlice.reducer;
const {
    setUser,
    clearUser,
    updateToken,
    setUsers,
    setChosenUser,
    addCommentToUser,
    editProfileInfo
} = userSlice.actions;

export {
    userReducer,
    setUser,
    clearUser,
    updateToken,
    setUsers,
    setChosenUser,
    addCommentToUser,
    editProfileInfo
};
