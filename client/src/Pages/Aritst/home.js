import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArtistHeader from '../../componants/artist/artistHeader'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { setArtistMore } from '../../Redux/aritsMoreSlice';
import ArtistFooter from '../../componants/artist/artistFooter';

function ArtistHome() {
    const [banner, setBanner] = useState([])
    const getData = async () => {
        try {
            const response = await axios.post('/api/artist/get-artisthome-banner-data', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('artistKey')
                    }
                })
            setBanner(response.data.data)
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
            <div className='artist_home_carosel_div'>
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
                                        <h5>{element.title}</h5>
                                        <p>{element.discription}</p>
                                    </div>
                                </>
                            </div >)
                    })
                    }
                </Carousel >
            </div>
            <ArtistFooter />
        </>
    )
}

export default ArtistHome