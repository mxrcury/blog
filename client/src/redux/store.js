import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './slices/user.js'
import { postReducer } from './slices/post'

const store = configureStore({
    reducer:{
        user:userReducer,
        post:postReducer
    }
})
window.store = store

export { store }