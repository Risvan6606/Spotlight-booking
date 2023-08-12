import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import ArtistFooter from '../../componants/artist/artistFooter'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../axios'
import { FolderMinusIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function AritistEditProfile() {
    const location = useLocation()
    const profiles = location.state
    const navigate = useNavigate()
    const [profile, setProfile] = useState(profiles)
    const [category, setCategory] = useState([])
    const dispatch = useDispatch()
    const [validation, setValidation] = useState({
        message: '',
        status: ''
    })
    console.log('useState', profile)
    const [formData, setFormData] = useState({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        mobile: profile?.mobile,
        amount: profile?.midBudjet,
        category: profile?.category,
        discription: profile?.discription,
        availble: profile?.availble,
        image: null
    })
    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handelImageChange = async (event) => {
        const file = event.target.files[0]
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }))
        }
    }
    const handelSubmit = async (event) => {
        try {
            event.preventDefault()
            console.log(formData)
            if (formData.firstName.trim().length === 0) {
                setValidation({ message: 'Space not allowed', status: 'firstName' })
            } else if (formData.lastName.trim().length === 0) {
                setValidation({ message: 'Space not allowed', status: 'lastName' })
            } else if (formData.mobile.trim().length === 0 || formData.mobile.length < 10 || formData.mobile.length > 10) {
                setValidation({ message: 'please Enter valid mobile number', status: 'mobile' })
            } else if (formData.amount.trim().length === 0) {
                setValidation({ message: 'Space not allowed', status: 'amount' })
            } else if (formData.discription.trim().length === 0) {
                console.log('discriptionsssssssss');
                setValidation({ message: 'Space not allowed', status: 'dis' })
            } else {
                const formDataToSend = new FormData();
                formDataToSend.append('firstName', formData.firstName)
                formDataToSend.append('lastName', formData.lastName)
                formDataToSend.append('mobile', formData.mobile)
                formDataToSend.append('amount', formData.amount)
                formDataToSend.append('category', formData.category)
                formDataToSend.append('discription', formData.discription)
                formDataToSend.append('availble', formData.availble)
                formDataToSend.append('image', formData.image)
                dispatch(showLoading())
                request({
                    url: '/api/artist/edit-profile',
                    method: 'patch',
                    data: formDataToSend
                }).then((response) => {
                    dispatch(hideLoading())
                    if (response.data.success) {
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                }).catch((err) => {
                    dispatch(hideLoading())
                    localStorage.removeItem('adminKey')
                    navigate('/artist/login')
                    toast('please login')
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('somthing went wrong')
        }
    }
    const getData = () => {
        dispatch(showLoading())
        request({
            url: '/api/artist/get-category-data',
            method: 'post'
        }).then((response) => {
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success('geted')
                setCategory(response.data.data)
            } else {
                toast.error('fils')
                setCategory([])
            }
        }).catch((err) => {
            dispatch(hideLoading())
            localStorage.removeItem('adminKey')
            navigate('/artist/login')
        })
    }
    useEffect(() => {
        getData()
    }, [])
    console.log('category:', category)
    return (
        <>
            <ArtistHeader />
            <div className='edit_form_main_div'>
                <h5 class="text-xl font-bold dark:text-white Edit_profile_heading">Edit Profile</h5>
                <div className='edit_profile_image_div'>
                    <img src={profile?.profile} className='edit_profile_image' />
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="floating_first_name" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white ">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="floating_first_name"
                                onChange={handleChange}
                                defaultValue={profile?.firstName}
                                className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer edit_input"
                            />
                            {validation.status === 'firstName' && <p className="text-red-500">{validation.message} </p >}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="floating_last_name" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white ">Last name</label>
                            <input type="text"
                                name="lastName"
                                onChange={handleChange}
                                id="floating_last_name"
                                className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer edit_input"
                                defaultValue={profile?.lastName}
                            />
                            {validation.status === 'lastName' && <p className="text-red-500">{validation.message} </p >}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="floating_phone" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white  ">Phone number </label>
                            <input type="tel"
                                onChange={handleChange}
                                name="mobile" id="floating_phone"
                                className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer edit_input"
                                placeholder=" "
                                defaultValue={profile?.mobile}
                            />
                            {validation.status === 'mobile' && <p className="text-red-500">{validation.message} </p >}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label class=" mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                            <input
                                class=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="file_input_help"
                                onChange={handelImageChange}
                                id="file_input"
                                type="file" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="floating_phone" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white  ">Your Amount</label>
                            <input type="tel"
                                onChange={handleChange}
                                name="amount" id="floating_phone"
                                className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer edit_input"
                                placeholder=" "
                                defaultValue={profile?.midBudjet}
                            />
                            {validation.status === 'amount' && <p className="text-red-500">{validation.message} </p >}
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="countries" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                            <select id="countries"
                                onChange={handleChange}
                                defaultValuevalue={profile?.category}
                                name='category'
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {category.map((items) => {
                                    return < option defaultValuevalue={items?.name
                                    }> {items?.name}</option>
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                            <textarea id="message"
                                rows="4"
                                name='discription'
                                onChange={handleChange}
                                defaultValue={profile?.discription}
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ></textarea>
                            {validation.status === 'dis' && <p className="text-red-500">{validation.message} </p >}
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="countries" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
                            <select id="countries"
                                onChange={handleChange}
                                defaultValuevalue={profile?.availble}
                                name='availble'
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                <option selected>{profile?.availble}</option>
                                <option value="mondatyTofriday">monday to friday</option>
                                <option value="holidays">Holidays</option>
                                <option value="All">All</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form >
            </div >
            <ArtistFooter />
        </>
    )
}

export default AritistEditProfile