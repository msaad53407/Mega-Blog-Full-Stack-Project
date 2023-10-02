import { useState, useEffect } from "react";
import { authService, dataBaseConfigService } from "./services/appwrite";
import { addAllPosts, login, logout, deleteAllPosts } from "./features";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthLayout,
  Footer,
  Header,
  Loader,
  Login,
  Signup,
} from "./components";
import { Outlet, Route, Routes } from "react-router-dom";
import { EditPost, PostDetails, Posts, Home, AddPost } from "./pages";

function App() {
  const [loading, setLoading] = useState(true);
  const authState = useSelector((state) => state.authReducer);
  const posts = useSelector((state) => state.postsReducer.posts);
  const authStateDispatch = useDispatch();
  const postsStateDispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      console.log(userData);
      userData
        ? authStateDispatch(login(userData))
        : authStateDispatch(logout());
    });
    authState.status
      ? dataBaseConfigService
          .getAllPosts()
          .then((posts) =>
            posts ? postsStateDispatch(addAllPosts(posts.documents)) : null
          )
      : posts.length !== 0 && postsStateDispatch(deleteAllPosts());
    setLoading(false);
    console.log(posts);
  }, [authState.status]);

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader className="!w-32 !h-32" />
    </div>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen w-screen flex flex-wrap bg-gray-400 items-between content-between">
            <div className="w-full flex flex-col items-center">
              <Header />
              <main>
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        }
      >
        <Route path="/" element={<Home />} />
        <Route
          path="/posts"
          element={
            <AuthLayout authentication>
              <Posts />
            </AuthLayout>
          }
        />
        <Route path="/edit-post">
          <Route
            path=":id"
            element={
              <AuthLayout authentication>
                <EditPost />
              </AuthLayout>
            }
          />
        </Route>
        <Route
          path="/add-post"
          element={
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          }
        />
        <Route path="/post">
          <Route path=":id" element={<PostDetails />} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="*"
          element={
            <h1 className="text-center font-bold text-3xl">404 Not Found</h1>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
