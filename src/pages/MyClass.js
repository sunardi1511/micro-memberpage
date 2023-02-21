import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IlMyClassEmpety from '../assets/images/il-myClass-empety.jpg';
import Sidebar from '../parts/Sidebar';
import courses from '../constants/api/courses';
import { statusCourses, fetchCourses, messageCourses } from "../store/actions/courses";
import ListClassItem from '../parts/ListClassItem';
import Loading from '../parts/Loading';


const EmptyState = () => {
  return (
    <section className='flex h-screen items-center'>
      <div className='w-5/12 text-center py-12 mx-auto'>
        <img src={`${process.env.PUBLIC_URL}${IlMyClassEmpety}`}
          alt='Time To Invest' />
        <h1 className='text-3xl text-gray-900 mt-12'>Time To Invest</h1>
        <p className='text-lg text-gray-600 mt-4 mb-8  mx-auto text-center'>
          It seems you don’t have any class
          yet so let’s get them and grow your skills
        </p>


        <a
          target="_blank" rel="noopener noreferrer"
          className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
          shadow-inner text-white px-6 py-3 mt-5 '
          href={`${process.env.REACT_APP_FRONTPAGE_URL}/library`}>
          Cari Kelas
        </a>

      </div>
    </section>
  )
}

const MyClass = () => {

  const dispatch = useDispatch()
  const COURSES = useSelector(state => state.courses)

  useEffect(() => {
    window.scrollTo(0,0)

    dispatch(statusCourses("loading"))
    courses.mine().then(res => {

      dispatch(fetchCourses(res.data))
    })
      .catch(err => {
        dispatch(messageCourses(err?.response?.data?.message ?? "error"))
      })


  }, [dispatch])


  return (
    <div className='flex'>
      <Sidebar pathName="/" />
      <main className='flex-1'>
        <div className='px-16'>
          {COURSES.status === "loading" && <Loading/>}
          {COURSES.status === "error" && COURSES.message}
          {COURSES.status === "ok" &&
            (COURSES.total > 0 ? (<>
            <section className='flex flex-col mt-8'>
              <h1 className='text-4xl text-gray-900 font-medium'>My Class</h1>
              <p className='text-lg text-gray-600'>
                Continue learning to pursue your dreams
              </p>
            </section>
            <section className='flex flex-col mt-8'>
              <div className='flex justify-start items-center -mx-4'>
                {Object.values(COURSES.data)?.map?.((item, index) => {
                  return (
                    <ListClassItem data={item.course}
                      key={index} />
                  )
                })}
              </div>
            </section>
          </>)
            : (
            <EmptyState />
            )
          )}
        </div>
      </main>
    </div>
  )
}

export default MyClass