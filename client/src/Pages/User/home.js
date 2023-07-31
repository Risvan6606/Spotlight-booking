import React, { useEffect } from 'react'
import axios from 'axios'
import UserHeader from '../../componants/user/userHeader'


function Home() {
    const getData = async () => {
        try {
            const response = await axios.post('/api/user/get-user-info-by-id', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <UserHeader />
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </>
    )
}

export default Home  