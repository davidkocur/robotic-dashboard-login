import Logo from "./Common/Logo";
import SignIn from "./SignIn";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useEffect, useMemo, useState } from "react";

axios.defaults.headers.post["Content-Type"] = "application/json";
const mock = new MockAdapter(axios, { delayResponse: 1000 });

mock.onPost("/api/signin").reply(async (config) => {
  // console.log("SERVER:", config);
  return [
    200,
    {
      user: {
        name: "John",
        lastname: "Doe",
      },
    },
    {
      Authorization: `secret_token`,
      TokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    },
  ];
});

function App() {
  const [fakeToken, setFakeToken] = useState({ token: "", expiration: "" });

  // const clientStorage = useMemo(() => localStorage., [localStorage]);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const expiration = localStorage.getItem("auth-expires");
    if (token) {
      setFakeToken({ token, expiration });
    }
  }, [localStorage.getItem("auth-token")]);

  return (
    <div className="container mx-auto">
      {/* <header className="max-w-lg mx-auto px-5">
        <Logo />
      </header> */}
      <SignIn setFakeToken={setFakeToken} />

      <footer className="text-center">
        <p className="inline-flex items-center">
          <span className="text-sm text-gray-500 whitespace-nowrap">Powered by</span>
          <Logo className="block h-8 m-4 ml-6 mt-6 font-bold text-lg text-black" />
        </p>
      </footer>

      {fakeToken.token && (
        <div className="block absolute bottom-0 left-0 w-full p-1 text-center">
          <span className="text-xs text-gray-400 mr-4">
            Found token: <em>{fakeToken.token}</em>
          </span>
          <span className="text-xs text-gray-400">
            Token expires: <em>{fakeToken.expiration}</em>
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
