import React, { useEffect } from 'react'
import axios from 'axios'
import ArtistHeader from '../../componants/artist/artistHeader'

function ArtistHome() {
    const getData = async () => {
        try {
            const response = await axios.post('/api/artist/get-artist-info-by-id', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('artistKey')
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
            <ArtistHeader />
            <div>ArtistHome</div>
        </>
    )
}

export default ArtistHome