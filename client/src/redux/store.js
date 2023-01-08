import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './slices/user.js'
import { postReducer } from './slices/post'
import thunkMiddleware from "redux-thunk";

// thunkmiddleware mb has to be deleted

const store = configureStore({
    reducer:{
        user:userReducer,
        post:postReducer
    },
    middleware:[thunkMiddleware]
})
window.store = store

export { store }