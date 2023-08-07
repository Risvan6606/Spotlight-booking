import React, { useEffect, useState } from 'react'
import UserHeader from '../../componants/user/userHeader'
import { userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setSingleArtist } from '../../Redux/singleArtistSlice'
import { Link, useNavigate } from 'react-router-dom'

function Artist() {
    const [artistMore, setArtistMore] = useState([])
    const Navigate = useNavigate()
    // console.log(singleArtist)
    const dispatch = useDispatch()
    const getData = async () => {
        userRequest({
            url: '/api/user/get-artist-data',
            method: 'post',
        }).then((response) => {
            console.log(response.data.success, 'hellosssssssssssssss')
            toast(response.data.message)
            setArtistMore(response.data.data)
        }).catch((err) => {
            localStorage.removeItem('token')
            Navigate('/login')
        })
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
    }, [artistMore])
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const artistView = async (id) => {
        try {
            // console.log(id)
            userRequest({
                url: '/api/user/artist-view',
                method: 'post',
                data: { artistId: id }
            }).then((response) => {
                if (response.data.success) {
                    console.log(response.data.data)
                    dispatch((response.data.data))
                    Navigate('/artist-single-show')
                    // console.log(singleArtist, 'reduxdata')
                } else {
                    console.log('risvn')
                }
            }).catch((error) => {
                console.log(error)
                toast.error('somthing went wrong')
            })
        } catch (error) {
            toast('somthing went wrong ')
        }

    }
    const bookingArtistView = async (id) => {
        try {
            // console.log(id)
            userRequest({
                url: '/api/user/artist-view',
                method: 'post',
                data: { artistId: id }
            }).then((response) => {
                if (response.data.success) {
                    console.log(response.data.data)
                    dispatch(setSingleArtist(response.data.data))
                    Navigate('/book-artist')
                    // console.log(singleArtist, 'reduxdata')
                } else {
                    console.log('risvn')
                }
            }).catch((error) => {
                console.log(error)
                toast.error('somthing went wrong')
            })
        } catch (error) {
            toast('somthing went wrong ')
        }

    }
    return (
        <>
            <UserHeader />
            <div className='d-flex showArtist_div'>
                {artistMore.map((element) => {
                    // console.log(element, 'elemetn')
                    // console.log(element.moreDetails, 'elemetn. moreDetails')
                    // console.log(element.moreDetails[0], 'elemetn.join')
                    return element.moreDetails.map((items) => {
                        return < div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 artist-cart-div" >
                            <a href="#">
                                <img class="p-8 rounded-t-lg" onClick={() => artistView(element?._id)} src={items?.image} alt=" product image" />
                            </a>
                            <div class="px-5 pb-5">
                                <a href="#">
                                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{items.firstName + ' ' + items.lastName}</h5>
                                </a>
                                <p class="text-gray-500 dark:text-gray-400">{truncate(items?.discription, 80)}</p>
                                <div class="flex items-center mt-2.5 mb-5">
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-3xl font-bold text-gray-900 dark:text-white">RS: {items?.midBudjet}</span>
                                    <Link
                                        onClick={() => bookingArtistView(element?._id)}
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book</Link>
                                </div>
                            </div>
                        </div>
                    })
                })
                }

            </div >
        </>
    )
}

export default Artist