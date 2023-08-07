import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArtistHeader from '../../componants/artist/artistHeader'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../../Redux/notificationSlice';
import { setArtistMore } from '../../Redux/aritsMoreSlice';

function ArtistHome() {
    const [banner, setBanner] = useState([])
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification.notification);


    const getData = async () => {
        try {
            const response = await axios.post('/api/artist/get-artisthome-banner-data', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('artistKey')
                    }
                })
            setBanner(response.data.data)
            dispatch(setNotifications(response.data.notification))
            dispatch(setArtistMore(response.data.profile))
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(profiles, 'hai')

    useEffect(() => {
        getData()
    }, [notification?.notifications])
    // Edited
    return (
        <>
            <ArtistHeader />
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
            >
                {banner.map((element) => {

                    return (
                        < div className='bannershow_div'>
                            <>
                                < img src={element.image} alt="Motorbike Smoke" className='banner_image' />
                                <div className="legend">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </>
                        </div >)
                })
                }
            </Carousel >
        </>
    )
}

export default ArtistHome