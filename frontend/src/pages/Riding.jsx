import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to={"/home"} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-5-fill"></i>
        </Link>

      <div className='h-1/2'>
        <img  className='h-full w-full object-cover'
            src={assets.map} alt="map" />
      </div>
      <div className='h-1/2 p-4'>

        <div className='flex items-center justify-between'>
            <img className='h-10 mt-2'
                src={assets.car} alt="car" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>Pradip</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP 04 AB 1234</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
            </div>
            </div>
            
            <div className='flex flex-col justify-between items-center gap-3'>
            
            <div className='w-full mt-5'>
                
                <div className='flex items-center gap-4 border-b-2 border-gray-300 p-3'>
                <i className="ri-map-pin-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-gray-700 -mt-1'>Lake city, Bhopal</p>
                </div>
                </div>

                <div className='flex items-center gap-4 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹193</h3>
                    <p className='text-gray-700 -mt-1'>Cash Cash</p>
                </div>
                </div>
            </div>
        </div>

        <button
            className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5 cursor-pointer'>
            Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding
