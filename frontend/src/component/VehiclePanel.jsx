import React from "react";
import { assets } from "../assets/assets";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-full"
        onClick={() => {props.setVehiclePanelOpen(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-xl text-gray-400"></i>
      </h5>
      <h3 className="text-xl font-semibold my-3">Choose a vehicle</h3>

      <div
        onClick={() => {props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false)
          props.setVehicleType("car")
        }}
        className="flex items-center justify-between w-full p-3 active:border-black border-2 border-gray-300 bg-gray-100 rounded-xl mb-2 cursor-pointer"
      >
        <img className="w-16" src={assets.car} alt="car" />
        <div className=" w-1/2">
          <h4 className="text-lg">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="text-sm">2 mins away</h5>
          <p className="text-sm text-gray-600">Affordable compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.car}</h2>
      </div>

      <div
        onClick={() =>{ props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
          props.setVehicleType("moto")
        }}
        className="flex items-center justify-between w-full p-3 border-2 bg-gray-100 active:border-black border-gray-300 rounded-xl mb-2 cursor-pointer"
      >
        <img className="w-22" src={assets.moto} alt="moto" />
        <div className=" w-1/2">
          <h4 className="text-lg">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="text-sm">3 mins away</h5>
          <p className="text-sm text-gray-600">Affordable motorcycle rides</p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.moto}</h2>
      </div>

      <div
        onClick={() => {props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
          props.setVehicleType("auto")
        }}
        className="flex items-center justify-between w-full p-3 border-2 bg-gray-100 active:border-black border-gray-300 rounded-xl mb-2 cursor-pointer"
      >
        <img className="w-14" src={assets.auto} alt="auto" />
        <div className=" w-1/2">
          <h4 className="text-lg">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="text-sm">2 mins away</h5>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
