import { useDispatch } from "react-redux";
import { authService } from "../../services/appwrite";
import { logout as logoutFunc } from "../../features";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logoutFunc());
      })
      .catch((err) => console.error(err))
      .finally(() => navigate("/"));
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
