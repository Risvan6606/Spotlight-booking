import React, { useState } from 'react';
import Adminlayout from '../../componants/admin/Adminlayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCategoryData from '../../Hooks/categoryHook';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { adminRequest } from '../../axios';

function AddBanner() {
    const [validations, setValidataion] = useState({
        message: '',
        status: ''
    })
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
    const imageInputOnchange = (event) => {
        console.log('hello')
        const file = event.target.files[0]
        console.log(file)
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }))
        }
    }
    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    // const imageInputOnchange = async (event) => {
    //     const files = event.target.files;
    //     const base64 = await convertBase64(files[0])
    //     setFormData({
    //         ...formData,
    //         image: base64
    //     })
    //     console.log(formData, 'hai')
    //     return;
    // }


    const handleSubmit = async (e) => {
        e.preventDefault()
        // const response = await axios.post('/api/admin/addbanner', formData)
        // if (response.data.success === 'title') {
        //     setValidation(response.data.message)
        //     setValidation({ message: response.data.message, status: 'title' })
        // } else if (response.data.success === true) {
        //     toast.success(response.data.message)
        // } else if (response.data.success === 'titles') {
        //     toast.error(response.data.message)
        // } else if (response.data.success === 'discription') {
        //     toast.error(response.data.message)
        // } else {
        //     setValidation({ message: response.data.message, status: false })
        // }
        if (formData.title.trim().length === 0) {
            setValidataion({ message: 'space not allowed', status: 'title' })
        } else if (formData.discription.trim().length === 0) {
            setValidataion({ message: 'space not allowed', status: 'dis' })
        } else if (formData.image === null) {
            setValidataion({ message: 'please input insert image', status: 'image' })
        } else {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('discription', formData.discription);
            formDataToSend.append('image', formData.image);
            adminRequest({
                url: '/api/admin/addbanner',
                method: 'post',
                data: formDataToSend
            }).then((response) => {
                if (response.data.success) {
                    toast('get datas')
                }
            }).catch((err) => {
                console.log(err)
                toast('please login after tray again')
            })
        }
    }




    return (
        <>
            <Adminlayout />
            <div className="p-11 sm:ml-64 mt-11 banner-div">
                <Link to='/admin/banner'><Button className='back_botton'>Back</Button></Link>
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
                            onClick={() => setValidataion({ status: '' })}
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
                            onClick={() => setValidataion({ status: '' })}
                            onChange={handleInputChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your description here..."
                        ></textarea>
                        {validations.status === 'dis' && <p className="text-red-500">{validations.message} </p>}
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
                        {validations.status === 'image' && <p className="text-red-500">{validations.message} </p>}

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
