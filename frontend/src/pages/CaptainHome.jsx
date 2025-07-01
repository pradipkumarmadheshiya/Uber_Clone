import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import CaptainDetails from "../component/CaptainDetails";
import RidePopUp from "../component/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../component/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios"

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);
  const [ride, setRide]=useState(null)

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return clearInterval(locationInterval)
  }, []);

  socket.on("new-ride", (data) => {
    console.log("data", data);
    setRide(data)
    setRidePopUpPanel(true)
  });

  async function confirmRide(){
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId:ride._id,
      captainId:captain._id
    },
      {headers:{Authorization:`Bearer ${localStorage.getItem("captain-token")}`}}
    )
    
    setRidePopUpPanel(false)
    setConfirmRidePopUp(true)
  }

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUp) {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUp]
  );

  return (
    <div className="h-screen">
      <div className="fixed top-0 p-3 flex items-center justify-between w-full">
        <img className="w-12" src={assets.captain_uber_logo} alt="logo" />
        <Link
          to={"/captain/logout"}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src={assets.map}
          alt="map"
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed z-10 w-full translate-y-full bottom-0 p-3 bg-white px-3 py-8 pt-12"
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUp={setConfirmRidePopUp}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopUpRef}
        className="fixed z-10 w-full h-screen translate-y-full bottom-0 p-3 bg-white px-3 py-8 pt-12"
      >
        <ConfirmRidePopUp
          setConfirmRidePopUp={setConfirmRidePopUp}
          setRidePopUpPanel={setRidePopUpPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
