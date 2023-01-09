import React from 'react';
import RegisterForm from "../components/RegisterForm";

function Register(props) {
    return (
        <div className='row'>
            <div className='col-lg-6 offset-3'>
                <div className='card my-4'>
                    <div className='card-header'>
                        <p className='text-center h5'>Register</p>
                    </div>
                    <div className='card-body p-4'>
                        <RegisterForm/>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Register;