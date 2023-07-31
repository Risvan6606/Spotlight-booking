import React, { useState } from 'react'
import './signUp.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import { useDispatch } from 'react-redux';
import Adminloginhead from '../../publicAndProtect/Artist/Adminloginhead';

function ArtistSignup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState({
        success: '',
        message: '',
        responseOtp: ''
    })
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
        otp: false
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    };

    const handelSubmit = async (event) => {
        try {
            event.preventDefault()
            if (message.responseOtp !== formData.otp && formData.otp !== false) {
                toast.error('otp has inccorect please check')
            } else {
                dispatch(showLoading())
                const response = await axios.post('/api/artist/signup', formData);
                dispatch(hideLoading())
                if (response.data.success === true) {
                    console.log(response.data)
                    toast('please Enter Otp')
                    setMessage({
                        success: true, message: response.data.message, responseOtp: response.data.otp
                    })
                } else {
                    toast(response.data.message)
                    if (response.data.success === 'name_space') {
                        setMessage({ success: 'name_space', message: response.data.message })
                    } else if (response.data.success === 'last_name') {
                        setMessage({ success: 'last_name', message: response.data.message })
                    } else if (response.data.success === 'number_valid') {
                        setMessage({ success: 'number_valid', message: response.data.message })
                    } else if (response.data.success === 'password_space') {
                        setMessage({ success: 'password_space', message: response.data.message })
                    } else if (response.data.success === 'Exist') {
                        setMessage({ success: 'Exist', message: response.data.message })
                    } else if (response.data.success === 'isVerified') {
                        navigate('/artist/login')
                    }
                }
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('something wents worong')
        }
    }
    return (
        <>
            <Adminloginhead />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 signUp" >
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 sign_text artist_login">
                    SIGN UP
                </h2>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm form_div">
                    <form className="space-y-6" onSubmit={handelSubmit}>
                        <div>
                            < label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder='Enter First Name'
                                    onClick={() => setMessage(false)}
                                    // autoComplete="email"
                                    // value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {message.success === 'name_space' && <p className='text'>{message.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="l_name"
                                    name="lastName"
                                    type="text"
                                    placeholder='Enter Last Name'
                                    onClick={() => setMessage(false)}
                                    // autoComplete="email"
                                    // value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {message.success === 'last_name' && <p className='text'>{message.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile
                            </label>
                            <div className="mt-1">
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="number"
                                    placeholder='Enter Mobile'
                                    onClick={() => setMessage(false)}
                                    // autoComplete="email"
                                    // value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {message.success === 'number_valid' && <p className='text'>{message.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='Enter Email'
                                    autoComplete="email"
                                    onClick={() => setMessage(false)}
                                    // value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {message.success === 'Exist' && <p className='text'>{message.message}</p>}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <Link className="font-semibold text-indigo-600 hover:text-indigo-500 ">
                                        Forgot password?
                                    </Link>
                                </div> */}
                            </div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Enter Password'
                                    autoComplete="current-password"
                                    onClick={() => setMessage(false)}
                                    // value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {message.success === 'password_space' && <p className='text'>{message.message}</p>}
                        </div>
                        {
                            message.success === true && <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    OTP
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        autoComplete="email"
                                        // onClick={() => setMessage(false)}
                                        // value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder='Enter OTP'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {/* {message.success === 'Exist' && <p className='text'>{message.message}</p>} */}
                            </div>
                        }

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                SIGN UP
                            </button>
                        </div>
                    </form >
                    <p className="mt-1 text-center text-sm text-gray-500">
                        <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 notAristSignup" to='/login'>
                            Not a artist?
                        </Link>
                        <Link className='ml-10 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 notAristSignup' to='/artist/login'>Go to Log in</Link>
                    </p>
                </div >
            </div >
        </>
    )
}

export default ArtistSignup