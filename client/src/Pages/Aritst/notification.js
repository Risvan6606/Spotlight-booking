import React, { useEffect, useLayoutEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { request } from '../../axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Notification() {
    const Navigate = useNavigate()
    const [data, setData] = useState({})
    const getData = async () => {
        request({
            url: '/api/artist/get-notification-data',
            method: 'post',
        }).then((response) => {
            if (response.data.success) {
                setData(response.data.data)
            } else {
                setData([])
            }

        }).catch((err) => {
            localStorage.removeItem('token')
            Navigate('/artist/login')
        })
    }

    useLayoutEffect(() => {
        getData()
    }, [])
    return (
        <>
            <ArtistHeader />
            < div className='notification_heading'>
                <div className='notificationH1_div'>
                    <h2 class="text-4xl font-bold dark:text-white">Notifications</h2>
                </div>
                <div className='notificationH1_new ml-10'>
                    <h2 class="text-2xl font-bold dark:text-white">New</h2>
                </div>
                {data?.notifications?.map((element) => {
                    return < div className='notification_content_div' >
                        <div className='notification_image_div'>
                            <img src='https://res.cloudinary.com/dqn0v17b6/image/upload/v1691211247/lesrewh7hwvv6liguahc.jpg' className='notification_image' alt="Notification" style={{ maxWidth: '100%' }} />
                        </div>
                        <div className='notification_para_div'>
                            <h6 class="text-lg font-bold dark:text-white">{element?.name}</h6>
                        </div>
                        <div className='notification_botton_div'>
                            <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View</button>
                        </div>
                    </div>
                })}

            </div >
        </>
    )
}

export default Notification