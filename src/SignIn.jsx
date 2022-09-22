import axios from "axios";
import React, { useState } from "react";
import Button from "./Common/Button";
import Checkbox from "./Common/Checkbox";
import LoadingOverlay from "./Common/LoadingOverlay";
import Alert from "./Common/Modal";
import TextField from "./Common/TextField";
import { signInValidationSchema } from "./helper/consts";
import useValidate from "./helper/useValidate";

const initialFormState = {
  email: "",
  password: "",
  rememberMe: false,
};

const SignIn = ({ setFakeToken }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [response, setResponse] = useState({ status: "", data: { user: {} } });
  const { errors, isValid } = useValidate(form, signInValidationSchema);

  // console.log(errors);

  const setInput = (newValue) => {
    setForm((form) => ({ ...form, ...newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid || loading) return;
    setLoading(true);

    axios
      .post("/api/signin", { email: form.email, password: form.password })
      .then((resp) => {
        console.log("CLIENT:", resp.config);
        if (form.rememberMe) {
          const { Authorization, TokenExpires } = resp.headers;
          localStorage.setItem("auth-token", Authorization);
          localStorage.setItem("auth-expires", TokenExpires);
          setFakeToken({ token: Authorization, expiration: TokenExpires });
        }
        setResponse({ status: "ok", data: resp.data });
      })
      .catch((err) => {
        setResponse({ status: "error", data: { msg: err, user: {} } });
      })
      .finally(() => setLoading(false));
  };

  const handleDialogClose = () => {
    setResponse({ status: "", data: { user: {} } });
  };

  return (
    <div className="relative max-w-sm mx-auto py-7 px-10 rounded-md bg-white shadow-lg">
      <h4 className="font-bold text-gray-800 text-2xl text-center">Sign in</h4>
      <LoadingOverlay
        show={loading}
        scale={7}
        className="text-gray-400 bg-gray-200 bg-opacity-20 transition-colors duration-700 pointer-events-none"
      />
      <form className="mt-8" onSubmit={handleSubmit} data-testid="sign-in-form">
        <TextField
          type="email"
          name="email"
          id="SignIn-email"
          placeholder="you@mail.com"
          autoFocus
          required
          disabled={loading}
          error={errors.email}
          defaultValue={form.email}
          onChange={(e) => setInput({ email: e.target.value })}
          classes={{ container: "mb-3" }}
        />
        <TextField
          type="password"
          name="password"
          id="SignIn-password"
          placeholder="password"
          required
          disabled={loading}
          error={errors.password}
          defaultValue={form.password}
          onChange={(e) => setInput({ password: e.target.value })}
          classes={{ container: "mb-3" }}
        />

        <Checkbox
          name="rememberMe"
          label="Remember Me"
          id="SignIn-rememberMe"
          classes={{ container: "mt-4 mb-6" }}
          disabled={loading}
          checked={form.rememberMe}
          onChange={() => setInput({ rememberMe: !form.rememberMe })}
        />

        <Button
          type="submit"
          name="signin"
          id="SignIn-button"
          disabled={loading}
          data-testid="submit-button"
        >
          Sign in
        </Button>
      </form>
      <Alert show={response.status} onClose={handleDialogClose} />
    </div>
  );
};

export default SignIn;
