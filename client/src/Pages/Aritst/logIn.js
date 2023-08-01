import React, { useState } from 'react'
import './logIn.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import '../../indext.css'
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import { useDispatch } from 'react-redux';
import Adminloginhead from '../../publicAndProtect/Artist/Adminloginhead';
function AristLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            dispatch(showLoading())
            const response = await axios.post('/api/artist/login', formData)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem('artistKey', response.data.data)
                navigate('/artist')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Error logged in')
        }
    }

    return (
        <>
            <Adminloginhead />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 artist" >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 artist_login">
                        LOG IN
                    </h2>
                </div>/

                <div className=" change" >
                    <form className="space-y-6" onSubmit={handelSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-red-500">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder='example@gmail.com'
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to='/artist/forgot' className='font-semibold text-indigo-600 hover:text-indigo-500 notAristSignup'>
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    placeholder='************'
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500  usergo">
                        <Link to='/signUp' className='ml-10 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 notAristSignup'>
                            Not a Artist?
                        </Link>
                        <Link className='ml-10 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 notAristSignup' to='/artist/signUp' >
                            go to sign up
                        </Link>
                    </p>
                </div >
            </div >
        </>

    )
}

export default AristLogin