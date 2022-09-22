import React from "react";

const Checkbox = ({ name, label, id, classes, ...rest }) => {
  const classesObj = {
    container: "",
    input: "",
    label: "",
    ...classes,
  };

  return (
    <div className={`flex items-center ${classesObj.container || ""}`}>
      <input
        type="checkbox"
        name={name}
        id={id}
        className={`peer w-4 h-4 text-brand-dark bg-gray-100 rounded-sm border-gray-300 
          focus:ring-brand focus:ring-2 
          
          ${classesObj.input}
        `}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`ml-2 block text-sm text-gray-900 peer-disabled:text-gray-500 ${classesObj.label}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
