import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import ResendEmail from "./ResendEmail";
import {removeEmailVerify} from "../helpers/sessionHelper";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const EmailVerify = () => {

    const {email, token} = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect( ()=>{
        axios.get(`${baseUrl}/email-verify/${email}/${token}`)
            .then(res => {
                setSuccess(res.data.success);
                removeEmailVerify()
            })
            .catch(error => {
                const res = error.response
                setError(res.data.error)
                console.log(res.data)
            })

    }, [email, token])


    return (
        <div className='row align-items-center vh-100'>
            <div className='col-lg-4 mx-auto'>
                <div className='card text-center p-5'>
                    {
                        success ?
                            <>
                                <p className='text-success'>{success}</p>
                                <div className='d-flex justify-content-center'>
                                    <Link to='/login'>Login</Link>
                                </div>
                            </>
                            : <><p className='text-danger'>{error}</p><ResendEmail/></>
                    }




                </div>
            </div>
        </div>
    );
};

export default EmailVerify;