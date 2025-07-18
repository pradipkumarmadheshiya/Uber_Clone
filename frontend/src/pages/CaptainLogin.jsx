import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const captain = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captain-token", data.token);
        navigate("/captain-home");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("err", err);

      if(err.response && err.response.data && err.response.data.errors){
        setError(err.response.data.errors[0].msg)
      }
      else if(err.response.data.message){
        setError(err.response.data.message)
      }
      else{
        setError("Something went wrong. Please try again.")
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img className="w-16 mb-6" src={assets.captain_uber_logo} alt="" />

        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-medium text-center mb-4">
            Login Captain
          </h2>

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
            <Link to={"/captain-signup"} className="text-blue-600 underline">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to={"/login"}
          className="bg-green-300 text-[#fff] font-semibold rounded px-4 py-2 flex items-center justify-center text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
