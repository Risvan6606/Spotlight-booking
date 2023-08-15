import React, { useEffect, useLayoutEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { request } from '../../axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
// import io from 'socket.io-client'
// import { isRejected } from '@reduxjs/toolkit'

function ViewBooking() {
    const location = useLocation()
    const Navigate = useNavigate()
    const data = location.state?.id
    const [singleBookingData, setSingleBookingData] = useState([])
    const getData = () => {
        request({
            url: '/api/artist/get-booking-data',
            method: 'post',
            data: { booking_id: data }
        }).then((response) => {
            if (response.data.success) {
                setSingleBookingData(response.data.data)
            } else {
                toast(response.data.message)
            }
        }).catch((err) => {
            localStorage.removeItem('artistKey')
            Navigate('/artist/login')
        })
    }
    useLayoutEffect(() => {
        getData()
    }, [])
    // var newSocket = io('http://localhost:5000');
    // useEffect(() => {

    // newSocket.on('chat message', (message) => {
    //     console.log('Received message:', message);
    // });
    // return () => {
    //     newSocket.disconnect();
    // };
    // }, []);

    const acceptAndReject = (id, user_id, email) => {
        if (id && email) {
            Swal.fire({
                title: 'Are you sure ?',
                text: "Are you reject this booking!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reject it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    request({
                        url: '/api/artist/accept_and_reject',
                        method: 'post',
                        data: { id: id, email: email, user_id: user_id }
                    }).then(async (response) => {
                        if (response.data.success) {
                            console.log('rejected')
                            await Swal.fire(
                                'Rejected!',
                                'booking has been rejected.',
                                'success'
                            )
                            // newSocket.emit('chat message', response.data.userNotification)
                            Navigate('/artist/notification')
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you accept this booking!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, accept it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log(id, email, user_id)
                    request({
                        url: '/api/artist/accept_and_reject',
                        method: 'post',
                        data: { id: id, user_id: user_id }
                    }).then(async (response) => {
                        console.log('accepted')
                        if (response.data.success) {
                            await Swal.fire(
                                'Accepted!',
                                'booking has been accepted.',
                                'success'
                            )
                            // newSocket.emit('chat message', response.data.userNotification)
                            Navigate('/artist/bookings')
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            })
        }
    }

    return (
        <>
            <ArtistHeader />
            <div className='booking_infoArtist'>
                <div className='info_booking_div'>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Booking Information</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData[0]?.firstName}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Booking for</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData[0]?.artist}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData[0]?.email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Amount</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">₹{singleBookingData[0]?.amount}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{singleBookingData[0]?.date}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {singleBookingData[0]?.address}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <div className='booking_view-div'>
                                    <button
                                        type="button"
                                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        onClick={() => acceptAndReject(singleBookingData[0]?._id, singleBookingData[0]?.user_id)}
                                    >Accept
                                    </button>
                                </div>
                                <div className='booking_view-div'>
                                    <button
                                        type="button"
                                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                        onClick={() => acceptAndReject(singleBookingData[0]?._id, singleBookingData[0]?.user_id, singleBookingData[0]?.email)}
                                    >Reject
                                    </button>
                                </div>

                            </div>
                        </dl>
                    </div>
                </div >
            </div >
        </>
    )
}


export default ViewBooking