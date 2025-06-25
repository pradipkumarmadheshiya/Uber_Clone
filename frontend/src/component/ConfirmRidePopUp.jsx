import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp]= useState("")
    
    const submitHandler=(e)=>{
        e.preventDefault()
    }

  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-full"
        onClick={() => props.setConfirmRidePopUp(false)}
      >
        <i className="ri-arrow-down-wide-line text-xl text-gray-400"></i>
      </h5>
      <h3 className="text-xl font-semibold mb-3">Confirm this ride to start</h3>

      <div className="flex items-center justify-between mt-4 bg-gray-200 p-2 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={assets.random_people}
            alt=""
          />
          <h2 className="text-lg font-medium">Ankit Sharma</h2>
        </div>
        <h5>2.2 KM</h5>
      </div>

      <div className="flex flex-col justify-between items-center gap-3">
        <div className="w-full mt-2">
          <div className="flex items-center gap-4 border-b-2 border-gray-300 p-3">
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-gray-700 -mt-1">Lake city, Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b-2 border-gray-300 p-3">
            <i className="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-gray-700 -mt-1">Lake city, Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193</h3>
              <p className="text-gray-700 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input onChange={(e)=>setOtp(e.target.value)}
            value={otp}
            className="bg-[#eee] px-6 py-2 font-mono text-base rounded-lg w-full"
            type="text" placeholder="Enter OTP" />
            <Link
              to={"/captain-riding"}
              onClick={() => {
                props.setConfirmRidePopUp(false);
                props.setRidePopUpPanel(false);
              }}
              className="flex justify-center w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopUp(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full bg-red-400 text-white font-semibold p-2 rounded-lg mt-1"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
