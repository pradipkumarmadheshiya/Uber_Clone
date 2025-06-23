import React, { useRef, useState } from 'react'
import {assets} from "../assets/assets"
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../component/LocationSearchPanel'
import VehiclePanel from '../component/VehiclePanel'
import ConfirmRide from '../component/ConfirmRide'
import LookingForDriver from '../component/LookingForDriver'
import WaitingForDriver from '../component/WaitingForDriver'

const Home = () => {

  const [pickup, setPickup]=useState("")
  const [destination, setDestination]=useState("")
  const [panelOpen, setPanelOpen]=useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen]=useState(false)
  const [confirmRidePanel, setConfirmRidePanel]=useState(false)
  const [vehicleFound, setVehicleFound]= useState(false)
  const [waitingForDriver, setWaitingForDriver]= useState(false)
  const panelRef=useRef(null)
  const panelCloseRef=useRef(null)
  const vehiclePanelRef=useRef(null)
  const confirmRidePanelRef=useRef(null)
  const vehicleFoundRef= useRef(null)
  const waitingForDriverRef= useRef(null)

  const submitHandler=(e)=>{
    e.preventDefault()
  }

  useGSAP(function(){
    if (panelOpen){
      gsap.to(panelRef.current, {height:"70%", opacity: 1, padding: 24})
      gsap.to(panelCloseRef.current, {opacity:1})
    }
    else{
      gsap.to(panelRef.current, {height: "0", opacity: 1, padding: 0})
      gsap.to(panelCloseRef.current, {opacity: 0})
    }
  }, [panelOpen])

  useGSAP(function(){
    if (vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(function(){
    if (confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePanel])

  useGSAP(function(){
    if (vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleFound])

  useGSAP(function(){
    if (waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)"
      })
    }
    else{
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute top-5 left-5 '
       src={assets.logo} alt="logo" />

      <div 
        className='h-screen w-screen'>
        <img  className='h-full w-full object-cover'
        src={assets.map} alt="map" />
      </div>

      <div className='h-screen flex flex-col justify-end  absolute top-0 w-full'>
      <div className='h-[30%] bg-white p-5 relative'>
        <h5 ref={panelCloseRef} onClick={(e)=>setPanelOpen(false)}
        className='absolute top-6 right-6 text-2xl opacity-0'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={submitHandler}>
          <div className='line h-16 w-1 absolute bg-gray-800 top-[45%] left-10 rounded-full'></div>

          <input onClick={()=>setPanelOpen(true)}
          value={pickup} onChange={(e)=>setPickup(e.target.value)}
          className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mb-3 mt-6'
          type="text" placeholder='Add your pick-up location' />

          <input onClick={()=>setPanelOpen(true)}
          value={destination} onChange={(e)=>setDestination(e.target.value)}
          className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full'
          type="text" placeholder='Enter your destination' />
        </form>
      </div>

      <div ref={panelRef} className='opacity-0 h-0 bg-white'> 
        <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-8 pt-12'>
      <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12'>
      <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='fixed z-10 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 w-full bottom-0 translate-y-full p-3 bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
