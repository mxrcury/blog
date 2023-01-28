import postService from "../../services/postService";
import { mock } from "jest-mock-extended";
import { getPosts } from "./post";
import { ResponsePost } from "./post.interface";
import { PayloadAction } from "@reduxjs/toolkit";

jest.mock("../../services/postService.ts");

// interface PostService {
//   getPosts(): User[];
// }
const mockedPostService = postService as jest.Mocked<typeof postService>;
// mock<PostService>();

let initialState: { posts: ResponsePost[] } = {
  posts: [],
};
describe("getPosts thunk", () => {
  it("got post and set to store successfully", async () => {
    const dispatch: jest.Mock<ReturnType<() => { type: string; payload: ResponsePost[] }>> = jest.fn();
    const getState = jest.fn();
    const mockedPosts = [
      {
        title: "about kitties",
        caption: "i like kitties",
        content: "about kitties",
        createdAt: "20-01-2023",
        createdBy: "joji",
        isLiked: true,
        likesQty: 1,
        id: 1,
      },
      {
        title: "lana del rey",
        caption: "i like kitties",
        content: "about kitties",
        createdAt: "20-01-2023",
        createdBy: "mercury",
        isLiked: true,
        likesQty: 1,
        id: 2,
      },
    ];

    const dispatchedMockedPosts = {
      payload: mockedPosts,
      type: "Post/setPosts",
    };
    mockedPostService.getPosts.mockResolvedValue(mockedPosts);
    const thunk = getPosts();

    await thunk(dispatch, getState, {});
    initialState.posts = [...mockedPosts];
    expect(dispatch).toHaveBeenNthCalledWith(1, dispatchedMockedPosts);
    expect(dispatch).toBeCalledTimes(1);
    expect(initialState.posts.length).toBeGreaterThan(0);
    expect(initialState.posts[0]).toMatchObject(mockedPosts[0]);
    expect(initialState.posts[1]).toMatchObject(mockedPosts[1]);
  });
});

// {
//        username: "Kitty",
//        email: "kitty@gmail.com",
//        jobPosition: "Web developer",
//        skills: "ReactJS, NodeJS",
//        companyName: "SoftServe",
//        age: 18,
//        id: 2,
//      }

export { };
