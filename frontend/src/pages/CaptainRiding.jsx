import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import FinishRide from "../component/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel]= useState(false)
  const finishRidePanelRef= useRef(null)

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed top-0 p-3 flex items-center justify-between w-full">
        <img className="w-12" src={assets.captain_uber_logo} alt="logo" />
        <Link
          to={"/captain-home"}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-home-5-fill"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src={assets.map}
          alt="map"
        />
      </div>

      <div onClick={()=>setFinishRidePanel(true)}
      className="h-1/5 p-6 bg-gray-300 flex justify-between items-center relative">
        <h5 className="p-3 text-center absolute top-0 w-[90%]">
          <i className="ri-arrow-up-wide-line text-xl text-gray-700"></i>
        </h5>

        <h4 className="text-lg font-semibold">4 km away</h4>
        <button className="bg-green-600 text-white font-semibold p-2 px-4 rounded-lg cursor-pointer">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed z-10 w-full translate-y-full bottom-0 p-3 bg-white px-3 py-8 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
