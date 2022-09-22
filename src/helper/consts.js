export const signInValidationSchema = {
  email: {
    required: "Email is required",
    matchType: { type: "email", message: "Provide a valid email address" },
  },
  password: {
    required: "Password is required",
    minLength: {
      length: 8,
      message: "Password must contain at least 8 characters",
    },
    maxLength: {
      length: 16,
      message: "Password cannot contain more than 16 characters",
    },
    matchType: {
      type: "password",
      message: "Password must contain at least one uppercase, one lowercase letter and a number",
    },
  },
};
