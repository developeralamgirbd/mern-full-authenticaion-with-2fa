import React from 'react';
import LoginForm from "../components/LoginForm";
import {useAuth} from "../hooks/useAuth";

function Login(props) {
    const {successMsg} = useAuth();
    return (
        <div className='row'>
            <div className='col-lg-4 offset-4'>
                <p className='text-center text-success'>{successMsg}</p>
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