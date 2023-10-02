/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const inputId = useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
          {...props}
          id={inputId}
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
