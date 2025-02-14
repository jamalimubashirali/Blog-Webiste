import React, { useId } from "react";

const InputField = React.forwardRef(function Input(
  { label, type = "text", iconClass, className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <div className="flex flex-col space-y-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {iconClass && (
            <i
              className={`${iconClass} absolute left-3 text-gray-500 w-5 h-5`}
            />
          )}
          <input
            type={type}
            className={`w-full pl-10 pr-4 py-2 border-2 border-gray-600 rounded-md focus:ring focus:ring-gray-500`}
            id={id}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    </div>
  );
});

export default InputField;
