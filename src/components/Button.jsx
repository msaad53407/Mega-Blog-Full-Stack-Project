/* eslint-disable react/prop-types */

const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-3 rounded-lg bg-blue-600 text-white ${className} ${type}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
