import React from 'react';
import LoginForm from "../components/LoginForm";

function Login(props) {
    return (
        <div className='row'>
            <div className='col-lg-6 offset-3'>
                <div className='card my-4'>
                    <div className='card-header'>
                        <p className='text-center h5'>Login</p>
                    </div>
                    <div className='card-body p-4'>
                        <LoginForm/>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Login;