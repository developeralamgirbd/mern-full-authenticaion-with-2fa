
import React from 'react';
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {currentUser, loading, token} = useAuth();

    if (loading){
        return <div>Loading...</div>
    }

    if (currentUser && currentUser._id && token){
        return <Navigate to='/dashboard'/>
    }

    return children;
};

export default ProtectedRoute;