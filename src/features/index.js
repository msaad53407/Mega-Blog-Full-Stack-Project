import authSlice from "./auth/authSlice";
import postsSlice from "./posts/postsSlice";

import { login, logout } from "./auth/authSlice";
import {
  addPost,
  updatePost,
  deletePost,
  addAllPosts,
  deleteAllPosts,
} from "./posts/postsSlice";

export {
  authSlice,
  login,
  logout,
  postsSlice,
  addPost,
  updatePost,
  deletePost,
  addAllPosts,
  deleteAllPosts,
};
