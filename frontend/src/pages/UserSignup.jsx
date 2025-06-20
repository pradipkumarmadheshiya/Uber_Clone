import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../context/UserContext"

const UserSignup = () => {

  const navigate= useNavigate()
  const {user, setUser}=useContext(UserDataContext)
  const [firstname, setFirstname]=useState("")
  const [lastname, setLastName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")

  const submitHandler=async(e)=>{
    e.preventDefault()
    const newUser=({
      fullname:{firstname, lastname},
      email:email, 
      password:password
    })

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status===201){
      const data=response.data
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate("/home")
    }

    setFirstname("")
    setLastName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src={assets.logo} alt="" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2'>What's your name</h3>
          <div className='flex gap-2 mb-5'>
            <input className='bg-gray-100 w-1/2 rounded px-4 py-2 text-base placeholder:text-base'
            type="text" name="firstname" placeholder='Your First Name' required 
            value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}/>
            <input className='bg-gray-100 w-1/2 rounded px-4 py-2 text-base placeholder:text-base'
            type="text" name="lastname" placeholder='Your Last Name'
            value={lastname} onChange={(e)=>{setLastName(e.target.value)}}/>
          </div>

          <h3 className='text-lg mb-2'>What's your email</h3>
          <input className='bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base'
          type="email" name="email" placeholder='email@example.com' required 
          value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

          <h3 className='text-lg mb-2'>Enter your password</h3>
          <input className='bg-gray-100 mb-5 rounded px-4 py-2  w-full text-base placeholder:text-base'
          type="password" placeholder='Password' required 
          value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

          <button className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-lg'>
            Create Account
          </button>

          <p className='text-center'>
            Already have an account?
            <Link to={"/login"} className='text-blue-600 underline'>
              Login
          </Link>
          </p>
        </form>
      </div>

      <div>
        <Link to={"/captain-signup"} className='bg-gray-400 text-[#fff] font-semibold rounded px-4 py-2 flex items-center justify-center text-lg'>
          SignUp as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserSignup
