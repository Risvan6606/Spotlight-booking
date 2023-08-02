import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function useBannerData() {
    const [banners, setBanners] = useState([])
    const getData = async () => {
        try {
            const response = await axios.post('/api/admin/get-banner-data')
            if (response.data.success) {
                setBanners(response.data.data)
            } else {
                setBanners([])
            }
        } catch (error) {
            toast('somthing went wrong')
        }
    }
    useEffect(() => {
        getData()
    }, [banners])

    return {
        banners,
    }
}

export default useBannerData