import React, { useId } from "react";

const DropDown = React.forwardRef(
  ({ label, options, iconClass, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        <div className="flex flex-col space-y-1 rounded-md">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-gray-600">
              {label}
            </label>
          )}
          <div className="relative flex items-center">
            <select
              id={id}
              className={`w-full pl-10 pr-4 py-2 border-2 border-gray-600 rounded-md focus:ring focus:ring-blue-500`}
              {...props}
              ref={ref}
            >
              {options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
);
export default DropDown;
