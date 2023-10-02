import { useEffect, useState } from "react";
import { Container, PostCard, Loader } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { dataBaseConfigService } from "../services/appwrite";
import { addAllPosts } from "../features";

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.postsReducer.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(posts);
    posts.length === 0 &&
      dataBaseConfigService
        .getAllPosts()
        .then((posts) => dispatch(addAllPosts(posts?.documents)));
    setLoading(false);
  }, []);

  return !loading ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex overflow-x-hidden gap-5 w-screen items-center justify-center h-screen flex-wrap">
          {posts.length !== 0 &&
            posts.map((post) => (
              <PostCard
                className="w-1/3"
                key={post.$id}
                $id={post.$id}
                userId={post.userId}
                title={post.title}
                featuredImageId={post.featuredImage}
              />
            ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader className="!w-32 !h-32" />
    </div>
  );
};

export default Posts;
