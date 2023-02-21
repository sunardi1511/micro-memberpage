import React from 'react'
import { Link } from 'react-router-dom'

import Il404 from '../assets/images/il-404.jpg';

const ServerError = ({ fallbackUrl, fallbackText, external }) => {
  return (
    <section className='h-screen flex flex-col items-center'>
      <img src={`${process.env.PUBLIC_URL}${Il404}`}
        alt='Server error' />
      <h1 className='text-3xl text-gray-900 mt-12'>Oops! Server error</h1>
      <p className='text-lg text-gray-600 mt-4 mb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center'>
       Mostly this by tha server was busy, please try again later.
      </p>

        <Link
          className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
          shadow-inner text-white px-6 py-3 mt-5 ' 
          to="/">
            Back to home
        </Link>

    </section>
  )
}

export default ServerError