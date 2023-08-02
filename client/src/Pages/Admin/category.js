import React from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useCategoryData from '../../Hooks/categoryHook'

function Category() {
    const { categories } = useCategoryData()
    const listAndUnlist = async (id, unlist) => {
        try {
            if (unlist) {
                const response = await axios.patch('/api/admin/category-list-unlist', { id: id })
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            } else {
                const response = await axios.patch('/api/admin/category-list-unlist', { id: id, unlist: unlist })
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            toast('somthing went wrong')
        }
    }
    return (
        <>
            <Adminlayout />
            <div className="p-11 sm:ml-64 mt-11 banner-div">
                <Link to='/admin/addcategory'> <Button className='ant-btn css-dev-only-do-not-override-1jr9qlj ant-btn-default mr-1 bannerAdd' >Add</Button></Link >
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            Our Categories
                        </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((element, index) => {
                                return < tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white catogry_list">
                                        {index + 1}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white catogry_list">
                                        {element.name}
                                    </th>
                                    {element.status ? (< th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white catogry_list">
                                        Active
                                    </th>) : (< th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white catogry_list">
                                        Non Active
                                    </th>)
                                    }
                                    {element.status ? (< td class="px-6 py-4 text-left">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cetegory_botton" onClick={() => listAndUnlist(element._id)}>
                                            List
                                        </button>
                                    </td>) : (< td class="px-6 py-4 text-left">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cetegory_botton" onClick={() => listAndUnlist(element._id, element.status)}>
                                            Unlist
                                        </button>
                                    </td>)
                                    }
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}

export default Category