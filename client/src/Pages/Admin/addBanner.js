import React, { useState } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'

function AddBanner() {
    const [formData, setFormData] = useState({
        title: '',
        discription: '',
        image: ''
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        console.log(formData)
    }
    return (
        <>
            <Adminlayout />
            <div className="p-11 sm:ml-64 mt-11 banner-div">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white banner_heading">Add New Banner</h1>
                <form >
                    <div className="mb-6">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Heading</label>
                        <input type="text"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Heading"
                            name='title'
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="mb-6">
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Your message</label>
                        <textarea id="message"
                            rows="4"
                            name='discription'
                            onChange={handleInputChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your discription here..."></textarea>
                    </div>
                    <div className="d-flex items-center justify-center w-full image_div">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_labels" for="file_input">Upload file</label>
                        <input
                            name='image'
                            onChange={handleInputChange}
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 banner_Image_inupt"
                            id="file_input"
                            type="file" />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 banner_botton"
                    >Submit
                    </button>
                </form>

            </div>
        </>
    )
}

export default AddBanner