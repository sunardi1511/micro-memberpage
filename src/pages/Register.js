import React, { useEffect } from 'react'
import Footer from '../parts/Footer'
import Header from '../parts/Header'
import LoginForm from '../parts/LoginForm'
import RegisterForm from '../parts/RegisterForm'

const Register = () => {

useEffect(() => {
  window.scroll(0, 0)
}, [])


  return (
    <>
      <section className='container mx-auto pt-10'>
        <Header onLight />
      </section>
      <section className='container mx-auto pt-10'>
      <RegisterForm/>
      </section>
      <section className=' pt-24 bg-indigo-900 py-12'>
        <Footer/>
      </section>
    </>
  )
}

export default Register