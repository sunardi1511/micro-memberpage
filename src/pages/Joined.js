import React from 'react'
import { Link } from 'react-router-dom'

import IlJoined from '../assets/images/il-joined.jpg';


const  joining = () => {
    
}

const Joined = ({ history, match }) => {
    return (
        <section className='h-screen flex flex-col items-center'>
            <img src={`${process.env.PUBLIC_URL}${IlJoined}`}
                alt='Welcome to Class' />
            <h1 className='text-3xl text-gray-900 mt-12'>Welcome to Class</h1>
            <p className='text-lg text-gray-600 mt-4 mb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center'>
                You have successfully joined our
                <strong>Web Developer 101 class</strong>
            </p>


            <span
            onClick={joining}
                className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
          shadow-inner text-white px-6 py-3 mt-5 '
                to="/">
                Start Learn
            </span>


        </section>
    )
}

export default Joined