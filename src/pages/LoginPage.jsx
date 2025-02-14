import React from 'react'
import { Container, Login } from "../components/index";

const LoginPage = () => {
  return (
    <div className='min-h-screen flex'>
      <div className='hidden lg:block lg:w-1/2'>
        <img 
          src="../src/assets/LoginImage.jpg" 
          alt="Login Background" 
          className='w-full h-screen object-cover'
        />
      </div>
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
          <Login />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
