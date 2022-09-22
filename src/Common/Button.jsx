import React from "react";

const Button = ({ children, secondary, className, ...rest }) => {
  const colorClasses = {
    primary: "text-white bg-brand border-transparent hover:bg-brand-dark focus:ring-brand-light",
    secondary:
      "text-brand-dark bg-gray-100 border-2 border-brand-light hover:bg-brand-fade hover:border-brand focus:ring-brand-light disabled:text-white",
  };

  return (
    <button
      className={`block w-full my-2 py-2 px-4 rounded-sm border font-semibold text-base 
      focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:ring-gray-300
      transition-colors
      ${secondary ? colorClasses.secondary : colorClasses.primary}
      ${className || ""}`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
