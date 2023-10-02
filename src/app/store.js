import { configureStore } from "@reduxjs/toolkit";
import { authSlice, postsSlice } from "../features";

const store = configureStore({
  reducer: {
    authReducer: authSlice,
    postsReducer: postsSlice,
  },
});

export default store;
