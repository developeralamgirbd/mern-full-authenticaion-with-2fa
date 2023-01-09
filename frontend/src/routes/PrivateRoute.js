import React from 'react';
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {

    const {currentUser, loading, token} = useAuth();

    if (loading){
        return <div>Loading...</div>
    }

    if (currentUser && currentUser._id && token){
        return children
    }

    return <Navigate to='/login'/>;
};

export default PrivateRoute;