import React, { useState } from "react";
import { assets } from "../assets/assets";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-full"
        onClick={() => props.setRidePopUpPanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-xl text-gray-400"></i>
      </h5>
      <h3 className="text-xl font-semibold mb-3">New Ride Available!</h3>

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
        <div className="flex items-center justify-between w-full mt-5">
          <button
            onClick={() => props.setConfirmRidePopUp(true)}
            className="bg-green-600 text-white font-semibold p-2 px-8 rounded-lg cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="bg-gray-300 text-gray-700 font-semibold p-2 px-8 rounded-lg cursor-pointer"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
