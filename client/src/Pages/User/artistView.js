import React from 'react'
import { useSelector } from 'react-redux'
import UserHeader from '../../componants/user/userHeader'
import { useLocation } from 'react-router-dom'
import Footer from '../../componants/user/footer'

function ArtistView() {
    const location = useLocation()
    const datas = location.state
    console.log(datas)

    return (
        <>
            <UserHeader />
            <div className="user_artist_view ">
                <section className='abouts'>
                    <div className='main'>
                        <img src={datas?.image} />

                        <div className='about-texts'>
                            <h1 >{`${datas?.firstName} ${datas?.lastName}`}</h1>
                            <h5>{datas?.category}</h5>
                            <p>{datas?.discription}</p>
                        </div>
                    </div>
                    <h1 className='minBudjets'>{` Booking rate:  ${datas?.midBudjet}`}</h1>

                </section >
            </div >
            <Footer />
        </>
    )
}

export default ArtistView