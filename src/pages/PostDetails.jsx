import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  dataBaseConfigService,
  storageConfigService,
} from "../services/appwrite";
import { addAllPosts, deletePost as DeletePost } from "../features";
import parse from "html-react-parser";
import { Loader, Container, Button } from "../components";

const PostDetails = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const { id } = useParams();
  const posts = useSelector((state) => state.postsReducer.posts);
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthor =
    post && authState.userData ? post.userId === authState.userData.$id : false;

  useEffect(() => {
    posts.length === 0 &&
      dataBaseConfigService.getAllPosts().then((post) => {
        dispatch(addAllPosts(post.documents));
        setPost(post.documents.find((post) => post.$id === id));
      });
    setPost(posts.length !== 0 && posts.find((post) => post.$id === id));
    setLoading(false);
  }, []);

  const deletePost = () => {
    post?.$id &&
      dataBaseConfigService.deletePost(post?.$id).then((status) => {
        if (status) {
          storageConfigService.deleteFile(post?.featuredImage);
          navigate("/");
        }
      });
    dispatch(DeletePost(post?.$id));
  };

  return !loading ? (
    <div className="py-8 px-2">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={
              post?.featuredImage &&
              storageConfigService.getFilePreview(post?.featuredImage)
            }
            alt={post?.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post?.$id}`}>
                <Button className="mr-3 bg-green-500">Edit</Button>
              </Link>
              <Button className="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 px-4">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
        </div>
        <div className="browser-css px-4 text-center">{parse(post?.content || "")}</div>
      </Container>
    </div>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader className="!w-32 !h-32" />
    </div>
  );
};

export default PostDetails;
