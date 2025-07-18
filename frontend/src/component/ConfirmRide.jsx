import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const ConfirmRide = (props) => {

  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-full"
        onClick={() => props.setConfirmRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-xl text-gray-400"></i>
      </h5>
      <h3 className="text-xl font-semibold mb-3">Confirm your ride</h3>

      <div className="flex flex-col justify-between items-center gap-3">
        <img className="h-20 mt-2" src={assets[props.vehicleType]} alt="" />

        <div className="w-full mt-2">
          <div className="flex items-center gap-4 border-b-2 border-gray-300 p-3">
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.pickup.split(" ")[0]}</h3>
              <p className="text-gray-700 -mt-1">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b-2 border-gray-300 p-3">
            <i className="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.destination.split(" ")[0]}</h3>
              <p className="text-gray-700 -mt-1">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-gray-700 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide()
          }}
          className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5 cursor-pointer"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
