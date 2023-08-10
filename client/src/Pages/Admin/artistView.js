import React, { useEffect, useState } from 'react'
import Adminlayout from '../../componants/admin/Adminlayout'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { adminRequest } from '../../axios'

function ArtistAdminView() {
    const location = useLocation()
    const [moreData, setMoreData] = useState()
    const artist_id = location.state
    console.log('artist_idddd', artist_id)
    const getData = async () => {
        try {
            adminRequest({
                url: '/api/admin/get-artist-more-data',
                method: 'post',
                data: {
                    artist_id: artist_id
                }
            }).then((response) => {
                if (response.data.success) {
                    setMoreData(response.data.data)
                } else {
                    setMoreData([])
                }
            }).catch((err) => {
                toast('somthing went wrong')
            })
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }

    useEffect(() => {
        getData()
    }, [])
    console.log('more datas', moreData)
    return (
        <>
            <Adminlayout />
            <div className="adminArtistView sm:ml-64 ">
                <section className='about'>
                    <div className='main'>
                        <img src={moreData?.[0]?.image} />

                        <div className='about-text'>
                            <h1>{`${moreData?.[0]?.firstName} ${moreData?.[0]?.lastName}`}</h1>
                            <h5>{moreData?.[0]?.category}</h5>
                            <p>{moreData?.[0]?.discription}</p>
                        </div>
                    </div>
                    <h1 className='minBudjet'>{` Booking rate:${moreData?.[0]?.midBudjet}`}</h1>
                </section >
            </div>
        </>
    )
}

export default ArtistAdminView