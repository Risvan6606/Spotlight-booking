import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { request, userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import UserHeader from '../../componants/user/userHeader'
import Footer from '../../componants/user/footer'
import { formatDistanceToNow } from 'date-fns';

function UserNotification() {
    const navigate = useNavigate()
    const [notificaions, setNotificaions] = useState()
    const getData = () => {
        userRequest({
            url: '/api/user/notifications',
            method: 'post',
        }).then((response) => {
            if (response.data.success) {
                setNotificaions(response.data.data)
            } else {
                toast('No notificaions')
            }
        }).catch((err) => {
            toast.error('please login after try again')
        })
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(notificaions)
    const handelClick = (booking_id) => {
        navigate('/confirm-payment', { state: booking_id })
    }
    return (
        <>
            <UserHeader />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
                {notificaions
                    ?.slice()
                    .reverse()
                    ?.map((element) => {
                        const timeAgo = formatDistanceToNow(new Date(element.timestamp), {
                            addSuffix: true,
                        });
                        return <div className="bg-white rounded-lg shadow-lg p-4 notificaion_box">
                            < ul className="divide-y divide-gray-300" >
                                <li className="py-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src="https://res.cloudinary.com/dqn0v17b6/image/upload/v1691827196/iyzozhxwdjfc1refuhlq.jpg" alt="Profile Image" className="h-10 w-10 rounded-full mr-6" />
                                        <div className="ml-11 userNotification_p flex flex-col justify-center">
                                            <p className="text-sm font-semibold mb-3">{element.name}</p>
                                            <p className="text-xs text-gray-500">{timeAgo}</p>
                                        </div>
                                    </div>

                                    {element.Actions === 'Accepted' && < button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => handelClick(element.booking_id)}>Advance</button>}
                                </li>
                            </ul>
                        </div>
                    })
                }
            </div >
            <Footer />
        </>
    )
}

export default UserNotification