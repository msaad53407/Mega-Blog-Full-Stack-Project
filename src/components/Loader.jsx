import PropTypes from "prop-types";

const Loader = ({ className, ...props }) => {
  return (
    <div
      className={`w-80 rounded-full border-t-black border-t-2 border-2 animate-spin h-80 ${className}`}
      {...props}
    ></div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
