import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  padding = "px-4 py-2",
  rounded = "rounded-lg",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${className} ${bgColor} ${textColor} ${hoverBgColor} ${padding} ${rounded} font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;