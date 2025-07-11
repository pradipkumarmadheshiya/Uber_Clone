import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {

  const token=localStorage.getItem("token")
  const navigate=useNavigate()
  const [isLoader, setIsLoader]=useState(true)
  const {user, setUser}=useContext(UserDataContext)

  useEffect(()=>{
    if (!token){
        navigate("/login")
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers:{Authorization: `Bearer ${token}`}
    }).then((response)=>{
      if (response.status===200){
        setUser(response.data)
        setIsLoader(false)
      }
    }).catch((err)=>{
      console.log("err", err)
      localStorage.removeItem("token")
      navigate("/login")
    })
  }, [token])

  if (isLoader) {
    return (
        <div className='p-10'>Loading...</div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
