import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function useCategoryData() {
    const [categories, setCategories] = useState([])
    const [validations, setValidation] = useState({ message: '', status: true })
    const getData = async () => {
        try {
            const response = await axios.post('/api/admin/get-category-data')
            if (response.data.success) {
                setCategories(response.data.data)
            } else {
                setCategories([])
            }
        } catch (error) {
            toast('somthing went wrong')
        }

    }
    useEffect(() => {
        getData()
    }, [categories])

    return {
        categories,
        setCategories,
        getData,
        validations,
        setValidation
    }
}

export default useCategoryData