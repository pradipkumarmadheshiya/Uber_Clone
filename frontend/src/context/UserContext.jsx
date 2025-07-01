import React, { createContext, useState } from 'react'

export const UserDataContext= createContext()

const UserContext = ({children}) => {

  const [user, setUser]= useState({
    fullname:{
      firstname: "",
      lastname: ""
    },
    email:""
  })

  const [vehicleType, setVehicleType] = useState("");
  
  return (
    <div>
      <UserDataContext.Provider value={{user, setUser, vehicleType, setVehicleType}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
