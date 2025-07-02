import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const captainData = {
      fullname: { firstname, lastname },
      email: email,
      password: password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captain-token", data.token);
        navigate("/captain-home");

        setFirstname("");
        setLastName("");
        setEmail("");
        setPassword("");
        setColor("");
        setPlate("");
        setCapacity(1);
        setVehicleType("");
      }
    } catch (err) {
      console.log("err:", err);

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

    setLoading(false)
  };

  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img className="w-16 mb-6" src={assets.captain_uber_logo} alt="" />

        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-medium text-center mb-4">
            Signup Captain
          </h2>

          {error && (
            <p className='text-red-600 mb-4 text-center'>{error}</p>
          )}

          <h3 className="text-lg mb-2">What's our captain's name</h3>
          <div className="flex gap-3 mb-5">
            <input
              className="bg-gray-100 w-1/2 rounded px-4 py-2 text-base placeholder:text-base"
              type="text"
              name="firstname"
              placeholder="Your First Name"
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
            <input
              className="bg-gray-100 w-1/2 rounded px-4 py-2 text-base placeholder:text-base"
              type="text"
              name="lastname"
              placeholder="Your Last Name"
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-lg mb-2">What's our captain's email</h3>
          <input
            className="bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
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
            className="bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <h3 className="text-lg mb-2">Enter your vehicle color</h3>
          <input
            className="bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
            type="text"
            name="color"
            placeholder="Vehicle color"
            required
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />

          <h3 className="text-lg mb-2">Enter your vehicle plate</h3>
          <input
            className="bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
            type="text"
            placeholder="Vehicle plate"
            required
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value);
            }}
          />

          <h3 className="text-lg mb-2">Enter your vehicle capacity</h3>
          <input
            className="bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base"
            type="number"
            name="capacity"
            placeholder="Vehicle capacity"
            required
            value={capacity}
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
          />

          <h3 className="text-lg mb-2">Enter your vehicle type</h3>
          <select
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base mb-6"
          >
            <option value="" disabled>
              Select Vehicle
            </option>
            <option value="motorcycle">Bike</option>
            <option value="auto">Auto</option>
            <option value="car">Car</option>
          </select>

          <button className="bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-lg cursor-pointer">
            {loading ? "Loading" : "Signup as Captain"}
          </button>

          <p className="text-center mb-16">
            Already have an account?
            <Link to={"/captain-login"} className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to={"/signup"}
          className="bg-green-400 text-[#fff] font-semibold rounded px-4 py-2 flex items-center justify-center text-lg"
        >
          SignUp as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
