import { forwardRef, useId } from "react";
import PropTypes from "prop-types";

const Select = forwardRef(
  ({ options, label, className = "", ...props }, ref) => {
    const selectId = useId();
    return (
      <div className="flex gap-2 flex-wrap w-full">
        {label && <label htmlFor={selectId}>{label}</label>}
        <select
          id={selectId}
          {...props}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
          {options &&
            options.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
