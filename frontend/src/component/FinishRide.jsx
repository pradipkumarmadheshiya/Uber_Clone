import React from 'react'
import { assets } from '../assets/assets';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const FinishRide = (props) => {

  const navigate=useNavigate()

  async function endRide(){
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {rideId:props.ride._id},
      {headers:{Authorization:`Bearer ${localStorage.getItem("captain-token")}`}}
    )

    if(response.status===200){
      navigate("/captain-home")
    }
  }

  return (
    <div>
      <h5
        className="p-3 text-center absolute top-0 w-full"
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="ri-arrow-down-wide-line text-xl text-gray-400"></i>
      </h5>
      <h3 className="text-xl font-semibold mb-3">Finish this Ride</h3>

      <div className="flex items-center justify-between mt-4 bg-gray-200 p-2 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={assets.random_people}
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5>2.2 KM</h5>
      </div>

      <div className="flex flex-col justify-between items-center gap-3">
        <div className="w-full mt-2">
          <div className="flex items-center gap-4 border-b-2 border-gray-300 p-3">
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.pickup.split(" ")[0]}</h3>
              <p className="text-gray-700 -mt-1">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b-2 border-gray-300 p-3">
            <i className="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.destination.split(" ")[0]}</h3>
              <p className="text-gray-700 -mt-1">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride.fare}</h3>
              <p className="text-gray-700 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
            <button
              onClick={endRide}
              className="flex justify-center w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5 cursor-pointer"
            >
              Finish Ride
            </button>

            <p className='mt-4 text-sm text-gray-500'>Click on Finish Ride if You have completed the payment.</p>
        </div>
      </div>
    </div>
  )
}

export default FinishRide
