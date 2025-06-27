import React from 'react'

const LocationSearchPanel = (props) => {

  const handleSuggestionsClick=(suggestion)=>{
    if (props.activeField==="pickup"){
      props.setPickup(suggestion.description)
    }
    else if(props.activeField==="destination"){
      props.setDestination(suggestion.description)
    }

  }

  return (
    <div>
      {
        props.suggestions.map((suggestion, idx)=>(
          <div key={idx} onClick={()=>handleSuggestionsClick(suggestion)}
          className='flex items-center justify-start gap-3 my-2 border-2 active:border-black border-gray-200 p-2 rounded-xl'>
            <div className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-line text-lg"></i>
            </div>
            <h4 className='w-fit'>{suggestion.description}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel
