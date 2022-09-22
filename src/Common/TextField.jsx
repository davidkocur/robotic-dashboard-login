import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../helper/utils";

const TextField = ({ name, id, error, classes, onChange, ...rest }) => {
  const classesObj = {
    container: "",
    label: "",
    input: "",
    ...classes,
  };

  const inputRef = useRef(null);
  const [isTouched, setIsTouched] = useState(false);
  const errorText = isTouched && error;

  const debounceInput = useCallback(debounce(onChange, 300), [debounce]);
  const handleBlur = useCallback(() => setIsTouched(true), [setIsTouched]);

  useEffect(() => {
    const currentRef = inputRef.current;
    currentRef.addEventListener("input", debounceInput);
    currentRef.addEventListener("blur", handleBlur);

    return () => {
      currentRef.removeEventListener("input", debounceInput);
      currentRef.removeEventListener("blur", handleBlur);
    };
  }, [inputRef, debounceInput, handleBlur]);

  return (
    <label className={`block ${classesObj.container}`} htmlFor={id}>
      <span className={`block capitalize font-semibold text-sm text-gray-500 ${classesObj.label}`}>
        {name}
      </span>
      <input
        ref={inputRef}
        type="password"
        name={name}
        id={id}
        className={`block w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-sm text-sm shadow-sm placeholder-gray-400 
        focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand 
        disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
        ${errorText ? "border-red-500 text-red-600 focus:ring-red-500 focus:border-red-500" : ""} 
        ${classesObj.input}`}
        {...rest}
      />
      <p className="mt-1.5 font-lite text-sm text-red-600" data-testid="textfield-error">
        {errorText && errorText}
      </p>
    </label>
  );
};

export default TextField;
