import React, { useState } from 'react'
import {assets} from "../assets/assets"
import {Link} from "react-router-dom"

const Login = () => {

  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [userData, setUserData]=useState({})

  const submitHandler=(e)=>{
    e.preventDefault()
    setUserData({email, password})
    setEmail("")
    setPassword("")
  }

  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src={assets.logo} alt="" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2'>What's your email</h3>
          <input className='bg-gray-100 mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
          type="email" name="email" placeholder='email@example.com' required 
          value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

          <h3 className='text-lg mb-2'>Enter your password</h3>
          <input className='bg-gray-100 mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
          type="password" placeholder='Password' required 
          value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

          <button className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-lg'>
            Login
          </button>

          <p className='text-center'>
            New here? 
            <Link to={"/signup"} className='text-blue-600 underline'>
              Create new Account
          </Link>
          </p>
        </form>
      </div>

      <div>
        <Link to={"/captain-login"} className='bg-gray-400 text-[#fff] font-semibold rounded px-4 py-2 flex items-center justify-center text-lg'>
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default Login