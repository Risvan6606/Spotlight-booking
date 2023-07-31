import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import './login.css'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import { useDispatch } from 'react-redux'
import Adminloginhead from '../../publicAndProtect/Artist/Adminloginhead'

function Adminlogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        console.log(formData.email)
    }
    const handelSubmit = async (event) => {
        try {
            event.preventDefault()
            dispatch(showLoading())
            const response = await axios.post('/api/admin/login', formData)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem('adminKey', response.data.data)
                navigate('/admin')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('somthing went worng')
        }
    }
    return (
        <>
            <Adminloginhead />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 admin">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm heading_div">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 welcome_text ">
                        Welcome Admin
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm admin_form">
                    <form onSubmit={handelSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleInputChange}
                                    placeholder='example@gmail.com'
                                    autoComplete="email"
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
                                    <Link className="font-semibold text-indigo-600 hover:text-indigo-500" to='/admin/forgotpassword'>
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={handleInputChange}
                                    placeholder='*********'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className='mt-3'>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                    </Link>
                </p> */}
                </div >
            </div >
        </>
    )
}

export default Adminlogin