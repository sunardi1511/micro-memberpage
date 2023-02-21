import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import courses from '../constants/api/courses';
import ServerError from "../pages/500";
import Loading from '../parts/Loading';
import IlJoined from '../assets/images/il-joined.jpg';


const Joined = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [state, setState] = useState(() => ({
        isLoading: true,
        isError: false,
        data: []
    }))

    useEffect(() => {
        courses.details(params.class)
            .then((res) => {
                setState({ isLoading: false, isError: false, data: res })
            })
            .catch((err) => {
                setState({ isLoading: false, isError: true, data: null })
            })
    }, [params.class])

    if (state.isLoading) return (<Loading />)
    if (state.isError) return (<ServerError />)

    const joining = () => {
        courses.join(params.class).then((res) => {
            navigate(`/courses/${params.class}`)
        }).catch((err) => {
            console.log('err', err)
            if (err?.response?.data?.message === "user already taken this course")
                navigate(`/courses/${params.class}`)
        })
    }
    return (
        <section className='h-screen flex flex-col items-center mt-24'>
            <img src={`${process.env.PUBLIC_URL}${IlJoined}`}
                alt='Welcome to Class' />
            <h1 className='text-3xl text-gray-900 mt-12'>Welcome to Class</h1>
            <p className='text-lg text-gray-600 mt-4 mb-8 lg:w-4/12 xl:w-3/12 mx-auto text-center'>
                You have successfully joined our <strong>{state.data?.name ?? "Class Name"}</strong> class
            </p>


            <span
                onClick={joining}
                className='cursor-pointer bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
          shadow-inner text-white px-6 py-3 mt-5 '
                to="/">
                Start Learn
            </span>


        </section>
    )
}

export default Joined