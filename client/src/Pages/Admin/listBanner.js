import React from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import useBannerData from '../../Hooks/bannerHooks'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setbanner } from '../../Redux/bannerSlice'

function ListBanner() {
    const { banners } = useBannerData()
    const dispatch = useDispatch(setbanner(banners))
    const listAndUnlist = async (id, unlist) => {
        try {
            if (unlist) {
                const response = await axios.patch('/api/admin/banner-list-unlist', { id: id })
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            } else {
                const response = await axios.patch('/api/admin/banner-list-unlist', { id: id, unlist: unlist })
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
            <div className="p-5 sm:ml-64 mt-11">
                <Link to='/admin/Addbanner'> <Button className='ant-btn css-dev-only-do-not-override-1jr9qlj ant-btn-default mr-1 bannerAdd' >Add</Button></Link >
                {banners.length === 0 ? (<h1>Not Added any Banner please add</h1>) : (< div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 p-3">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Discription
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr >
                        </thead >
                        <tbody>
                            {banners.map((element, index) => {
                                return (
                                    < tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {element.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {element.discription}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img src={element.image} className='bannerImage' />
                                        </td>
                                        {
                                            element.status ? (< td className="px-6 py-4">
                                                Active
                                            </td>) : (< td className="px-6 py-4">
                                                Non Active
                                            </td>)
                                        }
                                        {
                                            element.status ? (< td className="px-6 py-4">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded Banner_botton" onClick={() => listAndUnlist(element._id)} >
                                                    List
                                                </button>
                                            </td>) : (< td className="px-6 py-4">
                                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded Banner_botton" onClick={() => listAndUnlist(element._id, element.status)}>
                                                    Unlist
                                                </button>
                                            </td>)
                                        }
                                    </tr>)
                            })}
                        </tbody>
                    </table >
                </div >)
                }
            </div >
        </>
    )
}

export default ListBanner