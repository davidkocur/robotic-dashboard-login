import { useEffect, useState } from "react";

const emailExp = /^\w+([\.-]?\w+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}(.[a-zA-Z]{2,3})?$/g;
const passwordExp = /^(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w{8,16}/g;

const matchValue = (value, expType) => {
  switch (expType) {
    case "email":
      return value.match(emailExp);
    case "password":
      return value.match(passwordExp);
    default:
      return true;
  }
};

/**
 *
 * @param {*} values Values of the form, on which we preform the checks
 * @param {*} schema Keys of the schema should map to the values we want to check
 * @returns
 */
const useValidate = (values, schema) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  // console.log("Values:", values);
  // console.log("Schema:", schema);

  useEffect(() => {
    const foundErrors = {};

    /**
     * Loop through each entry in schema...
     * Schema keys should mirror "form" values
     * If the key in values is defined, we preform checks based on rules passed in schema
     */
    for (const key in schema) {
      const rule = schema[key];
      if (rule.required && !values[key]) {
        foundErrors[key] = rule.required;
        continue;
      } else if (!values[key]) continue;
      if (rule.minLength && rule.minLength.length > values[key].length) {
        foundErrors[key] = rule.minLength.message;
        continue;
      }
      if (rule.maxLength && rule.maxLength.length < values[key].length) {
        foundErrors[key] = rule.maxLength.message;
        continue;
      }
      if (rule.matchType && !matchValue(values[key], rule.matchType.type)) {
        foundErrors[key] = rule.matchType.message;
        continue;
      }
    }

    if (Object.entries(foundErrors).length > 0) {
      setErrors(foundErrors);
      setIsValid(false);
    } else {
      setErrors({});
      setIsValid(true);
    }
  }, [values, schema]);

  return { errors, isValid };
};

export default useValidate;
