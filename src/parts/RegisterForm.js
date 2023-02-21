import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import users from '../constants/api/users';
import useForm from '../constants/helpers/hooks/useForm';
import fieldErrors from '../constants/helpers/fieldErrors';

import james from "../assets/images/james.jpg";
import Select from '../components/Form/Select';

const RegisterForm = () => {

    const dispatch = useDispatch()
    const history = useNavigate()

    const [{ name, email, password, profession, otherProfession }, setState] = useForm({
        name: "",
        email: "",
        password: "",
        profession: "",
        otherProfession: ""
    })

    const [errors, setErrors] = useState(null)

    const sumbit = (e) => {
        e.preventDefault()

        users.register({ name, email, password, profession: profession === "others" ? otherProfession : profession })
            .then((res) => {
                history("/login")
            }).catch((err) => {
                setErrors(err?.response?.data?.message)
            })
    }

  const ERRORS = fieldErrors(errors)

    return (
        <div className='flex justify-center items-center pb-24'>
            <div className='w-3/12'>
                <h1 className='text-4xl text-gray-900 items-center mb-6'>
                    <span className='font-bold'>Grow skill </span> from, <br />
                    Anywhare
                </h1>
                <form onSubmit={sumbit}>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='name' className={['text-lg mb-2', ERRORS?.name?.message ? "text-red-500" : "text-gray-900"].join(" ")}>Full Name</label>
                        <input
                            name='name'
                            type='text'
                            onChange={setState}
                            className={['bg-white focus:outline-none border px-6 py-3 w-full border-gray-600 ',
                                ERRORS?.name?.message ? "border-red-500 text-red-500" : "focus:border-teal-500 border-gray-600 text-gray-600"]}
                            value={name}
                            placeholder="Your name" />
                            <span className='text-red-500 pt-2'>
                            {
                                ERRORS?.name?.message
                            }  
                            </span>
                    </div>


                    <div className='flex flex-col mb-4'>
                        <label htmlFor='email' className={['text-lg mb-2', ERRORS?.name?.message ? "text-red-500" : "text-gray-900"].join(" ")}>Email Address</label>
                        <input
                            name='email'
                            type='email'
                            onChange={setState}
                            className={['bg-white focus:outline-none border px-6 py-3 w-full border-gray-600 ',
                                ERRORS?.email?.message ? "border-red-500 text-red-500" : "focus:border-teal-500 border-gray-600 text-gray-600"]}
                            value={email}
                            placeholder="Your email address" 
                            />
                              <span className='text-red-500 pt-2'>
                            {
                                ERRORS?.email?.message
                            }  
                            </span>
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label htmlFor='password'  className={['text-lg mb-2', ERRORS?.name?.message ? "text-red-500" : "text-gray-900"].join(" ")}>Password</label>
                        <input
                            name='password'
                            type='password'
                            onChange={setState}
                            className={['bg-white focus:outline-none border px-6 py-3 w-full border-gray-600 ',
                            ERRORS?.password?.message ? "border-red-500 text-red-500" : "focus:border-teal-500 border-gray-600 text-gray-600"]}
                            value={password}
                            placeholder="Your password address" />
                              <span className='text-red-500 pt-2'>
                            {
                                ERRORS?.password?.message
                            }  
                            </span>
                    </div>



                    <Select labelNmae="Occupation" name='profession' value={profession} fallBackText="Select your focus" onClick={setState}>
                        <option value="">Select your focus</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Frontend Develope">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="others">others</option>
                    </Select>

                    {profession === "others" && (
                        <div className='flex flex-col mb-4'>
                            <label htmlFor='otherProfession'  className={['text-lg mb-2', ERRORS?.name?.message ? "text-red-500" : "text-gray-900"].join(" ")}>
                                Other's Occupation
                            </label>
                            <input
                                name='otherProfession'
                                type='input'
                                onChange={setState}
                                className={['bg-white focus:outline-none border px-6 py-3 w-full border-gray-600 ',
                                ERRORS?.otherProfession?.message ? "border-red-500 text-red-500" : "focus:border-teal-500 border-gray-600 text-gray-600"]}
                                value={otherProfession} />
                        </div>
                    )}

                    <button type='sumbit' className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 
              focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full'>
                        Daftar Now
                    </button>
                </form>
            </div>

            <div className='w-1/12'></div>

            <div className='w-5/12 flex justify-end pt-24 pr-16'>
                <div className='relative' style={{ width: 369, height: 440 }}>
                    <div
                        className='absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0'
                        style={{ width: 324, height: 374 }}>
                    </div>
                    <div className='absolute w-full h-full -mb-8 -ml-8'>
                        <img src={james} alt='james' />
                    </div>
                    <div
                        className='absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-14'
                        style={{ width: 290 }}>
                        <p className='text-gray-900 mb-2'>Semua materi terstruktrur baik
                            dan mentor yang sangat lihai</p>
                        <span className='text-gray-400'>James, Apps Developer</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterForm