import { Container, PostForm, Loader } from "../components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { dataBaseConfigService } from "../services/appwrite";
import { addAllPosts } from "../features";

const EditPost = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const posts = useSelector((state) => state.postsReducer.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    posts.length === 0 &&
      dataBaseConfigService
        .getAllPosts()
        .then((posts) => dispatch(addAllPosts(posts.documents)));
    setLoading(false);
  }, []);

  return !loading ? (
    <div className="py-8">
      <Container>
        {posts.length !== 0 && (
          <PostForm post={posts.find((post) => post.$id === id)} />
        )}
      </Container>
    </div>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader className="!w-32 !h-32" />
    </div>
  );
};

export default EditPost;
