import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AuthLayout = ({ authentication = true, children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.authReducer.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      setLoading(false);
      navigate("/");
    } else if (!authentication && authStatus !== authentication) {
      setLoading(false);
    } else if (authentication && authStatus === authentication) {
      setLoading(false);
    } else if (!authentication && authStatus === authentication) {
      setLoading(false);
      if (authStatus) {
        navigate("/");
      }
    }
  }, [authStatus, navigate, authentication]);

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader className="!w-32 !h-32" />
    </div>
  ) : (
    <>{children}</>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.bool,
};

export default AuthLayout;
