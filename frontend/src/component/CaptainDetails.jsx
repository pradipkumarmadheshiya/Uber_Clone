import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {

  const {captain}=useContext(CaptainDataContext)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={assets.captain_img}
            alt=""
          />
          <h4 className="text-lg font-medium">{captain.fullname.firstname+" "+captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold ">₹295</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 py-3 bg-gray-200 rounded-full items-start mt-8">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
