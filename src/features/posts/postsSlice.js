import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  length: 0,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
      state.length = state.posts.length;
    },
    deletePost: (state, action) => {
      const indexOfElemToRemove = state.posts.findIndex(
        (post) => post.$id === action.payload
      );
      console.log(indexOfElemToRemove);
      state.posts.splice(indexOfElemToRemove, 1);
      state.length = state.posts.length;
    },
    updatePost: (state, action) => {
      const postId = action.payload.id;
      const updatedPost = action.payload.data;
      const indexOfElemToRemove = state.posts.findIndex(
        (post) => post.$id === postId
      );
      state.posts.splice(indexOfElemToRemove, 1, updatedPost);
    },
    addAllPosts: (state, action) => {
      state.posts = action.payload;
      state.length = state.posts.length;
    },
    deleteAllPosts: (state) => {
      state.posts = [];
      state.length = 0;
    },
  },
});

export const { addPost, deletePost, updatePost, addAllPosts, deleteAllPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
