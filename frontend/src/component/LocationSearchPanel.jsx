import React from 'react'

const LocationSearchPanel = (props) => {

  const locations=[
    "CyberHub Management Office, Ground Floor, Building No 10C, DLF Cyber City, Phase 2, Gurgaon",
    "Sector 53 Behind South Point Mall, Sector 53, Golf Course Road, Gurugram",
    "MG Road Metro Station, Mehrauli Gurgaon Road, Sector 25/28, Gurugram",
    "Block 2, Sector 49, Sohna Road, Gurugram"
  ]

  return (
    <div>
      {
        locations.map((location, idx)=>(
          <div key={idx} onClick={()=>{props.setVehiclePanelOpen(true); props.setPanelOpen(false)}}
          className='flex items-center justify-start gap-3 my-2 border-2 active:border-black border-gray-200 p-2 rounded-xl'>
            <div className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-line text-lg"></i>
            </div>
            <h4 className='w-fit'>{location}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel
