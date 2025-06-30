import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../component/LocationSearchPanel";
import VehiclePanel from "../component/VehiclePanel";
import ConfirmRide from "../component/ConfirmRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitingForDriver from "../component/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import {UserDataContext} from "../context/UserContext"

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const {socket}=useContext(SocketContext)
  const {user}=useContext(UserDataContext)

  useEffect(()=>{
    socket.emit("join", {userType:"user", userId:user._id})
  }, [user])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error("err", err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: "65%", opacity: 1, padding: 6 });
        gsap.to(panelCloseRef.current, { opacity: 1 });
      } else {
        gsap.to(panelRef.current, { height: "0", opacity: 1, padding: 0 });
        gsap.to(panelCloseRef.current, { opacity: 0 });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5 "
        src={assets.logo}
        alt="logo"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src={assets.map_2}
          alt="map"
        />
      </div>

      <div className="h-screen flex flex-col justify-end  absolute top-0 w-full">
        <div className="h-[35%] bg-white p-5 relative flex flex-col justify-center">
          <h5
            ref={panelCloseRef}
            onClick={(e) => setPanelOpen(false)}
            className="absolute top-6 right-6 text-2xl opacity-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line h-16 w-1 absolute bg-gray-800 top-[36%] left-8 rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-6 py-2 text-base rounded-lg w-full mb-3 mt-6"
              type="text"
              placeholder="Add your pick-up location"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-6 py-2 text-base rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              ref={panelRef}
              type="submit"
              disabled={!pickup || !destination}
              onClick={findTrip}
              className={`bg-green-600 text-white px-6 py-2 rounded-lg w-full cursor-pointer mt-4 ${
                (!pickup || !destination) && "opacity-50 cursor-not-allowed"
              }`}
            >
              Find Trip
            </button>
          </form>
        </div>

        <div ref={panelRef} className="z-50 opacity-0 h-0 bg-white overflow-y-auto">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed z-40 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-8 pt-12"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          fare={fare}
          setVehicleType={setVehicleType}
          vehicleType
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed z-30 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed z-20 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver 
          setVehicleFound={setVehicleFound} 
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed z-10 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
