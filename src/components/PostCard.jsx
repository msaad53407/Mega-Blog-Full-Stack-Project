import PropTypes from "prop-types";
import { storageConfigService } from "../services/appwrite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostCard = ({ $id, userId, title, featuredImageId, className }) => {
  const authState = useSelector((state) => state.authReducer);
  const isAuthor = authState.userData
    ? userId === authState.userData.$id
    : false;

  return (
    <div className={`w-max bg-gray-100 rounded-xl p-4 ${className}`}>
      <Link to={`/post/${$id}`}>
        <div className="w-full flex justify-center mb-4">
          <img
            src={storageConfigService.getFilePreview(featuredImageId)}
            alt={title}
            className="rounded-xl w-32 h-32 object-cover"
          />
        </div>
      </Link>
      <div
        className={`flex w-full gap-5 items-center ${
          isAuthor ? "justify-between" : "justify-center"
        }`}
      >
        <h2 className="text-xl text-center font-bold">{title}</h2>
        {isAuthor && <Link to={`/edit-post/${$id}`}>Edit Post</Link>}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  $id: PropTypes.string,
  className: PropTypes.string,
  userId: PropTypes.string,
  title: PropTypes.string,
  featuredImageId: PropTypes.string,
};

export default PostCard;
