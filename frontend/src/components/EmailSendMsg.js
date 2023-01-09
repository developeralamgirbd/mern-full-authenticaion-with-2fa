import React from 'react';
import ResendEmail from "./ResendEmail";

const EmailSendMsg = () => {

    return (
        <div className='row align-items-center vh-100'>
            <div className='col-lg-6 mx-auto'>
                <div className='card text-center p-5'>
                    <h3 className='text-success'>Please verify your email</h3>
                    <p>We sent an email link to complete your registration</p>
                    <p>Tip: Check your spam folder in case the email was incorrecly identified</p>

                    <p>Didn't receive the email?</p>
                    <ResendEmail/>
                </div>
            </div>
        </div>
    );
};

export default EmailSendMsg;