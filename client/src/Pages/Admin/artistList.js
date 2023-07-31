import React, { useEffect } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../Redux/userSlice'
import Swal from 'sweetalert2';

function ArtistList() {

    return (
        <>
            <Adminlayout />
            <div className="p-5 sm:ml-64 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-11">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                        <label for="table-search" className="sr-only ml-2">Search</label>
                        <div className="relative ml-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {users.map((element, index) => { */}
                            {/* console.log(element, 'hello') */}
                            {/* return */}
                            < tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                <td className="w-4 p-4">
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {/* {index + 1} */}1
                                </th>
                                <td className="px-6 py-4">
                                    {/* {element.first_name} */}Risvan
                                </td>
                                <td className="px-6 py-4">
                                    {/* {element.mobile} */}432423434
                                </td>
                                <td className="px-6 py-4">
                                    {/* {element.email} */}risvangalfan@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    {/* {element.otp === 'isVerified' ? 'isVerified' && ( */}
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>Online
                                    </div>
                                    {/* ) : ( */}
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>Block
                                    </div>
                                    {/* )} */}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {/* {element.otp === 'isVerified' ? 'isVerified' && ( */}
                                        <Link to=""
                                            className="font-medium text-red-600 dark:text-red-500 hover:text-orange-600 hover:font-bold"
                                        // onClick={() => {
                                        //     Blockuser(element._id)
                                        // }}
                                        >Block</Link>
                                        {/* ) : ( */}
                                        <Link to=""
                                            className="font-medium text-green-600 dark:text-blue-500 hover:text-green-600 hover:font-bold"
                                        // onClick={() => {
                                        //     Blockuser(element._id, element.email)
                                        // }}
                                        >unblock</Link>
                                        {/* )} */}
                                    </div>
                                </td>
                            </tr>

                            {/* })} */}
                        </tbody>
                    </table>
                </div>
            </div >

        </>
    )
}

export default ArtistList