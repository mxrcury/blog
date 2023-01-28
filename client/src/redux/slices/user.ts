import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromStorage } from "../../utils/localStorage";
import {
    AuthenticatedUser,
    ChosenUser,
    InitialState,
    ProfileOptions,
    User,
    UserComment,
    Users,
} from "./user.interface";

const userInfo = getFromStorage("userInfo") || {};

const initialState: InitialState = {
    token: getFromStorage("accessToken") || null,
    isAuth: !!getFromStorage("accessToken") || null,
    userInfo: {
        username: userInfo.username || null,
        email: userInfo.email || null,
        jobPosition: userInfo.jobPosition || null,
        skills: userInfo.skills || null,
        companyName: userInfo.companyName || null,
        age: userInfo.age || null,
        // married:userInfo.married || null
    },
    users: { results: [], totalCounts: 0 },
    chosenUser: {
        username: null,
        email: null,
        jobPosition: null,
        skills: null,
        companyName: null,
        age: null,
        comments: [],
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthenticatedUser>) => {
            const { username, token, email, companyName, jobPosition, skills, age } = action.payload;
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
            state.userInfo = {
                username: null,
                email: null,
                jobPosition: null,
                skills: null,
                age: null,
                companyName: null,
            };
            state.token = null;
            state.isAuth = null;
        },
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUsers: (state, action: PayloadAction<Users>) => {
            state.users.results = action.payload.results;
            state.users.totalCounts = action.payload.totalCounts;
        },
        setChosenUser: (state, action: PayloadAction<ChosenUser>) => {
            const userData = action.payload;
            state.chosenUser = userData;
        },
        addCommentToUser: (state, action: PayloadAction<UserComment>) => {
            const comment = action.payload;
            state.chosenUser.comments.unshift(comment);
        },
        editProfileInfo: (state, action: PayloadAction<ProfileOptions>) => {
            const options: ProfileOptions = action.payload;

            for (const key in options) {
                // @ts-ignore
                if (options[key]) {
                    // @ts-ignore
                    state.userInfo[key] = options[key].value;
                }
            }
        },
        clearChosenUser: (state) => {
            state.chosenUser = {
                username: null,
                email: null,
                jobPosition: null,
                skills: null,
                companyName: null,
                age: null,
                comments: [],
            };
        },
    },
    extraReducers: (builder) => {
        // @ts-ignore
        builder.addCase("WEBSOCKET", (state, action) => {
            console.log(`EXTRA REDUCEr`);
        });
    },
});
const userReducer = userSlice.reducer;
const { setUser, clearUser, updateToken, setUsers, setChosenUser, addCommentToUser, editProfileInfo, clearChosenUser } =
    userSlice.actions;

export {
    userReducer,
    setUser,
    clearUser,
    updateToken,
    setUsers,
    setChosenUser,
    addCommentToUser,
    editProfileInfo,
    clearChosenUser,
};
