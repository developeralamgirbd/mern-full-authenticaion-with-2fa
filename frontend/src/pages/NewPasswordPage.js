import React from 'react';
import NewPassword from "../components/NewPassword";


const NewPasswordPage = () => {
    return (
        <div className='row'>
            <div className='col-lg-4 offset-4'>
                <div className='card my-4'>
                    <div className='card-header'>
                        <p className='text-center h5'>Reset Password</p>
                    </div>
                    <div className='card-body p-4'>
                        <NewPassword/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NewPasswordPage;