import React, { useEffect, useState } from 'react'
import ArtistHeader from '../../componants/artist/artistHeader'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import ArtistFooter from '../../componants/artist/artistFooter'
import { toast } from 'react-hot-toast'
import { request } from '../../axios'

function ArtistProfile() {
    const [profile, setProfile] = useState([])
    const [personal, setPersonal] = useState([])
    const navigate = useNavigate()
    const getData = () => {
        try {
            request({
                url: '/api/artist/get-profile-data',
                method: 'post',
            }).then((response) => {
                if (response.data.success) {
                    setProfile(response.data.data)
                    setPersonal(response.data.personal)
                } else {
                    toast('No datas')
                }
            }).catch((err) => {

            })
        } catch (error) {
            toast.error('somthing went wrong')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const EditProfile = async (req, res) => {
        try {
            navigate('/artist/edit-profile', { state: profile })
        } catch (error) {

        }
    }
    return (
        <>
            <ArtistHeader />
            <div className='artist-main_profile_div'>
                <div className='personal_information_div'>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white banner_heading">Profile</h1>
                    {profile?.midBudjet && < button
                        type="button"
                        onClick={() => EditProfile()}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 artistEditButton"
                    >Edit</button>}
                    {!profile?.midBudjet && < a href='/artist/artistdetailsform'> <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 artistEditButton"
                    >Add</button></a>}
                    {!profile?.midBudjet && <h1>please add your profile</h1>}
                    {profile?.midBudjet && < div className='profile_header'>
                        <div className='artist_profile_image_div'>
                            <img src={profile.image} alt='Profile' />
                        </div>
                        {!profile?.midBudjet && <h1>please add your profile</h1>}
                        <div className='personalDetails_div'>
                            <div className='profile_artist_h1'>
                                <h1 className='heading_divs'>Name         :{personal?.firstName + ' ' + personal?.lastName}</h1>
                            </div>
                            <div className='name_horizontal'>
                                <h1 className='heading_divs'>Email        :{personal?.email}</h1>
                            </div>
                            <div className='name_horizontal'>
                                <h1 className='heading_divs'>Mobile       :{personal?.mobile}</h1>
                            </div>
                            <div className='details-grid'>
                                <h1 className='heading_divs'>Min budjet   :{profile?.midBudjet}</h1>
                            </div>
                            <div className='details-grid'>
                                <h1 className='heading_divs'>category     :{profile?.category}</h1>
                            </div>
                            <div className='details-grid'>
                                <h1 className='heading_divs'>Available    :  {profile?.availble}</h1>
                            </div>
                        </div>
                    </div>}
                </div>
            </div >
            <ArtistFooter />
        </>
    )
}

export default ArtistProfile