import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataBaseConfigService } from "../services/appwrite";
import { addAllPosts, deleteAllPosts } from "../features";
import { Container, Loader, PostCard } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const authState = useSelector((state) => state.authReducer);
  const posts = useSelector((state) => state.postsReducer.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    authState.status
      ? dataBaseConfigService
          .getAllPosts()
          .then((posts) =>
            posts
              ? dispatch(addAllPosts(posts.documents))
              : dispatch(deleteAllPosts())
          )
      : posts.length !== 0 && dispatch(deleteAllPosts());

    setLoading(false);
  }, []);

  return authState.status ? (
    loading ? (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader className="!w-32 !h-32" />
      </div>
    ) : (
      <div className="w-full py-8">
        <Container>
          <div className="flex overflow-x-hidden gap-5 w-screen items-center justify-center flex-wrap">
            {posts.length !== 0 &&
              posts.map((post) => (
                <PostCard
                  className="w-1/3"
                  key={post.$id}
                  $id={post.$id}
                  title={post.title}
                  featuredImageId={post.featuredImage}
                />
              ))}
          </div>
        </Container>
      </div>
    )
  ) : (
    <div className="w-screen h-screen flex justify-center items-center p-8">
      <h1 className="text-4xl text-gray-700">Please Login To See the Posts</h1>
    </div>
  );
};

export default Home;
