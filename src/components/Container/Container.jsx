import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto py-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
