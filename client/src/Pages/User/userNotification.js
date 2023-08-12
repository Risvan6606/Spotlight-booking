import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { request, userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import UserHeader from '../../componants/user/userHeader'
import Footer from '../../componants/user/footer'

function UserNotification() {
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
    return (
        <>
            <UserHeader />
            <div class="container mx-auto p-4">
                <h1 class="text-2xl font-semibold mb-6">Notifications</h1>
                {notificaions?.map((element) => {
                    return <div class="bg-white rounded-lg shadow p-4 notificaion_box">
                        < ul class="divide-y divide-gray-300" >
                            <li class="py-6 flex items-center justify-between">
                                <div class="flex items-center">
                                    <img src="https://res.cloudinary.com/dqn0v17b6/image/upload/v1691826104/tnnrbyxe9wg2j9mswcpq.jpg" alt="Profile Image" class="h-10 w-10 rounded-full mr-6" />
                                    <div class="ml-11 userNotification_p flex flex-col justify-center">
                                        <p class="text-sm font-semibold mb-3">{element.name}</p>
                                        {/* <p class="text-sm text-gray-500 mb-3">Liked your photo</p>
                                        <p class="text-xs text-gray-500">2h ago</p> */}
                                    </div>
                                </div>

                                {element.Actions === 'Accepted' && < button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View</button>}
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