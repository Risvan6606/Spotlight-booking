import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserHeader from '../../componants/user/userHeader'
import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../../componants/user/footer';
import 'pure-react-carousel/dist/react-carousel.es.css';
function Home() {
    const [banner, setBanner] = useState([])
    const getData = async () => {
        try {
            const response = await axios.post('/api/user/get-home-banner-data', {},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            setBanner(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [banner])
    return (
        <>
            <UserHeader />

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

            < Footer />

        </>
    )
}

export default Home  