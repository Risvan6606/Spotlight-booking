import React from 'react'
import { useSelector } from 'react-redux'
import UserHeader from '../../componants/user/userHeader'

function ArtistView() {
    const singleArtist = useSelector((state) => state.singleArtist.singleArtist)
    console.log(singleArtist)
    return (
        <>
            <UserHeader />





        </>
    )
}

export default ArtistView