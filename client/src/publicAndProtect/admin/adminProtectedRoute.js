import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../Redux/userSlice'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
function ProtectedAdminRoute(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const getUser = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/admin/get-admin-info-by-id',
                { adminKey: localStorage.getItem('adminKey') },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('adminKey')}`,
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                navigate('/admin/login')
            }
        } catch (error) {
            dispatch(hideLoading())
            navigate('/admin/login')
        }
    }
    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user])

    if (localStorage.getItem('adminKey')) {
        return props.children
    } else {
        return < Navigate to="/admin/login" />
    }
}
export default ProtectedAdminRoute