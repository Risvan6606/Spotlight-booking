import React from "react";
import { Navigate } from "react-router-dom";

function ArtistProtectedRoute(props) {
    if (localStorage.getItem('artistKey')) {
        return <Navigate to='/artist' />
    } else {
        return props.children
    }
}
export default ArtistProtectedRoute
