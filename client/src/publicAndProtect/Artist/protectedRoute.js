import React from "react";
import { Navigate } from "react-router-dom";

function ArtistProtectedRoute(props) {
    if (localStorage.getItem('artistKey')) {
        return props.children
    } else {
        return <Navigate to='/artist/login' />
    }
}
export default ArtistProtectedRoute