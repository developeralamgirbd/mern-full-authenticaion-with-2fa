import React from 'react';
import ForgotPassword from "../components/ForgotPassword";
import LoginForm from "../components/LoginForm";
import {Link} from "react-router-dom";

const ForgotPasswordPage = () => {
    return (
        <div className='row'>
            <div className='col-lg-4 offset-4'>
                <div className='card my-4'>
                    <div className='card-header'>
                        <p className='text-center h5'>Forgot Your Password</p>
                    </div>
                    <div className='card-body p-4'>
                        <p className='text-center py-4'>Enter your email address and we'll send you a link to reset your password</p>
                        <ForgotPassword/>
                       <div className='d-flex justify-content-between align-items-center mt-2'>
                           <p>Don't have an account?</p>
                           <Link to='/register' className='btn border-1 border-secondary'>Create an Account</Link>
                       </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;