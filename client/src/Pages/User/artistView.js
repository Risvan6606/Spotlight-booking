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
            {/* <div className="user_artist_view ">
                <section className='abouts'>
                    <div className='main'>
                        <img src={datas.moreDetails?.[0]?.image} />

                        <div className='about-texts'>
                            <h1 >{`${datas.moreDetails?.[0]?.firstName} ${datas.moreDetails?.[0]?.lastName}`}</h1>
                            <h5>{datas.moreDetails?.[0]?.category}</h5>
                            <p>{datas.moreDetails?.[0]?.discription}</p>
                        </div>
                    </div>
                    <h1 className='minBudjets'>{` Booking rate:  ${datas?.moreDetails?.[0]?.midBudjet}`}</h1>

                </section >
            </div > */}
            <Footer />
        </>
    )
}

export default ArtistView