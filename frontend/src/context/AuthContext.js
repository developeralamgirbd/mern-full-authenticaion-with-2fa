import React, {createContext,  useEffect, useState} from 'react';
import {getToken, getUser} from '../helpers/sessionHelper'

export const AuthContext = createContext();

function UserContext({children}) {

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(()=> {
        // getUser from localStorage
        const user = getUser();
        if (user){
            setCurrentUser(user);
            setToken(getToken());
            setLoading(false);
        }
        setLoading(false);

    }, [])
    const values = {
        currentUser, token, loading, successMsg, setSuccessMsg
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default UserContext;