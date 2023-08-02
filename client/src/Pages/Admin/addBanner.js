import React, { useState } from 'react';
import Adminlayout from '../../componants/admin/Adminlayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCategoryData from '../../Hooks/categoryHook';

function AddBanner() {
    const { validations, setValidation } = useCategoryData()
    const [formData, setFormData] = useState({
        title: '',
        discription: '',
        image: null
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData, 'ehjllooo')
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const imageInputOnchange = async (event) => {
        const files = event.target.files;
        const base64 = await convertBase64(files[0])
        setFormData({
            ...formData,
            image: base64
        })
        console.log(formData, 'hai')
        return;
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/admin/addbanner', formData)
        if (response.data.success === 'title') {
            setValidation(response.data.message)
            setValidation({ message: response.data.message, status: 'title' })
        } else if (response.data.success === true) {
            toast.success(response.data.message)
        } else if (response.data.success === 'titles') {
            toast.error(response.data.message)
        } else if (response.data.success === 'discription') {
            toast.error(response.data.message)
        } else {
            setValidation({ message: response.data.message, status: false })
        }
    }




    return (
        <>
            <Adminlayout />
            <div className="p-11 sm:ml-64 mt-11 banner-div">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white banner_heading">Add New Banner</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Heading</label>
                        <input
                            type="text"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Heading"
                            name="title"
                            onChange={handleInputChange}
                            onClick={() => setValidation({ status: true })}
                            required
                        />
                        {validations.status === 'title' && <p className="text-red-500">{validations.message} </p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Your message</label>
                        <textarea
                            id="message"
                            rows="4"
                            name="discription"
                            onClick={() => setValidation({ status: true })}
                            onChange={handleInputChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your description here..."
                        ></textarea>
                        {!validations.status && <p className="text-red-500">{validations.message} </p>}
                    </div>
                    <div className="d-flex items-center justify-center w-full image_div">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_labels" htmlFor="file_input">Upload file</label>
                        <input
                            name="image"
                            onChange={imageInputOnchange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 banner_Image_inupt"
                            id="file_input"
                            type="file"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 banner_botton"
                    >
                        Submit
                    </button>
                </form >
            </div >
        </>
    );
}

export default AddBanner;
