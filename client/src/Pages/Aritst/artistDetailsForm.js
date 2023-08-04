import React, { useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { request } from '../../axios';
import useCategoryData from '../../Hooks/categoryHook';
function ArtistDetailsForm() {
    const { categories } = useCategoryData()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        category: '',
        minBudget: '',
        availability: '',
        discription: '',
        image: null
    });
    const [validations, setValidataion] = useState({
        message: '',
        status: ''
    })

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }));
        }
    };

    const handelSubmit = async (e) => {
        e.preventDefault()
        if (formData.availability === '') {
            toast.error('please select Availabilty field')
        } else if (formData.category === '') {
            toast.error('pleae select category field')
        } else {
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('minBudget', formData.minBudget);
            formDataToSend.append('availability', formData.availability);
            formDataToSend.append('discription', formData.discription);
            formDataToSend.append('image', formData.image);
            console.log(formDataToSend)
            request({
                url: "/api/artist/artist-more-details",
                method: 'post',
                data: formDataToSend
            })
                .then((response) => {
                    if (response.data.success === false) {
                        toast(response.data.message)
                    }
                    else if (response.data.success === 'image') {
                        setValidataion({ message: response.data.message, status: response.data.success })
                    } else if (response.data.success === 'firstName') {
                        setValidataion({ message: response.data.message, status: response.data.success })
                    } else if (response.data.success === 'lastName') {
                        setValidataion({ message: response.data.message, status: response.data.success })
                    } else if (response.data.success === 'mobile') {
                        setValidataion({ message: response.data.message, status: response.data.success })
                    } else if (response.data.success === 'min') {
                        setValidataion({ message: response.data.message, status: response.data.success })
                    } else if (response.data.success === 'dis') {
                        setValidataion({ message: response.data.message, status: response.data.success })
                    }
                    else {
                        toast.success(response.data.message)
                    }
                }).catch((err) => toast('please login after try'))
        }
    }
    return (
        <>
            <ArtistHeader />
            <div className="p-6 artist_details-form ">
                <h1 className="mb-9 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white category_heading">Enter more details</h1>
                <form onSubmit={handelSubmit}>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="floating_first_name" class="artistDetailsLabel">First name</label>
                            <input type="text"
                                name="firstName"
                                id="floating_first_name"
                                onChange={handleChange}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                                onClick={() => setValidataion({ status: '' })}
                            />
                            {validations.status === 'firstName' && <p className="text-red-500">{validations.message} </p >}
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="floating_last_name" class="artistDetailsLabel">Last name</label>
                            <input type="text"
                                name="lastName"
                                id="floating_last_name"
                                onChange={handleChange}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                                onClick={() => setValidataion({ status: '' })}
                            />
                            {validations.status === 'lastName' && <p className="text-red-500">{validations.message} </p >}
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="floating_phone" class="artistDetailsLabel">Phone number</label>
                            <input type="number"
                                name="mobile" id="floating_phone"
                                onChange={handleChange}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                                onClick={() => setValidataion({ status: '' })}
                            />
                            {validations.status === 'mobile' && <p className="text-red-500">{validations.message} </p >}

                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="countries" class="artistDetailsLabel">Select Category</label>
                            <select id="countries"
                                onChange={handleChange}
                                value={formData.category}
                                name='category'
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value=''>Choose a Category</option>
                                {categories.map((element) => {
                                    return < option value={element.name} > {element.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="floating_phone" class="artistDetailsLabel">Min Budject</label>
                            <input type="number"
                                onChange={handleChange}
                                name="minBudget" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
                                placeholder=" "
                                onClick={() => setValidataion({ status: '' })}
                            />
                            {validations.status === 'min' && <p className="text-red-500">{validations.message} </p >}
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <label for="countries" class="artistDetailsLabel">Available</label>
                            <select id="countries"
                                onChange={handleChange}
                                value={formData.availability}
                                name='availability'
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a country</option>
                                <option value="mondatyTofriday">monday to friday</option>
                                <option value="holidays">Holidays</option>
                                <option value="All">All</option>
                            </select>
                        </div>
                    </div>
                    <label for="message" class="artistDetailsLabel">Discription</label>
                    <textarea id="message"
                        rows="4"
                        onChange={handleChange}
                        onClick={() => setValidataion({ status: '' })}
                        name='discription'
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."></textarea>
                    {validations.status === 'dis' && <p className="text-red-500">{validations.message} </p >}
                    <label class="artistDetailsLabel" for="file_input">Upload file</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" onChange={handleImageChange} id="file_input" type="file" />
                    <button type="submit" class="mt-5 mb-2text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 artistDetails_botton">Submit</button>
                </form >
            </div >
        </>
    )
}

export default ArtistDetailsForm