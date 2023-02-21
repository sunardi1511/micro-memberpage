import React from 'react'
import { Link } from 'react-router-dom'

import IlSecurity from '../assets/images/il-Security.jpg';

const UnAutenticated = ({ fallbackUrl, fallbackText, external }) => {
  return (
    <section className='h-screen flex flex-col items-center'>
      <img src={`${process.env.PUBLIC_URL}${IlSecurity}`}
        alt='you are not supposed here, please login' />
      <h1 className='text-3xl text-gray-900 mt-12'>Wow! are you here?</h1>
      <p className='text-lg text-gray-600 mt-4 mb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center'>
        Seems like you do not have access for this page. We are sorry.
      </p>
      {
        external ? <a className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
       shadow-inner text-white px-6 py-3 mt-5 '
          href={fallbackUrl}>{fallbackText || "Login me in"}</a>
          : <Link className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
      shadow-inner text-white px-6 py-3 mt-5 ' to={fallbackUrl || "/login"}>
            {fallbackText || "Login me in"}
          </Link>
      }

    </section>
  )
}

export default UnAutenticated