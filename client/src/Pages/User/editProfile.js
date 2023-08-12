import React, { useEffect, useState } from 'react'
import UserHeader from '../../componants/user/userHeader'
import Footer from '../../componants/user/footer'
import { toast } from 'react-hot-toast'
import { userRequest } from '../../axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function EditProfile() {
    const location = useLocation()
    var profiles = location.state
    const [profile, setProfile] = useState(profiles)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        first_name: profile.first_name,
        last_name: profile.last_name,
        mobile: profile.mobile,
        image: null
    })
    const [validation, setValidation] = useState({
        messsage: '',
        status: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handelImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }))
        }
    }
    const handelSubmit = async (e) => {
        e.preventDefault()
        if (formData.first_name.trim().length === 0) {
            setValidation({ message: 'Space not allowed', status: 'first_name' })
        } else if (formData.last_name.trim().length === 0) {
            setValidation({ messsage: 'Space not allowed', status: 'last_name' })
        } else if (formData.mobile.trim().length === 0 || formData.mobile.length < 10 || formData.mobile.length > 10) {
            setValidation({ message: 'please enter valid mobile number', status: 'mobile' })
        } else {
            const formDataToSend = new FormData();
            formDataToSend.append('first_name', formData.first_name);
            formDataToSend.append('last_name', formData.last_name);
            formDataToSend.append('mobile', formData.mobile)
            formDataToSend.append('image', formData.image)
            console.log('formData ToSEnd', formDataToSend)
            dispatch(showLoading())
            userRequest({
                url: '/api/user/edit-profile',
                method: 'post',
                data: formDataToSend
            }).then((response) => {
                dispatch(hideLoading())
                if (response.data.success) {
                    setProfile(response.data.data)
                    toast.success(response.data.message)
                }
            }).catch((err) => {
                localStorage.removeItem('token')
                toast.error('Somthing went wrong please Login')
                Navigate('/login')
            })
        }
    }
    return (
        <>
            <UserHeader />
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
                                name="first_name"
                                id="floating_first_name"
                                onChange={handleChange}
                                defaultValue={profile?.first_name}
                                className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer edit_input"
                                required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="floating_last_name" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white ">Last name</label>
                            <input type="text"
                                name="last_name"
                                onChange={handleChange}
                                id="floating_last_name"
                                className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer edit_input"
                                defaultValue={profile?.last_name}
                                required />
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
                                required />
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
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div >
            <Footer />
        </>
    )
}

export default EditProfile