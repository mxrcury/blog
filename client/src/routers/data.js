import { Home, NewPost, Login, Register, Profile, Users, Post, User, ProfileEdit, Chats } from "../pages";

export const ROUTES = [
    { path: "/home", element: Home },
    { path: "/post/new", element: NewPost },
    { path: "/post/:id", element: Post },
    { path: "/login", element: Login },
    { path: "/register", element: Register },
    { path: "/profile", element: Profile },
    { path: "/users", element: Users },
    { path: "/users/:id", element: User },
    { path: "/profile/edit", element: ProfileEdit },
    { path: "/chats", element: Chats },
];
// make routing chats by id mb or what idk just for personal chatting something
