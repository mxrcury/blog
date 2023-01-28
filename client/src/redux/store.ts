import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user";
import { postReducer } from "./slices/post";
import thunkMiddleware from "redux-thunk";
import { socketCL } from "./middlewares/socket-middleware";

const socketMiddleware = socketCL.connectMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) => [socketMiddleware, ...getDefaultMiddleware()],
    // [socketMiddleware,thunkMiddleware],
});

// @ts-ignore
window.store = store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export { store };
