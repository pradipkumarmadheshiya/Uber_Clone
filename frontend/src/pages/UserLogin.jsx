import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const Login = () => {
  const { user, setUser } = useContext(UserDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");

        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log("err", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img className="w-16 mb-6" src={assets.logo} alt="" />

        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-medium text-center mb-4">Login User</h2>

          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            className="bg-gray-100 mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="email"
            name="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className="text-lg mb-2">Enter your password</h3>
          <input
            className="bg-gray-100 mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-lg cursor-pointer">
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-center">
            New here?
            <Link to={"/signup"} className="text-blue-600 underline">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to={"/captain-login"}
          className="bg-gray-400 text-[#fff] font-semibold rounded px-4 py-2 flex items-center justify-center text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Login;
