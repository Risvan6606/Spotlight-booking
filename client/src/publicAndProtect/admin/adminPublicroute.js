import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminProtectedRoute(props) {
    if (localStorage.getItem('adminKey')) {
        return <Navigate to="/admin" />
    } else {
        return props.children
    }
}

export default AdminProtectedRoute