import React, {useState} from 'react';
import {resendEmailApi} from "../APIRequest/userApi";
import {useParams} from "react-router-dom";
import {getEmailVerify} from "../helpers/sessionHelper";

const ResendEmail = () => {
    const  [success, setSuccess]= useState('');
    const  [error, setError]= useState('');
    const  {email} = useParams();
    const emailVerifyValue = getEmailVerify;

    const resendEmailHandler = async ()=> {
            const res = await resendEmailApi(emailVerifyValue?.email || email);
            if (res.data.error){
                setError(res.data.error)
            }else {
                setSuccess(res.data.success)
            }

    }

    return (
        <>
            {
                success ?  <p className='text-success'>{success}</p> :  <p className='text-danger'>{error}</p>
            }

            <div className='d-flex justify-content-center'>
                <button type='button' onClick={resendEmailHandler} className='btn btn-primary w-50'>Resend Email</button>
            </div>

        </>
    );
};

export default ResendEmail;