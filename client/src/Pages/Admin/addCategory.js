import React, { useState } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import axios from 'axios'
import { toast } from 'react-hot-toast';

function AddCategory() {
    const [formData, setFormData] = useState({
        name: ''
    })
    const [validation, setValidation] = useState('')

    const handelInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    };

    const handelSubmit = async (event) => {
        try {
            event.preventDefault()
            var capitalizedValue = formData.name.charAt(0).toUpperCase() + formData.name.slice(1);
            formData.name = capitalizedValue;
            if (formData.name.trim().length === 0) {
                setValidation('Space not allowed')
            } else {
                const response = await axios.post('/api/admin/addcategory', formData)
                if (response.data.success) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }

    return (
        <>
            <Adminlayout />
            <div className="p-11 sm:ml-64 mt-11 category_div">
                <h1 className="mb-9 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white category_heading">Add New Category</h1>
                <form onSubmit={handelSubmit}>
                    <div class="mb-6">
                        <label for="default-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white banner_label">Add category</label>
                        <input type="text"
                            id="default-input"
                            onChange={handelInputChange}
                            name='name'
                            onClick={() => setValidation('')}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 category_input" />
                        <p className='text-red-500'>{validation}</p>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>

        </>
    )
}

export default AddCategory